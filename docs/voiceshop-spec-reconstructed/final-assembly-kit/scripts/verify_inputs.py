#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import json
import sys
import zipfile
from pathlib import Path

PART_COUNT = 34
PATTERN = "VoiceShop-Spec-Part-{number:02d}.zip"


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Verify the 34 VoiceShop specification archives."
    )
    parser.add_argument("--input-dir", type=Path, required=True)
    parser.add_argument(
        "--report",
        type=Path,
        default=None,
        help="Optional JSON report path.",
    )
    args = parser.parse_args()

    input_dir = args.input_dir.resolve()
    missing: list[str] = []
    corrupt: list[str] = []
    archives: list[dict[str, object]] = []

    for number in range(1, PART_COUNT + 1):
        name = PATTERN.format(number=number)
        path = input_dir / name

        if not path.is_file():
            missing.append(name)
            continue

        try:
            with zipfile.ZipFile(path, "r") as archive:
                bad_member = archive.testzip()
                if bad_member is not None:
                    corrupt.append(f"{name}: {bad_member}")
                    continue
        except (OSError, RuntimeError, zipfile.BadZipFile) as error:
            corrupt.append(f"{name}: {error}")
            continue

        archives.append(
            {
                "part": number,
                "name": name,
                "size": path.stat().st_size,
                "sha256": sha256_file(path),
            }
        )

    status = "READY" if not missing and not corrupt else "BLOCKED"
    report = {
        "project": "VoiceShop",
        "status": status,
        "expected_parts": PART_COUNT,
        "valid_parts": len(archives),
        "missing_parts": missing,
        "corrupt_archives": corrupt,
        "archives": archives,
    }

    report_path = args.report or input_dir / "VoiceShop-Input-Verification.json"
    report_path.write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"STATUS: {status}")
    print(f"VALID: {len(archives)}/{PART_COUNT}")
    if missing:
        print("MISSING:")
        for item in missing:
            print(f"  - {item}")
    if corrupt:
        print("CORRUPT:")
        for item in corrupt:
            print(f"  - {item}")
    print(f"REPORT: {report_path}")

    return 0 if status == "READY" else 2


if __name__ == "__main__":
    sys.exit(main())
