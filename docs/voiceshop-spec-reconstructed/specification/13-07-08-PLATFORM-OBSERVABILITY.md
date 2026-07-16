======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-07-08-PLATFORM-OBSERVABILITY.md

# OBSERVABILIDAD DE PLATAFORMA

## 1. Objetivo

Define logs, métricas, trazas, dashboards, alertas, SLO, error budgets, sampling, retención y operación del sistema de observabilidad.

## 2. Alcance

Incluye logs estructurados, métricas, trazas, perfiles, dashboards, alertas, SLO, error budgets, synthetic checks, sampling, cardinalidad, retención, redacción, coste, audit y QA de plataforma.

## 3. Pilares

Logs explican eventos discretos; métricas muestran tendencias; trazas conectan operaciones distribuidas; perfiles identifican consumo; auditoría registra acciones privilegiadas. Ningún pilar sustituye a los demás.

## 4. Correlation

Toda solicitud, Session, Turn, Command, provider call, webhook, worker job y admin action debe propagar Correlation ID y, cuando corresponda, Causation ID.

## 5. Logs

Los logs deben incluir timestamp UTC, service, component, environment, tenant tier, operation, result, duration, error code y trace context. Los payloads completos se excluyen por defecto.

## 6. Métricas RED y USE

RED mide rate, errors y duration para servicios. USE mide utilization, saturation y errors para recursos. Deben combinarse para evitar diagnósticos parciales.

## 7. Trazas

Los spans deben cubrir gateway, authentication, authorization, orchestration, domain, database, Redis, queue, provider, webhook, outbox, notification y reconciliation.

## 8. Sampling

Se recolecta al 100% seguridad, pagos, UNKNOWN, cross-tenant, data integrity, incidentes y fallos de reconciliación. Las lecturas exitosas de alta frecuencia pueden samplearse.

## 9. Cardinalidad

No usar Session ID, User ID, Order ID, Payment ID, Product ID, Correlation ID o URL completa como labels. Estas referencias pertenecen a logs y trazas protegidas.

## 10. Dashboards

Deben existir vistas de experiencia, voz, APIs, base de datos, Redis, colas, providers, pagos, inventario, seguridad, costes, SLO y capacidad.

## 11. Alertas

Las alertas se basan en impacto, burn rate, saturación, backlog, UNKNOWN age, errores, seguridad y disponibilidad. Deben incluir owner, severity, runbook y recovery condition.

## 12. SLO y error budgets

Los SLO deben ser medibles y vinculados a SLIs. Los error budgets gobiernan velocidad de release, prioridades de fiabilidad y acciones de contención.

## 13. Synthetic checks

Los checks sintéticos deben ser no comerciales o usar tenants y recursos de prueba aislados. Nunca deben aprobar pagos ni alterar inventario real.

## 14. Retención

Cada señal declara retención, acceso, región, clasificación y eliminación. Debug temporal debe expirar automáticamente.

## 15. Degradación

La caída del backend de observabilidad no debe detener operaciones críticas. Debe existir buffer limitado y priorización de señales críticas.

## 16. Reglas normativas

RULE-POBS-001

Toda señal operativa debe ser estructurada, correlacionable y redactada.

RULE-POBS-002

Toda capacidad debe medirse antes de agotarse y debe tener umbrales explícitos.

RULE-POBS-003

Toda operación productiva debe poseer runbook, owner y criterios de escalación.

RULE-POBS-004

Las métricas deben evitar alta cardinalidad y datos sensibles.

RULE-POBS-005

Toda alerta debe ser accionable, deduplicada y vinculada a un runbook.

RULE-POBS-006

Toda degradación debe ser visible y preservar seguridad y consistencia.

RULE-POBS-007

Todo escalamiento debe considerar CPU, memoria, red, conexiones, colas, locks y dependencias.

RULE-POBS-008

Todo autoscaling debe tener límites mínimos, máximos, cooldown y protección contra oscilación.

RULE-POBS-009

Todo procedimiento debe poder ejecutarse de forma reproducible por otro Operador o una LLM.

RULE-POBS-010

Todo resultado UNKNOWN debe tener owner, deadline y reconciliación.

RULE-POBS-011

Toda intervención manual debe ser autorizada y auditable.

RULE-POBS-012

Los tenants deben permanecer aislados en métricas, capacidad, cuotas y procedimientos.

RULE-POBS-013

Toda operación de emergencia debe expirar y ser revisada.

RULE-POBS-014

Toda prueba de capacidad debe usar datos sintéticos o controles seguros.

RULE-POBS-015

Toda restauración del servicio debe verificar postcondiciones funcionales.

RULE-POBS-016

Toda señal operativa debe ser estructurada, correlacionable y redactada.

RULE-POBS-017

Toda capacidad debe medirse antes de agotarse y debe tener umbrales explícitos.

RULE-POBS-018

Toda operación productiva debe poseer runbook, owner y criterios de escalación.

RULE-POBS-019

Las métricas deben evitar alta cardinalidad y datos sensibles.

RULE-POBS-020

Toda alerta debe ser accionable, deduplicada y vinculada a un runbook.

RULE-POBS-021

Toda degradación debe ser visible y preservar seguridad y consistencia.

RULE-POBS-022

Todo escalamiento debe considerar CPU, memoria, red, conexiones, colas, locks y dependencias.

RULE-POBS-023

Todo autoscaling debe tener límites mínimos, máximos, cooldown y protección contra oscilación.

RULE-POBS-024

Todo procedimiento debe poder ejecutarse de forma reproducible por otro Operador o una LLM.

RULE-POBS-025

Todo resultado UNKNOWN debe tener owner, deadline y reconciliación.

RULE-POBS-026

Toda intervención manual debe ser autorizada y auditable.

RULE-POBS-027

Los tenants deben permanecer aislados en métricas, capacidad, cuotas y procedimientos.

RULE-POBS-028

Toda operación de emergencia debe expirar y ser revisada.

RULE-POBS-029

Toda prueba de capacidad debe usar datos sintéticos o controles seguros.

RULE-POBS-030

Toda restauración del servicio debe verificar postcondiciones funcionales.

RULE-POBS-031

Toda señal operativa debe ser estructurada, correlacionable y redactada.

RULE-POBS-032

Toda capacidad debe medirse antes de agotarse y debe tener umbrales explícitos.

RULE-POBS-033

Toda operación productiva debe poseer runbook, owner y criterios de escalación.

RULE-POBS-034

Las métricas deben evitar alta cardinalidad y datos sensibles.

RULE-POBS-035

Toda alerta debe ser accionable, deduplicada y vinculada a un runbook.

RULE-POBS-036

Toda degradación debe ser visible y preservar seguridad y consistencia.

RULE-POBS-037

Todo escalamiento debe considerar CPU, memoria, red, conexiones, colas, locks y dependencias.

RULE-POBS-038

Todo autoscaling debe tener límites mínimos, máximos, cooldown y protección contra oscilación.

RULE-POBS-039

Todo procedimiento debe poder ejecutarse de forma reproducible por otro Operador o una LLM.

RULE-POBS-040

Todo resultado UNKNOWN debe tener owner, deadline y reconciliación.

RULE-POBS-041

Toda intervención manual debe ser autorizada y auditable.

RULE-POBS-042

Los tenants deben permanecer aislados en métricas, capacidad, cuotas y procedimientos.

RULE-POBS-043

Toda operación de emergencia debe expirar y ser revisada.

RULE-POBS-044

Toda prueba de capacidad debe usar datos sintéticos o controles seguros.

RULE-POBS-045

Toda restauración del servicio debe verificar postcondiciones funcionales.

RULE-POBS-046

Toda señal operativa debe ser estructurada, correlacionable y redactada.

RULE-POBS-047

Toda capacidad debe medirse antes de agotarse y debe tener umbrales explícitos.

RULE-POBS-048

Toda operación productiva debe poseer runbook, owner y criterios de escalación.

RULE-POBS-049

Las métricas deben evitar alta cardinalidad y datos sensibles.

RULE-POBS-050

Toda alerta debe ser accionable, deduplicada y vinculada a un runbook.

RULE-POBS-051

Toda degradación debe ser visible y preservar seguridad y consistencia.

RULE-POBS-052

Todo escalamiento debe considerar CPU, memoria, red, conexiones, colas, locks y dependencias.

RULE-POBS-053

Todo autoscaling debe tener límites mínimos, máximos, cooldown y protección contra oscilación.

RULE-POBS-054

Todo procedimiento debe poder ejecutarse de forma reproducible por otro Operador o una LLM.

RULE-POBS-055

Todo resultado UNKNOWN debe tener owner, deadline y reconciliación.

RULE-POBS-056

Toda intervención manual debe ser autorizada y auditable.

RULE-POBS-057

Los tenants deben permanecer aislados en métricas, capacidad, cuotas y procedimientos.

RULE-POBS-058

Toda operación de emergencia debe expirar y ser revisada.

RULE-POBS-059

Toda prueba de capacidad debe usar datos sintéticos o controles seguros.

RULE-POBS-060

Toda restauración del servicio debe verificar postcondiciones funcionales.

## 17. Contrato JSON de referencia

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

## 18. Flujo funcional

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

## 19. Pseudocódigo

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

## 20. Errores funcionales

POBS_REQUEST_INVALID

POBS_AUTHENTICATION_REQUIRED

POBS_AUTHORIZATION_DENIED

POBS_ENVIRONMENT_SCOPE_DENIED

POBS_TENANT_SCOPE_DENIED

POBS_SERVICE_NOT_FOUND

POBS_RUNBOOK_NOT_FOUND

POBS_STATE_VERSION_CONFLICT

POBS_APPROVAL_REQUIRED

POBS_APPROVAL_INVALID

POBS_IDEMPOTENCY_CONFLICT

POBS_DIAGNOSIS_INCOMPLETE

POBS_ALERT_CONTEXT_INVALID

POBS_CAPACITY_DATA_UNAVAILABLE

POBS_SCALE_LIMIT_REACHED

POBS_DEPENDENCY_UNAVAILABLE

POBS_TIMEOUT

POBS_RESULT_UNKNOWN

POBS_POSTCONDITION_FAILED

POBS_RUNBOOK_STEP_FAILED

POBS_AUDIT_PERSISTENCE_FAILED

POBS_SECURITY_POLICY_DENIED

## 21. Eventos

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

## 22. Observabilidad

- 13_07_08_platform_observability_requests_total;
- 13_07_08_platform_observability_success_total;
- 13_07_08_platform_observability_failure_total;
- 13_07_08_platform_observability_duration_seconds;
- 13_07_08_platform_observability_alerts_total;
- 13_07_08_platform_observability_alert_ack_seconds;
- 13_07_08_platform_observability_alert_resolution_seconds;
- 13_07_08_platform_observability_capacity_threshold_total;
- 13_07_08_platform_observability_scale_requests_total;
- 13_07_08_platform_observability_scale_success_total;
- 13_07_08_platform_observability_scale_failure_total;
- 13_07_08_platform_observability_runbook_executions_total;
- 13_07_08_platform_observability_runbook_step_failure_total;
- 13_07_08_platform_observability_unknown_total;
- 13_07_08_platform_observability_postcondition_failure_total;
- 13_07_08_platform_observability_audit_failure_total;

Dimensiones permitidas:

- environment;
- service_class;
- operation;
- alert_class;
- result;
- error_code;
- tenant_tier.

No usar IDs únicos, secretos, tokens, correos, nombres, URLs completas o payloads como etiquetas.

## 23. Seguridad

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

## 24. Casos límite y pruebas adversariales

TEST-POBS-001: verificar una alerta se dispara repetidamente; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-002: verificar dos Operadores ejecutan el mismo runbook; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-003: verificar la aprobación expira antes del paso crítico; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-004: verificar el actor pierde el permiso; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-005: verificar el tenant queda suspendido; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-006: verificar las métricas llegan retrasadas; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-007: verificar el autoscaler oscila; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-008: verificar el límite máximo de réplicas se alcanza; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-009: verificar la dependencia externa queda degradada; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-010: verificar el resultado del runbook queda UNKNOWN; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-011: verificar una acción manual rompe una postcondición; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-012: verificar la auditoría se degrada; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-013: verificar un evento se duplica; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-014: verificar un evento llega fuera de orden; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-015: verificar la cola crece mientras el autoscaler reacciona; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-016: verificar la base de datos agota conexiones; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-017: verificar Redis alcanza memoria máxima; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-018: verificar una zona completa falla; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-019: verificar el health check es verde pero la función falla; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-020: verificar un runbook contiene un comando no permitido; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-021: verificar un actor intenta acceder a otro tenant; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-022: verificar un dashboard muestra datos stale; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-023: verificar un escalamiento aumenta coste sin mejorar throughput; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-024: verificar el servicio se recupera y genera stampede; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-POBS-025: verificar el rollback del runbook falla; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

## 25. Criterios de aceptación

AC-POBS-001

Toda señal es estructurada y correlacionable.

AC-POBS-002

Toda alerta es accionable.

AC-POBS-003

Toda alerta tiene owner y runbook.

AC-POBS-004

Toda métrica evita alta cardinalidad.

AC-POBS-005

Toda capacidad posee umbrales.

AC-POBS-006

Todo autoscaling tiene límites.

AC-POBS-007

Todo runbook está autorizado.

AC-POBS-008

Todo runbook es reproducible.

AC-POBS-009

Toda operación crítica exige approval.

AC-POBS-010

Todo resultado UNKNOWN se concilia.

AC-POBS-011

Toda restauración verifica postcondiciones.

AC-POBS-012

Los secretos no se exponen.

AC-POBS-013

Los tenants se aíslan.

AC-POBS-014

Toda acción es auditable.

AC-POBS-015

Toda degradación es visible.

AC-POBS-016

Toda señal es estructurada y correlacionable.

AC-POBS-017

Toda alerta es accionable.

AC-POBS-018

Toda alerta tiene owner y runbook.

AC-POBS-019

Toda métrica evita alta cardinalidad.

AC-POBS-020

Toda capacidad posee umbrales.

AC-POBS-021

Todo autoscaling tiene límites.

AC-POBS-022

Todo runbook está autorizado.

AC-POBS-023

Todo runbook es reproducible.

AC-POBS-024

Toda operación crítica exige approval.

AC-POBS-025

Todo resultado UNKNOWN se concilia.

AC-POBS-026

Toda restauración verifica postcondiciones.

AC-POBS-027

Los secretos no se exponen.

AC-POBS-028

Los tenants se aíslan.

AC-POBS-029

Toda acción es auditable.

AC-POBS-030

Toda degradación es visible.

AC-POBS-031

Toda señal es estructurada y correlacionable.

AC-POBS-032

Toda alerta es accionable.

AC-POBS-033

Toda alerta tiene owner y runbook.

AC-POBS-034

Toda métrica evita alta cardinalidad.

AC-POBS-035

Toda capacidad posee umbrales.

AC-POBS-036

Todo autoscaling tiene límites.

AC-POBS-037

Todo runbook está autorizado.

AC-POBS-038

Todo runbook es reproducible.

AC-POBS-039

Toda operación crítica exige approval.

AC-POBS-040

Todo resultado UNKNOWN se concilia.

AC-POBS-041

Toda restauración verifica postcondiciones.

AC-POBS-042

Los secretos no se exponen.

AC-POBS-043

Los tenants se aíslan.

AC-POBS-044

Toda acción es auditable.

AC-POBS-045

Toda degradación es visible.

AC-POBS-046

Toda señal es estructurada y correlacionable.

AC-POBS-047

Toda alerta es accionable.

AC-POBS-048

Toda alerta tiene owner y runbook.

AC-POBS-049

Toda métrica evita alta cardinalidad.

AC-POBS-050

Toda capacidad posee umbrales.

AC-POBS-051

Todo autoscaling tiene límites.

AC-POBS-052

Todo runbook está autorizado.

AC-POBS-053

Todo runbook es reproducible.

AC-POBS-054

Toda operación crítica exige approval.

AC-POBS-055

Todo resultado UNKNOWN se concilia.

AC-POBS-056

Toda restauración verifica postcondiciones.

AC-POBS-057

Los secretos no se exponen.

AC-POBS-058

Los tenants se aíslan.

AC-POBS-059

Toda acción es auditable.

AC-POBS-060

Toda degradación es visible.

## 26. Checklist final

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
