======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-07-06-REDIS-QUEUES-WORKERS.md

# REDIS, COLAS Y WORKERS

## 1. Objetivo

Define el uso seguro de Redis, cachés, locks, rate limits, colas, workers, retries, DLQ, ordering, backpressure y recuperación.

## 2. Alcance

Incluye Redis, caché, sesiones efímeras, rate limiting, deduplicación corta, locks, leases, colas, workers, retries, DLQ, ordering, backpressure, expiración, observabilidad, seguridad y QA.

## 3. Uso de Redis

Redis puede almacenar sesiones efímeras, caché, rate limits, locks, heartbeats y dedupe temporal. No es la única fuente de verdad para pedidos, pagos, inventario o auditoría.

## 4. Namespacing

Toda key debe incluir environment, tenant cuando aplique, resource class y version de schema. Está prohibido mezclar entornos o tenants.

## 5. TTL

Toda key efímera debe declarar TTL. Los TTL no deben renovarse indefinidamente sin owner y motivo. Los datos críticos no dependen de una expiración silenciosa.

## 6. Cache

Toda entrada declara source version, freshness, created_at, expires_at y fallback policy. Las operaciones críticas no usan cache stale salvo política explícita.

## 7. Invalidación

Debe existir invalidación por eventos, cambios de versión, tenant suspension, secret revocation, configuration update y publication.

## 8. Locks distribuidos

Todo lock posee owner token, TTL, renovación, liberación segura y fencing token cuando un owner antiguo pueda escribir.

## 9. Rate limiting

Los límites se aplican por tenant, actor, Session, IP, channel, operation y provider según riesgo. Deben devolver retry_after cuando exista.

## 10. Colas

Las colas operan al menos una vez. Los consumidores deben deduplicar y ser idempotentes. Cada mensaje posee Message ID, tenant, schema version, correlation y causation.

## 11. Workers

Los workers declaran concurrency, prefetch, visibility timeout, heartbeat, maximum attempts, backoff, idempotency y shutdown seguro.

## 12. Retries

Los errores se clasifican en retryable, final y unknown. Los retries son limitados, con jitter, presupuesto total y sin busy loop.

## 13. Dead-letter

Los mensajes agotados pasan a DLQ con causa, attempts, timestamps, tenant, references y next action. La DLQ requiere owner, alertas y runbook.

## 14. Ordering

El ordering puede garantizarse por aggregate, Session, Payment, Order o Reservation. No se requiere orden global si no aporta valor.

## 15. Backpressure

Se deben controlar queue depth, oldest age, consumer lag, throughput, memory, concurrency y load shedding para evitar cascadas.

## 16. Shutdown y recuperación

El worker debe dejar de aceptar trabajo, completar o devolver mensajes, liberar locks propios, persistir progreso y reiniciar sin duplicar efectos.

## 17. Reglas normativas

RULE-RQW-001

Toda operación debe ser reproducible, versionada, idempotente cuando aplique y auditable.

RULE-RQW-002

Toda modificación de datos debe validar tenant, versión, estado e invariantes.

RULE-RQW-003

Toda migración debe declarar compatibilidad, riesgo, preflight, verificación y recuperación.

RULE-RQW-004

Los cambios destructivos requieren aprobación, backup verificado y estrategia expand-contract.

RULE-RQW-005

Redis, colas y cachés no sustituyen la fuente transaccional oficial.

RULE-RQW-006

Todo worker debe tolerar reintentos y mensajes duplicados.

RULE-RQW-007

Todo lock distribuido debe tener owner, TTL, renovación y fencing cuando corresponda.

RULE-RQW-008

Todo resultado UNKNOWN requiere conciliación antes de repetir.

RULE-RQW-009

Todo backup debe estar cifrado, versionado, retenido y probado mediante restauración.

RULE-RQW-010

Todo procedimiento de recuperación debe declarar RPO, RTO, owner y criterios de éxito.

RULE-RQW-011

Toda dependencia debe tener timeout, retry limitado, backoff y observabilidad.

RULE-RQW-012

Los secretos nunca deben aparecer en repositorios, imágenes, logs o archivos de backup sin cifrado.

RULE-RQW-013

Toda acción privilegiada requiere autorización fuerte y evidencia.

RULE-RQW-014

Los tenants deben permanecer aislados en datos, backups, cachés, colas y restauraciones.

RULE-RQW-015

Toda falla crítica debe activar contención, alerta y runbook.

RULE-RQW-016

Toda operación debe ser reproducible, versionada, idempotente cuando aplique y auditable.

RULE-RQW-017

Toda modificación de datos debe validar tenant, versión, estado e invariantes.

RULE-RQW-018

Toda migración debe declarar compatibilidad, riesgo, preflight, verificación y recuperación.

RULE-RQW-019

Los cambios destructivos requieren aprobación, backup verificado y estrategia expand-contract.

RULE-RQW-020

Redis, colas y cachés no sustituyen la fuente transaccional oficial.

RULE-RQW-021

Todo worker debe tolerar reintentos y mensajes duplicados.

RULE-RQW-022

Todo lock distribuido debe tener owner, TTL, renovación y fencing cuando corresponda.

RULE-RQW-023

Todo resultado UNKNOWN requiere conciliación antes de repetir.

RULE-RQW-024

Todo backup debe estar cifrado, versionado, retenido y probado mediante restauración.

RULE-RQW-025

Todo procedimiento de recuperación debe declarar RPO, RTO, owner y criterios de éxito.

RULE-RQW-026

Toda dependencia debe tener timeout, retry limitado, backoff y observabilidad.

RULE-RQW-027

Los secretos nunca deben aparecer en repositorios, imágenes, logs o archivos de backup sin cifrado.

RULE-RQW-028

Toda acción privilegiada requiere autorización fuerte y evidencia.

RULE-RQW-029

Los tenants deben permanecer aislados en datos, backups, cachés, colas y restauraciones.

RULE-RQW-030

Toda falla crítica debe activar contención, alerta y runbook.

RULE-RQW-031

Toda operación debe ser reproducible, versionada, idempotente cuando aplique y auditable.

RULE-RQW-032

Toda modificación de datos debe validar tenant, versión, estado e invariantes.

RULE-RQW-033

Toda migración debe declarar compatibilidad, riesgo, preflight, verificación y recuperación.

RULE-RQW-034

Los cambios destructivos requieren aprobación, backup verificado y estrategia expand-contract.

RULE-RQW-035

Redis, colas y cachés no sustituyen la fuente transaccional oficial.

RULE-RQW-036

Todo worker debe tolerar reintentos y mensajes duplicados.

RULE-RQW-037

Todo lock distribuido debe tener owner, TTL, renovación y fencing cuando corresponda.

RULE-RQW-038

Todo resultado UNKNOWN requiere conciliación antes de repetir.

RULE-RQW-039

Todo backup debe estar cifrado, versionado, retenido y probado mediante restauración.

RULE-RQW-040

Todo procedimiento de recuperación debe declarar RPO, RTO, owner y criterios de éxito.

RULE-RQW-041

Toda dependencia debe tener timeout, retry limitado, backoff y observabilidad.

RULE-RQW-042

Los secretos nunca deben aparecer en repositorios, imágenes, logs o archivos de backup sin cifrado.

RULE-RQW-043

Toda acción privilegiada requiere autorización fuerte y evidencia.

RULE-RQW-044

Los tenants deben permanecer aislados en datos, backups, cachés, colas y restauraciones.

RULE-RQW-045

Toda falla crítica debe activar contención, alerta y runbook.

RULE-RQW-046

Toda operación debe ser reproducible, versionada, idempotente cuando aplique y auditable.

RULE-RQW-047

Toda modificación de datos debe validar tenant, versión, estado e invariantes.

RULE-RQW-048

Toda migración debe declarar compatibilidad, riesgo, preflight, verificación y recuperación.

RULE-RQW-049

Los cambios destructivos requieren aprobación, backup verificado y estrategia expand-contract.

RULE-RQW-050

Redis, colas y cachés no sustituyen la fuente transaccional oficial.

RULE-RQW-051

Todo worker debe tolerar reintentos y mensajes duplicados.

RULE-RQW-052

Todo lock distribuido debe tener owner, TTL, renovación y fencing cuando corresponda.

RULE-RQW-053

Todo resultado UNKNOWN requiere conciliación antes de repetir.

RULE-RQW-054

Todo backup debe estar cifrado, versionado, retenido y probado mediante restauración.

RULE-RQW-055

Todo procedimiento de recuperación debe declarar RPO, RTO, owner y criterios de éxito.

RULE-RQW-056

Toda dependencia debe tener timeout, retry limitado, backoff y observabilidad.

RULE-RQW-057

Los secretos nunca deben aparecer en repositorios, imágenes, logs o archivos de backup sin cifrado.

RULE-RQW-058

Toda acción privilegiada requiere autorización fuerte y evidencia.

RULE-RQW-059

Los tenants deben permanecer aislados en datos, backups, cachés, colas y restauraciones.

RULE-RQW-060

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

RQW_REQUEST_INVALID

RQW_AUTHENTICATION_REQUIRED

RQW_AUTHORIZATION_DENIED

RQW_TENANT_SCOPE_DENIED

RQW_ENVIRONMENT_SCOPE_DENIED

RQW_RESOURCE_NOT_FOUND

RQW_STATE_INVALID

RQW_VERSION_CONFLICT

RQW_IDEMPOTENCY_CONFLICT

RQW_APPROVAL_REQUIRED

RQW_APPROVAL_INVALID

RQW_CONCURRENCY_CONFLICT

RQW_LOCK_TIMEOUT

RQW_DEPENDENCY_UNAVAILABLE

RQW_TIMEOUT

RQW_RATE_LIMITED

RQW_INVARIANT_VIOLATION

RQW_POSTCONDITION_FAILED

RQW_RESULT_UNKNOWN

RQW_RECOVERY_FAILED

RQW_AUDIT_PERSISTENCE_FAILED

RQW_SECURITY_POLICY_DENIED

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

- 13_07_06_redis_queues_workers_requests_total;
- 13_07_06_redis_queues_workers_success_total;
- 13_07_06_redis_queues_workers_failure_total;
- 13_07_06_redis_queues_workers_duration_seconds;
- 13_07_06_redis_queues_workers_preflight_failure_total;
- 13_07_06_redis_queues_workers_approval_required_total;
- 13_07_06_redis_queues_workers_version_conflict_total;
- 13_07_06_redis_queues_workers_idempotency_hit_total;
- 13_07_06_redis_queues_workers_lock_timeout_total;
- 13_07_06_redis_queues_workers_unknown_total;
- 13_07_06_redis_queues_workers_recovery_total;
- 13_07_06_redis_queues_workers_recovery_failure_total;
- 13_07_06_redis_queues_workers_reconciliation_total;
- 13_07_06_redis_queues_workers_security_denied_total;
- 13_07_06_redis_queues_workers_audit_failure_total;
- 13_07_06_redis_queues_workers_active_operations;

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

TEST-RQW-001: verificar dos operaciones compiten por el mismo recurso; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-002: verificar la aprobación expira antes del commit; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-003: verificar el permiso se revoca durante la operación; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-004: verificar el tenant se suspende durante el flujo; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-005: verificar la dependencia responde después del timeout; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-006: verificar la misma Idempotency Key llega con payload distinto; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-007: verificar el resultado queda UNKNOWN; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-008: verificar el lock expira y el owner antiguo intenta escribir; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-009: verificar la recuperación también falla; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-010: verificar la auditoría está degradada; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-011: verificar un evento se duplica; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-012: verificar un evento llega fuera de orden; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-013: verificar un secreto es revocado; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-014: verificar una configuración cambia después del preflight; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-015: verificar un backup tiene checksum inválido; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-016: verificar una restauración mezcla tenants; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-017: verificar una migración es incompatible; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-018: verificar un worker procesa dos veces el mismo mensaje; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-019: verificar una cola conserva mensajes demasiado antiguos; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-020: verificar un cache stale devuelve un valor inseguro; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-021: verificar un actor intenta autoaprobarse; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-022: verificar un entorno usa credenciales equivocadas; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-023: verificar un failover produce split-brain; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-024: verificar un restore supera el RTO; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

TEST-RQW-025: verificar un backup no cumple el RPO; se debe preservar aislamiento, consistencia, idempotencia, versiones y evidencia.

## 26. Criterios de aceptación

AC-RQW-001

Toda operación está autenticada y autorizada.

AC-RQW-002

Toda operación respeta tenant y entorno.

AC-RQW-003

Toda modificación valida versión.

AC-RQW-004

Toda operación repetible usa idempotencia.

AC-RQW-005

Toda operación sensible exige reason.

AC-RQW-006

Toda operación crítica soporta approval.

AC-RQW-007

Toda aprobación se vincula al payload.

AC-RQW-008

Todo resultado UNKNOWN se concilia.

AC-RQW-009

Toda recuperación es explícita.

AC-RQW-010

Todo cambio valida postcondiciones.

AC-RQW-011

Los secretos no se exponen.

AC-RQW-012

Los backups están cifrados y verificados.

AC-RQW-013

Los workers toleran duplicados.

AC-RQW-014

Las métricas evitan alta cardinalidad.

AC-RQW-015

Toda operación es auditable.

AC-RQW-016

Toda operación está autenticada y autorizada.

AC-RQW-017

Toda operación respeta tenant y entorno.

AC-RQW-018

Toda modificación valida versión.

AC-RQW-019

Toda operación repetible usa idempotencia.

AC-RQW-020

Toda operación sensible exige reason.

AC-RQW-021

Toda operación crítica soporta approval.

AC-RQW-022

Toda aprobación se vincula al payload.

AC-RQW-023

Todo resultado UNKNOWN se concilia.

AC-RQW-024

Toda recuperación es explícita.

AC-RQW-025

Todo cambio valida postcondiciones.

AC-RQW-026

Los secretos no se exponen.

AC-RQW-027

Los backups están cifrados y verificados.

AC-RQW-028

Los workers toleran duplicados.

AC-RQW-029

Las métricas evitan alta cardinalidad.

AC-RQW-030

Toda operación es auditable.

AC-RQW-031

Toda operación está autenticada y autorizada.

AC-RQW-032

Toda operación respeta tenant y entorno.

AC-RQW-033

Toda modificación valida versión.

AC-RQW-034

Toda operación repetible usa idempotencia.

AC-RQW-035

Toda operación sensible exige reason.

AC-RQW-036

Toda operación crítica soporta approval.

AC-RQW-037

Toda aprobación se vincula al payload.

AC-RQW-038

Todo resultado UNKNOWN se concilia.

AC-RQW-039

Toda recuperación es explícita.

AC-RQW-040

Todo cambio valida postcondiciones.

AC-RQW-041

Los secretos no se exponen.

AC-RQW-042

Los backups están cifrados y verificados.

AC-RQW-043

Los workers toleran duplicados.

AC-RQW-044

Las métricas evitan alta cardinalidad.

AC-RQW-045

Toda operación es auditable.

AC-RQW-046

Toda operación está autenticada y autorizada.

AC-RQW-047

Toda operación respeta tenant y entorno.

AC-RQW-048

Toda modificación valida versión.

AC-RQW-049

Toda operación repetible usa idempotencia.

AC-RQW-050

Toda operación sensible exige reason.

AC-RQW-051

Toda operación crítica soporta approval.

AC-RQW-052

Toda aprobación se vincula al payload.

AC-RQW-053

Todo resultado UNKNOWN se concilia.

AC-RQW-054

Toda recuperación es explícita.

AC-RQW-055

Todo cambio valida postcondiciones.

AC-RQW-056

Los secretos no se exponen.

AC-RQW-057

Los backups están cifrados y verificados.

AC-RQW-058

Los workers toleran duplicados.

AC-RQW-059

Las métricas evitan alta cardinalidad.

AC-RQW-060

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
