# VoiceShop — Índice Maestro de Cierre

## Propósito

`VoiceShop-Spec-Part-34.zip` cierra la serie incremental
`VoiceShop-Spec-Part-01.zip` a `VoiceShop-Spec-Part-34.zip`.

Este paquete define el procedimiento determinista para:

1. localizar las 34 partes;
2. detectar archivos ausentes o corruptos;
3. calcular SHA-256;
4. detectar rutas inseguras y conflictos;
5. ensamblar la especificación consolidada;
6. emitir un reporte final `READY` o `BLOCKED`.

## Fuente de verdad

La fuente de verdad documental se obtiene al procesar, en orden numérico,
todos los paquetes:

```text
VoiceShop-Spec-Part-01.zip
...
VoiceShop-Spec-Part-34.zip
```

No se permite:

- omitir silenciosamente una parte;
- aceptar ZIP corruptos;
- extraer rutas absolutas o con `..`;
- aceptar enlaces simbólicos;
- sobrescribir contenidos diferentes con el mismo nombre;
- modificar los ZIP originales.

## Contenido de Part-34

| Archivo | Función |
|---|---|
| `00-MASTER-INDEX.md` | Índice y reglas de cierre |
| `01-DELIVERY-MANIFEST.md` | Contrato de entrega |
| `02-CHECKSUMS-AND-INTEGRITY.md` | Política SHA-256 |
| `03-CONSISTENCY-REVIEW.md` | Auditoría técnica final |
| `04-FULL-ASSEMBLY-PLAN.md` | Ensamblado completo |
| `05-FINAL-ACCEPTANCE-CHECKLIST.md` | Criterios de aceptación |
| `manifest.json` | Manifiesto legible por máquina |
| `scripts/build_complete_delivery.py` | Ensamblador |
| `scripts/verify_part34.py` | Verificador de esta parte |
| `SHA256SUMS.txt` | Hashes internos |

## Salidas esperadas

```text
VoiceShop-Spec-Complete/
VoiceShop-Spec-Complete.zip
VoiceShop-Spec-Complete.manifest.json
VoiceShop-Spec-Complete.SHA256SUMS.txt
VoiceShop-Spec-Assembly-Report.md
```
