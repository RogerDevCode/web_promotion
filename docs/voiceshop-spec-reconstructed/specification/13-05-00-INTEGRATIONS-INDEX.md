======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-05-00-INTEGRATIONS-INDEX.md

# ÍNDICE FUNCIONAL DE INTEGRACIONES EXTERNAS

## 1. Objetivo

Esta carpeta define cómo VoiceShop se integra con proveedores y sistemas
externos sin permitir que esos sistemas controlen directamente el
dominio comercial.

Las integraciones pueden incluir:

- proveedor Realtime de voz;
- proveedor LLM;
- transcripción;
- síntesis;
- catálogo;
- inventario;
- precios;
- ERP;
- CRM;
- mensajería;
- correo;
- pagos;
- mapas;
- identidad;
- observabilidad;
- almacenamiento;
- operadores humanos.

Toda integración debe operar mediante contratos explícitos.

## 2. Principios

RULE-INT-001

Ningún proveedor externo es fuente universal de verdad.

RULE-INT-002

Todo proveedor debe estar detrás de una interfaz funcional.

RULE-INT-003

Los contratos internos no deben depender de nombres de eventos
propietarios.

RULE-INT-004

Los errores del proveedor deben mapearse a códigos internos.

RULE-INT-005

Toda operación con efecto debe ser idempotente.

RULE-INT-006

Toda llamada externa debe tener timeout.

RULE-INT-007

Todo reintento debe estar limitado.

RULE-INT-008

Los resultados UNKNOWN deben conciliarse.

RULE-INT-009

Los tenants deben permanecer aislados.

RULE-INT-010

Los secretos nunca se envían al Cliente.

RULE-INT-011

Los datos enviados deben minimizarse.

RULE-INT-012

Todo proveedor debe tener health state.

RULE-INT-013

Todo proveedor debe poder deshabilitarse.

RULE-INT-014

El failover debe ser explícito.

RULE-INT-015

Toda integración debe ser observable y auditable.

## 3. Organización propuesta

13-05-01-REALTIME-PROVIDER-ABSTRACTION.md

Abstracción del proveedor de voz Realtime.

13-05-02-EXTERNAL-SERVICE-CONTRACTS.md

Contratos comunes para servicios externos.

13-05-03-LLM-PROVIDER-ABSTRACTION.md

Abstracción del proveedor LLM.

13-05-04-MESSAGING-CHANNELS.md

Telegram, Web, mensajería y eventos de canal.

13-05-05-ERP-CRM-INTEGRATIONS.md

ERP, CRM y sistemas operativos.

13-05-06-PAYMENT-PROVIDER-INTEGRATION.md

Contratos seguros con proveedores de pago.

13-05-07-INTEGRATION-RESILIENCE.md

Timeouts, reintentos, circuit breakers y fallback.

13-05-08-INTEGRATION-SECURITY.md

Secretos, scopes, aislamiento y privacidad.

13-05-09-INTEGRATION-OBSERVABILITY.md

Métricas, trazas y alertas.

13-05-10-INTEGRATION-TESTING.md

Pruebas contractuales, simulación y caos.

## 4. Tipos de integración

SYNCHRONOUS_REQUEST_RESPONSE

ASYNCHRONOUS_COMMAND

EVENT_SUBSCRIPTION

STREAMING

FILE_EXCHANGE

WEBHOOK

POLLING

HUMAN_TASK

Cada tipo requiere políticas distintas.

## 5. Contrato base de Integration Request

```json
{
  "integration_request_id": "UUID",
  "provider_class": "REALTIME_VOICE",
  "operation": "CREATE_SESSION",
  "tenant_id": "UUID",
  "correlation_id": "UUID",
  "causation_id": "UUID_OR_NULL",
  "idempotency_key": "STRING_OR_NULL",
  "timeout_ms": 5000,
  "payload_reference": "STRUCTURED_PAYLOAD",
  "policy_version": 3,
  "requested_at": "UTC_TIMESTAMP"
}
```

## 6. Contrato base de Integration Result

```json
{
  "integration_result_id": "UUID",
  "integration_request_id": "UUID",
  "provider_class": "REALTIME_VOICE",
  "provider_reference": "OPAQUE_REFERENCE",
  "status": "SUCCESS",
  "result_reference": "STRUCTURED_RESULT",
  "retryable": false,
  "unknown": false,
  "duration_ms": 185,
  "completed_at": "UTC_TIMESTAMP"
}
```

## 7. Estados de integración

REQUESTED

VALIDATING

QUEUED

EXECUTING

SUCCESS

FAILED_RETRYABLE

FAILED_FINAL

CANCELLED

TIMED_OUT

UNKNOWN

RECONCILING

RECOVERED

## 8. Proveedores

Cada proveedor debe declarar:

- Provider ID;
- Provider Class;
- regiones;
- capacidades;
- versiones;
- límites;
- retención;
- privacidad;
- timeouts;
- health;
- coste;
- fallback;
- status.

## 9. Clases de proveedor

REALTIME_VOICE

LLM

TRANSCRIPTION

SPEECH_SYNTHESIS

CATALOG

INVENTORY

PRICING

ERP

CRM

MESSAGING

EMAIL

PAYMENT

IDENTITY

MAPS

STORAGE

OBSERVABILITY

## 10. Selección de proveedor

Puede depender de:

- tenant;
- región;
- idioma;
- canal;
- capacidad;
- coste;
- health;
- latencia;
- privacidad;
- contrato;
- feature flag.

La selección debe ser determinística bajo la misma política.

## 11. Health states

HEALTHY

DEGRADED

UNAVAILABLE

RATE_LIMITED

MAINTENANCE

UNKNOWN

Un proveedor UNKNOWN no debe considerarse HEALTHY.

## 12. Timeout

Toda operación debe declarar:

- connection timeout;
- response timeout;
- idle timeout;
- total timeout.

No usar timeouts infinitos.

## 13. Reintentos

Toda política debe declarar:

- errores reintentables;
- cantidad máxima;
- backoff;
- jitter;
- presupuesto total;
- idempotencia;
- condiciones de cancelación.

## 14. Circuit breaker

Estados:

CLOSED

OPEN

HALF_OPEN

Debe operar por:

- proveedor;
- operación;
- región;
- tenant tier cuando corresponda.

## 15. Failover

Debe validar:

- compatibilidad;
- privacidad;
- región;
- schema;
- idempotencia;
- contexto;
- coste;
- calidad.

El failover no puede ocultar un resultado UNKNOWN.

## 16. UNKNOWN

Puede aparecer cuando:

- timeout después de enviar;
- respuesta perdida;
- conexión cerrada;
- webhook retrasado;
- proveedor no ofrece consulta.

Debe iniciar conciliación.

## 17. Webhooks

Todo webhook debe validar:

- firma;
- timestamp;
- replay;
- schema;
- provider;
- tenant;
- event ID;
- ordering;
- deduplication.

## 18. Streaming

Debe incluir:

- stream ID;
- sequence;
- generation;
- direction;
- format;
- cancellation;
- backpressure;
- close reason.

## 19. Archivos

Si existe file exchange:

- checksum;
- encryption;
- content type;
- size limit;
- virus scan;
- retention;
- tenant;
- idempotency;
- import status.

## 20. Seguridad

Nunca exponer:

- API Keys;
- client secrets;
- signing secrets;
- tokens permanentes;
- credenciales de otros tenants;
- datos internos.

## 21. Privacidad

Debe documentar:

- datos enviados;
- propósito;
- región;
- retención;
- entrenamiento;
- subprocesadores;
- eliminación;
- acceso.

## 22. Observabilidad

Métricas globales:

- integration_requests_total;
- integration_success_total;
- integration_failure_total;
- integration_timeout_total;
- integration_unknown_total;
- integration_retry_total;
- integration_circuit_open_total;
- integration_failover_total;
- integration_duration_seconds;
- integration_cost_estimate.

## 23. Errores generales

INTEGRATION_PROVIDER_UNAVAILABLE

INTEGRATION_TIMEOUT

INTEGRATION_RATE_LIMITED

INTEGRATION_SCHEMA_INVALID

INTEGRATION_AUTHENTICATION_FAILED

INTEGRATION_AUTHORIZATION_FAILED

INTEGRATION_IDEMPOTENCY_CONFLICT

INTEGRATION_RESULT_UNKNOWN

INTEGRATION_CIRCUIT_OPEN

INTEGRATION_FAILOVER_NOT_ALLOWED

INTEGRATION_SECURITY_POLICY_DENIED

## 24. Eventos generales

IntegrationRequested

IntegrationExecutionStarted

IntegrationSucceeded

IntegrationFailed

IntegrationTimedOut

IntegrationMarkedUnknown

IntegrationRetryScheduled

IntegrationCircuitOpened

IntegrationCircuitHalfOpened

IntegrationCircuitClosed

IntegrationFailoverActivated

IntegrationReconciliationStarted

IntegrationReconciliationCompleted

## 25. Criterios de aceptación

AC-INT-INDEX-001

Todo proveedor usa interfaz.

AC-INT-INDEX-002

Todo error se normaliza.

AC-INT-INDEX-003

Toda llamada posee timeout.

AC-INT-INDEX-004

Todo reintento es limitado.

AC-INT-INDEX-005

Toda escritura usa idempotencia.

AC-INT-INDEX-006

UNKNOWN se concilia.

AC-INT-INDEX-007

Los secretos no salen del backend.

AC-INT-INDEX-008

Los tenants están aislados.

AC-INT-INDEX-009

El failover es explícito.

AC-INT-INDEX-010

Toda integración es observable.

## 26. Checklist

[ ] Existe Provider Interface.
[ ] Existen contratos.
[ ] Existen estados.
[ ] Existen timeouts.
[ ] Existen reintentos.
[ ] Existe circuit breaker.
[ ] Existe failover.
[ ] Existe UNKNOWN policy.
[ ] Existen webhooks seguros.
[ ] Existe streaming controlado.
[ ] Existe gestión de archivos.
[ ] Existe seguridad.
[ ] Existe privacidad.
[ ] Existe observabilidad.
[ ] Existe testing.

======================================================================
FIN DEL DOCUMENTO
======================================================================
