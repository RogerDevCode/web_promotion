======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-01-10-RESPONSE-GENERATION.md

# GENERACIÓN DE RESPUESTAS

## 1. Objetivo

Este documento define cómo VoiceShop construye, valida y entrega una
respuesta conversacional basada exclusivamente en resultados oficiales,
estado vigente y políticas autorizadas.

La generación de respuesta no ejecuta reglas comerciales.

La generación de respuesta no modifica carrito, pedido, inventario,
pago, sesión o permisos.

Su función es transformar un resultado estructurado en una respuesta
comprensible, consistente, segura y adecuada al canal.

## 2. Alcance

Incluye:

- respuestas determinísticas;
- respuestas generadas por LLM;
- plantillas;
- adaptación al canal;
- adaptación a voz;
- explicaciones;
- mensajes de error;
- confirmaciones;
- resúmenes;
- listas;
- formatos;
- tono;
- idioma;
- consistencia factual;
- validación posterior;
- truncamiento;
- redacción;
- observabilidad;
- QA.

No incluye:

- ejecución de herramientas;
- autorización;
- cálculo de precios;
- consulta de stock;
- persistencia de pedidos;
- procesamiento de pagos;
- resolución de identidades.

## 3. Principios

RULE-RESP-001

Toda respuesta comercial debe basarse en datos oficiales.

RULE-RESP-002

La respuesta no debe inventar productos.

RULE-RESP-003

La respuesta no debe inventar precios.

RULE-RESP-004

La respuesta no debe inventar stock.

RULE-RESP-005

La respuesta no debe inventar promociones.

RULE-RESP-006

La respuesta no debe declarar pagos exitosos sin fuente oficial.

RULE-RESP-007

La respuesta no debe declarar pedidos confirmados sin evento oficial.

RULE-RESP-008

Toda incertidumbre debe expresarse.

RULE-RESP-009

Toda respuesta debe indicar limitaciones relevantes.

RULE-RESP-010

Toda respuesta debe respetar el idioma del Cliente o la política del
tenant.

RULE-RESP-011

Toda respuesta debe respetar las capacidades del canal.

RULE-RESP-012

Una respuesta de voz debe ser más breve que una respuesta textual cuando
sea posible.

RULE-RESP-013

Una respuesta interrumpida no se considera entregada completamente.

RULE-RESP-014

Una respuesta de error no debe revelar detalles internos.

RULE-RESP-015

Toda respuesta debe poder vincularse con su resultado estructurado.

## 4. Tipos de respuesta

### RESPONSE-INFORMATIONAL

Entrega información.

Ejemplo:

"El producto cuesta $1.200 CLP."

### RESPONSE-QUESTION

Solicita un dato.

### RESPONSE-CONFIRMATION

Solicita confirmación explícita.

### RESPONSE-SUCCESS

Comunica una operación completada.

### RESPONSE-PARTIAL-SUCCESS

Comunica resultado parcial.

### RESPONSE-ERROR

Comunica un error seguro.

### RESPONSE-DEGRADED

Comunica indisponibilidad parcial.

### RESPONSE-HUMAN-HANDOFF

Comunica derivación.

### RESPONSE-LIST

Presenta opciones.

### RESPONSE-STATUS

Presenta estado oficial.

### RESPONSE-SAFETY-REFUSAL

Rechaza una solicitud no permitida.

## 5. Contrato de entrada

```json
{
  "response_request_id": "UUID",
  "purpose": "CART_UPDATE",
  "session_id": "UUID",
  "turn_id": "UUID",
  "tenant_id": "UUID",
  "channel": "WEB",
  "locale": "es-CL",
  "tone_profile": "CORDIAL_BRIEF",
  "official_result": {
    "status": "COMPLETED",
    "operation": "ADD_PRODUCT",
    "data": {
      "product_name": "Lager Norte 330 ml",
      "quantity": 6,
      "cart_total": 7200,
      "currency": "CLP",
      "cart_version": 5
    }
  },
  "conversation_context_reference": "UUID",
  "response_policy_version": 3
}
```

## 6. Contrato de salida

```json
{
  "response_id": "UUID",
  "response_type": "RESPONSE-SUCCESS",
  "channel": "WEB",
  "language": "es-CL",
  "text": "Agregué 6 Lager Norte de 330 ml. El total del carrito es $7.200 CLP.",
  "structured_content": {
    "items": [],
    "actions": []
  },
  "facts_used": [
    {
      "path": "official_result.data.product_name",
      "value_hash": "HASH"
    },
    {
      "path": "official_result.data.cart_total",
      "value_hash": "HASH"
    }
  ],
  "uncertainties": [],
  "requires_follow_up": false,
  "safe_to_speak": true,
  "response_policy_version": 3
}
```

## 7. Fuentes de verdad

La respuesta puede utilizar:

- resultados del dominio;
- catálogo oficial;
- inventario oficial;
- motor de promociones;
- sistema de pedidos;
- pasarela de pago;
- sistema de entrega;
- configuración del tenant;
- estado de sesión.

La respuesta no puede tratar como verdad:

- afirmaciones del Cliente;
- texto de una LLM;
- datos de botones no verificados;
- precios del navegador;
- estados enviados por canales;
- resúmenes no validados.

## 8. Estrategias de generación

### DETERMINISTIC_TEMPLATE

Preferida para:

- errores;
- confirmaciones;
- estados;
- resultados críticos;
- respuestas cortas;
- pagos;
- pedidos.

### LLM_ASSISTED

Permitida para:

- reformulación;
- tono;
- explicación;
- resumen;
- lenguaje natural.

La LLM sólo recibe datos mínimos y no puede cambiar el significado.

### HYBRID

1. construir contenido estructurado;
2. generar texto;
3. validar;
4. aplicar plantilla segura si falla.

## 9. Contenido estructurado

Antes del texto debe existir una representación estructurada.

Ejemplo:

```json
{
  "message_kind": "CART_ITEM_ADDED",
  "facts": {
    "product_name": "Lager Norte 330 ml",
    "quantity": 6,
    "total": {
      "amount": 7200,
      "currency": "CLP"
    }
  },
  "required_disclosures": [],
  "forbidden_claims": [
    "PAYMENT_APPROVED",
    "ORDER_CONFIRMED"
  ]
}
```

## 10. Validación factual

Toda afirmación verificable debe mapearse con un hecho.

Validaciones:

- nombres;
- cantidades;
- precios;
- total;
- moneda;
- stock;
- promoción;
- estado;
- fecha;
- entrega;
- pago;
- pedido.

Si una frase no puede mapearse:

- eliminar;
- reformular;
- rechazar salida;
- usar plantilla.

## 11. Expresión de incertidumbre

Ejemplos correctos:

- "No pude verificar el stock."
- "La entrega es una estimación."
- "El pago aún está pendiente."
- "Necesito confirmar qué producto deseas."

Ejemplos incorrectos:

- "Seguro queda stock."
- "El pago probablemente pasó."
- "Debería llegar hoy."
- "Creo que confirmaste."

## 12. Formato de precios

Debe usar:

- moneda oficial;
- locale;
- precisión;
- separadores;
- impuestos si corresponde;
- indicador estimado o final.

Ejemplo es-CL:

$7.200 CLP

No debe cambiar el importe.

## 13. Listas de productos

Reglas:

- limitar elementos;
- incluir identificadores de interacción firmados;
- incluir nombre;
- presentación;
- precio cuando esté verificado;
- disponibilidad sólo cuando esté verificada;
- preservar orden;
- crear List ID y versión.

En voz:

- leer pocas opciones;
- ofrecer continuar;
- evitar listas extensas.

## 14. Confirmaciones

La respuesta debe resumir:

- operación;
- producto;
- cantidad;
- total;
- método;
- entrega;
- advertencias;
- expiración.

Ejemplo:

"Confirmas un pedido de 6 Lager Norte por un total de $7.200 CLP para retiro en la sucursal Centro. ¿Confirmas?"

La confirmación debe referenciar un Confirmation ID.

## 15. Errores

Un error debe incluir:

- mensaje para el Cliente;
- código interno separado;
- acción recomendada;
- reintento cuando sea seguro;
- derivación cuando corresponda.

Nunca incluir:

- stack trace;
- nombres de tablas;
- secretos;
- detalles de proveedor;
- consultas;
- rutas internas.

## 16. Adaptación por canal

### WEB

Puede incluir:

- texto;
- botones;
- listas;
- tarjetas;
- enlaces internos.

### TELEGRAM O MENSAJERÍA

Debe respetar:

- límite de longitud;
- formato;
- callbacks;
- versión del menú;
- edición de mensajes.

### VOICE

Debe:

- ser breve;
- evitar códigos largos;
- leer cantidades claramente;
- pausar;
- permitir interrupción;
- repetir confirmaciones críticas;
- evitar listas extensas.

### EMAIL

Sólo para flujos autorizados.

Debe ser más completo.

## 17. Longitud

Perfiles:

BRIEF

Una o dos frases.

STANDARD

Respuesta normal.

DETAILED

Explicación ampliada.

La longitud depende de:

- canal;
- complejidad;
- preferencia;
- riesgo;
- urgencia.

No sacrificar datos críticos por brevedad.

## 18. Tono

Perfiles:

- CORDIAL_BRIEF;
- PROFESSIONAL;
- FRIENDLY;
- APOLOGETIC;
- SAFETY_FIRM.

El tono no debe:

- manipular;
- presionar;
- ocultar costos;
- prometer;
- culpar al Cliente;
- minimizar un error.

## 19. Mensajes de éxito

Sólo usar cuando el comando está COMPLETED.

No usar "listo", "hecho" o "confirmado" para estados:

- PROCESSING;
- PENDING;
- UNKNOWN;
- REVIEW.

## 20. Resultados parciales

Ejemplo:

"Agregué 5 de las 6 unidades solicitadas" sólo si el dominio permite éxito parcial y produjo ese resultado.

Si la política no lo permite:

- no realizar cambios;
- informar stock insuficiente.

## 21. Validaciones de salida

VAL-RESP-001

Idioma válido.

VAL-RESP-002

Longitud válida.

VAL-RESP-003

No contiene secretos.

VAL-RESP-004

No contiene datos de otro Cliente.

VAL-RESP-005

Los hechos coinciden.

VAL-RESP-006

No contiene claims prohibidos.

VAL-RESP-007

Los enlaces son permitidos.

VAL-RESP-008

Los botones están firmados.

VAL-RESP-009

La respuesta es compatible con el canal.

VAL-RESP-010

Las incertidumbres están presentes.

VAL-RESP-011

Las confirmaciones incluyen versión.

VAL-RESP-012

La voz es segura para síntesis.

## 22. Flujo principal

1. Recibir resultado oficial.
2. clasificar tipo de respuesta.
3. construir contenido estructurado.
4. cargar política.
5. seleccionar estrategia.
6. construir texto.
7. validar hechos.
8. validar seguridad.
9. adaptar al canal.
10. crear acciones firmadas.
11. validar longitud.
12. persistir.
13. emitir ResponseGenerated.
14. entregar.
15. registrar entrega.

## 23. Pseudocódigo

```text
function generate_response(request):

    validate_official_result(request.official_result)
    response_type = classify_response_type(request)

    structured = build_structured_response(
        response_type,
        request.official_result,
        request.channel
    )

    if should_use_deterministic_template(response_type):
        text = render_template(structured, request.locale)
    else:
        draft = generate_llm_text(structured, request.tone_profile)
        text = validate_or_fallback(draft, structured)

    validate_factual_alignment(text, structured)
    validate_security(text)
    validate_channel_constraints(text, request.channel)

    actions = build_signed_actions_if_allowed(
        structured,
        request.session_id
    )

    response = assemble_response(
        text,
        structured,
        actions
    )

    persist_response(response)
    emit(ResponseGenerated)
    return response
```

## 24. Errores

RESPONSE_RESULT_INVALID

RESPONSE_POLICY_UNAVAILABLE

RESPONSE_TEMPLATE_NOT_FOUND

RESPONSE_GENERATION_FAILED

RESPONSE_FACT_MISMATCH

RESPONSE_UNSAFE

RESPONSE_TOO_LONG

RESPONSE_CHANNEL_UNSUPPORTED

RESPONSE_ACTION_SIGNING_FAILED

RESPONSE_LANGUAGE_UNSUPPORTED

RESPONSE_DELIVERY_FAILED

## 25. Eventos

ResponseGenerationStarted

ResponseGenerated

ResponseValidationFailed

ResponseFallbackUsed

ResponseDelivered

ResponseDeliveryFailed

ResponseInterrupted

ResponseExpired

## 26. Observabilidad

Métricas:

- responses_generated_total;
- response_generation_failure_total;
- response_fallback_total;
- response_fact_validation_failure_total;
- response_delivery_total;
- response_delivery_failure_total;
- response_length_chars;
- response_generation_duration_seconds;
- voice_response_interruption_total.

Dimensiones:

- response_type;
- channel;
- strategy;
- locale;
- result;
- error_code.

## 27. Auditoría

Registrar:

- Response ID;
- Result Reference;
- facts usados;
- plantilla;
- estrategia;
- política;
- canal;
- idioma;
- entrega;
- Correlation ID.

No registrar contenido sensible completo en logs generales.

## 28. Casos límite

- resultado oficial vacío;
- precio cambia antes de respuesta;
- stock expira;
- respuesta LLM inventa promoción;
- respuesta LLM altera cantidad;
- canal no soporta botones;
- lista demasiado larga;
- voz interrumpida;
- entrega falla;
- respuesta duplicada;
- sesión cerrada;
- control humano;
- datos de otro tenant;
- confirmación expirada;
- pago UNKNOWN;
- pedido REVIEW;
- error interno;
- lenguaje mixto;
- producto con nombre extraño;
- emojis;
- PII.

## 29. Criterios de aceptación

AC-RESP-001

Toda respuesta usa resultado oficial.

AC-RESP-002

Los claims se validan.

AC-RESP-003

Los errores son seguros.

AC-RESP-004

Las incertidumbres se expresan.

AC-RESP-005

Los pagos UNKNOWN no se anuncian como aprobados.

AC-RESP-006

Los pedidos PENDING no se anuncian como confirmados.

AC-RESP-007

Las acciones están firmadas.

AC-RESP-008

La voz es breve.

AC-RESP-009

La respuesta se adapta al canal.

AC-RESP-010

Existe fallback determinístico.

AC-RESP-011

Los datos de tenants no se mezclan.

AC-RESP-012

La respuesta es trazable.

AC-RESP-013

Una respuesta interrumpida no se marca completa.

AC-RESP-014

La LLM no cambia hechos.

AC-RESP-015

Las confirmaciones incluyen resumen y versión.

## 30. Plan mínimo de pruebas

- éxito;
- error;
- parcial;
- degradado;
- lista;
- confirmación;
- precio;
- stock;
- pago;
- pedido;
- tenant;
- PII;
- voz;
- interrupción;
- canal;
- fallback;
- facts mismatch;
- prompt injection;
- longitud;
- idioma;
- botones;
- expiración;
- entrega;
- duplicación;
- métricas;
- auditoría.

## 31. Checklist

[ ] Existe Response ID.
[ ] Existe tipo.
[ ] Existe resultado oficial.
[ ] Existe contenido estructurado.
[ ] Se valida factualidad.
[ ] Se expresa incertidumbre.
[ ] Se adapta al canal.
[ ] Se adapta a voz.
[ ] Se firman acciones.
[ ] Se validan botones.
[ ] Se limita longitud.
[ ] Se protege PII.
[ ] Existe fallback.
[ ] Se persiste.
[ ] Se emiten eventos.
[ ] Se registra entrega.
[ ] No se inventan datos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
