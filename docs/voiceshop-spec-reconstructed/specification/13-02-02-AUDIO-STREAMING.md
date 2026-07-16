======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-02-02-AUDIO-STREAMING.md

# TRANSPORTE Y STREAMING DE AUDIO

## 1. Objetivo

Este documento define el comportamiento funcional del transporte de
audio entre el Cliente, el canal y el proveedor de voz.

El subsistema debe transportar audio de entrada y salida con:

- secuencia;
- baja latencia;
- control de flujo;
- trazabilidad;
- validación;
- interrupción;
- recuperación;
- límites;
- privacidad.

El transporte no interpreta reglas comerciales.

## 2. Alcance

Incluye:

- captura;
- formatos;
- sample rate;
- canales;
- codificación;
- chunks;
- secuencia;
- timestamps;
- buffers;
- backpressure;
- jitter;
- pérdida;
- duplicados;
- reordenamiento;
- reproducción;
- truncamiento;
- cancelación;
- calidad;
- métricas;
- QA.

No incluye:

- detección semántica;
- intención;
- herramientas;
- pagos;
- pedidos;
- autorización comercial;
- síntesis detallada;
- VAD detallado.

## 3. Principios

RULE-AUDIO-001

Todo stream pertenece a una VoiceSession.

RULE-AUDIO-002

Todo chunk posee secuencia.

RULE-AUDIO-003

Todo chunk posee dirección.

RULE-AUDIO-004

Todo chunk posee formato.

RULE-AUDIO-005

Todo chunk debe respetar tamaño máximo.

RULE-AUDIO-006

Los chunks duplicados no deben duplicar audio.

RULE-AUDIO-007

Los chunks fuera de orden deben reordenarse dentro de límites o
rechazarse.

RULE-AUDIO-008

Los gaps deben detectarse.

RULE-AUDIO-009

El transporte debe soportar backpressure.

RULE-AUDIO-010

La cancelación debe detener audio pendiente.

RULE-AUDIO-011

El audio no debe registrarse indefinidamente.

RULE-AUDIO-012

La pérdida de red no debe generar ejecución duplicada.

RULE-AUDIO-013

El dominio no recibe audio binario.

RULE-AUDIO-014

Los buffers deben liberarse.

RULE-AUDIO-015

El audio de salida debe estar asociado a Response ID.

## 4. Direcciones

INPUT

Cliente → Proveedor/Backend.

OUTPUT

Proveedor/Backend → Cliente.

## 5. Formatos funcionales

Formatos posibles:

- PCM16;
- G711_ULAW;
- G711_ALAW;
- OPUS;
- formato equivalente soportado.

Cada VoiceSession debe acordar:

- encoding;
- sample_rate_hz;
- channels;
- frame_duration_ms;
- endianess cuando aplique;
- max_chunk_bytes.

No convertir silenciosamente sin registrar.

## 6. Contrato de AudioChunk

```json
{
  "audio_chunk_id": "UUID",
  "voice_session_id": "UUID",
  "connection_generation": 2,
  "direction": "INPUT",
  "stream_id": "UUID",
  "sequence_number": 42,
  "timestamp_client": "UTC_TIMESTAMP_OR_NULL",
  "timestamp_server": "UTC_TIMESTAMP",
  "format": {
    "encoding": "PCM16",
    "sample_rate_hz": 24000,
    "channels": 1,
    "frame_duration_ms": 20
  },
  "duration_ms": 100,
  "size_bytes": 4800,
  "payload_reference": "BINARY_STREAM_REFERENCE",
  "checksum": "OPTIONAL_HASH"
}
```

## 7. Secuencia

Cada stream inicia en una secuencia definida.

Reglas:

- monotónica;
- no reutilizable;
- separada por dirección;
- separada por connection generation;
- reinicio explícito.

Estados de chunk:

RECEIVED

VALIDATED

BUFFERED

FORWARDED

PLAYED

DROPPED

REJECTED

## 8. Duplicados

Clave:

voice_session_id
+ connection_generation
+ stream_id
+ sequence_number

Mismo chunk:

- ignorar duplicado;
- devolver ACK equivalente.

Misma secuencia con payload diferente:

- rechazar;
- registrar AUDIO_SEQUENCE_CONFLICT.

## 9. Reordenamiento

Debe existir una ventana.

Ejemplo:

Esperado 42.

Llega 43.

Puede esperar 42 durante reorder_window_ms.

Si 42 no llega:

- marcar gap;
- continuar o detener según política;
- no ocultar pérdida.

## 10. Gaps

Un gap puede:

- degradar transcripción;
- generar ruido;
- afectar confianza;
- exigir reinicio de turno.

Debe emitirse:

AudioGapDetected

Campos:

- expected;
- received;
- missing_count;
- duration_estimate;
- direction.

## 11. Buffer de entrada

Debe contener:

- stream;
- secuencia;
- duración;
- bytes;
- estado;
- turn reference;
- límite.

No debe crecer sin control.

Límites:

- tiempo máximo;
- bytes máximos;
- chunks máximos;
- silencio;
- sesión.

## 12. Buffer de salida

Debe asociarse con:

- Response ID;
- Voice Turn ID;
- audio item;
- sequence;
- playback state;
- cancellation state.

Debe permitir:

- detener;
- truncar;
- saber cuánto se reprodujo;
- descartar lo pendiente.

## 13. Backpressure

Se activa cuando:

- productor supera consumidor;
- red lenta;
- buffer alto;
- proveedor lento;
- navegador suspendido;
- reproducción bloqueada.

Acciones:

- pausar captura;
- reducir ritmo;
- descartar audio no crítico conforme a política;
- cerrar;
- degradar.

No se debe acumular indefinidamente.

## 14. Captura de micrófono

El canal debe:

- solicitar permiso;
- indicar estado;
- capturar formato soportado;
- evitar enviar cuando mute;
- detener al cerrar;
- manejar dispositivo cambiado;
- detectar pérdida de permiso.

El backend no puede asumir que audio significa voz válida.

## 15. Playback

El canal debe:

- reproducir en orden;
- controlar latencia;
- registrar inicio;
- registrar progreso;
- soportar interrupción;
- detener al cambiar de estado;
- evitar mezclar respuestas.

## 16. Played audio

Debe registrarse:

- response_id;
- audio_item_id;
- started_at;
- completed_at;
- played_audio_ms;
- total_audio_ms;
- interrupted;
- interruption_reason.

No se debe asumir reproducción completa por envío completo.

## 17. Interrupción

Cuando el Cliente habla:

1. detectar actividad;
2. cancelar output stream;
3. detener reproducción;
4. registrar played_audio_ms;
5. descartar chunks pendientes;
6. actualizar VoiceSession;
7. abrir nuevo input turn.

## 18. Truncamiento

El truncamiento debe referenciar:

- response_id;
- content_item_id;
- played_audio_ms;
- audio_sequence;
- timestamp.

El contexto debe reflejar sólo lo reproducido cuando sea relevante.

## 19. Transporte

WebRTC:

Preferido cuando:

- baja latencia;
- audio bidireccional;
- NAT;
- jitter control.

WebSocket:

Puede usarse cuando:

- el proveedor lo soporta;
- se requiere control directo;
- el cliente implementa buffering.

La elección no modifica contratos del dominio.

## 20. Seguridad del transporte

Debe usar:

- cifrado;
- autenticación;
- autorización temporal;
- origen permitido;
- expiración;
- rate limit;
- límites;
- validación de formato.

No aceptar audio de una VoiceSession ajena.

## 21. Privacidad

Definir:

- si se almacena audio;
- duración;
- propósito;
- consentimiento;
- acceso;
- eliminación;
- región;
- proveedor.

Por defecto, preferir no persistir audio completo.

Puede conservarse:

- metadatos;
- transcript;
- métricas;
- referencia temporal.

## 22. Flujo de entrada

1. Capturar.
2. codificar.
3. crear chunk.
4. asignar secuencia.
5. transmitir.
6. validar.
7. deduplicar.
8. reordenar.
9. buffer.
10. enviar a proveedor.
11. registrar métricas.
12. liberar.

## 23. Flujo de salida

1. Recibir audio.
2. validar Response ID.
3. validar secuencia.
4. buffer.
5. reproducir.
6. reportar progreso.
7. completar o interrumpir.
8. liberar.

## 24. Pseudocódigo de entrada

```text
function handle_input_audio_chunk(chunk):

    voice_session = load_voice_session(chunk.voice_session_id)

    validate_session_state(voice_session, [READY, LISTENING])
    validate_connection_generation(
        chunk,
        voice_session.connection_generation
    )
    validate_audio_format(chunk.format, voice_session.configuration)
    validate_chunk_size(chunk)
    validate_sequence_key(chunk)

    duplicate = check_duplicate(chunk)

    if duplicate.same_payload:
        return previous_ack(chunk)

    if duplicate.conflict:
        reject(AUDIO_SEQUENCE_CONFLICT)

    reorder_result = reorder_buffer.accept(chunk)

    if reorder_result.gap_detected:
        emit(AudioGapDetected)

    for ordered_chunk in reorder_result.ready_chunks:
        input_buffer.append(ordered_chunk)
        forward_to_voice_provider(ordered_chunk)

    enforce_backpressure(input_buffer)
    return accepted_ack(chunk)
```

## 25. Pseudocódigo de salida

```text
function handle_output_audio_chunk(chunk):

    voice_session = load_voice_session(chunk.voice_session_id)

    validate_state(voice_session, RESPONDING)
    validate_response_id(chunk.response_id)
    validate_sequence(chunk)
    validate_format(chunk)

    output_buffer.append(chunk)
    enforce_output_buffer_limits(output_buffer)

    while output_buffer.has_next_in_order():
        next_chunk = output_buffer.pop_next()
        play(next_chunk)
        report_playback_progress(next_chunk)
```

## 26. Límites

Configurar:

- max_chunk_bytes;
- max_chunk_duration_ms;
- max_buffer_duration_ms;
- max_input_turn_duration_ms;
- max_output_response_duration_ms;
- max_stream_idle_ms;
- max_reorder_window_ms;
- max_gap_count;
- max_concurrent_streams.

## 27. Errores

AUDIO_FORMAT_UNSUPPORTED

AUDIO_CHUNK_TOO_LARGE

AUDIO_DURATION_INVALID

AUDIO_SEQUENCE_INVALID

AUDIO_SEQUENCE_CONFLICT

AUDIO_GAP_DETECTED

AUDIO_REORDER_WINDOW_EXCEEDED

AUDIO_BUFFER_OVERFLOW

AUDIO_BACKPRESSURE_LIMIT

AUDIO_STREAM_NOT_FOUND

AUDIO_STREAM_STATE_INVALID

AUDIO_CONNECTION_GENERATION_STALE

AUDIO_PLAYBACK_FAILED

AUDIO_CAPTURE_PERMISSION_DENIED

AUDIO_DEVICE_UNAVAILABLE

AUDIO_TRANSPORT_FAILED

## 28. Eventos

AudioStreamStarted

AudioChunkReceived

AudioChunkAccepted

AudioChunkRejected

AudioDuplicateDetected

AudioGapDetected

AudioBufferHighWatermark

AudioBackpressureActivated

AudioPlaybackStarted

AudioPlaybackProgress

AudioPlaybackCompleted

AudioPlaybackInterrupted

AudioStreamEnded

## 29. Observabilidad

Métricas:

- audio_chunks_received_total;
- audio_chunks_sent_total;
- audio_chunks_dropped_total;
- audio_duplicates_total;
- audio_gaps_total;
- audio_reordered_total;
- audio_buffer_duration_ms;
- audio_buffer_overflow_total;
- audio_backpressure_total;
- audio_input_bytes_total;
- audio_output_bytes_total;
- audio_playback_duration_seconds;
- audio_capture_failure_total;
- audio_transport_latency_seconds.

Dimensiones:

- direction;
- encoding;
- transport;
- provider_class;
- result;
- error_code.

## 30. Auditoría

Registrar:

- VoiceSession ID;
- stream_id;
- dirección;
- formato;
- duración;
- bytes;
- gaps;
- interrupción;
- razón;
- Correlation ID.

No registrar payload de audio en logs generales.

## 31. Casos límite

- chunk duplicado;
- misma secuencia distinto payload;
- chunk atrasado;
- gap;
- reorder;
- buffer overflow;
- navegador lento;
- pestaña en background;
- micrófono cambiado;
- permiso revocado;
- output llega tarde;
- respuesta cancelada;
- reconexión;
- generation vieja;
- formato incorrecto;
- sample rate distinto;
- audio vacío;
- duración negativa;
- clock skew;
- dos streams;
- replay.

## 32. Criterios de aceptación

AC-AUDIO-001

Todo chunk tiene ID.

AC-AUDIO-002

Todo chunk tiene secuencia.

AC-AUDIO-003

Todo chunk tiene dirección.

AC-AUDIO-004

Todo chunk tiene formato.

AC-AUDIO-005

Los duplicados no duplican audio.

AC-AUDIO-006

Los conflictos se rechazan.

AC-AUDIO-007

Los gaps se detectan.

AC-AUDIO-008

El reordenamiento es limitado.

AC-AUDIO-009

Existe backpressure.

AC-AUDIO-010

Los buffers se limitan.

AC-AUDIO-011

La reproducción registra progreso.

AC-AUDIO-012

La interrupción detiene pendiente.

AC-AUDIO-013

Generation antigua se rechaza.

AC-AUDIO-014

El audio no entra al dominio.

AC-AUDIO-015

La privacidad está documentada.

## 33. Plan mínimo de pruebas

- formato;
- tamaño;
- duración;
- secuencia;
- duplicado;
- conflicto;
- gap;
- reorder;
- overflow;
- backpressure;
- captura;
- permiso;
- playback;
- interrupción;
- truncamiento;
- reconexión;
- generation;
- transporte;
- cifrado;
- privacidad;
- métricas;
- auditoría;
- carga;
- red lenta;
- dispositivo.

## 34. Checklist

[ ] Existe stream_id.
[ ] Existe sequence_number.
[ ] Existe connection_generation.
[ ] Existe formato.
[ ] Existe dirección.
[ ] Existe tamaño.
[ ] Existe duración.
[ ] Se valida duplicado.
[ ] Se valida conflicto.
[ ] Se detecta gap.
[ ] Se reordena.
[ ] Se limita buffer.
[ ] Existe backpressure.
[ ] Se controla playback.
[ ] Se controla interrupción.
[ ] Se libera buffer.
[ ] Se protege audio.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
