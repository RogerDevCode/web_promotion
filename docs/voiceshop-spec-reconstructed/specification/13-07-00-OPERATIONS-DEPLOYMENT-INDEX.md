======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-07-00-OPERATIONS-DEPLOYMENT-INDEX.md

# ÍNDICE FUNCIONAL DE OPERACIÓN Y DESPLIEGUE

## 1. Objetivo

Define la organización y los principios del módulo operativo que gobierna construcción, promoción, despliegue, recuperación y mantenimiento de VoiceShop.

## 2. Objetivo del módulo

La operación y despliegue definen cómo construir, configurar, desplegar, verificar, observar, escalar, respaldar, recuperar y retirar VoiceShop de manera reproducible.

## 3. Documentos previstos

El módulo comprende arquitectura de despliegue, entornos, CI/CD, configuración, secretos, bases de datos, Redis, colas, observabilidad, backups, disaster recovery, escalamiento, runbooks, release management y testing operativo.

## 4. Entornos

LOCAL, CI, TEST, STAGING, CANARY y PRODUCTION deben estar aislados y poseer credenciales, datos, configuraciones, dominios y políticas propias.

## 5. Artefactos

Todo artefacto debe ser inmutable, identificable por versión y checksum, asociado a commit, SBOM, resultados de pruebas y provenance.

## 6. Promoción

Los artefactos se construyen una vez y se promueven. No se recompilan de forma diferente para producción.

## 7. Despliegue

Debe soportar rolling, blue-green o canary según componente, con health checks, readiness, rollback y verificación post-deploy.

## 8. Datos

Las migraciones deben ser versionadas, reversibles cuando sea posible, compatibles con despliegues escalonados y probadas con copias sintéticas.

## 9. Backups y DR

Deben definirse RPO, RTO, frecuencia, cifrado, retención, restauración probada, failover y runbooks.

## 10. Seguridad operativa

Incluye mínimo privilegio, secret manager, image scanning, SBOM, firmas, parches, egress control, network policies y acceso de emergencia.

## 11. SLO y capacidad

Se deben medir latencia, disponibilidad, error rate, saturación, backlog, sesiones concurrentes, coste y capacidad por tenant.

## 12. Reglas normativas

RULE-ODI-001

Toda operación debe validar identidad, autorización, tenant, recurso y versión.

RULE-ODI-002

Toda operación con efectos debe ser idempotente y trazable.

RULE-ODI-003

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-ODI-004

Toda configuración debe ser tipada, versionada y validada antes de activarse.

RULE-ODI-005

Toda operación crítica debe disponer de rollback o procedimiento de recuperación documentado.

RULE-ODI-006

Los secretos nunca deben aparecer en frontend, logs, métricas, trazas ni archivos de soporte.

RULE-ODI-007

Los datos de tenants deben permanecer aislados en todas las capas.

RULE-ODI-008

Toda llamada externa debe tener timeout, retry limitado y clasificación de errores.

RULE-ODI-009

Los cambios sensibles requieren reason y pueden requerir aprobación dual.

RULE-ODI-010

Toda acción administrativa o de producción debe generar evidencia de auditoría.

RULE-ODI-011

Las métricas deben evitar etiquetas de alta cardinalidad.

RULE-ODI-012

Los health checks no deben crear efectos comerciales.

RULE-ODI-013

Las pruebas de seguridad críticas bloquean la promoción del release.

RULE-ODI-014

La degradación debe ser visible y no debe inventar resultados.

RULE-ODI-015

Los procedimientos operativos deben ser reproducibles por otra persona o una LLM.

RULE-ODI-016

Toda operación debe validar identidad, autorización, tenant, recurso y versión.

RULE-ODI-017

Toda operación con efectos debe ser idempotente y trazable.

RULE-ODI-018

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-ODI-019

Toda configuración debe ser tipada, versionada y validada antes de activarse.

RULE-ODI-020

Toda operación crítica debe disponer de rollback o procedimiento de recuperación documentado.

RULE-ODI-021

Los secretos nunca deben aparecer en frontend, logs, métricas, trazas ni archivos de soporte.

RULE-ODI-022

Los datos de tenants deben permanecer aislados en todas las capas.

RULE-ODI-023

Toda llamada externa debe tener timeout, retry limitado y clasificación de errores.

RULE-ODI-024

Los cambios sensibles requieren reason y pueden requerir aprobación dual.

RULE-ODI-025

Toda acción administrativa o de producción debe generar evidencia de auditoría.

RULE-ODI-026

Las métricas deben evitar etiquetas de alta cardinalidad.

RULE-ODI-027

Los health checks no deben crear efectos comerciales.

RULE-ODI-028

Las pruebas de seguridad críticas bloquean la promoción del release.

RULE-ODI-029

La degradación debe ser visible y no debe inventar resultados.

RULE-ODI-030

Los procedimientos operativos deben ser reproducibles por otra persona o una LLM.

RULE-ODI-031

Toda operación debe validar identidad, autorización, tenant, recurso y versión.

RULE-ODI-032

Toda operación con efectos debe ser idempotente y trazable.

RULE-ODI-033

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-ODI-034

Toda configuración debe ser tipada, versionada y validada antes de activarse.

RULE-ODI-035

Toda operación crítica debe disponer de rollback o procedimiento de recuperación documentado.

RULE-ODI-036

Los secretos nunca deben aparecer en frontend, logs, métricas, trazas ni archivos de soporte.

RULE-ODI-037

Los datos de tenants deben permanecer aislados en todas las capas.

RULE-ODI-038

Toda llamada externa debe tener timeout, retry limitado y clasificación de errores.

RULE-ODI-039

Los cambios sensibles requieren reason y pueden requerir aprobación dual.

RULE-ODI-040

Toda acción administrativa o de producción debe generar evidencia de auditoría.

RULE-ODI-041

Las métricas deben evitar etiquetas de alta cardinalidad.

RULE-ODI-042

Los health checks no deben crear efectos comerciales.

RULE-ODI-043

Las pruebas de seguridad críticas bloquean la promoción del release.

RULE-ODI-044

La degradación debe ser visible y no debe inventar resultados.

RULE-ODI-045

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

ODI_REQUEST_INVALID

ODI_NOT_AUTHENTICATED

ODI_NOT_AUTHORIZED

ODI_TENANT_MISMATCH

ODI_ENVIRONMENT_MISMATCH

ODI_RESOURCE_NOT_FOUND

ODI_STATE_INVALID

ODI_VERSION_CONFLICT

ODI_IDEMPOTENCY_CONFLICT

ODI_APPROVAL_REQUIRED

ODI_APPROVAL_INVALID

ODI_SELF_APPROVAL_DENIED

ODI_DEPENDENCY_UNAVAILABLE

ODI_TIMEOUT

ODI_RATE_LIMITED

ODI_RESULT_UNKNOWN

ODI_CONCURRENCY_CONFLICT

ODI_ROLLBACK_FAILED

ODI_AUDIT_PERSISTENCE_FAILED

ODI_SECURITY_POLICY_DENIED

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

- 13_07_00_operations_deployment_index_requests_total;
- 13_07_00_operations_deployment_index_success_total;
- 13_07_00_operations_deployment_index_failure_total;
- 13_07_00_operations_deployment_index_duration_seconds;
- 13_07_00_operations_deployment_index_validation_failure_total;
- 13_07_00_operations_deployment_index_authorization_denied_total;
- 13_07_00_operations_deployment_index_approval_required_total;
- 13_07_00_operations_deployment_index_version_conflict_total;
- 13_07_00_operations_deployment_index_idempotency_hit_total;
- 13_07_00_operations_deployment_index_unknown_total;
- 13_07_00_operations_deployment_index_rollback_total;
- 13_07_00_operations_deployment_index_reconciliation_total;
- 13_07_00_operations_deployment_index_security_denied_total;
- 13_07_00_operations_deployment_index_audit_failure_total;
- 13_07_00_operations_deployment_index_active_operations;

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

TEST-ODI-001: verificar dos actores ejecutan la misma operación simultáneamente; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-002: verificar la aprobación expira antes del commit; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-003: verificar el permiso se revoca durante la operación; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-004: verificar el tenant se suspende durante el flujo; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-005: verificar la dependencia responde después del timeout; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-006: verificar la misma clave llega con payload diferente; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-007: verificar el resultado queda UNKNOWN; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-008: verificar el rollback también falla; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-009: verificar la auditoría está degradada; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-010: verificar el evento se duplica; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-011: verificar el evento llega fuera de orden; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-012: verificar el secreto es revocado; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-013: verificar el entorno de destino es incorrecto; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-014: verificar la configuración activa cambia concurrentemente; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-015: verificar el health check entrega falso positivo; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-016: verificar se intenta una exportación masiva; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-017: verificar la caché contiene una policy antigua; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-018: verificar el sistema se recupera y genera una avalancha; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-019: verificar un actor intenta autoaprobarse; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

TEST-ODI-020: verificar se intenta acceder a otro tenant; no debe perderse aislamiento, consistencia, idempotencia ni evidencia.

## 21. Criterios de aceptación

AC-ODI-001

Toda operación está autenticada y autorizada.

AC-ODI-002

Toda operación respeta tenant y entorno.

AC-ODI-003

Toda modificación valida versión.

AC-ODI-004

Toda modificación con efecto usa idempotencia.

AC-ODI-005

Toda operación sensible exige reason.

AC-ODI-006

Toda operación crítica soporta aprobación.

AC-ODI-007

Toda aprobación se vincula al payload y es single-use.

AC-ODI-008

Todo resultado UNKNOWN se concilia.

AC-ODI-009

Todo cambio conserva before y after.

AC-ODI-010

Todo rollback es explícito.

AC-ODI-011

Todo error tiene código estable.

AC-ODI-012

Toda denegación es observable.

AC-ODI-013

Los secretos no se exponen.

AC-ODI-014

Las métricas evitan alta cardinalidad.

AC-ODI-015

Toda operación es auditable.

AC-ODI-016

Toda operación está autenticada y autorizada.

AC-ODI-017

Toda operación respeta tenant y entorno.

AC-ODI-018

Toda modificación valida versión.

AC-ODI-019

Toda modificación con efecto usa idempotencia.

AC-ODI-020

Toda operación sensible exige reason.

AC-ODI-021

Toda operación crítica soporta aprobación.

AC-ODI-022

Toda aprobación se vincula al payload y es single-use.

AC-ODI-023

Todo resultado UNKNOWN se concilia.

AC-ODI-024

Todo cambio conserva before y after.

AC-ODI-025

Todo rollback es explícito.

AC-ODI-026

Todo error tiene código estable.

AC-ODI-027

Toda denegación es observable.

AC-ODI-028

Los secretos no se exponen.

AC-ODI-029

Las métricas evitan alta cardinalidad.

AC-ODI-030

Toda operación es auditable.

AC-ODI-031

Toda operación está autenticada y autorizada.

AC-ODI-032

Toda operación respeta tenant y entorno.

AC-ODI-033

Toda modificación valida versión.

AC-ODI-034

Toda modificación con efecto usa idempotencia.

AC-ODI-035

Toda operación sensible exige reason.

AC-ODI-036

Toda operación crítica soporta aprobación.

AC-ODI-037

Toda aprobación se vincula al payload y es single-use.

AC-ODI-038

Todo resultado UNKNOWN se concilia.

AC-ODI-039

Todo cambio conserva before y after.

AC-ODI-040

Todo rollback es explícito.

AC-ODI-041

Todo error tiene código estable.

AC-ODI-042

Toda denegación es observable.

AC-ODI-043

Los secretos no se exponen.

AC-ODI-044

Las métricas evitan alta cardinalidad.

AC-ODI-045

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
