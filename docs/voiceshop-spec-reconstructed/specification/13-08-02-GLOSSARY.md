======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-08-02-GLOSSARY.md

# GLOSARIO TÉCNICO UNIFICADO

## 1. Objetivo

Define el vocabulario normativo que debe usarse consistentemente en especificación, implementación, QA y operación.

## 2. Términos A–C

Aggregate: límite de consistencia que sólo cambia mediante su raíz.

Admin Session: sesión administrativa con tenant scope, assurance y expiración.

Approval: autorización independiente, temporal y vinculada al payload.

Barge-in: interrupción de audio saliente por nueva entrada.

Bulkhead: aislamiento de recursos para evitar agotamiento global.

Circuit Breaker: control CLOSED, OPEN y HALF_OPEN para dependencias degradadas.

Command: solicitud explícita y autorizada de cambio de estado.

Correlation ID: identificador que conecta toda una operación distribuida.

Causation ID: identificador de la acción que originó un evento.

Context Package: resumen estructurado entregado durante handoff.

## 3. Términos D–I

DLQ: cola de mensajes que agotaron sus intentos.

Expected Version: versión requerida antes de modificar un recurso.

Feature Flag: control versionado de disponibilidad de una función.

Fencing Token: número monotónico que invalida owners antiguos de un lock.

Handoff: transferencia de control hacia un Operador.

Idempotency Key: clave que evita efectos duplicados.

Inbox: registro deduplicado de eventos entrantes.

## 4. Términos L–R

Lease: ownership temporal renovable y expirante.

Menu Session ID: identidad de una instancia de menú.

Outbox: registro transaccional de eventos salientes.

Provider Reference: identificador externo opaco.

Reconciliation: proceso de resolución de UNKNOWN o inconsistencias.

RPO: pérdida máxima de datos tolerable.

RTO: tiempo máximo para recuperar capacidad segura.

## 5. Términos S–W

Secret Reference: identificador de un secreto resuelto en runtime.

Structured Output: salida que debe cumplir un schema.

Tenant: organización aislada con datos y configuración propios.

Tool Proposal: propuesta no confiable que debe validarse.

Turn: unidad de interacción dentro de una Session.

UNKNOWN: el efecto pudo ocurrir, pero falta evidencia suficiente.

Work Item: unidad asignable a un Operador con SLA y owner.

## 6. Convenciones

Los nombres de estados se escriben en MAYÚSCULAS.

Los eventos se escriben en PascalCase y en tiempo pasado.

Los Commands se escriben en forma imperativa o sustantiva estable.

Los errores usan códigos estables en MAYÚSCULAS_CON_GUIONES_BAJOS.

ID interno y Provider Reference nunca son equivalentes.

## 7. Reglas normativas

RULE-GLO-001

Toda decisión debe poseer identificador estable, estado, owner, versión y fecha.

RULE-GLO-002

Toda decisión debe documentar contexto, problema, restricciones, alternativas y consecuencias.

RULE-GLO-003

Toda decisión crítica debe vincular requisitos, criterios de aceptación y pruebas.

RULE-GLO-004

Toda decisión sustituida debe conservar historial y referenciar su reemplazo.

RULE-GLO-005

Toda excepción temporal debe tener expires_at, controles compensatorios y plan de eliminación.

RULE-GLO-006

Toda referencia cruzada debe apuntar a un objetivo existente.

RULE-GLO-007

Todo término normativo debe usarse de forma consistente en toda la especificación.

RULE-GLO-008

Los estados, comandos, eventos y errores no deben cambiar de significado sin nueva versión.

RULE-GLO-009

Toda decisión debe explicar impacto en seguridad, tenant isolation y operación.

RULE-GLO-010

Toda operación irreversible debe documentar recuperación, rollback o conciliación.

RULE-GLO-011

Todo resultado UNKNOWN debe definirse explícitamente y poseer proceso de reconciliación.

RULE-GLO-012

Toda modificación documental debe ser versionada y auditable.

RULE-GLO-013

Toda ambigüedad detectada debe convertirse en una definición normativa.

RULE-GLO-014

Toda aprobación crítica debe ser independiente y vinculada al contenido revisado.

RULE-GLO-015

Todo registro debe poder ser implementado por otro equipo o una LLM sin conocimiento implícito.

RULE-GLO-016

Toda decisión debe poseer identificador estable, estado, owner, versión y fecha.

RULE-GLO-017

Toda decisión debe documentar contexto, problema, restricciones, alternativas y consecuencias.

RULE-GLO-018

Toda decisión crítica debe vincular requisitos, criterios de aceptación y pruebas.

RULE-GLO-019

Toda decisión sustituida debe conservar historial y referenciar su reemplazo.

RULE-GLO-020

Toda excepción temporal debe tener expires_at, controles compensatorios y plan de eliminación.

RULE-GLO-021

Toda referencia cruzada debe apuntar a un objetivo existente.

RULE-GLO-022

Todo término normativo debe usarse de forma consistente en toda la especificación.

RULE-GLO-023

Los estados, comandos, eventos y errores no deben cambiar de significado sin nueva versión.

RULE-GLO-024

Toda decisión debe explicar impacto en seguridad, tenant isolation y operación.

RULE-GLO-025

Toda operación irreversible debe documentar recuperación, rollback o conciliación.

RULE-GLO-026

Todo resultado UNKNOWN debe definirse explícitamente y poseer proceso de reconciliación.

RULE-GLO-027

Toda modificación documental debe ser versionada y auditable.

RULE-GLO-028

Toda ambigüedad detectada debe convertirse en una definición normativa.

RULE-GLO-029

Toda aprobación crítica debe ser independiente y vinculada al contenido revisado.

RULE-GLO-030

Todo registro debe poder ser implementado por otro equipo o una LLM sin conocimiento implícito.

RULE-GLO-031

Toda decisión debe poseer identificador estable, estado, owner, versión y fecha.

RULE-GLO-032

Toda decisión debe documentar contexto, problema, restricciones, alternativas y consecuencias.

RULE-GLO-033

Toda decisión crítica debe vincular requisitos, criterios de aceptación y pruebas.

RULE-GLO-034

Toda decisión sustituida debe conservar historial y referenciar su reemplazo.

RULE-GLO-035

Toda excepción temporal debe tener expires_at, controles compensatorios y plan de eliminación.

RULE-GLO-036

Toda referencia cruzada debe apuntar a un objetivo existente.

RULE-GLO-037

Todo término normativo debe usarse de forma consistente en toda la especificación.

RULE-GLO-038

Los estados, comandos, eventos y errores no deben cambiar de significado sin nueva versión.

RULE-GLO-039

Toda decisión debe explicar impacto en seguridad, tenant isolation y operación.

RULE-GLO-040

Toda operación irreversible debe documentar recuperación, rollback o conciliación.

RULE-GLO-041

Todo resultado UNKNOWN debe definirse explícitamente y poseer proceso de reconciliación.

RULE-GLO-042

Toda modificación documental debe ser versionada y auditable.

RULE-GLO-043

Toda ambigüedad detectada debe convertirse en una definición normativa.

RULE-GLO-044

Toda aprobación crítica debe ser independiente y vinculada al contenido revisado.

RULE-GLO-045

Todo registro debe poder ser implementado por otro equipo o una LLM sin conocimiento implícito.

RULE-GLO-046

Toda decisión debe poseer identificador estable, estado, owner, versión y fecha.

RULE-GLO-047

Toda decisión debe documentar contexto, problema, restricciones, alternativas y consecuencias.

RULE-GLO-048

Toda decisión crítica debe vincular requisitos, criterios de aceptación y pruebas.

RULE-GLO-049

Toda decisión sustituida debe conservar historial y referenciar su reemplazo.

RULE-GLO-050

Toda excepción temporal debe tener expires_at, controles compensatorios y plan de eliminación.

RULE-GLO-051

Toda referencia cruzada debe apuntar a un objetivo existente.

RULE-GLO-052

Todo término normativo debe usarse de forma consistente en toda la especificación.

RULE-GLO-053

Los estados, comandos, eventos y errores no deben cambiar de significado sin nueva versión.

RULE-GLO-054

Toda decisión debe explicar impacto en seguridad, tenant isolation y operación.

RULE-GLO-055

Toda operación irreversible debe documentar recuperación, rollback o conciliación.

RULE-GLO-056

Todo resultado UNKNOWN debe definirse explícitamente y poseer proceso de reconciliación.

RULE-GLO-057

Toda modificación documental debe ser versionada y auditable.

RULE-GLO-058

Toda ambigüedad detectada debe convertirse en una definición normativa.

RULE-GLO-059

Toda aprobación crítica debe ser independiente y vinculada al contenido revisado.

RULE-GLO-060

Todo registro debe poder ser implementado por otro equipo o una LLM sin conocimiento implícito.

RULE-GLO-061

Toda decisión debe poseer identificador estable, estado, owner, versión y fecha.

RULE-GLO-062

Toda decisión debe documentar contexto, problema, restricciones, alternativas y consecuencias.

RULE-GLO-063

Toda decisión crítica debe vincular requisitos, criterios de aceptación y pruebas.

RULE-GLO-064

Toda decisión sustituida debe conservar historial y referenciar su reemplazo.

RULE-GLO-065

Toda excepción temporal debe tener expires_at, controles compensatorios y plan de eliminación.

RULE-GLO-066

Toda referencia cruzada debe apuntar a un objetivo existente.

RULE-GLO-067

Todo término normativo debe usarse de forma consistente en toda la especificación.

RULE-GLO-068

Los estados, comandos, eventos y errores no deben cambiar de significado sin nueva versión.

RULE-GLO-069

Toda decisión debe explicar impacto en seguridad, tenant isolation y operación.

RULE-GLO-070

Toda operación irreversible debe documentar recuperación, rollback o conciliación.

RULE-GLO-071

Todo resultado UNKNOWN debe definirse explícitamente y poseer proceso de reconciliación.

RULE-GLO-072

Toda modificación documental debe ser versionada y auditable.

RULE-GLO-073

Toda ambigüedad detectada debe convertirse en una definición normativa.

RULE-GLO-074

Toda aprobación crítica debe ser independiente y vinculada al contenido revisado.

RULE-GLO-075

Todo registro debe poder ser implementado por otro equipo o una LLM sin conocimiento implícito.

RULE-GLO-076

Toda decisión debe poseer identificador estable, estado, owner, versión y fecha.

RULE-GLO-077

Toda decisión debe documentar contexto, problema, restricciones, alternativas y consecuencias.

RULE-GLO-078

Toda decisión crítica debe vincular requisitos, criterios de aceptación y pruebas.

RULE-GLO-079

Toda decisión sustituida debe conservar historial y referenciar su reemplazo.

RULE-GLO-080

Toda excepción temporal debe tener expires_at, controles compensatorios y plan de eliminación.

## 8. Contrato JSON de referencia

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

## 9. Flujo de gobierno

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

## 10. Pseudocódigo

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

## 11. Errores funcionales

GLO_RECORD_INVALID

GLO_IDENTIFIER_INVALID

GLO_IDENTIFIER_DUPLICATE

GLO_OWNER_REQUIRED

GLO_STATUS_INVALID

GLO_VERSION_CONFLICT

GLO_CONTEXT_INCOMPLETE

GLO_ALTERNATIVES_INCOMPLETE

GLO_CONSEQUENCES_INCOMPLETE

GLO_SECURITY_IMPLICATION_MISSING

GLO_TENANT_IMPLICATION_MISSING

GLO_RECOVERY_IMPLICATION_MISSING

GLO_CROSS_REFERENCE_NOT_FOUND

GLO_TRACEABILITY_INCOMPLETE

GLO_TERM_AMBIGUOUS

GLO_TERM_DUPLICATE

GLO_DEFINITION_CONFLICT

GLO_SUPERSESSION_INVALID

GLO_APPROVAL_REQUIRED

GLO_APPROVAL_INVALID

GLO_AUDIT_PERSISTENCE_FAILED

## 12. Eventos

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

## 13. Casos límite y pruebas adversariales

TEST-GLO-001

Verificar dos registros utilizan el mismo identificador. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-002

Verificar un owner deja de existir. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-003

Verificar una referencia apunta a un documento inexistente. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-004

Verificar dos términos tienen definiciones incompatibles. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-005

Verificar una decisión sustituida vuelve a estado vigente. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-006

Verificar una definición cambia sin incrementar versión. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-007

Verificar un ADR crítico no posee pruebas. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-008

Verificar una excepción temporal expira. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-009

Verificar una decisión omite tenant isolation. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-010

Verificar una decisión omite recovery. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-011

Verificar una LLM utiliza un término fuera de su definición. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-012

Verificar un evento posee dos significados. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-013

Verificar un código de error se reutiliza. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-014

Verificar un estado se usa fuera de su máquina de estados. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-015

Verificar un documento se publica con referencias rotas. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-016

Verificar una decisión se autoaprueba. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-017

Verificar un requisito carece de prueba. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-018

Verificar un test apunta a un criterio inexistente. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-019

Verificar un término obsoleto continúa en documentos activos. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-020

Verificar un documento cambia sin historial. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-021

Verificar un ADR contradice una regla de seguridad. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-022

Verificar un RFC propone una operación no idempotente. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-023

Verificar un glosario mezcla ID interno y referencia externa. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-024

Verificar un término UNKNOWN se interpreta como FAILED. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-GLO-025

Verificar una excepción carece de cleanup plan. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

## 14. Criterios de aceptación

AC-GLO-001

Todo registro posee identificador estable.

AC-GLO-002

Todo registro posee owner.

AC-GLO-003

Toda decisión documenta contexto.

AC-GLO-004

Toda decisión documenta alternativas.

AC-GLO-005

Toda decisión documenta consecuencias.

AC-GLO-006

Toda decisión crítica vincula pruebas.

AC-GLO-007

Toda referencia apunta a un objetivo existente.

AC-GLO-008

Toda definición es normativa.

AC-GLO-009

Toda sustitución conserva historial.

AC-GLO-010

Toda modificación incrementa versión.

AC-GLO-011

Toda ambigüedad se detecta.

AC-GLO-012

Toda excepción posee expiración.

AC-GLO-013

Toda decisión documenta seguridad.

AC-GLO-014

Toda decisión documenta recuperación.

AC-GLO-015

Toda operación documental es auditable.

AC-GLO-016

Todo registro posee identificador estable.

AC-GLO-017

Todo registro posee owner.

AC-GLO-018

Toda decisión documenta contexto.

AC-GLO-019

Toda decisión documenta alternativas.

AC-GLO-020

Toda decisión documenta consecuencias.

AC-GLO-021

Toda decisión crítica vincula pruebas.

AC-GLO-022

Toda referencia apunta a un objetivo existente.

AC-GLO-023

Toda definición es normativa.

AC-GLO-024

Toda sustitución conserva historial.

AC-GLO-025

Toda modificación incrementa versión.

AC-GLO-026

Toda ambigüedad se detecta.

AC-GLO-027

Toda excepción posee expiración.

AC-GLO-028

Toda decisión documenta seguridad.

AC-GLO-029

Toda decisión documenta recuperación.

AC-GLO-030

Toda operación documental es auditable.

AC-GLO-031

Todo registro posee identificador estable.

AC-GLO-032

Todo registro posee owner.

AC-GLO-033

Toda decisión documenta contexto.

AC-GLO-034

Toda decisión documenta alternativas.

AC-GLO-035

Toda decisión documenta consecuencias.

AC-GLO-036

Toda decisión crítica vincula pruebas.

AC-GLO-037

Toda referencia apunta a un objetivo existente.

AC-GLO-038

Toda definición es normativa.

AC-GLO-039

Toda sustitución conserva historial.

AC-GLO-040

Toda modificación incrementa versión.

AC-GLO-041

Toda ambigüedad se detecta.

AC-GLO-042

Toda excepción posee expiración.

AC-GLO-043

Toda decisión documenta seguridad.

AC-GLO-044

Toda decisión documenta recuperación.

AC-GLO-045

Toda operación documental es auditable.

AC-GLO-046

Todo registro posee identificador estable.

AC-GLO-047

Todo registro posee owner.

AC-GLO-048

Toda decisión documenta contexto.

AC-GLO-049

Toda decisión documenta alternativas.

AC-GLO-050

Toda decisión documenta consecuencias.

AC-GLO-051

Toda decisión crítica vincula pruebas.

AC-GLO-052

Toda referencia apunta a un objetivo existente.

AC-GLO-053

Toda definición es normativa.

AC-GLO-054

Toda sustitución conserva historial.

AC-GLO-055

Toda modificación incrementa versión.

AC-GLO-056

Toda ambigüedad se detecta.

AC-GLO-057

Toda excepción posee expiración.

AC-GLO-058

Toda decisión documenta seguridad.

AC-GLO-059

Toda decisión documenta recuperación.

AC-GLO-060

Toda operación documental es auditable.

AC-GLO-061

Todo registro posee identificador estable.

AC-GLO-062

Todo registro posee owner.

AC-GLO-063

Toda decisión documenta contexto.

AC-GLO-064

Toda decisión documenta alternativas.

AC-GLO-065

Toda decisión documenta consecuencias.

AC-GLO-066

Toda decisión crítica vincula pruebas.

AC-GLO-067

Toda referencia apunta a un objetivo existente.

AC-GLO-068

Toda definición es normativa.

AC-GLO-069

Toda sustitución conserva historial.

AC-GLO-070

Toda modificación incrementa versión.

AC-GLO-071

Toda ambigüedad se detecta.

AC-GLO-072

Toda excepción posee expiración.

AC-GLO-073

Toda decisión documenta seguridad.

AC-GLO-074

Toda decisión documenta recuperación.

AC-GLO-075

Toda operación documental es auditable.

AC-GLO-076

Todo registro posee identificador estable.

AC-GLO-077

Todo registro posee owner.

AC-GLO-078

Toda decisión documenta contexto.

AC-GLO-079

Toda decisión documenta alternativas.

AC-GLO-080

Toda decisión documenta consecuencias.

## 15. Checklist final

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
