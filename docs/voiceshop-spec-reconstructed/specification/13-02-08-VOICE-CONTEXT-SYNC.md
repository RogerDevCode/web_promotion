======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-02-08-VOICE-CONTEXT-SYNC.md

# SINCRONIZACIÓN DE CONTEXTO ENTRE VOZ Y TEXTO

## 1. Objetivo

Este documento define cómo VoiceShop mantiene un contexto coherente
cuando el Cliente alterna entre voz y texto o cuando ambos canales
participan en la misma Session.

El contexto debe conservar:

- intención pendiente;
- slots;
- productos;
- carrito;
- confirmaciones;
- listas;
- preguntas;
- respuestas;
- control humano;
- estados;
- referencias.

El cambio de canal no debe duplicar acciones ni perder información.

## 2. Principios

RULE-VSYNC-001

Voz y texto comparten Session ID.

RULE-VSYNC-002

Cada intervención posee Turn ID único.

RULE-VSYNC-003

El contexto oficial vive fuera del proveedor de voz.

RULE-VSYNC-004

El proveedor no es la fuente única de memoria.

RULE-VSYNC-005

Toda actualización de contexto debe estar versionada.

RULE-VSYNC-006

Las respuestas interrumpidas se registran como parciales.

RULE-VSYNC-007

Las transcripciones parciales no actualizan contexto comercial.

RULE-VSYNC-008

Las transcripciones finales sí pueden iniciar procesamiento.

RULE-VSYNC-009

El cambio a texto conserva pending intent.

RULE-VSYNC-010

El cambio a voz conserva contexto mínimo.

RULE-VSYNC-011

Las confirmaciones se vinculan con canal, versión y estado.

RULE-VSYNC-012

Una lista hablada parcial no se trata como lista completa.

RULE-VSYNC-013

Los mensajes duplicados se deduplican entre canales.

RULE-VSYNC-014

El control humano tiene prioridad.

RULE-VSYNC-015

La sincronización debe poder reconstruirse.

## 3. Fuentes de contexto

- Session Aggregate;
- ConversationTurn;
- VoiceSession;
- Transcript;
- Response;
- Memory;
- Pending Intent;
- Slot State;
- Cart;
- Order;
- Handoff;
- Channel events.

## 4. Contexto compartido

```json
{
  "shared_context_id": "UUID",
  "session_id": "UUID",
  "tenant_id": "UUID",
  "context_version": 24,
  "active_channel": "VOICE",
  "control_state": "CONTROL_AUTOMATED",
  "conversation": {
    "last_completed_turn_id": "UUID",
    "pending_intent_id": "UUID_OR_NULL",
    "last_question_id": "UUID_OR_NULL"
  },
  "voice": {
    "voice_session_id": "UUID",
    "state": "READY",
    "last_voice_turn_id": "UUID",
    "last_transcript_id": "UUID"
  },
  "text": {
    "last_text_message_id": "UUID_OR_NULL"
  },
  "domain": {
    "active_cart_id": "UUID_OR_NULL",
    "active_order_id": "UUID_OR_NULL"
  },
  "references": {
    "last_list_id": "UUID_OR_NULL",
    "last_product_id": "UUID_OR_NULL"
  }
}
```

## 5. Active channel

Valores:

VOICE

TEXT

HUMAN

MULTIMODAL

NONE

Active channel indica canal principal.

No significa que otros canales estén desconectados.

## 6. Turnos

Cada entrada crea un Turn ID.

Tipos:

VOICE_TURN

TEXT_TURN

HUMAN_TURN

SYSTEM_TURN

Los Turn IDs no se reutilizan.

## 7. Orden

Debe existir un orden lógico por Session.

Puede usarse:

- sequence number;
- event version;
- timestamp del servidor;
- causalidad;
- context version.

No confiar sólo en timestamp del cliente.

## 8. Cambio de texto a voz

1. texto mantiene Session ACTIVE.
2. Cliente solicita voz.
3. crear VoiceSession.
4. cargar contexto mínimo.
5. sincronizar pending intent.
6. sincronizar última pregunta.
7. sincronizar referentes.
8. marcar active_channel VOICE.
9. no reenviar historial completo.
10. iniciar READY.

## 9. Cambio de voz a texto

1. detener audio.
2. cerrar o suspender VoiceSession.
3. finalizar transcript final.
4. registrar playback parcial.
5. conservar pending intent.
6. marcar active_channel TEXT.
7. presentar estado actual si es necesario.
8. continuar.

## 10. Cambio durante respuesta

Si Cliente cambia a texto mientras audio se reproduce:

- interrumpir;
- registrar played_audio_ms;
- entregar respuesta textual completa o resumida;
- no repetir efectos;
- conservar Response ID.

## 11. Cambio durante pregunta

Si la voz preguntó:

"¿Qué producto deseas?"

Y Cliente responde por texto:

"Lager Norte"

Debe resolver la misma Clarification ID.

## 12. Cambio durante confirmación

La confirmación puede pasar a texto.

Debe conservar:

- Confirmation ID;
- resumen;
- expiración;
- versiones;
- actor;
- estado.

La respuesta textual debe validar la misma confirmación.

## 13. Listas

Una lista debe registrar delivery por canal.

```json
{
  "list_id": "UUID",
  "version": 2,
  "items": [],
  "delivery": {
    "voice": {
      "delivered_positions": [
        1,
        2
      ],
      "complete": false
    },
    "text": {
      "delivered_positions": [
        1,
        2,
        3,
        4
      ],
      "complete": true
    }
  }
}
```

"La tercera" sólo puede resolverse si fue entregada en el canal que
establece el contexto actual o si la lista completa está disponible de
forma clara.

## 14. Respuestas parcialmente habladas

El contexto debe distinguir:

- GENERATED;
- SENT;
- PLAYING;
- PARTIALLY_PLAYED;
- COMPLETED;
- CANCELLED.

## 15. Proveedor de voz

El proveedor puede mantener contexto interno para fluidez.

Ese contexto es secundario.

El backend debe conservar:

- estado oficial;
- herramientas;
- respuestas;
- turnos;
- referencias;
- confirmaciones.

Tras reconexión, el contexto puede reconstruirse sin depender del
proveedor.

## 16. Duplicados entre canales

Ejemplo:

Cliente dice por voz y luego pulsa botón equivalente.

Debe evaluarse:

- Turn ID;
- Confirmation ID;
- Menu ID;
- operación;
- idempotency key;
- contexto.

No ejecutar dos veces.

## 17. Conflictos

Caso:

Voz propone agregar 6.

Antes de ejecutar, texto cambia cantidad a 4.

La versión más reciente y causalmente válida debe prevalecer.

La propuesta anterior queda SUPERSEDED.

## 18. Control humano

Cuando HUMAN_ACTIVE:

- active_channel = HUMAN o MULTIMODAL controlado;
- voz automática no ejecuta;
- texto automático no ejecuta;
- Operador puede usar voz/texto según política;
- el contexto registra owner.

## 19. Context views

VOICE_VIEW

- resumen breve;
- última pregunta;
- pending slots;
- hechos oficiales;
- restricciones.

TEXT_VIEW

- puede incluir más detalle visual;
- botones;
- listas.

HUMAN_VIEW

- historial autorizado;
- resumen;
- pending tasks;
- riesgos.

## 20. Versionado

Toda actualización usa expected_context_version.

Conflicto:

- recargar;
- reevaluar;
- no sobrescribir.

## 21. Eventos

Los eventos deben aplicarse en orden causal.

Ejemplos:

TranscriptFinalized
    ↓
IntentDetected
    ↓
ToolExecuted
    ↓
ResponseGenerated
    ↓
PlaybackInterrupted
    ↓
TextChannelActivated

## 22. Reconstrucción

Para reconstruir:

1. cargar Session.
2. cargar últimos eventos.
3. cargar pending intent.
4. cargar slots.
5. cargar domain references.
6. cargar delivery states.
7. cargar VoiceSession.
8. aplicar expiraciones.
9. construir views.

## 23. Privacidad

No copiar audio a texto.

No enviar historial completo al proveedor.

No duplicar PII en múltiples sistemas sin necesidad.

## 24. Flujo de actualización

1. recibir evento.
2. validar Session.
3. validar tenant.
4. cargar contexto.
5. validar versión.
6. aplicar evento.
7. actualizar active channel.
8. actualizar delivery.
9. actualizar pending.
10. invalidar obsoletos.
11. persistir.
12. emitir ContextSynchronized.

## 25. Pseudocódigo

```text
function synchronize_channel_context(
    session_id,
    event,
    expected_context_version
):

    context = load_shared_context(session_id)

    validate_version(context, expected_context_version)
    validate_event_tenant(event, context.tenant_id)
    validate_event_session(event, session_id)

    next_context = copy(context)

    apply_conversation_event(next_context, event)
    update_active_channel(next_context, event)
    update_turn_order(next_context, event)
    update_delivery_state(next_context, event)
    update_pending_intent(next_context, event)
    update_references(next_context, event)
    invalidate_superseded_items(next_context, event)
    invalidate_expired_items(next_context)

    next_context.context_version += 1

    persist_compare_and_swap(
        next_context,
        expected_context_version
    )

    emit(ContextSynchronized)
    return build_channel_views(next_context)
```

## 26. Errores

VOICE_CONTEXT_NOT_FOUND

VOICE_CONTEXT_VERSION_CONFLICT

VOICE_CONTEXT_TENANT_MISMATCH

VOICE_CONTEXT_SESSION_MISMATCH

VOICE_CONTEXT_TURN_ORDER_CONFLICT

VOICE_CONTEXT_CHANNEL_SWITCH_FAILED

VOICE_CONTEXT_PENDING_INTENT_LOST

VOICE_CONTEXT_CONFIRMATION_STALE

VOICE_CONTEXT_LIST_STALE

VOICE_CONTEXT_DUPLICATE_ACTION

VOICE_CONTEXT_RECONSTRUCTION_FAILED

VOICE_CONTEXT_CONTROLLED_BY_HUMAN

## 27. Eventos

VoiceContextLoaded

VoiceContextSynchronized

VoiceChannelActivated

TextChannelActivated

ChannelSwitchRequested

ChannelSwitchCompleted

ChannelSwitchFailed

VoiceResponseDeliveryUpdated

CrossChannelClarificationResolved

CrossChannelConfirmationResolved

CrossChannelDuplicateDetected

VoiceContextReconstructed

ContextConflictDetected

## 28. Observabilidad

Métricas:

- voice_context_sync_total;
- voice_context_sync_failure_total;
- voice_to_text_switch_total;
- text_to_voice_switch_total;
- cross_channel_clarification_total;
- cross_channel_confirmation_total;
- cross_channel_duplicate_total;
- voice_context_conflict_total;
- voice_context_reconstruction_total;
- context_sync_duration_seconds.

Dimensiones:

- from_channel;
- to_channel;
- result;
- error_code;
- control_state.

## 29. Auditoría

Registrar:

- Session ID;
- context version;
- from channel;
- to channel;
- Turn IDs;
- pending intent;
- Confirmation ID;
- lista;
- conflicto;
- resultado;
- Correlation ID.

No registrar audio.

## 30. Casos límite

- voz a texto durante audio;
- texto a voz durante aclaración;
- confirmación por otro canal;
- lista parcial;
- duplicate action;
- dos canales simultáneos;
- context conflict;
- Session cerrada;
- control humano;
- reconexión;
- proveedor pierde contexto;
- pending intent expira;
- actor se autentica;
- tenant mismatch;
- late transcript;
- late response;
- cambio de cart version;
- cambio de order state;
- PII.

## 31. Criterios de aceptación

AC-VSYNC-001

Voz y texto comparten Session.

AC-VSYNC-002

Cada turno tiene ID único.

AC-VSYNC-003

El backend conserva contexto oficial.

AC-VSYNC-004

El cambio a texto conserva pending intent.

AC-VSYNC-005

El cambio a voz conserva última pregunta.

AC-VSYNC-006

La respuesta parcial se registra.

AC-VSYNC-007

Las listas registran delivery.

AC-VSYNC-008

Las confirmaciones cruzadas se validan.

AC-VSYNC-009

Los duplicados no ejecutan dos veces.

AC-VSYNC-010

Los conflictos usan versión.

AC-VSYNC-011

El control humano prevalece.

AC-VSYNC-012

El contexto puede reconstruirse.

AC-VSYNC-013

La privacidad se respeta.

AC-VSYNC-014

Los eventos tardíos no cambian estado.

AC-VSYNC-015

Todo cambio es trazable.

## 32. Plan mínimo de pruebas

- text to voice;
- voice to text;
- during response;
- clarification;
- confirmation;
- list;
- duplicate;
- conflict;
- simultaneous channels;
- human control;
- reconnection;
- provider context loss;
- pending expiration;
- late event;
- tenant;
- PII;
- reconstruction;
- metrics;
- audit;
- idempotency.

## 33. Checklist

[ ] Existe Shared Context ID.
[ ] Existe Session ID.
[ ] Existe context version.
[ ] Existe active channel.
[ ] Existen Turn IDs.
[ ] Existe pending intent.
[ ] Existe delivery state.
[ ] Existen listas versionadas.
[ ] Existen confirmations.
[ ] Se controla duplicado.
[ ] Se controla conflicto.
[ ] Se controla cambio de canal.
[ ] Se controla voz parcial.
[ ] Se controla humano.
[ ] Se reconstruye.
[ ] Se minimiza contexto.
[ ] Se persiste.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
