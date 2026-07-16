======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-06-04-CONVERSATION-REVIEW-HANDOFF.md

# REVISIÓN DE CONVERSACIONES Y HANDOFF HUMANO

## 1. Objetivo

Este documento define cómo los actores autorizados del BackOffice
revisan conversaciones y controlan la transferencia entre automatización
y Operadores humanos.

El módulo debe permitir:

- localizar una conversación;
- consultar su estado;
- revisar mensajes autorizados;
- revisar eventos;
- revisar herramientas propuestas y ejecutadas;
- comprender el motivo de un handoff;
- tomar control;
- transferir control;
- devolver control a la automatización;
- agregar notas internas;
- redactar o restringir datos;
- cerrar o reabrir casos;
- conservar trazabilidad.

La revisión no debe permitir:

- modificar mensajes históricos;
- alterar resultados oficiales;
- borrar evidencia sin política;
- acceder a otro tenant;
- revelar chain-of-thought;
- ejecutar acciones de dominio sin Command;
- ocultar al actor humano real.

## 2. Alcance

Incluye:

- Conversation Search;
- Conversation View;
- Session Timeline;
- Turn Timeline;
- Tool Proposal View;
- Tool Execution View;
- Human Handoff;
- Control State;
- internal notes;
- attachments;
- redaction;
- export;
- retention;
- legal hold;
- reopening;
- access audit;
- errores;
- eventos;
- observabilidad;
- QA.

No incluye:

- diseño visual;
- proveedor de mensajería;
- reglas detalladas de carrito;
- edición física del transcript;
- analítica global completa;
- implementación de almacenamiento.

## 3. Principios

RULE-CRH-001

Toda revisión requiere Admin Session válida.

RULE-CRH-002

Toda revisión requiere tenant scope.

RULE-CRH-003

Todo acceso a contenido se audita.

RULE-CRH-004

Los mensajes históricos son inmutables.

RULE-CRH-005

Las notas internas se separan de mensajes al Cliente.

RULE-CRH-006

El chain-of-thought no se almacena ni se presenta.

RULE-CRH-007

Los datos visibles dependen de field-level authorization.

RULE-CRH-008

Toda transferencia de control posee Control Transfer ID.

RULE-CRH-009

Un solo owner controla la conversación a la vez.

RULE-CRH-010

La automatización no ejecuta durante HUMAN_ACTIVE.

RULE-CRH-011

Todo handoff conserva un Context Package.

RULE-CRH-012

Toda exportación requiere autorización adicional.

RULE-CRH-013

Las redacciones preservan evidencia.

RULE-CRH-014

La retención y legal hold prevalecen.

RULE-CRH-015

Toda operación es trazable.

## 4. Identificadores

- Conversation ID;
- Session ID;
- Turn ID;
- Message ID;
- Tool Proposal ID;
- Tool Execution ID;
- Handoff ID;
- Control Transfer ID;
- Context Package ID;
- Internal Note ID;
- Export Request ID;
- Redaction Request ID;
- Case ID;
- Correlation ID.

## 5. Estados de conversación

OPEN

ACTIVE_AUTOMATION

HANDOFF_PENDING

HUMAN_ACTIVE

WAITING_CUSTOMER

WAITING_EXTERNAL

RETURN_PENDING

CLOSED

ARCHIVED

LEGAL_HOLD

REDACTED_PARTIAL

## 6. Estados de control

AUTOMATION_ACTIVE

HANDOFF_REQUESTED

HANDOFF_QUEUED

HUMAN_CLAIMING

HUMAN_ACTIVE

HUMAN_PAUSED

RETURN_REQUESTED

AUTOMATION_RESUMING

CLOSED

## 7. Conversation Search Request

```json
{
  "conversation_search_request_id": "UUID",
  "admin_session_id": "UUID",
  "tenant_id": "UUID",
  "filters": {
    "session_id": "UUID_OR_NULL",
    "customer_reference": "PROTECTED_OR_NULL",
    "status": [
      "HUMAN_ACTIVE"
    ],
    "date_from": "UTC_TIMESTAMP",
    "date_to": "UTC_TIMESTAMP",
    "handoff_reason": null
  },
  "page": {
    "limit": 50,
    "cursor": null
  }
}
```

## 8. Search result

Debe incluir sólo campos mínimos:

- Conversation ID;
- Session ID protegido;
- status;
- channel;
- last activity;
- current owner;
- priority;
- handoff state;
- SLA state;
- warning flags.

No incluir transcript completo en la lista.

## 9. Conversation View Request

```json
{
  "conversation_view_request_id": "UUID",
  "admin_session_id": "UUID",
  "tenant_id": "UUID",
  "conversation_id": "UUID",
  "requested_sections": [
    "SUMMARY",
    "TIMELINE",
    "TOOLS",
    "HANDOFF"
  ],
  "reason_code": "CUSTOMER_SUPPORT"
}
```

## 10. Conversation View Result

```json
{
  "conversation_id": "UUID",
  "session_id": "UUID",
  "status": "HUMAN_ACTIVE",
  "control_state": "HUMAN_ACTIVE",
  "summary": {
    "known_facts": [],
    "pending_intent": null,
    "warnings": []
  },
  "timeline_reference": "OPAQUE_PAGE_REFERENCE",
  "current_owner": {
    "type": "OPERATOR",
    "actor_reference": "PROTECTED"
  },
  "retention_state": "ACTIVE",
  "field_visibility_profile": "SUPPORT_OPERATOR"
}
```

## 11. Timeline item types

CUSTOMER_MESSAGE

AUTOMATION_MESSAGE

OPERATOR_MESSAGE

SYSTEM_EVENT

TOOL_PROPOSAL

TOOL_EXECUTION

DOMAIN_EVENT

INTERNAL_NOTE

HANDOFF_EVENT

CONTROL_EVENT

ATTACHMENT_EVENT

SECURITY_EVENT

## 12. Timeline ordering

Debe usar:

- server sequence;
- occurred_at;
- received_at;
- event version;
- deterministic tie-breaker.

No ordenar sólo por reloj del Cliente.

## 13. Mensajes históricos

Son inmutables.

Si un mensaje se corrige:

- crear nueva versión o evento de corrección;
- conservar original;
- mostrar relación;
- auditar.

## 14. Tool Proposal View

Debe mostrar:

- tool name;
- argumentos redactados;
- proposal status;
- validation result;
- authorization result;
- confirmation state;
- timestamp.

No mostrar secretos.

## 15. Tool Execution View

Debe mostrar:

- Command ID;
- operation;
- status;
- official result reference;
- error code;
- idempotency state;
- version;
- correlation.

No permitir reejecución desde el detalle sin crear un nuevo Command
autorizado.

## 16. Context Package

Debe incluir:

- summary;
- customer goal;
- confirmed facts;
- pending slots;
- current cart/order references;
- warnings;
- control state;
- last delivered options;
- pending approvals;
- open external operations;
- handoff reason.

## 17. Handoff reasons

CUSTOMER_REQUEST

LOW_CONFIDENCE

REPEATED_FAILURE

PAYMENT_UNKNOWN

ORDER_EXCEPTION

INVENTORY_EXCEPTION

SECURITY_RISK

LEGAL_REQUEST

ABUSE_REVIEW

ACCESSIBILITY_NEED

OPERATOR_INITIATED

POLICY_REQUIRED

## 18. Handoff Request

```json
{
  "handoff_request_id": "UUID",
  "tenant_id": "UUID",
  "session_id": "UUID",
  "requested_by": {
    "type": "AUTOMATION",
    "id": "UUID"
  },
  "reason_code": "PAYMENT_UNKNOWN",
  "priority": "HIGH",
  "required_skills": [
    "PAYMENT_REVIEW"
  ],
  "context_package_id": "UUID",
  "idempotency_key": "STRING"
}
```

## 19. Handoff states

REQUESTED

QUEUED

OFFERED

CLAIMED

ACTIVE

TRANSFERRED

RETURNING

RETURNED

CANCELLED

FAILED

UNKNOWN

## 20. Claim handoff

Debe validar:

- Operator Session;
- tenant;
- skill;
- capacity;
- Handoff Version;
- control state;
- idempotency.

Sólo un Operador puede ganar el claim.

## 21. Control Transfer

```json
{
  "control_transfer_id": "UUID",
  "session_id": "UUID",
  "from_owner": "AUTOMATION",
  "to_owner": "OPERATOR",
  "target_actor_id": "UUID",
  "status": "COMPLETED",
  "control_version_before": 7,
  "control_version_after": 8,
  "reason_code": "PAYMENT_UNKNOWN",
  "transferred_at": "UTC_TIMESTAMP"
}
```

## 22. Atomicidad de control

La asignación y el cambio de control deben persistirse juntos o mediante
mecanismo equivalente.

No permitir:

- Work Item asignado sin control;
- control humano sin Assignment;
- dos owners activos.

## 23. Automatización durante handoff

HANDOFF_PENDING:

- puede enviar mensaje de espera;
- no inicia nuevas operaciones sensibles;
- puede completar persistencia ya iniciada;
- puede recibir mensajes.

HUMAN_ACTIVE:

- no responde automáticamente;
- no ejecuta Tool Commands;
- puede clasificar para asistencia interna si está permitido.

## 24. Mensajes durante transferencia

Deben:

- persistirse;
- ordenarse;
- entregarse al owner final;
- no perderse;
- no producir dos respuestas.

## 25. Return to Automation Request

```json
{
  "return_control_request_id": "UUID",
  "session_id": "UUID",
  "operator_actor_id": "UUID",
  "expected_control_version": 12,
  "resolution_summary": "Pago conciliado y pedido confirmado.",
  "pending_state": {
    "pending_intent": null,
    "open_actions": []
  },
  "idempotency_key": "STRING"
}
```

## 26. Condiciones de retorno

- no hay acción sensible pendiente;
- no existe Payment UNKNOWN sin owner;
- no hay aprobación pendiente;
- Context Package actualizado;
- Session activa;
- Operator autorizado;
- expected version coincide;
- Cliente no pidió permanecer con humano;
- policy permite automatización.

## 27. Return result

Debe:

- actualizar control;
- cerrar Assignment o Work Item;
- actualizar summary;
- crear evento;
- informar al Cliente cuando corresponda;
- evitar respuesta automática duplicada.

## 28. Internal Notes

Deben ser:

- INTERNAL_ONLY;
- tenant-scoped;
- author attributed;
- timestamped;
- versioned;
- redactables bajo política;
- auditables.

## 29. Notes prohibidas

No incluir:

- secretos;
- contraseñas;
- datos completos de tarjeta;
- insultos;
- especulación presentada como hecho;
- PII innecesaria;
- chain-of-thought.

## 30. Attachments

La revisión puede mostrar referencias a:

- audio;
- imagen;
- documento;
- comprobante no verificado;
- archivo de soporte.

Debe controlar:

- permiso;
- malware;
- expiry;
- tenant;
- content type;
- download audit.

## 31. Redaction

Tipos:

DISPLAY_MASKING

FIELD_REDACTION

CONTENT_REDACTION

LEGAL_RESTRICTION

DELETION_AFTER_RETENTION

La redacción no debe borrar evidencia de que existió un elemento.

## 32. Redaction Request

```json
{
  "redaction_request_id": "UUID",
  "tenant_id": "UUID",
  "conversation_id": "UUID",
  "target_reference": "UUID",
  "redaction_type": "FIELD_REDACTION",
  "fields": [
    "phone"
  ],
  "reason_code": "PRIVACY_REQUEST",
  "requested_by_actor_id": "UUID",
  "approval_reference": "UUID_OR_NULL"
}
```

## 33. Legal hold

Si existe legal hold:

- no eliminar;
- limitar redacción según policy;
- conservar original protegido;
- registrar razón;
- restringir acceso.

## 34. Export

Puede exportar:

- transcript autorizado;
- event timeline;
- attachments permitidos;
- audit summary.

Debe:

- requerir permiso;
- reason;
- filtros;
- cifrado;
- expiration;
- watermark;
- download audit;
- size limits.

## 35. Conversation Export Result

```json
{
  "conversation_export_id": "UUID",
  "status": "READY",
  "download_reference": "SIGNED_EXPIRING_REFERENCE",
  "expires_at": "UTC_TIMESTAMP",
  "checksum": "HASH",
  "redaction_profile": "CUSTOMER_EXPORT"
}
```

## 36. Cierre

La conversación puede cerrarse cuando:

- no hay owner activo;
- pending actions resueltas;
- outcome definido;
- retención asignada;
- caso vinculado cerrado o transferido.

## 37. Reapertura

Causas:

- mensaje nuevo;
- error detectado;
- operación externa cambia;
- solicitud del Cliente;
- supervisor;
- evento de pago.

Debe preservar relación con cierre anterior.

## 38. Retention states

ACTIVE

RETENTION_SCHEDULED

LEGAL_HOLD

ARCHIVED

DELETION_PENDING

PARTIALLY_REDACTED

DELETED

## 39. Acceso sensible

Lecturas de:

- transcript completo;
- attachments;
- payment discussion;
- security events;
- identity data;

pueden requerir:

- AAL2;
- reason;
- support grant;
- approval;
- field profile.

## 40. Flujo de revisión

1. autenticar Admin Session.
2. autorizar permission.
3. validar tenant.
4. registrar access reason.
5. cargar Conversation.
6. aplicar field profile.
7. cargar secciones.
8. redactar.
9. persistir access audit.
10. devolver view.

## 41. Flujo de handoff

1. recibir Handoff Request.
2. validar Session.
3. validar tenant.
4. consultar idempotencia.
5. crear Context Package.
6. crear Work Item.
7. cambiar a HANDOFF_PENDING.
8. encolar.
9. asignar.
10. transferir control.
11. emitir eventos.
12. notificar.

## 42. Pseudocódigo

```text
function claim_conversation_handoff(command):

    operator_session = load_operator_session(
        command.operator_session_id
    )
    validate_operator_session(operator_session)

    handoff = load_handoff(command.handoff_id)
    validate_tenant_scope(operator_session, handoff.tenant_id)
    validate_handoff_state(handoff, [QUEUED, OFFERED])
    validate_operator_skills(operator_session, handoff.required_skills)
    validate_handoff_version(handoff, command.expected_handoff_version)

    previous = get_idempotent_result(command.idempotency_key)
    if previous.exists:
        return previous

    assignment, transfer = atomically_assign_and_transfer_control(
        handoff=handoff,
        operator_session=operator_session
    )

    persist_assignment_transfer_and_outbox(
        assignment,
        transfer
    )

    emit(ConversationControlTransferredToHuman)
    return build_handoff_claim_result(assignment, transfer)
```

## 43. Errores

CONVERSATION_NOT_FOUND

CONVERSATION_TENANT_MISMATCH

CONVERSATION_ACCESS_DENIED

CONVERSATION_FIELD_ACCESS_DENIED

CONVERSATION_REASON_REQUIRED

CONVERSATION_TIMELINE_UNAVAILABLE

CONVERSATION_ATTACHMENT_ACCESS_DENIED

CONVERSATION_EXPORT_NOT_AUTHORIZED

CONVERSATION_EXPORT_TOO_LARGE

CONVERSATION_REDACTION_NOT_ALLOWED

CONVERSATION_LEGAL_HOLD_ACTIVE

HANDOFF_NOT_FOUND

HANDOFF_STATE_INVALID

HANDOFF_VERSION_CONFLICT

HANDOFF_ALREADY_CLAIMED

HANDOFF_OPERATOR_SKILL_MISMATCH

HANDOFF_OPERATOR_CAPACITY_EXCEEDED

HANDOFF_IDEMPOTENCY_CONFLICT

CONTROL_TRANSFER_CONFLICT

CONTROL_OWNER_MISMATCH

CONTROL_RETURN_NOT_ALLOWED

CONTROL_VERSION_CONFLICT

## 44. Eventos

ConversationViewedByAdmin

ConversationSensitiveSectionViewed

ConversationExportRequested

ConversationExportCompleted

ConversationRedactionRequested

ConversationRedacted

ConversationLegalHoldApplied

HandoffRequested

HandoffQueued

HandoffOffered

HandoffClaimed

ConversationControlTransferredToHuman

HandoffTransferred

ReturnToAutomationRequested

ConversationControlReturnedToAutomation

ConversationClosed

ConversationReopened

## 45. Observabilidad

Métricas:

- conversation_admin_views_total;
- conversation_sensitive_views_total;
- conversation_exports_total;
- conversation_export_failure_total;
- conversation_redactions_total;
- handoff_requests_total;
- handoff_queue_depth;
- handoff_claim_total;
- handoff_claim_conflict_total;
- handoff_wait_seconds;
- human_control_duration_seconds;
- control_transfer_conflict_total;
- return_to_automation_total;
- conversation_reopen_total.

Dimensiones:

- handoff_reason;
- priority;
- channel;
- control_state;
- result;
- error_code;
- tenant_tier.

## 46. Auditoría

Registrar:

- actor;
- Admin Session;
- tenant;
- conversation;
- sections viewed;
- fields visible;
- reason;
- export;
- attachment access;
- handoff;
- assignment;
- control transfer;
- redaction;
- closure;
- Correlation ID.

## 47. Seguridad

Amenazas:

- transcript scraping;
- cross-tenant access;
- hidden field access;
- attachment exfiltration;
- Operator takeover;
- dual owner;
- stale transfer;
- note leakage;
- unauthorized export;
- redaction abuse.

Controles:

- authorization;
- tenant;
- field profiles;
- AAL;
- reasons;
- approvals;
- versions;
- idempotency;
- signed downloads;
- audit;
- anomaly detection.

## 48. Casos límite

- conversation missing;
- tenant mismatch;
- transcript large;
- attachment expired;
- two Operators claim;
- message during transfer;
- automation response race;
- stale control version;
- return with pending Payment UNKNOWN;
- export with legal hold;
- redaction with approval;
- reopen after payment event;
- Operator Session expires;
- human owner disconnects;
- duplicate handoff;
- audit backend degraded.

## 49. Criterios de aceptación

AC-CRH-001

Toda revisión requiere Admin Session.

AC-CRH-002

Toda revisión respeta tenant.

AC-CRH-003

Todo acceso a contenido se audita.

AC-CRH-004

Los mensajes históricos son inmutables.

AC-CRH-005

Las notas internas se separan.

AC-CRH-006

No se expone chain-of-thought.

AC-CRH-007

Los campos se filtran.

AC-CRH-008

Toda transferencia posee ID.

AC-CRH-009

Existe un owner activo.

AC-CRH-010

La automatización no ejecuta en HUMAN_ACTIVE.

AC-CRH-011

Todo handoff conserva contexto.

AC-CRH-012

La exportación se autoriza.

AC-CRH-013

La redacción preserva evidencia.

AC-CRH-014

Legal hold prevalece.

AC-CRH-015

Toda operación es trazable.

## 50. Plan mínimo de pruebas

- search;
- view;
- field profiles;
- timeline;
- ordering;
- messages;
- tools;
- context package;
- handoff;
- claim;
- assignment;
- control;
- two Operators;
- message race;
- return;
- notes;
- attachments;
- redaction;
- legal hold;
- export;
- close;
- reopen;
- retention;
- tenant;
- security;
- metrics;
- audit.

## 51. Checklist

[ ] Existe Conversation Search.
[ ] Existe Conversation View.
[ ] Existe Timeline.
[ ] Existen field profiles.
[ ] Existe Context Package.
[ ] Existe Handoff Request.
[ ] Existen Handoff states.
[ ] Existe Assignment.
[ ] Existe Control Transfer.
[ ] Existe human control.
[ ] Existe return to automation.
[ ] Existen Internal Notes.
[ ] Existen attachments.
[ ] Existe redaction.
[ ] Existe legal hold.
[ ] Existe export.
[ ] Existe closure.
[ ] Existe reopening.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
