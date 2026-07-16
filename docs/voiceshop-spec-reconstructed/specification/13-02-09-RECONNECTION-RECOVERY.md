======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-02-09-RECONNECTION-RECOVERY.md

# RECONEXIÓN Y RECUPERACIÓN DE VOZ

## 1. Objetivo

Este documento define cómo VoiceShop recupera una interacción de voz
después de una pérdida de conexión, suspensión del navegador, cambio de
red, expiración de autorización, reinicio del backend o fallo del
proveedor Realtime.

La recuperación debe:

- preservar la Session conversacional;
- evitar duplicar turnos;
- evitar repetir herramientas;
- evitar reproducir respuestas obsoletas;
- reconstruir contexto;
- restaurar un estado seguro;
- degradar a texto cuando sea necesario;
- registrar resultados inciertos.

La reconexión de transporte no equivale a repetir una operación
comercial.

## 2. Alcance

Incluye:

- desconexión de WebRTC;
- desconexión de WebSocket;
- pérdida temporal de red;
- cambio Wi-Fi/datos;
- suspensión de pestaña;
- hibernación del equipo;
- expiración de autorización;
- reinicio de cliente;
- reinicio de backend;
- cambio de proveedor;
- recuperación de buffers;
- turnos parciales;
- respuestas parciales;
- Tool Proposals;
- confirmaciones;
- idempotencia;
- context reconstruction;
- fallback a texto;
- observabilidad;
- QA.

No incluye:

- implementación específica de WebRTC;
- reglas comerciales;
- resolución de pagos;
- procesamiento directo de inventario;
- persistencia física concreta;
- configuración de infraestructura.

## 3. Principios

RULE-REC-001

Toda reconexión pertenece a una VoiceSession existente o a una
VoiceSession de reemplazo explícitamente vinculada.

RULE-REC-002

Toda reconexión incrementa connection_generation.

RULE-REC-003

Los eventos de generaciones anteriores no modifican el estado vigente.

RULE-REC-004

La reconexión debe ser idempotente.

RULE-REC-005

Un turno COMMITTED no se vuelve a comprometer.

RULE-REC-006

Un Command ejecutado no se repite por reconexión.

RULE-REC-007

Una respuesta CANCELLED no se reanuda automáticamente.

RULE-REC-008

Una confirmación expirada no se recupera.

RULE-REC-009

El contexto oficial se reconstruye desde el backend.

RULE-REC-010

El proveedor de voz no es la única fuente de memoria.

RULE-REC-011

La autorización temporal debe renovarse cuando sea necesario.

RULE-REC-012

La recuperación debe respetar control humano.

RULE-REC-013

El sistema debe distinguir fallo conocido de resultado UNKNOWN.

RULE-REC-014

La recuperación tiene límite.

RULE-REC-015

El fallback a texto debe conservar la tarea pendiente.

## 4. Causas de desconexión

NETWORK_LOST

Pérdida de conectividad.

NETWORK_CHANGED

Cambio de red.

CLIENT_SUSPENDED

Pestaña o aplicación suspendida.

CLIENT_RELOADED

Recarga.

CLIENT_CRASHED

Cierre inesperado.

SERVER_RESTARTED

Reinicio del backend.

PROVIDER_DISCONNECTED

Proveedor cerró conexión.

AUTHORIZATION_EXPIRED

Credencial temporal expirada.

PROTOCOL_ERROR

Error de protocolo.

RATE_LIMITED

Proveedor o backend limita.

SECURITY_TERMINATED

Cierre por seguridad.

SESSION_EXPIRED

La Session conversacional expiró.

HUMAN_HANDOFF

Control transferido.

## 5. Estados

CONNECTED

DISCONNECTION_DETECTED

RECONNECTING

AUTHORIZATION_REFRESHING

CONTEXT_RECONSTRUCTING

RESUMING

DEGRADED_TO_TEXT

RECOVERED

FAILED

ABORTED

EXPIRED

Estados terminales del intento:

RECOVERED
DEGRADED_TO_TEXT
FAILED
ABORTED
EXPIRED

## 6. Contrato de ReconnectionAttempt

```json
{
  "reconnection_attempt_id": "UUID",
  "voice_session_id": "UUID",
  "session_id": "UUID",
  "tenant_id": "UUID",
  "previous_connection_generation": 2,
  "requested_connection_generation": 3,
  "reason": "NETWORK_LOST",
  "client_state": {
    "last_input_sequence": 184,
    "last_output_sequence": 221,
    "last_voice_turn_id": "UUID",
    "last_response_id": "UUID",
    "last_played_audio_ms": 1450
  },
  "server_state_reference": "UUID",
  "attempt_number": 1,
  "maximum_attempts": 3,
  "requested_at": "UTC_TIMESTAMP",
  "idempotency_key": "STRING",
  "status": "RECONNECTING"
}
```

## 7. Detección de desconexión

Fuentes:

- cierre de transporte;
- heartbeat;
- timeout de actividad;
- evento del proveedor;
- error del navegador;
- señal de sistema;
- fallo de envío;
- fallo de recepción.

Una ausencia breve de paquetes no debe cerrar automáticamente la sesión.

Debe existir:

- detection window;
- heartbeat grace period;
- network recovery grace;
- provider close reason.

## 8. Estado conocido antes de reconectar

Debe determinarse:

- VoiceSession state;
- Session state;
- control state;
- active Turn ID;
- Turn state;
- Transcript state;
- active Response ID;
- playback state;
- Tool Proposal state;
- Command state;
- pending confirmation;
- context version;
- connection_generation.

## 9. Matriz de recuperación

### READY

Puede reconectar a READY.

### LISTENING con turno sin commit

Políticas:

- cancelar turno parcial;
- o reanudar sólo si el protocolo garantiza continuidad;
- normalmente solicitar repetición.

### PROCESSING

No repetir automáticamente.

Consultar:

- Transcript;
- Intent;
- Tool Proposal;
- Command.

### RESPONDING

No reanudar audio automáticamente.

Registrar playback parcial y ofrecer:

- repetir;
- mostrar texto;
- continuar.

### INTERRUPTING

Completar cancelación.

No reactivar respuesta anterior.

### HUMAN_ACTIVE

No recuperar automatización de voz sin autorización.

### ENDING o terminal

No reconectar.

## 10. Renovación de autorización

Se requiere cuando:

- token expiró;
- generation cambia;
- proveedor cambia;
- scopes cambian;
- política exige credencial por conexión.

La nueva autorización debe:

- vincularse con VoiceSession;
- incluir nueva generation;
- expirar;
- limitar scopes;
- invalidar la anterior cuando corresponda.

## 11. Connection generation

Generation inicial:

1

Cada reconexión aceptada:

generation += 1

Todo evento debe incluir generation.

Evento con generation menor:

STALE

Evento con generation mayor no conocido:

INVALID

## 12. Reconstrucción de contexto

Orden:

1. cargar Session.
2. validar tenant.
3. validar actor.
4. cargar VoiceSession.
5. cargar Shared Context.
6. cargar Turn activo.
7. cargar transcript.
8. cargar Response y delivery.
9. cargar Tool Proposal.
10. cargar Command result.
11. cargar pending confirmation.
12. aplicar expiraciones.
13. construir Recovery Plan.

## 13. Recovery Plan

```json
{
  "recovery_plan_id": "UUID",
  "voice_session_id": "UUID",
  "target_state": "READY",
  "actions": [
    "REFRESH_AUTHORIZATION",
    "CANCEL_PARTIAL_INPUT_TURN",
    "MARK_RESPONSE_PARTIAL",
    "RESTORE_PENDING_INTENT"
  ],
  "prohibited_actions": [
    "REEXECUTE_COMMAND",
    "RESUME_CANCELLED_AUDIO"
  ],
  "context_version": 28,
  "expires_at": "UTC_TIMESTAMP"
}
```

## 14. Turno parcial

Si no fue COMMITTED:

- marcar CANCELLED_BY_DISCONNECTION;
- conservar metadatos;
- descartar audio temporal;
- pedir repetición;
- no enviar al dominio.

Si el proveedor confirmó commit y backend no recibió resultado:

- consultar estado;
- deduplicar por Turn ID;
- no crear segundo commit.

## 15. Transcripción en proceso

Si el Turn está COMMITTED:

- consultar Transcript state;
- esperar dentro de límite;
- recuperar resultado;
- o marcar fallo.

No volver a enviar audio sin verificar idempotencia.

## 16. Tool Proposal

Si está PROPOSED o VALIDATING:

- reevaluar contexto;
- cancelar si cambió estado;
- mantener sólo si sigue vigente.

Si READY_TO_EXECUTE pero Command no creado:

- reconstruir validaciones.

Si Command creado:

- consultar Command result;
- no crear otro.

## 17. Operación UNKNOWN

Si el Command depende de un sistema externo y su resultado es incierto:

- no repetir;
- iniciar conciliación;
- informar por texto o voz;
- mantener referencia;
- no anunciar éxito.

## 18. Respuesta parcial

Se debe conservar:

- Response ID;
- Voice Response ID;
- played_audio_ms;
- total_audio_ms;
- delivery state.

Después de recuperar:

- no continuar desde un punto arbitrario;
- ofrecer repetir desde el inicio;
- o entregar texto;
- o resumir.

## 19. Confirmación pendiente

Puede recuperarse sólo si:

- no expiró;
- contexto coincide;
- actor coincide;
- estado coincide;
- versiones coinciden;
- pregunta fue entregada.

Si no:

- invalidar;
- generar nueva confirmación.

## 20. Reintentos

Debe configurarse:

- maximum_attempts;
- initial_backoff;
- maximum_backoff;
- total_recovery_timeout;
- jitter;
- provider failover.

No reintentar indefinidamente.

## 21. Provider failover

Puede usarse si:

- política lo permite;
- formato compatible;
- región permitida;
- privacidad equivalente;
- contexto reconstruible;
- herramientas preservan contrato.

El cambio de proveedor debe registrarse.

## 22. Degradación a texto

Se usa cuando:

- reconexión agotada;
- micrófono no disponible;
- TTS no disponible;
- proveedor degradado;
- latencia excesiva;
- seguridad;
- preferencia del Cliente.

Debe conservar:

- Session;
- pending intent;
- slots;
- confirmaciones vigentes;
- resultado oficial;
- Correlation ID.

## 23. Recuperación tras reinicio del backend

Recovery Worker debe buscar:

- VoiceSession RECONNECTING;
- VoiceSession PROCESSING;
- Turn COMMITTED sin Transcript terminal;
- Response PLAYING sin cierre;
- Tool Proposal EXECUTING;
- autorización vigente;
- sesiones huérfanas.

Debe:

- marcar conexiones antiguas;
- conciliar;
- expirar;
- informar.

## 24. Recuperación tras recarga del cliente

El Cliente presenta:

- Session token;
- VoiceSession ID;
- last known generation;
- last Turn ID;
- last Response ID;
- idempotency key.

El backend decide si:

- recuperar VoiceSession;
- crear una nueva vinculada;
- degradar a texto;
- rechazar.

## 25. Idempotencia

Clave:

voice_session_id
+ requested_connection_generation
+ client_instance_id

Misma clave, mismo payload:

- mismo resultado.

Misma clave, distinto estado:

- RECONNECTION_IDEMPOTENCY_CONFLICT.

## 26. Concurrencia

Dos pestañas intentan reconectar:

- sólo una obtiene generation nueva;
- la otra recibe stale generation o conflicto;
- no comparten audio.

## 27. Seguridad

Validar:

- actor;
- tenant;
- Session;
- VoiceSession;
- generation;
- token;
- scopes;
- replay;
- client instance;
- origen;
- rate limit.

## 28. Flujo principal

1. detectar desconexión.
2. persistir estado.
3. crear Reconnection Attempt.
4. validar Session.
5. validar VoiceSession.
6. reservar generation.
7. renovar autorización.
8. reconstruir contexto.
9. crear Recovery Plan.
10. cancelar elementos parciales.
11. conciliar operaciones.
12. establecer transporte.
13. confirmar generación.
14. restaurar estado seguro.
15. informar al Cliente.
16. emitir eventos.

## 29. Pseudocódigo

```text
function reconnect_voice(request):

    session = load_session(request.session_id)
    voice = load_voice_session(request.voice_session_id)

    validate_session(session)
    validate_voice_access(request, session, voice)
    validate_previous_generation(
        request.previous_connection_generation,
        voice.connection_generation
    )

    previous = get_idempotent_result(request.idempotency_key)
    if previous.exists:
        return previous

    attempt = create_reconnection_attempt(request)

    if attempt.attempt_number > policy.maximum_attempts:
        return degrade_to_text(session, voice)

    new_generation = reserve_next_connection_generation(voice)

    authorization = refresh_ephemeral_authorization(
        voice,
        new_generation
    )

    context = reconstruct_voice_context(
        session,
        voice,
        request.client_state
    )

    plan = build_recovery_plan(context)

    execute_safe_recovery_actions(plan)

    connection = establish_new_transport(
        authorization,
        new_generation
    )

    mark_voice_recovered(
        voice,
        connection,
        new_generation,
        plan.target_state
    )

    persist_recovery_result(attempt, voice, context)
    emit(VoiceReconnected)

    return ReconnectionResult(
        status=RECOVERED,
        generation=new_generation,
        target_state=plan.target_state
    )
```

## 30. Errores

RECONNECTION_SESSION_NOT_FOUND

RECONNECTION_VOICE_SESSION_NOT_FOUND

RECONNECTION_ACCESS_DENIED

RECONNECTION_TENANT_MISMATCH

RECONNECTION_GENERATION_STALE

RECONNECTION_GENERATION_CONFLICT

RECONNECTION_AUTHORIZATION_FAILED

RECONNECTION_CONTEXT_RECONSTRUCTION_FAILED

RECONNECTION_ATTEMPTS_EXCEEDED

RECONNECTION_PROVIDER_UNAVAILABLE

RECONNECTION_TRANSPORT_FAILED

RECONNECTION_IDEMPOTENCY_CONFLICT

RECONNECTION_STATE_TERMINAL

RECONNECTION_SECURITY_BLOCKED

RECONNECTION_DEGRADED_TO_TEXT

## 31. Eventos

VoiceDisconnectionDetected

VoiceReconnectionRequested

VoiceAuthorizationRefreshRequested

VoiceAuthorizationRefreshed

VoiceContextReconstructionStarted

VoiceContextReconstructed

VoiceRecoveryPlanCreated

VoicePartialTurnCancelled

VoiceResponseMarkedPartial

VoiceProviderFailoverActivated

VoiceReconnected

VoiceRecoveryDegradedToText

VoiceReconnectionFailed

VoiceOrphanSessionExpired

## 32. Observabilidad

Métricas:

- voice_disconnections_total;
- voice_reconnection_attempts_total;
- voice_reconnection_success_total;
- voice_reconnection_failure_total;
- voice_reconnection_duration_seconds;
- voice_authorization_refresh_total;
- voice_context_reconstruction_total;
- voice_provider_failover_total;
- voice_degraded_to_text_total;
- voice_orphan_session_total;
- stale_voice_events_total.

Dimensiones:

- reason;
- attempt;
- previous_state;
- target_state;
- provider_class;
- transport;
- result;
- error_code.

## 33. Auditoría

Registrar:

- Reconnection Attempt ID;
- VoiceSession ID;
- Session ID;
- previous/new generation;
- causa;
- plan;
- provider failover;
- elementos cancelados;
- operación UNKNOWN;
- resultado;
- Correlation ID.

No registrar tokens ni audio.

## 34. Casos límite

- red cae durante input;
- red cae durante transcripción;
- red cae durante tool execution;
- red cae durante playback;
- token expira;
- dos pestañas;
- recarga;
- backend reinicia;
- proveedor cae;
- provider failover;
- confirmation expired;
- Command UNKNOWN;
- late audio;
- late transcript;
- Session cerrada;
- control humano;
- tenant suspendido;
- actor bloqueado;
- máxima cantidad de intentos;
- contexto corrupto.

## 35. Criterios de aceptación

AC-REC-001

Toda reconexión tiene Attempt ID.

AC-REC-002

Toda reconexión incrementa generation.

AC-REC-003

Los eventos antiguos se ignoran.

AC-REC-004

Un Turn committed no se duplica.

AC-REC-005

Un Command no se repite.

AC-REC-006

El contexto se reconstruye.

AC-REC-007

La autorización se renueva.

AC-REC-008

Las respuestas parciales se conservan.

AC-REC-009

Las confirmaciones se revalidan.

AC-REC-010

La recuperación tiene límite.

AC-REC-011

Existe fallback a texto.

AC-REC-012

El control humano se respeta.

AC-REC-013

UNKNOWN se concilia.

AC-REC-014

La operación es idempotente.

AC-REC-015

Todo resultado es trazable.

## 36. Plan mínimo de pruebas

- input disconnect;
- processing disconnect;
- output disconnect;
- token expiration;
- context reconstruction;
- duplicate;
- generation;
- two tabs;
- provider failover;
- backend restart;
- late events;
- partial turn;
- partial response;
- pending tool;
- command completed;
- command unknown;
- confirmation;
- human;
- tenant;
- security;
- degrade to text;
- metrics;
- audit.

## 37. Checklist

[ ] Existe Attempt ID.
[ ] Existe VoiceSession ID.
[ ] Existe Session ID.
[ ] Existe previous generation.
[ ] Existe new generation.
[ ] Existe idempotency key.
[ ] Se renueva autorización.
[ ] Se reconstruye contexto.
[ ] Se crea Recovery Plan.
[ ] Se cancela turno parcial.
[ ] Se conserva respuesta parcial.
[ ] Se concilia Command.
[ ] Se limita reintento.
[ ] Se soporta failover.
[ ] Se degrada a texto.
[ ] Se controla concurrencia.
[ ] Se persiste.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
