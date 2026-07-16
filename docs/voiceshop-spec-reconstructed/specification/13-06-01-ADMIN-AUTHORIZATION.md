======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-06-01-ADMIN-AUTHORIZATION.md

# AUTORIZACIÓN ADMINISTRATIVA

## 1. Objetivo

Este documento define cómo VoiceShop autentica y autoriza a los actores
administrativos y operativos del BackOffice.

El objetivo es impedir que una persona, servicio o sesión administrativa
pueda:

- acceder a un tenant no autorizado;
- ejecutar operaciones fuera de su rol;
- modificar recursos sin permisos;
- aprobar su propia operación cuando existe dual control;
- reutilizar una aprobación;
- mantener acceso privilegiado indefinidamente;
- ocultar su identidad real;
- omitir auditoría;
- utilizar una LLM para ampliar permisos.

## 2. Alcance

Incluye:

- identidad administrativa;
- autenticación;
- MFA;
- Authentication Assurance Level;
- Admin Session;
- roles;
- permisos;
- RBAC;
- ABAC;
- tenant scope;
- resource scope;
- field-level access;
- razones;
- aprobaciones;
- dual control;
- break-glass;
- impersonation;
- delegación;
- revocación;
- errores;
- eventos;
- observabilidad;
- auditoría;
- QA.

No incluye:

- proveedor concreto de identidad;
- implementación de interfaz;
- criptografía física;
- directorio corporativo específico;
- reglas detalladas de cada caso de uso administrativo.

## 3. Principios

RULE-AAUTH-001

Toda operación administrativa requiere identidad autenticada.

RULE-AAUTH-002

Toda operación requiere autorización explícita.

RULE-AAUTH-003

La ausencia de una regla de permiso significa denegación.

RULE-AAUTH-004

Todo permiso está limitado por tenant.

RULE-AAUTH-005

Todo permiso está limitado por recurso y acción.

RULE-AAUTH-006

Toda operación sensible exige un nivel mínimo de autenticación.

RULE-AAUTH-007

Las operaciones críticas pueden requerir aprobación independiente.

RULE-AAUTH-008

La LLM no otorga roles ni permisos.

RULE-AAUTH-009

Toda Admin Session expira.

RULE-AAUTH-010

Los permisos se evalúan en el backend.

RULE-AAUTH-011

Toda denegación debe ser trazable.

RULE-AAUTH-012

Toda elevación temporal debe expirar.

RULE-AAUTH-013

La impersonación no oculta al actor real.

RULE-AAUTH-014

Break-glass no desactiva auditoría.

RULE-AAUTH-015

Los tenants permanecen aislados.

## 4. Actores administrativos

SUPER_ADMIN

TENANT_ADMIN

OPERATIONS_MANAGER

CATALOG_MANAGER

INVENTORY_MANAGER

ORDER_MANAGER

PAYMENT_REVIEWER

SUPPORT_OPERATOR

SECURITY_AUDITOR

QA_OPERATOR

READ_ONLY_AUDITOR

SERVICE_ADMIN

Los nombres son roles funcionales.

La implementación puede usar grupos o claims equivalentes.

## 5. Authentication Assurance Levels

AAL1

Un factor básico.

AAL2

MFA con dos factores independientes.

AAL3

Autenticador resistente a phishing o hardware-backed.

## 6. Política de assurance

Ejemplos:

- lectura de métricas: AAL1 o AAL2 según tenant;
- lectura de PII: AAL2;
- ajuste de inventario: AAL2;
- reembolso alto: AAL3 o aprobación dual;
- rotación de secretos: AAL3;
- break-glass: AAL3.

## 7. Admin Identity

```json
{
  "admin_actor_id": "UUID",
  "identity_provider_reference": "OPAQUE",
  "status": "ACTIVE",
  "assigned_tenants": [
    "UUID"
  ],
  "roles": [
    "TENANT_ADMIN"
  ],
  "authentication_methods": [
    "PASSWORD",
    "TOTP"
  ],
  "created_at": "UTC_TIMESTAMP"
}
```

## 8. Estados de identidad

INVITED

ACTIVE

SUSPENDED

LOCKED

DISABLED

TERMINATED

COMPROMISED

Una identidad no ACTIVE no puede iniciar una nueva Admin Session.

## 9. Admin Session

```json
{
  "admin_session_id": "UUID",
  "admin_actor_id": "UUID",
  "tenant_scope": [
    "UUID"
  ],
  "roles": [
    "TENANT_ADMIN"
  ],
  "assurance_level": "AAL2",
  "authentication_event_id": "UUID",
  "device_reference": "OPAQUE",
  "risk_state": "NORMAL",
  "issued_at": "UTC_TIMESTAMP",
  "last_activity_at": "UTC_TIMESTAMP",
  "expires_at": "UTC_TIMESTAMP",
  "status": "ACTIVE"
}
```

## 10. Estados de Admin Session

ACTIVE

IDLE

STEP_UP_REQUIRED

REVOKED

EXPIRED

TERMINATED

COMPROMISED

## 11. Session timeout

Debe existir:

- absolute timeout;
- idle timeout;
- sensitive-operation timeout;
- step-up window;
- break-glass timeout.

## 12. Step-up authentication

Se exige cuando:

- assurance insuficiente;
- riesgo elevado;
- operación crítica;
- dispositivo nuevo;
- sesión antigua;
- ubicación anómala;
- cambio de tenant;
- acceso a secretos.

## 13. RBAC

Role Based Access Control define conjuntos de permisos.

Ejemplo:

INVENTORY_MANAGER:

- inventory.read;
- inventory.adjust.request;
- inventory.adjust.execute;
- inventory.reconciliation.read.

No implica automáticamente:

- payment.refund;
- secret.rotate;
- tenant.suspend.

## 14. ABAC

Attribute Based Access Control puede considerar:

- tenant;
- resource owner;
- environment;
- amount;
- quantity;
- risk;
- time;
- location;
- assurance;
- approval;
- support grant.

## 15. Permission

```json
{
  "permission_id": "payment.refund.execute",
  "resource_type": "PAYMENT",
  "action": "REFUND",
  "risk": "HIGH",
  "minimum_assurance_level": "AAL2",
  "requires_reason": true,
  "approval_policy": "CONDITIONAL",
  "allowed_tenant_scope": "ASSIGNED_ONLY"
}
```

## 16. Authorization Request

```json
{
  "authorization_request_id": "UUID",
  "admin_session_id": "UUID",
  "tenant_id": "UUID",
  "permission_id": "payment.refund.execute",
  "resource_reference": {
    "type": "PAYMENT",
    "id": "UUID"
  },
  "operation_context": {
    "amount": 50000,
    "currency": "CLP"
  },
  "requested_at": "UTC_TIMESTAMP"
}
```

## 17. Authorization Decision

```json
{
  "authorization_decision_id": "UUID",
  "status": "ALLOW",
  "permission_id": "payment.refund.execute",
  "policy_version": 12,
  "requirements": {
    "reason_required": true,
    "approval_required": true,
    "step_up_required": false
  },
  "expires_at": "UTC_TIMESTAMP"
}
```

## 18. Estados de decisión

ALLOW

DENY

STEP_UP_REQUIRED

APPROVAL_REQUIRED

BREAK_GLASS_REQUIRED

CONTEXT_REQUIRED

## 19. Tenant scope

Tipos:

GLOBAL_RESTRICTED

ASSIGNED_TENANTS

SINGLE_TENANT

SUPPORT_GRANT

BREAK_GLASS_SCOPE

Una identidad global no debe obtener acceso automático al contenido.

## 20. Resource scope

Puede limitar por:

- resource ID;
- resource type;
- branch;
- location;
- department;
- owner;
- status;
- date range.

## 21. Field-level authorization

Ejemplo:

SUPPORT_OPERATOR puede ver:

- nombre;
- estado del pedido;
- resumen.

No puede ver:

- secrets;
- full payment metadata;
- internal fraud notes;
- private audit evidence.

## 22. Masking

El backend debe aplicar:

- redactado;
- truncamiento;
- tokenización;
- ocultación parcial;
- exclusión.

No confiar sólo en el frontend.

## 23. Reason

Las operaciones sensibles requieren:

```json
{
  "reason_code": "CUSTOMER_REQUEST",
  "reason_text": "Solicitud registrada en caso de soporte.",
  "ticket_reference": "UUID_OR_NULL",
  "evidence_references": []
}
```

## 24. Catálogo de razones

Debe ser cerrado y versionado.

Reason text complementa.

No sustituye Reason Code.

## 25. Approval Request

```json
{
  "approval_request_id": "UUID",
  "tenant_id": "UUID",
  "requester_actor_id": "UUID",
  "permission_id": "payment.refund.execute",
  "operation_payload_hash": "HASH",
  "resource_reference": "OPAQUE",
  "risk": "HIGH",
  "status": "PENDING",
  "expires_at": "UTC_TIMESTAMP"
}
```

## 26. Approval Decision

```json
{
  "approval_decision_id": "UUID",
  "approval_request_id": "UUID",
  "approver_actor_id": "UUID",
  "status": "APPROVED",
  "operation_payload_hash": "HASH",
  "decided_at": "UTC_TIMESTAMP",
  "expires_at": "UTC_TIMESTAMP"
}
```

## 27. Reglas de aprobación

- approver autorizado;
- approver distinto cuando aplique;
- mismo tenant;
- payload hash exacto;
- recurso exacto;
- single use;
- expiration;
- session assurance;
- audit.

## 28. Autoaprobación

Por defecto prohibida en dual control.

Excepciones deben documentarse y auditarse.

## 29. Consumo de aprobación

La aprobación se consume atómicamente con la operación.

Una aprobación consumida no se reutiliza.

## 30. Cambio de payload

Si cambia:

- amount;
- quantity;
- target;
- resource;
- tenant;
- operation;

la aprobación queda inválida.

## 31. Break-glass

Se usa sólo cuando:

- no existe vía normal;
- existe impacto operativo grave;
- el actor tiene permiso de emergencia;
- completa step-up;
- registra reason;
- acepta audit y revisión.

## 32. Break-glass Grant

```json
{
  "break_glass_grant_id": "UUID",
  "admin_actor_id": "UUID",
  "tenant_id": "UUID",
  "scope": [
    "ORDER.READ",
    "CONVERSATION.READ"
  ],
  "reason_code": "PRODUCTION_INCIDENT",
  "issued_at": "UTC_TIMESTAMP",
  "expires_at": "UTC_TIMESTAMP",
  "status": "ACTIVE"
}
```

## 33. Break-glass controls

- duración mínima;
- scope mínimo;
- alertas;
- revisión posterior;
- no exportación masiva;
- no secret access salvo política específica;
- no desactivar logs;
- no autoaprobación financiera.

## 34. Impersonation

Por defecto:

DISABLED.

Si se habilita:

- sesión separada;
- actor real visible;
- actor simulado visible;
- tenant scope;
- reason;
- expiration;
- banner;
- restrictions;
- audit.

## 35. Impersonation prohibitions

No usar para:

- aprobar pagos;
- rotar secretos;
- otorgar roles;
- desactivar seguridad;
- ocultar identidad;
- aceptar términos por el Cliente.

## 36. Delegación

Puede ser:

TEMPORARY_ROLE_DELEGATION

TASK_DELEGATION

APPROVAL_DELEGATION

Debe:

- ser explícita;
- tener scope;
- expirar;
- evitar escalamiento;
- auditarse.

## 37. Segregation of duties

Políticas posibles:

- requester ≠ approver;
- secret admin ≠ auditor;
- payment reviewer ≠ refund approver;
- catalog editor ≠ publisher;
- inventory adjuster ≠ approver.

## 38. Revocación

Puede revocarse:

- identity;
- role;
- permission;
- Admin Session;
- approval;
- break-glass;
- delegation;
- support grant.

Debe propagarse dentro del SLA.

## 39. Cache de autorización

Puede cachearse por corto tiempo.

Clave:

- actor;
- session;
- tenant;
- permission;
- resource;
- policy version;
- risk state.

Invalidar por:

- role change;
- revocation;
- tenant status;
- policy change;
- session step-up;
- security incident.

## 40. Flujo de autorización

1. recibir request.
2. validar Admin Session.
3. validar status y expiry.
4. validar assurance.
5. validar tenant.
6. cargar roles y permisos.
7. evaluar attributes.
8. evaluar reason.
9. evaluar approval.
10. evaluar segregation.
11. construir decision.
12. persistir evidencia.
13. emitir evento.
14. devolver.

## 41. Pseudocódigo

```text
function authorize_admin_operation(request):

    session = load_admin_session(request.admin_session_id)
    validate_admin_session(session)

    identity = load_admin_identity(session.admin_actor_id)
    validate_identity_status(identity)

    validate_tenant_scope(
        identity,
        session,
        request.tenant_id
    )

    permission = load_permission(request.permission_id)
    policy = load_authorization_policy(permission)

    if session.assurance_level < policy.minimum_assurance:
        return STEP_UP_REQUIRED

    attributes = build_authorization_attributes(
        identity,
        session,
        request
    )

    decision = evaluate_admin_policy(policy, attributes)

    enforce_segregation_of_duties(decision, request)

    persist_authorization_decision(
        request,
        decision,
        policy.version
    )

    emit(AdminAuthorizationEvaluated)
    return decision
```

## 42. Errores

ADMIN_IDENTITY_NOT_FOUND

ADMIN_IDENTITY_INACTIVE

ADMIN_SESSION_NOT_FOUND

ADMIN_SESSION_EXPIRED

ADMIN_SESSION_REVOKED

ADMIN_SESSION_COMPROMISED

ADMIN_AUTHENTICATION_REQUIRED

ADMIN_MFA_REQUIRED

ADMIN_ASSURANCE_INSUFFICIENT

ADMIN_PERMISSION_NOT_FOUND

ADMIN_AUTHORIZATION_DENIED

ADMIN_TENANT_SCOPE_DENIED

ADMIN_RESOURCE_SCOPE_DENIED

ADMIN_FIELD_ACCESS_DENIED

ADMIN_REASON_REQUIRED

ADMIN_REASON_INVALID

ADMIN_APPROVAL_REQUIRED

ADMIN_APPROVAL_NOT_FOUND

ADMIN_APPROVAL_EXPIRED

ADMIN_APPROVAL_PAYLOAD_MISMATCH

ADMIN_APPROVAL_ALREADY_CONSUMED

ADMIN_SELF_APPROVAL_DENIED

ADMIN_BREAK_GLASS_REQUIRED

ADMIN_BREAK_GLASS_DENIED

ADMIN_BREAK_GLASS_EXPIRED

ADMIN_IMPERSONATION_DENIED

ADMIN_DELEGATION_INVALID

## 43. Eventos

AdminIdentityAuthenticated

AdminAuthenticationFailed

AdminSessionCreated

AdminSessionStepUpRequired

AdminSessionRevoked

AdminAuthorizationRequested

AdminAuthorizationAllowed

AdminAuthorizationDenied

AdminApprovalRequested

AdminApprovalGranted

AdminApprovalRejected

AdminApprovalConsumed

AdminBreakGlassActivated

AdminBreakGlassExpired

AdminImpersonationStarted

AdminImpersonationEnded

AdminDelegationCreated

AdminDelegationRevoked

## 44. Observabilidad

Métricas:

- admin_authentication_total;
- admin_authentication_failure_total;
- admin_sessions_active;
- admin_step_up_total;
- admin_authorization_requests_total;
- admin_authorization_allow_total;
- admin_authorization_deny_total;
- admin_tenant_scope_denied_total;
- admin_field_access_denied_total;
- admin_approval_requests_total;
- admin_approval_denied_total;
- admin_self_approval_denied_total;
- admin_break_glass_total;
- admin_impersonation_total;
- admin_authorization_duration_seconds.

Dimensiones:

- permission_class;
- decision;
- assurance_level;
- risk;
- reason_required;
- approval_required;
- tenant_tier;
- error_code.

## 45. Auditoría

Registrar:

- actor;
- Admin Session;
- tenant;
- permission;
- resource;
- decision;
- policy version;
- assurance;
- reason;
- approval;
- break-glass;
- impersonation;
- result;
- Correlation ID.

## 46. Seguridad

Amenazas:

- role escalation;
- session theft;
- tenant hopping;
- approval replay;
- self approval;
- stale permissions;
- impersonation abuse;
- break-glass abuse;
- hidden field access.

Controles:

- MFA;
- short sessions;
- tenant binding;
- policy engine;
- field filtering;
- single-use approvals;
- revocation;
- anomaly detection;
- audit.

## 47. Casos límite

- identity suspended;
- session expired;
- assurance low;
- tenant mismatch;
- role changed;
- permission revoked;
- approval expired;
- payload changed;
- approver same as requester;
- break-glass;
- break-glass expired;
- impersonation denied;
- field access;
- cache stale;
- policy updated;
- concurrent approval consumption;
- security incident.

## 48. Criterios de aceptación

AC-AAUTH-001

Toda operación requiere identidad.

AC-AAUTH-002

Toda operación requiere autorización.

AC-AAUTH-003

La ausencia de permiso deniega.

AC-AAUTH-004

Todo permiso respeta tenant.

AC-AAUTH-005

Todo permiso respeta recurso.

AC-AAUTH-006

Las operaciones sensibles validan assurance.

AC-AAUTH-007

Las operaciones críticas soportan aprobación independiente.

AC-AAUTH-008

La LLM no otorga permisos.

AC-AAUTH-009

Toda Admin Session expira.

AC-AAUTH-010

Los permisos se evalúan en backend.

AC-AAUTH-011

Las denegaciones son trazables.

AC-AAUTH-012

Las elevaciones expiran.

AC-AAUTH-013

La impersonación conserva actor real.

AC-AAUTH-014

Break-glass conserva auditoría.

AC-AAUTH-015

Los tenants se aíslan.

## 49. Plan mínimo de pruebas

- identity;
- authentication;
- MFA;
- AAL;
- Admin Session;
- timeout;
- step-up;
- roles;
- permissions;
- ABAC;
- tenant scope;
- resource scope;
- field access;
- reason;
- approval;
- payload binding;
- single use;
- self approval;
- break-glass;
- impersonation;
- delegation;
- revocation;
- cache;
- security;
- metrics;
- audit.

## 50. Checklist

[ ] Existe Admin Identity.
[ ] Existe Admin Session.
[ ] Existen AAL.
[ ] Existe MFA.
[ ] Existen roles.
[ ] Existen permissions.
[ ] Existe RBAC.
[ ] Existe ABAC.
[ ] Existe tenant scope.
[ ] Existe resource scope.
[ ] Existe field-level access.
[ ] Existen reasons.
[ ] Existen approvals.
[ ] Existe dual control.
[ ] Existe break-glass.
[ ] Existe impersonation policy.
[ ] Existe delegación.
[ ] Existe revocación.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
