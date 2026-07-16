======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-05-10-INTEGRATION-TESTING.md

# TESTING DE INTEGRACIONES EXTERNAS

## 1. Objetivo

Este documento define la estrategia exhaustiva de pruebas de todas las
integraciones externas de VoiceShop.

Las pruebas deben verificar:

- contratos;
- schemas;
- timeouts;
- reintentos;
- idempotencia;
- circuit breakers;
- bulkheads;
- webhooks;
- replay;
- ordering;
- archivos;
- streaming;
- failover;
- fallback;
- UNKNOWN;
- conciliación;
- seguridad;
- privacidad;
- observabilidad;
- rendimiento;
- resiliencia.

## 2. Alcance

Incluye pruebas para:

- Realtime Provider;
- LLM Provider;
- mensajería;
- ERP;
- CRM;
- pagos;
- webhooks;
- polling;
- batch files;
- streaming;
- retries;
- circuits;
- bulkheads;
- rate limits;
- queues;
- failover;
- security;
- observability;
- chaos.

## 3. Principios

RULE-ITGTEST-001

Toda integración debe poseer contract tests.

RULE-ITGTEST-002

Toda llamada debe probar timeout.

RULE-ITGTEST-003

Toda escritura debe probar idempotencia.

RULE-ITGTEST-004

Toda escritura debe probar timeout después de enviar.

RULE-ITGTEST-005

Todo webhook debe probar firma y replay.

RULE-ITGTEST-006

Todo evento debe probar duplicados.

RULE-ITGTEST-007

Todo evento debe probar ordering.

RULE-ITGTEST-008

Todo fallback debe probar seguridad.

RULE-ITGTEST-009

Todo failover debe probar compatibilidad.

RULE-ITGTEST-010

Todo UNKNOWN debe probar conciliación.

RULE-ITGTEST-011

Todo tenant debe probar aislamiento.

RULE-ITGTEST-012

Todo secreto debe probar redacción.

RULE-ITGTEST-013

Los stubs deben modelar fallos.

RULE-ITGTEST-014

La evidencia debe ser reproducible.

RULE-ITGTEST-015

Los fallos de seguridad bloquean release.

## 4. Capas de prueba

UNIT

- mappers;
- schema validators;
- error normalization;
- retry classification;
- signatures;
- hashes;
- state machines.

COMPONENT

- adapters;
- webhook handlers;
- polling workers;
- file processors;
- reconciliation workers;
- provider selectors.

CONTRACT

- provider API;
- SDK;
- events;
- webhook schema;
- files;
- capabilities;
- errors.

INTEGRATION

- adapter + backend;
- provider + idempotency;
- webhook + inbox;
- outbox + consumer;
- payment + order;
- ERP + inventory.

END-TO-END

- customer flow;
- voice flow;
- payment flow;
- ERP export;
- CRM handoff;
- failover.

ADVERSARIAL

- replay;
- spoofing;
- SSRF;
- malicious file;
- schema attack;
- cross-tenant;
- secret exposure.

## 5. Identificadores

Formato:

TEST-INTEGRATION-<ÁREA>-<NÚMERO>

Ejemplos:

TEST-INTEGRATION-WEBHOOK-001

TEST-INTEGRATION-PAYMENT-014

TEST-INTEGRATION-RESILIENCE-023

## 6. Estructura de caso

```yaml
test_id: TEST-INTEGRATION-WEBHOOK-001
title: Rechazar webhook con firma inválida
requirements:
  - AC-ESC-010
  - AC-ISEC-006
given:
  provider: PAYMENT-PROVIDER-A
  webhook_signature: INVALID
when:
  action: receive_webhook
then:
  accepted: false
  error_code: INTEGRATION_SIGNATURE_INVALID
  domain_state_changed: false
  audit_event: IntegrationSignatureRejected
evidence:
  - inbox_state
  - structured_log
  - trace
```

## 7. Datasets

Datasets mínimos:

- integration-contracts;
- integration-errors;
- integration-webhooks;
- integration-retries;
- integration-circuit;
- integration-files;
- integration-streams;
- integration-security;
- integration-payment;
- integration-erp;
- integration-crm;
- integration-messaging;
- integration-realtime;
- integration-llm.

Cada dataset debe declarar:

- Dataset ID;
- versión;
- provider class;
- schema version;
- inputs;
- expected outputs;
- sensitivity;
- checksum;
- license.

## 8. Datos sintéticos

Preferir:

- provider references ficticias;
- tenants ficticios;
- payloads reducidos;
- payment tokens falsos;
- archivos controlados;
- clocks determinísticos;
- errores simulados.

No usar secretos reales.

## 9. Pruebas de Request Envelope

- required fields;
- Correlation ID;
- tenant;
- provider;
- operation;
- schema version;
- timeout;
- payload;
- size;
- unsupported fields.

## 10. Pruebas de Response Envelope

- success;
- retryable failure;
- final failure;
- partial;
- timeout;
- cancelled;
- unknown;
- invalid schema;
- missing provider reference.

## 11. Pruebas de Error Envelope

- stable code;
- retryable;
- unknown;
- safe message;
- redaction;
- provider code mapping;
- channel mapping;
- Correlation ID.

## 12. Pruebas de autenticación

- valid credential;
- expired;
- revoked;
- wrong scope;
- wrong tenant;
- rotation;
- dual key;
- provider rejection;
- secret unavailable.

## 13. Pruebas OAuth

- state;
- PKCE;
- redirect URI;
- nonce;
- code replay;
- refresh;
- revocation;
- expired token;
- invalid scope.

## 14. Pruebas mTLS

- valid certificate;
- expired;
- wrong hostname;
- revoked;
- wrong CA;
- rotation;
- missing client cert.

## 15. Pruebas de request signing

- valid signature;
- invalid signature;
- changed body;
- changed path;
- stale timestamp;
- nonce replay;
- wrong key ID.

## 16. Pruebas de timeout

- connect timeout;
- TLS timeout;
- write timeout;
- read timeout;
- idle timeout;
- total timeout;
- budget exhausted;
- parent budget smaller.

## 17. Timeout before send

Esperado:

- FAILED_RETRYABLE cuando la política lo permite;
- ningún efecto externo;
- retry limitado.

## 18. Timeout after send

Esperado:

- UNKNOWN para escrituras;
- no reintento ciego;
- conciliación;
- misma Idempotency Key.

## 19. Pruebas de retry

- transient read;
- transient write with idempotency;
- permanent error;
- security denial;
- retry-after;
- jitter;
- maximum attempts;
- total budget;
- Session cancelled.

## 20. Pruebas de retry storm

- muchas sesiones;
- proveedor caído;
- circuit;
- jitter;
- bulkhead;
- rate limit;
- no avalancha.

## 21. Pruebas de circuit breaker

- closed;
- threshold;
- open;
- fast reject;
- open duration;
- half-open;
- limited probes;
- recovery;
- provider flapping;
- scope by operation.

## 22. Pruebas de bulkhead

- acquire;
- queue;
- timeout;
- saturation;
- per-provider;
- reads/writes;
- tenant quota;
- reserved capacity;
- release permit.

## 23. Pruebas de fallback

- fresh cache;
- stale allowed;
- stale denied;
- snapshot;
- deterministic rules;
- text degradation;
- human;
- no invented data;
- visible warning.

## 24. Pruebas de failover

- compatible provider;
- incompatible capability;
- region denied;
- privacy mismatch;
- read failover;
- write failover blocked;
- context reconstruction;
- cost limit;
- health state.

## 25. Pruebas de webhooks

- valid;
- invalid method;
- invalid content type;
- oversized body;
- valid signature;
- invalid signature;
- stale timestamp;
- replay;
- duplicate;
- duplicate conflict;
- wrong tenant;
- unknown schema.

## 26. Pruebas de ordering

- ordered events;
- duplicate;
- late event;
- older state;
- missing sequence;
- sequence gap;
- concurrent events;
- reprocessing.

## 27. Pruebas de Inbox

- new event;
- duplicate;
- same ID different hash;
- PROCESSING;
- COMPLETED;
- retryable;
- final failure;
- dead-letter;
- retention.

## 28. Pruebas de polling

- first poll;
- watermark;
- overlap window;
- duplicate;
- gap;
- rate limit;
- timeout;
- page continuation;
- last success;
- clock skew.

## 29. Pruebas de archivos

- valid CSV;
- invalid content type;
- extension mismatch;
- checksum;
- malware;
- ZIP bomb;
- path traversal;
- nested archive;
- size limit;
- row limit;
- encoding;
- partial rows;
- duplicate file.

## 30. Pruebas de streaming

- open;
- sequence;
- duplicate chunk;
- gap;
- out-of-order;
- reconnect;
- cancel;
- close;
- stale generation;
- format mismatch;
- backpressure;
- provider disconnect.

## 31. Pruebas Realtime Provider

- capabilities;
- ephemeral authorization;
- session;
- audio;
- transcripts;
- tool proposal;
- cancel;
- truncate;
- close;
- usage;
- failover;
- stale events.

## 32. Pruebas LLM Provider

- model class;
- prompt version;
- structured output;
- invalid JSON;
- extra fields;
- invented ID;
- invented tool;
- prompt injection;
- indirect injection;
- timeout;
- fallback;
- usage;
- cost.

## 33. Pruebas de mensajería

- inbound text;
- voice message;
- attachment;
- button;
- signed callback;
- stale menu;
- outbound;
- delivery;
- delivery unknown;
- channel unavailable;
- handoff.

## 34. Pruebas ERP

- entity mapping;
- order export;
- duplicate export;
- timeout after send;
- external status unknown;
- inventory delta;
- sequence gap;
- unit mismatch;
- batch partial;
- reconciliation.

## 35. Pruebas CRM

- customer mapping;
- case creation;
- activity;
- handoff;
- PII minimization;
- timeout;
- duplicate;
- field conflict;
- deletion;
- reconciliation.

## 36. Pruebas de pagos

- create intent;
- amount official;
- currency;
- hosted checkout;
- return without approval;
- webhook;
- duplicate;
- ordering;
- timeout after send;
- approval;
- decline;
- cancellation;
- refund;
- partial refund;
- UNKNOWN;
- reconciliation.

## 37. Pruebas de idempotencia

- same key same payload;
- same key different payload;
- provider supports key;
- provider lacks key;
- internal record;
- PROCESSING;
- COMPLETED;
- UNKNOWN;
- retention;
- concurrent retries.

## 38. Pruebas de rate limit

- internal;
- external;
- retry_after;
- reset;
- tenant limit;
- provider limit;
- abusive client;
- no busy loop.

## 39. Pruebas de queue

- enqueue;
- dequeue;
- retry;
- visibility timeout;
- duplicate;
- ordering;
- priority;
- maximum depth;
- maximum age;
- dead-letter;
- recovery.

## 40. Pruebas de UNKNOWN

Casos:

- payment write;
- ERP order;
- outbound message;
- provider cancellation;
- file import response lost.

Validar:

- no duplicate effect;
- Reconciliation ID;
- evidence plan;
- escalation;
- final classification.

## 41. Pruebas de conciliación

- query by provider reference;
- query by idempotency;
- webhook history;
- internal ledger;
- conflicting evidence;
- no evidence;
- manual review;
- repeated reconciliation;
- timeout;
- audit.

## 42. Pruebas de seguridad

- secret leak;
- scope escalation;
- cross-tenant;
- webhook spoof;
- replay;
- SSRF;
- DNS rebinding;
- open redirect;
- schema bomb;
- malicious file;
- prompt injection;
- provider compromise;
- supply-chain issue.

## 43. Pruebas de privacidad

- PII minimization;
- logs;
- traces;
- metrics;
- retention;
- deletion;
- region;
- provider policy;
- debug mode;
- external payload.

## 44. Pruebas de observabilidad

- logs;
- metrics;
- traces;
- correlation;
- retries;
- circuits;
- bulkheads;
- fallback;
- failover;
- webhooks;
- queues;
- UNKNOWN;
- security;
- cardinality;
- redaction;
- sampling;
- dashboards;
- alerts.

## 45. Pruebas de rendimiento

Medir:

- adapter latency;
- webhook throughput;
- queue throughput;
- file processing;
- streaming;
- retries;
- circuit;
- reconciliation;
- provider calls.

Métricas:

- p50;
- p95;
- p99;
- throughput;
- CPU;
- memory;
- sockets;
- queue depth;
- cost.

## 46. Pruebas de carga

- steady;
- spike;
- provider slow;
- provider down;
- webhook burst;
- payment burst;
- messaging burst;
- file batch;
- reconnect storm;
- retry storm.

## 47. Pruebas de caos

Inyectar:

- DNS failure;
- TLS failure;
- timeout;
- 429;
- 500;
- malformed response;
- partial response;
- connection reset;
- duplicate events;
- out-of-order;
- event bus down;
- cache down;
- secret manager down;
- clock skew;
- disk full.

## 48. Contract testing por proveedor

Cada provider adapter debe poseer:

- capability contract;
- request contract;
- response contract;
- error contract;
- webhook contract;
- usage contract;
- health contract;
- version compatibility matrix.

## 49. Consumer-driven contracts

VoiceShop declara:

- campos requeridos;
- semántica;
- errores;
- ordering;
- idempotency;
- compatibility.

El proveedor stub debe verificar esos contratos.

## 50. Sandbox del proveedor

Usar cuando exista.

No asumir que sandbox reproduce:

- timeouts;
- race conditions;
- webhooks duplicados;
- settlement;
- limits.

Complementar con stubs.

## 51. Stubs requeridos

- RealtimeProviderStub;
- LLMProviderStub;
- MessagingProviderStub;
- ERPStub;
- CRMStub;
- PaymentProviderStub;
- SecretManagerStub;
- WebhookSignerStub;
- QueueStub;
- ClockStub;
- FileScannerStub;
- CircuitBreakerStub.

## 52. Capacidades de stubs

- latency;
- timeout before send;
- timeout after send;
- invalid schema;
- rate limit;
- duplicate;
- out-of-order;
- unknown;
- partial;
- security rejection;
- provider down;
- recovery.

## 53. Property-based testing

Aplicar a:

- schemas;
- mappers;
- retries;
- backoff;
- signatures;
- idempotency;
- cursors;
- event ordering;
- file parsers.

Propiedades:

- deterministic mapping;
- no crash;
- no secret output;
- no duplicate effect;
- tenant isolation;
- bounded retry;
- stable error codes.

## 54. Mutation testing

Aplicar a:

- signature checks;
- tenant checks;
- timeout classification;
- retry decisions;
- idempotency;
- amount validation;
- schema validation;
- secret redaction.

## 55. Regression suite

Debe incluir:

- duplicate payment;
- webhook replay;
- stale ERP event;
- invalid LLM structure;
- Realtime stale generation;
- stale callback;
- SSRF;
- ZIP traversal;
- retry storm;
- UNKNOWN retry bug;
- secret logging.

## 56. Entornos

LOCAL

Stubs.

CI

Mocks y servicios efímeros.

STAGING

Sandboxes y datos sintéticos.

CANARY

Tráfico limitado.

SHADOW

Comparación sin efectos.

PRODUCTION

Monitoreo y reconciliación.

## 57. Criterios de bloqueo

Bloquear release si:

- secretos aparecen en logs;
- webhook spoof aceptado;
- replay produce efecto;
- cross-tenant;
- escritura UNKNOWN se reintenta ciegamente;
- pago duplicado;
- amount controlado por Cliente;
- failover duplica escritura;
- SSRF;
- archivo malicioso se procesa;
- retry no acotado.

## 58. Evidencia

Conservar:

- Test Run ID;
- commit;
- adapter version;
- provider sandbox version;
- dataset version;
- schema version;
- seed;
- clock;
- configuration;
- hashes;
- requests redactados;
- responses redactadas;
- traces;
- metrics;
- logs;
- fallos.

## 59. Errores de testing

INTEGRATION_TEST_DATASET_INVALID

INTEGRATION_TEST_ENVIRONMENT_UNAVAILABLE

INTEGRATION_TEST_PROVIDER_UNAVAILABLE

INTEGRATION_TEST_THRESHOLD_FAILED

INTEGRATION_TEST_CONTRACT_FAILED

INTEGRATION_TEST_SECURITY_FAILURE

INTEGRATION_TEST_TENANT_ISOLATION_FAILURE

INTEGRATION_TEST_IDEMPOTENCY_FAILURE

INTEGRATION_TEST_PRIVACY_VIOLATION

INTEGRATION_TEST_EVIDENCE_INCOMPLETE

## 60. Criterios de aceptación

AC-ITGTEST-001

Toda integración tiene contract tests.

AC-ITGTEST-002

Toda llamada prueba timeout.

AC-ITGTEST-003

Toda escritura prueba idempotencia.

AC-ITGTEST-004

Toda escritura prueba timeout posterior.

AC-ITGTEST-005

Todo webhook prueba firma y replay.

AC-ITGTEST-006

Todo evento prueba duplicados.

AC-ITGTEST-007

Todo evento prueba ordering.

AC-ITGTEST-008

Todo fallback prueba seguridad.

AC-ITGTEST-009

Todo failover prueba compatibilidad.

AC-ITGTEST-010

Todo UNKNOWN prueba conciliación.

AC-ITGTEST-011

Todo tenant prueba aislamiento.

AC-ITGTEST-012

Todo secreto prueba redacción.

AC-ITGTEST-013

Los stubs modelan fallos.

AC-ITGTEST-014

La evidencia es reproducible.

AC-ITGTEST-015

La seguridad bloquea release.

## 61. Checklist

[ ] Unit tests.
[ ] Component tests.
[ ] Contract tests.
[ ] Integration tests.
[ ] E2E tests.
[ ] Request tests.
[ ] Response tests.
[ ] Error tests.
[ ] Authentication tests.
[ ] Timeout tests.
[ ] Retry tests.
[ ] Circuit tests.
[ ] Bulkhead tests.
[ ] Fallback tests.
[ ] Failover tests.
[ ] Webhook tests.
[ ] Polling tests.
[ ] File tests.
[ ] Streaming tests.
[ ] Realtime tests.
[ ] LLM tests.
[ ] Messaging tests.
[ ] ERP tests.
[ ] CRM tests.
[ ] Payment tests.
[ ] Idempotency tests.
[ ] Queue tests.
[ ] UNKNOWN tests.
[ ] Reconciliation tests.
[ ] Security tests.
[ ] Privacy tests.
[ ] Observability tests.
[ ] Performance tests.
[ ] Chaos tests.
[ ] Evidence.
[ ] Canary.
[ ] Rollback plan.

======================================================================
FIN DEL DOCUMENTO
======================================================================
