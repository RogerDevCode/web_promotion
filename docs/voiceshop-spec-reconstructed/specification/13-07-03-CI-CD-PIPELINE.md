======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-07-03-CI-CD-PIPELINE.md

# PIPELINE CI/CD Y PROMOCIÓN DE RELEASES

## 1. Objetivo

Define cómo validar, construir, firmar, probar, publicar, promover, desplegar y verificar artefactos de VoiceShop de forma reproducible y segura.

## 2. Alcance

Incluye control de código, pull requests, build, dependencias, pruebas, SAST, SCA, secret scanning, SBOM, firma, imágenes, migraciones, promoción, canary, rollback, provenance, approvals, evidencia y QA.

## 3. Fuente y ramas

Toda entrega se origina en un commit identificado. Las ramas protegidas requieren revisión, checks obligatorios, firmas cuando aplique y prohibición de force push no autorizado.

## 4. Pipeline stages

El pipeline incluye validate, lint, type-check, unit, component, contract, integration, security, build, package, SBOM, sign, publish, deploy non-production, E2E, approval, canary, production y verification.

## 5. Build reproducible

El build fija versiones, lockfiles, toolchains e imágenes base. El mismo commit y configuración de build deben producir artefactos equivalentes y verificables.

## 6. Dependencias

Las dependencias deben estar fijadas, escaneadas y sujetas a política de licencias. Actualizaciones críticas deben incluir pruebas y rollback.

## 7. Pruebas obligatorias

Se ejecutan pruebas unitarias, component, contract, integration, E2E, concurrencia, idempotencia, seguridad, privacidad, migraciones, rendimiento y caos según el tipo de cambio.

## 8. Seguridad del pipeline

Los runners son efímeros o controlados, los secretos tienen scope mínimo, los logs se redactan, las acciones se fijan por versión y los artefactos se firman.

## 9. SBOM y provenance

Cada artefacto debe incluir SBOM, hashes, commit, toolchain, dependencia, builder identity y evidencia de pruebas. La promoción verifica provenance.

## 10. Migraciones

Las migraciones se prueban antes del despliegue. Se utiliza expand-contract para cambios incompatibles. Las migraciones destructivas requieren backup, approval y ventana.

## 11. Promoción

El artefacto publicado se promueve entre entornos sin recompilar. La promoción registra quién, qué, cuándo, desde dónde, hacia dónde, reason y approval.

## 12. Canary

El canary usa cohort o porcentaje determinístico, métricas, umbrales, duración, abort conditions y rollback automático o manual autorizado.

## 13. Rollback

El rollback restaura un artefacto y configuración compatibles. No debe depender de revertir inmediatamente una migración destructiva.

## 14. Hotfix

Los hotfix siguen un flujo abreviado pero no omiten autenticación, revisión, pruebas críticas, firma, SBOM, aprobación y post-verificación.

## 15. Evidencia

Cada ejecución conserva Pipeline Run ID, commit, artefactos, checksums, SBOM, resultados, logs redactados, approvals, despliegues y verificaciones.

## 16. Reglas normativas

RULE-CICD-001

Toda operación debe ser reproducible, versionada y auditable.

RULE-CICD-002

Todo entorno debe estar aislado de los demás en datos, credenciales, redes y configuración.

RULE-CICD-003

Los artefactos deben construirse una sola vez y promoverse sin recompilación.

RULE-CICD-004

Toda promoción debe usar un artefacto inmutable identificado por versión y checksum.

RULE-CICD-005

Toda operación con efecto debe usar idempotencia cuando pueda repetirse.

RULE-CICD-006

Todo cambio sensible requiere reason y puede requerir aprobación independiente.

RULE-CICD-007

Toda modificación debe validar expected version o garantía equivalente.

RULE-CICD-008

Los secretos nunca deben almacenarse en repositorios, imágenes, logs, prompts ni frontend.

RULE-CICD-009

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-CICD-010

Toda migración debe poseer estrategia de compatibilidad y recuperación.

RULE-CICD-011

Todo despliegue debe verificar health, readiness y postcondiciones.

RULE-CICD-012

Toda falla de seguridad crítica debe bloquear la promoción.

RULE-CICD-013

Toda dependencia debe poseer timeout, retry limitado y circuit breaker cuando aplique.

RULE-CICD-014

Toda configuración debe ser tipada, validada, versionada y reversible cuando sea seguro.

RULE-CICD-015

Toda acción privilegiada debe producir evidencia y Correlation ID.

RULE-CICD-016

Toda operación debe ser reproducible, versionada y auditable.

RULE-CICD-017

Todo entorno debe estar aislado de los demás en datos, credenciales, redes y configuración.

RULE-CICD-018

Los artefactos deben construirse una sola vez y promoverse sin recompilación.

RULE-CICD-019

Toda promoción debe usar un artefacto inmutable identificado por versión y checksum.

RULE-CICD-020

Toda operación con efecto debe usar idempotencia cuando pueda repetirse.

RULE-CICD-021

Todo cambio sensible requiere reason y puede requerir aprobación independiente.

RULE-CICD-022

Toda modificación debe validar expected version o garantía equivalente.

RULE-CICD-023

Los secretos nunca deben almacenarse en repositorios, imágenes, logs, prompts ni frontend.

RULE-CICD-024

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-CICD-025

Toda migración debe poseer estrategia de compatibilidad y recuperación.

RULE-CICD-026

Todo despliegue debe verificar health, readiness y postcondiciones.

RULE-CICD-027

Toda falla de seguridad crítica debe bloquear la promoción.

RULE-CICD-028

Toda dependencia debe poseer timeout, retry limitado y circuit breaker cuando aplique.

RULE-CICD-029

Toda configuración debe ser tipada, validada, versionada y reversible cuando sea seguro.

RULE-CICD-030

Toda acción privilegiada debe producir evidencia y Correlation ID.

RULE-CICD-031

Toda operación debe ser reproducible, versionada y auditable.

RULE-CICD-032

Todo entorno debe estar aislado de los demás en datos, credenciales, redes y configuración.

RULE-CICD-033

Los artefactos deben construirse una sola vez y promoverse sin recompilación.

RULE-CICD-034

Toda promoción debe usar un artefacto inmutable identificado por versión y checksum.

RULE-CICD-035

Toda operación con efecto debe usar idempotencia cuando pueda repetirse.

RULE-CICD-036

Todo cambio sensible requiere reason y puede requerir aprobación independiente.

RULE-CICD-037

Toda modificación debe validar expected version o garantía equivalente.

RULE-CICD-038

Los secretos nunca deben almacenarse en repositorios, imágenes, logs, prompts ni frontend.

RULE-CICD-039

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-CICD-040

Toda migración debe poseer estrategia de compatibilidad y recuperación.

RULE-CICD-041

Todo despliegue debe verificar health, readiness y postcondiciones.

RULE-CICD-042

Toda falla de seguridad crítica debe bloquear la promoción.

RULE-CICD-043

Toda dependencia debe poseer timeout, retry limitado y circuit breaker cuando aplique.

RULE-CICD-044

Toda configuración debe ser tipada, validada, versionada y reversible cuando sea seguro.

RULE-CICD-045

Toda acción privilegiada debe producir evidencia y Correlation ID.

RULE-CICD-046

Toda operación debe ser reproducible, versionada y auditable.

RULE-CICD-047

Todo entorno debe estar aislado de los demás en datos, credenciales, redes y configuración.

RULE-CICD-048

Los artefactos deben construirse una sola vez y promoverse sin recompilación.

RULE-CICD-049

Toda promoción debe usar un artefacto inmutable identificado por versión y checksum.

RULE-CICD-050

Toda operación con efecto debe usar idempotencia cuando pueda repetirse.

RULE-CICD-051

Todo cambio sensible requiere reason y puede requerir aprobación independiente.

RULE-CICD-052

Toda modificación debe validar expected version o garantía equivalente.

RULE-CICD-053

Los secretos nunca deben almacenarse en repositorios, imágenes, logs, prompts ni frontend.

RULE-CICD-054

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-CICD-055

Toda migración debe poseer estrategia de compatibilidad y recuperación.

RULE-CICD-056

Todo despliegue debe verificar health, readiness y postcondiciones.

RULE-CICD-057

Toda falla de seguridad crítica debe bloquear la promoción.

RULE-CICD-058

Toda dependencia debe poseer timeout, retry limitado y circuit breaker cuando aplique.

RULE-CICD-059

Toda configuración debe ser tipada, validada, versionada y reversible cuando sea seguro.

RULE-CICD-060

Toda acción privilegiada debe producir evidencia y Correlation ID.

## 17. Contrato JSON de referencia

```json
{
  "operation_request_id": "UUID",
  "environment": "STAGING",
  "tenant_scope": "UUID_OR_GLOBAL",
  "artifact_version": "1.0.0+BUILD",
  "configuration_version": 12,
  "expected_version": 11,
  "reason_code": "AUTHORIZED_OPERATION",
  "approval_reference": "UUID_OR_NULL",
  "idempotency_key": "STRING",
  "correlation_id": "UUID",
  "requested_at": "UTC_TIMESTAMP"
}
```

## 18. Flujo funcional

1. Recibir la solicitud operativa.
2. Validar schema, límites, entorno y alcance.
3. Autenticar al actor o servicio.
4. Autorizar la operación.
5. Cargar el estado vigente.
6. Validar expected version.
7. Resolver artefactos y configuraciones por referencias inmutables.
8. Ejecutar dry run o preflight.
9. Evaluar riesgo, reason y aprobación.
10. Consultar el registro de idempotencia.
11. Adquirir controles de concurrencia.
12. Ejecutar la operación.
13. Verificar health y readiness.
14. Validar postcondiciones funcionales.
15. Persistir resultado, auditoría y outbox.
16. Emitir eventos.
17. Actualizar métricas y trazas.
18. Ejecutar rollback o conciliación cuando corresponda.
19. Cerrar la operación con evidencia verificable.

## 19. Pseudocódigo

```text
function execute_operational_change(command):

    validate_operational_schema(command)
    validate_environment_scope(command.environment)

    identity = authenticate_actor_or_service(
        command.actor_or_service_id
    )

    authorize_operational_permission(
        identity=identity,
        environment=command.environment,
        tenant_scope=command.tenant_scope,
        operation=command.operation
    )

    current = load_current_operational_state(command)
    validate_expected_version(
        current.version,
        command.expected_version
    )

    artifact = resolve_immutable_artifact(
        command.artifact_version
    )

    configuration = resolve_versioned_configuration(
        command.configuration_version
    )

    preflight = execute_side_effect_free_preflight(
        command,
        artifact,
        configuration,
        current
    )

    validate_preflight(preflight)
    validate_reason_and_evidence(command, preflight)

    if preflight.approval_required:
        validate_single_use_approval(
            command.approval_reference,
            hash_operational_payload(
                command,
                artifact,
                configuration,
                preflight
            )
        )

    previous = get_idempotent_result(
        command.idempotency_key
    )

    if previous.exists:
        return previous

    controls = acquire_operational_controls(command)

    try:
        result = execute_official_operational_change(
            command,
            artifact,
            configuration
        )

        health = verify_health_readiness_and_postconditions(
            result
        )

        if not health.acceptable:
            execute_safe_rollback_or_containment(
                command,
                result,
                health
            )

        persist_operational_result_audit_and_outbox(
            command,
            result,
            health
        )

        emit_operational_events(result, health)
        return build_safe_operational_result(result, health)

    except UnknownOutcomeError as error:
        mark_operation_unknown(command, error)
        schedule_operational_reconciliation(command)
        return build_unknown_result(command)

    finally:
        release_owned_operational_controls(controls)
```

## 20. Errores funcionales

CICD_REQUEST_INVALID

CICD_AUTHENTICATION_REQUIRED

CICD_AUTHORIZATION_DENIED

CICD_ENVIRONMENT_SCOPE_DENIED

CICD_TENANT_SCOPE_DENIED

CICD_ARTIFACT_NOT_FOUND

CICD_ARTIFACT_CHECKSUM_INVALID

CICD_CONFIGURATION_NOT_FOUND

CICD_CONFIGURATION_VERSION_CONFLICT

CICD_SECRET_REFERENCE_INVALID

CICD_SECRET_UNAVAILABLE

CICD_PREFLIGHT_FAILED

CICD_APPROVAL_REQUIRED

CICD_APPROVAL_INVALID

CICD_IDEMPOTENCY_CONFLICT

CICD_CONCURRENCY_CONFLICT

CICD_DEPENDENCY_UNAVAILABLE

CICD_TIMEOUT

CICD_HEALTH_CHECK_FAILED

CICD_READINESS_FAILED

CICD_POSTCONDITION_FAILED

CICD_RESULT_UNKNOWN

CICD_ROLLBACK_FAILED

CICD_AUDIT_PERSISTENCE_FAILED

CICD_SECURITY_POLICY_DENIED

## 21. Eventos

OperationalChangeRequested

OperationalPreflightStarted

OperationalPreflightCompleted

OperationalPreflightFailed

OperationalApprovalRequested

OperationalApprovalGranted

OperationalChangeStarted

OperationalHealthCheckExecuted

OperationalReadinessVerified

OperationalPostconditionsVerified

OperationalChangeCompleted

OperationalChangeFailed

OperationalChangeMarkedUnknown

OperationalRollbackStarted

OperationalRollbackCompleted

OperationalContainmentActivated

OperationalReconciliationRequested

OperationalReconciliationCompleted

OperationalAuditEvidenceRecorded

## 22. Observabilidad

- 13_07_03_ci_cd_pipeline_requests_total;
- 13_07_03_ci_cd_pipeline_success_total;
- 13_07_03_ci_cd_pipeline_failure_total;
- 13_07_03_ci_cd_pipeline_duration_seconds;
- 13_07_03_ci_cd_pipeline_preflight_failure_total;
- 13_07_03_ci_cd_pipeline_approval_required_total;
- 13_07_03_ci_cd_pipeline_version_conflict_total;
- 13_07_03_ci_cd_pipeline_idempotency_hit_total;
- 13_07_03_ci_cd_pipeline_health_failure_total;
- 13_07_03_ci_cd_pipeline_readiness_failure_total;
- 13_07_03_ci_cd_pipeline_postcondition_failure_total;
- 13_07_03_ci_cd_pipeline_unknown_total;
- 13_07_03_ci_cd_pipeline_rollback_total;
- 13_07_03_ci_cd_pipeline_rollback_failure_total;
- 13_07_03_ci_cd_pipeline_reconciliation_total;
- 13_07_03_ci_cd_pipeline_security_denied_total;
- 13_07_03_ci_cd_pipeline_audit_failure_total;
- 13_07_03_ci_cd_pipeline_active_operations;

Dimensiones permitidas:

- environment;
- operation;
- artifact_class;
- result;
- error_code;
- risk;
- tenant_tier.

No usar IDs únicos, secretos, tokens, nombres, correos, URLs completas o payloads como etiquetas.

## 23. Seguridad

- Mínimo privilegio y separación de funciones.
- MFA o step-up para producción y operaciones críticas.
- Secretos gestionados únicamente por referencias.
- Firmas y checksums para artefactos.
- Escaneo de dependencias, imágenes y SBOM.
- Protección contra replay, CSRF, SSRF e inyección.
- Segmentación de red y egress control.
- Aprobaciones single-use vinculadas al payload.
- Break-glass con expiración, alerta y revisión.
- Logs, métricas y trazas redactados.
- Aislamiento estricto entre entornos y tenants.
- Auditoría de cambios, lecturas sensibles y exportaciones.

## 24. Casos límite y pruebas adversariales

TEST-CICD-001: verificar dos despliegues intentan modificar el mismo entorno; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-002: verificar la aprobación expira antes de la promoción; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-003: verificar el actor pierde el permiso durante la ejecución; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-004: verificar un artefacto tiene checksum diferente; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-005: verificar una configuración cambia después del preflight; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-006: verificar un secreto expira durante el despliegue; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-007: verificar la dependencia responde después del timeout; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-008: verificar el resultado de una promoción queda UNKNOWN; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-009: verificar la verificación de health da falso positivo; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-010: verificar la readiness falla después de enrutar tráfico; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-011: verificar una migración es incompatible con la versión anterior; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-012: verificar el rollback falla; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-013: verificar la auditoría queda degradada; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-014: verificar el evento de despliegue se duplica; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-015: verificar un tenant apunta a configuración de otro tenant; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-016: verificar un entorno utiliza credenciales de producción por error; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-017: verificar el sistema se recupera y genera avalancha; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-018: verificar una caché devuelve configuración obsoleta; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-019: verificar un actor intenta autoaprobarse; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-020: verificar un artefacto no posee SBOM; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-021: verificar un pipeline usa una dependencia comprometida; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-022: verificar se intenta un cambio destructivo sin backup; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-023: verificar un canary supera el umbral de errores; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-024: verificar una operación de emergencia no expira; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CICD-025: verificar una cola mantiene mensajes de una versión incompatible; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

## 25. Criterios de aceptación

AC-CICD-001

Toda operación está autenticada y autorizada.

AC-CICD-002

Todo entorno está aislado.

AC-CICD-003

Todo artefacto es inmutable y verificable.

AC-CICD-004

Toda configuración está versionada.

AC-CICD-005

Toda modificación valida expected version.

AC-CICD-006

Toda modificación con efecto usa idempotencia.

AC-CICD-007

Toda operación sensible exige reason.

AC-CICD-008

Toda operación crítica soporta approval.

AC-CICD-009

Toda aprobación se vincula al payload.

AC-CICD-010

Todo resultado UNKNOWN se concilia.

AC-CICD-011

Todo despliegue verifica health y readiness.

AC-CICD-012

Todo cambio valida postcondiciones.

AC-CICD-013

Todo rollback es explícito.

AC-CICD-014

Los secretos no se exponen.

AC-CICD-015

Toda operación es auditable.

AC-CICD-016

Toda operación está autenticada y autorizada.

AC-CICD-017

Todo entorno está aislado.

AC-CICD-018

Todo artefacto es inmutable y verificable.

AC-CICD-019

Toda configuración está versionada.

AC-CICD-020

Toda modificación valida expected version.

AC-CICD-021

Toda modificación con efecto usa idempotencia.

AC-CICD-022

Toda operación sensible exige reason.

AC-CICD-023

Toda operación crítica soporta approval.

AC-CICD-024

Toda aprobación se vincula al payload.

AC-CICD-025

Todo resultado UNKNOWN se concilia.

AC-CICD-026

Todo despliegue verifica health y readiness.

AC-CICD-027

Todo cambio valida postcondiciones.

AC-CICD-028

Todo rollback es explícito.

AC-CICD-029

Los secretos no se exponen.

AC-CICD-030

Toda operación es auditable.

AC-CICD-031

Toda operación está autenticada y autorizada.

AC-CICD-032

Todo entorno está aislado.

AC-CICD-033

Todo artefacto es inmutable y verificable.

AC-CICD-034

Toda configuración está versionada.

AC-CICD-035

Toda modificación valida expected version.

AC-CICD-036

Toda modificación con efecto usa idempotencia.

AC-CICD-037

Toda operación sensible exige reason.

AC-CICD-038

Toda operación crítica soporta approval.

AC-CICD-039

Toda aprobación se vincula al payload.

AC-CICD-040

Todo resultado UNKNOWN se concilia.

AC-CICD-041

Todo despliegue verifica health y readiness.

AC-CICD-042

Todo cambio valida postcondiciones.

AC-CICD-043

Todo rollback es explícito.

AC-CICD-044

Los secretos no se exponen.

AC-CICD-045

Toda operación es auditable.

AC-CICD-046

Toda operación está autenticada y autorizada.

AC-CICD-047

Todo entorno está aislado.

AC-CICD-048

Todo artefacto es inmutable y verificable.

AC-CICD-049

Toda configuración está versionada.

AC-CICD-050

Toda modificación valida expected version.

AC-CICD-051

Toda modificación con efecto usa idempotencia.

AC-CICD-052

Toda operación sensible exige reason.

AC-CICD-053

Toda operación crítica soporta approval.

AC-CICD-054

Toda aprobación se vincula al payload.

AC-CICD-055

Todo resultado UNKNOWN se concilia.

AC-CICD-056

Todo despliegue verifica health y readiness.

AC-CICD-057

Todo cambio valida postcondiciones.

AC-CICD-058

Todo rollback es explícito.

AC-CICD-059

Los secretos no se exponen.

AC-CICD-060

Toda operación es auditable.

## 26. Checklist final

[ ] Existe identificador estable.
[ ] Existe environment scope.
[ ] Existe tenant scope.
[ ] Existe autenticación.
[ ] Existe autorización.
[ ] Existe assurance policy.
[ ] Existe artifact version.
[ ] Existe checksum.
[ ] Existe SBOM.
[ ] Existe configuration version.
[ ] Existe Secret Reference.
[ ] Existe expected version.
[ ] Existe Idempotency Key.
[ ] Existe preflight.
[ ] Existe approval policy.
[ ] Existe concurrency control.
[ ] Existe timeout.
[ ] Existe retry policy.
[ ] Existe health check.
[ ] Existe readiness check.
[ ] Existe postcondition verification.
[ ] Existe UNKNOWN policy.
[ ] Existe rollback.
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
