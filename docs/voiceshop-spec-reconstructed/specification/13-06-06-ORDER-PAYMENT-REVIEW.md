======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-06-06-ORDER-PAYMENT-REVIEW.md

# REVISIÓN ADMINISTRATIVA DE PEDIDOS Y PAGOS

## 1. Objetivo

Este documento define cómo actores autorizados revisan pedidos, pagos,
excepciones y operaciones relacionadas desde BackOffice.

El módulo debe permitir:

- localizar pedidos;
- consultar estados;
- revisar líneas y totales autorizados;
- revisar timeline;
- revisar reservas;
- revisar pagos;
- revisar webhooks;
- conciliar UNKNOWN;
- cancelar bajo política;
- solicitar reembolso;
- aprobar reembolso;
- corregir referencias no financieras;
- escalar incidentes;
- mantener auditoría.

El BackOffice no debe permitir:

- editar montos históricos;
- marcar pagos como aprobados manualmente sin proceso oficial;
- borrar eventos;
- cambiar estados arbitrariamente;
- reembolsar sin autorización;
- acceder a otro tenant;
- reutilizar aprobaciones.

## 2. Alcance

Incluye:

- Order Search;
- Order View;
- Payment View;
- timelines;
- status;
- versions;
- customer-safe data;
- cancellation;
- refund;
- reconciliation;
- provider references;
- exceptions;
- manual review;
- evidence;
- approvals;
- idempotency;
- errors;
- events;
- observability;
- audit;
- QA.

No incluye:

- contabilidad completa;
- settlement bancario;
- almacenamiento de tarjetas;
- edición directa de ledger;
- interfaz concreta;
- fulfillment físico detallado.

## 3. Principios

RULE-OPR-001

Toda revisión requiere Admin Session.

RULE-OPR-002

Toda revisión respeta tenant.

RULE-OPR-003

Toda lectura sensible se audita.

RULE-OPR-004

El Order Aggregate es fuente oficial del pedido.

RULE-OPR-005

El Payment Aggregate es fuente oficial del estado interno de pago.

RULE-OPR-006

El proveedor aporta evidencia externa.

RULE-OPR-007

La LLM no aprueba pagos.

RULE-OPR-008

No existen cambios directos de status.

RULE-OPR-009

Toda cancelación usa Command.

RULE-OPR-010

Todo reembolso usa Command e idempotencia.

RULE-OPR-011

Toda operación financiera valida versión.

RULE-OPR-012

Las operaciones sensibles requieren reason.

RULE-OPR-013

Las operaciones críticas pueden requerir dual control.

RULE-OPR-014

UNKNOWN se concilia.

RULE-OPR-015

Toda operación es auditable.

## 4. Roles

ORDER_VIEWER

ORDER_MANAGER

PAYMENT_REVIEWER

REFUND_REQUESTER

REFUND_APPROVER

OPERATIONS_MANAGER

SECURITY_AUDITOR

READ_ONLY_AUDITOR

## 5. Order Search Request

```json
{
  "order_search_request_id": "UUID",
  "admin_session_id": "UUID",
  "tenant_id": "UUID",
  "filters": {
    "order_id": "UUID_OR_NULL",
    "customer_reference": "PROTECTED_OR_NULL",
    "status": [
      "PAYMENT_PENDING"
    ],
    "payment_status": [
      "UNKNOWN"
    ],
    "date_from": "UTC_TIMESTAMP",
    "date_to": "UTC_TIMESTAMP",
    "location_id": null
  },
  "page": {
    "limit": 50,
    "cursor": null
  }
}
```

## 6. Order Search Result

Debe incluir:

- Order ID;
- display reference;
- status;
- total;
- currency;
- Payment status;
- fulfillment state;
- created_at;
- last update;
- exception flags;
- current owner;
- SLA state.

No incluir datos completos del Cliente.

## 7. Order View

Secciones:

SUMMARY

LINES

PRICING

INVENTORY

PAYMENT

FULFILLMENT

TIMELINE

EXCEPTIONS

AUDIT_SUMMARY

## 8. Order Summary

```json
{
  "order_id": "UUID",
  "order_version": 12,
  "status": "PAYMENT_PENDING",
  "tenant_id": "UUID",
  "customer_reference": "PROTECTED",
  "totals": {
    "subtotal": 10000,
    "tax": 1900,
    "discount": 0,
    "total": 11900,
    "currency": "CLP"
  },
  "payment_state": "UNKNOWN",
  "inventory_state": "RESERVED",
  "created_at": "UTC_TIMESTAMP"
}
```

## 9. Field-level visibility

El rol determina acceso a:

- customer contact;
- delivery address;
- pricing details;
- fraud signals;
- provider metadata;
- evidence;
- internal notes.

## 10. Order Timeline

Tipos:

OrderCreated

OrderLineAdded

OrderPriced

StockReserved

PaymentIntentCreated

PaymentApproved

PaymentMarkedUnknown

OrderConfirmed

OrderCancelled

RefundRequested

RefundCompleted

FulfillmentStarted

OperatorAction

ReconciliationEvent

## 11. Inmutabilidad

Los eventos históricos no se editan.

Las correcciones generan:

- nuevo evento;
- nueva versión;
- reason;
- actor;
- audit.

## 12. Payment View

Debe mostrar:

- Payment ID;
- Payment Version;
- internal status;
- provider;
- external reference protegida;
- amount;
- currency;
- customer action;
- webhooks;
- reconciliations;
- refunds;
- error codes;
- timestamps.

No mostrar datos de tarjeta.

## 13. Payment evidence

Tipos:

SIGNED_WEBHOOK

STATUS_QUERY

PROVIDER_REFERENCE

PROVIDER_REPORT

INTERNAL_LEDGER

CUSTOMER_RETURN

CUSTOMER_UPLOAD_UNVERIFIED

MANUAL_REVIEW

CUSTOMER_RETURN y upload no aprueban pago.

## 14. Webhook Review

Debe mostrar:

- event type;
- provider event reference;
- signature state;
- duplicate state;
- ordering;
- mapped transition;
- rejection reason;
- received_at.

Raw payload se restringe.

## 15. UNKNOWN

Puede existir en:

- Payment;
- refund;
- ERP export;
- message delivery;
- inventory commit.

La revisión debe mostrar:

- unknown_since;
- attempts;
- evidence;
- reconciliation owner;
- deadline;
- current risk;
- blocked operations.

## 16. Reconciliation Request

```json
{
  "payment_reconciliation_admin_request_id": "UUID",
  "tenant_id": "UUID",
  "payment_id": "UUID",
  "expected_payment_version": 9,
  "reason_code": "PAYMENT_RESULT_UNKNOWN",
  "requested_by_actor_id": "UUID",
  "idempotency_key": "STRING"
}
```

## 17. Reconciliation actions

- query provider;
- inspect webhook inbox;
- inspect idempotency;
- inspect ledger;
- compare amount/currency;
- request manual review;
- classify final state.

## 18. Reconciliation result

RESOLVED_APPROVED

RESOLVED_DECLINED

RESOLVED_CANCELLED

RESOLVED_NOT_CREATED

STILL_UNKNOWN

CONFLICTING_EVIDENCE

MANUAL_REVIEW_REQUIRED

FAILED

## 19. Cancel Order

Debe validar:

- Order state;
- Payment state;
- Inventory state;
- fulfillment;
- actor;
- reason;
- expected version;
- approval;
- idempotency.

## 20. Cancel Order Request

```json
{
  "cancel_order_admin_command_id": "UUID",
  "tenant_id": "UUID",
  "order_id": "UUID",
  "expected_order_version": 12,
  "reason_code": "CUSTOMER_REQUEST",
  "requested_by_actor_id": "UUID",
  "approval_reference": "UUID_OR_NULL",
  "idempotency_key": "STRING"
}
```

## 21. Cancel side effects

Puede requerir:

- cancelar Payment Intent;
- liberar reserva;
- detener fulfillment;
- crear refund;
- notificar Cliente;
- exportar cambio a ERP.

Debe coordinarse mediante dominio/saga.

## 22. Cancelación prohibida

Puede estar prohibida si:

- pedido entregado;
- refund requerido;
- Payment UNKNOWN;
- legal hold;
- fulfillment irreversible;
- actor no autorizado.

## 23. Refund Request

Debe utilizar Payment Refund Command.

Campos:

- Payment ID;
- Payment Version;
- amount;
- currency;
- reason;
- evidence;
- actor;
- approval;
- idempotency.

## 24. Refund Preview

Antes de solicitar debe mostrar:

- captured amount;
- refunded amount;
- refundable remaining;
- requested amount;
- currency;
- Order impact;
- provider capability;
- approval requirement;
- warnings.

## 25. Full refund

Debe validar:

requested == refundable remaining

o política equivalente.

## 26. Partial refund

Debe validar:

- positive amount;
- remaining;
- line/order relation;
- tax policy;
- approval;
- cumulative refunds.

## 27. Approval

Puede exigir:

- requester ≠ approver;
- amount threshold;
- risk;
- tenant;
- exact payload hash;
- expiry;
- single use;
- AAL.

## 28. Self approval

Prohibida cuando dual control esté activo.

## 29. Refund UNKNOWN

No reintentar ciegamente.

Debe:

- consultar provider;
- revisar idempotency;
- revisar webhook;
- conciliar;
- bloquear otro refund sobre la misma cantidad.

## 30. Manual payment marking

Por defecto prohibido.

Si existe un método offline:

- debe ser un Payment Method oficial;
- requiere evidencia;
- actor;
- approval;
- ledger;
- reason;
- no usa status edit manual.

## 31. Comprobantes del Cliente

Se clasifican:

UNVERIFIED_CUSTOMER_EVIDENCE

Pueden iniciar revisión.

No confirman pago.

## 32. Corrección de datos no financieros

Puede corregirse:

- etiqueta;
- nota;
- contacto;
- referencia logística;
- dirección antes del corte, bajo Command.

No modificar:

- total histórico;
- currency;
- tax result;
- Payment evidence;
- audit.

## 33. Order Exception

Tipos:

PAYMENT_UNKNOWN

INVENTORY_CONFLICT

FULFILLMENT_BLOCKED

ADDRESS_INVALID

CUSTOMER_DISPUTE

ERP_EXPORT_UNKNOWN

REFUND_UNKNOWN

SECURITY_REVIEW

LEGAL_HOLD

## 34. Exception Case

Debe tener:

- Case ID;
- owner;
- priority;
- status;
- reason;
- evidence;
- deadline;
- resolution;
- related aggregates.

## 35. Manual review

Estados:

REQUESTED

QUEUED

ASSIGNED

IN_PROGRESS

WAITING_EXTERNAL

WAITING_CUSTOMER

RESOLVED

CLOSED

FAILED

## 36. Customer communication

Todo mensaje administrativo al Cliente debe:

- usar canal oficial;
- basarse en estado oficial;
- evitar detalles internos;
- incluir referencia;
- ser trazable.

## 37. Export

Puede exportar:

- Order summary;
- invoice reference;
- Payment timeline;
- refund evidence;
- audit summary.

Debe respetar privacidad, cifrado y expiración.

## 38. Flujo de cancelación

1. autenticar.
2. autorizar.
3. cargar Order.
4. validar tenant.
5. validar Order Version.
6. cargar Payment/Inventory/Fulfillment states.
7. construir preview.
8. validar reason.
9. obtener approval.
10. consultar idempotencia.
11. ejecutar CancelOrder.
12. coordinar side effects.
13. persistir events.
14. auditar.
15. notificar.

## 39. Flujo de refund

1. autenticar.
2. autorizar.
3. cargar Payment.
4. validar tenant.
5. validar Payment Version.
6. calcular refundable.
7. construir preview.
8. validar reason/evidence.
9. obtener approval.
10. ejecutar RefundPayment.
11. manejar UNKNOWN.
12. persistir.
13. auditar.
14. notificar.

## 40. Pseudocódigo de refund

```text
function request_admin_refund(command):

    authorize_admin_operation(
        command.admin_session_id,
        permission="payment.refund.execute",
        tenant_id=command.tenant_id
    )

    payment = load_payment(command.payment_id)
    validate_payment_tenant(payment, command.tenant_id)
    validate_payment_version(
        payment,
        command.expected_payment_version
    )

    preview = calculate_refund_preview(
        payment,
        command.amount
    )

    validate_refund_preview(preview)
    validate_reason(command.reason_code)

    if preview.approval_required:
        validate_approval(
            command.approval_reference,
            hash_refund_payload(command, preview)
        )

    previous = get_idempotent_result(command.idempotency_key)
    if previous.exists:
        return previous

    result = execute_refund_payment_command(command, preview)

    if result.status == UNKNOWN:
        schedule_payment_reconciliation(result)

    persist_admin_refund_audit(command, result)
    return result
```

## 41. Errores

ORDER_ADMIN_NOT_FOUND

ORDER_ADMIN_TENANT_MISMATCH

ORDER_ADMIN_ACCESS_DENIED

ORDER_ADMIN_FIELD_ACCESS_DENIED

ORDER_ADMIN_VERSION_CONFLICT

ORDER_ADMIN_STATE_INVALID

ORDER_ADMIN_CANCELLATION_NOT_ALLOWED

ORDER_ADMIN_REASON_REQUIRED

ORDER_ADMIN_APPROVAL_REQUIRED

ORDER_ADMIN_APPROVAL_INVALID

ORDER_ADMIN_IDEMPOTENCY_CONFLICT

ORDER_ADMIN_SIDE_EFFECT_FAILED

PAYMENT_ADMIN_NOT_FOUND

PAYMENT_ADMIN_TENANT_MISMATCH

PAYMENT_ADMIN_VERSION_CONFLICT

PAYMENT_ADMIN_STATE_INVALID

PAYMENT_ADMIN_RECONCILIATION_REQUIRED

PAYMENT_ADMIN_RECONCILIATION_FAILED

PAYMENT_ADMIN_REFUND_NOT_ALLOWED

PAYMENT_ADMIN_REFUND_AMOUNT_INVALID

PAYMENT_ADMIN_REFUND_APPROVAL_REQUIRED

PAYMENT_ADMIN_REFUND_UNKNOWN

PAYMENT_ADMIN_MANUAL_APPROVAL_PROHIBITED

## 42. Eventos

OrderAdminViewed

OrderSensitiveSectionViewed

OrderCancellationPreviewCreated

OrderAdminCancellationRequested

OrderAdminCancelled

OrderAdminCancellationFailed

PaymentAdminViewed

PaymentWebhookReviewed

PaymentAdminReconciliationRequested

PaymentAdminReconciled

RefundPreviewCreated

AdminRefundRequested

AdminRefundApproved

AdminRefundRejected

AdminRefundCompleted

AdminRefundMarkedUnknown

OrderPaymentExceptionCreated

OrderPaymentExceptionResolved

## 43. Observabilidad

Métricas:

- order_admin_views_total;
- order_admin_sensitive_views_total;
- order_admin_cancellation_requests_total;
- order_admin_cancellation_failure_total;
- payment_admin_views_total;
- payment_admin_unknown_total;
- payment_admin_reconciliation_total;
- payment_admin_reconciliation_failure_total;
- admin_refund_requests_total;
- admin_refund_approval_total;
- admin_refund_failure_total;
- admin_refund_unknown_total;
- order_payment_exception_total;
- order_payment_review_duration_seconds.

Dimensiones:

- operation;
- order_status;
- payment_status;
- exception_type;
- risk;
- result;
- error_code;
- approval_required;
- tenant_tier.

## 44. Auditoría

Registrar:

- actor;
- Admin Session;
- tenant;
- Order ID protegido;
- Payment ID protegido;
- sections viewed;
- versions;
- amount/currency;
- reason;
- evidence;
- approval;
- idempotency hash;
- reconciliation;
- result;
- Correlation ID.

## 45. Seguridad

Amenazas:

- unauthorized refund;
- self approval;
- amount manipulation;
- status edit;
- cross-tenant order;
- provider reference leakage;
- evidence forgery;
- duplicate refund;
- UNKNOWN retry;
- transcript/payment data exfiltration.

Controles:

- roles;
- tenant;
- field visibility;
- Commands;
- official amount;
- approvals;
- payload hash;
- idempotency;
- versions;
- audit;
- anomaly detection.

## 46. Casos límite

- Order missing;
- tenant mismatch;
- Order Version stale;
- Payment UNKNOWN;
- cancellation during fulfillment;
- cancellation after approval;
- refund duplicate;
- partial refund overflow;
- approval expired;
- self approval;
- provider timeout;
- refund UNKNOWN;
- conflicting webhooks;
- customer screenshot;
- offline payment;
- legal hold;
- export request;
- operator permission revoked.

## 47. Criterios de aceptación

AC-OPR-001

Toda revisión requiere Admin Session.

AC-OPR-002

Toda revisión respeta tenant.

AC-OPR-003

Toda lectura sensible se audita.

AC-OPR-004

Order Aggregate es fuente oficial.

AC-OPR-005

Payment Aggregate es fuente interna oficial.

AC-OPR-006

El proveedor aporta evidencia externa.

AC-OPR-007

La LLM no aprueba pagos.

AC-OPR-008

No existen cambios directos de status.

AC-OPR-009

Toda cancelación usa Command.

AC-OPR-010

Todo refund usa Command e idempotencia.

AC-OPR-011

Las operaciones validan version.

AC-OPR-012

Las operaciones sensibles tienen reason.

AC-OPR-013

Las operaciones críticas soportan dual control.

AC-OPR-014

UNKNOWN se concilia.

AC-OPR-015

Toda operación es auditable.

## 48. Plan mínimo de pruebas

- search;
- Order View;
- Payment View;
- field profiles;
- timeline;
- webhook review;
- UNKNOWN;
- reconciliation;
- cancellation preview;
- cancellation;
- side effects;
- refund preview;
- full refund;
- partial refund;
- approval;
- self approval;
- duplicate;
- timeout;
- refund UNKNOWN;
- offline evidence;
- exceptions;
- customer communication;
- export;
- tenant;
- security;
- metrics;
- audit.

## 49. Checklist

[ ] Existe Order Search.
[ ] Existe Order View.
[ ] Existe Payment View.
[ ] Existen field profiles.
[ ] Existe timeline.
[ ] Existe webhook review.
[ ] Existe UNKNOWN view.
[ ] Existe reconciliation.
[ ] Existe cancellation preview.
[ ] Existe CancelOrder Command.
[ ] Existe refund preview.
[ ] Existe RefundPayment Command.
[ ] Existe approval.
[ ] Existe dual control.
[ ] Existe idempotency.
[ ] Existe version validation.
[ ] Existen exceptions.
[ ] Existe export.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
