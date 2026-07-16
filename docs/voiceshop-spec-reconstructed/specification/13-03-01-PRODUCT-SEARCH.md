======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-03-01-PRODUCT-SEARCH.md

# BÚSQUEDA DE PRODUCTOS

## 1. Objetivo

Este documento define cómo VoiceShop busca productos oficiales a partir
de texto, filtros, categorías, marcas, atributos o contexto
conversacional.

La búsqueda devuelve candidatos oficiales del catálogo.

La búsqueda no:

- afirma stock;
- reserva productos;
- agrega al carrito;
- confirma precios no vigentes;
- inventa Product IDs;
- ejecuta lógica de pedido.

## 2. Alcance

Incluye:

- búsqueda textual;
- búsqueda exacta;
- búsqueda por SKU;
- búsqueda por barcode;
- búsqueda por alias;
- búsqueda semántica controlada;
- filtros;
- ranking;
- coincidencia aproximada;
- idioma;
- locale;
- resultados vacíos;
- ambigüedad;
- listas;
- paginación;
- caché;
- observabilidad;
- QA.

No incluye:

- detalle exhaustivo;
- stock;
- promociones;
- administración;
- persistencia técnica;
- recomendación personalizada avanzada.

## 3. Principios

RULE-SEARCH-001

Todo resultado debe corresponder a un Product ID oficial.

RULE-SEARCH-002

Todo resultado debe pertenecer al tenant.

RULE-SEARCH-003

Los productos no visibles deben excluirse.

RULE-SEARCH-004

La búsqueda no debe inventar productos.

RULE-SEARCH-005

La búsqueda debe conservar la consulta original y normalizada.

RULE-SEARCH-006

La búsqueda debe indicar estrategia.

RULE-SEARCH-007

La búsqueda debe indicar versión del catálogo.

RULE-SEARCH-008

Los filtros deben validarse.

RULE-SEARCH-009

El ranking debe ser reproducible dentro de una versión.

RULE-SEARCH-010

Una LLM puede reescribir consulta, pero no crear resultados.

RULE-SEARCH-011

La búsqueda semántica debe terminar en Product IDs oficiales.

RULE-SEARCH-012

Los resultados deben paginarse de forma estable.

RULE-SEARCH-013

Un resultado vacío no debe sustituirse con datos inventados.

RULE-SEARCH-014

Los aliases deben pertenecer al catálogo.

RULE-SEARCH-015

La búsqueda debe respetar restricciones comerciales.

## 4. Tipos de búsqueda

EXACT_ID

Product ID.

EXACT_SKU

SKU.

EXACT_BARCODE

Código de barras.

EXACT_NAME

Nombre normalizado.

ALIAS

Alias oficial.

TEXT

Términos.

FUZZY

Coincidencia aproximada.

SEMANTIC

Representación semántica controlada.

CATEGORY_BROWSE

Navegación por categoría.

BRAND_BROWSE

Navegación por marca.

ATTRIBUTE_FILTER

Atributos.

HYBRID

Combinación.

## 5. Contrato de Search Request

```json
{
  "search_request_id": "UUID",
  "tenant_id": "UUID",
  "session_id": "UUID_OR_NULL",
  "actor_id": "UUID_OR_NULL",
  "query": {
    "original": "cervezas lager de 330",
    "normalized": "cervezas lager de 330",
    "language": "es-CL"
  },
  "filters": {
    "category_ids": [],
    "brand_ids": [],
    "attributes": {
      "style": "lager",
      "size_ml": 330
    },
    "statuses": [
      "ACTIVE"
    ]
  },
  "sort": [
    {
      "field": "RELEVANCE",
      "direction": "DESC"
    }
  ],
  "page": {
    "limit": 10,
    "cursor": null
  },
  "context": {
    "branch_id": null,
    "previous_list_id": null
  },
  "catalog_version_policy": "LATEST_PUBLISHED"
}
```

## 6. Contrato de Search Result

```json
{
  "search_result_id": "UUID",
  "search_request_id": "UUID",
  "tenant_id": "UUID",
  "catalog_version": 42,
  "strategy": "HYBRID",
  "query_interpretation": {
    "terms": [
      "cerveza",
      "lager"
    ],
    "filters_applied": {
      "size_ml": 330
    }
  },
  "items": [
    {
      "position": 1,
      "product_id": "UUID",
      "name": "Lager Norte 330 ml",
      "brand": "Lager Norte",
      "presentation": "330 ml",
      "status": "ACTIVE",
      "score": 0.96,
      "match_reasons": [
        "CATEGORY",
        "STYLE",
        "SIZE"
      ]
    }
  ],
  "page": {
    "limit": 10,
    "next_cursor": "OPAQUE_CURSOR_OR_NULL",
    "has_more": false
  },
  "list": {
    "list_id": "UUID",
    "list_version": 1,
    "expires_at": "UTC_TIMESTAMP"
  },
  "created_at": "UTC_TIMESTAMP"
}
```

## 7. Validación de consulta

VAL-SEARCH-001

La consulta debe respetar longitud.

VAL-SEARCH-002

La codificación debe ser válida.

VAL-SEARCH-003

El tenant debe existir.

VAL-SEARCH-004

Los filtros deben pertenecer al tenant.

VAL-SEARCH-005

Los statuses solicitados deben estar permitidos.

VAL-SEARCH-006

El sort field debe estar permitido.

VAL-SEARCH-007

El límite debe estar en rango.

VAL-SEARCH-008

El cursor debe ser válido.

VAL-SEARCH-009

La versión de catálogo debe existir.

VAL-SEARCH-010

La búsqueda exacta debe validar formato.

## 8. Normalización de consulta

Puede aplicar:

- Unicode;
- case folding;
- espacios;
- puntuación;
- sinónimos;
- aliases;
- unidades;
- números;
- idioma.

Debe conservar original.

No debe modificar negaciones.

Ejemplo:

"cerveza sin alcohol"

Debe conservar filtro EXCLUDE_ALCOHOL o atributo correspondiente.

## 9. Reescritura de consulta

Puede usarse para:

- corregir errores;
- expandir abreviaturas;
- separar marca/presentación;
- detectar atributos.

Si usa LLM:

- salida estructurada;
- catálogo cerrado;
- no crear Product ID;
- no crear marcas inexistentes como hecho;
- validar términos;
- conservar consulta original.

## 10. Exact match

Prioridad alta para:

- Product ID válido;
- SKU;
- barcode;
- nombre exacto;
- alias exacto.

Un identificador exacto de otro tenant se rechaza, no se busca
globalmente.

## 11. Fuzzy match

Puede corregir:

- errores leves;
- transposición;
- acentos;
- fonética.

Debe limitar:

- distancia;
- longitud;
- idioma;
- catálogo del tenant.

Debe marcar match reason FUZZY.

## 12. Búsqueda semántica

Puede ayudar con:

- "algo suave";
- "cerveza económica";
- "vino para regalo";
- "sin azúcar".

Debe:

- usar embeddings aprobados;
- consultar índice oficial;
- devolver Product IDs;
- validar status;
- aplicar filtros;
- no confiar en texto generado.

## 13. Ranking

Señales posibles:

- exact match;
- prefix;
- alias;
- category;
- brand;
- attribute;
- semantic score;
- popularity autorizada;
- disponibilidad comercial;
- calidad de datos.

No usar stock como señal si no se consulta Inventory.

## 14. Explicabilidad del match

Cada resultado debe poder indicar:

- por nombre;
- por alias;
- por marca;
- por categoría;
- por tamaño;
- por atributo;
- por fuzzy;
- por semantic.

No es necesario exponer score interno completo al Cliente.

## 15. Productos visibles

Por defecto:

ACTIVE

Opcionalmente:

RESTRICTED si actor/política lo permite.

Excluir:

DRAFT
INACTIVE
DISCONTINUED
ARCHIVED

salvo casos administrativos autorizados.

## 16. Restricciones

Ejemplos:

- edad;
- canal;
- región;
- horario;
- tenant;
- sucursal;
- regulación;
- producto restringido.

La búsqueda puede ocultar o marcar.

La autorización final ocurre en casos de uso.

## 17. Filtros

- category;
- brand;
- variant;
- presentation;
- size;
- unit;
- package type;
- attributes;
- status;
- price range si fuente oficial;
- tags autorizados.

Todo filtro debe tener schema.

## 18. Rangos

Ejemplo:

size_ml entre 300 y 500.

Validar:

- mínimo;
- máximo;
- unidad;
- consistencia;
- límites.

## 19. Ordenamiento

Campos permitidos:

RELEVANCE

NAME

PRICE, cuando oficial.

UPDATED_AT, para administración.

POPULARITY, si definido.

No permitir orden por campo arbitrario.

## 20. Paginación

Preferir cursor opaco.

El cursor debe vincular:

- tenant;
- catalog version;
- query hash;
- filters;
- sort;
- last item;
- expiration.

No aceptar cursor de otra consulta.

## 21. List ID

Toda búsqueda presentada al Cliente crea List ID.

Debe contener:

- resultados;
- posiciones;
- versión;
- query;
- catalog version;
- expiración;
- tenant;
- channel delivery state.

## 22. Resultados vacíos

Respuesta:

- no inventar;
- indicar que no se encontraron;
- sugerir quitar un filtro;
- ofrecer categorías;
- pedir aclaración;
- consultar humano si corresponde.

## 23. Muchos resultados

Acciones:

- limitar;
- pedir filtro;
- mostrar top N;
- ofrecer paginación;
- no recitar cientos por voz.

## 24. Ambigüedad

Ejemplo:

Consulta:

"lager norte"

Resultados:

- Lager Norte 330 ml;
- Lager Norte 1 L.

Debe presentar opciones.

No elegir por defecto sin política.

## 25. Integración con voz

La respuesta hablada debe:

- limitar opciones;
- mencionar diferencias;
- crear List ID;
- permitir ordinales;
- ofrecer mostrar texto.

## 26. Integración con texto

Puede mostrar:

- tarjetas;
- imágenes;
- precio;
- botones;
- filtros;
- más resultados.

Los botones deben estar firmados y versionados.

## 27. Caché

Puede cachearse:

- consulta;
- filtros;
- versión;
- resultados.

La caché debe aislar tenants.

Debe invalidarse por:

- nueva catalog version;
- producto actualizado;
- status;
- alias;
- política.

## 28. Idempotencia

La búsqueda es de lectura.

Mismo Search Request ID y mismos parámetros:

- puede devolver mismo resultado o resultado equivalente bajo la misma
  versión.

Si se solicita latest y la versión cambió, debe indicarse.

## 29. Dependencias

La fuente de catálogo puede fallar.

Fallback:

- caché vigente;
- réplica;
- snapshot;
- mensaje degradado.

No utilizar datos expirados como vigentes sin indicarlo.

## 30. Flujo principal

1. Recibir Search Request.
2. validar tenant.
3. validar consulta.
4. validar filtros.
5. normalizar.
6. detectar estrategia.
7. consultar exact matches.
8. consultar text/fuzzy/semantic según política.
9. fusionar.
10. filtrar status.
11. filtrar restricciones.
12. rankear.
13. paginar.
14. crear List ID.
15. persistir metadatos.
16. emitir CatalogSearchCompleted.
17. devolver resultados.

## 31. Pseudocódigo

```text
function search_products(request):

    validate_tenant(request.tenant_id)
    validate_query(request.query)
    validate_filters(request.filters)
    validate_sort(request.sort)
    validate_page(request.page)

    catalog_version = resolve_catalog_version(
        request.catalog_version_policy
    )

    normalized_query = normalize_catalog_query(request.query)

    strategy = choose_search_strategy(
        normalized_query,
        request.filters
    )

    exact = search_exact(
        normalized_query,
        request.tenant_id,
        catalog_version
    )

    candidates = exact

    if requires_text_search(strategy):
        candidates += search_text(normalized_query)

    if requires_fuzzy_search(strategy):
        candidates += search_fuzzy(normalized_query)

    if requires_semantic_search(strategy):
        candidates += search_semantic(normalized_query)

    official = validate_official_product_ids(candidates)
    visible = apply_visibility_policy(official, request)
    ranked = rank_results(visible, request)
    page = paginate_stably(ranked, request.page)

    result = create_search_result(
        request,
        catalog_version,
        strategy,
        page
    )

    persist_search_metadata(result)
    emit(CatalogSearchCompleted)

    return result
```

## 32. Errores

SEARCH_QUERY_EMPTY

SEARCH_QUERY_TOO_LONG

SEARCH_QUERY_INVALID

SEARCH_TENANT_MISMATCH

SEARCH_FILTER_INVALID

SEARCH_FILTER_NOT_ALLOWED

SEARCH_SORT_INVALID

SEARCH_CURSOR_INVALID

SEARCH_CURSOR_EXPIRED

SEARCH_CATALOG_VERSION_NOT_FOUND

SEARCH_DEPENDENCY_UNAVAILABLE

SEARCH_SEMANTIC_INDEX_UNAVAILABLE

SEARCH_RESULT_VALIDATION_FAILED

SEARCH_RATE_LIMITED

## 33. Eventos

CatalogSearchRequested

CatalogSearchNormalized

CatalogSearchStrategySelected

CatalogSearchCompleted

CatalogSearchEmpty

CatalogSearchFailed

CatalogSearchFallbackUsed

CatalogListCreated

CatalogCursorRejected

## 34. Observabilidad

Métricas:

- catalog_search_requests_total;
- catalog_search_success_total;
- catalog_search_empty_total;
- catalog_search_failure_total;
- catalog_search_latency_seconds;
- catalog_search_results_count;
- catalog_search_strategy_total;
- catalog_fuzzy_usage_total;
- catalog_semantic_usage_total;
- catalog_cache_hit_total;
- catalog_cursor_error_total.

Dimensiones:

- strategy;
- locale;
- channel;
- result;
- error_code;
- catalog_version_bucket;
- tenant_tier.

## 35. Auditoría

Registrar cuando corresponda:

- Search Request ID;
- actor;
- tenant;
- estrategia;
- filtros;
- versión;
- cantidad;
- List ID;
- error;
- Correlation ID.

No registrar consulta completa si contiene PII sin redacción.

## 36. Seguridad

Amenazas:

- query injection;
- SQL-like input;
- filtro arbitrario;
- cursor manipulado;
- cross-tenant;
- Product ID de otro tenant;
- URL maliciosa;
- rate abuse;
- semantic poisoning.

Controles:

- schema;
- whitelist;
- cursor firmado;
- tenant;
- límites;
- rate limit;
- fuente oficial;
- validación.

## 37. Casos límite

- consulta vacía;
- sólo espacios;
- Product ID;
- SKU;
- barcode;
- alias;
- typo;
- marca;
- categoría;
- tamaño;
- unidad;
- sin alcohol;
- múltiples idiomas;
- emoji;
- muchos resultados;
- ningún resultado;
- cursor viejo;
- versión nueva;
- producto inactivo;
- tenant mismatch;
- semantic index caído;
- caché antigua;
- voz;
- PII.

## 38. Criterios de aceptación

AC-SEARCH-001

Todo resultado posee Product ID oficial.

AC-SEARCH-002

Todo resultado pertenece al tenant.

AC-SEARCH-003

Los productos no visibles se excluyen.

AC-SEARCH-004

La consulta original se conserva.

AC-SEARCH-005

La estrategia se registra.

AC-SEARCH-006

La versión se registra.

AC-SEARCH-007

Los filtros se validan.

AC-SEARCH-008

El orden se valida.

AC-SEARCH-009

La paginación es estable.

AC-SEARCH-010

La búsqueda semántica termina en IDs oficiales.

AC-SEARCH-011

Los resultados vacíos no se inventan.

AC-SEARCH-012

La ambigüedad se presenta.

AC-SEARCH-013

La voz limita resultados.

AC-SEARCH-014

La caché aísla tenant.

AC-SEARCH-015

Todo resultado es trazable.

## 39. Plan mínimo de pruebas

- exact ID;
- SKU;
- barcode;
- name;
- alias;
- text;
- fuzzy;
- semantic;
- filters;
- ranges;
- sort;
- pagination;
- cursor;
- version;
- empty;
- many;
- ambiguity;
- inactive;
- restricted;
- tenant;
- cache;
- fallback;
- rate limit;
- injection;
- voice;
- text;
- metrics;
- audit.

## 40. Checklist

[ ] Existe Search Request ID.
[ ] Existe tenant.
[ ] Existe query original.
[ ] Existe query normalizada.
[ ] Existe estrategia.
[ ] Existe catalog version.
[ ] Existen filtros.
[ ] Existe sort.
[ ] Existe page.
[ ] Existe List ID.
[ ] Se validan Product IDs.
[ ] Se filtra status.
[ ] Se aplican restricciones.
[ ] Se rankea.
[ ] Se pagina.
[ ] Se protege cursor.
[ ] Se controla caché.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
