======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-03-09-CATALOG-TESTING.md

# TESTING DEL CONTEXTO DE CATÁLOGO

## 1. Objetivo

Este documento define la estrategia exhaustiva de pruebas del contexto
de catálogo de VoiceShop.

Las pruebas deben verificar:

- exactitud;
- aislamiento de tenant;
- estabilidad;
- consistencia de versiones;
- integridad de jerarquías;
- resolución de referencias;
- paginación estable;
- caché segura;
- publicación atómica;
- recuperación;
- privacidad;
- seguridad;
- observabilidad;
- independencia tecnológica.

## 2. Alcance

Incluye pruebas de:

- búsqueda;
- detalle;
- categorías;
- marcas;
- aliases;
- filtros;
- ordenamiento;
- paginación;
- cursores;
- listas;
- resolución;
- versionado;
- publicación;
- rollback;
- snapshots;
- caché;
- errores;
- observabilidad;
- seguridad;
- rendimiento;
- resiliencia;
- contrato.

## 3. Principios

RULE-CTEST-001

Todo requisito del catálogo debe mapearse a pruebas.

RULE-CTEST-002

Toda regla debe tener prueba positiva y negativa.

RULE-CTEST-003

Toda referencia oficial debe probar tenant.

RULE-CTEST-004

Toda paginación debe probar duplicados y omisiones.

RULE-CTEST-005

Toda caché debe probar contaminación entre tenants.

RULE-CTEST-006

Toda publicación debe probar atomicidad.

RULE-CTEST-007

Todo cursor debe probar manipulación.

RULE-CTEST-008

Toda resolución debe probar ambigüedad.

RULE-CTEST-009

Toda dependencia debe probar timeout.

RULE-CTEST-010

Toda prueba debe ser reproducible.

RULE-CTEST-011

Los datasets deben versionarse.

RULE-CTEST-012

No se usan secretos reales.

RULE-CTEST-013

Las pruebas deben producir evidencia.

RULE-CTEST-014

Toda regresión debe agregar caso permanente.

RULE-CTEST-015

Los errores de seguridad bloquean la liberación.

## 4. Capas

UNIT

- normalización;
- filtros;
- operadores;
- sort;
- cursor;
- versiones;
- validadores;
- schemas;
- aliases;
- jerarquías.

COMPONENT

- Product Search;
- Product Detail;
- Category Navigation;
- Brand Navigation;
- Reference Resolver;
- Cache Manager;
- Publication Validator.

CONTRACT

- fuente de catálogo;
- pricing;
- image service;
- semantic index;
- cache;
- event bus.

INTEGRATION

- búsqueda + resolución;
- catálogo + conversación;
- catálogo + carrito;
- publicación + caché;
- rollback + latest pointer.

END-TO-END

- búsqueda;
- selección;
- detalle;
- carrito;
- cambio de versión;
- voz;
- texto.

ADVERSARIAL

- cross-tenant;
- cursor tampering;
- query injection;
- filter injection;
- cache poisoning;
- alias poisoning;
- enumeration.

## 5. Identificadores

Formato:

TEST-CATALOG-<ÁREA>-<NÚMERO>

Ejemplos:

TEST-CATALOG-SEARCH-001

TEST-CATALOG-CURSOR-014

TEST-CATALOG-PUBLISH-008

## 6. Estructura de caso

```yaml
test_id: TEST-CATALOG-SEARCH-001
title: Buscar producto por nombre exacto
requirements:
  - AC-SEARCH-001
  - AC-SEARCH-002
given:
  tenant_id: TENANT-A
  catalog_version: 42
  products:
    - product_id: PRODUCT-A
      name: Lager Norte 330 ml
      status: ACTIVE
when:
  query: lager norte 330 ml
then:
  result_count: 1
  product_id: PRODUCT-A
  tenant_id: TENANT-A
  strategy: EXACT_NAME
evidence:
  - structured_result
  - trace
```

## 7. Datasets

Datasets mínimos:

- catalog-products-basic;
- catalog-products-multilingual;
- catalog-brands;
- catalog-categories-tree;
- catalog-aliases;
- catalog-ambiguous-references;
- catalog-fuzzy-queries;
- catalog-semantic-queries;
- catalog-filters;
- catalog-pagination;
- catalog-versioning;
- catalog-security;
- catalog-data-integrity;
- Chilean-retail-catalog.

Cada dataset debe declarar:

- Dataset ID;
- versión;
- licencia;
- tenant;
- locale;
- entities;
- expected outputs;
- tags;
- generated/real;
- sensitivity;
- checksum.

## 8. Datos sintéticos

Preferir datos sintéticos para:

- Product IDs;
- SKUs;
- barcodes;
- nombres;
- precios;
- tenant;
- aliases;
- restricciones.

No usar datos comerciales privados sin autorización.

## 9. Pruebas de búsqueda exacta

- Product ID;
- SKU;
- barcode;
- nombre exacto;
- alias exacto;
- case;
- acentos;
- espacios;
- locale;
- active status;
- tenant.

## 10. Pruebas de búsqueda textual

- una palabra;
- varias palabras;
- marca;
- categoría;
- presentación;
- atributo;
- negación;
- error ortográfico;
- consulta larga;
- caracteres especiales;
- idioma mixto;
- query vacía.

## 11. Pruebas fuzzy

- distancia mínima;
- transposición;
- acento;
- homófono;
- empate;
- threshold;
- palabra corta;
- Product ID similar;
- tenant;
- false positive.

## 12. Pruebas semantic

- descripción;
- atributo;
- categoría;
- intención vaga;
- similar score;
- segundo candidato cercano;
- índice caído;
- Product ID inexistente;
- Product ID de otro tenant;
- status inactivo;
- poisoning.

## 13. Pruebas de resultados vacíos

- no match;
- filtros estrictos;
- categoría vacía;
- producto inactivo;
- tenant incorrecto;
- version antigua;
- semantic unavailable.

Validar que no se inventen productos.

## 14. Pruebas de muchos resultados

- limit;
- ranking;
- tie-breaker;
- voice top N;
- text page;
- filters;
- next cursor;
- estabilidad.

## 15. Pruebas de detalle

- Product ID;
- SKU;
- barcode;
- campos básicos;
- presentación;
- atributos;
- null;
- marca;
- categoría;
- variante;
- imágenes;
- precio;
- restricciones;
- locale;
- visibility profiles.

## 16. Pruebas de estado

- DRAFT;
- ACTIVE;
- INACTIVE;
- DISCONTINUED;
- ARCHIVED;
- RESTRICTED.

Cada actor y canal debe recibir el comportamiento esperado.

## 17. Pruebas de precio

Cuando corresponda:

- precio vigente;
- expirado;
- moneda;
- scope;
- branch;
- channel;
- proveedor caído;
- versión;
- null;
- sort por precio.

No probar stock en catálogo.

## 18. Pruebas de imágenes

- primary;
- gallery;
- alt text;
- inactive;
- missing;
- invalid reference;
- other tenant;
- malicious URL;
- locale;
- hidden metadata.

## 19. Pruebas de categorías

- root;
- child;
- path;
- display order;
- active;
- inactive;
- empty;
- restricted;
- tenant;
- localization;
- product count;
- deep hierarchy.

## 20. Pruebas de ciclos

- self-parent;
- direct cycle;
- indirect cycle;
- cross-tenant parent;
- depth exceeded;
- path inconsistent.

Publicación debe fallar cuando el ciclo sea crítico.

## 21. Pruebas de marcas

- active;
- inactive;
- alias;
- duplicate alias;
- localization;
- image;
- no visible products;
- tenant;
- restricted.

## 22. Pruebas de aliases

- exact;
- locale;
- version;
- collision;
- inactive;
- target missing;
- target other tenant;
- poisoning;
- generated candidate no oficial.

## 23. Pruebas de filtros

- valid field;
- invalid field;
- operator;
- type;
- range;
- enum;
- boolean;
- UUID;
- tenant;
- contradiction;
- AND;
- OR;
- depth;
- IN size;
- cost.

## 24. Pruebas de sort

- relevance;
- name;
- accents;
- locale;
- price;
- no price;
- direction;
- invalid field;
- tie-breaker;
- stability;
- duplicate names.

## 25. Pruebas de cursor

- válido;
- expirado;
- firma inválida;
- query mismatch;
- filter mismatch;
- sort mismatch;
- tenant mismatch;
- version mismatch;
- visibility mismatch;
- page size mismatch;
- replay;
- tampering.

## 26. Pruebas de paginación

- primera página;
- intermedia;
- última;
- vacía;
- page size;
- maximum;
- duplicate prevention;
- omission prevention;
- concurrent catalog change;
- snapshot;
- cursor-bound version.

## 27. Pruebas de List ID

- creación;
- versión;
- expiración;
- posición;
- delivered positions;
- voz parcial;
- text complete;
- Session mismatch;
- tenant mismatch;
- Catalog Version mismatch;
- ordinal.

## 28. Pruebas de resolución

- Product ID;
- SKU;
- barcode;
- signed reference;
- exact name;
- alias;
- brand + presentation;
- ordinal;
- pronoun;
- relative;
- fuzzy;
- semantic;
- ambiguity;
- not found;
- inactive;
- restricted;
- low confidence.

## 29. Pruebas de signed references

- válida;
- expirada;
- firma inválida;
- tenant;
- Session;
- List ID;
- Catalog Version;
- Product inactive;
- replay.

## 30. Pruebas de contexto

- last product;
- last list;
- new list replaces old;
- pending intent;
- change of channel;
- voice;
- text;
- context stale;
- Session closed.

## 31. Pruebas de versionado

- latest;
- exact;
- list-bound;
- cursor-bound;
- Session pinned;
- archived;
- not published;
- tenant mismatch;
- version conflict;
- stale read.

## 32. Pruebas de publicación

- valid snapshot;
- invalid Product ID;
- duplicate SKU;
- duplicate barcode;
- category cycle;
- missing brand;
- alias collision;
- missing localization;
- checksum mismatch;
- atomic publication;
- event duplicate;
- pointer update.

## 33. Pruebas de idempotencia de publicación

- same request;
- same hash;
- different payload;
- retry after timeout;
- duplicate event;
- concurrent publication;
- reserved version conflict.

## 34. Pruebas de rollback

- valid target;
- nonexistent target;
- archived target;
- unauthorized actor;
- concurrent publish;
- pointer failure;
- cache invalidation;
- audit;
- post-rollback reads.

## 35. Pruebas de caché

- hit;
- miss;
- stale;
- schema mismatch;
- tenant mismatch;
- version mismatch;
- visibility mismatch;
- invalid entry;
- backend down;
- write fail;
- invalidation;
- prewarm;
- stampede;
- single flight.

## 36. Pruebas de contaminación entre tenants

Casos obligatorios:

- Product Detail;
- Search Result;
- Alias;
- Category;
- Brand;
- List;
- Cursor;
- Cache;
- Snapshot;
- Latest pointer.

Cualquier filtración bloquea release.

## 37. Pruebas de stale data

- safe description;
- stale status;
- stale restriction;
- stale price;
- stale alias;
- stale list;
- stale cursor;
- stale snapshot.

Validar política distinta según criticidad.

## 38. Pruebas de errores

Cada código de:

13-03-07-CATALOG-ERRORS.md

debe tener al menos:

- trigger;
- mapping;
- safe message;
- retryable;
- telemetry;
- channel adaptation;
- redaction.

## 39. Pruebas de observabilidad

- logs;
- metrics;
- traces;
- correlation;
- version;
- strategy;
- cache state;
- redaction;
- cardinality;
- sampling;
- alert;
- dashboard;
- backend down;
- buffer.

## 40. Pruebas de seguridad

- query injection;
- filter injection;
- sort injection;
- cursor tampering;
- hidden field;
- cross-tenant;
- enumeration;
- alias poisoning;
- semantic poisoning;
- cache poisoning;
- malicious description;
- malicious image reference.

## 41. Pruebas de privacidad

- query with PII;
- logs;
- traces;
- metrics;
- audit;
- retention;
- deletion;
- access;
- debug mode;
- exported datasets.

## 42. Pruebas de rendimiento

Perfiles:

- exact lookup;
- search;
- semantic;
- detail;
- category navigation;
- pagination;
- cache miss;
- publication;
- cache invalidation.

Medir:

- p50;
- p95;
- p99;
- throughput;
- CPU;
- memory;
- dependency usage;
- cache hit rate;
- cost.

## 43. Pruebas de carga

- steady;
- spike;
- high cardinality queries;
- cache cold;
- cache warm;
- publication during traffic;
- rollback during traffic;
- dependency degradation.

## 44. Pruebas de resiliencia

Inyectar:

- source timeout;
- cache down;
- semantic down;
- image service down;
- pricing down;
- event bus delay;
- duplicate event;
- DB latency;
- clock skew;
- partial network;
- stale replica.

## 45. Pruebas de contrato

Fuente de catálogo:

- schema;
- status;
- Product ID;
- version;
- error mapping;
- pagination;
- timeout.

Semantic index:

- Product IDs;
- score;
- tenant;
- timeout;
- invalid result.

Pricing:

- amount;
- currency;
- validity;
- scope;
- error.

## 46. Property-based testing

Aplicar a:

- normalización;
- filtros;
- cursors;
- sort;
- pagination;
- hierarchy;
- aliases;
- serialización;
- versioning.

Propiedades:

- no crash;
- determinismo;
- stable ordering;
- no duplicate;
- no omission;
- tenant isolation;
- round-trip;
- idempotencia.

## 47. Mutation testing

Aplicar a:

- tenant checks;
- status;
- filters;
- cursor signatures;
- publication validation;
- cache keys;
- visibility;
- error mapping.

## 48. Golden tests

Para búsqueda y resolución:

- query;
- expected Product IDs;
- order;
- ambiguity;
- explanation;
- version.

No comparar únicamente texto libre.

## 49. Regression suite

Debe incluir:

- bugs;
- incidentes;
- data integrity;
- security;
- stale cache;
- cursor;
- alias;
- version;
- publication;
- rollback.

## 50. Stubs

- CatalogSourceStub;
- SemanticIndexStub;
- PricingStub;
- ImageServiceStub;
- CacheStub;
- ClockStub;
- EventBusStub;
- IDGeneratorStub.

Deben soportar:

- timeout;
- invalid schema;
- duplicate;
- stale;
- missing;
- other tenant;
- latency;
- error.

## 51. Entornos

LOCAL

Stubs.

CI

Servicios efímeros.

STAGING

Datos sintéticos completos.

CANARY

Versión nueva limitada.

PRODUCTION SHADOW

Comparación sin afectar respuestas.

## 52. Canary de catálogo

Debe definir:

- tenant cohort;
- Catalog Version;
- porcentaje;
- métricas;
- rollback;
- duración;
- criterios;
- owner.

## 53. Criterios de bloqueo

Bloquear release si:

- cross-tenant;
- publicación no atómica;
- cursor manipulable;
- Product ID inventado;
- producto inactivo seleccionable;
- hidden field expuesto;
- duplicados/omisiones;
- rollback inseguro;
- fuga de PII;
- error crítico de datos.

## 54. Evidencia

Conservar:

- Test Run ID;
- commit;
- dataset version;
- Catalog Version;
- config;
- seed;
- hashes;
- resultados;
- logs redactados;
- traces;
- métricas;
- fallos;
- artefactos.

## 55. Errores de testing

CATALOG_TEST_DATASET_INVALID

CATALOG_TEST_ENVIRONMENT_UNAVAILABLE

CATALOG_TEST_DEPENDENCY_UNAVAILABLE

CATALOG_TEST_THRESHOLD_FAILED

CATALOG_TEST_PRIVACY_VIOLATION

CATALOG_TEST_EVIDENCE_INCOMPLETE

CATALOG_TEST_NON_DETERMINISTIC_FAILURE

CATALOG_TEST_TENANT_ISOLATION_FAILURE

## 56. Criterios de aceptación

AC-CTEST-001

Todo requisito posee prueba.

AC-CTEST-002

Toda regla posee prueba negativa.

AC-CTEST-003

Toda referencia prueba tenant.

AC-CTEST-004

La paginación prueba duplicados.

AC-CTEST-005

La paginación prueba omisiones.

AC-CTEST-006

Toda caché prueba aislamiento.

AC-CTEST-007

Toda publicación prueba atomicidad.

AC-CTEST-008

Todo cursor prueba manipulación.

AC-CTEST-009

Toda resolución prueba ambigüedad.

AC-CTEST-010

Toda dependencia prueba timeout.

AC-CTEST-011

Los datasets están versionados.

AC-CTEST-012

La evidencia es reproducible.

AC-CTEST-013

La seguridad bloquea release.

AC-CTEST-014

La privacidad se prueba.

AC-CTEST-015

La recuperación se prueba.

## 57. Checklist

[ ] Unit tests.
[ ] Component tests.
[ ] Contract tests.
[ ] Integration tests.
[ ] E2E tests.
[ ] Search datasets.
[ ] Detail tests.
[ ] Category tests.
[ ] Brand tests.
[ ] Alias tests.
[ ] Filter tests.
[ ] Sort tests.
[ ] Cursor tests.
[ ] Pagination tests.
[ ] List tests.
[ ] Resolution tests.
[ ] Version tests.
[ ] Publication tests.
[ ] Rollback tests.
[ ] Cache tests.
[ ] Error tests.
[ ] Observability tests.
[ ] Security tests.
[ ] Privacy tests.
[ ] Performance tests.
[ ] Resilience tests.
[ ] Evidence.
[ ] Canary.
[ ] Rollback plan.

======================================================================
FIN DEL DOCUMENTO
======================================================================
