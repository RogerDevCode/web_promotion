======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-07-07-BACKUP-DISASTER-RECOVERY.md

# BACKUPS Y DISASTER RECOVERY

## 1. Objetivo

Define RPO, RTO, backups, PITR, restores, aislamiento, failover, declaración de desastre, ejercicios y verificación de recuperación.

## 2. Alcance

Incluye backups de PostgreSQL, object storage, configuración, secretos por referencias, audit, restore, PITR, RPO, RTO, retención, cifrado, pruebas, failover, disaster declaration, recovery, comunicación y QA.

## 3. Clasificación de datos

Cada clase de dato debe declarar criticidad, RPO, RTO, retención, cifrado, legal hold, tenant scope y método de restauración.

## 4. RPO

El Recovery Point Objective define la pérdida máxima de datos tolerable. Debe establecerse por componente y operación, no sólo globalmente.

## 5. RTO

El Recovery Time Objective define el tiempo máximo para restaurar servicio o capacidad mínima segura. Debe medirse mediante ejercicios.

## 6. PostgreSQL backups

Deben incluir base backups, WAL/PITR, checksums, cifrado, retención, replicación geográfica permitida y restauración verificada.

## 7. Object storage

Los objetos requieren versioning, checksums, cifrado, lifecycle, immutability cuando aplique y pruebas de recuperación.

## 8. Configuración

La configuración se respalda como referencias versionadas, schemas y metadatos. Los valores secretos se recuperan desde el sistema de secretos, no desde dumps en claro.

## 9. Auditoría

Los Audit Events requieren retención, integridad, legal hold, replicación y restauración que preserve orden, referencias y hashes.

## 10. Backup isolation

Los backups deben estar aislados de las credenciales operativas normales y protegidos contra borrado simultáneo o ransomware.

## 11. Restore

Toda restauración requiere autorización, target environment, tenant scope, preflight, checksum, version compatibility, dry run, validation y cleanup.

## 12. Tenant restore

La restauración selectiva de tenant debe impedir contaminación cruzada y reconstruir referencias, claves, outbox, inbox, auditoría y archivos relacionados.

## 13. PITR

Point-in-time recovery debe poder seleccionar timestamp, validar WAL continuity, restaurar en entorno aislado y verificar consistencia antes del cutover.

## 14. Disaster declaration

La declaración de desastre asigna Incident ID, severity, commander, scope, afectados, recovery strategy, communication y evidence plan.

## 15. Failover

El failover debe evitar split-brain, validar fencing, actualizar routing, verificar datos, preservar idempotencia y mantener trazabilidad.

## 16. Exercises

Se deben realizar pruebas periódicas de restore, PITR, tenant restore, failover, region loss, secret manager loss y corrupción lógica.

## 17. Reglas normativas

RULE-BDR-001

Toda operación debe ser reproducible, versionada, idempotente cuando aplique y auditable.

RULE-BDR-002

Toda modificación de datos debe validar tenant, versión, estado e invariantes.

RULE-BDR-003

Toda migración debe declarar compatibilidad, riesgo, preflight, verificación y recuperación.

RULE-BDR-004

Los cambios destructivos requieren aprobación, backup verificado y estrategia expand-contract.

RULE-BDR-005

Redis, colas y cachés no sustituyen la fuente transaccional oficial.

RULE-BDR-006

Todo worker debe tolerar reintentos y mensajes duplicados.

RULE-BDR-007

Todo lock distribuido debe tener owner, TTL, renovación y fencing cuando corresponda.

RULE-BDR-008

Todo resultado UNKNOWN requiere conciliación antes de repetir.

RULE-BDR-009

Todo backup debe estar cifrado, versionado, retenido y probado mediante restauración.

RULE-BDR-010

Todo procedimiento de recuperación debe declarar RPO, RTO, owner y criterios de éxito.

RULE-BDR-011

Toda dependencia debe tener timeout, retry limitado, backoff y observabilidad.

RULE-BDR-012

Los secretos nunca deben aparecer en repositorios, imágenes, logs o archivos de backup sin cifrado.

RULE-BDR-013

Toda acción privilegiada requiere autorización fuerte y evidencia.

RULE-BDR-014

Los tenants deben permanecer aislados en datos, backups, cachés, colas y restauraciones.

RULE-BDR-015

Toda falla crítica debe activar contención, alerta y runbook.

RULE-BDR-016

Toda operación debe ser reproducible, versionada, idempotente cuando aplique y auditable.

RULE-BDR-017

Toda modificación de datos debe validar tenant, versión, estado e invariantes.

RULE-BDR-018

Toda migración debe declarar compatibilidad, riesgo, preflight, verificación y recuperación.

RULE-BDR-019

Los cambios destructivos requieren aprobación, backup verificado y estrategia expand-contract.

RULE-BDR-020

Redis, colas y cachés no sustituyen la fuente transaccional oficial.

RULE-BDR-021

Todo worker debe tolerar reintentos y mensajes duplicados.

RULE-BDR-022

Todo lock distribuido debe tener owner, TTL, renovación y fencing cuando corresponda.

RULE-BDR-023

Todo resultado UNKNOWN requiere conciliación antes de repetir.

RULE-BDR-024

Todo backup debe estar cifrado, versionado, retenido y probado mediante restauración.

RULE-BDR-025

Todo procedimiento de recuperación debe declarar RPO, RTO, owner y criterios de éxito.

RULE-BDR-026

Toda dependencia debe tener timeout, retry limitado, backoff y observabilidad.

RULE-BDR-027

Los secretos nunca deben aparecer en repositorios, imágenes, logs o archivos de backup sin cifrado.

RULE-BDR-028

Toda acción privilegiada requiere autorización fuerte y evidencia.

RULE-BDR-029

Los tenants deben permanecer aislados en datos, backups, cachés, colas y restauraciones.

RULE-BDR-030

Toda falla crítica debe activar contención, alerta y runbook.

RULE-BDR-031

Toda operación debe ser reproducible, versionada, idempotente cuando aplique y auditable.

RULE-BDR-032

Toda modificación de datos debe validar tenant, versión, estado e invariantes.

RULE-BDR-033

Toda migración debe declarar compatibilidad, riesgo, preflight, verificación y recuperación.

RULE-BDR-034

Los cambios destructivos requieren aprobación, backup verificado y estrategia expand-contract.

RULE-BDR-035

Redis, colas y cachés no sustituyen la fuente transaccional oficial.

RULE-BDR-036

Todo worker debe tolerar reintentos y mensajes duplicados.

RULE-BDR-037

Todo lock distribuido debe tener owner, TTL, renovación y fencing cuando corresponda.

RULE-BDR-038

Todo resultado UNKNOWN requiere conciliación antes de repetir.

RULE-BDR-039

Todo backup debe estar cifrado, versionado, retenido y probado mediante restauración.

RULE-BDR-040

Todo procedimiento de recuperación debe declarar RPO, RTO, owner y criterios de éxito.

RULE-BDR-041

Toda dependencia debe tener timeout, retry limitado, backoff y observabilidad.

RULE-BDR-042

Los secretos nunca deben aparecer en repositorios, imágenes, logs o archivos de backup sin cifrado.

RULE-BDR-043

Toda acción privilegiada requiere autorización fuerte y evidencia.

RULE-BDR-044

Los tenants deben permanecer aislados en datos, backups, cachés, colas y restauraciones.

RULE-BDR-045

Toda falla crítica debe activar contención, alerta y runbook.

RULE-BDR-046

Toda operación debe ser reproducible, versionada, idempotente cuando aplique y auditable.

RULE-BDR-047

Toda modificación de datos debe validar tenant, versión, estado e invariantes.

RULE-BDR-048

Toda migración debe declarar compatibilidad, riesgo, preflight, verificación y recuperación.

RULE-BDR-049

Los cambios destructivos requieren aprobación, backup verificado y estrategia expand-contract.

RULE-BDR-050

Redis, colas y cachés no sustituyen la fuente transaccional oficial.

RULE-BDR-051

Todo worker debe tolerar reintentos y mensajes duplicados.

RULE-BDR-052

Todo lock distribuido debe tener owner, TTL, renovación y fencing cuando corresponda.

RULE-BDR-053

Todo resultado UNKNOWN requiere conciliación antes de repetir.

RULE-BDR-054

Todo backup debe estar cifrado, versionado, retenido y probado mediante restauración.

RULE-BDR-055

Todo procedimiento de recuperación debe declarar RPO, RTO, owner y criterios de éxito.

RULE-BDR-056

Toda dependencia debe tener timeout, retry limitado, backoff y observabilidad.

RULE-BDR-057

Los secretos nunca deben aparecer en repositorios, imágenes, logs o archivos de backup sin cifrado.

RULE-BDR-058

Toda acción privilegiada requiere autorización fuerte y evidencia.

RULE-BDR-059

Los tenants deben permanecer aislados en datos, backups, cachés, colas y restauraciones.

RULE-BDR-060

Toda falla crítica debe activar contención, alerta y runbook.

## 18. Contrato JSON de referencia

```json
{
  "operation_id": "UUID",
  "environment": "PRODUCTION",
  "tenant_scope": "UUID_OR_GLOBAL",
  "resource_reference": "OPAQUE",
  "expected_version": 12,
  "policy_version": 4,
  "reason_code": "AUTHORIZED_OPERATION",
  "approval_reference": "UUID_OR_NULL",
  "idempotency_key": "STRING",
  "correlation_id": "UUID",
  "requested_at": "UTC_TIMESTAMP"
}
```

## 19. Flujo funcional

1. Recibir la solicitud operativa.
2. Validar schema, límites, entorno y tenant.
3. Autenticar al actor o servicio.
4. Autorizar la operación.
5. Cargar estado y metadatos vigentes.
6. Validar expected version.
7. Ejecutar preflight o dry run.
8. Evaluar riesgo, reason, evidencia y approval.
9. Consultar idempotencia.
10. Adquirir controles de concurrencia.
11. Ejecutar la operación oficial.
12. Validar invariantes y postcondiciones.
13. Persistir resultado, auditoría y outbox.
14. Emitir eventos.
15. Actualizar métricas y trazas.
16. Ejecutar rollback, compensación o conciliación cuando corresponda.
17. Verificar el estado final.
18. Cerrar con evidencia reproducible.

## 20. Pseudocódigo

```text
function execute_reliable_operation(command):

    validate_schema_limits_environment_and_tenant(command)

    identity = authenticate_actor_or_service(
        command.actor_or_service_id
    )

    authorize_operation(
        identity=identity,
        operation=command.operation,
        environment=command.environment,
        tenant_scope=command.tenant_scope
    )

    current = load_current_state(command.resource_reference)

    validate_expected_version(
        current.version,
        command.expected_version
    )

    preflight = execute_side_effect_free_preflight(
        command,
        current
    )

    validate_preflight(preflight)
    validate_reason_and_evidence(command, preflight)

    if preflight.approval_required:
        validate_single_use_approval(
            command.approval_reference,
            hash_semantic_payload(command, preflight)
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
            current
        )

        validate_domain_and_operational_invariants(result)
        verify_postconditions(result)

        persist_result_audit_outbox_and_idempotency(
            command,
            result
        )

        emit_events(result)
        return build_safe_result(result)

    except UnknownOutcomeError as error:
        mark_unknown(command, error)
        schedule_reconciliation(command)
        return build_unknown_result(command)

    except OperationFailure as error:
        if safe_recovery_is_available(command, error):
            execute_idempotent_recovery(command, error)
        raise

    finally:
        release_owned_controls(controls)
```

## 21. Errores funcionales

BDR_REQUEST_INVALID

BDR_AUTHENTICATION_REQUIRED

BDR_AUTHORIZATION_DENIED

BDR_TENANT_SCOPE_DENIED

BDR_ENVIRONMENT_SCOPE_DENIED

BDR_RESOURCE_NOT_FOUND

BDR_STATE_INVALID

BDR_VERSION_CONFLICT

BDR_IDEMPOTENCY_CONFLICT

BDR_APPROVAL_REQUIRED

BDR_APPROVAL_INVALID

BDR_CONCURRENCY_CONFLICT

BDR_LOCK_TIMEOUT

BDR_DEPENDENCY_UNAVAILABLE

BDR_TIMEOUT

BDR_RATE_LIMITED

BDR_INVARIANT_VIOLATION

BDR_POSTCONDITION_FAILED

BDR_RESULT_UNKNOWN

BDR_RECOVERY_FAILED

BDR_AUDIT_PERSISTENCE_FAILED

BDR_SECURITY_POLICY_DENIED

## 22. Eventos

OperationRequested

PreflightStarted

PreflightCompleted

PreflightFailed

ApprovalRequested

ApprovalGranted

OperationStarted

OperationCompleted

OperationFailed

OperationMarkedUnknown

RecoveryStarted

RecoveryCompleted

RecoveryFailed

ReconciliationRequested

ReconciliationCompleted

SecurityPolicyDenied

AuditEvidenceRecorded

## 23. Observabilidad

- 13_07_07_backup_disaster_recovery_requests_total;
- 13_07_07_backup_disaster_recovery_success_total;
- 13_07_07_backup_disaster_recovery_failure_total;
- 13_07_07_backup_disaster_recovery_duration_seconds;
- 13_07_07_backup_disaster_recovery_preflight_failure_total;
- 13_07_07_backup_disaster_recovery_approval_required_total;
- 13_07_07_backup_disaster_recovery_version_conflict_total;
- 13_07_07_backup_disaster_recovery_idempotency_hit_total;
- 13_07_07_backup_disaster_recovery_lock_timeout_total;
- 13_07_07_backup_disaster_recovery_unknown_total;
- 13_07_07_backup_disaster_recovery_recovery_total;
- 13_07_07_backup_disaster_recovery_recovery_failure_total;
- 13_07_07_backup_disaster_recovery_reconciliation_total;
- 13_07_07_backup_disaster_recovery_security_denied_total;
- 13_07_07_backup_disaster_recovery_audit_failure_total;
- 13_07_07_backup_disaster_recovery_active_operations;

Dimensiones permitidas:

- environment;
- operation;
- resource_class;
- result;
- error_code;
- risk;
- tenant_tier.

No usar IDs únicos, secretos, tokens, nombres, correos, URLs completas o payloads como etiquetas.

## 24. Seguridad

- Mínimo privilegio y segregación de funciones.
- MFA o step-up para operaciones productivas críticas.
- Aislamiento por tenant y entorno.
- Secretos únicamente por referencias.
- Cifrado en tránsito y reposo.
- Firmas y checksums para artefactos y backups.
- Protección contra replay, SSRF, CSRF e inyección.
- Aprobaciones single-use vinculadas al payload.
- Break-glass con expiración, alerta y revisión.
- Auditoría de cambios, restores, exportaciones y accesos.
- Escaneo de dependencias, imágenes y archivos.
- Redacción de logs, métricas y trazas.

## 25. Casos límite y pruebas adversariales

TEST-BDR-001: verificar dos operaciones compiten por el mismo recurso; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-002: verificar la aprobación expira antes del commit; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-003: verificar el permiso se revoca durante la operación; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-004: verificar el tenant se suspende durante el flujo; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-005: verificar la dependencia responde después del timeout; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-006: verificar la misma Idempotency Key llega con payload distinto; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-007: verificar el resultado queda UNKNOWN; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-008: verificar el lock expira y el owner antiguo intenta escribir; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-009: verificar la recuperación también falla; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-010: verificar la auditoría está degradada; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-011: verificar un evento se duplica; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-012: verificar un evento llega fuera de orden; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-013: verificar un secreto es revocado; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-014: verificar una configuración cambia después del preflight; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-015: verificar un backup tiene checksum inválido; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-016: verificar una restauración mezcla tenants; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-017: verificar una migración es incompatible; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-018: verificar un worker procesa dos veces el mismo mensaje; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-019: verificar una cola conserva mensajes demasiado antiguos; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-020: verificar un cache stale devuelve un valor inseguro; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-021: verificar un actor intenta autoaprobarse; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-022: verificar un entorno usa credenciales equivocadas; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-023: verificar un failover produce split-brain; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-024: verificar un restore supera el RTO; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-BDR-025: verificar un backup no cumple el RPO; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

## 26. Criterios de aceptación

AC-BDR-001

Toda operación está autenticada y autorizada.

AC-BDR-002

Toda operación respeta tenant y entorno.

AC-BDR-003

Toda modificación valida versión.

AC-BDR-004

Toda operación repetible usa idempotencia.

AC-BDR-005

Toda operación sensible exige reason.

AC-BDR-006

Toda operación crítica soporta approval.

AC-BDR-007

Toda aprobación se vincula al payload.

AC-BDR-008

Todo resultado UNKNOWN se concilia.

AC-BDR-009

Toda recuperación es explícita.

AC-BDR-010

Todo cambio valida postcondiciones.

AC-BDR-011

Los secretos no se exponen.

AC-BDR-012

Los backups están cifrados y verificados.

AC-BDR-013

Los workers toleran duplicados.

AC-BDR-014

Las métricas evitan alta cardinalidad.

AC-BDR-015

Toda operación es auditable.

AC-BDR-016

Toda operación está autenticada y autorizada.

AC-BDR-017

Toda operación respeta tenant y entorno.

AC-BDR-018

Toda modificación valida versión.

AC-BDR-019

Toda operación repetible usa idempotencia.

AC-BDR-020

Toda operación sensible exige reason.

AC-BDR-021

Toda operación crítica soporta approval.

AC-BDR-022

Toda aprobación se vincula al payload.

AC-BDR-023

Todo resultado UNKNOWN se concilia.

AC-BDR-024

Toda recuperación es explícita.

AC-BDR-025

Todo cambio valida postcondiciones.

AC-BDR-026

Los secretos no se exponen.

AC-BDR-027

Los backups están cifrados y verificados.

AC-BDR-028

Los workers toleran duplicados.

AC-BDR-029

Las métricas evitan alta cardinalidad.

AC-BDR-030

Toda operación es auditable.

AC-BDR-031

Toda operación está autenticada y autorizada.

AC-BDR-032

Toda operación respeta tenant y entorno.

AC-BDR-033

Toda modificación valida versión.

AC-BDR-034

Toda operación repetible usa idempotencia.

AC-BDR-035

Toda operación sensible exige reason.

AC-BDR-036

Toda operación crítica soporta approval.

AC-BDR-037

Toda aprobación se vincula al payload.

AC-BDR-038

Todo resultado UNKNOWN se concilia.

AC-BDR-039

Toda recuperación es explícita.

AC-BDR-040

Todo cambio valida postcondiciones.

AC-BDR-041

Los secretos no se exponen.

AC-BDR-042

Los backups están cifrados y verificados.

AC-BDR-043

Los workers toleran duplicados.

AC-BDR-044

Las métricas evitan alta cardinalidad.

AC-BDR-045

Toda operación es auditable.

AC-BDR-046

Toda operación está autenticada y autorizada.

AC-BDR-047

Toda operación respeta tenant y entorno.

AC-BDR-048

Toda modificación valida versión.

AC-BDR-049

Toda operación repetible usa idempotencia.

AC-BDR-050

Toda operación sensible exige reason.

AC-BDR-051

Toda operación crítica soporta approval.

AC-BDR-052

Toda aprobación se vincula al payload.

AC-BDR-053

Todo resultado UNKNOWN se concilia.

AC-BDR-054

Toda recuperación es explícita.

AC-BDR-055

Todo cambio valida postcondiciones.

AC-BDR-056

Los secretos no se exponen.

AC-BDR-057

Los backups están cifrados y verificados.

AC-BDR-058

Los workers toleran duplicados.

AC-BDR-059

Las métricas evitan alta cardinalidad.

AC-BDR-060

Toda operación es auditable.

## 27. Checklist final

[ ] Existe identificador estable.
[ ] Existe tenant scope.
[ ] Existe environment scope.
[ ] Existe autenticación.
[ ] Existe autorización.
[ ] Existe assurance policy.
[ ] Existe expected version.
[ ] Existe Idempotency Key.
[ ] Existe preflight.
[ ] Existe approval policy.
[ ] Existe concurrency control.
[ ] Existe timeout.
[ ] Existe retry policy.
[ ] Existe backoff.
[ ] Existe health verification.
[ ] Existe postcondition verification.
[ ] Existe UNKNOWN policy.
[ ] Existe recovery.
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
