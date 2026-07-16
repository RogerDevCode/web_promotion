======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-02-06-INTERRUPTION-BARGE-IN.md

# INTERRUPCIÓN Y BARGE-IN

## 1. Objetivo

Este documento define cómo VoiceShop detecta, valida y procesa una
interrupción del Cliente mientras el sistema está generando o
reproduciendo una respuesta de voz.

Barge-in significa que el Cliente comienza a hablar antes de que la
respuesta anterior termine.

El sistema debe:

- detener la respuesta;
- registrar cuánto audio fue reproducido;
- evitar asumir que el Cliente escuchó contenido no reproducido;
- abrir un nuevo turno;
- conservar coherencia;
- impedir duplicados;
- cancelar Tool Proposals obsoletas;
- continuar con baja latencia.

## 2. Alcance

Incluye:

- detección local y remota;
- cancelación de síntesis;
- cancelación de playback;
- truncamiento;
- played_audio_ms;
- Response ID;
- Voice Response ID;
- nuevo Turn ID;
- eventos tardíos;
- confirmaciones interrumpidas;
- listas interrumpidas;
- sincronización de contexto;
- reconexión;
- observabilidad;
- QA.

No incluye:

- procesamiento comercial;
- autorización;
- ejecución directa de herramientas;
- transcripción general;
- construcción de respuestas;
- transporte básico de audio.

## 3. Principios

RULE-BARGE-001

Toda interrupción debe estar asociada con VoiceSession ID.

RULE-BARGE-002

Toda interrupción debe identificar la respuesta interrumpida.

RULE-BARGE-003

Toda interrupción debe registrar played_audio_ms.

RULE-BARGE-004

El contenido no reproducido no se considera escuchado.

RULE-BARGE-005

La cancelación debe ser idempotente.

RULE-BARGE-006

Una respuesta ya completada no debe truncarse retroactivamente.

RULE-BARGE-007

Una interrupción abre un nuevo turno cuando existe voz válida.

RULE-BARGE-008

Una Tool Proposal no confirmada puede quedar obsoleta.

RULE-BARGE-009

Una confirmación crítica interrumpida debe invalidarse o repetirse.

RULE-BARGE-010

Los eventos tardíos no deben reactivar playback.

RULE-BARGE-011

La detección local puede iniciar la cancelación, pero el servidor valida.

RULE-BARGE-012

La respuesta anterior debe conservar estado final.

RULE-BARGE-013

La interrupción no debe cerrar la Session conversacional.

RULE-BARGE-014

Debe existir fallback cuando el canal no soporte barge-in.

RULE-BARGE-015

Toda interrupción debe ser trazable.

## 4. Estados relacionados

VoiceSession:

RESPONDING
    ↓
INTERRUPTING
    ↓
LISTENING

VoiceResponse:

PLAYING
    ↓
INTERRUPTING
    ↓
CANCELLED o PARTIALLY_PLAYED

Turn:

IDLE
    ↓
START_CANDIDATE
    ↓
CAPTURING

## 5. Contrato de Interruption

```json
{
  "interruption_id": "UUID",
  "voice_session_id": "UUID",
  "voice_response_id": "UUID",
  "response_id": "UUID",
  "previous_turn_id": "UUID",
  "new_turn_id": "UUID",
  "connection_generation": 3,
  "reason": "USER_SPEAKING",
  "detected_by": [
    "CLIENT_VAD",
    "SERVER_VAD"
  ],
  "detected_at": "UTC_TIMESTAMP",
  "played_audio_ms": 1350,
  "total_audio_ms": 4200,
  "last_played_sequence": 88,
  "expected_voice_session_version": 12,
  "idempotency_key": "STRING"
}
```

## 6. Razones

USER_SPEAKING

Cliente comienza a hablar.

USER_STOP_BUTTON

Cliente pulsa detener.

CHANNEL_SWITCH

Cliente cambia a texto.

SESSION_CLOSING

La sesión se cierra.

HUMAN_HANDOFF

Un Operador toma control.

NEW_RESPONSE_SUPERSEDES

Una respuesta nueva reemplaza la anterior.

ERROR

Fallo de playback o síntesis.

TIMEOUT

La respuesta expira.

## 7. Detección

Fuentes:

- CLIENT_VAD;
- SERVER_VAD;
- PROVIDER_EVENT;
- PUSH_TO_TALK;
- STOP_BUTTON;
- CHANNEL_EVENT.

La señal debe incluir:

- timestamp;
- VoiceSession ID;
- connection_generation;
- Response ID cuando esté disponible;
- confianza;
- audio activity.

## 8. Validaciones

VAL-BARGE-001

VoiceSession existe.

VAL-BARGE-002

VoiceSession está RESPONDING o en estado compatible.

VAL-BARGE-003

Response ID coincide con respuesta activa.

VAL-BARGE-004

Voice Response no está terminal.

VAL-BARGE-005

Connection generation coincide.

VAL-BARGE-006

Played audio está en rango.

VAL-BARGE-007

Idempotency Key válida.

VAL-BARGE-008

Expected version coincide.

VAL-BARGE-009

La señal no es replay.

VAL-BARGE-010

El actor pertenece a la sesión.

## 9. Played audio

Debe calcularse usando una o más fuentes:

- progreso reportado por el cliente;
- secuencia reproducida;
- reloj monotónico;
- duración de chunks;
- confirmación del motor de audio.

No confiar exclusivamente en timestamp del Cliente.

Debe existir tolerancia.

## 10. Contenido escuchado

El sistema debe construir una representación:

```json
{
  "response_id": "UUID",
  "delivery_state": "PARTIALLY_PLAYED",
  "played_audio_ms": 1350,
  "spoken_segments_completed": [
    "Agregué seis Lager Norte."
  ],
  "spoken_segments_partial": [
    "El total del carrito..."
  ],
  "spoken_segments_not_played": [
    "¿Quieres confirmar?"
  ]
}
```

No siempre será posible mapear audio a palabras exactas.

En ese caso se conserva una aproximación segura.

## 11. Confirmaciones interrumpidas

Si el audio incluía una confirmación:

- confirmar sólo si la pregunta completa fue entregada;
- si no se entregó completa, invalidar Confirmation ID o mantenerla como
  NOT_DELIVERED;
- repetir resumen antes de aceptar un "sí";
- no interpretar el nuevo turno fuera de contexto.

## 12. Respuestas de éxito interrumpidas

Si la operación ya se completó:

- no revertir;
- registrar que la notificación fue parcial;
- permitir consulta;
- el nuevo turno puede referirse al resultado.

## 13. Listas interrumpidas

Si se presentó una lista:

- registrar qué elementos fueron pronunciados;
- no permitir "la tercera" si no fue entregada;
- ofrecer lista por texto;
- crear List ID con delivery state.

## 14. Tool Proposals interrumpidas

Estados:

PROPOSED

AWAITING_CONFIRMATION

SUPERSEDED

CANCELLED

Si el Cliente interrumpe antes de confirmar:

- no ejecutar;
- marcar SUPERSEDED cuando nueva intención sea incompatible;
- mantener sólo si la nueva entrada continúa la misma tarea y contexto.

## 15. Cancelación del proveedor

El sistema debe enviar:

- cancel response;
- truncate item;
- stop generation;
- clear output buffer;
- método equivalente.

La confirmación del proveedor no debe retrasar la detención local.

## 16. Cancelación local

El canal debe:

- detener nodo de audio;
- vaciar buffer;
- ignorar chunks posteriores;
- incrementar playback generation;
- reportar played_audio_ms.

## 17. Audio tardío

Los chunks posteriores a cancelación:

- se descartan;
- se registran;
- no se reproducen;
- no cambian played_audio_ms salvo evidencia válida.

## 18. Nuevo turno

Después de detectar voz válida:

1. crear Turn ID;
2. cambiar a LISTENING;
3. iniciar captura;
4. conservar Correlation ID;
5. asociar interruption_id;
6. procesar como turno normal.

## 19. False barge-in

Puede ocurrir por:

- eco;
- audio del propio sistema;
- ruido;
- música;
- tos.

Controles:

- echo cancellation;
- threshold;
- duración mínima;
- server validation;
- confidence;
- resume playback si la política lo permite.

Reanudar audio cancelado puede ser confuso.

La política recomendada es regenerar o preguntar.

## 20. Echo cancellation

El canal debe intentar evitar que la salida se detecte como entrada.

No debe asumirse perfecto.

Señales:

- acoustic echo;
- device type;
- headset;
- speaker;
- overlap.

## 21. Idempotencia

La misma interrupción:

- devuelve resultado anterior;
- no crea otro Turn ID;
- no cancela dos veces;
- no duplica eventos.

Misma clave con Response ID diferente:

- rechazar.

## 22. Concurrencia

Caso:

InterruptVoiceResponse y EndVoiceSession con misma versión.

Sólo una transición persiste.

Si cierre gana:

- interrupción se registra como no aplicada;
- no se abre nuevo turno.

## 23. Flujo principal

1. detectar actividad.
2. detener reproducción local.
3. crear Interruption ID.
4. enviar interrupt request.
5. validar VoiceSession.
6. validar Response ID.
7. validar generation.
8. calcular played_audio_ms.
9. cambiar RESPONDING → INTERRUPTING.
10. cancelar proveedor.
11. truncar contexto.
12. marcar respuesta parcial.
13. crear nuevo Turn ID.
14. cambiar a LISTENING.
15. persistir.
16. emitir eventos.
17. capturar nuevo audio.

## 24. Pseudocódigo

```text
function interrupt_voice_response(request):

    session = load_voice_session(request.voice_session_id)
    response = load_voice_response(request.voice_response_id)

    validate_version(session, request.expected_voice_session_version)
    validate_state(session, RESPONDING)
    validate_active_response(session, response)
    validate_connection_generation(request, session)

    previous = get_idempotent_result(request.idempotency_key)
    if previous.exists:
        return previous

    transition(session, INTERRUPTING)

    stop_local_playback(response)
    cancel_provider_generation(response)
    clear_pending_output_chunks(response)

    delivery = calculate_delivery_state(
        response,
        request.played_audio_ms,
        request.last_played_sequence
    )

    mark_response_interrupted(response, delivery)

    new_turn = create_voice_turn(
        voice_session_id=session.id,
        caused_by=request.interruption_id
    )

    transition(session, LISTENING)

    persist_atomically(session, response, new_turn)
    emit(SpeechPlaybackInterrupted)
    emit(VoiceBargeInDetected)

    return InterruptionResult(
        new_turn_id=new_turn.id,
        delivery_state=delivery
    )
```

## 25. Errores

BARGE_IN_SESSION_NOT_FOUND

BARGE_IN_RESPONSE_NOT_FOUND

BARGE_IN_STATE_INVALID

BARGE_IN_RESPONSE_MISMATCH

BARGE_IN_CONNECTION_GENERATION_STALE

BARGE_IN_PLAYED_DURATION_INVALID

BARGE_IN_VERSION_CONFLICT

BARGE_IN_DUPLICATE_CONFLICT

BARGE_IN_PROVIDER_CANCEL_FAILED

BARGE_IN_PLAYBACK_STOP_FAILED

BARGE_IN_FALSE_POSITIVE

BARGE_IN_NEW_TURN_FAILED

## 26. Eventos

VoiceBargeInCandidateDetected

VoiceBargeInDetected

VoiceResponseCancellationRequested

VoiceResponseCancelled

SpeechPlaybackInterrupted

VoiceResponsePartiallyPlayed

VoiceResponseNotDelivered

VoiceTurnOpenedAfterInterruption

LateVoiceAudioDiscarded

VoiceBargeInRejected

## 27. Observabilidad

Métricas:

- voice_barge_in_total;
- voice_barge_in_rejected_total;
- voice_barge_in_latency_seconds;
- voice_playback_stop_latency_seconds;
- voice_provider_cancel_latency_seconds;
- voice_partial_playback_total;
- voice_late_audio_discarded_total;
- voice_false_barge_in_total;
- voice_confirmation_interrupted_total.

Dimensiones:

- detected_by;
- reason;
- provider_class;
- channel;
- result;
- error_code.

## 28. Auditoría

Registrar:

- Interruption ID;
- VoiceSession ID;
- Response ID;
- Voice Response ID;
- played_audio_ms;
- total_audio_ms;
- razón;
- nueva Turn ID;
- versión;
- resultado;
- Correlation ID.

No registrar audio completo.

## 29. Casos límite

- interrupción justo al completar;
- progreso atrasado;
- stop local falla;
- proveedor cancela tarde;
- audio tardío;
- false barge-in;
- eco;
- dos interrupciones;
- cierre simultáneo;
- reconexión;
- generation antigua;
- confirmación parcial;
- lista parcial;
- Tool Proposal pendiente;
- control humano;
- Session cerrada;
- botón stop;
- cambio a texto;
- dispositivo sin VAD;
- respuesta sin duración final.

## 30. Criterios de aceptación

AC-BARGE-001

Toda interrupción tiene ID.

AC-BARGE-002

Toda interrupción identifica respuesta.

AC-BARGE-003

Se registra played_audio_ms.

AC-BARGE-004

Se descarta audio pendiente.

AC-BARGE-005

No se considera escuchado lo no reproducido.

AC-BARGE-006

Se abre un nuevo Turn ID una sola vez.

AC-BARGE-007

La operación es idempotente.

AC-BARGE-008

Las confirmaciones parciales no se aceptan.

AC-BARGE-009

Los eventos tardíos no reproducen audio.

AC-BARGE-010

Se valida generation.

AC-BARGE-011

Se valida versión.

AC-BARGE-012

La Tool Proposal obsoleta no se ejecuta.

AC-BARGE-013

El cierre concurrente se resuelve.

AC-BARGE-014

Existe fallback sin barge-in.

AC-BARGE-015

Todo resultado es trazable.

## 31. Plan mínimo de pruebas

- client VAD;
- server VAD;
- stop button;
- played duration;
- duplicate;
- conflict;
- late audio;
- false positive;
- echo;
- confirmation;
- list;
- tool proposal;
- close race;
- reconnection;
- generation;
- provider failure;
- local failure;
- context;
- metrics;
- audit;
- privacy;
- latency.

## 32. Checklist

[ ] Existe Interruption ID.
[ ] Existe Response ID.
[ ] Existe Voice Response ID.
[ ] Existe played_audio_ms.
[ ] Existe total_audio_ms.
[ ] Existe reason.
[ ] Existe new Turn ID.
[ ] Se valida Session.
[ ] Se valida state.
[ ] Se valida generation.
[ ] Se valida version.
[ ] Se controla idempotencia.
[ ] Se cancela proveedor.
[ ] Se detiene playback.
[ ] Se descarta audio.
[ ] Se actualiza contexto.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
