#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INPUT="$ROOT/input"
OUTPUT="$ROOT/output"

python3 "$ROOT/scripts/verify_inputs.py" --input-dir "$INPUT"
python3 "$ROOT/scripts/assemble.py" --input-dir "$INPUT" --output-dir "$OUTPUT"

echo
echo "VoiceShop final assembly completed."
echo "Output: $OUTPUT"
