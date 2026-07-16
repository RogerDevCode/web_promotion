======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-04-02-INVENTORY-BALANCES.md

# BALANCES OFICIALES DE INVENTARIO

## 1. Objetivo

Este documento define la representación funcional de cantidades de
inventario por producto y ubicación.

Un Inventory Balance debe permitir conocer:

- existencia física;
- cantidad reservada;
- cantidad comprometida;
- cantidad bloqueada;
- cantidad dañada;
- stock de seguridad;
- cantidad disponible;
- versión;
- fuente;
- vigencia.

El balance es una fuente oficial.

No es texto generado.

## 2. Alcance

Incluye:

- tipos de cantidad;
- fórmula;
- invariantes;
- unidad;
- ubicación;
- Product ID;
- Inventory Version;
- snapshots;
- movimientos;
- consistencia;
- ajustes;
- balances negativos;
- reconciliación;
- errores;
- observabilidad;
- QA.

No incluye:

- búsqueda de producto;
- carrito;
- pedido;
- pago;
- reserva detallada;
- tecnología de base de datos.

## 3. Principios

RULE-IBAL-001

Todo balance pertenece a tenant, Product ID y Location ID.

RULE-IBAL-002

Todo balance posee Inventory Version.

RULE-IBAL-003

Toda cantidad posee unidad.

RULE-IBAL-004

AVAILABLE se deriva mediante fórmula oficial.

RULE-IBAL-005

La LLM no modifica balances.

RULE-IBAL-006

Las cantidades desconocidas no se convierten en cero.

RULE-IBAL-007

Los cambios deben conservar causalidad.

RULE-IBAL-008

Las escrituras deben ser idempotentes.

RULE-IBAL-009

Las escrituras deben validar versión.

RULE-IBAL-010

Un balance inválido debe bloquear operaciones críticas.

RULE-IBAL-011

Los snapshots deben ser consistentes.

RULE-IBAL-012

Los movimientos deben poder conciliarse.

RULE-IBAL-013

Los tenants deben estar aislados.

RULE-IBAL-014

Las cantidades negativas requieren política explícita.

RULE-IBAL-015

Todo cambio debe ser auditable.

## 4. Contrato de balance

```json
{
  "inventory_balance_id": "UUID",
  "tenant_id": "UUID",
  "product_id": "UUID",
  "location_id": "UUID",
  "unit": "UNIT",
  "quantities": {
    "on_hand": 20,
    "reserved": 4,
    "committed": 2,
    "blocked": 1,
    "damaged": 0,
    "in_transit": 5,
    "safety_stock": 1,
    "available": 12
  },
  "inventory_version": 38,
  "source": "OFFICIAL_INVENTORY",
  "measured_at": "UTC_TIMESTAMP",
  "updated_at": "UTC_TIMESTAMP"
}
```

## 5. Tipos de cantidad

ON_HAND

Existencia física reconocida.

RESERVED

Retención temporal.

COMMITTED

Asociada a una obligación confirmada.

BLOCKED

No utilizable.

DAMAGED

Dañada.

IN_TRANSIT

En movimiento.

SAFETY_STOCK

Protegida.

AVAILABLE

Utilizable para nuevas operaciones.

## 6. Fórmula

Una fórmula inicial puede ser:

AVAILABLE =
ON_HAND
- RESERVED
- COMMITTED
- BLOCKED
- DAMAGED
- SAFETY_STOCK

IN_TRANSIT puede excluirse hasta recepción.

La fórmula final debe configurarse y versionarse.

## 7. Formula Version

Debe existir:

inventory_formula_version

Cambios en la fórmula requieren:

- validación;
- migración;
- recalculo;
- publicación;
- observabilidad.

## 8. Invariantes

INV-IBAL-001

reserved >= 0.

INV-IBAL-002

committed >= 0.

INV-IBAL-003

blocked >= 0.

INV-IBAL-004

damaged >= 0.

INV-IBAL-005

safety_stock >= 0.

INV-IBAL-006

available coincide con fórmula.

INV-IBAL-007

unit es compatible con producto.

INV-IBAL-008

tenant coincide con producto y ubicación.

INV-IBAL-009

version aumenta monotónicamente.

INV-IBAL-010

un balance tiene una fuente oficial.

## 9. ON_HAND negativo

Puede estar prohibido.

Si un sistema externo reporta negativo:

- marcar inconsistencia;
- bloquear reserva;
- iniciar conciliación;
- no ocultar.

## 10. AVAILABLE negativo

Por defecto debe evitarse.

Puede existir temporalmente en sistemas heredados.

Debe:

- marcarse;
- alertarse;
- impedir nuevas reservas;
- conciliarse.

## 11. Cantidades decimales

Sólo si la unidad lo permite.

Ejemplos:

- kilogramos;
- litros;
- metros.

Para retail unitario:

- enteros.

El schema debe indicar precision.

## 12. Unidad

Debe provenir de:

- presentación;
- política de inventario;
- unidad base;
- conversión autorizada.

No convertir automáticamente sin tabla oficial.

## 13. Ubicación

Location puede ser:

- tienda;
- bodega;
- dark store;
- vehículo;
- zona;
- ubicación virtual autorizada.

Debe poseer:

- Location ID;
- tenant;
- status;
- timezone;
- capabilities.

## 14. Balance por lote

Puede extenderse con:

- Batch ID;
- expiry date;
- serial;
- lot;
- quality status.

La especificación base debe permitirlo sin mezclar lotes.

## 15. Inventory Version

Debe representar el orden de cambios.

Puede ser:

- entero monotónico;
- opaque version;
- event sequence.

No debe ser generado por el Cliente.

## 16. Expected Version

Toda escritura recibe:

expected_inventory_version

Si no coincide:

INVENTORY_VERSION_CONFLICT

El handler debe recargar y reevaluar.

## 17. Snapshot

Un Inventory Snapshot puede agrupar balances.

```json
{
  "inventory_snapshot_id": "UUID",
  "tenant_id": "UUID",
  "scope": {
    "product_ids": [
      "UUID"
    ],
    "location_ids": [
      "UUID"
    ]
  },
  "snapshot_version": "OPAQUE",
  "balances": [],
  "consistency": "STRONG",
  "created_at": "UTC_TIMESTAMP"
}
```

## 18. Snapshot parcial

Debe marcar:

- missing balances;
- failed locations;
- stale entries;
- consistency reduced.

No debe presentarse como completo.

## 19. Movimientos

Tipos:

RECEIPT

RESERVATION_CREATED

RESERVATION_RELEASED

RESERVATION_COMMITTED

ADJUSTMENT_INCREASE

ADJUSTMENT_DECREASE

BLOCKED

UNBLOCKED

DAMAGED

TRANSFER_OUT

TRANSFER_IN

RECONCILIATION

## 20. Contrato de movimiento

```json
{
  "inventory_movement_id": "UUID",
  "inventory_balance_id": "UUID",
  "movement_type": "RESERVATION_CREATED",
  "quantity_delta": -6,
  "affected_bucket": "AVAILABLE",
  "source_reference": {
    "type": "RESERVATION",
    "id": "UUID"
  },
  "version_before": 38,
  "version_after": 39,
  "occurred_at": "UTC_TIMESTAMP"
}
```

## 21. Doble entrada lógica

Puede registrarse:

- reserved +6;
- available -6.

El sistema debe conservar consistencia entre buckets.

## 22. Recalculo

Puede ejecutarse cuando:

- fórmula cambia;
- conciliación;
- migración;
- error detectado;
- snapshot externo.

Debe ser:

- autorizado;
- idempotente;
- auditable;
- versionado.

## 23. Fuente externa

Si ERP/WMS es fuente:

- mapear tipos;
- validar schema;
- preservar source version;
- detectar duplicados;
- detectar gaps;
- conciliar.

## 24. Consistencia

STRONG

Para reserva.

EVENTUAL

Para visualización general.

SNAPSHOT

Para múltiples balances.

UNKNOWN

No debe usarse en escritura.

## 25. Freshness

Debe calcularse desde:

- measured_at;
- source lag;
- replication lag;
- policy.

## 26. Producto inactivo

El balance puede existir históricamente.

No debe habilitar nuevas reservas si Product status no lo permite.

## 27. Ubicación inactiva

Puede conservar balance.

No debe usarlo para nuevas operaciones sin regla.

## 28. Lecturas

Deben poder filtrar:

- Product ID;
- Location ID;
- status;
- bucket;
- snapshot;
- version.

## 29. Escrituras

Sólo comandos autorizados:

- ReserveStock;
- ReleaseStockReservation;
- CommitStockReservation;
- AdjustInventory;
- ReconcileInventory.

No permitir update genérico.

## 30. Idempotencia

Todo movimiento usa Idempotency Key.

Misma clave, mismo payload:

- mismo resultado.

Misma clave, payload diferente:

- conflicto.

## 31. Atomicidad

Un movimiento que afecta múltiples buckets debe persistirse
atómicamente.

## 32. Outbox

Los eventos deben persistirse con el cambio o mecanismo equivalente.

No publicar evento sin estado.

## 33. Flujo de actualización

1. recibir Command.
2. validar actor.
3. validar tenant.
4. validar producto.
5. validar ubicación.
6. cargar balance.
7. validar expected version.
8. validar invariantes.
9. calcular nuevos buckets.
10. validar fórmula.
11. crear movimiento.
12. incrementar versión.
13. persistir atómicamente.
14. emitir evento.
15. devolver resultado.

## 34. Pseudocódigo

```text
function apply_inventory_movement(command):

    validate_command(command)
    balance = load_inventory_balance(
        command.tenant_id,
        command.product_id,
        command.location_id
    )

    validate_version(
        balance.inventory_version,
        command.expected_inventory_version
    )

    previous = get_idempotent_result(command.idempotency_key)

    if previous.exists:
        return previous

    next_quantities = apply_movement_to_buckets(
        balance.quantities,
        command.movement
    )

    validate_inventory_invariants(next_quantities)
    validate_available_formula(next_quantities)

    next_balance = balance.with_quantities(next_quantities)
    next_balance.inventory_version += 1

    movement = create_inventory_movement(
        command,
        balance,
        next_balance
    )

    persist_balance_movement_and_outbox(
        next_balance,
        movement
    )

    emit(InventoryBalanceChanged)
    return next_balance
```

## 35. Errores

INVENTORY_BALANCE_NOT_FOUND

INVENTORY_BALANCE_TENANT_MISMATCH

INVENTORY_BALANCE_PRODUCT_MISMATCH

INVENTORY_BALANCE_LOCATION_MISMATCH

INVENTORY_BALANCE_UNIT_MISMATCH

INVENTORY_BALANCE_VERSION_CONFLICT

INVENTORY_BALANCE_INVARIANT_VIOLATION

INVENTORY_BALANCE_FORMULA_MISMATCH

INVENTORY_BALANCE_NEGATIVE_NOT_ALLOWED

INVENTORY_BALANCE_SOURCE_INVALID

INVENTORY_BALANCE_SNAPSHOT_INCOMPLETE

INVENTORY_BALANCE_DATA_INTEGRITY_CONFLICT

INVENTORY_BALANCE_WRITE_FAILED

## 36. Eventos

InventoryBalanceCreated

InventoryBalanceChanged

InventoryBalanceInvalidDetected

InventoryNegativeBalanceDetected

InventoryFormulaVersionChanged

InventorySnapshotCreated

InventorySnapshotPartial

InventoryMovementRecorded

InventoryBalanceRecalculated

InventoryReconciliationRequested

## 37. Observabilidad

Métricas:

- inventory_balance_reads_total;
- inventory_balance_writes_total;
- inventory_balance_version_conflict_total;
- inventory_balance_invariant_violation_total;
- inventory_negative_balance_total;
- inventory_snapshot_total;
- inventory_snapshot_partial_total;
- inventory_movement_total;
- inventory_balance_write_duration_seconds;
- inventory_recalculation_total.

Dimensiones:

- movement_type;
- bucket;
- consistency;
- result;
- error_code;
- tenant_tier.

## 38. Auditoría

Registrar:

- Balance ID;
- Product ID protegido;
- Location ID;
- movement;
- bucket;
- delta;
- version before/after;
- actor;
- reason;
- Correlation ID.

## 39. Seguridad

Amenazas:

- tenant mismatch;
- arbitrary bucket update;
- version spoof;
- negative quantity;
- forged movement;
- replay;
- source poisoning.

Controles:

- commands cerrados;
- tenant;
- authorization;
- schemas;
- version;
- idempotency;
- invariants;
- audit.

## 40. Casos límite

- balance nuevo;
- balance inexistente;
- zero;
- exact reserve;
- negative;
- unit mismatch;
- version conflict;
- duplicate movement;
- same key different payload;
- snapshot partial;
- source duplicate;
- source gap;
- product inactive;
- location inactive;
- formula change;
- decimal unit;
- batch;
- reconciliation;
- outbox failure.

## 41. Criterios de aceptación

AC-IBAL-001

Todo balance tiene tenant.

AC-IBAL-002

Todo balance tiene Product ID.

AC-IBAL-003

Todo balance tiene Location ID.

AC-IBAL-004

Todo balance tiene Inventory Version.

AC-IBAL-005

AVAILABLE cumple fórmula.

AC-IBAL-006

Las cantidades desconocidas no son cero.

AC-IBAL-007

Las escrituras usan versión.

AC-IBAL-008

Las escrituras usan idempotencia.

AC-IBAL-009

Los movimientos son atómicos.

AC-IBAL-010

Los invariantes se validan.

AC-IBAL-011

Los negativos se controlan.

AC-IBAL-012

Los snapshots indican completitud.

AC-IBAL-013

La LLM no modifica balances.

AC-IBAL-014

Los eventos se persisten con estado.

AC-IBAL-015

Todo cambio es auditable.

## 42. Plan mínimo de pruebas

- buckets;
- formula;
- unit;
- product;
- location;
- tenant;
- version;
- idempotency;
- duplicate;
- conflict;
- negative;
- decimal;
- snapshot;
- partial;
- movements;
- atomicity;
- source;
- formula version;
- product inactive;
- location inactive;
- reconciliation;
- outbox;
- metrics;
- audit;
- security.

## 43. Checklist

[ ] Existe Balance ID.
[ ] Existe tenant.
[ ] Existe Product ID.
[ ] Existe Location ID.
[ ] Existe unit.
[ ] Existen buckets.
[ ] Existe formula version.
[ ] Existe Inventory Version.
[ ] Existe measured_at.
[ ] Existe source.
[ ] Se validan invariantes.
[ ] Se validan negativos.
[ ] Se valida expected version.
[ ] Se controla idempotencia.
[ ] Se crean movimientos.
[ ] Se persiste atómicamente.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
