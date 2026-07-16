======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-07-05-DATABASE-MIGRATIONS-OPERATIONS.md

# OPERACIÓN DE BASE DE DATOS Y MIGRACIONES

## 1. Objetivo

Define la operación segura de PostgreSQL, transacciones, constraints, pooling, locks, réplicas, migraciones, backfills y mantenimiento.

## 2. Alcance

Incluye PostgreSQL, schemas, ownership, transacciones, constraints, índices, particionado, conexiones, pooling, migraciones, expand-contract, datos semilla, locks, replicas, PITR, mantenimiento, observabilidad, seguridad y QA.

## 3. Fuente transaccional

PostgreSQL es la fuente oficial para aggregates, estados, versiones, idempotencia, outbox, inbox, auditoría, configuración y referencias. Redis, caches y colas no reemplazan esta función.

## 4. Modelo de tenant

Toda tabla tenant-scoped debe incluir Tenant ID y constraints que impidan referencias cruzadas. Los índices y claves únicas deben incluir tenant cuando corresponda.

## 5. Transacciones

Las operaciones de dominio deben persistir estado, movimientos, idempotencia y outbox de forma atómica cuando pertenezcan al mismo límite transaccional.

## 6. Constraints

Deben existir claves primarias, foráneas, checks, uniques y restricciones de estado. Los invariantes críticos no deben depender sólo de validación de aplicación.

## 7. Versionado optimista

Los aggregates y balances utilizan version monotónica. Las actualizaciones deben incluir la versión esperada y comprobar filas afectadas.

## 8. Locks

Los locks pesimistas se usan sólo cuando son necesarios. Debe existir orden de adquisición, timeout, detección de deadlock y reintento idempotente.

## 9. Connection Pooling

El pool debe limitar conexiones, aplicar timeouts, health, leak detection, métricas y separación entre tráfico interactivo, workers y administración.

## 10. Índices

Los índices deben justificarse por consultas reales, selectividad, orden y coste. Deben revisarse índices duplicados, no usados y bloating.

## 11. Particionado

Puede aplicarse a auditoría, eventos, outbox, mensajes o historiales. La política debe incluir routing, mantenimiento, retención y consultas.

## 12. Migraciones

Toda migración posee ID, checksum, owner, riesgo, compatibility window, preflight, backup requirement, execution plan, verification y recovery plan.

## 13. Expand-contract

Los cambios incompatibles se ejecutan en fases: añadir estructura compatible, desplegar código dual, backfill idempotente, verificar, cambiar lectura/escritura y retirar estructura antigua.

## 14. Backfill

Los backfills deben ser reanudables, limitados por lotes, observables, tenant-safe, idempotentes y capaces de pausar sin bloquear el sistema.

## 15. Replicas

Las réplicas de lectura pueden usarse para consultas tolerantes a lag. Las operaciones que requieren estado fuerte deben consultar primario o consistencia garantizada.

## 16. Mantenimiento

Se deben supervisar vacuum, analyze, bloat, locks, deadlocks, slow queries, replication lag, storage, checkpoints y conexiones.

## 17. Reglas normativas

RULE-DBO-001

Toda operación debe ser reproducible, versionada, idempotente cuando aplique y auditable.

RULE-DBO-002

Toda modificación de datos debe validar tenant, versión, estado e invariantes.

RULE-DBO-003

Toda migración debe declarar compatibilidad, riesgo, preflight, verificación y recuperación.

RULE-DBO-004

Los cambios destructivos requieren aprobación, backup verificado y estrategia expand-contract.

RULE-DBO-005

Redis, colas y cachés no sustituyen la fuente transaccional oficial.

RULE-DBO-006

Todo worker debe tolerar reintentos y mensajes duplicados.

RULE-DBO-007

Todo lock distribuido debe tener owner, TTL, renovación y fencing cuando corresponda.

RULE-DBO-008

Todo resultado UNKNOWN requiere conciliación antes de repetir.

RULE-DBO-009

Todo backup debe estar cifrado, versionado, retenido y probado mediante restauración.

RULE-DBO-010

Todo procedimiento de recuperación debe declarar RPO, RTO, owner y criterios de éxito.

RULE-DBO-011

Toda dependencia debe tener timeout, retry limitado, backoff y observabilidad.

RULE-DBO-012

Los secretos nunca deben aparecer en repositorios, imágenes, logs o archivos de backup sin cifrado.

RULE-DBO-013

Toda acción privilegiada requiere autorización fuerte y evidencia.

RULE-DBO-014

Los tenants deben permanecer aislados en datos, backups, cachés, colas y restauraciones.

RULE-DBO-015

Toda falla crítica debe activar contención, alerta y runbook.

RULE-DBO-016

Toda operación debe ser reproducible, versionada, idempotente cuando aplique y auditable.

RULE-DBO-017

Toda modificación de datos debe validar tenant, versión, estado e invariantes.

RULE-DBO-018

Toda migración debe declarar compatibilidad, riesgo, preflight, verificación y recuperación.

RULE-DBO-019

Los cambios destructivos requieren aprobación, backup verificado y estrategia expand-contract.

RULE-DBO-020

Redis, colas y cachés no sustituyen la fuente transaccional oficial.

RULE-DBO-021

Todo worker debe tolerar reintentos y mensajes duplicados.

RULE-DBO-022

Todo lock distribuido debe tener owner, TTL, renovación y fencing cuando corresponda.

RULE-DBO-023

Todo resultado UNKNOWN requiere conciliación antes de repetir.

RULE-DBO-024

Todo backup debe estar cifrado, versionado, retenido y probado mediante restauración.

RULE-DBO-025

Todo procedimiento de recuperación debe declarar RPO, RTO, owner y criterios de éxito.

RULE-DBO-026

Toda dependencia debe tener timeout, retry limitado, backoff y observabilidad.

RULE-DBO-027

Los secretos nunca deben aparecer en repositorios, imágenes, logs o archivos de backup sin cifrado.

RULE-DBO-028

Toda acción privilegiada requiere autorización fuerte y evidencia.

RULE-DBO-029

Los tenants deben permanecer aislados en datos, backups, cachés, colas y restauraciones.

RULE-DBO-030

Toda falla crítica debe activar contención, alerta y runbook.

RULE-DBO-031

Toda operación debe ser reproducible, versionada, idempotente cuando aplique y auditable.

RULE-DBO-032

Toda modificación de datos debe validar tenant, versión, estado e invariantes.

RULE-DBO-033

Toda migración debe declarar compatibilidad, riesgo, preflight, verificación y recuperación.

RULE-DBO-034

Los cambios destructivos requieren aprobación, backup verificado y estrategia expand-contract.

RULE-DBO-035

Redis, colas y cachés no sustituyen la fuente transaccional oficial.

RULE-DBO-036

Todo worker debe tolerar reintentos y mensajes duplicados.

RULE-DBO-037

Todo lock distribuido debe tener owner, TTL, renovación y fencing cuando corresponda.

RULE-DBO-038

Todo resultado UNKNOWN requiere conciliación antes de repetir.

RULE-DBO-039

Todo backup debe estar cifrado, versionado, retenido y probado mediante restauración.

RULE-DBO-040

Todo procedimiento de recuperación debe declarar RPO, RTO, owner y criterios de éxito.

RULE-DBO-041

Toda dependencia debe tener timeout, retry limitado, backoff y observabilidad.

RULE-DBO-042

Los secretos nunca deben aparecer en repositorios, imágenes, logs o archivos de backup sin cifrado.

RULE-DBO-043

Toda acción privilegiada requiere autorización fuerte y evidencia.

RULE-DBO-044

Los tenants deben permanecer aislados en datos, backups, cachés, colas y restauraciones.

RULE-DBO-045

Toda falla crítica debe activar contención, alerta y runbook.

RULE-DBO-046

Toda operación debe ser reproducible, versionada, idempotente cuando aplique y auditable.

RULE-DBO-047

Toda modificación de datos debe validar tenant, versión, estado e invariantes.

RULE-DBO-048

Toda migración debe declarar compatibilidad, riesgo, preflight, verificación y recuperación.

RULE-DBO-049

Los cambios destructivos requieren aprobación, backup verificado y estrategia expand-contract.

RULE-DBO-050

Redis, colas y cachés no sustituyen la fuente transaccional oficial.

RULE-DBO-051

Todo worker debe tolerar reintentos y mensajes duplicados.

RULE-DBO-052

Todo lock distribuido debe tener owner, TTL, renovación y fencing cuando corresponda.

RULE-DBO-053

Todo resultado UNKNOWN requiere conciliación antes de repetir.

RULE-DBO-054

Todo backup debe estar cifrado, versionado, retenido y probado mediante restauración.

RULE-DBO-055

Todo procedimiento de recuperación debe declarar RPO, RTO, owner y criterios de éxito.

RULE-DBO-056

Toda dependencia debe tener timeout, retry limitado, backoff y observabilidad.

RULE-DBO-057

Los secretos nunca deben aparecer en repositorios, imágenes, logs o archivos de backup sin cifrado.

RULE-DBO-058

Toda acción privilegiada requiere autorización fuerte y evidencia.

RULE-DBO-059

Los tenants deben permanecer aislados en datos, backups, cachés, colas y restauraciones.

RULE-DBO-060

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

DBO_REQUEST_INVALID

DBO_AUTHENTICATION_REQUIRED

DBO_AUTHORIZATION_DENIED

DBO_TENANT_SCOPE_DENIED

DBO_ENVIRONMENT_SCOPE_DENIED

DBO_RESOURCE_NOT_FOUND

DBO_STATE_INVALID

DBO_VERSION_CONFLICT

DBO_IDEMPOTENCY_CONFLICT

DBO_APPROVAL_REQUIRED

DBO_APPROVAL_INVALID

DBO_CONCURRENCY_CONFLICT

DBO_LOCK_TIMEOUT

DBO_DEPENDENCY_UNAVAILABLE

DBO_TIMEOUT

DBO_RATE_LIMITED

DBO_INVARIANT_VIOLATION

DBO_POSTCONDITION_FAILED

DBO_RESULT_UNKNOWN

DBO_RECOVERY_FAILED

DBO_AUDIT_PERSISTENCE_FAILED

DBO_SECURITY_POLICY_DENIED

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

- 13_07_05_database_migrations_operations_requests_total;
- 13_07_05_database_migrations_operations_success_total;
- 13_07_05_database_migrations_operations_failure_total;
- 13_07_05_database_migrations_operations_duration_seconds;
- 13_07_05_database_migrations_operations_preflight_failure_total;
- 13_07_05_database_migrations_operations_approval_required_total;
- 13_07_05_database_migrations_operations_version_conflict_total;
- 13_07_05_database_migrations_operations_idempotency_hit_total;
- 13_07_05_database_migrations_operations_lock_timeout_total;
- 13_07_05_database_migrations_operations_unknown_total;
- 13_07_05_database_migrations_operations_recovery_total;
- 13_07_05_database_migrations_operations_recovery_failure_total;
- 13_07_05_database_migrations_operations_reconciliation_total;
- 13_07_05_database_migrations_operations_security_denied_total;
- 13_07_05_database_migrations_operations_audit_failure_total;
- 13_07_05_database_migrations_operations_active_operations;

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

TEST-DBO-001: verificar dos operaciones compiten por el mismo recurso; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-002: verificar la aprobación expira antes del commit; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-003: verificar el permiso se revoca durante la operación; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-004: verificar el tenant se suspende durante el flujo; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-005: verificar la dependencia responde después del timeout; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-006: verificar la misma Idempotency Key llega con payload distinto; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-007: verificar el resultado queda UNKNOWN; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-008: verificar el lock expira y el owner antiguo intenta escribir; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-009: verificar la recuperación también falla; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-010: verificar la auditoría está degradada; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-011: verificar un evento se duplica; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-012: verificar un evento llega fuera de orden; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-013: verificar un secreto es revocado; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-014: verificar una configuración cambia después del preflight; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-015: verificar un backup tiene checksum inválido; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-016: verificar una restauración mezcla tenants; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-017: verificar una migración es incompatible; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-018: verificar un worker procesa dos veces el mismo mensaje; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-019: verificar una cola conserva mensajes demasiado antiguos; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-020: verificar un cache stale devuelve un valor inseguro; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-021: verificar un actor intenta autoaprobarse; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-022: verificar un entorno usa credenciales equivocadas; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-023: verificar un failover produce split-brain; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-024: verificar un restore supera el RTO; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-DBO-025: verificar un backup no cumple el RPO; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

## 26. Criterios de aceptación

AC-DBO-001

Toda operación está autenticada y autorizada.

AC-DBO-002

Toda operación respeta tenant y entorno.

AC-DBO-003

Toda modificación valida versión.

AC-DBO-004

Toda operación repetible usa idempotencia.

AC-DBO-005

Toda operación sensible exige reason.

AC-DBO-006

Toda operación crítica soporta approval.

AC-DBO-007

Toda aprobación se vincula al payload.

AC-DBO-008

Todo resultado UNKNOWN se concilia.

AC-DBO-009

Toda recuperación es explícita.

AC-DBO-010

Todo cambio valida postcondiciones.

AC-DBO-011

Los secretos no se exponen.

AC-DBO-012

Los backups están cifrados y verificados.

AC-DBO-013

Los workers toleran duplicados.

AC-DBO-014

Las métricas evitan alta cardinalidad.

AC-DBO-015

Toda operación es auditable.

AC-DBO-016

Toda operación está autenticada y autorizada.

AC-DBO-017

Toda operación respeta tenant y entorno.

AC-DBO-018

Toda modificación valida versión.

AC-DBO-019

Toda operación repetible usa idempotencia.

AC-DBO-020

Toda operación sensible exige reason.

AC-DBO-021

Toda operación crítica soporta approval.

AC-DBO-022

Toda aprobación se vincula al payload.

AC-DBO-023

Todo resultado UNKNOWN se concilia.

AC-DBO-024

Toda recuperación es explícita.

AC-DBO-025

Todo cambio valida postcondiciones.

AC-DBO-026

Los secretos no se exponen.

AC-DBO-027

Los backups están cifrados y verificados.

AC-DBO-028

Los workers toleran duplicados.

AC-DBO-029

Las métricas evitan alta cardinalidad.

AC-DBO-030

Toda operación es auditable.

AC-DBO-031

Toda operación está autenticada y autorizada.

AC-DBO-032

Toda operación respeta tenant y entorno.

AC-DBO-033

Toda modificación valida versión.

AC-DBO-034

Toda operación repetible usa idempotencia.

AC-DBO-035

Toda operación sensible exige reason.

AC-DBO-036

Toda operación crítica soporta approval.

AC-DBO-037

Toda aprobación se vincula al payload.

AC-DBO-038

Todo resultado UNKNOWN se concilia.

AC-DBO-039

Toda recuperación es explícita.

AC-DBO-040

Todo cambio valida postcondiciones.

AC-DBO-041

Los secretos no se exponen.

AC-DBO-042

Los backups están cifrados y verificados.

AC-DBO-043

Los workers toleran duplicados.

AC-DBO-044

Las métricas evitan alta cardinalidad.

AC-DBO-045

Toda operación es auditable.

AC-DBO-046

Toda operación está autenticada y autorizada.

AC-DBO-047

Toda operación respeta tenant y entorno.

AC-DBO-048

Toda modificación valida versión.

AC-DBO-049

Toda operación repetible usa idempotencia.

AC-DBO-050

Toda operación sensible exige reason.

AC-DBO-051

Toda operación crítica soporta approval.

AC-DBO-052

Toda aprobación se vincula al payload.

AC-DBO-053

Todo resultado UNKNOWN se concilia.

AC-DBO-054

Toda recuperación es explícita.

AC-DBO-055

Todo cambio valida postcondiciones.

AC-DBO-056

Los secretos no se exponen.

AC-DBO-057

Los backups están cifrados y verificados.

AC-DBO-058

Los workers toleran duplicados.

AC-DBO-059

Las métricas evitan alta cardinalidad.

AC-DBO-060

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
