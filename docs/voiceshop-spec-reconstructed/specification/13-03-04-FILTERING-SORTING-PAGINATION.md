======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-03-04-FILTERING-SORTING-PAGINATION.md

# FILTRADO, ORDENAMIENTO Y PAGINACIÓN DEL CATÁLOGO

## 1. Objetivo

Este documento define cómo VoiceShop aplica filtros, ordenamiento y
paginación a resultados del catálogo.

El comportamiento debe ser:

- validado;
- estable;
- determinístico;
- aislado por tenant;
- compatible con versiones;
- seguro;
- explicable;
- consistente entre voz y texto.

## 2. Alcance

Incluye:

- schemas de filtro;
- operadores;
- rangos;
- enums;
- atributos;
- filtros múltiples;
- sort;
- ranking;
- tie-breakers;
- cursor pagination;
- page size;
- expiración;
- List ID;
- cambios de versión;
- errores;
- observabilidad;
- QA.

No incluye:

- búsqueda textual;
- detalle;
- inventario;
- promociones;
- recomendaciones;
- persistencia física concreta.

## 3. Principios

RULE-FSP-001

Todo filtro debe estar declarado.

RULE-FSP-002

Todo operador debe estar permitido.

RULE-FSP-003

Todo valor debe validarse.

RULE-FSP-004

Los filtros no pueden acceder a campos internos.

RULE-FSP-005

El ordenamiento usa campos permitidos.

RULE-FSP-006

Todo orden debe tener tie-breaker estable.

RULE-FSP-007

La paginación debe estar vinculada a Catalog Version.

RULE-FSP-008

El cursor debe ser opaco o firmado.

RULE-FSP-009

Un cursor no puede reutilizarse con otra consulta.

RULE-FSP-010

Los límites deben estar acotados.

RULE-FSP-011

Los resultados deben respetar tenant.

RULE-FSP-012

La LLM no puede inventar campos de filtro.

RULE-FSP-013

Los filtros derivados deben validarse contra schema.

RULE-FSP-014

La voz debe simplificar filtros complejos.

RULE-FSP-015

Todo resultado debe ser trazable.

## 4. Contrato de Filter Schema

```json
{
  "filter_schema_id": "catalog-products-v1",
  "version": 1,
  "fields": {
    "category_id": {
      "type": "UUID",
      "operators": [
        "EQ",
        "IN"
      ]
    },
    "brand_id": {
      "type": "UUID",
      "operators": [
        "EQ",
        "IN"
      ]
    },
    "size_ml": {
      "type": "INTEGER",
      "operators": [
        "EQ",
        "GTE",
        "LTE",
        "BETWEEN"
      ],
      "minimum": 1,
      "maximum": 100000
    },
    "alcohol_free": {
      "type": "BOOLEAN",
      "operators": [
        "EQ"
      ]
    }
  }
}
```

## 5. Contrato de filtros

```json
{
  "filters": [
    {
      "field": "category_id",
      "operator": "EQ",
      "value": "UUID"
    },
    {
      "field": "size_ml",
      "operator": "BETWEEN",
      "value": {
        "minimum": 300,
        "maximum": 500
      }
    }
  ]
}
```

## 6. Tipos de campo

STRING

INTEGER

DECIMAL

BOOLEAN

UUID

ENUM

DATE

DATETIME

MONEY

UNIT_VALUE

TAG

Cada tipo posee operadores permitidos.

## 7. Operadores

EQ

NEQ

IN

NOT_IN

GT

GTE

LT

LTE

BETWEEN

CONTAINS

STARTS_WITH

EXISTS

No todos se permiten para todos los campos.

## 8. Filtros de identidad

- Product ID;
- Category ID;
- Brand ID;
- Variant ID.

Deben validar tenant y existencia.

## 9. Filtros de atributos

Deben usar schema.

Ejemplos:

- alcohol_free;
- sugar_free;
- package_type;
- country_of_origin;
- color;
- flavor.

Una clave desconocida se rechaza.

## 10. Filtros de rango

Ejemplo:

size_ml BETWEEN 300 AND 500.

Validar:

- mínimo;
- máximo;
- mínimo <= máximo;
- unidad;
- límites.

## 11. Filtros de dinero

Si se permite price filter:

```json
{
  "field": "price",
  "operator": "BETWEEN",
  "value": {
    "minimum": 1000,
    "maximum": 5000,
    "currency": "CLP"
  }
}
```

Debe usar fuente oficial y moneda coherente.

## 12. Filtros de status

Clientes públicos:

ACTIVE

RESTRICTED según política.

Administradores pueden solicitar otros estados con autorización.

## 13. Composición lógica

Puede soportar:

AND

OR limitado

NOT limitado

La complejidad debe estar acotada.

No permitir árboles arbitrariamente profundos.

## 14. Filtros contradictorios

Ejemplo:

size_ml > 1000
AND
size_ml < 500

Resultado:

FILTER_CONTRADICTION

o lista vacía según política.

Debe ser determinístico.

## 15. Filtros derivados de lenguaje

Entrada:

"cerveza sin alcohol de 330"

Candidatos:

- category = beer;
- alcohol_free = true;
- size_ml = 330.

Antes de aplicar:

- resolver IDs;
- validar schema;
- registrar source = NLP_DERIVED;
- conservar texto.

## 16. Sort Schema

```json
{
  "sort_schema_id": "catalog-products-sort-v1",
  "fields": {
    "RELEVANCE": {
      "directions": [
        "DESC"
      ]
    },
    "NAME": {
      "directions": [
        "ASC",
        "DESC"
      ]
    },
    "PRICE": {
      "directions": [
        "ASC",
        "DESC"
      ]
    }
  },
  "default": [
    {
      "field": "RELEVANCE",
      "direction": "DESC"
    },
    {
      "field": "PRODUCT_ID",
      "direction": "ASC"
    }
  ]
}
```

## 17. Orden por relevancia

Puede usar:

- exact match;
- score;
- alias;
- category;
- semantic;
- business priority autorizada.

Debe incluir tie-breaker estable.

## 18. Orden por nombre

Debe definir:

- locale;
- collation;
- case;
- accents;
- tie-breaker.

## 19. Orden por precio

Sólo si:

- precio está disponible;
- moneda coherente;
- vigencia;
- source.

Productos sin precio:

- al final;
- excluidos;
- o error, según política.

## 20. Orden por popularidad

Debe definir fuente y ventana.

No debe manipularse sin gobernanza.

## 21. Tie-breakers

Ejemplo:

PRICE ASC
NAME ASC
PRODUCT_ID ASC

Sin tie-breaker, la paginación puede duplicar o omitir.

## 22. Paginación por cursor

Cursor debe contener o referenciar:

- tenant;
- catalog version;
- query hash;
- filter hash;
- sort hash;
- last values;
- page size;
- issued_at;
- expires_at;
- signature.

## 23. Cursor opaco

El Cliente no debe modificar campos internos.

Puede ser:

- token firmado;
- referencia almacenada;
- encoding protegido.

No usar offset público para grandes catálogos si produce inestabilidad.

## 24. Page size

Debe tener:

- default;
- minimum;
- maximum;
- override por canal.

Ejemplo:

WEB: 20

VOICE: 3

ADMIN: 100

## 25. Expiración de cursor

Causas:

- tiempo;
- Catalog Version nueva;
- query changed;
- filters changed;
- sort changed;
- tenant changed;
- policy changed.

## 26. Cursor y versión

Políticas:

STRICT_VERSION

Cursor sólo funciona con misma versión.

SNAPSHOT

Cursor mantiene snapshot.

LATEST_WITH_RESTART

Solicita reiniciar.

La política debe ser explícita.

## 27. Resultados duplicados

Debe evitarse mediante:

- stable sort;
- tie-breaker;
- snapshot;
- cursor state;
- dedup Product ID.

## 28. Resultados omitidos

Debe evitarse por igual.

Las modificaciones de catálogo durante navegación deben tratarse por
versión.

## 29. List ID

Cada página puede:

- pertenecer al mismo List ID;
- incrementar List Version;
- registrar posiciones globales.

Ejemplo:

Página 1:

positions 1-20

Página 2:

positions 21-40

## 30. Voz

La voz debe:

- usar page size pequeño;
- ofrecer "más";
- explicar filtros activos;
- evitar leer filtros complejos;
- permitir retirar un filtro.

## 31. Texto

Puede mostrar:

- chips;
- sliders;
- selectors;
- sort menu;
- page controls;
- active filters.

Toda acción debe estar firmada o validada.

## 32. Validaciones

VAL-FSP-001

Field existe.

VAL-FSP-002

Operator permitido.

VAL-FSP-003

Type coincide.

VAL-FSP-004

Value está en rango.

VAL-FSP-005

UUID pertenece al tenant.

VAL-FSP-006

Sort field permitido.

VAL-FSP-007

Sort direction permitida.

VAL-FSP-008

Page size permitido.

VAL-FSP-009

Cursor válido.

VAL-FSP-010

Cursor coincide con consulta.

VAL-FSP-011

Version coincide.

VAL-FSP-012

Complexity dentro de límite.

## 33. Complejidad

Debe limitarse:

- número de filtros;
- depth;
- OR branches;
- IN list length;
- sort fields;
- page size;
- query cost.

## 34. Cost budget

Cada request puede recibir un costo estimado.

Si excede:

- rechazar;
- simplificar;
- requerir filtro;
- usar procesamiento autorizado.

## 35. Caché

La clave debe incluir:

- tenant;
- version;
- query;
- filters;
- sort;
- cursor/page;
- visibility.

No omitir ninguno.

## 36. Flujo principal

1. Recibir request.
2. cargar schemas.
3. validar filtros.
4. validar operadores.
5. validar valores.
6. validar tenant references.
7. detectar contradicciones.
8. validar sort.
9. agregar tie-breakers.
10. validar cursor.
11. validar version.
12. estimar costo.
13. ejecutar consulta.
14. deduplicar.
15. crear página.
16. crear next cursor.
17. actualizar List ID.
18. devolver.

## 37. Pseudocódigo

```text
function apply_filter_sort_page(request, candidates):

    filter_schema = load_filter_schema(request.filter_schema_id)
    sort_schema = load_sort_schema(request.sort_schema_id)

    validated_filters = validate_filters(
        request.filters,
        filter_schema,
        request.tenant_id
    )

    reject_filter_contradictions(validated_filters)

    validated_sort = validate_sort(
        request.sort,
        sort_schema
    )

    stable_sort = append_required_tie_breakers(validated_sort)

    cursor_state = validate_and_decode_cursor(
        request.page.cursor,
        tenant=request.tenant_id,
        query_hash=request.query_hash,
        filter_hash=hash(validated_filters),
        sort_hash=hash(stable_sort),
        catalog_version=request.catalog_version
    )

    enforce_query_complexity(
        validated_filters,
        stable_sort,
        request.page.limit
    )

    filtered = apply_filters(candidates, validated_filters)
    ordered = apply_stable_sort(filtered, stable_sort)
    page = select_after_cursor(
        ordered,
        cursor_state,
        request.page.limit
    )

    next_cursor = create_signed_cursor(
        page,
        request,
        stable_sort
    )

    return CatalogPage(
        items=page.items,
        next_cursor=next_cursor,
        has_more=page.has_more
    )
```

## 38. Errores

FILTER_SCHEMA_NOT_FOUND

FILTER_FIELD_UNKNOWN

FILTER_OPERATOR_NOT_ALLOWED

FILTER_VALUE_INVALID

FILTER_REFERENCE_NOT_FOUND

FILTER_TENANT_MISMATCH

FILTER_CONTRADICTION

FILTER_COMPLEXITY_EXCEEDED

SORT_SCHEMA_NOT_FOUND

SORT_FIELD_NOT_ALLOWED

SORT_DIRECTION_NOT_ALLOWED

SORT_PRICE_UNAVAILABLE

PAGE_LIMIT_INVALID

CURSOR_INVALID

CURSOR_EXPIRED

CURSOR_QUERY_MISMATCH

CURSOR_VERSION_MISMATCH

CURSOR_TENANT_MISMATCH

QUERY_COST_EXCEEDED

## 39. Eventos

CatalogFiltersValidated

CatalogFilterRejected

CatalogSortValidated

CatalogSortRejected

CatalogCursorCreated

CatalogCursorRejected

CatalogPageCreated

CatalogQueryComplexityExceeded

CatalogFilterContradictionDetected

## 40. Observabilidad

Métricas:

- catalog_filter_requests_total;
- catalog_filter_rejections_total;
- catalog_filter_count;
- catalog_sort_requests_total;
- catalog_cursor_created_total;
- catalog_cursor_rejected_total;
- catalog_page_size;
- catalog_page_latency_seconds;
- catalog_query_complexity_rejected_total;
- catalog_filter_contradiction_total.

Dimensiones:

- field_count_bucket;
- sort_count_bucket;
- channel;
- result;
- error_code;
- version_policy;
- tenant_tier.

## 41. Auditoría

Registrar:

- request ID;
- tenant;
- filter schema;
- sort schema;
- filter fields;
- page size;
- version;
- result;
- error;
- Correlation ID.

No registrar valores sensibles completos.

## 42. Seguridad

Amenazas:

- field injection;
- operator injection;
- huge IN;
- cursor tampering;
- cross-tenant UUID;
- expensive query;
- hidden field;
- sort injection;
- stale cursor.

Controles:

- schemas;
- whitelists;
- signatures;
- limits;
- tenant validation;
- cost budget;
- timeout;
- rate limit.

## 43. Casos límite

- no filters;
- one filter;
- multiple filters;
- invalid field;
- invalid operator;
- range;
- contradiction;
- boolean;
- enum;
- UUID other tenant;
- price missing;
- relevance tie;
- name accents;
- duplicate values;
- cursor expired;
- version changed;
- page size zero;
- maximum;
- voice;
- cache;
- expensive query.

## 44. Criterios de aceptación

AC-FSP-001

Todo filtro pertenece a schema.

AC-FSP-002

Todo operador está permitido.

AC-FSP-003

Todo valor se valida.

AC-FSP-004

Las referencias respetan tenant.

AC-FSP-005

Los campos internos no se exponen.

AC-FSP-006

El sort usa whitelist.

AC-FSP-007

El orden tiene tie-breaker.

AC-FSP-008

El cursor está protegido.

AC-FSP-009

El cursor se vincula a versión.

AC-FSP-010

La página es estable.

AC-FSP-011

No existen duplicados por paginación.

AC-FSP-012

No se omiten resultados bajo snapshot.

AC-FSP-013

La complejidad se limita.

AC-FSP-014

La voz usa límites pequeños.

AC-FSP-015

Todo resultado es trazable.

## 45. Plan mínimo de pruebas

- schema;
- operators;
- types;
- ranges;
- enums;
- booleans;
- UUID;
- tenant;
- contradiction;
- AND;
- OR;
- complexity;
- relevance;
- name;
- price;
- tie-breaker;
- cursor;
- signature;
- expiry;
- version;
- page size;
- duplicates;
- omissions;
- voice;
- text;
- cache;
- cost;
- metrics;
- audit.

## 46. Checklist

[ ] Existe Filter Schema.
[ ] Existe Sort Schema.
[ ] Se validan fields.
[ ] Se validan operators.
[ ] Se validan values.
[ ] Se validan UUID.
[ ] Se detectan contradicciones.
[ ] Se limita complejidad.
[ ] Se valida sort.
[ ] Se agregan tie-breakers.
[ ] Se protege cursor.
[ ] Se valida tenant.
[ ] Se valida version.
[ ] Se limita page size.
[ ] Se evita duplicado.
[ ] Se evita omisión.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
