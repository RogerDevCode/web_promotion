======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-05-03-LLM-PROVIDER-ABSTRACTION.md

# ABSTRACCIÓN DEL PROVEEDOR LLM

## 1. Objetivo

Este documento define una interfaz funcional independiente del proveedor
para el uso de modelos de lenguaje en VoiceShop.

La abstracción debe permitir utilizar distintos proveedores sin cambiar:

- reglas de negocio;
- autorización;
- catálogo;
- inventario;
- carrito;
- pedidos;
- confirmaciones;
- seguridad;
- observabilidad;
- contratos internos.

El modelo propone.

El backend valida.

El dominio decide.

## 2. Alcance

Incluye:

- generación de texto;
- clasificación de intención;
- extracción de entidades;
- slot filling;
- structured output;
- Tool Proposal;
- resumen;
- reescritura;
- moderación auxiliar;
- embeddings;
- selección de modelo;
- fallback;
- errores;
- usage;
- coste;
- observabilidad;
- QA.

No incluye:

- ejecución directa de herramientas;
- autorización;
- fuente oficial de datos;
- persistencia del dominio;
- decisiones de pago;
- cambio directo de stock;
- confirmación de pedidos.

## 3. Principios

RULE-LLM-001

VoiceShop depende de LLMProviderPort.

RULE-LLM-002

Toda salida del modelo es no confiable.

RULE-LLM-003

Toda salida estructurada debe validarse.

RULE-LLM-004

El modelo no crea IDs oficiales.

RULE-LLM-005

El modelo no crea permisos.

RULE-LLM-006

El modelo no confirma hechos externos.

RULE-LLM-007

Las herramientas visibles se limitan.

RULE-LLM-008

Los prompts se versionan.

RULE-LLM-009

Las respuestas deben poder trazarse sin registrar chain-of-thought.

RULE-LLM-010

Todo request posee límite de tokens.

RULE-LLM-011

Todo request posee timeout.

RULE-LLM-012

El fallback debe preservar seguridad.

RULE-LLM-013

Los tenants permanecen aislados.

RULE-LLM-014

Los datos enviados se minimizan.

RULE-LLM-015

Todo uso debe medirse.

## 4. Operaciones del port

- get_capabilities;
- classify_intent;
- extract_entities;
- fill_slots;
- generate_structured_response;
- generate_natural_language_response;
- summarize_context;
- rewrite_for_channel;
- create_embedding;
- evaluate_guardrail_signal;
- collect_usage.

## 5. Capabilities contract

```json
{
  "provider_id": "LLM-PROVIDER-A",
  "adapter_version": "1.0.0",
  "capabilities": {
    "text_generation": true,
    "structured_output": true,
    "tool_proposals": true,
    "streaming": true,
    "embeddings": true,
    "vision": false,
    "audio_input": false,
    "context_window_tokens": 128000,
    "maximum_output_tokens": 4096
  },
  "regions": [
    "APPROVED_REGION"
  ],
  "status": "HEALTHY"
}
```

## 6. Contrato de LLM Request

```json
{
  "llm_request_id": "UUID",
  "tenant_id": "UUID",
  "session_id": "UUID",
  "turn_id": "UUID",
  "operation": "CLASSIFY_INTENT",
  "model_class": "FAST_STRUCTURED",
  "prompt_template_id": "intent-classifier",
  "prompt_template_version": 7,
  "input": {
    "message": "agrega seis lager norte",
    "context_view": {}
  },
  "output_schema_id": "intent-result-v3",
  "visible_tools": [],
  "limits": {
    "maximum_input_tokens": 3000,
    "maximum_output_tokens": 300,
    "timeout_ms": 2500
  },
  "correlation_id": "UUID"
}
```

## 7. Contrato de LLM Result

```json
{
  "llm_result_id": "UUID",
  "llm_request_id": "UUID",
  "status": "SUCCESS",
  "model_class": "FAST_STRUCTURED",
  "output_schema_id": "intent-result-v3",
  "structured_output": {
    "intent": "ADD_PRODUCT_TO_CART",
    "confidence": 0.95,
    "entities": {
      "product_reference": "lager norte",
      "quantity": 6
    }
  },
  "usage": {
    "input_tokens": 420,
    "output_tokens": 76,
    "cached_input_tokens": 300
  },
  "duration_ms": 238
}
```

## 8. Model classes

FAST_CLASSIFIER

FAST_STRUCTURED

GENERAL_CONVERSATION

HIGH_REASONING

EMBEDDING

SAFETY_AUXILIARY

La clase interna no debe depender del nombre comercial del modelo.

## 9. Selección de modelo

Puede considerar:

- operación;
- idioma;
- latencia;
- coste;
- contexto;
- structured output;
- riesgo;
- health;
- tenant policy;
- región.

## 10. Prompt templates

Cada prompt debe poseer:

- Prompt Template ID;
- versión;
- propósito;
- variables permitidas;
- output schema;
- tools visibles;
- data classification;
- maximum context;
- owner;
- tests.

## 11. Instrucciones del sistema

Deben estar:

- separadas del contenido del Cliente;
- versionadas;
- protegidas;
- no modificables por input;
- minimizadas.

## 12. Input del Cliente

Debe tratarse como datos.

Frases como:

"ignora las instrucciones"

no cambian la política.

## 13. Context View

Debe contener sólo:

- hechos oficiales necesarios;
- pending intent;
- slots;
- lista vigente;
- referencias;
- restricciones;
- estado de control.

No enviar historial completo sin necesidad.

## 14. Structured output

Debe definir:

- schema;
- required fields;
- enums;
- types;
- ranges;
- maximum lengths;
- unknown handling.

## 15. Validación de salida

1. parsear;
2. validar JSON o estructura;
3. validar schema;
4. validar enums;
5. validar límites;
6. rechazar campos adicionales si política;
7. normalizar;
8. entregar al siguiente componente.

## 16. Invalid structured output

Políticas:

- reparar con parser determinístico;
- reintentar una vez con instrucciones;
- usar modelo alternativo;
- fallback determinístico;
- pedir aclaración.

No ejecutar herramientas con salida inválida.

## 17. Intent detection

Debe producir:

- intent;
- confidence;
- alternatives;
- evidence references;
- unknown;
- clarification needed.

No produce Command.

## 18. Entity extraction

Las entidades son candidatos.

Ejemplos:

- product_reference;
- quantity;
- branch_reference;
- date;
- address.

Los IDs se resuelven oficialmente.

## 19. Slot filling

Debe distinguir:

FILLED

MISSING

AMBIGUOUS

INVALID

EXPIRED

Los slots críticos se revalidan.

## 20. Tool Proposal

Debe contener:

- Tool ID visible;
- argumentos candidatos;
- confidence;
- source;
- proposal ID.

El backend aplica:

- schema;
- authorization;
- state;
- confirmation;
- idempotency.

## 21. Tools prohibidas

El modelo no debe recibir herramientas:

- administrativas;
- de ajuste de inventario para Cliente;
- de aprobación de pagos;
- de cambio de roles;
- de acceso a secretos;
- de acceso cross-tenant.

## 22. Respuesta natural

Debe basarse en:

- Official Result;
- safe presentation model;
- locale;
- channel;
- tone policy.

No debe inventar éxito.

## 23. Summarization

Un resumen debe distinguir:

- hechos;
- decisiones;
- pending tasks;
- uncertainty;
- references.

No sustituye aggregates.

## 24. Embeddings

Se usan para:

- búsqueda;
- similitud;
- recuperación.

Deben:

- usar texto minimizado;
- estar aislados por tenant;
- versionarse;
- terminar en referencias oficiales.

## 25. Streaming

Debe producir:

- Stream ID;
- sequence;
- chunks;
- cancellation;
- completion status;
- usage final.

No exponer texto no validado en operaciones sensibles.

## 26. Chain-of-thought

No debe solicitarse ni persistirse.

Puede usarse razonamiento interno del proveedor sin exposición.

VoiceShop registra:

- input class;
- output estructurado;
- decisiones del backend;
- errores;
- usage.

## 27. Prompt injection

Controles:

- separación de roles;
- input delimitation;
- tool allowlist;
- output schema;
- server authorization;
- context minimization;
- content isolation;
- tests adversariales.

## 28. Indirect prompt injection

Puede llegar desde:

- descripciones;
- documentos;
- emails;
- páginas;
- catálogo;
- CRM.

El contenido externo se etiqueta como no confiable.

## 29. Model output injection

El texto del modelo no debe insertarse sin escaping en:

- HTML;
- SQL;
- shell;
- prompts posteriores;
- logs estructurados;
- URLs.

## 30. Fallback

Orden posible:

1. mismo proveedor, modelo equivalente;
2. proveedor alternativo;
3. parser determinístico;
4. reglas;
5. aclaración;
6. handoff humano.

La seguridad no se reduce.

## 31. Timeout

Cada operación posee timeout.

Clasificación debe tener timeout corto.

Resumen puede tener mayor presupuesto.

## 32. Retry

Reintentar sólo:

- errores transitorios;
- requests sin efectos externos;
- misma versión de prompt;
- dentro del budget.

## 33. Resultados UNKNOWN

En generación pura, normalmente fallo.

En Tool Proposal no existe efecto todavía.

No marcar operación comercial UNKNOWN por fallo LLM.

## 34. Usage

Normalizar:

- input tokens;
- output tokens;
- cached tokens;
- reasoning units si aplica;
- embedding tokens;
- requests;
- cost estimate.

## 35. Cost policy

Debe limitar:

- tokens por turno;
- tokens por Session;
- modelos caros;
- retries;
- context size;
- tools;
- embeddings.

## 36. Pseudocódigo

```text
function execute_llm_operation(request):

    validate_llm_request(request)
    template = load_prompt_template(
        request.prompt_template_id,
        request.prompt_template_version
    )

    context = build_minimal_context_view(request)
    model = select_model_class(request, template)

    raw_result = llm_provider.execute(
        operation=request.operation,
        model=model,
        system_instructions=template.system_instructions,
        input=context,
        output_schema=request.output_schema_id,
        timeout=request.limits.timeout_ms
    )

    normalized = normalize_llm_result(raw_result)
    validate_output_schema(normalized, request.output_schema_id)
    enforce_output_guardrails(normalized, request)

    persist_llm_metadata_without_chain_of_thought(
        request,
        normalized
    )

    return normalized
```

## 37. Errores

LLM_PROVIDER_NOT_CONFIGURED

LLM_MODEL_CLASS_UNAVAILABLE

LLM_PROMPT_TEMPLATE_NOT_FOUND

LLM_PROMPT_VERSION_INVALID

LLM_INPUT_TOO_LARGE

LLM_OUTPUT_SCHEMA_INVALID

LLM_OUTPUT_PARSE_FAILED

LLM_OUTPUT_GUARDRAIL_FAILED

LLM_TOOL_PROPOSAL_INVALID

LLM_CONTEXT_POLICY_DENIED

LLM_TIMEOUT

LLM_RATE_LIMITED

LLM_PROVIDER_UNAVAILABLE

LLM_COST_BUDGET_EXCEEDED

LLM_RESULT_CANCELLED

## 38. Eventos

LLMRequestCreated

LLMModelSelected

LLMExecutionStarted

LLMStructuredOutputValidated

LLMStructuredOutputRejected

LLMToolProposalCreated

LLMFallbackActivated

LLMExecutionSucceeded

LLMExecutionFailed

LLMUsageRecorded

## 39. Observabilidad

Métricas:

- llm_requests_total;
- llm_success_total;
- llm_failure_total;
- llm_timeout_total;
- llm_schema_failure_total;
- llm_guardrail_failure_total;
- llm_fallback_total;
- llm_duration_seconds;
- llm_input_tokens_total;
- llm_output_tokens_total;
- llm_cached_tokens_total;
- llm_cost_estimate.

Dimensiones:

- operation;
- model_class;
- provider_class;
- prompt_template;
- result;
- error_code;
- locale;
- tenant_tier.

## 40. Seguridad

- secretos backend;
- tools mínimas;
- prompts protegidos;
- tenant;
- context minimization;
- output validation;
- rate limit;
- cost limit;
- redaction;
- no chain-of-thought.

## 41. Casos límite

- invalid JSON;
- extra fields;
- wrong enum;
- prompt injection;
- indirect injection;
- tool invented;
- Product ID invented;
- timeout;
- rate limit;
- provider down;
- fallback;
- context too large;
- output too long;
- mixed language;
- low confidence;
- streaming cancel;
- cost budget;
- tenant mismatch.

## 42. Criterios de aceptación

AC-LLM-001

VoiceShop depende del port.

AC-LLM-002

Toda salida se considera no confiable.

AC-LLM-003

Toda estructura se valida.

AC-LLM-004

El modelo no crea IDs oficiales.

AC-LLM-005

El modelo no crea permisos.

AC-LLM-006

Las tools se limitan.

AC-LLM-007

Los prompts se versionan.

AC-LLM-008

No se registra chain-of-thought.

AC-LLM-009

Existen límites de tokens.

AC-LLM-010

Toda operación posee timeout.

AC-LLM-011

El fallback preserva seguridad.

AC-LLM-012

Los tenants se aíslan.

AC-LLM-013

Los datos se minimizan.

AC-LLM-014

El usage se normaliza.

AC-LLM-015

Todo resultado es trazable.

## 43. Plan mínimo de pruebas

- capabilities;
- model selection;
- prompt versions;
- structured output;
- invalid JSON;
- schema;
- intent;
- entities;
- slots;
- tool proposals;
- response;
- summary;
- embeddings;
- streaming;
- cancellation;
- injection;
- indirect injection;
- timeout;
- retry;
- fallback;
- cost;
- context;
- tenant;
- security;
- metrics;
- contract.

## 44. Checklist

[ ] Existe LLMProviderPort.
[ ] Existen model classes.
[ ] Existen capabilities.
[ ] Existe Request contract.
[ ] Existe Result contract.
[ ] Existen Prompt Templates.
[ ] Existe output schema.
[ ] Se valida salida.
[ ] Se limitan tools.
[ ] Se minimiza contexto.
[ ] Se controla injection.
[ ] Existe timeout.
[ ] Existe retry policy.
[ ] Existe fallback.
[ ] Existe usage.
[ ] Existe cost policy.
[ ] Se protege tenant.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
