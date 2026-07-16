======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-01-09-LLM-INTERACTION.md

# INTERACCIÓN CON MODELOS DE LENGUAJE

## 1. Objetivo

Este documento define el contrato funcional entre VoiceShop y cualquier
proveedor o modelo de lenguaje.

El sistema debe poder sustituir proveedor o modelo sin modificar el
dominio.

La interacción con la LLM se realiza mediante un puerto estable.

## 2. Principios

RULE-LLM-001

El dominio no depende de un proveedor.

RULE-LLM-002

Toda interacción debe indicar propósito.

RULE-LLM-003

Toda interacción debe poseer Request ID.

RULE-LLM-004

Toda respuesta debe validarse.

RULE-LLM-005

Una respuesta textual no reemplaza un contrato estructurado.

RULE-LLM-006

La LLM no es fuente oficial de datos.

RULE-LLM-007

La LLM no autoriza.

RULE-LLM-008

La LLM no ejecuta directamente el dominio.

RULE-LLM-009

Los timeouts deben ser explícitos.

RULE-LLM-010

Los reintentos deben ser limitados.

RULE-LLM-011

Los fallbacks deben preservar seguridad.

RULE-LLM-012

Los datos enviados deben minimizarse.

RULE-LLM-013

Los resultados deben estar versionados.

RULE-LLM-014

Los errores del proveedor deben traducirse a errores internos.

RULE-LLM-015

El cambio de proveedor no debe duplicar acciones.

## 3. Propósitos

- INTENT_DETECTION;
- ENTITY_EXTRACTION;
- RESPONSE_GENERATION;
- SUMMARIZATION;
- TOOL_PROPOSAL;
- CLASSIFICATION;
- TRANSLATION;
- SAFETY_CLASSIFICATION;
- QUERY_REWRITE.

Cada propósito tiene:

- esquema;
- política;
- timeout;
- modelos permitidos;
- fallback;
- presupuesto;
- datos permitidos.

## 4. Puerto funcional

```text
LLMPort.generate(request) -> LLMResult
LLMPort.stream(request) -> Stream<LLMEvent>
LLMPort.cancel(request_id) -> CancellationResult
LLMPort.health() -> ProviderHealth
```

El dominio no invoca este puerto directamente.

Lo usa la capa de aplicación o adaptador correspondiente.

## 5. LLMRequest

```json
{
  "llm_request_id": "UUID",
  "purpose": "INTENT_DETECTION",
  "prompt_instance_id": "UUID",
  "provider_policy": {
    "allowed_providers": [
      "PROVIDER_A",
      "PROVIDER_B"
    ],
    "allowed_model_classes": [
      "FAST_STRUCTURED"
    ]
  },
  "input": {
    "messages": [],
    "tools": [],
    "output_schema": {}
  },
  "control": {
    "timeout_ms": 5000,
    "maximum_retries": 1,
    "stream": false,
    "temperature_profile": "DETERMINISTIC",
    "maximum_output_tokens": 600
  },
  "privacy": {
    "data_classification": [
      "INTERNAL",
      "CUSTOMER_CONTENT"
    ],
    "retention_allowed": false
  },
  "trace": {
    "request_id": "UUID",
    "correlation_id": "UUID",
    "session_id": "UUID"
  }
}
```

## 6. LLMResult

```json
{
  "llm_request_id": "UUID",
  "status": "COMPLETED",
  "provider_reference": "PROVIDER_A",
  "model_reference": "FAST_STRUCTURED_V2",
  "response": {
    "structured_output": {},
    "text": null
  },
  "usage": {
    "input_tokens": 1000,
    "output_tokens": 120,
    "cached_input_tokens": 600
  },
  "latency": {
    "first_token_ms": null,
    "total_ms": 840
  },
  "finish_reason": "STOP",
  "safety": {},
  "error": null
}
```

## 7. Estados

CREATED

VALIDATING

DISPATCHING

STREAMING

COMPLETED

REJECTED

FAILED

TIMED_OUT

CANCELLED

FALLBACK_PENDING

UNKNOWN

UNKNOWN debe usarse sólo cuando no pueda determinarse si el proveedor
procesó una solicitud con efectos externos. Como la LLM no debe ejecutar
efectos directamente, normalmente un timeout es seguro para reintentar
bajo la política correspondiente.

## 8. Selección de proveedor

La selección puede considerar:

- propósito;
- soporte de esquema;
- soporte de herramientas;
- latencia;
- coste;
- región;
- privacidad;
- disponibilidad;
- idioma;
- tamaño de contexto;
- calidad validada;
- tenant.

No debe basarse únicamente en precio.

## 9. Capabilities

Cada adaptador debe declarar:

- structured_output;
- tool_calling;
- streaming;
- cancellation;
- system_instructions;
- context_length;
- supported_locales;
- retention_controls;
- region;
- usage_reporting;
- seed or determinism support;
- audio, cuando corresponda.

El orquestador debe adaptar el contrato sin debilitar seguridad.

## 10. Salida estructurada

Preferida para:

- intención;
- entidades;
- tool proposal;
- clasificación;
- resumen estructurado.

La salida debe validarse localmente.

Cuando el proveedor declara cumplimiento de esquema, igualmente se
valida.

## 11. Texto libre

Se permite para:

- respuesta natural;
- explicación;
- contenido no ejecutable.

Debe pasar por:

- validación de datos oficiales;
- seguridad;
- límites;
- postprocesamiento;
- política de canal.

## 12. Streaming

Eventos funcionales:

- STREAM_STARTED;
- TEXT_DELTA;
- STRUCTURED_DELTA;
- TOOL_PROPOSAL_DELTA;
- USAGE_UPDATE;
- STREAM_COMPLETED;
- STREAM_FAILED;
- STREAM_CANCELLED.

No ejecutar una Tool Proposal parcial.

No procesar JSON incompleto como comando.

## 13. Cancelación

Debe permitirse cuando:

- el Cliente interrumpe;
- el turno cambia;
- se activa control humano;
- expira la sesión;
- se supera presupuesto;
- el resultado ya no es pertinente.

La cancelación debe registrarse.

La respuesta tardía de una solicitud cancelada debe ignorarse o
registrarse, pero no aplicarse al turno nuevo.

## 14. Timeouts

Tipos:

- connection_timeout;
- first_token_timeout;
- total_timeout;
- idle_stream_timeout;
- cancellation_timeout.

Perfiles por propósito.

Ejemplo:

INTENT_DETECTION:

- total corto;
- reintento limitado.

RESPONSE_GENERATION:

- first token prioritario;
- streaming.

SUMMARIZATION:

- timeout más amplio;
- asíncrono cuando corresponda.

## 15. Reintentos

Puede reintentarse cuando:

- timeout antes de respuesta;
- error transitorio;
- rate limit con política;
- proveedor no disponible;
- salida estructural inválida, una vez con reparación controlada.

No reintentar indefinidamente.

No reintentar con más datos o menos seguridad sin política.

## 16. Reparación estructurada

Cuando la salida no cumple esquema:

1. registrar fallo;
2. no ejecutar;
3. intentar parseo seguro si es inequívoco;
4. opcionalmente solicitar reparación al modelo;
5. validar otra vez;
6. si falla, fallback o aclaración.

La reparación no debe inventar campos obligatorios.

## 17. Fallback

Estrategia:

1. mismo proveedor, reintento permitido;
2. modelo alternativo compatible;
3. proveedor alternativo;
4. método determinístico;
5. respuesta degradada;
6. aclaración;
7. humano.

Debe conservar:

- propósito;
- esquema;
- herramientas;
- políticas;
- redacción;
- Correlation ID.

## 18. Circuit breaker

Estados:

CLOSED

OPEN

HALF_OPEN

Debe operar por:

- proveedor;
- región;
- modelo;
- propósito.

No abrir un circuito global por un error aislado.

## 19. Rate limits del proveedor

Debe existir control de:

- solicitudes;
- tokens;
- concurrencia;
- audio;
- tenant;
- presupuesto.

En caso de límite:

- encolar cuando corresponda;
- usar fallback;
- degradar;
- informar;
- nunca perder una operación comercial ya confirmada.

## 20. Privacidad

Antes de enviar:

- clasificar datos;
- verificar proveedor permitido;
- verificar región;
- verificar retención;
- aplicar minimización;
- aplicar redacción;
- registrar base operacional.

No enviar:

- API Keys;
- contraseñas;
- tokens;
- tarjetas;
- secretos;
- datos de otros clientes.

## 21. Tool calling

La LLM puede producir Tool Proposal.

El adaptador debe devolverla como dato.

No debe ejecutar callbacks de dominio automáticamente.

Flujo:

LLM
    ↓
Tool Proposal
    ↓
Tool Selection Validator
    ↓
Authorization
    ↓
Command
    ↓
Handler

## 22. Respuestas del proveedor

Deben normalizarse.

Errores externos no deben filtrarse directamente.

Ejemplo interno:

```json
{
  "code": "LLM_PROVIDER_RATE_LIMITED",
  "retryable": true,
  "provider": "PROVIDER_A",
  "retry_after_ms": 1200
}
```

## 23. Errores estándar

LLM_REQUEST_INVALID

LLM_PROMPT_INVALID

LLM_PROVIDER_UNAVAILABLE

LLM_PROVIDER_RATE_LIMITED

LLM_MODEL_UNAVAILABLE

LLM_TIMEOUT

LLM_FIRST_TOKEN_TIMEOUT

LLM_STREAM_INTERRUPTED

LLM_OUTPUT_SCHEMA_INVALID

LLM_OUTPUT_UNSAFE

LLM_CONTEXT_TOO_LARGE

LLM_PRIVACY_POLICY_DENIED

LLM_TOOL_PROPOSAL_INVALID

LLM_CANCELLED

LLM_FALLBACK_EXHAUSTED

## 24. Flujo principal

1. Recibir LLMRequest.
2. validar propósito.
3. validar prompt.
4. validar privacidad.
5. seleccionar proveedor.
6. comprobar circuit breaker.
7. comprobar presupuesto.
8. adaptar formato.
9. enviar.
10. controlar timeout.
11. recibir.
12. normalizar.
13. validar esquema.
14. validar seguridad.
15. registrar uso.
16. devolver LLMResult.
17. emitir LLMRequestCompleted.

## 25. Pseudocódigo

```text
function invoke_llm(request):

    validate_llm_request(request)
    validate_privacy_policy(request)
    validate_prompt_reference(request.prompt_instance_id)

    candidates = select_provider_candidates(
        purpose=request.purpose,
        policy=request.provider_policy
    )

    for candidate in candidates:

        if circuit_breaker_open(candidate):
            continue

        try:
            adapted = candidate.adapter.adapt(request)
            raw = candidate.adapter.send(
                adapted,
                timeout=request.control.timeout_ms
            )

            result = normalize_provider_response(raw)
            validate_result_schema(result, request.input.output_schema)
            validate_safety(result, request.purpose)
            record_usage(result)

            emit(LLMRequestCompleted)
            return result

        except RetryableProviderError as error:
            record_failure(candidate, error)
            continue

        except NonRetryableError as error:
            emit(LLMRequestRejected)
            return failure_result(error)

    emit(LLMFallbackExhausted)
    return failure_result(LLM_FALLBACK_EXHAUSTED)
```

## 26. Streaming pseudocode

```text
function stream_llm(request):

    validate_request(request)
    provider = select_streaming_provider(request)

    stream = provider.open_stream(request)

    for event in stream:

        normalized = normalize_stream_event(event)

        if normalized.type == TOOL_PROPOSAL_DELTA:
            buffer_only(normalized)
            continue

        if normalized.type == TEXT_DELTA:
            validate_incremental_safety(normalized)
            yield normalized

        if normalized.type == STREAM_COMPLETED:
            final = assemble_result()
            validate_final_result(final)
            yield final
```

## 27. Determinismo

Para tareas estructuradas se debe preferir:

- baja variación;
- esquema;
- catálogo cerrado;
- temperatura determinística;
- seed cuando exista;
- validación.

El sistema no debe prometer determinismo absoluto de un proveedor.

Debe medir estabilidad.

## 28. Evaluación

Cada combinación propósito-modelo debe tener:

- dataset;
- precisión;
- recall;
- error crítico;
- latencia;
- coste;
- robustez;
- prompt injection;
- idiomas;
- drift.

Un modelo nuevo no entra en producción sólo por ser más reciente.

## 29. Observabilidad

Métricas:

- llm_requests_total;
- llm_success_total;
- llm_failure_total;
- llm_timeout_total;
- llm_fallback_total;
- llm_latency_seconds;
- llm_first_token_seconds;
- llm_input_tokens;
- llm_output_tokens;
- llm_cached_tokens;
- llm_schema_failure_total;
- llm_cancellation_total;
- llm_cost_estimate.

Dimensiones:

- provider;
- model_class;
- purpose;
- result;
- error_code;
- tenant_tier.

No usar prompt o Session ID como etiqueta.

## 30. Auditoría

Registrar:

- LLM Request ID;
- propósito;
- Prompt Instance ID;
- proveedor lógico;
- modelo;
- versiones;
- resultado;
- uso;
- latencia;
- fallback;
- error;
- Correlation ID.

No registrar razonamiento privado del modelo.

No depender de chain-of-thought.

## 31. Casos límite

- proveedor cae;
- timeout;
- rate limit;
- esquema inválido;
- JSON parcial;
- stream cancelado;
- respuesta tardía;
- fallback distinto;
- contexto excesivo;
- modelo sin tool calling;
- proveedor retiene datos;
- región no permitida;
- circuit breaker;
- coste excedido;
- output inseguro;
- herramienta inventada;
- respuesta con dato no oficial;
- modelo nuevo;
- drift;
- multi-tenant;
- sesión cerrada durante streaming.

## 32. Criterios de aceptación

AC-LLM-001

El dominio no conoce proveedor.

AC-LLM-002

Toda solicitud tiene propósito.

AC-LLM-003

Toda respuesta se valida.

AC-LLM-004

La salida estructurada cumple esquema.

AC-LLM-005

La LLM no ejecuta herramientas.

AC-LLM-006

Los fallbacks preservan políticas.

AC-LLM-007

Los reintentos son limitados.

AC-LLM-008

Los timeouts son explícitos.

AC-LLM-009

La cancelación evita aplicar respuestas tardías.

AC-LLM-010

Se aplican controles de privacidad.

AC-LLM-011

Los errores se normalizan.

AC-LLM-012

Se registran tokens y latencia.

AC-LLM-013

El cambio de proveedor no modifica el dominio.

AC-LLM-014

Un modelo nuevo requiere evaluación.

AC-LLM-015

No se registra razonamiento privado.

## 33. Plan mínimo de pruebas

- request válido;
- propósito inválido;
- privacidad;
- proveedor principal;
- proveedor alternativo;
- timeout;
- rate limit;
- circuit breaker;
- esquema inválido;
- reparación;
- fallback;
- streaming;
- cancelación;
- respuesta tardía;
- tool proposal;
- herramienta inventada;
- contexto excesivo;
- región;
- retención;
- coste;
- tokens;
- métricas;
- auditoría;
- modelo nuevo;
- drift;
- independencia.

## 34. Checklist

[ ] Existe LLM Request ID.
[ ] Existe propósito.
[ ] Existe Prompt Instance ID.
[ ] Existe timeout.
[ ] Existe política de reintento.
[ ] Existe política de fallback.
[ ] Existe esquema.
[ ] Existe privacidad.
[ ] Se selecciona proveedor.
[ ] Se adapta contrato.
[ ] Se normaliza respuesta.
[ ] Se valida esquema.
[ ] Se valida seguridad.
[ ] Se controla streaming.
[ ] Se controla cancelación.
[ ] Se ignoran respuestas tardías.
[ ] Se registran tokens.
[ ] Se registran métricas.
[ ] No se ejecutan herramientas.
[ ] No se registra chain-of-thought.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
