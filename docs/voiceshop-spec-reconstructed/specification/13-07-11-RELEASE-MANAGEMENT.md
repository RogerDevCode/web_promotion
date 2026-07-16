======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-07-11-RELEASE-MANAGEMENT.md

# GESTIÓN DE RELEASES

## 1. Objetivo

Define el ciclo de vida, riesgo, validación, canary, rollout, rollback, hotfix, deprecación y evidencia de releases de VoiceShop.

## 2. Alcance

Incluye Release ID, versiones, changelog, compatibilidad, riesgo, freeze, approvals, artefactos, migraciones, canary, rollout, rollback, hotfix, deprecation, comunicación, evidencia y QA.

## 3. Release Model

Todo release posee Release ID, semantic version, commit, artefactos, checksums, SBOM, provenance, configuration compatibility, migration set, risk, owner, status y timestamps.

## 4. Estados

DRAFT, BUILDING, VALIDATING, READY_FOR_STAGING, STAGING, APPROVAL_PENDING, CANARY, ROLLING_OUT, ACTIVE, ROLLED_BACK, SUPERSEDED, CANCELLED y FAILED.

## 5. Versionado

Se recomienda versionado semántico para interfaces y artefactos. Las versiones de schema, prompts, events, APIs, configurations y adapters se gestionan explícitamente.

## 6. Release Notes

Las notas deben incluir cambios funcionales, fixes, seguridad, migraciones, riesgos, compatibilidad, acciones requeridas, rollback y known issues.

## 7. Risk Assessment

El riesgo considera blast radius, datos, pagos, inventario, migraciones, seguridad, provider changes, irreversibilidad, observabilidad y capacidad.

## 8. Freeze

Los periodos de freeze bloquean cambios no urgentes. Las excepciones requieren reason, approval y plan reforzado.

## 9. Staging Validation

Debe verificar E2E, contratos, migraciones, performance, seguridad, observabilidad, runbooks, backups, restore y compatibility.

## 10. Canary

El canary usa cohort o porcentaje determinístico, métricas, duración, SLO, abort conditions, tenant allowlist y rollback.

## 11. Rollout

La progresión debe estar controlada por etapas, observación y criterios. No avanzar si el error budget, seguridad o integridad se degradan.

## 12. Rollback

El rollback restaura artefactos y configuraciones compatibles. Las migraciones destructivas requieren estrategia expand-contract y recuperación separada.

## 13. Hotfix

Los hotfix conservan revisión, pruebas críticas, firma, SBOM, approvals, canary cuando sea posible y revisión posterior.

## 14. Deprecation

Las APIs, events, schemas, prompts y features se retiran mediante aviso, ventana de compatibilidad, telemetría de uso y plan de migración.

## 15. Go/No-Go

La decisión considera pruebas, riesgos, incidentes abiertos, health, capacity, backups, rollback, owners y comunicación.

## 16. Reglas normativas

RULE-RMGT-001

Toda operación debe ser reproducible, versionada y auditable.

RULE-RMGT-002

Todo cambio productivo debe estar vinculado a un artefacto inmutable y verificable.

RULE-RMGT-003

Toda operación sensible requiere reason y puede requerir aprobación independiente.

RULE-RMGT-004

Toda modificación debe validar expected version o garantía equivalente.

RULE-RMGT-005

Toda operación repetible debe usar idempotencia.

RULE-RMGT-006

Todo resultado UNKNOWN debe iniciar conciliación.

RULE-RMGT-007

Todo release debe declarar riesgo, impacto, rollback y criterios de éxito.

RULE-RMGT-008

Toda operación de seguridad debe aplicar mínimo privilegio.

RULE-RMGT-009

Los secretos nunca deben exponerse en logs, artefactos, pipelines o documentación.

RULE-RMGT-010

Toda prueba operativa debe producir evidencia reproducible.

RULE-RMGT-011

Los tenants y entornos deben permanecer aislados.

RULE-RMGT-012

Toda falla crítica debe bloquear promoción o activar contención.

RULE-RMGT-013

Toda dependencia debe tener timeout, retry limitado y observabilidad.

RULE-RMGT-014

Toda intervención manual debe estar autorizada y auditada.

RULE-RMGT-015

Todo rollback debe verificar postcondiciones y no restaurar estados inseguros.

RULE-RMGT-016

Toda operación debe ser reproducible, versionada y auditable.

RULE-RMGT-017

Todo cambio productivo debe estar vinculado a un artefacto inmutable y verificable.

RULE-RMGT-018

Toda operación sensible requiere reason y puede requerir aprobación independiente.

RULE-RMGT-019

Toda modificación debe validar expected version o garantía equivalente.

RULE-RMGT-020

Toda operación repetible debe usar idempotencia.

RULE-RMGT-021

Todo resultado UNKNOWN debe iniciar conciliación.

RULE-RMGT-022

Todo release debe declarar riesgo, impacto, rollback y criterios de éxito.

RULE-RMGT-023

Toda operación de seguridad debe aplicar mínimo privilegio.

RULE-RMGT-024

Los secretos nunca deben exponerse en logs, artefactos, pipelines o documentación.

RULE-RMGT-025

Toda prueba operativa debe producir evidencia reproducible.

RULE-RMGT-026

Los tenants y entornos deben permanecer aislados.

RULE-RMGT-027

Toda falla crítica debe bloquear promoción o activar contención.

RULE-RMGT-028

Toda dependencia debe tener timeout, retry limitado y observabilidad.

RULE-RMGT-029

Toda intervención manual debe estar autorizada y auditada.

RULE-RMGT-030

Todo rollback debe verificar postcondiciones y no restaurar estados inseguros.

RULE-RMGT-031

Toda operación debe ser reproducible, versionada y auditable.

RULE-RMGT-032

Todo cambio productivo debe estar vinculado a un artefacto inmutable y verificable.

RULE-RMGT-033

Toda operación sensible requiere reason y puede requerir aprobación independiente.

RULE-RMGT-034

Toda modificación debe validar expected version o garantía equivalente.

RULE-RMGT-035

Toda operación repetible debe usar idempotencia.

RULE-RMGT-036

Todo resultado UNKNOWN debe iniciar conciliación.

RULE-RMGT-037

Todo release debe declarar riesgo, impacto, rollback y criterios de éxito.

RULE-RMGT-038

Toda operación de seguridad debe aplicar mínimo privilegio.

RULE-RMGT-039

Los secretos nunca deben exponerse en logs, artefactos, pipelines o documentación.

RULE-RMGT-040

Toda prueba operativa debe producir evidencia reproducible.

RULE-RMGT-041

Los tenants y entornos deben permanecer aislados.

RULE-RMGT-042

Toda falla crítica debe bloquear promoción o activar contención.

RULE-RMGT-043

Toda dependencia debe tener timeout, retry limitado y observabilidad.

RULE-RMGT-044

Toda intervención manual debe estar autorizada y auditada.

RULE-RMGT-045

Todo rollback debe verificar postcondiciones y no restaurar estados inseguros.

RULE-RMGT-046

Toda operación debe ser reproducible, versionada y auditable.

RULE-RMGT-047

Todo cambio productivo debe estar vinculado a un artefacto inmutable y verificable.

RULE-RMGT-048

Toda operación sensible requiere reason y puede requerir aprobación independiente.

RULE-RMGT-049

Toda modificación debe validar expected version o garantía equivalente.

RULE-RMGT-050

Toda operación repetible debe usar idempotencia.

RULE-RMGT-051

Todo resultado UNKNOWN debe iniciar conciliación.

RULE-RMGT-052

Todo release debe declarar riesgo, impacto, rollback y criterios de éxito.

RULE-RMGT-053

Toda operación de seguridad debe aplicar mínimo privilegio.

RULE-RMGT-054

Los secretos nunca deben exponerse en logs, artefactos, pipelines o documentación.

RULE-RMGT-055

Toda prueba operativa debe producir evidencia reproducible.

RULE-RMGT-056

Los tenants y entornos deben permanecer aislados.

RULE-RMGT-057

Toda falla crítica debe bloquear promoción o activar contención.

RULE-RMGT-058

Toda dependencia debe tener timeout, retry limitado y observabilidad.

RULE-RMGT-059

Toda intervención manual debe estar autorizada y auditada.

RULE-RMGT-060

Todo rollback debe verificar postcondiciones y no restaurar estados inseguros.

## 17. Contrato JSON de referencia

```json
{
  "operation_id": "UUID",
  "environment": "PRODUCTION",
  "tenant_scope": "UUID_OR_GLOBAL",
  "release_or_control_id": "STRING",
  "artifact_version": "1.0.0+BUILD",
  "expected_version": 7,
  "reason_code": "AUTHORIZED_OPERATION",
  "approval_reference": "UUID_OR_NULL",
  "idempotency_key": "STRING",
  "correlation_id": "UUID",
  "requested_at": "UTC_TIMESTAMP"
}
```

## 18. Flujo funcional

1. Recibir la solicitud.
2. Validar schema, límites, entorno y tenant.
3. Autenticar al actor o servicio.
4. Autorizar la operación.
5. Cargar el estado actual.
6. Validar expected version.
7. Resolver artefactos y políticas.
8. Ejecutar preflight o dry run.
9. Evaluar riesgo, reason y approval.
10. Consultar idempotencia.
11. Adquirir controles de concurrencia.
12. Ejecutar la operación controlada.
13. Validar salud, seguridad y postcondiciones.
14. Persistir resultado, auditoría y outbox.
15. Emitir eventos.
16. Actualizar métricas y trazas.
17. Ejecutar rollback, contención o conciliación.
18. Cerrar con evidencia verificable.

## 19. Pseudocódigo

```text
function execute_governed_operation(command):

    validate_schema_environment_and_scope(command)

    identity = authenticate_actor_or_service(
        command.actor_or_service_id
    )

    authorize_operation(
        identity=identity,
        operation=command.operation,
        environment=command.environment,
        tenant_scope=command.tenant_scope
    )

    current = load_current_state(command)
    validate_expected_version(
        current.version,
        command.expected_version
    )

    artifact_or_policy = resolve_immutable_inputs(command)

    preflight = execute_side_effect_free_preflight(
        command,
        current,
        artifact_or_policy
    )

    validate_preflight(preflight)
    validate_reason_and_evidence(command, preflight)

    if preflight.approval_required:
        validate_single_use_approval(
            command.approval_reference,
            hash_semantic_payload(
                command,
                preflight,
                artifact_or_policy
            )
        )

    previous = get_idempotent_result(
        command.idempotency_key
    )

    if previous.exists:
        return previous

    controls = acquire_required_controls(command)

    try:
        result = execute_official_operation(
            command,
            current,
            artifact_or_policy
        )

        verification = verify_health_security_and_postconditions(
            result
        )

        if not verification.acceptable:
            execute_safe_rollback_or_containment(
                command,
                result,
                verification
            )

        persist_result_audit_outbox_and_idempotency(
            command,
            result,
            verification
        )

        emit_events(result, verification)
        return build_safe_result(result, verification)

    except UnknownOutcomeError as error:
        mark_operation_unknown(command, error)
        schedule_reconciliation(command)
        return build_unknown_result(command)

    finally:
        release_owned_controls(controls)
```

## 20. Errores funcionales

RMGT_REQUEST_INVALID

RMGT_AUTHENTICATION_REQUIRED

RMGT_AUTHORIZATION_DENIED

RMGT_ENVIRONMENT_SCOPE_DENIED

RMGT_TENANT_SCOPE_DENIED

RMGT_RESOURCE_NOT_FOUND

RMGT_STATE_INVALID

RMGT_VERSION_CONFLICT

RMGT_ARTIFACT_INVALID

RMGT_POLICY_INVALID

RMGT_PREFLIGHT_FAILED

RMGT_APPROVAL_REQUIRED

RMGT_APPROVAL_INVALID

RMGT_IDEMPOTENCY_CONFLICT

RMGT_CONCURRENCY_CONFLICT

RMGT_DEPENDENCY_UNAVAILABLE

RMGT_TIMEOUT

RMGT_VERIFICATION_FAILED

RMGT_RESULT_UNKNOWN

RMGT_ROLLBACK_FAILED

RMGT_CONTAINMENT_FAILED

RMGT_AUDIT_PERSISTENCE_FAILED

RMGT_SECURITY_POLICY_DENIED

## 21. Eventos

OperationRequested

PreflightStarted

PreflightCompleted

PreflightFailed

ApprovalRequested

ApprovalGranted

OperationStarted

VerificationStarted

VerificationCompleted

OperationCompleted

OperationFailed

OperationMarkedUnknown

RollbackStarted

RollbackCompleted

ContainmentActivated

ReconciliationRequested

ReconciliationCompleted

AuditEvidenceRecorded

## 22. Observabilidad

- 13_07_11_release_management_requests_total;
- 13_07_11_release_management_success_total;
- 13_07_11_release_management_failure_total;
- 13_07_11_release_management_duration_seconds;
- 13_07_11_release_management_preflight_failure_total;
- 13_07_11_release_management_approval_required_total;
- 13_07_11_release_management_version_conflict_total;
- 13_07_11_release_management_idempotency_hit_total;
- 13_07_11_release_management_verification_failure_total;
- 13_07_11_release_management_unknown_total;
- 13_07_11_release_management_rollback_total;
- 13_07_11_release_management_rollback_failure_total;
- 13_07_11_release_management_containment_total;
- 13_07_11_release_management_reconciliation_total;
- 13_07_11_release_management_security_denied_total;
- 13_07_11_release_management_audit_failure_total;

Dimensiones permitidas:

- environment;
- operation;
- risk;
- result;
- error_code;
- tenant_tier.

Prohibido usar IDs únicos, secretos, tokens, nombres, correos, URLs completas o payloads como etiquetas.

## 23. Seguridad

- Mínimo privilegio y segregación de funciones.
- MFA o step-up para producción.
- Secretos únicamente por referencias.
- Firmas, checksums, SBOM y provenance.
- Aprobaciones single-use vinculadas al payload.
- Break-glass con expiración, alerta y revisión.
- Segmentación de red y egress control.
- Protección contra replay, SSRF, CSRF e inyección.
- Redacción de logs, trazas y evidencia.
- Aislamiento por tenant y entorno.
- Escaneo de dependencias e imágenes.
- Auditoría de operaciones y lecturas sensibles.

## 24. Casos límite y pruebas adversariales

TEST-RMGT-001: verificar dos operaciones intentan ejecutarse sobre la misma versión; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-002: verificar la aprobación expira antes del commit; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-003: verificar el actor pierde el permiso durante el flujo; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-004: verificar el tenant queda suspendido; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-005: verificar el artefacto tiene checksum inválido; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-006: verificar la política cambia después del preflight; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-007: verificar la dependencia responde después del timeout; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-008: verificar el resultado queda UNKNOWN; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-009: verificar la verificación funcional falla; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-010: verificar el rollback falla; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-011: verificar la auditoría queda degradada; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-012: verificar un evento se duplica; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-013: verificar un evento llega fuera de orden; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-014: verificar un secreto es revocado; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-015: verificar un entorno usa credenciales incorrectas; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-016: verificar un actor intenta autoaprobarse; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-017: verificar se detecta una vulnerabilidad crítica después del build; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-018: verificar un canary empeora el error budget; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-019: verificar una operación de seguridad afecta otro tenant; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-020: verificar una prueba de caos impacta tráfico no autorizado; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-021: verificar una restauración usa artefacto incompatible; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-022: verificar el sistema se recupera y provoca stampede; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-023: verificar una cola conserva mensajes incompatibles; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-024: verificar un hotfix omite evidencia; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-RMGT-025: verificar un rollback restaura una configuración insegura; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

## 25. Criterios de aceptación

AC-RMGT-001

Toda operación está autenticada y autorizada.

AC-RMGT-002

Todo entorno y tenant permanecen aislados.

AC-RMGT-003

Todo artefacto o policy es verificable.

AC-RMGT-004

Toda modificación valida versión.

AC-RMGT-005

Toda operación repetible usa idempotencia.

AC-RMGT-006

Toda operación sensible exige reason.

AC-RMGT-007

Toda operación crítica soporta approval.

AC-RMGT-008

Toda aprobación se vincula al payload.

AC-RMGT-009

Todo resultado UNKNOWN se concilia.

AC-RMGT-010

Toda verificación usa postcondiciones.

AC-RMGT-011

Todo rollback es explícito.

AC-RMGT-012

Los secretos no se exponen.

AC-RMGT-013

Las pruebas producen evidencia.

AC-RMGT-014

Las métricas evitan alta cardinalidad.

AC-RMGT-015

Toda operación es auditable.

AC-RMGT-016

Toda operación está autenticada y autorizada.

AC-RMGT-017

Todo entorno y tenant permanecen aislados.

AC-RMGT-018

Todo artefacto o policy es verificable.

AC-RMGT-019

Toda modificación valida versión.

AC-RMGT-020

Toda operación repetible usa idempotencia.

AC-RMGT-021

Toda operación sensible exige reason.

AC-RMGT-022

Toda operación crítica soporta approval.

AC-RMGT-023

Toda aprobación se vincula al payload.

AC-RMGT-024

Todo resultado UNKNOWN se concilia.

AC-RMGT-025

Toda verificación usa postcondiciones.

AC-RMGT-026

Todo rollback es explícito.

AC-RMGT-027

Los secretos no se exponen.

AC-RMGT-028

Las pruebas producen evidencia.

AC-RMGT-029

Las métricas evitan alta cardinalidad.

AC-RMGT-030

Toda operación es auditable.

AC-RMGT-031

Toda operación está autenticada y autorizada.

AC-RMGT-032

Todo entorno y tenant permanecen aislados.

AC-RMGT-033

Todo artefacto o policy es verificable.

AC-RMGT-034

Toda modificación valida versión.

AC-RMGT-035

Toda operación repetible usa idempotencia.

AC-RMGT-036

Toda operación sensible exige reason.

AC-RMGT-037

Toda operación crítica soporta approval.

AC-RMGT-038

Toda aprobación se vincula al payload.

AC-RMGT-039

Todo resultado UNKNOWN se concilia.

AC-RMGT-040

Toda verificación usa postcondiciones.

AC-RMGT-041

Todo rollback es explícito.

AC-RMGT-042

Los secretos no se exponen.

AC-RMGT-043

Las pruebas producen evidencia.

AC-RMGT-044

Las métricas evitan alta cardinalidad.

AC-RMGT-045

Toda operación es auditable.

AC-RMGT-046

Toda operación está autenticada y autorizada.

AC-RMGT-047

Todo entorno y tenant permanecen aislados.

AC-RMGT-048

Todo artefacto o policy es verificable.

AC-RMGT-049

Toda modificación valida versión.

AC-RMGT-050

Toda operación repetible usa idempotencia.

AC-RMGT-051

Toda operación sensible exige reason.

AC-RMGT-052

Toda operación crítica soporta approval.

AC-RMGT-053

Toda aprobación se vincula al payload.

AC-RMGT-054

Todo resultado UNKNOWN se concilia.

AC-RMGT-055

Toda verificación usa postcondiciones.

AC-RMGT-056

Todo rollback es explícito.

AC-RMGT-057

Los secretos no se exponen.

AC-RMGT-058

Las pruebas producen evidencia.

AC-RMGT-059

Las métricas evitan alta cardinalidad.

AC-RMGT-060

Toda operación es auditable.

## 26. Checklist final

[ ] Existe identificador estable.
[ ] Existe environment scope.
[ ] Existe tenant scope.
[ ] Existe autenticación.
[ ] Existe autorización.
[ ] Existe assurance policy.
[ ] Existe expected version.
[ ] Existe artifact o policy version.
[ ] Existe checksum.
[ ] Existe Idempotency Key.
[ ] Existe preflight.
[ ] Existe approval policy.
[ ] Existe concurrency control.
[ ] Existe timeout.
[ ] Existe retry policy.
[ ] Existe verification.
[ ] Existe UNKNOWN policy.
[ ] Existe rollback.
[ ] Existe containment.
[ ] Existe reconciliation.
[ ] Existen errores estables.
[ ] Existen eventos.
[ ] Existen métricas.
[ ] Existen trazas.
[ ] Existe auditoría.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
