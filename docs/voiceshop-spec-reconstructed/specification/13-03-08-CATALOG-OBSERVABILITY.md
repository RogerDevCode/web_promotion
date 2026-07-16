======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-03-08-CATALOG-OBSERVABILITY.md

# OBSERVABILIDAD DEL CONTEXTO DE CATÁLOGO

## 1. Objetivo

Este documento define logs, métricas, trazas, eventos, alertas,
dashboards y criterios operativos para observar el contexto de catálogo
de VoiceShop.

La observabilidad debe permitir:

- medir búsquedas;
- medir consultas de detalle;
- medir resolución de referencias;
- detectar ambigüedad;
- detectar productos no encontrados;
- supervisar versiones;
- supervisar publicaciones;
- supervisar caché;
- detectar errores de datos;
- detectar accesos entre tenants;
- controlar latencia;
- verificar SLO;
- investigar incidentes;
- medir calidad funcional.

La observabilidad no debe exponer:

- secretos;
- consultas completas con PII;
- identificadores sensibles sin protección;
- contenido interno;
- datos de otros tenants;
- stack traces públicos.

## 2. Alcance

Incluye:

- búsqueda;
- detalle;
- categorías;
- marcas;
- filtros;
- ordenamiento;
- paginación;
- cursores;
- listas;
- resolución de referencias;
- versionado;
- publicación;
- rollback;
- snapshots;
- caché;
- errores;
- seguridad;
- costes;
- calidad;
- alertas;
- dashboards;
- QA.

No incluye:

- inventario;
- carrito;
- pedidos;
- pagos;
- analítica comercial completa;
- contenido íntegro del catálogo en logs.

## 3. Principios

RULE-COBS-001

Toda operación de catálogo debe poseer Request ID.

RULE-COBS-002

Toda operación distribuida debe poseer Correlation ID.

RULE-COBS-003

Toda lectura debe registrar Catalog Version o política de versión.

RULE-COBS-004

Toda búsqueda debe registrar estrategia.

RULE-COBS-005

Toda resolución debe registrar resultado.

RULE-COBS-006

Las métricas deben evitar alta cardinalidad.

RULE-COBS-007

Los logs deben ser estructurados.

RULE-COBS-008

Los datos sensibles deben redactarse.

RULE-COBS-009

Los errores de tenant deben auditarse.

RULE-COBS-010

Las publicaciones deben ser completamente trazables.

RULE-COBS-011

La caché debe distinguir hit, miss, stale e invalid entry.

RULE-COBS-012

Los fallos esperados deben distinguirse de fallos técnicos.

RULE-COBS-013

Las alertas deben ser accionables.

RULE-COBS-014

La observabilidad debe degradar sin bloquear lecturas seguras.

RULE-COBS-015

Toda señal debe poseer política de retención.

## 4. Identificadores

- Request ID;
- Correlation ID;
- Causation ID;
- Search Request ID;
- Search Result ID;
- Product Detail Request ID;
- Product Detail Result ID;
- Resolution ID;
- Navigation Request ID;
- List ID;
- Cursor Reference;
- Catalog Snapshot ID;
- Publication Request ID;
- Catalog Version;
- Tenant ID.

IDs de alta cardinalidad no deben usarse como etiquetas de métricas.

## 5. Logs estructurados

Ejemplo:

```json
{
  "timestamp": "UTC_TIMESTAMP",
  "level": "INFO",
  "service": "catalog-service",
  "component": "product-search",
  "event_name": "catalog_search_completed",
  "request_id": "UUID",
  "correlation_id": "UUID",
  "tenant_id": "UUID",
  "catalog_version": 42,
  "strategy": "HYBRID",
  "result_count": 8,
  "result": "SUCCESS",
  "duration_ms": 74,
  "error_code": null
}
```

## 6. Campos permitidos en logs

- component;
- operation;
- result;
- error_code;
- Catalog Version;
- strategy;
- result count;
- filter count;
- sort count;
- page size;
- cache state;
- freshness;
- status;
- locale;
- channel;
- tenant ID cuando política lo permita;
- hashes protegidos.

## 7. Campos prohibidos en logs generales

- consulta completa con PII;
- descripción completa;
- token de cursor;
- firma;
- API Key;
- URLs internas;
- stack trace público;
- datos de otro tenant;
- costos internos;
- notas privadas;
- barcode completo si no es necesario;
- payload completo del producto.

## 8. Niveles

TRACE

Diagnóstico temporal.

DEBUG

Información técnica controlada.

INFO

Operación normal.

WARN

Degradación o entrada problemática.

ERROR

Fallo técnico.

CRITICAL

Seguridad, corrupción o publicación defectuosa.

PRODUCT_NOT_FOUND normalmente es INFO o resultado funcional.

## 9. Métricas de búsqueda

- catalog_search_requests_total;
- catalog_search_success_total;
- catalog_search_empty_total;
- catalog_search_failure_total;
- catalog_search_duration_seconds;
- catalog_search_results_count;
- catalog_search_strategy_total;
- catalog_search_exact_match_total;
- catalog_search_alias_match_total;
- catalog_search_fuzzy_total;
- catalog_search_semantic_total;
- catalog_search_fallback_total;
- catalog_search_rate_limited_total.

## 10. Métricas de calidad de búsqueda

- catalog_search_zero_result_rate;
- catalog_search_ambiguity_rate;
- catalog_search_reformulation_rate;
- catalog_search_click_or_selection_rate;
- catalog_search_resolution_success_rate;
- catalog_search_correction_rate;
- catalog_search_abandonment_rate;
- catalog_search_average_rank_selected.

Estas métricas deben tener definiciones formales.

## 11. Métricas de detalle

- product_detail_requests_total;
- product_detail_success_total;
- product_detail_failure_total;
- product_detail_duration_seconds;
- product_detail_price_unavailable_total;
- product_detail_image_unavailable_total;
- product_detail_localization_fallback_total;
- product_detail_restricted_total;
- product_detail_cache_hit_total.

## 12. Métricas de categorías y marcas

- catalog_category_navigation_total;
- catalog_brand_navigation_total;
- catalog_category_empty_total;
- catalog_brand_empty_total;
- catalog_hierarchy_error_total;
- catalog_alias_ambiguity_total;
- catalog_navigation_duration_seconds;
- catalog_navigation_cache_hit_total.

## 13. Métricas de filtros

- catalog_filter_requests_total;
- catalog_filter_rejections_total;
- catalog_filter_count;
- catalog_filter_contradiction_total;
- catalog_filter_complexity_rejected_total;
- catalog_filter_cost_rejected_total;
- catalog_filter_latency_seconds.

## 14. Métricas de ordenamiento

- catalog_sort_requests_total;
- catalog_sort_rejections_total;
- catalog_sort_field_total;
- catalog_sort_stability_violation_total;
- catalog_price_sort_unavailable_total.

## 15. Métricas de paginación

- catalog_pages_created_total;
- catalog_cursor_created_total;
- catalog_cursor_rejected_total;
- catalog_cursor_expired_total;
- catalog_cursor_version_mismatch_total;
- catalog_page_size;
- catalog_page_duration_seconds;
- catalog_pagination_duplicate_detected_total;
- catalog_pagination_omission_detected_total.

## 16. Métricas de listas

- catalog_lists_created_total;
- catalog_lists_expired_total;
- catalog_list_position_resolution_total;
- catalog_list_position_invalid_total;
- catalog_list_position_not_delivered_total;
- catalog_list_version_mismatch_total.

## 17. Métricas de resolución

- product_reference_resolution_total;
- product_reference_resolved_total;
- product_reference_ambiguous_total;
- product_reference_not_found_total;
- product_reference_inactive_total;
- product_reference_restricted_total;
- product_reference_duration_seconds;
- product_reference_strategy_total;
- product_reference_confidence;
- product_reference_context_total;
- product_reference_list_total.

## 18. Métricas de versión

- catalog_versions_published_total;
- catalog_version_age_seconds;
- catalog_version_reads_total;
- catalog_exact_version_reads_total;
- catalog_latest_version_reads_total;
- catalog_version_not_found_total;
- catalog_version_conflict_total;
- catalog_session_pinned_version_total.

## 19. Métricas de publicación

- catalog_publication_requests_total;
- catalog_publication_success_total;
- catalog_publication_failure_total;
- catalog_publication_duration_seconds;
- catalog_validation_duration_seconds;
- catalog_validation_failure_total;
- catalog_publication_atomicity_failure_total;
- catalog_latest_pointer_failure_total;
- catalog_rollbacks_total;
- catalog_rollback_failure_total.

## 20. Métricas de snapshot

- catalog_snapshots_created_total;
- catalog_snapshot_validation_failure_total;
- catalog_snapshot_checksum_failure_total;
- catalog_snapshot_fallback_total;
- catalog_snapshot_age_seconds;
- catalog_stale_snapshot_served_total.

## 21. Métricas de caché

- catalog_cache_requests_total;
- catalog_cache_hit_total;
- catalog_cache_miss_total;
- catalog_cache_stale_hit_total;
- catalog_cache_invalid_entry_total;
- catalog_cache_write_failure_total;
- catalog_cache_invalidation_total;
- catalog_cache_invalidation_failure_total;
- catalog_cache_stampeded_prevented_total;
- catalog_cache_load_duration_seconds;
- catalog_cache_entry_age_seconds.

## 22. Métricas de errores

- catalog_errors_total;
- catalog_validation_errors_total;
- catalog_not_found_total;
- catalog_dependency_errors_total;
- catalog_timeout_total;
- catalog_rate_limit_total;
- catalog_data_integrity_errors_total;
- catalog_security_errors_total;
- catalog_error_recovery_total.

## 23. Métricas de seguridad

- catalog_cross_tenant_attempt_total;
- catalog_hidden_field_attempt_total;
- catalog_cursor_tampering_total;
- catalog_query_injection_total;
- catalog_filter_injection_total;
- catalog_alias_poisoning_total;
- catalog_cache_poisoning_total;
- catalog_enumeration_limited_total.

## 24. Métricas de coste

- catalog_dependency_requests_total;
- catalog_search_compute_units_estimate;
- catalog_semantic_query_cost_estimate;
- catalog_cache_cost_estimate;
- catalog_snapshot_storage_estimate;
- catalog_cost_per_search_estimate;
- catalog_cost_per_resolved_reference_estimate.

## 25. Histogramas

Aplicar a:

- latencia;
- resultados;
- cantidad de filtros;
- page size;
- cache age;
- snapshot age;
- publication duration;
- search score;
- confidence;
- query size.

Buckets deben corresponder a SLO.

## 26. Etiquetas permitidas

- component;
- operation;
- strategy;
- result;
- error_code;
- locale;
- channel;
- cache_state;
- freshness;
- version_policy;
- status;
- tenant_tier;
- confidence_band;
- reference_type.

## 27. Etiquetas prohibidas

- Search Request ID;
- Product ID;
- SKU;
- barcode;
- List ID;
- Cursor;
- actor ID;
- Session ID;
- consulta;
- descripción;
- URL;
- token;
- firma.

## 28. Trazas

Spans recomendados:

- catalog.search;
- catalog.query.normalize;
- catalog.search.exact;
- catalog.search.alias;
- catalog.search.fuzzy;
- catalog.search.semantic;
- catalog.search.rank;
- catalog.filter;
- catalog.sort;
- catalog.paginate;
- catalog.product.details;
- catalog.category.navigate;
- catalog.brand.navigate;
- catalog.reference.resolve;
- catalog.version.resolve;
- catalog.cache.get;
- catalog.cache.set;
- catalog.publish.validate;
- catalog.publish.commit;
- catalog.rollback.

## 29. Atributos de span

- tenant tier;
- version policy;
- Catalog Version;
- strategy;
- result;
- error_code;
- cache state;
- result count;
- filter count;
- page size;
- reference type;
- confidence band.

## 30. Propagación

Debe propagarse:

- trace context;
- Request ID;
- Correlation ID;
- Causation ID;
- tenant reference;
- Catalog Version;
- operation reference.

## 31. Sampling

100%:

- publicación;
- rollback;
- seguridad;
- data integrity;
- cross-tenant;
- atomicity failure;
- stale restricted data;
- cursor tampering.

Sampling configurable:

- búsquedas exitosas;
- cache hits;
- detalles exitosos;
- navegación.

## 32. Dashboards

### CATALOG HEALTH

- solicitudes;
- éxito;
- errores;
- latencia;
- dependencia;
- SLO.

### SEARCH QUALITY

- zero result;
- ambiguity;
- reformulation;
- selection;
- rank;
- strategy.

### CATALOG DATA

- versión;
- edad;
- productos;
- categorías;
- marcas;
- aliases;
- validation failures.

### CACHE

- hit ratio;
- miss;
- stale;
- invalidations;
- load latency;
- failures.

### PUBLICATION

- builds;
- validation;
- publish duration;
- failures;
- rollback.

### SECURITY

- cross-tenant;
- tampering;
- injection;
- hidden fields;
- poisoning.

## 33. Alertas

CATALOG_DEPENDENCY_UNAVAILABLE

CATALOG_SEARCH_LATENCY_HIGH

CATALOG_ZERO_RESULT_SPIKE

CATALOG_AMBIGUITY_SPIKE

CATALOG_DATA_INTEGRITY_ERROR

CATALOG_PUBLICATION_FAILED

CATALOG_PUBLICATION_ATOMICITY_FAILED

CATALOG_LATEST_POINTER_FAILED

CATALOG_CACHE_FAILURE_SPIKE

CATALOG_CACHE_HIT_RATE_LOW

CATALOG_STALE_DATA_SPIKE

CATALOG_SECURITY_INCIDENT

CATALOG_VERSION_TOO_OLD

## 34. Definición de alerta

Toda alerta debe incluir:

- nombre;
- condición;
- ventana;
- severidad;
- propietario;
- runbook;
- deduplicación;
- silencio;
- recuperación;
- impacto;
- dashboard.

## 35. SLO iniciales

Ejemplos sujetos al NFR final:

- búsqueda p95 < 500 ms sin proveedor semántico externo;
- detalle p95 < 300 ms con caché;
- resolución exacta p95 < 250 ms;
- publicación atómica = 100%;
- cross-tenant = 0;
- cache hit objetivo por recurso;
- error técnico por debajo del umbral.

## 36. Error budget

Debe separar:

- errores del Cliente;
- no encontrados;
- dependencias;
- errores internos;
- seguridad;
- publicación.

SEARCH_NO_RESULTS no consume necesariamente error budget técnico.

## 37. Calidad de datos

Señales:

- SKU duplicado;
- barcode duplicado;
- categoría cíclica;
- Product ID inválido;
- alias colisionado;
- localización ausente;
- imagen rota;
- status inconsistente;
- referencia de marca inexistente.

## 38. Frescura

Debe observar:

- current Catalog Version;
- age;
- latest pointer;
- cache age;
- snapshot age;
- publication lag;
- propagation lag.

## 39. Auditoría

Publicación y rollback deben registrar:

- actor;
- tenant;
- source version;
- target version;
- checksum;
- validation;
- resultado;
- Correlation ID.

## 40. Privacidad

La consulta de búsqueda puede contener:

- nombre;
- dirección;
- teléfono;
- otros datos.

Debe:

- clasificar;
- redactar;
- no usar como etiqueta;
- aplicar retención;
- limitar acceso.

## 41. Degradación de telemetría

Si el backend de telemetría falla:

- buffer crítico;
- descartar señales de alta frecuencia;
- no bloquear lectura;
- preservar seguridad;
- preservar publicación;
- alertar al recuperar.

## 42. Pseudocódigo

```text
function emit_catalog_telemetry(signal):

    validate_catalog_telemetry_schema(signal)
    classify_signal_data(signal)
    redact_sensitive_fields(signal)
    remove_high_cardinality_labels(signal)
    attach_trace_and_correlation(signal)

    if signal.is_critical:
        export_without_sampling(signal)
    elif should_sample(signal):
        export(signal)

    if export_failed and signal.is_critical:
        persist_critical_catalog_buffer(signal)
```

## 43. Errores de observabilidad

CATALOG_OBS_SCHEMA_INVALID

CATALOG_OBS_SENSITIVE_DATA_DETECTED

CATALOG_OBS_HIGH_CARDINALITY_DETECTED

CATALOG_OBS_TRACE_CONTEXT_INVALID

CATALOG_OBS_EXPORT_FAILED

CATALOG_OBS_BUFFER_FULL

CATALOG_OBS_ALERT_FAILED

CATALOG_OBS_CLOCK_SKEW_EXCEEDED

## 44. Eventos

CatalogTelemetryEmitted

CatalogTelemetryDropped

CatalogTelemetryBuffered

CatalogSensitiveTelemetryBlocked

CatalogHighCardinalityDetected

CatalogSLOViolated

CatalogAlertTriggered

CatalogAlertResolved

CatalogDataQualityAlertTriggered

## 45. Casos límite

- consulta con PII;
- Product ID como label;
- publicación falla;
- latest pointer falla;
- cache backend caído;
- stale snapshot;
- clock skew;
- sampling oculta fallo;
- alerta duplicada;
- alias collision;
- cursor tampering;
- cross-tenant;
- semantic provider caído;
- coste anómalo;
- telemetry backend down;
- buffer lleno;
- rollback.

## 46. Criterios de aceptación

AC-COBS-001

Toda operación posee Request ID.

AC-COBS-002

Toda operación distribuida posee Correlation ID.

AC-COBS-003

Toda lectura registra versión.

AC-COBS-004

Toda búsqueda registra estrategia.

AC-COBS-005

Toda resolución registra resultado.

AC-COBS-006

Los logs son estructurados.

AC-COBS-007

Las métricas evitan alta cardinalidad.

AC-COBS-008

Los datos sensibles se redactan.

AC-COBS-009

Las publicaciones se trazan completamente.

AC-COBS-010

La caché distingue estados.

AC-COBS-011

Existen dashboards.

AC-COBS-012

Existen alertas accionables.

AC-COBS-013

Se mide calidad.

AC-COBS-014

Se mide coste.

AC-COBS-015

La caída de telemetría no bloquea lecturas seguras.

## 47. Plan mínimo de pruebas

- logs;
- metrics;
- traces;
- correlation;
- search;
- detail;
- navigation;
- filters;
- sort;
- pagination;
- lists;
- resolution;
- version;
- publication;
- rollback;
- cache;
- errors;
- security;
- cardinality;
- redaction;
- sampling;
- dashboards;
- alerts;
- SLO;
- backend down;
- buffer;
- cost;
- privacy;
- audit.

## 48. Checklist

[ ] Existen logs estructurados.
[ ] Existen métricas de búsqueda.
[ ] Existen métricas de detalle.
[ ] Existen métricas de navegación.
[ ] Existen métricas de filtros.
[ ] Existen métricas de paginación.
[ ] Existen métricas de resolución.
[ ] Existen métricas de versiones.
[ ] Existen métricas de publicación.
[ ] Existen métricas de caché.
[ ] Existen métricas de seguridad.
[ ] Existen métricas de coste.
[ ] Existen trazas.
[ ] Existen dashboards.
[ ] Existen alertas.
[ ] Se controla cardinalidad.
[ ] Se protege PII.
[ ] Existe sampling.
[ ] Existe buffer crítico.
[ ] Existen pruebas.

======================================================================
FIN DEL DOCUMENTO
======================================================================
