# VoiceShop: estructura reconstruida

Esta carpeta conserva una copia de la especificación disponible en
`/home/manager/Sync/python_proyects/chatbot-llm` y del ZIP
`VoiceShop-Spec-Part-34B(1).zip`.

## Resultado de la revisión

- El ZIP entregado contiene el paquete de cierre de la Parte 34, no las 34 partes fuente.
- El nombre `VoiceShop-Spec-Part-34B(1).zip` es una variante de descarga; internamente el paquete se identifica como Parte 34.
- La documentación real contiene 113 archivos Markdown.
- La numeración real tiene documentos base `01` a `12` y una especificación funcional jerárquica `13-01` a `13-08`.
- Los sufijos `02A`, `03A` y `04B` son variantes normativas y no deben renumerarse como `02`, `03` o `04`.
- `13-00-INDEX.md` no coincide con los archivos disponibles: describe módulos `13-01` a `13-10` como documentos únicos, mientras la fuente real usa ocho grupos y documentos hijos.

## Estructura canónica observada

```text
01-VISION.md
02-GLOSSARY.md
02A-SEMANTIC-DICTIONARY.md
03-REQUIREMENTS.md
03A-TRACEABILITY-MATRIX.md
04-BUSINESS-RULES.md
04B-BUSINESS-RULES.md
05-ACTORS.md
06-USE-CASES.md
07-FUNCTIONAL-MODULES.md
08-EVENT-CATALOG.md
09-COMMAND-CATALOG.md
10-STATE-MACHINES.md
11-SEQUENCE-DIAGRAMS.md
12-DOMAIN-MODEL.md
13-00-INDEX.md
13-01-01 a 13-01-15: motor conversacional
13-02-01 a 13-02-12: voz y Realtime
13-03-01 a 13-03-09: catálogo
13-04-01 a 13-04-09: inventario
13-05-01 a 13-05-10: integraciones
13-06-01 a 13-06-10: administración y BackOffice
13-07-01 a 13-07-13: operación y despliegue
13-08-01 a 13-08-11: ADR, trazabilidad y cierre
```

La lista exacta de nombres se conserva en `TRUE-FILE-ENUMERATION.md` y los
archivos se encuentran en `specification/` sin renombrar ni sobrescribir.

## Cierre recibido

`part-34-closure/` conserva los 10 archivos internos del ZIP, incluidos sus
manifiestos, checksums, scripts de verificación y plan de ensamblado.

El cierre no se declara completo: faltan las Partes 01 a 33 para ejecutar el
ensamblado determinista descrito por el propio paquete.
