======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-04-08-INVENTORY-OBSERVABILITY.md

# OBSERVABILIDAD DEL CONTEXTO DE INVENTARIO

## 1. Objetivo

Este documento define logs, métricas, trazas, alertas, dashboards y
criterios operativos para el contexto de inventario de VoiceShop.

La observabilidad debe permitir:

- verificar disponibilidad;
- detectar sobreventa;
- supervisar reservas;
- supervisar liberaciones;
- medir expiraciones;
- detectar reservas huérfanas;
- medir conflictos;
- investigar UNKNOWN;
- supervisar ajustes;
- detectar balances negativos;
- medir conciliación;
- comparar fuentes;
- verificar SLO;
- auditar acciones sensibles.

## 2. Alcance

Incluye:

- availability;
- balances;
- reservations;
- release;
- expiration;
- commit;
- adjustments;
- versions;
- idempotency;
- locks;
- leases;
- deadlocks;
- movements;
- snapshots;
- events;
- source integration;
- reconciliation;
- errors;
- security;
- costs;
- QA.

No incluye:

- contenido completo de pedidos;
- datos de pago;
- catálogo completo;
- secretos;
- lock keys públicas;
- payloads internos completos.

## 3. Principios

RULE-IOBS-001

Toda operación posee Request ID.

RULE-IOBS-002

Toda operación distribuida posee Correlation ID.

RULE-IOBS-003

Toda escritura registra versiones before y after.

RULE-IOBS-004

Toda escritura registra Idempotency Result.

RULE-IOBS-005

Toda reserva registra Reservation ID protegido.

RULE-IOBS-006

Toda operación UNKNOWN debe ser observable.

RULE-IOBS-007

Toda conciliación debe ser trazable.

RULE-IOBS-008

Toda anomalía negativa debe alertarse.

RULE-IOBS-009

Las métricas deben evitar alta cardinalidad.

RULE-IOBS-010

Los logs deben ser estructurados.

RULE-IOBS-011

Los datos sensibles deben redactarse.

RULE-IOBS-012

Las alertas deben ser accionables.

RULE-IOBS-013

Los errores funcionales se distinguen de errores técnicos.

RULE-IOBS-014

La telemetría crítica no se samplea.

RULE-IOBS-015

La caída de observabilidad no debe corromper inventario.

## 4. Identificadores

- Request ID;
- Correlation ID;
- Causation ID;
- Reservation ID;
- Balance ID;
- Adjustment ID;
- Movement ID;
- Snapshot ID;
- Reconciliation ID;
- Idempotency Key hash;
- Product ID protegido;
- Location ID;
- Inventory Version;
- Event ID.

No usar identificadores únicos como etiquetas de métricas.

## 5. Logs estructurados

```json
{
  "timestamp": "UTC_TIMESTAMP",
  "level": "INFO",
  "service": "inventory-service",
  "component": "stock-reservation",
  "event_name": "stock_reserved",
  "request_id": "UUID",
  "correlation_id": "UUID",
  "tenant_id": "UUID",
  "owner_type": "CART",
  "requested_quantity": 6,
  "reserved_quantity": 6,
  "inventory_version_before": 38,
  "inventory_version_after": 39,
  "idempotency_result": "NEW_EXECUTION",
  "result": "SUCCESS",
  "duration_ms": 23,
  "error_code": null
}
```

## 6. Campos permitidos

- operation;
- component;
- owner type;
- location type;
- quantity bucketed;
- versions;
- movement type;
- consistency;
- freshness;
- result;
- error code;
- attempt count;
- lock wait;
- reconciliation state;
- tenant ID según política.

## 7. Campos prohibidos

- Idempotency Key completa;
- lock key;
- owner token;
- fencing token completo;
- actor PII;
- order details completos;
- payment data;
- stack trace público;
- secretos;
- payload completo del adjustment;
- datos de otro tenant.

## 8. Niveles

INFO

Operación normal o stock insuficiente esperado.

WARN

Conflicto, stale, partial, retry o anomalía recuperable.

ERROR

Fallo técnico.

CRITICAL

Negative balance, cross-tenant, over-reservation, corrupción o ajuste
abusivo.

## 9. Métricas de disponibilidad

- inventory_availability_requests_total;
- inventory_availability_success_total;
- inventory_availability_insufficient_total;
- inventory_availability_unknown_total;
- inventory_availability_partial_total;
- inventory_availability_stale_total;
- inventory_availability_duration_seconds;
- inventory_availability_locations_count;
- inventory_availability_fallback_total;
- inventory_availability_cache_hit_total.

## 10. Métricas de balances

- inventory_balance_reads_total;
- inventory_balance_writes_total;
- inventory_balance_duration_seconds;
- inventory_balance_version_conflict_total;
- inventory_balance_invariant_violation_total;
- inventory_balance_formula_mismatch_total;
- inventory_negative_on_hand_total;
- inventory_negative_available_total;
- inventory_balance_data_integrity_error_total;
- inventory_balance_recalculation_total.

## 11. Métricas de reservas

- stock_reservation_requests_total;
- stock_reservation_success_total;
- stock_reservation_rejected_total;
- stock_reservation_partial_total;
- stock_reservation_unknown_total;
- stock_reservation_duration_seconds;
- stock_reservation_quantity;
- stock_reservation_ttl_seconds;
- stock_reservation_active;
- stock_reservation_age_seconds.

## 12. Métricas de liberación

- stock_release_requests_total;
- stock_release_success_total;
- stock_release_partial_total;
- stock_release_failure_total;
- stock_release_unknown_total;
- stock_release_duration_seconds;
- stock_release_quantity;
- stock_release_already_terminal_total.

## 13. Métricas de expiración

- stock_expiration_candidates_total;
- stock_expiration_success_total;
- stock_expiration_skipped_total;
- stock_expiration_failure_total;
- stock_expiration_unknown_total;
- stock_expiration_lag_seconds;
- stock_expiration_backlog;
- stock_expiration_worker_duration_seconds;
- stock_expiration_lease_conflict_total;
- stock_orphan_reservations_total.

## 14. Métricas de commit

- stock_commit_requests_total;
- stock_commit_success_total;
- stock_commit_expired_total;
- stock_commit_conflict_total;
- stock_commit_unknown_total;
- stock_commit_duration_seconds;
- stock_committed_quantity.

## 15. Métricas de ajustes

- inventory_adjustment_requests_total;
- inventory_adjustment_success_total;
- inventory_adjustment_rejected_total;
- inventory_adjustment_approval_required_total;
- inventory_adjustment_approval_failure_total;
- inventory_adjustment_unknown_total;
- inventory_adjustment_quantity_abs;
- inventory_adjustment_duration_seconds;
- inventory_adjustment_reversal_total;
- inventory_adjustment_limit_exceeded_total.

## 16. Métricas de idempotencia

- inventory_idempotency_records_total;
- inventory_idempotency_hits_total;
- inventory_idempotency_processing_total;
- inventory_idempotency_conflicts_total;
- inventory_idempotency_unknown_total;
- inventory_idempotency_expired_total;
- inventory_idempotency_lookup_duration_seconds.

## 17. Métricas de concurrencia

- inventory_version_conflicts_total;
- inventory_lock_acquisitions_total;
- inventory_lock_wait_seconds;
- inventory_lock_timeout_total;
- inventory_lock_ownership_lost_total;
- inventory_fencing_stale_total;
- inventory_deadlock_total;
- inventory_retry_total;
- inventory_retry_exhausted_total;
- inventory_compare_and_swap_failure_total.

## 18. Métricas de movimientos

- inventory_movements_total;
- inventory_movement_duplicate_total;
- inventory_movement_out_of_order_total;
- inventory_movement_persistence_failure_total;
- inventory_movement_quantity_abs;
- inventory_movement_processing_duration_seconds.

## 19. Métricas de snapshots

- inventory_snapshots_total;
- inventory_snapshot_complete_total;
- inventory_snapshot_partial_total;
- inventory_snapshot_stale_total;
- inventory_snapshot_duration_seconds;
- inventory_snapshot_balance_count.

## 20. Métricas de eventos

- inventory_events_published_total;
- inventory_event_publish_failure_total;
- inventory_events_consumed_total;
- inventory_event_duplicates_total;
- inventory_event_out_of_order_total;
- inventory_outbox_backlog;
- inventory_outbox_oldest_age_seconds;
- inventory_inbox_dedup_total.

## 21. Métricas de fuente externa

- inventory_source_requests_total;
- inventory_source_success_total;
- inventory_source_failure_total;
- inventory_source_timeout_total;
- inventory_source_duration_seconds;
- inventory_source_sequence_gap_total;
- inventory_source_schema_error_total;
- inventory_source_lag_seconds.

## 22. Métricas de conciliación

- inventory_reconciliation_requests_total;
- inventory_reconciliation_success_total;
- inventory_reconciliation_failure_total;
- inventory_reconciliation_manual_total;
- inventory_reconciliation_duration_seconds;
- inventory_unknown_age_seconds;
- inventory_unknown_operations_active.

## 23. Métricas de seguridad

- inventory_cross_tenant_attempt_total;
- inventory_actor_spoofing_total;
- inventory_owner_spoofing_total;
- inventory_approval_replay_total;
- inventory_idempotency_abuse_total;
- inventory_lock_tampering_total;
- inventory_adjustment_abuse_total;
- inventory_security_termination_total.

## 24. Métricas de negocio operativas

- inventory_fill_rate;
- inventory_reservation_success_rate;
- inventory_reservation_expiration_rate;
- inventory_release_rate;
- inventory_adjustment_rate;
- inventory_stockout_rate;
- inventory_unknown_rate;
- inventory_conflict_rate.

Las definiciones deben ser estables.

## 25. Métricas de coste

- inventory_source_cost_estimate;
- inventory_storage_cost_estimate;
- inventory_lock_cost_estimate;
- inventory_event_cost_estimate;
- inventory_reconciliation_cost_estimate;
- inventory_cost_per_reservation_estimate.

## 26. Histogramas

Aplicar a:

- latencia;
- cantidad;
- TTL;
- lag;
- age;
- attempts;
- lock wait;
- backlog;
- batch size;
- reconciliation duration.

## 27. Etiquetas permitidas

- operation;
- owner_type;
- adjustment_type;
- movement_type;
- bucket;
- consistency;
- freshness;
- result;
- error_code;
- source_class;
- location_type;
- risk;
- tenant_tier.

## 28. Etiquetas prohibidas

- Reservation ID;
- Product ID;
- Location ID único;
- Adjustment ID;
- Movement ID;
- actor ID;
- owner ID;
- Idempotency Key;
- lock key;
- fencing token;
- Correlation ID como label.

## 29. Trazas

Spans:

- inventory.availability;
- inventory.balance.load;
- inventory.balance.update;
- inventory.reserve;
- inventory.release;
- inventory.expire;
- inventory.commit;
- inventory.adjust;
- inventory.idempotency.lookup;
- inventory.lock.acquire;
- inventory.lock.release;
- inventory.movement.persist;
- inventory.event.publish;
- inventory.snapshot.create;
- inventory.reconcile;
- inventory.source.call.

## 30. Atributos de span

- operation;
- owner type;
- quantity bucket;
- versions;
- result;
- error code;
- lock wait;
- attempt;
- consistency;
- freshness;
- source class;
- reconciliation state.

## 31. Línea de tiempo de reserva

T0

Command received.

T1

Idempotency checked.

T2

Lock/control acquired.

T3

Balance loaded.

T4

Version validated.

T5

Domain operation completed.

T6

State persisted.

T7

Outbox persisted.

T8

Response returned.

T9

Event published.

## 32. Sampling

100%:

- UNKNOWN;
- negative balances;
- cross-tenant;
- adjustment;
- approval;
- reconciliation failure;
- data integrity;
- deadlock;
- over-reservation prevented;
- outbox failure.

Sampling configurable:

- successful availability reads;
- successful cache hits;
- repetitive low-risk reads.

## 33. Dashboards

### INVENTORY HEALTH

- availability;
- errors;
- latency;
- source;
- SLO.

### STOCK BALANCES

- negative;
- invariants;
- stale;
- formulas;
- versions.

### RESERVATIONS

- active;
- success;
- insufficient;
- TTL;
- expiration;
- orphan.

### CONCURRENCY

- version conflicts;
- lock wait;
- timeout;
- deadlocks;
- retries.

### ADJUSTMENTS

- counts;
- quantities;
- approvals;
- reversals;
- anomalies.

### RECOVERY

- UNKNOWN;
- reconciliation;
- outbox;
- source gaps;
- manual review.

### SECURITY

- tenant;
- spoofing;
- replay;
- tampering;
- abuse.

## 34. Alertas

INVENTORY_SOURCE_UNAVAILABLE

INVENTORY_AVAILABILITY_LATENCY_HIGH

INVENTORY_NEGATIVE_AVAILABLE_DETECTED

INVENTORY_INVARIANT_VIOLATION

INVENTORY_RESERVATION_FAILURE_SPIKE

INVENTORY_EXPIRATION_BACKLOG_HIGH

INVENTORY_ORPHAN_RESERVATIONS_DETECTED

INVENTORY_UNKNOWN_OPERATIONS_HIGH

INVENTORY_RECONCILIATION_FAILURE

INVENTORY_VERSION_CONFLICT_SPIKE

INVENTORY_DEADLOCK_SPIKE

INVENTORY_OUTBOX_BACKLOG_HIGH

INVENTORY_ADJUSTMENT_ANOMALY

INVENTORY_SECURITY_INCIDENT

## 35. Alertas accionables

Cada alerta incluye:

- condición;
- ventana;
- severidad;
- propietario;
- runbook;
- dashboard;
- deduplicación;
- recuperación;
- impacto;
- correlación.

## 36. SLO iniciales

Ejemplos sujetos al NFR final:

- availability strong p95 < 300 ms;
- reservation p95 < 500 ms;
- release p95 < 500 ms;
- expiration lag p95 < 60 s;
- reconciliation bounded;
- negative available = 0 tolerado;
- cross-tenant = 0 tolerado;
- event publication within objective.

## 37. Error budget

Separar:

- insufficient stock;
- validation;
- conflict;
- dependency;
- internal;
- UNKNOWN;
- security.

Insufficient stock no consume error budget técnico.

## 38. Detección de anomalías

Ejemplos:

- ajuste fuera de horario;
- delta grande;
- demasiadas reservas;
- expiración alta;
- actor con múltiples ajustes;
- stock oscilante;
- repeated UNKNOWN;
- lock contention anormal.

## 39. Privacidad

No registrar:

- dirección;
- teléfono;
- email;
- datos de pago;
- contenido completo de pedido.

Usar referencias protegidas.

## 40. Auditoría

Ajustes, approvals, reconciliations y seguridad deben conservar
evidencia según política.

## 41. Degradación de observabilidad

Si telemetría falla:

- preservar transacción;
- buffer crítico;
- no bloquear disponibilidad no crítica;
- priorizar UNKNOWN;
- priorizar seguridad;
- priorizar ajustes;
- alertar al recuperar.

## 42. Pseudocódigo

```text
function emit_inventory_telemetry(signal):

    validate_inventory_telemetry_schema(signal)
    remove_sensitive_identifiers(signal)
    redact_business_payloads(signal)
    remove_high_cardinality_labels(signal)
    attach_trace_context(signal)

    if signal.is_critical:
        export_without_sampling(signal)
    elif should_sample(signal):
        export(signal)

    if export_failed and signal.is_critical:
        persist_critical_inventory_buffer(signal)
```

## 43. Errores de observabilidad

INVENTORY_OBS_SCHEMA_INVALID

INVENTORY_OBS_SENSITIVE_DATA_DETECTED

INVENTORY_OBS_HIGH_CARDINALITY_DETECTED

INVENTORY_OBS_TRACE_CONTEXT_INVALID

INVENTORY_OBS_EXPORT_FAILED

INVENTORY_OBS_BUFFER_FULL

INVENTORY_OBS_ALERT_FAILED

INVENTORY_OBS_CLOCK_SKEW_EXCEEDED

## 44. Eventos

InventoryTelemetryEmitted

InventoryTelemetryDropped

InventoryTelemetryBuffered

InventorySensitiveTelemetryBlocked

InventoryHighCardinalityDetected

InventorySLOViolated

InventoryAlertTriggered

InventoryAlertResolved

InventoryAnomalyDetected

## 45. Casos límite

- high-volume reads;
- conflict storm;
- lock contention;
- deadlock;
- UNKNOWN;
- outbox backlog;
- source down;
- negative balance;
- PII in error;
- adjustment anomaly;
- sampling hides issue;
- telemetry down;
- buffer full;
- clock skew;
- duplicate events;
- alert storm;
- manual reconciliation.

## 46. Criterios de aceptación

AC-IOBS-001

Toda operación posee Request ID.

AC-IOBS-002

Toda escritura registra versiones.

AC-IOBS-003

Toda escritura registra idempotencia.

AC-IOBS-004

Toda operación UNKNOWN es observable.

AC-IOBS-005

Toda conciliación es trazable.

AC-IOBS-006

Los negativos activan alerta.

AC-IOBS-007

Los logs son estructurados.

AC-IOBS-008

Las métricas evitan alta cardinalidad.

AC-IOBS-009

Los datos sensibles se redactan.

AC-IOBS-010

Existen dashboards.

AC-IOBS-011

Existen alertas accionables.

AC-IOBS-012

Se mide coste.

AC-IOBS-013

Se mide seguridad.

AC-IOBS-014

La telemetría crítica no se samplea.

AC-IOBS-015

La caída de telemetría no corrompe inventario.

## 47. Plan mínimo de pruebas

- logs;
- metrics;
- traces;
- availability;
- balances;
- reservations;
- release;
- expiration;
- commit;
- adjustments;
- idempotency;
- locks;
- deadlocks;
- movements;
- snapshots;
- source;
- UNKNOWN;
- reconciliation;
- security;
- redaction;
- cardinality;
- sampling;
- dashboards;
- alerts;
- SLO;
- backend down;
- buffer;
- audit;
- cost.

## 48. Checklist

[ ] Existen logs estructurados.
[ ] Existen métricas de availability.
[ ] Existen métricas de balances.
[ ] Existen métricas de reservas.
[ ] Existen métricas de release.
[ ] Existen métricas de expiration.
[ ] Existen métricas de commit.
[ ] Existen métricas de adjustments.
[ ] Existen métricas de idempotency.
[ ] Existen métricas de concurrency.
[ ] Existen métricas de movements.
[ ] Existen métricas de events.
[ ] Existen métricas de reconciliation.
[ ] Existen métricas de security.
[ ] Existen trazas.
[ ] Existen dashboards.
[ ] Existen alertas.
[ ] Se controla cardinalidad.
[ ] Se protege información.
[ ] Existen pruebas.

======================================================================
FIN DEL DOCUMENTO
======================================================================
