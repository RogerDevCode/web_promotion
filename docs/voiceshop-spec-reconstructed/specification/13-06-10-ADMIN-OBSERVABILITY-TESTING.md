======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-06-10-ADMIN-OBSERVABILITY-TESTING.md

# OBSERVABILIDAD Y TESTING DEL BACKOFFICE

## 1. Objetivo

Define la observabilidad, los SLO, la estrategia de pruebas y los criterios de release del módulo administrativo y operativo de VoiceShop.

## 2. Alcance

Incluye métricas del BackOffice, trazas, dashboards, alertas, SLO, auditoría, testing unitario, component, contract, integration, E2E, seguridad, privacidad, rendimiento, carga, caos, regresión, evidencia y criterios de bloqueo.

## 3. Objetivos operativos

El módulo debe medir autenticaciones, autorizaciones, sesiones, work items, handoffs, publicaciones, ajustes, refunds, configuración, incidentes y exportaciones, distinguiendo errores funcionales de fallos técnicos.

## 4. Logs estructurados

Cada log administrativo debe incluir timestamp, service, component, actor class, tenant scope, operation, result, duration, error code, Correlation ID y referencias protegidas. Nunca debe incluir secretos ni PII innecesaria.

## 5. Métricas administrativas

Se requieren métricas de sesiones, permisos, aprobaciones, break-glass, impersonation, Work Items, SLA, publicaciones, ajustes, reembolsos, configuración, flags, auditoría e incidentes.

## 6. Trazas

Los spans deben cubrir authentication, authorization, approval, preview, command execution, provider call, persistence, outbox, notification, rollback y reconciliation.

## 7. Dashboards

Deben existir dashboards de seguridad administrativa, operaciones, handoff, catálogo/inventario, pedidos/pagos, integraciones, feature flags, auditoría e incidentes.

## 8. Alertas

Se deben alertar anomalías de acceso, denegaciones masivas, break-glass frecuente, exportaciones inusuales, autoaprobación, ajustes anómalos, refunds desconocidos, incidentes abiertos y fallos de auditoría.

## 9. Testing por capas

La estrategia cubre unit, component, contract, integration, E2E y adversarial. Cada requisito debe mapearse a casos positivos, negativos, concurrentes y de recuperación.

## 10. Datasets y stubs

Los datasets deben ser sintéticos, versionados y tenant-scoped. Los stubs deben simular timeout, rate limit, duplicate, out-of-order, UNKNOWN, stale version, security denial y backend failure.

## 11. Criterios de bloqueo

Bloquean release: cross-tenant, secretos en logs, autoaprobación indebida, falta de idempotencia, status edit directo, refund duplicado, ajuste sin autorización, UNKNOWN reintentado a ciegas y auditoría crítica ausente.

## 12. Reglas normativas

RULE-AOT-001

Toda operación debe validar identidad, autorización, tenant, recurso y versión.

RULE-AOT-002

Toda operación con efectos debe ser idempotente y trazable.

RULE-AOT-003

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-AOT-004

Toda configuración debe ser tipada, versionada y validada antes de activarse.

RULE-AOT-005

Toda operación crítica debe disponer de rollback o procedimiento de recuperación documentado.

RULE-AOT-006

Los secretos nunca deben aparecer en frontend, logs, métricas, trazas ni archivos de soporte.

RULE-AOT-007

Los datos de tenants deben permanecer aislados en todas las capas.

RULE-AOT-008

Toda llamada externa debe tener timeout, retry limitado y clasificación de errores.

RULE-AOT-009

Los cambios sensibles requieren reason y pueden requerir aprobación dual.

RULE-AOT-010

Toda acción administrativa o de producción debe generar evidencia de auditoría.

RULE-AOT-011

Las métricas deben evitar etiquetas de alta cardinalidad.

RULE-AOT-012

Los health checks no deben crear efectos comerciales.

RULE-AOT-013

Las pruebas de seguridad críticas bloquean la promoción del release.

RULE-AOT-014

La degradación debe ser visible y no debe inventar resultados.

RULE-AOT-015

Los procedimientos operativos deben ser reproducibles por otra persona o una LLM.

RULE-AOT-016

Toda operación debe validar identidad, autorización, tenant, recurso y versión.

RULE-AOT-017

Toda operación con efectos debe ser idempotente y trazable.

RULE-AOT-018

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-AOT-019

Toda configuración debe ser tipada, versionada y validada antes de activarse.

RULE-AOT-020

Toda operación crítica debe disponer de rollback o procedimiento de recuperación documentado.

RULE-AOT-021

Los secretos nunca deben aparecer en frontend, logs, métricas, trazas ni archivos de soporte.

RULE-AOT-022

Los datos de tenants deben permanecer aislados en todas las capas.

RULE-AOT-023

Toda llamada externa debe tener timeout, retry limitado y clasificación de errores.

RULE-AOT-024

Los cambios sensibles requieren reason y pueden requerir aprobación dual.

RULE-AOT-025

Toda acción administrativa o de producción debe generar evidencia de auditoría.

RULE-AOT-026

Las métricas deben evitar etiquetas de alta cardinalidad.

RULE-AOT-027

Los health checks no deben crear efectos comerciales.

RULE-AOT-028

Las pruebas de seguridad críticas bloquean la promoción del release.

RULE-AOT-029

La degradación debe ser visible y no debe inventar resultados.

RULE-AOT-030

Los procedimientos operativos deben ser reproducibles por otra persona o una LLM.

RULE-AOT-031

Toda operación debe validar identidad, autorización, tenant, recurso y versión.

RULE-AOT-032

Toda operación con efectos debe ser idempotente y trazable.

RULE-AOT-033

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-AOT-034

Toda configuración debe ser tipada, versionada y validada antes de activarse.

RULE-AOT-035

Toda operación crítica debe disponer de rollback o procedimiento de recuperación documentado.

RULE-AOT-036

Los secretos nunca deben aparecer en frontend, logs, métricas, trazas ni archivos de soporte.

RULE-AOT-037

Los datos de tenants deben permanecer aislados en todas las capas.

RULE-AOT-038

Toda llamada externa debe tener timeout, retry limitado y clasificación de errores.

RULE-AOT-039

Los cambios sensibles requieren reason y pueden requerir aprobación dual.

RULE-AOT-040

Toda acción administrativa o de producción debe generar evidencia de auditoría.

RULE-AOT-041

Las métricas deben evitar etiquetas de alta cardinalidad.

RULE-AOT-042

Los health checks no deben crear efectos comerciales.

RULE-AOT-043

Las pruebas de seguridad críticas bloquean la promoción del release.

RULE-AOT-044

La degradación debe ser visible y no debe inventar resultados.

RULE-AOT-045

Los procedimientos operativos deben ser reproducibles por otra persona o una LLM.

## 13. Contrato JSON de referencia

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

## 14. Flujo funcional

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

## 15. Pseudocódigo

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

## 16. Errores funcionales

AOT_REQUEST_INVALID

AOT_NOT_AUTHENTICATED

AOT_NOT_AUTHORIZED

AOT_TENANT_MISMATCH

AOT_ENVIRONMENT_MISMATCH

AOT_RESOURCE_NOT_FOUND

AOT_STATE_INVALID

AOT_VERSION_CONFLICT

AOT_IDEMPOTENCY_CONFLICT

AOT_APPROVAL_REQUIRED

AOT_APPROVAL_INVALID

AOT_SELF_APPROVAL_DENIED

AOT_DEPENDENCY_UNAVAILABLE

AOT_TIMEOUT

AOT_RATE_LIMITED

AOT_RESULT_UNKNOWN

AOT_CONCURRENCY_CONFLICT

AOT_ROLLBACK_FAILED

AOT_AUDIT_PERSISTENCE_FAILED

AOT_SECURITY_POLICY_DENIED

## 17. Eventos

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

## 18. Observabilidad

- 13_06_10_admin_observability_testing_requests_total;
- 13_06_10_admin_observability_testing_success_total;
- 13_06_10_admin_observability_testing_failure_total;
- 13_06_10_admin_observability_testing_duration_seconds;
- 13_06_10_admin_observability_testing_validation_failure_total;
- 13_06_10_admin_observability_testing_authorization_denied_total;
- 13_06_10_admin_observability_testing_approval_required_total;
- 13_06_10_admin_observability_testing_version_conflict_total;
- 13_06_10_admin_observability_testing_idempotency_hit_total;
- 13_06_10_admin_observability_testing_unknown_total;
- 13_06_10_admin_observability_testing_rollback_total;
- 13_06_10_admin_observability_testing_reconciliation_total;
- 13_06_10_admin_observability_testing_security_denied_total;
- 13_06_10_admin_observability_testing_audit_failure_total;
- 13_06_10_admin_observability_testing_active_operations;

Dimensiones permitidas:

- operation;
- environment;
- result;
- error_code;
- risk;
- tenant_tier.

Prohibido usar como etiquetas IDs únicos, secretos, tokens, correos, teléfonos, nombres, URLs completas o payloads.

## 19. Seguridad

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

## 20. Casos límite y pruebas adversariales

TEST-AOT-001: verificar dos actores ejecutan la misma operación simultáneamente; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-002: verificar la aprobación expira antes del commit; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-003: verificar el permiso se revoca durante la operación; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-004: verificar el tenant se suspende durante el flujo; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-005: verificar la dependencia responde después del timeout; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-006: verificar la misma clave llega con payload diferente; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-007: verificar el resultado queda UNKNOWN; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-008: verificar el rollback también falla; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-009: verificar la auditoría está degradada; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-010: verificar el evento se duplica; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-011: verificar el evento llega fuera de orden; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-012: verificar el secreto es revocado; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-013: verificar el entorno de destino es incorrecto; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-014: verificar la configuración activa cambia concurrentemente; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-015: verificar el health check entrega falso positivo; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-016: verificar se intenta una exportación masiva; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-017: verificar la caché contiene una policy antigua; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-018: verificar el sistema se recupera y genera una avalancha; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-019: verificar un actor intenta autoaprobarse; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-AOT-020: verificar se intenta acceder a otro tenant; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

## 21. Criterios de aceptación

AC-AOT-001

Toda operación está autenticada y autorizada.

AC-AOT-002

Toda operación respeta tenant y entorno.

AC-AOT-003

Toda modificación valida versión.

AC-AOT-004

Toda modificación con efecto usa idempotencia.

AC-AOT-005

Toda operación sensible exige reason.

AC-AOT-006

Toda operación crítica soporta aprobación.

AC-AOT-007

Toda aprobación se vincula al payload y es single-use.

AC-AOT-008

Todo resultado UNKNOWN se concilia.

AC-AOT-009

Todo cambio conserva before y after.

AC-AOT-010

Todo rollback es explícito.

AC-AOT-011

Todo error tiene código estable.

AC-AOT-012

Toda denegación es observable.

AC-AOT-013

Los secretos no se exponen.

AC-AOT-014

Las métricas evitan alta cardinalidad.

AC-AOT-015

Toda operación es auditable.

AC-AOT-016

Toda operación está autenticada y autorizada.

AC-AOT-017

Toda operación respeta tenant y entorno.

AC-AOT-018

Toda modificación valida versión.

AC-AOT-019

Toda modificación con efecto usa idempotencia.

AC-AOT-020

Toda operación sensible exige reason.

AC-AOT-021

Toda operación crítica soporta aprobación.

AC-AOT-022

Toda aprobación se vincula al payload y es single-use.

AC-AOT-023

Todo resultado UNKNOWN se concilia.

AC-AOT-024

Todo cambio conserva before y after.

AC-AOT-025

Todo rollback es explícito.

AC-AOT-026

Todo error tiene código estable.

AC-AOT-027

Toda denegación es observable.

AC-AOT-028

Los secretos no se exponen.

AC-AOT-029

Las métricas evitan alta cardinalidad.

AC-AOT-030

Toda operación es auditable.

AC-AOT-031

Toda operación está autenticada y autorizada.

AC-AOT-032

Toda operación respeta tenant y entorno.

AC-AOT-033

Toda modificación valida versión.

AC-AOT-034

Toda modificación con efecto usa idempotencia.

AC-AOT-035

Toda operación sensible exige reason.

AC-AOT-036

Toda operación crítica soporta aprobación.

AC-AOT-037

Toda aprobación se vincula al payload y es single-use.

AC-AOT-038

Todo resultado UNKNOWN se concilia.

AC-AOT-039

Todo cambio conserva before y after.

AC-AOT-040

Todo rollback es explícito.

AC-AOT-041

Todo error tiene código estable.

AC-AOT-042

Toda denegación es observable.

AC-AOT-043

Los secretos no se exponen.

AC-AOT-044

Las métricas evitan alta cardinalidad.

AC-AOT-045

Toda operación es auditable.

## 22. Checklist final

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
