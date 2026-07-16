======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-01-14-OBSERVABILITY.md

# OBSERVABILIDAD DEL MOTOR CONVERSACIONAL

## 1. Objetivo

Este documento define la observabilidad funcional del motor
conversacional de VoiceShop.

La observabilidad debe permitir:

- detectar fallos;
- medir latencia;
- investigar incidentes;
- evaluar calidad;
- controlar costes;
- reconstruir flujos;
- detectar abuso;
- identificar degradación;
- verificar SLAs;
- mejorar prompts y modelos.

La observabilidad no debe convertirse en un almacén indiscriminado de
conversaciones ni datos sensibles.

## 2. Alcance

Incluye:

- logs;
- métricas;
- trazas;
- eventos;
- correlación;
- calidad;
- costes;
- alertas;
- dashboards;
- sampling;
- redacción;
- retención;
- auditoría técnica;
- pruebas.

No incluye:

- reglas de negocio;
- contenido completo por defecto;
- secretos;
- chain-of-thought;
- exposición pública de datos internos.

## 3. Principios

RULE-OBS-CONV-001

Toda operación debe poseer Request ID.

RULE-OBS-CONV-002

Todo turno debe poseer Turn ID.

RULE-OBS-CONV-003

Toda sesión debe poseer Session ID.

RULE-OBS-CONV-004

Toda operación distribuida debe poseer Correlation ID.

RULE-OBS-CONV-005

Los logs deben ser estructurados.

RULE-OBS-CONV-006

Las métricas deben evitar alta cardinalidad.

RULE-OBS-CONV-007

Las trazas deben propagar contexto.

RULE-OBS-CONV-008

Los datos sensibles deben redactarse.

RULE-OBS-CONV-009

No se registra chain-of-thought.

RULE-OBS-CONV-010

Los errores deben poseer código estable.

RULE-OBS-CONV-011

Las alertas deben ser accionables.

RULE-OBS-CONV-012

La observabilidad debe distinguir fallo técnico y fallo funcional.

RULE-OBS-CONV-013

La observabilidad debe permitir comparar proveedores.

RULE-OBS-CONV-014

Toda señal debe poseer retención.

RULE-OBS-CONV-015

El sistema debe poder degradar observabilidad sin perder negocio.

## 4. Identificadores

- Request ID;
- Correlation ID;
- Causation ID;
- Session ID;
- Turn ID;
- Input ID;
- Prompt Instance ID;
- LLM Request ID;
- Tool Proposal ID;
- Command ID;
- Event ID;
- Response ID;
- Handoff ID;
- Tenant ID.

No todos deben ser etiquetas de métricas.

## 5. Logs

Formato recomendado:

```json
{
  "timestamp": "UTC_TIMESTAMP",
  "level": "INFO",
  "service": "conversation-engine",
  "component": "intent-detection",
  "event_name": "intent_detected",
  "request_id": "UUID",
  "correlation_id": "UUID",
  "session_id_hash": "HASH",
  "tenant_id": "UUID",
  "turn_id": "UUID",
  "intent": "ADD_PRODUCT",
  "result": "SUCCESS",
  "duration_ms": 123,
  "error_code": null
}
```

## 6. Niveles

TRACE

Sólo entornos controlados.

DEBUG

Datos técnicos no sensibles.

INFO

Operación normal.

WARN

Degradación o condición recuperable.

ERROR

Fallo.

CRITICAL

Riesgo sistémico o de seguridad.

No usar ERROR para resultados funcionales esperados como stock
insuficiente.

## 7. Eventos de log

- input_received;
- input_rejected;
- input_duplicate;
- normalization_completed;
- intent_detected;
- intent_unknown;
- entities_extracted;
- slot_clarification_requested;
- context_updated;
- prompt_built;
- llm_request_started;
- llm_request_completed;
- llm_request_failed;
- tool_proposed;
- tool_rejected;
- command_dispatched;
- response_generated;
- response_delivered;
- response_failed;
- guardrail_triggered;
- handoff_requested.

## 8. Campos prohibidos en logs generales

- prompt completo;
- mensaje completo;
- dirección completa;
- email completo;
- teléfono completo;
- tarjeta;
- CVV;
- contraseña;
- API Key;
- token;
- audio;
- chain-of-thought;
- secretos;
- datos de otros clientes.

## 9. Métricas de entrada

- conversation_inputs_total;
- conversation_inputs_rejected_total;
- conversation_duplicates_total;
- conversation_rate_limited_total;
- conversation_input_size_bytes;
- conversation_reception_duration_seconds.

## 10. Métricas de normalización

- normalization_total;
- normalization_failure_total;
- normalization_duration_seconds;
- empty_after_normalization_total;
- sensitive_signal_total;
- prompt_injection_signal_total.

## 11. Métricas de intención

- intent_detection_total;
- intent_unknown_total;
- intent_clarification_total;
- intent_change_total;
- intent_confidence;
- intent_detection_duration_seconds;
- intent_fallback_total.

## 12. Métricas de entidades y slots

- entities_extracted_total;
- entity_ambiguity_total;
- entity_resolution_failure_total;
- slot_missing_total;
- slot_resolution_total;
- slot_clarification_total;
- slot_expired_total.

## 13. Métricas de contexto y memoria

- context_load_total;
- context_conflict_total;
- context_reconstruction_total;
- memory_read_total;
- memory_write_total;
- memory_poisoning_total;
- pending_intent_expired_total.

## 14. Métricas de prompts

- prompt_build_total;
- prompt_build_failure_total;
- prompt_tokens_estimated;
- prompt_context_items_selected;
- prompt_redactions_total;
- prompt_cacheable_tokens.

## 15. Métricas LLM

- llm_requests_total;
- llm_success_total;
- llm_failure_total;
- llm_timeout_total;
- llm_fallback_total;
- llm_first_token_seconds;
- llm_total_duration_seconds;
- llm_input_tokens_total;
- llm_output_tokens_total;
- llm_cached_tokens_total;
- llm_cost_estimated;
- llm_schema_failure_total.

## 16. Métricas de herramientas

- tool_proposals_total;
- tool_rejections_total;
- tool_authorization_denied_total;
- tool_confirmation_required_total;
- tool_execution_prepared_total;
- tool_plan_failure_total.

## 17. Métricas de respuesta

- responses_generated_total;
- response_fallback_total;
- response_fact_mismatch_total;
- response_delivery_total;
- response_delivery_failure_total;
- response_interrupted_total;
- response_length_chars.

## 18. Métricas de guardrails

- guardrail_evaluations_total;
- guardrail_blocks_total;
- prompt_injection_total;
- indirect_injection_total;
- tool_injection_total;
- secret_detection_total;
- cross_tenant_violation_total;
- unsafe_output_total.

## 19. Histogramas

Usar histogramas para:

- latencia;
- tokens;
- longitud;
- tamaño;
- número de aclaraciones;
- número de herramientas;
- coste.

Buckets deben adaptarse a SLO.

## 20. Etiquetas permitidas

- component;
- channel;
- locale;
- intent;
- result;
- error_code;
- provider;
- model_class;
- prompt_version;
- policy_version;
- tenant_tier;
- risk.

## 21. Etiquetas prohibidas

- Session ID;
- Turn ID;
- User ID;
- Input ID;
- Prompt Instance ID;
- texto;
- email;
- teléfono;
- dirección;
- Product ID cuando alta cardinalidad;
- Order ID.

## 22. Trazas

Spans:

- receive_input;
- normalize_input;
- detect_intent;
- extract_entities;
- fill_slots;
- load_context;
- build_prompt;
- invoke_llm;
- validate_llm_output;
- select_tool;
- authorize_tool;
- dispatch_command;
- generate_response;
- deliver_response.

## 23. Atributos de trace

Permitidos:

- component;
- operation;
- result;
- error_code;
- provider;
- model_class;
- intent;
- channel;
- risk.

IDs se incluyen como atributos cuando la política lo permita, no como
métrica.

## 24. Propagación

Debe propagarse:

- traceparent o equivalente;
- Request ID;
- Correlation ID;
- Causation ID;
- tenant;
- session reference protegida.

Los proveedores externos pueden no propagarla. Se debe mapear.

## 25. Sampling

Políticas:

- 100% de errores críticos;
- 100% de seguridad;
- 100% de pagos/pedidos sensibles según política;
- sampling de éxito;
- sampling adaptable por latencia;
- sampling mayor en canary.

Nunca samplear de forma que se pierda auditoría obligatoria.

## 26. Calidad conversacional

Métricas:

- task_completion_rate;
- clarification_rate;
- handoff_rate;
- abandonment_rate;
- unknown_intent_rate;
- repeat_question_rate;
- correction_rate;
- response_fact_error_rate;
- customer_rephrase_rate;
- average_turns_to_completion.

Estas métricas requieren definiciones estables.

## 27. Coste

Medir:

- tokens;
- audio;
- almacenamiento;
- proveedor;
- tenant;
- propósito;
- fallback;
- caché.

No usar el coste para omitir controles críticos.

## 28. SLO sugeridos

Los valores finales pertenecen al documento NFR.

Ejemplos iniciales:

- recepción p95 < 200 ms;
- intención p95 < 2 s;
- respuesta texto p95 < 4 s;
- primer audio p95 < 1 s;
- error rate < objetivo;
- unknown intent < objetivo;
- guardrail coverage = 100%.

## 29. Alertas

Ejemplos:

- aumento de timeouts;
- aumento de schema failure;
- aumento de unknown intent;
- caída de respuesta;
- proveedor indisponible;
- costes anómalos;
- prompt injection spike;
- cross-tenant violation;
- response fact mismatch;
- handoff excesivo;
- errores de entrega.

Toda alerta debe incluir:

- condición;
- severidad;
- propietario;
- playbook;
- ventana;
- deduplicación.

## 30. Dashboards

### CONVERSATION HEALTH

- volumen;
- éxito;
- error;
- latencia;
- unknown;
- handoff.

### LLM PROVIDERS

- disponibilidad;
- latencia;
- tokens;
- costes;
- fallback;
- schema failures.

### SAFETY

- injections;
- secrets;
- tenant violations;
- blocks;
- false positives.

### BUSINESS FLOW

- intents;
- cart actions;
- orders;
- completion;
- abandonment.

## 31. Privacidad

Aplicar:

- redacción;
- hashing;
- seudonimización;
- control de acceso;
- retención;
- cifrado;
- separación de auditoría;
- eliminación.

El hash no debe usarse si permite reidentificación trivial.

## 32. Error taxonomía

Clasificaciones:

FUNCTIONAL_EXPECTED

Ejemplo: stock insuficiente.

VALIDATION

Entrada inválida.

AUTHENTICATION

Identidad.

AUTHORIZATION

Permiso.

DEPENDENCY

Proveedor externo.

MODEL

LLM.

SECURITY

Ataque.

INTERNAL

Bug.

UNKNOWN

Sin clasificación.

## 33. Flujo de telemetría

1. componente genera señal;
2. aplicar schema;
3. redactar;
4. adjuntar correlación;
5. enviar;
6. buffer;
7. reintentar;
8. descartar según política si no crítico;
9. alertar si hay pérdida crítica.

## 34. Degradación

Si observabilidad falla:

- el negocio debe continuar cuando sea seguro;
- usar buffer local;
- reducir logs;
- preservar auditoría crítica;
- no bloquear por métricas;
- alertar.

## 35. Pseudocódigo

```text
function emit_telemetry(signal):

    validate_telemetry_schema(signal)
    classified = classify_data(signal)
    redacted = redact_sensitive_fields(classified)
    enriched = add_correlation(redacted)

    if telemetry_backend_available():
        send(enriched)
    else:
        if signal.critical:
            persist_critical_buffer(enriched)
        else:
            apply_drop_policy(enriched)
```

## 36. Errores

OBS_SCHEMA_INVALID

OBS_REDACTION_FAILED

OBS_BACKEND_UNAVAILABLE

OBS_BUFFER_FULL

OBS_HIGH_CARDINALITY_DETECTED

OBS_SENSITIVE_DATA_DETECTED

OBS_TRACE_CONTEXT_INVALID

OBS_ALERT_DELIVERY_FAILED

## 37. Eventos

TelemetryEmitted

TelemetryDropped

TelemetryBuffered

SensitiveTelemetryBlocked

HighCardinalityDetected

AlertTriggered

AlertResolved

## 38. Casos límite

- backend caído;
- buffer lleno;
- PII en error;
- prompt completo;
- alta cardinalidad;
- trace roto;
- multi-provider;
- duplicados;
- sampling;
- seguridad;
- canary;
- tenant;
- clock skew;
- coste anómalo;
- respuesta tardía;
- voz;
- handoff;
- métricas contradictorias.

## 39. Criterios de aceptación

AC-OBS-CONV-001

Toda operación tiene correlación.

AC-OBS-CONV-002

Los logs son estructurados.

AC-OBS-CONV-003

Las métricas evitan alta cardinalidad.

AC-OBS-CONV-004

Los datos sensibles se redactan.

AC-OBS-CONV-005

No se registra chain-of-thought.

AC-OBS-CONV-006

Los errores tienen código.

AC-OBS-CONV-007

Las trazas cubren el pipeline.

AC-OBS-CONV-008

Los proveedores son comparables.

AC-OBS-CONV-009

Existen alertas accionables.

AC-OBS-CONV-010

La caída de observabilidad no corrompe negocio.

AC-OBS-CONV-011

La auditoría crítica no se samplea.

AC-OBS-CONV-012

Se mide calidad.

AC-OBS-CONV-013

Se mide coste.

AC-OBS-CONV-014

Se mide seguridad.

AC-OBS-CONV-015

Existen pruebas de privacidad.

## 40. Plan mínimo de pruebas

- logs;
- redacción;
- métricas;
- cardinalidad;
- trazas;
- propagación;
- sampling;
- backend caído;
- buffer;
- alertas;
- dashboards;
- coste;
- proveedor;
- seguridad;
- PII;
- auditoría;
- voz;
- handoff;
- errores;
- SLO;
- canary;
- retención;
- acceso;
- eliminación.

## 41. Checklist

[ ] Existe Request ID.
[ ] Existe Correlation ID.
[ ] Existe Turn ID.
[ ] Logs estructurados.
[ ] Métricas definidas.
[ ] Trazas definidas.
[ ] Alertas definidas.
[ ] Dashboards definidos.
[ ] Se controla cardinalidad.
[ ] Se redacta PII.
[ ] No se registra prompt completo.
[ ] No se registra chain-of-thought.
[ ] Se mide LLM.
[ ] Se mide coste.
[ ] Se mide calidad.
[ ] Se mide seguridad.
[ ] Existe sampling.
[ ] Existe buffer.
[ ] Existe retención.
[ ] Existen pruebas.

======================================================================
FIN DEL DOCUMENTO
======================================================================
