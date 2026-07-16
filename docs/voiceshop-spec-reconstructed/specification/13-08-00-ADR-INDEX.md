======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-08-00-ADR-INDEX.md

# ÍNDICE DE DECISIONES ARQUITECTÓNICAS

## 1. Objetivo

Define el gobierno, formato, estados, numeración y trazabilidad de las decisiones arquitectónicas de VoiceShop.

## 2. Alcance

Este documento gobierna el formato, numeración, estados, ownership, revisión, aprobación, supersession y mantenimiento de ADR y RFC.

No sustituye las decisiones individuales; define cómo deben escribirse, revisarse y conservarse.

## 3. Estados ADR

PROPOSED: decisión en elaboración.

UNDER_REVIEW: decisión sometida a revisión.

ACCEPTED: decisión vigente.

REJECTED: alternativa no adoptada.

DEPRECATED: decisión aún histórica pero no recomendada.

SUPERSEDED: decisión reemplazada por otra.

## 4. Estructura obligatoria

Cada ADR debe incluir título, contexto, problema, restricciones, alternativas, decisión, consecuencias, riesgos, seguridad, tenant isolation, observabilidad, operación, rollback y pruebas.

Los campos obligatorios no pueden omitirse por considerarse obvios.

## 5. Numeración

Los identificadores usan ADR-0001, ADR-0002 y secuencia creciente.

Los IDs no se reutilizan, incluso si el ADR fue rechazado.

## 6. Ownership y revisión

Cada registro posee owner técnico y funcional.

Las decisiones transversales requieren reviewers de seguridad, operación, datos y dominio cuando corresponda.

## 7. Supersession

El ADR reemplazado conserva su contenido y estado SUPERSEDED.

El nuevo ADR declara explícitamente qué reemplaza, desde cuándo y por qué.

## 8. Excepciones temporales

Toda excepción posee owner, expires_at, riesgo, controles compensatorios, monitoreo y cleanup plan.

Una excepción expirada debe bloquear nuevos usos.

## 9. Trazabilidad

Los ADR se vinculan con requisitos, criterios de aceptación, pruebas, componentes y documentos afectados.

La matriz de trazabilidad debe permitir recorrer decisión → requisito → prueba → evidencia.

## 10. Revisión periódica

Los ADR se revisan ante incidentes, cambios regulatorios, nuevas escalas, cambios de proveedor, deprecaciones y modificaciones de arquitectura.

## 11. Reglas normativas

RULE-ADRI-001

Toda decisión debe poseer identificador estable, estado, owner, versión y fecha.

RULE-ADRI-002

Toda decisión debe documentar contexto, problema, restricciones, alternativas y consecuencias.

RULE-ADRI-003

Toda decisión crítica debe vincular requisitos, criterios de aceptación y pruebas.

RULE-ADRI-004

Toda decisión sustituida debe conservar historial y referenciar su reemplazo.

RULE-ADRI-005

Toda excepción temporal debe tener expires_at, controles compensatorios y plan de eliminación.

RULE-ADRI-006

Toda referencia cruzada debe apuntar a un objetivo existente.

RULE-ADRI-007

Todo término normativo debe usarse de forma consistente en toda la especificación.

RULE-ADRI-008

Los estados, comandos, eventos y errores no deben cambiar de significado sin nueva versión.

RULE-ADRI-009

Toda decisión debe explicar impacto en seguridad, tenant isolation y operación.

RULE-ADRI-010

Toda operación irreversible debe documentar recuperación, rollback o conciliación.

RULE-ADRI-011

Todo resultado UNKNOWN debe definirse explícitamente y poseer proceso de reconciliación.

RULE-ADRI-012

Toda modificación documental debe ser versionada y auditable.

RULE-ADRI-013

Toda ambigüedad detectada debe convertirse en una definición normativa.

RULE-ADRI-014

Toda aprobación crítica debe ser independiente y vinculada al contenido revisado.

RULE-ADRI-015

Todo registro debe poder ser implementado por otro equipo o una LLM sin conocimiento implícito.

RULE-ADRI-016

Toda decisión debe poseer identificador estable, estado, owner, versión y fecha.

RULE-ADRI-017

Toda decisión debe documentar contexto, problema, restricciones, alternativas y consecuencias.

RULE-ADRI-018

Toda decisión crítica debe vincular requisitos, criterios de aceptación y pruebas.

RULE-ADRI-019

Toda decisión sustituida debe conservar historial y referenciar su reemplazo.

RULE-ADRI-020

Toda excepción temporal debe tener expires_at, controles compensatorios y plan de eliminación.

RULE-ADRI-021

Toda referencia cruzada debe apuntar a un objetivo existente.

RULE-ADRI-022

Todo término normativo debe usarse de forma consistente en toda la especificación.

RULE-ADRI-023

Los estados, comandos, eventos y errores no deben cambiar de significado sin nueva versión.

RULE-ADRI-024

Toda decisión debe explicar impacto en seguridad, tenant isolation y operación.

RULE-ADRI-025

Toda operación irreversible debe documentar recuperación, rollback o conciliación.

RULE-ADRI-026

Todo resultado UNKNOWN debe definirse explícitamente y poseer proceso de reconciliación.

RULE-ADRI-027

Toda modificación documental debe ser versionada y auditable.

RULE-ADRI-028

Toda ambigüedad detectada debe convertirse en una definición normativa.

RULE-ADRI-029

Toda aprobación crítica debe ser independiente y vinculada al contenido revisado.

RULE-ADRI-030

Todo registro debe poder ser implementado por otro equipo o una LLM sin conocimiento implícito.

RULE-ADRI-031

Toda decisión debe poseer identificador estable, estado, owner, versión y fecha.

RULE-ADRI-032

Toda decisión debe documentar contexto, problema, restricciones, alternativas y consecuencias.

RULE-ADRI-033

Toda decisión crítica debe vincular requisitos, criterios de aceptación y pruebas.

RULE-ADRI-034

Toda decisión sustituida debe conservar historial y referenciar su reemplazo.

RULE-ADRI-035

Toda excepción temporal debe tener expires_at, controles compensatorios y plan de eliminación.

RULE-ADRI-036

Toda referencia cruzada debe apuntar a un objetivo existente.

RULE-ADRI-037

Todo término normativo debe usarse de forma consistente en toda la especificación.

RULE-ADRI-038

Los estados, comandos, eventos y errores no deben cambiar de significado sin nueva versión.

RULE-ADRI-039

Toda decisión debe explicar impacto en seguridad, tenant isolation y operación.

RULE-ADRI-040

Toda operación irreversible debe documentar recuperación, rollback o conciliación.

RULE-ADRI-041

Todo resultado UNKNOWN debe definirse explícitamente y poseer proceso de reconciliación.

RULE-ADRI-042

Toda modificación documental debe ser versionada y auditable.

RULE-ADRI-043

Toda ambigüedad detectada debe convertirse en una definición normativa.

RULE-ADRI-044

Toda aprobación crítica debe ser independiente y vinculada al contenido revisado.

RULE-ADRI-045

Todo registro debe poder ser implementado por otro equipo o una LLM sin conocimiento implícito.

RULE-ADRI-046

Toda decisión debe poseer identificador estable, estado, owner, versión y fecha.

RULE-ADRI-047

Toda decisión debe documentar contexto, problema, restricciones, alternativas y consecuencias.

RULE-ADRI-048

Toda decisión crítica debe vincular requisitos, criterios de aceptación y pruebas.

RULE-ADRI-049

Toda decisión sustituida debe conservar historial y referenciar su reemplazo.

RULE-ADRI-050

Toda excepción temporal debe tener expires_at, controles compensatorios y plan de eliminación.

RULE-ADRI-051

Toda referencia cruzada debe apuntar a un objetivo existente.

RULE-ADRI-052

Todo término normativo debe usarse de forma consistente en toda la especificación.

RULE-ADRI-053

Los estados, comandos, eventos y errores no deben cambiar de significado sin nueva versión.

RULE-ADRI-054

Toda decisión debe explicar impacto en seguridad, tenant isolation y operación.

RULE-ADRI-055

Toda operación irreversible debe documentar recuperación, rollback o conciliación.

RULE-ADRI-056

Todo resultado UNKNOWN debe definirse explícitamente y poseer proceso de reconciliación.

RULE-ADRI-057

Toda modificación documental debe ser versionada y auditable.

RULE-ADRI-058

Toda ambigüedad detectada debe convertirse en una definición normativa.

RULE-ADRI-059

Toda aprobación crítica debe ser independiente y vinculada al contenido revisado.

RULE-ADRI-060

Todo registro debe poder ser implementado por otro equipo o una LLM sin conocimiento implícito.

RULE-ADRI-061

Toda decisión debe poseer identificador estable, estado, owner, versión y fecha.

RULE-ADRI-062

Toda decisión debe documentar contexto, problema, restricciones, alternativas y consecuencias.

RULE-ADRI-063

Toda decisión crítica debe vincular requisitos, criterios de aceptación y pruebas.

RULE-ADRI-064

Toda decisión sustituida debe conservar historial y referenciar su reemplazo.

RULE-ADRI-065

Toda excepción temporal debe tener expires_at, controles compensatorios y plan de eliminación.

RULE-ADRI-066

Toda referencia cruzada debe apuntar a un objetivo existente.

RULE-ADRI-067

Todo término normativo debe usarse de forma consistente en toda la especificación.

RULE-ADRI-068

Los estados, comandos, eventos y errores no deben cambiar de significado sin nueva versión.

RULE-ADRI-069

Toda decisión debe explicar impacto en seguridad, tenant isolation y operación.

RULE-ADRI-070

Toda operación irreversible debe documentar recuperación, rollback o conciliación.

RULE-ADRI-071

Todo resultado UNKNOWN debe definirse explícitamente y poseer proceso de reconciliación.

RULE-ADRI-072

Toda modificación documental debe ser versionada y auditable.

RULE-ADRI-073

Toda ambigüedad detectada debe convertirse en una definición normativa.

RULE-ADRI-074

Toda aprobación crítica debe ser independiente y vinculada al contenido revisado.

RULE-ADRI-075

Todo registro debe poder ser implementado por otro equipo o una LLM sin conocimiento implícito.

RULE-ADRI-076

Toda decisión debe poseer identificador estable, estado, owner, versión y fecha.

RULE-ADRI-077

Toda decisión debe documentar contexto, problema, restricciones, alternativas y consecuencias.

RULE-ADRI-078

Toda decisión crítica debe vincular requisitos, criterios de aceptación y pruebas.

RULE-ADRI-079

Toda decisión sustituida debe conservar historial y referenciar su reemplazo.

RULE-ADRI-080

Toda excepción temporal debe tener expires_at, controles compensatorios y plan de eliminación.

## 12. Contrato JSON de referencia

```json
{
  "record_id": "STABLE-ID",
  "record_type": "ADR_OR_GLOSSARY_TERM",
  "status": "ACCEPTED",
  "owner": "TEAM_OR_ROLE",
  "version": 1,
  "risk": "MEDIUM",
  "related_requirements": [
    "REQ-ID"
  ],
  "related_acceptance_criteria": [
    "AC-ID"
  ],
  "related_tests": [
    "TEST-ID"
  ],
  "related_documents": [
    "DOCUMENT-ID"
  ],
  "supersedes": null,
  "superseded_by": null,
  "approval_reference": "UUID_OR_NULL",
  "updated_at": "UTC_TIMESTAMP"
}
```

## 13. Flujo de gobierno

1. Identificar la decisión, definición o conflicto semántico.
2. Asignar identificador estable.
3. Definir owner funcional y técnico.
4. Describir contexto y problema.
5. Registrar restricciones y fuerzas.
6. Enumerar alternativas reales.
7. Analizar ventajas, riesgos y costes.
8. Documentar impacto de seguridad.
9. Documentar impacto de tenant isolation.
10. Documentar impacto operativo.
11. Documentar recovery y rollback.
12. Seleccionar decisión o definición.
13. Vincular requisitos y criterios.
14. Vincular pruebas.
15. Resolver referencias cruzadas.
16. Ejecutar revisión independiente.
17. Aprobar según riesgo.
18. Publicar nueva versión.
19. Actualizar índices.
20. Mantener historial y supersession.

## 14. Pseudocódigo

```text
function publish_documentation_record(record):

    validate_record_schema(record)
    validate_stable_identifier(record.record_id)
    validate_owner(record.owner)
    validate_status(record.status)
    validate_version(record.version)

    validate_context_problem_constraints(record)
    validate_alternatives_and_consequences(record)
    validate_security_tenant_and_operational_impacts(record)
    validate_recovery_and_rollback(record)

    references = resolve_all_cross_references(record)

    if references.has_missing_targets:
        reject(CROSS_REFERENCE_NOT_FOUND)

    if record.risk == HIGH:
        validate_independent_approval(
            record.approval_reference,
            hash_record_content(record)
        )

    previous = load_latest_record(record.record_id)

    if previous.exists:
        validate_expected_version(
            previous.version,
            record.expected_version
        )

    persist_record_history(record)
    update_master_indexes(record)
    update_traceability_matrix(record)
    emit(DocumentationRecordPublished)

    return build_documentation_result(record)
```

## 15. Errores funcionales

ADRI_RECORD_INVALID

ADRI_IDENTIFIER_INVALID

ADRI_IDENTIFIER_DUPLICATE

ADRI_OWNER_REQUIRED

ADRI_STATUS_INVALID

ADRI_VERSION_CONFLICT

ADRI_CONTEXT_INCOMPLETE

ADRI_ALTERNATIVES_INCOMPLETE

ADRI_CONSEQUENCES_INCOMPLETE

ADRI_SECURITY_IMPLICATION_MISSING

ADRI_TENANT_IMPLICATION_MISSING

ADRI_RECOVERY_IMPLICATION_MISSING

ADRI_CROSS_REFERENCE_NOT_FOUND

ADRI_TRACEABILITY_INCOMPLETE

ADRI_TERM_AMBIGUOUS

ADRI_TERM_DUPLICATE

ADRI_DEFINITION_CONFLICT

ADRI_SUPERSESSION_INVALID

ADRI_APPROVAL_REQUIRED

ADRI_APPROVAL_INVALID

ADRI_AUDIT_PERSISTENCE_FAILED

## 16. Eventos

DocumentationRecordCreated

DocumentationRecordReviewed

DocumentationRecordAccepted

DocumentationRecordRejected

DocumentationRecordDeprecated

DocumentationRecordSuperseded

GlossaryTermCreated

GlossaryTermUpdated

GlossaryConflictDetected

CrossReferenceCreated

CrossReferenceBroken

TraceabilityUpdated

DocumentationVersionPublished

DocumentationAuditEvidenceRecorded

## 17. Casos límite y pruebas adversariales

TEST-ADRI-001

Verificar dos registros utilizan el mismo identificador. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-002

Verificar un owner deja de existir. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-003

Verificar una referencia apunta a un documento inexistente. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-004

Verificar dos términos tienen definiciones incompatibles. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-005

Verificar una decisión sustituida vuelve a estado vigente. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-006

Verificar una definición cambia sin incrementar versión. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-007

Verificar un ADR crítico no posee pruebas. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-008

Verificar una excepción temporal expira. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-009

Verificar una decisión omite tenant isolation. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-010

Verificar una decisión omite recovery. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-011

Verificar una LLM utiliza un término fuera de su definición. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-012

Verificar un evento posee dos significados. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-013

Verificar un código de error se reutiliza. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-014

Verificar un estado se usa fuera de su máquina de estados. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-015

Verificar un documento se publica con referencias rotas. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-016

Verificar una decisión se autoaprueba. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-017

Verificar un requisito carece de prueba. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-018

Verificar un test apunta a un criterio inexistente. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-019

Verificar un término obsoleto continúa en documentos activos. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-020

Verificar un documento cambia sin historial. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-021

Verificar un ADR contradice una regla de seguridad. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-022

Verificar un RFC propone una operación no idempotente. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-023

Verificar un glosario mezcla ID interno y referencia externa. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-024

Verificar un término UNKNOWN se interpreta como FAILED. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRI-025

Verificar una excepción carece de cleanup plan. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

## 18. Criterios de aceptación

AC-ADRI-001

Todo registro posee identificador estable.

AC-ADRI-002

Todo registro posee owner.

AC-ADRI-003

Toda decisión documenta contexto.

AC-ADRI-004

Toda decisión documenta alternativas.

AC-ADRI-005

Toda decisión documenta consecuencias.

AC-ADRI-006

Toda decisión crítica vincula pruebas.

AC-ADRI-007

Toda referencia apunta a un objetivo existente.

AC-ADRI-008

Toda definición es normativa.

AC-ADRI-009

Toda sustitución conserva historial.

AC-ADRI-010

Toda modificación incrementa versión.

AC-ADRI-011

Toda ambigüedad se detecta.

AC-ADRI-012

Toda excepción posee expiración.

AC-ADRI-013

Toda decisión documenta seguridad.

AC-ADRI-014

Toda decisión documenta recuperación.

AC-ADRI-015

Toda operación documental es auditable.

AC-ADRI-016

Todo registro posee identificador estable.

AC-ADRI-017

Todo registro posee owner.

AC-ADRI-018

Toda decisión documenta contexto.

AC-ADRI-019

Toda decisión documenta alternativas.

AC-ADRI-020

Toda decisión documenta consecuencias.

AC-ADRI-021

Toda decisión crítica vincula pruebas.

AC-ADRI-022

Toda referencia apunta a un objetivo existente.

AC-ADRI-023

Toda definición es normativa.

AC-ADRI-024

Toda sustitución conserva historial.

AC-ADRI-025

Toda modificación incrementa versión.

AC-ADRI-026

Toda ambigüedad se detecta.

AC-ADRI-027

Toda excepción posee expiración.

AC-ADRI-028

Toda decisión documenta seguridad.

AC-ADRI-029

Toda decisión documenta recuperación.

AC-ADRI-030

Toda operación documental es auditable.

AC-ADRI-031

Todo registro posee identificador estable.

AC-ADRI-032

Todo registro posee owner.

AC-ADRI-033

Toda decisión documenta contexto.

AC-ADRI-034

Toda decisión documenta alternativas.

AC-ADRI-035

Toda decisión documenta consecuencias.

AC-ADRI-036

Toda decisión crítica vincula pruebas.

AC-ADRI-037

Toda referencia apunta a un objetivo existente.

AC-ADRI-038

Toda definición es normativa.

AC-ADRI-039

Toda sustitución conserva historial.

AC-ADRI-040

Toda modificación incrementa versión.

AC-ADRI-041

Toda ambigüedad se detecta.

AC-ADRI-042

Toda excepción posee expiración.

AC-ADRI-043

Toda decisión documenta seguridad.

AC-ADRI-044

Toda decisión documenta recuperación.

AC-ADRI-045

Toda operación documental es auditable.

AC-ADRI-046

Todo registro posee identificador estable.

AC-ADRI-047

Todo registro posee owner.

AC-ADRI-048

Toda decisión documenta contexto.

AC-ADRI-049

Toda decisión documenta alternativas.

AC-ADRI-050

Toda decisión documenta consecuencias.

AC-ADRI-051

Toda decisión crítica vincula pruebas.

AC-ADRI-052

Toda referencia apunta a un objetivo existente.

AC-ADRI-053

Toda definición es normativa.

AC-ADRI-054

Toda sustitución conserva historial.

AC-ADRI-055

Toda modificación incrementa versión.

AC-ADRI-056

Toda ambigüedad se detecta.

AC-ADRI-057

Toda excepción posee expiración.

AC-ADRI-058

Toda decisión documenta seguridad.

AC-ADRI-059

Toda decisión documenta recuperación.

AC-ADRI-060

Toda operación documental es auditable.

AC-ADRI-061

Todo registro posee identificador estable.

AC-ADRI-062

Todo registro posee owner.

AC-ADRI-063

Toda decisión documenta contexto.

AC-ADRI-064

Toda decisión documenta alternativas.

AC-ADRI-065

Toda decisión documenta consecuencias.

AC-ADRI-066

Toda decisión crítica vincula pruebas.

AC-ADRI-067

Toda referencia apunta a un objetivo existente.

AC-ADRI-068

Toda definición es normativa.

AC-ADRI-069

Toda sustitución conserva historial.

AC-ADRI-070

Toda modificación incrementa versión.

AC-ADRI-071

Toda ambigüedad se detecta.

AC-ADRI-072

Toda excepción posee expiración.

AC-ADRI-073

Toda decisión documenta seguridad.

AC-ADRI-074

Toda decisión documenta recuperación.

AC-ADRI-075

Toda operación documental es auditable.

AC-ADRI-076

Todo registro posee identificador estable.

AC-ADRI-077

Todo registro posee owner.

AC-ADRI-078

Toda decisión documenta contexto.

AC-ADRI-079

Toda decisión documenta alternativas.

AC-ADRI-080

Toda decisión documenta consecuencias.

## 19. Checklist final

[ ] Existe identificador estable.
[ ] Existe owner.
[ ] Existe estado.
[ ] Existe versión.
[ ] Existe contexto.
[ ] Existe problema.
[ ] Existen restricciones.
[ ] Existen alternativas.
[ ] Existe decisión.
[ ] Existen consecuencias positivas.
[ ] Existen consecuencias negativas.
[ ] Existe análisis de seguridad.
[ ] Existe análisis de tenant.
[ ] Existe análisis operativo.
[ ] Existe recovery.
[ ] Existe rollback.
[ ] Existen requisitos relacionados.
[ ] Existen criterios relacionados.
[ ] Existen pruebas relacionadas.
[ ] Existen documentos relacionados.
[ ] Existe supersession.
[ ] Existe historial.
[ ] Existe aprobación.
[ ] Existe auditoría.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
