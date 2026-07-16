# VoiceShop — Manifiesto de Entrega

## Identificación

- Proyecto: `VoiceShop`
- Serie: `VoiceShop-Spec`
- Parte: `34`
- Tipo: cierre, integridad, auditoría y ensamblado
- Hash: SHA-256
- Codificación: UTF-8
- Runtime: Python 3.13, biblioteca estándar

## Patrón obligatorio

```text
VoiceShop-Spec-Part-NN.zip
```

`NN` debe estar entre `01` y `34`.

## Contrato

1. El orden de aplicación es ascendente.
2. Una parte ausente bloquea el cierre.
3. Un ZIP corrupto bloquea el cierre.
4. Una ruta insegura bloquea el cierre.
5. Un enlace simbólico bloquea el cierre.
6. Contenido idéntico repetido se registra como duplicado seguro.
7. Contenido diferente con igual ruta se registra como conflicto.
8. Los conflictos nunca se resuelven mediante “último gana”.
9. Los ZIP fuente permanecen inmutables.
10. El reporte final siempre declara `READY` o `BLOCKED`.

## Condición READY

```text
missing_parts = []
corrupt_archives = []
unsafe_entries = []
conflicts = []
```
