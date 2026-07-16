# VoiceShop — Kit Final de Ensamblado

## Propósito

Este kit ejecuta el paso posterior a `VoiceShop-Spec-Part-34.zip`:

1. verificar la presencia de `VoiceShop-Spec-Part-01.zip` a
   `VoiceShop-Spec-Part-34.zip`;
2. validar que todos sean ZIP legibles;
3. detectar rutas inseguras, enlaces simbólicos y conflictos;
4. ensamblar el árbol consolidado;
5. generar manifiesto, hashes y reporte;
6. producir `VoiceShop-Spec-Complete.zip`.

## Importante

Este kit no contiene ni inventa las partes 01–33.

Solo incluye `VoiceShop-Spec-Part-34.zip`, porque fue el archivo disponible al
momento de generar este paquete.

Por tanto, el estado inicial será `BLOCKED` hasta copiar las partes 01–33 en:

```text
input/
```

## Estructura

```text
VoiceShop-Spec-Final-Assembly-Kit/
├── input/
│   ├── PLACE_PARTS_HERE.txt
│   └── VoiceShop-Spec-Part-34.zip
├── output/
│   └── .gitkeep
├── scripts/
│   ├── assemble.py
│   ├── verify_inputs.py
│   ├── run_linux.sh
│   └── run_windows.ps1
├── tests/
│   └── selftest.py
├── FINAL-DELIVERY-CHECKLIST.md
├── kit-manifest.json
└── SHA256SUMS.txt
```

## Uso en Linux

```bash
chmod +x scripts/run_linux.sh
./scripts/run_linux.sh
```

## Uso en Windows PowerShell

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\run_windows.ps1
```

## Uso manual

```bash
python3 scripts/verify_inputs.py --input-dir input
python3 scripts/assemble.py --input-dir input --output-dir output
```

## Resultado esperado

Cuando las 34 partes estén presentes y sean coherentes:

```text
output/
├── VoiceShop-Spec-Complete/
├── VoiceShop-Spec-Complete.zip
├── VoiceShop-Spec-Complete.manifest.json
├── VoiceShop-Spec-Complete.SHA256SUMS.txt
└── VoiceShop-Spec-Assembly-Report.md
```

## Estados

- `READY`: ensamblado completo generado.
- `BLOCKED`: faltan partes o existe corrupción, ruta insegura o conflicto.

## Autoprueba del kit

```bash
python3 tests/selftest.py
```

La autoprueba usa archivos temporales y no modifica `input/` ni `output/`.
