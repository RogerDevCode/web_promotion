======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-07-13-OPERATIONS-TESTING-CHAOS.md

# TESTING OPERATIVO Y CHAOS ENGINEERING

## 1. Objetivo

Define la estrategia exhaustiva para probar despliegues, migraciones, restore, failover, scaling, observabilidad, runbooks, seguridad y resiliencia.

## 2. Alcance

Incluye pruebas de despliegue, migraciones, rollback, backups, restore, failover, observabilidad, scaling, load, soak, stress, chaos, security, runbooks, incident drills y evidencia.

## 3. Capas

UNIT valida parsers y policies; COMPONENT valida adapters operativos; CONTRACT valida proveedores; INTEGRATION valida servicios; E2E valida flujos; CHAOS valida resiliencia.

## 4. Environment Tests

Verifican aislamiento, dominios, secrets, callbacks, data policies, flags, quotas, observability y access controls por entorno.

## 5. Deployment Tests

Cubren rolling, blue-green, canary, readiness, health, connection draining, graceful shutdown, rollback y postconditions.

## 6. Migration Tests

Incluyen forward, compatibility, backfill, resume, failure, lock impact, rollback strategy, expand-contract y data verification.

## 7. Backup/Restore Tests

Incluyen checksum, encryption, restore, PITR, tenant restore, object storage, legal hold, RPO, RTO y corrupted backup.

## 8. Queue/Worker Tests

Incluyen duplicate, retry, DLQ, visibility timeout, ordering, shutdown, stale message, poison message, backlog y recovery.

## 9. Scaling Tests

Incluyen steady, spike, soak, stress, breakpoint, autoscaling, cooldown, max replicas, dependency bottleneck y cost guardrails.

## 10. Observability Tests

Verifican logs, metrics, traces, correlation, cardinality, redaction, sampling, alerts, dashboards, retention y backend outage.

## 11. Chaos Tests

Inyectan DNS failure, network partition, latency, packet loss, process crash, zone loss, DB failover, Redis loss, queue delay, provider outage y clock skew.

## 12. Runbook Tests

Cada runbook se ejecuta en entorno seguro, valida prerequisites, commands, stop conditions, rollback, verification, escalation y evidence.

## 13. Security Tests

Incluyen privilege escalation, break-glass abuse, secret leakage, SSRF, webhook spoof, cross-tenant, malicious image, supply-chain y audit tampering.

## 14. Release Gates

Bloquean promoción: cross-tenant, secrets in logs, missing SBOM, failed restore, migration incompatibility, no rollback, UNKNOWN blind retry, critical vulnerability y broken audit.

## 15. Evidence

Cada prueba conserva Test Run ID, commit, artifact, config, dataset, seed, environment, logs redactados, traces, metrics, screenshots referenciados y resultado.

## 16. Reglas normativas

RULE-OTC-001

Toda operación debe ser reproducible, versionada y auditable.

RULE-OTC-002

Todo cambio productivo debe estar vinculado a un artefacto inmutable y verificable.

RULE-OTC-003

Toda operación sensible requiere reason y puede requerir aprobación independiente.

RULE-OTC-004

Toda modificación debe validar expected version o garantía equivalente.

RULE-OTC-005

Toda operación repetible debe usar idempotencia.

RULE-OTC-006

Todo resultado UNKNOWN debe iniciar conciliación.

RULE-OTC-007

Todo release debe declarar riesgo, impacto, rollback y criterios de éxito.

RULE-OTC-008

Toda operación de seguridad debe aplicar mínimo privilegio.

RULE-OTC-009

Los secretos nunca deben exponerse en logs, artefactos, pipelines o documentación.

RULE-OTC-010

Toda prueba operativa debe producir evidencia reproducible.

RULE-OTC-011

Los tenants y entornos deben permanecer aislados.

RULE-OTC-012

Toda falla crítica debe bloquear promoción o activar contención.

RULE-OTC-013

Toda dependencia debe tener timeout, retry limitado y observabilidad.

RULE-OTC-014

Toda intervención manual debe estar autorizada y auditada.

RULE-OTC-015

Todo rollback debe verificar postcondiciones y no restaurar estados inseguros.

RULE-OTC-016

Toda operación debe ser reproducible, versionada y auditable.

RULE-OTC-017

Todo cambio productivo debe estar vinculado a un artefacto inmutable y verificable.

RULE-OTC-018

Toda operación sensible requiere reason y puede requerir aprobación independiente.

RULE-OTC-019

Toda modificación debe validar expected version o garantía equivalente.

RULE-OTC-020

Toda operación repetible debe usar idempotencia.

RULE-OTC-021

Todo resultado UNKNOWN debe iniciar conciliación.

RULE-OTC-022

Todo release debe declarar riesgo, impacto, rollback y criterios de éxito.

RULE-OTC-023

Toda operación de seguridad debe aplicar mínimo privilegio.

RULE-OTC-024

Los secretos nunca deben exponerse en logs, artefactos, pipelines o documentación.

RULE-OTC-025

Toda prueba operativa debe producir evidencia reproducible.

RULE-OTC-026

Los tenants y entornos deben permanecer aislados.

RULE-OTC-027

Toda falla crítica debe bloquear promoción o activar contención.

RULE-OTC-028

Toda dependencia debe tener timeout, retry limitado y observabilidad.

RULE-OTC-029

Toda intervención manual debe estar autorizada y auditada.

RULE-OTC-030

Todo rollback debe verificar postcondiciones y no restaurar estados inseguros.

RULE-OTC-031

Toda operación debe ser reproducible, versionada y auditable.

RULE-OTC-032

Todo cambio productivo debe estar vinculado a un artefacto inmutable y verificable.

RULE-OTC-033

Toda operación sensible requiere reason y puede requerir aprobación independiente.

RULE-OTC-034

Toda modificación debe validar expected version o garantía equivalente.

RULE-OTC-035

Toda operación repetible debe usar idempotencia.

RULE-OTC-036

Todo resultado UNKNOWN debe iniciar conciliación.

RULE-OTC-037

Todo release debe declarar riesgo, impacto, rollback y criterios de éxito.

RULE-OTC-038

Toda operación de seguridad debe aplicar mínimo privilegio.

RULE-OTC-039

Los secretos nunca deben exponerse en logs, artefactos, pipelines o documentación.

RULE-OTC-040

Toda prueba operativa debe producir evidencia reproducible.

RULE-OTC-041

Los tenants y entornos deben permanecer aislados.

RULE-OTC-042

Toda falla crítica debe bloquear promoción o activar contención.

RULE-OTC-043

Toda dependencia debe tener timeout, retry limitado y observabilidad.

RULE-OTC-044

Toda intervención manual debe estar autorizada y auditada.

RULE-OTC-045

Todo rollback debe verificar postcondiciones y no restaurar estados inseguros.

RULE-OTC-046

Toda operación debe ser reproducible, versionada y auditable.

RULE-OTC-047

Todo cambio productivo debe estar vinculado a un artefacto inmutable y verificable.

RULE-OTC-048

Toda operación sensible requiere reason y puede requerir aprobación independiente.

RULE-OTC-049

Toda modificación debe validar expected version o garantía equivalente.

RULE-OTC-050

Toda operación repetible debe usar idempotencia.

RULE-OTC-051

Todo resultado UNKNOWN debe iniciar conciliación.

RULE-OTC-052

Todo release debe declarar riesgo, impacto, rollback y criterios de éxito.

RULE-OTC-053

Toda operación de seguridad debe aplicar mínimo privilegio.

RULE-OTC-054

Los secretos nunca deben exponerse en logs, artefactos, pipelines o documentación.

RULE-OTC-055

Toda prueba operativa debe producir evidencia reproducible.

RULE-OTC-056

Los tenants y entornos deben permanecer aislados.

RULE-OTC-057

Toda falla crítica debe bloquear promoción o activar contención.

RULE-OTC-058

Toda dependencia debe tener timeout, retry limitado y observabilidad.

RULE-OTC-059

Toda intervención manual debe estar autorizada y auditada.

RULE-OTC-060

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

OTC_REQUEST_INVALID

OTC_AUTHENTICATION_REQUIRED

OTC_AUTHORIZATION_DENIED

OTC_ENVIRONMENT_SCOPE_DENIED

OTC_TENANT_SCOPE_DENIED

OTC_RESOURCE_NOT_FOUND

OTC_STATE_INVALID

OTC_VERSION_CONFLICT

OTC_ARTIFACT_INVALID

OTC_POLICY_INVALID

OTC_PREFLIGHT_FAILED

OTC_APPROVAL_REQUIRED

OTC_APPROVAL_INVALID

OTC_IDEMPOTENCY_CONFLICT

OTC_CONCURRENCY_CONFLICT

OTC_DEPENDENCY_UNAVAILABLE

OTC_TIMEOUT

OTC_VERIFICATION_FAILED

OTC_RESULT_UNKNOWN

OTC_ROLLBACK_FAILED

OTC_CONTAINMENT_FAILED

OTC_AUDIT_PERSISTENCE_FAILED

OTC_SECURITY_POLICY_DENIED

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

- 13_07_13_operations_testing_chaos_requests_total;
- 13_07_13_operations_testing_chaos_success_total;
- 13_07_13_operations_testing_chaos_failure_total;
- 13_07_13_operations_testing_chaos_duration_seconds;
- 13_07_13_operations_testing_chaos_preflight_failure_total;
- 13_07_13_operations_testing_chaos_approval_required_total;
- 13_07_13_operations_testing_chaos_version_conflict_total;
- 13_07_13_operations_testing_chaos_idempotency_hit_total;
- 13_07_13_operations_testing_chaos_verification_failure_total;
- 13_07_13_operations_testing_chaos_unknown_total;
- 13_07_13_operations_testing_chaos_rollback_total;
- 13_07_13_operations_testing_chaos_rollback_failure_total;
- 13_07_13_operations_testing_chaos_containment_total;
- 13_07_13_operations_testing_chaos_reconciliation_total;
- 13_07_13_operations_testing_chaos_security_denied_total;
- 13_07_13_operations_testing_chaos_audit_failure_total;

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

TEST-OTC-001: verificar dos operaciones intentan ejecutarse sobre la misma versión; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-002: verificar la aprobación expira antes del commit; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-003: verificar el actor pierde el permiso durante el flujo; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-004: verificar el tenant queda suspendido; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-005: verificar el artefacto tiene checksum inválido; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-006: verificar la política cambia después del preflight; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-007: verificar la dependencia responde después del timeout; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-008: verificar el resultado queda UNKNOWN; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-009: verificar la verificación funcional falla; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-010: verificar el rollback falla; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-011: verificar la auditoría queda degradada; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-012: verificar un evento se duplica; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-013: verificar un evento llega fuera de orden; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-014: verificar un secreto es revocado; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-015: verificar un entorno usa credenciales incorrectas; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-016: verificar un actor intenta autoaprobarse; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-017: verificar se detecta una vulnerabilidad crítica después del build; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-018: verificar un canary empeora el error budget; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-019: verificar una operación de seguridad afecta otro tenant; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-020: verificar una prueba de caos impacta tráfico no autorizado; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-021: verificar una restauración usa artefacto incompatible; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-022: verificar el sistema se recupera y provoca stampede; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-023: verificar una cola conserva mensajes incompatibles; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-024: verificar un hotfix omite evidencia; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OTC-025: verificar un rollback restaura una configuración insegura; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

## 25. Criterios de aceptación

AC-OTC-001

Toda operación está autenticada y autorizada.

AC-OTC-002

Todo entorno y tenant permanecen aislados.

AC-OTC-003

Todo artefacto o policy es verificable.

AC-OTC-004

Toda modificación valida versión.

AC-OTC-005

Toda operación repetible usa idempotencia.

AC-OTC-006

Toda operación sensible exige reason.

AC-OTC-007

Toda operación crítica soporta approval.

AC-OTC-008

Toda aprobación se vincula al payload.

AC-OTC-009

Todo resultado UNKNOWN se concilia.

AC-OTC-010

Toda verificación usa postcondiciones.

AC-OTC-011

Todo rollback es explícito.

AC-OTC-012

Los secretos no se exponen.

AC-OTC-013

Las pruebas producen evidencia.

AC-OTC-014

Las métricas evitan alta cardinalidad.

AC-OTC-015

Toda operación es auditable.

AC-OTC-016

Toda operación está autenticada y autorizada.

AC-OTC-017

Todo entorno y tenant permanecen aislados.

AC-OTC-018

Todo artefacto o policy es verificable.

AC-OTC-019

Toda modificación valida versión.

AC-OTC-020

Toda operación repetible usa idempotencia.

AC-OTC-021

Toda operación sensible exige reason.

AC-OTC-022

Toda operación crítica soporta approval.

AC-OTC-023

Toda aprobación se vincula al payload.

AC-OTC-024

Todo resultado UNKNOWN se concilia.

AC-OTC-025

Toda verificación usa postcondiciones.

AC-OTC-026

Todo rollback es explícito.

AC-OTC-027

Los secretos no se exponen.

AC-OTC-028

Las pruebas producen evidencia.

AC-OTC-029

Las métricas evitan alta cardinalidad.

AC-OTC-030

Toda operación es auditable.

AC-OTC-031

Toda operación está autenticada y autorizada.

AC-OTC-032

Todo entorno y tenant permanecen aislados.

AC-OTC-033

Todo artefacto o policy es verificable.

AC-OTC-034

Toda modificación valida versión.

AC-OTC-035

Toda operación repetible usa idempotencia.

AC-OTC-036

Toda operación sensible exige reason.

AC-OTC-037

Toda operación crítica soporta approval.

AC-OTC-038

Toda aprobación se vincula al payload.

AC-OTC-039

Todo resultado UNKNOWN se concilia.

AC-OTC-040

Toda verificación usa postcondiciones.

AC-OTC-041

Todo rollback es explícito.

AC-OTC-042

Los secretos no se exponen.

AC-OTC-043

Las pruebas producen evidencia.

AC-OTC-044

Las métricas evitan alta cardinalidad.

AC-OTC-045

Toda operación es auditable.

AC-OTC-046

Toda operación está autenticada y autorizada.

AC-OTC-047

Todo entorno y tenant permanecen aislados.

AC-OTC-048

Todo artefacto o policy es verificable.

AC-OTC-049

Toda modificación valida versión.

AC-OTC-050

Toda operación repetible usa idempotencia.

AC-OTC-051

Toda operación sensible exige reason.

AC-OTC-052

Toda operación crítica soporta approval.

AC-OTC-053

Toda aprobación se vincula al payload.

AC-OTC-054

Todo resultado UNKNOWN se concilia.

AC-OTC-055

Toda verificación usa postcondiciones.

AC-OTC-056

Todo rollback es explícito.

AC-OTC-057

Los secretos no se exponen.

AC-OTC-058

Las pruebas producen evidencia.

AC-OTC-059

Las métricas evitan alta cardinalidad.

AC-OTC-060

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
