======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-04-06-INVENTORY-CONCURRENCY-IDEMPOTENCY.md

# CONCURRENCIA, VERSIONES E IDEMPOTENCIA DE INVENTARIO

## 1. Objetivo

Este documento define los controles funcionales para evitar:

- sobreventa;
- doble reserva;
- doble liberación;
- doble ajuste;
- pérdida de actualizaciones;
- eventos duplicados;
- efectos repetidos por reintentos;
- corrupción por operaciones simultáneas;
- conflictos entre reservas, commits, expiraciones y ajustes.

La tecnología concreta puede variar.

La semántica funcional debe permanecer.

## 2. Alcance

Incluye:

- optimistic concurrency;
- pessimistic locking;
- compare-and-swap;
- expected version;
- Idempotency Key;
- payload hash;
- processing state;
- completed state;
- failed state;
- UNKNOWN;
- retries;
- locks;
- leases;
- deadlocks;
- multi-item;
- sagas;
- outbox;
- inbox;
- deduplicación;
- conciliación;
- errores;
- observabilidad;
- QA.

No incluye:

- implementación de base de datos;
- lenguaje de programación;
- proveedor específico de locks;
- reglas de pago;
- diseño físico de colas.

## 3. Principios

RULE-ICON-001

Toda escritura de inventario usa Idempotency Key.

RULE-ICON-002

Toda escritura usa Expected Version o garantía equivalente.

RULE-ICON-003

La Idempotency Key se vincula con payload hash.

RULE-ICON-004

Misma clave y payload distinto se rechaza.

RULE-ICON-005

Un resultado COMPLETED se reutiliza.

RULE-ICON-006

Un resultado PROCESSING no inicia otra ejecución.

RULE-ICON-007

Un resultado UNKNOWN no se reintenta a ciegas.

RULE-ICON-008

Las versiones se generan en servidor.

RULE-ICON-009

Los locks tienen expiración o mecanismo de recuperación.

RULE-ICON-010

Los eventos se deduplican.

RULE-ICON-011

Los handlers deben tolerar eventos repetidos.

RULE-ICON-012

Los multi-item deben definir atomicidad.

RULE-ICON-013

Los deadlocks deben manejarse.

RULE-ICON-014

La conciliación debe poder reconstruir el resultado.

RULE-ICON-015

Todo conflicto debe ser observable.

## 4. Operaciones cubiertas

ReserveStock

ChangeStockReservation

ReleaseStockReservation

CommitStockReservation

AdjustInventory

ReconcileInventory

ExpireStockReservation

TransferStock

ReceiveStock

## 5. Expected Version

Cada balance posee:

inventory_version

Cada reserva posee:

reservation_version

Cada ajuste posee:

adjustment_version o estado inmutable.

El Command puede requerir una o varias versiones.

## 6. Validación de versión

```text
if current_version != expected_version:
    reject VERSION_CONFLICT
```

No sobrescribir silenciosamente.

## 7. Versiones múltiples

Una operación puede tocar:

- Balance A;
- Balance B;
- Reservation;
- Owner;
- Order.

Debe declarar el conjunto esperado.

## 8. Token de versión

Puede ser:

- entero;
- UUID;
- opaque ETag;
- event sequence;
- hash.

No debe ser calculado por Cliente.

## 9. Idempotency Record

```json
{
  "idempotency_key_hash": "HASH",
  "tenant_id": "UUID",
  "operation": "ReserveStock",
  "payload_hash": "HASH",
  "status": "COMPLETED",
  "result_reference": "UUID",
  "error_code": null,
  "created_at": "UTC_TIMESTAMP",
  "updated_at": "UTC_TIMESTAMP",
  "expires_at": "UTC_TIMESTAMP"
}
```

## 10. Estados de idempotencia

RECEIVED

PROCESSING

COMPLETED

FAILED_RETRYABLE

FAILED_FINAL

UNKNOWN

EXPIRED

## 11. RECEIVED

La clave fue registrada.

La operación todavía no comenzó.

## 12. PROCESSING

Una ejecución posee ownership o lease.

Reintento concurrente:

- devuelve PROCESSING;
- espera dentro de política;
- no ejecuta otra vez.

## 13. COMPLETED

Se devuelve resultado almacenado.

No se ejecuta.

## 14. FAILED_RETRYABLE

Puede reintentarse con la misma clave.

Debe conservar attempts.

## 15. FAILED_FINAL

Devuelve mismo error mientras la clave esté vigente.

## 16. UNKNOWN

No se sabe si el efecto ocurrió.

Debe:

- bloquear repetición ciega;
- conciliar;
- consultar movimientos;
- consultar dependencia;
- producir alerta si excede tiempo.

## 17. Payload hash

Debe cubrir campos semánticos:

- tenant;
- operation;
- owner;
- Product ID;
- Location ID;
- quantity;
- policy;
- reason;
- expected versions;
- relevant references.

No debe incluir campos volátiles innecesarios.

## 18. Conflicto de clave

Misma Idempotency Key.

Payload hash diferente.

Resultado:

IDEMPOTENCY_PAYLOAD_CONFLICT

No ejecutar.

## 19. Scope de clave

La clave debe estar scoped por:

- tenant;
- operación;
- actor o owner cuando corresponda.

Evitar colisiones globales.

## 20. Retención

Debe cubrir el periodo máximo de reintentos y duplicados.

Operaciones críticas pueden requerir retención mayor.

No eliminar mientras exista riesgo de repetición.

## 21. Locks

Tipos funcionales:

BALANCE_LOCK

RESERVATION_LOCK

OWNER_LOCK

BATCH_LOCK

EXPIRATION_LEASE

RECONCILIATION_LOCK

## 22. Lock key

Debe incluir tenant.

Ejemplo conceptual:

inventory:{tenant}:{location}:{product}

No exponer la key interna al Cliente.

## 23. Lock TTL

Todo lock distribuido debe tener:

- owner token;
- TTL;
- renovación;
- liberación segura;
- fencing token cuando corresponda.

## 24. Fencing token

Protege contra un owner antiguo que recupera actividad después de
perder el lock.

El almacenamiento debe rechazar fencing token antiguo.

## 25. Lock acquisition

Debe configurar:

- timeout;
- retry;
- jitter;
- priority;
- fairness cuando aplique.

No esperar indefinidamente.

## 26. Liberación de lock

Sólo el owner token puede liberar.

Un proceso no debe liberar lock ajeno.

## 27. Optimistic concurrency

Preferida cuando:

- conflictos son poco frecuentes;
- operaciones son cortas;
- recarga es barata.

## 28. Pessimistic concurrency

Puede usarse cuando:

- stock escaso;
- conflicto alto;
- multi-item;
- invariantes complejos.

## 29. Compare-and-swap

Actualiza cuando version coincide.

Debe verificar filas afectadas o resultado equivalente.

## 30. Escenario de sobreventa

Stock disponible:

6.

Dos comandos reservan 6.

Ambos leen version 10.

Comando A actualiza a version 11.

Comando B debe fallar por versión.

No puede dejar available -6.

## 31. Escenario de doble liberación

Reserva 6.

Dos comandos liberan.

Sólo uno cambia ACTIVE → RELEASED.

El otro devuelve estado terminal.

Available aumenta una sola vez.

## 32. Carrera reserve vs adjust

Reserva y ajuste compiten.

Ambos usan balance version.

El perdedor recarga y reevaluá.

## 33. Carrera expire vs commit

Sólo una transición gana.

Version de Reservation y Balance deben participar.

## 34. Carrera release vs change quantity

Debe definirse orden por versión.

No usar last-write-wins.

## 35. Multi-item

Modelos:

ATOMIC_TRANSACTION

Todas las líneas en una transacción.

ORDERED_LOCKS

Locks ordenados.

SAGA

Pasos con compensaciones.

PARTIAL_RESULT

Permitido explícitamente.

## 36. Orden de locks

Para evitar deadlock:

ordenar por:

tenant
+ location
+ product
+ reservation

Todos los procesos usan el mismo orden.

## 37. Deadlock

Si se detecta:

- abortar una operación;
- liberar recursos;
- marcar retryable;
- reintentar con misma Idempotency Key;
- aplicar backoff.

## 38. Sagas

Cada paso debe poseer:

- Step ID;
- Idempotency Key;
- state;
- compensation;
- version;
- result.

## 39. Compensación

No es rollback mágico.

Debe ser una operación de dominio:

- ReleaseStockReservation;
- ReverseAdjustment;
- RestoreOwnerState;
- CancelReservation.

## 40. Outbox

El cambio de estado y el evento deben persistirse juntos.

El publisher puede reintentar.

## 41. Inbox

El consumidor debe registrar Event ID o dedup key.

Evento duplicado:

- no repite efecto;
- puede devolver ACK.

## 42. Event ordering

Debe manejar:

- secuencia por aggregate;
- version;
- causation;
- eventos tardíos.

Evento con versión vieja:

- ignore;
- audit;
- o reconcile.

## 43. Eventos fuera de orden

Ejemplo:

StockReservationReleased version 5.

Luego llega StockReserved version 4.

No reactivar.

## 44. Reintentos

Política por error:

VERSION_CONFLICT

Recargar y reevaluar.

LOCK_TIMEOUT

Reintento limitado.

DEPENDENCY_TIMEOUT

Consultar idempotencia.

VALIDATION

No reintentar igual.

AUTHORIZATION

No reintentar igual.

UNKNOWN

Conciliar.

## 45. Backoff

Debe usar:

- límite;
- jitter;
- máximo;
- attempts;
- total timeout.

## 46. Conciliación

Fuentes:

- Idempotency Record;
- Balance;
- Reservation;
- Movement;
- Outbox;
- Inbox;
- proveedor externo;
- owner.

Debe producir:

- COMPLETED;
- FAILED_FINAL;
- RETRYABLE;
- MANUAL_REVIEW.

## 47. Reconciliation Record

```json
{
  "reconciliation_id": "UUID",
  "tenant_id": "UUID",
  "operation": "ReserveStock",
  "idempotency_key_hash": "HASH",
  "status_before": "UNKNOWN",
  "status_after": "COMPLETED",
  "evidence": [
    "MOVEMENT_FOUND",
    "RESERVATION_ACTIVE"
  ],
  "resolved_at": "UTC_TIMESTAMP"
}
```

## 48. Recovery worker

Debe buscar:

- PROCESSING antiguo;
- UNKNOWN;
- locks huérfanos;
- outbox pendiente;
- reservas inconsistentes;
- movimientos sin resultado.

## 49. Invariantes bajo concurrencia

- available no se vuelve negativo;
- reserved coincide con reservas activas bajo política;
- committed coincide con obligaciones;
- cada movimiento se aplica una vez;
- versions son monotónicas;
- tenant no se mezcla.

## 50. Flujo de ejecución idempotente

1. recibir Command.
2. validar key.
3. calcular payload hash.
4. insertar/leer record.
5. resolver conflicto.
6. reclamar PROCESSING.
7. adquirir controles.
8. cargar aggregates.
9. validar versions.
10. ejecutar dominio.
11. persistir estado + outbox.
12. marcar COMPLETED.
13. liberar locks.
14. devolver resultado.

## 51. Pseudocódigo

```text
function execute_inventory_command_idempotently(command):

    validate_idempotency_key(command.idempotency_key)

    payload_hash = hash_semantic_payload(command)

    record = load_or_create_idempotency_record(
        tenant=command.tenant_id,
        operation=command.operation,
        key=command.idempotency_key,
        payload_hash=payload_hash
    )

    if record.payload_hash != payload_hash:
        reject(IDEMPOTENCY_PAYLOAD_CONFLICT)

    if record.status == COMPLETED:
        return load_result(record.result_reference)

    if record.status == PROCESSING:
        return processing_response(record)

    if record.status == UNKNOWN:
        return reconcile_before_retry(record, command)

    claim = claim_processing(record)

    if not claim.acquired:
        return processing_response(record)

    try:
        controls = acquire_required_concurrency_controls(command)
        aggregates = load_required_aggregates(command)
        validate_expected_versions(command, aggregates)

        result = execute_inventory_domain_operation(
            command,
            aggregates
        )

        persist_result_state_outbox_and_idempotency(
            result,
            status=COMPLETED
        )

        return result

    except RetryableError as error:
        mark_idempotency_retryable(record, error)
        raise

    except UnknownOutcomeError as error:
        mark_idempotency_unknown(record, error)
        return unknown_result(record)

    finally:
        release_owned_controls(controls)
```

## 52. Errores

INVENTORY_VERSION_CONFLICT

INVENTORY_RESERVATION_VERSION_CONFLICT

INVENTORY_IDEMPOTENCY_KEY_INVALID

INVENTORY_IDEMPOTENCY_PAYLOAD_CONFLICT

INVENTORY_IDEMPOTENCY_RECORD_UNAVAILABLE

INVENTORY_OPERATION_ALREADY_PROCESSING

INVENTORY_OPERATION_RESULT_UNKNOWN

INVENTORY_LOCK_TIMEOUT

INVENTORY_LOCK_OWNERSHIP_LOST

INVENTORY_FENCING_TOKEN_STALE

INVENTORY_DEADLOCK_DETECTED

INVENTORY_CONCURRENCY_RETRY_EXHAUSTED

INVENTORY_EVENT_DUPLICATE

INVENTORY_EVENT_OUT_OF_ORDER

INVENTORY_OUTBOX_PERSISTENCE_FAILED

INVENTORY_INBOX_PERSISTENCE_FAILED

INVENTORY_RECONCILIATION_REQUIRED

INVENTORY_RECONCILIATION_FAILED

## 53. Eventos

InventoryConcurrencyControlRequested

InventoryLockAcquired

InventoryLockReleased

InventoryLockTimeout

InventoryVersionConflictDetected

InventoryIdempotencyHit

InventoryIdempotencyConflict

InventoryOperationMarkedUnknown

InventoryDeadlockDetected

InventoryDuplicateEventIgnored

InventoryOutOfOrderEventDetected

InventoryReconciliationStarted

InventoryReconciliationCompleted

InventoryReconciliationFailed

## 54. Observabilidad

Métricas:

- inventory_version_conflicts_total;
- inventory_idempotency_hits_total;
- inventory_idempotency_conflicts_total;
- inventory_operations_processing_total;
- inventory_operations_unknown_total;
- inventory_lock_wait_seconds;
- inventory_lock_timeout_total;
- inventory_deadlock_total;
- inventory_retry_total;
- inventory_retry_exhausted_total;
- inventory_duplicate_events_total;
- inventory_out_of_order_events_total;
- inventory_reconciliation_total;
- inventory_reconciliation_failure_total.

Dimensiones:

- operation;
- control_type;
- result;
- error_code;
- retry_attempt_bucket;
- tenant_tier.

## 55. Auditoría

Registrar:

- operation;
- tenant;
- actor/service;
- Idempotency Key hash;
- payload hash;
- expected/current versions;
- lock reference protegida;
- fencing token bucket;
- retry count;
- outcome;
- reconciliation;
- Correlation ID.

## 56. Seguridad

Amenazas:

- key reuse malicious;
- payload collision attempt;
- lock theft;
- tenant omitted from key;
- stale fencing token;
- event replay;
- version spoof;
- reconciliation tampering.

Controles:

- tenant-scoped keys;
- cryptographic hashes;
- owner tokens;
- fencing;
- authorization;
- immutable audit;
- dedup;
- limits.

## 57. Casos límite

- same key same payload;
- same key different payload;
- processing duplicate;
- completed duplicate;
- retryable failure;
- unknown;
- version conflict;
- two reserves;
- double release;
- expire vs commit;
- adjust vs reserve;
- lock timeout;
- lock owner dies;
- fencing stale;
- deadlock;
- multi-item;
- saga compensation;
- outbox duplicate;
- event out-of-order;
- reconciliation;
- retention expiry.

## 58. Criterios de aceptación

AC-ICON-001

Toda escritura usa Idempotency Key.

AC-ICON-002

Toda escritura usa versión o garantía equivalente.

AC-ICON-003

La key se vincula con payload hash.

AC-ICON-004

Payload diferente se rechaza.

AC-ICON-005

COMPLETED se reutiliza.

AC-ICON-006

PROCESSING no duplica ejecución.

AC-ICON-007

UNKNOWN se concilia.

AC-ICON-008

Las versiones las genera el servidor.

AC-ICON-009

Los locks tienen recuperación.

AC-ICON-010

Los fencing tokens viejos se rechazan.

AC-ICON-011

Los eventos duplicados no repiten efectos.

AC-ICON-012

Los eventos fuera de orden no revierten estado.

AC-ICON-013

Los deadlocks se manejan.

AC-ICON-014

Los multi-item definen atomicidad.

AC-ICON-015

Todo conflicto es observable.

## 59. Plan mínimo de pruebas

- idempotency key;
- payload hash;
- same payload;
- different payload;
- processing;
- completed;
- failed retryable;
- failed final;
- unknown;
- version;
- reserve race;
- release race;
- expire commit;
- adjust reserve;
- lock;
- TTL;
- owner loss;
- fencing;
- deadlock;
- ordered locks;
- saga;
- compensation;
- outbox;
- inbox;
- duplicate;
- out-of-order;
- reconciliation;
- security;
- metrics;
- audit.

## 60. Checklist

[ ] Existe Idempotency Key.
[ ] Existe payload hash.
[ ] Existe scope de tenant.
[ ] Existe Idempotency Record.
[ ] Existen estados.
[ ] Existe expected version.
[ ] Existen server versions.
[ ] Existen locks.
[ ] Existe owner token.
[ ] Existe TTL.
[ ] Existe fencing.
[ ] Existe deadlock policy.
[ ] Existe retry policy.
[ ] Existe UNKNOWN policy.
[ ] Existe conciliación.
[ ] Existe outbox.
[ ] Existe inbox.
[ ] Existe deduplicación.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
