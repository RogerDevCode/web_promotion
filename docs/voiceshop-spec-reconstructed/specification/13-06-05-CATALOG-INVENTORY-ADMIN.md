======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-06-05-CATALOG-INVENTORY-ADMIN.md

# ADMINISTRACIÓN CONTROLADA DE CATÁLOGO E INVENTARIO

## 1. Objetivo

Este documento define cómo actores autorizados administran catálogo e
inventario desde BackOffice sin evitar reglas, versiones, aprobaciones,
idempotencia o auditoría.

El módulo permite:

- crear y editar borradores de catálogo;
- validar datos;
- publicar versiones;
- ejecutar rollback;
- administrar categorías, marcas y aliases;
- revisar balances;
- solicitar ajustes;
- aprobar ajustes;
- bloquear o desbloquear stock;
- conciliar diferencias;
- revisar reservas;
- ejecutar operaciones excepcionales autorizadas.

## 2. Alcance

Incluye:

- Catalog Draft;
- Catalog Change Set;
- validation;
- publication;
- rollback;
- categories;
- brands;
- aliases;
- product status;
- inventory balance view;
- adjustment request;
- approval;
- reconciliation;
- reservation review;
- batch operations;
- versioning;
- errors;
- events;
- observability;
- audit;
- QA.

No incluye:

- edición directa de versiones publicadas;
- update genérico de balances;
- ejecución por LLM;
- sistema PIM/WMS completo;
- diseño visual;
- operaciones físicas de bodega.

## 3. Principios

RULE-CIA-001

Toda edición de catálogo ocurre en un draft.

RULE-CIA-002

Una versión publicada es inmutable.

RULE-CIA-003

Toda publicación requiere validación.

RULE-CIA-004

Las publicaciones críticas pueden requerir aprobación.

RULE-CIA-005

Todo rollback es explícito.

RULE-CIA-006

Toda modificación de inventario usa AdjustInventory.

RULE-CIA-007

No existe edición directa de buckets.

RULE-CIA-008

Todo ajuste requiere reason.

RULE-CIA-009

Todo ajuste usa idempotencia.

RULE-CIA-010

Todo ajuste valida Inventory Version.

RULE-CIA-011

Los ajustes sensibles requieren aprobación.

RULE-CIA-012

La LLM sólo puede sugerir texto o detecciones.

RULE-CIA-013

Todo acceso respeta tenant.

RULE-CIA-014

Todo cambio conserva before/after.

RULE-CIA-015

Toda operación es auditable.

## 4. Roles

CATALOG_EDITOR

CATALOG_REVIEWER

CATALOG_PUBLISHER

INVENTORY_VIEWER

INVENTORY_MANAGER

INVENTORY_APPROVER

OPERATIONS_MANAGER

READ_ONLY_AUDITOR

La segregación puede exigir actores distintos.

## 5. Catalog Draft

```json
{
  "catalog_draft_id": "UUID",
  "tenant_id": "UUID",
  "base_catalog_version": 42,
  "status": "OPEN",
  "created_by_actor_id": "UUID",
  "draft_version": 1,
  "created_at": "UTC_TIMESTAMP"
}
```

## 6. Estados de draft

OPEN

EDITING

VALIDATING

VALIDATION_FAILED

READY_FOR_REVIEW

REVIEW_CHANGES_REQUESTED

APPROVAL_PENDING

APPROVED

PUBLISHING

PUBLISHED

REJECTED

CANCELLED

EXPIRED

## 7. Change Set

```json
{
  "catalog_change_set_id": "UUID",
  "catalog_draft_id": "UUID",
  "tenant_id": "UUID",
  "draft_version": 4,
  "changes": [
    {
      "change_type": "UPDATE_PRODUCT",
      "resource_id": "UUID",
      "before_version": 7,
      "patch": {
        "status": "INACTIVE"
      }
    }
  ],
  "reason_code": "PRODUCT_DISCONTINUED"
}
```

## 8. Change types

CREATE_PRODUCT

UPDATE_PRODUCT

CHANGE_PRODUCT_STATUS

CREATE_CATEGORY

UPDATE_CATEGORY

MOVE_CATEGORY

CREATE_BRAND

UPDATE_BRAND

ADD_ALIAS

REMOVE_ALIAS

UPDATE_LOCALIZATION

UPDATE_IMAGE_REFERENCE

UPDATE_RESTRICTION

BATCH_UPDATE

## 9. Edición concurrente

Todo cambio debe validar:

- Draft Version;
- Resource Version;
- base Catalog Version.

Conflictos no se resuelven por last-write-wins.

## 10. Validación de catálogo

Debe verificar:

- IDs;
- SKUs;
- barcodes;
- categorías;
- ciclos;
- marcas;
- aliases;
- localizaciones;
- imágenes;
- estados;
- restricciones;
- referencias;
- campos requeridos;
- compatibilidad.

## 11. Validation Result

```json
{
  "catalog_validation_result_id": "UUID",
  "catalog_draft_id": "UUID",
  "status": "FAILED",
  "errors": [
    {
      "code": "CATEGORY_CYCLE_DETECTED",
      "resource_reference": "UUID",
      "severity": "CRITICAL"
    }
  ],
  "warnings": [],
  "validated_at": "UTC_TIMESTAMP"
}
```

## 12. Warnings

Pueden permitir publicación sólo si:

- policy;
- reviewer;
- reason;
- approval;
- evidencia.

Los errores críticos bloquean.

## 13. Review

El reviewer puede:

- aprobar;
- rechazar;
- solicitar cambios;
- agregar comentario;
- comparar diff;
- consultar validación.

No debe editar silenciosamente el draft si la política separa roles.

## 14. Approval

La publicación puede requerir Approval Request vinculada con:

- tenant;
- Draft ID;
- Draft Version;
- Change Set hash;
- validation result;
- target Catalog Version;
- publisher.

## 15. Publicación

Debe usar el proceso oficial de Catalog Versioning.

No actualizar recursos uno por uno visibles al lector.

## 16. Publicación atómica

Debe producir:

- nueva Catalog Version;
- snapshot;
- checksum;
- publication result;
- events;
- cache invalidation;
- audit.

## 17. Rollback

Opciones:

- publicar una versión basada en snapshot anterior;
- cambiar latest pointer bajo política;
- desactivar versión problemática.

No editar la versión publicada.

## 18. Rollback Request

```json
{
  "catalog_rollback_request_id": "UUID",
  "tenant_id": "UUID",
  "current_catalog_version": 43,
  "target_catalog_version": 42,
  "reason_code": "PRODUCTION_DEFECT",
  "requested_by_actor_id": "UUID",
  "approval_reference": "UUID",
  "idempotency_key": "STRING"
}
```

## 19. Batch catalog operations

Deben limitar:

- items;
- payload;
- duration;
- risk;
- retries;
- failure mode.

Modos:

ATOMIC_CHANGE_SET

PER_ITEM_DRAFT

IMPORT_WITH_REVIEW

## 20. Import

Debe validar:

- file;
- schema;
- checksum;
- malware;
- rows;
- tenant;
- duplicates;
- mappings;
- preview;
- dry run.

## 21. Dry Run

Debe producir:

- proposed changes;
- errors;
- warnings;
- affected resources;
- estimated impact;
- no side effects.

## 22. Inventory View

Debe mostrar:

- Product ID;
- Location ID;
- buckets autorizados;
- Inventory Version;
- source;
- freshness;
- active reservations;
- warnings;
- reconciliation status.

## 23. Campos restringidos

Dependiendo del rol:

- costs;
- supplier data;
- security flags;
- other tenants;
- hidden movement details.

## 24. Adjustment Request

Debe invocar AdjustInventory.

```json
{
  "inventory_adjustment_admin_request_id": "UUID",
  "tenant_id": "UUID",
  "product_id": "UUID",
  "location_id": "UUID",
  "adjustment_type": "COUNT_CORRECTION",
  "target_bucket": "ON_HAND",
  "operation": "SET_TO",
  "quantity": 18,
  "reason_code": "PHYSICAL_COUNT",
  "evidence_references": [
    "UUID"
  ],
  "expected_inventory_version": 44,
  "idempotency_key": "STRING"
}
```

## 25. Adjustment Preview

Antes de ejecutar debe mostrar:

- before;
- after;
- delta;
- available impact;
- active reservation impact;
- approval requirement;
- warnings;
- expected version.

## 26. Adjustment Approval

Debe vincularse con:

- exact payload hash;
- actor distinto;
- tenant;
- Product ID;
- Location ID;
- amount/quantity;
- version;
- expiration.

## 27. Block stock

Debe usar Adjustment Type BLOCK.

No editar AVAILABLE directamente.

## 28. Unblock stock

Debe validar:

- blocked quantity;
- reason;
- source;
- approval cuando aplique;
- current version.

## 29. Damaged stock

Debe mover cantidades mediante operación oficial.

Debe preservar:

- movement;
- reason;
- evidence;
- before/after.

## 30. Reservation Review

Puede mostrar:

- Reservation ID;
- owner type;
- Product ID;
- Location ID;
- quantity;
- status;
- created_at;
- expires_at;
- versions;
- UNKNOWN/reconciliation.

## 31. Reservation actions

Permitidas según rol:

- query;
- request release;
- renew bajo policy;
- start reconciliation;
- inspect movement.

No permitir editar status manualmente.

## 32. Force release

Debe ser operación excepcional.

Requiere:

- permission;
- reason;
- expected versions;
- owner state;
- approval según riesgo;
- idempotency;
- audit.

## 33. Reconciliation

Puede iniciarse cuando:

- balance mismatch;
- reservation UNKNOWN;
- source gap;
- negative available;
- movement missing;
- external system conflict.

## 34. Reconciliation Result

Debe distinguir:

RESOLVED_AUTOMATICALLY

RESOLVED_MANUALLY

NO_CHANGE_REQUIRED

ADJUSTMENT_REQUIRED

SOURCE_CORRECTION_REQUIRED

MANUAL_REVIEW_REQUIRED

FAILED

## 35. Inventory batch operations

Deben usar Commands por item o transacción explícita.

No aceptar spreadsheet como actualización directa.

## 36. LLM assistance

Permitido:

- sugerir descripción;
- detectar duplicados candidatos;
- resumir errores;
- sugerir mappings.

Prohibido:

- publicar;
- aprobar;
- ajustar stock;
- cambiar estado;
- elegir tenant;
- crear IDs oficiales.

## 37. Flujo de publicación

1. autenticar.
2. autorizar.
3. cargar draft.
4. validar version.
5. ejecutar validation.
6. resolver warnings.
7. obtener approval.
8. consultar idempotencia.
9. publicar atómicamente.
10. invalidar cache.
11. emitir eventos.
12. auditar.

## 38. Flujo de ajuste

1. autenticar.
2. autorizar.
3. validar tenant.
4. cargar balance.
5. validar version.
6. construir preview.
7. obtener reason/evidence.
8. evaluar approval.
9. ejecutar AdjustInventory.
10. mostrar resultado.
11. auditar.

## 39. Pseudocódigo de publicación

```text
function publish_catalog_draft(command):

    authorize_admin_operation(
        command.admin_session_id,
        permission="catalog.publish",
        tenant_id=command.tenant_id
    )

    draft = load_catalog_draft(command.catalog_draft_id)
    validate_draft_version(draft, command.expected_draft_version)
    validate_draft_status(draft, [READY_FOR_REVIEW, APPROVED])

    validation = validate_catalog_draft(draft)

    if validation.has_blocking_errors:
        reject(CATALOG_ADMIN_VALIDATION_FAILED)

    if publication_requires_approval(draft, validation):
        validate_approval(
            command.approval_reference,
            hash_publication_payload(draft, validation)
        )

    previous = get_idempotent_result(command.idempotency_key)
    if previous.exists:
        return previous

    result = publish_catalog_snapshot_atomically(draft)
    persist_publication_and_outbox(result)
    emit(CatalogAdminPublished)

    return result
```

## 40. Errores

CATALOG_ADMIN_DRAFT_NOT_FOUND

CATALOG_ADMIN_DRAFT_STATE_INVALID

CATALOG_ADMIN_DRAFT_VERSION_CONFLICT

CATALOG_ADMIN_RESOURCE_VERSION_CONFLICT

CATALOG_ADMIN_CHANGE_SET_INVALID

CATALOG_ADMIN_VALIDATION_FAILED

CATALOG_ADMIN_WARNING_APPROVAL_REQUIRED

CATALOG_ADMIN_PUBLICATION_NOT_AUTHORIZED

CATALOG_ADMIN_APPROVAL_INVALID

CATALOG_ADMIN_PUBLICATION_FAILED

CATALOG_ADMIN_ROLLBACK_NOT_ALLOWED

CATALOG_ADMIN_IMPORT_INVALID

CATALOG_ADMIN_BATCH_LIMIT_EXCEEDED

INVENTORY_ADMIN_BALANCE_NOT_FOUND

INVENTORY_ADMIN_VERSION_CONFLICT

INVENTORY_ADMIN_ADJUSTMENT_NOT_AUTHORIZED

INVENTORY_ADMIN_REASON_REQUIRED

INVENTORY_ADMIN_EVIDENCE_REQUIRED

INVENTORY_ADMIN_APPROVAL_REQUIRED

INVENTORY_ADMIN_ADJUSTMENT_FAILED

INVENTORY_ADMIN_RESERVATION_STATE_INVALID

INVENTORY_ADMIN_RECONCILIATION_FAILED

## 41. Eventos

CatalogDraftCreated

CatalogDraftUpdated

CatalogAdminValidationStarted

CatalogAdminValidationFailed

CatalogAdminReviewRequested

CatalogAdminChangesRequested

CatalogAdminApproved

CatalogAdminPublicationRequested

CatalogAdminPublished

CatalogAdminRollbackRequested

CatalogAdminRolledBack

InventoryAdminBalanceViewed

InventoryAdjustmentPreviewCreated

InventoryAdminAdjustmentRequested

InventoryAdminAdjustmentApproved

InventoryAdminAdjusted

InventoryAdminReservationReviewed

InventoryAdminForceReleaseRequested

InventoryAdminReconciliationRequested

InventoryAdminReconciliationCompleted

## 42. Observabilidad

Métricas:

- catalog_admin_drafts_total;
- catalog_admin_changes_total;
- catalog_admin_validation_failure_total;
- catalog_admin_approval_total;
- catalog_admin_publication_total;
- catalog_admin_publication_failure_total;
- catalog_admin_rollback_total;
- catalog_admin_import_total;
- inventory_admin_views_total;
- inventory_admin_adjustment_requests_total;
- inventory_admin_adjustment_failure_total;
- inventory_admin_approval_total;
- inventory_admin_force_release_total;
- inventory_admin_reconciliation_total;
- catalog_inventory_admin_duration_seconds.

Dimensiones:

- operation;
- resource_type;
- risk;
- result;
- error_code;
- approval_required;
- tenant_tier.

## 43. Auditoría

Registrar:

- actor;
- Admin Session;
- tenant;
- draft;
- change set;
- before/after;
- validation;
- approval;
- publication;
- rollback;
- Product/Location protected references;
- adjustment;
- evidence;
- reconciliation;
- Correlation ID.

## 44. Seguridad

Amenazas:

- unauthorized publication;
- draft tampering;
- self approval;
- hidden changes;
- cross-tenant import;
- stock manipulation;
- direct bucket edit;
- stale version overwrite;
- approval replay;
- malicious file.

Controles:

- roles;
- tenant;
- draft versions;
- validation;
- approvals;
- payload hash;
- Commands;
- idempotency;
- file scanning;
- audit.

## 45. Casos límite

- concurrent draft edits;
- base version changed;
- category cycle;
- duplicate SKU;
- approval expired;
- publication timeout;
- rollback concurrent;
- import partial;
- balance stale;
- adjustment preview changes;
- active reservations;
- force release race;
- source gap;
- negative available;
- reconciliation conflict;
- tenant mismatch;
- Operator loses permission.

## 46. Criterios de aceptación

AC-CIA-001

Toda edición ocurre en draft.

AC-CIA-002

Las versiones publicadas son inmutables.

AC-CIA-003

Toda publicación se valida.

AC-CIA-004

Las publicaciones críticas soportan approval.

AC-CIA-005

El rollback es explícito.

AC-CIA-006

Todo cambio de inventario usa AdjustInventory.

AC-CIA-007

No existe edición directa de buckets.

AC-CIA-008

Todo ajuste tiene reason.

AC-CIA-009

Todo ajuste usa idempotencia.

AC-CIA-010

Todo ajuste valida version.

AC-CIA-011

Los ajustes sensibles usan approval.

AC-CIA-012

La LLM sólo sugiere.

AC-CIA-013

Todo acceso respeta tenant.

AC-CIA-014

Todo cambio conserva before/after.

AC-CIA-015

Toda operación es auditable.

## 47. Plan mínimo de pruebas

- draft;
- changes;
- versions;
- validation;
- cycles;
- duplicates;
- review;
- approval;
- publication;
- atomicity;
- rollback;
- import;
- dry run;
- balance view;
- adjustment preview;
- adjustment;
- approval;
- block;
- damage;
- reservation review;
- force release;
- reconciliation;
- batch;
- LLM assistance;
- tenant;
- security;
- metrics;
- audit.

## 48. Checklist

[ ] Existe Catalog Draft.
[ ] Existen estados de draft.
[ ] Existe Change Set.
[ ] Existe versionado.
[ ] Existe validation.
[ ] Existe review.
[ ] Existe approval.
[ ] Existe publication.
[ ] Existe rollback.
[ ] Existe import.
[ ] Existe dry run.
[ ] Existe Inventory View.
[ ] Existe Adjustment Preview.
[ ] Existe AdjustInventory.
[ ] Existe block/unblock.
[ ] Existe reservation review.
[ ] Existe force release policy.
[ ] Existe reconciliation.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
