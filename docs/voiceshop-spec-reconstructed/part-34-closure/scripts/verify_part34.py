#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import sys
from pathlib import Path


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    sums = root / "SHA256SUMS.txt"
    if not sums.is_file():
        print("STATUS: BLOCKED — SHA256SUMS.txt missing")
        return 2

    errors: list[str] = []
    for line in sums.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        expected, relative = line.split("  ", 1)
        path = root / relative
        if not path.is_file():
            errors.append(f"missing: {relative}")
        elif sha256_file(path) != expected:
            errors.append(f"hash mismatch: {relative}")

    if errors:
        print("STATUS: BLOCKED")
        for error in errors:
            print(error)
        return 3

    print("STATUS: READY")
    return 0


if __name__ == "__main__":
    sys.exit(main())
