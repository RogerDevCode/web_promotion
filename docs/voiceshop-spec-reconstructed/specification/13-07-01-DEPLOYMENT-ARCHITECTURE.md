======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-07-01-DEPLOYMENT-ARCHITECTURE.md

# ARQUITECTURA DE DESPLIEGUE

## 1. Objetivo

Define la topología lógica, responsabilidades, dependencias, alta disponibilidad, escalamiento y seguridad de despliegue para VoiceShop.

## 2. Arquitectura lógica

VoiceShop se despliega como componentes desacoplados: Edge/API Gateway, Web/Realtime Gateway, Application API, Orchestrator, Workers, PostgreSQL, Redis, Object Storage, Event/Queue layer, Observability y Admin BackOffice.

## 3. Componentes

Cada componente debe tener responsabilidad única, contratos explícitos, health checks, límites, ownership y estrategia de escalamiento.

## 4. API Gateway

Termina TLS, aplica rate limits, valida origins, propaga Correlation ID, limita tamaños, protege rutas y enruta al servicio correcto.

## 5. Realtime Gateway

Gestiona signaling, tokens efímeros, conexiones WebRTC/WebSocket, backpressure, límites de sesión, cancellation y reconexión.

## 6. Application API

Expone comandos y consultas, valida schemas, autentica, autoriza, ejecuta dominio, persiste y publica outbox.

## 7. Workers

Procesan webhooks, expiraciones, reconciliación, emails, CRM, batch, outbox e inbox. Deben ser idempotentes y recuperables.

## 8. PostgreSQL

Es fuente transaccional para aggregates, idempotencia, outbox, inbox, auditoría y configuración. Requiere backups, PITR, migraciones y monitoring.

## 9. Redis

Se utiliza para sesiones efímeras, deduplicación corta, locks, rate limiting y caché. No es fuente única de verdad para pedidos, pagos o inventario.

## 10. Colas y eventos

Deben soportar delivery at-least-once, deduplicación, DLQ, reintentos acotados, visibilidad, ordering por aggregate y observabilidad.

## 11. Red y seguridad

Los servicios deben operar con segmentación, allowlists, egress control, mTLS cuando aplica, secretos externos al contenedor y puertos mínimos.

## 12. Escalamiento

Los servicios stateless escalan horizontalmente. Los workers escalan por backlog. Realtime considera conexiones activas, CPU, memoria, ancho de banda y afinidad.

## 13. Alta disponibilidad

Se requiere distribución por zonas, réplicas, readiness, anti-affinity, failover de datos, circuit breakers y eliminación de single points of failure.

## 14. Despliegue canary

El canary usa porcentaje, cohort, métricas, umbrales, duración, abort y rollback. Nunca debe mezclar schemas incompatibles.

## 15. Rollback

El rollback restaura artefacto y configuración compatibles. Las migraciones destructivas requieren estrategia expand-contract y no deben depender de rollback inmediato.

## 16. Reglas normativas

RULE-DARCH-001

Toda operación debe validar identidad, autorización, tenant, recurso y versión.

RULE-DARCH-002

Toda operación con efectos debe ser idempotente y trazable.

RULE-DARCH-003

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-DARCH-004

Toda configuración debe ser tipada, versionada y validada antes de activarse.

RULE-DARCH-005

Toda operación crítica debe disponer de rollback o procedimiento de recuperación documentado.

RULE-DARCH-006

Los secretos nunca deben aparecer en frontend, logs, métricas, trazas ni archivos de soporte.

RULE-DARCH-007

Los datos de tenants deben permanecer aislados en todas las capas.

RULE-DARCH-008

Toda llamada externa debe tener timeout, retry limitado y clasificación de errores.

RULE-DARCH-009

Los cambios sensibles requieren reason y pueden requerir aprobación dual.

RULE-DARCH-010

Toda acción administrativa o de producción debe generar evidencia de auditoría.

RULE-DARCH-011

Las métricas deben evitar etiquetas de alta cardinalidad.

RULE-DARCH-012

Los health checks no deben crear efectos comerciales.

RULE-DARCH-013

Las pruebas de seguridad críticas bloquean la promoción del release.

RULE-DARCH-014

La degradación debe ser visible y no debe inventar resultados.

RULE-DARCH-015

Los procedimientos operativos deben ser reproducibles por otra persona o una LLM.

RULE-DARCH-016

Toda operación debe validar identidad, autorización, tenant, recurso y versión.

RULE-DARCH-017

Toda operación con efectos debe ser idempotente y trazable.

RULE-DARCH-018

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-DARCH-019

Toda configuración debe ser tipada, versionada y validada antes de activarse.

RULE-DARCH-020

Toda operación crítica debe disponer de rollback o procedimiento de recuperación documentado.

RULE-DARCH-021

Los secretos nunca deben aparecer en frontend, logs, métricas, trazas ni archivos de soporte.

RULE-DARCH-022

Los datos de tenants deben permanecer aislados en todas las capas.

RULE-DARCH-023

Toda llamada externa debe tener timeout, retry limitado y clasificación de errores.

RULE-DARCH-024

Los cambios sensibles requieren reason y pueden requerir aprobación dual.

RULE-DARCH-025

Toda acción administrativa o de producción debe generar evidencia de auditoría.

RULE-DARCH-026

Las métricas deben evitar etiquetas de alta cardinalidad.

RULE-DARCH-027

Los health checks no deben crear efectos comerciales.

RULE-DARCH-028

Las pruebas de seguridad críticas bloquean la promoción del release.

RULE-DARCH-029

La degradación debe ser visible y no debe inventar resultados.

RULE-DARCH-030

Los procedimientos operativos deben ser reproducibles por otra persona o una LLM.

RULE-DARCH-031

Toda operación debe validar identidad, autorización, tenant, recurso y versión.

RULE-DARCH-032

Toda operación con efectos debe ser idempotente y trazable.

RULE-DARCH-033

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-DARCH-034

Toda configuración debe ser tipada, versionada y validada antes de activarse.

RULE-DARCH-035

Toda operación crítica debe disponer de rollback o procedimiento de recuperación documentado.

RULE-DARCH-036

Los secretos nunca deben aparecer en frontend, logs, métricas, trazas ni archivos de soporte.

RULE-DARCH-037

Los datos de tenants deben permanecer aislados en todas las capas.

RULE-DARCH-038

Toda llamada externa debe tener timeout, retry limitado y clasificación de errores.

RULE-DARCH-039

Los cambios sensibles requieren reason y pueden requerir aprobación dual.

RULE-DARCH-040

Toda acción administrativa o de producción debe generar evidencia de auditoría.

RULE-DARCH-041

Las métricas deben evitar etiquetas de alta cardinalidad.

RULE-DARCH-042

Los health checks no deben crear efectos comerciales.

RULE-DARCH-043

Las pruebas de seguridad críticas bloquean la promoción del release.

RULE-DARCH-044

La degradación debe ser visible y no debe inventar resultados.

RULE-DARCH-045

Los procedimientos operativos deben ser reproducibles por otra persona o una LLM.

## 17. Contrato JSON de referencia

```json
{
  "request_id": "UUID",
  "tenant_id": "UUID_OR_NULL",
  "environment": "PRODUCTION",
  "actor_or_service_id": "UUID",
  "operation": "STRING",
  "expected_version": 1,
  "reason_code": "AUTHORIZED_OPERATION",
  "approval_reference": "UUID_OR_NULL",
  "idempotency_key": "STRING",
  "correlation_id": "UUID",
  "requested_at": "UTC_TIMESTAMP"
}
```

## 18. Flujo funcional

1. Recibir la solicitud.
2. Validar schema, límites y entorno.
3. Autenticar al actor o servicio.
4. Autorizar la operación y el scope.
5. Cargar el estado actual.
6. Validar expected version.
7. Construir preview o dry run.
8. Evaluar riesgo, reason y approval.
9. Consultar idempotencia.
10. Adquirir controles de concurrencia.
11. Ejecutar la operación oficial.
12. Validar invariantes.
13. Persistir estado, auditoría y outbox.
14. Emitir eventos.
15. Actualizar métricas y trazas.
16. Verificar postcondiciones.
17. Ejecutar rollback o conciliación si procede.
18. Entregar resultado seguro.

## 19. Pseudocódigo

```text
function execute_controlled_operation(command):

    validate_schema_and_limits(command)
    authenticate_actor_or_service(command.actor_or_service_id)
    authorize_scope(command.operation, command.tenant_id, command.environment)

    current = load_current_state(command)
    validate_expected_version(current.version, command.expected_version)

    preview = build_side_effect_free_preview(command, current)
    validate_reason_and_evidence(command, preview)

    if preview.approval_required:
        validate_single_use_approval(
            command.approval_reference,
            hash_semantic_payload(command, preview)
        )

    previous = get_idempotent_result(command.idempotency_key)

    if previous.exists:
        return previous

    controls = acquire_required_concurrency_controls(command)

    try:
        result = execute_official_operation(command, current)
        validate_postconditions(result)
        persist_state_audit_outbox_and_idempotency(command, result)
        emit_events(result)
        return build_safe_result(result)

    except UnknownOutcomeError as error:
        mark_operation_unknown(command, error)
        schedule_reconciliation(command)
        return build_unknown_result(command)

    except OperationFailure as error:
        if rollback_is_safe(command, error):
            execute_idempotent_rollback(command, error)
        raise

    finally:
        release_owned_controls(controls)
```

## 20. Errores funcionales

DARCH_REQUEST_INVALID

DARCH_NOT_AUTHENTICATED

DARCH_NOT_AUTHORIZED

DARCH_TENANT_MISMATCH

DARCH_ENVIRONMENT_MISMATCH

DARCH_RESOURCE_NOT_FOUND

DARCH_STATE_INVALID

DARCH_VERSION_CONFLICT

DARCH_IDEMPOTENCY_CONFLICT

DARCH_APPROVAL_REQUIRED

DARCH_APPROVAL_INVALID

DARCH_SELF_APPROVAL_DENIED

DARCH_DEPENDENCY_UNAVAILABLE

DARCH_TIMEOUT

DARCH_RATE_LIMITED

DARCH_RESULT_UNKNOWN

DARCH_CONCURRENCY_CONFLICT

DARCH_ROLLBACK_FAILED

DARCH_AUDIT_PERSISTENCE_FAILED

DARCH_SECURITY_POLICY_DENIED

## 21. Eventos

OperationRequested

ValidationStarted

ValidationFailed

DryRunCompleted

ApprovalRequested

ApprovalGranted

ApprovalRejected

OperationStarted

OperationCompleted

OperationFailed

OperationMarkedUnknown

RollbackStarted

RollbackCompleted

ReconciliationRequested

ReconciliationCompleted

SecurityPolicyDenied

AuditEvidenceRecorded

## 22. Observabilidad

- 13_07_01_deployment_architecture_requests_total;
- 13_07_01_deployment_architecture_success_total;
- 13_07_01_deployment_architecture_failure_total;
- 13_07_01_deployment_architecture_duration_seconds;
- 13_07_01_deployment_architecture_validation_failure_total;
- 13_07_01_deployment_architecture_authorization_denied_total;
- 13_07_01_deployment_architecture_approval_required_total;
- 13_07_01_deployment_architecture_version_conflict_total;
- 13_07_01_deployment_architecture_idempotency_hit_total;
- 13_07_01_deployment_architecture_unknown_total;
- 13_07_01_deployment_architecture_rollback_total;
- 13_07_01_deployment_architecture_reconciliation_total;
- 13_07_01_deployment_architecture_security_denied_total;
- 13_07_01_deployment_architecture_audit_failure_total;
- 13_07_01_deployment_architecture_active_operations;

Dimensiones permitidas:

- operation;
- environment;
- result;
- error_code;
- risk;
- tenant_tier.

Prohibido usar como etiquetas IDs únicos, secretos, tokens, correos, teléfonos, nombres, URLs completas o payloads.

## 23. Seguridad

- Mínimo privilegio y separación de funciones.
- MFA o step-up para acciones críticas.
- Aislamiento estricto por tenant y entorno.
- Secretos sólo por referencias.
- Protección contra replay, CSRF, SSRF e inyección.
- Aprobaciones single-use vinculadas al payload.
- Logs y trazas redactados.
- Rate limits y detección de anomalías.
- Break-glass con expiración y revisión.
- Auditoría de lecturas sensibles y exportaciones.

## 24. Casos límite y pruebas adversariales

TEST-DARCH-001: verificar dos actores ejecutan la misma operación simultáneamente; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-002: verificar la aprobación expira antes del commit; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-003: verificar el permiso se revoca durante la operación; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-004: verificar el tenant se suspende durante el flujo; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-005: verificar la dependencia responde después del timeout; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-006: verificar la misma clave llega con payload diferente; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-007: verificar el resultado queda UNKNOWN; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-008: verificar el rollback también falla; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-009: verificar la auditoría está degradada; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-010: verificar el evento se duplica; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-011: verificar el evento llega fuera de orden; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-012: verificar el secreto es revocado; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-013: verificar el entorno de destino es incorrecto; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-014: verificar la configuración activa cambia concurrentemente; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-015: verificar el health check entrega falso positivo; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-016: verificar se intenta una exportación masiva; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-017: verificar la caché contiene una policy antigua; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-018: verificar el sistema se recupera y genera una avalancha; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-019: verificar un actor intenta autoaprobarse; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-DARCH-020: verificar se intenta acceder a otro tenant; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

## 25. Criterios de aceptación

AC-DARCH-001

Toda operación está autenticada y autorizada.

AC-DARCH-002

Toda operación respeta tenant y entorno.

AC-DARCH-003

Toda modificación valida versión.

AC-DARCH-004

Toda modificación con efecto usa idempotencia.

AC-DARCH-005

Toda operación sensible exige reason.

AC-DARCH-006

Toda operación crítica soporta aprobación.

AC-DARCH-007

Toda aprobación se vincula al payload y es single-use.

AC-DARCH-008

Todo resultado UNKNOWN se concilia.

AC-DARCH-009

Todo cambio conserva before y after.

AC-DARCH-010

Todo rollback es explícito.

AC-DARCH-011

Todo error tiene código estable.

AC-DARCH-012

Toda denegación es observable.

AC-DARCH-013

Los secretos no se exponen.

AC-DARCH-014

Las métricas evitan alta cardinalidad.

AC-DARCH-015

Toda operación es auditable.

AC-DARCH-016

Toda operación está autenticada y autorizada.

AC-DARCH-017

Toda operación respeta tenant y entorno.

AC-DARCH-018

Toda modificación valida versión.

AC-DARCH-019

Toda modificación con efecto usa idempotencia.

AC-DARCH-020

Toda operación sensible exige reason.

AC-DARCH-021

Toda operación crítica soporta aprobación.

AC-DARCH-022

Toda aprobación se vincula al payload y es single-use.

AC-DARCH-023

Todo resultado UNKNOWN se concilia.

AC-DARCH-024

Todo cambio conserva before y after.

AC-DARCH-025

Todo rollback es explícito.

AC-DARCH-026

Todo error tiene código estable.

AC-DARCH-027

Toda denegación es observable.

AC-DARCH-028

Los secretos no se exponen.

AC-DARCH-029

Las métricas evitan alta cardinalidad.

AC-DARCH-030

Toda operación es auditable.

AC-DARCH-031

Toda operación está autenticada y autorizada.

AC-DARCH-032

Toda operación respeta tenant y entorno.

AC-DARCH-033

Toda modificación valida versión.

AC-DARCH-034

Toda modificación con efecto usa idempotencia.

AC-DARCH-035

Toda operación sensible exige reason.

AC-DARCH-036

Toda operación crítica soporta aprobación.

AC-DARCH-037

Toda aprobación se vincula al payload y es single-use.

AC-DARCH-038

Todo resultado UNKNOWN se concilia.

AC-DARCH-039

Todo cambio conserva before y after.

AC-DARCH-040

Todo rollback es explícito.

AC-DARCH-041

Todo error tiene código estable.

AC-DARCH-042

Toda denegación es observable.

AC-DARCH-043

Los secretos no se exponen.

AC-DARCH-044

Las métricas evitan alta cardinalidad.

AC-DARCH-045

Toda operación es auditable.

## 26. Checklist final

[ ] Existe identificador estable.
[ ] Existe tenant scope.
[ ] Existe environment scope.
[ ] Existe autenticación.
[ ] Existe autorización.
[ ] Existe assurance policy.
[ ] Existe reason.
[ ] Existe approval policy.
[ ] Existe expected version.
[ ] Existe Idempotency Key.
[ ] Existe preview o dry run.
[ ] Existe concurrency control.
[ ] Existe timeout.
[ ] Existe retry policy.
[ ] Existe UNKNOWN policy.
[ ] Existe rollback.
[ ] Existe reconciliation.
[ ] Existen errores estables.
[ ] Existen eventos.
[ ] Existen métricas.
[ ] Existen trazas.
[ ] Existe auditoría.
[ ] Existe seguridad.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
