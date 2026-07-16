======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-04-05-INVENTORY-ADJUSTMENTS.md

# AJUSTES AUTORIZADOS DE INVENTARIO

## 1. Objetivo

Este documento define cómo VoiceShop aplica correcciones autorizadas a
los balances de inventario.

Los ajustes se usan para reflejar hechos como:

- recepción física;
- pérdida;
- daño;
- conteo físico;
- corrección administrativa;
- bloqueo;
- desbloqueo;
- conciliación;
- transferencia;
- devolución.

Un ajuste no debe usarse para ocultar errores de reservas, pedidos o
pagos.

## 2. Alcance

Incluye:

- solicitud;
- tipos;
- razones;
- autorización;
- evidencia;
- cantidades;
- buckets;
- expected version;
- idempotencia;
- aprobación;
- doble control;
- ajustes positivos;
- ajustes negativos;
- bloqueos;
- daños;
- conteo físico;
- conciliación;
- reversión;
- errores;
- eventos;
- observabilidad;
- auditoría;
- QA.

No incluye:

- operaciones normales de reserva;
- commit de pedido;
- pago;
- catálogo;
- proceso físico detallado de bodega;
- contabilidad financiera.

## 3. Principios

RULE-ADJ-001

Todo ajuste posee Adjustment ID.

RULE-ADJ-002

Todo ajuste pertenece a tenant, Product ID y Location ID.

RULE-ADJ-003

Todo ajuste requiere Adjustment Type.

RULE-ADJ-004

Todo ajuste requiere Reason Code.

RULE-ADJ-005

Todo ajuste requiere actor o identidad de servicio autorizada.

RULE-ADJ-006

Todo ajuste usa Idempotency Key.

RULE-ADJ-007

Todo ajuste valida Inventory Version.

RULE-ADJ-008

Todo ajuste conserva evidencia.

RULE-ADJ-009

Los ajustes sensibles pueden requerir aprobación.

RULE-ADJ-010

La LLM no ejecuta ajustes.

RULE-ADJ-011

Un ajuste no modifica stock de otro tenant.

RULE-ADJ-012

Una reversión crea un nuevo ajuste.

RULE-ADJ-013

Los balances e invariantes se validan.

RULE-ADJ-014

Estado, movimiento y evento se persisten juntos.

RULE-ADJ-015

Todo ajuste es auditable.

## 4. Tipos de ajuste

RECEIPT

Ingreso físico.

COUNT_CORRECTION

Corrección por conteo.

LOSS

Pérdida.

DAMAGE

Daño.

RECOVERY

Recuperación de unidad.

BLOCK

Bloqueo.

UNBLOCK

Desbloqueo.

TRANSFER_OUT

Salida por transferencia.

TRANSFER_IN

Entrada por transferencia.

RETURN_TO_STOCK

Devolución utilizable.

DISPOSAL

Eliminación.

RECONCILIATION

Corrección por conciliación.

REVERSAL

Reversión de ajuste previo.

## 5. Estados

REQUESTED

VALIDATING

APPROVAL_REQUIRED

APPROVED

EXECUTING

COMPLETED

REJECTED

CANCELLED

FAILED

UNKNOWN

REVERSED

## 6. Contrato de Command

```json
{
  "adjust_inventory_command_id": "UUID",
  "tenant_id": "UUID",
  "actor_id": "UUID",
  "product_id": "UUID",
  "location_id": "UUID",
  "adjustment_type": "COUNT_CORRECTION",
  "target_bucket": "ON_HAND",
  "operation": "SET_TO",
  "quantity": 18,
  "reason_code": "PHYSICAL_COUNT",
  "reason_text": "Conteo físico autorizado",
  "evidence_references": [
    "UUID"
  ],
  "expected_inventory_version": 44,
  "approval_reference": "UUID_OR_NULL",
  "idempotency_key": "STRING",
  "correlation_id": "UUID"
}
```

## 7. Contrato de resultado

```json
{
  "adjustment_id": "UUID",
  "status": "COMPLETED",
  "tenant_id": "UUID",
  "product_id": "UUID",
  "location_id": "UUID",
  "adjustment_type": "COUNT_CORRECTION",
  "target_bucket": "ON_HAND",
  "quantity_before": 20,
  "quantity_after": 18,
  "delta": -2,
  "inventory_version_before": 44,
  "inventory_version_after": 45,
  "reason_code": "PHYSICAL_COUNT",
  "applied_at": "UTC_TIMESTAMP"
}
```

## 8. Operaciones

INCREASE_BY

DECREASE_BY

SET_TO

MOVE_BETWEEN_BUCKETS

SET_TO es de mayor riesgo.

Debe requerir controles adicionales.

## 9. Buckets ajustables

ON_HAND

BLOCKED

DAMAGED

IN_TRANSIT

SAFETY_STOCK

Otros buckets sólo con política.

RESERVED y COMMITTED no deberían ajustarse directamente salvo
conciliación especializada.

## 10. Razones

Reason Codes deben ser catálogo cerrado.

Ejemplos:

PHYSICAL_COUNT

RECEIVING

DAMAGE_CONFIRMED

LOSS_CONFIRMED

QUALITY_HOLD

QUALITY_RELEASE

TRANSFER_CONFIRMED

CUSTOMER_RETURN

SYSTEM_RECONCILIATION

PREVIOUS_ADJUSTMENT_REVERSAL

## 11. Reason text

Puede complementar.

No reemplaza Reason Code.

Debe limitarse, redactarse y auditarse.

## 12. Evidencia

Puede incluir:

- documento;
- foto autorizada;
- conteo;
- ticket;
- referencia ERP;
- aprobación;
- incidente.

La evidencia debe ser referencia, no payload completo en logs.

## 13. Autorización

Debe evaluar:

- rol;
- tenant;
- ubicación;
- tipo;
- bucket;
- cantidad;
- reason;
- horario;
- canal;
- riesgo.

## 14. Riesgo

LOW

Pequeño desbloqueo dentro de tolerancia.

MEDIUM

Recepción o daño moderado.

HIGH

Corrección significativa.

CRITICAL

Cambio masivo, reservado, committed, reversión sensible.

## 15. Aprobación

Puede requerirse:

- supervisor;
- doble control;
- aprobación separada;
- ticket;
- ventana de tiempo.

La aprobación debe vincularse con el payload exacto.

## 16. Approval Reference

Debe incluir:

- approver;
- tenant;
- adjustment hash;
- issued_at;
- expires_at;
- scope;
- status.

Si cambia quantity o bucket:

- aprobación inválida.

## 17. Límites

Debe existir:

- max absolute delta;
- max relative delta;
- max daily adjustments;
- max per actor;
- max per location;
- max batch size.

## 18. Ajuste positivo

Debe validar:

- source;
- reason;
- evidence;
- duplicate receipt;
- unit;
- version.

## 19. Ajuste negativo

Debe validar:

- no llevar balance a estado prohibido;
- reservas;
- committed;
- safety stock;
- reason;
- approval.

## 20. Conteo físico

SET_TO ON_HAND.

Debe calcular delta.

Ejemplo:

before 20
counted 18
delta -2

No aceptar un delta si la intención fue SET_TO sin claridad.

## 21. Bloqueo

MOVE o INCREASE BLOCKED.

Puede reducir AVAILABLE.

Debe indicar reason y expiration opcional.

## 22. Desbloqueo

Reduce BLOCKED.

Debe validar que existan unidades bloqueadas.

## 23. Daño

Puede mover:

ON_HAND → DAMAGED

o aplicar modelo equivalente.

No debe duplicar reducción.

## 24. Transferencia

TRANSFER_OUT y TRANSFER_IN deben vincularse con Transfer ID.

Riesgo:

- salida completada;
- entrada no completada;
- UNKNOWN.

Debe conciliarse.

## 25. Reversión

Una reversión:

- referencia Adjustment ID original;
- no borra el original;
- calcula operación opuesta;
- valida estado actual;
- puede requerir aprobación;
- crea nuevo Adjustment ID.

## 26. No reversibilidad automática

Si hubo cambios posteriores, la reversión simple puede ser inválida.

Debe reevaluar balance y causalidad.

## 27. Ajuste batch

Debe definir:

ATOMIC

Todo o nada.

PER_ITEM

Resultados independientes.

SAGA

Compensación.

Debe limitar tamaño.

## 28. Idempotencia

Misma clave y mismo payload:

- mismo Adjustment ID.

Misma clave y payload distinto:

- INVENTORY_ADJUSTMENT_IDEMPOTENCY_CONFLICT.

## 29. Concurrencia

Valida expected_inventory_version.

Conflicto:

- recargar;
- recalcular;
- repetir autorización si cambia payload;
- no sobrescribir.

## 30. UNKNOWN

Puede ocurrir con ERP externo.

Debe:

- consultar por idempotency;
- consultar movement reference;
- conciliar;
- bloquear duplicado.

## 31. Persistencia atómica

Debe incluir:

- Balance;
- Adjustment;
- Movement;
- Approval consumption;
- Idempotency Result;
- Outbox.

## 32. Flujo principal

1. recibir Command.
2. validar schema.
3. validar tenant.
4. autenticar actor.
5. autorizar.
6. validar Product ID.
7. validar Location ID.
8. validar type, bucket y operation.
9. validar reason.
10. validar evidence.
11. validar limits.
12. validar approval.
13. consultar idempotencia.
14. cargar balance.
15. validar version.
16. calcular delta.
17. aplicar buckets.
18. validar invariantes.
19. crear Adjustment y Movement.
20. persistir atómicamente.
21. emitir evento.
22. devolver resultado.

## 33. Pseudocódigo

```text
function adjust_inventory(command):

    validate_adjustment_schema(command)
    authenticate(command.actor_id)
    authorize_inventory_adjustment(command)
    validate_tenant_product_location(command)
    validate_adjustment_type_and_bucket(command)
    validate_reason_and_evidence(command)
    enforce_adjustment_limits(command)

    if requires_approval(command):
        validate_approval_reference(
            command.approval_reference,
            hash_adjustment_payload(command)
        )

    previous = get_idempotent_result(command.idempotency_key)
    if previous.exists:
        return previous

    balance = load_inventory_balance(
        command.tenant_id,
        command.product_id,
        command.location_id
    )

    validate_version(
        balance.inventory_version,
        command.expected_inventory_version
    )

    change = calculate_adjustment_change(command, balance)
    next_balance = apply_adjustment(balance, change)
    validate_inventory_invariants(next_balance)

    adjustment = create_adjustment_record(
        command,
        balance,
        next_balance
    )

    movement = create_adjustment_movement(adjustment)

    persist_adjustment_atomically(
        next_balance,
        adjustment,
        movement,
        command.idempotency_key
    )

    emit(InventoryAdjusted)
    return adjustment
```

## 34. Errores

INVENTORY_ADJUSTMENT_REQUEST_INVALID

INVENTORY_ADJUSTMENT_NOT_AUTHENTICATED

INVENTORY_ADJUSTMENT_NOT_AUTHORIZED

INVENTORY_ADJUSTMENT_TENANT_MISMATCH

INVENTORY_ADJUSTMENT_PRODUCT_NOT_FOUND

INVENTORY_ADJUSTMENT_LOCATION_NOT_FOUND

INVENTORY_ADJUSTMENT_TYPE_INVALID

INVENTORY_ADJUSTMENT_BUCKET_INVALID

INVENTORY_ADJUSTMENT_OPERATION_INVALID

INVENTORY_ADJUSTMENT_QUANTITY_INVALID

INVENTORY_ADJUSTMENT_REASON_REQUIRED

INVENTORY_ADJUSTMENT_EVIDENCE_REQUIRED

INVENTORY_ADJUSTMENT_LIMIT_EXCEEDED

INVENTORY_ADJUSTMENT_APPROVAL_REQUIRED

INVENTORY_ADJUSTMENT_APPROVAL_INVALID

INVENTORY_ADJUSTMENT_VERSION_CONFLICT

INVENTORY_ADJUSTMENT_IDEMPOTENCY_CONFLICT

INVENTORY_ADJUSTMENT_INVARIANT_VIOLATION

INVENTORY_ADJUSTMENT_REVERSAL_INVALID

INVENTORY_ADJUSTMENT_UNKNOWN

INVENTORY_ADJUSTMENT_ATOMICITY_FAILED

## 35. Eventos

InventoryAdjustmentRequested

InventoryAdjustmentApprovalRequired

InventoryAdjustmentApproved

InventoryAdjustmentRejected

InventoryAdjustmentExecuting

InventoryAdjusted

InventoryAdjustmentReversalRequested

InventoryAdjustmentReversed

InventoryAdjustmentUnknown

InventoryAdjustmentFailed

## 36. Observabilidad

Métricas:

- inventory_adjustment_requests_total;
- inventory_adjustment_success_total;
- inventory_adjustment_rejected_total;
- inventory_adjustment_approval_required_total;
- inventory_adjustment_version_conflict_total;
- inventory_adjustment_unknown_total;
- inventory_adjustment_quantity_abs;
- inventory_adjustment_duration_seconds;
- inventory_adjustment_reversal_total;
- inventory_adjustment_limit_exceeded_total.

Dimensiones:

- adjustment_type;
- target_bucket;
- risk;
- result;
- error_code;
- approval_required;
- tenant_tier.

## 37. Auditoría

Registrar obligatoriamente:

- Adjustment ID;
- tenant;
- actor;
- approver;
- Product ID protegido;
- Location ID;
- type;
- bucket;
- operation;
- before;
- after;
- delta;
- reason;
- evidence references;
- versions;
- Correlation ID.

## 38. Seguridad

Amenazas:

- actor spoofing;
- role escalation;
- cross-tenant;
- quantity abuse;
- approval replay;
- reason manipulation;
- evidence forgery;
- duplicate receipt;
- reserved bucket modification;
- hidden reversal.

Controles:

- authentication;
- authorization;
- approval binding;
- schemas;
- limits;
- version;
- idempotency;
- audit;
- anomaly detection.

## 39. Voz y conversación

Una conversación de Cliente no debe exponer herramienta AdjustInventory.

Operadores autorizados pueden usar interfaz específica.

Una LLM puede redactar explicación.

No puede aprobar ni ejecutar.

## 40. Casos límite

- increase;
- decrease;
- set-to;
- move buckets;
- zero delta;
- negative result;
- approval required;
- expired approval;
- payload changed;
- duplicate;
- version conflict;
- receipt duplicate;
- damage;
- block;
- unblock;
- transfer;
- reversal;
- later changes;
- batch;
- partial;
- UNKNOWN;
- outbox failure;
- tenant mismatch.

## 41. Criterios de aceptación

AC-ADJ-001

Todo ajuste tiene Adjustment ID.

AC-ADJ-002

Todo ajuste respeta tenant.

AC-ADJ-003

Todo ajuste tiene type y reason.

AC-ADJ-004

Todo ajuste identifica actor.

AC-ADJ-005

Todo ajuste usa idempotencia.

AC-ADJ-006

Todo ajuste valida versión.

AC-ADJ-007

Los ajustes sensibles requieren aprobación.

AC-ADJ-008

La aprobación se vincula con payload.

AC-ADJ-009

Los límites se aplican.

AC-ADJ-010

Los invariantes se preservan.

AC-ADJ-011

Una reversión crea nuevo ajuste.

AC-ADJ-012

La LLM no ejecuta ajustes.

AC-ADJ-013

Estado, movimiento y evento se persisten juntos.

AC-ADJ-014

UNKNOWN se concilia.

AC-ADJ-015

Todo ajuste es auditable.

## 42. Plan mínimo de pruebas

- type;
- reason;
- evidence;
- actor;
- authorization;
- tenant;
- product;
- location;
- increase;
- decrease;
- set-to;
- move;
- limits;
- approval;
- approval replay;
- version;
- idempotency;
- invariants;
- reserved bucket;
- reversal;
- batch;
- unknown;
- atomicity;
- outbox;
- metrics;
- audit;
- security.

## 43. Checklist

[ ] Existe Adjustment ID.
[ ] Existe tenant.
[ ] Existe actor.
[ ] Existe Product ID.
[ ] Existe Location ID.
[ ] Existe Adjustment Type.
[ ] Existe target bucket.
[ ] Existe operation.
[ ] Existe quantity.
[ ] Existe reason.
[ ] Existe evidence.
[ ] Existe expected version.
[ ] Existe Idempotency Key.
[ ] Se evalúa riesgo.
[ ] Se valida aprobación.
[ ] Se aplican límites.
[ ] Se preservan invariantes.
[ ] Se persiste atómicamente.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
