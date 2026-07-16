======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-05-02-EXTERNAL-SERVICE-CONTRACTS.md

# CONTRATOS COMUNES PARA SERVICIOS EXTERNOS

## 1. Objetivo

Este documento define los contratos funcionales comunes que deben usar
los adaptadores de servicios externos de VoiceShop.

El propósito es que todas las integraciones compartan reglas para:

- solicitudes;
- respuestas;
- errores;
- timeouts;
- idempotencia;
- correlación;
- autenticación;
- autorización;
- reintentos;
- webhooks;
- eventos;
- archivos;
- conciliación;
- observabilidad.

## 2. Principios

RULE-ESC-001

Toda solicitud externa posee Integration Request ID.

RULE-ESC-002

Toda solicitud posee Correlation ID.

RULE-ESC-003

Toda escritura posee Idempotency Key.

RULE-ESC-004

Toda escritura posee payload hash.

RULE-ESC-005

Toda llamada posee timeout.

RULE-ESC-006

Todo resultado posee status normalizado.

RULE-ESC-007

Todo error posee código interno.

RULE-ESC-008

Todo resultado UNKNOWN activa política de conciliación.

RULE-ESC-009

Los secretos se resuelven en backend.

RULE-ESC-010

Los webhooks se validan.

RULE-ESC-011

Los eventos se deduplican.

RULE-ESC-012

Las versiones de schema se declaran.

RULE-ESC-013

Los tenants permanecen aislados.

RULE-ESC-014

Los datos sensibles se minimizan.

RULE-ESC-015

Toda operación es observable.

## 3. Integration Request Envelope

```json
{
  "integration_request_id": "UUID",
  "provider_id": "PROVIDER-A",
  "provider_class": "ERP",
  "operation": "CREATE_ORDER",
  "tenant_id": "UUID",
  "actor_reference": "UUID_OR_NULL",
  "correlation_id": "UUID",
  "causation_id": "UUID_OR_NULL",
  "idempotency_key": "STRING",
  "payload_hash": "HASH",
  "request_schema_version": 2,
  "timeout_policy": {
    "connect_ms": 1000,
    "response_ms": 5000,
    "total_ms": 7000
  },
  "payload": {},
  "requested_at": "UTC_TIMESTAMP"
}
```

## 4. Integration Response Envelope

```json
{
  "integration_result_id": "UUID",
  "integration_request_id": "UUID",
  "provider_reference": "OPAQUE",
  "status": "SUCCESS",
  "result_schema_version": 2,
  "result": {},
  "provider_metadata": {
    "region": "APPROVED_REGION"
  },
  "duration_ms": 221,
  "completed_at": "UTC_TIMESTAMP"
}
```

## 5. Estados de resultado

SUCCESS

FAILED_RETRYABLE

FAILED_FINAL

CANCELLED

TIMED_OUT

RATE_LIMITED

UNKNOWN

PARTIAL

## 6. Error Envelope

```json
{
  "integration_error_id": "UUID",
  "integration_request_id": "UUID",
  "code": "INTEGRATION_TIMEOUT",
  "category": "TIMEOUT",
  "retryable": true,
  "unknown": false,
  "safe_message": "El servicio externo no respondió a tiempo.",
  "provider_error_reference": "OPAQUE_OR_NULL",
  "details": {},
  "correlation_id": "UUID",
  "occurred_at": "UTC_TIMESTAMP"
}
```

## 7. Provider metadata

Puede contener:

- region;
- endpoint class;
- API version;
- request reference;
- response code;
- rate-limit bucket;
- usage.

No debe contener secretos.

## 8. Request schema version

Debe permitir:

- validación;
- compatibilidad;
- migración;
- contract testing;
- rollback.

## 9. Response schema version

Un adaptador debe soportar:

- versión actual;
- versiones permitidas;
- rechazo de versiones desconocidas;
- migración controlada.

## 10. Autenticación

Tipos:

API_KEY_BACKEND

OAUTH_CLIENT_CREDENTIALS

OAUTH_AUTHORIZATION_CODE

SIGNED_REQUEST

MUTUAL_TLS

SERVICE_ACCOUNT

EPHEMERAL_TOKEN

La política depende del proveedor.

## 11. Secret Reference

```json
{
  "secret_reference_id": "UUID",
  "provider_id": "PROVIDER-A",
  "tenant_id": "UUID_OR_SHARED_POLICY",
  "secret_type": "API_KEY_BACKEND",
  "version": 4,
  "status": "ACTIVE"
}
```

El contrato nunca contiene el valor del secreto.

## 12. Rotación

Debe soportar:

- dual key;
- active version;
- previous version;
- grace period;
- revocation;
- audit.

## 13. Autorización

La integración debe recibir sólo:

- operación autorizada;
- scope;
- tenant;
- resource references;
- policy version.

El proveedor no decide permisos internos.

## 14. Timeout policy

Debe distinguir:

CONNECT_TIMEOUT

READ_TIMEOUT

WRITE_TIMEOUT

IDLE_TIMEOUT

TOTAL_TIMEOUT

No usar valores infinitos.

## 15. Retry policy contract

```json
{
  "maximum_attempts": 3,
  "initial_backoff_ms": 200,
  "maximum_backoff_ms": 2000,
  "jitter": true,
  "retryable_codes": [
    "PROVIDER_TEMPORARY_UNAVAILABLE",
    "INTEGRATION_TIMEOUT"
  ],
  "total_budget_ms": 8000
}
```

## 16. Retry preconditions

Antes de reintentar:

- operación idempotente;
- misma key;
- resultado no UNKNOWN sin conciliación;
- total budget disponible;
- circuit cerrado o half-open permitido;
- Session no cancelada.

## 17. Idempotency contract

```json
{
  "idempotency_key": "STRING",
  "payload_hash": "HASH",
  "scope": {
    "tenant_id": "UUID",
    "operation": "CREATE_ORDER"
  },
  "retention_seconds": 86400
}
```

## 18. Provider idempotency

Si el proveedor soporta idempotencia:

- enviar key derivada;
- mapear resultado;
- conservar reference.

Si no:

- usar registro interno;
- conciliación;
- query-by-reference;
- evitar reintento ciego.

## 19. Circuit breaker contract

```json
{
  "failure_threshold": 5,
  "minimum_requests": 10,
  "open_duration_seconds": 30,
  "half_open_max_requests": 2,
  "failure_codes": [
    "TIMEOUT",
    "UNAVAILABLE"
  ]
}
```

## 20. Bulkhead

Separar recursos por:

- provider class;
- tenant tier;
- operation risk;
- channel;
- region.

Un proveedor lento no debe agotar todo el sistema.

## 21. Rate limit contract

Debe mapear:

- limit;
- remaining;
- reset;
- retry_after;
- scope;
- operation.

No asumir que todos los proveedores usan los mismos headers.

## 22. Webhook Envelope

```json
{
  "webhook_delivery_id": "UUID",
  "provider_id": "PROVIDER-A",
  "provider_event_id": "OPAQUE",
  "event_type": "PAYMENT_UPDATED",
  "tenant_reference": "SIGNED_OR_MAPPED_REFERENCE",
  "occurred_at": "UTC_TIMESTAMP_OR_NULL",
  "received_at": "UTC_TIMESTAMP",
  "signature_reference": "VALIDATED",
  "payload_schema_version": 3,
  "payload": {}
}
```

## 23. Validación de webhook

- endpoint;
- method;
- content type;
- size;
- signature;
- timestamp;
- replay window;
- event ID;
- provider;
- tenant mapping;
- schema;
- rate limit.

## 24. Respuesta a webhook

Debe responder rápido.

El procesamiento pesado puede:

- persistir inbox;
- ACK;
- procesar asíncronamente.

No ACK antes de guardar evidencia mínima cuando pueda perderse.

## 25. Inbox Record

```json
{
  "provider_id": "PROVIDER-A",
  "provider_event_id": "OPAQUE",
  "payload_hash": "HASH",
  "status": "RECEIVED",
  "attempts": 0,
  "received_at": "UTC_TIMESTAMP",
  "processed_at": null
}
```

## 26. Duplicados de webhook

Mismo provider_event_id y mismo hash:

- ACK idempotente.

Mismo ID con hash distinto:

- SECURITY_CONFLICT;
- no procesar;
- auditar.

## 27. Eventos fuera de orden

Usar:

- provider sequence;
- occurred_at;
- internal version;
- aggregate state.

No aplicar evento viejo que revierta estado.

## 28. Polling

Cuando no hay webhook:

- cursor;
- watermark;
- last successful poll;
- overlap window;
- dedup;
- rate limit;
- backoff.

## 29. File exchange contract

```json
{
  "file_exchange_id": "UUID",
  "tenant_id": "UUID",
  "provider_id": "PROVIDER-A",
  "direction": "INBOUND",
  "content_type": "text/csv",
  "size_bytes": 102400,
  "checksum": "HASH",
  "encryption": "REQUIRED",
  "schema_version": 5,
  "status": "RECEIVED"
}
```

## 30. Validación de archivos

- size;
- type;
- extension;
- checksum;
- malware scan;
- encoding;
- schema;
- row limits;
- tenant;
- encryption;
- duplicate.

## 31. Partial results

Un proveedor puede devolver datos parciales.

El resultado debe indicar:

- completed items;
- failed items;
- unknown items;
- continuation;
- consistency.

## 32. Pagination externa

Normalizar:

- next cursor;
- page token;
- offset;
- continuation token.

El cursor propietario permanece dentro del adaptador.

## 33. Streaming contract

```json
{
  "stream_id": "UUID",
  "provider_stream_reference": "OPAQUE",
  "direction": "BIDIRECTIONAL",
  "generation": 2,
  "sequence_policy": "MONOTONIC",
  "format": "STRUCTURED_OR_BINARY",
  "status": "OPEN"
}
```

## 34. Cancellation contract

Toda operación larga debe declarar si:

- soporta cancelación;
- cancelación es best-effort;
- puede quedar UNKNOWN;
- requiere reconciliación.

## 35. Health check contract

Debe distinguir:

LIVENESS

READINESS

DEPENDENCY_HEALTH

CAPABILITY_HEALTH

No ejecutar operaciones comerciales para health checks.

## 36. Provider health result

```json
{
  "provider_id": "PROVIDER-A",
  "status": "DEGRADED",
  "capabilities": {
    "reads": true,
    "writes": false,
    "streaming": true
  },
  "checked_at": "UTC_TIMESTAMP",
  "expires_at": "UTC_TIMESTAMP"
}
```

## 37. Reconciliation contract

```json
{
  "reconciliation_request_id": "UUID",
  "integration_request_id": "UUID",
  "provider_reference": "OPAQUE_OR_NULL",
  "idempotency_key": "STRING_OR_NULL",
  "operation": "CREATE_ORDER",
  "evidence": [],
  "status": "REQUESTED"
}
```

## 38. Conciliación

Puede consultar:

- status endpoint;
- provider reference;
- idempotency key;
- webhook history;
- ledger;
- file result;
- manual review.

## 39. Data minimization

Todo contrato debe declarar:

- required fields;
- optional fields;
- prohibited fields;
- retention;
- classification.

## 40. Redaction

Antes de logging:

- secrets;
- tokens;
- PII;
- payment data;
- provider payload;
- headers;
- signatures.

## 41. Pseudocódigo de llamada

```text
function call_external_service(command, adapter):

    validate_integration_command(command)
    policy = load_integration_policy(
        command.provider_class,
        command.operation
    )

    enforce_circuit_breaker(policy)
    enforce_bulkhead(policy)

    request = build_integration_request(command, policy)
    persist_idempotency_if_required(request)

    try:
        raw_response = adapter.execute(
            request,
            timeout=policy.timeout
        )

        result = adapter.map_response(raw_response)
        validate_integration_result(result)

        persist_integration_result(result)
        update_provider_health_success(adapter.provider_id)

        return result

    except ProviderTimeout as error:
        outcome = classify_timeout_outcome(command, error)

        if outcome == UNKNOWN:
            mark_integration_unknown(request, error)
            schedule_integration_reconciliation(request)
            return unknown_result(request)

        handle_retryable_failure(request, error, policy)
        raise
```

## 42. Errores

EXTERNAL_REQUEST_SCHEMA_INVALID

EXTERNAL_RESPONSE_SCHEMA_INVALID

EXTERNAL_ERROR_SCHEMA_INVALID

EXTERNAL_AUTHENTICATION_FAILED

EXTERNAL_AUTHORIZATION_FAILED

EXTERNAL_SECRET_UNAVAILABLE

EXTERNAL_SECRET_VERSION_INVALID

EXTERNAL_TIMEOUT

EXTERNAL_RATE_LIMITED

EXTERNAL_CIRCUIT_OPEN

EXTERNAL_BULKHEAD_FULL

EXTERNAL_IDEMPOTENCY_CONFLICT

EXTERNAL_WEBHOOK_SIGNATURE_INVALID

EXTERNAL_WEBHOOK_REPLAY_DETECTED

EXTERNAL_WEBHOOK_DUPLICATE_CONFLICT

EXTERNAL_FILE_INVALID

EXTERNAL_PARTIAL_RESULT

EXTERNAL_RESULT_UNKNOWN

EXTERNAL_RECONCILIATION_FAILED

## 43. Eventos

ExternalRequestCreated

ExternalExecutionStarted

ExternalExecutionSucceeded

ExternalExecutionFailed

ExternalExecutionTimedOut

ExternalExecutionMarkedUnknown

ExternalRetryScheduled

ExternalWebhookReceived

ExternalWebhookRejected

ExternalFileReceived

ExternalFileRejected

ExternalReconciliationRequested

ExternalReconciliationCompleted

## 44. Observabilidad

Métricas:

- external_requests_total;
- external_success_total;
- external_failure_total;
- external_timeout_total;
- external_rate_limit_total;
- external_unknown_total;
- external_retry_total;
- external_circuit_open_total;
- external_bulkhead_rejected_total;
- external_webhook_total;
- external_webhook_rejected_total;
- external_file_total;
- external_reconciliation_total;
- external_duration_seconds.

Dimensiones:

- provider_class;
- operation;
- result;
- error_code;
- region;
- auth_type;
- tenant_tier.

## 45. Seguridad

Amenazas:

- secret leak;
- signature bypass;
- replay;
- SSRF;
- payload injection;
- schema confusion;
- tenant confusion;
- webhook spoof;
- file malware;
- rate abuse.

Controles:

- allowlist;
- secret manager;
- signatures;
- timestamps;
- schema validation;
- size limits;
- malware scan;
- tenant mapping;
- egress policy;
- audit.

## 46. Casos límite

- timeout before send;
- timeout after send;
- duplicate request;
- same key different payload;
- provider 429;
- circuit open;
- half-open;
- webhook duplicate;
- webhook altered;
- event out-of-order;
- partial result;
- file duplicate;
- bad checksum;
- health stale;
- provider failover;
- UNKNOWN;
- reconciliation;
- telemetry unavailable.

## 47. Criterios de aceptación

AC-ESC-001

Toda solicitud posee Integration Request ID.

AC-ESC-002

Toda solicitud posee Correlation ID.

AC-ESC-003

Toda escritura posee idempotencia.

AC-ESC-004

Toda escritura posee payload hash.

AC-ESC-005

Toda llamada posee timeout.

AC-ESC-006

Todo resultado se normaliza.

AC-ESC-007

Todo error se normaliza.

AC-ESC-008

UNKNOWN se concilia.

AC-ESC-009

Los secretos permanecen en backend.

AC-ESC-010

Los webhooks se validan.

AC-ESC-011

Los eventos se deduplican.

AC-ESC-012

Los schemas se versionan.

AC-ESC-013

Los tenants se aíslan.

AC-ESC-014

Los datos se minimizan.

AC-ESC-015

Toda operación es observable.

## 48. Plan mínimo de pruebas

- request schema;
- response schema;
- error schema;
- authentication;
- secret rotation;
- timeout;
- retry;
- idempotency;
- circuit;
- bulkhead;
- rate limit;
- webhook;
- signature;
- replay;
- duplicate;
- ordering;
- polling;
- files;
- checksum;
- malware;
- partial;
- streaming;
- cancellation;
- health;
- UNKNOWN;
- reconciliation;
- privacy;
- security;
- metrics;
- audit.

## 49. Checklist

[ ] Existe Request Envelope.
[ ] Existe Response Envelope.
[ ] Existe Error Envelope.
[ ] Existe schema version.
[ ] Existe timeout policy.
[ ] Existe retry policy.
[ ] Existe idempotency contract.
[ ] Existe circuit breaker.
[ ] Existe bulkhead.
[ ] Existe rate limit mapping.
[ ] Existe webhook contract.
[ ] Existe inbox.
[ ] Existe file contract.
[ ] Existe streaming contract.
[ ] Existe health contract.
[ ] Existe reconciliation contract.
[ ] Se protegen secretos.
[ ] Se minimizan datos.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
