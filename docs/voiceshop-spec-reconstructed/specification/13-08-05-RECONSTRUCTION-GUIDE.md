======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-08-05-RECONSTRUCTION-GUIDE.md

# GUÍA DE RECONSTRUCCIÓN DEL PROYECTO

## 1. Objetivo

Define cómo extraer, validar, ordenar, sustituir regeneraciones y reconstruir la especificación completa desde los paquetes ZIP.

## 2. Objetivo de reconstrucción

La reconstrucción debe producir un árbol de documentación idéntico, ordenado y verificable a partir de los ZIP entregados.

No se debe depender del orden visual del chat.

## 3. Convención de carpetas

Cada documento conserva su nombre real.

Los prefijos 13-XX-YY determinan módulo y orden.

Los ZIP son contenedores de entrega, no carpetas finales obligatorias.

## 4. Orden general

Primero documentos base y core.

Luego dominio, voz, LLM e integraciones.

Después admin y operación.

Finalmente ADR, glosario, trazabilidad y Master Index.

## 5. Extracción

Cada ZIP se extrae en una carpeta temporal.

Se valida que contenga entre uno y tres archivos esperados.

Se rechazan rutas absolutas, traversal, symlinks y nombres inesperados.

## 6. Validación

Cada archivo debe ser UTF-8, contener encabezado, Documento ID y FIN DEL DOCUMENTO.

Se calcula SHA256 y se compara con el manifest cuando exista.

## 7. Ordenamiento

Los documentos se ordenan lexicográficamente por prefijo numérico.

Las subdivisiones A/B/C se colocan inmediatamente después de su número base.

## 8. Duplicados

Si dos paquetes contienen el mismo nombre, se comparan checksums.

Si difieren, se conserva únicamente la versión marcada como regenerada o más reciente en el manifest final.

## 9. Regeneraciones

Las partes regeneradas sustituyen completamente a la versión anterior.

No se mezclan archivos internos de versiones distintas del mismo ZIP.

## 10. Manifest

El manifest final debe listar package, filename, document ID, size, line count, SHA256, status y replacement information.

## 11. Verificación final

Se valida ausencia de huecos, duplicados, referencias rotas y documentos sin FIN DEL DOCUMENTO.

Se ejecuta revisión de consistencia y trazabilidad.

## 12. Empaquetado final

El árbol reconstruido puede comprimirse como VoiceShop-Spec-Complete.zip.

El ZIP final debe incluir Master Index, manifest, checksums y guía de instalación documental.

## 13. Uso por una LLM

La LLM debe leer primero Master Index, Glosario, ADR Index y Operating Contract.

Después carga únicamente módulos relevantes para evitar contexto excesivo.

## 14. Reglas normativas

RULE-RCG-001

Todo requisito debe poseer identificador estable.

RULE-RCG-002

Todo requisito debe vincular al menos un criterio de aceptación.

RULE-RCG-003

Todo criterio de aceptación debe vincular al menos una prueba.

RULE-RCG-004

Toda prueba debe producir evidencia reproducible.

RULE-RCG-005

Todo Command debe tener owner, autorización, schema y resultado definido.

RULE-RCG-006

Todo evento debe indicar aggregate, versión, causation y correlation.

RULE-RCG-007

Todo error debe tener código estable, categoría y mensaje seguro.

RULE-RCG-008

Toda referencia cruzada debe apuntar a un identificador existente.

RULE-RCG-009

Todo documento debe ocupar una posición inequívoca en el árbol maestro.

RULE-RCG-010

Los archivos deben reconstruirse sin renombrados implícitos.

RULE-RCG-011

Toda duplicidad semántica debe detectarse antes del cierre.

RULE-RCG-012

Toda inconsistencia entre documentos debe producir un hallazgo.

RULE-RCG-013

Los tenants deben permanecer aislados en contratos y ejemplos.

RULE-RCG-014

Todo resultado UNKNOWN debe estar representado en trazabilidad y pruebas.

RULE-RCG-015

Toda modificación de índices o catálogos debe conservar historial.

RULE-RCG-016

Todo requisito debe poseer identificador estable.

RULE-RCG-017

Todo requisito debe vincular al menos un criterio de aceptación.

RULE-RCG-018

Todo criterio de aceptación debe vincular al menos una prueba.

RULE-RCG-019

Toda prueba debe producir evidencia reproducible.

RULE-RCG-020

Todo Command debe tener owner, autorización, schema y resultado definido.

RULE-RCG-021

Todo evento debe indicar aggregate, versión, causation y correlation.

RULE-RCG-022

Todo error debe tener código estable, categoría y mensaje seguro.

RULE-RCG-023

Toda referencia cruzada debe apuntar a un identificador existente.

RULE-RCG-024

Todo documento debe ocupar una posición inequívoca en el árbol maestro.

RULE-RCG-025

Los archivos deben reconstruirse sin renombrados implícitos.

RULE-RCG-026

Toda duplicidad semántica debe detectarse antes del cierre.

RULE-RCG-027

Toda inconsistencia entre documentos debe producir un hallazgo.

RULE-RCG-028

Los tenants deben permanecer aislados en contratos y ejemplos.

RULE-RCG-029

Todo resultado UNKNOWN debe estar representado en trazabilidad y pruebas.

RULE-RCG-030

Toda modificación de índices o catálogos debe conservar historial.

RULE-RCG-031

Todo requisito debe poseer identificador estable.

RULE-RCG-032

Todo requisito debe vincular al menos un criterio de aceptación.

RULE-RCG-033

Todo criterio de aceptación debe vincular al menos una prueba.

RULE-RCG-034

Toda prueba debe producir evidencia reproducible.

RULE-RCG-035

Todo Command debe tener owner, autorización, schema y resultado definido.

RULE-RCG-036

Todo evento debe indicar aggregate, versión, causation y correlation.

RULE-RCG-037

Todo error debe tener código estable, categoría y mensaje seguro.

RULE-RCG-038

Toda referencia cruzada debe apuntar a un identificador existente.

RULE-RCG-039

Todo documento debe ocupar una posición inequívoca en el árbol maestro.

RULE-RCG-040

Los archivos deben reconstruirse sin renombrados implícitos.

RULE-RCG-041

Toda duplicidad semántica debe detectarse antes del cierre.

RULE-RCG-042

Toda inconsistencia entre documentos debe producir un hallazgo.

RULE-RCG-043

Los tenants deben permanecer aislados en contratos y ejemplos.

RULE-RCG-044

Todo resultado UNKNOWN debe estar representado en trazabilidad y pruebas.

RULE-RCG-045

Toda modificación de índices o catálogos debe conservar historial.

RULE-RCG-046

Todo requisito debe poseer identificador estable.

RULE-RCG-047

Todo requisito debe vincular al menos un criterio de aceptación.

RULE-RCG-048

Todo criterio de aceptación debe vincular al menos una prueba.

RULE-RCG-049

Toda prueba debe producir evidencia reproducible.

RULE-RCG-050

Todo Command debe tener owner, autorización, schema y resultado definido.

RULE-RCG-051

Todo evento debe indicar aggregate, versión, causation y correlation.

RULE-RCG-052

Todo error debe tener código estable, categoría y mensaje seguro.

RULE-RCG-053

Toda referencia cruzada debe apuntar a un identificador existente.

RULE-RCG-054

Todo documento debe ocupar una posición inequívoca en el árbol maestro.

RULE-RCG-055

Los archivos deben reconstruirse sin renombrados implícitos.

RULE-RCG-056

Toda duplicidad semántica debe detectarse antes del cierre.

RULE-RCG-057

Toda inconsistencia entre documentos debe producir un hallazgo.

RULE-RCG-058

Los tenants deben permanecer aislados en contratos y ejemplos.

RULE-RCG-059

Todo resultado UNKNOWN debe estar representado en trazabilidad y pruebas.

RULE-RCG-060

Toda modificación de índices o catálogos debe conservar historial.

RULE-RCG-061

Todo requisito debe poseer identificador estable.

RULE-RCG-062

Todo requisito debe vincular al menos un criterio de aceptación.

RULE-RCG-063

Todo criterio de aceptación debe vincular al menos una prueba.

RULE-RCG-064

Toda prueba debe producir evidencia reproducible.

RULE-RCG-065

Todo Command debe tener owner, autorización, schema y resultado definido.

RULE-RCG-066

Todo evento debe indicar aggregate, versión, causation y correlation.

RULE-RCG-067

Todo error debe tener código estable, categoría y mensaje seguro.

RULE-RCG-068

Toda referencia cruzada debe apuntar a un identificador existente.

RULE-RCG-069

Todo documento debe ocupar una posición inequívoca en el árbol maestro.

RULE-RCG-070

Los archivos deben reconstruirse sin renombrados implícitos.

RULE-RCG-071

Toda duplicidad semántica debe detectarse antes del cierre.

RULE-RCG-072

Toda inconsistencia entre documentos debe producir un hallazgo.

RULE-RCG-073

Los tenants deben permanecer aislados en contratos y ejemplos.

RULE-RCG-074

Todo resultado UNKNOWN debe estar representado en trazabilidad y pruebas.

RULE-RCG-075

Toda modificación de índices o catálogos debe conservar historial.

RULE-RCG-076

Todo requisito debe poseer identificador estable.

RULE-RCG-077

Todo requisito debe vincular al menos un criterio de aceptación.

RULE-RCG-078

Todo criterio de aceptación debe vincular al menos una prueba.

RULE-RCG-079

Toda prueba debe producir evidencia reproducible.

RULE-RCG-080

Todo Command debe tener owner, autorización, schema y resultado definido.

## 15. Contrato JSON de referencia

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

## 16. Flujo funcional

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

## 17. Pseudocódigo

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

## 18. Errores funcionales

RCG_RECORD_INVALID

RCG_IDENTIFIER_DUPLICATE

RCG_SEMANTIC_DUPLICATE

RCG_REFERENCE_BROKEN

RCG_REQUIREMENT_UNTRACED

RCG_AC_UNTRACED

RCG_TEST_WITHOUT_EVIDENCE

RCG_COMMAND_DUPLICATE

RCG_COMMAND_SCHEMA_MISSING

RCG_EVENT_DUPLICATE

RCG_EVENT_VERSION_MISSING

RCG_ERROR_CODE_DUPLICATE

RCG_ERROR_MESSAGE_UNSAFE

RCG_UNKNOWN_COVERAGE_MISSING

RCG_RECONCILIATION_COVERAGE_MISSING

RCG_TENANT_SCOPE_MISSING

RCG_FILE_ORDER_INVALID

RCG_FILE_MISSING

RCG_CHECKSUM_MISMATCH

RCG_MANIFEST_VERSION_CONFLICT

RCG_CONSISTENCY_REVIEW_FAILED

## 19. Eventos

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

## 20. Casos límite y pruebas adversariales

TEST-RCG-001

Verificar un requisito no posee criterio de aceptación. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-002

Verificar un criterio no posee prueba. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-003

Verificar una prueba no produce evidencia. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-004

Verificar dos comandos comparten nombre pero no semántica. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-005

Verificar dos eventos comparten nombre con payload incompatible. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-006

Verificar dos errores comparten código. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-007

Verificar una referencia apunta a un documento ausente. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-008

Verificar un archivo cambia de nombre sin actualizar el índice. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-009

Verificar un checksum no coincide. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-010

Verificar un documento se reconstruye fuera de orden. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-011

Verificar una operación UNKNOWN no posee reconciliación. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-012

Verificar un ejemplo omite tenant. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-013

Verificar un evento carece de version. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-014

Verificar un Command carece de idempotency. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-015

Verificar un error revela un secreto. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-016

Verificar un archivo ZIP contiene un documento extra. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-017

Verificar un documento aparece en dos paquetes. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-018

Verificar un paquete omite un documento esperado. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-019

Verificar el Master Index apunta a una parte antigua. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-020

Verificar una excepción no tiene owner. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-021

Verificar un hallazgo se cierra sin evidencia. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-022

Verificar un término de glosario se usa con otro significado. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-023

Verificar un ADR no está vinculado a requisitos. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-024

Verificar un test usa un ID inexistente. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

TEST-RCG-025

Verificar un archivo está corrupto. La consolidación debe detectar el problema, impedir cierre silencioso y producir evidencia.

## 21. Criterios de aceptación

AC-RCG-001

Todo requisito posee ID estable.

AC-RCG-002

Todo requisito posee criterio de aceptación.

AC-RCG-003

Todo criterio posee prueba.

AC-RCG-004

Toda prueba posee evidencia.

AC-RCG-005

Todo Command posee schema.

AC-RCG-006

Todo evento posee version.

AC-RCG-007

Todo error posee código único.

AC-RCG-008

Toda referencia es resoluble.

AC-RCG-009

Todo archivo ocupa una posición única.

AC-RCG-010

Todo checksum es verificable.

AC-RCG-011

Todo UNKNOWN posee reconciliación.

AC-RCG-012

Todo contrato respeta tenant.

AC-RCG-013

Todo hallazgo posee owner.

AC-RCG-014

Todo índice está versionado.

AC-RCG-015

Toda consolidación es auditable.

AC-RCG-016

Todo requisito posee ID estable.

AC-RCG-017

Todo requisito posee criterio de aceptación.

AC-RCG-018

Todo criterio posee prueba.

AC-RCG-019

Toda prueba posee evidencia.

AC-RCG-020

Todo Command posee schema.

AC-RCG-021

Todo evento posee version.

AC-RCG-022

Todo error posee código único.

AC-RCG-023

Toda referencia es resoluble.

AC-RCG-024

Todo archivo ocupa una posición única.

AC-RCG-025

Todo checksum es verificable.

AC-RCG-026

Todo UNKNOWN posee reconciliación.

AC-RCG-027

Todo contrato respeta tenant.

AC-RCG-028

Todo hallazgo posee owner.

AC-RCG-029

Todo índice está versionado.

AC-RCG-030

Toda consolidación es auditable.

AC-RCG-031

Todo requisito posee ID estable.

AC-RCG-032

Todo requisito posee criterio de aceptación.

AC-RCG-033

Todo criterio posee prueba.

AC-RCG-034

Toda prueba posee evidencia.

AC-RCG-035

Todo Command posee schema.

AC-RCG-036

Todo evento posee version.

AC-RCG-037

Todo error posee código único.

AC-RCG-038

Toda referencia es resoluble.

AC-RCG-039

Todo archivo ocupa una posición única.

AC-RCG-040

Todo checksum es verificable.

AC-RCG-041

Todo UNKNOWN posee reconciliación.

AC-RCG-042

Todo contrato respeta tenant.

AC-RCG-043

Todo hallazgo posee owner.

AC-RCG-044

Todo índice está versionado.

AC-RCG-045

Toda consolidación es auditable.

AC-RCG-046

Todo requisito posee ID estable.

AC-RCG-047

Todo requisito posee criterio de aceptación.

AC-RCG-048

Todo criterio posee prueba.

AC-RCG-049

Toda prueba posee evidencia.

AC-RCG-050

Todo Command posee schema.

AC-RCG-051

Todo evento posee version.

AC-RCG-052

Todo error posee código único.

AC-RCG-053

Toda referencia es resoluble.

AC-RCG-054

Todo archivo ocupa una posición única.

AC-RCG-055

Todo checksum es verificable.

AC-RCG-056

Todo UNKNOWN posee reconciliación.

AC-RCG-057

Todo contrato respeta tenant.

AC-RCG-058

Todo hallazgo posee owner.

AC-RCG-059

Todo índice está versionado.

AC-RCG-060

Toda consolidación es auditable.

AC-RCG-061

Todo requisito posee ID estable.

AC-RCG-062

Todo requisito posee criterio de aceptación.

AC-RCG-063

Todo criterio posee prueba.

AC-RCG-064

Toda prueba posee evidencia.

AC-RCG-065

Todo Command posee schema.

AC-RCG-066

Todo evento posee version.

AC-RCG-067

Todo error posee código único.

AC-RCG-068

Toda referencia es resoluble.

AC-RCG-069

Todo archivo ocupa una posición única.

AC-RCG-070

Todo checksum es verificable.

AC-RCG-071

Todo UNKNOWN posee reconciliación.

AC-RCG-072

Todo contrato respeta tenant.

AC-RCG-073

Todo hallazgo posee owner.

AC-RCG-074

Todo índice está versionado.

AC-RCG-075

Toda consolidación es auditable.

AC-RCG-076

Todo requisito posee ID estable.

AC-RCG-077

Todo requisito posee criterio de aceptación.

AC-RCG-078

Todo criterio posee prueba.

AC-RCG-079

Toda prueba posee evidencia.

AC-RCG-080

Todo Command posee schema.

## 22. Checklist final

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
