======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-05-06-PAYMENT-PROVIDER-INTEGRATION.md

# INTEGRACIÓN CON PROVEEDORES DE PAGO

## 1. Objetivo

Este documento define cómo VoiceShop se integra con proveedores externos
de pago sin permitir que una LLM, un canal o un proveedor modifique
directamente el estado financiero interno.

La integración debe permitir:

- crear una intención de pago;
- obtener instrucciones seguras;
- iniciar un checkout;
- recibir webhooks;
- consultar estado;
- cancelar cuando corresponda;
- solicitar reembolso;
- conciliar resultados inciertos;
- mapear estados externos;
- preservar idempotencia;
- proteger datos sensibles.

El proveedor de pago procesa la operación externa.

VoiceShop conserva el estado oficial de negocio y su trazabilidad.

## 2. Alcance

Incluye:

- Payment Provider Adapter;
- Payment Intent;
- Checkout Session;
- external payment reference;
- autorización;
- captura;
- cancelación;
- devolución;
- reembolso;
- webhooks;
- polling;
- idempotencia;
- estados;
- UNKNOWN;
- conciliación;
- fraude como señal;
- seguridad;
- privacidad;
- observabilidad;
- QA.

No incluye:

- almacenamiento de tarjetas;
- procesamiento PCI directo;
- reglas contables completas;
- liquidación bancaria;
- interfaz propietaria específica;
- implementación concreta de una pasarela;
- aprobación manual de fondos sin evidencia oficial.

## 3. Principios

RULE-PAYINT-001

Todo proveedor de pago se accede mediante PaymentProviderPort.

RULE-PAYINT-002

La LLM nunca marca un pago como aprobado.

RULE-PAYINT-003

El frontend nunca recibe secretos permanentes.

RULE-PAYINT-004

Toda creación de pago usa Idempotency Key.

RULE-PAYINT-005

Todo webhook se valida criptográficamente cuando el proveedor lo
permita.

RULE-PAYINT-006

Todo evento se deduplica.

RULE-PAYINT-007

Los eventos fuera de orden se controlan.

RULE-PAYINT-008

Un timeout después de enviar puede producir UNKNOWN.

RULE-PAYINT-009

UNKNOWN se concilia antes de repetir.

RULE-PAYINT-010

Los montos provienen del Order o Pricing oficial.

RULE-PAYINT-011

El Cliente no controla amount, currency o status.

RULE-PAYINT-012

Los datos de tarjeta no atraviesan VoiceShop salvo arquitectura
certificada y explícita.

RULE-PAYINT-013

Los tenants se aíslan.

RULE-PAYINT-014

Toda transición financiera es auditable.

RULE-PAYINT-015

Los mensajes al Cliente no revelan detalles sensibles.

## 4. PaymentProviderPort

Operaciones conceptuales:

- get_capabilities;
- create_payment_intent;
- create_checkout_session;
- query_payment_status;
- cancel_payment;
- capture_payment;
- refund_payment;
- query_refund_status;
- validate_webhook;
- parse_webhook;
- collect_usage;
- health_check.

## 5. Capabilities

```json
{
  "provider_id": "PAYMENT-PROVIDER-A",
  "adapter_version": "1.0.0",
  "capabilities": {
    "hosted_checkout": true,
    "payment_intents": true,
    "manual_capture": false,
    "refunds": true,
    "partial_refunds": true,
    "webhooks": true,
    "idempotency": true,
    "status_query": true,
    "supported_currencies": [
      "CLP"
    ]
  },
  "status": "HEALTHY"
}
```

## 6. Estados internos de Payment

CREATED

REQUIRES_CUSTOMER_ACTION

PROCESSING

AUTHORIZED

CAPTURED

APPROVED

DECLINED

CANCELLED

EXPIRED

REFUND_PENDING

PARTIALLY_REFUNDED

REFUNDED

FAILED

UNKNOWN

## 7. Estados externos

Cada adaptador mantiene una tabla explícita:

provider status
→ internal integration status
→ allowed Payment transition

Un estado externo desconocido no debe aprobar un pago.

## 8. Payment Intent Request

```json
{
  "payment_intent_request_id": "UUID",
  "tenant_id": "UUID",
  "order_id": "UUID",
  "order_version": 8,
  "amount": {
    "value": 12500,
    "currency": "CLP"
  },
  "customer_reference": "OPAQUE_OR_NULL",
  "return_context": {
    "success_reference": "SIGNED_REFERENCE",
    "cancel_reference": "SIGNED_REFERENCE"
  },
  "metadata": {
    "internal_order_reference": "OPAQUE_SIGNED"
  },
  "idempotency_key": "STRING",
  "correlation_id": "UUID"
}
```

## 9. Payment Intent Result

```json
{
  "payment_intent_result_id": "UUID",
  "payment_intent_request_id": "UUID",
  "payment_id": "UUID",
  "external_payment_reference": "OPAQUE",
  "status": "REQUIRES_CUSTOMER_ACTION",
  "customer_action": {
    "type": "REDIRECT",
    "url_reference": "AUTHORIZED_URL_REFERENCE",
    "expires_at": "UTC_TIMESTAMP"
  },
  "provider_id": "PAYMENT-PROVIDER-A",
  "created_at": "UTC_TIMESTAMP"
}
```

## 10. Fuente de monto

El amount debe cargarse desde:

- Order Aggregate;
- Pricing Result oficial;
- impuestos oficiales;
- descuentos oficiales;
- currency del pedido.

No aceptar amount desde:

- texto del Cliente;
- Tool Proposal;
- query string;
- callback;
- LLM output;
- metadata externa no validada.

## 11. Currency

Debe:

- pertenecer al pedido;
- estar soportada;
- coincidir con el proveedor;
- usar precisión oficial;
- impedir conversiones implícitas.

## 12. Metadata

Debe minimizarse.

Puede contener:

- referencia opaca de Order;
- tenant reference protegida;
- correlation reference;
- schema version.

No incluir:

- secretos;
- descripción sensible;
- datos de tarjeta;
- PII innecesaria;
- permisos.

## 13. Hosted checkout

Preferido cuando reduce exposición.

VoiceShop debe:

- crear sesión;
- entregar URL autorizada;
- validar dominio;
- evitar open redirect;
- expirar referencia;
- verificar resultado por webhook o consulta.

El retorno del navegador no prueba aprobación.

## 14. Customer action

Tipos:

REDIRECT

QR_CODE_REFERENCE

BANK_TRANSFER_INSTRUCTIONS

APP_CONFIRMATION

NONE

La acción debe provenir del proveedor.

## 15. Retorno del Cliente

Un retorno a success URL significa:

"El Cliente volvió."

No significa:

"El pago fue aprobado."

VoiceShop debe consultar o esperar evento oficial.

## 16. Webhook Envelope

```json
{
  "payment_webhook_delivery_id": "UUID",
  "provider_id": "PAYMENT-PROVIDER-A",
  "provider_event_id": "OPAQUE",
  "event_type": "PAYMENT_STATUS_CHANGED",
  "external_payment_reference": "OPAQUE",
  "occurred_at": "UTC_TIMESTAMP_OR_NULL",
  "received_at": "UTC_TIMESTAMP",
  "signature_state": "VALID",
  "payload_hash": "HASH",
  "payload_schema_version": 3
}
```

## 17. Validación de webhook

Debe verificar:

- endpoint;
- method;
- content type;
- maximum size;
- signature;
- timestamp;
- replay window;
- provider;
- event ID;
- schema;
- payment reference;
- tenant mapping;
- currency y amount cuando aparezcan.

## 18. Duplicados

Mismo provider event ID y mismo hash:

- ACK idempotente;
- no repetir transición.

Mismo event ID con payload distinto:

- conflicto de seguridad;
- no procesar;
- auditar.

## 19. Eventos fuera de orden

Ejemplo:

CAPTURED version 5.

Luego llega PROCESSING version 4.

No revertir.

Usar:

- provider sequence;
- event occurred_at;
- payment version;
- transition rules;
- reconciliation.

## 20. Autorización y captura

Si el proveedor separa:

AUTHORIZED

CAPTURED

VoiceShop debe declarar política.

No considerar AUTHORIZED como CAPTURED si el negocio exige captura.

## 21. Cancelación

Puede permitirse cuando:

- estado compatible;
- proveedor soporta;
- actor autorizado;
- Order state permite;
- idempotencia;
- amount no capturado o regla equivalente.

## 22. Reembolso

Debe incluir:

- Payment ID;
- amount;
- currency;
- reason;
- Order reference;
- actor;
- authorization;
- expected Payment version;
- Idempotency Key.

## 23. Reembolso parcial

Debe validar:

- monto positivo;
- no exceder capturado restante;
- currency;
- policy;
- approval;
- acumulado previo;
- estado.

## 24. Refund Request

```json
{
  "refund_request_id": "UUID",
  "tenant_id": "UUID",
  "payment_id": "UUID",
  "payment_version": 9,
  "amount": {
    "value": 2500,
    "currency": "CLP"
  },
  "reason_code": "ORDER_PARTIAL_CANCELLATION",
  "actor_id": "UUID",
  "approval_reference": "UUID_OR_NULL",
  "idempotency_key": "STRING",
  "correlation_id": "UUID"
}
```

## 25. Idempotencia

Scope:

tenant
+ provider
+ operation
+ Payment ID o Order ID
+ semantic payload

Misma clave y payload:

- mismo resultado.

Misma clave y payload distinto:

- PAYMENT_IDEMPOTENCY_CONFLICT.

## 26. Provider idempotency

Si existe:

- enviar key derivada;
- conservar provider result;
- validar response.

Si no:

- usar registro interno;
- buscar por external reference;
- conciliar;
- no reintentar ciegamente.

## 27. Timeout antes de enviar

Puede clasificarse FAILED_RETRYABLE.

## 28. Timeout después de enviar

Puede ser UNKNOWN.

Debe:

- guardar request;
- guardar idempotency;
- consultar proveedor;
- esperar webhook;
- conciliar.

## 29. Conciliación

Fuentes:

- external payment reference;
- provider idempotency;
- status endpoint;
- webhook inbox;
- provider report;
- ledger interno;
- manual review.

## 30. Payment Reconciliation Record

```json
{
  "payment_reconciliation_id": "UUID",
  "payment_id": "UUID",
  "status_before": "UNKNOWN",
  "status_after": "APPROVED",
  "evidence": [
    "PROVIDER_STATUS_QUERY",
    "SIGNED_WEBHOOK"
  ],
  "resolved_at": "UTC_TIMESTAMP"
}
```

## 31. Fraud signals

El proveedor puede enviar señales.

Deben tratarse como:

- señal;
- score;
- reason code;
- recommendation.

No cambiar roles ni permisos.

La decisión final sigue política interna.

## 32. Voice interaction

La voz puede:

- explicar estado;
- ofrecer enlace;
- consultar pago;
- solicitar cancelación;
- iniciar reembolso sólo para actor autorizado.

La voz no debe pedir:

- número completo de tarjeta;
- CVV;
- contraseña;
- clave bancaria;
- OTP.

## 33. Texto y UI

Puede mostrar:

- botón pagar;
- estado;
- expiración;
- instrucciones;
- comprobante referenciado;
- soporte.

El botón debe estar firmado y vinculado al Payment ID.

## 34. Comprobantes

No usar imagen o texto enviado por Cliente como aprobación.

Puede almacenarse como evidencia no verificada.

La aprobación proviene del proveedor o proceso humano autorizado.

## 35. Seguridad

- secrets backend;
- hosted checkout;
- TLS;
- signatures;
- replay protection;
- allowlist;
- tenant;
- amount validation;
- currency validation;
- no card data;
- no OTP;
- no open redirects;
- audit.

## 36. Privacidad

Minimizar:

- nombre;
- email;
- teléfono;
- dirección;
- metadata.

Documentar:

- región;
- retención;
- subprocesadores;
- finalidad;
- eliminación.

## 37. Flujo de creación

1. recibir StartPayment Command.
2. validar actor y Order.
3. validar Order version.
4. cargar amount oficial.
5. seleccionar provider.
6. construir request.
7. consultar idempotencia.
8. enviar.
9. mapear estado.
10. persistir Payment.
11. persistir outbox.
12. devolver acción.
13. conciliar UNKNOWN.

## 38. Flujo de webhook

1. recibir.
2. validar firma.
3. persistir Inbox.
4. deduplicar.
5. mapear Payment.
6. validar tenant.
7. validar transición.
8. aplicar estado.
9. persistir.
10. emitir evento.
11. ACK.

## 39. Pseudocódigo

```text
function create_payment_intent(command):

    authenticate_and_authorize(command.actor_id, START_PAYMENT)
    order = load_order(command.order_id)
    validate_order_version(order, command.order_version)
    validate_order_payment_state(order)

    amount = calculate_official_payable_amount(order)
    provider = select_payment_provider(order, command.tenant_id)

    request = build_payment_intent_request(
        order=order,
        amount=amount,
        provider=provider,
        idempotency_key=command.idempotency_key
    )

    previous = get_idempotent_result(request.idempotency_key)
    if previous.exists:
        return previous

    result = provider.create_payment_intent(request)

    if result.status == UNKNOWN:
        persist_unknown_payment(result)
        schedule_payment_reconciliation(result)
        return result

    payment = create_or_update_payment_aggregate(result, order)
    persist_payment_and_outbox(payment)
    emit(PaymentIntentCreated)

    return build_customer_payment_action(payment, result)
```

## 40. Errores

PAYMENT_PROVIDER_NOT_CONFIGURED

PAYMENT_PROVIDER_UNAVAILABLE

PAYMENT_PROVIDER_TIMEOUT

PAYMENT_PROVIDER_RATE_LIMITED

PAYMENT_PROVIDER_SCHEMA_INVALID

PAYMENT_AUTHENTICATION_FAILED

PAYMENT_AUTHORIZATION_FAILED

PAYMENT_ORDER_NOT_FOUND

PAYMENT_ORDER_STATE_INVALID

PAYMENT_ORDER_VERSION_CONFLICT

PAYMENT_AMOUNT_MISMATCH

PAYMENT_CURRENCY_UNSUPPORTED

PAYMENT_IDEMPOTENCY_CONFLICT

PAYMENT_INTENT_CREATION_FAILED

PAYMENT_INTENT_RESULT_UNKNOWN

PAYMENT_WEBHOOK_SIGNATURE_INVALID

PAYMENT_WEBHOOK_REPLAY_DETECTED

PAYMENT_WEBHOOK_DUPLICATE_CONFLICT

PAYMENT_STATE_TRANSITION_INVALID

PAYMENT_CANCEL_NOT_ALLOWED

PAYMENT_REFUND_NOT_ALLOWED

PAYMENT_REFUND_AMOUNT_INVALID

PAYMENT_REFUND_RESULT_UNKNOWN

PAYMENT_RECONCILIATION_FAILED

## 41. Eventos

PaymentIntentRequested

PaymentIntentCreated

PaymentCustomerActionRequired

PaymentProcessing

PaymentAuthorized

PaymentCaptured

PaymentApproved

PaymentDeclined

PaymentCancelled

PaymentExpired

PaymentWebhookReceived

PaymentWebhookRejected

PaymentMarkedUnknown

PaymentReconciliationStarted

PaymentReconciliationCompleted

PaymentRefundRequested

PaymentRefunded

PaymentRefundMarkedUnknown

## 42. Observabilidad

Métricas:

- payment_provider_requests_total;
- payment_intents_total;
- payment_approved_total;
- payment_declined_total;
- payment_cancelled_total;
- payment_unknown_total;
- payment_webhooks_total;
- payment_webhook_rejected_total;
- payment_refunds_total;
- payment_refund_unknown_total;
- payment_reconciliation_total;
- payment_provider_duration_seconds.

Dimensiones:

- provider_class;
- operation;
- payment_method_class;
- result;
- error_code;
- currency;
- tenant_tier.

## 43. Auditoría

Registrar:

- Payment ID;
- Order ID protegido;
- tenant;
- actor;
- provider;
- amount;
- currency;
- operation;
- version before/after;
- idempotency hash;
- external reference protegida;
- status;
- reconciliation;
- Correlation ID.

No registrar datos de tarjeta.

## 44. Casos límite

- amount changed;
- order changed;
- duplicate create;
- timeout after send;
- return without webhook;
- webhook duplicate;
- webhook altered;
- event out-of-order;
- unknown external status;
- provider unavailable;
- payment approved after order expired;
- cancellation race;
- refund duplicate;
- partial refund overflow;
- currency mismatch;
- tenant mismatch;
- screenshot as proof;
- voice asks for card;
- reconciliation.

## 45. Criterios de aceptación

AC-PAYINT-001

Todo proveedor usa port.

AC-PAYINT-002

La LLM no aprueba pagos.

AC-PAYINT-003

Los secretos no salen del backend.

AC-PAYINT-004

Toda creación usa idempotencia.

AC-PAYINT-005

Todo webhook se valida.

AC-PAYINT-006

Todo evento se deduplica.

AC-PAYINT-007

Se controla ordering.

AC-PAYINT-008

UNKNOWN se concilia.

AC-PAYINT-009

El amount es oficial.

AC-PAYINT-010

Currency se valida.

AC-PAYINT-011

El retorno del Cliente no prueba aprobación.

AC-PAYINT-012

No se almacenan datos de tarjeta.

AC-PAYINT-013

Los tenants se aíslan.

AC-PAYINT-014

Los estados se mapean explícitamente.

AC-PAYINT-015

Toda transición es auditable.

## 46. Plan mínimo de pruebas

- capabilities;
- create intent;
- hosted checkout;
- amount;
- currency;
- metadata;
- idempotency;
- timeout before;
- timeout after;
- webhook signature;
- replay;
- duplicate;
- ordering;
- status mapping;
- return;
- cancel;
- refund;
- partial refund;
- unknown;
- reconciliation;
- fraud signal;
- voice;
- privacy;
- security;
- metrics;
- contract.

## 47. Checklist

[ ] Existe PaymentProviderPort.
[ ] Existen capabilities.
[ ] Existe Payment Intent Request.
[ ] Existe Payment Intent Result.
[ ] Existe Hosted Checkout.
[ ] Se valida amount.
[ ] Se valida currency.
[ ] Existe Idempotency Key.
[ ] Se valida webhook.
[ ] Se deduplican eventos.
[ ] Se controla ordering.
[ ] Existe UNKNOWN policy.
[ ] Existe reconciliation.
[ ] Existe cancellation.
[ ] Existe refund.
[ ] Se protege card data.
[ ] Se protege tenant.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
