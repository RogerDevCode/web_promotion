======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-06-09-AUDIT-INCIDENTS.md

# AUDITORÍA E INCIDENTES ADMINISTRATIVOS

## 1. Objetivo

Define cómo registrar evidencia de auditoría y gestionar incidentes operativos, financieros, de privacidad y seguridad.

## 2. Alcance

Audit Events, lecturas sensibles, before/after, approvals, break-glass, incidentes, evidence, chain of custody, containment, remediation, recovery y PIR.

## 3. Audit Event

ID, type, actor/service, tenant/scope, resource, action, result, trusted timestamp, Correlation ID y schema version.

## 4. Inmutabilidad e integridad

Los eventos no se editan; las correcciones son eventos nuevos. Puede usarse append-only, hashes, firmas, WORM y checksums.

## 5. Acceso y exportación

Permission, tenant, field profile, reason, AAL, rango, cifrado, expiry, limits y audit.

## 6. Incident Model

Incident ID, type, severity, status, owner, commander, timestamps, affected resources y correlation references.

## 7. Severidades

SEV0 extremo, SEV1 alto, SEV2 moderado, SEV3 bajo y SEV4 informativo.

## 8. Estados

DETECTED, TRIAGING, OPEN, CONTAINING, CONTAINED, INVESTIGATING, REMEDIATING, RECOVERING, MONITORING, RESOLVED, CLOSED, REOPENED y FALSE_POSITIVE.

## 9. Triage

Hechos, alcance, tenants, operaciones, datos, riesgo financiero, threat activity y acciones inmediatas.

## 10. Contención

Rotate secrets, disable provider, open circuit, kill switch, suspend writes, isolate tenant y preserve reconciliation.

## 11. Evidencia

Evidence ID, type, reference, checksum, collector, timestamp, classification, status y custody history.

## 12. Remediación y recuperación

Commands o scripts aprobados, dry run, snapshot, approval, idempotency, verification y rollback.

## 13. Post-Incident Review

Resumen, impacto, timeline, causa o incertidumbre, factores, acciones, owners, deadlines y pruebas de no recurrencia.

## 14. Reglas normativas exhaustivas

AINC-001

Toda operación debe validar identidad, autorización, tenant, recurso, estado y versión antes de producir efectos.

AINC-002

Toda modificación con efecto debe usar una Idempotency Key estable y rechazar la misma clave con payload semántico diferente.

AINC-003

Los secretos, credenciales, tokens, firmas y referencias sensibles nunca deben exponerse al Cliente ni registrarse en claro.

AINC-004

Toda configuración debe ser tipada, validada, versionada, reversible cuando sea seguro y completamente auditable.

AINC-005

La ausencia de permiso explícito debe producir denegación y un evento de auditoría.

AINC-006

Las operaciones críticas deben soportar reason, aprobación independiente y segregación de funciones.

AINC-007

Los resultados UNKNOWN deben bloquear repeticiones ciegas e iniciar conciliación con evidencia.

AINC-008

Toda llamada externa debe tener timeout, presupuesto total, retry limitado y circuit breaker cuando corresponda.

AINC-009

Los tenants deben permanecer aislados en datos, cachés, secretos, eventos, métricas y operaciones.

AINC-010

Toda acción privilegiada debe generar evidencia estructurada, Request ID y Correlation ID.

AINC-011

Toda operación debe validar identidad, autorización, tenant, recurso, estado y versión antes de producir efectos.

AINC-012

Toda modificación con efecto debe usar una Idempotency Key estable y rechazar la misma clave con payload semántico diferente.

AINC-013

Los secretos, credenciales, tokens, firmas y referencias sensibles nunca deben exponerse al Cliente ni registrarse en claro.

AINC-014

Toda configuración debe ser tipada, validada, versionada, reversible cuando sea seguro y completamente auditable.

AINC-015

La ausencia de permiso explícito debe producir denegación y un evento de auditoría.

AINC-016

Las operaciones críticas deben soportar reason, aprobación independiente y segregación de funciones.

AINC-017

Los resultados UNKNOWN deben bloquear repeticiones ciegas e iniciar conciliación con evidencia.

AINC-018

Toda llamada externa debe tener timeout, presupuesto total, retry limitado y circuit breaker cuando corresponda.

AINC-019

Los tenants deben permanecer aislados en datos, cachés, secretos, eventos, métricas y operaciones.

AINC-020

Toda acción privilegiada debe generar evidencia estructurada, Request ID y Correlation ID.

AINC-021

Toda operación debe validar identidad, autorización, tenant, recurso, estado y versión antes de producir efectos.

AINC-022

Toda modificación con efecto debe usar una Idempotency Key estable y rechazar la misma clave con payload semántico diferente.

AINC-023

Los secretos, credenciales, tokens, firmas y referencias sensibles nunca deben exponerse al Cliente ni registrarse en claro.

AINC-024

Toda configuración debe ser tipada, validada, versionada, reversible cuando sea seguro y completamente auditable.

AINC-025

La ausencia de permiso explícito debe producir denegación y un evento de auditoría.

AINC-026

Las operaciones críticas deben soportar reason, aprobación independiente y segregación de funciones.

AINC-027

Los resultados UNKNOWN deben bloquear repeticiones ciegas e iniciar conciliación con evidencia.

AINC-028

Toda llamada externa debe tener timeout, presupuesto total, retry limitado y circuit breaker cuando corresponda.

AINC-029

Los tenants deben permanecer aislados en datos, cachés, secretos, eventos, métricas y operaciones.

AINC-030

Toda acción privilegiada debe generar evidencia estructurada, Request ID y Correlation ID.

AINC-031

Toda operación debe validar identidad, autorización, tenant, recurso, estado y versión antes de producir efectos.

AINC-032

Toda modificación con efecto debe usar una Idempotency Key estable y rechazar la misma clave con payload semántico diferente.

AINC-033

Los secretos, credenciales, tokens, firmas y referencias sensibles nunca deben exponerse al Cliente ni registrarse en claro.

AINC-034

Toda configuración debe ser tipada, validada, versionada, reversible cuando sea seguro y completamente auditable.

AINC-035

La ausencia de permiso explícito debe producir denegación y un evento de auditoría.

AINC-036

Las operaciones críticas deben soportar reason, aprobación independiente y segregación de funciones.

AINC-037

Los resultados UNKNOWN deben bloquear repeticiones ciegas e iniciar conciliación con evidencia.

AINC-038

Toda llamada externa debe tener timeout, presupuesto total, retry limitado y circuit breaker cuando corresponda.

AINC-039

Los tenants deben permanecer aislados en datos, cachés, secretos, eventos, métricas y operaciones.

AINC-040

Toda acción privilegiada debe generar evidencia estructurada, Request ID y Correlation ID.

AINC-041

Toda operación debe validar identidad, autorización, tenant, recurso, estado y versión antes de producir efectos.

AINC-042

Toda modificación con efecto debe usar una Idempotency Key estable y rechazar la misma clave con payload semántico diferente.

AINC-043

Los secretos, credenciales, tokens, firmas y referencias sensibles nunca deben exponerse al Cliente ni registrarse en claro.

AINC-044

Toda configuración debe ser tipada, validada, versionada, reversible cuando sea seguro y completamente auditable.

AINC-045

La ausencia de permiso explícito debe producir denegación y un evento de auditoría.

AINC-046

Las operaciones críticas deben soportar reason, aprobación independiente y segregación de funciones.

AINC-047

Los resultados UNKNOWN deben bloquear repeticiones ciegas e iniciar conciliación con evidencia.

AINC-048

Toda llamada externa debe tener timeout, presupuesto total, retry limitado y circuit breaker cuando corresponda.

AINC-049

Los tenants deben permanecer aislados en datos, cachés, secretos, eventos, métricas y operaciones.

AINC-050

Toda acción privilegiada debe generar evidencia estructurada, Request ID y Correlation ID.

AINC-051

Toda operación debe validar identidad, autorización, tenant, recurso, estado y versión antes de producir efectos.

AINC-052

Toda modificación con efecto debe usar una Idempotency Key estable y rechazar la misma clave con payload semántico diferente.

AINC-053

Los secretos, credenciales, tokens, firmas y referencias sensibles nunca deben exponerse al Cliente ni registrarse en claro.

AINC-054

Toda configuración debe ser tipada, validada, versionada, reversible cuando sea seguro y completamente auditable.

AINC-055

La ausencia de permiso explícito debe producir denegación y un evento de auditoría.

AINC-056

Las operaciones críticas deben soportar reason, aprobación independiente y segregación de funciones.

AINC-057

Los resultados UNKNOWN deben bloquear repeticiones ciegas e iniciar conciliación con evidencia.

AINC-058

Toda llamada externa debe tener timeout, presupuesto total, retry limitado y circuit breaker cuando corresponda.

AINC-059

Los tenants deben permanecer aislados en datos, cachés, secretos, eventos, métricas y operaciones.

AINC-060

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

AINC_NOT_FOUND

AINC_TENANT_MISMATCH

AINC_ACCESS_DENIED

AINC_SESSION_EXPIRED

AINC_ASSURANCE_INSUFFICIENT

AINC_REASON_REQUIRED

AINC_APPROVAL_REQUIRED

AINC_APPROVAL_INVALID

AINC_APPROVAL_EXPIRED

AINC_SELF_APPROVAL_DENIED

AINC_VERSION_CONFLICT

AINC_IDEMPOTENCY_CONFLICT

AINC_STATE_INVALID

AINC_VALIDATION_FAILED

AINC_DEPENDENCY_UNAVAILABLE

AINC_TIMEOUT

AINC_RESULT_UNKNOWN

AINC_ROLLBACK_NOT_ALLOWED

AINC_SECURITY_POLICY_DENIED

AINC_AUDIT_PERSISTENCE_FAILED

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

- ainc_requests_total;
- ainc_success_total;
- ainc_failure_total;
- ainc_validation_failure_total;
- ainc_authorization_denied_total;
- ainc_approval_required_total;
- ainc_approval_denied_total;
- ainc_version_conflict_total;
- ainc_idempotency_hit_total;
- ainc_unknown_total;
- ainc_rollback_total;
- ainc_duration_seconds;
- ainc_security_incident_total;
- ainc_audit_failure_total;

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

TEST-AINC-001: verificar dos administradores modifican simultáneamente; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-002: verificar la aprobación expira antes de ejecutar; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-003: verificar el actor pierde permiso; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-004: verificar el tenant se suspende; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-005: verificar timeout después del efecto; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-006: verificar misma key con payload diferente; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-007: verificar recurso de otro tenant; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-008: verificar resultado externo UNKNOWN; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-009: verificar rollback a versión insegura; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-010: verificar auditoría degradada; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-011: verificar Session expirada; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-012: verificar evento duplicado; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-013: verificar secreto revocado; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-014: verificar archivo malicioso; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-015: verificar límite excedido; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-016: verificar autoaprobación; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-017: verificar cache stale; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-018: verificar exportación masiva; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-019: verificar kill switch durante escritura; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

TEST-AINC-020: verificar recuperación con avalancha; el sistema debe preservar tenant, seguridad, idempotencia, versiones, evidencia y trazabilidad.

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

AC-AINC-001

La operación requiere Admin Session válida.

AC-AINC-002

La operación valida tenant y recurso.

AC-AINC-003

La operación valida expected version.

AC-AINC-004

La operación usa Idempotency Key.

AC-AINC-005

La operación requiere reason cuando corresponde.

AC-AINC-006

La operación soporta aprobación independiente.

AC-AINC-007

La operación vincula approval al payload.

AC-AINC-008

La operación no expone secretos.

AC-AINC-009

La operación concilia UNKNOWN.

AC-AINC-010

La operación conserva before/after.

AC-AINC-011

La operación hace rollback explícito.

AC-AINC-012

La operación traza denegaciones.

AC-AINC-013

La operación no filtra otros tenants.

AC-AINC-014

La operación evita alta cardinalidad.

AC-AINC-015

La operación audita toda acción.

AC-AINC-016

La operación requiere Admin Session válida.

AC-AINC-017

La operación valida tenant y recurso.

AC-AINC-018

La operación valida expected version.

AC-AINC-019

La operación usa Idempotency Key.

AC-AINC-020

La operación requiere reason cuando corresponde.

AC-AINC-021

La operación soporta aprobación independiente.

AC-AINC-022

La operación vincula approval al payload.

AC-AINC-023

La operación no expone secretos.

AC-AINC-024

La operación concilia UNKNOWN.

AC-AINC-025

La operación conserva before/after.

AC-AINC-026

La operación hace rollback explícito.

AC-AINC-027

La operación traza denegaciones.

AC-AINC-028

La operación no filtra otros tenants.

AC-AINC-029

La operación evita alta cardinalidad.

AC-AINC-030

La operación audita toda acción.

AC-AINC-031

La operación requiere Admin Session válida.

AC-AINC-032

La operación valida tenant y recurso.

AC-AINC-033

La operación valida expected version.

AC-AINC-034

La operación usa Idempotency Key.

AC-AINC-035

La operación requiere reason cuando corresponde.

AC-AINC-036

La operación soporta aprobación independiente.

AC-AINC-037

La operación vincula approval al payload.

AC-AINC-038

La operación no expone secretos.

AC-AINC-039

La operación concilia UNKNOWN.

AC-AINC-040

La operación conserva before/after.

AC-AINC-041

La operación hace rollback explícito.

AC-AINC-042

La operación traza denegaciones.

AC-AINC-043

La operación no filtra otros tenants.

AC-AINC-044

La operación evita alta cardinalidad.

AC-AINC-045

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
