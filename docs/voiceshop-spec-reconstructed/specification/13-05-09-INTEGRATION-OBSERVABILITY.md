======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-05-09-INTEGRATION-OBSERVABILITY.md

# OBSERVABILIDAD DE INTEGRACIONES EXTERNAS

## 1. Objetivo

Este documento define logs, métricas, trazas, alertas, dashboards,
auditoría técnica y criterios operativos para todas las integraciones
externas de VoiceShop.

La observabilidad debe permitir:

- conocer qué proveedor fue utilizado;
- medir latencia;
- medir éxito y error;
- detectar timeouts;
- medir reintentos;
- detectar circuit breakers abiertos;
- medir uso de fallback;
- medir failover;
- detectar resultados UNKNOWN;
- supervisar webhooks;
- supervisar archivos;
- medir colas;
- controlar costes;
- detectar incidentes de seguridad;
- verificar SLO;
- investigar operaciones sin exponer secretos.

## 2. Alcance

Incluye:

- Realtime Provider;
- LLM Provider;
- transcripción;
- síntesis;
- mensajería;
- ERP;
- CRM;
- inventario externo;
- catálogo externo;
- pagos;
- webhooks;
- polling;
- streaming;
- archivos;
- retries;
- circuit breakers;
- bulkheads;
- queues;
- fallback;
- failover;
- security;
- reconciliation;
- costes;
- QA.

No incluye:

- contenido completo de mensajes;
- chain-of-thought;
- secretos;
- datos de tarjetas;
- payloads externos completos;
- identificadores de alta cardinalidad en métricas;
- implementación concreta de OpenTelemetry o proveedor de monitoreo.

## 3. Principios

RULE-IOI-001

Toda llamada externa posee Integration Request ID.

RULE-IOI-002

Toda operación distribuida posee Correlation ID.

RULE-IOI-003

Toda operación registra provider class y operation.

RULE-IOI-004

Toda operación registra duración.

RULE-IOI-005

Todo timeout se clasifica.

RULE-IOI-006

Todo reintento se contabiliza.

RULE-IOI-007

Todo UNKNOWN es trazable.

RULE-IOI-008

Toda conciliación es trazable.

RULE-IOI-009

Las métricas evitan alta cardinalidad.

RULE-IOI-010

Los logs se redactan.

RULE-IOI-011

Los secretos nunca se registran.

RULE-IOI-012

La telemetría crítica no se samplea.

RULE-IOI-013

Las alertas deben ser accionables.

RULE-IOI-014

La caída de observabilidad no debe alterar operaciones críticas.

RULE-IOI-015

Toda señal tiene política de retención.

## 4. Identificadores

- Integration Request ID;
- Integration Result ID;
- Integration Error ID;
- Correlation ID;
- Causation ID;
- Provider ID;
- Provider Reference protegida;
- Webhook Delivery ID;
- Reconciliation ID;
- Stream ID;
- File Exchange ID;
- Queue Message ID;
- Circuit Policy ID.

No usar identificadores únicos como etiquetas de métricas.

## 5. Log estructurado

```json
{
  "timestamp": "UTC_TIMESTAMP",
  "level": "INFO",
  "service": "integration-gateway",
  "component": "erp-adapter",
  "event_name": "integration_call_completed",
  "integration_request_id": "UUID",
  "correlation_id": "UUID",
  "provider_class": "ERP",
  "provider_id": "ERP-A",
  "operation": "CREATE_ORDER",
  "attempt": 1,
  "result": "SUCCESS",
  "duration_ms": 286,
  "retryable": false,
  "unknown": false,
  "error_code": null
}
```

## 6. Campos permitidos

- provider class;
- provider ID controlado;
- operation;
- adapter version;
- API version;
- region;
- result;
- error code;
- attempt;
- duration;
- timeout class;
- circuit state;
- bulkhead result;
- fallback type;
- failover state;
- schema version;
- usage;
- cost estimate;
- tenant tier.

## 7. Campos prohibidos

- API Key;
- access token;
- refresh token;
- Authorization header;
- cookies;
- webhook signature;
- raw webhook body;
- card data;
- full customer payload;
- full transcript;
- chain-of-thought;
- private key;
- client secret;
- signed action;
- provider URL con credenciales.

## 8. Niveles

TRACE

Diagnóstico temporal y controlado.

DEBUG

Detalles técnicos redactados.

INFO

Operación normal.

WARN

Retry, fallback, parcial, rate limit o degradación.

ERROR

Fallo técnico o conciliación fallida.

CRITICAL

Seguridad, cross-tenant, pago inconsistente, secreto filtrado o
operación financiera no conciliada.

## 9. Métricas generales

- integration_requests_total;
- integration_success_total;
- integration_failure_total;
- integration_timeout_total;
- integration_rate_limited_total;
- integration_unknown_total;
- integration_cancelled_total;
- integration_partial_result_total;
- integration_duration_seconds;
- integration_active_requests;
- integration_payload_size_bytes;
- integration_response_size_bytes.

## 10. Métricas de reintento

- integration_retry_attempts_total;
- integration_retry_success_total;
- integration_retry_exhausted_total;
- integration_retry_delay_seconds;
- integration_retry_budget_exhausted_total;
- integration_retry_storm_prevented_total.

## 11. Métricas de circuit breaker

- integration_circuit_state;
- integration_circuit_open_total;
- integration_circuit_half_open_total;
- integration_circuit_close_total;
- integration_circuit_rejected_total;
- integration_circuit_open_duration_seconds.

## 12. Métricas de bulkhead

- integration_bulkhead_active;
- integration_bulkhead_queue_depth;
- integration_bulkhead_rejected_total;
- integration_bulkhead_wait_seconds;
- integration_bulkhead_capacity_usage_ratio.

## 13. Métricas de fallback

- integration_fallback_total;
- integration_fallback_success_total;
- integration_fallback_failure_total;
- integration_stale_fallback_total;
- integration_snapshot_fallback_total;
- integration_human_fallback_total;
- integration_text_degradation_total.

## 14. Métricas de failover

- integration_failover_requested_total;
- integration_failover_success_total;
- integration_failover_failure_total;
- integration_failover_duration_seconds;
- integration_failover_incompatible_total;
- integration_write_failover_blocked_total.

## 15. Métricas de webhooks

- integration_webhooks_received_total;
- integration_webhooks_accepted_total;
- integration_webhooks_rejected_total;
- integration_webhook_signature_failure_total;
- integration_webhook_replay_total;
- integration_webhook_duplicate_total;
- integration_webhook_duplicate_conflict_total;
- integration_webhook_processing_duration_seconds;
- integration_webhook_inbox_backlog;
- integration_webhook_oldest_age_seconds.

## 16. Métricas de polling

- integration_poll_requests_total;
- integration_poll_success_total;
- integration_poll_failure_total;
- integration_poll_lag_seconds;
- integration_poll_items_total;
- integration_poll_duplicate_total;
- integration_poll_sequence_gap_total;
- integration_poll_watermark_age_seconds.

## 17. Métricas de archivos

- integration_files_received_total;
- integration_files_rejected_total;
- integration_file_bytes_total;
- integration_file_checksum_failure_total;
- integration_file_schema_failure_total;
- integration_file_malware_total;
- integration_file_zip_bomb_total;
- integration_file_processing_duration_seconds;
- integration_file_rows_total;
- integration_file_rows_rejected_total.

## 18. Métricas de streaming

- integration_streams_opened_total;
- integration_streams_closed_total;
- integration_stream_errors_total;
- integration_stream_reconnections_total;
- integration_stream_chunks_total;
- integration_stream_duplicate_chunks_total;
- integration_stream_sequence_gap_total;
- integration_stream_duration_seconds;
- integration_stream_active.

## 19. Métricas del proveedor Realtime

- realtime_provider_session_total;
- realtime_provider_connection_failure_total;
- realtime_provider_event_total;
- realtime_provider_event_mapping_failure_total;
- realtime_provider_stale_event_total;
- realtime_provider_usage_seconds;
- realtime_provider_cost_estimate.

## 20. Métricas del proveedor LLM

- llm_provider_requests_total;
- llm_provider_schema_failure_total;
- llm_provider_guardrail_failure_total;
- llm_provider_timeout_total;
- llm_provider_tokens_input_total;
- llm_provider_tokens_output_total;
- llm_provider_cached_tokens_total;
- llm_provider_cost_estimate.

## 21. Métricas de mensajería

- messaging_inbound_total;
- messaging_outbound_total;
- messaging_delivery_failure_total;
- messaging_delivery_unknown_total;
- messaging_stale_callback_total;
- messaging_attachment_failure_total;
- messaging_channel_duration_seconds.

## 22. Métricas ERP/CRM

- erp_order_export_total;
- erp_order_export_unknown_total;
- erp_inventory_sync_total;
- erp_sequence_gap_total;
- erp_mapping_conflict_total;
- crm_case_creation_total;
- crm_activity_total;
- erp_crm_reconciliation_total.

## 23. Métricas de pagos

- payment_provider_requests_total;
- payment_provider_timeout_total;
- payment_provider_unknown_total;
- payment_webhook_total;
- payment_webhook_rejected_total;
- payment_reconciliation_total;
- payment_refund_total;
- payment_refund_unknown_total;
- payment_provider_duration_seconds.

## 24. Métricas de seguridad

- integration_authentication_failure_total;
- integration_authorization_failure_total;
- integration_secret_resolution_failure_total;
- integration_signature_failure_total;
- integration_replay_total;
- integration_ssrf_block_total;
- integration_cross_tenant_attempt_total;
- integration_schema_attack_total;
- integration_malicious_file_total;
- integration_provider_disabled_total.

## 25. Métricas de conciliación

- integration_reconciliation_requested_total;
- integration_reconciliation_success_total;
- integration_reconciliation_failure_total;
- integration_reconciliation_manual_total;
- integration_reconciliation_duration_seconds;
- integration_unknown_age_seconds;
- integration_unknown_active.

## 26. Métricas de coste

- integration_cost_estimate;
- integration_cost_per_operation_estimate;
- integration_cost_per_tenant_tier_estimate;
- integration_llm_cost_estimate;
- integration_realtime_cost_estimate;
- integration_payment_cost_estimate;
- integration_message_cost_estimate;
- integration_storage_cost_estimate.

## 27. Etiquetas permitidas

- provider_class;
- provider_id de cardinalidad controlada;
- operation;
- adapter_version;
- region;
- result;
- error_code;
- attempt_bucket;
- circuit_state;
- fallback_type;
- channel_type;
- schema_version;
- tenant_tier.

## 28. Etiquetas prohibidas

- Integration Request ID;
- Correlation ID;
- Provider Reference;
- Payment ID;
- Order ID;
- Customer ID;
- Session ID;
- Message ID;
- Webhook Event ID;
- file name único;
- raw URL;
- query;
- token.

## 29. Trazas

Spans recomendados:

- integration.execute;
- integration.authenticate;
- integration.authorize;
- integration.secret.resolve;
- integration.request.map;
- integration.provider.call;
- integration.response.map;
- integration.retry;
- integration.circuit.evaluate;
- integration.bulkhead.acquire;
- integration.fallback;
- integration.failover;
- integration.webhook.receive;
- integration.webhook.validate;
- integration.file.validate;
- integration.stream.process;
- integration.reconcile.

## 30. Atributos de span

- provider class;
- operation;
- result;
- duration;
- attempt;
- timeout;
- retryable;
- unknown;
- schema version;
- circuit state;
- fallback;
- region;
- error code.

## 31. Correlación

Debe propagarse:

- trace context;
- Integration Request ID;
- Correlation ID;
- Causation ID;
- tenant reference;
- operation reference;
- internal aggregate reference protegida.

## 32. Sampling

Recolectar al 100%:

- UNKNOWN;
- payment operations;
- refund operations;
- cross-tenant;
- secret incidents;
- webhook signature failures;
- replay;
- malicious files;
- reconciliation failures;
- write failover blocked;
- provider compromise.

Puede samplearse:

- lecturas exitosas;
- health checks;
- cache hits;
- high-frequency streaming chunks.

## 33. Dashboards

### INTEGRATION HEALTH

- requests;
- success;
- failure;
- timeout;
- latency;
- provider health.

### RESILIENCE

- retries;
- circuits;
- bulkheads;
- fallbacks;
- failover;
- load shedding.

### WEBHOOKS

- received;
- rejected;
- duplicate;
- replay;
- backlog;
- processing age.

### PROVIDERS

- LLM;
- Realtime;
- messaging;
- ERP;
- CRM;
- payments.

### RECONCILIATION

- UNKNOWN;
- age;
- success;
- failure;
- manual review.

### SECURITY

- authentication;
- signatures;
- replay;
- SSRF;
- cross-tenant;
- malware;
- disabled providers.

### COST

- cost by provider class;
- cost by operation;
- cost per successful task;
- anomalies.

## 34. Alertas

INTEGRATION_PROVIDER_UNAVAILABLE

INTEGRATION_LATENCY_HIGH

INTEGRATION_TIMEOUT_SPIKE

INTEGRATION_UNKNOWN_SPIKE

INTEGRATION_RETRY_STORM

INTEGRATION_CIRCUIT_OPEN_TOO_LONG

INTEGRATION_BULKHEAD_SATURATED

INTEGRATION_WEBHOOK_BACKLOG_HIGH

INTEGRATION_WEBHOOK_SECURITY_FAILURE

INTEGRATION_FILE_MALWARE_DETECTED

INTEGRATION_RECONCILIATION_FAILURE

INTEGRATION_PAYMENT_UNKNOWN_TOO_OLD

INTEGRATION_COST_ANOMALY

INTEGRATION_SECURITY_INCIDENT

## 35. Contrato de alerta

Toda alerta debe incluir:

- Alert ID;
- condición;
- ventana;
- threshold;
- severidad;
- propietario;
- runbook;
- dashboard;
- impacto;
- deduplicación;
- recovery condition;
- Correlation references.

## 36. SLO iniciales

Ejemplos sujetos al NFR final:

- llamadas externas críticas p95 dentro del presupuesto;
- webhook ACK p95 dentro del objetivo;
- UNKNOWN resuelto antes del deadline;
- circuit recovery dentro del objetivo;
- cross-tenant = 0 tolerado;
- webhook replay aceptado = 0;
- payment duplicate effect = 0;
- secret exposure = 0.

## 37. Error budget

Separar:

- errores del proveedor;
- errores de contrato;
- rate limit;
- timeouts;
- errores internos;
- UNKNOWN;
- seguridad;
- validación.

Los rechazos de entrada inválida no deben consumir igual que una caída
del proveedor.

## 38. Provider scorecard

Puede medir:

- availability;
- p95 latency;
- timeout rate;
- schema compliance;
- UNKNOWN rate;
- support responsiveness;
- cost;
- regional compliance;
- security incidents;
- failover compatibility.

## 39. Health state derivado

HEALTHY

DEGRADED

UNAVAILABLE

RATE_LIMITED

MAINTENANCE

UNKNOWN

Debe derivarse de señales y política versionada.

## 40. Privacidad

La telemetría no debe incluir:

- mensajes completos;
- transcripciones;
- nombres;
- emails;
- teléfonos;
- direcciones;
- payment payloads;
- secrets.

## 41. Retención

Definir por señal:

- métricas agregadas;
- logs;
- traces;
- security;
- payment audit;
- reconciliation;
- debug temporal.

## 42. Degradación de observabilidad

Si el backend de telemetría falla:

- no detener operación crítica;
- buffer limitado;
- priorizar seguridad;
- priorizar pagos;
- priorizar UNKNOWN;
- descartar high-frequency;
- alertar al recuperar.

## 43. Pseudocódigo

```text
function emit_integration_telemetry(signal):

    validate_integration_telemetry_schema(signal)
    remove_secrets(signal)
    redact_personal_data(signal)
    remove_high_cardinality_labels(signal)
    attach_trace_context(signal)

    if signal.is_critical:
        export_without_sampling(signal)
    elif should_sample(signal):
        export(signal)

    if export_failed and signal.is_critical:
        persist_critical_integration_buffer(signal)
```

## 44. Errores de observabilidad

INTEGRATION_OBS_SCHEMA_INVALID

INTEGRATION_OBS_SECRET_DETECTED

INTEGRATION_OBS_SENSITIVE_DATA_DETECTED

INTEGRATION_OBS_HIGH_CARDINALITY_DETECTED

INTEGRATION_OBS_TRACE_CONTEXT_INVALID

INTEGRATION_OBS_EXPORT_FAILED

INTEGRATION_OBS_BUFFER_FULL

INTEGRATION_OBS_ALERT_FAILED

INTEGRATION_OBS_CLOCK_SKEW_EXCEEDED

## 45. Eventos

IntegrationTelemetryEmitted

IntegrationTelemetryDropped

IntegrationTelemetryBuffered

IntegrationSecretTelemetryBlocked

IntegrationSensitiveTelemetryBlocked

IntegrationHighCardinalityDetected

IntegrationSLOViolated

IntegrationAlertTriggered

IntegrationAlertResolved

IntegrationCostAnomalyDetected

## 46. Casos límite

- provider flapping;
- timeout storm;
- retry storm;
- circuit remains open;
- webhook backlog;
- duplicate conflict;
- event out-of-order;
- file malware;
- stream high-frequency;
- payment UNKNOWN;
- secret in error;
- PII in payload;
- telemetry backend down;
- buffer full;
- clock skew;
- cost spike;
- cross-tenant attempt.

## 47. Criterios de aceptación

AC-IOI-001

Toda llamada tiene Integration Request ID.

AC-IOI-002

Toda operación tiene Correlation ID.

AC-IOI-003

Toda operación registra provider class.

AC-IOI-004

Toda operación registra duración.

AC-IOI-005

Todo timeout se clasifica.

AC-IOI-006

Todo retry se mide.

AC-IOI-007

Todo UNKNOWN es trazable.

AC-IOI-008

Toda conciliación es trazable.

AC-IOI-009

Las métricas evitan alta cardinalidad.

AC-IOI-010

Los logs se redactan.

AC-IOI-011

Los secretos no se registran.

AC-IOI-012

La telemetría crítica no se samplea.

AC-IOI-013

Existen dashboards.

AC-IOI-014

Existen alertas accionables.

AC-IOI-015

La caída de observabilidad no altera operaciones.

## 48. Plan mínimo de pruebas

- logs;
- metrics;
- traces;
- correlation;
- provider dimensions;
- retries;
- circuit;
- bulkhead;
- fallback;
- failover;
- webhooks;
- polling;
- files;
- streaming;
- LLM;
- Realtime;
- messaging;
- ERP;
- CRM;
- payments;
- reconciliation;
- security;
- redaction;
- cardinality;
- sampling;
- dashboards;
- alerts;
- SLO;
- cost;
- backend down;
- buffer;
- retention.

## 49. Checklist

[ ] Existen logs estructurados.
[ ] Existen métricas generales.
[ ] Existen métricas de retries.
[ ] Existen métricas de circuit.
[ ] Existen métricas de bulkhead.
[ ] Existen métricas de fallback.
[ ] Existen métricas de failover.
[ ] Existen métricas de webhooks.
[ ] Existen métricas de polling.
[ ] Existen métricas de archivos.
[ ] Existen métricas de streaming.
[ ] Existen métricas de providers.
[ ] Existen métricas de reconciliation.
[ ] Existen métricas de security.
[ ] Existen métricas de cost.
[ ] Existen trazas.
[ ] Existen dashboards.
[ ] Existen alertas.
[ ] Se protegen secretos.
[ ] Existen pruebas.

======================================================================
FIN DEL DOCUMENTO
======================================================================
