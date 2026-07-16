======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-07-12-OPERATIONAL-SECURITY.md

# SEGURIDAD OPERATIVA

## 1. Objetivo

Define acceso privilegiado, secretos, redes, supply chain, vulnerabilidades, parches, detección, contención y ejercicios de seguridad operativa.

## 2. Alcance

Incluye IAM operativo, acceso productivo, sesiones, MFA, break-glass, secretos, red, egress, imágenes, dependencias, vulnerabilidades, parches, malware, detección, contención, auditoría y QA.

## 3. Modelo de acceso

El acceso productivo se basa en roles, atributos, entorno, tenant, assurance, risk y time-bound grants. La ausencia de permiso deniega.

## 4. MFA y step-up

Producción, secretos, pagos, refunds, restores, rotations, break-glass y cambios globales requieren AAL reforzado.

## 5. Privileged Access

Los accesos privilegiados deben ser temporales, justificados, revisables, con session recording o evidencia equivalente cuando la policy lo permita.

## 6. Break-glass

Debe tener scope mínimo, expiración, reason, alerta, approval cuando sea posible, revisión posterior y prohibición de desactivar audit.

## 7. Secret Operations

Incluyen creación, binding, rotación, revocación, compromise response y audit. El valor no debe mostrarse en UI ni logs.

## 8. Network Security

Se aplican segmentación, allowlists, mTLS cuando corresponde, egress controls, private endpoints, DNS policies y bloqueo de rangos internos para entradas externas.

## 9. Supply Chain

Todo artefacto requiere dependencias fijadas, SBOM, firmas, provenance, image scanning, license policy y verificación en promoción.

## 10. Vulnerability Management

Las vulnerabilidades se clasifican, asignan, priorizan y remedian con SLA. Las críticas pueden bloquear release o activar mitigación inmediata.

## 11. Patch Management

Los parches se prueban en entornos inferiores, se promueven por canary y conservan rollback y evidencia.

## 12. Detection

Se supervisan autenticaciones, denegaciones, anomalías, exports, cross-tenant attempts, secret access, provider changes, malware y integrity failures.

## 13. Containment

Puede revocar sesiones, secretos, egress, provider, channel, writes, feature flags o tenant access preservando evidencia y conciliación.

## 14. Data Protection

Se aplican cifrado, minimización, clasificación, retention, legal hold, access logging y redaction.

## 15. Security Exercises

Se realizan tabletop, credential compromise, provider compromise, webhook spoof, cross-tenant, ransomware, restore y incident response drills.

## 16. Reglas normativas

RULE-OSEC-001

Toda operación debe ser reproducible, versionada y auditable.

RULE-OSEC-002

Todo cambio productivo debe estar vinculado a un artefacto inmutable y verificable.

RULE-OSEC-003

Toda operación sensible requiere reason y puede requerir aprobación independiente.

RULE-OSEC-004

Toda modificación debe validar expected version o garantía equivalente.

RULE-OSEC-005

Toda operación repetible debe usar idempotencia.

RULE-OSEC-006

Todo resultado UNKNOWN debe iniciar conciliación.

RULE-OSEC-007

Todo release debe declarar riesgo, impacto, rollback y criterios de éxito.

RULE-OSEC-008

Toda operación de seguridad debe aplicar mínimo privilegio.

RULE-OSEC-009

Los secretos nunca deben exponerse en logs, artefactos, pipelines o documentación.

RULE-OSEC-010

Toda prueba operativa debe producir evidencia reproducible.

RULE-OSEC-011

Los tenants y entornos deben permanecer aislados.

RULE-OSEC-012

Toda falla crítica debe bloquear promoción o activar contención.

RULE-OSEC-013

Toda dependencia debe tener timeout, retry limitado y observabilidad.

RULE-OSEC-014

Toda intervención manual debe estar autorizada y auditada.

RULE-OSEC-015

Todo rollback debe verificar postcondiciones y no restaurar estados inseguros.

RULE-OSEC-016

Toda operación debe ser reproducible, versionada y auditable.

RULE-OSEC-017

Todo cambio productivo debe estar vinculado a un artefacto inmutable y verificable.

RULE-OSEC-018

Toda operación sensible requiere reason y puede requerir aprobación independiente.

RULE-OSEC-019

Toda modificación debe validar expected version o garantía equivalente.

RULE-OSEC-020

Toda operación repetible debe usar idempotencia.

RULE-OSEC-021

Todo resultado UNKNOWN debe iniciar conciliación.

RULE-OSEC-022

Todo release debe declarar riesgo, impacto, rollback y criterios de éxito.

RULE-OSEC-023

Toda operación de seguridad debe aplicar mínimo privilegio.

RULE-OSEC-024

Los secretos nunca deben exponerse en logs, artefactos, pipelines o documentación.

RULE-OSEC-025

Toda prueba operativa debe producir evidencia reproducible.

RULE-OSEC-026

Los tenants y entornos deben permanecer aislados.

RULE-OSEC-027

Toda falla crítica debe bloquear promoción o activar contención.

RULE-OSEC-028

Toda dependencia debe tener timeout, retry limitado y observabilidad.

RULE-OSEC-029

Toda intervención manual debe estar autorizada y auditada.

RULE-OSEC-030

Todo rollback debe verificar postcondiciones y no restaurar estados inseguros.

RULE-OSEC-031

Toda operación debe ser reproducible, versionada y auditable.

RULE-OSEC-032

Todo cambio productivo debe estar vinculado a un artefacto inmutable y verificable.

RULE-OSEC-033

Toda operación sensible requiere reason y puede requerir aprobación independiente.

RULE-OSEC-034

Toda modificación debe validar expected version o garantía equivalente.

RULE-OSEC-035

Toda operación repetible debe usar idempotencia.

RULE-OSEC-036

Todo resultado UNKNOWN debe iniciar conciliación.

RULE-OSEC-037

Todo release debe declarar riesgo, impacto, rollback y criterios de éxito.

RULE-OSEC-038

Toda operación de seguridad debe aplicar mínimo privilegio.

RULE-OSEC-039

Los secretos nunca deben exponerse en logs, artefactos, pipelines o documentación.

RULE-OSEC-040

Toda prueba operativa debe producir evidencia reproducible.

RULE-OSEC-041

Los tenants y entornos deben permanecer aislados.

RULE-OSEC-042

Toda falla crítica debe bloquear promoción o activar contención.

RULE-OSEC-043

Toda dependencia debe tener timeout, retry limitado y observabilidad.

RULE-OSEC-044

Toda intervención manual debe estar autorizada y auditada.

RULE-OSEC-045

Todo rollback debe verificar postcondiciones y no restaurar estados inseguros.

RULE-OSEC-046

Toda operación debe ser reproducible, versionada y auditable.

RULE-OSEC-047

Todo cambio productivo debe estar vinculado a un artefacto inmutable y verificable.

RULE-OSEC-048

Toda operación sensible requiere reason y puede requerir aprobación independiente.

RULE-OSEC-049

Toda modificación debe validar expected version o garantía equivalente.

RULE-OSEC-050

Toda operación repetible debe usar idempotencia.

RULE-OSEC-051

Todo resultado UNKNOWN debe iniciar conciliación.

RULE-OSEC-052

Todo release debe declarar riesgo, impacto, rollback y criterios de éxito.

RULE-OSEC-053

Toda operación de seguridad debe aplicar mínimo privilegio.

RULE-OSEC-054

Los secretos nunca deben exponerse en logs, artefactos, pipelines o documentación.

RULE-OSEC-055

Toda prueba operativa debe producir evidencia reproducible.

RULE-OSEC-056

Los tenants y entornos deben permanecer aislados.

RULE-OSEC-057

Toda falla crítica debe bloquear promoción o activar contención.

RULE-OSEC-058

Toda dependencia debe tener timeout, retry limitado y observabilidad.

RULE-OSEC-059

Toda intervención manual debe estar autorizada y auditada.

RULE-OSEC-060

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

OSEC_REQUEST_INVALID

OSEC_AUTHENTICATION_REQUIRED

OSEC_AUTHORIZATION_DENIED

OSEC_ENVIRONMENT_SCOPE_DENIED

OSEC_TENANT_SCOPE_DENIED

OSEC_RESOURCE_NOT_FOUND

OSEC_STATE_INVALID

OSEC_VERSION_CONFLICT

OSEC_ARTIFACT_INVALID

OSEC_POLICY_INVALID

OSEC_PREFLIGHT_FAILED

OSEC_APPROVAL_REQUIRED

OSEC_APPROVAL_INVALID

OSEC_IDEMPOTENCY_CONFLICT

OSEC_CONCURRENCY_CONFLICT

OSEC_DEPENDENCY_UNAVAILABLE

OSEC_TIMEOUT

OSEC_VERIFICATION_FAILED

OSEC_RESULT_UNKNOWN

OSEC_ROLLBACK_FAILED

OSEC_CONTAINMENT_FAILED

OSEC_AUDIT_PERSISTENCE_FAILED

OSEC_SECURITY_POLICY_DENIED

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

- 13_07_12_operational_security_requests_total;
- 13_07_12_operational_security_success_total;
- 13_07_12_operational_security_failure_total;
- 13_07_12_operational_security_duration_seconds;
- 13_07_12_operational_security_preflight_failure_total;
- 13_07_12_operational_security_approval_required_total;
- 13_07_12_operational_security_version_conflict_total;
- 13_07_12_operational_security_idempotency_hit_total;
- 13_07_12_operational_security_verification_failure_total;
- 13_07_12_operational_security_unknown_total;
- 13_07_12_operational_security_rollback_total;
- 13_07_12_operational_security_rollback_failure_total;
- 13_07_12_operational_security_containment_total;
- 13_07_12_operational_security_reconciliation_total;
- 13_07_12_operational_security_security_denied_total;
- 13_07_12_operational_security_audit_failure_total;

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

TEST-OSEC-001: verificar dos operaciones intentan ejecutarse sobre la misma versión; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-002: verificar la aprobación expira antes del commit; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-003: verificar el actor pierde el permiso durante el flujo; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-004: verificar el tenant queda suspendido; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-005: verificar el artefacto tiene checksum inválido; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-006: verificar la política cambia después del preflight; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-007: verificar la dependencia responde después del timeout; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-008: verificar el resultado queda UNKNOWN; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-009: verificar la verificación funcional falla; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-010: verificar el rollback falla; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-011: verificar la auditoría queda degradada; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-012: verificar un evento se duplica; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-013: verificar un evento llega fuera de orden; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-014: verificar un secreto es revocado; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-015: verificar un entorno usa credenciales incorrectas; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-016: verificar un actor intenta autoaprobarse; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-017: verificar se detecta una vulnerabilidad crítica después del build; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-018: verificar un canary empeora el error budget; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-019: verificar una operación de seguridad afecta otro tenant; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-020: verificar una prueba de caos impacta tráfico no autorizado; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-021: verificar una restauración usa artefacto incompatible; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-022: verificar el sistema se recupera y provoca stampede; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-023: verificar una cola conserva mensajes incompatibles; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-024: verificar un hotfix omite evidencia; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

TEST-OSEC-025: verificar un rollback restaura una configuración insegura; el sistema debe preservar aislamiento, seguridad, idempotencia, versiones y evidencia.

## 25. Criterios de aceptación

AC-OSEC-001

Toda operación está autenticada y autorizada.

AC-OSEC-002

Todo entorno y tenant permanecen aislados.

AC-OSEC-003

Todo artefacto o policy es verificable.

AC-OSEC-004

Toda modificación valida versión.

AC-OSEC-005

Toda operación repetible usa idempotencia.

AC-OSEC-006

Toda operación sensible exige reason.

AC-OSEC-007

Toda operación crítica soporta approval.

AC-OSEC-008

Toda aprobación se vincula al payload.

AC-OSEC-009

Todo resultado UNKNOWN se concilia.

AC-OSEC-010

Toda verificación usa postcondiciones.

AC-OSEC-011

Todo rollback es explícito.

AC-OSEC-012

Los secretos no se exponen.

AC-OSEC-013

Las pruebas producen evidencia.

AC-OSEC-014

Las métricas evitan alta cardinalidad.

AC-OSEC-015

Toda operación es auditable.

AC-OSEC-016

Toda operación está autenticada y autorizada.

AC-OSEC-017

Todo entorno y tenant permanecen aislados.

AC-OSEC-018

Todo artefacto o policy es verificable.

AC-OSEC-019

Toda modificación valida versión.

AC-OSEC-020

Toda operación repetible usa idempotencia.

AC-OSEC-021

Toda operación sensible exige reason.

AC-OSEC-022

Toda operación crítica soporta approval.

AC-OSEC-023

Toda aprobación se vincula al payload.

AC-OSEC-024

Todo resultado UNKNOWN se concilia.

AC-OSEC-025

Toda verificación usa postcondiciones.

AC-OSEC-026

Todo rollback es explícito.

AC-OSEC-027

Los secretos no se exponen.

AC-OSEC-028

Las pruebas producen evidencia.

AC-OSEC-029

Las métricas evitan alta cardinalidad.

AC-OSEC-030

Toda operación es auditable.

AC-OSEC-031

Toda operación está autenticada y autorizada.

AC-OSEC-032

Todo entorno y tenant permanecen aislados.

AC-OSEC-033

Todo artefacto o policy es verificable.

AC-OSEC-034

Toda modificación valida versión.

AC-OSEC-035

Toda operación repetible usa idempotencia.

AC-OSEC-036

Toda operación sensible exige reason.

AC-OSEC-037

Toda operación crítica soporta approval.

AC-OSEC-038

Toda aprobación se vincula al payload.

AC-OSEC-039

Todo resultado UNKNOWN se concilia.

AC-OSEC-040

Toda verificación usa postcondiciones.

AC-OSEC-041

Todo rollback es explícito.

AC-OSEC-042

Los secretos no se exponen.

AC-OSEC-043

Las pruebas producen evidencia.

AC-OSEC-044

Las métricas evitan alta cardinalidad.

AC-OSEC-045

Toda operación es auditable.

AC-OSEC-046

Toda operación está autenticada y autorizada.

AC-OSEC-047

Todo entorno y tenant permanecen aislados.

AC-OSEC-048

Todo artefacto o policy es verificable.

AC-OSEC-049

Toda modificación valida versión.

AC-OSEC-050

Toda operación repetible usa idempotencia.

AC-OSEC-051

Toda operación sensible exige reason.

AC-OSEC-052

Toda operación crítica soporta approval.

AC-OSEC-053

Toda aprobación se vincula al payload.

AC-OSEC-054

Todo resultado UNKNOWN se concilia.

AC-OSEC-055

Toda verificación usa postcondiciones.

AC-OSEC-056

Todo rollback es explícito.

AC-OSEC-057

Los secretos no se exponen.

AC-OSEC-058

Las pruebas producen evidencia.

AC-OSEC-059

Las métricas evitan alta cardinalidad.

AC-OSEC-060

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
