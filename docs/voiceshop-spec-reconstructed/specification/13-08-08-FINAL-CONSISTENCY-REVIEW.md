======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-08-08-FINAL-CONSISTENCY-REVIEW.md

# REVISIÓN FINAL DE CONSISTENCIA

## 1. Objetivo

Define el proceso de revisión, clasificación de hallazgos, criterios de cierre y plan de ensamblaje de la versión completa.

## 2. Objetivo de revisión

Detectar contradicciones, duplicados, huecos, términos ambiguos, estados incompatibles, errores reutilizados, referencias rotas y cobertura insuficiente.

## 3. Categorías de hallazgo

CRITICAL: riesgo de seguridad, cross-tenant, duplicidad de efectos o pérdida de datos.

HIGH: inconsistencia funcional o contractual grave.

MEDIUM: ambigüedad implementable de varias formas.

LOW: formato, estilo o documentación incompleta.

## 4. Hallazgo

Cada hallazgo posee Finding ID, severity, title, description, evidence, affected documents, owner, status, resolution y verification.

## 5. Controles

Revisión de nombres.

Revisión de estados.

Revisión de Commands.

Revisión de eventos.

Revisión de errores.

Revisión de UNKNOWN.

Revisión de tenant.

Revisión de idempotencia.

Revisión de approvals.

Revisión de rollback.

## 6. Criterios de cierre

No existen hallazgos CRITICAL abiertos.

Los HIGH abiertos poseen excepción formal.

Las referencias están resueltas.

La trazabilidad crítica está completa.

El manifest y checksums coinciden.

## 7. Plan de ensamblaje

Extraer paquetes vigentes.

Aplicar reemplazos.

Ordenar documentos.

Validar integridad.

Generar índices.

Ejecutar revisión.

Congelar versión.

Crear ZIP completo.

## 8. Reglas normativas

RULE-FCR-001

Todo archivo final debe aparecer una sola vez en el manifiesto.

RULE-FCR-002

Todo archivo debe poseer nombre, Document ID, tamaño, líneas y SHA256.

RULE-FCR-003

Toda parte regenerada debe reemplazar completamente a la versión anterior.

RULE-FCR-004

Todo documento debe conservar su nombre real durante la reconstrucción.

RULE-FCR-005

El orden final debe derivarse del prefijo numérico del documento.

RULE-FCR-006

Toda referencia cruzada debe resolverse antes de congelar la versión.

RULE-FCR-007

Todo checksum debe calcularse sobre bytes UTF-8 exactos.

RULE-FCR-008

Todo ZIP debe validarse mediante lectura completa y test de integridad.

RULE-FCR-009

Toda inconsistencia debe producir un hallazgo con owner y estado.

RULE-FCR-010

Todo hallazgo crítico debe bloquear el cierre.

RULE-FCR-011

Toda excepción aceptada debe incluir reason, owner, riesgo y expiración.

RULE-FCR-012

Todo paquete debe contener como máximo tres documentos.

RULE-FCR-013

Todo documento debe incluir encabezado y FIN DEL DOCUMENTO.

RULE-FCR-014

El Master Index debe permitir navegación sin depender del historial del chat.

RULE-FCR-015

La versión final debe poder reconstruirse de forma determinística.

RULE-FCR-016

Todo archivo final debe aparecer una sola vez en el manifiesto.

RULE-FCR-017

Todo archivo debe poseer nombre, Document ID, tamaño, líneas y SHA256.

RULE-FCR-018

Toda parte regenerada debe reemplazar completamente a la versión anterior.

RULE-FCR-019

Todo documento debe conservar su nombre real durante la reconstrucción.

RULE-FCR-020

El orden final debe derivarse del prefijo numérico del documento.

RULE-FCR-021

Toda referencia cruzada debe resolverse antes de congelar la versión.

RULE-FCR-022

Todo checksum debe calcularse sobre bytes UTF-8 exactos.

RULE-FCR-023

Todo ZIP debe validarse mediante lectura completa y test de integridad.

RULE-FCR-024

Toda inconsistencia debe producir un hallazgo con owner y estado.

RULE-FCR-025

Todo hallazgo crítico debe bloquear el cierre.

RULE-FCR-026

Toda excepción aceptada debe incluir reason, owner, riesgo y expiración.

RULE-FCR-027

Todo paquete debe contener como máximo tres documentos.

RULE-FCR-028

Todo documento debe incluir encabezado y FIN DEL DOCUMENTO.

RULE-FCR-029

El Master Index debe permitir navegación sin depender del historial del chat.

RULE-FCR-030

La versión final debe poder reconstruirse de forma determinística.

RULE-FCR-031

Todo archivo final debe aparecer una sola vez en el manifiesto.

RULE-FCR-032

Todo archivo debe poseer nombre, Document ID, tamaño, líneas y SHA256.

RULE-FCR-033

Toda parte regenerada debe reemplazar completamente a la versión anterior.

RULE-FCR-034

Todo documento debe conservar su nombre real durante la reconstrucción.

RULE-FCR-035

El orden final debe derivarse del prefijo numérico del documento.

RULE-FCR-036

Toda referencia cruzada debe resolverse antes de congelar la versión.

RULE-FCR-037

Todo checksum debe calcularse sobre bytes UTF-8 exactos.

RULE-FCR-038

Todo ZIP debe validarse mediante lectura completa y test de integridad.

RULE-FCR-039

Toda inconsistencia debe producir un hallazgo con owner y estado.

RULE-FCR-040

Todo hallazgo crítico debe bloquear el cierre.

RULE-FCR-041

Toda excepción aceptada debe incluir reason, owner, riesgo y expiración.

RULE-FCR-042

Todo paquete debe contener como máximo tres documentos.

RULE-FCR-043

Todo documento debe incluir encabezado y FIN DEL DOCUMENTO.

RULE-FCR-044

El Master Index debe permitir navegación sin depender del historial del chat.

RULE-FCR-045

La versión final debe poder reconstruirse de forma determinística.

RULE-FCR-046

Todo archivo final debe aparecer una sola vez en el manifiesto.

RULE-FCR-047

Todo archivo debe poseer nombre, Document ID, tamaño, líneas y SHA256.

RULE-FCR-048

Toda parte regenerada debe reemplazar completamente a la versión anterior.

RULE-FCR-049

Todo documento debe conservar su nombre real durante la reconstrucción.

RULE-FCR-050

El orden final debe derivarse del prefijo numérico del documento.

RULE-FCR-051

Toda referencia cruzada debe resolverse antes de congelar la versión.

RULE-FCR-052

Todo checksum debe calcularse sobre bytes UTF-8 exactos.

RULE-FCR-053

Todo ZIP debe validarse mediante lectura completa y test de integridad.

RULE-FCR-054

Toda inconsistencia debe producir un hallazgo con owner y estado.

RULE-FCR-055

Todo hallazgo crítico debe bloquear el cierre.

RULE-FCR-056

Toda excepción aceptada debe incluir reason, owner, riesgo y expiración.

RULE-FCR-057

Todo paquete debe contener como máximo tres documentos.

RULE-FCR-058

Todo documento debe incluir encabezado y FIN DEL DOCUMENTO.

RULE-FCR-059

El Master Index debe permitir navegación sin depender del historial del chat.

RULE-FCR-060

La versión final debe poder reconstruirse de forma determinística.

RULE-FCR-061

Todo archivo final debe aparecer una sola vez en el manifiesto.

RULE-FCR-062

Todo archivo debe poseer nombre, Document ID, tamaño, líneas y SHA256.

RULE-FCR-063

Toda parte regenerada debe reemplazar completamente a la versión anterior.

RULE-FCR-064

Todo documento debe conservar su nombre real durante la reconstrucción.

RULE-FCR-065

El orden final debe derivarse del prefijo numérico del documento.

RULE-FCR-066

Toda referencia cruzada debe resolverse antes de congelar la versión.

RULE-FCR-067

Todo checksum debe calcularse sobre bytes UTF-8 exactos.

RULE-FCR-068

Todo ZIP debe validarse mediante lectura completa y test de integridad.

RULE-FCR-069

Toda inconsistencia debe producir un hallazgo con owner y estado.

RULE-FCR-070

Todo hallazgo crítico debe bloquear el cierre.

RULE-FCR-071

Toda excepción aceptada debe incluir reason, owner, riesgo y expiración.

RULE-FCR-072

Todo paquete debe contener como máximo tres documentos.

RULE-FCR-073

Todo documento debe incluir encabezado y FIN DEL DOCUMENTO.

RULE-FCR-074

El Master Index debe permitir navegación sin depender del historial del chat.

RULE-FCR-075

La versión final debe poder reconstruirse de forma determinística.

RULE-FCR-076

Todo archivo final debe aparecer una sola vez en el manifiesto.

RULE-FCR-077

Todo archivo debe poseer nombre, Document ID, tamaño, líneas y SHA256.

RULE-FCR-078

Toda parte regenerada debe reemplazar completamente a la versión anterior.

RULE-FCR-079

Todo documento debe conservar su nombre real durante la reconstrucción.

RULE-FCR-080

El orden final debe derivarse del prefijo numérico del documento.

## 9. Contrato JSON de referencia

```json
{
  "manifest_version": "1.0",
  "package_id": "VoiceShop-Spec-Part-N",
  "filename": "DOCUMENT.md",
  "document_id": "DOCUMENT-ID",
  "size_bytes": 0,
  "line_count": 0,
  "sha256": "HASH",
  "status": "ACTIVE",
  "replaces": null,
  "replaced_by": null,
  "verification_state": "VERIFIED"
}
```

## 10. Flujo funcional

1. Recolectar todos los paquetes.
2. Identificar regeneraciones y reemplazos.
3. Extraer cada ZIP en un directorio aislado.
4. Validar nombres y cantidad de archivos.
5. Validar UTF-8.
6. Validar encabezado.
7. Validar Document ID.
8. Validar FIN DEL DOCUMENTO.
9. Calcular tamaño.
10. Contar líneas.
11. Calcular SHA256.
12. Detectar duplicados.
13. Detectar huecos de numeración documental.
14. Ordenar archivos.
15. Resolver referencias cruzadas.
16. Ejecutar revisión de consistencia.
17. Generar manifest.
18. Generar Master Index.
19. Generar checksums.
20. Congelar versión final.

## 11. Pseudocódigo

```text
function finalize_documentation(packages):

    resolved_packages = resolve_regenerations(packages)
    extracted_files = []

    for package in resolved_packages:
        validate_zip_integrity(package)
        validate_package_file_count(package, maximum=3)

        files = extract_to_isolated_directory(package)

        for file in files:
            validate_safe_filename(file)
            validate_utf8(file)
            validate_header(file)
            validate_document_id(file)
            validate_end_marker(file)

            metadata = calculate_file_metadata(
                file,
                size_bytes=true,
                line_count=true,
                sha256=true
            )

            extracted_files.append(metadata)

    detect_duplicate_filenames(extracted_files)
    detect_duplicate_document_ids(extracted_files)
    detect_missing_document_ranges(extracted_files)

    ordered = sort_by_document_prefix(extracted_files)

    references = extract_cross_references(ordered)
    validate_cross_references(references, ordered)

    findings = run_consistency_review(
        files=ordered,
        references=references
    )

    if findings.has_critical:
        reject(FINALIZATION_BLOCKED)

    manifest = build_versioned_manifest(ordered)
    master_index = build_master_index(ordered, manifest)
    checksums = build_checksum_file(ordered)

    freeze_final_version(
        master_index,
        manifest,
        checksums,
        findings
    )

    return build_finalization_result(
        master_index,
        manifest,
        checksums,
        findings
    )
```

## 12. Errores funcionales

FCR_PACKAGE_NOT_FOUND

FCR_ZIP_CORRUPTED

FCR_PACKAGE_TOO_MANY_FILES

FCR_UNSAFE_FILENAME

FCR_INVALID_UTF8

FCR_HEADER_MISSING

FCR_DOCUMENT_ID_MISSING

FCR_END_MARKER_MISSING

FCR_FILENAME_DUPLICATE

FCR_DOCUMENT_ID_DUPLICATE

FCR_DOCUMENT_RANGE_GAP

FCR_CHECKSUM_MISMATCH

FCR_REFERENCE_BROKEN

FCR_REGENERATION_CONFLICT

FCR_MANIFEST_CONFLICT

FCR_MASTER_INDEX_CONFLICT

FCR_CONSISTENCY_FINDING_CRITICAL

FCR_EXCEPTION_EXPIRED

FCR_FINALIZATION_BLOCKED

FCR_VERSION_FREEZE_FAILED

FCR_AUDIT_PERSISTENCE_FAILED

## 13. Eventos

FinalizationStarted

PackageValidated

PackageRejected

DocumentMetadataCalculated

DuplicateDetected

GapDetected

ReferenceValidationStarted

ReferenceValidationCompleted

ConsistencyReviewStarted

ConsistencyFindingCreated

ManifestGenerated

MasterIndexGenerated

ChecksumsGenerated

FinalVersionFrozen

FinalizationCompleted

## 14. Casos límite y pruebas adversariales

TEST-FCR-001

Verificar un ZIP contiene cuatro archivos. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-002

Verificar un ZIP está corrupto. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-003

Verificar un documento no es UTF-8. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-004

Verificar un documento carece de FIN DEL DOCUMENTO. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-005

Verificar dos archivos tienen el mismo nombre. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-006

Verificar dos archivos tienen el mismo Document ID. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-007

Verificar una regeneración no declara qué reemplaza. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-008

Verificar el checksum cambia después del manifest. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-009

Verificar un documento apunta a una referencia inexistente. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-010

Verificar un documento aparece en dos paquetes activos. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-011

Verificar un paquete anterior reemplaza por error a uno nuevo. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-012

Verificar la numeración documental tiene huecos. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-013

Verificar el Master Index omite una carpeta. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-014

Verificar el orden lexicográfico coloca mal una subdivisión. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-015

Verificar un hallazgo crítico se intenta cerrar sin corrección. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-016

Verificar una excepción expira durante el cierre. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-017

Verificar un archivo cambia después del version freeze. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-018

Verificar un nombre contiene path traversal. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-019

Verificar un ZIP contiene symlink. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-020

Verificar el manifest usa line count incorrecto. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-021

Verificar un checksum se calcula con normalización distinta. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-022

Verificar un archivo final queda fuera del ZIP completo. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-023

Verificar un paquete usa una versión vieja regenerada. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-024

Verificar dos referencias usan semánticas incompatibles. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FCR-025

Verificar la auditoría de cierre falla. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

## 15. Criterios de aceptación

AC-FCR-001

Todo paquete es verificable.

AC-FCR-002

Todo documento es UTF-8.

AC-FCR-003

Todo documento tiene encabezado.

AC-FCR-004

Todo documento tiene Document ID.

AC-FCR-005

Todo documento tiene FIN DEL DOCUMENTO.

AC-FCR-006

Todo archivo posee SHA256.

AC-FCR-007

Todo archivo aparece una sola vez.

AC-FCR-008

Toda regeneración sustituye a la anterior.

AC-FCR-009

Toda referencia se resuelve.

AC-FCR-010

Todo hallazgo posee estado.

AC-FCR-011

Todo hallazgo crítico bloquea cierre.

AC-FCR-012

Todo índice está versionado.

AC-FCR-013

Todo manifest es reproducible.

AC-FCR-014

Toda versión congelada es inmutable.

AC-FCR-015

Toda finalización es auditable.

AC-FCR-016

Todo paquete es verificable.

AC-FCR-017

Todo documento es UTF-8.

AC-FCR-018

Todo documento tiene encabezado.

AC-FCR-019

Todo documento tiene Document ID.

AC-FCR-020

Todo documento tiene FIN DEL DOCUMENTO.

AC-FCR-021

Todo archivo posee SHA256.

AC-FCR-022

Todo archivo aparece una sola vez.

AC-FCR-023

Toda regeneración sustituye a la anterior.

AC-FCR-024

Toda referencia se resuelve.

AC-FCR-025

Todo hallazgo posee estado.

AC-FCR-026

Todo hallazgo crítico bloquea cierre.

AC-FCR-027

Todo índice está versionado.

AC-FCR-028

Todo manifest es reproducible.

AC-FCR-029

Toda versión congelada es inmutable.

AC-FCR-030

Toda finalización es auditable.

AC-FCR-031

Todo paquete es verificable.

AC-FCR-032

Todo documento es UTF-8.

AC-FCR-033

Todo documento tiene encabezado.

AC-FCR-034

Todo documento tiene Document ID.

AC-FCR-035

Todo documento tiene FIN DEL DOCUMENTO.

AC-FCR-036

Todo archivo posee SHA256.

AC-FCR-037

Todo archivo aparece una sola vez.

AC-FCR-038

Toda regeneración sustituye a la anterior.

AC-FCR-039

Toda referencia se resuelve.

AC-FCR-040

Todo hallazgo posee estado.

AC-FCR-041

Todo hallazgo crítico bloquea cierre.

AC-FCR-042

Todo índice está versionado.

AC-FCR-043

Todo manifest es reproducible.

AC-FCR-044

Toda versión congelada es inmutable.

AC-FCR-045

Toda finalización es auditable.

AC-FCR-046

Todo paquete es verificable.

AC-FCR-047

Todo documento es UTF-8.

AC-FCR-048

Todo documento tiene encabezado.

AC-FCR-049

Todo documento tiene Document ID.

AC-FCR-050

Todo documento tiene FIN DEL DOCUMENTO.

AC-FCR-051

Todo archivo posee SHA256.

AC-FCR-052

Todo archivo aparece una sola vez.

AC-FCR-053

Toda regeneración sustituye a la anterior.

AC-FCR-054

Toda referencia se resuelve.

AC-FCR-055

Todo hallazgo posee estado.

AC-FCR-056

Todo hallazgo crítico bloquea cierre.

AC-FCR-057

Todo índice está versionado.

AC-FCR-058

Todo manifest es reproducible.

AC-FCR-059

Toda versión congelada es inmutable.

AC-FCR-060

Toda finalización es auditable.

AC-FCR-061

Todo paquete es verificable.

AC-FCR-062

Todo documento es UTF-8.

AC-FCR-063

Todo documento tiene encabezado.

AC-FCR-064

Todo documento tiene Document ID.

AC-FCR-065

Todo documento tiene FIN DEL DOCUMENTO.

AC-FCR-066

Todo archivo posee SHA256.

AC-FCR-067

Todo archivo aparece una sola vez.

AC-FCR-068

Toda regeneración sustituye a la anterior.

AC-FCR-069

Toda referencia se resuelve.

AC-FCR-070

Todo hallazgo posee estado.

AC-FCR-071

Todo hallazgo crítico bloquea cierre.

AC-FCR-072

Todo índice está versionado.

AC-FCR-073

Todo manifest es reproducible.

AC-FCR-074

Toda versión congelada es inmutable.

AC-FCR-075

Toda finalización es auditable.

AC-FCR-076

Todo paquete es verificable.

AC-FCR-077

Todo documento es UTF-8.

AC-FCR-078

Todo documento tiene encabezado.

AC-FCR-079

Todo documento tiene Document ID.

AC-FCR-080

Todo documento tiene FIN DEL DOCUMENTO.

## 16. Checklist final

[ ] Se validaron todos los ZIP.
[ ] Se resolvieron regeneraciones.
[ ] Se validaron nombres.
[ ] Se validó UTF-8.
[ ] Se validaron encabezados.
[ ] Se validaron Document IDs.
[ ] Se validaron marcadores finales.
[ ] Se calcularon tamaños.
[ ] Se contaron líneas.
[ ] Se calcularon SHA256.
[ ] Se detectaron duplicados.
[ ] Se detectaron huecos.
[ ] Se validaron referencias.
[ ] Se ejecutó revisión de consistencia.
[ ] Se resolvieron hallazgos críticos.
[ ] Se generó manifest.
[ ] Se generó Master Index.
[ ] Se generaron checksums.
[ ] Se congeló versión.
[ ] Se conservó auditoría.

======================================================================
FIN DEL DOCUMENTO
======================================================================
