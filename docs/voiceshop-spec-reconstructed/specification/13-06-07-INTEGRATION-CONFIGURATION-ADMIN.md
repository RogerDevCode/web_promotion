======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-06-07-INTEGRATION-CONFIGURATION-ADMIN.md

# ADMINISTRACIÓN DE INTEGRACIONES Y PROVEEDORES

## 1. Objetivo

Define cómo configurar, validar, activar, desactivar, rotar, supervisar y recuperar integraciones externas sin exponer secretos ni evitar las reglas del dominio.

## 2. Alcance

Registro de proveedores, asignación por tenant, capacidades, regiones, Secret References, rotación, webhooks, resilience, health checks, enable/disable, maintenance, failover, dry run, approvals, rollback y QA.

## 3. Estados

DRAFT, VALIDATING, VALIDATION_FAILED, READY_FOR_REVIEW, APPROVAL_PENDING, APPROVED, ACTIVATING, ACTIVE, DEGRADED, MAINTENANCE, DISABLING, DISABLED, REVOKED, FAILED y UNKNOWN.

## 4. Provider Registration

Cada proveedor declara ID, clase, adapter version, API versions, capabilities, regiones, autenticación, webhooks, límites, retención, residencia, owner, riesgo y estado.

## 5. Tenant Provider Assignment

Valida tenant activo, entitlement, región, privacidad, compatibilidad, provider status, Secret References y capacidades.

## 6. Secretos y rotación

La administración sólo manipula referencias. La rotación usa nueva versión, prueba no comercial, ventana dual, cambio de binding, observación y revocación.

## 7. Webhooks

La configuración incluye firma, secret reference, replay window, schema, límites, tenant mapping, endpoint y status.

## 8. Resiliencia

Timeouts, retries, circuits, bulkheads, queues, fallback y failover son tipados, acotados y versionados.

## 9. Health Checks

Liveness, readiness, capability, authentication, webhook y synthetic no comercial. Nunca crean pedidos, pagos, reservas o mensajes reales.

## 10. Activación y desactivación

La activación exige validación, secrets activos, región permitida, health, approval, idempotency y expected version. La desactivación preserva consistencia.

## 11. Failover

El failover de escritura queda prohibido cuando el primary pudo producir el efecto y el resultado permanece UNKNOWN.

## 12. Versionado y rollback

Cada cambio registra before, after, version, reason, approval, actor, health y rollback. No se restaura un secreto comprometido.

## 13. Reglas normativas exhaustivas

IADM-001

Toda operación debe validar identidad, autorización, tenant, recurso, estado y versión antes de producir efectos.

IADM-002

Toda modificación con efecto debe usar una Idempotency Key estable y rechazar la misma clave con payload semántico diferente.

IADM-003

Los secretos, credenciales, tokens, firmas y referencias sensibles nunca deben exponerse al Cliente ni registrarse en claro.

IADM-004

Toda configuración debe ser tipada, validada, versionada, reversible cuando sea seguro y completamente auditable.

IADM-005

La ausencia de permiso explícito debe producir denegación y un evento de auditoría.

IADM-006

Las operaciones críticas deben soportar reason, aprobación independiente y segregación de funciones.

IADM-007

Los resultados UNKNOWN deben bloquear repeticiones ciegas e iniciar conciliación con evidencia.

IADM-008

Toda llamada externa debe tener timeout, presupuesto total, retry limitado y circuit breaker cuando corresponda.

IADM-009

Los tenants deben permanecer aislados en datos, cachés, secretos, eventos, métricas y operaciones.

IADM-010

Toda acción privilegiada debe generar evidencia estructurada, Request ID y Correlation ID.

IADM-011

Toda operación debe validar identidad, autorización, tenant, recurso, estado y versión antes de producir efectos.

IADM-012

Toda modificación con efecto debe usar una Idempotency Key estable y rechazar la misma clave con payload semántico diferente.

IADM-013

Los secretos, credenciales, tokens, firmas y referencias sensibles nunca deben exponerse al Cliente ni registrarse en claro.

IADM-014

Toda configuración debe ser tipada, validada, versionada, reversible cuando sea seguro y completamente auditable.

IADM-015

La ausencia de permiso explícito debe producir denegación y un evento de auditoría.

IADM-016

Las operaciones críticas deben soportar reason, aprobación independiente y segregación de funciones.

IADM-017

Los resultados UNKNOWN deben bloquear repeticiones ciegas e iniciar conciliación con evidencia.

IADM-018

Toda llamada externa debe tener timeout, presupuesto total, retry limitado y circuit breaker cuando corresponda.

IADM-019

Los tenants deben permanecer aislados en datos, cachés, secretos, eventos, métricas y operaciones.

IADM-020

Toda acción privilegiada debe generar evidencia estructurada, Request ID y Correlation ID.

IADM-021

Toda operación debe validar identidad, autorización, tenant, recurso, estado y versión antes de producir efectos.

IADM-022

Toda modificación con efecto debe usar una Idempotency Key estable y rechazar la misma clave con payload semántico diferente.

IADM-023

Los secretos, credenciales, tokens, firmas y referencias sensibles nunca deben exponerse al Cliente ni registrarse en claro.

IADM-024

Toda configuración debe ser tipada, validada, versionada, reversible cuando sea seguro y completamente auditable.

IADM-025

La ausencia de permiso explícito debe producir denegación y un evento de auditoría.

IADM-026

Las operaciones críticas deben soportar reason, aprobación independiente y segregación de funciones.

IADM-027

Los resultados UNKNOWN deben bloquear repeticiones ciegas e iniciar conciliación con evidencia.

IADM-028

Toda llamada externa debe tener timeout, presupuesto total, retry limitado y circuit breaker cuando corresponda.

IADM-029

Los tenants deben permanecer aislados en datos, cachés, secretos, eventos, métricas y operaciones.

IADM-030

Toda acción privilegiada debe generar evidencia estructurada, Request ID y Correlation ID.

IADM-031

Toda operación debe validar identidad, autorización, tenant, recurso, estado y versión antes de producir efectos.

IADM-032

Toda modificación con efecto debe usar una Idempotency Key estable y rechazar la misma clave con payload semántico diferente.

IADM-033

Los secretos, credenciales, tokens, firmas y referencias sensibles nunca deben exponerse al Cliente ni registrarse en claro.

IADM-034

Toda configuración debe ser tipada, validada, versionada, reversible cuando sea seguro y completamente auditable.

IADM-035

La ausencia de permiso explícito debe producir denegación y un evento de auditoría.

IADM-036

Las operaciones críticas deben soportar reason, aprobación independiente y segregación de funciones.

IADM-037

Los resultados UNKNOWN deben bloquear repeticiones ciegas e iniciar conciliación con evidencia.

IADM-038

Toda llamada externa debe tener timeout, presupuesto total, retry limitado y circuit breaker cuando corresponda.

IADM-039

Los tenants deben permanecer aislados en datos, cachés, secretos, eventos, métricas y operaciones.

IADM-040

Toda acción privilegiada debe generar evidencia estructurada, Request ID y Correlation ID.

IADM-041

Toda operación debe validar identidad, autorización, tenant, recurso, estado y versión antes de producir efectos.

IADM-042

Toda modificación con efecto debe usar una Idempotency Key estable y rechazar la misma clave con payload semántico diferente.

IADM-043

Los secretos, credenciales, tokens, firmas y referencias sensibles nunca deben exponerse al Cliente ni registrarse en claro.

IADM-044

Toda configuración debe ser tipada, validada, versionada, reversible cuando sea seguro y completamente auditable.

IADM-045

La ausencia de permiso explícito debe producir denegación y un evento de auditoría.

IADM-046

Las operaciones críticas deben soportar reason, aprobación independiente y segregación de funciones.

IADM-047

Los resultados UNKNOWN deben bloquear repeticiones ciegas e iniciar conciliación con evidencia.

IADM-048

Toda llamada externa debe tener timeout, presupuesto total, retry limitado y circuit breaker cuando corresponda.

IADM-049

Los tenants deben permanecer aislados en datos, cachés, secretos, eventos, métricas y operaciones.

IADM-050

Toda acción privilegiada debe generar evidencia estructurada, Request ID y Correlation ID.

IADM-051

Toda operación debe validar identidad, autorización, tenant, recurso, estado y versión antes de producir efectos.

IADM-052

Toda modificación con efecto debe usar una Idempotency Key estable y rechazar la misma clave con payload semántico diferente.

IADM-053

Los secretos, credenciales, tokens, firmas y referencias sensibles nunca deben exponerse al Cliente ni registrarse en claro.

IADM-054

Toda configuración debe ser tipada, validada, versionada, reversible cuando sea seguro y completamente auditable.

IADM-055

La ausencia de permiso explícito debe producir denegación y un evento de auditoría.

IADM-056

Las operaciones críticas deben soportar reason, aprobación independiente y segregación de funciones.

IADM-057

Los resultados UNKNOWN deben bloquear repeticiones ciegas e iniciar conciliación con evidencia.

IADM-058

Toda llamada externa debe tener timeout, presupuesto total, retry limitado y circuit breaker cuando corresponda.

IADM-059

Los tenants deben permanecer aislados en datos, cachés, secretos, eventos, métricas y operaciones.

IADM-060

Toda acción privilegiada debe generar evidencia estructurada, Request ID y Correlation ID.

## 14. Contrato JSON de referencia

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

## 15. Flujo funcional completo

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

## 16. Pseudocódigo

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

## 17. Catálogo de errores

IADM_NOT_FOUND

IADM_TENANT_MISMATCH

IADM_ACCESS_DENIED

IADM_SESSION_EXPIRED

IADM_ASSURANCE_INSUFFICIENT

IADM_REASON_REQUIRED

IADM_APPROVAL_REQUIRED

IADM_APPROVAL_INVALID

IADM_APPROVAL_EXPIRED

IADM_SELF_APPROVAL_DENIED

IADM_VERSION_CONFLICT

IADM_IDEMPOTENCY_CONFLICT

IADM_STATE_INVALID

IADM_VALIDATION_FAILED

IADM_DEPENDENCY_UNAVAILABLE

IADM_TIMEOUT

IADM_RESULT_UNKNOWN

IADM_ROLLBACK_NOT_ALLOWED

IADM_SECURITY_POLICY_DENIED

IADM_AUDIT_PERSISTENCE_FAILED

## 18. Eventos

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

## 19. Observabilidad

- iadm_requests_total;
- iadm_success_total;
- iadm_failure_total;
- iadm_validation_failure_total;
- iadm_authorization_denied_total;
- iadm_approval_required_total;
- iadm_approval_denied_total;
- iadm_version_conflict_total;
- iadm_idempotency_hit_total;
- iadm_unknown_total;
- iadm_rollback_total;
- iadm_duration_seconds;
- iadm_security_incident_total;
- iadm_audit_failure_total;

Dimensiones permitidas: operation, result, error_code, risk, approval_required y tenant_tier. Nunca usar IDs únicos, secretos, PII ni payloads completos como etiquetas.

## 20. Seguridad y amenazas

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

## 21. Casos límite y pruebas adversariales

TEST-IADM-001: verificar dos administradores modifican simultáneamente; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-002: verificar la aprobación expira antes de ejecutar; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-003: verificar el actor pierde permiso; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-004: verificar el tenant se suspende; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-005: verificar timeout después del efecto; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-006: verificar misma key con payload diferente; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-007: verificar recurso de otro tenant; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-008: verificar resultado externo UNKNOWN; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-009: verificar rollback a versión insegura; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-010: verificar auditoría degradada; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-011: verificar Session expirada; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-012: verificar evento duplicado; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-013: verificar secreto revocado; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-014: verificar archivo malicioso; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-015: verificar límite excedido; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-016: verificar autoaprobación; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-017: verificar cache stale; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-018: verificar exportación masiva; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-019: verificar kill switch durante escritura; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-IADM-020: verificar recuperación con avalancha; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

## 22. Matriz de QA

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

## 23. Criterios de aceptación

AC-IADM-001

La operación requiere Admin Session válida.

AC-IADM-002

La operación valida tenant y recurso.

AC-IADM-003

La operación valida expected version.

AC-IADM-004

La operación usa Idempotency Key.

AC-IADM-005

La operación requiere reason cuando corresponde.

AC-IADM-006

La operación soporta aprobación independiente.

AC-IADM-007

La operación vincula approval al payload.

AC-IADM-008

La operación no expone secretos.

AC-IADM-009

La operación concilia UNKNOWN.

AC-IADM-010

La operación conserva before/after.

AC-IADM-011

La operación hace rollback explícito.

AC-IADM-012

La operación traza denegaciones.

AC-IADM-013

La operación no filtra otros tenants.

AC-IADM-014

La operación evita alta cardinalidad.

AC-IADM-015

La operación audita toda acción.

AC-IADM-016

La operación requiere Admin Session válida.

AC-IADM-017

La operación valida tenant y recurso.

AC-IADM-018

La operación valida expected version.

AC-IADM-019

La operación usa Idempotency Key.

AC-IADM-020

La operación requiere reason cuando corresponde.

AC-IADM-021

La operación soporta aprobación independiente.

AC-IADM-022

La operación vincula approval al payload.

AC-IADM-023

La operación no expone secretos.

AC-IADM-024

La operación concilia UNKNOWN.

AC-IADM-025

La operación conserva before/after.

AC-IADM-026

La operación hace rollback explícito.

AC-IADM-027

La operación traza denegaciones.

AC-IADM-028

La operación no filtra otros tenants.

AC-IADM-029

La operación evita alta cardinalidad.

AC-IADM-030

La operación audita toda acción.

AC-IADM-031

La operación requiere Admin Session válida.

AC-IADM-032

La operación valida tenant y recurso.

AC-IADM-033

La operación valida expected version.

AC-IADM-034

La operación usa Idempotency Key.

AC-IADM-035

La operación requiere reason cuando corresponde.

AC-IADM-036

La operación soporta aprobación independiente.

AC-IADM-037

La operación vincula approval al payload.

AC-IADM-038

La operación no expone secretos.

AC-IADM-039

La operación concilia UNKNOWN.

AC-IADM-040

La operación conserva before/after.

AC-IADM-041

La operación hace rollback explícito.

AC-IADM-042

La operación traza denegaciones.

AC-IADM-043

La operación no filtra otros tenants.

AC-IADM-044

La operación evita alta cardinalidad.

AC-IADM-045

La operación audita toda acción.

## 24. Checklist final

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
