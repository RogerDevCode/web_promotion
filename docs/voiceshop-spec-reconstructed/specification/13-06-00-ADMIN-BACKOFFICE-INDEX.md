======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-06-00-ADMIN-BACKOFFICE-INDEX.md

# ÍNDICE FUNCIONAL DE ADMINISTRACIÓN Y BACKOFFICE

## 1. Objetivo

Esta carpeta define las operaciones administrativas y de BackOffice de
VoiceShop.

El módulo permite a actores autorizados:

- consultar el estado operativo;
- administrar tenants;
- administrar usuarios y roles;
- revisar conversaciones;
- intervenir sesiones;
- administrar catálogo;
- revisar inventario;
- revisar pedidos;
- revisar pagos;
- gestionar integraciones;
- gestionar configuraciones;
- revisar auditoría;
- ejecutar operaciones excepcionales controladas;
- gestionar incidentes;
- supervisar QA y despliegues.

El BackOffice no debe convertirse en una vía para saltarse reglas del
dominio.

## 2. Alcance

Incluye:

- roles administrativos;
- permisos;
- tenant administration;
- operator workspace;
- conversation review;
- human handoff;
- catalog administration;
- inventory administration;
- order review;
- payment review;
- integration administration;
- configuration;
- feature flags;
- audit;
- incidents;
- support tools;
- approvals;
- dual control;
- observability;
- QA.

No incluye:

- implementación visual concreta;
- framework frontend;
- base de datos específica;
- reglas contables;
- operaciones bancarias directas;
- modificación libre de aggregates;
- acceso sin auditoría.

## 3. Organización propuesta

13-06-01-ADMIN-AUTHORIZATION.md

Roles, permisos y autorización administrativa.

13-06-02-TENANT-ADMINISTRATION.md

Alta, configuración, suspensión y ciclo de vida del tenant.

13-06-03-OPERATOR-WORKSPACE.md

Espacio de trabajo para atención humana.

13-06-04-CONVERSATION-REVIEW-HANDOFF.md

Revisión de conversaciones e intervención.

13-06-05-CATALOG-INVENTORY-ADMIN.md

Administración controlada de catálogo e inventario.

13-06-06-ORDER-PAYMENT-REVIEW.md

Revisión de pedidos, pagos y excepciones.

13-06-07-INTEGRATION-CONFIGURATION-ADMIN.md

Proveedores, secretos, health y políticas.

13-06-08-FEATURE-FLAGS-CONFIGURATION.md

Configuración versionada y flags.

13-06-09-AUDIT-INCIDENTS.md

Auditoría e incidentes.

13-06-10-ADMIN-OBSERVABILITY-TESTING.md

Operación, métricas y QA del BackOffice.

## 4. Actores

SUPER_ADMIN

Administración global altamente restringida.

TENANT_ADMIN

Administra un tenant.

OPERATIONS_MANAGER

Opera procesos.

CATALOG_MANAGER

Gestiona catálogo.

INVENTORY_MANAGER

Gestiona inventario.

ORDER_MANAGER

Gestiona pedidos.

PAYMENT_REVIEWER

Revisa pagos.

SUPPORT_OPERATOR

Atiende casos.

SECURITY_AUDITOR

Consulta auditoría y seguridad.

QA_OPERATOR

Ejecuta pruebas autorizadas.

READ_ONLY_AUDITOR

Acceso de lectura.

## 5. Principios

RULE-ADMIN-001

Toda operación administrativa requiere autenticación fuerte.

RULE-ADMIN-002

Toda operación requiere autorización explícita.

RULE-ADMIN-003

Todo acceso se limita por tenant.

RULE-ADMIN-004

Las operaciones sensibles requieren razón.

RULE-ADMIN-005

Las operaciones críticas pueden requerir aprobación dual.

RULE-ADMIN-006

No existen updates genéricos de aggregates.

RULE-ADMIN-007

Las operaciones usan Commands de dominio.

RULE-ADMIN-008

Toda operación con efecto usa idempotencia.

RULE-ADMIN-009

Toda operación sensible valida versión.

RULE-ADMIN-010

Toda acción se audita.

RULE-ADMIN-011

Los datos sensibles se minimizan.

RULE-ADMIN-012

La impersonación está prohibida o estrictamente controlada.

RULE-ADMIN-013

Los accesos de emergencia expiran.

RULE-ADMIN-014

Los errores no revelan otros tenants.

RULE-ADMIN-015

El BackOffice debe probarse adversarialmente.

## 6. Authentication Assurance

Niveles:

AAL1

Autenticación básica.

AAL2

MFA.

AAL3

Hardware-backed o equivalente.

Operaciones sensibles requieren AAL2 o superior.

## 7. Authorization model

Puede combinar:

- RBAC;
- ABAC;
- tenant scope;
- resource scope;
- risk;
- time;
- approval;
- environment;
- network policy.

## 8. Permission contract

```json
{
  "permission_id": "inventory.adjust",
  "resource_type": "INVENTORY",
  "action": "ADJUST",
  "risk": "HIGH",
  "minimum_assurance": "AAL2",
  "requires_reason": true,
  "requires_approval": "CONDITIONAL"
}
```

## 9. Admin Session

Debe contener:

- Admin Session ID;
- actor;
- tenant scope;
- assurance level;
- roles;
- permissions;
- issued_at;
- expires_at;
- last activity;
- risk context;
- device reference;
- authentication event.

## 10. Privileged operations

Ejemplos:

- ajustar inventario;
- reembolso;
- cancelar pedido confirmado;
- cambiar proveedor;
- rotar secreto;
- suspender tenant;
- modificar roles;
- abrir acceso de emergencia;
- publicar catálogo;
- rollback.

## 11. Reason

Toda operación sensible debe incluir:

- Reason Code;
- reason text opcional;
- ticket reference;
- evidence references.

## 12. Approval

Puede requerir:

- approver distinto;
- scope exacto;
- payload hash;
- expiration;
- single use;
- minimum role;
- audit.

## 13. Dual control

Ejemplo:

Actor A solicita reembolso alto.

Actor B aprueba.

Actor A o servicio autorizado ejecuta.

No permitir autoaprobación cuando la política lo prohíba.

## 14. Break-glass

Acceso excepcional.

Debe:

- requerir MFA fuerte;
- registrar motivo;
- expirar;
- alertar;
- limitar scope;
- revisar posteriormente;
- no desactivar auditoría.

## 15. Tenant isolation

Todo recurso administrativo debe validar:

- tenant scope;
- actor assignment;
- permission;
- resource ownership;
- environment.

## 16. Super Admin

No debe acceder automáticamente al contenido de tenants.

Puede requerir:

- explicit support grant;
- break-glass;
- tenant consent;
- legal basis;
- audit.

## 17. Operaciones de lectura

También deben autorizarse.

Ejemplos:

- transcript;
- payment state;
- inventory;
- customer data;
- audit.

## 18. Datos sensibles

Clasificaciones:

PUBLIC_ADMIN

INTERNAL

CONFIDENTIAL

RESTRICTED

PAYMENT_SENSITIVE

SECURITY_SECRET

El UI debe aplicar field-level visibility.

## 19. Impersonation

Por defecto:

PROHIBITED.

Si se permite:

- banner visible;
- separate session;
- no ocultar actor real;
- reason;
- duration;
- permissions restricted;
- audit;
- no aprobación financiera.

## 20. Human handoff

El Operador puede:

- tomar control;
- responder;
- pedir datos;
- cerrar caso;
- devolver control.

No puede:

- alterar stock sin Command;
- aprobar pagos sin evidencia;
- omitir autorización;
- usar herramientas no permitidas.

## 21. Configuración

Toda configuración debe ser:

- tipada;
- versionada;
- validada;
- revisable;
- reversible;
- auditable.

## 22. Feature flags

Deben incluir:

- Flag ID;
- scope;
- tenant;
- environment;
- percentage;
- owner;
- expires_at;
- reason;
- rollback.

## 23. Administración de integraciones

Debe permitir:

- habilitar/deshabilitar;
- seleccionar proveedor;
- ver health;
- rotar secret reference;
- configurar región;
- ajustar límites;
- ejecutar prueba no comercial;
- revisar incidentes.

## 24. Administración de catálogo

Debe usar:

- drafts;
- validation;
- publication;
- version;
- approval;
- rollback.

No editar versión publicada directamente.

## 25. Administración de inventario

Debe usar:

- AdjustInventory;
- approvals;
- reason;
- evidence;
- expected version;
- idempotency;
- audit.

## 26. Revisión de pagos

Puede:

- consultar;
- conciliar;
- iniciar reembolso autorizado;
- marcar manual review;
- asociar evidencia.

No puede:

- marcar APPROVED sin proveedor o proceso oficial;
- editar amount;
- borrar ledger.

## 27. Auditoría

Todo acceso privilegiado debe registrar:

- actor;
- tenant;
- Admin Session;
- resource;
- action;
- before;
- after;
- reason;
- approval;
- result;
- Correlation ID.

## 28. Eventos globales

AdminAuthenticated

AdminAuthorizationEvaluated

AdminAccessDenied

AdminOperationRequested

AdminApprovalRequired

AdminOperationApproved

AdminOperationRejected

AdminOperationCompleted

AdminBreakGlassActivated

AdminBreakGlassExpired

AdminImpersonationStarted

AdminImpersonationEnded

AdminSecurityIncidentDetected

## 29. Errores globales

ADMIN_AUTHENTICATION_REQUIRED

ADMIN_MFA_REQUIRED

ADMIN_ASSURANCE_INSUFFICIENT

ADMIN_AUTHORIZATION_DENIED

ADMIN_TENANT_SCOPE_DENIED

ADMIN_REASON_REQUIRED

ADMIN_APPROVAL_REQUIRED

ADMIN_APPROVAL_INVALID

ADMIN_SELF_APPROVAL_DENIED

ADMIN_VERSION_CONFLICT

ADMIN_IDEMPOTENCY_CONFLICT

ADMIN_OPERATION_NOT_ALLOWED

ADMIN_BREAK_GLASS_REQUIRED

ADMIN_BREAK_GLASS_EXPIRED

ADMIN_SECURITY_POLICY_DENIED

## 30. Observabilidad

Métricas globales:

- admin_sessions_total;
- admin_authentication_failure_total;
- admin_authorization_denied_total;
- admin_operations_total;
- admin_operations_failed_total;
- admin_approvals_total;
- admin_approval_denied_total;
- admin_break_glass_total;
- admin_impersonation_total;
- admin_sensitive_reads_total;
- admin_security_incidents_total;
- admin_operation_duration_seconds.

## 31. Seguridad

Controles:

- MFA;
- session timeout;
- device risk;
- CSRF;
- origin;
- rate limit;
- tenant;
- permission;
- field visibility;
- approval;
- audit;
- anomaly detection;
- secret redaction.

## 32. Privacidad

Debe minimizar:

- PII;
- transcripts;
- payment data;
- addresses;
- credentials.

Acceso basado en necesidad.

## 33. Criterios de aceptación

AC-ADMIN-INDEX-001

Toda operación requiere autenticación.

AC-ADMIN-INDEX-002

Toda operación requiere autorización.

AC-ADMIN-INDEX-003

Todo acceso respeta tenant.

AC-ADMIN-INDEX-004

Las operaciones sensibles requieren reason.

AC-ADMIN-INDEX-005

Las operaciones críticas pueden exigir dual control.

AC-ADMIN-INDEX-006

No existen updates genéricos.

AC-ADMIN-INDEX-007

Se usan Commands de dominio.

AC-ADMIN-INDEX-008

Los efectos usan idempotencia.

AC-ADMIN-INDEX-009

Los efectos validan versión.

AC-ADMIN-INDEX-010

Toda acción es auditable.

AC-ADMIN-INDEX-011

Los datos se minimizan.

AC-ADMIN-INDEX-012

La impersonación se controla.

AC-ADMIN-INDEX-013

Break-glass expira.

AC-ADMIN-INDEX-014

Los errores no filtran tenants.

AC-ADMIN-INDEX-015

El módulo se prueba adversarialmente.

## 34. Checklist

[ ] Existe Admin Session.
[ ] Existen roles.
[ ] Existen permissions.
[ ] Existe tenant scope.
[ ] Existe assurance level.
[ ] Existe MFA.
[ ] Existen reasons.
[ ] Existen approvals.
[ ] Existe dual control.
[ ] Existe break-glass.
[ ] Existe field visibility.
[ ] Existe handoff.
[ ] Existe configuration versioning.
[ ] Existen feature flags.
[ ] Existe integration admin.
[ ] Existe catalog admin.
[ ] Existe inventory admin.
[ ] Existe payment review.
[ ] Existe audit.
[ ] Existe testing.

======================================================================
FIN DEL DOCUMENTO
======================================================================
