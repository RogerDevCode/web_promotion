$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$InputDir = Join-Path $Root "input"
$OutputDir = Join-Path $Root "output"

python (Join-Path $Root "scripts\verify_inputs.py") --input-dir $InputDir
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

python (Join-Path $Root "scripts\assemble.py") --input-dir $InputDir --output-dir $OutputDir
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

Write-Host ""
Write-Host "VoiceShop final assembly completed."
Write-Host "Output: $OutputDir"
