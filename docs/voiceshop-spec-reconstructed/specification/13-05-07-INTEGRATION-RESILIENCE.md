======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-05-07-INTEGRATION-RESILIENCE.md

# RESILIENCIA DE INTEGRACIONES

## 1. Objetivo

Este documento define cómo VoiceShop mantiene un comportamiento seguro y
predecible cuando una dependencia externa:

- responde lentamente;
- no responde;
- limita tráfico;
- devuelve errores;
- entrega resultados parciales;
- cambia schema;
- envía eventos duplicados;
- envía eventos fuera de orden;
- queda degradada;
- produce un resultado incierto;
- recupera servicio.

La resiliencia no debe convertir un fallo técnico en una operación
duplicada.

## 2. Alcance

Incluye:

- timeout;
- retry;
- backoff;
- jitter;
- circuit breaker;
- bulkhead;
- rate limit;
- fallback;
- failover;
- cache fallback;
- queueing;
- load shedding;
- cancellation;
- UNKNOWN;
- reconciliation;
- health;
- recovery;
- dependency graph;
- degradation;
- observability;
- QA.

No incluye:

- implementación de librería específica;
- infraestructura física;
- reglas comerciales detalladas;
- almacenamiento concreto;
- configuración de proveedor particular.

## 3. Principios

RULE-IRES-001

Toda llamada externa posee timeout.

RULE-IRES-002

Todo reintento es limitado.

RULE-IRES-003

No se reintenta una escritura UNKNOWN a ciegas.

RULE-IRES-004

Toda escritura reintentable usa idempotencia.

RULE-IRES-005

El circuit breaker opera por alcance explícito.

RULE-IRES-006

Los bulkheads evitan agotamiento global.

RULE-IRES-007

El fallback debe preservar semántica.

RULE-IRES-008

El failover debe preservar seguridad y privacidad.

RULE-IRES-009

La degradación debe ser visible.

RULE-IRES-010

Los resultados parciales deben declararse.

RULE-IRES-011

La recuperación debe evitar avalanchas.

RULE-IRES-012

Los health checks no ejecutan operaciones comerciales.

RULE-IRES-013

La carga debe rechazarse antes de agotar el sistema.

RULE-IRES-014

Toda decisión de resiliencia debe ser observable.

RULE-IRES-015

Los límites deben versionarse.

## 4. Failure classes

TRANSIENT

Probable recuperación breve.

PERMANENT

Reintentar igual no resuelve.

THROTTLED

Requiere esperar.

DEPENDENCY_DEGRADED

Capacidades parciales.

UNKNOWN_OUTCOME

El efecto puede haber ocurrido.

SECURITY_DENIAL

No reintentar.

DATA_CONTRACT_FAILURE

Requiere corrección.

## 5. Timeout budget

Debe dividirse:

- connection;
- TLS;
- write;
- server processing;
- read;
- total;
- queue wait.

El total debe respetar el SLA de VoiceShop.

## 6. Timeout hierarchy

El timeout de una operación hija debe ser menor que el presupuesto
restante del flujo padre.

No iniciar una llamada si no existe budget suficiente.

## 7. Retry policy

```json
{
  "retry_policy_id": "erp-read-v2",
  "maximum_attempts": 3,
  "initial_backoff_ms": 200,
  "maximum_backoff_ms": 2000,
  "multiplier": 2.0,
  "jitter": true,
  "total_budget_ms": 6000,
  "retryable_error_codes": [
    "TIMEOUT_BEFORE_SEND",
    "TEMPORARY_UNAVAILABLE"
  ]
}
```

## 8. Reintento de lectura

Puede reintentarse cuando:

- operación es segura;
- budget;
- error transitorio;
- circuit permite;
- Session activa.

## 9. Reintento de escritura

Sólo cuando:

- existe Idempotency Key;
- proveedor soporta o backend concilia;
- no existe UNKNOWN sin resolver;
- payload no cambia;
- estado interno permite.

## 10. Jitter

Debe evitar sincronización masiva.

Tipos:

FULL_JITTER

EQUAL_JITTER

DECORRELATED_JITTER

La política debe ser explícita.

## 11. Retry storm

Controles:

- max attempts;
- total budget;
- circuit breaker;
- rate limit;
- jitter;
- queue limits;
- tenant quotas;
- cancellation.

## 12. Circuit breaker

Estados:

CLOSED

OPEN

HALF_OPEN

Métricas de decisión:

- failure rate;
- minimum calls;
- latency;
- timeout;
- contract errors;
- provider signals.

## 13. Circuit scope

Puede ser:

provider
+ operation
+ region

Evitar un breaker global cuando una sola operación falla.

## 14. OPEN

Debe:

- rechazar rápido;
- usar fallback si permitido;
- no llamar proveedor;
- registrar remaining open time.

## 15. HALF_OPEN

Permite pocas llamadas de prueba.

No enviar escrituras críticas como prueba si existe alternativa segura.

## 16. Cierre del circuit

Requiere:

- pruebas exitosas;
- ventana;
- threshold;
- observabilidad.

## 17. Bulkhead

Recursos separados por:

- provider class;
- writes vs reads;
- realtime vs batch;
- tenant tier;
- operation risk.

## 18. Capacity limits

Debe definir:

- concurrent requests;
- queue size;
- queue wait;
- per-tenant quota;
- reserved capacity;
- emergency capacity.

## 19. Load shedding

Cuando se supera capacidad:

Priorizar:

1. seguridad;
2. callbacks de pago;
3. operaciones de inventario;
4. respuestas activas;
5. lecturas;
6. batch;
7. analytics.

La prioridad final depende del NFR.

## 20. Rate limit interno

Protege:

- proveedor;
- presupuesto;
- tenant;
- actor;
- sistema.

## 21. Rate limit externo

Mapear:

- remaining;
- reset;
- retry_after;
- scope.

No adivinar reset.

## 22. Fallback

Tipos:

CACHE_FRESH

CACHE_STALE_ALLOWED

SNAPSHOT

SECONDARY_PROVIDER

DETERMINISTIC_RULES

TEXT_DEGRADATION

HUMAN_HANDOFF

QUEUED_PROCESSING

## 23. Fallback seguro

Debe:

- conservar tenant;
- indicar freshness;
- no inventar;
- no aprobar efectos;
- no ocultar UNKNOWN;
- registrar uso.

## 24. Fallback prohibido

No usar datos stale para:

- aprobación de pago;
- autorización;
- stock crítico;
- cambio de estado;
- restricciones;
- secretos.

## 25. Failover

Requiere:

- provider compatible;
- región permitida;
- privacidad equivalente;
- schema;
- capabilities;
- idempotencia;
- coste;
- health.

## 26. Failover de escritura

Riesgo:

Proveedor A recibió escritura.

Respuesta perdida.

No enviar a proveedor B sin conciliar A.

## 27. Failover de lectura

Generalmente más seguro.

Debe normalizar resultado.

## 28. Partial result

Debe declarar:

- success items;
- failed items;
- unknown items;
- continuation;
- consistency;
- retry policy.

## 29. Queueing

Puede desacoplar:

- webhooks;
- batch;
- CRM activities;
- analytics;
- reconciliation.

No usar cola para ocultar latencia de una operación interactiva sin
informar estado.

## 30. Queue limits

- maximum depth;
- maximum age;
- priority;
- dead-letter;
- per tenant;
- backpressure;
- visibility timeout.

## 31. Dead-letter

Debe contener:

- message reference;
- failure classification;
- attempts;
- last error;
- tenant;
- Correlation ID;
- next action.

No contener secretos.

## 32. Cancellation

Una Session cerrada puede cancelar:

- llamadas no necesarias;
- generación;
- polling;
- retries.

No cancelar:

- conciliación financiera requerida;
- persistencia crítica;
- auditoría.

## 33. UNKNOWN

Clasificación:

WRITE_UNKNOWN

DELIVERY_UNKNOWN

PAYMENT_UNKNOWN

RESERVATION_UNKNOWN

EXTERNAL_ORDER_UNKNOWN

Debe tener runbook específico.

## 34. Reconciliation

Toda operación UNKNOWN debe crear:

- Reconciliation ID;
- owner;
- deadline;
- evidence plan;
- status;
- escalation;
- result.

## 35. Health model

```json
{
  "dependency_health_id": "UUID",
  "provider_id": "PROVIDER-A",
  "operation": "CREATE_ORDER",
  "status": "DEGRADED",
  "signals": {
    "failure_rate": 0.12,
    "p95_latency_ms": 4200,
    "rate_limited": false
  },
  "valid_until": "UTC_TIMESTAMP"
}
```

## 36. Health checks

LIVENESS

Proceso activo.

READINESS

Puede recibir tráfico.

CAPABILITY

Operación específica.

SYNTHETIC

Prueba no comercial autorizada.

## 37. Recovery

Al recuperar:

- half-open controlado;
- limitar tráfico;
- evitar cache stampede;
- reanudar queues gradualmente;
- reintentar sólo operaciones seguras;
- mantener UNKNOWN en conciliación.

## 38. Brownout

Puede deshabilitar temporalmente:

- respuestas largas;
- embeddings;
- imágenes;
- recomendaciones;
- analytics;
- features secundarias.

Preserva núcleo.

## 39. Dependency graph

Debe registrar:

- servicio;
- operación;
- dependencias;
- criticality;
- fallback;
- owner;
- SLO.

## 40. Cascading failure

Controles:

- timeouts;
- bulkheads;
- circuits;
- budgets;
- load shedding;
- queue limits;
- cancellation;
- cache;
- degradation.

## 41. Pseudocódigo

```text
function execute_resilient_call(operation, provider, context):

    policy = load_resilience_policy(
        provider.provider_class,
        operation
    )

    budget = context.remaining_timeout_budget
    validate_budget(budget, policy.minimum_required_budget)

    if circuit_is_open(provider, operation):
        return execute_allowed_fallback(
            operation,
            provider,
            context,
            reason=CIRCUIT_OPEN
        )

    permit = acquire_bulkhead_permit(provider, operation)

    if not permit.acquired:
        return shed_or_fallback(context, policy)

    try:
        for attempt in range(1, policy.maximum_attempts + 1):

            if not has_retry_budget(context, policy, attempt):
                break

            try:
                return provider.execute(
                    operation,
                    timeout=calculate_attempt_timeout(context, policy)
                )

            except ExternalError as error:
                classification = classify_external_failure(
                    error,
                    operation
                )

                record_attempt(classification, attempt)

                if classification == UNKNOWN_OUTCOME:
                    result = mark_unknown_and_reconcile(
                        operation,
                        context,
                        error
                    )
                    return result

                if not should_retry(
                    classification,
                    operation,
                    attempt,
                    policy
                ):
                    return fail_or_fallback(
                        classification,
                        operation,
                        context
                    )

                sleep(calculate_backoff_with_jitter(attempt, policy))

        return attempts_exhausted_result(operation, context)

    finally:
        release_bulkhead_permit(permit)
```

## 42. Errores

INTEGRATION_TIMEOUT_BUDGET_EXHAUSTED

INTEGRATION_RETRY_NOT_ALLOWED

INTEGRATION_RETRY_ATTEMPTS_EXHAUSTED

INTEGRATION_CIRCUIT_OPEN

INTEGRATION_HALF_OPEN_REJECTED

INTEGRATION_BULKHEAD_FULL

INTEGRATION_QUEUE_FULL

INTEGRATION_QUEUE_MESSAGE_EXPIRED

INTEGRATION_LOAD_SHED

INTEGRATION_RATE_LIMITED

INTEGRATION_FALLBACK_NOT_ALLOWED

INTEGRATION_FAILOVER_NOT_ALLOWED

INTEGRATION_PARTIAL_RESULT

INTEGRATION_RESULT_UNKNOWN

INTEGRATION_RECONCILIATION_REQUIRED

INTEGRATION_RECOVERY_FAILED

## 43. Eventos

IntegrationRetryAttempted

IntegrationRetryExhausted

IntegrationCircuitOpened

IntegrationCircuitHalfOpened

IntegrationCircuitClosed

IntegrationBulkheadRejected

IntegrationLoadShed

IntegrationFallbackActivated

IntegrationFailoverActivated

IntegrationPartialResultReceived

IntegrationMarkedUnknown

IntegrationReconciliationScheduled

IntegrationDependencyRecovered

IntegrationBrownoutActivated

IntegrationBrownoutDeactivated

## 44. Observabilidad

Métricas:

- integration_retry_attempts_total;
- integration_retry_exhausted_total;
- integration_circuit_open_total;
- integration_half_open_total;
- integration_bulkhead_rejected_total;
- integration_load_shed_total;
- integration_fallback_total;
- integration_failover_total;
- integration_partial_result_total;
- integration_unknown_total;
- integration_queue_depth;
- integration_queue_age_seconds;
- integration_recovery_duration_seconds.

Dimensiones:

- provider_class;
- operation;
- failure_class;
- fallback_type;
- result;
- error_code;
- tenant_tier.

## 45. Auditoría

Registrar cuando corresponda:

- policy version;
- provider;
- operation;
- retry count;
- circuit state;
- fallback;
- failover;
- UNKNOWN;
- reconciliation;
- load shedding;
- Correlation ID.

## 46. Casos límite

- timeout before send;
- timeout after send;
- rate limit;
- provider flapping;
- circuit open;
- half-open race;
- bulkhead full;
- retry storm;
- queue full;
- message expired;
- fallback stale;
- failover write;
- partial result;
- unknown;
- recovery stampede;
- Session cancelled;
- telemetry down;
- tenant quota exhausted.

## 47. Criterios de aceptación

AC-IRES-001

Toda llamada tiene timeout.

AC-IRES-002

Todo reintento es limitado.

AC-IRES-003

UNKNOWN no se reintenta ciegamente.

AC-IRES-004

Las escrituras reintentables son idempotentes.

AC-IRES-005

El circuit tiene scope explícito.

AC-IRES-006

Los bulkheads aíslan fallos.

AC-IRES-007

El fallback preserva semántica.

AC-IRES-008

El failover preserva seguridad.

AC-IRES-009

La degradación es visible.

AC-IRES-010

Los parciales se declaran.

AC-IRES-011

La recuperación evita avalancha.

AC-IRES-012

Los health checks no crean negocio.

AC-IRES-013

La carga se limita.

AC-IRES-014

Las políticas se versionan.

AC-IRES-015

Toda decisión es observable.

## 48. Plan mínimo de pruebas

- timeouts;
- budgets;
- read retry;
- write retry;
- jitter;
- storm;
- circuit;
- half-open;
- bulkhead;
- rate limit;
- load shedding;
- fallback;
- stale policy;
- failover;
- write failover;
- partial;
- queue;
- dead-letter;
- cancellation;
- unknown;
- reconciliation;
- recovery;
- brownout;
- cascading failure;
- metrics;
- audit.

## 49. Checklist

[ ] Existe timeout budget.
[ ] Existe retry policy.
[ ] Existe jitter.
[ ] Existe circuit breaker.
[ ] Existe bulkhead.
[ ] Existe capacity limit.
[ ] Existe load shedding.
[ ] Existe rate limit.
[ ] Existe fallback.
[ ] Existe failover.
[ ] Existe partial result policy.
[ ] Existe queue policy.
[ ] Existe dead-letter.
[ ] Existe cancellation.
[ ] Existe UNKNOWN policy.
[ ] Existe reconciliation.
[ ] Existe health model.
[ ] Existe recovery policy.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
