======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-02-03-TURN-DETECTION.md

# DETECCIÓN DE TURNOS Y ACTIVIDAD DE VOZ

## 1. Objetivo

Este documento define cómo VoiceShop determina cuándo el Cliente comienza
a hablar, cuándo termina su intervención y cuándo un turno de voz puede
considerarse listo para procesamiento.

La detección de turnos coordina:

- captura de audio;
- Voice Activity Detection;
- silencios;
- interrupciones;
- push-to-talk;
- confirmación manual de turno;
- cierre automático;
- latencia;
- errores;
- observabilidad.

La detección de turnos no interpreta intención.

La detección de turnos no ejecuta herramientas.

La detección de turnos no confirma acciones comerciales.

## 2. Alcance

Incluye:

- client-side VAD;
- server-side VAD;
- provider-side VAD;
- push-to-talk;
- manual commit;
- detección de inicio;
- detección de fin;
- silencios;
- ruido;
- umbrales;
- pre-roll;
- post-roll;
- barge-in;
- turn timeout;
- false start;
- speech resume;
- turn cancellation;
- turn finalization;
- métricas;
- QA.

No incluye:

- transcripción detallada;
- síntesis;
- intent detection;
- tool calling;
- lógica comercial;
- seguridad de pagos;
- ejecución de comandos.

## 3. Principios

RULE-TURN-001

Todo turno de voz posee Turn ID.

RULE-TURN-002

Todo turno pertenece a una VoiceSession activa.

RULE-TURN-003

Todo turno posee estado.

RULE-TURN-004

El inicio y fin de voz deben registrarse.

RULE-TURN-005

La detección automática debe ser configurable.

RULE-TURN-006

El Cliente debe poder usar push-to-talk cuando el canal lo permita.

RULE-TURN-007

El silencio no debe interpretarse como confirmación.

RULE-TURN-008

Una transcripción parcial no cierra un turno.

RULE-TURN-009

Un turno no debe comprometerse dos veces.

RULE-TURN-010

La interrupción debe abrir un nuevo turno.

RULE-TURN-011

Un turno expirado no debe procesarse como vigente.

RULE-TURN-012

El ruido no debe producir ejecución comercial.

RULE-TURN-013

La baja confianza debe propagarse.

RULE-TURN-014

Los eventos tardíos no deben modificar un turno terminal.

RULE-TURN-015

Toda estrategia debe poder degradar a control manual.

## 4. Modos de detección

### SERVER_VAD

El proveedor o backend detecta actividad.

Ventajas:

- menor lógica en cliente;
- parámetros centralizados;
- integración directa con streaming.

Riesgos:

- latencia de red;
- dependencia del proveedor;
- falsos positivos;
- comportamiento variable.

### CLIENT_VAD

El cliente detecta actividad localmente.

Ventajas:

- reacción rápida;
- útil para barge-in;
- menor envío de silencio.

Riesgos:

- diferencias entre navegadores;
- CPU;
- permisos;
- manipulación del cliente.

### HYBRID_VAD

Combina señales de cliente y servidor.

Recomendado cuando:

- se necesita interrupción rápida;
- se requiere validación del servidor;
- existen condiciones de red variables.

### PUSH_TO_TALK

El Cliente controla inicio y fin.

Ventajas:

- menor ambigüedad;
- útil en ruido;
- fácil de explicar.

Riesgos:

- peor naturalidad;
- botón mantenido accidentalmente;
- liberación temprana.

### MANUAL_COMMIT

El audio se acumula y el Cliente confirma el turno.

Útil para:

- pruebas;
- accesibilidad;
- entornos ruidosos;
- operaciones críticas.

## 5. Estados del turno

IDLE

No existe turno activo.

START_CANDIDATE

Se detectó una posible actividad.

SPEECH_STARTED

Se confirmó inicio.

CAPTURING

Se recibe audio del turno.

END_CANDIDATE

Se detectó posible final.

COMMITTING

Se cierra el buffer.

COMMITTED

El turno está listo para procesamiento.

CANCELLED

El turno fue cancelado.

EXPIRED

El turno expiró.

FAILED

El turno falló.

Estados terminales:

COMMITTED
CANCELLED
EXPIRED
FAILED

## 6. Contrato de VoiceTurn

```json
{
  "voice_turn_id": "UUID",
  "voice_session_id": "UUID",
  "session_id": "UUID",
  "connection_generation": 2,
  "state": "CAPTURING",
  "detection_mode": "HYBRID_VAD",
  "started_at": "UTC_TIMESTAMP",
  "last_audio_at": "UTC_TIMESTAMP",
  "speech_start_ms": 120,
  "speech_end_candidate_ms": null,
  "committed_at": null,
  "audio_duration_ms": 1800,
  "pre_roll_ms": 200,
  "post_roll_ms": 150,
  "version": 3
}
```

## 7. Parámetros

- start_threshold;
- end_threshold;
- minimum_speech_ms;
- minimum_silence_ms;
- maximum_turn_ms;
- pre_roll_ms;
- post_roll_ms;
- false_start_window_ms;
- resume_window_ms;
- noise_floor;
- barge_in_threshold;
- commit_delay_ms.

Los valores deben configurarse por:

- canal;
- dispositivo;
- idioma;
- entorno;
- perfil;
- proveedor.

## 8. Inicio de voz

Se detecta mediante:

- energía;
- probabilidad de voz;
- características acústicas;
- señal del cliente;
- evento del proveedor;
- botón.

El inicio debe confirmarse cuando:

- supera threshold;
- cumple duración mínima;
- la VoiceSession está READY o RESPONDING para barge-in;
- la conexión generation coincide.

## 9. Pre-roll

El sistema puede conservar audio previo al inicio detectado.

Objetivo:

- evitar cortar consonantes;
- capturar inicio real;
- mejorar transcripción.

El pre-roll debe estar limitado.

No debe conservar audio indefinidamente.

## 10. False start

Ejemplos:

- golpe;
- tos;
- ruido;
- respiración;
- palabra aislada accidental.

Si la actividad no cumple minimum_speech_ms:

- marcar false_start;
- descartar o conservar como métrica;
- no crear turno comercial.

## 11. Fin de voz

Se detecta cuando:

- existe silencio suficiente;
- la probabilidad de voz cae;
- el Cliente libera botón;
- llega manual commit;
- se alcanza máximo;
- la conexión termina.

El fin no debe confirmarse de forma excesivamente agresiva.

## 12. End candidate

Cuando aparece silencio:

CAPTURING → END_CANDIDATE

Si la voz se reanuda dentro de resume_window_ms:

END_CANDIDATE → CAPTURING

Si el silencio supera minimum_silence_ms:

END_CANDIDATE → COMMITTING

## 13. Post-roll

Conservar audio posterior al fin candidato.

Objetivo:

- evitar cortar palabras;
- conservar finales suaves;
- mejorar transcripción.

Debe estar limitado.

## 14. Commit

Un commit debe:

1. cerrar input buffer;
2. registrar última secuencia;
3. calcular duración;
4. validar que exista audio;
5. validar estado;
6. validar idempotencia;
7. persistir;
8. emitir AudioTurnCommitted;
9. enviar a transcripción.

## 15. Idempotencia

Clave:

voice_session_id
+ voice_turn_id
+ commit_generation

Dos commits iguales:

- devolver mismo resultado.

Mismo Turn ID con distinto final sequence:

- rechazar TURN_COMMIT_CONFLICT.

## 16. Turn timeout

Causas:

- duración máxima;
- silencio prolongado;
- conexión perdida;
- cliente suspendido;
- proveedor no responde.

Políticas:

- commit parcial;
- cancelar;
- pedir repetición;
- degradar a texto.

Para acciones sensibles, un turno truncado no debe ejecutar.

## 17. Barge-in

Cuando el Cliente habla durante RESPONDING:

1. detectar speech start;
2. emitir VoiceBargeInDetected;
3. cancelar playback;
4. registrar played_audio_ms;
5. abrir nuevo Turn ID;
6. cambiar VoiceSession a INTERRUPTING;
7. luego LISTENING.

La detección local puede iniciar la cancelación rápida.

El servidor debe validar.

## 18. Push-to-talk

Estados:

BUTTON_DOWN

- iniciar captura;
- crear turno;
- registrar timestamp.

BUTTON_UP

- cerrar captura;
- commit.

Errores:

- liberación sin inicio;
- doble press;
- botón mantenido;
- pérdida de foco;
- permiso revocado.

## 19. Manual commit

El Cliente puede:

- iniciar grabación;
- detener;
- revisar;
- enviar;
- cancelar.

El audio no debe procesarse antes de enviar si esa es la política.

## 20. Ruido

El sistema debe soportar perfiles:

QUIET

NORMAL

NOISY

VERY_NOISY

Puede ajustar:

- threshold;
- silence;
- VAD;
- pre-roll;
- post-roll;
- fallback a push-to-talk.

## 21. Adaptación

La adaptación automática debe:

- estar limitada;
- registrar cambios;
- no reducir seguridad;
- no persistir como regla global sin validación.

## 22. Interacción con transcripción

El turno COMMITTED entrega:

- Voice Turn ID;
- audio reference;
- idioma;
- formato;
- duración;
- quality signals;
- VAD metadata;
- connection generation.

## 23. Eventos tardíos

Ejemplo:

Turn COMMITTED.

Llega speech_started viejo.

Acción:

- ignorar para estado;
- registrar late event;
- no reabrir turno.

## 24. Concurrencia

Un VoiceSession sólo debe tener:

- un turno de entrada activo;
- salvo diseño duplex explícito.

Toda transición usa expected_turn_version.

## 25. Flujo SERVER_VAD

1. recibir audio;
2. proveedor detecta speech_started;
3. validar session;
4. crear Turn ID;
5. capturar;
6. proveedor detecta speech_stopped;
7. esperar commit delay;
8. commit;
9. transcribir.

## 26. Flujo HYBRID_VAD

1. cliente detecta inicio;
2. cliente envía señal rápida;
3. servidor valida audio;
4. crea turno;
5. cliente detecta posible fin;
6. servidor confirma;
7. commit.

## 27. Pseudocódigo

```text
function handle_vad_signal(signal, voice_session):

    validate_voice_session(voice_session)
    validate_connection_generation(signal, voice_session)

    turn = load_or_create_active_turn(voice_session)

    if signal.type == SPEECH_START_CANDIDATE:
        if turn.state == IDLE:
            transition(turn, START_CANDIDATE)

        if passes_start_policy(signal):
            transition(turn, SPEECH_STARTED)
            transition(turn, CAPTURING)
            emit(VoiceSpeechStarted)

    if signal.type == SPEECH_END_CANDIDATE:
        if turn.state == CAPTURING:
            transition(turn, END_CANDIDATE)
            schedule_end_confirmation(turn)

    if signal.type == SPEECH_RESUMED:
        if turn.state == END_CANDIDATE:
            transition(turn, CAPTURING)

    if signal.type == END_CONFIRMED:
        commit_voice_turn(turn)

    persist(turn)
    return turn
```

## 28. Errores

TURN_NOT_FOUND

TURN_ALREADY_ACTIVE

TURN_STATE_INVALID

TURN_VERSION_CONFLICT

TURN_AUDIO_EMPTY

TURN_TOO_SHORT

TURN_TOO_LONG

TURN_COMMIT_CONFLICT

TURN_EXPIRED

TURN_CONNECTION_GENERATION_STALE

TURN_VAD_SIGNAL_INVALID

TURN_NOISE_TOO_HIGH

TURN_CAPTURE_FAILED

TURN_COMMIT_FAILED

## 29. Eventos

VoiceTurnCreated

VoiceStartCandidateDetected

VoiceSpeechStarted

VoiceFalseStartDetected

VoiceEndCandidateDetected

VoiceSpeechResumed

VoiceSpeechStopped

VoiceTurnCommitted

VoiceTurnCancelled

VoiceTurnExpired

VoiceBargeInDetected

VoiceTurnFailed

LateTurnEventReceived

## 30. Observabilidad

Métricas:

- voice_turns_created_total;
- voice_turns_committed_total;
- voice_false_starts_total;
- voice_turn_cancelled_total;
- voice_turn_expired_total;
- vad_start_latency_seconds;
- vad_end_latency_seconds;
- voice_turn_duration_seconds;
- voice_barge_in_total;
- voice_noise_profile_total;
- voice_manual_commit_total.

Dimensiones:

- detection_mode;
- noise_profile;
- channel;
- provider_class;
- result;
- error_code.

## 31. Auditoría

Registrar:

- Voice Turn ID;
- VoiceSession ID;
- detection mode;
- start;
- end;
- duration;
- commit;
- cancellation;
- barge-in;
- error;
- Correlation ID.

No registrar audio.

## 32. Casos límite

- tos;
- ruido;
- una palabra;
- silencio;
- pausa larga;
- frase larga;
- Cliente retoma;
- doble speech_started;
- speech_stopped tardío;
- push-to-talk doble;
- commit duplicado;
- audio vacío;
- conexión perdida;
- barge-in;
- dispositivo lento;
- background tab;
- clock skew;
- generation antigua;
- control humano;
- Session cerrada;
- idioma cambiado.

## 33. Criterios de aceptación

AC-TURN-001

Todo turno tiene ID.

AC-TURN-002

Todo turno pertenece a VoiceSession.

AC-TURN-003

Existe modo configurable.

AC-TURN-004

Los false starts no ejecutan.

AC-TURN-005

El commit es idempotente.

AC-TURN-006

El barge-in abre nuevo turno.

AC-TURN-007

Los eventos tardíos no reabren.

AC-TURN-008

El ruido puede degradar a manual.

AC-TURN-009

La duración se limita.

AC-TURN-010

El pre-roll se limita.

AC-TURN-011

El post-roll se limita.

AC-TURN-012

La concurrencia se controla.

AC-TURN-013

La baja calidad se propaga.

AC-TURN-014

El turno puede cancelarse.

AC-TURN-015

Todo estado es trazable.

## 34. Plan mínimo de pruebas

- server VAD;
- client VAD;
- hybrid;
- push-to-talk;
- manual commit;
- start;
- end;
- resume;
- false start;
- ruido;
- timeout;
- duration;
- duplicate commit;
- conflict;
- barge-in;
- late event;
- reconnection;
- generation;
- concurrency;
- metrics;
- audit;
- privacy.

## 35. Checklist

[ ] Existe Turn ID.
[ ] Existe VoiceSession ID.
[ ] Existe modo.
[ ] Existen thresholds.
[ ] Existe pre-roll.
[ ] Existe post-roll.
[ ] Existe timeout.
[ ] Existe commit.
[ ] Existe idempotencia.
[ ] Existe VAD.
[ ] Existe push-to-talk.
[ ] Existe manual commit.
[ ] Existe barge-in.
[ ] Se controla ruido.
[ ] Se controla concurrencia.
[ ] Se persiste.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
