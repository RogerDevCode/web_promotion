======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-08-03-TRACEABILITY-MATRIX.md

# MATRIZ DE TRAZABILIDAD

## 1. Objetivo

Define cómo vincular requisitos, decisiones, criterios de aceptación, pruebas, evidencias, Commands, eventos, errores y documentos.

## 2. Modelo de trazabilidad

La trazabilidad se representa como un grafo dirigido entre requisitos, decisiones, criterios de aceptación, pruebas, evidencia, Commands, eventos, errores y documentos.

Cada relación debe indicar tipo, fuente, destino, versión y owner.

## 3. Identificadores

REQ-AREA-NNN identifica requisitos.

AC-AREA-NNN identifica criterios de aceptación.

TEST-AREA-NNN identifica casos de prueba.

EVID-AREA-NNN identifica evidencia reproducible.

ADR-NNNN identifica decisiones arquitectónicas.

## 4. Cobertura mínima

Todo REQ debe enlazar al menos un AC.

Todo AC debe enlazar al menos un TEST.

Todo TEST de release debe enlazar evidencia.

Toda decisión crítica debe enlazar requisitos y pruebas.

## 5. Relaciones

IMPLEMENTS vincula componente o Command con requisito.

VERIFIES vincula prueba con criterio.

EVIDENCES vincula evidencia con prueba.

JUSTIFIES vincula ADR con requisito.

EMITS vincula Command con evento.

FAILS_WITH vincula operación con error.

## 6. Matriz funcional

Debe existir cobertura para Session, voz, LLM, catálogo, inventario, carrito, pedido, pago, handoff, admin, integraciones y operación.

## 7. Matriz no funcional

Debe cubrir seguridad, privacidad, latencia, disponibilidad, escalabilidad, coste, auditabilidad, RPO, RTO, recuperación y observabilidad.

## 8. UNKNOWN

Toda operación que pueda quedar UNKNOWN debe enlazar error, estado, reconciliación, runbook y pruebas de timeout posterior al envío.

## 9. Tenant isolation

Todo requisito tenant-scoped debe enlazar pruebas cross-tenant negativas y evidencia de aislamiento.

## 10. Release gates

Los gaps críticos de trazabilidad bloquean release.

Los gaps aceptados deben registrar excepción, owner, expiry y compensating controls.

## 11. Reglas normativas

RULE-TRM-001

Todo requisito debe poseer identificador estable.

RULE-TRM-002

Todo requisito debe vincular al menos un criterio de aceptación.

RULE-TRM-003

Todo criterio de aceptación debe vincular al menos una prueba.

RULE-TRM-004

Toda prueba debe producir evidencia reproducible.

RULE-TRM-005

Todo Command debe tener owner, autorización, schema y resultado definido.

RULE-TRM-006

Todo evento debe indicar aggregate, versión, causation y correlation.

RULE-TRM-007

Todo error debe tener código estable, categoría y mensaje seguro.

RULE-TRM-008

Toda referencia cruzada debe apuntar a un identificador existente.

RULE-TRM-009

Todo documento debe ocupar una posición inequívoca en el árbol maestro.

RULE-TRM-010

Los archivos deben reconstruirse sin renombrados implícitos.

RULE-TRM-011

Toda duplicidad semántica debe detectarse antes del cierre.

RULE-TRM-012

Toda inconsistencia entre documentos debe producir un hallazgo.

RULE-TRM-013

Los tenants deben permanecer aislados en contratos y ejemplos.

RULE-TRM-014

Todo resultado UNKNOWN debe estar representado en trazabilidad y pruebas.

RULE-TRM-015

Toda modificación de índices o catálogos debe conservar historial.

RULE-TRM-016

Todo requisito debe poseer identificador estable.

RULE-TRM-017

Todo requisito debe vincular al menos un criterio de aceptación.

RULE-TRM-018

Todo criterio de aceptación debe vincular al menos una prueba.

RULE-TRM-019

Toda prueba debe producir evidencia reproducible.

RULE-TRM-020

Todo Command debe tener owner, autorización, schema y resultado definido.

RULE-TRM-021

Todo evento debe indicar aggregate, versión, causation y correlation.

RULE-TRM-022

Todo error debe tener código estable, categoría y mensaje seguro.

RULE-TRM-023

Toda referencia cruzada debe apuntar a un identificador existente.

RULE-TRM-024

Todo documento debe ocupar una posición inequívoca en el árbol maestro.

RULE-TRM-025

Los archivos deben reconstruirse sin renombrados implícitos.

RULE-TRM-026

Toda duplicidad semántica debe detectarse antes del cierre.

RULE-TRM-027

Toda inconsistencia entre documentos debe producir un hallazgo.

RULE-TRM-028

Los tenants deben permanecer aislados en contratos y ejemplos.

RULE-TRM-029

Todo resultado UNKNOWN debe estar representado en trazabilidad y pruebas.

RULE-TRM-030

Toda modificación de índices o catálogos debe conservar historial.

RULE-TRM-031

Todo requisito debe poseer identificador estable.

RULE-TRM-032

Todo requisito debe vincular al menos un criterio de aceptación.

RULE-TRM-033

Todo criterio de aceptación debe vincular al menos una prueba.

RULE-TRM-034

Toda prueba debe producir evidencia reproducible.

RULE-TRM-035

Todo Command debe tener owner, autorización, schema y resultado definido.

RULE-TRM-036

Todo evento debe indicar aggregate, versión, causation y correlation.

RULE-TRM-037

Todo error debe tener código estable, categoría y mensaje seguro.

RULE-TRM-038

Toda referencia cruzada debe apuntar a un identificador existente.

RULE-TRM-039

Todo documento debe ocupar una posición inequívoca en el árbol maestro.

RULE-TRM-040

Los archivos deben reconstruirse sin renombrados implícitos.

RULE-TRM-041

Toda duplicidad semántica debe detectarse antes del cierre.

RULE-TRM-042

Toda inconsistencia entre documentos debe producir un hallazgo.

RULE-TRM-043

Los tenants deben permanecer aislados en contratos y ejemplos.

RULE-TRM-044

Todo resultado UNKNOWN debe estar representado en trazabilidad y pruebas.

RULE-TRM-045

Toda modificación de índices o catálogos debe conservar historial.

RULE-TRM-046

Todo requisito debe poseer identificador estable.

RULE-TRM-047

Todo requisito debe vincular al menos un criterio de aceptación.

RULE-TRM-048

Todo criterio de aceptación debe vincular al menos una prueba.

RULE-TRM-049

Toda prueba debe producir evidencia reproducible.

RULE-TRM-050

Todo Command debe tener owner, autorización, schema y resultado definido.

RULE-TRM-051

Todo evento debe indicar aggregate, versión, causation y correlation.

RULE-TRM-052

Todo error debe tener código estable, categoría y mensaje seguro.

RULE-TRM-053

Toda referencia cruzada debe apuntar a un identificador existente.

RULE-TRM-054

Todo documento debe ocupar una posición inequívoca en el árbol maestro.

RULE-TRM-055

Los archivos deben reconstruirse sin renombrados implícitos.

RULE-TRM-056

Toda duplicidad semántica debe detectarse antes del cierre.

RULE-TRM-057

Toda inconsistencia entre documentos debe producir un hallazgo.

RULE-TRM-058

Los tenants deben permanecer aislados en contratos y ejemplos.

RULE-TRM-059

Todo resultado UNKNOWN debe estar representado en trazabilidad y pruebas.

RULE-TRM-060

Toda modificación de índices o catálogos debe conservar historial.

RULE-TRM-061

Todo requisito debe poseer identificador estable.

RULE-TRM-062

Todo requisito debe vincular al menos un criterio de aceptación.

RULE-TRM-063

Todo criterio de aceptación debe vincular al menos una prueba.

RULE-TRM-064

Toda prueba debe producir evidencia reproducible.

RULE-TRM-065

Todo Command debe tener owner, autorización, schema y resultado definido.

RULE-TRM-066

Todo evento debe indicar aggregate, versión, causation y correlation.

RULE-TRM-067

Todo error debe tener código estable, categoría y mensaje seguro.

RULE-TRM-068

Toda referencia cruzada debe apuntar a un identificador existente.

RULE-TRM-069

Todo documento debe ocupar una posición inequívoca en el árbol maestro.

RULE-TRM-070

Los archivos deben reconstruirse sin renombrados implícitos.

RULE-TRM-071

Toda duplicidad semántica debe detectarse antes del cierre.

RULE-TRM-072

Toda inconsistencia entre documentos debe producir un hallazgo.

RULE-TRM-073

Los tenants deben permanecer aislados en contratos y ejemplos.

RULE-TRM-074

Todo resultado UNKNOWN debe estar representado en trazabilidad y pruebas.

RULE-TRM-075

Toda modificación de índices o catálogos debe conservar historial.

RULE-TRM-076

Todo requisito debe poseer identificador estable.

RULE-TRM-077

Todo requisito debe vincular al menos un criterio de aceptación.

RULE-TRM-078

Todo criterio de aceptación debe vincular al menos una prueba.

RULE-TRM-079

Toda prueba debe producir evidencia reproducible.

RULE-TRM-080

Todo Command debe tener owner, autorización, schema y resultado definido.

## 12. Contrato JSON de referencia

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

## 13. Flujo funcional

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

## 14. Pseudocódigo

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

## 15. Errores funcionales

TRM_RECORD_INVALID

TRM_IDENTIFIER_DUPLICATE

TRM_SEMANTIC_DUPLICATE

TRM_REFERENCE_BROKEN

TRM_REQUIREMENT_UNTRACED

TRM_AC_UNTRACED

TRM_TEST_WITHOUT_EVIDENCE

TRM_COMMAND_DUPLICATE

TRM_COMMAND_SCHEMA_MISSING

TRM_EVENT_DUPLICATE

TRM_EVENT_VERSION_MISSING

TRM_ERROR_CODE_DUPLICATE

TRM_ERROR_MESSAGE_UNSAFE

TRM_UNKNOWN_COVERAGE_MISSING

TRM_RECONCILIATION_COVERAGE_MISSING

TRM_TENANT_SCOPE_MISSING

TRM_FILE_ORDER_INVALID

TRM_FILE_MISSING

TRM_CHECKSUM_MISMATCH

TRM_MANIFEST_VERSION_CONFLICT

TRM_CONSISTENCY_REVIEW_FAILED

## 16. Eventos

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

## 17. Casos límite y pruebas adversariales

TEST-TRM-001

Verificar un requisito no posee criterio de aceptación. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-002

Verificar un criterio no posee prueba. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-003

Verificar una prueba no produce evidencia. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-004

Verificar dos comandos comparten nombre pero no semántica. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-005

Verificar dos eventos comparten nombre con payload incompatible. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-006

Verificar dos errores comparten código. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-007

Verificar una referencia apunta a un documento ausente. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-008

Verificar un archivo cambia de nombre sin actualizar el índice. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-009

Verificar un checksum no coincide. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-010

Verificar un documento se reconstruye fuera de orden. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-011

Verificar una operación UNKNOWN no posee reconciliación. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-012

Verificar un ejemplo omite tenant. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-013

Verificar un evento carece de version. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-014

Verificar un Command carece de idempotency. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-015

Verificar un error revela un secreto. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-016

Verificar un archivo ZIP contiene un documento extra. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-017

Verificar un documento aparece en dos paquetes. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-018

Verificar un paquete omite un documento esperado. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-019

Verificar el Master Index apunta a una parte antigua. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-020

Verificar una excepción no tiene owner. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-021

Verificar un hallazgo se cierra sin evidencia. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-022

Verificar un término de glosario se usa con otro significado. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-023

Verificar un ADR no está vinculado a requisitos. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-024

Verificar un test usa un ID inexistente. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-TRM-025

Verificar un archivo está corrupto. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

## 18. Criterios de aceptación

AC-TRM-001

Todo requisito posee ID estable.

AC-TRM-002

Todo requisito posee criterio de aceptación.

AC-TRM-003

Todo criterio posee prueba.

AC-TRM-004

Toda prueba posee evidencia.

AC-TRM-005

Todo Command posee schema.

AC-TRM-006

Todo evento posee version.

AC-TRM-007

Todo error posee código único.

AC-TRM-008

Toda referencia es resoluble.

AC-TRM-009

Todo archivo ocupa una posición única.

AC-TRM-010

Todo checksum es verificable.

AC-TRM-011

Todo UNKNOWN posee reconciliación.

AC-TRM-012

Todo contrato respeta tenant.

AC-TRM-013

Todo hallazgo posee owner.

AC-TRM-014

Todo índice está versionado.

AC-TRM-015

Toda consolidación es auditable.

AC-TRM-016

Todo requisito posee ID estable.

AC-TRM-017

Todo requisito posee criterio de aceptación.

AC-TRM-018

Todo criterio posee prueba.

AC-TRM-019

Toda prueba posee evidencia.

AC-TRM-020

Todo Command posee schema.

AC-TRM-021

Todo evento posee version.

AC-TRM-022

Todo error posee código único.

AC-TRM-023

Toda referencia es resoluble.

AC-TRM-024

Todo archivo ocupa una posición única.

AC-TRM-025

Todo checksum es verificable.

AC-TRM-026

Todo UNKNOWN posee reconciliación.

AC-TRM-027

Todo contrato respeta tenant.

AC-TRM-028

Todo hallazgo posee owner.

AC-TRM-029

Todo índice está versionado.

AC-TRM-030

Toda consolidación es auditable.

AC-TRM-031

Todo requisito posee ID estable.

AC-TRM-032

Todo requisito posee criterio de aceptación.

AC-TRM-033

Todo criterio posee prueba.

AC-TRM-034

Toda prueba posee evidencia.

AC-TRM-035

Todo Command posee schema.

AC-TRM-036

Todo evento posee version.

AC-TRM-037

Todo error posee código único.

AC-TRM-038

Toda referencia es resoluble.

AC-TRM-039

Todo archivo ocupa una posición única.

AC-TRM-040

Todo checksum es verificable.

AC-TRM-041

Todo UNKNOWN posee reconciliación.

AC-TRM-042

Todo contrato respeta tenant.

AC-TRM-043

Todo hallazgo posee owner.

AC-TRM-044

Todo índice está versionado.

AC-TRM-045

Toda consolidación es auditable.

AC-TRM-046

Todo requisito posee ID estable.

AC-TRM-047

Todo requisito posee criterio de aceptación.

AC-TRM-048

Todo criterio posee prueba.

AC-TRM-049

Toda prueba posee evidencia.

AC-TRM-050

Todo Command posee schema.

AC-TRM-051

Todo evento posee version.

AC-TRM-052

Todo error posee código único.

AC-TRM-053

Toda referencia es resoluble.

AC-TRM-054

Todo archivo ocupa una posición única.

AC-TRM-055

Todo checksum es verificable.

AC-TRM-056

Todo UNKNOWN posee reconciliación.

AC-TRM-057

Todo contrato respeta tenant.

AC-TRM-058

Todo hallazgo posee owner.

AC-TRM-059

Todo índice está versionado.

AC-TRM-060

Toda consolidación es auditable.

AC-TRM-061

Todo requisito posee ID estable.

AC-TRM-062

Todo requisito posee criterio de aceptación.

AC-TRM-063

Todo criterio posee prueba.

AC-TRM-064

Toda prueba posee evidencia.

AC-TRM-065

Todo Command posee schema.

AC-TRM-066

Todo evento posee version.

AC-TRM-067

Todo error posee código único.

AC-TRM-068

Toda referencia es resoluble.

AC-TRM-069

Todo archivo ocupa una posición única.

AC-TRM-070

Todo checksum es verificable.

AC-TRM-071

Todo UNKNOWN posee reconciliación.

AC-TRM-072

Todo contrato respeta tenant.

AC-TRM-073

Todo hallazgo posee owner.

AC-TRM-074

Todo índice está versionado.

AC-TRM-075

Toda consolidación es auditable.

AC-TRM-076

Todo requisito posee ID estable.

AC-TRM-077

Todo requisito posee criterio de aceptación.

AC-TRM-078

Todo criterio posee prueba.

AC-TRM-079

Toda prueba posee evidencia.

AC-TRM-080

Todo Command posee schema.

## 19. Checklist final

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
