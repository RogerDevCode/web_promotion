# VoiceShop — Plan Completo de Ensamblado

## Entrada

```text
delivery/
├── VoiceShop-Spec-Part-01.zip
├── VoiceShop-Spec-Part-02.zip
├── ...
└── VoiceShop-Spec-Part-34.zip
```

## Comando

```bash
python3 scripts/build_complete_delivery.py   --input-dir /ruta/delivery   --output-dir /ruta/output
```

## Secuencia

1. localizar partes 01–34;
2. detenerse si falta alguna;
3. validar cada ZIP;
4. calcular hash de cada ZIP;
5. inspeccionar rutas internas;
6. rechazar rutas inseguras y enlaces;
7. extraer en orden;
8. registrar duplicados idénticos;
9. registrar conflictos diferentes;
10. detener cierre si existen conflictos;
11. crear árbol consolidado;
12. crear manifiesto;
13. crear SHA256SUMS;
14. crear reporte;
15. crear ZIP consolidado;
16. calcular hash final.

## Salida

```text
output/
├── VoiceShop-Spec-Complete/
├── VoiceShop-Spec-Complete.zip
├── VoiceShop-Spec-Complete.manifest.json
├── VoiceShop-Spec-Complete.SHA256SUMS.txt
└── VoiceShop-Spec-Assembly-Report.md
```

## Política

```text
misma ruta + mismo hash       -> duplicate_identical
misma ruta + hash diferente   -> conflict
```

El conflicto no se sobrescribe.

## Recuperación

Corregir los archivos fuente y volver a ejecutar en una salida limpia. No editar
manualmente un ensamblado parcial para simular éxito.
