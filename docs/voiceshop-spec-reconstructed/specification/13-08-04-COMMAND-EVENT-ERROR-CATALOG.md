======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-08-04-COMMAND-EVENT-ERROR-CATALOG.md

# CATÁLOGO MAESTRO DE COMMANDS, EVENTOS Y ERRORES

## 1. Objetivo

Consolida las convenciones, contratos, familias, versionado y reglas de Commands, eventos, estados y errores de VoiceShop.

## 2. Commands

Session: StartSession, EndSession, TransferControl, ReturnControl.

Voice: StartVoiceTurn, CommitAudio, CancelResponse, TruncateOutput.

Catalog: CreateCatalogDraft, PublishCatalog, RollbackCatalog.

Inventory: ReserveStock, ReleaseReservation, AdjustInventory, ReconcileInventory.

Cart: AddCartLine, UpdateCartLine, RemoveCartLine, ClearCart.

Order: CreateOrder, ConfirmOrder, CancelOrder, ExportOrder.

Payment: StartPayment, CancelPayment, RefundPayment, ReconcilePayment.

Admin: CreateTenant, SuspendTenant, ActivateIntegration, RotateSecret.

## 3. Command contract

Todo Command posee Command ID, tenant, actor, expected version, idempotency, payload, reason, approval, correlation y timestamp.

Todo Command produce Result, Events o Error estable.

## 4. Events

Los eventos usan PascalCase, tiempo pasado, aggregate ID, aggregate version, tenant, correlation, causation, occurred_at y payload version.

Los eventos no transportan secretos ni payloads innecesarios.

## 5. Event families

Session events, Voice events, Catalog events, Inventory events, Cart events, Order events, Payment events, Handoff events, Admin events, Integration events y Operational events.

## 6. Errors

Los errores se clasifican en VALIDATION, AUTHENTICATION, AUTHORIZATION, NOT_FOUND, CONFLICT, DEPENDENCY, TIMEOUT, UNKNOWN, SECURITY y INTERNAL.

## 7. Error contract

Todo error posee code, category, retryable, unknown, safe_message, details permitidos, correlation y timestamp.

## 8. Estados

Cada aggregate tiene máquina de estados explícita.

Un estado no puede reutilizarse con semántica distinta entre documentos sin namespace.

## 9. Versionado

Commands, eventos y errores poseen schema version.

Los cambios incompatibles requieren versión nueva y ventana de compatibilidad.

## 10. Deduplicación

Los Commands se deduplican por Idempotency Key y payload hash.

Los eventos se deduplican por provider/source ID o Event ID.

## 11. Compatibilidad

Los consumidores deben declarar versiones soportadas.

Los campos nuevos opcionales pueden ser compatibles; cambios de significado no lo son.

## 12. Reglas normativas

RULE-CEE-001

Todo requisito debe poseer identificador estable.

RULE-CEE-002

Todo requisito debe vincular al menos un criterio de aceptación.

RULE-CEE-003

Todo criterio de aceptación debe vincular al menos una prueba.

RULE-CEE-004

Toda prueba debe producir evidencia reproducible.

RULE-CEE-005

Todo Command debe tener owner, autorización, schema y resultado definido.

RULE-CEE-006

Todo evento debe indicar aggregate, versión, causation y correlation.

RULE-CEE-007

Todo error debe tener código estable, categoría y mensaje seguro.

RULE-CEE-008

Toda referencia cruzada debe apuntar a un identificador existente.

RULE-CEE-009

Todo documento debe ocupar una posición inequívoca en el árbol maestro.

RULE-CEE-010

Los archivos deben reconstruirse sin renombrados implícitos.

RULE-CEE-011

Toda duplicidad semántica debe detectarse antes del cierre.

RULE-CEE-012

Toda inconsistencia entre documentos debe producir un hallazgo.

RULE-CEE-013

Los tenants deben permanecer aislados en contratos y ejemplos.

RULE-CEE-014

Todo resultado UNKNOWN debe estar representado en trazabilidad y pruebas.

RULE-CEE-015

Toda modificación de índices o catálogos debe conservar historial.

RULE-CEE-016

Todo requisito debe poseer identificador estable.

RULE-CEE-017

Todo requisito debe vincular al menos un criterio de aceptación.

RULE-CEE-018

Todo criterio de aceptación debe vincular al menos una prueba.

RULE-CEE-019

Toda prueba debe producir evidencia reproducible.

RULE-CEE-020

Todo Command debe tener owner, autorización, schema y resultado definido.

RULE-CEE-021

Todo evento debe indicar aggregate, versión, causation y correlation.

RULE-CEE-022

Todo error debe tener código estable, categoría y mensaje seguro.

RULE-CEE-023

Toda referencia cruzada debe apuntar a un identificador existente.

RULE-CEE-024

Todo documento debe ocupar una posición inequívoca en el árbol maestro.

RULE-CEE-025

Los archivos deben reconstruirse sin renombrados implícitos.

RULE-CEE-026

Toda duplicidad semántica debe detectarse antes del cierre.

RULE-CEE-027

Toda inconsistencia entre documentos debe producir un hallazgo.

RULE-CEE-028

Los tenants deben permanecer aislados en contratos y ejemplos.

RULE-CEE-029

Todo resultado UNKNOWN debe estar representado en trazabilidad y pruebas.

RULE-CEE-030

Toda modificación de índices o catálogos debe conservar historial.

RULE-CEE-031

Todo requisito debe poseer identificador estable.

RULE-CEE-032

Todo requisito debe vincular al menos un criterio de aceptación.

RULE-CEE-033

Todo criterio de aceptación debe vincular al menos una prueba.

RULE-CEE-034

Toda prueba debe producir evidencia reproducible.

RULE-CEE-035

Todo Command debe tener owner, autorización, schema y resultado definido.

RULE-CEE-036

Todo evento debe indicar aggregate, versión, causation y correlation.

RULE-CEE-037

Todo error debe tener código estable, categoría y mensaje seguro.

RULE-CEE-038

Toda referencia cruzada debe apuntar a un identificador existente.

RULE-CEE-039

Todo documento debe ocupar una posición inequívoca en el árbol maestro.

RULE-CEE-040

Los archivos deben reconstruirse sin renombrados implícitos.

RULE-CEE-041

Toda duplicidad semántica debe detectarse antes del cierre.

RULE-CEE-042

Toda inconsistencia entre documentos debe producir un hallazgo.

RULE-CEE-043

Los tenants deben permanecer aislados en contratos y ejemplos.

RULE-CEE-044

Todo resultado UNKNOWN debe estar representado en trazabilidad y pruebas.

RULE-CEE-045

Toda modificación de índices o catálogos debe conservar historial.

RULE-CEE-046

Todo requisito debe poseer identificador estable.

RULE-CEE-047

Todo requisito debe vincular al menos un criterio de aceptación.

RULE-CEE-048

Todo criterio de aceptación debe vincular al menos una prueba.

RULE-CEE-049

Toda prueba debe producir evidencia reproducible.

RULE-CEE-050

Todo Command debe tener owner, autorización, schema y resultado definido.

RULE-CEE-051

Todo evento debe indicar aggregate, versión, causation y correlation.

RULE-CEE-052

Todo error debe tener código estable, categoría y mensaje seguro.

RULE-CEE-053

Toda referencia cruzada debe apuntar a un identificador existente.

RULE-CEE-054

Todo documento debe ocupar una posición inequívoca en el árbol maestro.

RULE-CEE-055

Los archivos deben reconstruirse sin renombrados implícitos.

RULE-CEE-056

Toda duplicidad semántica debe detectarse antes del cierre.

RULE-CEE-057

Toda inconsistencia entre documentos debe producir un hallazgo.

RULE-CEE-058

Los tenants deben permanecer aislados en contratos y ejemplos.

RULE-CEE-059

Todo resultado UNKNOWN debe estar representado en trazabilidad y pruebas.

RULE-CEE-060

Toda modificación de índices o catálogos debe conservar historial.

RULE-CEE-061

Todo requisito debe poseer identificador estable.

RULE-CEE-062

Todo requisito debe vincular al menos un criterio de aceptación.

RULE-CEE-063

Todo criterio de aceptación debe vincular al menos una prueba.

RULE-CEE-064

Toda prueba debe producir evidencia reproducible.

RULE-CEE-065

Todo Command debe tener owner, autorización, schema y resultado definido.

RULE-CEE-066

Todo evento debe indicar aggregate, versión, causation y correlation.

RULE-CEE-067

Todo error debe tener código estable, categoría y mensaje seguro.

RULE-CEE-068

Toda referencia cruzada debe apuntar a un identificador existente.

RULE-CEE-069

Todo documento debe ocupar una posición inequívoca en el árbol maestro.

RULE-CEE-070

Los archivos deben reconstruirse sin renombrados implícitos.

RULE-CEE-071

Toda duplicidad semántica debe detectarse antes del cierre.

RULE-CEE-072

Toda inconsistencia entre documentos debe producir un hallazgo.

RULE-CEE-073

Los tenants deben permanecer aislados en contratos y ejemplos.

RULE-CEE-074

Todo resultado UNKNOWN debe estar representado en trazabilidad y pruebas.

RULE-CEE-075

Toda modificación de índices o catálogos debe conservar historial.

RULE-CEE-076

Todo requisito debe poseer identificador estable.

RULE-CEE-077

Todo requisito debe vincular al menos un criterio de aceptación.

RULE-CEE-078

Todo criterio de aceptación debe vincular al menos una prueba.

RULE-CEE-079

Toda prueba debe producir evidencia reproducible.

RULE-CEE-080

Todo Command debe tener owner, autorización, schema y resultado definido.

## 13. Contrato JSON de referencia

```json
{
  "record_id": "STABLE-ID",
  "record_type": "REQUIREMENT_COMMAND_EVENT_ERROR_OR_FILE",
  "source_document": "DOCUMENT-ID",
  "target_references": [
    "STABLE-ID"
  ],
  "owner": "TEAM_OR_ROLE",
  "status": "ACTIVE",
  "version": 1,
  "checksum": "HASH_OR_NULL",
  "updated_at": "UTC_TIMESTAMP"
}
```

## 14. Flujo funcional

1. Recolectar identificadores desde todos los documentos.
2. Normalizar formato y namespace.
3. Detectar duplicados.
4. Detectar referencias rotas.
5. Clasificar requisito, criterio, prueba, comando, evento, error o archivo.
6. Asignar owner.
7. Construir relaciones source-target.
8. Validar tenant y seguridad.
9. Validar estados UNKNOWN y reconciliación.
10. Verificar cobertura de pruebas.
11. Verificar cobertura de evidencia.
12. Verificar orden de reconstrucción.
13. Calcular checksums.
14. Publicar índices.
15. Ejecutar revisión de consistencia.
16. Registrar hallazgos.
17. Corregir o aceptar excepciones.
18. Congelar versión final.

## 15. Pseudocódigo

```text
function build_master_catalog(all_documents):

    records = []
    references = []

    for document in all_documents:
        validate_document_header(document)
        validate_document_identifier(document)

        extracted = extract_stable_records(document)
        records.extend(extracted.records)
        references.extend(extracted.references)

    detect_duplicate_identifiers(records)
    detect_semantic_duplicates(records)
    detect_broken_references(records, references)

    traceability = build_traceability_graph(
        requirements=filter_requirements(records),
        acceptance_criteria=filter_acceptance(records),
        tests=filter_tests(records),
        evidence=filter_evidence(records)
    )

    validate_traceability_coverage(traceability)
    validate_commands_events_errors(records)
    validate_unknown_and_reconciliation_coverage(records)
    validate_tenant_isolation_contracts(records)

    file_manifest = build_file_manifest(all_documents)
    validate_reconstruction_order(file_manifest)
    calculate_checksums(file_manifest)

    findings = execute_consistency_review(
        records,
        references,
        traceability,
        file_manifest
    )

    publish_master_indexes(
        records,
        traceability,
        file_manifest,
        findings
    )

    return build_consolidation_result(
        records,
        traceability,
        file_manifest,
        findings
    )
```

## 16. Errores funcionales

CEE_RECORD_INVALID

CEE_IDENTIFIER_DUPLICATE

CEE_SEMANTIC_DUPLICATE

CEE_REFERENCE_BROKEN

CEE_REQUIREMENT_UNTRACED

CEE_AC_UNTRACED

CEE_TEST_WITHOUT_EVIDENCE

CEE_COMMAND_DUPLICATE

CEE_COMMAND_SCHEMA_MISSING

CEE_EVENT_DUPLICATE

CEE_EVENT_VERSION_MISSING

CEE_ERROR_CODE_DUPLICATE

CEE_ERROR_MESSAGE_UNSAFE

CEE_UNKNOWN_COVERAGE_MISSING

CEE_RECONCILIATION_COVERAGE_MISSING

CEE_TENANT_SCOPE_MISSING

CEE_FILE_ORDER_INVALID

CEE_FILE_MISSING

CEE_CHECKSUM_MISMATCH

CEE_MANIFEST_VERSION_CONFLICT

CEE_CONSISTENCY_REVIEW_FAILED

## 17. Eventos

MasterCatalogBuildStarted

RecordExtracted

DuplicateDetected

BrokenReferenceDetected

TraceabilityGraphBuilt

TraceabilityGapDetected

CommandCatalogBuilt

EventCatalogBuilt

ErrorCatalogBuilt

FileManifestBuilt

ChecksumCalculated

ConsistencyReviewStarted

ConsistencyFindingCreated

MasterCatalogPublished

FinalDocumentationVersionFrozen

## 18. Casos límite y pruebas adversariales

TEST-CEE-001

Verificar un requisito no posee criterio de aceptación. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-002

Verificar un criterio no posee prueba. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-003

Verificar una prueba no produce evidencia. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-004

Verificar dos comandos comparten nombre pero no semántica. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-005

Verificar dos eventos comparten nombre con payload incompatible. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-006

Verificar dos errores comparten código. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-007

Verificar una referencia apunta a un documento ausente. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-008

Verificar un archivo cambia de nombre sin actualizar el índice. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-009

Verificar un checksum no coincide. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-010

Verificar un documento se reconstruye fuera de orden. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-011

Verificar una operación UNKNOWN no posee reconciliación. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-012

Verificar un ejemplo omite tenant. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-013

Verificar un evento carece de version. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-014

Verificar un Command carece de idempotency. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-015

Verificar un error revela un secreto. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-016

Verificar un archivo ZIP contiene un documento extra. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-017

Verificar un documento aparece en dos paquetes. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-018

Verificar un paquete omite un documento esperado. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-019

Verificar el Master Index apunta a una parte antigua. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-020

Verificar una excepción no tiene owner. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-021

Verificar un hallazgo se cierra sin evidencia. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-022

Verificar un término de glosario se usa con otro significado. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-023

Verificar un ADR no está vinculado a requisitos. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-024

Verificar un test usa un ID inexistente. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-CEE-025

Verificar un archivo está corrupto. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

## 19. Criterios de aceptación

AC-CEE-001

Todo requisito posee ID estable.

AC-CEE-002

Todo requisito posee criterio de aceptación.

AC-CEE-003

Todo criterio posee prueba.

AC-CEE-004

Toda prueba posee evidencia.

AC-CEE-005

Todo Command posee schema.

AC-CEE-006

Todo evento posee version.

AC-CEE-007

Todo error posee código único.

AC-CEE-008

Toda referencia es resoluble.

AC-CEE-009

Todo archivo ocupa una posición única.

AC-CEE-010

Todo checksum es verificable.

AC-CEE-011

Todo UNKNOWN posee reconciliación.

AC-CEE-012

Todo contrato respeta tenant.

AC-CEE-013

Todo hallazgo posee owner.

AC-CEE-014

Todo índice está versionado.

AC-CEE-015

Toda consolidación es auditable.

AC-CEE-016

Todo requisito posee ID estable.

AC-CEE-017

Todo requisito posee criterio de aceptación.

AC-CEE-018

Todo criterio posee prueba.

AC-CEE-019

Toda prueba posee evidencia.

AC-CEE-020

Todo Command posee schema.

AC-CEE-021

Todo evento posee version.

AC-CEE-022

Todo error posee código único.

AC-CEE-023

Toda referencia es resoluble.

AC-CEE-024

Todo archivo ocupa una posición única.

AC-CEE-025

Todo checksum es verificable.

AC-CEE-026

Todo UNKNOWN posee reconciliación.

AC-CEE-027

Todo contrato respeta tenant.

AC-CEE-028

Todo hallazgo posee owner.

AC-CEE-029

Todo índice está versionado.

AC-CEE-030

Toda consolidación es auditable.

AC-CEE-031

Todo requisito posee ID estable.

AC-CEE-032

Todo requisito posee criterio de aceptación.

AC-CEE-033

Todo criterio posee prueba.

AC-CEE-034

Toda prueba posee evidencia.

AC-CEE-035

Todo Command posee schema.

AC-CEE-036

Todo evento posee version.

AC-CEE-037

Todo error posee código único.

AC-CEE-038

Toda referencia es resoluble.

AC-CEE-039

Todo archivo ocupa una posición única.

AC-CEE-040

Todo checksum es verificable.

AC-CEE-041

Todo UNKNOWN posee reconciliación.

AC-CEE-042

Todo contrato respeta tenant.

AC-CEE-043

Todo hallazgo posee owner.

AC-CEE-044

Todo índice está versionado.

AC-CEE-045

Toda consolidación es auditable.

AC-CEE-046

Todo requisito posee ID estable.

AC-CEE-047

Todo requisito posee criterio de aceptación.

AC-CEE-048

Todo criterio posee prueba.

AC-CEE-049

Toda prueba posee evidencia.

AC-CEE-050

Todo Command posee schema.

AC-CEE-051

Todo evento posee version.

AC-CEE-052

Todo error posee código único.

AC-CEE-053

Toda referencia es resoluble.

AC-CEE-054

Todo archivo ocupa una posición única.

AC-CEE-055

Todo checksum es verificable.

AC-CEE-056

Todo UNKNOWN posee reconciliación.

AC-CEE-057

Todo contrato respeta tenant.

AC-CEE-058

Todo hallazgo posee owner.

AC-CEE-059

Todo índice está versionado.

AC-CEE-060

Toda consolidación es auditable.

AC-CEE-061

Todo requisito posee ID estable.

AC-CEE-062

Todo requisito posee criterio de aceptación.

AC-CEE-063

Todo criterio posee prueba.

AC-CEE-064

Toda prueba posee evidencia.

AC-CEE-065

Todo Command posee schema.

AC-CEE-066

Todo evento posee version.

AC-CEE-067

Todo error posee código único.

AC-CEE-068

Toda referencia es resoluble.

AC-CEE-069

Todo archivo ocupa una posición única.

AC-CEE-070

Todo checksum es verificable.

AC-CEE-071

Todo UNKNOWN posee reconciliación.

AC-CEE-072

Todo contrato respeta tenant.

AC-CEE-073

Todo hallazgo posee owner.

AC-CEE-074

Todo índice está versionado.

AC-CEE-075

Toda consolidación es auditable.

AC-CEE-076

Todo requisito posee ID estable.

AC-CEE-077

Todo requisito posee criterio de aceptación.

AC-CEE-078

Todo criterio posee prueba.

AC-CEE-079

Toda prueba posee evidencia.

AC-CEE-080

Todo Command posee schema.

## 20. Checklist final

[ ] Existe inventario de documentos.
[ ] Existe inventario de requisitos.
[ ] Existe inventario de criterios.
[ ] Existe inventario de pruebas.
[ ] Existe inventario de evidencias.
[ ] Existe catálogo de Commands.
[ ] Existe catálogo de eventos.
[ ] Existe catálogo de errores.
[ ] Existe catálogo de estados.
[ ] Existe catálogo de providers.
[ ] Existe matriz de trazabilidad.
[ ] Existe manifest de archivos.
[ ] Existe orden de reconstrucción.
[ ] Existen checksums.
[ ] Existe detección de duplicados.
[ ] Existe detección de referencias rotas.
[ ] Existe validación de UNKNOWN.
[ ] Existe validación de tenant.
[ ] Existe revisión de consistencia.
[ ] Existe version freeze.

======================================================================
FIN DEL DOCUMENTO
======================================================================
