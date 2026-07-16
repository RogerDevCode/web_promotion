======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-02-01-VOICE-SESSION-LIFECYCLE.md

# CICLO DE VIDA DE LA SESIÓN DE VOZ

## 1. Objetivo

Este documento define el ciclo funcional completo de una VoiceSession,
desde la solicitud inicial hasta el cierre, expiración, fallo o
recuperación.

Una VoiceSession representa el estado lógico de una interacción de voz.

No representa únicamente:

- un WebSocket;
- una conexión WebRTC;
- una pestaña;
- un micrófono;
- una llamada al proveedor.

La VoiceSession pertenece a una Session conversacional.

## 2. Principios

RULE-VSL-001

Toda VoiceSession posee VoiceSession ID.

RULE-VSL-002

Toda VoiceSession pertenece a una Session válida.

RULE-VSL-003

Una Session posee máximo una VoiceSession activa, salvo diseño
explícitamente aprobado.

RULE-VSL-004

La autorización debe ser temporal.

RULE-VSL-005

La autorización debe estar limitada por tenant, sesión y propósito.

RULE-VSL-006

La API Key permanente no sale del backend.

RULE-VSL-007

Una conexión establecida no implica autorización comercial.

RULE-VSL-008

Toda transición de estado debe persistirse.

RULE-VSL-009

Toda transición debe validar versión.

RULE-VSL-010

Un cierre debe liberar recursos.

RULE-VSL-011

Una sesión huérfana debe expirar.

RULE-VSL-012

La sesión de voz no debe sobrevivir a una Session cerrada.

RULE-VSL-013

Una respuesta tardía no debe reactivar una sesión terminada.

RULE-VSL-014

La reconexión debe ser idempotente.

RULE-VSL-015

El fallo de voz debe permitir continuar por texto.

## 3. Estados

REQUESTED

El Cliente solicitó voz.

AUTHORIZING

El backend valida la sesión y solicita autorización temporal.

AUTHORIZED

Existe autorización válida, pero aún no hay conexión activa.

CONNECTING

El canal intenta establecer la conexión.

READY

La conexión está activa y espera audio.

LISTENING

Se recibe audio.

PROCESSING

Se procesa el turno.

RESPONDING

Se genera o reproduce audio.

INTERRUPTING

Se cancela la respuesta actual.

RECONNECTING

Se intenta recuperar la conexión.

SUSPENDED

La VoiceSession queda temporalmente inactiva.

ENDING

Se liberan recursos.

ENDED

Cierre normal.

FAILED

Fallo no recuperable.

EXPIRED

Autorización o sesión expirada.

Estados terminales:

ENDED
FAILED
EXPIRED

## 4. Estado inicial

REQUESTED

El estado se crea cuando:

- el Cliente pulsa hablar;
- activa modo voz;
- selecciona voice;
- el canal solicita conversación hablada;
- una política habilita voz.

## 5. Contrato de VoiceSession

```json
{
  "voice_session_id": "UUID",
  "session_id": "UUID",
  "tenant_id": "UUID",
  "actor_id": "UUID_OR_NULL",
  "state": "READY",
  "version": 4,
  "provider_policy": {
    "provider_class": "REALTIME_VOICE",
    "region": "APPROVED_REGION"
  },
  "configuration": {
    "language": "es-CL",
    "voice_profile": "DEFAULT",
    "input_audio_format": "PCM16",
    "output_audio_format": "PCM16",
    "turn_detection_mode": "SERVER_VAD"
  },
  "connection": {
    "connection_id": "PROVIDER_REFERENCE",
    "connected_at": "UTC_TIMESTAMP",
    "last_activity_at": "UTC_TIMESTAMP"
  },
  "authorization": {
    "authorization_reference": "UUID",
    "issued_at": "UTC_TIMESTAMP",
    "expires_at": "UTC_TIMESTAMP",
    "scope": [
      "AUDIO_INPUT",
      "AUDIO_OUTPUT"
    ]
  },
  "created_at": "UTC_TIMESTAMP",
  "updated_at": "UTC_TIMESTAMP"
}
```

## 6. Solicitud de inicio

Entrada:

```json
{
  "session_id": "UUID",
  "language": "es-CL",
  "voice_profile": "DEFAULT",
  "input_audio_format": "PCM16",
  "output_audio_format": "PCM16",
  "turn_detection_mode": "SERVER_VAD",
  "client_capabilities": {
    "webrtc": true,
    "websocket": true,
    "microphone": true,
    "audio_output": true
  },
  "idempotency_key": "STRING"
}
```

## 7. Validaciones iniciales

VAL-VSL-001

Session existe.

VAL-VSL-002

Session está ACTIVE.

VAL-VSL-003

Tenant coincide.

VAL-VSL-004

Actor puede usar la Session.

VAL-VSL-005

Canal soporta voz.

VAL-VSL-006

Cliente tiene micrófono.

VAL-VSL-007

No existe otra VoiceSession activa incompatible.

VAL-VSL-008

No se excedió el límite.

VAL-VSL-009

Idioma soportado.

VAL-VSL-010

Formato soportado.

VAL-VSL-011

Voice profile permitido.

VAL-VSL-012

Idempotency Key válida.

## 8. Autorización temporal

Debe contener:

- referencia;
- Session ID;
- VoiceSession ID;
- tenant;
- actor;
- scopes;
- issued_at;
- expires_at;
- provider;
- nonce o equivalente;
- restricciones.

Debe limitar:

- duración;
- capacidades;
- modelo;
- voz;
- herramientas;
- región;
- datos.

No debe permitir:

- administración;
- acceso a secretos;
- herramientas no autorizadas;
- acceso a otras sesiones.

## 9. Inicio idempotente

Misma Idempotency Key y mismo payload:

- devolver la misma VoiceSession;
- o devolver estado equivalente.

Misma clave y payload distinto:

- rechazar.

Dos solicitudes simultáneas:

- sólo una crea la sesión;
- la otra recibe la existente o conflicto.

## 10. Transiciones permitidas

REQUESTED → AUTHORIZING

Se inició validación.

AUTHORIZING → AUTHORIZED

Se obtuvo autorización temporal.

AUTHORIZING → FAILED

No se pudo autorizar.

AUTHORIZED → CONNECTING

El Cliente inicia conexión.

AUTHORIZED → EXPIRED

No se conectó antes de expires_at.

CONNECTING → READY

Conexión establecida.

CONNECTING → RECONNECTING

Fallo transitorio.

CONNECTING → FAILED

Fallo definitivo.

READY → LISTENING

Comienza audio.

LISTENING → PROCESSING

Finaliza turno.

PROCESSING → RESPONDING

Se genera respuesta.

RESPONDING → READY

Finaliza reproducción.

RESPONDING → INTERRUPTING

Cliente interrumpe.

INTERRUPTING → LISTENING

Comienza nuevo turno.

READY/LISTENING/PROCESSING/RESPONDING → RECONNECTING

Se pierde conexión.

RECONNECTING → READY

Recuperación correcta.

RECONNECTING → FAILED

Intentos agotados.

Cualquier estado activo → ENDING

Cierre solicitado.

ENDING → ENDED

Recursos liberados.

## 11. Transiciones prohibidas

ENDED → READY

FAILED → READY

EXPIRED → CONNECTING

REQUESTED → READY

AUTHORIZED → RESPONDING

READY → RESPONDING sin procesamiento.

RESPONDING → PROCESSING sin nuevo turno.

Dos transiciones simultáneas a READY con la misma versión.

## 12. Acciones de entrada

Al entrar en AUTHORIZING:

- validar Session;
- aplicar rate limit;
- seleccionar política;
- solicitar autorización;
- registrar intento.

Al entrar en READY:

- registrar conexión;
- activar recepción;
- actualizar Session a VOICE_ACTIVE;
- emitir VoiceSessionStarted.

Al entrar en RECONNECTING:

- detener audio;
- marcar buffers;
- suspender ejecución de nuevos turnos;
- iniciar temporizador.

Al entrar en ENDING:

- cancelar generación;
- cancelar reproducción;
- cerrar streams;
- liberar buffers;
- invalidar autorización;
- actualizar Session.

## 13. Acciones de salida

Al salir de LISTENING:

- cerrar turno;
- confirmar secuencia;
- producir AudioTurnCommitted.

Al salir de RESPONDING:

- registrar played_audio_ms;
- marcar si fue completa.

Al salir de RECONNECTING:

- invalidar intentos anteriores;
- restaurar estado permitido.

## 14. Inicio de conexión

El Cliente debe:

1. recibir autorización efímera;
2. validar expiración;
3. establecer WebRTC o WebSocket;
4. intercambiar capacidades;
5. confirmar conexión;
6. esperar READY.

El backend debe:

- vincular connection_id;
- verificar VoiceSession ID;
- verificar Session;
- evitar replay;
- registrar endpoint lógico;
- establecer expiración.

## 15. Heartbeat y actividad

Debe existir una política de actividad.

Señales:

- audio enviado;
- audio recibido;
- evento de proveedor;
- heartbeat;
- cambio de estado;
- respuesta.

Campos:

- last_activity_at;
- last_client_heartbeat;
- last_provider_event;
- inactivity_timeout.

## 16. Expiración

Causas:

- autorización vencida;
- inactividad;
- duración máxima;
- Session expirada;
- tenant suspendido;
- actor bloqueado;
- política modificada;
- conexión no establecida;
- reconexión agotada.

Al expirar:

- cerrar conexión;
- invalidar token;
- detener audio;
- cancelar turnos;
- liberar recursos;
- emitir VoiceSessionExpired;
- mantener Session de texto cuando sea posible.

## 17. Cierre normal

Causas:

- Cliente desactiva voz;
- cambia a texto;
- cierra interfaz;
- Session se cierra;
- Operador toma control;
- flujo termina.

Secuencia:

1. solicitar EndVoiceSession;
2. marcar ENDING;
3. cancelar streaming;
4. finalizar reproducción;
5. persistir último turno;
6. liberar recursos;
7. invalidar autorización;
8. marcar ENDED;
9. Session pasa de VOICE_ACTIVE a ACTIVE o CLOSED.

## 18. Fallo

FAILED se usa cuando:

- proveedor no disponible;
- protocolo incompatible;
- autorización inválida;
- reconexión agotada;
- error interno;
- seguridad bloquea;
- corrupción de estado.

El fallo debe incluir:

- error code;
- retryable;
- fallback;
- timestamp;
- estado anterior;
- Correlation ID.

## 19. Reconexión

La reconexión no debe crear otra sesión comercial.

Debe:

- conservar VoiceSession ID cuando sea seguro;
- crear nueva autorización si la anterior expiró;
- incrementar connection generation;
- evitar audio duplicado;
- descartar chunks antiguos;
- validar último Turn ID;
- reanudar desde estado seguro.

## 20. Generación de conexión

Campo:

connection_generation

Cada reconexión incrementa.

Eventos de una generación anterior deben ignorarse o registrarse como
tardíos.

## 21. Control humano

Si Session entra en HUMAN_WAITING o HUMAN_ACTIVE:

- detener nuevas herramientas automáticas;
- mantener audio sólo si el Operador atiende por ese canal y la política
  lo permite;
- o cerrar VoiceSession;
- registrar transición.

## 22. Cambio a texto

Debe:

- finalizar audio;
- conservar transcript final;
- conservar pending intent;
- conservar slots;
- conservar contexto;
- marcar Session ACTIVE;
- permitir continuidad.

## 23. Eventos tardíos

Ejemplo:

VoiceSession ENDED.

Llega response.completed del proveedor.

Acción:

- no reactivar;
- no reproducir;
- registrar late_event;
- descartar efecto.

## 24. Concurrencia

Toda transición usa expected_voice_session_version.

Caso:

Version 7

Comando A:

InterruptResponse, expected 7.

Comando B:

EndVoiceSession, expected 7.

Sólo uno puede persistir.

El segundo debe recargar y reevaluar.

## 25. Pseudocódigo de inicio

```text
function start_voice_session(request, context):

    validate_session(context.session)
    validate_channel(context.channel)
    validate_capabilities(request.client_capabilities)
    validate_limits(context.actor, context.tenant)

    previous = get_idempotent_result(request.idempotency_key)

    if previous.exists:
        return previous

    voice_session = create_voice_session(
        state=REQUESTED,
        session_id=request.session_id
    )

    transition(voice_session, AUTHORIZING)

    authorization = request_ephemeral_authorization(
        voice_session,
        request.configuration
    )

    attach_authorization(voice_session, authorization)
    transition(voice_session, AUTHORIZED)

    persist_voice_session_and_events(voice_session)
    return voice_session
```

## 26. Pseudocódigo de cierre

```text
function end_voice_session(
    voice_session_id,
    expected_version,
    reason
):

    voice_session = load_voice_session(voice_session_id)

    validate_version(voice_session, expected_version)

    if voice_session.state in [ENDED, FAILED, EXPIRED]:
        return previous_terminal_result(voice_session)

    transition(voice_session, ENDING)

    cancel_pending_generation(voice_session)
    stop_audio_playback(voice_session)
    close_transport(voice_session)
    invalidate_authorization(voice_session)
    release_buffers(voice_session)

    transition(voice_session, ENDED)

    persist_voice_session_and_events(voice_session)
    update_parent_session(voice_session.session_id)

    return voice_session
```

## 27. Errores

VOICE_SESSION_NOT_FOUND

VOICE_SESSION_ALREADY_ACTIVE

VOICE_SESSION_LIMIT_EXCEEDED

VOICE_SESSION_STATE_INVALID

VOICE_SESSION_VERSION_CONFLICT

VOICE_SESSION_AUTHORIZATION_FAILED

VOICE_SESSION_AUTHORIZATION_EXPIRED

VOICE_SESSION_CONNECTION_FAILED

VOICE_SESSION_PROVIDER_UNAVAILABLE

VOICE_SESSION_RECONNECTION_FAILED

VOICE_SESSION_EXPIRED

VOICE_SESSION_ACCESS_DENIED

VOICE_SESSION_TENANT_MISMATCH

VOICE_SESSION_CLOSE_FAILED

## 28. Eventos

VoiceSessionRequested

VoiceAuthorizationStarted

VoiceAuthorizationIssued

VoiceAuthorizationFailed

VoiceConnectionStarted

VoiceSessionStarted

VoiceSessionReady

VoiceSessionSuspended

VoiceReconnectionStarted

VoiceReconnected

VoiceSessionEnding

VoiceSessionEnded

VoiceSessionFailed

VoiceSessionExpired

LateVoiceEventReceived

## 29. Observabilidad

Métricas:

- voice_session_requests_total;
- voice_session_started_total;
- voice_session_failed_total;
- voice_session_expired_total;
- voice_authorization_duration_seconds;
- voice_connection_duration_seconds;
- voice_session_duration_seconds;
- voice_reconnection_total;
- voice_reconnection_failure_total;
- voice_active_sessions;
- voice_orphan_sessions_total.

Dimensiones:

- provider_class;
- channel;
- locale;
- result;
- error_code;
- transport.

## 30. Auditoría

Registrar:

- VoiceSession ID;
- Session ID;
- actor;
- tenant;
- estado;
- transición;
- autorización reference;
- provider class;
- transport;
- razón de cierre;
- error;
- Correlation ID.

No registrar token temporal completo.

## 31. Casos límite

- doble click;
- permiso micrófono tardío;
- autorización expira antes de conectar;
- Cliente abre dos pestañas;
- reconexión paralela;
- Session cierra;
- actor bloqueado;
- tenant suspendido;
- proveedor responde tarde;
- navegador duerme;
- heartbeat perdido;
- voz cambia a texto;
- control humano;
- cierre durante respuesta;
- cierre durante tool proposal;
- cierre durante transcripción;
- versión conflictiva;
- red intermitente;
- reloj desalineado;
- replay de autorización.

## 32. Criterios de aceptación

AC-VSL-001

Toda VoiceSession posee ID.

AC-VSL-002

Toda VoiceSession pertenece a Session.

AC-VSL-003

La autorización es temporal.

AC-VSL-004

La API Key permanente no se expone.

AC-VSL-005

El inicio es idempotente.

AC-VSL-006

La FSM se respeta.

AC-VSL-007

El cierre libera recursos.

AC-VSL-008

La expiración invalida autorización.

AC-VSL-009

La reconexión no duplica turnos.

AC-VSL-010

Los eventos tardíos no reactivan.

AC-VSL-011

El cambio a texto conserva contexto.

AC-VSL-012

El control humano se respeta.

AC-VSL-013

La concurrencia usa versión.

AC-VSL-014

El fallo permite fallback.

AC-VSL-015

Todo estado es trazable.

## 33. Plan mínimo de pruebas

- inicio;
- idempotencia;
- conflicto;
- autorización;
- expiración;
- conexión;
- READY;
- cierre;
- fallo;
- reconexión;
- dos pestañas;
- Session cerrada;
- tenant;
- actor;
- heartbeat;
- late event;
- cambio a texto;
- control humano;
- versión;
- recursos;
- métricas;
- auditoría;
- seguridad.

## 34. Checklist

[ ] Existe VoiceSession ID.
[ ] Existe Session ID.
[ ] Existe tenant.
[ ] Existe versión.
[ ] Existe autorización.
[ ] Existe expiración.
[ ] Existe connection generation.
[ ] Se valida Session.
[ ] Se valida actor.
[ ] Se valida canal.
[ ] Se valida formato.
[ ] Se controla idempotencia.
[ ] Se controla concurrencia.
[ ] Se controla heartbeat.
[ ] Se controla cierre.
[ ] Se controla reconexión.
[ ] Se controlan eventos tardíos.
[ ] Se libera audio.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
