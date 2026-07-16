#!/usr/bin/env python3
from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ASSEMBLER = ROOT / "scripts" / "assemble.py"
VERIFIER = ROOT / "scripts" / "verify_inputs.py"


def run(command: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        command,
        check=False,
        capture_output=True,
        text=True,
    )


def create_valid_parts(input_dir: Path) -> None:
    for number in range(1, 35):
        archive_path = input_dir / f"VoiceShop-Spec-Part-{number:02d}.zip"
        with zipfile.ZipFile(
            archive_path,
            "w",
            compression=zipfile.ZIP_DEFLATED,
        ) as archive:
            archive.writestr(
                f"part-{number:02d}/document-{number:02d}.md",
                f"# VoiceShop test part {number:02d}\n",
            )


def test_missing_parts() -> None:
    with tempfile.TemporaryDirectory() as temp:
        root = Path(temp)
        input_dir = root / "input"
        input_dir.mkdir()

        result = run(
            [
                sys.executable,
                str(VERIFIER),
                "--input-dir",
                str(input_dir),
            ]
        )
        assert result.returncode != 0
        assert "STATUS: BLOCKED" in result.stdout


def test_complete_delivery() -> None:
    with tempfile.TemporaryDirectory() as temp:
        root = Path(temp)
        input_dir = root / "input"
        output_dir = root / "output"
        input_dir.mkdir()
        output_dir.mkdir()

        create_valid_parts(input_dir)

        verify_result = run(
            [
                sys.executable,
                str(VERIFIER),
                "--input-dir",
                str(input_dir),
            ]
        )
        assert verify_result.returncode == 0, verify_result.stdout + verify_result.stderr
        assert "STATUS: READY" in verify_result.stdout

        assemble_result = run(
            [
                sys.executable,
                str(ASSEMBLER),
                "--input-dir",
                str(input_dir),
                "--output-dir",
                str(output_dir),
            ]
        )
        assert assemble_result.returncode == 0, (
            assemble_result.stdout + assemble_result.stderr
        )
        assert "STATUS: READY" in assemble_result.stdout

        final_zip = output_dir / "VoiceShop-Spec-Complete.zip"
        manifest = output_dir / "VoiceShop-Spec-Complete.manifest.json"
        report = output_dir / "VoiceShop-Spec-Assembly-Report.md"
        sums = output_dir / "VoiceShop-Spec-Complete.SHA256SUMS.txt"

        assert final_zip.is_file()
        assert manifest.is_file()
        assert report.is_file()
        assert sums.is_file()

        data = json.loads(manifest.read_text(encoding="utf-8"))
        assert data["status"] == "READY"
        assert len(data["archives"]) == 34


def main() -> int:
    test_missing_parts()
    test_complete_delivery()
    print("SELFTEST: READY")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
