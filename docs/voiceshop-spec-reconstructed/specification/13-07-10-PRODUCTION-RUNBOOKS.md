======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-07-10-PRODUCTION-RUNBOOKS.md

# RUNBOOKS DE PRODUCCIÓN

## 1. Objetivo

Define el formato y los procedimientos operativos reproducibles para diagnosticar, contener, recuperar y verificar fallos de producción.

## 2. Alcance

Incluye formato de runbook, diagnóstico, acciones seguras, escalación, comunicación, rollback, verificación, evidencia y procedimientos para API, Realtime, DB, Redis, colas, providers, pagos, inventario y seguridad.

## 3. Estructura estándar

Todo runbook contiene ID, título, objetivo, severidad, owner, prerequisites, signals, diagnosis, actions, stop conditions, rollback, verification, escalation, communication y evidence.

## 4. Precondiciones

Antes de ejecutar se valida entorno, tenant scope, actor, assurance, permisos, incident context, versiones, backups, dependencias y approvals.

## 5. Comandos

Los comandos deben ser allowlisted, parametrizados, no destructivos por defecto y acompañados de dry run cuando sea posible.

## 6. Stop conditions

El runbook debe detenerse ante tenant mismatch, secreto inválido, cambio de versión, evidencia contradictoria, riesgo creciente, UNKNOWN no conciliado o pérdida de control.

## 7. Rollback

Cada paso crítico declara cómo revertirlo o contenerlo. Los rollbacks deben ser idempotentes y no restaurar estados inseguros.

## 8. Verificación

Después de cada acción se verifica health, readiness, SLO, backlog, error rate, data integrity y experiencia del usuario.

## 9. Escalación

El runbook define cuándo escalar a Incident Commander, Security, Database, Provider, Payment, Privacy o Tenant Liaison.

## 10. Comunicación

Los mensajes deben usar hechos confirmados, impacto, acciones, próximos pasos y timestamp. No deben inventar causa o tiempo de resolución.

## 11. Runbook API degradation

Incluye comprobación de gateway, pods, dependencies, DB pool, Redis, queue, provider, error codes, canary, rollback y load shedding.

## 12. Runbook Realtime degradation

Incluye conexiones, token issuance, signaling, bitrate, provider health, stale generations, reconnect storm, fallback a texto y circuit breaker.

## 13. Runbook database saturation

Incluye conexiones, slow queries, locks, deadlocks, IOPS, WAL, replicas, pool limits, traffic reduction y escalation.

## 14. Runbook queue backlog

Incluye queue depth, oldest age, consumers, failures, DLQ, dependency health, scaling, message age y safe replay.

## 15. Runbook payment UNKNOWN

Incluye idempotency, provider reference, webhook inbox, status query, ledger, block duplicate effect, reconciliation y human review.

## 16. Runbook security incident

Incluye containment, secret revocation, session termination, provider disable, evidence preservation, tenant isolation y incident declaration.

## 17. Reglas normativas

RULE-PRUN-001

Toda señal operativa debe ser estructurada, correlacionable y redactada.

RULE-PRUN-002

Toda capacidad debe medirse antes de agotarse y debe tener umbrales explícitos.

RULE-PRUN-003

Toda operación productiva debe poseer runbook, owner y criterios de escalación.

RULE-PRUN-004

Las métricas deben evitar alta cardinalidad y datos sensibles.

RULE-PRUN-005

Toda alerta debe ser accionable, deduplicada y vinculada a un runbook.

RULE-PRUN-006

Toda degradación debe ser visible y preservar seguridad y consistencia.

RULE-PRUN-007

Todo escalamiento debe considerar CPU, memoria, red, conexiones, colas, locks y dependencias.

RULE-PRUN-008

Todo autoscaling debe tener límites mínimos, máximos, cooldown y protección contra oscilación.

RULE-PRUN-009

Todo procedimiento debe poder ejecutarse de forma reproducible por otro Operador o una LLM.

RULE-PRUN-010

Todo resultado UNKNOWN debe tener owner, deadline y reconciliación.

RULE-PRUN-011

Toda intervención manual debe ser autorizada y auditable.

RULE-PRUN-012

Los tenants deben permanecer aislados en métricas, capacidad, cuotas y procedimientos.

RULE-PRUN-013

Toda operación de emergencia debe expirar y ser revisada.

RULE-PRUN-014

Toda prueba de capacidad debe usar datos sintéticos o controles seguros.

RULE-PRUN-015

Toda restauración del servicio debe verificar postcondiciones funcionales.

RULE-PRUN-016

Toda señal operativa debe ser estructurada, correlacionable y redactada.

RULE-PRUN-017

Toda capacidad debe medirse antes de agotarse y debe tener umbrales explícitos.

RULE-PRUN-018

Toda operación productiva debe poseer runbook, owner y criterios de escalación.

RULE-PRUN-019

Las métricas deben evitar alta cardinalidad y datos sensibles.

RULE-PRUN-020

Toda alerta debe ser accionable, deduplicada y vinculada a un runbook.

RULE-PRUN-021

Toda degradación debe ser visible y preservar seguridad y consistencia.

RULE-PRUN-022

Todo escalamiento debe considerar CPU, memoria, red, conexiones, colas, locks y dependencias.

RULE-PRUN-023

Todo autoscaling debe tener límites mínimos, máximos, cooldown y protección contra oscilación.

RULE-PRUN-024

Todo procedimiento debe poder ejecutarse de forma reproducible por otro Operador o una LLM.

RULE-PRUN-025

Todo resultado UNKNOWN debe tener owner, deadline y reconciliación.

RULE-PRUN-026

Toda intervención manual debe ser autorizada y auditable.

RULE-PRUN-027

Los tenants deben permanecer aislados en métricas, capacidad, cuotas y procedimientos.

RULE-PRUN-028

Toda operación de emergencia debe expirar y ser revisada.

RULE-PRUN-029

Toda prueba de capacidad debe usar datos sintéticos o controles seguros.

RULE-PRUN-030

Toda restauración del servicio debe verificar postcondiciones funcionales.

RULE-PRUN-031

Toda señal operativa debe ser estructurada, correlacionable y redactada.

RULE-PRUN-032

Toda capacidad debe medirse antes de agotarse y debe tener umbrales explícitos.

RULE-PRUN-033

Toda operación productiva debe poseer runbook, owner y criterios de escalación.

RULE-PRUN-034

Las métricas deben evitar alta cardinalidad y datos sensibles.

RULE-PRUN-035

Toda alerta debe ser accionable, deduplicada y vinculada a un runbook.

RULE-PRUN-036

Toda degradación debe ser visible y preservar seguridad y consistencia.

RULE-PRUN-037

Todo escalamiento debe considerar CPU, memoria, red, conexiones, colas, locks y dependencias.

RULE-PRUN-038

Todo autoscaling debe tener límites mínimos, máximos, cooldown y protección contra oscilación.

RULE-PRUN-039

Todo procedimiento debe poder ejecutarse de forma reproducible por otro Operador o una LLM.

RULE-PRUN-040

Todo resultado UNKNOWN debe tener owner, deadline y reconciliación.

RULE-PRUN-041

Toda intervención manual debe ser autorizada y auditable.

RULE-PRUN-042

Los tenants deben permanecer aislados en métricas, capacidad, cuotas y procedimientos.

RULE-PRUN-043

Toda operación de emergencia debe expirar y ser revisada.

RULE-PRUN-044

Toda prueba de capacidad debe usar datos sintéticos o controles seguros.

RULE-PRUN-045

Toda restauración del servicio debe verificar postcondiciones funcionales.

RULE-PRUN-046

Toda señal operativa debe ser estructurada, correlacionable y redactada.

RULE-PRUN-047

Toda capacidad debe medirse antes de agotarse y debe tener umbrales explícitos.

RULE-PRUN-048

Toda operación productiva debe poseer runbook, owner y criterios de escalación.

RULE-PRUN-049

Las métricas deben evitar alta cardinalidad y datos sensibles.

RULE-PRUN-050

Toda alerta debe ser accionable, deduplicada y vinculada a un runbook.

RULE-PRUN-051

Toda degradación debe ser visible y preservar seguridad y consistencia.

RULE-PRUN-052

Todo escalamiento debe considerar CPU, memoria, red, conexiones, colas, locks y dependencias.

RULE-PRUN-053

Todo autoscaling debe tener límites mínimos, máximos, cooldown y protección contra oscilación.

RULE-PRUN-054

Todo procedimiento debe poder ejecutarse de forma reproducible por otro Operador o una LLM.

RULE-PRUN-055

Todo resultado UNKNOWN debe tener owner, deadline y reconciliación.

RULE-PRUN-056

Toda intervención manual debe ser autorizada y auditable.

RULE-PRUN-057

Los tenants deben permanecer aislados en métricas, capacidad, cuotas y procedimientos.

RULE-PRUN-058

Toda operación de emergencia debe expirar y ser revisada.

RULE-PRUN-059

Toda prueba de capacidad debe usar datos sintéticos o controles seguros.

RULE-PRUN-060

Toda restauración del servicio debe verificar postcondiciones funcionales.

## 18. Contrato JSON de referencia

```json
{
  "operation_id": "UUID",
  "environment": "PRODUCTION",
  "tenant_scope": "UUID_OR_GLOBAL",
  "service": "VOICE-ORCHESTRATOR",
  "runbook_id": "RUNBOOK-STRING",
  "expected_state_version": 5,
  "reason_code": "AUTHORIZED_OPERATION",
  "approval_reference": "UUID_OR_NULL",
  "idempotency_key": "STRING",
  "correlation_id": "UUID",
  "requested_at": "UTC_TIMESTAMP"
}
```

## 19. Flujo funcional

1. Recibir señal, solicitud o alerta.
2. Validar schema, entorno y tenant scope.
3. Autenticar al actor o servicio.
4. Autorizar la operación.
5. Cargar estado operativo y versiones.
6. Validar expected state version.
7. Construir diagnóstico o preview.
8. Evaluar riesgo, impacto y aprobación.
9. Consultar idempotencia.
10. Ejecutar la acción controlada.
11. Medir salud, capacidad y saturación.
12. Validar postcondiciones.
13. Persistir auditoría y evidencia.
14. Emitir eventos.
15. Actualizar dashboards, métricas y trazas.
16. Escalar o conciliar si el resultado es incierto.
17. Cerrar el procedimiento con resultado y seguimiento.

## 20. Pseudocódigo

```text
function execute_operational_runbook(command):

    validate_command_schema(command)
    validate_environment_and_tenant_scope(command)

    identity = authenticate_actor_or_service(
        command.actor_or_service_id
    )

    authorize_runbook_execution(
        identity=identity,
        runbook_id=command.runbook_id,
        environment=command.environment,
        tenant_scope=command.tenant_scope
    )

    current = load_operational_state(command.service)

    validate_expected_state_version(
        current.version,
        command.expected_state_version
    )

    diagnosis = collect_operational_diagnosis(
        service=command.service,
        correlation_id=command.correlation_id
    )

    plan = build_safe_execution_plan(
        command,
        current,
        diagnosis
    )

    validate_reason_and_evidence(command, plan)

    if plan.approval_required:
        validate_single_use_approval(
            command.approval_reference,
            hash_runbook_payload(command, plan)
        )

    previous = get_idempotent_result(
        command.idempotency_key
    )

    if previous.exists:
        return previous

    result = execute_bounded_runbook_steps(
        command,
        plan
    )

    postconditions = verify_service_health_capacity_and_consistency(
        command.service,
        result
    )

    persist_result_audit_and_evidence(
        command,
        result,
        postconditions
    )

    emit_operational_events(result, postconditions)

    if result.status == UNKNOWN:
        schedule_operational_reconciliation(command)

    return build_safe_operational_result(
        result,
        postconditions
    )
```

## 21. Errores funcionales

PRUN_REQUEST_INVALID

PRUN_AUTHENTICATION_REQUIRED

PRUN_AUTHORIZATION_DENIED

PRUN_ENVIRONMENT_SCOPE_DENIED

PRUN_TENANT_SCOPE_DENIED

PRUN_SERVICE_NOT_FOUND

PRUN_RUNBOOK_NOT_FOUND

PRUN_STATE_VERSION_CONFLICT

PRUN_APPROVAL_REQUIRED

PRUN_APPROVAL_INVALID

PRUN_IDEMPOTENCY_CONFLICT

PRUN_DIAGNOSIS_INCOMPLETE

PRUN_ALERT_CONTEXT_INVALID

PRUN_CAPACITY_DATA_UNAVAILABLE

PRUN_SCALE_LIMIT_REACHED

PRUN_DEPENDENCY_UNAVAILABLE

PRUN_TIMEOUT

PRUN_RESULT_UNKNOWN

PRUN_POSTCONDITION_FAILED

PRUN_RUNBOOK_STEP_FAILED

PRUN_AUDIT_PERSISTENCE_FAILED

PRUN_SECURITY_POLICY_DENIED

## 22. Eventos

OperationalSignalReceived

OperationalDiagnosisStarted

OperationalDiagnosisCompleted

RunbookExecutionRequested

RunbookApprovalRequested

RunbookExecutionStarted

RunbookStepCompleted

RunbookExecutionCompleted

RunbookExecutionFailed

RunbookResultMarkedUnknown

CapacityThresholdExceeded

ScalingRequested

ScalingCompleted

ScalingFailed

AlertTriggered

AlertResolved

OperationalEscalationRequested

OperationalAuditEvidenceRecorded

## 23. Observabilidad

- 13_07_10_production_runbooks_requests_total;
- 13_07_10_production_runbooks_success_total;
- 13_07_10_production_runbooks_failure_total;
- 13_07_10_production_runbooks_duration_seconds;
- 13_07_10_production_runbooks_alerts_total;
- 13_07_10_production_runbooks_alert_ack_seconds;
- 13_07_10_production_runbooks_alert_resolution_seconds;
- 13_07_10_production_runbooks_capacity_threshold_total;
- 13_07_10_production_runbooks_scale_requests_total;
- 13_07_10_production_runbooks_scale_success_total;
- 13_07_10_production_runbooks_scale_failure_total;
- 13_07_10_production_runbooks_runbook_executions_total;
- 13_07_10_production_runbooks_runbook_step_failure_total;
- 13_07_10_production_runbooks_unknown_total;
- 13_07_10_production_runbooks_postcondition_failure_total;
- 13_07_10_production_runbooks_audit_failure_total;

Dimensiones permitidas:

- environment;
- service_class;
- operation;
- alert_class;
- result;
- error_code;
- tenant_tier.

No usar IDs únicos, secretos, tokens, correos, nombres, URLs completas o payloads como etiquetas.

## 24. Seguridad

- Mínimo privilegio y segregación de funciones.
- MFA o step-up para producción.
- Runbooks con comandos allowlisted.
- Secretos sólo por referencias.
- Redacción de logs, traces y evidencias.
- Aprobaciones single-use vinculadas al payload.
- Break-glass con expiración y revisión.
- Protección contra comandos arbitrarios.
- Rate limits y límites de ejecución.
- Aislamiento por tenant y entorno.
- Auditoría de lecturas y acciones.
- Contención automática ante señales críticas.

## 25. Casos límite y pruebas adversariales

TEST-PRUN-001: verificar una alerta se dispara repetidamente; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-002: verificar dos Operadores ejecutan el mismo runbook; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-003: verificar la aprobación expira antes del paso crítico; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-004: verificar el actor pierde el permiso; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-005: verificar el tenant queda suspendido; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-006: verificar las métricas llegan retrasadas; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-007: verificar el autoscaler oscila; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-008: verificar el límite máximo de réplicas se alcanza; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-009: verificar la dependencia externa queda degradada; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-010: verificar el resultado del runbook queda UNKNOWN; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-011: verificar una acción manual rompe una postcondición; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-012: verificar la auditoría se degrada; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-013: verificar un evento se duplica; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-014: verificar un evento llega fuera de orden; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-015: verificar la cola crece mientras el autoscaler reacciona; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-016: verificar la base de datos agota conexiones; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-017: verificar Redis alcanza memoria máxima; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-018: verificar una zona completa falla; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-019: verificar el health check es verde pero la función falla; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-020: verificar un runbook contiene un comando no permitido; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-021: verificar un actor intenta acceder a otro tenant; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-022: verificar un dashboard muestra datos stale; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-023: verificar un escalamiento aumenta coste sin mejorar throughput; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-024: verificar el servicio se recupera y genera stampede; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-PRUN-025: verificar el rollback del runbook falla; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

## 26. Criterios de aceptación

AC-PRUN-001

Toda señal es estructurada y correlacionable.

AC-PRUN-002

Toda alerta es accionable.

AC-PRUN-003

Toda alerta tiene owner y runbook.

AC-PRUN-004

Toda métrica evita alta cardinalidad.

AC-PRUN-005

Toda capacidad posee umbrales.

AC-PRUN-006

Todo autoscaling tiene límites.

AC-PRUN-007

Todo runbook está autorizado.

AC-PRUN-008

Todo runbook es reproducible.

AC-PRUN-009

Toda operación crítica exige approval.

AC-PRUN-010

Todo resultado UNKNOWN se concilia.

AC-PRUN-011

Toda restauración verifica postcondiciones.

AC-PRUN-012

Los secretos no se exponen.

AC-PRUN-013

Los tenants se aíslan.

AC-PRUN-014

Toda acción es auditable.

AC-PRUN-015

Toda degradación es visible.

AC-PRUN-016

Toda señal es estructurada y correlacionable.

AC-PRUN-017

Toda alerta es accionable.

AC-PRUN-018

Toda alerta tiene owner y runbook.

AC-PRUN-019

Toda métrica evita alta cardinalidad.

AC-PRUN-020

Toda capacidad posee umbrales.

AC-PRUN-021

Todo autoscaling tiene límites.

AC-PRUN-022

Todo runbook está autorizado.

AC-PRUN-023

Todo runbook es reproducible.

AC-PRUN-024

Toda operación crítica exige approval.

AC-PRUN-025

Todo resultado UNKNOWN se concilia.

AC-PRUN-026

Toda restauración verifica postcondiciones.

AC-PRUN-027

Los secretos no se exponen.

AC-PRUN-028

Los tenants se aíslan.

AC-PRUN-029

Toda acción es auditable.

AC-PRUN-030

Toda degradación es visible.

AC-PRUN-031

Toda señal es estructurada y correlacionable.

AC-PRUN-032

Toda alerta es accionable.

AC-PRUN-033

Toda alerta tiene owner y runbook.

AC-PRUN-034

Toda métrica evita alta cardinalidad.

AC-PRUN-035

Toda capacidad posee umbrales.

AC-PRUN-036

Todo autoscaling tiene límites.

AC-PRUN-037

Todo runbook está autorizado.

AC-PRUN-038

Todo runbook es reproducible.

AC-PRUN-039

Toda operación crítica exige approval.

AC-PRUN-040

Todo resultado UNKNOWN se concilia.

AC-PRUN-041

Toda restauración verifica postcondiciones.

AC-PRUN-042

Los secretos no se exponen.

AC-PRUN-043

Los tenants se aíslan.

AC-PRUN-044

Toda acción es auditable.

AC-PRUN-045

Toda degradación es visible.

AC-PRUN-046

Toda señal es estructurada y correlacionable.

AC-PRUN-047

Toda alerta es accionable.

AC-PRUN-048

Toda alerta tiene owner y runbook.

AC-PRUN-049

Toda métrica evita alta cardinalidad.

AC-PRUN-050

Toda capacidad posee umbrales.

AC-PRUN-051

Todo autoscaling tiene límites.

AC-PRUN-052

Todo runbook está autorizado.

AC-PRUN-053

Todo runbook es reproducible.

AC-PRUN-054

Toda operación crítica exige approval.

AC-PRUN-055

Todo resultado UNKNOWN se concilia.

AC-PRUN-056

Toda restauración verifica postcondiciones.

AC-PRUN-057

Los secretos no se exponen.

AC-PRUN-058

Los tenants se aíslan.

AC-PRUN-059

Toda acción es auditable.

AC-PRUN-060

Toda degradación es visible.

## 27. Checklist final

[ ] Existe Signal Contract.
[ ] Existe Correlation ID.
[ ] Existe Alert Contract.
[ ] Existe owner.
[ ] Existe runbook.
[ ] Existe severity.
[ ] Existe deduplication.
[ ] Existe escalation.
[ ] Existe capacity model.
[ ] Existe autoscaling policy.
[ ] Existe min/max.
[ ] Existe cooldown.
[ ] Existe saturation metric.
[ ] Existe cost guardrail.
[ ] Existe approval policy.
[ ] Existe idempotency.
[ ] Existe postcondition verification.
[ ] Existe UNKNOWN policy.
[ ] Existen errores.
[ ] Existen eventos.
[ ] Existen métricas.
[ ] Existen trazas.
[ ] Existen dashboards.
[ ] Existe auditoría.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
