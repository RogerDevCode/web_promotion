======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-08-07-FILE-MANIFEST-CHECKSUMS.md

# MANIFIESTO DE ARCHIVOS Y CHECKSUMS

## 1. Objetivo

Define el inventario normativo de archivos, metadatos, estados, regeneraciones y verificación criptográfica de la especificación.

## 2. Campos del manifest

Package ID.

Filename.

Document ID.

Module.

Order.

Size bytes.

Line count.

SHA256.

Status.

Replacement information.

## 3. Estados

ACTIVE: archivo vigente.

REPLACED: sustituido por regeneración.

DEPRECATED: conservado sólo como referencia.

MISSING: esperado pero no disponible.

INVALID: falló verificación.

## 4. Regeneraciones

Part-09 regenerada sustituye a su versión anterior.

Part-11 regenerada sustituye a su versión anterior.

Cualquier futura regeneración debe seguir el mismo principio.

## 5. Checksums

SHA256 se calcula sobre bytes exactos del archivo.

El ZIP también posee checksum independiente.

La verificación debe realizarse antes y después de transferencia.

## 6. Reproducibilidad

El manifest debe poder regenerarse desde los archivos.

Las diferencias deben considerarse hallazgos.

## 7. Formato

El formato recomendado es JSON para automatización y Markdown para revisión humana.

Ambas representaciones deben derivarse del mismo SSOT.

## 8. Reglas normativas

RULE-FMAN-001

Todo archivo final debe aparecer una sola vez en el manifiesto.

RULE-FMAN-002

Todo archivo debe poseer nombre, Document ID, tamaño, líneas y SHA256.

RULE-FMAN-003

Toda parte regenerada debe reemplazar completamente a la versión anterior.

RULE-FMAN-004

Todo documento debe conservar su nombre real durante la reconstrucción.

RULE-FMAN-005

El orden final debe derivarse del prefijo numérico del documento.

RULE-FMAN-006

Toda referencia cruzada debe resolverse antes de congelar la versión.

RULE-FMAN-007

Todo checksum debe calcularse sobre bytes UTF-8 exactos.

RULE-FMAN-008

Todo ZIP debe validarse mediante lectura completa y test de integridad.

RULE-FMAN-009

Toda inconsistencia debe producir un hallazgo con owner y estado.

RULE-FMAN-010

Todo hallazgo crítico debe bloquear el cierre.

RULE-FMAN-011

Toda excepción aceptada debe incluir reason, owner, riesgo y expiración.

RULE-FMAN-012

Todo paquete debe contener como máximo tres documentos.

RULE-FMAN-013

Todo documento debe incluir encabezado y FIN DEL DOCUMENTO.

RULE-FMAN-014

El Master Index debe permitir navegación sin depender del historial del chat.

RULE-FMAN-015

La versión final debe poder reconstruirse de forma determinística.

RULE-FMAN-016

Todo archivo final debe aparecer una sola vez en el manifiesto.

RULE-FMAN-017

Todo archivo debe poseer nombre, Document ID, tamaño, líneas y SHA256.

RULE-FMAN-018

Toda parte regenerada debe reemplazar completamente a la versión anterior.

RULE-FMAN-019

Todo documento debe conservar su nombre real durante la reconstrucción.

RULE-FMAN-020

El orden final debe derivarse del prefijo numérico del documento.

RULE-FMAN-021

Toda referencia cruzada debe resolverse antes de congelar la versión.

RULE-FMAN-022

Todo checksum debe calcularse sobre bytes UTF-8 exactos.

RULE-FMAN-023

Todo ZIP debe validarse mediante lectura completa y test de integridad.

RULE-FMAN-024

Toda inconsistencia debe producir un hallazgo con owner y estado.

RULE-FMAN-025

Todo hallazgo crítico debe bloquear el cierre.

RULE-FMAN-026

Toda excepción aceptada debe incluir reason, owner, riesgo y expiración.

RULE-FMAN-027

Todo paquete debe contener como máximo tres documentos.

RULE-FMAN-028

Todo documento debe incluir encabezado y FIN DEL DOCUMENTO.

RULE-FMAN-029

El Master Index debe permitir navegación sin depender del historial del chat.

RULE-FMAN-030

La versión final debe poder reconstruirse de forma determinística.

RULE-FMAN-031

Todo archivo final debe aparecer una sola vez en el manifiesto.

RULE-FMAN-032

Todo archivo debe poseer nombre, Document ID, tamaño, líneas y SHA256.

RULE-FMAN-033

Toda parte regenerada debe reemplazar completamente a la versión anterior.

RULE-FMAN-034

Todo documento debe conservar su nombre real durante la reconstrucción.

RULE-FMAN-035

El orden final debe derivarse del prefijo numérico del documento.

RULE-FMAN-036

Toda referencia cruzada debe resolverse antes de congelar la versión.

RULE-FMAN-037

Todo checksum debe calcularse sobre bytes UTF-8 exactos.

RULE-FMAN-038

Todo ZIP debe validarse mediante lectura completa y test de integridad.

RULE-FMAN-039

Toda inconsistencia debe producir un hallazgo con owner y estado.

RULE-FMAN-040

Todo hallazgo crítico debe bloquear el cierre.

RULE-FMAN-041

Toda excepción aceptada debe incluir reason, owner, riesgo y expiración.

RULE-FMAN-042

Todo paquete debe contener como máximo tres documentos.

RULE-FMAN-043

Todo documento debe incluir encabezado y FIN DEL DOCUMENTO.

RULE-FMAN-044

El Master Index debe permitir navegación sin depender del historial del chat.

RULE-FMAN-045

La versión final debe poder reconstruirse de forma determinística.

RULE-FMAN-046

Todo archivo final debe aparecer una sola vez en el manifiesto.

RULE-FMAN-047

Todo archivo debe poseer nombre, Document ID, tamaño, líneas y SHA256.

RULE-FMAN-048

Toda parte regenerada debe reemplazar completamente a la versión anterior.

RULE-FMAN-049

Todo documento debe conservar su nombre real durante la reconstrucción.

RULE-FMAN-050

El orden final debe derivarse del prefijo numérico del documento.

RULE-FMAN-051

Toda referencia cruzada debe resolverse antes de congelar la versión.

RULE-FMAN-052

Todo checksum debe calcularse sobre bytes UTF-8 exactos.

RULE-FMAN-053

Todo ZIP debe validarse mediante lectura completa y test de integridad.

RULE-FMAN-054

Toda inconsistencia debe producir un hallazgo con owner y estado.

RULE-FMAN-055

Todo hallazgo crítico debe bloquear el cierre.

RULE-FMAN-056

Toda excepción aceptada debe incluir reason, owner, riesgo y expiración.

RULE-FMAN-057

Todo paquete debe contener como máximo tres documentos.

RULE-FMAN-058

Todo documento debe incluir encabezado y FIN DEL DOCUMENTO.

RULE-FMAN-059

El Master Index debe permitir navegación sin depender del historial del chat.

RULE-FMAN-060

La versión final debe poder reconstruirse de forma determinística.

RULE-FMAN-061

Todo archivo final debe aparecer una sola vez en el manifiesto.

RULE-FMAN-062

Todo archivo debe poseer nombre, Document ID, tamaño, líneas y SHA256.

RULE-FMAN-063

Toda parte regenerada debe reemplazar completamente a la versión anterior.

RULE-FMAN-064

Todo documento debe conservar su nombre real durante la reconstrucción.

RULE-FMAN-065

El orden final debe derivarse del prefijo numérico del documento.

RULE-FMAN-066

Toda referencia cruzada debe resolverse antes de congelar la versión.

RULE-FMAN-067

Todo checksum debe calcularse sobre bytes UTF-8 exactos.

RULE-FMAN-068

Todo ZIP debe validarse mediante lectura completa y test de integridad.

RULE-FMAN-069

Toda inconsistencia debe producir un hallazgo con owner y estado.

RULE-FMAN-070

Todo hallazgo crítico debe bloquear el cierre.

RULE-FMAN-071

Toda excepción aceptada debe incluir reason, owner, riesgo y expiración.

RULE-FMAN-072

Todo paquete debe contener como máximo tres documentos.

RULE-FMAN-073

Todo documento debe incluir encabezado y FIN DEL DOCUMENTO.

RULE-FMAN-074

El Master Index debe permitir navegación sin depender del historial del chat.

RULE-FMAN-075

La versión final debe poder reconstruirse de forma determinística.

RULE-FMAN-076

Todo archivo final debe aparecer una sola vez en el manifiesto.

RULE-FMAN-077

Todo archivo debe poseer nombre, Document ID, tamaño, líneas y SHA256.

RULE-FMAN-078

Toda parte regenerada debe reemplazar completamente a la versión anterior.

RULE-FMAN-079

Todo documento debe conservar su nombre real durante la reconstrucción.

RULE-FMAN-080

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

FMAN_PACKAGE_NOT_FOUND

FMAN_ZIP_CORRUPTED

FMAN_PACKAGE_TOO_MANY_FILES

FMAN_UNSAFE_FILENAME

FMAN_INVALID_UTF8

FMAN_HEADER_MISSING

FMAN_DOCUMENT_ID_MISSING

FMAN_END_MARKER_MISSING

FMAN_FILENAME_DUPLICATE

FMAN_DOCUMENT_ID_DUPLICATE

FMAN_DOCUMENT_RANGE_GAP

FMAN_CHECKSUM_MISMATCH

FMAN_REFERENCE_BROKEN

FMAN_REGENERATION_CONFLICT

FMAN_MANIFEST_CONFLICT

FMAN_MASTER_INDEX_CONFLICT

FMAN_CONSISTENCY_FINDING_CRITICAL

FMAN_EXCEPTION_EXPIRED

FMAN_FINALIZATION_BLOCKED

FMAN_VERSION_FREEZE_FAILED

FMAN_AUDIT_PERSISTENCE_FAILED

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

TEST-FMAN-001

Verificar un ZIP contiene cuatro archivos. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-002

Verificar un ZIP está corrupto. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-003

Verificar un documento no es UTF-8. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-004

Verificar un documento carece de FIN DEL DOCUMENTO. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-005

Verificar dos archivos tienen el mismo nombre. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-006

Verificar dos archivos tienen el mismo Document ID. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-007

Verificar una regeneración no declara qué reemplaza. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-008

Verificar el checksum cambia después del manifest. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-009

Verificar un documento apunta a una referencia inexistente. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-010

Verificar un documento aparece en dos paquetes activos. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-011

Verificar un paquete anterior reemplaza por error a uno nuevo. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-012

Verificar la numeración documental tiene huecos. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-013

Verificar el Master Index omite una carpeta. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-014

Verificar el orden lexicográfico coloca mal una subdivisión. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-015

Verificar un hallazgo crítico se intenta cerrar sin corrección. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-016

Verificar una excepción expira durante el cierre. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-017

Verificar un archivo cambia después del version freeze. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-018

Verificar un nombre contiene path traversal. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-019

Verificar un ZIP contiene symlink. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-020

Verificar el manifest usa line count incorrecto. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-021

Verificar un checksum se calcula con normalización distinta. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-022

Verificar un archivo final queda fuera del ZIP completo. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-023

Verificar un paquete usa una versión vieja regenerada. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-024

Verificar dos referencias usan semánticas incompatibles. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

TEST-FMAN-025

Verificar la auditoría de cierre falla. El cierre debe detectar el problema, bloquear resultados falsos y conservar evidencia.

## 15. Criterios de aceptación

AC-FMAN-001

Todo paquete es verificable.

AC-FMAN-002

Todo documento es UTF-8.

AC-FMAN-003

Todo documento tiene encabezado.

AC-FMAN-004

Todo documento tiene Document ID.

AC-FMAN-005

Todo documento tiene FIN DEL DOCUMENTO.

AC-FMAN-006

Todo archivo posee SHA256.

AC-FMAN-007

Todo archivo aparece una sola vez.

AC-FMAN-008

Toda regeneración sustituye a la anterior.

AC-FMAN-009

Toda referencia se resuelve.

AC-FMAN-010

Todo hallazgo posee estado.

AC-FMAN-011

Todo hallazgo crítico bloquea cierre.

AC-FMAN-012

Todo índice está versionado.

AC-FMAN-013

Todo manifest es reproducible.

AC-FMAN-014

Toda versión congelada es inmutable.

AC-FMAN-015

Toda finalización es auditable.

AC-FMAN-016

Todo paquete es verificable.

AC-FMAN-017

Todo documento es UTF-8.

AC-FMAN-018

Todo documento tiene encabezado.

AC-FMAN-019

Todo documento tiene Document ID.

AC-FMAN-020

Todo documento tiene FIN DEL DOCUMENTO.

AC-FMAN-021

Todo archivo posee SHA256.

AC-FMAN-022

Todo archivo aparece una sola vez.

AC-FMAN-023

Toda regeneración sustituye a la anterior.

AC-FMAN-024

Toda referencia se resuelve.

AC-FMAN-025

Todo hallazgo posee estado.

AC-FMAN-026

Todo hallazgo crítico bloquea cierre.

AC-FMAN-027

Todo índice está versionado.

AC-FMAN-028

Todo manifest es reproducible.

AC-FMAN-029

Toda versión congelada es inmutable.

AC-FMAN-030

Toda finalización es auditable.

AC-FMAN-031

Todo paquete es verificable.

AC-FMAN-032

Todo documento es UTF-8.

AC-FMAN-033

Todo documento tiene encabezado.

AC-FMAN-034

Todo documento tiene Document ID.

AC-FMAN-035

Todo documento tiene FIN DEL DOCUMENTO.

AC-FMAN-036

Todo archivo posee SHA256.

AC-FMAN-037

Todo archivo aparece una sola vez.

AC-FMAN-038

Toda regeneración sustituye a la anterior.

AC-FMAN-039

Toda referencia se resuelve.

AC-FMAN-040

Todo hallazgo posee estado.

AC-FMAN-041

Todo hallazgo crítico bloquea cierre.

AC-FMAN-042

Todo índice está versionado.

AC-FMAN-043

Todo manifest es reproducible.

AC-FMAN-044

Toda versión congelada es inmutable.

AC-FMAN-045

Toda finalización es auditable.

AC-FMAN-046

Todo paquete es verificable.

AC-FMAN-047

Todo documento es UTF-8.

AC-FMAN-048

Todo documento tiene encabezado.

AC-FMAN-049

Todo documento tiene Document ID.

AC-FMAN-050

Todo documento tiene FIN DEL DOCUMENTO.

AC-FMAN-051

Todo archivo posee SHA256.

AC-FMAN-052

Todo archivo aparece una sola vez.

AC-FMAN-053

Toda regeneración sustituye a la anterior.

AC-FMAN-054

Toda referencia se resuelve.

AC-FMAN-055

Todo hallazgo posee estado.

AC-FMAN-056

Todo hallazgo crítico bloquea cierre.

AC-FMAN-057

Todo índice está versionado.

AC-FMAN-058

Todo manifest es reproducible.

AC-FMAN-059

Toda versión congelada es inmutable.

AC-FMAN-060

Toda finalización es auditable.

AC-FMAN-061

Todo paquete es verificable.

AC-FMAN-062

Todo documento es UTF-8.

AC-FMAN-063

Todo documento tiene encabezado.

AC-FMAN-064

Todo documento tiene Document ID.

AC-FMAN-065

Todo documento tiene FIN DEL DOCUMENTO.

AC-FMAN-066

Todo archivo posee SHA256.

AC-FMAN-067

Todo archivo aparece una sola vez.

AC-FMAN-068

Toda regeneración sustituye a la anterior.

AC-FMAN-069

Toda referencia se resuelve.

AC-FMAN-070

Todo hallazgo posee estado.

AC-FMAN-071

Todo hallazgo crítico bloquea cierre.

AC-FMAN-072

Todo índice está versionado.

AC-FMAN-073

Todo manifest es reproducible.

AC-FMAN-074

Toda versión congelada es inmutable.

AC-FMAN-075

Toda finalización es auditable.

AC-FMAN-076

Todo paquete es verificable.

AC-FMAN-077

Todo documento es UTF-8.

AC-FMAN-078

Todo documento tiene encabezado.

AC-FMAN-079

Todo documento tiene Document ID.

AC-FMAN-080

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
