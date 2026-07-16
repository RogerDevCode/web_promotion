======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-06-08-FEATURE-FLAGS-CONFIGURATION.md

# FEATURE FLAGS Y CONFIGURACIÓN VERSIONADA

## 1. Objetivo

Define cómo administrar configuraciones y feature flags tipadas, determinísticas, versionadas, reversibles y auditables.

## 2. Alcance

Configuration Items, Sets, Flags, targeting, porcentajes, cohorts, environment, tenant, región, fechas, defaults, validation, approvals, rollback, kill switches y cleanup.

## 3. Tipos y estados

BOOLEAN, INTEGER, DECIMAL, STRING, ENUM, DURATION, PERCENTAGE, LIST y STRUCTURED_OBJECT_VALIDATED. Estados DRAFT, VALIDATING, READY, SCHEDULED, ACTIVE, SUPERSEDED, DISABLED, ROLLED_BACK y EXPIRED.

## 4. Feature Flag

Toda flag tiene ID, key, description, type, safe default, owner, risk, version, status y expires_at si es temporal.

## 5. Precedencia

Kill switch global, environment override, tenant override, cohort, porcentaje y default.

## 6. Targeting

Sólo atributos autorizados; nunca PII arbitraria. Las reglas tienen priority, conditions, result, version y status.

## 7. Percentage Rollout

Hash determinístico con Flag ID, subject stable key y rollout seed.

## 8. Canary

Cohort, porcentaje, métricas, duración, owner, abort thresholds, progression y rollback.

## 9. Kill Switches

Feature, provider, channel, write, Realtime, payment e inventory. Preservan reconciliación y consistencia.

## 10. Configuration Sets

Agrupan valores compatibles y se activan atómicamente.

## 11. Validación y dry run

Schemas, types, ranges, dependencies, scopes, region, dates, owner y risk; el dry run muestra impacto sin efectos.

## 12. Expiración y cleanup

Las flags temporales vuelven a default seguro, alertan al owner y generan cleanup.

## 13. Fallo del servicio

FAIL_CLOSED, FAIL_OPEN o USE_LAST_KNOWN_GOOD según la criticidad.

## 14. Reglas normativas exhaustivas

FFC-001

Toda operación debe validar identidad, autorización, tenant, recurso, estado y versión antes de producir efectos.

FFC-002

Toda modificación con efecto debe usar una Idempotency Key estable y rechazar la misma clave con payload semántico diferente.

FFC-003

Los secretos, credenciales, tokens, firmas y referencias sensibles nunca deben exponerse al Cliente ni registrarse en claro.

FFC-004

Toda configuración debe ser tipada, validada, versionada, reversible cuando sea seguro y completamente auditable.

FFC-005

La ausencia de permiso explícito debe producir denegación y un evento de auditoría.

FFC-006

Las operaciones críticas deben soportar reason, aprobación independiente y segregación de funciones.

FFC-007

Los resultados UNKNOWN deben bloquear repeticiones ciegas e iniciar conciliación con evidencia.

FFC-008

Toda llamada externa debe tener timeout, presupuesto total, retry limitado y circuit breaker cuando corresponda.

FFC-009

Los tenants deben permanecer aislados en datos, cachés, secretos, eventos, métricas y operaciones.

FFC-010

Toda acción privilegiada debe generar evidencia estructurada, Request ID y Correlation ID.

FFC-011

Toda operación debe validar identidad, autorización, tenant, recurso, estado y versión antes de producir efectos.

FFC-012

Toda modificación con efecto debe usar una Idempotency Key estable y rechazar la misma clave con payload semántico diferente.

FFC-013

Los secretos, credenciales, tokens, firmas y referencias sensibles nunca deben exponerse al Cliente ni registrarse en claro.

FFC-014

Toda configuración debe ser tipada, validada, versionada, reversible cuando sea seguro y completamente auditable.

FFC-015

La ausencia de permiso explícito debe producir denegación y un evento de auditoría.

FFC-016

Las operaciones críticas deben soportar reason, aprobación independiente y segregación de funciones.

FFC-017

Los resultados UNKNOWN deben bloquear repeticiones ciegas e iniciar conciliación con evidencia.

FFC-018

Toda llamada externa debe tener timeout, presupuesto total, retry limitado y circuit breaker cuando corresponda.

FFC-019

Los tenants deben permanecer aislados en datos, cachés, secretos, eventos, métricas y operaciones.

FFC-020

Toda acción privilegiada debe generar evidencia estructurada, Request ID y Correlation ID.

FFC-021

Toda operación debe validar identidad, autorización, tenant, recurso, estado y versión antes de producir efectos.

FFC-022

Toda modificación con efecto debe usar una Idempotency Key estable y rechazar la misma clave con payload semántico diferente.

FFC-023

Los secretos, credenciales, tokens, firmas y referencias sensibles nunca deben exponerse al Cliente ni registrarse en claro.

FFC-024

Toda configuración debe ser tipada, validada, versionada, reversible cuando sea seguro y completamente auditable.

FFC-025

La ausencia de permiso explícito debe producir denegación y un evento de auditoría.

FFC-026

Las operaciones críticas deben soportar reason, aprobación independiente y segregación de funciones.

FFC-027

Los resultados UNKNOWN deben bloquear repeticiones ciegas e iniciar conciliación con evidencia.

FFC-028

Toda llamada externa debe tener timeout, presupuesto total, retry limitado y circuit breaker cuando corresponda.

FFC-029

Los tenants deben permanecer aislados en datos, cachés, secretos, eventos, métricas y operaciones.

FFC-030

Toda acción privilegiada debe generar evidencia estructurada, Request ID y Correlation ID.

FFC-031

Toda operación debe validar identidad, autorización, tenant, recurso, estado y versión antes de producir efectos.

FFC-032

Toda modificación con efecto debe usar una Idempotency Key estable y rechazar la misma clave con payload semántico diferente.

FFC-033

Los secretos, credenciales, tokens, firmas y referencias sensibles nunca deben exponerse al Cliente ni registrarse en claro.

FFC-034

Toda configuración debe ser tipada, validada, versionada, reversible cuando sea seguro y completamente auditable.

FFC-035

La ausencia de permiso explícito debe producir denegación y un evento de auditoría.

FFC-036

Las operaciones críticas deben soportar reason, aprobación independiente y segregación de funciones.

FFC-037

Los resultados UNKNOWN deben bloquear repeticiones ciegas e iniciar conciliación con evidencia.

FFC-038

Toda llamada externa debe tener timeout, presupuesto total, retry limitado y circuit breaker cuando corresponda.

FFC-039

Los tenants deben permanecer aislados en datos, cachés, secretos, eventos, métricas y operaciones.

FFC-040

Toda acción privilegiada debe generar evidencia estructurada, Request ID y Correlation ID.

FFC-041

Toda operación debe validar identidad, autorización, tenant, recurso, estado y versión antes de producir efectos.

FFC-042

Toda modificación con efecto debe usar una Idempotency Key estable y rechazar la misma clave con payload semántico diferente.

FFC-043

Los secretos, credenciales, tokens, firmas y referencias sensibles nunca deben exponerse al Cliente ni registrarse en claro.

FFC-044

Toda configuración debe ser tipada, validada, versionada, reversible cuando sea seguro y completamente auditable.

FFC-045

La ausencia de permiso explícito debe producir denegación y un evento de auditoría.

FFC-046

Las operaciones críticas deben soportar reason, aprobación independiente y segregación de funciones.

FFC-047

Los resultados UNKNOWN deben bloquear repeticiones ciegas e iniciar conciliación con evidencia.

FFC-048

Toda llamada externa debe tener timeout, presupuesto total, retry limitado y circuit breaker cuando corresponda.

FFC-049

Los tenants deben permanecer aislados en datos, cachés, secretos, eventos, métricas y operaciones.

FFC-050

Toda acción privilegiada debe generar evidencia estructurada, Request ID y Correlation ID.

FFC-051

Toda operación debe validar identidad, autorización, tenant, recurso, estado y versión antes de producir efectos.

FFC-052

Toda modificación con efecto debe usar una Idempotency Key estable y rechazar la misma clave con payload semántico diferente.

FFC-053

Los secretos, credenciales, tokens, firmas y referencias sensibles nunca deben exponerse al Cliente ni registrarse en claro.

FFC-054

Toda configuración debe ser tipada, validada, versionada, reversible cuando sea seguro y completamente auditable.

FFC-055

La ausencia de permiso explícito debe producir denegación y un evento de auditoría.

FFC-056

Las operaciones críticas deben soportar reason, aprobación independiente y segregación de funciones.

FFC-057

Los resultados UNKNOWN deben bloquear repeticiones ciegas e iniciar conciliación con evidencia.

FFC-058

Toda llamada externa debe tener timeout, presupuesto total, retry limitado y circuit breaker cuando corresponda.

FFC-059

Los tenants deben permanecer aislados en datos, cachés, secretos, eventos, métricas y operaciones.

FFC-060

Toda acción privilegiada debe generar evidencia estructurada, Request ID y Correlation ID.

## 15. Contrato JSON de referencia

```json
{
  "request_id": "UUID",
  "tenant_id": "UUID",
  "admin_session_id": "UUID",
  "resource_reference": "UUID_OR_OPAQUE",
  "expected_version": 7,
  "reason_code": "AUTHORIZED_CHANGE",
  "approval_reference": "UUID_OR_NULL",
  "idempotency_key": "STRING",
  "correlation_id": "UUID",
  "requested_at": "UTC_TIMESTAMP"
}
```

## 16. Flujo funcional completo

1. Recibir y validar el schema.
2. Autenticar la Admin Session.
3. Evaluar assurance y step-up.
4. Autorizar permiso, tenant y recurso.
5. Cargar estado actual.
6. Validar expected version.
7. Construir preview sin efectos.
8. Evaluar riesgo.
9. Validar reason y evidencia.
10. Validar approval si aplica.
11. Consultar idempotencia.
12. Ejecutar Command oficial.
13. Persistir estado, audit y outbox.
14. Emitir eventos.
15. Actualizar observabilidad.
16. Devolver resultado seguro.

## 17. Pseudocódigo

```text
function execute_admin_operation(command):

    validate_schema(command)
    session = load_admin_session(command.admin_session_id)
    validate_admin_session(session)
    authorize(session, command.tenant_id, command.permission, command.resource_reference)
    current = load_current_state(command.resource_reference)
    validate_expected_version(current.version, command.expected_version)
    preview = build_preview(command, current)
    validate_reason_and_evidence(command, preview)
    if preview.approval_required:
        validate_single_use_approval(command.approval_reference, hash_semantic_payload(command, preview))
    previous = get_idempotent_result(command.idempotency_key)
    if previous.exists:
        return previous
    result = execute_official_domain_command(command, current)
    persist_state_audit_outbox_and_idempotency(result, command)
    emit_events(result)
    return build_safe_result(result)
```

## 18. Catálogo de errores

FFC_NOT_FOUND

FFC_TENANT_MISMATCH

FFC_ACCESS_DENIED

FFC_SESSION_EXPIRED

FFC_ASSURANCE_INSUFFICIENT

FFC_REASON_REQUIRED

FFC_APPROVAL_REQUIRED

FFC_APPROVAL_INVALID

FFC_APPROVAL_EXPIRED

FFC_SELF_APPROVAL_DENIED

FFC_VERSION_CONFLICT

FFC_IDEMPOTENCY_CONFLICT

FFC_STATE_INVALID

FFC_VALIDATION_FAILED

FFC_DEPENDENCY_UNAVAILABLE

FFC_TIMEOUT

FFC_RESULT_UNKNOWN

FFC_ROLLBACK_NOT_ALLOWED

FFC_SECURITY_POLICY_DENIED

FFC_AUDIT_PERSISTENCE_FAILED

## 19. Eventos

OperationRequested

ValidationStarted

ValidationFailed

PreviewCreated

ApprovalRequested

ApprovalGranted

ApprovalRejected

OperationStarted

OperationCompleted

OperationFailed

OperationMarkedUnknown

RollbackRequested

RollbackCompleted

SecurityPolicyDenied

AuditEvidenceRecorded

## 20. Observabilidad

- ffc_requests_total;
- ffc_success_total;
- ffc_failure_total;
- ffc_validation_failure_total;
- ffc_authorization_denied_total;
- ffc_approval_required_total;
- ffc_approval_denied_total;
- ffc_version_conflict_total;
- ffc_idempotency_hit_total;
- ffc_unknown_total;
- ffc_rollback_total;
- ffc_duration_seconds;
- ffc_security_incident_total;
- ffc_audit_failure_total;

Dimensiones permitidas: operation, result, error_code, risk, approval_required y tenant_tier. Nunca usar IDs únicos, secretos, PII ni payloads completos como etiquetas.

## 21. Seguridad y amenazas

- Amenaza: escalamiento de privilegios. Control: autorización backend, tenant binding, schemas estrictos, versionado, approval vinculada al hash, idempotencia, límites, auditoría y pruebas adversariales.
- Amenaza: cross-tenant. Control: autorización backend, tenant binding, schemas estrictos, versionado, approval vinculada al hash, idempotencia, límites, auditoría y pruebas adversariales.
- Amenaza: replay de aprobación. Control: autorización backend, tenant binding, schemas estrictos, versionado, approval vinculada al hash, idempotencia, límites, auditoría y pruebas adversariales.
- Amenaza: reutilización de Idempotency Key. Control: autorización backend, tenant binding, schemas estrictos, versionado, approval vinculada al hash, idempotencia, límites, auditoría y pruebas adversariales.
- Amenaza: secreto expuesto. Control: autorización backend, tenant binding, schemas estrictos, versionado, approval vinculada al hash, idempotencia, límites, auditoría y pruebas adversariales.
- Amenaza: configuración stale. Control: autorización backend, tenant binding, schemas estrictos, versionado, approval vinculada al hash, idempotencia, límites, auditoría y pruebas adversariales.
- Amenaza: rollback inseguro. Control: autorización backend, tenant binding, schemas estrictos, versionado, approval vinculada al hash, idempotencia, límites, auditoría y pruebas adversariales.
- Amenaza: evento fuera de orden. Control: autorización backend, tenant binding, schemas estrictos, versionado, approval vinculada al hash, idempotencia, límites, auditoría y pruebas adversariales.
- Amenaza: exportación masiva. Control: autorización backend, tenant binding, schemas estrictos, versionado, approval vinculada al hash, idempotencia, límites, auditoría y pruebas adversariales.
- Amenaza: bypass de MFA. Control: autorización backend, tenant binding, schemas estrictos, versionado, approval vinculada al hash, idempotencia, límites, auditoría y pruebas adversariales.
- Amenaza: manipulación de payload. Control: autorización backend, tenant binding, schemas estrictos, versionado, approval vinculada al hash, idempotencia, límites, auditoría y pruebas adversariales.
- Amenaza: resultado UNKNOWN. Control: autorización backend, tenant binding, schemas estrictos, versionado, approval vinculada al hash, idempotencia, límites, auditoría y pruebas adversariales.
- Amenaza: auditoría degradada. Control: autorización backend, tenant binding, schemas estrictos, versionado, approval vinculada al hash, idempotencia, límites, auditoría y pruebas adversariales.
- Amenaza: cache poisoning. Control: autorización backend, tenant binding, schemas estrictos, versionado, approval vinculada al hash, idempotencia, límites, auditoría y pruebas adversariales.
- Amenaza: proveedor comprometido. Control: autorización backend, tenant binding, schemas estrictos, versionado, approval vinculada al hash, idempotencia, límites, auditoría y pruebas adversariales.

## 22. Casos límite y pruebas adversariales

TEST-FFC-001: verificar dos administradores modifican simultáneamente; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-002: verificar la aprobación expira antes de ejecutar; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-003: verificar el actor pierde permiso; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-004: verificar el tenant se suspende; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-005: verificar timeout después del efecto; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-006: verificar misma key con payload diferente; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-007: verificar recurso de otro tenant; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-008: verificar resultado externo UNKNOWN; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-009: verificar rollback a versión insegura; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-010: verificar auditoría degradada; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-011: verificar Session expirada; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-012: verificar evento duplicado; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-013: verificar secreto revocado; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-014: verificar archivo malicioso; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-015: verificar límite excedido; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-016: verificar autoaprobación; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-017: verificar cache stale; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-018: verificar exportación masiva; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-019: verificar kill switch durante escritura; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-FFC-020: verificar recuperación con avalancha; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

## 23. Matriz de QA

- unit: debe cubrir éxito, rechazo, timeout, concurrencia, duplicados, ordering, tenant, permisos, versionado, idempotencia y observabilidad.
- component: debe cubrir éxito, rechazo, timeout, concurrencia, duplicados, ordering, tenant, permisos, versionado, idempotencia y observabilidad.
- contract: debe cubrir éxito, rechazo, timeout, concurrencia, duplicados, ordering, tenant, permisos, versionado, idempotencia y observabilidad.
- integration: debe cubrir éxito, rechazo, timeout, concurrencia, duplicados, ordering, tenant, permisos, versionado, idempotencia y observabilidad.
- E2E: debe cubrir éxito, rechazo, timeout, concurrencia, duplicados, ordering, tenant, permisos, versionado, idempotencia y observabilidad.
- security: debe cubrir éxito, rechazo, timeout, concurrencia, duplicados, ordering, tenant, permisos, versionado, idempotencia y observabilidad.
- privacy: debe cubrir éxito, rechazo, timeout, concurrencia, duplicados, ordering, tenant, permisos, versionado, idempotencia y observabilidad.
- performance: debe cubrir éxito, rechazo, timeout, concurrencia, duplicados, ordering, tenant, permisos, versionado, idempotencia y observabilidad.
- resilience: debe cubrir éxito, rechazo, timeout, concurrencia, duplicados, ordering, tenant, permisos, versionado, idempotencia y observabilidad.
- chaos: debe cubrir éxito, rechazo, timeout, concurrencia, duplicados, ordering, tenant, permisos, versionado, idempotencia y observabilidad.
- mutation: debe cubrir éxito, rechazo, timeout, concurrencia, duplicados, ordering, tenant, permisos, versionado, idempotencia y observabilidad.
- property-based: debe cubrir éxito, rechazo, timeout, concurrencia, duplicados, ordering, tenant, permisos, versionado, idempotencia y observabilidad.
- regression: debe cubrir éxito, rechazo, timeout, concurrencia, duplicados, ordering, tenant, permisos, versionado, idempotencia y observabilidad.
- canary: debe cubrir éxito, rechazo, timeout, concurrencia, duplicados, ordering, tenant, permisos, versionado, idempotencia y observabilidad.
- rollback: debe cubrir éxito, rechazo, timeout, concurrencia, duplicados, ordering, tenant, permisos, versionado, idempotencia y observabilidad.

## 24. Criterios de aceptación

AC-FFC-001

La operación requiere Admin Session válida.

AC-FFC-002

La operación valida tenant y recurso.

AC-FFC-003

La operación valida expected version.

AC-FFC-004

La operación usa Idempotency Key.

AC-FFC-005

La operación requiere reason cuando corresponde.

AC-FFC-006

La operación soporta aprobación independiente.

AC-FFC-007

La operación vincula approval al payload.

AC-FFC-008

La operación no expone secretos.

AC-FFC-009

La operación concilia UNKNOWN.

AC-FFC-010

La operación conserva before/after.

AC-FFC-011

La operación hace rollback explícito.

AC-FFC-012

La operación traza denegaciones.

AC-FFC-013

La operación no filtra otros tenants.

AC-FFC-014

La operación evita alta cardinalidad.

AC-FFC-015

La operación audita toda acción.

AC-FFC-016

La operación requiere Admin Session válida.

AC-FFC-017

La operación valida tenant y recurso.

AC-FFC-018

La operación valida expected version.

AC-FFC-019

La operación usa Idempotency Key.

AC-FFC-020

La operación requiere reason cuando corresponde.

AC-FFC-021

La operación soporta aprobación independiente.

AC-FFC-022

La operación vincula approval al payload.

AC-FFC-023

La operación no expone secretos.

AC-FFC-024

La operación concilia UNKNOWN.

AC-FFC-025

La operación conserva before/after.

AC-FFC-026

La operación hace rollback explícito.

AC-FFC-027

La operación traza denegaciones.

AC-FFC-028

La operación no filtra otros tenants.

AC-FFC-029

La operación evita alta cardinalidad.

AC-FFC-030

La operación audita toda acción.

AC-FFC-031

La operación requiere Admin Session válida.

AC-FFC-032

La operación valida tenant y recurso.

AC-FFC-033

La operación valida expected version.

AC-FFC-034

La operación usa Idempotency Key.

AC-FFC-035

La operación requiere reason cuando corresponde.

AC-FFC-036

La operación soporta aprobación independiente.

AC-FFC-037

La operación vincula approval al payload.

AC-FFC-038

La operación no expone secretos.

AC-FFC-039

La operación concilia UNKNOWN.

AC-FFC-040

La operación conserva before/after.

AC-FFC-041

La operación hace rollback explícito.

AC-FFC-042

La operación traza denegaciones.

AC-FFC-043

La operación no filtra otros tenants.

AC-FFC-044

La operación evita alta cardinalidad.

AC-FFC-045

La operación audita toda acción.

## 25. Checklist final

[ ] Identificador estable.
[ ] Tenant scope.
[ ] Admin Session.
[ ] Autorización.
[ ] Assurance policy.
[ ] Reason.
[ ] Approval policy.
[ ] Expected version.
[ ] Idempotency Key.
[ ] Preview.
[ ] Dry run.
[ ] Rollback.
[ ] UNKNOWN policy.
[ ] Errores estables.
[ ] Eventos.
[ ] Métricas.
[ ] Trazas.
[ ] Auditoría.
[ ] Seguridad.
[ ] Pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
