======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-02-05-SPEECH-SYNTHESIS.md

# SÍNTESIS DE VOZ

## 1. Objetivo

Este documento define cómo VoiceShop transforma una respuesta textual
validada en audio reproducible, claro, seguro y adecuado para el canal.

La síntesis de voz no genera hechos.

La síntesis no modifica el contenido comercial.

La síntesis no ejecuta herramientas.

## 2. Alcance

Incluye:

- selección de voz;
- idioma;
- pronunciación;
- números;
- monedas;
- fechas;
- nombres;
- ritmo;
- pausas;
- streaming;
- buffering;
- cancelación;
- interrupción;
- duración;
- fallback;
- privacidad;
- QA.

No incluye:

- generación factual;
- tool calling;
- autorización;
- intent detection;
- transcripción;
- pago;
- pedido.

## 3. Principios

RULE-TTS-001

Toda síntesis parte de una respuesta validada.

RULE-TTS-002

La síntesis no puede alterar hechos.

RULE-TTS-003

La síntesis debe preservar cantidades.

RULE-TTS-004

La síntesis debe preservar moneda.

RULE-TTS-005

La síntesis debe preservar negaciones.

RULE-TTS-006

La voz debe ser adecuada al idioma.

RULE-TTS-007

Las confirmaciones deben pronunciarse claramente.

RULE-TTS-008

La reproducción debe poder interrumpirse.

RULE-TTS-009

El audio debe asociarse con Response ID.

RULE-TTS-010

Toda síntesis debe poseer Voice Response ID.

RULE-TTS-011

El audio tardío no debe reproducirse.

RULE-TTS-012

La salida debe respetar privacidad.

RULE-TTS-013

Los nombres oficiales no deben deformarse deliberadamente.

RULE-TTS-014

La duración debe limitarse.

RULE-TTS-015

Debe existir fallback a texto.

## 4. Estados

REQUESTED

PREPARING

STREAMING

READY_TO_PLAY

PLAYING

INTERRUPTING

COMPLETED

CANCELLED

FAILED

EXPIRED

Estados terminales:

COMPLETED
CANCELLED
FAILED
EXPIRED

## 5. Contrato de VoiceResponse

```json
{
  "voice_response_id": "UUID",
  "response_id": "UUID",
  "voice_session_id": "UUID",
  "voice_turn_id": "UUID",
  "state": "STREAMING",
  "text_reference": "UUID",
  "language": "es-CL",
  "voice_profile": "DEFAULT",
  "speech_profile": {
    "rate": "NORMAL",
    "pitch": "NORMAL",
    "style": "CORDIAL",
    "volume": "NORMAL"
  },
  "audio_format": {
    "encoding": "PCM16",
    "sample_rate_hz": 24000,
    "channels": 1
  },
  "total_audio_ms": null,
  "played_audio_ms": 0,
  "version": 2
}
```

## 6. Entrada

Debe contener:

- Response ID;
- texto validado;
- idioma;
- canal;
- voice profile;
- pronunciación;
- prioridad;
- interruption policy;
- timeout;
- Correlation ID.

## 7. Preparación de texto

La respuesta puede adaptarse para habla.

Ejemplo textual:

"Agregué 6 Lager Norte 330 ml. Total: $7.200 CLP."

Versión hablada:

"Agregué seis Lager Norte de trescientos treinta mililitros. El total del carrito es siete mil doscientos pesos chilenos."

La adaptación debe preservar facts.

## 8. Números

Pronunciar según contexto:

- cantidad;
- precio;
- teléfono;
- Order ID;
- fecha;
- hora;
- tamaño.

No pronunciar Order ID como cantidad si debe leerse dígito por dígito.

## 9. Monedas

Ejemplos:

7200 CLP

" siete mil doscientos pesos chilenos "

La pronunciación no cambia moneda.

## 10. Fechas y horas

Debe usar zona horaria y formato comprensible.

"17 de julio de 2026 a las 18:00"

Puede hablarse:

"diecisiete de julio de dos mil veintiséis, a las seis de la tarde"

## 11. Nombres de producto

Puede existir diccionario de pronunciación.

Debe estar:

- versionado;
- por tenant;
- revisado;
- sin cambiar nombre oficial.

## 12. Abreviaturas

Ejemplos:

- CLP;
- ml;
- kg;
- URL;
- SKU.

La expansión debe depender de contexto.

## 13. Pausas

Usar pausas para:

- listas;
- confirmaciones;
- precios;
- advertencias;
- alternativas.

No usar pausas excesivas que aumenten latencia.

## 14. Longitud

La respuesta hablada debe ser breve.

Si es extensa:

- resumir;
- ofrecer detalles por texto;
- dividir en turnos;
- preguntar si desea continuar.

No recitar listas largas.

## 15. Confirmaciones críticas

Debe:

- repetir operación;
- producto;
- cantidad;
- total;
- entrega;
- método;
- pregunta explícita.

Ejemplo:

"Vas a confirmar un pedido de seis botellas por siete mil doscientos pesos. ¿Confirmas?"

## 16. Streaming

La síntesis puede producir audio incremental.

Reglas:

- no reproducir antes de validar texto;
- asociar chunks a Voice Response ID;
- secuencia;
- permitir cancelación;
- no mezclar respuestas;
- validar generation.

## 17. Buffering

Debe equilibrar:

- latencia;
- continuidad;
- jitter;
- memoria.

Parámetros:

- startup_buffer_ms;
- max_buffer_ms;
- low_watermark;
- high_watermark.

## 18. Reproducción

Estados:

READY_TO_PLAY → PLAYING

Debe registrar:

- started_at;
- played_audio_ms;
- completed_at;
- interrupted.

## 19. Interrupción

Cuando Cliente habla:

1. cancelar síntesis si continúa;
2. detener playback;
3. registrar played_audio_ms;
4. descartar audio pendiente;
5. emitir SpeechPlaybackInterrupted;
6. iniciar nuevo turno.

## 20. Cancelación

Causas:

- barge-in;
- cierre;
- cambio de canal;
- respuesta obsoleta;
- control humano;
- Session cerrada;
- nueva respuesta;
- timeout.

## 21. Audio tardío

Si Voice Response está CANCELLED o EXPIRED:

- no reproducir;
- descartar;
- registrar late audio.

## 22. Fallback

Si TTS falla:

1. reintento limitado;
2. proveedor alternativo;
3. voz local autorizada;
4. entregar texto;
5. informar.

No bloquear operación comercial ya completada.

## 23. Seguridad

- texto ya validado;
- no aceptar markup arbitrario;
- no ejecutar SSML no confiable;
- whitelist de tags;
- no incluir secretos;
- limitar longitud;
- validar idioma;
- validar tenant.

## 24. SSML o markup

Si se usa:

- generado por sistema;
- validado;
- tags permitidos;
- sin URLs;
- sin audio externo;
- sin instrucciones arbitrarias.

## 25. Privacidad

El texto puede contener PII.

Debe:

- minimizar;
- usar proveedor aprobado;
- respetar región;
- retención;
- no registrar audio completo por defecto.

## 26. Flujo principal

1. Recibir Response validada.
2. construir spoken text.
3. validar facts.
4. validar idioma.
5. aplicar pronunciación.
6. seleccionar voz.
7. solicitar TTS.
8. recibir chunks.
9. validar secuencia.
10. buffer.
11. reproducir.
12. registrar progreso.
13. completar o interrumpir.
14. liberar.

## 27. Pseudocódigo

```text
function synthesize_response(response, voice_context):

    validate_response_status(response)
    validate_voice_session(voice_context.voice_session)
    validate_language(response.language)

    spoken_text = build_spoken_text(response)
    validate_fact_equivalence(response.text, spoken_text)

    voice_profile = select_voice_profile(
        tenant=voice_context.tenant_id,
        language=response.language
    )

    voice_response = create_voice_response(
        response_id=response.id,
        voice_profile=voice_profile,
        state=REQUESTED
    )

    transition(voice_response, PREPARING)

    stream = request_tts_stream(
        spoken_text,
        voice_profile,
        voice_context.audio_format
    )

    transition(voice_response, STREAMING)

    for chunk in stream:
        validate_audio_chunk(chunk)
        buffer_and_play(chunk)

    transition(voice_response, COMPLETED)
    persist(voice_response)
    emit(SpeechSynthesisCompleted)

    return voice_response
```

## 28. Errores

TTS_RESPONSE_INVALID

TTS_LANGUAGE_UNSUPPORTED

TTS_VOICE_PROFILE_INVALID

TTS_PROVIDER_UNAVAILABLE

TTS_PROVIDER_TIMEOUT

TTS_STREAM_FAILED

TTS_AUDIO_FORMAT_INVALID

TTS_FACT_MISMATCH

TTS_MARKUP_INVALID

TTS_CANCELLED

TTS_LATE_AUDIO

TTS_PLAYBACK_FAILED

TTS_PRIVACY_POLICY_DENIED

## 29. Eventos

SpeechSynthesisRequested

SpeechSynthesisStarted

SpeechAudioChunkGenerated

SpeechPlaybackStarted

SpeechPlaybackProgress

SpeechPlaybackCompleted

SpeechPlaybackInterrupted

SpeechSynthesisCancelled

SpeechSynthesisFailed

LateSpeechAudioReceived

## 30. Observabilidad

Métricas:

- tts_requests_total;
- tts_success_total;
- tts_failure_total;
- tts_first_audio_seconds;
- tts_total_duration_seconds;
- tts_audio_duration_seconds;
- tts_interruptions_total;
- tts_cancellations_total;
- tts_fallback_total;
- tts_late_audio_total;
- tts_playback_failure_total.

Dimensiones:

- provider_class;
- voice_profile;
- language;
- channel;
- result;
- error_code.

## 31. Auditoría

Registrar:

- Voice Response ID;
- Response ID;
- VoiceSession ID;
- idioma;
- voice profile;
- duración;
- interrupción;
- fallback;
- error;
- Correlation ID.

No registrar audio en logs generales.

## 32. Casos límite

- texto vacío;
- respuesta demasiado larga;
- precio;
- moneda;
- número;
- Order ID;
- marca;
- abreviatura;
- idioma mixto;
- voz inexistente;
- proveedor caído;
- stream tardío;
- barge-in;
- cierre;
- control humano;
- PII;
- SSML malicioso;
- playback falla;
- buffer;
- reconexión;
- generation antigua.

## 33. Criterios de aceptación

AC-TTS-001

Toda síntesis tiene Voice Response ID.

AC-TTS-002

Toda síntesis pertenece a Response ID.

AC-TTS-003

El texto está validado.

AC-TTS-004

Los hechos se preservan.

AC-TTS-005

Los números se pronuncian correctamente.

AC-TTS-006

La moneda se preserva.

AC-TTS-007

Las confirmaciones son claras.

AC-TTS-008

La reproducción es interrumpible.

AC-TTS-009

El audio tardío no se reproduce.

AC-TTS-010

Existe fallback a texto.

AC-TTS-011

La longitud se limita.

AC-TTS-012

El markup se valida.

AC-TTS-013

La privacidad se respeta.

AC-TTS-014

Los buffers se liberan.

AC-TTS-015

Todo estado es trazable.

## 34. Plan mínimo de pruebas

- texto;
- facts;
- precios;
- moneda;
- fechas;
- horas;
- IDs;
- marcas;
- idioma;
- voz;
- streaming;
- buffer;
- interruption;
- cancel;
- late;
- fallback;
- SSML;
- PII;
- provider;
- playback;
- metrics;
- audit;
- load;
- privacy.

## 35. Checklist

[ ] Existe Voice Response ID.
[ ] Existe Response ID.
[ ] Existe VoiceSession ID.
[ ] Existe idioma.
[ ] Existe voz.
[ ] Existe formato.
[ ] Existe spoken text.
[ ] Se validan facts.
[ ] Se validan números.
[ ] Se valida moneda.
[ ] Se controla longitud.
[ ] Se controla streaming.
[ ] Se controla buffer.
[ ] Se controla interrupción.
[ ] Se controla cancelación.
[ ] Se controla audio tardío.
[ ] Existe fallback.
[ ] Se protege PII.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
