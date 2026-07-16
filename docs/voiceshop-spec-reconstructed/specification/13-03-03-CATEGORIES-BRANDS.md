======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-03-03-CATEGORIES-BRANDS.md

# CATEGORÍAS, MARCAS Y NAVEGACIÓN

## 1. Objetivo

Este documento define cómo VoiceShop representa, consulta y navega
categorías y marcas del catálogo.

El objetivo es permitir:

- explorar productos;
- construir menús;
- aplicar filtros;
- resolver referencias;
- presentar opciones;
- mantener jerarquías;
- adaptar navegación a voz y texto.

Categorías y marcas son datos oficiales del catálogo.

## 2. Alcance

Incluye:

- Category ID;
- Brand ID;
- jerarquía;
- categorías raíz;
- subcategorías;
- path;
- marcas;
- aliases;
- localización;
- status;
- visibilidad;
- conteos;
- navegación;
- listas;
- versionado;
- errores;
- observabilidad;
- QA.

No incluye:

- administración detallada;
- stock;
- carrito;
- pedido;
- promociones;
- recomendación avanzada;
- persistencia técnica.

## 3. Principios

RULE-CB-001

Toda categoría posee Category ID.

RULE-CB-002

Toda marca posee Brand ID.

RULE-CB-003

Toda categoría y marca pertenece a un tenant o catálogo compartido
autorizado.

RULE-CB-004

Las jerarquías no deben contener ciclos.

RULE-CB-005

Las categorías inactivas no deben mostrarse al Cliente.

RULE-CB-006

Las marcas inactivas no deben usarse en nuevas búsquedas públicas.

RULE-CB-007

Los aliases deben estar versionados.

RULE-CB-008

La navegación debe respetar visibilidad.

RULE-CB-009

Los conteos no deben afirmar stock.

RULE-CB-010

Una LLM no puede crear Category ID o Brand ID oficiales.

RULE-CB-011

Los nombres deben localizarse.

RULE-CB-012

La posición en menú debe estar versionada.

RULE-CB-013

Las listas deben tener List ID.

RULE-CB-014

La navegación por voz debe limitar opciones.

RULE-CB-015

Toda respuesta debe indicar Catalog Version.

## 4. Contrato de Category

```json
{
  "category_id": "UUID",
  "tenant_id": "UUID",
  "parent_category_id": "UUID_OR_NULL",
  "code": "BEER",
  "name": "Cervezas",
  "description": "STRING_OR_NULL",
  "path": [
    {
      "category_id": "UUID",
      "name": "Bebidas"
    },
    {
      "category_id": "UUID",
      "name": "Cervezas"
    }
  ],
  "status": "ACTIVE",
  "display_order": 20,
  "catalog_version": 42
}
```

## 5. Contrato de Brand

```json
{
  "brand_id": "UUID",
  "tenant_id": "UUID",
  "code": "LAGER_NORTE",
  "name": "Lager Norte",
  "description": "STRING_OR_NULL",
  "status": "ACTIVE",
  "aliases": [
    "lager norte"
  ],
  "image_reference_id": "UUID_OR_NULL",
  "catalog_version": 42
}
```

## 6. Estados

DRAFT

ACTIVE

INACTIVE

ARCHIVED

RESTRICTED

La visibilidad pública normalmente usa ACTIVE.

## 7. Jerarquía de categorías

Una categoría puede tener:

- cero o un parent;
- cero o más children;
- path;
- depth;
- display order.

Debe impedir:

- parent igual a sí misma;
- ciclos;
- depth excesivo;
- parent de otro tenant;
- path inconsistente.

## 8. Categorías raíz

Representan el primer nivel.

Ejemplos:

- Bebidas;
- Alimentos;
- Accesorios.

La cantidad mostrada debe ser limitada por canal.

## 9. Subcategorías

Ejemplos:

Bebidas
    ↓
Cervezas
    ↓
Lager

La jerarquía debe ser estable dentro de una Catalog Version.

## 10. Categorías múltiples

Un producto puede:

- pertenecer a una categoría primaria;
- tener categorías secundarias;
- usar tags.

La política debe definirlo.

La navegación debe evitar duplicados visibles innecesarios.

## 11. Marcas

Una marca puede asociarse con:

- múltiples productos;
- múltiples categorías;
- aliases;
- imagen;
- restricciones;
- localizaciones.

## 12. Aliases

Ejemplos:

- "coca";
- "coca cola";
- "coke".

Los aliases deben:

- ser oficiales;
- pertenecer a marca/categoría;
- tener idioma;
- tener versión;
- evitar colisiones ambiguas.

## 13. Colisiones de alias

Si un alias corresponde a varias marcas:

- marcar ambigüedad;
- pedir aclaración;
- no seleccionar arbitrariamente.

## 14. Localización

Debe soportar:

- name;
- description;
- alt text;
- path label.

Fallback controlado.

## 15. Navegación Request

```json
{
  "navigation_request_id": "UUID",
  "tenant_id": "UUID",
  "node_type": "CATEGORY",
  "parent_id": "UUID_OR_NULL",
  "locale": "es-CL",
  "channel": "WEB",
  "include_product_count": true,
  "page": {
    "limit": 20,
    "cursor": null
  },
  "catalog_version_policy": "LATEST_PUBLISHED"
}
```

## 16. Navigation Result

```json
{
  "navigation_result_id": "UUID",
  "catalog_version": 42,
  "items": [
    {
      "position": 1,
      "type": "CATEGORY",
      "id": "UUID",
      "name": "Cervezas",
      "product_count": 48,
      "has_children": true
    }
  ],
  "list": {
    "list_id": "UUID",
    "version": 1,
    "expires_at": "UTC_TIMESTAMP"
  },
  "page": {
    "next_cursor": null,
    "has_more": false
  }
}
```

## 17. Conteos de producto

Un product_count significa:

Cantidad de productos catalogados y visibles según filtros.

No significa:

- stock;
- unidades;
- disponibilidad.

Debe indicarse como conteo de catálogo.

## 18. Visibilidad

Puede depender de:

- tenant;
- actor;
- canal;
- región;
- edad;
- feature flag;
- status.

## 19. Orden

Campos permitidos:

- display_order;
- name;
- product_count;
- relevance.

El display_order debe ser administrado y versionado.

## 20. List ID

Toda navegación visible crea List ID.

Permite:

- "la segunda categoría";
- "esa marca";
- botones;
- voz.

## 21. Navegación por texto

Puede mostrar:

- grid;
- árbol;
- breadcrumbs;
- imágenes;
- botones;
- conteos;
- filtros.

## 22. Navegación por voz

Debe:

- ofrecer pocas opciones;
- priorizar categorías relevantes;
- permitir "más opciones";
- pronunciar nombres;
- registrar posiciones entregadas.

## 23. Breadcrumbs

Deben usar IDs oficiales.

Ejemplo:

Bebidas > Cervezas > Lager

No deben construirse sólo desde texto.

## 24. Resolución por nombre

Entrada:

"cervezas"

Proceso:

- normalizar;
- buscar nombre;
- buscar alias;
- filtrar tenant;
- filtrar status;
- resolver o aclarar.

## 25. Brand browsing

Puede iniciarse desde:

- categoría;
- consulta;
- producto;
- lista general.

Debe filtrar marcas sin productos visibles si la política lo requiere.

## 26. Categorías vacías

Puede ocultarse o mostrarse según:

- administración;
- navegación pública;
- diseño.

Nunca deben afirmar disponibilidad.

## 27. Categoría eliminada

No debería eliminarse físicamente si existen referencias históricas.

Puede marcarse ARCHIVED.

Los productos activos deben migrarse o quedar consistentes.

## 28. Marca eliminada

Igual política:

- inactivar;
- archivar;
- conservar referencias históricas.

## 29. Versionado

Cambios que incrementan versión:

- nombre;
- parent;
- status;
- aliases;
- display order;
- localización;
- relación producto;
- imagen.

## 30. Caché

Clave:

- tenant;
- node;
- parent;
- locale;
- visibility;
- catalog version;
- page.

Invalidación:

- CategoryUpdated;
- BrandUpdated;
- CatalogVersionPublished;
- relación producto;
- status;
- alias.

## 31. Flujo de categorías

1. recibir request.
2. validar tenant.
3. resolver version.
4. validar parent.
5. cargar children.
6. filtrar status.
7. filtrar visibilidad.
8. localizar.
9. contar productos si aplica.
10. ordenar.
11. paginar.
12. crear List ID.
13. devolver.

## 32. Flujo de marcas

1. recibir request.
2. validar categoría opcional.
3. cargar marcas.
4. filtrar tenant.
5. filtrar status.
6. filtrar visibilidad.
7. localizar.
8. ordenar.
9. paginar.
10. crear List ID.
11. devolver.

## 33. Pseudocódigo

```text
function navigate_catalog(request):

    validate_tenant(request.tenant_id)
    catalog_version = resolve_catalog_version(
        request.catalog_version_policy
    )

    if request.node_type == CATEGORY:
        validate_parent_category(request.parent_id)
        items = load_category_children(
            request.parent_id,
            request.tenant_id,
            catalog_version
        )
    else:
        items = load_brands(
            request.parent_id,
            request.tenant_id,
            catalog_version
        )

    visible = apply_navigation_visibility(items, request)
    localized = localize_navigation_items(
        visible,
        request.locale
    )

    if request.include_product_count:
        localized = attach_catalog_product_counts(localized)

    ordered = sort_navigation_items(localized)
    page = paginate_navigation(ordered, request.page)
    result = create_navigation_result(page, catalog_version)

    persist_navigation_metadata(result)
    emit(CatalogNavigationCompleted)
    return result
```

## 34. Validaciones

VAL-CB-001

Tenant válido.

VAL-CB-002

Node type permitido.

VAL-CB-003

Parent existe.

VAL-CB-004

Parent pertenece al tenant.

VAL-CB-005

No existe ciclo.

VAL-CB-006

Status permitido.

VAL-CB-007

Limit válido.

VAL-CB-008

Cursor válido.

VAL-CB-009

Locale soportado.

VAL-CB-010

Catalog Version existe.

## 35. Errores

CATEGORY_NOT_FOUND

CATEGORY_INACTIVE

CATEGORY_RESTRICTED

CATEGORY_TENANT_MISMATCH

CATEGORY_HIERARCHY_INVALID

CATEGORY_CYCLE_DETECTED

CATEGORY_DEPTH_EXCEEDED

BRAND_NOT_FOUND

BRAND_INACTIVE

BRAND_RESTRICTED

BRAND_TENANT_MISMATCH

BRAND_ALIAS_AMBIGUOUS

CATALOG_NAVIGATION_CURSOR_INVALID

CATALOG_NAVIGATION_VERSION_NOT_FOUND

CATALOG_NAVIGATION_UNAVAILABLE

## 36. Eventos

CategoryCreated

CategoryUpdated

CategoryActivated

CategoryDeactivated

CategoryArchived

CategoryParentChanged

BrandCreated

BrandUpdated

BrandActivated

BrandDeactivated

BrandArchived

BrandAliasAdded

BrandAliasRemoved

CatalogNavigationCompleted

## 37. Observabilidad

Métricas:

- category_navigation_total;
- brand_navigation_total;
- category_resolution_total;
- brand_resolution_total;
- category_empty_total;
- brand_empty_total;
- hierarchy_error_total;
- alias_ambiguity_total;
- navigation_latency_seconds;
- navigation_cache_hit_total.

Dimensiones:

- node_type;
- depth_bucket;
- locale;
- channel;
- result;
- error_code;
- tenant_tier.

## 38. Auditoría

Registrar:

- Navigation Request ID;
- tenant;
- actor;
- node type;
- parent;
- version;
- count;
- List ID;
- error;
- Correlation ID.

## 39. Seguridad

Amenazas:

- parent de otro tenant;
- alias poisoning;
- hidden category;
- cycle;
- cursor manipulation;
- field exposure;
- rate abuse;
- prompt injection en description.

Controles:

- tenant;
- schema;
- visibility;
- escaping;
- version;
- cursor firmado;
- rate limit;
- validation.

## 40. Casos límite

- root;
- deep hierarchy;
- cycle;
- inactive parent;
- empty category;
- brand without products;
- duplicate alias;
- locale missing;
- voice;
- text;
- cursor expired;
- version changed;
- tenant mismatch;
- restricted;
- archived;
- product count unavailable;
- cache stale;
- description malicious.

## 41. Criterios de aceptación

AC-CB-001

Toda categoría tiene ID.

AC-CB-002

Toda marca tiene ID.

AC-CB-003

Las jerarquías no tienen ciclos.

AC-CB-004

Los tenants están aislados.

AC-CB-005

Los status se filtran.

AC-CB-006

Los aliases se versionan.

AC-CB-007

Las colisiones se aclaran.

AC-CB-008

Los conteos no representan stock.

AC-CB-009

La navegación crea List ID.

AC-CB-010

La voz limita opciones.

AC-CB-011

La localización usa fallback.

AC-CB-012

La paginación es estable.

AC-CB-013

La caché respeta versión.

AC-CB-014

La LLM no crea IDs.

AC-CB-015

Todo acceso es trazable.

## 42. Plan mínimo de pruebas

- root category;
- child category;
- hierarchy;
- cycle;
- depth;
- status;
- tenant;
- brand;
- alias;
- ambiguity;
- localization;
- fallback;
- count;
- order;
- pagination;
- cursor;
- voice;
- text;
- restricted;
- archived;
- cache;
- security;
- metrics;
- audit.

## 43. Checklist

[ ] Existe Category ID.
[ ] Existe Brand ID.
[ ] Existe tenant.
[ ] Existe parent.
[ ] Existe path.
[ ] Existe status.
[ ] Existe display order.
[ ] Existen aliases.
[ ] Existe localización.
[ ] Existe version.
[ ] Existe List ID.
[ ] Se valida jerarquía.
[ ] Se valida ciclo.
[ ] Se valida visibilidad.
[ ] Se controla conteo.
[ ] Se pagina.
[ ] Se cachea con versión.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
