======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-08-01-ADR-CATALOG.md

# CATÁLOGO DE DECISIONES ARQUITECTÓNICAS

## 1. Objetivo

Consolida las decisiones arquitectónicas centrales y sus consecuencias operativas, funcionales y de seguridad.

## 2. ADR-0001 — Puertos y adaptadores

Decisión: separar dominio, aplicación e infraestructura mediante puertos y adaptadores.

Consecuencia: proveedores, canales y almacenamiento pueden cambiar sin contaminar reglas de negocio.

## 3. ADR-0002 — PostgreSQL como fuente oficial

Decisión: aggregates, idempotencia, outbox, inbox, auditoría y configuración viven en PostgreSQL.

Consecuencia: Redis y colas permanecen como soportes efímeros o de transporte.

## 4. ADR-0003 — Redis efímero

Decisión: Redis se usa para locks, sesiones, rate limiting, cache y deduplicación corta.

Consecuencia: la pérdida de Redis no debe borrar el estado oficial de pedidos o pagos.

## 5. ADR-0004 — Idempotencia obligatoria

Decisión: toda operación con efecto repetible utiliza Idempotency Key, payload hash, scope y retención.

## 6. ADR-0005 — Outbox e Inbox

Decisión: los eventos salientes se publican desde outbox y los entrantes se procesan mediante inbox deduplicada.

## 7. ADR-0006 — FSM y Menu Session ID

Decisión: Session, Turn y menús se modelan con estados explícitos y callbacks versionados.

## 8. ADR-0007 — LLM no confiable

Decisión: la LLM clasifica, extrae, propone y redacta, pero no autoriza ni ejecuta efectos.

## 9. ADR-0008 — Abstracción Realtime

Decisión: el proveedor de voz se encapsula detrás de un port y eventos normalizados.

## 10. ADR-0009 — Generation y sequence

Decisión: conexiones y streams usan generation y sequence para ignorar eventos antiguos.

## 11. ADR-0010 — Control humano prevalece

Decisión: HUMAN_ACTIVE bloquea respuestas y acciones automáticas hasta devolución explícita.

## 12. ADR-0011 — Inventario por movimientos

Decisión: los balances cambian mediante Commands y movimientos; no existen updates directos.

## 13. ADR-0012 — Evidencia oficial de pago

Decisión: retorno del navegador, texto o screenshots no aprueban un pago.

## 14. ADR-0013 — UNKNOWN explícito

Decisión: un timeout posterior al envío puede producir UNKNOWN y requiere reconciliación.

## 15. ADR-0014 — Flags sensibles server-side

Decisión: pagos, inventario y seguridad se resuelven en backend con default seguro.

## 16. ADR-0015 — Expand-contract

Decisión: las migraciones incompatibles se despliegan por fases compatibles.

## 17. ADR-0016 — Build once, promote

Decisión: el mismo artefacto firmado se promueve entre entornos sin recompilación.

## 18. ADR-0017 — Métricas de cardinalidad controlada

Decisión: IDs únicos pertenecen a logs y trazas, no a labels.

## 19. ADR-0018 — Auditoría append-only

Decisión: las acciones privilegiadas generan evidencia lógicamente inmutable.

## 20. ADR-0019 — Aprobaciones single-use

Decisión: approvals críticas se vinculan al payload, expiran y no se reutilizan.

## 21. ADR-0020 — Restore probado

Decisión: un backup no se considera válido hasta demostrar restauración y verificación.

## 22. Reglas normativas

RULE-ADRC-001

Toda decisión debe poseer identificador estable, estado, owner, versión y fecha.

RULE-ADRC-002

Toda decisión debe documentar contexto, problema, restricciones, alternativas y consecuencias.

RULE-ADRC-003

Toda decisión crítica debe vincular requisitos, criterios de aceptación y pruebas.

RULE-ADRC-004

Toda decisión sustituida debe conservar historial y referenciar su reemplazo.

RULE-ADRC-005

Toda excepción temporal debe tener expires_at, controles compensatorios y plan de eliminación.

RULE-ADRC-006

Toda referencia cruzada debe apuntar a un objetivo existente.

RULE-ADRC-007

Todo término normativo debe usarse de forma consistente en toda la especificación.

RULE-ADRC-008

Los estados, comandos, eventos y errores no deben cambiar de significado sin nueva versión.

RULE-ADRC-009

Toda decisión debe explicar impacto en seguridad, tenant isolation y operación.

RULE-ADRC-010

Toda operación irreversible debe documentar recuperación, rollback o conciliación.

RULE-ADRC-011

Todo resultado UNKNOWN debe definirse explícitamente y poseer proceso de reconciliación.

RULE-ADRC-012

Toda modificación documental debe ser versionada y auditable.

RULE-ADRC-013

Toda ambigüedad detectada debe convertirse en una definición normativa.

RULE-ADRC-014

Toda aprobación crítica debe ser independiente y vinculada al contenido revisado.

RULE-ADRC-015

Todo registro debe poder ser implementado por otro equipo o una LLM sin conocimiento implícito.

RULE-ADRC-016

Toda decisión debe poseer identificador estable, estado, owner, versión y fecha.

RULE-ADRC-017

Toda decisión debe documentar contexto, problema, restricciones, alternativas y consecuencias.

RULE-ADRC-018

Toda decisión crítica debe vincular requisitos, criterios de aceptación y pruebas.

RULE-ADRC-019

Toda decisión sustituida debe conservar historial y referenciar su reemplazo.

RULE-ADRC-020

Toda excepción temporal debe tener expires_at, controles compensatorios y plan de eliminación.

RULE-ADRC-021

Toda referencia cruzada debe apuntar a un objetivo existente.

RULE-ADRC-022

Todo término normativo debe usarse de forma consistente en toda la especificación.

RULE-ADRC-023

Los estados, comandos, eventos y errores no deben cambiar de significado sin nueva versión.

RULE-ADRC-024

Toda decisión debe explicar impacto en seguridad, tenant isolation y operación.

RULE-ADRC-025

Toda operación irreversible debe documentar recuperación, rollback o conciliación.

RULE-ADRC-026

Todo resultado UNKNOWN debe definirse explícitamente y poseer proceso de reconciliación.

RULE-ADRC-027

Toda modificación documental debe ser versionada y auditable.

RULE-ADRC-028

Toda ambigüedad detectada debe convertirse en una definición normativa.

RULE-ADRC-029

Toda aprobación crítica debe ser independiente y vinculada al contenido revisado.

RULE-ADRC-030

Todo registro debe poder ser implementado por otro equipo o una LLM sin conocimiento implícito.

RULE-ADRC-031

Toda decisión debe poseer identificador estable, estado, owner, versión y fecha.

RULE-ADRC-032

Toda decisión debe documentar contexto, problema, restricciones, alternativas y consecuencias.

RULE-ADRC-033

Toda decisión crítica debe vincular requisitos, criterios de aceptación y pruebas.

RULE-ADRC-034

Toda decisión sustituida debe conservar historial y referenciar su reemplazo.

RULE-ADRC-035

Toda excepción temporal debe tener expires_at, controles compensatorios y plan de eliminación.

RULE-ADRC-036

Toda referencia cruzada debe apuntar a un objetivo existente.

RULE-ADRC-037

Todo término normativo debe usarse de forma consistente en toda la especificación.

RULE-ADRC-038

Los estados, comandos, eventos y errores no deben cambiar de significado sin nueva versión.

RULE-ADRC-039

Toda decisión debe explicar impacto en seguridad, tenant isolation y operación.

RULE-ADRC-040

Toda operación irreversible debe documentar recuperación, rollback o conciliación.

RULE-ADRC-041

Todo resultado UNKNOWN debe definirse explícitamente y poseer proceso de reconciliación.

RULE-ADRC-042

Toda modificación documental debe ser versionada y auditable.

RULE-ADRC-043

Toda ambigüedad detectada debe convertirse en una definición normativa.

RULE-ADRC-044

Toda aprobación crítica debe ser independiente y vinculada al contenido revisado.

RULE-ADRC-045

Todo registro debe poder ser implementado por otro equipo o una LLM sin conocimiento implícito.

RULE-ADRC-046

Toda decisión debe poseer identificador estable, estado, owner, versión y fecha.

RULE-ADRC-047

Toda decisión debe documentar contexto, problema, restricciones, alternativas y consecuencias.

RULE-ADRC-048

Toda decisión crítica debe vincular requisitos, criterios de aceptación y pruebas.

RULE-ADRC-049

Toda decisión sustituida debe conservar historial y referenciar su reemplazo.

RULE-ADRC-050

Toda excepción temporal debe tener expires_at, controles compensatorios y plan de eliminación.

RULE-ADRC-051

Toda referencia cruzada debe apuntar a un objetivo existente.

RULE-ADRC-052

Todo término normativo debe usarse de forma consistente en toda la especificación.

RULE-ADRC-053

Los estados, comandos, eventos y errores no deben cambiar de significado sin nueva versión.

RULE-ADRC-054

Toda decisión debe explicar impacto en seguridad, tenant isolation y operación.

RULE-ADRC-055

Toda operación irreversible debe documentar recuperación, rollback o conciliación.

RULE-ADRC-056

Todo resultado UNKNOWN debe definirse explícitamente y poseer proceso de reconciliación.

RULE-ADRC-057

Toda modificación documental debe ser versionada y auditable.

RULE-ADRC-058

Toda ambigüedad detectada debe convertirse en una definición normativa.

RULE-ADRC-059

Toda aprobación crítica debe ser independiente y vinculada al contenido revisado.

RULE-ADRC-060

Todo registro debe poder ser implementado por otro equipo o una LLM sin conocimiento implícito.

RULE-ADRC-061

Toda decisión debe poseer identificador estable, estado, owner, versión y fecha.

RULE-ADRC-062

Toda decisión debe documentar contexto, problema, restricciones, alternativas y consecuencias.

RULE-ADRC-063

Toda decisión crítica debe vincular requisitos, criterios de aceptación y pruebas.

RULE-ADRC-064

Toda decisión sustituida debe conservar historial y referenciar su reemplazo.

RULE-ADRC-065

Toda excepción temporal debe tener expires_at, controles compensatorios y plan de eliminación.

RULE-ADRC-066

Toda referencia cruzada debe apuntar a un objetivo existente.

RULE-ADRC-067

Todo término normativo debe usarse de forma consistente en toda la especificación.

RULE-ADRC-068

Los estados, comandos, eventos y errores no deben cambiar de significado sin nueva versión.

RULE-ADRC-069

Toda decisión debe explicar impacto en seguridad, tenant isolation y operación.

RULE-ADRC-070

Toda operación irreversible debe documentar recuperación, rollback o conciliación.

RULE-ADRC-071

Todo resultado UNKNOWN debe definirse explícitamente y poseer proceso de reconciliación.

RULE-ADRC-072

Toda modificación documental debe ser versionada y auditable.

RULE-ADRC-073

Toda ambigüedad detectada debe convertirse en una definición normativa.

RULE-ADRC-074

Toda aprobación crítica debe ser independiente y vinculada al contenido revisado.

RULE-ADRC-075

Todo registro debe poder ser implementado por otro equipo o una LLM sin conocimiento implícito.

RULE-ADRC-076

Toda decisión debe poseer identificador estable, estado, owner, versión y fecha.

RULE-ADRC-077

Toda decisión debe documentar contexto, problema, restricciones, alternativas y consecuencias.

RULE-ADRC-078

Toda decisión crítica debe vincular requisitos, criterios de aceptación y pruebas.

RULE-ADRC-079

Toda decisión sustituida debe conservar historial y referenciar su reemplazo.

RULE-ADRC-080

Toda excepción temporal debe tener expires_at, controles compensatorios y plan de eliminación.

## 23. Contrato JSON de referencia

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

## 24. Flujo de gobierno

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

## 25. Pseudocódigo

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

## 26. Errores funcionales

ADRC_RECORD_INVALID

ADRC_IDENTIFIER_INVALID

ADRC_IDENTIFIER_DUPLICATE

ADRC_OWNER_REQUIRED

ADRC_STATUS_INVALID

ADRC_VERSION_CONFLICT

ADRC_CONTEXT_INCOMPLETE

ADRC_ALTERNATIVES_INCOMPLETE

ADRC_CONSEQUENCES_INCOMPLETE

ADRC_SECURITY_IMPLICATION_MISSING

ADRC_TENANT_IMPLICATION_MISSING

ADRC_RECOVERY_IMPLICATION_MISSING

ADRC_CROSS_REFERENCE_NOT_FOUND

ADRC_TRACEABILITY_INCOMPLETE

ADRC_TERM_AMBIGUOUS

ADRC_TERM_DUPLICATE

ADRC_DEFINITION_CONFLICT

ADRC_SUPERSESSION_INVALID

ADRC_APPROVAL_REQUIRED

ADRC_APPROVAL_INVALID

ADRC_AUDIT_PERSISTENCE_FAILED

## 27. Eventos

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

## 28. Casos límite y pruebas adversariales

TEST-ADRC-001

Verificar dos registros utilizan el mismo identificador. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-002

Verificar un owner deja de existir. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-003

Verificar una referencia apunta a un documento inexistente. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-004

Verificar dos términos tienen definiciones incompatibles. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-005

Verificar una decisión sustituida vuelve a estado vigente. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-006

Verificar una definición cambia sin incrementar versión. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-007

Verificar un ADR crítico no posee pruebas. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-008

Verificar una excepción temporal expira. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-009

Verificar una decisión omite tenant isolation. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-010

Verificar una decisión omite recovery. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-011

Verificar una LLM utiliza un término fuera de su definición. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-012

Verificar un evento posee dos significados. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-013

Verificar un código de error se reutiliza. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-014

Verificar un estado se usa fuera de su máquina de estados. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-015

Verificar un documento se publica con referencias rotas. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-016

Verificar una decisión se autoaprueba. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-017

Verificar un requisito carece de prueba. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-018

Verificar un test apunta a un criterio inexistente. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-019

Verificar un término obsoleto continúa en documentos activos. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-020

Verificar un documento cambia sin historial. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-021

Verificar un ADR contradice una regla de seguridad. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-022

Verificar un RFC propone una operación no idempotente. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-023

Verificar un glosario mezcla ID interno y referencia externa. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-024

Verificar un término UNKNOWN se interpreta como FAILED. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

TEST-ADRC-025

Verificar una excepción carece de cleanup plan. El resultado debe preservar historial, trazabilidad, semántica, seguridad y consistencia.

## 29. Criterios de aceptación

AC-ADRC-001

Todo registro posee identificador estable.

AC-ADRC-002

Todo registro posee owner.

AC-ADRC-003

Toda decisión documenta contexto.

AC-ADRC-004

Toda decisión documenta alternativas.

AC-ADRC-005

Toda decisión documenta consecuencias.

AC-ADRC-006

Toda decisión crítica vincula pruebas.

AC-ADRC-007

Toda referencia apunta a un objetivo existente.

AC-ADRC-008

Toda definición es normativa.

AC-ADRC-009

Toda sustitución conserva historial.

AC-ADRC-010

Toda modificación incrementa versión.

AC-ADRC-011

Toda ambigüedad se detecta.

AC-ADRC-012

Toda excepción posee expiración.

AC-ADRC-013

Toda decisión documenta seguridad.

AC-ADRC-014

Toda decisión documenta recuperación.

AC-ADRC-015

Toda operación documental es auditable.

AC-ADRC-016

Todo registro posee identificador estable.

AC-ADRC-017

Todo registro posee owner.

AC-ADRC-018

Toda decisión documenta contexto.

AC-ADRC-019

Toda decisión documenta alternativas.

AC-ADRC-020

Toda decisión documenta consecuencias.

AC-ADRC-021

Toda decisión crítica vincula pruebas.

AC-ADRC-022

Toda referencia apunta a un objetivo existente.

AC-ADRC-023

Toda definición es normativa.

AC-ADRC-024

Toda sustitución conserva historial.

AC-ADRC-025

Toda modificación incrementa versión.

AC-ADRC-026

Toda ambigüedad se detecta.

AC-ADRC-027

Toda excepción posee expiración.

AC-ADRC-028

Toda decisión documenta seguridad.

AC-ADRC-029

Toda decisión documenta recuperación.

AC-ADRC-030

Toda operación documental es auditable.

AC-ADRC-031

Todo registro posee identificador estable.

AC-ADRC-032

Todo registro posee owner.

AC-ADRC-033

Toda decisión documenta contexto.

AC-ADRC-034

Toda decisión documenta alternativas.

AC-ADRC-035

Toda decisión documenta consecuencias.

AC-ADRC-036

Toda decisión crítica vincula pruebas.

AC-ADRC-037

Toda referencia apunta a un objetivo existente.

AC-ADRC-038

Toda definición es normativa.

AC-ADRC-039

Toda sustitución conserva historial.

AC-ADRC-040

Toda modificación incrementa versión.

AC-ADRC-041

Toda ambigüedad se detecta.

AC-ADRC-042

Toda excepción posee expiración.

AC-ADRC-043

Toda decisión documenta seguridad.

AC-ADRC-044

Toda decisión documenta recuperación.

AC-ADRC-045

Toda operación documental es auditable.

AC-ADRC-046

Todo registro posee identificador estable.

AC-ADRC-047

Todo registro posee owner.

AC-ADRC-048

Toda decisión documenta contexto.

AC-ADRC-049

Toda decisión documenta alternativas.

AC-ADRC-050

Toda decisión documenta consecuencias.

AC-ADRC-051

Toda decisión crítica vincula pruebas.

AC-ADRC-052

Toda referencia apunta a un objetivo existente.

AC-ADRC-053

Toda definición es normativa.

AC-ADRC-054

Toda sustitución conserva historial.

AC-ADRC-055

Toda modificación incrementa versión.

AC-ADRC-056

Toda ambigüedad se detecta.

AC-ADRC-057

Toda excepción posee expiración.

AC-ADRC-058

Toda decisión documenta seguridad.

AC-ADRC-059

Toda decisión documenta recuperación.

AC-ADRC-060

Toda operación documental es auditable.

AC-ADRC-061

Todo registro posee identificador estable.

AC-ADRC-062

Todo registro posee owner.

AC-ADRC-063

Toda decisión documenta contexto.

AC-ADRC-064

Toda decisión documenta alternativas.

AC-ADRC-065

Toda decisión documenta consecuencias.

AC-ADRC-066

Toda decisión crítica vincula pruebas.

AC-ADRC-067

Toda referencia apunta a un objetivo existente.

AC-ADRC-068

Toda definición es normativa.

AC-ADRC-069

Toda sustitución conserva historial.

AC-ADRC-070

Toda modificación incrementa versión.

AC-ADRC-071

Toda ambigüedad se detecta.

AC-ADRC-072

Toda excepción posee expiración.

AC-ADRC-073

Toda decisión documenta seguridad.

AC-ADRC-074

Toda decisión documenta recuperación.

AC-ADRC-075

Toda operación documental es auditable.

AC-ADRC-076

Todo registro posee identificador estable.

AC-ADRC-077

Todo registro posee owner.

AC-ADRC-078

Toda decisión documenta contexto.

AC-ADRC-079

Toda decisión documenta alternativas.

AC-ADRC-080

Toda decisión documenta consecuencias.

## 30. Checklist final

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
