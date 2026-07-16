======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-06-02-TENANT-ADMINISTRATION.md

# ADMINISTRACIÓN DEL CICLO DE VIDA DEL TENANT

## 1. Objetivo

Este documento define cómo VoiceShop crea, configura, activa, suspende,
reactiva y termina tenants.

Un tenant representa un cliente, organización o unidad aislada que posee
sus propios:

- datos;
- usuarios;
- configuraciones;
- proveedores;
- catálogos;
- inventarios;
- pedidos;
- políticas;
- secretos;
- métricas;
- límites;
- auditoría.

## 2. Alcance

Incluye:

- solicitud de alta;
- validación;
- provisioning;
- configuración inicial;
- dominios;
- locales;
- timezone;
- monedas;
- canales;
- proveedores;
- límites;
- estado;
- suspensión;
- reactivación;
- terminación;
- exportación;
- eliminación;
- retención;
- ownership;
- errores;
- eventos;
- observabilidad;
- auditoría;
- QA.

No incluye:

- contrato comercial;
- facturación SaaS completa;
- implementación física de bases de datos;
- migraciones técnicas específicas;
- UI concreta.

## 3. Principios

RULE-TADM-001

Todo tenant posee Tenant ID oficial.

RULE-TADM-002

Todo tenant posee estado explícito.

RULE-TADM-003

Todo dato debe estar vinculado a tenant o scope global autorizado.

RULE-TADM-004

La creación debe ser idempotente.

RULE-TADM-005

El provisioning debe ser trazable.

RULE-TADM-006

Una suspensión no elimina datos.

RULE-TADM-007

Una terminación requiere política de retención.

RULE-TADM-008

La reactivación debe validar dependencias.

RULE-TADM-009

Los secretos se gestionan por referencias.

RULE-TADM-010

Los límites deben ser versionados.

RULE-TADM-011

Los cambios sensibles requieren reason.

RULE-TADM-012

Los cambios críticos pueden requerir aprobación.

RULE-TADM-013

Un tenant no puede leer datos de otro tenant.

RULE-TADM-014

La eliminación debe verificarse.

RULE-TADM-015

Todo cambio es auditable.

## 4. Estados del tenant

REQUESTED

VALIDATING

PROVISIONING

PENDING_CONFIGURATION

ACTIVE

SUSPENDING

SUSPENDED

REACTIVATING

TERMINATING

TERMINATED

DELETION_PENDING

DELETED

FAILED

## 5. Transiciones permitidas

REQUESTED → VALIDATING

VALIDATING → PROVISIONING

PROVISIONING → PENDING_CONFIGURATION

PENDING_CONFIGURATION → ACTIVE

ACTIVE → SUSPENDING

SUSPENDING → SUSPENDED

SUSPENDED → REACTIVATING

REACTIVATING → ACTIVE

ACTIVE → TERMINATING

SUSPENDED → TERMINATING

TERMINATING → TERMINATED

TERMINATED → DELETION_PENDING

DELETION_PENDING → DELETED

## 6. Contrato de alta

```json
{
  "create_tenant_command_id": "UUID",
  "requested_by_actor_id": "UUID",
  "legal_name": "Empresa Demo SpA",
  "display_name": "Empresa Demo",
  "country": "CL",
  "default_locale": "es-CL",
  "timezone": "America/Santiago",
  "default_currency": "CLP",
  "data_residency_policy": "APPROVED_REGION",
  "plan_reference": "PLAN-SMALL-BUSINESS",
  "idempotency_key": "STRING",
  "reason_code": "NEW_CUSTOMER"
}
```

## 7. Tenant Result

```json
{
  "tenant_id": "UUID",
  "status": "PENDING_CONFIGURATION",
  "configuration_version": 1,
  "created_at": "UTC_TIMESTAMP",
  "required_actions": [
    "CONFIGURE_ADMIN",
    "CONFIGURE_CHANNEL",
    "CONFIGURE_PROVIDER"
  ]
}
```

## 8. Tenant Profile

Campos:

- Tenant ID;
- legal name;
- display name;
- country;
- locale;
- timezone;
- currency;
- data residency;
- status;
- configuration version;
- plan;
- contacts protegidos;
- created_at;
- updated_at.

## 9. Validación inicial

- nombre;
- country;
- locale;
- timezone;
- currency;
- region;
- uniqueness policy;
- plan;
- legal requirements;
- support contacts;
- ownership.

## 10. Provisioning

Puede crear:

- tenant record;
- default roles;
- Tenant Admin invitation;
- configuration namespace;
- catalog namespace;
- inventory namespace;
- event partitions;
- audit scope;
- metrics scope;
- secret references;
- rate limits.

## 11. Provisioning steps

Cada paso posee:

- Step ID;
- status;
- idempotency;
- attempts;
- result;
- compensation;
- evidence.

## 12. Estados de provisioning

PENDING

RUNNING

COMPLETED

FAILED_RETRYABLE

FAILED_FINAL

COMPENSATING

COMPENSATED

UNKNOWN

## 13. Provisioning idempotente

Mismo CreateTenant Command y misma key:

- mismo Tenant ID;
- no duplicar namespaces;
- no duplicar admin;
- no duplicar secretos.

## 14. Configuración inicial

Debe incluir:

- default locale;
- timezone;
- currency;
- allowed channels;
- providers;
- limits;
- business hours;
- branches;
- catalog policy;
- inventory policy;
- payment policy;
- privacy policy;
- retention policy.

## 15. Tenant Admin inicial

Debe:

- ser invitado;
- activar identidad;
- configurar MFA;
- aceptar políticas;
- no recibir contraseña por texto;
- tener scope del tenant.

## 16. Dominios

Si existen dominios personalizados:

- verificar ownership;
- evitar takeover;
- validar DNS;
- emitir certificado;
- renovar;
- revocar al terminar.

## 17. Canales

Cada canal requiere:

- Channel Configuration ID;
- provider;
- tenant mapping;
- status;
- webhook secret reference;
- rate limit;
- capabilities;
- version.

## 18. Proveedores

El tenant puede seleccionar proveedores permitidos.

Debe respetar:

- región;
- plan;
- privacidad;
- capacidades;
- contrato;
- health;
- coste.

## 19. Límites

Ejemplos:

- sesiones concurrentes;
- mensajes;
- minutos de voz;
- tokens;
- búsquedas;
- reservas;
- usuarios admin;
- almacenamiento;
- integraciones;
- webhooks.

## 20. Limit Policy

```json
{
  "tenant_limit_policy_id": "UUID",
  "tenant_id": "UUID",
  "version": 4,
  "limits": {
    "concurrent_voice_sessions": 5,
    "monthly_voice_minutes": 1000,
    "admin_users": 10
  },
  "effective_from": "UTC_TIMESTAMP"
}
```

## 21. Feature entitlements

Distinguir:

- plan;
- entitlement;
- feature flag;
- permission.

El plan no reemplaza autorización.

## 22. Activación

Requiere:

- Admin activo;
- configuración mínima;
- región válida;
- secretos configurados;
- canales válidos;
- políticas aceptadas;
- health mínimo;
- no errores críticos.

## 23. Suspensión

Causas:

- customer request;
- security incident;
- payment issue contractual;
- compliance;
- abuse;
- maintenance;
- administrative decision.

## 24. Suspensión funcional

Debe definir:

- nuevas sesiones bloqueadas;
- sesiones activas;
- webhooks;
- pagos;
- conciliación;
- auditoría;
- exportación;
- soporte;
- operaciones críticas.

No bloquear procesos necesarios para preservar consistencia.

## 25. Suspensión de emergencia

Puede:

- revocar tokens;
- cerrar sesiones;
- deshabilitar canales;
- abrir circuits;
- bloquear escrituras;
- preservar webhooks de pago;
- preservar reconciliación;
- alertar.

## 26. Reactivación

Debe validar:

- motivo resuelto;
- seguridad;
- secretos;
- health;
- plan;
- configuración;
- retención;
- dependencias;
- approval cuando aplique.

## 27. Terminación

Es una decisión administrativa/contractual.

Debe:

- bloquear nuevas operaciones;
- cerrar servicios;
- preservar procesos pendientes;
- exportar si aplica;
- aplicar retención;
- revocar secretos;
- conservar auditoría;
- planificar eliminación.

## 28. Eliminación

Debe distinguir:

SOFT_DELETE

ANONYMIZATION

HARD_DELETE

LEGAL_HOLD

La política depende del dato y obligación.

## 29. Deletion Plan

```json
{
  "tenant_deletion_plan_id": "UUID",
  "tenant_id": "UUID",
  "status": "PENDING",
  "requested_at": "UTC_TIMESTAMP",
  "eligible_at": "UTC_TIMESTAMP",
  "legal_hold": false,
  "resources": [
    {
      "resource_class": "CONVERSATIONS",
      "action": "DELETE",
      "retention_until": "UTC_TIMESTAMP"
    }
  ]
}
```

## 30. Legal hold

Impide eliminación de datos cubiertos.

Debe:

- registrar autoridad;
- scope;
- reason;
- start;
- expiration/review;
- audit.

## 31. Exportación

Puede incluir:

- configuración;
- catálogo;
- pedidos;
- auditoría permitida;
- datos personales;
- integraciones sin secretos.

Debe:

- autenticar;
- autorizar;
- cifrar;
- expirar;
- registrar descarga;
- aplicar tamaño y rate limits.

## 32. Ownership transfer

Cambiar Tenant Owner/Admin principal requiere:

- actor actual;
- nuevo actor;
- MFA;
- approval;
- verification;
- effective date;
- revocación anterior;
- audit.

## 33. Cambio de región

Es operación crítica.

Debe:

- evaluar residencia;
- migración;
- downtime;
- proveedores;
- secretos;
- datos;
- rollback;
- legal;
- approval.

## 34. Cambio de moneda

No debe cambiar pedidos históricos.

Afecta nuevas operaciones desde effective date.

## 35. Cambio de timezone

Debe preservar timestamps UTC.

Afecta presentación y reglas futuras.

## 36. Versionado de configuración

Toda modificación produce:

- Configuration Version;
- before;
- after;
- effective date;
- actor;
- reason;
- approval;
- rollback reference.

## 37. Rollback de configuración

Puede revertir a versión anterior compatible.

No debe revertir:

- secretos comprometidos;
- estados históricos;
- datos borrados;
- operaciones ya ejecutadas.

## 38. Health del tenant

Puede derivarse de:

- configuración;
- canales;
- providers;
- secrets;
- quotas;
- incidents;
- jobs;
- webhooks;
- data consistency.

Estados:

HEALTHY

DEGRADED

SUSPENDED

ACTION_REQUIRED

UNKNOWN

## 39. Flujo de creación

1. recibir Command.
2. autenticar.
3. autorizar.
4. validar payload.
5. consultar idempotencia.
6. reservar Tenant ID.
7. crear profile.
8. ejecutar provisioning.
9. crear Admin invitation.
10. aplicar defaults.
11. validar resultado.
12. marcar PENDING_CONFIGURATION.
13. emitir evento.
14. devolver.

## 40. Pseudocódigo

```text
function create_tenant(command):

    authenticate_admin(command.requested_by_actor_id)
    authorize_global_permission(TENANT_CREATE)
    validate_create_tenant_command(command)

    previous = get_idempotent_result(command.idempotency_key)
    if previous.exists:
        return previous

    tenant = create_tenant_profile(
        command,
        status=PROVISIONING
    )

    steps = build_tenant_provisioning_plan(tenant, command)

    for step in steps:
        execute_provisioning_step_idempotently(step)

    validate_tenant_minimum_configuration(tenant)

    tenant = transition_tenant(
        tenant,
        PENDING_CONFIGURATION
    )

    persist_tenant_and_outbox(tenant)
    emit(TenantProvisioned)

    return tenant
```

## 41. Errores

TENANT_CREATE_REQUEST_INVALID

TENANT_CREATE_NOT_AUTHORIZED

TENANT_IDEMPOTENCY_CONFLICT

TENANT_ALREADY_EXISTS

TENANT_PROVISIONING_FAILED

TENANT_PROVISIONING_UNKNOWN

TENANT_CONFIGURATION_INCOMPLETE

TENANT_CONFIGURATION_INVALID

TENANT_ADMIN_REQUIRED

TENANT_CHANNEL_CONFIGURATION_INVALID

TENANT_PROVIDER_CONFIGURATION_INVALID

TENANT_LIMIT_POLICY_INVALID

TENANT_ACTIVATION_NOT_ALLOWED

TENANT_SUSPENSION_NOT_ALLOWED

TENANT_REACTIVATION_NOT_ALLOWED

TENANT_TERMINATION_NOT_ALLOWED

TENANT_DELETION_NOT_ALLOWED

TENANT_LEGAL_HOLD_ACTIVE

TENANT_EXPORT_NOT_AUTHORIZED

TENANT_OWNERSHIP_TRANSFER_INVALID

TENANT_CONFIGURATION_VERSION_CONFLICT

## 42. Eventos

TenantCreationRequested

TenantProfileCreated

TenantProvisioningStarted

TenantProvisioningStepCompleted

TenantProvisioningFailed

TenantProvisioned

TenantConfigurationUpdated

TenantActivated

TenantSuspensionRequested

TenantSuspended

TenantReactivationRequested

TenantReactivated

TenantTerminationRequested

TenantTerminated

TenantDeletionPlanned

TenantDeleted

TenantLegalHoldApplied

TenantOwnershipTransferred

## 43. Observabilidad

Métricas:

- tenant_creation_requests_total;
- tenant_creation_success_total;
- tenant_provisioning_failure_total;
- tenant_provisioning_duration_seconds;
- tenants_active;
- tenants_suspended;
- tenant_configuration_errors_total;
- tenant_activation_failure_total;
- tenant_suspension_total;
- tenant_reactivation_total;
- tenant_termination_total;
- tenant_deletion_total;
- tenant_export_total;
- tenant_health_state_total.

Dimensiones:

- plan_class;
- country;
- status;
- result;
- error_code;
- provisioning_step;
- tenant_tier.

## 44. Auditoría

Registrar:

- tenant;
- actor;
- operation;
- before;
- after;
- configuration version;
- reason;
- approval;
- provisioning steps;
- suspension;
- termination;
- deletion;
- export;
- Correlation ID.

## 45. Seguridad

Amenazas:

- duplicate tenant;
- tenant ID collision;
- global admin abuse;
- cross-tenant mapping;
- secret reuse;
- domain takeover;
- deletion abuse;
- export abuse;
- ownership hijack.

Controles:

- authorization;
- MFA;
- idempotency;
- tenant namespaces;
- secret isolation;
- domain verification;
- approvals;
- audit;
- anomaly detection.

## 46. Casos límite

- duplicate create;
- same key different tenant;
- provisioning step failure;
- provisioning unknown;
- Admin invitation failure;
- configuration incomplete;
- activate with provider down;
- emergency suspension;
- suspension during payment webhook;
- reactivate with compromised secret;
- terminate with pending order;
- legal hold;
- deletion partial;
- export large;
- ownership transfer;
- region change;
- config conflict.

## 47. Criterios de aceptación

AC-TADM-001

Todo tenant tiene Tenant ID.

AC-TADM-002

Todo tenant tiene estado explícito.

AC-TADM-003

Todo dato está tenant-scoped.

AC-TADM-004

La creación es idempotente.

AC-TADM-005

El provisioning es trazable.

AC-TADM-006

La suspensión no elimina datos.

AC-TADM-007

La terminación aplica retención.

AC-TADM-008

La reactivación valida dependencias.

AC-TADM-009

Los secretos usan referencias.

AC-TADM-010

Los límites se versionan.

AC-TADM-011

Los cambios sensibles tienen reason.

AC-TADM-012

Los cambios críticos pueden requerir approval.

AC-TADM-013

Los tenants se aíslan.

AC-TADM-014

La eliminación se verifica.

AC-TADM-015

Todo cambio es auditable.

## 48. Plan mínimo de pruebas

- create;
- validation;
- idempotency;
- provisioning;
- failure;
- unknown;
- defaults;
- Admin invitation;
- domains;
- channels;
- providers;
- limits;
- entitlements;
- activation;
- suspension;
- emergency suspension;
- reactivation;
- termination;
- deletion;
- legal hold;
- export;
- ownership;
- region;
- currency;
- timezone;
- version;
- rollback;
- security;
- metrics;
- audit.

## 49. Checklist

[ ] Existe Tenant ID.
[ ] Existen estados.
[ ] Existe Create Command.
[ ] Existe idempotencia.
[ ] Existe provisioning plan.
[ ] Existen provisioning steps.
[ ] Existe Admin inicial.
[ ] Existe configuración.
[ ] Existen canales.
[ ] Existen proveedores.
[ ] Existen límites.
[ ] Existe activation.
[ ] Existe suspension.
[ ] Existe reactivation.
[ ] Existe termination.
[ ] Existe deletion plan.
[ ] Existe legal hold.
[ ] Existe export.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
