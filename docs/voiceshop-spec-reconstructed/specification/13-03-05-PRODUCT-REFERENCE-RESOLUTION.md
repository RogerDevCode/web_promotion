======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-03-05-PRODUCT-REFERENCE-RESOLUTION.md

# RESOLUCIÓN OFICIAL DE REFERENCIAS DE PRODUCTO

## 1. Objetivo

Este documento define cómo VoiceShop transforma una referencia expresada
por el Cliente en cero, uno o varios Product ID oficiales del catálogo.

Ejemplos de referencias:

- "Lager Norte";
- "la de 330";
- "la segunda";
- "esa misma";
- "la más barata";
- "la botella azul";
- un SKU;
- un barcode;
- un Product ID;
- una acción firmada;
- una posición de una lista;
- un alias;
- una mención proveniente de voz.

La resolución no agrega productos al carrito.

La resolución no afirma stock.

La resolución no acepta identificadores inventados por una LLM.

## 2. Alcance

Incluye:

- Product ID;
- SKU;
- barcode;
- nombre;
- alias;
- marca;
- categoría;
- variante;
- presentación;
- atributos;
- ordinales;
- pronombres;
- listas;
- referencias firmadas;
- contexto conversacional;
- coincidencia exacta;
- coincidencia aproximada;
- búsqueda semántica controlada;
- ambigüedad;
- vigencia;
- estado;
- aislamiento de tenant;
- resolución en voz;
- observabilidad;
- QA.

No incluye:

- stock;
- reserva;
- carrito;
- pedido;
- pagos;
- administración;
- recomendación personalizada;
- autorización comercial final.

## 3. Principios

RULE-PREF-001

Toda resolución exitosa termina en un Product ID oficial.

RULE-PREF-002

Toda resolución debe indicar su fuente.

RULE-PREF-003

Toda resolución debe indicar Catalog Version.

RULE-PREF-004

Toda resolución debe respetar tenant.

RULE-PREF-005

Una referencia ambigua no debe resolverse arbitrariamente.

RULE-PREF-006

Una referencia expirada no debe utilizarse.

RULE-PREF-007

Una posición ordinal requiere List ID y versión.

RULE-PREF-008

Un pronombre requiere contexto vigente.

RULE-PREF-009

Un Product ID producido por LLM no es oficial hasta validarse.

RULE-PREF-010

Un producto inactivo no debe resolverse para una nueva compra pública.

RULE-PREF-011

Una referencia firmada igualmente debe validar estado y tenant.

RULE-PREF-012

La baja confianza debe producir aclaración.

RULE-PREF-013

La resolución debe conservar la forma superficial.

RULE-PREF-014

La resolución debe ser reproducible dentro de una versión.

RULE-PREF-015

Toda decisión debe ser trazable.

## 4. Estados del proceso

RECEIVED

NORMALIZED

CANDIDATES_FOUND

RESOLVING

RESOLVED

AMBIGUOUS

NOT_FOUND

INACTIVE

RESTRICTED

EXPIRED

REJECTED

FAILED

Estados terminales:

RESOLVED
AMBIGUOUS
NOT_FOUND
INACTIVE
RESTRICTED
EXPIRED
REJECTED
FAILED

## 5. Contrato de entrada

```json
{
  "product_reference_resolution_id": "UUID",
  "tenant_id": "UUID",
  "session_id": "UUID_OR_NULL",
  "turn_id": "UUID_OR_NULL",
  "actor_id": "UUID_OR_NULL",
  "reference": {
    "surface": "la segunda",
    "normalized": "la segunda",
    "reference_type": "ORDINAL",
    "candidate_value": {
      "position": 2
    }
  },
  "context": {
    "list_id": "UUID",
    "list_version": 1,
    "last_product_id": null,
    "channel": "VOICE"
  },
  "catalog_version_policy": "LIST_BOUND_VERSION",
  "required_statuses": [
    "ACTIVE"
  ]
}
```

## 6. Contrato de resultado resuelto

```json
{
  "product_reference_resolution_id": "UUID",
  "status": "RESOLVED",
  "catalog_version": 42,
  "reference": {
    "surface": "la segunda",
    "reference_type": "ORDINAL"
  },
  "resolved_product": {
    "product_id": "UUID",
    "name": "Lager Norte 1 L",
    "status": "ACTIVE",
    "presentation": "1 L"
  },
  "resolution": {
    "strategy": "LIST_POSITION",
    "source": "SIGNED_LIST",
    "confidence": 1.0,
    "list_id": "UUID",
    "list_version": 1
  },
  "alternatives": [],
  "requires_clarification": false
}
```

## 7. Contrato de resultado ambiguo

```json
{
  "product_reference_resolution_id": "UUID",
  "status": "AMBIGUOUS",
  "catalog_version": 42,
  "reference": {
    "surface": "Lager Norte"
  },
  "resolved_product": null,
  "resolution": {
    "strategy": "NAME_AND_ALIAS",
    "confidence": 0.78
  },
  "alternatives": [
    {
      "product_id": "UUID-A",
      "name": "Lager Norte 330 ml",
      "difference_summary": "Lata de 330 ml"
    },
    {
      "product_id": "UUID-B",
      "name": "Lager Norte 1 L",
      "difference_summary": "Botella de 1 litro"
    }
  ],
  "requires_clarification": true
}
```

## 8. Tipos de referencia

PRODUCT_ID

SKU

BARCODE

SIGNED_PRODUCT_REFERENCE

LIST_POSITION

EXACT_NAME

ALIAS

BRAND_AND_PRESENTATION

CATEGORY_AND_ATTRIBUTES

PRONOUN

RELATIVE_REFERENCE

DESCRIPTIVE_REFERENCE

FUZZY_TEXT

SEMANTIC_DESCRIPTION

## 9. Precedencia de resolución

Orden recomendado:

1. Signed Product Reference vigente.
2. Product ID validado.
3. SKU exacto.
4. Barcode exacto.
5. List ID + posición.
6. Nombre exacto.
7. Alias exacto.
8. Marca + presentación.
9. Context reference.
10. Fuzzy.
11. Semantic.
12. Aclaración.

Una estrategia inferior no debe sobrescribir una coincidencia exacta
válida.

## 10. Product ID

Validaciones:

- formato;
- existencia;
- tenant;
- Catalog Version;
- status;
- visibilidad;
- restricción;
- actor.

Un UUID bien formado puede ser inválido.

## 11. SKU

Debe validar:

- formato;
- normalización;
- tenant;
- unicidad;
- status;
- versión.

Si existen dos SKUs iguales por error de datos:

- no elegir;
- marcar DATA_INTEGRITY_CONFLICT;
- alertar.

## 12. Barcode

Debe validar:

- tipo;
- longitud;
- checksum cuando aplique;
- tenant;
- unicidad;
- producto;
- status.

## 13. Referencias firmadas

Pueden provenir de:

- botón;
- tarjeta;
- menú;
- formulario;
- QR interno.

Deben incluir:

- Product ID;
- tenant;
- Session ID opcional;
- List ID;
- versión;
- issued_at;
- expires_at;
- firma.

La firma no evita validar que el producto siga activo.

## 14. Posiciones de lista

"La segunda" requiere:

- List ID vigente;
- List Version;
- posición entregada;
- canal;
- estado de delivery;
- Catalog Version;
- tenant.

Si la posición no fue presentada por voz:

- no resolver por voz;
- puede ofrecer lista textual.

## 15. Pronombres

Ejemplos:

- esa;
- ese;
- la misma;
- agrégala;
- quítalo;
- otra.

Requieren referentes recientes.

Debe evaluarse:

- último producto;
- última lista;
- última selección;
- turno de origen;
- expiración;
- cambio de intención.

## 16. Referencias relativas

Ejemplos:

- la más barata;
- la grande;
- la sin alcohol;
- la de lata;
- la anterior;
- la primera opción.

Requieren un conjunto candidato definido.

No deben buscar globalmente sin contexto cuando la frase depende de una
lista.

## 17. Referencias descriptivas

Ejemplo:

"la cerveza rubia de 330 en lata"

Puede producir filtros candidatos:

- category = beer;
- style = lager/blonde;
- size_ml = 330;
- package_type = CAN.

Debe resolver contra catálogo.

## 18. Aliases

Los aliases deben:

- ser oficiales;
- tener idioma;
- tener scope;
- tener version;
- indicar target;
- detectar colisiones.

Un alias generado automáticamente puede ser candidato, no oficial.

## 19. Fuzzy

Debe limitar:

- distancia;
- longitud;
- idioma;
- catálogo;
- top candidates;
- confidence threshold.

No usar fuzzy para aceptar un Product ID similar.

## 20. Semantic

La búsqueda semántica puede producir candidatos.

Debe:

- consultar índice autorizado;
- devolver Product IDs;
- validar catalog version;
- validar tenant;
- validar status;
- aplicar filtros;
- producir explanation codes.

## 21. Voz

Considerar:

- homófonos;
- marcas;
- números;
- baja confianza;
- transcripción final;
- autocorrección;
- ruido;
- pronunciación.

Para riesgo medio o alto, una baja confianza requiere aclaración.

## 22. Confianza

Fuentes de confianza:

- exact match;
- transcript;
- entity extraction;
- fuzzy score;
- semantic score;
- context strength;
- list binding.

La confianza compuesta debe calibrarse.

## 23. Umbrales

Ejemplo:

EXACT_SIGNED:

1.0 sujeto a estado.

EXACT_ID:

1.0 sujeto a validación.

EXACT_NAME_UNIQUE:

>= 0.98.

FUZZY:

requiere >= threshold.

SEMANTIC:

requiere diferencia mínima respecto al segundo candidato.

Los valores finales son configurables.

## 24. Ambigüedad

Se produce cuando:

- varios nombres;
- varias presentaciones;
- alias colisiona;
- referencia relativa;
- empate;
- confianza insuficiente;
- falta contexto.

Debe construir alternativas oficiales y diferencias útiles.

## 25. Alternativas

Cada alternativa debe incluir:

- Product ID interno protegido;
- nombre;
- presentación;
- marca;
- atributo diferenciador;
- precio si oficial;
- referencia firmada;
- posición.

## 26. Not found

No debe inventarse un producto.

Puede:

- sugerir revisar nombre;
- buscar categoría;
- mostrar similares oficiales;
- derivar;
- pedir foto/barcode si canal lo permite.

Los similares deben marcarse como sugerencias, no resolución.

## 27. Inactive

Si el producto existe pero está inactivo:

- informar que no está disponible para nueva compra;
- no resolver como seleccionable;
- sugerir alternativas oficiales;
- conservar referencia histórica si corresponde.

## 28. Restricted

Debe verificar:

- actor;
- canal;
- región;
- edad;
- horario;
- política.

No exponer detalles privados de la restricción.

## 29. Versionado

La resolución debe vincularse con:

- Catalog Version;
- List Version;
- Alias Version;
- Resolver Version;
- Context Version.

## 30. Expiración

Puede expirar por:

- List expiry;
- Catalog Version policy;
- Session;
- cambio de estado;
- Product update;
- restricción;
- contexto reemplazado.

## 31. Caché

Puede cachearse por:

- tenant;
- normalized reference;
- context hash;
- catalog version;
- resolver version;
- visibility.

No cachear pronombres sin contexto.

## 32. Idempotencia

Mismo Resolution ID y mismos parámetros:

- mismo resultado lógico.

Mismo ID con otra referencia:

- conflicto.

## 33. Flujo principal

1. Recibir referencia.
2. validar tenant.
3. validar Session y contexto.
4. normalizar.
5. determinar tipo.
6. aplicar estrategia exacta.
7. validar Product IDs.
8. aplicar status.
9. si no resuelve, usar aliases.
10. si no resuelve, usar contexto.
11. si no resuelve, fuzzy/semantic.
12. ordenar candidatos.
13. calcular confianza.
14. resolver, aclarar o not found.
15. persistir.
16. emitir evento.
17. devolver resultado.

## 34. Pseudocódigo

```text
function resolve_product_reference(request):

    validate_tenant(request.tenant_id)
    validate_context_if_required(request.context)

    normalized = normalize_product_reference(request.reference)
    strategy = classify_reference_type(normalized)

    candidates = []

    if strategy == SIGNED_PRODUCT_REFERENCE:
        candidates = resolve_signed_reference(normalized, request)

    elif strategy == PRODUCT_ID:
        candidates = resolve_exact_product_id(normalized, request)

    elif strategy == SKU:
        candidates = resolve_exact_sku(normalized, request)

    elif strategy == BARCODE:
        candidates = resolve_exact_barcode(normalized, request)

    elif strategy == LIST_POSITION:
        candidates = resolve_list_position(normalized, request.context)

    else:
        candidates += resolve_exact_name_and_alias(normalized, request)
        candidates += resolve_context_reference(normalized, request.context)

        if not has_sufficient_candidate(candidates):
            candidates += resolve_fuzzy(normalized, request)

        if not has_sufficient_candidate(candidates):
            candidates += resolve_semantic(normalized, request)

    official = validate_candidates_against_catalog(
        candidates,
        request.tenant_id,
        request.catalog_version_policy
    )

    visible = apply_product_visibility(official, request)
    ranked = rank_resolution_candidates(visible, normalized)

    result = decide_resolution_result(ranked, request)
    persist_resolution(result)
    emit_resolution_event(result)

    return result
```

## 35. Validaciones

VAL-PREF-001

Reference existe.

VAL-PREF-002

Reference type permitido.

VAL-PREF-003

Tenant válido.

VAL-PREF-004

Session coincide.

VAL-PREF-005

Context version vigente.

VAL-PREF-006

List ID vigente.

VAL-PREF-007

List position entregada.

VAL-PREF-008

Product ID oficial.

VAL-PREF-009

Status permitido.

VAL-PREF-010

Confidence suficiente.

VAL-PREF-011

Catalog Version existe.

VAL-PREF-012

Signed reference válida.

## 36. Errores

PRODUCT_REFERENCE_EMPTY

PRODUCT_REFERENCE_TYPE_INVALID

PRODUCT_REFERENCE_NOT_FOUND

PRODUCT_REFERENCE_AMBIGUOUS

PRODUCT_REFERENCE_INACTIVE

PRODUCT_REFERENCE_RESTRICTED

PRODUCT_REFERENCE_EXPIRED

PRODUCT_REFERENCE_TENANT_MISMATCH

PRODUCT_REFERENCE_SESSION_MISMATCH

PRODUCT_REFERENCE_CONTEXT_STALE

PRODUCT_REFERENCE_LIST_NOT_FOUND

PRODUCT_REFERENCE_LIST_EXPIRED

PRODUCT_REFERENCE_LIST_POSITION_INVALID

PRODUCT_REFERENCE_POSITION_NOT_DELIVERED

PRODUCT_REFERENCE_SIGNATURE_INVALID

PRODUCT_REFERENCE_CATALOG_VERSION_NOT_FOUND

PRODUCT_REFERENCE_DATA_INTEGRITY_CONFLICT

PRODUCT_REFERENCE_RESOLVER_UNAVAILABLE

## 37. Eventos

ProductReferenceResolutionStarted

ProductReferenceResolved

ProductReferenceAmbiguous

ProductReferenceNotFound

ProductReferenceInactive

ProductReferenceRestricted

ProductReferenceExpired

ProductReferenceListPositionResolved

ProductReferenceContextResolved

ProductReferenceResolutionFailed

## 38. Observabilidad

Métricas:

- product_reference_resolution_total;
- product_reference_resolved_total;
- product_reference_ambiguous_total;
- product_reference_not_found_total;
- product_reference_inactive_total;
- product_reference_latency_seconds;
- product_reference_strategy_total;
- product_reference_fuzzy_total;
- product_reference_semantic_total;
- product_reference_context_total;
- product_reference_list_total.

Dimensiones:

- reference_type;
- strategy;
- channel;
- confidence_band;
- result;
- error_code;
- locale.

## 39. Auditoría

Registrar:

- Resolution ID;
- tenant;
- actor;
- reference type;
- strategy;
- Catalog Version;
- List ID protegido;
- confidence band;
- resultado;
- error;
- Correlation ID.

No registrar PII innecesaria.

## 40. Seguridad

Amenazas:

- Product ID de otro tenant;
- signed token manipulado;
- List ID robado;
- position replay;
- alias poisoning;
- semantic poisoning;
- prompt injection;
- hidden product access;
- enumeration.

Controles:

- tenant;
- Session;
- signatures;
- expiry;
- visibility;
- schemas;
- rate limit;
- source validation;
- output minimization.

## 41. Casos límite

- Product ID válido;
- Product ID de otro tenant;
- SKU;
- duplicate SKU;
- barcode;
- signed reference;
- expired signed reference;
- ordinal;
- list stale;
- position not spoken;
- pronoun;
- no context;
- alias collision;
- fuzzy tie;
- semantic tie;
- inactive;
- restricted;
- voice low confidence;
- autocorrection;
- catalog version changed;
- cache stale.

## 42. Criterios de aceptación

AC-PREF-001

Toda resolución exitosa produce Product ID oficial.

AC-PREF-002

Toda resolución respeta tenant.

AC-PREF-003

Toda resolución indica estrategia.

AC-PREF-004

Toda resolución indica versión.

AC-PREF-005

Las referencias firmadas se validan.

AC-PREF-006

Los ordinales requieren lista vigente.

AC-PREF-007

Los pronombres requieren contexto.

AC-PREF-008

La ambigüedad no se oculta.

AC-PREF-009

Los productos inactivos no se seleccionan.

AC-PREF-010

La baja confianza produce aclaración.

AC-PREF-011

La LLM no crea IDs oficiales.

AC-PREF-012

La búsqueda semántica valida resultados.

AC-PREF-013

La caché incluye contexto.

AC-PREF-014

Los eventos tardíos no cambian resolución.

AC-PREF-015

Todo resultado es trazable.

## 43. Plan mínimo de pruebas

- Product ID;
- SKU;
- barcode;
- signed reference;
- signature;
- expiry;
- list;
- ordinal;
- delivery;
- pronoun;
- context;
- alias;
- collision;
- fuzzy;
- semantic;
- tie;
- inactive;
- restricted;
- tenant;
- Session;
- version;
- voice;
- low confidence;
- cache;
- injection;
- metrics;
- audit.

## 44. Checklist

[ ] Existe Resolution ID.
[ ] Existe reference type.
[ ] Existe surface.
[ ] Existe tenant.
[ ] Existe Catalog Version.
[ ] Existe strategy.
[ ] Existe confidence.
[ ] Se valida Product ID.
[ ] Se valida status.
[ ] Se valida List ID.
[ ] Se valida posición.
[ ] Se valida firma.
[ ] Se valida contexto.
[ ] Se detecta ambigüedad.
[ ] Se controla fuzzy.
[ ] Se controla semantic.
[ ] Se persiste.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
