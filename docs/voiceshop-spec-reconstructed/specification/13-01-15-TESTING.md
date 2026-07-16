======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-01-15-TESTING.md

# TESTING DEL MOTOR CONVERSACIONAL

## 1. Objetivo

Este documento define la estrategia de pruebas del motor conversacional
de VoiceShop.

El objetivo es verificar:

- correctitud;
- seguridad;
- determinismo;
- trazabilidad;
- resiliencia;
- independencia del proveedor;
- privacidad;
- idempotencia;
- concurrencia;
- comportamiento conversacional.

## 2. Alcance

Incluye pruebas de:

- recepción;
- normalización;
- intención;
- entidades;
- slots;
- contexto;
- prompts;
- herramientas;
- LLM;
- respuestas;
- aclaraciones;
- guardrails;
- memoria;
- observabilidad;
- integración;
- rendimiento;
- adversarial;
- regresión;
- canary.

## 3. Principios

RULE-TEST-CONV-001

Todo requisito funcional debe mapearse a pruebas.

RULE-TEST-CONV-002

Toda regla debe poseer prueba positiva y negativa.

RULE-TEST-CONV-003

Toda FSM debe probar transiciones permitidas y prohibidas.

RULE-TEST-CONV-004

Toda salida de LLM debe probarse con schema inválido.

RULE-TEST-CONV-005

Toda herramienta debe probar autorización.

RULE-TEST-CONV-006

Toda escritura debe probar idempotencia.

RULE-TEST-CONV-007

Toda operación concurrente debe probar conflictos.

RULE-TEST-CONV-008

Toda dependencia externa debe probar timeout.

RULE-TEST-CONV-009

Todo guardrail debe probar ataques.

RULE-TEST-CONV-010

Toda prueba debe ser reproducible.

RULE-TEST-CONV-011

Los datasets deben versionarse.

RULE-TEST-CONV-012

Los resultados deben conservar evidencia.

RULE-TEST-CONV-013

Los tests no deben usar secretos reales.

RULE-TEST-CONV-014

Las pruebas de proveedor deben ejecutarse contra contratos.

RULE-TEST-CONV-015

Un modelo nuevo requiere evaluación antes de producción.

## 4. Pirámide de pruebas

### UNIT

- parsers;
- validadores;
- FSM;
- policies;
- schemas;
- normalización;
- redacción;
- mapping.

### COMPONENT

- Intent Module;
- Entity Extraction;
- Slot Filling;
- Prompt Builder;
- Tool Selection;
- Response Generator;
- Memory.

### CONTRACT

- LLM adapters;
- canales;
- catálogos;
- repositorios;
- eventos;
- herramientas.

### INTEGRATION

- pipeline completo;
- persistencia;
- outbox;
- caché;
- provider stub.

### END-TO-END

- texto;
- voz;
- carrito;
- pedido;
- handoff.

### ADVERSARIAL

- prompt injection;
- tool injection;
- data leakage;
- cross-tenant;
- memory poisoning.

## 5. Identificadores

Formato:

TEST-CONV-<ÁREA>-<NÚMERO>

Ejemplos:

TEST-CONV-RECV-001

TEST-CONV-INTENT-014

TEST-CONV-GUARD-023

## 6. Estructura de caso

```yaml
test_id: TEST-CONV-INTENT-001
title: Detectar ADD_PRODUCT
requirement:
  - FR-018
rules:
  - RULE-INTENT-001
given:
  session_state: ACTIVE
  input: "agrega seis lager norte"
when:
  action: detect_intent
then:
  intent: ADD_PRODUCT
  requires_clarification: false
  command_executed: false
evidence:
  - structured_result
  - trace
```

## 7. Datasets

Datasets mínimos:

- intent-golden;
- entity-golden;
- slot-golden;
- normalization-edge;
- prompt-injection;
- tool-security;
- response-factuality;
- memory-poisoning;
- multilingual;
- voice-transcript;
- Chilean-retail-domain.

Cada dataset debe tener:

- versión;
- licencia;
- origen;
- clasificación;
- expected output;
- dificultad;
- idioma;
- tags;
- fecha.

## 8. Golden tests

Las pruebas golden comparan:

- estructura;
- intención;
- entidades;
- slots;
- facts;
- herramientas;
- errores.

No deben depender de texto exacto cuando existen múltiples respuestas
válidas.

Para respuesta natural se validan:

- facts;
- prohibiciones;
- tono;
- longitud;
- idioma;
- seguridad.

## 9. Pruebas de recepción

- mensaje válido;
- vacío;
- grande;
- Unicode;
- duplicado;
- processing;
- conflicto idempotencia;
- firma;
- replay;
- tenant;
- sesión;
- rate limit;
- menú;
- botón expirado;
- ACK perdido;
- concurrencia.

## 10. Pruebas de normalización

- NFKC;
- espacios;
- saltos;
- controles;
- zero-width;
- RTL;
- números;
- moneda;
- unidades;
- URLs;
- emails;
- teléfonos;
- emojis;
- negación;
- autocorrección;
- prompt injection signal.

## 11. Pruebas de intención

- cada intención;
- unknown;
- unsupported;
- baja confianza;
- múltiples intenciones;
- cambio;
- pending intent;
- confirmación;
- negación;
- control humano;
- estado incompatible;
- salida inválida;
- fallback;
- modelo alternativo.

## 12. Pruebas de entidades

- producto;
- marca;
- categoría;
- cantidad;
- unidad;
- fecha;
- hora;
- dirección;
- Order ID;
- pronombre;
- ordinal;
- negación;
- corrección;
- múltiples líneas;
- PII;
- voz;
- ambigüedad.

## 13. Pruebas de slots

- faltante;
- default;
- corrección;
- expiración;
- confirmación;
- versión;
- dependencia;
- tenant;
- límite;
- cancelación;
- cambio de intención;
- datos sensibles.

## 14. Pruebas de contexto

- crear;
- actualizar;
- conflicto;
- reconstruir;
- caché perdida;
- lista;
- ordinal;
- control humano;
- voz;
- pending intent;
- tenant;
- PII;
- resumen;
- referencia obsoleta.

## 15. Pruebas de Prompt Builder

- plantilla;
- versión;
- jerarquía;
- separación;
- contexto mínimo;
- presupuesto;
- truncamiento;
- redacción;
- secretos;
- herramientas;
- schema;
- tenant;
- hash;
- caché.

## 16. Pruebas LLM

Con stub:

- success;
- timeout;
- rate limit;
- invalid JSON;
- schema invalid;
- tool invented;
- unsafe output;
- delayed response;
- streaming;
- cancellation;
- fallback.

Con proveedor real:

- contrato;
- latencia;
- coste;
- schema compliance;
- idioma;
- estabilidad;
- privacidad.

## 17. Pruebas de herramientas

- visible;
- oculta;
- versión;
- actor;
- estado;
- control;
- argumento prohibido;
- ID;
- autorización;
- confirmación;
- idempotencia;
- plan;
- dependencia.

## 18. Pruebas de respuesta

- plantilla;
- LLM;
- facts;
- precio;
- stock;
- pago;
- pedido;
- incertidumbre;
- error;
- canal;
- voz;
- interrupción;
- botones;
- PII;
- tenant;
- fallback.

## 19. Pruebas de aclaración

- intención;
- entidad;
- slot;
- confirmación;
- opciones;
- texto;
- expiración;
- contexto;
- cambio;
- corrección;
- límite;
- handoff;
- duplicado.

## 20. Pruebas de guardrails

- prompt injection;
- indirect injection;
- tool injection;
- secret extraction;
- role spoof;
- tenant;
- memory poisoning;
- context poisoning;
- Unicode;
- base64;
- HTML;
- denial of wallet;
- tool loops;
- facts;
- unsafe output.

## 21. Pruebas de memoria

- almacenar;
- no almacenar;
- autoridad;
- scope;
- expiración;
- revocación;
- eliminación;
- reconstrucción;
- poisoning;
- PII;
- preferencias;
- tenant;
- corrección;
- concurrencia.

## 22. Pruebas de observabilidad

- logs estructurados;
- redacción;
- métricas;
- cardinalidad;
- traces;
- sampling;
- backend caído;
- buffer;
- alertas;
- no chain-of-thought;
- retención.

## 23. Pruebas de idempotencia

Casos:

1. misma clave, mismo payload;
2. misma clave, distinto payload;
3. duplicado en processing;
4. duplicado completed;
5. resultado unknown;
6. reinicio;
7. dos workers;
8. ACK perdido.

## 24. Pruebas de concurrencia

- dos mensajes;
- dos cambios de contexto;
- dos aclaraciones;
- dos tool proposals;
- dos respuestas;
- handoff;
- carrito;
- confirmación;
- versiones.

## 25. Pruebas de resiliencia

Inyectar:

- caída LLM;
- caída caché;
- caída DB;
- latencia;
- pérdida de red;
- timeout;
- evento duplicado;
- evento tardío;
- outbox;
- reinicio;
- circuit breaker.

## 26. Pruebas de rendimiento

Medir:

- throughput;
- p50;
- p95;
- p99;
- first token;
- tiempo total;
- uso CPU;
- memoria;
- tokens;
- coste;
- cola;
- backpressure.

## 27. Pruebas de voz

- inicio;
- permisos;
- audio;
- transcripción;
- baja confianza;
- interrupción;
- reconexión;
- cierre;
- tool proposal;
- confirmación;
- latencia;
- eco;
- ruido;
- silencio;
- turn taking.

## 28. Pruebas multilingües

- español chileno;
- español neutro;
- inglés;
- mezcla;
- marcas;
- números;
- monedas;
- direcciones;
- voz;
- errores;
- tono.

## 29. Pruebas de regresión

Toda corrección debe agregar prueba.

El conjunto de regresión debe incluir:

- bugs;
- ataques;
- incidentes;
- cambios de prompt;
- cambios de modelo;
- cambios de catálogo;
- cambios de políticas.

## 30. Evaluación de modelos

Métricas:

- intent accuracy;
- macro F1;
- entity precision;
- entity recall;
- schema compliance;
- tool selection accuracy;
- critical error rate;
- hallucination rate;
- injection resistance;
- latency;
- cost.

Criterios de bloqueo:

- error crítico superior al umbral;
- regresión de seguridad;
- schema failure;
- fuga;
- tool misuse;
- aumento no aprobado de coste.

## 31. Pruebas de prompts

Cada Prompt Template debe tener:

- golden cases;
- negative cases;
- injection cases;
- schema cases;
- locale cases;
- length cases;
- context cases;
- version comparison.

## 32. Mocks y stubs

Deben existir:

- LLMStub;
- CatalogStub;
- InventoryStub;
- PaymentStub;
- IdentityStub;
- ClockStub;
- IDGeneratorStub;
- ChannelStub;
- VoiceStub.

Los stubs deben permitir:

- timeout;
- error;
- duplicado;
- respuesta inválida;
- latencia;
- orden.

## 33. Property-based testing

Aplicar a:

- normalización;
- parsers;
- schemas;
- idempotencia;
- FSM;
- redacción;
- serialización;
- Unicode.

Propiedades:

- no crash;
- determinismo;
- idempotencia;
- preservación de negación;
- límites;
- round-trip.

## 34. Mutation testing

Usar para verificar pruebas de:

- autorización;
- FSM;
- reglas;
- validadores;
- idempotencia;
- guardrails.

## 35. Evidencia

Cada ejecución debe conservar:

- versión;
- commit;
- dataset;
- configuración;
- modelo;
- prompt;
- resultado;
- métricas;
- fallos;
- artefactos.

No guardar secretos.

## 36. Entornos

LOCAL

Stubs.

CI

Stubs y servicios efímeros.

STAGING

Proveedores controlados.

CANARY

Tráfico limitado.

PRODUCTION SHADOW

Evaluación sin efectos.

No ejecutar escrituras reales en pruebas de modelo.

## 37. Shadow testing

Un modelo candidato recibe copia minimizada.

Su salida:

- no se muestra;
- no ejecuta;
- se compara;
- se registra.

Debe respetar privacidad.

## 38. Canary

Debe definir:

- porcentaje;
- cohort;
- rollback;
- métricas;
- duración;
- criterios;
- propietario.

## 39. Errores de test

TEST_DATASET_INVALID

TEST_EXPECTATION_INVALID

TEST_ENVIRONMENT_UNAVAILABLE

TEST_PROVIDER_UNAVAILABLE

TEST_NON_DETERMINISTIC_FAILURE

TEST_PRIVACY_VIOLATION

TEST_EVIDENCE_INCOMPLETE

TEST_THRESHOLD_FAILED

## 40. Criterios de aceptación

AC-TEST-CONV-001

Todo requisito tiene prueba.

AC-TEST-CONV-002

Toda regla tiene prueba negativa.

AC-TEST-CONV-003

Toda FSM prueba estados prohibidos.

AC-TEST-CONV-004

Toda herramienta prueba autorización.

AC-TEST-CONV-005

Toda escritura prueba idempotencia.

AC-TEST-CONV-006

Toda dependencia prueba timeout.

AC-TEST-CONV-007

Todo guardrail prueba ataques.

AC-TEST-CONV-008

Los datasets están versionados.

AC-TEST-CONV-009

La evidencia es reproducible.

AC-TEST-CONV-010

No se usan secretos reales.

AC-TEST-CONV-011

Los modelos se evalúan.

AC-TEST-CONV-012

Los prompts tienen regresión.

AC-TEST-CONV-013

Se prueba privacidad.

AC-TEST-CONV-014

Se prueba rendimiento.

AC-TEST-CONV-015

Se prueba recuperación.

## 41. Checklist

[ ] Matriz requisito-prueba.
[ ] Unit tests.
[ ] Component tests.
[ ] Contract tests.
[ ] Integration tests.
[ ] E2E tests.
[ ] Adversarial tests.
[ ] Performance tests.
[ ] Voice tests.
[ ] Privacy tests.
[ ] Idempotency tests.
[ ] Concurrency tests.
[ ] Recovery tests.
[ ] Prompt tests.
[ ] Model evaluation.
[ ] Datasets versionados.
[ ] Stubs.
[ ] Evidencia.
[ ] Canary.
[ ] Rollback.

======================================================================
FIN DEL DOCUMENTO
======================================================================
