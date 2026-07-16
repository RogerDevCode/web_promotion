======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-02-04-TRANSCRIPTION.md

# TRANSCRIPCIÓN DE VOZ

## 1. Objetivo

Este documento define cómo VoiceShop convierte un turno de audio en texto
y metadatos estructurados aptos para el motor conversacional.

La transcripción es una representación del audio.

No es una verdad absoluta.

No ejecuta acciones.

No confirma pedidos.

No reemplaza la validación del dominio.

## 2. Alcance

Incluye:

- transcripción parcial;
- transcripción final;
- confianza;
- timestamps;
- diarización cuando aplique;
- idioma;
- detección de idioma;
- normalización;
- nombres;
- marcas;
- números;
- moneda;
- unidades;
- ruido;
- autocorrecciones;
- privacidad;
- QA.

No incluye:

- intent detection;
- entity resolution final;
- tool calling;
- síntesis;
- autorización;
- reglas comerciales.

## 3. Principios

RULE-TRX-001

Toda transcripción pertenece a Voice Turn ID.

RULE-TRX-002

Toda transcripción debe indicar si es parcial o final.

RULE-TRX-003

Sólo una transcripción final puede pasar al procesamiento comercial.

RULE-TRX-004

La confianza debe conservarse cuando exista.

RULE-TRX-005

La baja confianza debe propagarse.

RULE-TRX-006

La transcripción no debe inventar Product ID.

RULE-TRX-007

La transcripción no debe convertir silencio en confirmación.

RULE-TRX-008

La transcripción debe conservar autocorrecciones relevantes.

RULE-TRX-009

La transcripción debe estar versionada.

RULE-TRX-010

La transcripción debe respetar idioma y locale.

RULE-TRX-011

Los números críticos deben validarse.

RULE-TRX-012

Los nombres de productos deben resolverse oficialmente.

RULE-TRX-013

Una transcripción tardía no debe ejecutar turnos terminales.

RULE-TRX-014

La privacidad del audio y texto debe estar definida.

RULE-TRX-015

El sistema debe poder pedir repetición.

## 4. Estados

REQUESTED

STREAMING_PARTIALS

FINALIZING

FINAL

LOW_CONFIDENCE

REJECTED

FAILED

CANCELLED

EXPIRED

Estados terminales:

FINAL
LOW_CONFIDENCE
REJECTED
FAILED
CANCELLED
EXPIRED

LOW_CONFIDENCE puede contener texto final, pero exige política especial.

## 5. Contrato de Transcript

```json
{
  "transcript_id": "UUID",
  "voice_turn_id": "UUID",
  "voice_session_id": "UUID",
  "session_id": "UUID",
  "provider_reference": "PROVIDER_TRANSCRIPT_ID",
  "transcription_version": 1,
  "language": "es-CL",
  "language_confidence": 0.99,
  "is_final": true,
  "text": "agrega seis lager norte",
  "segments": [
    {
      "segment_id": "UUID",
      "start_ms": 0,
      "end_ms": 1800,
      "text": "agrega seis lager norte",
      "confidence": 0.94
    }
  ],
  "words": [],
  "overall_confidence": 0.94,
  "quality_signals": {
    "noise": "NORMAL",
    "audio_gap": false,
    "truncated": false
  },
  "created_at": "UTC_TIMESTAMP"
}
```

## 6. Parciales

Los parciales pueden usarse para:

- mostrar texto provisional;
- anticipar interfaz;
- detectar barge-in;
- preparar contexto.

No pueden:

- ejecutar herramienta;
- confirmar acción;
- modificar dominio;
- cerrar intención.

Los parciales pueden cambiar.

## 7. Final

Una transcripción final debe:

- pertenecer a turno COMMITTED;
- incluir texto;
- incluir idioma;
- incluir calidad;
- indicar si fue truncada;
- persistirse;
- emitir SpeechRecognized;
- enviarse a normalización.

## 8. Confianza

Niveles:

HIGH

MEDIUM

LOW

UNKNOWN

La confianza debe calibrarse.

No confiar únicamente en valor bruto del proveedor.

## 9. Política por riesgo

READ_LOW_RISK

Puede continuar con confianza media.

WRITE_MEDIUM_RISK

Requiere confianza alta o aclaración.

HIGH_RISK

Requiere confirmación explícita, incluso con confianza alta.

CRITICAL

Puede requerir texto firmado, botón o intervención humana.

## 10. Números

Casos críticos:

- cantidades;
- precios mencionados;
- Order ID;
- teléfono;
- dirección;
- hora;
- fecha.

Ejemplos de confusión:

- seis / diez;
- quince / cincuenta;
- dos / doce;
- mil / diez mil.

Para acciones sensibles:

- repetir número;
- mostrar texto;
- pedir confirmación;
- usar botón.

## 11. Marcas y productos

Las marcas pueden tener:

- nombres extranjeros;
- pronunciación local;
- abreviaturas;
- homófonos;
- números.

La transcripción debe conservar surface.

La resolución se realiza contra catálogo.

## 12. Idioma

Puede configurarse:

FIXED

Idioma de sesión.

AUTO_DETECT

Detecta.

HYBRID

Usa hint y detección.

El cambio de idioma debe registrarse.

No cambiar silenciosamente si afecta números o nombres.

## 13. Acento y variante

Debe probarse para:

- español chileno;
- velocidad;
- modismos;
- pronunciación;
- mezcla de idiomas;
- marcas.

La variante no cambia reglas.

## 14. Puntuación

La puntuación automática es auxiliar.

No debe usarse como única evidencia de intención.

## 15. Autocorrecciones

Ejemplo:

"quiero seis, no, cuatro"

La transcripción debe conservar:

- "seis";
- "no";
- "cuatro".

No debe simplificar a seis.

## 16. Ruido y gaps

Si existe:

- gap;
- clipping;
- baja señal;
- eco;
- superposición;
- truncamiento;

debe indicarse.

## 17. Transcripción vacía

Puede ocurrir por:

- silencio;
- ruido;
- idioma;
- fallo;
- turno demasiado corto.

Resultado:

- no ejecutar;
- pedir repetición;
- ajustar VAD;
- degradar.

## 18. Múltiples hablantes

Si el canal lo permite:

- detectar diarización;
- identificar hablante principal;
- no mezclar instrucciones;
- pedir aclaración.

Para comercio dirigido a un Cliente, la identidad del hablante debe
tratarse con cuidado.

## 19. Transcripción tardía

Si Turn está CANCELLED, EXPIRED o Session cerrada:

- no procesar comercialmente;
- registrar late transcript;
- conservar según política.

## 20. Privacidad

Debe definir:

- almacenamiento;
- retención;
- acceso;
- cifrado;
- proveedor;
- región;
- eliminación.

La transcripción puede contener PII.

Debe clasificarse.

## 21. Normalización posterior

La transcripción final pasa a:

13-01-02-NORMALIZATION.md

Debe conservar:

- original transcript;
- normalized transcript;
- confidence;
- quality signals.

## 22. Flujo principal

1. Recibir Turn committed.
2. enviar audio.
3. recibir parciales.
4. mostrar provisional si permitido.
5. recibir final.
6. validar Turn ID.
7. validar Session.
8. validar generation.
9. validar idioma.
10. evaluar confianza.
11. clasificar calidad.
12. persistir.
13. emitir evento.
14. enviar a normalización.

## 23. Pseudocódigo

```text
function finalize_transcript(provider_result, voice_turn):

    validate_turn_state(voice_turn, COMMITTED)
    validate_provider_reference(provider_result)
    validate_connection_generation(provider_result)

    transcript = normalize_provider_transcript(provider_result)

    validate_language(transcript)
    validate_non_empty_or_classify(transcript)
    confidence_band = calibrate_confidence(
        transcript,
        voice_turn.quality_signals
    )

    if transcript.truncated:
        transcript.status = LOW_CONFIDENCE

    if confidence_band == LOW:
        transcript.status = LOW_CONFIDENCE
    else:
        transcript.status = FINAL

    persist_transcript(transcript)
    emit(SpeechRecognized)

    return transcript
```

## 24. Errores

TRANSCRIPT_NOT_FOUND

TRANSCRIPT_TURN_INVALID

TRANSCRIPT_SESSION_INVALID

TRANSCRIPT_CONNECTION_GENERATION_STALE

TRANSCRIPT_EMPTY

TRANSCRIPT_LANGUAGE_UNSUPPORTED

TRANSCRIPT_LOW_CONFIDENCE

TRANSCRIPT_TRUNCATED

TRANSCRIPT_PROVIDER_UNAVAILABLE

TRANSCRIPT_PROVIDER_TIMEOUT

TRANSCRIPT_SCHEMA_INVALID

TRANSCRIPT_LATE

TRANSCRIPT_STORAGE_FAILED

## 25. Eventos

TranscriptionStarted

PartialTranscriptReceived

FinalTranscriptReceived

TranscriptLowConfidence

TranscriptEmpty

TranscriptTruncated

TranscriptLanguageDetected

TranscriptLanguageChanged

LateTranscriptReceived

TranscriptionFailed

## 26. Observabilidad

Métricas:

- transcription_requests_total;
- transcription_success_total;
- transcription_failure_total;
- transcription_low_confidence_total;
- transcription_empty_total;
- transcription_latency_seconds;
- transcript_length_chars;
- transcript_language_total;
- transcript_truncated_total;
- partial_transcripts_total;
- late_transcripts_total.

Dimensiones:

- provider_class;
- language;
- confidence_band;
- noise_profile;
- result;
- error_code.

## 27. Auditoría

Registrar:

- Transcript ID;
- Turn ID;
- VoiceSession ID;
- idioma;
- confianza;
- calidad;
- final/parcial;
- truncamiento;
- proveedor lógico;
- Correlation ID.

No registrar texto completo en logs generales.

## 28. Casos límite

- silencio;
- tos;
- ruido;
- acento;
- marca;
- número;
- dos hablantes;
- idioma mixto;
- parcial tardío;
- final duplicado;
- final diferente;
- Turn cancelado;
- Session cerrada;
- gap;
- truncamiento;
- autocorrección;
- baja confianza;
- proveedor timeout;
- texto ofensivo;
- PII;
- nombres propios.

## 29. Criterios de aceptación

AC-TRX-001

Toda transcripción tiene ID.

AC-TRX-002

Toda transcripción pertenece a Turn.

AC-TRX-003

Se distingue parcial/final.

AC-TRX-004

Sólo final pasa a negocio.

AC-TRX-005

La confianza se conserva.

AC-TRX-006

La baja confianza se propaga.

AC-TRX-007

Los números críticos se confirman.

AC-TRX-008

Los productos se resuelven.

AC-TRX-009

La autocorrección se conserva.

AC-TRX-010

Los gaps se indican.

AC-TRX-011

Los eventos tardíos no ejecutan.

AC-TRX-012

La privacidad está definida.

AC-TRX-013

El idioma se valida.

AC-TRX-014

El texto pasa a normalización.

AC-TRX-015

Existe fallback.

## 30. Plan mínimo de pruebas

- parcial;
- final;
- vacío;
- confianza;
- idioma;
- acento;
- números;
- marcas;
- ruido;
- gap;
- truncamiento;
- autocorrección;
- dos hablantes;
- late;
- duplicate;
- timeout;
- privacidad;
- PII;
- normalización;
- metrics;
- audit;
- provider fallback.

## 31. Checklist

[ ] Existe Transcript ID.
[ ] Existe Turn ID.
[ ] Existe Session ID.
[ ] Existe idioma.
[ ] Existe final/parcial.
[ ] Existe confianza.
[ ] Existen quality signals.
[ ] Se conserva texto original.
[ ] Se controla duplicado.
[ ] Se controla late.
[ ] Se controla truncamiento.
[ ] Se controla idioma.
[ ] Se controla número.
[ ] Se controla producto.
[ ] Se persiste.
[ ] Se emiten eventos.
[ ] Se protege PII.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
