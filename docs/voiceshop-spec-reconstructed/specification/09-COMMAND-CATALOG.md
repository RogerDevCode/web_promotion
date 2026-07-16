======================================================================
Documento    : 09-COMMAND-CATALOG.md
Versión      : 1.0
Estado       : DRAFT
Fecha        : 2026-07-16
Autor        : VoiceShop Framework
Clasificación: CORE
Estabilidad  : CORE

Dependencias:
- 00-PROJECT-MANIFEST.md
- 01-VISION.md
- 02-GLOSSARY.md
- 03-REQUIREMENTS.md
- 04-BUSINESS-RULES.md
- 05-ACTORS.md
- 06-USE-CASES.md
- 07-FUNCTIONAL-MODULES.md
- 08-EVENT-CATALOG.md

Documentos dependientes:
- 10-STATE-MACHINES.md
- 11-SEQUENCE-DIAGRAMS.md
- 12-DOMAIN-MODEL.md
- 13-FUNCTIONAL-SPECIFICATION.md
- 14-API-CONTRACT.md
- 17-SECURITY.md
- 19-ERROR-HANDLING.md
- 21-TEST-PLAN.md
=================

# COMMAND CATALOG

---

1. Objetivo

---

Este documento define todos los comandos oficiales de VoiceShop.

Un comando representa una solicitud explícita para ejecutar una operación
que puede modificar el estado del sistema.

Un comando expresa una intención.

Un evento expresa un hecho ocurrido.

Ejemplo:

Comando:

AddProductToCart

Evento resultante:

ProductAddedToCart

La recepción de un comando no garantiza su ejecución.

Antes de ejecutarlo, el sistema debe:

1. validar estructura;
2. identificar al actor;
3. autenticar cuando corresponda;
4. autorizar la operación;
5. comprobar idempotencia;
6. cargar el estado vigente;
7. validar las reglas del negocio;
8. ejecutar de forma atómica o compensable;
9. persistir el resultado;
10. publicar los eventos correspondientes.

---

2. Diferencia entre comando, consulta y evento

---

COMMAND

Solicita modificar estado.

Ejemplo:

ConfirmOrder

QUERY

Solicita leer información sin modificar el estado comercial.

Ejemplo:

GetOrderStatus

EVENT

Declara que un hecho ya ocurrió.

Ejemplo:

OrderConfirmed

Regla:

Los comandos y las consultas no deben utilizarse como sinónimos.

---

3. Convenciones de nombres

---

Los comandos deben escribirse en inglés y comenzar con un verbo en
infinitivo operativo.

Ejemplos correctos:

CreateSession
AddProductToCart
ConfirmOrder
AssignOperator

Ejemplos incorrectos:

SessionCreation
ProductAdded
OrderConfirmed
Data

Los eventos deben usar pasado.

Ejemplo:

ConfirmOrder
↓
OrderConfirmed

---

4. Identificadores

---

Cada comando utilizará el formato:

CMD-<DOMINIO>-<NÚMERO>

Ejemplos:

CMD-SESSION-001
CMD-CART-002
CMD-ORDER-003

Los comandos nunca compartirán identificador.

Un identificador retirado no puede reutilizarse.

---

5. Estructura obligatoria

---

Todo comando debe declarar:

* Command ID;
* nombre;
* versión;
* descripción;
* actor iniciador;
* canal de entrada;
* handler;
* aggregate objetivo;
* caso de uso relacionado;
* requisitos relacionados;
* reglas relacionadas;
* nivel de autorización;
* payload;
* validaciones;
* precondiciones;
* estrategia de idempotencia;
* estrategia de concurrencia;
* timeout;
* política de reintento;
* resultado;
* eventos producidos;
* errores posibles;
* auditoría;
* observabilidad;
* datos sensibles;
* criterios de aceptación.

---

6. Sobre de comando

---

Todo comando debe viajar dentro de un sobre equivalente al siguiente:

{
"command_id": "UUID",
"command_name": "AddProductToCart",
"command_version": 1,
"occurred_at": "2026-07-16T15:00:00Z",
"actor": {
"actor_id": "ACTOR-UUID",
"actor_type": "CLIENT",
"role": "CLIENT"
},
"context": {
"request_id": "UUID",
"correlation_id": "UUID",
"causation_id": "UUID-OR-NULL",
"session_id": "UUID-OR-NULL",
"channel": "WEB",
"tenant_id": "UUID",
"locale": "es-CL"
},
"control": {
"idempotency_key": "STRING",
"expected_version": 3,
"expires_at": "2026-07-16T15:05:00Z"
},
"payload": {}
}

Regla:

El payload contiene únicamente los datos específicos del comando.

Los metadatos comunes pertenecen al sobre.

---

7. Principios obligatorios

---

RULE-CMD-001

Todo comando debe dirigirse a un único handler lógico.

---

RULE-CMD-002

El handler puede coordinar servicios, pero no debe contener reglas
comerciales duplicadas.

---

RULE-CMD-003

Todo comando de escritura debe ser idempotente cuando pueda repetirse.

---

RULE-CMD-004

Un comando no debe confiar en precios, totales, descuentos, roles o
permisos enviados por el cliente.

---

RULE-CMD-005

Un comando debe validar la versión esperada del aggregate cuando exista
riesgo de concurrencia.

---

RULE-CMD-006

Un comando rechazado no genera eventos de éxito.

---

RULE-CMD-007

Un comando rechazado puede generar eventos técnicos o de seguridad.

Ejemplos:

CommandRejected
AuthorizationDenied
ValidationFailed

---

RULE-CMD-008

Un comando ejecutado correctamente debe producir un resultado
determinístico para el mismo estado y entrada válida.

---

RULE-CMD-009

Una LLM puede proponer un comando estructurado.

La LLM no puede autorizarlo ni ejecutarlo directamente.

---

RULE-CMD-010

Todo comando sensible debe quedar auditado.

---

RULE-CMD-011

Los comandos expirados deben rechazarse.

---

RULE-CMD-012

Los comandos no deben utilizarse como mecanismo para transferir archivos
o datos arbitrarios sin un contrato explícito.

---

RULE-CMD-013

Un comando debe incluir únicamente los datos mínimos necesarios.

---

RULE-CMD-014

Un timeout no debe interpretarse automáticamente como fracaso definitivo.

El sistema debe consultar el estado de la operación antes de reintentar
acciones externas no idempotentes.

---

RULE-CMD-015

Un comando no puede modificar más de un aggregate transaccional sin una
estrategia explícita de consistencia.

---

8. Estados de procesamiento

---

RECEIVED

El comando fue recibido.

VALIDATING

Se está validando su estructura.

REJECTED

El comando fue rechazado antes de ejecutarse.

AUTHORIZED

El actor fue autorizado.

PROCESSING

El handler está procesando el comando.

COMPLETED

El comando terminó correctamente.

FAILED

El procesamiento terminó con un error conocido.

TIMED_OUT

No se obtuvo una respuesta dentro del límite.

COMPENSATING

Se está revirtiendo o compensando una operación parcial.

COMPENSATED

La operación parcial fue compensada.

UNKNOWN

No puede determinarse aún el resultado de una dependencia externa.

Regla:

UNKNOWN requiere conciliación.

Nunca debe convertirse automáticamente en COMPLETED o FAILED sin
evidencia.

---

9. Resultado estándar

---

Todo handler debe devolver un resultado equivalente a:

{
"command_id": "UUID",
"status": "COMPLETED",
"aggregate_id": "UUID",
"aggregate_version": 4,
"result": {},
"event_ids": [
"UUID"
],
"error": null
}

Cuando falle:

{
"command_id": "UUID",
"status": "REJECTED",
"aggregate_id": null,
"aggregate_version": null,
"result": null,
"event_ids": [],
"error": {
"code": "CART_QUANTITY_INVALID",
"message": "La cantidad solicitada no es válida.",
"retryable": false
}
}

---

10. Catálogo general

---

Sesiones:

CMD-SESSION-001 CreateSession
CMD-SESSION-002 RecoverSession
CMD-SESSION-003 CloseSession
CMD-SESSION-004 ExpireSession

Conversación:

CMD-CONV-001 ReceiveTextMessage
CMD-CONV-002 RegisterNormalizedMessage
CMD-CONV-003 RequestClarification
CMD-CONV-004 DeliverResponse
CMD-CONV-005 CloseConversationTurn

Voz:

CMD-VOICE-001 StartVoiceSession
CMD-VOICE-002 AppendAudio
CMD-VOICE-003 CommitAudioTurn
CMD-VOICE-004 InterruptVoiceResponse
CMD-VOICE-005 EndVoiceSession

Carrito:

CMD-CART-001 CreateCart
CMD-CART-002 AddProductToCart
CMD-CART-003 ChangeCartItemQuantity
CMD-CART-004 RemoveProductFromCart
CMD-CART-005 RecalculateCart
CMD-CART-006 AbandonCart
CMD-CART-007 CloseCart

Pedidos:

CMD-ORDER-001 CreateOrderFromCart
CMD-ORDER-002 ValidateOrder
CMD-ORDER-003 ConfirmOrder
CMD-ORDER-004 CancelOrder
CMD-ORDER-005 MarkOrderDelivered

Inventario:

CMD-STOCK-001 ReserveStock
CMD-STOCK-002 ReleaseStock
CMD-STOCK-003 ConsumeStock
CMD-STOCK-004 ReconcileStockReservation

Pagos:

CMD-PAY-001 StartPayment
CMD-PAY-002 RegisterPaymentResult
CMD-PAY-003 CancelPaymentIntent
CMD-PAY-004 ReconcilePayment

Atención humana:

CMD-HUMAN-001 RequestHumanHandoff
CMD-HUMAN-002 AssignOperator
CMD-HUMAN-003 TransferConversation
CMD-HUMAN-004 ReturnConversationToAutomation
CMD-HUMAN-005 CloseHumanAssistance

Identidad y permisos:

CMD-AUTH-001 AuthenticateActor
CMD-AUTH-002 RevokeSession
CMD-AUTH-003 AssignRole
CMD-AUTH-004 RemoveRole
CMD-AUTH-005 SuspendActor

Administración:

CMD-ADMIN-001 UpdateBusinessConfiguration
CMD-ADMIN-002 EnableFeature
CMD-ADMIN-003 DisableFeature
CMD-ADMIN-004 RotateProviderCredential
CMD-ADMIN-005 UpdateProviderConfiguration

Operaciones:

CMD-SYS-001 ExecuteScheduledTask
CMD-SYS-002 RetryFailedOperation
CMD-SYS-003 OpenCircuitBreaker
CMD-SYS-004 CloseCircuitBreaker
CMD-SYS-005 TriggerReconciliation

======================================================================
11. CMD-SESSION-001 — CreateSession
===================================

Command ID:

CMD-SESSION-001

Nombre:

CreateSession

Versión:

1

Descripción:

Solicita crear una sesión conversacional.

Actor iniciador:

ACT-001 Cliente.
ACT-006 Canal Web.
ACT-007 Canal de Mensajería.

Handler:

SessionCommandHandler

Aggregate:

Session

Caso de uso:

UC-001

Autorización:

Pública o autenticada, según canal y operación.

Payload:

{
"external_user_id": "STRING-OR-NULL",
"channel_id": "STRING",
"interaction_mode": "TEXT_OR_VOICE",
"language": "es-CL",
"timezone": "America/Santiago"
}

Validaciones:

* Channel ID obligatorio;
* interaction_mode permitido;
* idioma soportado;
* zona horaria válida;
* actor no bloqueado;
* límite de sesiones no excedido.

Idempotencia:

Obligatoria.

Clave recomendada:

tenant_id + channel_id + external_user_id + client_request_id

Concurrencia:

Debe impedir la creación simultánea de sesiones equivalentes cuando la
política exige una sola sesión activa.

Eventos producidos:

EV-SESSION-001 SessionCreated

Eventos alternativos:

SessionRecovered, cuando se reutiliza una sesión vigente.

Errores:

SESSION_CHANNEL_INVALID
SESSION_LIMIT_EXCEEDED
ACTOR_BLOCKED
SESSION_PERSISTENCE_FAILED

Criterios de aceptación:

* no crea duplicados con la misma Idempotency Key;
* no mezcla identidades;
* devuelve Session ID;
* genera auditoría.

======================================================================
12. CMD-SESSION-002 — RecoverSession
====================================

Descripción:

Solicita recuperar una sesión existente y vigente.

Payload:

{
"session_id": "UUID-OR-NULL",
"external_user_id": "STRING-OR-NULL",
"channel_id": "STRING"
}

Precondiciones:

* la sesión existe;
* pertenece al actor;
* no está CLOSED;
* no está EXPIRED;
* el canal es compatible.

Eventos producidos:

EV-SESSION-002 SessionRecovered

Errores:

SESSION_NOT_FOUND
SESSION_EXPIRED
SESSION_ACCESS_DENIED
SESSION_CHANNEL_MISMATCH

Prohibición:

No recuperar una sesión basándose únicamente en un identificador
proporcionado por el cliente sin verificar pertenencia.

======================================================================
13. CMD-SESSION-003 — CloseSession
==================================

Descripción:

Solicita cerrar voluntariamente una sesión.

Payload:

{
"session_id": "UUID",
"reason": "STRING"
}

Precondiciones:

* sesión existente;
* actor autorizado;
* estado compatible.

Acciones coordinadas:

* finalizar voz;
* liberar recursos temporales;
* resolver reservas conforme a política;
* conservar historial;
* marcar sesión CLOSED.

Eventos producidos:

EV-SESSION-004 SessionClosed

Idempotencia:

Cerrar una sesión ya cerrada devuelve un resultado equivalente sin
duplicar efectos.

======================================================================
14. CMD-CONV-001 — ReceiveTextMessage
=====================================

Descripción:

Registra un mensaje textual recibido desde un canal.

Handler:

ConversationCommandHandler

Aggregate:

Conversation

Caso de uso:

UC-002

Payload:

{
"session_id": "UUID",
"external_message_id": "STRING",
"text": "STRING",
"sent_at": "UTC_TIMESTAMP",
"reply_to_message_id": "STRING-OR-NULL"
}

Validaciones:

* sesión activa;
* texto no vacío;
* longitud máxima;
* codificación válida;
* tipo de contenido permitido;
* Message ID no procesado.

Idempotencia:

Obligatoria mediante:

channel_id + external_message_id

Eventos producidos:

EV-CONV-001 MessageReceived

Errores:

MESSAGE_EMPTY
MESSAGE_TOO_LONG
MESSAGE_DUPLICATE
SESSION_NOT_ACTIVE
CONTENT_NOT_SUPPORTED

Regla:

El comando registra el mensaje.

No interpreta por sí mismo la intención.

======================================================================
15. CMD-CONV-003 — RequestClarification
=======================================

Descripción:

Solicita emitir una pregunta para completar datos insuficientes.

Actor iniciador:

Sistema de orquestación.

Payload:

{
"session_id": "UUID",
"intent_candidate": "STRING-OR-NULL",
"missing_fields": [
"STRING"
],
"question": "STRING",
"attempt_number": 1
}

Precondiciones:

* existen datos faltantes;
* no se superó el límite de aclaraciones;
* no existe derivación humana activa.

Eventos producidos:

EV-CONV-005 ClarificationRequested

Errores:

CLARIFICATION_LIMIT_EXCEEDED
SESSION_HUMAN_CONTROLLED
QUESTION_INVALID

Regla:

El comando no debe ejecutar la operación incompleta.

======================================================================
16. CMD-VOICE-001 — StartVoiceSession
=====================================

Descripción:

Solicita abrir una sesión de voz asociada a una sesión conversacional.

Actor iniciador:

ACT-001 Cliente mediante ACT-006 Canal Web.

Handler:

VoiceCommandHandler

Aggregate:

VoiceSession

Caso de uso:

UC-003

Payload:

{
"session_id": "UUID",
"language": "es-CL",
"voice_profile": "STRING",
"input_audio_format": "PCM16",
"output_audio_format": "PCM16"
}

Validaciones:

* sesión conversacional activa;
* canal compatible;
* configuración de voz permitida;
* límite de sesiones concurrentes;
* autorización efímera válida.

Eventos producidos:

EV-VOICE-001 VoiceSessionStarted

Errores:

VOICE_NOT_SUPPORTED
VOICE_SESSION_LIMIT_EXCEEDED
VOICE_PROVIDER_UNAVAILABLE
VOICE_AUTHORIZATION_FAILED

Seguridad:

Nunca debe devolver una API Key permanente.

Sólo puede devolver una credencial efímera o un canal intermediado por el
backend.

======================================================================
17. CMD-VOICE-002 — AppendAudio
===============================

Descripción:

Agrega un fragmento de audio al turno activo.

Payload:

{
"voice_session_id": "UUID",
"sequence_number": 42,
"audio_chunk": "BINARY_OR_ENCODED_REFERENCE",
"duration_ms": 100
}

Validaciones:

* sesión de voz activa;
* secuencia válida;
* formato permitido;
* tamaño permitido;
* duración permitida.

Idempotencia:

voice_session_id + sequence_number

Eventos posibles:

AudioChunkAccepted
AudioChunkRejected

Regla:

El dominio comercial nunca recibe el audio binario.

======================================================================
18. CMD-VOICE-003 — CommitAudioTurn
===================================

Descripción:

Indica que el audio acumulado puede procesarse como una intervención.

Payload:

{
"voice_session_id": "UUID",
"last_sequence_number": 82,
"client_turn_id": "UUID"
}

Precondiciones:

* existen fragmentos;
* orden válido;
* turno no procesado;
* sesión activa.

Eventos producidos:

EV-VOICE-002 VoiceDetected
EV-VOICE-003 SpeechRecognized

Errores:

AUDIO_BUFFER_EMPTY
AUDIO_SEQUENCE_GAP
VOICE_TURN_DUPLICATE
VOICE_SESSION_CLOSED

Regla:

Una transcripción de baja confianza no puede iniciar acciones
irreversibles sin confirmación.

======================================================================
19. CMD-VOICE-004 — InterruptVoiceResponse
==========================================

Descripción:

Solicita interrumpir el audio de respuesta cuando el Cliente empieza a
hablar o pulsa detener.

Payload:

{
"voice_session_id": "UUID",
"response_id": "UUID",
"played_audio_ms": 1350,
"reason": "USER_SPEAKING"
}

Eventos producidos:

EV-VOICE-005 SpeechPlaybackInterrupted

Postcondiciones:

* se detiene el audio pendiente;
* se registra cuánto se reprodujo;
* se evita considerar escuchado el contenido no reproducido;
* se habilita un nuevo turno.

======================================================================
20. CMD-CART-001 — CreateCart
=============================

Descripción:

Solicita crear un carrito para una sesión.

Handler:

CartCommandHandler

Aggregate:

Cart

Caso de uso:

UC-008

Payload:

{
"session_id": "UUID",
"currency": "CLP",
"branch_id": "UUID-OR-NULL"
}

Validaciones:

* sesión activa;
* moneda permitida;
* sucursal válida;
* política de carrito activo.

Eventos producidos:

EV-CART-001 CartCreated

Errores:

ACTIVE_CART_ALREADY_EXISTS
SESSION_NOT_ACTIVE
CURRENCY_NOT_SUPPORTED

Idempotencia:

Obligatoria.

======================================================================
21. CMD-CART-002 — AddProductToCart
===================================

Descripción:

Solicita agregar una cantidad de un producto oficial a un carrito.

Actor iniciador:

ACT-001 Cliente.
ACT-002 Operador autorizado.

Handler:

CartCommandHandler

Aggregate:

Cart

Caso de uso:

UC-009

Payload:

{
"cart_id": "UUID",
"product_id": "UUID",
"quantity": 6,
"branch_id": "UUID",
"expected_cart_version": 3
}

Datos prohibidos en el payload:

* precio decidido por el cliente;
* descuento decidido por el cliente;
* total calculado por el cliente;
* disponibilidad declarada por el cliente.

Validaciones:

* carrito ACTIVE;
* producto existente y activo;
* cantidad entera positiva;
* sucursal válida;
* precio oficial disponible;
* stock suficiente;
* versión esperada coincidente.

Eventos producidos:

EV-CART-002 ProductAddedToCart
EV-CART-004 CartRecalculated

Eventos relacionados:

EV-STOCK-002 StockReserved, cuando la política reserva al agregar.

Errores:

CART_NOT_FOUND
CART_NOT_ACTIVE
PRODUCT_NOT_FOUND
PRODUCT_INACTIVE
QUANTITY_INVALID
STOCK_INSUFFICIENT
PRICE_UNAVAILABLE
CART_VERSION_CONFLICT

Idempotencia:

cart_id + actor_id + idempotency_key

Concurrencia:

Optimistic locking mediante expected_cart_version.

Criterios de aceptación:

* nunca usa el precio de la interfaz;
* nunca deja cantidad negativa;
* no duplica la línea por reintentos;
* recalcula el total;
* incrementa versión.

======================================================================
22. CMD-CART-003 — ChangeCartItemQuantity
=========================================

Descripción:

Solicita modificar la cantidad de una línea existente.

Payload:

{
"cart_id": "UUID",
"cart_item_id": "UUID",
"new_quantity": 4,
"expected_cart_version": 4
}

Regla especial:

new_quantity igual a cero se transforma en RemoveProductFromCart.

new_quantity menor que cero se rechaza.

Eventos producidos:

CartItemQuantityChanged
EV-CART-004 CartRecalculated

Errores:

CART_ITEM_NOT_FOUND
QUANTITY_INVALID
STOCK_INSUFFICIENT
CART_VERSION_CONFLICT

======================================================================
23. CMD-CART-004 — RemoveProductFromCart
========================================

Payload:

{
"cart_id": "UUID",
"cart_item_id": "UUID",
"expected_cart_version": 5
}

Eventos producidos:

EV-CART-003 ProductRemovedFromCart
EV-CART-004 CartRecalculated

Eventos opcionales:

EV-STOCK-003 StockReleased

Idempotencia:

Eliminar una línea ya eliminada debe producir un resultado equivalente y
no un efecto duplicado.

======================================================================
24. CMD-CART-005 — RecalculateCart
==================================

Descripción:

Solicita volver a calcular el carrito con datos oficiales vigentes.

Actor iniciador:

Sistema.
Cliente, antes de confirmar.
Servicio Programado, cuando esté autorizado.

Payload:

{
"cart_id": "UUID",
"expected_cart_version": 6,
"reason": "BEFORE_ORDER_CREATION"
}

Acciones:

* cargar productos;
* consultar precios;
* validar promociones;
* calcular impuestos;
* calcular subtotales;
* calcular total;
* identificar cambios.

Eventos producidos:

EV-CART-004 CartRecalculated

Evento adicional cuando cambia el precio:

CartPriceChanged

Regla:

El cálculo debe ser determinístico para los mismos datos oficiales.

======================================================================
25. CMD-ORDER-001 — CreateOrderFromCart
=======================================

Descripción:

Solicita crear un pedido pendiente a partir de un carrito válido.

Handler:

OrderCommandHandler

Aggregate:

Order

Caso de uso:

UC-013

Payload:

{
"cart_id": "UUID",
"expected_cart_version": 7,
"customer_data_reference": "UUID",
"fulfillment_type": "DELIVERY_OR_PICKUP",
"branch_id": "UUID"
}

Precondiciones:

* carrito ACTIVE;
* carrito no vacío;
* precios y promociones vigentes;
* stock verificable;
* datos obligatorios disponibles.

Eventos producidos:

EV-ORDER-001 OrderCreated
EV-ORDER-002 OrderValidated

Postcondición:

El pedido queda PENDING.

El carrito no debe seguir aceptando cambios incompatibles.

Errores:

CART_EMPTY
CART_VERSION_CONFLICT
ORDER_DATA_INCOMPLETE
PRODUCT_UNAVAILABLE
STOCK_INSUFFICIENT
PRICE_CHANGED
ORDER_ALREADY_CREATED

Idempotencia:

cart_id + idempotency_key

======================================================================
26. CMD-ORDER-002 — ValidateOrder
=================================

Descripción:

Solicita validar nuevamente un pedido pendiente.

Payload:

{
"order_id": "UUID",
"expected_order_version": 1,
"validation_reason": "BEFORE_CONFIRMATION"
}

Validaciones:

* estado PENDING;
* líneas válidas;
* precios vigentes;
* promociones válidas;
* inventario suficiente;
* datos de entrega completos;
* método de pago permitido.

Eventos producidos:

EV-ORDER-002 OrderValidated

Eventos alternativos:

OrderValidationFailed
OrderPriceChanged
OrderStockChanged

Regla:

Validar no equivale a confirmar.

======================================================================
27. CMD-ORDER-003 — ConfirmOrder
================================

Descripción:

Solicita confirmar un pedido pendiente después de una confirmación
explícita del Cliente.

Actor iniciador:

ACT-001 Cliente.
ACT-002 Operador autorizado.

Handler:

OrderCommandHandler

Aggregate:

Order

Caso de uso:

UC-014

Autorización:

El actor debe estar autorizado para el pedido.

Payload:

{
"order_id": "UUID",
"expected_order_version": 2,
"confirmation_token": "STRING",
"payment_method": "STRING",
"fulfillment_confirmation": {
"type": "DELIVERY_OR_PICKUP",
"address_reference": "UUID-OR-NULL"
}
}

Precondiciones:

* pedido PENDING;
* confirmación explícita vigente;
* stock disponible o reservado;
* total final calculado;
* actor autorizado;
* método de pago válido.

Datos prohibidos:

* total enviado como autoridad por el cliente;
* estado de pago declarado por el cliente;
* descuento arbitrario;
* estado de pedido solicitado.

Eventos producidos:

EV-STOCK-004 StockConsumed o EV-STOCK-002 StockReserved
EV-PAY-001 PaymentStarted, cuando corresponda
EV-ORDER-003 OrderConfirmed

Errores:

ORDER_NOT_PENDING
CONFIRMATION_TOKEN_INVALID
CONFIRMATION_EXPIRED
STOCK_INSUFFICIENT
PAYMENT_REJECTED
FULFILLMENT_INVALID
ORDER_VERSION_CONFLICT
ORDER_CONFIRMATION_UNKNOWN

Idempotencia:

Obligatoria.

Una misma confirmación no puede crear dos pedidos ni dos cobros.

Concurrencia:

Debe adquirir control exclusivo lógico del pedido durante la transición.

Compensación:

Si el inventario se reserva y el pago falla:

* liberar reserva;
* registrar compensación;
* conservar pedido en estado permitido.

Si el pago se aprueba y la confirmación queda incierta:

* no reintentar el cobro sin consulta;
* ejecutar conciliación;
* mantener estado UNKNOWN o PAYMENT_REVIEW.

======================================================================
28. CMD-ORDER-004 — CancelOrder
===============================

Descripción:

Solicita cancelar un pedido cuando su estado y política lo permitan.

Payload:

{
"order_id": "UUID",
"expected_order_version": 3,
"reason_code": "CUSTOMER_REQUEST",
"reason_detail": "STRING-OR-NULL"
}

Validaciones:

* actor autorizado;
* estado cancelable;
* política de devolución;
* operación de pago conciliada;
* entrega no completada.

Eventos producidos:

EV-ORDER-004 OrderCancelled
EV-STOCK-003 StockReleased, cuando corresponda

Eventos de pago posibles:

PaymentCancellationRequested
RefundRequested

Regla:

Un pedido CANCELLED no puede reactivarse.

======================================================================
29. CMD-STOCK-001 — ReserveStock
================================

Descripción:

Solicita reservar inventario durante un periodo limitado.

Handler:

InventoryCommandHandler

Aggregate:

StockReservation

Payload:

{
"order_id": "UUID",
"branch_id": "UUID",
"items": [
{
"product_id": "UUID",
"quantity": 2
}
],
"reservation_ttl_seconds": 600
}

Validaciones:

* cantidades positivas;
* disponibilidad suficiente;
* sucursal válida;
* TTL dentro del rango permitido;
* pedido válido.

Eventos producidos:

EV-STOCK-002 StockReserved

Errores:

STOCK_INSUFFICIENT
STOCK_PROVIDER_UNAVAILABLE
RESERVATION_LIMIT_EXCEEDED
RESERVATION_ALREADY_EXISTS

Idempotencia:

order_id + reservation_purpose

======================================================================
30. CMD-STOCK-002 — ReleaseStock
================================

Descripción:

Libera una reserva existente.

Payload:

{
"reservation_id": "UUID",
"reason": "ORDER_CANCELLED"
}

Eventos producidos:

EV-STOCK-003 StockReleased

Idempotencia:

Liberar una reserva ya liberada debe ser seguro.

======================================================================
31. CMD-PAY-001 — StartPayment
==============================

Descripción:

Solicita iniciar un pago por un importe oficial.

Actor iniciador:

Order Module.

Handler:

PaymentCommandHandler

Aggregate:

Payment

Payload:

{
"order_id": "UUID",
"amount_reference": "SERVER_SIDE_REFERENCE",
"currency": "CLP",
"payment_method": "STRING",
"return_channel": "WEB"
}

Regla:

El importe se recupera desde el pedido.

No se acepta el importe del navegador como fuente oficial.

Eventos producidos:

EV-PAY-001 PaymentStarted

Errores:

PAYMENT_METHOD_INVALID
PAYMENT_PROVIDER_UNAVAILABLE
ORDER_AMOUNT_INVALID
PAYMENT_ALREADY_STARTED

Seguridad:

No recibir números completos de tarjeta mediante la conversación.

======================================================================
32. CMD-PAY-002 — RegisterPaymentResult
=======================================

Descripción:

Registra un resultado firmado o verificable del proveedor de pago.

Actor iniciador:

ACT-013 Pasarela de Pago.

Payload:

{
"provider_event_id": "STRING",
"payment_id": "UUID",
"provider_status": "APPROVED_OR_REJECTED_OR_PENDING",
"provider_reference": "STRING",
"signature": "STRING"
}

Validaciones:

* firma válida;
* evento no procesado;
* pago existente;
* importe y moneda coincidentes;
* transición permitida.

Eventos producidos:

EV-PAY-002 PaymentApproved

o:

EV-PAY-003 PaymentRejected

Idempotencia:

provider_id + provider_event_id

Prohibición:

Nunca aceptar el resultado basándose sólo en parámetros de retorno del
navegador.

======================================================================
33. CMD-HUMAN-001 — RequestHumanHandoff
=======================================

Descripción:

Solicita transferir la conversación a atención humana.

Actor iniciador:

ACT-001 Cliente.
Sistema automático por política.
ACT-002 Operador.

Handler:

HumanHandoffCommandHandler

Aggregate:

Handoff

Caso de uso:

UC-017

Payload:

{
"session_id": "UUID",
"reason_code": "USER_REQUEST",
"reason_detail": "STRING-OR-NULL",
"priority": "NORMAL",
"required_skill": "STRING-OR-NULL"
}

Eventos producidos:

EV-HUMAN-001 HumanRequested

Postcondiciones:

* sesión HUMAN_WAITING;
* Handoff ID creado;
* historial preservado;
* cola asignada;
* Cliente informado.

Idempotencia:

No crear múltiples solicitudes activas para la misma sesión y motivo.

======================================================================
34. CMD-HUMAN-002 — AssignOperator
==================================

Descripción:

Asigna un Operador autorizado a una conversación en espera.

Actor iniciador:

ACT-002 Operador.
Sistema de asignación.

Payload:

{
"handoff_id": "UUID",
"operator_id": "UUID",
"expected_handoff_version": 1
}

Validaciones:

* operador autenticado;
* operador activo;
* habilidad suficiente;
* conversación disponible;
* no asignada a otro operador.

Eventos producidos:

EV-HUMAN-002 OperatorAssigned

Concurrencia:

Control exclusivo para impedir doble asignación.

======================================================================
35. CMD-HUMAN-004 — ReturnConversationToAutomation
==================================================

Descripción:

Devuelve el control de una conversación al sistema automático.

Payload:

{
"handoff_id": "UUID",
"session_id": "UUID",
"operator_id": "UUID",
"structured_note": {
"summary": "STRING",
"pending_action": "STRING-OR-NULL",
"temporary_decisions": [
"STRING"
]
}
}

Precondiciones:

* conversación HUMAN_ACTIVE;
* operador asignado;
* no existen acciones humanas pendientes incompatibles.

Eventos producidos:

EV-HUMAN-003 ConversationReturned

Regla:

Las decisiones temporales no se convierten en reglas de negocio.

======================================================================
36. CMD-AUTH-001 — AuthenticateActor
====================================

Descripción:

Solicita verificar una identidad mediante el Sistema de Identidad.

Handler:

AuthenticationCommandHandler

Payload:

{
"authentication_method": "STRING",
"credential": "SENSITIVE_VALUE_OR_REFERENCE",
"channel_id": "STRING"
}

Eventos producidos:

EV-SEC-001 AuthenticationSucceeded

o:

EV-SEC-002 AuthenticationFailed

Seguridad:

* la credencial no debe registrarse;
* aplicar rate limit;
* aplicar bloqueo progresivo;
* usar canales cifrados.

======================================================================
37. CMD-AUTH-003 — AssignRole
=============================

Descripción:

Solicita asignar un rol a un actor.

Actor iniciador:

ACT-004 Administrador autorizado.

Payload:

{
"target_actor_id": "UUID",
"role": "OPERATOR",
"scope": "TENANT_OR_BRANCH",
"scope_id": "UUID",
"reason": "STRING"
}

Precondiciones:

* administrador autorizado;
* rol permitido;
* alcance válido;
* separación de funciones respetada.

Eventos producidos:

RoleAssigned

Errores:

ROLE_NOT_ALLOWED
SELF_ELEVATION_DENIED
SEGREGATION_OF_DUTIES_VIOLATION
TARGET_ACTOR_NOT_FOUND

Prohibición:

Un actor no puede elevar sus propios permisos.

======================================================================
38. CMD-ADMIN-001 — UpdateBusinessConfiguration
===============================================

Descripción:

Solicita actualizar parámetros comerciales configurables.

Actor iniciador:

ACT-005 Propietario del Negocio.
ACT-004 Administrador, cuando posea autorización.

Payload:

{
"configuration_key": "STRING",
"new_value": "TYPED_VALUE",
"expected_configuration_version": 4,
"reason": "STRING"
}

Validaciones:

* clave configurable;
* tipo correcto;
* rango permitido;
* actor autorizado;
* configuración no clasificada como CORE;
* compatibilidad con reglas vigentes.

Eventos producidos:

BusinessConfigurationUpdated

Prohibición:

No utilizar este comando para modificar una regla CORE.

Un cambio CORE requiere RFC, revisión e implementación controlada.

======================================================================
39. CMD-SYS-001 — ExecuteScheduledTask
======================================

Descripción:

Solicita ejecutar una tarea programada autorizada.

Actor iniciador:

ACT-020 Servicio Programado.

Payload:

{
"task_id": "STRING",
"scheduled_occurrence": "UTC_TIMESTAMP",
"parameters": {},
"execution_key": "STRING"
}

Validaciones:

* Task ID registrado;
* identidad de servicio válida;
* ocurrencia no procesada;
* parámetros permitidos;
* tarea habilitada.

Idempotencia:

task_id + scheduled_occurrence

Concurrencia:

Lock por Task ID o partición autorizada.

Eventos producidos:

ScheduledTaskStarted
ScheduledTaskCompleted

o:

ScheduledTaskFailed

Timeout:

Obligatorio y específico por tarea.

Reintentos:

Limitados, con backoff y jitter.

======================================================================
40. CMD-SYS-002 — RetryFailedOperation
======================================

Descripción:

Solicita reintentar una operación fallida clasificada como reintentable.

Payload:

{
"original_command_id": "UUID",
"failure_id": "UUID",
"retry_attempt": 2,
"reason": "AUTOMATIC_RETRY"
}

Precondiciones:

* error reintentable;
* límite no excedido;
* operación idempotente;
* dependencia disponible;
* no existe resultado exitoso posterior.

Eventos producidos:

OperationRetryStarted
OperationRetryCompleted

o:

OperationRetryFailed

Prohibición:

No reintentar automáticamente cobros, confirmaciones o acciones externas
inciertas sin conciliación previa.

---

41. Comandos propuestos por la LLM

---

La LLM podrá producir una propuesta equivalente a:

{
"proposed_command": "AddProductToCart",
"arguments": {
"product_reference": "cerveza lager",
"quantity": 6
},
"confidence": 0.94,
"missing_fields": [],
"requires_confirmation": false
}

Esta propuesta no es todavía un comando oficial.

El sistema debe:

1. validar el esquema;
2. verificar que el comando esté permitido;
3. resolver referencias contra datos oficiales;
4. asociar actor y sesión;
5. recuperar identificadores internos;
6. aplicar permisos;
7. completar metadatos;
8. solicitar confirmación cuando corresponda;
9. crear el comando oficial;
10. enviarlo al handler.

La LLM no debe generar:

* actor_id confiable;
* roles;
* permisos;
* precios oficiales;
* totales;
* estados oficiales;
* aprobaciones;
* firmas;
* claves de idempotencia finales;
* expected_version confiable.

---

42. Validación por capas

---

CAPA 1 — SOBRE

Verifica:

* estructura;
* tipos;
* versión;
* identificadores;
* expiración;
* tamaño.

CAPA 2 — IDENTIDAD

Verifica:

* actor;
* autenticación;
* estado;
* tenant;
* canal.

CAPA 3 — AUTORIZACIÓN

Verifica:

* permiso;
* alcance;
* recurso;
* segregación de funciones.

CAPA 4 — IDEMPOTENCIA

Verifica:

* clave;
* solicitud previa;
* resultado previo;
* procesamiento concurrente.

CAPA 5 — CONCURRENCIA

Verifica:

* expected_version;
* lock;
* estado vigente.

CAPA 6 — DOMINIO

Verifica:

* invariantes;
* reglas;
* transiciones;
* disponibilidad;
* restricciones.

CAPA 7 — INFRAESTRUCTURA

Verifica:

* persistencia;
* dependencias;
* timeouts;
* consistencia.

---

43. Concurrencia

---

Toda modificación de aggregate debe utilizar al menos una estrategia:

* optimistic locking;
* pessimistic locking;
* serialized command queue;
* single writer;
* compare-and-swap;
* lock distribuido;
* transacción de base de datos.

Estrategia recomendada inicial:

Session:

Optimistic locking.

Cart:

Optimistic locking con versión.

Order:

Optimistic locking más control exclusivo durante confirmación.

Stock:

Operación atómica en la fuente oficial.

Payment:

Idempotencia y referencia del proveedor.

Human Handoff:

Lock de asignación.

Scheduled Task:

Lock distribuido por ocurrencia.

---

44. Idempotencia

---

Una entrada idempotente debe conservar:

* Idempotency Key;
* Command ID;
* hash normalizado del payload;
* estado;
* resultado;
* Event IDs;
* fecha de creación;
* fecha de expiración.

Reglas:

1. Misma clave y mismo payload:

   devolver resultado previo.

2. Misma clave y payload diferente:

   rechazar con IDEMPOTENCY_KEY_CONFLICT.

3. Misma clave en procesamiento:

   esperar dentro de límites o devolver PROCESSING.

4. Resultado UNKNOWN:

   conciliar antes de reejecutar.

---

45. Transacciones y eventos

---

Cuando un comando modifica estado y produce eventos, ambos deben
persistirse de forma consistente.

Patrón recomendado:

Transactional Outbox.

Flujo:

1. iniciar transacción;
2. cargar aggregate;
3. validar versión;
4. ejecutar reglas;
5. persistir aggregate;
6. persistir eventos en outbox;
7. persistir idempotencia;
8. confirmar transacción;
9. publicar eventos;
10. marcar outbox como publicada.

Regla:

No publicar un evento de negocio antes de confirmar el cambio de estado.

---

46. Reintentos

---

Puede reintentarse automáticamente cuando:

* el error es transitorio;
* la operación es idempotente;
* no existe resultado exitoso;
* el límite no fue excedido;
* no existe estado UNKNOWN sin conciliar.

No debe reintentarse automáticamente cuando:

* el error es de validación;
* el actor no está autorizado;
* el estado es incompatible;
* el pago es incierto;
* la confirmación externa es incierta;
* el comando expiró;
* la misma clave contiene otro payload.

---

47. Timeouts

---

Todo comando debe poseer un timeout explícito.

El timeout debe distinguir:

* timeout de validación;
* timeout del handler;
* timeout de dependencia;
* timeout total;
* timeout de conciliación.

Un timeout no debe ocultar el Command ID.

El Cliente debe recibir una respuesta segura que permita consultar el
resultado posteriormente cuando corresponda.

---

48. Errores estándar

---

COMMAND_SCHEMA_INVALID

El sobre o payload no cumple el contrato.

COMMAND_VERSION_UNSUPPORTED

La versión no está soportada.

COMMAND_EXPIRED

El comando fue procesado fuera de su vigencia.

COMMAND_NOT_ALLOWED

El comando no está permitido en ese contexto.

ACTOR_NOT_AUTHENTICATED

No existe autenticación suficiente.

ACTOR_NOT_AUTHORIZED

El actor no posee permiso.

IDEMPOTENCY_KEY_REQUIRED

Falta la clave obligatoria.

IDEMPOTENCY_KEY_CONFLICT

La misma clave fue usada con otro payload.

AGGREGATE_NOT_FOUND

No existe el aggregate.

AGGREGATE_VERSION_CONFLICT

La versión vigente no coincide.

INVALID_STATE_TRANSITION

La transición solicitada no está permitida.

DEPENDENCY_UNAVAILABLE

Una dependencia requerida no está disponible.

COMMAND_TIMEOUT

El comando superó el límite.

COMMAND_RESULT_UNKNOWN

No puede determinarse todavía el resultado.

BUSINESS_RULE_VIOLATION

La operación viola una regla del negocio.

---

49. Auditoría

---

Los comandos sensibles deben registrar:

* Command ID;
* Command Name;
* versión;
* actor;
* rol;
* Session ID;
* tenant;
* recurso;
* resultado;
* error;
* Request ID;
* Correlation ID;
* Idempotency Key en forma protegida;
* timestamp;
* duración;
* origen;
* eventos producidos.

Nunca registrar:

* API Keys;
* tokens completos;
* contraseñas;
* credenciales de pago;
* audio completo sin necesidad;
* datos personales innecesarios.

---

50. Observabilidad

---

Métricas mínimas:

commands_received_total

commands_completed_total

commands_rejected_total

commands_failed_total

commands_timed_out_total

commands_unknown_total

command_duration_seconds

command_retries_total

command_compensations_total

idempotency_hits_total

version_conflicts_total

authorization_denials_total

Etiquetas permitidas:

* command_name;
* command_version;
* handler;
* status;
* error_code;
* channel;
* tenant;
* provider.

Evitar etiquetas de alta cardinalidad como:

* Command ID;
* Session ID;
* User ID;
* texto del mensaje.

---

51. Matriz comando → evento

---

CreateSession
→ SessionCreated

RecoverSession
→ SessionRecovered

CloseSession
→ SessionClosed

ReceiveTextMessage
→ MessageReceived

RequestClarification
→ ClarificationRequested

StartVoiceSession
→ VoiceSessionStarted

CommitAudioTurn
→ SpeechRecognized

InterruptVoiceResponse
→ SpeechPlaybackInterrupted

CreateCart
→ CartCreated

AddProductToCart
→ ProductAddedToCart
→ CartRecalculated
→ StockReserved, cuando corresponda

ChangeCartItemQuantity
→ CartItemQuantityChanged
→ CartRecalculated

RemoveProductFromCart
→ ProductRemovedFromCart
→ CartRecalculated
→ StockReleased, cuando corresponda

CreateOrderFromCart
→ OrderCreated
→ OrderValidated

ConfirmOrder
→ StockReserved o StockConsumed
→ PaymentStarted, cuando corresponda
→ OrderConfirmed

CancelOrder
→ OrderCancelled
→ StockReleased
→ RefundRequested, cuando corresponda

RegisterPaymentResult
→ PaymentApproved

o:

```
→ PaymentRejected
```

RequestHumanHandoff
→ HumanRequested

AssignOperator
→ OperatorAssigned

ReturnConversationToAutomation
→ ConversationReturned

AuthenticateActor
→ AuthenticationSucceeded

o:

```
→ AuthenticationFailed
```

---

52. Casos prohibidos

---

PROHIBITED-CMD-001

Ejecutar directamente una propuesta de comando de la LLM.

---

PROHIBITED-CMD-002

Aceptar precio o total desde la interfaz como dato oficial.

---

PROHIBITED-CMD-003

Confirmar un pedido sin confirmación explícita.

---

PROHIBITED-CMD-004

Reintentar un cobro incierto sin conciliación.

---

PROHIBITED-CMD-005

Publicar un evento exitoso si la persistencia falló.

---

PROHIBITED-CMD-006

Ejecutar un comando sensible sin actor autorizado.

---

PROHIBITED-CMD-007

Ignorar expected_version.

---

PROHIBITED-CMD-008

Utilizar una Idempotency Key con payloads diferentes.

---

PROHIBITED-CMD-009

Modificar un pedido confirmado mediante un comando de edición.

---

PROHIBITED-CMD-010

Permitir comandos provenientes de menús expirados.

---

PROHIBITED-CMD-011

Registrar secretos dentro del comando o auditoría.

---

PROHIBITED-CMD-012

Convertir errores técnicos en eventos comerciales falsos.

---

53. Criterios globales de aceptación

---

AC-CMD-001

Todo comando posee identificador único.

---

AC-CMD-002

Todo comando posee versión.

---

AC-CMD-003

Todo comando posee handler.

---

AC-CMD-004

Todo comando de escritura posee estrategia de idempotencia.

---

AC-CMD-005

Todo comando concurrente posee estrategia de control de versión o lock.

---

AC-CMD-006

Todo comando sensible identifica y autoriza al actor.

---

AC-CMD-007

Todo comando declara eventos de éxito.

---

AC-CMD-008

Todo comando declara errores esperados.

---

AC-CMD-009

Los comandos no confían en información comercial calculada por el
cliente.

---

AC-CMD-010

La LLM sólo puede proponer comandos.

---

AC-CMD-011

Los eventos se persisten de manera consistente con el estado.

---

AC-CMD-012

Los reintentos no duplican efectos.

---

AC-CMD-013

Los resultados UNKNOWN se concilian.

---

AC-CMD-014

Los comandos expirados se rechazan.

---

AC-CMD-015

Todo comando puede convertirse en pruebas automatizadas.

---

54. Checklist de revisión

---

[ ] Todos los comandos poseen ID.

[ ] Todos los comandos poseen nombre único.

[ ] Todos los comandos poseen versión.

[ ] Todos los comandos poseen actor iniciador.

[ ] Todos los comandos poseen handler.

[ ] Todos los comandos apuntan a un aggregate o proceso definido.

[ ] Todos los payloads poseen esquema.

[ ] Los payloads contienen sólo datos necesarios.

[ ] Los precios se recuperan desde fuentes oficiales.

[ ] Los permisos se verifican en el servidor.

[ ] Las operaciones repetibles poseen Idempotency Key.

[ ] Las operaciones concurrentes poseen expected_version o lock.

[ ] Los comandos declaran timeouts.

[ ] Los comandos declaran política de reintento.

[ ] Los comandos declaran errores.

[ ] Los comandos declaran eventos resultantes.

[ ] Los comandos sensibles generan auditoría.

[ ] Los secretos nunca se registran.

[ ] Las propuestas de la LLM se validan.

[ ] Los eventos se publican mediante mecanismo consistente.

[ ] Las operaciones inciertas se concilian.

[ ] Las compensaciones están definidas.

[ ] Los comandos pueden mapearse con casos de uso.

[ ] Los comandos pueden mapearse con pruebas.

[ ] No existen comandos que alteren estados terminales ilegalmente.

---

55. Historial de cambios

---

Versión 1.0
Fecha: 2026-07-16

* Creación del catálogo inicial de comandos.
* Separación formal entre comandos, consultas y eventos.
* Definición del sobre estándar.
* Incorporación de actor, sesión, correlación y causalidad.
* Incorporación de idempotencia.
* Incorporación de control de concurrencia.
* Incorporación de expected_version.
* Definición de comandos de sesión, voz, carrito, pedido e inventario.
* Definición de comandos de pago y atención humana.
* Definición de comandos administrativos y programados.
* Definición del flujo de propuestas generadas por LLM.
* Incorporación de Transactional Outbox.
* Definición de estados inciertos y conciliación.
* Definición de compensaciones y reintentos seguros.

======================================================================
FIN DEL DOCUMENTO
=================
