#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import stat
import sys
import zipfile
from dataclasses import asdict, dataclass
from pathlib import Path, PurePosixPath

PART_COUNT = 34
PATTERN = "VoiceShop-Spec-Part-{number:02d}.zip"


@dataclass(frozen=True)
class Entry:
    part: int
    archive: str
    path: str
    sha256: str
    size: int
    status: str


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def safe(info: zipfile.ZipInfo) -> bool:
    path = PurePosixPath(info.filename)
    mode = info.external_attr >> 16
    return not path.is_absolute() and ".." not in path.parts and not stat.S_ISLNK(mode)


def report(
    path: Path,
    status: str,
    archives: list[dict[str, object]],
    entries: list[Entry],
    missing: list[str],
    corrupt: list[str],
    unsafe: list[str],
    conflicts: list[str],
) -> None:
    lines = [
        "# VoiceShop — Assembly Report",
        "",
        f"- Status: `{status}`",
        f"- Expected parts: `{PART_COUNT}`",
        f"- Located archives: `{len(archives)}`",
        f"- Missing parts: `{len(missing)}`",
        f"- Corrupt archives: `{len(corrupt)}`",
        f"- Unsafe entries: `{len(unsafe)}`",
        f"- Conflicts: `{len(conflicts)}`",
    ]
    for title, values in (
        ("Missing parts", missing),
        ("Corrupt archives", corrupt),
        ("Unsafe entries", unsafe),
        ("Conflicts", conflicts),
    ):
        lines.extend(["", f"## {title}", ""])
        lines.extend(f"- `{value}`" for value in values)
        if not values:
            lines.append("- None")
    lines.extend(["", "## Archive hashes", ""])
    lines.extend(f"- `{item['sha256']}`  `{item['name']}`" for item in archives)
    counts: dict[str, int] = {}
    for entry in entries:
        counts[entry.status] = counts.get(entry.status, 0) + 1
    lines.extend(["", "## Entry summary", ""])
    lines.extend(f"- `{key}`: `{counts[key]}`" for key in sorted(counts))
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input-dir", required=True, type=Path)
    parser.add_argument("--output-dir", required=True, type=Path)
    args = parser.parse_args()

    input_dir = args.input_dir.resolve()
    output_dir = args.output_dir.resolve()
    tree = output_dir / "VoiceShop-Spec-Complete"
    final_zip = output_dir / "VoiceShop-Spec-Complete.zip"
    manifest_file = output_dir / "VoiceShop-Spec-Complete.manifest.json"
    sums_file = output_dir / "VoiceShop-Spec-Complete.SHA256SUMS.txt"
    report_file = output_dir / "VoiceShop-Spec-Assembly-Report.md"
    output_dir.mkdir(parents=True, exist_ok=True)

    missing: list[str] = []
    corrupt: list[str] = []
    unsafe: list[str] = []
    conflicts: list[str] = []
    archives: list[dict[str, object]] = []
    entries: list[Entry] = []
    parts: list[tuple[int, Path]] = []

    for number in range(1, PART_COUNT + 1):
        path = input_dir / PATTERN.format(number=number)
        if path.is_file():
            parts.append((number, path))
        else:
            missing.append(path.name)

    if missing:
        report(report_file, "BLOCKED", archives, entries, missing, corrupt, unsafe, conflicts)
        print("STATUS: BLOCKED")
        return 2

    if tree.exists():
        shutil.rmtree(tree)
    tree.mkdir(parents=True)

    for number, archive_path in parts:
        archives.append({
            "part": number,
            "name": archive_path.name,
            "sha256": sha256_file(archive_path),
            "size": archive_path.stat().st_size,
        })
        try:
            with zipfile.ZipFile(archive_path, "r") as archive:
                bad = archive.testzip()
                if bad:
                    corrupt.append(f"{archive_path.name}: {bad}")
                    continue
                for info in sorted(archive.infolist(), key=lambda value: value.filename):
                    if info.is_dir():
                        continue
                    if not safe(info):
                        unsafe.append(f"{archive_path.name}: {info.filename}")
                        continue
                    relative = PurePosixPath(info.filename)
                    target = tree.joinpath(*relative.parts)
                    data = archive.read(info)
                    digest = sha256_bytes(data)
                    if target.exists():
                        old_hash = sha256_bytes(target.read_bytes())
                        if old_hash == digest:
                            entries.append(Entry(
                                number, archive_path.name, relative.as_posix(),
                                digest, len(data), "duplicate_identical"
                            ))
                        else:
                            conflicts.append(
                                f"{relative.as_posix()} "
                                f"(existing={old_hash}, incoming={digest}, part={number:02d})"
                            )
                            entries.append(Entry(
                                number, archive_path.name, relative.as_posix(),
                                digest, len(data), "conflict"
                            ))
                        continue
                    target.parent.mkdir(parents=True, exist_ok=True)
                    target.write_bytes(data)
                    entries.append(Entry(
                        number, archive_path.name, relative.as_posix(),
                        digest, len(data), "extracted"
                    ))
        except (OSError, RuntimeError, zipfile.BadZipFile) as error:
            corrupt.append(f"{archive_path.name}: {error}")

    blocked = bool(corrupt or unsafe or conflicts)
    status = "BLOCKED" if blocked else "READY"

    manifest = {
        "project": "VoiceShop",
        "series": "VoiceShop-Spec",
        "status": status,
        "part_count": PART_COUNT,
        "archives": archives,
        "missing_parts": missing,
        "corrupt_archives": corrupt,
        "unsafe_entries": unsafe,
        "conflicts": conflicts,
        "entries": [asdict(entry) for entry in entries],
    }
    manifest_file.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    sums: list[str] = []
    for path in sorted(
        (item for item in tree.rglob("*") if item.is_file()),
        key=lambda item: item.relative_to(tree).as_posix(),
    ):
        sums.append(f"{sha256_file(path)}  {path.relative_to(tree).as_posix()}")
    sums_file.write_text("\n".join(sums) + "\n", encoding="utf-8")

    report(report_file, status, archives, entries, missing, corrupt, unsafe, conflicts)

    if blocked:
        print("STATUS: BLOCKED")
        return 3

    if final_zip.exists():
        final_zip.unlink()
    with zipfile.ZipFile(final_zip, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(
            (item for item in tree.rglob("*") if item.is_file()),
            key=lambda item: item.relative_to(tree).as_posix(),
        ):
            arcname = Path("VoiceShop-Spec-Complete") / path.relative_to(tree)
            archive.write(path, arcname.as_posix())

    with sums_file.open("a", encoding="utf-8") as stream:
        stream.write(f"{sha256_file(final_zip)}  {final_zip.name}\n")

    print("STATUS: READY")
    print(final_zip)
    return 0


if __name__ == "__main__":
    sys.exit(main())
