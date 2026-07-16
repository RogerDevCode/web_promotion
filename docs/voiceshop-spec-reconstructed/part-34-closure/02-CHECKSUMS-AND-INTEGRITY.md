# VoiceShop — Integridad SHA-256

## Formato

Cada línea de `SHA256SUMS.txt` usa:

```text
<sha256 de 64 caracteres>  <ruta relativa POSIX>
```

## Verificación de Part-34

Extraer el ZIP y ejecutar:

```bash
python3 scripts/verify_part34.py
```

Resultado correcto:

```text
STATUS: READY
```

## Controles

- hash sobre bytes;
- lectura por bloques;
- rutas relativas;
- orden estable;
- ZIP probado con `testzip()`;
- manifiesto JSON válido;
- scripts con sintaxis Python válida.

## Límite

SHA-256 verifica igualdad de bytes, no corrección funcional. Debe complementarse
con pruebas y revisión de consistencia.
