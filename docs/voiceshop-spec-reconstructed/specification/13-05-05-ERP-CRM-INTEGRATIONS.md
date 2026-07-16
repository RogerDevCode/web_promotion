======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-05-05-ERP-CRM-INTEGRATIONS.md

# INTEGRACIONES ERP Y CRM

## 1. Objetivo

Este documento define cómo VoiceShop intercambia datos con sistemas ERP,
CRM y plataformas operativas.

La integración debe permitir:

- consultar clientes autorizados;
- crear o actualizar referencias comerciales;
- sincronizar productos;
- sincronizar inventario;
- enviar pedidos;
- consultar estados;
- registrar interacciones;
- recibir eventos;
- conciliar operaciones.

El ERP o CRM puede ser fuente oficial de ciertos datos.

No es fuente automática de autorización dentro de VoiceShop.

## 2. Alcance

Incluye:

- customer reference;
- product synchronization;
- inventory synchronization;
- order export;
- order status;
- CRM activity;
- webhooks;
- polling;
- batch files;
- idempotencia;
- versionado;
- mapping;
- UNKNOWN;
- conciliación;
- seguridad;
- observabilidad;
- QA.

No incluye:

- implementación específica de SAP, Odoo, Salesforce u otro producto;
- reglas internas de contabilidad;
- lógica de pagos;
- UI administrativa;
- persistencia técnica concreta.

## 3. Principios

RULE-ERP-001

Todo sistema externo se accede mediante adapter.

RULE-ERP-002

Toda entidad externa posee referencia opaca.

RULE-ERP-003

Los IDs externos no reemplazan IDs internos.

RULE-ERP-004

Todo mapping pertenece a tenant.

RULE-ERP-005

Toda escritura usa idempotencia.

RULE-ERP-006

Toda sincronización usa versión o watermark.

RULE-ERP-007

Los eventos se deduplican.

RULE-ERP-008

Los eventos fuera de orden se controlan.

RULE-ERP-009

Un timeout de escritura puede producir UNKNOWN.

RULE-ERP-010

UNKNOWN requiere conciliación.

RULE-ERP-011

Los datos se minimizan.

RULE-ERP-012

Los secretos permanecen en backend.

RULE-ERP-013

Los campos externos se validan.

RULE-ERP-014

Los conflictos de ownership deben resolverse por política.

RULE-ERP-015

Toda operación debe ser auditable.

## 4. Sistemas

ERP

- productos;
- stock;
- pedidos;
- facturación;
- logística.

CRM

- clientes;
- contactos;
- actividades;
- oportunidades;
- handoff.

PIM

- catálogo;
- contenido;
- imágenes.

WMS

- inventario;
- ubicaciones;
- movimientos.

## 5. Entity Mapping

```json
{
  "entity_mapping_id": "UUID",
  "tenant_id": "UUID",
  "entity_type": "PRODUCT",
  "internal_id": "UUID",
  "external_system_id": "ERP-A",
  "external_reference": "OPAQUE",
  "mapping_version": 3,
  "status": "ACTIVE",
  "updated_at": "UTC_TIMESTAMP"
}
```

## 6. Mapping principles

- único por sistema y tenant;
- versionado;
- auditable;
- no reutilizado;
- inactivable;
- reconciliable.

## 7. Customer synchronization

Puede incluir:

- Customer ID;
- nombre;
- contacto;
- tax reference;
- addresses;
- consent;
- status;
- external reference.

Debe aplicar privacidad.

## 8. Customer ownership

Definir para cada campo:

INTERNAL_MASTER

EXTERNAL_MASTER

MERGED

READ_ONLY_EXTERNAL

MANUAL_CONFLICT

## 9. Product synchronization

Campos:

- Product ID mapping;
- SKU;
- barcode;
- name;
- status;
- category;
- presentation;
- attributes;
- source version.

No aceptar Product ID externo como interno.

## 10. Inventory synchronization

Puede usar:

SNAPSHOT

DELTA_EVENTS

POLLING

FILE_IMPORT

Debe detectar:

- duplicates;
- gaps;
- stale;
- version;
- negative;
- unit mismatch.

## 11. Order export

```json
{
  "erp_order_export_id": "UUID",
  "tenant_id": "UUID",
  "internal_order_id": "UUID",
  "external_system_id": "ERP-A",
  "order_version": 8,
  "payload": {
    "customer_reference": "OPAQUE",
    "lines": [],
    "totals": {},
    "delivery": {}
  },
  "idempotency_key": "STRING",
  "status": "REQUESTED"
}
```

## 12. Order export validation

- Order state;
- tenant;
- customer mapping;
- Product mappings;
- quantities;
- prices oficiales;
- currency;
- taxes;
- delivery;
- idempotency;
- schema version.

## 13. External order result

```json
{
  "erp_order_result_id": "UUID",
  "internal_order_id": "UUID",
  "external_order_reference": "OPAQUE",
  "status": "ACCEPTED",
  "external_version": "OPAQUE",
  "received_at": "UTC_TIMESTAMP"
}
```

## 14. Status mapping

External statuses map to internal integration statuses.

No permitir que un status desconocido cambie el Order Aggregate.

## 15. CRM activity

Puede registrar:

- conversation started;
- customer request;
- handoff;
- case created;
- order created;
- support note.

No enviar transcript completo por defecto.

## 16. CRM case

Debe incluir:

- Case ID interno;
- external case reference;
- tenant;
- customer reference;
- category;
- priority;
- summary;
- status;
- owner;
- timestamps.

## 17. Handoff integration

Cuando se crea handoff:

- crear caso/tarea;
- enviar resumen;
- adjuntar referencias;
- no transferir secretos;
- registrar external reference;
- manejar rechazo.

## 18. Webhooks

Eventos posibles:

ExternalOrderAccepted

ExternalOrderRejected

ExternalOrderStatusChanged

ExternalInventoryChanged

ExternalCustomerUpdated

ExternalCaseUpdated

Cada webhook se valida y deduplica.

## 19. Polling

Debe conservar:

- watermark;
- page token;
- overlap;
- last success;
- lag;
- retries;
- rate limit.

## 20. Batch files

Para import/export:

- schema;
- checksum;
- encoding;
- delimiter;
- row count;
- duplicate;
- errors by row;
- tenant;
- encryption.

## 21. Partial batch result

Debe indicar:

- accepted rows;
- rejected rows;
- unknown rows;
- error file reference;
- retry policy.

## 22. Versioning

Puede existir:

- internal entity version;
- mapping version;
- external version;
- sync cursor;
- schema version.

## 23. Conflict detection

Ejemplo:

VoiceShop actualiza teléfono.

CRM actualiza teléfono simultáneamente.

La policy define master o conflicto.

No usar last-write-wins sin declaración.

## 24. Conflict Record

```json
{
  "integration_conflict_id": "UUID",
  "tenant_id": "UUID",
  "entity_type": "CUSTOMER",
  "field": "phone",
  "internal_version": 4,
  "external_version": 9,
  "policy": "MANUAL_CONFLICT",
  "status": "OPEN"
}
```

## 25. Idempotencia

Operaciones:

- create external order;
- create case;
- update customer;
- send activity;
- import batch.

Misma key y payload:

- mismo resultado.

## 26. UNKNOWN

Ejemplo:

ERP recibe pedido.

La respuesta se pierde.

VoiceShop no debe crear otro pedido.

Debe consultar por:

- idempotency;
- internal order reference;
- external search;
- webhook;
- manual review.

## 27. Reconciliation

Debe comparar:

- mappings;
- internal state;
- external state;
- versions;
- events;
- idempotency;
- ledger.

## 28. Deletion and privacy

Si se solicita eliminación:

- evaluar obligación legal;
- anonimizar;
- eliminar del CRM si aplica;
- preservar audit mínimo;
- registrar resultado.

## 29. Security

- secret manager;
- tenant mappings;
- field allowlists;
- PII minimization;
- encryption;
- webhook signatures;
- file scanning;
- rate limits;
- audit.

## 30. Flow: export order

1. recibir OrderExport request.
2. validar Order.
3. cargar mappings.
4. validar fields.
5. construir payload.
6. consultar idempotencia.
7. enviar.
8. mapear response.
9. persistir external reference.
10. emitir event.
11. conciliar UNKNOWN.

## 31. Flow: sync inventory

1. obtener watermark.
2. solicitar cambios.
3. validar schema.
4. deduplicar.
5. validar sequence.
6. mapear Product/Location.
7. aplicar mediante Inventory Commands.
8. persistir cursor.
9. emitir events.
10. alertar gaps.

## 32. Pseudocódigo export

```text
function export_order_to_erp(order_id, context):

    order = load_order(order_id)
    validate_order_export_state(order)

    mappings = load_required_entity_mappings(order, context.tenant_id)
    validate_mappings(mappings)

    request = build_erp_order_request(
        order=order,
        mappings=mappings,
        schema_version=current_erp_order_schema
    )

    previous = get_idempotent_result(request.idempotency_key)
    if previous.exists:
        return previous

    result = erp_adapter.create_order(request)

    if result.status == UNKNOWN:
        persist_unknown_export(result)
        schedule_erp_reconciliation(result)
        return result

    persist_external_order_reference(result)
    emit(OrderExportedToERP)
    return result
```

## 33. Errores

ERP_NOT_CONFIGURED

ERP_AUTHENTICATION_FAILED

ERP_AUTHORIZATION_FAILED

ERP_MAPPING_NOT_FOUND

ERP_MAPPING_CONFLICT

ERP_SCHEMA_INVALID

ERP_ORDER_EXPORT_INVALID

ERP_ORDER_REJECTED

ERP_ORDER_RESULT_UNKNOWN

ERP_INVENTORY_SEQUENCE_GAP

ERP_INVENTORY_UNIT_MISMATCH

ERP_WEBHOOK_INVALID

ERP_RATE_LIMITED

ERP_TIMEOUT

ERP_UNAVAILABLE

CRM_NOT_CONFIGURED

CRM_CUSTOMER_MAPPING_FAILED

CRM_CASE_CREATION_FAILED

CRM_ACTIVITY_REJECTED

CRM_RESULT_UNKNOWN

ERP_CRM_RECONCILIATION_FAILED

## 34. Eventos

ERPEntityMappingCreated

ERPEntityMappingUpdated

ERPOrderExportRequested

OrderExportedToERP

ERPOrderExportRejected

ERPOrderExportMarkedUnknown

ERPInventorySyncStarted

ERPInventorySyncCompleted

ERPInventorySequenceGapDetected

CRMCustomerSynchronized

CRMCaseCreated

CRMActivityRecorded

ERPCRMConflictDetected

ERPCRMReconciliationStarted

ERPCRMReconciliationCompleted

## 35. Observabilidad

Métricas:

- erp_requests_total;
- erp_success_total;
- erp_failure_total;
- erp_timeout_total;
- erp_unknown_total;
- erp_order_exports_total;
- erp_inventory_sync_total;
- erp_sequence_gap_total;
- crm_requests_total;
- crm_case_total;
- crm_activity_total;
- erp_crm_conflicts_total;
- erp_crm_reconciliation_total;
- erp_crm_duration_seconds.

Dimensiones:

- system_class;
- operation;
- result;
- error_code;
- sync_mode;
- tenant_tier.

## 36. Auditoría

Registrar:

- internal entity;
- external system;
- external reference protegida;
- mapping version;
- operation;
- actor/service;
- idempotency hash;
- result;
- conflict;
- reconciliation;
- Correlation ID.

## 37. Casos límite

- mapping missing;
- mapping duplicate;
- external status unknown;
- timeout after send;
- duplicate webhook;
- event out-of-order;
- inventory sequence gap;
- unit mismatch;
- customer field conflict;
- batch partial;
- file invalid;
- CRM unavailable;
- ERP unavailable;
- rate limit;
- deletion;
- cross-tenant mapping;
- reconciliation.

## 38. Criterios de aceptación

AC-ERP-001

Todo sistema usa adapter.

AC-ERP-002

Todo ID externo permanece opaco.

AC-ERP-003

Los IDs externos no reemplazan internos.

AC-ERP-004

Todo mapping respeta tenant.

AC-ERP-005

Toda escritura usa idempotencia.

AC-ERP-006

Toda sync usa versión o watermark.

AC-ERP-007

Los eventos se deduplican.

AC-ERP-008

Se controla ordering.

AC-ERP-009

UNKNOWN se concilia.

AC-ERP-010

Los datos se minimizan.

AC-ERP-011

Los secretos permanecen en backend.

AC-ERP-012

Los campos externos se validan.

AC-ERP-013

Los conflictos usan política.

AC-ERP-014

La privacidad se respeta.

AC-ERP-015

Toda operación es auditable.

## 39. Plan mínimo de pruebas

- mappings;
- customer sync;
- product sync;
- inventory snapshot;
- inventory deltas;
- order export;
- status mapping;
- CRM activity;
- case;
- handoff;
- webhook;
- signature;
- duplicate;
- ordering;
- polling;
- watermark;
- batch;
- partial;
- version;
- conflicts;
- idempotency;
- timeout;
- unknown;
- reconciliation;
- privacy;
- security;
- metrics;
- contract.

## 40. Checklist

[ ] Existe ERP Adapter.
[ ] Existe CRM Adapter.
[ ] Existe Entity Mapping.
[ ] Existe customer sync.
[ ] Existe product sync.
[ ] Existe inventory sync.
[ ] Existe order export.
[ ] Existe status mapping.
[ ] Existe CRM activity.
[ ] Existe handoff.
[ ] Se validan webhooks.
[ ] Existe polling.
[ ] Existe batch contract.
[ ] Se controla versioning.
[ ] Se controlan conflicts.
[ ] Existe idempotency.
[ ] Existe UNKNOWN policy.
[ ] Existe reconciliation.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
