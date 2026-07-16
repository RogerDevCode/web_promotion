======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-04-09-INVENTORY-TESTING.md

# TESTING DEL CONTEXTO DE INVENTARIO

## 1. Objetivo

Este documento define la estrategia exhaustiva de pruebas del contexto
de inventario de VoiceShop.

Las pruebas deben verificar:

- exactitud de balances;
- disponibilidad;
- prevención de sobreventa;
- reservas;
- liberaciones;
- expiraciones;
- commits;
- ajustes;
- concurrencia;
- idempotencia;
- recuperación;
- conciliación;
- aislamiento de tenant;
- seguridad;
- observabilidad;
- rendimiento;
- resiliencia.

## 2. Alcance

Incluye pruebas de:

- availability;
- balances;
- formulas;
- units;
- locations;
- reservations;
- release;
- expiration;
- commit;
- adjustments;
- approvals;
- reversals;
- versions;
- locks;
- leases;
- fencing;
- deadlocks;
- idempotency;
- batches;
- sagas;
- movements;
- snapshots;
- events;
- source integration;
- UNKNOWN;
- reconciliation;
- errors;
- observability;
- security;
- performance;
- chaos.

## 3. Principios

RULE-ITEST-001

Todo requisito de inventario debe mapearse a pruebas.

RULE-ITEST-002

Toda regla debe poseer prueba positiva y negativa.

RULE-ITEST-003

Toda escritura debe probar idempotencia.

RULE-ITEST-004

Toda escritura debe probar conflicto de versión.

RULE-ITEST-005

Toda reserva debe probar sobreventa.

RULE-ITEST-006

Toda liberación debe probar doble ejecución.

RULE-ITEST-007

Toda expiración debe probar workers concurrentes.

RULE-ITEST-008

Todo ajuste debe probar autorización.

RULE-ITEST-009

Toda operación UNKNOWN debe probar conciliación.

RULE-ITEST-010

Toda dependencia debe probar timeout.

RULE-ITEST-011

Todo tenant debe probar aislamiento.

RULE-ITEST-012

Los datasets deben versionarse.

RULE-ITEST-013

Las pruebas deben producir evidencia reproducible.

RULE-ITEST-014

No se usan secretos ni pagos reales.

RULE-ITEST-015

Una regresión crítica bloquea release.

## 4. Capas

UNIT

- formulas;
- quantities;
- units;
- states;
- validators;
- idempotency hashing;
- version checks;
- retry policies.

COMPONENT

- Availability Service;
- Balance Aggregate;
- Reservation Aggregate;
- Release Handler;
- Expiration Worker;
- Adjustment Handler;
- Reconciliation Engine.

CONTRACT

- ERP/WMS;
- event bus;
- cache;
- lock service;
- clock;
- catalog;
- order.

INTEGRATION

- reserve + balance;
- release + balance;
- expire + balance;
- commit + order;
- adjustment + approval;
- outbox + consumer.

END-TO-END

- search product;
- check stock;
- reserve;
- add cart;
- confirm order;
- release;
- voice;
- text.

ADVERSARIAL

- cross-tenant;
- replay;
- key abuse;
- version spoof;
- lock tampering;
- approval replay;
- over-reservation.

## 5. Identificadores

Formato:

TEST-INVENTORY-<ÁREA>-<NÚMERO>

Ejemplos:

TEST-INVENTORY-AVAILABILITY-001

TEST-INVENTORY-RESERVATION-014

TEST-INVENTORY-CONCURRENCY-023

## 6. Estructura de caso

```yaml
test_id: TEST-INVENTORY-RESERVATION-001
title: Reservar cantidad disponible
requirements:
  - AC-RES-008
  - AC-RES-009
given:
  balance:
    available: 10
    inventory_version: 7
  command:
    quantity: 6
    expected_inventory_version: 7
when:
  action: ReserveStock
then:
  reservation_status: ACTIVE
  reserved_quantity: 6
  available_after: 4
  inventory_version_after: 8
  event: StockReserved
evidence:
  - aggregate_snapshot
  - movement
  - outbox
  - trace
```

## 7. Datasets

Datasets mínimos:

- inventory-basic-balances;
- inventory-zero-stock;
- inventory-low-stock;
- inventory-multi-location;
- inventory-reservations;
- inventory-expiration;
- inventory-adjustments;
- inventory-concurrency;
- inventory-idempotency;
- inventory-source-events;
- inventory-security;
- Chilean-retail-inventory.

Cada dataset debe declarar:

- Dataset ID;
- versión;
- tenant;
- Product IDs;
- Location IDs;
- units;
- balances;
- versions;
- reservations;
- expected results;
- checksum.

## 8. Datos sintéticos

Preferir:

- tenants ficticios;
- productos ficticios;
- ubicaciones ficticias;
- cantidades controladas;
- clocks determinísticos;
- IDs reproducibles.

## 9. Pruebas de availability

- stock cero;
- stock exacto;
- stock mayor;
- stock insuficiente;
- required quantity;
- exact location;
- multi-location;
- aggregated;
- single-location fulfillment;
- multi-location fulfillment;
- stale;
- unknown;
- partial;
- source down;
- cache fresh;
- cache stale;
- restriction.

## 10. Pruebas de Product ID

- válido;
- inexistente;
- inactive;
- restricted;
- other tenant;
- unit mismatch;
- Catalog unavailable.

## 11. Pruebas de Location ID

- válida;
- inexistente;
- inactive;
- closed;
- restricted;
- other tenant;
- capability mismatch.

## 12. Pruebas de balances

- create;
- read;
- update;
- buckets;
- available formula;
- version;
- measured_at;
- source;
- unit;
- location;
- tenant.

## 13. Pruebas de invariantes

- reserved negativo;
- committed negativo;
- blocked negativo;
- damaged negativo;
- safety stock negativo;
- available formula mismatch;
- negative available;
- unit mismatch;
- tenant mismatch;
- version non-monotonic.

## 14. Pruebas de fórmulas

- base formula;
- safety stock;
- damaged;
- blocked;
- in-transit excluded;
- formula version;
- recalculation;
- migration;
- null quantities.

## 15. Pruebas de unidades

- integer unit;
- decimal unit;
- precision;
- rounding;
- conversion;
- unsupported conversion;
- presentation mismatch.

## 16. Pruebas de snapshots

- complete;
- partial;
- stale;
- strong;
- eventual;
- multi-location;
- missing balance;
- source error;
- tenant;
- version.

## 17. Pruebas de reservas

- valid;
- exact stock;
- insufficient;
- all-or-nothing;
- partial allowed;
- partial denied;
- TTL;
- owner;
- Product ID;
- Location ID;
- authorization;
- status;
- version;
- idempotency.

## 18. Pruebas de owner

- Cart active;
- Cart closed;
- Order compatible;
- owner not found;
- other tenant;
- state changed;
- unauthorized actor;
- anonymous Session allowed;
- human control.

## 19. Pruebas de TTL

- default;
- minimum;
- maximum;
- invalid;
- server clock;
- renewal;
- renewal limit;
- expiration race;
- Session expiration.

## 20. Pruebas de idempotencia de reserva

- same key same payload;
- same key different quantity;
- same key different Product ID;
- PROCESSING;
- COMPLETED;
- FAILED_RETRYABLE;
- FAILED_FINAL;
- UNKNOWN;
- record expiry.

## 21. Pruebas de sobreventa

Stock:

6.

Dos reservas de 6.

Esperado:

- una success;
- una conflict o insufficient;
- available nunca negativo;
- reserved total 6.

Ejecutar con alta concurrencia.

## 22. Pruebas de liberación

- total;
- partial;
- invalid quantity;
- owner;
- tenant;
- state;
- already released;
- already expired;
- committed;
- version;
- idempotency;
- balance update;
- movement;
- outbox.

## 23. Pruebas de doble liberación

Dos comandos simultáneos.

Esperado:

- available aumenta una sola vez;
- un resultado terminal;
- no doble movement efectivo.

## 24. Pruebas de expiración

- due;
- not due;
- active;
- partial active;
- committed;
- released;
- expired;
- worker;
- lease;
- retry;
- backlog;
- lag;
- system clock.

## 25. Pruebas de dos workers

Ambos reclaman misma reserva.

Esperado:

- uno adquiere;
- uno salta;
- una liberación;
- un evento efectivo.

## 26. Pruebas de worker crash

- crash before state;
- after EXPIRING;
- after balance update;
- before event publication;
- lease expiry;
- recovery;
- idempotency.

## 27. Pruebas expire vs commit

Ejecutar simultáneamente.

Validar:

- una transición gana;
- versiones coherentes;
- no release después de commit;
- no commit después de expiry.

## 28. Pruebas release vs change

- release total;
- increase quantity;
- decrease quantity;
- version conflict;
- state reload.

## 29. Pruebas de commit

- valid;
- expired;
- released;
- owner mismatch;
- order mismatch;
- duplicate;
- version;
- UNKNOWN;
- outbox;
- compensation.

## 30. Pruebas de ajustes

- receipt;
- count correction;
- loss;
- damage;
- recovery;
- block;
- unblock;
- transfer;
- return;
- disposal;
- reconciliation;
- reversal.

## 31. Pruebas de operaciones de ajuste

- INCREASE_BY;
- DECREASE_BY;
- SET_TO;
- MOVE_BETWEEN_BUCKETS;
- zero delta;
- negative result;
- invalid bucket;
- reserved bucket forbidden.

## 32. Pruebas de razones y evidencia

- reason valid;
- missing;
- unknown;
- evidence required;
- evidence missing;
- invalid reference;
- malicious text;
- redaction.

## 33. Pruebas de aprobación

- required;
- valid;
- missing;
- expired;
- revoked;
- payload mismatch;
- quantity changed;
- bucket changed;
- consumed;
- approver invalid;
- replay.

## 34. Pruebas de límites

- max delta;
- relative delta;
- daily count;
- per actor;
- per location;
- batch size;
- threshold crossing;
- override authorized.

## 35. Pruebas de reversión

- valid;
- original not found;
- already reversed;
- later changes;
- approval;
- partial;
- result unknown;
- audit.

## 36. Pruebas de versión

- exact;
- conflict;
- stale;
- missing;
- server generated;
- multiple aggregates;
- compare-and-swap;
- retry.

## 37. Pruebas de locks

- acquire;
- timeout;
- owner token;
- release;
- wrong owner;
- TTL;
- renewal;
- process crash;
- fencing;
- stale owner.

## 38. Pruebas de fencing

Proceso A obtiene token 10.

Pierde lock.

Proceso B obtiene token 11.

A intenta escribir con 10.

Debe rechazarse.

## 39. Pruebas de deadlock

- two balances;
- reverse order;
- detector;
- abort;
- retry;
- same Idempotency Key;
- max attempts;
- resource release.

## 40. Pruebas multi-item

- atomic success;
- one line insufficient;
- rollback;
- per-line partial;
- saga;
- compensation;
- deadlock;
- ordering;
- UNKNOWN.

## 41. Pruebas de movimientos

- create;
- duplicate;
- order;
- source;
- quantity;
- buckets;
- versions;
- persistence;
- reconciliation.

## 42. Pruebas de eventos

- schema;
- publish;
- duplicate;
- out-of-order;
- aggregate mismatch;
- version mismatch;
- consumer retry;
- inbox;
- outbox;
- late event.

## 43. Pruebas de fuente externa

- success;
- timeout;
- invalid schema;
- duplicate;
- gap;
- stale version;
- authentication;
- authorization;
- result unknown;
- retry;
- reconciliation.

## 44. Pruebas UNKNOWN

Casos:

- timeout after write;
- source disconnect;
- event uncertain;
- worker crash;
- transaction response lost.

Validar:

- no retry ciego;
- Idempotency Record UNKNOWN;
- reconciliation;
- final classification;
- alert after threshold.

## 45. Pruebas de conciliación

- movement found;
- reservation active;
- balance changed;
- no evidence;
- conflicting evidence;
- manual review;
- success;
- failure;
- repeated reconciliation;
- authorization;
- audit.

## 46. Pruebas de errores

Cada código de:

13-04-07-INVENTORY-ERRORS.md

debe probar:

- trigger;
- safe mapping;
- retryable;
- reconciliation flag;
- redaction;
- channel adaptation;
- telemetry;
- audit.

## 47. Pruebas de observabilidad

- logs;
- metrics;
- traces;
- versions;
- idempotency;
- reservation;
- release;
- expiration;
- adjustment;
- UNKNOWN;
- reconciliation;
- redaction;
- cardinality;
- sampling;
- alerts;
- dashboards;
- backend down.

## 48. Pruebas de seguridad

- cross-tenant;
- Product ID spoof;
- Location ID spoof;
- actor spoof;
- owner spoof;
- version spoof;
- key abuse;
- approval replay;
- lock tampering;
- fencing;
- adjustment abuse;
- enumeration.

## 49. Pruebas de privacidad

- PII in owner context;
- logs;
- traces;
- metrics;
- audit;
- evidence references;
- retention;
- access;
- deletion;
- debug mode.

## 50. Pruebas de rendimiento

Medir:

- availability;
- reserve;
- release;
- expire;
- commit;
- adjust;
- lock wait;
- reconciliation;
- event publication.

Métricas:

- p50;
- p95;
- p99;
- throughput;
- CPU;
- memory;
- lock contention;
- database contention;
- backlog;
- cost.

## 51. Pruebas de carga

- steady;
- spike;
- flash sale;
- low stock contention;
- mass expiry;
- cache cold;
- source slow;
- event backlog;
- reconciliation backlog.

## 52. Pruebas de caos

Inyectar:

- DB timeout;
- lock service down;
- cache down;
- event bus down;
- source down;
- network partition;
- worker crash;
- clock skew;
- duplicate events;
- delayed events;
- partial response;
- storage full.

## 53. Property-based testing

Aplicar a:

- formulas;
- quantities;
- units;
- versions;
- idempotency hashes;
- reservation FSM;
- release FSM;
- adjustments;
- serialization.

Propiedades:

- no negative available;
- deterministic formula;
- idempotency;
- monotonic version;
- tenant isolation;
- no duplicate effect;
- valid state transitions.

## 54. Mutation testing

Aplicar a:

- tenant checks;
- version checks;
- quantity limits;
- status checks;
- idempotency;
- approval;
- locks;
- fencing;
- invariants.

## 55. Contract tests

Catalog:

- Product ID;
- status;
- unit;
- tenant.

Order:

- owner;
- commit;
- cancel.

Source:

- balances;
- versions;
- errors.

Lock service:

- ownership;
- TTL;
- fencing.

## 56. Regression suite

Debe incluir:

- over-reservation;
- double release;
- missed expiry;
- negative available;
- adjustment abuse;
- stale fencing;
- duplicate event;
- UNKNOWN retry;
- cross-tenant;
- outbox loss.

## 57. Stubs

- CatalogStub;
- OrderStub;
- InventorySourceStub;
- LockServiceStub;
- ClockStub;
- EventBusStub;
- CacheStub;
- ApprovalStub;
- IDGeneratorStub.

Deben soportar:

- timeout;
- duplicate;
- stale;
- conflict;
- unknown;
- crash;
- latency;
- invalid schema.

## 58. Entornos

LOCAL

Stubs y clock controlado.

CI

DB y servicios efímeros.

STAGING

Datos sintéticos y concurrencia.

CANARY

Operaciones limitadas.

PRODUCTION SHADOW

Lecturas y conciliación sin efectos no autorizados.

## 59. Criterios de bloqueo

Bloquear release si:

- available puede quedar negativo;
- sobreventa;
- doble liberación;
- idempotencia rota;
- version check ausente;
- cross-tenant;
- adjustment sin autorización;
- approval replay;
- UNKNOWN se reintenta ciegamente;
- outbox inconsistente;
- fencing antiguo escribe.

## 60. Evidencia

Conservar:

- Test Run ID;
- commit;
- dataset version;
- seed;
- clock;
- concurrency level;
- configuration;
- hashes;
- aggregate snapshots;
- movements;
- outbox;
- traces;
- metrics;
- logs redactados;
- failures.

## 61. Errores de testing

INVENTORY_TEST_DATASET_INVALID

INVENTORY_TEST_ENVIRONMENT_UNAVAILABLE

INVENTORY_TEST_DEPENDENCY_UNAVAILABLE

INVENTORY_TEST_THRESHOLD_FAILED

INVENTORY_TEST_TENANT_ISOLATION_FAILURE

INVENTORY_TEST_OVERSELL_FAILURE

INVENTORY_TEST_IDEMPOTENCY_FAILURE

INVENTORY_TEST_PRIVACY_VIOLATION

INVENTORY_TEST_EVIDENCE_INCOMPLETE

INVENTORY_TEST_NON_DETERMINISTIC_FAILURE

## 62. Criterios de aceptación

AC-ITEST-001

Todo requisito posee prueba.

AC-ITEST-002

Toda regla posee prueba negativa.

AC-ITEST-003

Toda escritura prueba idempotencia.

AC-ITEST-004

Toda escritura prueba versión.

AC-ITEST-005

Toda reserva prueba sobreventa.

AC-ITEST-006

Toda liberación prueba duplicados.

AC-ITEST-007

Toda expiración prueba workers concurrentes.

AC-ITEST-008

Todo ajuste prueba autorización.

AC-ITEST-009

UNKNOWN prueba conciliación.

AC-ITEST-010

Toda dependencia prueba timeout.

AC-ITEST-011

Todo tenant prueba aislamiento.

AC-ITEST-012

Los datasets están versionados.

AC-ITEST-013

La evidencia es reproducible.

AC-ITEST-014

La seguridad bloquea release.

AC-ITEST-015

La recuperación se prueba.

## 63. Checklist

[ ] Unit tests.
[ ] Component tests.
[ ] Contract tests.
[ ] Integration tests.
[ ] E2E tests.
[ ] Availability tests.
[ ] Balance tests.
[ ] Formula tests.
[ ] Reservation tests.
[ ] Release tests.
[ ] Expiration tests.
[ ] Commit tests.
[ ] Adjustment tests.
[ ] Approval tests.
[ ] Version tests.
[ ] Idempotency tests.
[ ] Lock tests.
[ ] Fencing tests.
[ ] Deadlock tests.
[ ] Batch tests.
[ ] Movement tests.
[ ] Event tests.
[ ] Source tests.
[ ] UNKNOWN tests.
[ ] Reconciliation tests.
[ ] Error tests.
[ ] Observability tests.
[ ] Security tests.
[ ] Privacy tests.
[ ] Performance tests.
[ ] Chaos tests.
[ ] Evidence.
[ ] Canary.
[ ] Rollback plan.

======================================================================
FIN DEL DOCUMENTO
======================================================================
