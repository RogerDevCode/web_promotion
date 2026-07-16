======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-05-04-MESSAGING-CHANNELS.md

# INTEGRACIÓN CON CANALES DE MENSAJERÍA

## 1. Objetivo

Este documento define cómo VoiceShop recibe y envía mensajes mediante
canales como:

- Web Chat;
- Telegram;
- WhatsApp mediante proveedor autorizado;
- SMS;
- aplicaciones móviles;
- widgets;
- sistemas internos;
- chat de Operador.

Todos los canales se normalizan a contratos internos.

## 2. Alcance

Incluye:

- inbound messages;
- outbound messages;
- texto;
- voz;
- imágenes;
- documentos;
- botones;
- menús;
- callbacks;
- delivery receipts;
- read receipts;
- webhooks;
- sesiones;
- deduplicación;
- ordering;
- retries;
- seguridad;
- observabilidad;
- QA.

No incluye:

- reglas comerciales;
- procesamiento directo del carrito;
- ejecución de herramientas;
- persistencia técnica concreta;
- contratos comerciales con cada canal.

## 3. Principios

RULE-MSG-001

Todo mensaje entrante se normaliza.

RULE-MSG-002

Todo mensaje posee Channel Message ID.

RULE-MSG-003

Todo mensaje se vincula a Session o inicia resolución de Session.

RULE-MSG-004

Todo webhook se valida.

RULE-MSG-005

Todo evento entrante se deduplica.

RULE-MSG-006

Los mensajes fuera de orden se controlan.

RULE-MSG-007

Los botones usan referencias firmadas.

RULE-MSG-008

Los menús poseen Menu Session ID.

RULE-MSG-009

Los callbacks antiguos se rechazan.

RULE-MSG-010

La voz se procesa por el subsistema de voz.

RULE-MSG-011

Los adjuntos se validan.

RULE-MSG-012

Los mensajes salientes son idempotentes cuando el canal lo permite.

RULE-MSG-013

Los límites del canal deben respetarse.

RULE-MSG-014

El control humano prevalece.

RULE-MSG-015

Todo mensaje es trazable.

## 4. Channel types

WEB_CHAT

TELEGRAM

WHATSAPP

SMS

MOBILE_APP

OPERATOR_CHAT

INTERNAL_API

Cada canal declara capacidades.

## 5. Channel capabilities

```json
{
  "channel_type": "TELEGRAM",
  "capabilities": {
    "text": true,
    "voice_message": true,
    "realtime_voice": false,
    "images": true,
    "documents": true,
    "buttons": true,
    "menus": true,
    "message_edit": true,
    "delivery_receipt": false,
    "read_receipt": false,
    "typing_indicator": true,
    "maximum_text_length": 4096
  }
}
```

## 6. Inbound Message Envelope

```json
{
  "channel_event_id": "UUID",
  "channel_type": "TELEGRAM",
  "provider_event_id": "OPAQUE",
  "channel_conversation_reference": "OPAQUE",
  "channel_user_reference": "OPAQUE",
  "message": {
    "channel_message_id": "OPAQUE",
    "message_type": "TEXT",
    "text": "agrega seis lager norte",
    "attachments": [],
    "reply_to": null
  },
  "received_at": "UTC_TIMESTAMP",
  "signature_state": "VALIDATED"
}
```

## 7. Message types

TEXT

VOICE_MESSAGE

AUDIO

IMAGE

DOCUMENT

LOCATION

CONTACT

BUTTON_CALLBACK

MENU_CALLBACK

SYSTEM

UNSUPPORTED

## 8. Normalized User Input

```json
{
  "input_id": "UUID",
  "session_id": "UUID",
  "turn_id": "UUID",
  "channel": "TELEGRAM",
  "input_type": "TEXT",
  "content": {
    "text": "agrega seis lager norte"
  },
  "source_reference": {
    "channel_message_id": "OPAQUE"
  },
  "received_at": "UTC_TIMESTAMP"
}
```

## 9. Resolución de Session

Debe usar:

- tenant;
- channel;
- conversation reference;
- user reference;
- authentication;
- active Session;
- control state.

No utilizar sólo nombre visible.

## 10. Dedupe

Clave:

channel_type
+ provider_event_id

o:

channel_message_id
+ event type

Mismo ID, mismo payload:

- ACK.

Mismo ID, payload diferente:

- conflicto de seguridad.

## 11. Ordering

Puede usar:

- update ID;
- message sequence;
- sent_at;
- server received order;
- Session sequence.

No confiar únicamente en timestamp del dispositivo.

## 12. Texto

Debe validar:

- length;
- encoding;
- control characters;
- empty;
- normalization;
- rate limits.

## 13. Mensajes de voz

VOICE_MESSAGE no es Realtime full-duplex.

Flujo:

1. validar attachment.
2. descargar mediante referencia segura.
3. validar formato.
4. transcribir.
5. crear Turn.
6. procesar.
7. responder texto o audio.

## 14. Realtime voice

Sólo canales con capacidad explícita.

Web Chat o Mobile App pueden activar Realtime.

Telegram voice message sigue camino asíncrono.

## 15. Adjuntos

Todo adjunto debe incluir:

- attachment reference;
- content type;
- size;
- checksum cuando posible;
- provider file reference;
- status.

## 16. Validación de adjuntos

- allowlist;
- size;
- MIME real;
- malware;
- tenant;
- expiration;
- download timeout;
- storage policy.

## 17. Imágenes

Pueden usarse para:

- consulta;
- barcode;
- producto;
- soporte.

No confiar en visión sin validación.

## 18. Documentos

Se consideran contenido no confiable.

Deben aislarse de instrucciones del sistema.

## 19. Botones

Todo botón contiene:

- Action ID;
- Session ID;
- Menu Session ID;
- action type;
- resource reference;
- version;
- expires_at;
- signature.

## 20. Menu Session ID

Cada menú visible crea un ID único.

Un callback debe validar:

- Session;
- Menu Session;
- active/allowed;
- version;
- actor;
- expiration;
- signature.

## 21. Menús antiguos

Un menú queda inválido cuando:

- se reemplaza;
- cambia estado;
- expira;
- Session cierra;
- control humano;
- acción ya ejecutada.

## 22. Callback Envelope

```json
{
  "callback_event_id": "UUID",
  "channel_type": "TELEGRAM",
  "callback_id": "OPAQUE",
  "signed_action": "OPAQUE_SIGNED_REFERENCE",
  "received_at": "UTC_TIMESTAMP"
}
```

## 23. Outbound Message Request

```json
{
  "outbound_message_id": "UUID",
  "tenant_id": "UUID",
  "session_id": "UUID",
  "channel_type": "TELEGRAM",
  "channel_conversation_reference": "OPAQUE",
  "message": {
    "type": "TEXT",
    "text": "Agregué seis Lager Norte.",
    "buttons": []
  },
  "delivery_policy": {
    "maximum_attempts": 3,
    "timeout_ms": 5000
  },
  "idempotency_key": "STRING"
}
```

## 24. Outbound Result

```json
{
  "outbound_result_id": "UUID",
  "outbound_message_id": "UUID",
  "channel_message_id": "OPAQUE",
  "status": "SENT",
  "delivered_at": null,
  "read_at": null,
  "attempts": 1
}
```

## 25. Delivery states

REQUESTED

SENDING

SENT

DELIVERED

READ

FAILED_RETRYABLE

FAILED_FINAL

UNKNOWN

CANCELLED

## 26. Delivery UNKNOWN

Puede ocurrir por timeout después de enviar.

Debe consultar:

- provider reference;
- idempotency;
- webhook receipt;
- channel history;
- reconcile.

## 27. Mensajes largos

Debe:

- dividir;
- resumir;
- usar documento;
- respetar orden;
- preservar referencias;
- no romper confirmaciones.

## 28. Edición

Si el canal soporta edit:

- validar message ownership;
- status;
- time window;
- version.

No editar mensajes críticos entregados de forma que cambie hechos sin
registro.

## 29. Typing indicators

Son best-effort.

No deben bloquear respuesta.

## 30. Delivery receipts

Se normalizan a:

MessageDelivered

MessageRead

MessageDeliveryFailed

## 31. Handoff humano

Durante HUMAN_ACTIVE:

- mensajes entrantes van al Operador;
- automatización no ejecuta;
- respuestas automáticas se limitan;
- se conserva Session;
- se registra owner.

## 32. Canal indisponible

Fallback posible:

- otro canal autorizado;
- email;
- SMS;
- texto web;
- cola para reintento;
- Operador.

No cambiar canal sin consentimiento/política.

## 33. Rate limits

Aplicar:

- canal;
- tenant;
- user reference;
- conversation;
- attachments;
- callbacks;
- outbound.

## 34. Webhook security

- firma;
- timestamp;
- replay;
- endpoint secret;
- allowlist cuando corresponda;
- schema;
- size;
- rate limit.

## 35. Privacidad

Los channel references pueden ser PII.

Deben:

- protegerse;
- no usarse como metric labels;
- retenerse según política;
- limitar acceso.

## 36. Flujo inbound

1. recibir webhook.
2. validar.
3. persistir Inbox.
4. deduplicar.
5. mapear tenant.
6. resolver Session.
7. validar message.
8. normalizar input.
9. crear Turn.
10. enrutar por tipo.
11. ACK.
12. procesar.

## 37. Flujo outbound

1. recibir Outbound Request.
2. validar Session/control.
3. adaptar contenido.
4. validar límites.
5. consultar idempotencia.
6. enviar.
7. mapear resultado.
8. persistir.
9. emitir evento.
10. conciliar UNKNOWN.

## 38. Pseudocódigo inbound

```text
function handle_channel_webhook(raw_request, adapter):

    validate_webhook_request(raw_request, adapter)
    event = adapter.parse_event(raw_request)

    inbox = persist_or_load_inbox(
        provider_event_id=event.provider_event_id,
        payload_hash=hash(event)
    )

    if inbox.is_duplicate:
        return webhook_ack()

    tenant = map_channel_event_to_tenant(event)
    session = resolve_or_create_session(event, tenant)
    normalized = normalize_channel_message(event, session)

    validate_normalized_input(normalized)
    persist_channel_input(normalized)
    emit(ChannelMessageReceived)

    route_normalized_input(normalized)
    return webhook_ack()
```

## 39. Errores

CHANNEL_NOT_CONFIGURED

CHANNEL_WEBHOOK_INVALID

CHANNEL_SIGNATURE_INVALID

CHANNEL_REPLAY_DETECTED

CHANNEL_EVENT_DUPLICATE_CONFLICT

CHANNEL_TENANT_MAPPING_FAILED

CHANNEL_SESSION_RESOLUTION_FAILED

CHANNEL_MESSAGE_INVALID

CHANNEL_MESSAGE_TOO_LONG

CHANNEL_MESSAGE_TYPE_UNSUPPORTED

CHANNEL_ATTACHMENT_INVALID

CHANNEL_ATTACHMENT_TOO_LARGE

CHANNEL_CALLBACK_INVALID

CHANNEL_MENU_SESSION_STALE

CHANNEL_ACTION_SIGNATURE_INVALID

CHANNEL_RATE_LIMITED

CHANNEL_SEND_FAILED

CHANNEL_DELIVERY_UNKNOWN

## 40. Eventos

ChannelWebhookReceived

ChannelWebhookRejected

ChannelMessageReceived

ChannelMessageNormalized

ChannelVoiceMessageReceived

ChannelAttachmentReceived

ChannelCallbackReceived

ChannelCallbackRejected

ChannelMenuSessionCreated

ChannelMenuSessionExpired

OutboundMessageRequested

OutboundMessageSent

OutboundMessageDelivered

OutboundMessageRead

OutboundMessageFailed

ChannelDeliveryMarkedUnknown

## 41. Observabilidad

Métricas:

- channel_webhooks_total;
- channel_webhook_rejected_total;
- channel_messages_received_total;
- channel_messages_sent_total;
- channel_message_failure_total;
- channel_duplicate_events_total;
- channel_stale_callbacks_total;
- channel_attachment_total;
- channel_delivery_unknown_total;
- channel_duration_seconds.

Dimensiones:

- channel_type;
- message_type;
- direction;
- result;
- error_code;
- tenant_tier.

## 42. Seguridad

- firmas;
- replay;
- callbacks firmados;
- Menu Session ID;
- tenant;
- attachment scan;
- rate limit;
- output escaping;
- channel reference protection.

## 43. Casos límite

- duplicate webhook;
- altered webhook;
- message empty;
- long text;
- voice message;
- realtime voice unsupported;
- stale callback;
- signed callback invalid;
- attachment malware;
- file expired;
- two messages out-of-order;
- channel timeout;
- send unknown;
- human handoff;
- Session closed;
- tenant mismatch;
- rate limit.

## 44. Criterios de aceptación

AC-MSG-001

Todo mensaje se normaliza.

AC-MSG-002

Todo mensaje tiene Channel Message ID.

AC-MSG-003

Todo mensaje se vincula a Session.

AC-MSG-004

Todo webhook se valida.

AC-MSG-005

Todo evento se deduplica.

AC-MSG-006

Se controla ordering.

AC-MSG-007

Los botones están firmados.

AC-MSG-008

Los menús tienen Menu Session ID.

AC-MSG-009

Los callbacks viejos se rechazan.

AC-MSG-010

La voz se enruta correctamente.

AC-MSG-011

Los adjuntos se validan.

AC-MSG-012

Los mensajes salientes usan idempotencia.

AC-MSG-013

Los límites del canal se respetan.

AC-MSG-014

El control humano prevalece.

AC-MSG-015

Todo mensaje es trazable.

## 45. Plan mínimo de pruebas

- capabilities;
- webhook;
- signature;
- replay;
- duplicate;
- ordering;
- Session;
- text;
- voice message;
- realtime voice;
- image;
- document;
- attachment;
- buttons;
- Menu Session;
- stale callback;
- outbound;
- delivery;
- unknown;
- edit;
- handoff;
- fallback;
- rate limit;
- privacy;
- security;
- metrics;
- contract.

## 46. Checklist

[ ] Existe Channel Adapter.
[ ] Existen capabilities.
[ ] Existe Inbound Envelope.
[ ] Existe Normalized Input.
[ ] Existe Outbound Request.
[ ] Existe Delivery Result.
[ ] Se valida webhook.
[ ] Se deduplica.
[ ] Se controla ordering.
[ ] Se resuelve Session.
[ ] Se enruta voz.
[ ] Se validan attachments.
[ ] Se firman buttons.
[ ] Existe Menu Session ID.
[ ] Se rechazan callbacks viejos.
[ ] Se controla delivery.
[ ] Se concilia UNKNOWN.
[ ] Se protege privacidad.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
