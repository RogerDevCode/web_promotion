======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-07-02-ENVIRONMENT-STRATEGY.md

# ESTRATEGIA DE ENTORNOS

## 1. Objetivo

Define el aislamiento, propósito, datos, accesos, promoción y criterios operativos de los entornos LOCAL, CI, TEST, STAGING, CANARY y PRODUCTION.

## 2. Alcance

Incluye LOCAL, CI, TEST, STAGING, CANARY y PRODUCTION; aislamiento de datos, credenciales, redes, dominios, proveedores, feature flags, cuotas, observabilidad, acceso, promoción, destrucción de entornos efímeros y QA.

## 3. Clasificación de entornos

LOCAL se usa para desarrollo; CI para pruebas automatizadas; TEST para integración controlada; STAGING para validación preproductiva; CANARY para exposición limitada; PRODUCTION para usuarios reales. Ningún entorno inferior debe compartir secretos ni datos reales con producción.

## 4. Aislamiento

Cada entorno debe tener bases de datos, Redis, storage, colas, dominios, certificados, secretos, proveedores, rate limits, dashboards, alertas y políticas independientes. Las conexiones entre entornos están denegadas por defecto.

## 5. Datos

Los entornos no productivos utilizan datos sintéticos o anonimizados. Las copias de producción requieren autorización, minimización, cifrado, retención limitada, registro y eliminación verificada.

## 6. Credenciales

Las credenciales son específicas por entorno y tenant. Está prohibido reutilizar secretos de producción en CI, local o staging. Los secretos efímeros deben expirar automáticamente.

## 7. Dominios y callbacks

Cada entorno usa dominios, redirect URIs, webhook endpoints, origins, cookies y certificados propios. Un callback de staging nunca debe aceptar eventos destinados a producción.

## 8. Proveedores externos

Los sandboxes se usan en entornos inferiores cuando existan. Si un proveedor carece de sandbox, deben usarse stubs, cuentas aisladas y operaciones no comerciales.

## 9. Configuración

La configuración se define por capas: defaults, environment, tenant y overrides autorizados. Toda resolución debe ser determinística, validada y auditable.

## 10. Feature flags

Las flags se evalúan dentro del entorno. Un flag activo en staging no implica activación en producción. Los kill switches de producción requieren controles reforzados.

## 11. Acceso

El acceso a producción exige MFA, mínimo privilegio, sesiones cortas, reason, aprobación cuando corresponda y auditoría. El acceso local o CI no otorga acceso productivo.

## 12. Entornos efímeros

Los entornos por rama o pull request deben tener TTL, nombres únicos, datos sintéticos, límites de coste, secretos temporales y destrucción automática verificable.

## 13. Promoción

La promoción entre entornos usa el mismo artefacto, checksum y SBOM. Sólo cambian las referencias de configuración y secretos autorizados.

## 14. Paridad

STAGING debe aproximarse a producción en arquitectura, schemas, políticas y observabilidad, sin copiar datos sensibles ni credenciales.

## 15. Criterios de salida

Cada entorno posee criterios de entrada y salida. La promoción requiere pruebas, health, migraciones, seguridad, performance y aprobación según riesgo.

## 16. Reglas normativas

RULE-ENV-001

Toda operación debe ser reproducible, versionada y auditable.

RULE-ENV-002

Todo entorno debe estar aislado de los demás en datos, credenciales, redes y configuración.

RULE-ENV-003

Los artefactos deben construirse una sola vez y promoverse sin recompilación.

RULE-ENV-004

Toda promoción debe usar un artefacto inmutable identificado por versión y checksum.

RULE-ENV-005

Toda operación con efecto debe usar idempotencia cuando pueda repetirse.

RULE-ENV-006

Todo cambio sensible requiere reason y puede requerir aprobación independiente.

RULE-ENV-007

Toda modificación debe validar expected version o garantía equivalente.

RULE-ENV-008

Los secretos nunca deben almacenarse en repositorios, imágenes, logs, prompts ni frontend.

RULE-ENV-009

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-ENV-010

Toda migración debe poseer estrategia de compatibilidad y recuperación.

RULE-ENV-011

Todo despliegue debe verificar health, readiness y postcondiciones.

RULE-ENV-012

Toda falla de seguridad crítica debe bloquear la promoción.

RULE-ENV-013

Toda dependencia debe poseer timeout, retry limitado y circuit breaker cuando aplique.

RULE-ENV-014

Toda configuración debe ser tipada, validada, versionada y reversible cuando sea seguro.

RULE-ENV-015

Toda acción privilegiada debe producir evidencia y Correlation ID.

RULE-ENV-016

Toda operación debe ser reproducible, versionada y auditable.

RULE-ENV-017

Todo entorno debe estar aislado de los demás en datos, credenciales, redes y configuración.

RULE-ENV-018

Los artefactos deben construirse una sola vez y promoverse sin recompilación.

RULE-ENV-019

Toda promoción debe usar un artefacto inmutable identificado por versión y checksum.

RULE-ENV-020

Toda operación con efecto debe usar idempotencia cuando pueda repetirse.

RULE-ENV-021

Todo cambio sensible requiere reason y puede requerir aprobación independiente.

RULE-ENV-022

Toda modificación debe validar expected version o garantía equivalente.

RULE-ENV-023

Los secretos nunca deben almacenarse en repositorios, imágenes, logs, prompts ni frontend.

RULE-ENV-024

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-ENV-025

Toda migración debe poseer estrategia de compatibilidad y recuperación.

RULE-ENV-026

Todo despliegue debe verificar health, readiness y postcondiciones.

RULE-ENV-027

Toda falla de seguridad crítica debe bloquear la promoción.

RULE-ENV-028

Toda dependencia debe poseer timeout, retry limitado y circuit breaker cuando aplique.

RULE-ENV-029

Toda configuración debe ser tipada, validada, versionada y reversible cuando sea seguro.

RULE-ENV-030

Toda acción privilegiada debe producir evidencia y Correlation ID.

RULE-ENV-031

Toda operación debe ser reproducible, versionada y auditable.

RULE-ENV-032

Todo entorno debe estar aislado de los demás en datos, credenciales, redes y configuración.

RULE-ENV-033

Los artefactos deben construirse una sola vez y promoverse sin recompilación.

RULE-ENV-034

Toda promoción debe usar un artefacto inmutable identificado por versión y checksum.

RULE-ENV-035

Toda operación con efecto debe usar idempotencia cuando pueda repetirse.

RULE-ENV-036

Todo cambio sensible requiere reason y puede requerir aprobación independiente.

RULE-ENV-037

Toda modificación debe validar expected version o garantía equivalente.

RULE-ENV-038

Los secretos nunca deben almacenarse en repositorios, imágenes, logs, prompts ni frontend.

RULE-ENV-039

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-ENV-040

Toda migración debe poseer estrategia de compatibilidad y recuperación.

RULE-ENV-041

Todo despliegue debe verificar health, readiness y postcondiciones.

RULE-ENV-042

Toda falla de seguridad crítica debe bloquear la promoción.

RULE-ENV-043

Toda dependencia debe poseer timeout, retry limitado y circuit breaker cuando aplique.

RULE-ENV-044

Toda configuración debe ser tipada, validada, versionada y reversible cuando sea seguro.

RULE-ENV-045

Toda acción privilegiada debe producir evidencia y Correlation ID.

RULE-ENV-046

Toda operación debe ser reproducible, versionada y auditable.

RULE-ENV-047

Todo entorno debe estar aislado de los demás en datos, credenciales, redes y configuración.

RULE-ENV-048

Los artefactos deben construirse una sola vez y promoverse sin recompilación.

RULE-ENV-049

Toda promoción debe usar un artefacto inmutable identificado por versión y checksum.

RULE-ENV-050

Toda operación con efecto debe usar idempotencia cuando pueda repetirse.

RULE-ENV-051

Todo cambio sensible requiere reason y puede requerir aprobación independiente.

RULE-ENV-052

Toda modificación debe validar expected version o garantía equivalente.

RULE-ENV-053

Los secretos nunca deben almacenarse en repositorios, imágenes, logs, prompts ni frontend.

RULE-ENV-054

Todo resultado UNKNOWN debe iniciar conciliación y bloquear repeticiones ciegas.

RULE-ENV-055

Toda migración debe poseer estrategia de compatibilidad y recuperación.

RULE-ENV-056

Todo despliegue debe verificar health, readiness y postcondiciones.

RULE-ENV-057

Toda falla de seguridad crítica debe bloquear la promoción.

RULE-ENV-058

Toda dependencia debe poseer timeout, retry limitado y circuit breaker cuando aplique.

RULE-ENV-059

Toda configuración debe ser tipada, validada, versionada y reversible cuando sea seguro.

RULE-ENV-060

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

ENV_REQUEST_INVALID

ENV_AUTHENTICATION_REQUIRED

ENV_AUTHORIZATION_DENIED

ENV_ENVIRONMENT_SCOPE_DENIED

ENV_TENANT_SCOPE_DENIED

ENV_ARTIFACT_NOT_FOUND

ENV_ARTIFACT_CHECKSUM_INVALID

ENV_CONFIGURATION_NOT_FOUND

ENV_CONFIGURATION_VERSION_CONFLICT

ENV_SECRET_REFERENCE_INVALID

ENV_SECRET_UNAVAILABLE

ENV_PREFLIGHT_FAILED

ENV_APPROVAL_REQUIRED

ENV_APPROVAL_INVALID

ENV_IDEMPOTENCY_CONFLICT

ENV_CONCURRENCY_CONFLICT

ENV_DEPENDENCY_UNAVAILABLE

ENV_TIMEOUT

ENV_HEALTH_CHECK_FAILED

ENV_READINESS_FAILED

ENV_POSTCONDITION_FAILED

ENV_RESULT_UNKNOWN

ENV_ROLLBACK_FAILED

ENV_AUDIT_PERSISTENCE_FAILED

ENV_SECURITY_POLICY_DENIED

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

- 13_07_02_environment_strategy_requests_total;
- 13_07_02_environment_strategy_success_total;
- 13_07_02_environment_strategy_failure_total;
- 13_07_02_environment_strategy_duration_seconds;
- 13_07_02_environment_strategy_preflight_failure_total;
- 13_07_02_environment_strategy_approval_required_total;
- 13_07_02_environment_strategy_version_conflict_total;
- 13_07_02_environment_strategy_idempotency_hit_total;
- 13_07_02_environment_strategy_health_failure_total;
- 13_07_02_environment_strategy_readiness_failure_total;
- 13_07_02_environment_strategy_postcondition_failure_total;
- 13_07_02_environment_strategy_unknown_total;
- 13_07_02_environment_strategy_rollback_total;
- 13_07_02_environment_strategy_rollback_failure_total;
- 13_07_02_environment_strategy_reconciliation_total;
- 13_07_02_environment_strategy_security_denied_total;
- 13_07_02_environment_strategy_audit_failure_total;
- 13_07_02_environment_strategy_active_operations;

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

TEST-ENV-001: verificar dos despliegues intentan modificar el mismo entorno; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-002: verificar la aprobación expira antes de la promoción; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-003: verificar el actor pierde el permiso durante la ejecución; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-004: verificar un artefacto tiene checksum diferente; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-005: verificar una configuración cambia después del preflight; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-006: verificar un secreto expira durante el despliegue; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-007: verificar la dependencia responde después del timeout; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-008: verificar el resultado de una promoción queda UNKNOWN; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-009: verificar la verificación de health da falso positivo; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-010: verificar la readiness falla después de enrutar tráfico; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-011: verificar una migración es incompatible con la versión anterior; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-012: verificar el rollback falla; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-013: verificar la auditoría queda degradada; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-014: verificar el evento de despliegue se duplica; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-015: verificar un tenant apunta a configuración de otro tenant; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-016: verificar un entorno utiliza credenciales de producción por error; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-017: verificar el sistema se recupera y genera avalancha; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-018: verificar una caché devuelve configuración obsoleta; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-019: verificar un actor intenta autoaprobarse; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-020: verificar un artefacto no posee SBOM; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-021: verificar un pipeline usa una dependencia comprometida; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-022: verificar se intenta un cambio destructivo sin backup; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-023: verificar un canary supera el umbral de errores; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-024: verificar una operación de emergencia no expira; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

TEST-ENV-025: verificar una cola mantiene mensajes de una versión incompatible; el sistema debe preservar seguridad, aislamiento, idempotencia, versiones y evidencia.

## 25. Criterios de aceptación

AC-ENV-001

Toda operación está autenticada y autorizada.

AC-ENV-002

Todo entorno está aislado.

AC-ENV-003

Todo artefacto es inmutable y verificable.

AC-ENV-004

Toda configuración está versionada.

AC-ENV-005

Toda modificación valida expected version.

AC-ENV-006

Toda modificación con efecto usa idempotencia.

AC-ENV-007

Toda operación sensible exige reason.

AC-ENV-008

Toda operación crítica soporta approval.

AC-ENV-009

Toda aprobación se vincula al payload.

AC-ENV-010

Todo resultado UNKNOWN se concilia.

AC-ENV-011

Todo despliegue verifica health y readiness.

AC-ENV-012

Todo cambio valida postcondiciones.

AC-ENV-013

Todo rollback es explícito.

AC-ENV-014

Los secretos no se exponen.

AC-ENV-015

Toda operación es auditable.

AC-ENV-016

Toda operación está autenticada y autorizada.

AC-ENV-017

Todo entorno está aislado.

AC-ENV-018

Todo artefacto es inmutable y verificable.

AC-ENV-019

Toda configuración está versionada.

AC-ENV-020

Toda modificación valida expected version.

AC-ENV-021

Toda modificación con efecto usa idempotencia.

AC-ENV-022

Toda operación sensible exige reason.

AC-ENV-023

Toda operación crítica soporta approval.

AC-ENV-024

Toda aprobación se vincula al payload.

AC-ENV-025

Todo resultado UNKNOWN se concilia.

AC-ENV-026

Todo despliegue verifica health y readiness.

AC-ENV-027

Todo cambio valida postcondiciones.

AC-ENV-028

Todo rollback es explícito.

AC-ENV-029

Los secretos no se exponen.

AC-ENV-030

Toda operación es auditable.

AC-ENV-031

Toda operación está autenticada y autorizada.

AC-ENV-032

Todo entorno está aislado.

AC-ENV-033

Todo artefacto es inmutable y verificable.

AC-ENV-034

Toda configuración está versionada.

AC-ENV-035

Toda modificación valida expected version.

AC-ENV-036

Toda modificación con efecto usa idempotencia.

AC-ENV-037

Toda operación sensible exige reason.

AC-ENV-038

Toda operación crítica soporta approval.

AC-ENV-039

Toda aprobación se vincula al payload.

AC-ENV-040

Todo resultado UNKNOWN se concilia.

AC-ENV-041

Todo despliegue verifica health y readiness.

AC-ENV-042

Todo cambio valida postcondiciones.

AC-ENV-043

Todo rollback es explícito.

AC-ENV-044

Los secretos no se exponen.

AC-ENV-045

Toda operación es auditable.

AC-ENV-046

Toda operación está autenticada y autorizada.

AC-ENV-047

Todo entorno está aislado.

AC-ENV-048

Todo artefacto es inmutable y verificable.

AC-ENV-049

Toda configuración está versionada.

AC-ENV-050

Toda modificación valida expected version.

AC-ENV-051

Toda modificación con efecto usa idempotencia.

AC-ENV-052

Toda operación sensible exige reason.

AC-ENV-053

Toda operación crítica soporta approval.

AC-ENV-054

Toda aprobación se vincula al payload.

AC-ENV-055

Todo resultado UNKNOWN se concilia.

AC-ENV-056

Todo despliegue verifica health y readiness.

AC-ENV-057

Todo cambio valida postcondiciones.

AC-ENV-058

Todo rollback es explícito.

AC-ENV-059

Los secretos no se exponen.

AC-ENV-060

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
