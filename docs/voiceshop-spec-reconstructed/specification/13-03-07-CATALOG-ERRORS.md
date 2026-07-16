======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-03-07-CATALOG-ERRORS.md

# CATÁLOGO DE ERRORES FUNCIONALES DEL CONTEXTO DE CATÁLOGO

## 1. Objetivo

Este documento define los errores funcionales estables del contexto de
catálogo de VoiceShop.

Cada error debe permitir:

- identificar la condición;
- decidir si es reintentable;
- construir una respuesta segura;
- registrar telemetría;
- mapear a canal;
- preservar trazabilidad;
- evitar exponer detalles internos.

## 2. Principios

RULE-CERR-001

Todo error posee código estable.

RULE-CERR-002

Todo error posee categoría.

RULE-CERR-003

Todo error indica retryable.

RULE-CERR-004

Todo error indica HTTP o transporte lógico sugerido sin acoplar el
dominio.

RULE-CERR-005

Todo error posee mensaje seguro.

RULE-CERR-006

Los mensajes internos no se exponen al Cliente.

RULE-CERR-007

Los errores de tenant no deben revelar existencia de recursos ajenos.

RULE-CERR-008

Un error esperado no debe registrarse como fallo interno crítico.

RULE-CERR-009

Un error debe preservar Correlation ID.

RULE-CERR-010

Los códigos no deben depender del proveedor.

RULE-CERR-011

Los errores deben ser versionados.

RULE-CERR-012

Los detalles deben cumplir un schema.

RULE-CERR-013

Los errores no deben incluir stack trace público.

RULE-CERR-014

Los errores no deben incluir consultas o nombres de tablas.

RULE-CERR-015

Todo error debe tener pruebas.

## 3. Categorías

VALIDATION

NOT_FOUND

STATE

RESTRICTION

AUTHENTICATION

AUTHORIZATION

TENANT

VERSION

CONFLICT

DEPENDENCY

RATE_LIMIT

TIMEOUT

INTERNAL

DATA_INTEGRITY

SECURITY

## 4. Contrato de error

```json
{
  "error_id": "UUID",
  "code": "PRODUCT_NOT_FOUND",
  "category": "NOT_FOUND",
  "message_code": "catalog.product_not_found",
  "safe_message": "No encontré ese producto.",
  "retryable": false,
  "severity": "INFO",
  "details": {
    "reference_type": "NAME"
  },
  "request_id": "UUID",
  "correlation_id": "UUID",
  "occurred_at": "UTC_TIMESTAMP",
  "error_schema_version": 1
}
```

## 5. Severidad

INFO

Resultado esperado.

WARNING

Degradación o entrada problemática.

ERROR

Fallo técnico o inconsistencia.

CRITICAL

Seguridad, corrupción o riesgo sistémico.

## 6. Retryable

TRUE

Puede reintentarse con la misma intención bajo política.

FALSE

Reintentar igual no resolverá.

CONDITIONAL

Requiere cambio de estado, versión, autenticación, tiempo o entrada.

## 7. Errores generales

### CATALOG_UNAVAILABLE

Categoría:

DEPENDENCY

Retryable:

TRUE

Mensaje:

"El catálogo no está disponible en este momento."

Acción:

- usar snapshot permitido;
- reintentar;
- degradar;
- no inventar.

### CATALOG_REQUEST_INVALID

Categoría:

VALIDATION

Retryable:

FALSE, salvo corregir request.

### CATALOG_RATE_LIMITED

Categoría:

RATE_LIMIT

Retryable:

CONDITIONAL.

Debe incluir retry_after cuando sea seguro.

### CATALOG_TIMEOUT

Categoría:

TIMEOUT

Retryable:

TRUE limitado.

### CATALOG_INTERNAL_ERROR

Categoría:

INTERNAL

Mensaje público genérico.

## 8. Errores de tenant

### CATALOG_TENANT_NOT_FOUND

No debe distinguir públicamente entre tenant inexistente y no autorizado.

### CATALOG_TENANT_INACTIVE

### CATALOG_TENANT_MISMATCH

Categoría:

TENANT o SECURITY según caso.

### CATALOG_CROSS_TENANT_REFERENCE

Severidad:

CRITICAL o WARNING según intención.

## 9. Errores de producto

### PRODUCT_NOT_FOUND

No existe producto visible.

### PRODUCT_INACTIVE

Existe pero no está activo.

### PRODUCT_DISCONTINUED

Producto descontinuado.

### PRODUCT_ARCHIVED

Sólo histórico.

### PRODUCT_RESTRICTED

Requiere condición adicional.

### PRODUCT_TENANT_MISMATCH

No revelar si existe en otro tenant.

### PRODUCT_REFERENCE_INVALID

Referencia mal formada.

### PRODUCT_STATUS_INVALID

Datos inconsistentes.

### PRODUCT_DATA_INTEGRITY_CONFLICT

Ejemplo:

SKU duplicado.

## 10. Errores de SKU

SKU_INVALID

SKU_NOT_FOUND

SKU_DUPLICATED

SKU_TENANT_MISMATCH

SKU_STATUS_INVALID

## 11. Errores de barcode

BARCODE_INVALID

BARCODE_CHECKSUM_INVALID

BARCODE_NOT_FOUND

BARCODE_DUPLICATED

BARCODE_TENANT_MISMATCH

## 12. Errores de categorías

CATEGORY_NOT_FOUND

CATEGORY_INACTIVE

CATEGORY_ARCHIVED

CATEGORY_RESTRICTED

CATEGORY_TENANT_MISMATCH

CATEGORY_PARENT_NOT_FOUND

CATEGORY_PARENT_INVALID

CATEGORY_HIERARCHY_INVALID

CATEGORY_CYCLE_DETECTED

CATEGORY_DEPTH_EXCEEDED

CATEGORY_PATH_INCONSISTENT

## 13. Errores de marca

BRAND_NOT_FOUND

BRAND_INACTIVE

BRAND_ARCHIVED

BRAND_RESTRICTED

BRAND_TENANT_MISMATCH

BRAND_ALIAS_AMBIGUOUS

BRAND_DATA_INTEGRITY_CONFLICT

## 14. Errores de alias

ALIAS_NOT_FOUND

ALIAS_INVALID

ALIAS_AMBIGUOUS

ALIAS_COLLISION

ALIAS_INACTIVE

ALIAS_VERSION_MISMATCH

ALIAS_TENANT_MISMATCH

## 15. Errores de búsqueda

SEARCH_QUERY_EMPTY

SEARCH_QUERY_TOO_LONG

SEARCH_QUERY_INVALID

SEARCH_LANGUAGE_UNSUPPORTED

SEARCH_STRATEGY_UNAVAILABLE

SEARCH_RESULT_VALIDATION_FAILED

SEARCH_SEMANTIC_INDEX_UNAVAILABLE

SEARCH_FUZZY_RESOLVER_UNAVAILABLE

SEARCH_NO_RESULTS

SEARCH_TOO_MANY_RESULTS

SEARCH_RATE_LIMITED

## 16. SEARCH_NO_RESULTS

Normalmente categoría:

NOT_FOUND o resultado vacío, no necesariamente error técnico.

El contrato puede devolver éxito con items=[].

El código se usa cuando el flujo requiere una entidad.

## 17. Errores de detalle

PRODUCT_DETAIL_REFERENCE_INVALID

PRODUCT_DETAIL_NOT_FOUND

PRODUCT_DETAIL_FIELD_NOT_ALLOWED

PRODUCT_DETAIL_LOCALE_UNAVAILABLE

PRODUCT_DETAIL_PRICE_UNAVAILABLE

PRODUCT_DETAIL_IMAGE_UNAVAILABLE

PRODUCT_DETAIL_DEPENDENCY_UNAVAILABLE

## 18. Errores de filtro

FILTER_SCHEMA_NOT_FOUND

FILTER_FIELD_UNKNOWN

FILTER_FIELD_NOT_ALLOWED

FILTER_OPERATOR_NOT_ALLOWED

FILTER_TYPE_MISMATCH

FILTER_VALUE_INVALID

FILTER_RANGE_INVALID

FILTER_REFERENCE_NOT_FOUND

FILTER_TENANT_MISMATCH

FILTER_CONTRADICTION

FILTER_COMPLEXITY_EXCEEDED

FILTER_COST_EXCEEDED

## 19. Errores de sort

SORT_SCHEMA_NOT_FOUND

SORT_FIELD_NOT_ALLOWED

SORT_DIRECTION_NOT_ALLOWED

SORT_CONFIGURATION_INVALID

SORT_PRICE_UNAVAILABLE

SORT_COLLATION_UNAVAILABLE

SORT_STABILITY_VIOLATION

## 20. Errores de paginación

PAGE_LIMIT_INVALID

PAGE_LIMIT_EXCEEDED

CURSOR_REQUIRED

CURSOR_INVALID

CURSOR_SIGNATURE_INVALID

CURSOR_EXPIRED

CURSOR_QUERY_MISMATCH

CURSOR_FILTER_MISMATCH

CURSOR_SORT_MISMATCH

CURSOR_VERSION_MISMATCH

CURSOR_TENANT_MISMATCH

CURSOR_VISIBILITY_MISMATCH

CURSOR_STATE_UNAVAILABLE

## 21. Errores de lista

LIST_NOT_FOUND

LIST_EXPIRED

LIST_VERSION_MISMATCH

LIST_TENANT_MISMATCH

LIST_SESSION_MISMATCH

LIST_POSITION_INVALID

LIST_POSITION_NOT_DELIVERED

LIST_CATALOG_VERSION_MISMATCH

LIST_DELIVERY_STATE_INVALID

## 22. Errores de resolución

PRODUCT_REFERENCE_EMPTY

PRODUCT_REFERENCE_TYPE_INVALID

PRODUCT_REFERENCE_NOT_FOUND

PRODUCT_REFERENCE_AMBIGUOUS

PRODUCT_REFERENCE_INACTIVE

PRODUCT_REFERENCE_RESTRICTED

PRODUCT_REFERENCE_EXPIRED

PRODUCT_REFERENCE_CONTEXT_STALE

PRODUCT_REFERENCE_SIGNATURE_INVALID

PRODUCT_REFERENCE_CONFIDENCE_LOW

PRODUCT_REFERENCE_RESOLVER_UNAVAILABLE

## 23. Errores de versión

CATALOG_VERSION_NOT_FOUND

CATALOG_VERSION_NOT_PUBLISHED

CATALOG_VERSION_ARCHIVED

CATALOG_VERSION_TENANT_MISMATCH

CATALOG_VERSION_POLICY_INVALID

CATALOG_VERSION_CONFLICT

PRODUCT_VERSION_CONFLICT

CATEGORY_VERSION_CONFLICT

BRAND_VERSION_CONFLICT

ALIAS_VERSION_CONFLICT

## 24. Errores de publicación

CATALOG_PUBLICATION_REQUEST_INVALID

CATALOG_PUBLICATION_ALREADY_COMPLETED

CATALOG_PUBLICATION_CONFLICT

CATALOG_PUBLICATION_VALIDATION_FAILED

CATALOG_PUBLICATION_CHECKSUM_MISMATCH

CATALOG_PUBLICATION_ATOMICITY_FAILED

CATALOG_PUBLICATION_POINTER_UPDATE_FAILED

CATALOG_PUBLICATION_EVENT_FAILED

## 25. Errores de rollback

CATALOG_ROLLBACK_NOT_ALLOWED

CATALOG_ROLLBACK_VERSION_NOT_FOUND

CATALOG_ROLLBACK_TARGET_INVALID

CATALOG_ROLLBACK_CONFLICT

CATALOG_ROLLBACK_FAILED

## 26. Errores de caché

CATALOG_CACHE_KEY_INVALID

CATALOG_CACHE_ENTRY_INVALID

CATALOG_CACHE_SCHEMA_MISMATCH

CATALOG_CACHE_TENANT_MISMATCH

CATALOG_CACHE_VERSION_MISMATCH

CATALOG_CACHE_VISIBILITY_MISMATCH

CATALOG_CACHE_UNAVAILABLE

CATALOG_CACHE_TIMEOUT

CATALOG_CACHE_STAMPEDE_LIMIT

CATALOG_CACHE_WRITE_FAILED

CATALOG_CACHE_INVALIDATION_FAILED

CATALOG_CACHE_POISONING_DETECTED

## 27. Errores de snapshot

CATALOG_SNAPSHOT_NOT_FOUND

CATALOG_SNAPSHOT_INVALID

CATALOG_SNAPSHOT_NOT_PUBLISHED

CATALOG_SNAPSHOT_CHECKSUM_MISMATCH

CATALOG_SNAPSHOT_TENANT_MISMATCH

CATALOG_SNAPSHOT_FALLBACK_NOT_ALLOWED

CATALOG_STALE_DATA_NOT_ALLOWED

## 28. Errores de localización

CATALOG_LOCALE_UNSUPPORTED

CATALOG_LOCALIZATION_NOT_FOUND

CATALOG_LOCALIZATION_FALLBACK_UNAVAILABLE

CATALOG_LOCALIZATION_INVALID

## 29. Errores de imágenes

PRODUCT_IMAGE_NOT_FOUND

PRODUCT_IMAGE_INACTIVE

PRODUCT_IMAGE_REFERENCE_INVALID

PRODUCT_IMAGE_TENANT_MISMATCH

PRODUCT_IMAGE_ACCESS_DENIED

PRODUCT_IMAGE_FORMAT_UNSUPPORTED

PRODUCT_IMAGE_METADATA_INVALID

## 30. Errores de precio

Cuando el catálogo consulta Pricing:

PRODUCT_PRICE_NOT_FOUND

PRODUCT_PRICE_EXPIRED

PRODUCT_PRICE_CURRENCY_MISMATCH

PRODUCT_PRICE_SCOPE_MISMATCH

PRODUCT_PRICE_SOURCE_UNAVAILABLE

PRODUCT_PRICE_VERSION_MISMATCH

PRODUCT_PRICE_DATA_INVALID

Nunca sustituir con precio inventado.

## 31. Errores de restricción

PRODUCT_AGE_RESTRICTION

PRODUCT_REGION_RESTRICTION

PRODUCT_CHANNEL_RESTRICTION

PRODUCT_TIME_RESTRICTION

PRODUCT_AUTHENTICATION_REQUIRED

PRODUCT_HUMAN_REVIEW_REQUIRED

No revelar reglas internas excesivas.

## 32. Errores de seguridad

CATALOG_QUERY_INJECTION_DETECTED

CATALOG_FILTER_INJECTION_DETECTED

CATALOG_SORT_INJECTION_DETECTED

CATALOG_CURSOR_TAMPERING_DETECTED

CATALOG_CROSS_TENANT_ATTEMPT

CATALOG_HIDDEN_FIELD_ACCESS_ATTEMPT

CATALOG_ENUMERATION_LIMIT

CATALOG_ALIAS_POISONING_DETECTED

CATALOG_CACHE_POISONING_DETECTED

CATALOG_PROMPT_INJECTION_CONTENT_DETECTED

## 33. Mapping a respuesta

Ejemplo:

PRODUCT_NOT_FOUND

Texto:

"No encontré ese producto. Puedes decirme la marca o la presentación."

Voz:

"No encontré ese producto. ¿Me dices la marca o el tamaño?"

No decir:

"SELECT returned zero rows."

## 34. Mapping por canal

WEB:

- código de UI;
- mensaje;
- acciones;
- botón;
- retry.

VOICE:

- mensaje breve;
- no recitar código;
- aclaración.

API interna:

- error estructurado completo;
- Correlation ID.

## 35. Detalles permitidos

- reference_type;
- filter_field;
- retry_after;
- expected_version;
- current_version;
- allowed_values limitados;
- clarification type.

## 36. Detalles prohibidos

- SQL;
- tabla;
- path interno;
- stack trace;
- provider secret;
- token;
- datos de otro tenant;
- existencia de recurso ajeno;
- PII.

## 37. Retry policy

NOT_FOUND:

No reintentar igual.

TIMEOUT:

Reintento limitado.

VERSION_CONFLICT:

Recargar y reevaluar.

RATE_LIMIT:

Esperar.

DEPENDENCY:

Fallback.

SECURITY:

No reintentar; bloquear o auditar.

## 38. Errores y idempotencia

Un reintento idempotente debe devolver:

- mismo resultado;
- mismo error estable cuando sigue vigente;
- no duplicar eventos críticos.

## 39. Errores y observabilidad

Cada error debe producir:

- counter;
- log estructurado;
- trace status;
- severity;
- component;
- Correlation ID.

Los errores esperados pueden usar INFO/WARN.

## 40. Errores y auditoría

Auditar:

- cross-tenant;
- hidden field;
- publication;
- rollback;
- restricted product;
- security;
- data integrity.

## 41. Pseudocódigo

```text
function map_catalog_error(error, context):

    definition = load_catalog_error_definition(error.code)

    safe_details = filter_error_details(
        error.details,
        definition.allowed_public_details
    )

    response = CatalogErrorResponse(
        error_id=new_id(),
        code=definition.code,
        category=definition.category,
        message_code=definition.message_code,
        safe_message=localize_message(
            definition.message_code,
            context.locale,
            context.channel
        ),
        retryable=definition.retryable,
        details=safe_details,
        request_id=context.request_id,
        correlation_id=context.correlation_id,
        error_schema_version=current_error_schema_version
    )

    emit_catalog_error_telemetry(response, error.internal_context)
    audit_if_required(response, context)

    return response
```

## 42. Eventos

CatalogErrorOccurred

CatalogValidationErrorOccurred

CatalogDependencyErrorOccurred

CatalogVersionConflictDetected

CatalogDataIntegrityErrorDetected

CatalogSecurityErrorDetected

CatalogErrorFallbackActivated

CatalogErrorRecovered

## 43. Observabilidad

Métricas:

- catalog_errors_total;
- catalog_validation_errors_total;
- catalog_not_found_total;
- catalog_version_errors_total;
- catalog_dependency_errors_total;
- catalog_security_errors_total;
- catalog_data_integrity_errors_total;
- catalog_retry_total;
- catalog_error_recovery_total.

Dimensiones:

- code;
- category;
- severity;
- retryable;
- component;
- channel;
- result.

## 44. Casos límite

- error desconocido;
- código no catalogado;
- details con PII;
- provider error;
- tenant mismatch;
- repeated error;
- nested error;
- timeout;
- version conflict;
- cache stale;
- security;
- voice;
- localization missing;
- Correlation ID missing;
- telemetry unavailable;
- audit unavailable.

## 45. Criterios de aceptación

AC-CERR-001

Todo error posee código estable.

AC-CERR-002

Todo error posee categoría.

AC-CERR-003

Todo error indica retryable.

AC-CERR-004

Todo error posee mensaje seguro.

AC-CERR-005

Los detalles se filtran.

AC-CERR-006

Los errores de tenant no filtran existencia.

AC-CERR-007

Los códigos no dependen del proveedor.

AC-CERR-008

Los errores se localizan.

AC-CERR-009

Los errores se adaptan al canal.

AC-CERR-010

Los errores tienen Correlation ID.

AC-CERR-011

Los errores de seguridad se auditan.

AC-CERR-012

Los errores esperados no generan alertas críticas.

AC-CERR-013

Los errores técnicos pueden activar fallback.

AC-CERR-014

Los errores se versionan.

AC-CERR-015

Todos los códigos poseen pruebas.

## 46. Plan mínimo de pruebas

- validation;
- not found;
- inactive;
- restricted;
- tenant;
- category;
- brand;
- alias;
- search;
- filter;
- sort;
- cursor;
- list;
- resolution;
- version;
- publication;
- rollback;
- cache;
- snapshot;
- locale;
- image;
- price;
- security;
- retry;
- channel;
- voice;
- redaction;
- observability;
- audit.

## 47. Checklist

[ ] Existe Error ID.
[ ] Existe code.
[ ] Existe category.
[ ] Existe severity.
[ ] Existe retryable.
[ ] Existe message code.
[ ] Existe safe message.
[ ] Existe details schema.
[ ] Existe Request ID.
[ ] Existe Correlation ID.
[ ] Existe schema version.
[ ] Se filtran detalles.
[ ] Se localiza.
[ ] Se adapta al canal.
[ ] Se emite telemetría.
[ ] Se audita seguridad.
[ ] Existe retry policy.
[ ] Existen pruebas.

======================================================================
FIN DEL DOCUMENTO
======================================================================
