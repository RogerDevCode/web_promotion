======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-07-04-CONFIGURATION-SECRETS-OPERATIONS.md

# OPERACIÓN DE CONFIGURACIÓN Y SECRETOS

## 1. Objetivo

Define cómo administrar configuraciones y secretos en runtime mediante referencias versionadas, validación, distribución, rotación, revocación, recuperación y auditoría.

## 2. Alcance

Incluye configuración de runtime, schemas, namespaces, precedencia, validación, distribución, caché, refresh, rollback, referencias de secretos, rotación, revocación, break-glass, auditoría, observabilidad y QA.

## 3. Configuration Model

Cada elemento de configuración posee key, tipo, schema, scope, environment, tenant, versión, owner, estado, effective_from, expires_at y default seguro.

## 4. Precedencia

La resolución recomendada es security override, environment, tenant, cohort y default. La precedencia debe ser estable, documentada y evaluada en backend.

## 5. Schemas

Toda configuración debe validar tipos, rangos, enums, formatos, dependencias, cross-field rules, región, entorno y tenant. Los campos desconocidos se rechazan cuando la policy lo exige.

## 6. Distribución

Los servicios reciben configuraciones por referencias versionadas, polling controlado, push seguro o caché local. Debe existir invalidación y last known good.

## 7. Refresh

Los cambios de bajo riesgo pueden recargarse dinámicamente. Los cambios estructurales pueden requerir restart o despliegue coordinado. El comportamiento debe declararse por key.

## 8. Secret Model

Los contratos utilizan Secret Reference IDs. El valor sólo se resuelve en runtime por una identidad autorizada y nunca se almacena en configuración, repositorio o logs.

## 9. Secret states

PENDING, ACTIVE, ROTATING, REVOKED, EXPIRED, COMPROMISED y DESTROYED. Una referencia no ACTIVE no puede usarse para nuevas operaciones.

## 10. Rotación

La rotación incluye nueva versión, validación, ventana dual, activación, observación, revocación anterior, verificación y rollback seguro.

## 11. Revocación

La revocación debe propagarse dentro del SLA, invalidar caches, cerrar sesiones si aplica, abrir incidentes cuando exista compromiso y bloquear nuevas operaciones.

## 12. Bootstrap

El servicio debe recibir sólo la identidad mínima necesaria para resolver sus secretos. No se utilizan secretos maestros compartidos.

## 13. Break-glass

El acceso de emergencia a secretos requiere AAL alto, reason, scope mínimo, expiración, alerta, revisión y audit-of-audit.

## 14. Fallos

Si el sistema de configuración o secretos falla, cada componente debe aplicar FAIL_CLOSED, USE_LAST_KNOWN_GOOD o degradación explícita según el riesgo.

## 15. Auditoría

Se auditan creación, lectura sensible, resolución, rotación, revocación, cambio de binding, exportación prohibida, fallos y accesos de emergencia.

## 16. Reglas normativas

RULE-CSO-001

Toda operación debe ser reproducible, versionada y auditable.

RULE-CSO-002

Todo entorno debe estar aislado de los demás en datos, credenciales, redes y configuración.

RULE-CSO-003

Los artefactos deben construirse una sola vez y promoverse sin recompilación.

RULE-CSO-004

Toda promoción debe usar un artefacto inmutable identificado por versión y checksum.

RULE-CSO-005

Toda operación con efecto debe usar idempotencia cuando pueda repetirse.

RULE-CSO-006

Todo cambio sensible requiere reason y puede requerir aprobación independiente.

RULE-CSO-007

Toda modificación debe validar expected version o garantía equivalente.

RULE-CSO-008

Los secretos nunca deben almacenarse en repositorios, imágenes, logs, prompts ni frontend.

RULE-CSO-009

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-CSO-010

Toda migración debe poseer estrategia de compatibilidad y recuperación.

RULE-CSO-011

Todo despliegue debe verificar health, readiness y postcondiciones.

RULE-CSO-012

Toda falla de seguridad crítica debe bloquear la promoción.

RULE-CSO-013

Toda dependencia debe poseer timeout, retry limitado y circuit breaker cuando aplique.

RULE-CSO-014

Toda configuración debe ser tipada, validada, versionada y reversible cuando sea seguro.

RULE-CSO-015

Toda acción privilegiada debe producir evidencia y Correlation ID.

RULE-CSO-016

Toda operación debe ser reproducible, versionada y auditable.

RULE-CSO-017

Todo entorno debe estar aislado de los demás en datos, credenciales, redes y configuración.

RULE-CSO-018

Los artefactos deben construirse una sola vez y promoverse sin recompilación.

RULE-CSO-019

Toda promoción debe usar un artefacto inmutable identificado por versión y checksum.

RULE-CSO-020

Toda operación con efecto debe usar idempotencia cuando pueda repetirse.

RULE-CSO-021

Todo cambio sensible requiere reason y puede requerir aprobación independiente.

RULE-CSO-022

Toda modificación debe validar expected version o garantía equivalente.

RULE-CSO-023

Los secretos nunca deben almacenarse en repositorios, imágenes, logs, prompts ni frontend.

RULE-CSO-024

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-CSO-025

Toda migración debe poseer estrategia de compatibilidad y recuperación.

RULE-CSO-026

Todo despliegue debe verificar health, readiness y postcondiciones.

RULE-CSO-027

Toda falla de seguridad crítica debe bloquear la promoción.

RULE-CSO-028

Toda dependencia debe poseer timeout, retry limitado y circuit breaker cuando aplique.

RULE-CSO-029

Toda configuración debe ser tipada, validada, versionada y reversible cuando sea seguro.

RULE-CSO-030

Toda acción privilegiada debe producir evidencia y Correlation ID.

RULE-CSO-031

Toda operación debe ser reproducible, versionada y auditable.

RULE-CSO-032

Todo entorno debe estar aislado de los demás en datos, credenciales, redes y configuración.

RULE-CSO-033

Los artefactos deben construirse una sola vez y promoverse sin recompilación.

RULE-CSO-034

Toda promoción debe usar un artefacto inmutable identificado por versión y checksum.

RULE-CSO-035

Toda operación con efecto debe usar idempotencia cuando pueda repetirse.

RULE-CSO-036

Todo cambio sensible requiere reason y puede requerir aprobación independiente.

RULE-CSO-037

Toda modificación debe validar expected version o garantía equivalente.

RULE-CSO-038

Los secretos nunca deben almacenarse en repositorios, imágenes, logs, prompts ni frontend.

RULE-CSO-039

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-CSO-040

Toda migración debe poseer estrategia de compatibilidad y recuperación.

RULE-CSO-041

Todo despliegue debe verificar health, readiness y postcondiciones.

RULE-CSO-042

Toda falla de seguridad crítica debe bloquear la promoción.

RULE-CSO-043

Toda dependencia debe poseer timeout, retry limitado y circuit breaker cuando aplique.

RULE-CSO-044

Toda configuración debe ser tipada, validada, versionada y reversible cuando sea seguro.

RULE-CSO-045

Toda acción privilegiada debe producir evidencia y Correlation ID.

RULE-CSO-046

Toda operación debe ser reproducible, versionada y auditable.

RULE-CSO-047

Todo entorno debe estar aislado de los demás en datos, credenciales, redes y configuración.

RULE-CSO-048

Los artefactos deben construirse una sola vez y promoverse sin recompilación.

RULE-CSO-049

Toda promoción debe usar un artefacto inmutable identificado por versión y checksum.

RULE-CSO-050

Toda operación con efecto debe usar idempotencia cuando pueda repetirse.

RULE-CSO-051

Todo cambio sensible requiere reason y puede requerir aprobación independiente.

RULE-CSO-052

Toda modificación debe validar expected version o garantía equivalente.

RULE-CSO-053

Los secretos nunca deben almacenarse en repositorios, imágenes, logs, prompts ni frontend.

RULE-CSO-054

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-CSO-055

Toda migración debe poseer estrategia de compatibilidad y recuperación.

RULE-CSO-056

Todo despliegue debe verificar health, readiness y postcondiciones.

RULE-CSO-057

Toda falla de seguridad crítica debe bloquear la promoción.

RULE-CSO-058

Toda dependencia debe poseer timeout, retry limitado y circuit breaker cuando aplique.

RULE-CSO-059

Toda configuración debe ser tipada, validada, versionada y reversible cuando sea seguro.

RULE-CSO-060

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

CSO_REQUEST_INVALID

CSO_AUTHENTICATION_REQUIRED

CSO_AUTHORIZATION_DENIED

CSO_ENVIRONMENT_SCOPE_DENIED

CSO_TENANT_SCOPE_DENIED

CSO_ARTIFACT_NOT_FOUND

CSO_ARTIFACT_CHECKSUM_INVALID

CSO_CONFIGURATION_NOT_FOUND

CSO_CONFIGURATION_VERSION_CONFLICT

CSO_SECRET_REFERENCE_INVALID

CSO_SECRET_UNAVAILABLE

CSO_PREFLIGHT_FAILED

CSO_APPROVAL_REQUIRED

CSO_APPROVAL_INVALID

CSO_IDEMPOTENCY_CONFLICT

CSO_CONCURRENCY_CONFLICT

CSO_DEPENDENCY_UNAVAILABLE

CSO_TIMEOUT

CSO_HEALTH_CHECK_FAILED

CSO_READINESS_FAILED

CSO_POSTCONDITION_FAILED

CSO_RESULT_UNKNOWN

CSO_ROLLBACK_FAILED

CSO_AUDIT_PERSISTENCE_FAILED

CSO_SECURITY_POLICY_DENIED

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

- 13_07_04_configuration_secrets_operations_requests_total;
- 13_07_04_configuration_secrets_operations_success_total;
- 13_07_04_configuration_secrets_operations_failure_total;
- 13_07_04_configuration_secrets_operations_duration_seconds;
- 13_07_04_configuration_secrets_operations_preflight_failure_total;
- 13_07_04_configuration_secrets_operations_approval_required_total;
- 13_07_04_configuration_secrets_operations_version_conflict_total;
- 13_07_04_configuration_secrets_operations_idempotency_hit_total;
- 13_07_04_configuration_secrets_operations_health_failure_total;
- 13_07_04_configuration_secrets_operations_readiness_failure_total;
- 13_07_04_configuration_secrets_operations_postcondition_failure_total;
- 13_07_04_configuration_secrets_operations_unknown_total;
- 13_07_04_configuration_secrets_operations_rollback_total;
- 13_07_04_configuration_secrets_operations_rollback_failure_total;
- 13_07_04_configuration_secrets_operations_reconciliation_total;
- 13_07_04_configuration_secrets_operations_security_denied_total;
- 13_07_04_configuration_secrets_operations_audit_failure_total;
- 13_07_04_configuration_secrets_operations_active_operations;

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

TEST-CSO-001: verificar dos despliegues intentan modificar el mismo entorno; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-002: verificar la aprobación expira antes de la promoción; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-003: verificar el actor pierde el permiso durante la ejecución; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-004: verificar un artefacto tiene checksum diferente; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-005: verificar una configuración cambia después del preflight; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-006: verificar un secreto expira durante el despliegue; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-007: verificar la dependencia responde después del timeout; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-008: verificar el resultado de una promoción queda UNKNOWN; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-009: verificar la verificación de health da falso positivo; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-010: verificar la readiness falla después de enrutar tráfico; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-011: verificar una migración es incompatible con la versión anterior; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-012: verificar el rollback falla; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-013: verificar la auditoría queda degradada; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-014: verificar el evento de despliegue se duplica; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-015: verificar un tenant apunta a configuración de otro tenant; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-016: verificar un entorno utiliza credenciales de producción por error; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-017: verificar el sistema se recupera y genera avalancha; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-018: verificar una caché devuelve configuración obsoleta; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-019: verificar un actor intenta autoaprobarse; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-020: verificar un artefacto no posee SBOM; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-021: verificar un pipeline usa una dependencia comprometida; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-022: verificar se intenta un cambio destructivo sin backup; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-023: verificar un canary supera el umbral de errores; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-024: verificar una operación de emergencia no expira; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-CSO-025: verificar una cola mantiene mensajes de una versión incompatible; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

## 25. Criterios de aceptación

AC-CSO-001

Toda operación está autenticada y autorizada.

AC-CSO-002

Todo entorno está aislado.

AC-CSO-003

Todo artefacto es inmutable y verificable.

AC-CSO-004

Toda configuración está versionada.

AC-CSO-005

Toda modificación valida expected version.

AC-CSO-006

Toda modificación con efecto usa idempotencia.

AC-CSO-007

Toda operación sensible exige reason.

AC-CSO-008

Toda operación crítica soporta approval.

AC-CSO-009

Toda aprobación se vincula al payload.

AC-CSO-010

Todo resultado UNKNOWN se concilia.

AC-CSO-011

Todo despliegue verifica health y readiness.

AC-CSO-012

Todo cambio valida postcondiciones.

AC-CSO-013

Todo rollback es explícito.

AC-CSO-014

Los secretos no se exponen.

AC-CSO-015

Toda operación es auditable.

AC-CSO-016

Toda operación está autenticada y autorizada.

AC-CSO-017

Todo entorno está aislado.

AC-CSO-018

Todo artefacto es inmutable y verificable.

AC-CSO-019

Toda configuración está versionada.

AC-CSO-020

Toda modificación valida expected version.

AC-CSO-021

Toda modificación con efecto usa idempotencia.

AC-CSO-022

Toda operación sensible exige reason.

AC-CSO-023

Toda operación crítica soporta approval.

AC-CSO-024

Toda aprobación se vincula al payload.

AC-CSO-025

Todo resultado UNKNOWN se concilia.

AC-CSO-026

Todo despliegue verifica health y readiness.

AC-CSO-027

Todo cambio valida postcondiciones.

AC-CSO-028

Todo rollback es explícito.

AC-CSO-029

Los secretos no se exponen.

AC-CSO-030

Toda operación es auditable.

AC-CSO-031

Toda operación está autenticada y autorizada.

AC-CSO-032

Todo entorno está aislado.

AC-CSO-033

Todo artefacto es inmutable y verificable.

AC-CSO-034

Toda configuración está versionada.

AC-CSO-035

Toda modificación valida expected version.

AC-CSO-036

Toda modificación con efecto usa idempotencia.

AC-CSO-037

Toda operación sensible exige reason.

AC-CSO-038

Toda operación crítica soporta approval.

AC-CSO-039

Toda aprobación se vincula al payload.

AC-CSO-040

Todo resultado UNKNOWN se concilia.

AC-CSO-041

Todo despliegue verifica health y readiness.

AC-CSO-042

Todo cambio valida postcondiciones.

AC-CSO-043

Todo rollback es explícito.

AC-CSO-044

Los secretos no se exponen.

AC-CSO-045

Toda operación es auditable.

AC-CSO-046

Toda operación está autenticada y autorizada.

AC-CSO-047

Todo entorno está aislado.

AC-CSO-048

Todo artefacto es inmutable y verificable.

AC-CSO-049

Toda configuración está versionada.

AC-CSO-050

Toda modificación valida expected version.

AC-CSO-051

Toda modificación con efecto usa idempotencia.

AC-CSO-052

Toda operación sensible exige reason.

AC-CSO-053

Toda operación crítica soporta approval.

AC-CSO-054

Toda aprobación se vincula al payload.

AC-CSO-055

Todo resultado UNKNOWN se concilia.

AC-CSO-056

Todo despliegue verifica health y readiness.

AC-CSO-057

Todo cambio valida postcondiciones.

AC-CSO-058

Todo rollback es explícito.

AC-CSO-059

Los secretos no se exponen.

AC-CSO-060

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
