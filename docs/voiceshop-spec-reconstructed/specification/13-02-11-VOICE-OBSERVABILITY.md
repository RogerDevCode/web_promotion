======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-02-11-VOICE-OBSERVABILITY.md

# OBSERVABILIDAD DEL CANAL DE VOZ

## 1. Objetivo

Este documento define las señales, métricas, trazas, logs, alertas y
criterios de calidad necesarios para operar el subsistema de voz
Realtime de VoiceShop.

La observabilidad debe permitir:

- medir latencia;
- medir calidad de audio;
- detectar pérdida;
- detectar interrupciones;
- investigar reconexiones;
- controlar costes;
- comparar proveedores;
- detectar abuso;
- evaluar experiencia;
- verificar SLOs;
- reconstruir fallos sin almacenar audio completo.

## 2. Alcance

Incluye:

- VoiceSession;
- autorizaciones;
- conexiones;
- transporte;
- audio input;
- audio output;
- VAD;
- turn detection;
- transcripción;
- TTS;
- playback;
- barge-in;
- Tool Calling;
- context sync;
- reconnection;
- seguridad;
- costes;
- dashboards;
- alertas;
- QA.

No incluye:

- almacenamiento ilimitado de audio;
- contenido completo por defecto;
- chain-of-thought;
- secretos;
- analítica comercial no relacionada.

## 3. Principios

RULE-VOBS-001

Toda VoiceSession debe ser trazable.

RULE-VOBS-002

Todo Voice Turn debe ser trazable.

RULE-VOBS-003

Toda respuesta de voz debe ser trazable.

RULE-VOBS-004

Toda reconexión debe ser trazable.

RULE-VOBS-005

Las métricas deben evitar alta cardinalidad.

RULE-VOBS-006

Los logs no deben contener audio.

RULE-VOBS-007

Los logs no deben contener tokens.

RULE-VOBS-008

Las transcripciones completas no deben aparecer en logs generales.

RULE-VOBS-009

Toda latencia debe medirse con reloj monotónico cuando corresponda.

RULE-VOBS-010

Debe distinguirse latencia de red, proveedor y aplicación.

RULE-VOBS-011

Debe distinguirse calidad técnica y calidad conversacional.

RULE-VOBS-012

Debe medirse coste.

RULE-VOBS-013

Debe medirse degradación a texto.

RULE-VOBS-014

Las alertas deben ser accionables.

RULE-VOBS-015

La pérdida de observabilidad no debe corromper la conversación.

## 4. Identificadores

- Request ID;
- Correlation ID;
- Session ID;
- VoiceSession ID;
- Voice Turn ID;
- Transcript ID;
- Response ID;
- Voice Response ID;
- Interruption ID;
- Reconnection Attempt ID;
- Tool Proposal ID;
- Command ID;
- connection_generation;
- provider request reference.

No usar IDs únicos como etiquetas de métricas.

## 5. Línea de tiempo de un turno

T0

speech_start_detected

T1

first_audio_chunk_received

T2

speech_end_detected

T3

turn_committed

T4

final_transcript_received

T5

intent_detected

T6

tool_result_received

T7

response_generated

T8

first_output_audio_received

T9

playback_started

T10

playback_completed o interrupted

## 6. Latencias

speech_start_detection_latency

Tiempo entre actividad y detección.

speech_end_detection_latency

Silencio hasta cierre.

transcription_latency

Commit hasta transcript final.

intent_latency

Transcript hasta intención.

tool_latency

Tool execution.

response_generation_latency

Resultado hasta texto.

tts_first_audio_latency

Solicitud TTS hasta primer audio.

playback_start_latency

Primer audio hasta reproducción.

end_to_first_audio_latency

Fin de habla hasta primer audio.

turn_total_latency

Inicio de habla hasta final de respuesta.

barge_in_stop_latency

Actividad del Cliente hasta detener playback.

reconnection_latency

Detección hasta recuperación.

## 7. Métricas de VoiceSession

- voice_sessions_requested_total;
- voice_sessions_authorized_total;
- voice_sessions_started_total;
- voice_sessions_ended_total;
- voice_sessions_failed_total;
- voice_sessions_expired_total;
- voice_sessions_active;
- voice_session_duration_seconds;
- voice_authorization_latency_seconds;
- voice_connection_latency_seconds.

## 8. Métricas de transporte

- voice_audio_input_bytes_total;
- voice_audio_output_bytes_total;
- voice_audio_chunks_total;
- voice_audio_chunks_dropped_total;
- voice_audio_duplicate_chunks_total;
- voice_audio_gaps_total;
- voice_audio_reordered_chunks_total;
- voice_audio_buffer_ms;
- voice_audio_backpressure_total;
- voice_transport_errors_total.

## 9. Métricas de VAD y turnos

- voice_turns_total;
- voice_turns_committed_total;
- voice_turns_cancelled_total;
- voice_false_starts_total;
- voice_turn_timeouts_total;
- voice_turn_duration_seconds;
- voice_vad_start_latency_seconds;
- voice_vad_end_latency_seconds;
- voice_noise_profile_total;
- voice_push_to_talk_total.

## 10. Métricas de transcripción

- voice_transcription_requests_total;
- voice_transcription_success_total;
- voice_transcription_failure_total;
- voice_transcription_latency_seconds;
- voice_transcript_low_confidence_total;
- voice_transcript_empty_total;
- voice_transcript_truncated_total;
- voice_transcript_language_total;
- voice_partial_transcripts_total.

## 11. Métricas de TTS

- voice_tts_requests_total;
- voice_tts_success_total;
- voice_tts_failure_total;
- voice_tts_first_audio_seconds;
- voice_tts_total_latency_seconds;
- voice_tts_audio_duration_seconds;
- voice_tts_cancelled_total;
- voice_tts_fallback_total.

## 12. Métricas de playback

- voice_playback_started_total;
- voice_playback_completed_total;
- voice_playback_interrupted_total;
- voice_playback_failed_total;
- voice_played_audio_seconds;
- voice_unplayed_audio_seconds;
- voice_late_audio_discarded_total.

## 13. Métricas de barge-in

- voice_barge_in_candidates_total;
- voice_barge_in_confirmed_total;
- voice_barge_in_false_positive_total;
- voice_barge_in_stop_latency_seconds;
- voice_confirmation_interrupted_total;
- voice_response_partial_delivery_total.

## 14. Métricas de herramientas

- voice_tool_proposals_total;
- voice_tool_validation_failure_total;
- voice_tool_clarification_total;
- voice_tool_confirmation_total;
- voice_tool_execution_total;
- voice_tool_execution_failure_total;
- voice_tool_duplicate_prevented_total;
- voice_tool_unknown_result_total.

## 15. Métricas de sincronización

- voice_context_sync_total;
- voice_context_sync_failure_total;
- voice_text_channel_switch_total;
- text_voice_channel_switch_total;
- voice_cross_channel_duplicate_total;
- voice_context_conflict_total;
- voice_context_reconstruction_total.

## 16. Métricas de reconexión

- voice_disconnections_total;
- voice_reconnection_attempts_total;
- voice_reconnection_success_total;
- voice_reconnection_failure_total;
- voice_reconnection_latency_seconds;
- voice_provider_failover_total;
- voice_degraded_to_text_total;
- voice_orphan_sessions_total;
- voice_stale_generation_events_total.

## 17. Métricas de seguridad

- voice_authorization_denied_total;
- voice_token_replay_total;
- voice_hijack_attempt_total;
- voice_cross_tenant_attempt_total;
- voice_prompt_injection_total;
- voice_tool_injection_total;
- voice_secret_detection_total;
- voice_rate_limit_total;
- voice_security_termination_total.

## 18. Métricas de calidad conversacional

- voice_task_completion_rate;
- voice_clarification_rate;
- voice_handoff_rate;
- voice_abandonment_rate;
- voice_repeat_request_rate;
- voice_correction_rate;
- voice_unknown_intent_rate;
- voice_average_turns_to_completion;
- voice_channel_switch_rate;
- voice_customer_interruption_rate.

## 19. Métricas de calidad acústica

Cuando estén disponibles:

- packet_loss_ratio;
- jitter_ms;
- round_trip_time_ms;
- audio_level;
- clipping_ratio;
- noise_score;
- echo_score;
- speech_probability;
- sample_rate_mismatch_total.

No todos los transportes ofrecen estas métricas.

## 20. Métricas de coste

- voice_input_audio_seconds;
- voice_output_audio_seconds;
- voice_transcription_cost_estimate;
- voice_tts_cost_estimate;
- voice_realtime_cost_estimate;
- voice_tokens_input_total;
- voice_tokens_output_total;
- voice_cost_per_session_estimate;
- voice_cost_per_completed_task_estimate.

## 21. Etiquetas permitidas

- provider_class;
- model_class;
- transport;
- audio_encoding;
- sample_rate_bucket;
- channel;
- locale;
- noise_profile;
- result;
- error_code;
- risk;
- tenant_tier;
- connection_generation_bucket;
- detection_mode.

## 22. Etiquetas prohibidas

- Session ID;
- VoiceSession ID;
- Turn ID;
- Transcript ID;
- Response ID;
- actor ID;
- audio payload;
- transcript text;
- token;
- Product ID de alta cardinalidad;
- Order ID.

## 23. Logs estructurados

Ejemplo:

```json
{
  "timestamp": "UTC_TIMESTAMP",
  "level": "INFO",
  "service": "voice-gateway",
  "event_name": "voice_turn_committed",
  "request_id": "UUID",
  "correlation_id": "UUID",
  "voice_session_reference": "HASH",
  "connection_generation": 3,
  "turn_duration_ms": 2400,
  "detection_mode": "HYBRID_VAD",
  "noise_profile": "NORMAL",
  "result": "SUCCESS",
  "error_code": null
}
```

## 24. Spans

- voice.session.request;
- voice.authorization.issue;
- voice.transport.connect;
- voice.audio.input;
- voice.turn.detect;
- voice.turn.commit;
- voice.transcribe;
- voice.intent;
- voice.tool;
- voice.response.generate;
- voice.tts;
- voice.playback;
- voice.interrupt;
- voice.context.sync;
- voice.reconnect;
- voice.security.evaluate.

## 25. Eventos de trace

Dentro de spans:

- speech_started;
- speech_stopped;
- transcript_partial;
- transcript_final;
- tool_proposed;
- tool_completed;
- first_audio;
- playback_started;
- playback_interrupted;
- connection_lost;
- connection_recovered.

## 26. Correlación

Debe propagarse:

- trace context;
- Request ID;
- Correlation ID;
- Session reference;
- VoiceSession reference;
- Turn ID;
- generation;
- provider request reference.

## 27. Relojes

Usar:

- reloj monotónico para duración local;
- UTC para eventos;
- sincronización de reloj;
- tolerancia a clock skew.

No calcular latencia sólo con timestamp del Cliente.

## 28. Sampling

Recolectar al 100%:

- errores críticos;
- seguridad;
- reconexión fallida;
- cross-tenant;
- Tool UNKNOWN;
- provider failover;
- sesiones huérfanas.

Aplicar sampling:

- sesiones exitosas;
- audio chunk traces;
- parciales;
- eventos de alta frecuencia.

## 29. Privacidad

No almacenar:

- audio completo en telemetría;
- transcript completo;
- tokens;
- prompts;
- secretos;
- PII.

Puede almacenarse:

- longitud;
- idioma;
- confianza;
- hash protegido;
- error;
- duración;
- calidad.

## 30. Dashboards

### VOICE EXPERIENCE

- sesiones;
- éxito;
- first audio;
- turn latency;
- interruptions;
- completion.

### VOICE TRANSPORT

- packet loss;
- jitter;
- gaps;
- reconnections;
- buffers;
- transport errors.

### VOICE AI

- transcription;
- TTS;
- intent;
- tools;
- providers;
- costs.

### VOICE SECURITY

- denials;
- replay;
- hijack;
- injection;
- rate limits;
- terminations.

### VOICE RECOVERY

- disconnections;
- attempts;
- success;
- failover;
- degrade to text;
- orphan sessions.

## 31. Alertas

VOICE_PROVIDER_OUTAGE

Aumento de fallos.

VOICE_FIRST_AUDIO_LATENCY_HIGH

VOICE_TRANSCRIPTION_FAILURE_HIGH

VOICE_TTS_FAILURE_HIGH

VOICE_RECONNECTION_FAILURE_HIGH

VOICE_AUDIO_GAPS_HIGH

VOICE_COST_ANOMALY

VOICE_SECURITY_INCIDENT

VOICE_ORPHAN_SESSION_SPIKE

VOICE_TOOL_UNKNOWN_SPIKE

VOICE_DEGRADED_TO_TEXT_SPIKE

## 32. SLO iniciales

Valores de ejemplo sujetos a NFR final:

- autorización p95 < 500 ms;
- conexión p95 < 2 s;
- fin de voz a primer audio p95 < 1.5 s;
- barge-in stop p95 < 250 ms;
- transcript final p95 < 1 s después de commit;
- reconexión p95 < 5 s;
- sesión exitosa > objetivo;
- cross-tenant = 0 tolerado.

## 33. Error budget

Debe considerar:

- sesiones fallidas;
- turnos fallidos;
- transcripción;
- TTS;
- tools;
- reconexión;
- seguridad.

Los fallos por micrófono denegado pueden separarse de fallos del sistema.

## 34. Telemetría de alta frecuencia

Audio chunk events pueden generar volumen elevado.

Políticas:

- agregación;
- sampling;
- histogramas;
- contadores;
- no log por chunk salvo debugging temporal.

## 35. Debugging temporal

Debe requerir:

- autorización;
- ventana;
- tenant;
- redacción;
- expiración;
- registro;
- rollback.

No habilitar audio logging permanente.

## 36. Degradación

Si backend de telemetría falla:

- buffer limitado;
- priorizar seguridad;
- priorizar errores;
- descartar alta frecuencia;
- no bloquear audio;
- alertar cuando se recupere.

## 37. Flujo de señal

1. componente crea señal.
2. valida schema.
3. redacta.
4. agrega correlación.
5. decide sampling.
6. exporta.
7. buffer si falla.
8. alerta si crítico.

## 38. Pseudocódigo

```text
function emit_voice_telemetry(signal):

    validate_voice_telemetry_schema(signal)
    remove_audio_payload(signal)
    redact_transcript_content(signal)
    redact_tokens(signal)
    attach_trace_context(signal)

    if should_sample(signal):
        export(signal)
    elif signal.is_critical:
        export_without_sampling(signal)

    if export_failed and signal.is_critical:
        persist_critical_voice_buffer(signal)
```

## 39. Errores

VOICE_OBS_SCHEMA_INVALID

VOICE_OBS_SENSITIVE_DATA_DETECTED

VOICE_OBS_HIGH_CARDINALITY_DETECTED

VOICE_OBS_EXPORT_FAILED

VOICE_OBS_BUFFER_FULL

VOICE_OBS_TRACE_CONTEXT_INVALID

VOICE_OBS_ALERT_FAILED

VOICE_OBS_CLOCK_SKEW_EXCEEDED

## 40. Eventos

VoiceTelemetryEmitted

VoiceTelemetryDropped

VoiceTelemetryBuffered

VoiceSensitiveTelemetryBlocked

VoiceHighCardinalityDetected

VoiceSLOViolated

VoiceAlertTriggered

VoiceAlertResolved

## 41. Casos límite

- audio chunks masivos;
- backend caído;
- clock skew;
- provider sin usage;
- Session corta;
- Session huérfana;
- reconexión;
- dos providers;
- failover;
- transcript PII;
- error con token;
- debug activado;
- sampling oculta problema;
- alerta duplicada;
- coste anómalo;
- barge-in falso;
- métricas inconsistentes;
- control humano.

## 42. Criterios de aceptación

AC-VOBS-001

Toda VoiceSession es trazable.

AC-VOBS-002

Todo Turn es trazable.

AC-VOBS-003

Se mide latencia extremo a extremo.

AC-VOBS-004

Se mide barge-in.

AC-VOBS-005

Se mide reconexión.

AC-VOBS-006

Se mide calidad acústica disponible.

AC-VOBS-007

Se mide coste.

AC-VOBS-008

No se registra audio.

AC-VOBS-009

No se registra token.

AC-VOBS-010

No se registra transcript completo.

AC-VOBS-011

Las métricas evitan alta cardinalidad.

AC-VOBS-012

Existen dashboards.

AC-VOBS-013

Existen alertas accionables.

AC-VOBS-014

La telemetría crítica no se samplea.

AC-VOBS-015

La caída de observabilidad no bloquea voz.

## 43. Plan mínimo de pruebas

- logs;
- metrics;
- traces;
- correlation;
- latency;
- clocks;
- sampling;
- redaction;
- audio privacy;
- transcript privacy;
- tokens;
- cardinality;
- backend down;
- buffer;
- dashboards;
- alerts;
- SLO;
- cost;
- provider comparison;
- reconnection;
- security;
- failover;
- debug;
- retention.

## 44. Checklist

[ ] Existe correlación.
[ ] Existen métricas de Session.
[ ] Existen métricas de audio.
[ ] Existen métricas de VAD.
[ ] Existen métricas de transcript.
[ ] Existen métricas de TTS.
[ ] Existen métricas de playback.
[ ] Existen métricas de barge-in.
[ ] Existen métricas de tools.
[ ] Existen métricas de reconexión.
[ ] Existen métricas de seguridad.
[ ] Existen métricas de coste.
[ ] Existen trazas.
[ ] Existen dashboards.
[ ] Existen alertas.
[ ] Se controla cardinalidad.
[ ] Se protege audio.
[ ] Se protege transcript.
[ ] Se prueba degradación.
[ ] Se prueba privacidad.

======================================================================
FIN DEL DOCUMENTO
======================================================================
