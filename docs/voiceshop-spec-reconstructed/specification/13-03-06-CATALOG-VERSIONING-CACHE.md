======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-03-06-CATALOG-VERSIONING-CACHE.md

# VERSIONADO, PUBLICACIÓN Y CACHÉ DEL CATÁLOGO

## 1. Objetivo

Este documento define cómo VoiceShop identifica versiones del catálogo,
publica cambios, conserva snapshots, invalida cachés y mantiene
consistencia entre búsquedas, listas, productos y operaciones
posteriores.

El objetivo es evitar:

- resultados incoherentes;
- listas que cambian silenciosamente;
- Product IDs obsoletos;
- caché entre tenants;
- precios o estados vencidos;
- paginación inestable;
- referencias ordinales incorrectas;
- lecturas parciales de una publicación.

## 2. Alcance

Incluye:

- Catalog Version;
- Product Version;
- Category Version;
- Brand Version;
- Alias Version;
- snapshots;
- publicación;
- draft;
- activación;
- invalidación;
- caché;
- TTL;
- stale data;
- revalidación;
- listas;
- cursores;
- eventos;
- rollback;
- observabilidad;
- QA.

No incluye:

- implementación de almacenamiento;
- administración editorial detallada;
- inventario;
- pedido;
- pagos;
- arquitectura física de CDN.

## 3. Principios

RULE-CVER-001

Toda lectura debe identificar una Catalog Version o política de versión.

RULE-CVER-002

Toda versión publicada es inmutable lógicamente.

RULE-CVER-003

Una publicación debe ser atómica desde la perspectiva del lector.

RULE-CVER-004

Una caché debe incluir tenant.

RULE-CVER-005

Una caché debe incluir versión.

RULE-CVER-006

Un cursor debe estar vinculado a versión.

RULE-CVER-007

Una lista debe estar vinculada a versión.

RULE-CVER-008

Los datos stale deben identificarse.

RULE-CVER-009

La caché no es fuente única de verdad.

RULE-CVER-010

La invalidación debe ser observable.

RULE-CVER-011

Una versión no debe mezclar productos de otra versión.

RULE-CVER-012

El rollback debe crear o seleccionar una versión publicada válida.

RULE-CVER-013

Los eventos de publicación deben ser idempotentes.

RULE-CVER-014

La pérdida de caché no debe perder catálogo.

RULE-CVER-015

Todo cambio debe ser trazable.

## 4. Identificadores de versión

Catalog Version

Versión global lógica del catálogo de un tenant.

Product Version

Versión de un producto.

Category Version

Versión de categoría.

Brand Version

Versión de marca.

Alias Version

Versión de diccionario.

Pricing Version

Cuando el precio pertenece a otro contexto, se referencia por separado.

## 5. Estados de Catalog Version

BUILDING

En construcción.

VALIDATING

Validándose.

READY

Lista para publicar.

PUBLISHING

Publicación en curso.

PUBLISHED

Visible.

REJECTED

No publicable.

SUPERSEDED

Reemplazada por otra versión.

ROLLED_BACK

Retirada por rollback.

ARCHIVED

Histórica.

## 6. Contrato de Catalog Snapshot

```json
{
  "catalog_snapshot_id": "UUID",
  "tenant_id": "UUID",
  "catalog_version": 42,
  "status": "PUBLISHED",
  "contents": {
    "product_count": 1200,
    "category_count": 80,
    "brand_count": 140,
    "alias_count": 3200
  },
  "source_versions": {
    "products": 77,
    "categories": 18,
    "brands": 12,
    "aliases": 9
  },
  "published_at": "UTC_TIMESTAMP",
  "published_by": "ACTOR_REFERENCE",
  "checksum": "HASH"
}
```

## 7. Política de versión de lectura

LATEST_PUBLISHED

Usar la versión publicada más reciente.

EXACT_VERSION

Usar versión exacta.

LIST_BOUND_VERSION

Usar versión asociada a List ID.

CURSOR_BOUND_VERSION

Usar versión del cursor.

SESSION_PINNED_VERSION

Usar versión fijada temporalmente para un flujo.

SNAPSHOT_REFERENCE

Usar snapshot explícito.

## 8. Latest published

Adecuado para:

- nuevas búsquedas;
- nuevas sesiones;
- navegación general.

No adecuado para:

- continuar una página antigua;
- resolver una posición de lista vieja;
- confirmar una selección dependiente de datos anteriores sin revalidar.

## 9. Exact version

Debe validar:

- existencia;
- tenant;
- status permitido;
- retención;
- compatibilidad.

## 10. Session pinned

Puede usarse durante:

- checkout;
- aclaración;
- confirmación;
- lista.

No debe fijarse indefinidamente.

Antes de una operación comercial debe revalidarse el producto y precio.

## 11. Publicación atómica

Desde el lector:

- antes de publicar: versión 41;
- después de publicar: versión 42;
- nunca mezcla parcial.

## 12. Validaciones previas a publicación

- Product IDs únicos;
- SKUs válidos;
- barcodes consistentes;
- categorías sin ciclos;
- marcas válidas;
- aliases sin conflictos críticos;
- status válidos;
- referencias completas;
- localizaciones mínimas;
- imágenes válidas;
- restricciones válidas;
- checksum;
- conteos.

## 13. Publicación

Secuencia:

1. cerrar build.
2. validar.
3. crear snapshot.
4. marcar READY.
5. reservar version number.
6. publicar de forma atómica.
7. emitir CatalogVersionPublished.
8. actualizar latest pointer.
9. invalidar cachés.
10. precalentar cachés críticas.
11. observar.

## 14. Idempotencia de publicación

Clave:

tenant_id
+ source_snapshot_hash
+ publication_request_id

Un reintento no crea múltiples versiones equivalentes salvo política.

## 15. Rollback

No debe editar una versión publicada.

Opciones:

- volver a apuntar latest a versión previa aprobada;
- publicar una nueva versión basada en la anterior;
- marcar versión problemática.

Debe registrar:

- motivo;
- actor;
- versión origen;
- versión destino;
- impacto;
- cache invalidation.

## 16. Product Version

Cada cambio relevante incrementa Product Version:

- nombre;
- status;
- categoría;
- marca;
- presentación;
- atributos;
- restricción;
- imagen;
- alias directo.

## 17. Compatibilidad

Cambios compatibles:

- nueva descripción;
- imagen adicional;
- atributo opcional.

Cambios potencialmente incompatibles:

- Product ID reemplazado;
- unidad modificada;
- presentación;
- status;
- producto fusionado;
- producto dividido;
- restricción.

## 18. Listas y versiones

List ID debe almacenar:

- Catalog Version;
- query hash;
- Product IDs ordenados;
- posiciones;
- expires_at;
- delivery.

Si la versión cambia:

- la lista puede seguir válida hasta expirar para selección;
- pero el producto debe revalidarse antes de ejecutar.

## 19. Cursores

Cursor debe vincular:

- Catalog Version;
- query;
- filters;
- sort;
- tenant;
- expiration.

No debe migrarse silenciosamente a una nueva versión.

## 20. Cachés funcionales

### PRODUCT_DETAIL_CACHE

### SEARCH_RESULT_CACHE

### CATEGORY_NAVIGATION_CACHE

### BRAND_NAVIGATION_CACHE

### ALIAS_RESOLUTION_CACHE

### CATALOG_SNAPSHOT_CACHE

### LIST_CACHE

### CURSOR_STATE_CACHE

## 21. Clave de caché

Debe incluir como mínimo:

- tenant;
- resource type;
- resource ID o query hash;
- locale;
- visibility;
- Catalog Version;
- schema version.

## 22. Datos prohibidos en clave visible

- PII;
- secretos;
- tokens;
- mensaje completo;
- dirección;
- email.

Usar hashes protegidos cuando corresponda.

## 23. TTL

Depende de:

- tipo;
- versión;
- dinamismo;
- criticidad;
- memoria;
- política.

Una versión publicada inmutable puede cachearse más tiempo.

El puntero latest requiere TTL menor o invalidación por evento.

## 24. Estrategias de caché

CACHE_ASIDE

READ_THROUGH

WRITE_INVALIDATE

PREWARM

STALE_WHILE_REVALIDATE

No todas son apropiadas para todos los datos.

## 25. Stale while revalidate

Puede permitirse para:

- descripciones;
- imágenes;
- navegación no crítica.

No debe usarse sin advertencia para:

- status de producto;
- restricciones;
- selección crítica;
- precio dinámico;
- seguridad.

## 26. Cache hit

Debe validar:

- tenant;
- version;
- schema;
- TTL;
- checksum opcional;
- visibility.

## 27. Cache miss

Debe consultar fuente oficial y rellenar.

Un miss masivo debe evitar stampede.

## 28. Stampede protection

Controles:

- single flight;
- lock;
- jitter;
- prewarm;
- backoff;
- stale safe.

## 29. Invalidación

Eventos:

- CatalogVersionPublished;
- ProductUpdated;
- ProductStatusChanged;
- CategoryUpdated;
- BrandUpdated;
- AliasUpdated;
- ImageUpdated;
- VisibilityPolicyChanged.

## 30. Invalidación por versión

La estrategia preferida:

nueva versión → nuevas claves.

Las claves antiguas expiran.

El puntero latest se actualiza.

## 31. Invalidación selectiva

Puede usarse para detalles.

Debe evitar:

- omitir locale;
- omitir tenant;
- omitir visibility;
- invalidar sólo una réplica.

## 32. Cache failure

Si caché falla:

- consultar fuente;
- limitar carga;
- degradar;
- usar snapshot;
- no devolver datos de otro tenant;
- no bloquear indefinidamente.

## 33. Snapshot fallback

Un snapshot previo puede usarse si:

- está aprobado;
- la política lo permite;
- se marca stale;
- no afecta seguridad;
- no se usa para afirmar información dinámica.

## 34. Datos stale

Resultado debe indicar:

```json
{
  "freshness": {
    "state": "STALE",
    "catalog_version": 41,
    "latest_known_version": 42,
    "stale_since": "UTC_TIMESTAMP",
    "reason": "SOURCE_UNAVAILABLE"
  }
}
```

## 35. Revalidación antes de escritura

Antes de AddProductToCart o ConfirmOrder:

- Product ID;
- tenant;
- status;
- restrictions;
- presentation;
- current price source;
- Inventory.

No confiar sólo en caché histórica.

## 36. Multi-tenant

Nunca compartir:

- keys sin tenant;
- latest pointer;
- snapshots;
- aliases;
- lists;
- cursors;
- visibility.

## 37. Esquemas

Una caché debe incluir cache_schema_version.

Si cambia:

- invalidar;
- migrar;
- ignorar entrada antigua.

## 38. Flujo de lectura

1. resolver version policy.
2. construir key.
3. consultar caché.
4. validar entry.
5. si hit, devolver.
6. si miss, consultar fuente.
7. validar.
8. escribir caché.
9. devolver.

## 39. Pseudocódigo de lectura

```text
function get_catalog_resource(request):

    catalog_version = resolve_catalog_version(
        request.version_policy,
        request.tenant_id
    )

    key = build_catalog_cache_key(
        tenant_id=request.tenant_id,
        resource=request.resource,
        locale=request.locale,
        visibility=request.visibility,
        catalog_version=catalog_version,
        schema_version=current_cache_schema_version
    )

    cached = cache.get(key)

    if cached.exists and validate_cache_entry(cached, request):
        emit(CatalogCacheHit)
        return cached.value

    emit(CatalogCacheMiss)

    official = load_catalog_resource_from_source(
        request,
        catalog_version
    )

    validate_official_resource(official)
    cache.set(key, official, calculate_ttl(request.resource))

    return official
```

## 40. Pseudocódigo de publicación

```text
function publish_catalog(request):

    validate_publication_request(request)

    previous = get_idempotent_publication_result(
        request.publication_request_id
    )

    if previous.exists:
        return previous

    snapshot = build_catalog_snapshot(request.source_references)
    validation = validate_catalog_snapshot(snapshot)

    if not validation.passed:
        mark_snapshot_rejected(snapshot, validation)
        emit(CatalogPublicationRejected)
        return rejection(validation)

    version = reserve_next_catalog_version(request.tenant_id)
    published = atomically_publish(snapshot, version)
    update_latest_pointer(request.tenant_id, version)
    emit(CatalogVersionPublished)

    invalidate_latest_dependent_caches(request.tenant_id)
    schedule_cache_prewarm(request.tenant_id, version)

    return published
```

## 41. Errores

CATALOG_VERSION_NOT_FOUND

CATALOG_VERSION_NOT_PUBLISHED

CATALOG_VERSION_TENANT_MISMATCH

CATALOG_VERSION_ARCHIVED

CATALOG_PUBLICATION_INVALID

CATALOG_PUBLICATION_CONFLICT

CATALOG_PUBLICATION_VALIDATION_FAILED

CATALOG_PUBLICATION_ALREADY_COMPLETED

CATALOG_ROLLBACK_NOT_ALLOWED

CATALOG_ROLLBACK_FAILED

CATALOG_CACHE_KEY_INVALID

CATALOG_CACHE_ENTRY_INVALID

CATALOG_CACHE_SCHEMA_MISMATCH

CATALOG_CACHE_UNAVAILABLE

CATALOG_CACHE_STAMPEDE_LIMIT

CATALOG_SNAPSHOT_UNAVAILABLE

CATALOG_STALE_DATA_NOT_ALLOWED

CATALOG_CURSOR_VERSION_MISMATCH

CATALOG_LIST_VERSION_MISMATCH

## 42. Eventos

CatalogSnapshotCreated

CatalogValidationStarted

CatalogValidationCompleted

CatalogPublicationRequested

CatalogVersionPublished

CatalogPublicationRejected

CatalogLatestVersionChanged

CatalogRollbackRequested

CatalogRolledBack

CatalogCacheHit

CatalogCacheMiss

CatalogCacheEntryInvalidated

CatalogCachePrewarmStarted

CatalogCachePrewarmCompleted

CatalogStaleFallbackUsed

## 43. Observabilidad

Métricas:

- catalog_versions_published_total;
- catalog_publication_failure_total;
- catalog_publication_duration_seconds;
- catalog_validation_failure_total;
- catalog_rollbacks_total;
- catalog_cache_hit_total;
- catalog_cache_miss_total;
- catalog_cache_invalidations_total;
- catalog_cache_stale_served_total;
- catalog_cache_load_seconds;
- catalog_snapshot_fallback_total;
- catalog_version_age_seconds.

Dimensiones:

- resource_type;
- version_policy;
- cache_result;
- freshness;
- result;
- error_code;
- tenant_tier.

## 44. Auditoría

Registrar:

- publication request;
- tenant;
- source snapshot;
- version;
- checksum;
- actor;
- validation;
- rollback;
- cache invalidation;
- resultado;
- Correlation ID.

## 45. Seguridad

Amenazas:

- cache poisoning;
- cross-tenant cache;
- cursor version manipulation;
- stale restricted product;
- unauthorized rollback;
- publication tampering;
- alias poisoning;
- hidden field cache.

Controles:

- tenant keys;
- signatures;
- checksums;
- authorization;
- immutable versions;
- schema validation;
- visibility;
- audit.

## 46. Casos límite

- publish duplicate;
- validation fail;
- latest pointer fail;
- cache unavailable;
- cache stale;
- stampede;
- rollback;
- version archived;
- cursor old;
- list old;
- Session pinned;
- Product status changes;
- tenant mismatch;
- schema upgrade;
- source unavailable;
- snapshot fallback;
- event duplicated;
- partial invalidation;
- clock skew.

## 47. Criterios de aceptación

AC-CVER-001

Toda lectura posee version policy.

AC-CVER-002

Las versiones publicadas son inmutables.

AC-CVER-003

La publicación es atómica.

AC-CVER-004

La caché incluye tenant.

AC-CVER-005

La caché incluye versión.

AC-CVER-006

Los cursores incluyen versión.

AC-CVER-007

Las listas incluyen versión.

AC-CVER-008

Los datos stale se marcan.

AC-CVER-009

La caché no es fuente única.

AC-CVER-010

La publicación es idempotente.

AC-CVER-011

El rollback es auditable.

AC-CVER-012

La pérdida de caché permite recuperación.

AC-CVER-013

Las escrituras revalidan datos.

AC-CVER-014

El schema de caché se versiona.

AC-CVER-015

Todo cambio es trazable.

## 48. Plan mínimo de pruebas

- latest;
- exact;
- pinned;
- list-bound;
- cursor-bound;
- publication;
- validation;
- duplicate;
- rollback;
- cache hit;
- cache miss;
- stale;
- invalidation;
- stampede;
- tenant;
- schema;
- fallback;
- cursor mismatch;
- list mismatch;
- status change;
- source down;
- audit;
- metrics;
- security.

## 49. Checklist

[ ] Existe Catalog Version.
[ ] Existe Snapshot ID.
[ ] Existe checksum.
[ ] Existe publication state.
[ ] Existe version policy.
[ ] Existe Product Version.
[ ] Existe Category Version.
[ ] Existe Brand Version.
[ ] Existe Alias Version.
[ ] Se publica atómicamente.
[ ] Se controla idempotencia.
[ ] Se controla rollback.
[ ] La caché incluye tenant.
[ ] La caché incluye version.
[ ] Existe TTL.
[ ] Existe invalidación.
[ ] Existe stampede protection.
[ ] Existe stale policy.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
