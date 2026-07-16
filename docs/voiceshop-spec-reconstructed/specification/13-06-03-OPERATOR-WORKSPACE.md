======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-06-03-OPERATOR-WORKSPACE.md

# ESPACIO DE TRABAJO DEL OPERADOR

## 1. Objetivo

Este documento define el comportamiento funcional del espacio de trabajo
para Operadores humanos que atienden conversaciones, incidentes,
pedidos y solicitudes de Clientes.

El Operator Workspace debe permitir que un humano:

- reciba una asignación;
- revise contexto autorizado;
- tome control de la conversación;
- responda al Cliente;
- ejecute acciones permitidas;
- solicite aprobación;
- transfiera el caso;
- agregue notas internas;
- cierre la atención;
- devuelva control a la automatización;
- preserve trazabilidad.

## 2. Alcance

Incluye:

- Operator Session;
- work queue;
- assignment;
- claim;
- release;
- transfer;
- presence;
- capacity;
- case context;
- conversation view;
- suggested responses;
- human control;
- internal notes;
- customer messages;
- actions;
- approvals;
- SLA;
- escalation;
- closure;
- errors;
- events;
- observability;
- audit;
- QA.

No incluye:

- diseño visual concreto;
- telefonía;
- nómina;
- workforce management completo;
- modificación libre de aggregates;
- aprobación de pagos sin proceso oficial.

## 3. Principios

RULE-OWS-001

Todo Operador debe estar autenticado.

RULE-OWS-002

Todo acceso debe estar autorizado por tenant.

RULE-OWS-003

Toda asignación posee Assignment ID.

RULE-OWS-004

Un caso tiene un owner humano activo a la vez, salvo colaboración
explícita.

RULE-OWS-005

El control humano prevalece sobre la automatización.

RULE-OWS-006

Las acciones usan Commands de dominio.

RULE-OWS-007

La LLM sólo puede sugerir.

RULE-OWS-008

Las notas internas nunca se envían al Cliente.

RULE-OWS-009

Los datos visibles se minimizan.

RULE-OWS-010

Toda respuesta al Cliente es trazable.

RULE-OWS-011

Toda transferencia conserva contexto.

RULE-OWS-012

Los SLA deben medirse.

RULE-OWS-013

Las asignaciones expiran o se recuperan.

RULE-OWS-014

Las acciones sensibles requieren reason y approval.

RULE-OWS-015

Todo acceso es auditable.

## 4. Actores

SUPPORT_OPERATOR

OPERATIONS_MANAGER

SPECIALIST

PAYMENT_REVIEWER

INVENTORY_MANAGER

SECURITY_OPERATOR

SUPERVISOR

AUTOMATION_CONTROLLER

## 5. Operator Session

```json
{
  "operator_session_id": "UUID",
  "admin_session_id": "UUID",
  "operator_actor_id": "UUID",
  "tenant_scope": [
    "UUID"
  ],
  "presence": "AVAILABLE",
  "capacity": {
    "maximum_active_assignments": 5,
    "current_active_assignments": 2
  },
  "skills": [
    "ORDER_SUPPORT",
    "PAYMENT_REVIEW"
  ],
  "started_at": "UTC_TIMESTAMP",
  "expires_at": "UTC_TIMESTAMP"
}
```

## 6. Presence states

OFFLINE

AVAILABLE

BUSY

AWAY

DO_NOT_DISTURB

WRAP_UP

SUSPENDED

## 7. Work Item

```json
{
  "work_item_id": "UUID",
  "tenant_id": "UUID",
  "type": "CONVERSATION_HANDOFF",
  "priority": "HIGH",
  "status": "QUEUED",
  "required_skills": [
    "ORDER_SUPPORT"
  ],
  "customer_reference": "PROTECTED_REFERENCE",
  "session_id": "UUID",
  "case_id": "UUID",
  "created_at": "UTC_TIMESTAMP",
  "sla_due_at": "UTC_TIMESTAMP"
}
```

## 8. Work Item types

CONVERSATION_HANDOFF

PAYMENT_REVIEW

ORDER_EXCEPTION

INVENTORY_EXCEPTION

SECURITY_REVIEW

CATALOG_REVIEW

RECONCILIATION

CUSTOMER_REQUEST

INCIDENT_TASK

## 9. Work Item states

QUEUED

OFFERED

CLAIMING

ASSIGNED

IN_PROGRESS

WAITING_CUSTOMER

WAITING_APPROVAL

WAITING_EXTERNAL

ESCALATED

RESOLVED

CLOSED

CANCELLED

EXPIRED

UNKNOWN

## 10. Assignment

```json
{
  "assignment_id": "UUID",
  "work_item_id": "UUID",
  "operator_actor_id": "UUID",
  "status": "ACTIVE",
  "assignment_version": 3,
  "claimed_at": "UTC_TIMESTAMP",
  "lease_expires_at": "UTC_TIMESTAMP"
}
```

## 11. Asignación automática

Puede considerar:

- tenant;
- skills;
- priority;
- capacity;
- language;
- timezone;
- presence;
- previous owner;
- conflicts;
- workload.

## 12. Asignación manual

Debe validar:

- actor;
- tenant;
- permission;
- capacity;
- skills;
- estado;
- reason cuando fuerza asignación.

## 13. Claim

Dos Operadores pueden intentar tomar un Work Item.

Debe usarse:

- expected version;
- compare-and-swap;
- lease;
- idempotency.

Sólo uno obtiene Assignment ACTIVE.

## 14. Assignment lease

Evita asignaciones huérfanas.

Debe renovarse por actividad o heartbeat.

Si expira:

- requeue;
- alert;
- conservar notas;
- no duplicar mensajes.

## 15. Capacidad

Debe limitar:

- active assignments;
- high-risk cases;
- concurrent chats;
- voice sessions;
- reviews.

Un supervisor puede reasignar bajo política.

## 16. Prioridad

LOW

NORMAL

HIGH

URGENT

CRITICAL

La prioridad debe provenir de reglas y permisos.

El Operador no debe elevar sin reason cuando la política lo exige.

## 17. SLA

Métricas:

- time to offer;
- time to claim;
- first human response;
- resolution;
- waiting time;
- transfer count;
- reopen count.

## 18. Context View

Puede contener:

- customer display data autorizada;
- Session summary;
- pending intent;
- recent messages;
- Order references;
- Payment status;
- Inventory status;
- warnings;
- prior actions;
- reason for handoff.

## 19. Datos ocultos

No mostrar por defecto:

- secrets;
- full card data;
- internal security keys;
- other tenants;
- full audit internals;
- hidden fraud models;
- unrelated conversations.

## 20. Conversation timeline

Debe distinguir:

- Customer message;
- automated response;
- Operator response;
- system event;
- internal note;
- domain action;
- approval;
- attachment;
- handoff.

## 21. Human control

Estados:

AUTOMATION_ACTIVE

HANDOFF_PENDING

HUMAN_ACTIVE

HUMAN_PAUSED

RETURN_PENDING

AUTOMATION_RESUMING

## 22. HUMAN_ACTIVE

Durante este estado:

- la automatización no ejecuta nuevas acciones;
- puede clasificar internamente si la política lo permite;
- no envía respuestas sin autorización;
- el Operador es owner;
- mensajes entrantes se presentan al Operador.

## 23. Suggested responses

Una LLM puede generar sugerencias.

Deben:

- usar contexto minimizado;
- marcarse como sugerencia;
- no enviarse automáticamente;
- validarse;
- evitar información inventada;
- respetar políticas.

## 24. Operador y Tool Actions

El Workspace presenta acciones permitidas.

Ejemplos:

- resend payment link;
- query payment;
- cancel pending order;
- release reservation;
- request inventory adjustment;
- request refund;
- transfer case.

Toda acción llama a un Command oficial.

## 25. Acción sensible

Debe mostrar:

- efecto;
- target;
- before/after;
- reason;
- approval;
- confirmation;
- idempotency;
- version.

## 26. Notas internas

```json
{
  "internal_note_id": "UUID",
  "work_item_id": "UUID",
  "author_actor_id": "UUID",
  "visibility": "INTERNAL_ONLY",
  "content": "Cliente solicita cambiar sucursal.",
  "created_at": "UTC_TIMESTAMP"
}
```

## 27. Reglas de notas

- no enviar al Cliente;
- no incluir secretos;
- minimizar PII;
- no usar para insultos o datos irrelevantes;
- auditar edición;
- retención;
- acceso por rol.

## 28. Mensaje al Cliente

Debe incluir:

- Outbound Message ID;
- Operator Actor ID;
- Session ID;
- channel;
- content;
- attachments autorizados;
- idempotency;
- sent state.

## 29. Edición de mensaje

Sólo si canal permite.

Debe conservar:

- original;
- edited version;
- reason cuando sensible;
- timestamps;
- audit.

## 30. Adjuntos

El Operador puede enviar sólo:

- archivos permitidos;
- escaneados;
- tenant-scoped;
- no secretos;
- dentro de límites.

## 31. Transferencia

Tipos:

SKILL_TRANSFER

SUPERVISOR_TRANSFER

TENANT_INTERNAL_TRANSFER

SPECIALIST_ESCALATION

SECURITY_ESCALATION

Debe conservar Context Package.

## 32. Context Package

```json
{
  "handoff_context_package_id": "UUID",
  "work_item_id": "UUID",
  "summary": "STRING",
  "pending_tasks": [],
  "known_facts": [],
  "warnings": [],
  "references": [],
  "created_at": "UTC_TIMESTAMP"
}
```

## 33. Transferencia idempotente

Misma Transfer Command:

- no crea múltiples Work Items;
- conserva target;
- devuelve resultado previo.

## 34. Escalación

Puede dispararse por:

- SLA;
- riesgo;
- payment UNKNOWN;
- security;
- threat;
- repeated failure;
- legal request;
- supervisor request.

## 35. Waiting states

WAITING_CUSTOMER

WAITING_APPROVAL

WAITING_EXTERNAL

Cada estado debe:

- tener deadline;
- owner;
- reminders;
- escalation;
- resume trigger.

## 36. Cierre

Un Work Item puede cerrar si:

- outcome definido;
- pending actions resueltas o transferidas;
- customer informed cuando corresponda;
- notes completas;
- control state resuelto;
- audit persistido.

## 37. Closure Result

```json
{
  "work_item_id": "UUID",
  "status": "CLOSED",
  "resolution_code": "CUSTOMER_ASSISTED",
  "resolution_summary": "Se cambió la sucursal de retiro.",
  "closed_by_actor_id": "UUID",
  "closed_at": "UTC_TIMESTAMP"
}
```

## 38. Reapertura

Puede permitirse por:

- mensaje nuevo;
- error;
- customer response;
- failed external action;
- supervisor.

Debe crear nueva versión o nuevo Work Item vinculado.

## 39. Retorno a automatización

Requiere:

- no acciones sensibles pendientes;
- contexto actualizado;
- pending intent válido;
- control transfer;
- mensaje al Cliente opcional;
- policy check.

## 40. Actividad concurrente

Debe controlar:

- dos Operadores;
- Operador y automatización;
- dos pestañas;
- stale Assignment;
- mensajes simultáneos;
- transfer concurrente.

## 41. Flujo de claim

1. seleccionar Work Item.
2. validar Operator Session.
3. validar tenant.
4. validar skills.
5. validar capacity.
6. cargar Work Item.
7. validar version.
8. adquirir assignment.
9. marcar ASSIGNED.
10. cambiar control si corresponde.
11. emitir evento.
12. abrir contexto.

## 42. Pseudocódigo

```text
function claim_work_item(command):

    operator_session = load_operator_session(
        command.operator_session_id
    )

    validate_operator_session(operator_session)
    validate_tenant_scope(operator_session, command.tenant_id)
    validate_operator_capacity(operator_session)

    work_item = load_work_item(command.work_item_id)
    validate_work_item_status(work_item, [QUEUED, OFFERED])
    validate_required_skills(operator_session, work_item)
    validate_work_item_version(
        work_item,
        command.expected_work_item_version
    )

    previous = get_idempotent_result(command.idempotency_key)
    if previous.exists:
        return previous

    assignment = atomically_claim_work_item(
        work_item,
        operator_session
    )

    if work_item.type == CONVERSATION_HANDOFF:
        transfer_conversation_control_to_human(
            work_item.session_id,
            assignment
        )

    persist_assignment_and_outbox(assignment)
    emit(WorkItemAssigned)

    return assignment
```

## 43. Errores

OPERATOR_SESSION_NOT_FOUND

OPERATOR_SESSION_EXPIRED

OPERATOR_SESSION_NOT_AUTHORIZED

OPERATOR_TENANT_SCOPE_DENIED

OPERATOR_NOT_AVAILABLE

OPERATOR_CAPACITY_EXCEEDED

OPERATOR_SKILL_MISMATCH

WORK_ITEM_NOT_FOUND

WORK_ITEM_STATE_INVALID

WORK_ITEM_VERSION_CONFLICT

WORK_ITEM_ALREADY_ASSIGNED

WORK_ITEM_ASSIGNMENT_LEASE_EXPIRED

WORK_ITEM_IDEMPOTENCY_CONFLICT

WORK_ITEM_TRANSFER_INVALID

WORK_ITEM_TRANSFER_TARGET_UNAVAILABLE

WORK_ITEM_SLA_EXCEEDED

WORK_ITEM_CLOSURE_INVALID

OPERATOR_ACTION_NOT_ALLOWED

OPERATOR_APPROVAL_REQUIRED

OPERATOR_MESSAGE_SEND_FAILED

OPERATOR_CONTROL_CONFLICT

## 44. Eventos

OperatorSessionStarted

OperatorPresenceChanged

WorkItemCreated

WorkItemQueued

WorkItemOffered

WorkItemClaimRequested

WorkItemAssigned

WorkItemAssignmentExpired

WorkItemStarted

WorkItemWaitingCustomer

WorkItemWaitingApproval

WorkItemEscalated

WorkItemTransferred

OperatorMessageSent

OperatorActionExecuted

WorkItemResolved

WorkItemClosed

WorkItemReopened

ConversationControlTransferredToHuman

ConversationControlReturnedToAutomation

## 45. Observabilidad

Métricas:

- operator_sessions_active;
- operator_presence_state_total;
- work_items_created_total;
- work_items_queued;
- work_item_claim_total;
- work_item_claim_conflict_total;
- work_item_assignment_expired_total;
- operator_capacity_usage_ratio;
- work_item_first_response_seconds;
- work_item_resolution_seconds;
- work_item_transfer_total;
- work_item_escalation_total;
- work_item_sla_breach_total;
- operator_actions_total;
- operator_message_failure_total.

Dimensiones:

- work_item_type;
- priority;
- skill_class;
- status;
- result;
- error_code;
- tenant_tier.

## 46. Auditoría

Registrar:

- Operador;
- Operator Session;
- tenant;
- Work Item;
- Assignment;
- messages;
- notes;
- actions;
- reasons;
- approvals;
- transfers;
- control state;
- closure;
- Correlation ID.

## 47. Seguridad

Amenazas:

- unauthorized claim;
- cross-tenant case;
- hidden data access;
- assignment theft;
- stale lease;
- note leakage;
- auto-send suggestion;
- action escalation;
- attachment abuse;
- impersonation.

Controles:

- Admin Session;
- tenant scope;
- skills;
- capacity;
- leases;
- field filtering;
- human confirmation;
- Commands;
- audit;
- rate limits.

## 48. Casos límite

- two Operators claim;
- stale version;
- lease expires;
- Operator disconnects;
- Session expires;
- capacity full;
- skill mismatch;
- customer sends during transfer;
- automation tries to respond;
- message delivery unknown;
- approval pending;
- external dependency delayed;
- transfer target unavailable;
- close with pending action;
- reopen;
- return to automation;
- cross-tenant attempt.

## 49. Criterios de aceptación

AC-OWS-001

Todo Operador está autenticado.

AC-OWS-002

Todo acceso respeta tenant.

AC-OWS-003

Toda asignación tiene Assignment ID.

AC-OWS-004

Un caso tiene un owner activo.

AC-OWS-005

El control humano prevalece.

AC-OWS-006

Las acciones usan Commands.

AC-OWS-007

La LLM sólo sugiere.

AC-OWS-008

Las notas internas no salen al Cliente.

AC-OWS-009

Los datos se minimizan.

AC-OWS-010

Toda respuesta es trazable.

AC-OWS-011

Las transferencias conservan contexto.

AC-OWS-012

Los SLA se miden.

AC-OWS-013

Las asignaciones se recuperan.

AC-OWS-014

Las acciones sensibles usan reason/approval.

AC-OWS-015

Todo acceso es auditable.

## 50. Plan mínimo de pruebas

- Operator Session;
- presence;
- capacity;
- skills;
- queue;
- offer;
- claim;
- conflict;
- lease;
- assignment recovery;
- context view;
- field filtering;
- human control;
- suggested response;
- messages;
- notes;
- actions;
- approvals;
- transfer;
- escalation;
- SLA;
- waiting;
- closure;
- reopen;
- return automation;
- concurrency;
- security;
- metrics;
- audit.

## 51. Checklist

[ ] Existe Operator Session.
[ ] Existen presence states.
[ ] Existe Work Item.
[ ] Existen Work Item states.
[ ] Existe Assignment.
[ ] Existe lease.
[ ] Existe capacity.
[ ] Existen skills.
[ ] Existe queue.
[ ] Existe claim.
[ ] Existe Context View.
[ ] Existe human control.
[ ] Existen suggestions.
[ ] Existen notes.
[ ] Existen customer messages.
[ ] Existen actions.
[ ] Existe transfer.
[ ] Existe closure.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
