======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-03-02-PRODUCT-DETAILS.md

# DETALLE OFICIAL DE PRODUCTO

## 1. Objetivo

Este documento define cómo VoiceShop consulta, valida y presenta el
detalle oficial de un producto del catálogo.

El detalle de producto debe ser suficiente para:

- identificar el producto;
- mostrar su nombre oficial;
- informar presentación;
- informar atributos;
- informar restricciones;
- informar estado comercial;
- entregar referencias visuales;
- entregar precio cuando el catálogo sea su fuente oficial;
- preparar una selección posterior.

La consulta de detalle no:

- afirma stock;
- reserva unidades;
- agrega al carrito;
- crea pedidos;
- procesa pagos;
- modifica el producto;
- acepta información inventada por una LLM.

## 2. Alcance

Incluye:

- consulta por Product ID;
- consulta por SKU;
- consulta por barcode;
- consulta por referencia resuelta;
- nombre;
- descripción;
- categoría;
- marca;
- variante;
- presentación;
- atributos;
- imágenes;
- etiquetas autorizadas;
- restricciones;
- estado;
- vigencia;
- precio oficial cuando corresponda;
- localización;
- adaptación a voz y texto;
- errores;
- observabilidad;
- QA.

No incluye:

- búsqueda general;
- inventario;
- reserva;
- promoción compleja;
- recomendación;
- administración;
- persistencia física concreta.

## 3. Principios

RULE-PDETAIL-001

Todo detalle debe corresponder a un Product ID oficial.

RULE-PDETAIL-002

Todo producto debe pertenecer al tenant solicitado.

RULE-PDETAIL-003

El detalle debe indicar Catalog Version.

RULE-PDETAIL-004

Los datos oficiales deben distinguirse de datos derivados.

RULE-PDETAIL-005

Un producto inactivo no debe presentarse como comprable.

RULE-PDETAIL-006

El catálogo no debe afirmar stock.

RULE-PDETAIL-007

El precio sólo se muestra si proviene de una fuente oficial vigente.

RULE-PDETAIL-008

Las imágenes deben ser referencias autorizadas.

RULE-PDETAIL-009

Los campos sensibles o internos no se exponen al Cliente.

RULE-PDETAIL-010

La respuesta debe respetar idioma y locale.

RULE-PDETAIL-011

La voz debe presentar un resumen breve.

RULE-PDETAIL-012

Los atributos deben estar tipados.

RULE-PDETAIL-013

Una variante debe conservar relación con el producto base.

RULE-PDETAIL-014

La consulta debe ser idempotente.

RULE-PDETAIL-015

La LLM no puede crear o alterar el detalle oficial.

## 4. Contrato de Product Detail Request

```json
{
  "product_detail_request_id": "UUID",
  "tenant_id": "UUID",
  "actor_id": "UUID_OR_NULL",
  "session_id": "UUID_OR_NULL",
  "reference": {
    "type": "PRODUCT_ID",
    "value": "UUID"
  },
  "fields": [
    "BASIC",
    "PRESENTATION",
    "ATTRIBUTES",
    "IMAGES",
    "PRICE"
  ],
  "locale": "es-CL",
  "channel": "WEB",
  "catalog_version_policy": "LATEST_PUBLISHED"
}
```

## 5. Contrato de Product Detail Result

```json
{
  "product_detail_result_id": "UUID",
  "product_detail_request_id": "UUID",
  "tenant_id": "UUID",
  "catalog_version": 42,
  "product": {
    "product_id": "UUID",
    "sku": "SKU-001",
    "barcode": "7800000000000",
    "name": "Lager Norte 330 ml",
    "short_name": "Lager Norte",
    "description": "Cerveza lager en lata.",
    "status": "ACTIVE",
    "category": {
      "category_id": "UUID",
      "name": "Cervezas"
    },
    "brand": {
      "brand_id": "UUID",
      "name": "Lager Norte"
    },
    "variant": {
      "variant_id": "UUID_OR_NULL",
      "name": "Original"
    },
    "presentation": {
      "quantity": 330,
      "unit": "ML",
      "package_type": "CAN",
      "units_per_package": 1
    },
    "attributes": {
      "alcohol_free": false,
      "gluten_free": null,
      "country_of_origin": "CL"
    },
    "restrictions": [
      "AGE_RESTRICTED"
    ],
    "images": [
      {
        "image_reference_id": "UUID",
        "role": "PRIMARY",
        "alt_text": "Lata Lager Norte de 330 ml"
      }
    ],
    "price": {
      "amount": 1200,
      "currency": "CLP",
      "price_type": "CURRENT",
      "valid_from": "UTC_TIMESTAMP",
      "valid_until": "UTC_TIMESTAMP_OR_NULL",
      "source": "OFFICIAL_PRICING"
    }
  },
  "warnings": [
    "STOCK_NOT_INCLUDED"
  ],
  "retrieved_at": "UTC_TIMESTAMP"
}
```

## 6. Identificación de producto

Referencias permitidas:

- Product ID;
- SKU;
- barcode;
- Product Reference previamente resuelta;
- signed product reference;
- List ID + position.

Toda referencia debe validar:

- tenant;
- vigencia;
- status;
- permisos;
- versión.

## 7. Product ID

Es la identidad oficial interna.

No debe derivarse de:

- nombre;
- posición;
- texto de LLM;
- URL no verificada.

## 8. SKU

Debe ser único dentro del alcance definido.

La consulta por SKU debe:

- normalizar según política;
- preservar case cuando corresponda;
- validar tenant;
- detectar duplicados de datos.

## 9. Barcode

Debe validar:

- formato;
- longitud;
- dígito de control cuando aplique;
- tenant;
- producto activo.

Un barcode no debe buscarse globalmente si el tenant está definido.

## 10. Nombre oficial

Debe incluir:

- nombre completo;
- nombre corto opcional;
- idioma;
- versión;
- estado.

No debe sustituirse por una paráfrasis de LLM como nombre oficial.

## 11. Descripción

Puede ser:

- oficial;
- localizada;
- resumida;
- enriquecida.

Toda descripción generada debe marcarse como DERIVED y validarse.

No debe incluir:

- promesas no autorizadas;
- propiedades médicas;
- stock;
- promociones no vigentes;
- instrucciones maliciosas.

## 12. Categoría

Debe contener:

- Category ID;
- nombre;
- path opcional;
- estado.

La categoría no reemplaza la identidad del producto.

## 13. Marca

Debe contener:

- Brand ID;
- nombre;
- estado;
- referencia visual opcional.

No inferir marca sólo por similitud si el dato oficial existe.

## 14. Variante

Ejemplos:

- sabor;
- color;
- estilo;
- edición;
- sin azúcar;
- sin alcohol.

Debe relacionarse con:

- Product ID;
- Product Family ID cuando exista;
- presentación;
- status.

## 15. Presentación

Debe ser estructurada.

Campos:

- quantity;
- unit;
- package_type;
- units_per_package;
- net_content;
- display_label.

Ejemplos:

- 330 ml lata;
- 1 litro botella;
- pack de 6;
- caja de 12.

## 16. Atributos

Los atributos deben provenir de un schema.

Ejemplos:

- alcohol percentage;
- alcohol free;
- sugar free;
- gluten free;
- organic;
- country of origin;
- color;
- flavor;
- material;
- dimensions.

No aceptar claves arbitrarias sin política.

## 17. Valores desconocidos

Debe distinguirse:

- false;
- true;
- null;
- not_applicable;
- not_disclosed.

No convertir null en false.

## 18. Restricciones

Pueden incluir:

- AGE_RESTRICTED;
- REGION_RESTRICTED;
- CHANNEL_RESTRICTED;
- TIME_RESTRICTED;
- AUTHENTICATION_REQUIRED;
- HUMAN_REVIEW_REQUIRED.

El detalle puede mostrar la existencia de una restricción.

La autorización final ocurre fuera del catálogo.

## 19. Estado comercial

ACTIVE

Disponible para nuevas operaciones, sujeto a inventario y políticas.

INACTIVE

No disponible para nuevas operaciones.

DISCONTINUED

Descontinuado.

RESTRICTED

Condicionado.

ARCHIVED

Histórico.

DRAFT

No visible.

## 20. Precio

Cuando esté incluido, debe indicar:

- amount;
- currency;
- tax inclusion;
- price type;
- source;
- version;
- valid_from;
- valid_until;
- branch scope;
- channel scope.

No debe inferirse precio desde texto del Cliente.

## 21. Precio ausente

Si la fuente de precio no está disponible:

- devolver producto sin precio si la política lo permite;
- incluir PRICE_UNAVAILABLE;
- no inventar;
- no reutilizar precio expirado sin advertencia.

## 22. Stock

El detalle debe declarar explícitamente:

STOCK_NOT_INCLUDED

o una referencia para consultar Inventory.

No usar frases como:

"Disponible"

si sólo significa ACTIVE en catálogo.

## 23. Imágenes

Cada imagen debe contener:

- Image Reference ID;
- role;
- alt text;
- dimensions opcionales;
- format;
- status;
- version.

No exponer rutas internas.

## 24. Roles de imagen

PRIMARY

GALLERY

THUMBNAIL

PACKAGING

LABEL

DETAIL

No aceptar URL arbitraria enviada por el Cliente.

## 25. Contenido localizado

Debe soportar:

- nombre;
- descripción;
- alt text;
- atributos visibles.

Fallback:

1. locale exacto;
2. idioma base;
3. locale del tenant;
4. idioma por defecto.

Debe indicarse fallback cuando sea relevante.

## 26. Campos visibles

Perfiles:

PUBLIC

Datos básicos.

AUTHENTICATED

Datos permitidos adicionales.

OPERATOR

Datos operativos.

ADMIN

Datos administrativos.

El Cliente no debe recibir:

- costos internos;
- margen;
- notas privadas;
- proveedor interno;
- flags de fraude;
- IDs sensibles.

## 27. Adaptación a texto

Puede mostrar:

- nombre;
- presentación;
- descripción breve;
- precio;
- atributos;
- restricciones;
- imagen;
- botón firmado.

## 28. Adaptación a voz

Debe priorizar:

- nombre;
- presentación;
- precio;
- uno o dos atributos;
- restricción relevante.

Debe evitar leer:

- UUID;
- barcode completo;
- descripciones extensas;
- listas largas.

## 29. Versionado

El resultado debe indicar:

- catalog_version;
- product_version opcional;
- retrieved_at;
- price version;
- image version.

## 30. Caché

Puede cachearse por:

- tenant;
- Product ID;
- locale;
- field set;
- catalog version;
- visibility profile.

Debe invalidarse por:

- ProductUpdated;
- status;
- price;
- image;
- localization;
- policy.

## 31. Idempotencia

La consulta es de lectura.

Mismo Request ID y mismos parámetros:

- mismo resultado lógico bajo misma versión.

## 32. Flujo principal

1. Recibir request.
2. validar tenant.
3. validar actor y perfil.
4. validar referencia.
5. resolver Product ID.
6. cargar Catalog Version.
7. cargar producto.
8. validar status.
9. seleccionar campos.
10. localizar contenido.
11. cargar precio si aplica.
12. cargar imágenes.
13. filtrar campos.
14. construir warnings.
15. persistir metadatos.
16. emitir ProductDetailsRetrieved.
17. devolver resultado.

## 33. Pseudocódigo

```text
function get_product_details(request):

    validate_tenant(request.tenant_id)
    visibility = resolve_visibility_profile(request.actor_id)
    product_id = resolve_official_product_reference(
        request.reference,
        request.tenant_id
    )

    catalog_version = resolve_catalog_version(
        request.catalog_version_policy
    )

    product = load_product(
        product_id,
        request.tenant_id,
        catalog_version
    )

    validate_product_visibility(product, visibility)

    localized = localize_product(product, request.locale)
    selected = select_allowed_fields(
        localized,
        request.fields,
        visibility
    )

    if "PRICE" in request.fields:
        selected.price = load_official_price(product, request)

    if "IMAGES" in request.fields:
        selected.images = load_authorized_images(product, request)

    result = build_product_detail_result(
        selected,
        catalog_version
    )

    persist_query_metadata(result)
    emit(ProductDetailsRetrieved)
    return result
```

## 34. Errores

PRODUCT_DETAIL_REFERENCE_INVALID

PRODUCT_DETAIL_NOT_FOUND

PRODUCT_DETAIL_TENANT_MISMATCH

PRODUCT_DETAIL_INACTIVE

PRODUCT_DETAIL_RESTRICTED

PRODUCT_DETAIL_FIELD_NOT_ALLOWED

PRODUCT_DETAIL_LOCALE_UNAVAILABLE

PRODUCT_DETAIL_PRICE_UNAVAILABLE

PRODUCT_DETAIL_IMAGE_UNAVAILABLE

PRODUCT_DETAIL_CATALOG_VERSION_NOT_FOUND

PRODUCT_DETAIL_DEPENDENCY_UNAVAILABLE

PRODUCT_DETAIL_RATE_LIMITED

## 35. Eventos

ProductDetailsRequested

ProductDetailsRetrieved

ProductDetailsRejected

ProductLocalizationFallbackUsed

ProductPriceUnavailable

ProductImageUnavailable

ProductRestrictedAccessAttempted

## 36. Observabilidad

Métricas:

- product_detail_requests_total;
- product_detail_success_total;
- product_detail_failure_total;
- product_detail_latency_seconds;
- product_detail_price_unavailable_total;
- product_detail_image_unavailable_total;
- product_detail_localization_fallback_total;
- product_detail_cache_hit_total;
- product_detail_restricted_total.

Dimensiones:

- field_profile;
- locale;
- channel;
- status;
- result;
- error_code;
- tenant_tier.

## 37. Auditoría

Registrar:

- Request ID;
- Product ID protegido;
- tenant;
- actor;
- fields;
- visibility;
- version;
- resultado;
- error;
- Correlation ID.

No registrar:

- costos internos;
- notas privadas;
- PII innecesaria.

## 38. Seguridad

Amenazas:

- Product ID de otro tenant;
- field escalation;
- URL maliciosa;
- hidden field access;
- barcode enumeration;
- rate abuse;
- stale price;
- prompt injection en descripción.

Controles:

- tenant;
- visibility profiles;
- schemas;
- image references;
- redacción;
- rate limit;
- output escaping;
- data classification.

## 39. Casos límite

- Product ID inexistente;
- SKU duplicado;
- barcode inválido;
- producto inactive;
- restricted;
- archived;
- locale faltante;
- precio expirado;
- price provider down;
- image missing;
- variant missing;
- null attribute;
- pack presentation;
- voz;
- texto;
- tenant mismatch;
- hidden field;
- description maliciosa;
- cache stale.

## 40. Criterios de aceptación

AC-PDETAIL-001

Todo detalle posee Product ID oficial.

AC-PDETAIL-002

Todo detalle respeta tenant.

AC-PDETAIL-003

Todo detalle indica Catalog Version.

AC-PDETAIL-004

El status se valida.

AC-PDETAIL-005

El catálogo no afirma stock.

AC-PDETAIL-006

El precio tiene fuente y vigencia.

AC-PDETAIL-007

Las imágenes son referencias autorizadas.

AC-PDETAIL-008

Los campos internos se filtran.

AC-PDETAIL-009

La localización es controlada.

AC-PDETAIL-010

Los null no se convierten en false.

AC-PDETAIL-011

La voz recibe resumen.

AC-PDETAIL-012

La respuesta textual puede incluir estructura.

AC-PDETAIL-013

La LLM no altera hechos.

AC-PDETAIL-014

La caché respeta versión.

AC-PDETAIL-015

Todo acceso es trazable.

## 41. Plan mínimo de pruebas

- Product ID;
- SKU;
- barcode;
- tenant;
- active;
- inactive;
- restricted;
- archived;
- basic fields;
- attributes;
- null values;
- presentation;
- price;
- price expiry;
- image;
- locale;
- fallback;
- visibility;
- hidden fields;
- voice;
- text;
- cache;
- dependency;
- security;
- metrics;
- audit.

## 42. Checklist

[ ] Existe Request ID.
[ ] Existe Product ID.
[ ] Existe tenant.
[ ] Existe Catalog Version.
[ ] Existe status.
[ ] Existe categoría.
[ ] Existe marca.
[ ] Existe presentación.
[ ] Existen atributos.
[ ] Existen restricciones.
[ ] Existe política de precio.
[ ] Existe advertencia de stock.
[ ] Existen imágenes autorizadas.
[ ] Existe localización.
[ ] Existe visibility profile.
[ ] Se controla caché.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
