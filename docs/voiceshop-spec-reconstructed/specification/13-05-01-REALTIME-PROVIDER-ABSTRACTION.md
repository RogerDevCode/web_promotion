======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-05-01-REALTIME-PROVIDER-ABSTRACTION.md

# ABSTRACCIÓN DEL PROVEEDOR REALTIME

## 1. Objetivo

Este documento define una interfaz funcional independiente del proveedor
para sesiones de voz Realtime.

La abstracción debe permitir cambiar entre proveedores sin modificar:

- reglas comerciales;
- estado de Session;
- herramientas;
- confirmaciones;
- catálogo;
- inventario;
- pedidos;
- seguridad;
- observabilidad.

Los nombres concretos de eventos del proveedor se traducen a eventos
internos estables.

## 2. Alcance

Incluye:

- creación de sesión;
- autorización efímera;
- transporte;
- audio input;
- audio output;
- turn detection;
- transcripción;
- síntesis;
- interrupción;
- Tool Proposal;
- cierre;
- reconexión;
- errores;
- capacidades;
- versiones;
- observabilidad;
- QA.

No incluye:

- reglas de negocio;
- ejecución de herramientas;
- API Key en navegador;
- persistencia específica;
- implementación de SDK.

## 3. Principios

RULE-RPA-001

VoiceShop depende de RealtimeProviderPort.

RULE-RPA-002

Los eventos propietarios se normalizan.

RULE-RPA-003

Las herramientas no se ejecutan en el adaptador.

RULE-RPA-004

La autorización efímera se genera en backend.

RULE-RPA-005

Toda sesión posee Provider Session Reference opaca.

RULE-RPA-006

Toda conexión posee generation.

RULE-RPA-007

Todo stream posee sequence.

RULE-RPA-008

La cancelación debe ser soportada o emulada de forma segura.

RULE-RPA-009

Las capacidades deben descubrirse.

RULE-RPA-010

Los errores deben mapearse.

RULE-RPA-011

El proveedor no conserva la única memoria.

RULE-RPA-012

El adaptador no modifica aggregates comerciales.

RULE-RPA-013

La configuración debe estar versionada.

RULE-RPA-014

El failover debe reconstruir contexto mínimo.

RULE-RPA-015

Toda operación debe ser trazable.

## 4. RealtimeProviderPort

Operaciones conceptuales:

- get_capabilities;
- issue_ephemeral_authorization;
- create_realtime_session;
- connect;
- update_session_configuration;
- append_input_audio;
- commit_input_audio;
- cancel_input_audio;
- request_response;
- cancel_response;
- truncate_output;
- close_session;
- query_session_status;
- collect_usage.

## 5. Capabilities

```json
{
  "provider_class": "REALTIME_VOICE",
  "provider_id": "PROVIDER-A",
  "adapter_version": "1.0.0",
  "capabilities": {
    "webrtc": true,
    "websocket": true,
    "server_vad": true,
    "client_vad_signals": true,
    "input_audio_formats": [
      "PCM16"
    ],
    "output_audio_formats": [
      "PCM16"
    ],
    "partial_transcripts": true,
    "audio_output_streaming": true,
    "response_cancellation": true,
    "output_truncation": true,
    "tool_proposals": true,
    "session_resume": false
  },
  "limits": {
    "maximum_session_seconds": 3600,
    "maximum_audio_chunk_bytes": 65536,
    "maximum_tools": 32
  }
}
```

## 6. Capability negotiation

Antes de conectar:

1. cargar política de VoiceShop;
2. obtener capacidades;
3. intersectar;
4. seleccionar transporte;
5. seleccionar audio format;
6. seleccionar turn detection;
7. validar herramientas;
8. construir configuración.

## 7. Session configuration interna

```json
{
  "voice_session_id": "UUID",
  "connection_generation": 1,
  "language": "es-CL",
  "input_audio_format": "PCM16",
  "output_audio_format": "PCM16",
  "turn_detection": {
    "mode": "SERVER_VAD",
    "parameters": {
      "minimum_silence_ms": 500
    }
  },
  "voice_profile": "DEFAULT",
  "tool_exposure_policy": "PROPOSALS_ONLY",
  "instruction_policy_version": 7
}
```

## 8. Configuración del proveedor

El adaptador traduce la configuración interna.

No debe permitir que campos propietarios entren al dominio.

## 9. Autorización efímera

Entrada:

- VoiceSession ID;
- tenant;
- actor reference;
- generation;
- capabilities;
- scopes;
- expiry.

Salida:

- material temporal público;
- expiration;
- provider reference;
- restrictions.

No devuelve API Key permanente.

## 10. Creación de sesión

Debe producir:

- Provider Session Reference;
- negotiated configuration;
- expires_at;
- connection metadata;
- usage policy.

## 11. Eventos internos normalizados

RealtimeSessionCreated

RealtimeConnectionReady

InputAudioAccepted

SpeechStartDetected

SpeechEndDetected

InputAudioCommitted

PartialTranscriptReceived

FinalTranscriptReceived

ToolProposalReceived

ResponseStarted

OutputAudioChunkReceived

ResponseCompleted

ResponseCancelled

OutputTruncated

RealtimeDisconnected

RealtimeErrorReceived

RealtimeUsageUpdated

## 12. Event envelope

```json
{
  "provider_event_id": "OPAQUE",
  "internal_event_id": "UUID",
  "provider_id": "PROVIDER-A",
  "voice_session_id": "UUID",
  "connection_generation": 2,
  "event_type": "FinalTranscriptReceived",
  "sequence_number": 184,
  "occurred_at_provider": "UTC_TIMESTAMP_OR_NULL",
  "received_at": "UTC_TIMESTAMP",
  "payload": {}
}
```

## 13. Validación de eventos

- event ID;
- session reference;
- generation;
- type;
- schema;
- sequence;
- timestamp;
- size;
- tenant binding;
- replay.

## 14. Eventos duplicados

Deduplicar por:

provider_id
+ provider_session_reference
+ provider_event_id

o key equivalente.

Un duplicado no repite efecto.

## 15. Eventos fuera de orden

Usar:

- sequence;
- generation;
- internal state;
- reorder window.

Un evento viejo no reactiva una respuesta.

## 16. Audio input

El port recibe chunks internos.

El adaptador:

- valida formato;
- convierte sólo si política;
- conserva sequence;
- aplica encoding;
- transmite;
- mapea ACK/errors.

## 17. Commit input

Debe incluir:

- Voice Turn ID;
- final sequence;
- duration;
- idempotency;
- generation.

## 18. Transcripción

El adaptador produce:

- partial/final;
- text;
- language;
- confidence cuando exista;
- segments;
- provider metadata protegida.

No inventa confianza si el proveedor no la entrega.

## 19. Tool Proposal

El adaptador normaliza:

- tool name;
- arguments;
- proposal reference;
- response reference.

Luego entrega a Voice Tool Validator.

No ejecuta.

## 20. Response request

Entrada interna:

- Response ID;
- validated context;
- response modality;
- voice profile;
- interruption policy;
- tools visible;
- limits.

## 21. Output audio

Debe producir chunks internos con:

- Voice Response ID;
- sequence;
- format;
- duration;
- provider item reference;
- generation.

## 22. Cancel response

Debe ser idempotente.

Si el proveedor no ofrece cancelación:

- detener playback local;
- ignorar chunks;
- cerrar/recrear response context;
- marcar limitación.

## 23. Truncation

Si está soportada:

- mapear played_audio_ms;
- provider item;
- content index;
- generation.

Si no:

- mantener delivery state interno;
- no asumir que el proveedor conoce truncamiento.

## 24. Cierre

Debe:

- cerrar transporte;
- invalidar material temporal;
- cancelar respuestas;
- liberar callbacks;
- reportar usage;
- marcar provider session closed.

## 25. Reconexión

El port debe informar si soporta:

- resume;
- reconnect;
- new session required.

VoiceShop siempre conserva Recovery Plan propio.

## 26. Provider context

Puede incluir:

- instrucciones;
- mensajes recientes;
- response items.

Debe minimizarse.

No enviar historial completo innecesario.

## 27. Tool schemas

El adaptador puede exponer esquemas mínimos.

Debe limitar:

- número;
- tamaño;
- herramientas visibles;
- argumentos.

Los schemas no incluyen credenciales ni permisos.

## 28. Error mapping

Ejemplos propietarios deben mapearse a:

REALTIME_AUTHENTICATION_FAILED

REALTIME_AUTHORIZATION_FAILED

REALTIME_RATE_LIMITED

REALTIME_SESSION_EXPIRED

REALTIME_AUDIO_FORMAT_INVALID

REALTIME_PROTOCOL_ERROR

REALTIME_PROVIDER_TIMEOUT

REALTIME_PROVIDER_UNAVAILABLE

REALTIME_RESPONSE_CANCEL_FAILED

REALTIME_RESULT_UNKNOWN

## 29. Retry policy

Lecturas de capacidades:

Reintentables.

Crear sesión:

Puede ser idempotente.

Enviar audio:

Depende de sequence y ACK.

Commit:

Idempotente por Turn ID.

Cancel:

Idempotente.

Tool execution:

No ocurre en proveedor.

## 30. Usage

El adaptador debe mapear:

- input audio duration;
- output audio duration;
- input tokens;
- output tokens;
- cached tokens;
- requests;
- provider-specific billable units.

## 31. Provider selection

Debe considerar:

- health;
- locale;
- latency;
- privacy;
- region;
- cost;
- capabilities;
- tenant policy.

## 32. Failover

Procedimiento:

1. detectar fallo.
2. marcar provider state.
3. cerrar generación.
4. reconstruir contexto.
5. seleccionar proveedor compatible.
6. crear nueva authorization.
7. crear nueva provider session.
8. incrementar generation.
9. restaurar estado seguro.
10. informar.

## 33. Incompatibilidades

Si el proveedor alternativo no soporta:

- barge-in;
- tool proposal;
- audio format;
- idioma;
- region;

debe:

- degradar;
- cambiar modo;
- pasar a texto;
- rechazar failover.

## 34. Pseudocódigo del adaptador

```text
function handle_provider_event(raw_event, adapter_context):

    validate_provider_event_signature_if_required(raw_event)
    provider_event = parse_provider_event(raw_event)

    internal_type = map_provider_event_type(provider_event.type)
    internal_payload = map_provider_payload(
        internal_type,
        provider_event.payload
    )

    internal_event = RealtimeInternalEvent(
        provider_event_id=provider_event.id,
        voice_session_id=adapter_context.voice_session_id,
        connection_generation=adapter_context.connection_generation,
        event_type=internal_type,
        sequence_number=provider_event.sequence,
        payload=internal_payload
    )

    validate_internal_event_schema(internal_event)

    if is_duplicate(internal_event):
        return duplicate_ack()

    if is_stale_generation(internal_event):
        record_stale_event(internal_event)
        return ignored_ack()

    dispatch_internal_event(internal_event)
    return accepted_ack()
```

## 35. Errores

REALTIME_PROVIDER_NOT_CONFIGURED

REALTIME_CAPABILITY_MISMATCH

REALTIME_CONFIGURATION_INVALID

REALTIME_EPHEMERAL_AUTHORIZATION_FAILED

REALTIME_SESSION_CREATION_FAILED

REALTIME_CONNECTION_FAILED

REALTIME_EVENT_SCHEMA_INVALID

REALTIME_EVENT_DUPLICATE

REALTIME_EVENT_OUT_OF_ORDER

REALTIME_EVENT_STALE_GENERATION

REALTIME_AUDIO_FORMAT_UNSUPPORTED

REALTIME_INPUT_APPEND_FAILED

REALTIME_INPUT_COMMIT_FAILED

REALTIME_RESPONSE_REQUEST_FAILED

REALTIME_RESPONSE_CANCEL_FAILED

REALTIME_TRUNCATION_UNSUPPORTED

REALTIME_SESSION_CLOSE_FAILED

REALTIME_USAGE_UNAVAILABLE

REALTIME_RESULT_UNKNOWN

## 36. Eventos

RealtimeProviderSelected

RealtimeCapabilitiesNegotiated

RealtimeProviderSessionCreated

RealtimeProviderSessionClosed

RealtimeProviderEventMapped

RealtimeProviderEventRejected

RealtimeProviderRateLimited

RealtimeProviderDegraded

RealtimeProviderUnavailable

RealtimeProviderFailoverStarted

RealtimeProviderFailoverCompleted

## 37. Observabilidad

Métricas:

- realtime_provider_requests_total;
- realtime_provider_success_total;
- realtime_provider_failure_total;
- realtime_provider_duration_seconds;
- realtime_provider_events_total;
- realtime_provider_event_mapping_failure_total;
- realtime_provider_duplicate_events_total;
- realtime_provider_stale_events_total;
- realtime_provider_failover_total;
- realtime_provider_cost_estimate.

Dimensiones:

- provider_class;
- adapter_version;
- operation;
- transport;
- result;
- error_code;
- locale;
- region.

## 38. Seguridad

Controles:

- secretos backend;
- authorization ephemeral;
- tenant binding;
- generation;
- origin;
- scopes;
- event validation;
- rate limit;
- data minimization;
- provider allowlist.

## 39. Casos límite

- provider event duplicate;
- sequence gap;
- stale generation;
- authorization expiry;
- provider session timeout;
- cancel unsupported;
- truncation unsupported;
- tool schema mismatch;
- partial transcript after final;
- late audio;
- provider failover;
- usage missing;
- region unavailable;
- provider degraded;
- context too large;
- unknown outcome.

## 40. Criterios de aceptación

AC-RPA-001

VoiceShop depende del port.

AC-RPA-002

Los eventos se normalizan.

AC-RPA-003

El adaptador no ejecuta herramientas.

AC-RPA-004

La autorización es efímera.

AC-RPA-005

Toda sesión tiene referencia opaca.

AC-RPA-006

Toda conexión tiene generation.

AC-RPA-007

Todo stream tiene sequence.

AC-RPA-008

La cancelación es segura.

AC-RPA-009

Las capacidades se negocian.

AC-RPA-010

Los errores se mapean.

AC-RPA-011

El contexto oficial permanece en backend.

AC-RPA-012

La configuración se versiona.

AC-RPA-013

El failover reconstruye contexto.

AC-RPA-014

El usage se normaliza.

AC-RPA-015

Todo evento es trazable.

## 41. Plan mínimo de pruebas

- capabilities;
- negotiation;
- authorization;
- create session;
- connect;
- audio input;
- commit;
- transcript;
- tool proposal;
- output;
- cancel;
- truncate;
- close;
- duplicate;
- out-of-order;
- stale generation;
- errors;
- usage;
- failover;
- unsupported capability;
- privacy;
- security;
- metrics;
- contract tests.

## 42. Checklist

[ ] Existe Provider Port.
[ ] Existe capability contract.
[ ] Existe configuration contract.
[ ] Existe authorization contract.
[ ] Existe event envelope.
[ ] Se mapean eventos.
[ ] Se validan schemas.
[ ] Se deduplican eventos.
[ ] Se controla sequence.
[ ] Se controla generation.
[ ] Se controla audio.
[ ] Se controla cancelación.
[ ] Se controla truncamiento.
[ ] Se normalizan errores.
[ ] Se normaliza usage.
[ ] Se soporta failover.
[ ] Se protege contexto.
[ ] Se emiten eventos.
[ ] Existen pruebas.

======================================================================
FIN DEL DOCUMENTO
======================================================================
