======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-01-03-INTENT-DETECTION.md

# DETECCIÓN DE INTENCIÓN

## 1. Objetivo

Este documento define cómo VoiceShop determina qué desea lograr el
Cliente a partir de una entrada normalizada y del contexto autorizado.

La detección de intención produce una propuesta estructurada.

No ejecuta la operación.

No autoriza la operación.

No convierte una predicción de una LLM en una decisión comercial.

## 2. Alcance

Incluye:

- catálogo de intenciones;
- clasificación determinística;
- clasificación mediante modelo;
- umbrales de confianza;
- detección de múltiples intenciones;
- negación;
- cambio de intención;
- intención pendiente;
- fallback;
- aclaración;
- derivación humana;
- validación de salida;
- versión del clasificador;
- observabilidad;
- QA.

No incluye:

- resolución completa de entidades;
- ejecución de herramientas;
- modificación de estado;
- aplicación de precios;
- autorización;
- generación final de respuesta.

## 3. Principios

RULE-INTENT-001

Toda intención debe existir en un catálogo versionado.

RULE-INTENT-002

Una intención desconocida no puede transformarse en una acción
privilegiada.

RULE-INTENT-003

La confianza es una señal, no una autorización.

RULE-INTENT-004

Las intenciones irreversibles requieren confirmación explícita.

RULE-INTENT-005

Una LLM sólo propone intención y argumentos candidatos.

RULE-INTENT-006

La salida debe cumplir un esquema estricto.

RULE-INTENT-007

Una salida fuera de esquema se rechaza.

RULE-INTENT-008

La ausencia de confianza suficiente provoca aclaración o fallback.

RULE-INTENT-009

La detección debe considerar negación.

RULE-INTENT-010

La detección debe considerar el control humano.

RULE-INTENT-011

Una sesión bajo HUMAN_ACTIVE no debe iniciar automatizaciones
incompatibles.

RULE-INTENT-012

El contexto utilizado debe ser mínimo y pertinente.

RULE-INTENT-013

No debe enviarse toda la conversación por defecto.

RULE-INTENT-014

La intención seleccionada debe ser compatible con el estado actual.

RULE-INTENT-015

La intención no sustituye la autorización.

## 4. Catálogo inicial de intenciones

### INTENT-GENERAL-001 GREETING

Saludo.

Ejemplos:

- hola;
- buenos días;
- buenas.

No requiere herramienta.

### INTENT-GENERAL-002 GOODBYE

Cierre conversacional.

Puede sugerir CloseSession, pero no cerrar silenciosamente si existen
operaciones pendientes.

### INTENT-GENERAL-003 HELP

Solicita ayuda sobre capacidades.

### INTENT-GENERAL-004 HUMAN_REQUEST

Solicita atención humana.

### INTENT-CATALOG-001 SEARCH_PRODUCTS

Buscar productos.

### INTENT-CATALOG-002 GET_PRODUCT_DETAILS

Consultar información de un producto.

### INTENT-CATALOG-003 GET_PRICE

Consultar precio vigente.

### INTENT-INVENTORY-001 GET_AVAILABILITY

Consultar disponibilidad.

### INTENT-PROMOTION-001 GET_PROMOTIONS

Consultar promociones.

### INTENT-CART-001 CREATE_CART

Crear carrito explícitamente.

### INTENT-CART-002 ADD_PRODUCT

Agregar producto.

### INTENT-CART-003 CHANGE_QUANTITY

Cambiar cantidad.

### INTENT-CART-004 REMOVE_PRODUCT

Eliminar producto.

### INTENT-CART-005 VIEW_CART

Ver carrito y total.

### INTENT-CHECKOUT-001 START_CHECKOUT

Iniciar checkout.

### INTENT-ORDER-001 CREATE_ORDER

Crear pedido desde carrito.

### INTENT-ORDER-002 CONFIRM_ORDER

Confirmar pedido.

Requiere confirmación explícita y validaciones adicionales.

### INTENT-ORDER-003 CANCEL_ORDER

Cancelar pedido.

### INTENT-ORDER-004 GET_ORDER_STATUS

Consultar estado.

### INTENT-PAYMENT-001 START_PAYMENT

Iniciar pago.

### INTENT-PAYMENT-002 GET_PAYMENT_STATUS

Consultar estado de pago.

### INTENT-SESSION-001 RESUME_SESSION

Recuperar sesión.

### INTENT-SESSION-002 CLOSE_SESSION

Cerrar sesión.

### INTENT-UNKNOWN-001 UNKNOWN

No se pudo determinar intención.

### INTENT-UNSUPPORTED-001 UNSUPPORTED

La solicitud está fuera de las capacidades permitidas.

## 5. Metadatos de una intención

Cada intención debe declarar:

- Intent ID;
- nombre;
- versión;
- descripción;
- categoría;
- prioridad;
- estados de sesión permitidos;
- actores permitidos;
- requiere autenticación;
- requiere autorización;
- requiere confirmación;
- campos obligatorios;
- campos opcionales;
- caso de uso relacionado;
- comando candidato;
- riesgo;
- fallback;
- ejemplos positivos;
- ejemplos negativos;
- intenciones confundibles.

Ejemplo:

```yaml
intent_id: INTENT-CART-002
name: ADD_PRODUCT
version: 1
category: CART
allowed_session_states:
  - ACTIVE
  - VOICE_ACTIVE
allowed_control_states:
  - CONTROL_AUTOMATED
requires_authentication: false
requires_confirmation: false
required_slots:
  - product_reference
  - quantity
optional_slots:
  - branch_reference
use_case: UC-009
candidate_command: AddProductToCart
risk: MEDIUM
confusable_with:
  - SEARCH_PRODUCTS
  - CHANGE_QUANTITY
```

## 6. Contrato de entrada

```json
{
  "input_id": "UUID",
  "turn_id": "UUID",
  "session_id": "UUID",
  "tenant_id": "UUID",
  "normalization_version": 1,
  "normalized_text": "agrega seis cervezas lager",
  "search_text": "agrega seis cervezas lager",
  "language": "es-CL",
  "signals": {
    "possible_quantity_tokens": [
      "seis"
    ]
  },
  "context": {
    "session_state": "ACTIVE",
    "control_state": "CONTROL_AUTOMATED",
    "active_cart_id": "UUID_OR_NULL",
    "pending_intent": null,
    "recent_structured_summary": {}
  }
}
```

## 7. Contrato de salida

```json
{
  "intent_detection_version": 1,
  "primary_intent": {
    "intent_id": "INTENT-CART-002",
    "name": "ADD_PRODUCT",
    "confidence": 0.95
  },
  "secondary_intents": [],
  "arguments": {
    "product_reference": {
      "surface": "cervezas lager",
      "value": null
    },
    "quantity": {
      "surface": "seis",
      "candidate_value": 6
    }
  },
  "missing_fields": [],
  "requires_clarification": false,
  "requires_confirmation": false,
  "requires_authentication": false,
  "compatible_with_state": true,
  "classifier": {
    "strategy": "HYBRID",
    "model_reference": "PROVIDER_NEUTRAL",
    "prompt_version": 3,
    "catalog_version": 1
  }
}
```

## 8. Estrategias de detección

### 8.1 DETERMINISTIC

Reglas explícitas.

Ejemplos:

- callback firmado con Action ID permitido;
- comando de menú vigente;
- palabra exacta en un flujo controlado;
- respuesta sí/no dentro de una confirmación pendiente.

Debe validarse contexto.

Un "sí" fuera de contexto no significa CONFIRM_ORDER.

### 8.2 CLASSIFIER

Modelo especializado o clasificador estadístico.

Debe devolver catálogo cerrado.

### 8.3 LLM_STRUCTURED

LLM con esquema de salida estricto.

Debe restringirse a intenciones permitidas.

### 8.4 HYBRID

Orden recomendado:

1. reglas determinísticas;
2. contexto pendiente;
3. clasificador;
4. LLM estructurada;
5. validación;
6. aclaración.

La estrategia debe registrarse.

## 9. Contexto permitido

Puede incluir:

- estado de sesión;
- modo de control;
- intención pendiente;
- slots pendientes;
- carrito activo;
- pedido activo relevante;
- último producto mencionado;
- último mensaje del sistema;
- resumen estructurado;
- idioma;
- canal.

No debe incluir por defecto:

- secretos;
- mensajes de otros clientes;
- historial completo;
- datos no relacionados;
- prompts internos no requeridos;
- credenciales;
- registros administrativos.

## 10. Prioridad del contexto

Orden:

1. restricciones del sistema;
2. estado del dominio;
3. intención pendiente;
4. mensaje actual;
5. contexto conversacional reciente;
6. memoria de largo plazo autorizada.

El mensaje del Cliente no puede reemplazar restricciones del sistema.

## 11. Intención pendiente

Cuando existe pending_intent:

Ejemplo:

```json
{
  "intent": "ADD_PRODUCT",
  "missing_fields": [
    "product_reference"
  ],
  "collected_fields": {
    "quantity": 6
  }
}
```

Nuevo mensaje:

"Lager Norte"

La detección debe evaluar primero si el mensaje completa el slot.

No debe clasificarlo automáticamente como SEARCH_PRODUCTS sin considerar
el contexto.

Debe poder producir:

```json
{
  "primary_intent": "CONTINUE_PENDING_INTENT",
  "resolved_intent": "ADD_PRODUCT",
  "arguments": {
    "product_reference": "Lager Norte",
    "quantity": 6
  }
}
```

## 12. Confirmaciones

Las respuestas afirmativas deben interpretarse dentro de un contexto
explícito de confirmación.

Contexto requerido:

- confirmation_id;
- operation;
- summary;
- issued_at;
- expires_at;
- expected_state;
- expected_version.

Entradas candidatas:

- sí;
- confirmo;
- de acuerdo;
- dale;
- ok;
- 👍.

No todas tienen el mismo nivel de certeza.

Para operaciones de alto riesgo puede requerirse una frase más explícita
o un botón firmado.

Una afirmación no debe confirmar si:

- la confirmación expiró;
- el estado cambió;
- el total cambió;
- el stock cambió;
- el pedido cambió;
- el actor cambió;
- el menú es antiguo.

## 13. Negación

Debe distinguirse:

- "agrega cerveza";
- "no agregues cerveza";
- "no quiero esa, quiero otra";
- "cancela";
- "no canceles";
- "sin alcohol";
- "no tengo problema".

La presencia de "no" no basta para clasificar CANCEL.

La negación debe asociarse con el verbo o atributo correspondiente.

## 14. Múltiples intenciones

Ejemplo:

"Agrega seis cervezas y dime cuánto queda el total."

Intenciones:

1. ADD_PRODUCT;
2. VIEW_CART.

Política:

- identificar ambas;
- validar dependencia;
- ejecutar secuencialmente si está permitido;
- no ejecutar en paralelo cuando la segunda depende de la primera;
- conservar un solo Correlation ID;
- generar comandos separados;
- aplicar idempotencia por operación.

Ejemplo no permitido:

"Cancela el pedido y cóbrame de nuevo."

Debe dividirse y validar el conflicto.

## 15. Cambio de intención

Ejemplo:

Cliente:

"Agrega seis cervezas."

Sistema:

"¿Qué marca?"

Cliente:

"Mejor no, muéstrame las promociones."

La nueva entrada contiene cancelación de la intención pendiente y una
nueva intención.

Salida esperada:

- pending_intent_cancelled = true;
- primary_intent = GET_PROMOTIONS.

No debe forzar la respuesta a product_reference.

## 16. Umbrales de confianza

Los umbrales deben configurarse por riesgo.

Ejemplo inicial:

LOW_RISK_READ:

- auto route >= 0.70;
- clarify entre 0.45 y 0.70;
- unknown < 0.45.

MEDIUM_RISK_WRITE:

- auto route >= 0.85;
- clarify entre 0.60 y 0.85;
- unknown < 0.60.

HIGH_RISK:

- la confianza no sustituye confirmación;
- requiere contexto, autenticación o confirmación explícita.

La confianza del proveedor no debe aceptarse sin calibración interna.

## 17. Validación de salida

VAL-INTENT-001

La intención existe en el catálogo.

VAL-INTENT-002

La versión está soportada.

VAL-INTENT-003

La intención está permitida para el tenant.

VAL-INTENT-004

La intención es compatible con session_state.

VAL-INTENT-005

La intención es compatible con control_state.

VAL-INTENT-006

El actor puede solicitarla.

VAL-INTENT-007

Los argumentos cumplen tipos.

VAL-INTENT-008

No existen campos adicionales prohibidos.

VAL-INTENT-009

La confianza está en rango.

VAL-INTENT-010

Los campos obligatorios están presentes o declarados como faltantes.

VAL-INTENT-011

La salida no contiene Command ID confiable generado por la LLM.

VAL-INTENT-012

La salida no contiene roles o permisos aceptados como autoridad.

VAL-INTENT-013

La salida no contiene precios oficiales inventados.

VAL-INTENT-014

La salida no fuerza un estado destino.

## 18. Compatibilidad con FSM

Ejemplos:

Session = CLOSED

Cualquier intención conversacional de escritura:

rechazar o crear nueva sesión conforme a política.

Control = CONTROL_HUMAN

ADD_PRODUCT automático:

no ejecutar.

Cart = CLOSED

ADD_PRODUCT:

rechazar o crear nuevo carrito con confirmación conforme a política.

Order = CANCELLED

CONFIRM_ORDER:

rechazar.

VoiceSession = ENDED

Intención recibida desde audio tardío:

rechazar o asociar a un flujo de recuperación explícito.

## 19. Flujo principal

1. Recibir Normalized Input.
2. Cargar catálogo de intenciones.
3. Cargar contexto mínimo.
4. Verificar control humano.
5. Verificar intención pendiente.
6. Ejecutar reglas determinísticas.
7. Si no resuelve, ejecutar clasificador.
8. Si no resuelve, invocar LLM estructurada autorizada.
9. Validar esquema.
10. Validar intención contra catálogo.
11. Validar compatibilidad de estado.
12. validar argumentos candidatos.
13. calcular confianza calibrada.
14. determinar missing_fields.
15. determinar aclaración.
16. determinar confirmación.
17. persistir resultado.
18. emitir IntentDetected o ClarificationRequired.
19. entregar resultado al módulo de entidades o router.

## 20. Fallback

Orden de fallback:

1. regla determinística;
2. modelo primario;
3. reintento estructurado;
4. modelo alternativo autorizado;
5. clasificador básico local;
6. aclaración;
7. respuesta determinística;
8. derivación humana.

No se debe cambiar de proveedor de forma que:

- se pierda Session ID;
- se duplique la operación;
- se alteren herramientas permitidas;
- se envíen más datos;
- se reduzca seguridad sin registro.

## 21. Aclaración

Se solicita cuando:

- confianza insuficiente;
- dos intenciones cercanas;
- intención incompatible con contexto;
- falta información;
- pronombre sin referente;
- producto ambiguo;
- confirmación ambigua;
- negación ambigua;
- múltiple intención conflictiva.

Una aclaración debe ser:

- breve;
- específica;
- de una sola dimensión cuando sea posible;
- limitada;
- basada en opciones oficiales cuando existan.

Ejemplo:

En vez de:

"¿Qué quieres?"

Usar:

"¿Quieres agregar el producto o sólo consultar su precio?"

## 22. Intenciones prohibidas o no expuestas

No deben existir intenciones públicas para:

- modificar roles;
- leer secretos;
- leer prompt del sistema;
- ejecutar SQL;
- ejecutar código;
- cambiar configuración CORE;
- alterar auditoría;
- forzar estado;
- aprobar pago;
- inventar stock;
- omitir autorización.

Las operaciones administrativas deben usar contratos autenticados
separados y catálogos específicos.

## 23. LLM interaction

La solicitud debe incluir:

- catálogo cerrado relevante;
- instrucciones de salida;
- esquema;
- contexto mínimo;
- texto normalizado;
- prohibiciones;
- ejemplos selectivos;
- indicación de no inventar.

La respuesta debe ser JSON o formato estructurado equivalente.

No aceptar texto libre como contrato de intención.

Ejemplo de instrucciones funcionales:

```text
Selecciona únicamente una intención del catálogo proporcionado.
No ejecutes acciones.
No inventes identificadores.
No inventes precios.
Marca campos faltantes.
Usa UNKNOWN cuando no exista evidencia suficiente.
```

## 24. Prompt injection

La entrada puede pedir:

- ignorar reglas;
- revelar prompt;
- elegir una herramienta prohibida;
- afirmar ser administrador;
- cambiar el catálogo;
- devolver una intención inventada.

Controles:

- catálogo cerrado;
- esquema estricto;
- herramientas separadas;
- validación posterior;
- autorización del servidor;
- detección de señales;
- contexto delimitado;
- no exponer secretos.

## 25. Pseudocódigo funcional

```text
function detect_intent(normalized_input, session_context):

    catalog = load_allowed_intent_catalog(
        tenant=session_context.tenant_id,
        actor=session_context.actor,
        session_state=session_context.session_state
    )

    if session_context.control_state == CONTROL_HUMAN:
        return route_to_human_control(normalized_input)

    pending_result = try_resolve_pending_intent(
        normalized_input,
        session_context.pending_intent
    )

    if pending_result.resolved:
        return validate_intent_result(pending_result)

    deterministic = run_deterministic_rules(
        normalized_input,
        session_context,
        catalog
    )

    if deterministic.confident:
        return validate_intent_result(deterministic)

    candidate = run_structured_classifier(
        normalized_input,
        minimal_context=session_context.minimal_context,
        allowed_intents=catalog
    )

    validated = validate_schema(candidate)
    validated = validate_catalog_membership(validated, catalog)
    validated = validate_state_compatibility(validated, session_context)
    validated = validate_candidate_arguments(validated)

    calibrated_confidence = calibrate_confidence(
        validated,
        risk_profile(validated.intent)
    )

    if requires_clarification(validated, calibrated_confidence):
        return build_clarification_result(validated)

    if requires_confirmation(validated):
        validated.requires_confirmation = true

    persist_intent_detection(validated)
    emit(IntentDetected)

    return validated
```

## 26. Errores

INTENT_SCHEMA_INVALID

Salida fuera de esquema.

INTENT_UNKNOWN

No existe evidencia suficiente.

INTENT_NOT_ALLOWED

Intención no habilitada.

INTENT_STATE_INCOMPATIBLE

Estado incompatible.

INTENT_CONTROLLED_BY_HUMAN

La conversación está bajo control humano.

INTENT_CONFIDENCE_LOW

Confianza insuficiente.

INTENT_MULTIPLE_CONFLICT

Múltiples intenciones incompatibles.

INTENT_CATALOG_UNAVAILABLE

Catálogo no disponible.

INTENT_MODEL_UNAVAILABLE

Clasificador no disponible.

INTENT_MODEL_TIMEOUT

Timeout.

INTENT_ARGUMENT_INVALID

Argumento candidato inválido.

INTENT_CONFIRMATION_REQUIRED

Se requiere confirmación.

INTENT_AUTHENTICATION_REQUIRED

Se requiere autenticación.

## 27. Eventos

IntentDetectionStarted

IntentDetected

MultipleIntentsDetected

IntentChanged

PendingIntentContinued

PendingIntentCancelled

IntentClarificationRequired

IntentRejected

IntentClassifierFailed

IntentFallbackActivated

IntentHumanHandoffRequired

Payload de IntentDetected:

```json
{
  "event_id": "UUID",
  "event_version": 1,
  "turn_id": "UUID",
  "session_id": "UUID",
  "intent_id": "INTENT-CART-002",
  "confidence_band": "HIGH",
  "strategy": "HYBRID",
  "catalog_version": 1,
  "classifier_version": 4,
  "requires_clarification": false,
  "requires_confirmation": false,
  "correlation_id": "UUID"
}
```

No incluir el texto completo en el evento salvo necesidad formal.

## 28. Persistencia

Conservar:

- Detection ID;
- Input ID;
- Turn ID;
- Session ID;
- catálogo y versión;
- clasificador y versión;
- estrategia;
- primary_intent;
- secondary_intents;
- argumentos candidatos;
- missing_fields;
- confianza;
- decisión;
- estado de sesión;
- control state;
- prompt version cuando aplique;
- proveedor lógico;
- latencia;
- error;
- timestamps.

## 29. Observabilidad

Métricas:

- intent_detection_total;
- intent_detected_total;
- intent_unknown_total;
- intent_clarification_total;
- intent_fallback_total;
- intent_model_failure_total;
- intent_detection_duration_seconds;
- intent_confidence_distribution;
- intent_state_incompatible_total;
- pending_intent_completion_total;
- intent_change_total;
- human_handoff_from_intent_total.

Dimensiones:

- intent_name;
- strategy;
- classifier_version;
- catalog_version;
- result;
- risk_level;
- channel;
- locale.

Evitar texto y IDs de alta cardinalidad.

## 30. Auditoría

Para acciones sensibles registrar:

- Detection ID;
- actor;
- intención;
- confianza;
- estrategia;
- estado;
- confirmación requerida;
- autenticación requerida;
- resultado;
- Correlation ID.

No registrar razonamiento privado del modelo.

Se puede registrar una explicación resumida estructurada, por ejemplo:

```json
{
  "signals": [
    "EXPLICIT_VERB_ADD",
    "QUANTITY_PRESENT",
    "PRODUCT_REFERENCE_PRESENT"
  ]
}
```

## 31. Casos límite

- "sí" sin pregunta previa;
- "no" como nombre de producto;
- "cancela" durante una aclaración;
- "mejor no" seguido de nueva intención;
- dos intenciones dependientes;
- dos intenciones conflictivas;
- pronombre "esa";
- producto mencionado hace varios turnos;
- control humano activo;
- botón viejo con intención explícita;
- LLM devuelve intención no catalogada;
- LLM devuelve confianza 1.5;
- LLM agrega precio;
- LLM agrega actor_id;
- intención válida en estado inválido;
- intención de lectura con stock caído;
- confirmación después de cambio de total;
- 👍 como respuesta;
- mensaje en varios idiomas;
- sarcasmo;
- transcripción incompleta;
- mensaje duplicado;
- timeout del clasificador;
- fallback produce resultado diferente;
- intención pendiente expirada.

## 32. Criterios de aceptación

AC-INTENT-001

Toda intención pertenece al catálogo.

AC-INTENT-002

La salida cumple esquema.

AC-INTENT-003

La confianza no autoriza.

AC-INTENT-004

Una intención incompatible con estado no se ejecuta.

AC-INTENT-005

Control humano bloquea automatizaciones incompatibles.

AC-INTENT-006

La LLM no genera IDs confiables.

AC-INTENT-007

La LLM no genera precios oficiales.

AC-INTENT-008

Las confirmaciones dependen de contexto vigente.

AC-INTENT-009

La negación se conserva.

AC-INTENT-010

Un cambio de intención cancela la intención pendiente cuando
corresponda.

AC-INTENT-011

Las múltiples intenciones se ordenan por dependencia.

AC-INTENT-012

El fallback no duplica acciones.

AC-INTENT-013

La detección puede funcionar sin un proveedor específico.

AC-INTENT-014

Toda decisión se versiona.

AC-INTENT-015

Las intenciones de alto riesgo requieren controles adicionales.

## 33. Plan mínimo de pruebas

TEST-INTENT-001

Greeting.

TEST-INTENT-002

SearchProducts.

TEST-INTENT-003

GetPrice.

TEST-INTENT-004

AddProduct con cantidad.

TEST-INTENT-005

AddProduct sin producto.

TEST-INTENT-006

ChangeQuantity.

TEST-INTENT-007

RemoveProduct.

TEST-INTENT-008

ConfirmOrder explícito.

TEST-INTENT-009

"Sí" sin contexto.

TEST-INTENT-010

Negación.

TEST-INTENT-011

Cambio de intención.

TEST-INTENT-012

Continuación de slot.

TEST-INTENT-013

Múltiples intenciones dependientes.

TEST-INTENT-014

Múltiples intenciones conflictivas.

TEST-INTENT-015

Intención desconocida.

TEST-INTENT-016

Intención no permitida.

TEST-INTENT-017

Estado incompatible.

TEST-INTENT-018

Control humano.

TEST-INTENT-019

Salida LLM inválida.

TEST-INTENT-020

Intención inventada por LLM.

TEST-INTENT-021

Confianza fuera de rango.

TEST-INTENT-022

Precio inventado.

TEST-INTENT-023

Actor ID inventado.

TEST-INTENT-024

Timeout y fallback.

TEST-INTENT-025

Modelo alternativo.

TEST-INTENT-026

Catálogo por tenant.

TEST-INTENT-027

Confirmación expirada.

TEST-INTENT-028

Confirmación con versión antigua.

TEST-INTENT-029

Emoji afirmativo.

TEST-INTENT-030

Prompt injection.

TEST-INTENT-031

Calibración por riesgo.

TEST-INTENT-032

Métricas y auditoría.

## 34. Checklist

[ ] Existe catálogo versionado.
[ ] Existe esquema estricto.
[ ] Se carga contexto mínimo.
[ ] Se verifica control humano.
[ ] Se verifica pending_intent.
[ ] Se evalúan reglas determinísticas.
[ ] Se valida salida del modelo.
[ ] Se valida catálogo.
[ ] Se valida estado.
[ ] Se valida actor.
[ ] Se validan argumentos.
[ ] Se calibra confianza.
[ ] Se detectan campos faltantes.
[ ] Se exige confirmación.
[ ] Se exige autenticación.
[ ] Se maneja negación.
[ ] Se manejan múltiples intenciones.
[ ] Se maneja cambio de intención.
[ ] Se maneja fallback.
[ ] Se versiona el resultado.
[ ] Se persiste evidencia.
[ ] No se ejecuta negocio.
[ ] No se autorizan operaciones.
[ ] No se aceptan precios inventados.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
