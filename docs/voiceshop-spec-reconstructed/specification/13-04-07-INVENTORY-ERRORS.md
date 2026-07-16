======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-04-07-INVENTORY-ERRORS.md

# CATÁLOGO DE ERRORES FUNCIONALES DE INVENTARIO

## 1. Objetivo

Este documento define los errores funcionales estables del contexto de
inventario de VoiceShop.

Cada error debe permitir:

- identificar la condición;
- decidir si es reintentable;
- construir una respuesta segura;
- activar conciliación;
- registrar telemetría;
- auditar operaciones sensibles;
- mapear el resultado a voz, texto y APIs internas;
- evitar repetir operaciones inciertas.

## 2. Principios

RULE-IERR-001

Todo error posee código estable.

RULE-IERR-002

Todo error posee categoría.

RULE-IERR-003

Todo error indica retryable.

RULE-IERR-004

Todo error indica si requiere conciliación.

RULE-IERR-005

Todo error posee mensaje seguro.

RULE-IERR-006

Los detalles internos no se exponen al Cliente.

RULE-IERR-007

Los errores de tenant no revelan recursos ajenos.

RULE-IERR-008

UNKNOWN no se representa como fracaso definitivo.

RULE-IERR-009

Los errores esperados se distinguen de errores técnicos.

RULE-IERR-010

Todo error conserva Correlation ID.

RULE-IERR-011

Los códigos no dependen del proveedor.

RULE-IERR-012

Los detalles cumplen schema.

RULE-IERR-013

No se exponen locks, tablas o stack traces.

RULE-IERR-014

Los errores sensibles se auditan.

RULE-IERR-015

Todo código posee pruebas.

## 3. Categorías

VALIDATION

NOT_FOUND

STATE

INSUFFICIENT

AUTHENTICATION

AUTHORIZATION

TENANT

VERSION

CONFLICT

IDEMPOTENCY

CONCURRENCY

DEPENDENCY

TIMEOUT

UNKNOWN

DATA_INTEGRITY

SECURITY

INTERNAL

## 4. Contrato de error

```json
{
  "error_id": "UUID",
  "code": "INVENTORY_INSUFFICIENT_STOCK",
  "category": "INSUFFICIENT",
  "message_code": "inventory.insufficient_stock",
  "safe_message": "No hay suficiente stock disponible.",
  "retryable": "CONDITIONAL",
  "reconciliation_required": false,
  "severity": "INFO",
  "details": {
    "requested_quantity": 6,
    "available_quantity": 4
  },
  "request_id": "UUID",
  "correlation_id": "UUID",
  "occurred_at": "UTC_TIMESTAMP",
  "error_schema_version": 1
}
```

## 5. Severidad

INFO

Resultado funcional esperado.

WARNING

Degradación, conflicto o condición recuperable.

ERROR

Fallo técnico.

CRITICAL

Seguridad, corrupción, sobreventa o inconsistencia grave.

## 6. Retryable

TRUE

Puede reintentarse igual bajo la misma Idempotency Key.

FALSE

Repetir igual no resuelve.

CONDITIONAL

Requiere recargar versión, cambiar cantidad, esperar, autenticar,
autorizar o conciliar.

## 7. Conciliación

NONE

No requerida.

RECOMMENDED

Útil para diagnóstico.

REQUIRED

No repetir hasta resolver.

MANUAL

Requiere revisión humana.

## 8. Errores generales

### INVENTORY_UNAVAILABLE

Categoría:

DEPENDENCY

Retryable:

TRUE limitado.

Mensaje seguro:

"No pude consultar el inventario en este momento."

### INVENTORY_TIMEOUT

Categoría:

TIMEOUT.

Una lectura puede reintentarse.

Una escritura puede quedar UNKNOWN.

### INVENTORY_INTERNAL_ERROR

Mensaje público genérico.

Debe registrar componente y Correlation ID.

### INVENTORY_RATE_LIMITED

Puede incluir retry_after.

## 9. Errores de tenant

INVENTORY_TENANT_NOT_FOUND

INVENTORY_TENANT_INACTIVE

INVENTORY_TENANT_MISMATCH

INVENTORY_CROSS_TENANT_REFERENCE

INVENTORY_LOCATION_TENANT_MISMATCH

INVENTORY_PRODUCT_TENANT_MISMATCH

No revelar existencia de recursos ajenos.

## 10. Errores de producto

INVENTORY_PRODUCT_NOT_FOUND

INVENTORY_PRODUCT_INACTIVE

INVENTORY_PRODUCT_RESTRICTED

INVENTORY_PRODUCT_UNIT_MISMATCH

INVENTORY_PRODUCT_PRESENTATION_INVALID

INVENTORY_PRODUCT_CATALOG_UNAVAILABLE

## 11. Errores de ubicación

INVENTORY_LOCATION_NOT_FOUND

INVENTORY_LOCATION_INACTIVE

INVENTORY_LOCATION_RESTRICTED

INVENTORY_LOCATION_CLOSED

INVENTORY_LOCATION_CAPABILITY_MISMATCH

INVENTORY_LOCATION_SCOPE_INVALID

## 12. Errores de disponibilidad

INVENTORY_AVAILABILITY_REQUEST_INVALID

INVENTORY_AVAILABILITY_QUANTITY_INVALID

INVENTORY_AVAILABILITY_CONSISTENCY_UNSUPPORTED

INVENTORY_AVAILABILITY_STALE

INVENTORY_AVAILABILITY_PARTIAL

INVENTORY_AVAILABILITY_UNKNOWN

INVENTORY_AVAILABILITY_SOURCE_UNAVAILABLE

INVENTORY_AVAILABILITY_TIMEOUT

INVENTORY_AVAILABILITY_RESTRICTED

INVENTORY_INSUFFICIENT_STOCK

## 13. INVENTORY_AVAILABILITY_UNKNOWN

Categoría:

UNKNOWN.

Retryable:

CONDITIONAL.

Conciliación:

RECOMMENDED o REQUIRED según operación.

Mensaje:

"No pude confirmar la disponibilidad."

No responder cero.

## 14. Errores de balance

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

## 15. Errores de cantidad

INVENTORY_QUANTITY_REQUIRED

INVENTORY_QUANTITY_INVALID

INVENTORY_QUANTITY_ZERO_NOT_ALLOWED

INVENTORY_QUANTITY_NEGATIVE_NOT_ALLOWED

INVENTORY_QUANTITY_PRECISION_INVALID

INVENTORY_QUANTITY_UNIT_MISMATCH

INVENTORY_QUANTITY_LIMIT_EXCEEDED

INVENTORY_QUANTITY_EXCEEDS_AVAILABLE

## 16. Errores de reserva

STOCK_RESERVATION_REQUEST_INVALID

STOCK_RESERVATION_NOT_FOUND

STOCK_RESERVATION_OWNER_NOT_FOUND

STOCK_RESERVATION_OWNER_STATE_INVALID

STOCK_RESERVATION_NOT_AUTHORIZED

STOCK_RESERVATION_PRODUCT_NOT_FOUND

STOCK_RESERVATION_LOCATION_NOT_FOUND

STOCK_RESERVATION_TENANT_MISMATCH

STOCK_RESERVATION_QUANTITY_INVALID

STOCK_RESERVATION_TTL_INVALID

STOCK_RESERVATION_POLICY_NOT_ALLOWED

STOCK_RESERVATION_INSUFFICIENT_STOCK

STOCK_RESERVATION_VERSION_CONFLICT

STOCK_RESERVATION_IDEMPOTENCY_CONFLICT

STOCK_RESERVATION_ATOMICITY_FAILED

STOCK_RESERVATION_UNKNOWN

STOCK_RESERVATION_DEPENDENCY_UNAVAILABLE

## 17. Errores de estado de reserva

STOCK_RESERVATION_STATE_INVALID

STOCK_RESERVATION_ALREADY_ACTIVE

STOCK_RESERVATION_ALREADY_RELEASED

STOCK_RESERVATION_ALREADY_EXPIRED

STOCK_RESERVATION_ALREADY_COMMITTED

STOCK_RESERVATION_EXPIRED

STOCK_RESERVATION_CANCELLED

STOCK_RESERVATION_FAILED

STOCK_RESERVATION_RESULT_UNKNOWN

## 18. Errores de liberación

STOCK_RELEASE_REQUEST_INVALID

STOCK_RELEASE_RESERVATION_NOT_FOUND

STOCK_RELEASE_TENANT_MISMATCH

STOCK_RELEASE_OWNER_MISMATCH

STOCK_RELEASE_NOT_AUTHORIZED

STOCK_RELEASE_STATE_INVALID

STOCK_RELEASE_QUANTITY_INVALID

STOCK_RELEASE_QUANTITY_EXCEEDED

STOCK_RELEASE_RESERVATION_VERSION_CONFLICT

STOCK_RELEASE_INVENTORY_VERSION_CONFLICT

STOCK_RELEASE_IDEMPOTENCY_CONFLICT

STOCK_RELEASE_ALREADY_RELEASED

STOCK_RELEASE_ALREADY_EXPIRED

STOCK_RELEASE_COMMITTED_NOT_ALLOWED

STOCK_RELEASE_ATOMICITY_FAILED

STOCK_RELEASE_UNKNOWN

## 19. Errores de expiración

STOCK_EXPIRATION_RESERVATION_NOT_FOUND

STOCK_EXPIRATION_NOT_DUE

STOCK_EXPIRATION_ALREADY_PROCESSED

STOCK_EXPIRATION_LEASE_UNAVAILABLE

STOCK_EXPIRATION_LEASE_LOST

STOCK_EXPIRATION_VERSION_CONFLICT

STOCK_EXPIRATION_WORKER_FAILED

STOCK_EXPIRATION_RESULT_UNKNOWN

STOCK_EXPIRATION_BACKLOG_EXCEEDED

## 20. Errores de commit

STOCK_COMMIT_REQUEST_INVALID

STOCK_COMMIT_RESERVATION_NOT_FOUND

STOCK_COMMIT_RESERVATION_EXPIRED

STOCK_COMMIT_STATE_INVALID

STOCK_COMMIT_OWNER_MISMATCH

STOCK_COMMIT_ORDER_MISMATCH

STOCK_COMMIT_VERSION_CONFLICT

STOCK_COMMIT_IDEMPOTENCY_CONFLICT

STOCK_COMMIT_ATOMICITY_FAILED

STOCK_COMMIT_UNKNOWN

## 21. Errores de ajuste

INVENTORY_ADJUSTMENT_REQUEST_INVALID

INVENTORY_ADJUSTMENT_NOT_AUTHENTICATED

INVENTORY_ADJUSTMENT_NOT_AUTHORIZED

INVENTORY_ADJUSTMENT_TENANT_MISMATCH

INVENTORY_ADJUSTMENT_PRODUCT_NOT_FOUND

INVENTORY_ADJUSTMENT_LOCATION_NOT_FOUND

INVENTORY_ADJUSTMENT_TYPE_INVALID

INVENTORY_ADJUSTMENT_BUCKET_INVALID

INVENTORY_ADJUSTMENT_OPERATION_INVALID

INVENTORY_ADJUSTMENT_QUANTITY_INVALID

INVENTORY_ADJUSTMENT_REASON_REQUIRED

INVENTORY_ADJUSTMENT_EVIDENCE_REQUIRED

INVENTORY_ADJUSTMENT_LIMIT_EXCEEDED

INVENTORY_ADJUSTMENT_APPROVAL_REQUIRED

INVENTORY_ADJUSTMENT_APPROVAL_INVALID

INVENTORY_ADJUSTMENT_VERSION_CONFLICT

INVENTORY_ADJUSTMENT_IDEMPOTENCY_CONFLICT

INVENTORY_ADJUSTMENT_INVARIANT_VIOLATION

INVENTORY_ADJUSTMENT_REVERSAL_INVALID

INVENTORY_ADJUSTMENT_UNKNOWN

INVENTORY_ADJUSTMENT_ATOMICITY_FAILED

## 22. Errores de aprobación

INVENTORY_APPROVAL_NOT_FOUND

INVENTORY_APPROVAL_EXPIRED

INVENTORY_APPROVAL_REVOKED

INVENTORY_APPROVAL_SCOPE_MISMATCH

INVENTORY_APPROVAL_PAYLOAD_MISMATCH

INVENTORY_APPROVAL_ALREADY_CONSUMED

INVENTORY_APPROVAL_APPROVER_INVALID

## 23. Errores de versión

INVENTORY_VERSION_REQUIRED

INVENTORY_VERSION_INVALID

INVENTORY_VERSION_CONFLICT

INVENTORY_VERSION_STALE

INVENTORY_RESERVATION_VERSION_CONFLICT

INVENTORY_OWNER_VERSION_CONFLICT

INVENTORY_SNAPSHOT_VERSION_MISMATCH

## 24. Errores de idempotencia

INVENTORY_IDEMPOTENCY_KEY_REQUIRED

INVENTORY_IDEMPOTENCY_KEY_INVALID

INVENTORY_IDEMPOTENCY_PAYLOAD_CONFLICT

INVENTORY_IDEMPOTENCY_RECORD_UNAVAILABLE

INVENTORY_IDEMPOTENCY_RECORD_EXPIRED

INVENTORY_OPERATION_ALREADY_PROCESSING

INVENTORY_OPERATION_ALREADY_COMPLETED

INVENTORY_OPERATION_RESULT_UNKNOWN

## 25. Errores de concurrencia

INVENTORY_LOCK_TIMEOUT

INVENTORY_LOCK_UNAVAILABLE

INVENTORY_LOCK_OWNERSHIP_LOST

INVENTORY_LOCK_LEASE_EXPIRED

INVENTORY_FENCING_TOKEN_STALE

INVENTORY_COMPARE_AND_SWAP_FAILED

INVENTORY_DEADLOCK_DETECTED

INVENTORY_CONCURRENCY_RETRY_EXHAUSTED

INVENTORY_CONCURRENT_STATE_CHANGE

## 26. Errores de multi-item

INVENTORY_BATCH_REQUEST_INVALID

INVENTORY_BATCH_SIZE_EXCEEDED

INVENTORY_BATCH_PARTIAL_FAILURE

INVENTORY_BATCH_ATOMICITY_FAILED

INVENTORY_BATCH_COMPENSATION_FAILED

INVENTORY_BATCH_DEADLOCK

INVENTORY_BATCH_RESULT_UNKNOWN

## 27. Errores de movimientos

INVENTORY_MOVEMENT_INVALID

INVENTORY_MOVEMENT_DUPLICATE

INVENTORY_MOVEMENT_OUT_OF_ORDER

INVENTORY_MOVEMENT_VERSION_MISMATCH

INVENTORY_MOVEMENT_SOURCE_INVALID

INVENTORY_MOVEMENT_PERSISTENCE_FAILED

INVENTORY_MOVEMENT_RECONCILIATION_REQUIRED

## 28. Errores de eventos

INVENTORY_EVENT_SCHEMA_INVALID

INVENTORY_EVENT_DUPLICATE

INVENTORY_EVENT_OUT_OF_ORDER

INVENTORY_EVENT_AGGREGATE_MISMATCH

INVENTORY_EVENT_VERSION_MISMATCH

INVENTORY_EVENT_PUBLISH_FAILED

INVENTORY_EVENT_CONSUMER_FAILED

INVENTORY_OUTBOX_PERSISTENCE_FAILED

INVENTORY_INBOX_PERSISTENCE_FAILED

## 29. Errores de snapshot

INVENTORY_SNAPSHOT_NOT_FOUND

INVENTORY_SNAPSHOT_INCOMPLETE

INVENTORY_SNAPSHOT_STALE

INVENTORY_SNAPSHOT_SCOPE_INVALID

INVENTORY_SNAPSHOT_TENANT_MISMATCH

INVENTORY_SNAPSHOT_SOURCE_UNAVAILABLE

INVENTORY_SNAPSHOT_CONSISTENCY_FAILED

## 30. Errores de conciliación

INVENTORY_RECONCILIATION_REQUIRED

INVENTORY_RECONCILIATION_NOT_AUTHORIZED

INVENTORY_RECONCILIATION_EVIDENCE_INCOMPLETE

INVENTORY_RECONCILIATION_STATE_AMBIGUOUS

INVENTORY_RECONCILIATION_CONFLICT

INVENTORY_RECONCILIATION_FAILED

INVENTORY_RECONCILIATION_MANUAL_REVIEW_REQUIRED

## 31. Errores de fuente externa

INVENTORY_SOURCE_UNAVAILABLE

INVENTORY_SOURCE_TIMEOUT

INVENTORY_SOURCE_SCHEMA_INVALID

INVENTORY_SOURCE_DUPLICATE

INVENTORY_SOURCE_SEQUENCE_GAP

INVENTORY_SOURCE_VERSION_MISMATCH

INVENTORY_SOURCE_RESULT_UNKNOWN

INVENTORY_SOURCE_AUTHENTICATION_FAILED

INVENTORY_SOURCE_AUTHORIZATION_FAILED

## 32. Errores de seguridad

INVENTORY_CROSS_TENANT_ATTEMPT

INVENTORY_CROSS_LOCATION_ATTEMPT

INVENTORY_ACTOR_SPOOFING_DETECTED

INVENTORY_OWNER_SPOOFING_DETECTED

INVENTORY_VERSION_SPOOFING_DETECTED

INVENTORY_IDEMPOTENCY_ABUSE_DETECTED

INVENTORY_LOCK_TAMPERING_DETECTED

INVENTORY_APPROVAL_REPLAY_DETECTED

INVENTORY_ADJUSTMENT_ABUSE_DETECTED

INVENTORY_ENUMERATION_LIMIT

## 33. Mapping por canal

### Voz

Mensaje breve y seguro.

Ejemplo:

INVENTORY_INSUFFICIENT_STOCK

"No hay seis unidades disponibles. Quedan cuatro."

### Texto

Puede incluir:

- cantidad;
- ubicación;
- acción sugerida;
- botón;
- aviso.

### API interna

Incluye contrato completo y Correlation ID.

## 34. Mensajes prohibidos

No exponer:

- SQL;
- tabla;
- lock key;
- fencing token;
- stack trace;
- hostname;
- secreto;
- token;
- datos de otro tenant;
- movimiento interno completo.

## 35. Detalles públicos permitidos

Según código:

- requested_quantity;
- available_quantity;
- location display reference;
- retry_after;
- expected/current version sólo para clientes internos;
- expiration;
- allowed options;
- clarification type.

## 36. Detalles restringidos

- actor IDs;
- owner IDs;
- Product IDs internos;
- Location IDs internos;
- lock references;
- movement IDs;
- approval hashes;
- payload hashes.

## 37. Política de reintento

VALIDATION:

No reintentar igual.

INSUFFICIENT:

Cambiar cantidad o ubicación.

VERSION_CONFLICT:

Recargar y reevaluar.

LOCK_TIMEOUT:

Reintento limitado.

DEPENDENCY_TIMEOUT en lectura:

Reintentar.

DEPENDENCY_TIMEOUT en escritura:

Consultar idempotencia.

UNKNOWN:

Conciliar antes de repetir.

SECURITY:

Bloquear y auditar.

## 38. UNKNOWN en voz

No decir:

"La reserva falló."

Decir:

"No pude confirmar si la reserva se completó. Estoy verificando el estado."

La implementación debe iniciar conciliación.

## 39. Error y estado de idempotencia

Si el efecto pudo ocurrir:

- idempotency status UNKNOWN;
- no FAILED_FINAL;
- no repetir automáticamente.

## 40. Error y auditoría

Auditar obligatoriamente:

- ajustes;
- aprobaciones;
- cross-tenant;
- UNKNOWN;
- negative balance;
- data integrity;
- over-reservation prevented;
- lock tampering;
- reconciliation.

## 41. Error y observabilidad

Todo error debe generar:

- counter;
- structured log;
- trace status;
- severity;
- retryability;
- reconciliation flag;
- component;
- Correlation ID.

## 42. Fallback

Puede aplicarse en:

- consultas;
- snapshots;
- read replica;
- caché fresh.

No aplicar fallback oculto en escrituras críticas.

## 43. Pseudocódigo

```text
function map_inventory_error(error, context):

    definition = load_inventory_error_definition(error.code)

    safe_details = filter_error_details(
        error.details,
        definition.allowed_public_details,
        context.channel
    )

    response = InventoryErrorResponse(
        error_id=new_id(),
        code=definition.code,
        category=definition.category,
        message_code=definition.message_code,
        safe_message=localize_inventory_message(
            definition.message_code,
            context.locale,
            context.channel
        ),
        retryable=definition.retryable,
        reconciliation_required=definition.reconciliation,
        severity=definition.severity,
        details=safe_details,
        request_id=context.request_id,
        correlation_id=context.correlation_id,
        error_schema_version=current_inventory_error_schema_version
    )

    emit_inventory_error_telemetry(response)
    audit_inventory_error_if_required(response, context)

    if definition.reconciliation == REQUIRED:
        schedule_reconciliation(error, context)

    return response
```

## 44. Eventos

InventoryErrorOccurred

InventoryValidationErrorOccurred

InventoryInsufficientStockDetected

InventoryVersionConflictDetected

InventoryIdempotencyConflictDetected

InventoryConcurrencyErrorOccurred

InventoryOperationMarkedUnknown

InventoryDataIntegrityErrorDetected

InventorySecurityErrorDetected

InventoryReconciliationScheduled

InventoryErrorRecovered

## 45. Observabilidad

Métricas:

- inventory_errors_total;
- inventory_validation_errors_total;
- inventory_insufficient_stock_total;
- inventory_version_errors_total;
- inventory_idempotency_errors_total;
- inventory_concurrency_errors_total;
- inventory_unknown_errors_total;
- inventory_data_integrity_errors_total;
- inventory_security_errors_total;
- inventory_reconciliation_scheduled_total;
- inventory_error_recovery_total.

Dimensiones:

- code;
- category;
- severity;
- retryable;
- reconciliation;
- component;
- operation;
- channel.

## 46. Casos límite

- código desconocido;
- error anidado;
- timeout en lectura;
- timeout en escritura;
- UNKNOWN;
- PII en details;
- tenant mismatch;
- security;
- version conflict;
- duplicate;
- lock timeout;
- deadlock;
- reconciliation;
- localization missing;
- voice;
- telemetry unavailable;
- audit unavailable;
- repeated error.

## 47. Criterios de aceptación

AC-IERR-001

Todo error posee código estable.

AC-IERR-002

Todo error posee categoría.

AC-IERR-003

Todo error indica retryable.

AC-IERR-004

Todo error indica conciliación.

AC-IERR-005

Todo error posee mensaje seguro.

AC-IERR-006

Los detalles se filtran.

AC-IERR-007

Los errores de tenant no filtran existencia.

AC-IERR-008

UNKNOWN no se marca como fallo final.

AC-IERR-009

Los códigos son independientes del proveedor.

AC-IERR-010

Los errores se localizan.

AC-IERR-011

Los errores se adaptan al canal.

AC-IERR-012

Los errores tienen Correlation ID.

AC-IERR-013

Los errores sensibles se auditan.

AC-IERR-014

Los errores pueden activar conciliación.

AC-IERR-015

Todos los códigos poseen pruebas.

## 48. Plan mínimo de pruebas

- general;
- tenant;
- product;
- location;
- availability;
- balance;
- quantity;
- reservation;
- release;
- expiration;
- commit;
- adjustment;
- approval;
- version;
- idempotency;
- concurrency;
- batch;
- movement;
- event;
- snapshot;
- source;
- reconciliation;
- security;
- UNKNOWN;
- retry;
- channel;
- voice;
- redaction;
- metrics;
- audit.

## 49. Checklist

[ ] Existe Error ID.
[ ] Existe code.
[ ] Existe category.
[ ] Existe severity.
[ ] Existe retryable.
[ ] Existe reconciliation.
[ ] Existe message code.
[ ] Existe safe message.
[ ] Existe details schema.
[ ] Existe Request ID.
[ ] Existe Correlation ID.
[ ] Existe schema version.
[ ] Se filtran detalles.
[ ] Se localiza.
[ ] Se adapta al canal.
[ ] Se emite telemetría.
[ ] Se audita.
[ ] Se agenda conciliación.
[ ] Existen pruebas.

======================================================================
FIN DEL DOCUMENTO
======================================================================
