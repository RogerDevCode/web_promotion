======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-04-04-STOCK-RELEASE-EXPIRATION.md

# LIBERACIÓN Y EXPIRACIÓN DE RESERVAS DE STOCK

## 1. Objetivo

Este documento define cómo VoiceShop libera unidades reservadas y cómo
expiran automáticamente las reservas temporales.

La liberación debe devolver unidades al bucket disponible cuando
corresponda.

La expiración debe impedir que una reserva temporal bloquee stock de
forma indefinida.

La liberación o expiración no debe:

- duplicar unidades;
- reducir stock físico;
- confirmar pedidos;
- procesar pagos;
- modificar productos;
- revivir reservas terminales;
- ejecutar dos veces por reintentos.

## 2. Alcance

Incluye:

- liberación manual;
- liberación automática;
- expiración;
- cancelación de carrito;
- cancelación de pedido;
- cambio de cantidad;
- cierre de sesión;
- owner inválido;
- worker de expiración;
- reintentos;
- idempotencia;
- concurrencia;
- versiones;
- compensación;
- resultado UNKNOWN;
- conciliación;
- errores;
- eventos;
- observabilidad;
- auditoría;
- QA.

No incluye:

- creación de reserva;
- ajustes físicos;
- confirmación de pedido;
- procesamiento de pago;
- tecnología específica de scheduler;
- implementación concreta del almacenamiento.

## 3. Principios

RULE-REL-001

Toda liberación debe identificar Reservation ID.

RULE-REL-002

Toda liberación debe validar tenant.

RULE-REL-003

Toda liberación debe validar owner o autoridad equivalente.

RULE-REL-004

Toda liberación debe ser idempotente.

RULE-REL-005

Toda liberación debe validar estado.

RULE-REL-006

Toda liberación debe validar versión.

RULE-REL-007

Una reserva RELEASED no se libera nuevamente.

RULE-REL-008

Una reserva EXPIRED no se libera nuevamente.

RULE-REL-009

Una reserva COMMITTED no puede liberarse como reserva temporal.

RULE-REL-010

La expiración debe basarse en tiempo del servidor.

RULE-REL-011

La expiración debe producir evidencia.

RULE-REL-012

El worker puede reintentar sin duplicar unidades.

RULE-REL-013

Un resultado UNKNOWN requiere conciliación.

RULE-REL-014

Los eventos deben persistirse con el cambio.

RULE-REL-015

Toda operación debe ser auditable.

## 4. Estados relacionados

ACTIVE

Reserva vigente.

PARTIALLY_ACTIVE

Reserva parcial vigente.

RELEASING

Liberación en curso.

RELEASED

Liberación completada.

EXPIRING

Expiración en curso.

EXPIRED

Expiración completada.

COMMITTED

Reserva convertida en obligación.

CANCELLED

Reserva cancelada según política.

FAILED

Fallo terminal.

UNKNOWN

Resultado incierto.

## 5. Transiciones permitidas

ACTIVE → RELEASING

PARTIALLY_ACTIVE → RELEASING

RELEASING → RELEASED

ACTIVE → EXPIRING

PARTIALLY_ACTIVE → EXPIRING

EXPIRING → EXPIRED

RELEASING → UNKNOWN

EXPIRING → UNKNOWN

UNKNOWN → RELEASED, tras conciliación.

UNKNOWN → EXPIRED, tras conciliación.

## 6. Transiciones prohibidas

RELEASED → ACTIVE

EXPIRED → ACTIVE

COMMITTED → RELEASED por este caso de uso

COMMITTED → EXPIRED

FAILED → ACTIVE

RELEASED → EXPIRED

EXPIRED → RELEASED

## 7. Causas de liberación

CART_ITEM_REMOVED

CART_QUANTITY_REDUCED

CART_CANCELLED

CHECKOUT_CANCELLED

ORDER_CANCELLED_BEFORE_COMMIT

CUSTOMER_REQUEST

OPERATOR_REQUEST

SYSTEM_COMPENSATION

SESSION_EXPIRED

LOCATION_CHANGED

PRODUCT_CHANGED

DUPLICATE_RESERVATION_COMPENSATION

## 8. Causas de expiración

TTL_REACHED

OWNER_EXPIRED

CART_INACTIVE

CHECKOUT_TIMEOUT

SESSION_CLOSED

POLICY_TIMEOUT

SECURITY_TERMINATION

SYSTEM_RECONCILIATION

## 9. Contrato de liberación

```json
{
  "release_stock_reservation_command_id": "UUID",
  "reservation_id": "UUID",
  "tenant_id": "UUID",
  "actor_id": "UUID_OR_NULL",
  "owner": {
    "type": "CART",
    "id": "UUID"
  },
  "release_quantity": 6,
  "reason": "CART_CANCELLED",
  "expected_reservation_version": 4,
  "expected_inventory_version": 39,
  "idempotency_key": "STRING",
  "correlation_id": "UUID"
}
```

## 10. Contrato de resultado

```json
{
  "release_result_id": "UUID",
  "reservation_id": "UUID",
  "status": "RELEASED",
  "released_quantity": 6,
  "reservation_version_before": 4,
  "reservation_version_after": 5,
  "inventory_version_before": 39,
  "inventory_version_after": 40,
  "reason": "CART_CANCELLED",
  "released_at": "UTC_TIMESTAMP"
}
```

## 11. Liberación total

Libera toda la cantidad activa restante.

Debe producir:

- reserved decrement;
- available increment;
- movimiento;
- Reservation state RELEASED;
- versión nueva;
- evento.

## 12. Liberación parcial

Se permite cuando:

- reserva tiene cantidad mayor;
- owner continúa activo;
- política lo permite;
- cantidad es válida.

El resultado puede mantener:

ACTIVE

con reserved_quantity reducida.

No debe marcar RELEASED si queda cantidad activa.

## 13. Cantidad liberable

Debe calcularse desde estado oficial.

No aceptar una cantidad superior a la reserva activa.

Si release_quantity es null y la operación es total:

- el servidor calcula la cantidad.

## 14. Expiración automática

Una reserva expira cuando:

server_now >= expires_at

y su estado es:

ACTIVE
o
PARTIALLY_ACTIVE

El worker debe reclamar trabajo de forma segura.

## 15. Tiempo del servidor

No usar:

- reloj del navegador;
- timestamp de LLM;
- hora enviada por canal;
- hora local no normalizada.

Usar UTC y reloj confiable.

## 16. Worker de expiración

Responsabilidades:

1. identificar candidatos;
2. reclamar lote;
3. validar estado;
4. validar versión;
5. marcar EXPIRING;
6. liberar cantidad;
7. actualizar balance;
8. marcar EXPIRED;
9. persistir eventos;
10. registrar resultado;
11. reintentar errores transitorios;
12. conciliar UNKNOWN.

## 17. Reclamo de lote

Debe evitar que dos workers procesen la misma reserva.

Opciones:

- lock;
- lease;
- compare-and-swap;
- skip locked;
- partition ownership.

La semántica funcional exige exclusión efectiva.

## 18. Lease del worker

Puede contener:

- worker_id;
- lease_id;
- acquired_at;
- expires_at;
- attempt;
- reservation version.

Si el worker muere:

- otro worker puede recuperar tras expirar lease;
- no duplica liberación.

## 19. Idempotencia de expiración

Clave derivada:

reservation_id
+ expiration_generation
+ expires_at

La misma expiración debe producir un único resultado.

## 20. Carrera con commit

Caso:

Worker intenta expirar.

Order intenta commit.

Ambos esperan versión 4.

Sólo uno puede persistir versión 5.

El perdedor recarga.

Si commit gana:

- no expirar.

Si expiración gana:

- commit falla con RESERVATION_EXPIRED.

## 21. Carrera con liberación manual

Liberación manual y expiración simultáneas.

Sólo una actualiza balance.

La otra devuelve resultado terminal equivalente o conflicto controlado.

## 22. Carrera con renovación

Si política permite renovar:

- renovación debe ocurrir antes de reclamar expiración;
- validar versión;
- incrementar expires_at;
- incrementar reservation version.

Un worker con versión vieja debe rechazar.

## 23. Owner

Debe validarse cuando la liberación es solicitada por owner.

La expiración automática puede operar por autoridad de sistema.

## 24. Autorización

Liberación manual requiere:

- actor;
- owner;
- tenant;
- permiso;
- reason.

Liberación automática usa identidad de servicio restringida.

## 25. Persistencia atómica

Debe persistirse:

- Reservation;
- Inventory Balance;
- Inventory Movement;
- Idempotency Result;
- Outbox Event;
- Expiration Lease cuando aplique.

## 26. Movimiento de inventario

Tipo:

RESERVATION_RELEASED

o

RESERVATION_EXPIRED

Debe registrar:

- quantity;
- bucket changes;
- source Reservation ID;
- versions;
- reason.

## 27. Resultado terminal repetido

Si la reserva ya está RELEASED y llega misma operación:

- devolver resultado anterior o equivalente.

Si llega otra clave pero misma intención:

- no incrementar available;
- indicar ALREADY_RELEASED.

## 28. Reserva ya expirada

Una liberación posterior:

- no modifica balance;
- devuelve estado EXPIRED;
- puede ser éxito idempotente semántico.

## 29. Reserva committed

No debe liberarse por este flujo.

Debe usar:

- cancelación/compensación de pedido;
- ajuste;
- retorno;
- flujo de fulfillment.

## 30. Reserva UNKNOWN

Antes de liberar:

- consultar balance;
- consultar movimientos;
- consultar idempotencia;
- reconstruir estado.

No asumir que sigue activa.

## 31. Fallos transitorios

Ejemplos:

- timeout;
- lock unavailable;
- DB unavailable;
- event bus delayed.

Se puede reintentar con la misma Idempotency Key.

## 32. Fallos permanentes

Ejemplos:

- tenant mismatch;
- owner mismatch;
- invalid state;
- invalid quantity;
- unauthorized.

No reintentar igual.

## 33. Cierre de carrito

Puede liberar:

- todas las reservas;
- por líneas;
- con saga;
- con operación agregada.

Debe producir un resultado consolidado.

## 34. Liberación multi-item

Políticas:

BEST_EFFORT

Libera cada reserva y reporta.

ATOMIC_GROUP

Todo o nada si el almacenamiento lo soporta.

SAGA_COMPENSATED

Control de pasos.

No ocultar fallos parciales.

## 35. Flujo de liberación manual

1. recibir Command.
2. validar schema.
3. validar actor.
4. validar tenant.
5. consultar idempotencia.
6. cargar reserva.
7. validar owner.
8. validar estado.
9. validar versiones.
10. calcular cantidad.
11. marcar RELEASING.
12. actualizar balance.
13. crear movimiento.
14. marcar estado final o activo reducido.
15. persistir atómicamente.
16. emitir evento.
17. devolver resultado.

## 36. Flujo de expiración

1. seleccionar candidato.
2. adquirir lease.
3. cargar reserva.
4. validar expires_at.
5. validar estado.
6. validar versión.
7. marcar EXPIRING.
8. actualizar balance.
9. crear movimiento.
10. marcar EXPIRED.
11. persistir.
12. emitir evento.
13. liberar lease.

## 37. Pseudocódigo de liberación

```text
function release_stock_reservation(command):

    validate_release_command(command)

    previous = get_idempotent_result(command.idempotency_key)
    if previous.exists:
        return previous

    reservation = load_reservation(command.reservation_id)
    validate_tenant(command, reservation)
    validate_owner_or_authority(command, reservation)
    validate_reservation_version(
        reservation,
        command.expected_reservation_version
    )

    if reservation.status in [RELEASED, EXPIRED]:
        return terminal_idempotent_result(reservation)

    validate_state(reservation, [ACTIVE, PARTIALLY_ACTIVE])

    balance = load_inventory_balance_for_reservation(reservation)
    validate_inventory_version(
        balance,
        command.expected_inventory_version
    )

    quantity = calculate_release_quantity(command, reservation)
    validate_release_quantity(quantity, reservation)

    next_reservation = apply_release(reservation, quantity)
    next_balance = apply_release_to_balance(balance, quantity)

    validate_inventory_invariants(next_balance)

    movement = create_release_movement(
        reservation,
        quantity,
        command.reason
    )

    persist_release_atomically(
        next_reservation,
        next_balance,
        movement,
        command.idempotency_key
    )

    emit(StockReservationReleased)
    return build_release_result(next_reservation, next_balance)
```

## 38. Pseudocódigo de expiración

```text
function expire_due_reservation(candidate, worker):

    lease = acquire_expiration_lease(candidate, worker)

    if not lease.acquired:
        return SKIPPED

    reservation = load_reservation(candidate.reservation_id)

    if reservation.status not in [ACTIVE, PARTIALLY_ACTIVE]:
        release_lease(lease)
        return terminal_or_skipped(reservation)

    if server_now() < reservation.expires_at:
        release_lease(lease)
        return NOT_DUE

    idempotency_key = build_expiration_idempotency_key(reservation)

    return release_stock_reservation(
        system_release_command(
            reservation=reservation,
            reason=TTL_REACHED,
            idempotency_key=idempotency_key
        )
    )
```

## 39. Errores

STOCK_RELEASE_REQUEST_INVALID

STOCK_RELEASE_RESERVATION_NOT_FOUND

STOCK_RELEASE_TENANT_MISMATCH

STOCK_RELEASE_OWNER_MISMATCH

STOCK_RELEASE_NOT_AUTHORIZED

STOCK_RELEASE_STATE_INVALID

STOCK_RELEASE_QUANTITY_INVALID

STOCK_RELEASE_QUANTITY_EXCEEDED

STOCK_RELEASE_RESERVATION_VERSION_CONFLICT

STOCK_RELEASE_INVENTORY_VERSION_CONFLICT

STOCK_RELEASE_IDEMPOTENCY_CONFLICT

STOCK_RELEASE_ALREADY_RELEASED

STOCK_RELEASE_ALREADY_EXPIRED

STOCK_RELEASE_COMMITTED_NOT_ALLOWED

STOCK_RELEASE_ATOMICITY_FAILED

STOCK_RELEASE_UNKNOWN

STOCK_EXPIRATION_LEASE_UNAVAILABLE

STOCK_EXPIRATION_NOT_DUE

STOCK_EXPIRATION_WORKER_FAILED

## 40. Eventos

StockReleaseRequested

StockReservationReleasing

StockReservationReleased

StockReservationPartiallyReleased

StockExpirationCandidateDetected

StockExpirationLeaseAcquired

StockReservationExpiring

StockReservationExpired

StockExpirationSkipped

StockReleaseUnknown

StockReleaseFailed

## 41. Observabilidad

Métricas:

- stock_release_requests_total;
- stock_release_success_total;
- stock_release_partial_total;
- stock_release_failure_total;
- stock_release_idempotency_hit_total;
- stock_release_version_conflict_total;
- stock_expiration_candidates_total;
- stock_expiration_success_total;
- stock_expiration_skipped_total;
- stock_expiration_lag_seconds;
- stock_expiration_worker_failure_total;
- stock_release_duration_seconds.

Dimensiones:

- reason;
- owner_type;
- result;
- error_code;
- worker_partition;
- tenant_tier.

## 42. Auditoría

Registrar:

- Release Result ID;
- Reservation ID;
- owner;
- tenant;
- actor o service identity;
- quantity;
- reason;
- state before/after;
- reservation versions;
- inventory versions;
- Correlation ID.

## 43. Seguridad

Amenazas:

- liberar reserva de otro tenant;
- liberar owner ajeno;
- quantity manipulation;
- version spoofing;
- duplicate release;
- fake expiration;
- worker identity spoofing;
- lease theft.

Controles:

- tenant;
- owner;
- authorization;
- service identity;
- schema;
- idempotency;
- version;
- lease;
- audit.

## 44. Casos límite

- liberación total;
- liberación parcial;
- cantidad superior;
- already released;
- already expired;
- committed;
- duplicate;
- same key different payload;
- version conflict;
- expiration due;
- not due;
- two workers;
- worker crash;
- lease expiry;
- commit race;
- renewal race;
- manual release race;
- multi-item;
- partial failure;
- UNKNOWN;
- outbox failure;
- tenant mismatch;
- owner mismatch.

## 45. Criterios de aceptación

AC-REL-001

Toda liberación identifica Reservation ID.

AC-REL-002

Toda liberación respeta tenant.

AC-REL-003

Toda liberación valida owner o autoridad.

AC-REL-004

La liberación es idempotente.

AC-REL-005

La liberación valida estado.

AC-REL-006

La liberación valida versiones.

AC-REL-007

Una reserva terminal no incrementa available otra vez.

AC-REL-008

Una reserva committed no usa este flujo.

AC-REL-009

La expiración usa reloj del servidor.

AC-REL-010

Dos workers no duplican expiración.

AC-REL-011

Las carreras se resuelven por versión.

AC-REL-012

UNKNOWN se concilia.

AC-REL-013

Estado, balance y evento se persisten juntos.

AC-REL-014

Los reintentos conservan el resultado.

AC-REL-015

Toda operación es auditable.

## 46. Plan mínimo de pruebas

- total release;
- partial release;
- invalid quantity;
- already released;
- expired;
- committed;
- tenant;
- owner;
- authorization;
- idempotency;
- conflict;
- reservation version;
- inventory version;
- expiration;
- server clock;
- lease;
- two workers;
- crash;
- commit race;
- renewal race;
- multi-item;
- unknown;
- atomicity;
- outbox;
- metrics;
- audit;
- security.

## 47. Checklist

[ ] Existe Reservation ID.
[ ] Existe reason.
[ ] Existe release quantity.
[ ] Existe tenant.
[ ] Existe owner.
[ ] Existe Idempotency Key.
[ ] Existe expected reservation version.
[ ] Existe expected inventory version.
[ ] Se valida estado.
[ ] Se calcula cantidad.
[ ] Se actualiza balance.
[ ] Se crea movimiento.
[ ] Se controla expiración.
[ ] Se usa reloj del servidor.
[ ] Se usa lease.
[ ] Se controla concurrencia.
[ ] Se persiste atómicamente.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
