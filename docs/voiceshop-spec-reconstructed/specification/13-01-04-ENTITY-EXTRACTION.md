======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-01-04-ENTITY-EXTRACTION.md

# EXTRACCIÓN DE ENTIDADES

## 1. Objetivo

Este documento define cómo VoiceShop identifica, clasifica y representa
las entidades mencionadas por el Cliente.

Una entidad extraída es un candidato semántico.

No es todavía una referencia oficial del dominio.

Ejemplos:

- "seis" puede ser una cantidad candidata;
- "lager norte" puede ser una referencia candidata de producto;
- "mañana" puede ser una fecha candidata;
- "Concepción" puede ser una ciudad candidata;
- "$10.000" puede ser un importe candidato.

La extracción no debe:

- inventar Product ID;
- convertir una mención en un producto oficial sin resolución;
- aceptar precios escritos por el Cliente como precios del sistema;
- autorizar operaciones;
- modificar estado;
- ejecutar herramientas;
- completar información ausente sin marcar inferencia.

## 2. Alcance

Incluye:

- referencias de producto;
- cantidades;
- unidades;
- marcas;
- categorías;
- atributos;
- precios mencionados;
- monedas;
- fechas;
- horas;
- direcciones;
- comunas;
- ciudades;
- sucursales;
- medios de pago;
- números de pedido;
- referencias de carrito;
- preferencias;
- restricciones;
- confirmaciones;
- negaciones;
- personas y contactos cuando estén permitidos;
- entidades provenientes de voz;
- resolución preliminar;
- ambigüedad;
- confianza;
- procedencia;
- validación estructural.

No incluye:

- resolución final contra catálogo;
- geocodificación definitiva;
- autorización;
- verificación de stock;
- cálculo de precios;
- confirmación de pedidos;
- procesamiento de pagos;
- persistencia de secretos.

## 3. Principios

RULE-ENT-001

Toda entidad debe conservar su forma superficial.

RULE-ENT-002

Toda entidad debe conservar el rango dentro del texto cuando sea posible.

RULE-ENT-003

Toda entidad debe indicar su tipo.

RULE-ENT-004

Toda entidad debe indicar su procedencia.

RULE-ENT-005

Toda entidad probabilística debe indicar confianza.

RULE-ENT-006

Toda entidad inferida debe diferenciarse de una entidad explícita.

RULE-ENT-007

Toda referencia comercial debe resolverse contra una fuente oficial.

RULE-ENT-008

Una LLM no puede producir identificadores oficiales confiables.

RULE-ENT-009

Los valores enviados por el Cliente no sustituyen datos oficiales.

RULE-ENT-010

La extracción debe respetar negación y autocorrección.

RULE-ENT-011

La extracción no debe mezclar entidades de clientes distintos.

RULE-ENT-012

La extracción debe ser reproducible mediante versión.

RULE-ENT-013

Una entidad ambigua no debe ejecutarse como si estuviera resuelta.

RULE-ENT-014

Los datos sensibles deben clasificarse.

RULE-ENT-015

La ausencia de entidad no puede ocultarse con un valor inventado.

## 4. Tipos de entidad

### ENTITY-PRODUCT-REFERENCE

Referencia textual de producto.

Ejemplos:

- cerveza lager;
- Lager Norte;
- la botella azul;
- la misma de antes;
- pack de seis.

### ENTITY-PRODUCT-ID

Identificador oficial.

Sólo puede aparecer después de resolución autorizada.

No se acepta como oficial si lo produce la LLM sin validación.

### ENTITY-CATEGORY

Categoría comercial.

Ejemplos:

- cervezas;
- vinos;
- bebidas sin alcohol.

### ENTITY-BRAND

Marca.

### ENTITY-QUANTITY

Cantidad.

### ENTITY-UNIT

Unidad comercial o de medida.

### ENTITY-SIZE

Tamaño o presentación.

### ENTITY-MONEY-MENTION

Importe mencionado por el Cliente.

No constituye precio oficial.

### ENTITY-CURRENCY

Moneda candidata.

### ENTITY-DATE

Fecha.

### ENTITY-TIME

Hora.

### ENTITY-DATETIME-RANGE

Rango temporal.

### ENTITY-ADDRESS

Dirección.

### ENTITY-COMMUNE

Comuna.

### ENTITY-CITY

Ciudad.

### ENTITY-BRANCH-REFERENCE

Referencia de sucursal.

### ENTITY-ORDER-REFERENCE

Referencia de pedido.

### ENTITY-CART-REFERENCE

Referencia de carrito.

### ENTITY-PAYMENT-METHOD

Medio de pago.

### ENTITY-CONTACT

Dato de contacto.

### ENTITY-PREFERENCE

Preferencia.

Ejemplos:

- frío;
- sin azúcar;
- económico;
- premium.

### ENTITY-RESTRICTION

Restricción.

Ejemplos:

- sin alcohol;
- sin gluten;
- sin azúcar.

### ENTITY-CONFIRMATION

Señal afirmativa contextual.

### ENTITY-NEGATION

Señal negativa contextual.

### ENTITY-DELIVERY-INSTRUCTION

Instrucción de entrega.

### ENTITY-PROMOTION-REFERENCE

Referencia de promoción.

## 5. Contrato de entrada

```json
{
  "input_id": "UUID",
  "turn_id": "UUID",
  "session_id": "UUID",
  "tenant_id": "UUID",
  "normalized_text": "agrega seis lager norte de 330 ml",
  "search_text": "agrega seis lager norte de 330 ml",
  "language": "es-CL",
  "intent_candidate": {
    "intent_id": "INTENT-CART-002",
    "name": "ADD_PRODUCT"
  },
  "context": {
    "last_product_reference": null,
    "pending_slots": [],
    "session_state": "ACTIVE"
  }
}
```

## 6. Contrato de salida

```json
{
  "entity_extraction_version": 1,
  "entities": [
    {
      "entity_id": "UUID",
      "type": "ENTITY-QUANTITY",
      "surface": "seis",
      "normalized_value": 6,
      "start": 7,
      "end": 11,
      "confidence": 1.0,
      "source": "DETERMINISTIC",
      "explicit": true,
      "negated": false,
      "ambiguous": false
    },
    {
      "entity_id": "UUID",
      "type": "ENTITY-PRODUCT-REFERENCE",
      "surface": "lager norte",
      "normalized_value": "lager norte",
      "start": 12,
      "end": 23,
      "confidence": 0.95,
      "source": "HYBRID",
      "explicit": true,
      "negated": false,
      "ambiguous": false
    },
    {
      "entity_id": "UUID",
      "type": "ENTITY-SIZE",
      "surface": "330 ml",
      "normalized_value": {
        "value": 330,
        "unit": "ML"
      },
      "start": 27,
      "end": 33,
      "confidence": 1.0,
      "source": "DETERMINISTIC",
      "explicit": true,
      "negated": false,
      "ambiguous": false
    }
  ],
  "unresolved_references": [],
  "sensitive_data_detected": false,
  "requires_resolution": true
}
```

## 7. Fuentes de extracción

### DETERMINISTIC

Expresiones regulares, diccionarios, parsers y reglas.

Adecuado para:

- números;
- unidades;
- fechas estructuradas;
- IDs con formato;
- correos;
- teléfonos;
- códigos.

### DOMAIN_LEXICON

Diccionario del tenant.

Adecuado para:

- categorías;
- marcas;
- aliases de productos;
- sucursales;
- medios de pago.

### CLASSIFIER

Modelo especializado.

### LLM_STRUCTURED

LLM con salida estructurada.

### CONTEXTUAL

Entidad recuperada del contexto.

Debe marcarse como:

explicit = false

source = CONTEXT

### HYBRID

Combinación de fuentes.

## 8. Precedencia de fuentes

Orden recomendado:

1. identificadores firmados o resueltos oficialmente;
2. parser determinístico;
3. diccionario del dominio;
4. contexto estructurado;
5. clasificador;
6. LLM estructurada.

Una fuente de menor autoridad no debe sobrescribir silenciosamente una
fuente superior.

## 9. Referencias de producto

Una referencia de producto puede contener:

- nombre;
- marca;
- categoría;
- presentación;
- tamaño;
- envase;
- variante;
- sabor;
- color;
- temperatura;
- promoción;
- pronombre;
- posición dentro de una lista.

Ejemplos:

- "la lager norte";
- "la de 330";
- "la segunda";
- "esa misma";
- "la más barata";
- "la que está en oferta".

La extracción debe producir estructura candidata:

```json
{
  "type": "ENTITY-PRODUCT-REFERENCE",
  "surface": "la segunda",
  "reference_mode": "ORDINAL_SELECTION",
  "ordinal": 2,
  "requires_context": true
}
```

## 10. Resolución de producto

La extracción y la resolución son pasos distintos.

Extracción:

"lager norte"

Resolución:

Product ID = 8f...

La resolución debe:

1. consultar catálogo oficial;
2. aplicar tenant;
3. aplicar sucursal cuando corresponda;
4. aplicar estado activo;
5. aplicar atributos;
6. devolver cero, una o varias coincidencias;
7. registrar versión del catálogo.

Resultados:

- RESOLVED;
- AMBIGUOUS;
- NOT_FOUND;
- INACTIVE;
- FORBIDDEN;
- PROVIDER_UNAVAILABLE.

## 11. Cantidades

Las cantidades deben representarse mediante un objeto tipado.

```json
{
  "surface": "media docena",
  "candidate_value": 6,
  "unit": "UNIT",
  "confidence": 0.92,
  "requires_confirmation": false
}
```

Casos:

- seis;
- 6;
- media docena;
- un par;
- dos packs;
- tres cajas;
- 1,5 litros;
- seis botellas.

No asumir que:

"una cerveza"

equivale a:

una caja de cerveza.

La unidad comercial debe resolverse.

## 12. Cantidades ambiguas

Ejemplos:

- "un par";
- "varias";
- "unas pocas";
- "lo de siempre";
- "la mitad";
- "doble";
- "otra".

Estas expresiones deben marcarse como ambiguas o contextuales.

No deben convertirse silenciosamente en una cantidad.

## 13. Dinero

Toda cantidad monetaria mencionada debe marcarse como MONEY_MENTION.

Ejemplo:

"tengo diez mil pesos"

```json
{
  "amount": 10000,
  "currency_candidate": "CLP",
  "authority": "USER_MENTION",
  "official_price": false
}
```

No debe utilizarse para fijar:

- precio;
- total;
- descuento;
- límite autorizado;

sin una regla específica.

## 14. Fechas relativas

Ejemplos:

- hoy;
- mañana;
- pasado mañana;
- el viernes;
- la próxima semana;
- en dos horas.

Toda fecha relativa debe guardar:

- texto original;
- fecha base;
- zona horaria;
- interpretación candidata;
- ambigüedad;
- versión.

```json
{
  "surface": "mañana",
  "base_datetime": "2026-07-16T11:00:00-04:00",
  "timezone": "America/Santiago",
  "candidate_date": "2026-07-17",
  "ambiguous": false
}
```

## 15. Horas

Ejemplos:

- a las seis;
- 18:00;
- seis de la tarde;
- después de almuerzo.

Expresiones vagas deben requerir aclaración cuando afecten entrega o
reserva.

## 16. Direcciones

Una dirección puede incluir:

- calle;
- número;
- departamento;
- comuna;
- ciudad;
- referencia;
- coordenadas;
- instrucción de acceso.

La extracción no valida cobertura ni existencia.

Debe clasificar información sensible.

No enviar la dirección completa a una LLM cuando no sea necesario.

## 17. Referencias anafóricas

Ejemplos:

- esa;
- la misma;
- aquella;
- la anterior;
- agrégala;
- quítala;
- dame otra.

Para resolverlas se requiere contexto estructurado.

Debe conservarse:

- referencia textual;
- candidatos;
- fuente de contexto;
- confianza;
- turno de origen.

Una referencia no resuelta debe producir aclaración.

## 18. Negación

Toda entidad puede estar negada.

Ejemplo:

"sin alcohol"

Entidad:

RESTRICTION = ALCOHOL

negated = true o semantic_operator = EXCLUDE

Ejemplo:

"no quiero Lager Norte"

PRODUCT_REFERENCE = Lager Norte
semantic_operator = EXCLUDE

No eliminar la entidad.

## 19. Autocorrección

Ejemplo:

"agrega seis, no, cuatro lager"

Resultado esperado:

- Quantity 6 marcada como REVOKED;
- Quantity 4 marcada como ACTIVE.

Debe conservarse evidencia de autocorrección.

## 20. Múltiples entidades del mismo tipo

Ejemplo:

"agrega dos Lager Norte y tres Lager Sur"

Debe producir dos grupos de línea:

```json
{
  "groups": [
    {
      "product_reference": "Lager Norte",
      "quantity": 2
    },
    {
      "product_reference": "Lager Sur",
      "quantity": 3
    }
  ]
}
```

No debe producir:

- cantidad total 5 asociada a ambos productos;
- un solo producto combinado.

## 21. Agrupación semántica

La extracción debe soportar relaciones entre entidades.

Relaciones:

- QUANTITY_OF_PRODUCT;
- SIZE_OF_PRODUCT;
- BRAND_OF_PRODUCT;
- ATTRIBUTE_OF_PRODUCT;
- EXCLUDE_ATTRIBUTE;
- DELIVERY_TIME;
- ADDRESS_COMPONENT;
- ORDER_REFERENCE_OF_ACTION.

Ejemplo:

```json
{
  "relation": "QUANTITY_OF_PRODUCT",
  "source_entity_id": "quantity-1",
  "target_entity_id": "product-1",
  "confidence": 0.97
}
```

## 22. Datos sensibles

Clasificaciones:

- PII_CONTACT;
- PII_ADDRESS;
- PAYMENT_DATA;
- AUTH_CREDENTIAL;
- SECRET_LIKE;
- HEALTH_OR_SENSITIVE_NOTE;
- AGE_RELATED;
- LEGAL_IDENTIFIER.

La extracción debe señalizar.

No debe registrar el valor completo en métricas.

## 23. IDs externos

Un texto que parece UUID, Order ID o Product ID debe tratarse como
referencia candidata.

Debe validarse:

- formato;
- tenant;
- propiedad;
- autorización;
- existencia;
- estado.

No confiar únicamente en el formato.

## 24. Entidades provenientes de botones

Un botón firmado puede aportar una referencia oficial.

Ejemplo:

Product ID dentro de un token firmado.

Aun así debe validarse:

- firma;
- vigencia;
- tenant;
- versión del menú;
- estado del producto.

## 25. Entidades provenientes de voz

Debe considerarse:

- confianza por palabra;
- homófonos;
- marcas desconocidas;
- números confundidos;
- pérdida de puntuación;
- interrupciones;
- transcripción parcial.

Las entidades de una transcripción no final no deben ejecutar acciones.

## 26. Validación de esquema

VAL-ENT-001

Tipo permitido.

VAL-ENT-002

Rango válido.

VAL-ENT-003

Surface coincide con el rango cuando aplique.

VAL-ENT-004

Confidence entre 0 y 1.

VAL-ENT-005

Source permitida.

VAL-ENT-006

normalized_value compatible con el tipo.

VAL-ENT-007

No existen IDs oficiales no validados.

VAL-ENT-008

No existe información fuera del texto o contexto declarado sin marcar
inferencia.

VAL-ENT-009

Las relaciones apuntan a entidades existentes.

VAL-ENT-010

La clasificación sensible está presente cuando corresponde.

## 27. Flujo principal

1. Recibir intención candidata y texto normalizado.
2. Cargar diccionario del tenant.
3. Ejecutar parsers determinísticos.
4. detectar cantidades y unidades.
5. detectar fechas y horas.
6. detectar referencias estructuradas.
7. detectar marcas, categorías y aliases.
8. ejecutar modelo estructurado si es necesario.
9. combinar resultados.
10. resolver conflictos por precedencia.
11. detectar negación.
12. detectar autocorrección.
13. agrupar entidades.
14. detectar referencias contextuales.
15. clasificar datos sensibles.
16. validar esquema.
17. persistir extracción.
18. emitir EntitiesExtracted.
19. enviar a Slot Filling.

## 28. Pseudocódigo funcional

```text
function extract_entities(normalized_input, intent_result, context):

    deterministic = run_deterministic_parsers(normalized_input)
    domain_matches = match_domain_lexicon(
        normalized_input,
        tenant=context.tenant_id
    )
    contextual = resolve_contextual_references(
        normalized_input,
        context
    )

    probabilistic = []

    if requires_probabilistic_extraction(
        intent_result,
        deterministic,
        domain_matches
    ):
        probabilistic = run_structured_entity_model(
            text=normalized_input.normalized_text,
            intent=intent_result,
            allowed_entity_types=entity_types_for_intent(intent_result)
        )

    merged = merge_entities_by_precedence(
        deterministic,
        domain_matches,
        contextual,
        probabilistic
    )

    merged = detect_negation(merged, normalized_input)
    merged = detect_self_corrections(merged, normalized_input)
    relations = build_entity_relations(merged, intent_result)
    sensitivity = classify_sensitive_entities(merged)

    validate_entity_schema(merged, relations)

    result = EntityExtractionResult(
        entities=merged,
        relations=relations,
        sensitive_data=sensitivity,
        version=current_version
    )

    persist_result_and_event(result, EntitiesExtracted)
    return result
```

## 29. Errores

ENTITY_SCHEMA_INVALID

ENTITY_TYPE_UNSUPPORTED

ENTITY_RANGE_INVALID

ENTITY_VALUE_INVALID

ENTITY_RELATION_INVALID

ENTITY_REFERENCE_AMBIGUOUS

ENTITY_REFERENCE_NOT_FOUND

ENTITY_CONTEXT_MISSING

ENTITY_MODEL_TIMEOUT

ENTITY_MODEL_UNAVAILABLE

ENTITY_LEXICON_UNAVAILABLE

ENTITY_SENSITIVE_DATA_POLICY_VIOLATION

ENTITY_VOICE_TRANSCRIPT_NOT_FINAL

## 30. Eventos

EntityExtractionStarted

EntitiesExtracted

EntityAmbiguityDetected

EntityResolutionRequired

SensitiveEntityDetected

ContextualReferenceResolved

ContextualReferenceUnresolved

SelfCorrectionDetected

EntityExtractionFailed

## 31. Observabilidad

Métricas:

- entity_extraction_total;
- entities_extracted_total;
- entity_ambiguity_total;
- contextual_reference_total;
- unresolved_reference_total;
- sensitive_entity_total;
- entity_extraction_duration_seconds;
- entity_model_failure_total;
- entity_resolution_total.

Dimensiones:

- entity_type;
- source;
- intent_name;
- result;
- extraction_version;
- locale.

## 32. Auditoría

Para operaciones sensibles:

- Detection ID;
- Entity Extraction ID;
- tipos de entidad;
- fuentes;
- referencias resueltas;
- ambigüedad;
- clasificación sensible;
- Correlation ID.

No registrar direcciones o contactos completos en logs generales.

## 33. Casos límite

- dos productos con una cantidad;
- dos cantidades con un producto;
- "dos packs de seis";
- "la segunda";
- "esa misma";
- "no la lager";
- "seis, no cuatro";
- "mañana a las seis";
- "viernes" sin especificar cuál;
- "$10.000" como presupuesto;
- UUID de otro tenant;
- Order ID inexistente;
- marca que parece categoría;
- producto con número en nombre;
- nombre comercial con unidad;
- dirección con número y departamento;
- emoji como producto;
- voz con homófono;
- texto con dos idiomas;
- entidad inventada por la LLM;
- Product ID producido por la LLM;
- transcripción parcial;
- entidad fuera de rango;
- entidad sensible;
- botón firmado pero expirado.

## 34. Criterios de aceptación

AC-ENT-001

Toda entidad conserva surface.

AC-ENT-002

Toda entidad tiene tipo.

AC-ENT-003

Toda entidad tiene source.

AC-ENT-004

Toda entidad probabilística tiene confianza.

AC-ENT-005

Una referencia comercial se resuelve oficialmente.

AC-ENT-006

Un ID de LLM no se acepta como oficial.

AC-ENT-007

La negación se conserva.

AC-ENT-008

La autocorrección se conserva.

AC-ENT-009

Las múltiples líneas se agrupan correctamente.

AC-ENT-010

Las referencias contextuales indican origen.

AC-ENT-011

La ambigüedad provoca aclaración.

AC-ENT-012

Los datos sensibles se clasifican.

AC-ENT-013

Las fechas relativas incluyen base y zona horaria.

AC-ENT-014

El dinero mencionado no se considera precio oficial.

AC-ENT-015

Una transcripción no final no ejecuta acciones.

## 35. Plan mínimo de pruebas

TEST-ENT-001 a TEST-ENT-005

Cantidades numéricas, textuales, compuestas, ambiguas y negativas.

TEST-ENT-006 a TEST-ENT-010

Productos, marcas, categorías, tamaños y presentaciones.

TEST-ENT-011 a TEST-ENT-015

Fechas, horas, rangos, zonas horarias y expresiones vagas.

TEST-ENT-016 a TEST-ENT-020

Direcciones, comunas, ciudades, sucursales y referencias.

TEST-ENT-021 a TEST-ENT-025

Pronombres, ordinales, contexto, ambigüedad y ausencia de contexto.

TEST-ENT-026 a TEST-ENT-030

Negación, exclusión, autocorrección, múltiples líneas y relaciones.

TEST-ENT-031 a TEST-ENT-035

Dinero, moneda, precio mencionado, presupuesto y descuento mencionado.

TEST-ENT-036 a TEST-ENT-040

IDs externos, tenant mismatch, inexistentes, expirados y no autorizados.

TEST-ENT-041 a TEST-ENT-045

Voz parcial, voz final, homófonos, confianza baja e interrupción.

TEST-ENT-046 a TEST-ENT-050

PII, logs, métricas, auditoría y retención.

## 36. Checklist

[ ] Se conserva surface.
[ ] Se conserva rango.
[ ] Existe tipo.
[ ] Existe source.
[ ] Existe confianza.
[ ] Se diferencia explícita/inferida.
[ ] Se detecta negación.
[ ] Se detecta autocorrección.
[ ] Se agrupan entidades.
[ ] Se construyen relaciones.
[ ] Se resuelven referencias.
[ ] Se detecta ambigüedad.
[ ] Se clasifica sensibilidad.
[ ] Se valida tenant.
[ ] No se aceptan IDs inventados.
[ ] No se aceptan precios del Cliente.
[ ] No se ejecutan herramientas.
[ ] Se versiona.
[ ] Se persiste.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
