======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-07-09-SCALING-CAPACITY.md

# ESCALAMIENTO Y CAPACIDAD

## 1. Objetivo

Define modelos de capacidad, autoscaling, cuotas, backpressure, load shedding, costes y pruebas de carga para VoiceShop.

## 2. Alcance

Incluye capacity model, load profiles, autoscaling, quotas, concurrency, conexiones, colas, backpressure, rate limits, load shedding, performance, cost guardrails, pruebas de carga y QA.

## 3. Unidades de capacidad

La capacidad se expresa en requests/s, sesiones concurrentes, minutos de voz, conexiones, jobs/s, mensajes/s, DB transactions/s, Redis ops/s, ancho de banda y almacenamiento.

## 4. Perfiles de carga

Deben modelarse steady, daily peak, campaign spike, flash sale, provider slowdown, retry storm, mass expiry, webhook burst y region degradation.

## 5. Escalamiento stateless

APIs y gateways escalan horizontalmente por CPU, memoria, latency, active connections y request rate, con min/max y cooldown.

## 6. Escalamiento de workers

Los workers escalan por queue depth, oldest age, throughput, task duration y dependency capacity. No deben superar los límites de la base o proveedor.

## 7. Realtime

El escalamiento Realtime considera conexiones activas, bitrate, CPU de audio, memoria por Session, event rate, provider limits y afinidad o routing.

## 8. Base de datos

La capacidad incluye conexiones, CPU, IOPS, WAL, locks, deadlocks, cache hit, replication lag, storage growth y query latency.

## 9. Redis

Se supervisan memoria, evictions, ops/s, latency, connected clients, blocked clients, keyspace, expirations y replication.

## 10. Cuotas

Las cuotas se aplican por tenant, plan, actor, channel, provider y operación. Deben existir soft limits, hard limits y alertas.

## 11. Backpressure

Cuando una dependencia se satura, el sistema reduce intake, limita concurrency, encola dentro de límites, degrada funciones secundarias o rechaza con respuesta explícita.

## 12. Load shedding

La prioridad recomendada preserva seguridad, pagos, inventario, sesiones activas, mensajes, lecturas y batch. La policy final debe estar versionada.

## 13. Cost guardrails

El autoscaling debe respetar presupuestos, límites por tenant, costes de provider, storage, egress y modelos LLM/Realtime.

## 14. Pruebas de carga

Se ejecutan steady, spike, soak, stress, breakpoint, failover y recovery tests con datos sintéticos y evidencia reproducible.

## 15. Capacity review

Debe realizarse antes de campañas, releases críticos, cambios de provider, crecimiento de tenants y modificaciones de arquitectura.

## 16. Reglas normativas

RULE-SCAP-001

Toda señal operativa debe ser estructurada, correlacionable y redactada.

RULE-SCAP-002

Toda capacidad debe medirse antes de agotarse y debe tener umbrales explícitos.

RULE-SCAP-003

Toda operación productiva debe poseer runbook, owner y criterios de escalación.

RULE-SCAP-004

Las métricas deben evitar alta cardinalidad y datos sensibles.

RULE-SCAP-005

Toda alerta debe ser accionable, deduplicada y vinculada a un runbook.

RULE-SCAP-006

Toda degradación debe ser visible y preservar seguridad y consistencia.

RULE-SCAP-007

Todo escalamiento debe considerar CPU, memoria, red, conexiones, colas, locks y dependencias.

RULE-SCAP-008

Todo autoscaling debe tener límites mínimos, máximos, cooldown y protección contra oscilación.

RULE-SCAP-009

Todo procedimiento debe poder ejecutarse de forma reproducible por otro Operador o una LLM.

RULE-SCAP-010

Todo resultado UNKNOWN debe tener owner, deadline y reconciliación.

RULE-SCAP-011

Toda intervención manual debe ser autorizada y auditable.

RULE-SCAP-012

Los tenants deben permanecer aislados en métricas, capacidad, cuotas y procedimientos.

RULE-SCAP-013

Toda operación de emergencia debe expirar y ser revisada.

RULE-SCAP-014

Toda prueba de capacidad debe usar datos sintéticos o controles seguros.

RULE-SCAP-015

Toda restauración del servicio debe verificar postcondiciones funcionales.

RULE-SCAP-016

Toda señal operativa debe ser estructurada, correlacionable y redactada.

RULE-SCAP-017

Toda capacidad debe medirse antes de agotarse y debe tener umbrales explícitos.

RULE-SCAP-018

Toda operación productiva debe poseer runbook, owner y criterios de escalación.

RULE-SCAP-019

Las métricas deben evitar alta cardinalidad y datos sensibles.

RULE-SCAP-020

Toda alerta debe ser accionable, deduplicada y vinculada a un runbook.

RULE-SCAP-021

Toda degradación debe ser visible y preservar seguridad y consistencia.

RULE-SCAP-022

Todo escalamiento debe considerar CPU, memoria, red, conexiones, colas, locks y dependencias.

RULE-SCAP-023

Todo autoscaling debe tener límites mínimos, máximos, cooldown y protección contra oscilación.

RULE-SCAP-024

Todo procedimiento debe poder ejecutarse de forma reproducible por otro Operador o una LLM.

RULE-SCAP-025

Todo resultado UNKNOWN debe tener owner, deadline y reconciliación.

RULE-SCAP-026

Toda intervención manual debe ser autorizada y auditable.

RULE-SCAP-027

Los tenants deben permanecer aislados en métricas, capacidad, cuotas y procedimientos.

RULE-SCAP-028

Toda operación de emergencia debe expirar y ser revisada.

RULE-SCAP-029

Toda prueba de capacidad debe usar datos sintéticos o controles seguros.

RULE-SCAP-030

Toda restauración del servicio debe verificar postcondiciones funcionales.

RULE-SCAP-031

Toda señal operativa debe ser estructurada, correlacionable y redactada.

RULE-SCAP-032

Toda capacidad debe medirse antes de agotarse y debe tener umbrales explícitos.

RULE-SCAP-033

Toda operación productiva debe poseer runbook, owner y criterios de escalación.

RULE-SCAP-034

Las métricas deben evitar alta cardinalidad y datos sensibles.

RULE-SCAP-035

Toda alerta debe ser accionable, deduplicada y vinculada a un runbook.

RULE-SCAP-036

Toda degradación debe ser visible y preservar seguridad y consistencia.

RULE-SCAP-037

Todo escalamiento debe considerar CPU, memoria, red, conexiones, colas, locks y dependencias.

RULE-SCAP-038

Todo autoscaling debe tener límites mínimos, máximos, cooldown y protección contra oscilación.

RULE-SCAP-039

Todo procedimiento debe poder ejecutarse de forma reproducible por otro Operador o una LLM.

RULE-SCAP-040

Todo resultado UNKNOWN debe tener owner, deadline y reconciliación.

RULE-SCAP-041

Toda intervención manual debe ser autorizada y auditable.

RULE-SCAP-042

Los tenants deben permanecer aislados en métricas, capacidad, cuotas y procedimientos.

RULE-SCAP-043

Toda operación de emergencia debe expirar y ser revisada.

RULE-SCAP-044

Toda prueba de capacidad debe usar datos sintéticos o controles seguros.

RULE-SCAP-045

Toda restauración del servicio debe verificar postcondiciones funcionales.

RULE-SCAP-046

Toda señal operativa debe ser estructurada, correlacionable y redactada.

RULE-SCAP-047

Toda capacidad debe medirse antes de agotarse y debe tener umbrales explícitos.

RULE-SCAP-048

Toda operación productiva debe poseer runbook, owner y criterios de escalación.

RULE-SCAP-049

Las métricas deben evitar alta cardinalidad y datos sensibles.

RULE-SCAP-050

Toda alerta debe ser accionable, deduplicada y vinculada a un runbook.

RULE-SCAP-051

Toda degradación debe ser visible y preservar seguridad y consistencia.

RULE-SCAP-052

Todo escalamiento debe considerar CPU, memoria, red, conexiones, colas, locks y dependencias.

RULE-SCAP-053

Todo autoscaling debe tener límites mínimos, máximos, cooldown y protección contra oscilación.

RULE-SCAP-054

Todo procedimiento debe poder ejecutarse de forma reproducible por otro Operador o una LLM.

RULE-SCAP-055

Todo resultado UNKNOWN debe tener owner, deadline y reconciliación.

RULE-SCAP-056

Toda intervención manual debe ser autorizada y auditable.

RULE-SCAP-057

Los tenants deben permanecer aislados en métricas, capacidad, cuotas y procedimientos.

RULE-SCAP-058

Toda operación de emergencia debe expirar y ser revisada.

RULE-SCAP-059

Toda prueba de capacidad debe usar datos sintéticos o controles seguros.

RULE-SCAP-060

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

SCAP_REQUEST_INVALID

SCAP_AUTHENTICATION_REQUIRED

SCAP_AUTHORIZATION_DENIED

SCAP_ENVIRONMENT_SCOPE_DENIED

SCAP_TENANT_SCOPE_DENIED

SCAP_SERVICE_NOT_FOUND

SCAP_RUNBOOK_NOT_FOUND

SCAP_STATE_VERSION_CONFLICT

SCAP_APPROVAL_REQUIRED

SCAP_APPROVAL_INVALID

SCAP_IDEMPOTENCY_CONFLICT

SCAP_DIAGNOSIS_INCOMPLETE

SCAP_ALERT_CONTEXT_INVALID

SCAP_CAPACITY_DATA_UNAVAILABLE

SCAP_SCALE_LIMIT_REACHED

SCAP_DEPENDENCY_UNAVAILABLE

SCAP_TIMEOUT

SCAP_RESULT_UNKNOWN

SCAP_POSTCONDITION_FAILED

SCAP_RUNBOOK_STEP_FAILED

SCAP_AUDIT_PERSISTENCE_FAILED

SCAP_SECURITY_POLICY_DENIED

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

- 13_07_09_scaling_capacity_requests_total;
- 13_07_09_scaling_capacity_success_total;
- 13_07_09_scaling_capacity_failure_total;
- 13_07_09_scaling_capacity_duration_seconds;
- 13_07_09_scaling_capacity_alerts_total;
- 13_07_09_scaling_capacity_alert_ack_seconds;
- 13_07_09_scaling_capacity_alert_resolution_seconds;
- 13_07_09_scaling_capacity_capacity_threshold_total;
- 13_07_09_scaling_capacity_scale_requests_total;
- 13_07_09_scaling_capacity_scale_success_total;
- 13_07_09_scaling_capacity_scale_failure_total;
- 13_07_09_scaling_capacity_runbook_executions_total;
- 13_07_09_scaling_capacity_runbook_step_failure_total;
- 13_07_09_scaling_capacity_unknown_total;
- 13_07_09_scaling_capacity_postcondition_failure_total;
- 13_07_09_scaling_capacity_audit_failure_total;

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

TEST-SCAP-001: verificar una alerta se dispara repetidamente; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-002: verificar dos Operadores ejecutan el mismo runbook; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-003: verificar la aprobación expira antes del paso crítico; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-004: verificar el actor pierde el permiso; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-005: verificar el tenant queda suspendido; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-006: verificar las métricas llegan retrasadas; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-007: verificar el autoscaler oscila; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-008: verificar el límite máximo de réplicas se alcanza; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-009: verificar la dependencia externa queda degradada; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-010: verificar el resultado del runbook queda UNKNOWN; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-011: verificar una acción manual rompe una postcondición; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-012: verificar la auditoría se degrada; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-013: verificar un evento se duplica; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-014: verificar un evento llega fuera de orden; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-015: verificar la cola crece mientras el autoscaler reacciona; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-016: verificar la base de datos agota conexiones; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-017: verificar Redis alcanza memoria máxima; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-018: verificar una zona completa falla; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-019: verificar el health check es verde pero la función falla; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-020: verificar un runbook contiene un comando no permitido; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-021: verificar un actor intenta acceder a otro tenant; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-022: verificar un dashboard muestra datos stale; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-023: verificar un escalamiento aumenta coste sin mejorar throughput; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-024: verificar el servicio se recupera y genera stampede; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

TEST-SCAP-025: verificar el rollback del runbook falla; se debe preservar seguridad, aislamiento, consistencia, idempotencia y evidencia.

## 25. Criterios de aceptación

AC-SCAP-001

Toda señal es estructurada y correlacionable.

AC-SCAP-002

Toda alerta es accionable.

AC-SCAP-003

Toda alerta tiene owner y runbook.

AC-SCAP-004

Toda métrica evita alta cardinalidad.

AC-SCAP-005

Toda capacidad posee umbrales.

AC-SCAP-006

Todo autoscaling tiene límites.

AC-SCAP-007

Todo runbook está autorizado.

AC-SCAP-008

Todo runbook es reproducible.

AC-SCAP-009

Toda operación crítica exige approval.

AC-SCAP-010

Todo resultado UNKNOWN se concilia.

AC-SCAP-011

Toda restauración verifica postcondiciones.

AC-SCAP-012

Los secretos no se exponen.

AC-SCAP-013

Los tenants se aíslan.

AC-SCAP-014

Toda acción es auditable.

AC-SCAP-015

Toda degradación es visible.

AC-SCAP-016

Toda señal es estructurada y correlacionable.

AC-SCAP-017

Toda alerta es accionable.

AC-SCAP-018

Toda alerta tiene owner y runbook.

AC-SCAP-019

Toda métrica evita alta cardinalidad.

AC-SCAP-020

Toda capacidad posee umbrales.

AC-SCAP-021

Todo autoscaling tiene límites.

AC-SCAP-022

Todo runbook está autorizado.

AC-SCAP-023

Todo runbook es reproducible.

AC-SCAP-024

Toda operación crítica exige approval.

AC-SCAP-025

Todo resultado UNKNOWN se concilia.

AC-SCAP-026

Toda restauración verifica postcondiciones.

AC-SCAP-027

Los secretos no se exponen.

AC-SCAP-028

Los tenants se aíslan.

AC-SCAP-029

Toda acción es auditable.

AC-SCAP-030

Toda degradación es visible.

AC-SCAP-031

Toda señal es estructurada y correlacionable.

AC-SCAP-032

Toda alerta es accionable.

AC-SCAP-033

Toda alerta tiene owner y runbook.

AC-SCAP-034

Toda métrica evita alta cardinalidad.

AC-SCAP-035

Toda capacidad posee umbrales.

AC-SCAP-036

Todo autoscaling tiene límites.

AC-SCAP-037

Todo runbook está autorizado.

AC-SCAP-038

Todo runbook es reproducible.

AC-SCAP-039

Toda operación crítica exige approval.

AC-SCAP-040

Todo resultado UNKNOWN se concilia.

AC-SCAP-041

Toda restauración verifica postcondiciones.

AC-SCAP-042

Los secretos no se exponen.

AC-SCAP-043

Los tenants se aíslan.

AC-SCAP-044

Toda acción es auditable.

AC-SCAP-045

Toda degradación es visible.

AC-SCAP-046

Toda señal es estructurada y correlacionable.

AC-SCAP-047

Toda alerta es accionable.

AC-SCAP-048

Toda alerta tiene owner y runbook.

AC-SCAP-049

Toda métrica evita alta cardinalidad.

AC-SCAP-050

Toda capacidad posee umbrales.

AC-SCAP-051

Todo autoscaling tiene límites.

AC-SCAP-052

Todo runbook está autorizado.

AC-SCAP-053

Todo runbook es reproducible.

AC-SCAP-054

Toda operación crítica exige approval.

AC-SCAP-055

Todo resultado UNKNOWN se concilia.

AC-SCAP-056

Toda restauración verifica postcondiciones.

AC-SCAP-057

Los secretos no se exponen.

AC-SCAP-058

Los tenants se aíslan.

AC-SCAP-059

Toda acción es auditable.

AC-SCAP-060

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
