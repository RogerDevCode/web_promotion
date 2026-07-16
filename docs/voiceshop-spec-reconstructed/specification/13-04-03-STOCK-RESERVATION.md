======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-04-03-STOCK-RESERVATION.md

# RESERVA DE STOCK

## 1. Objetivo

Este documento define cómo VoiceShop retiene temporalmente unidades de un
producto para un carrito, pedido u otro propietario autorizado.

Una reserva reduce la cantidad disponible según política.

Una reserva no equivale a:

- pago aprobado;
- pedido confirmado;
- despacho;
- consumo físico;
- stock comprometido definitivo.

## 2. Alcance

Incluye:

- creación;
- owner;
- Product ID;
- Location ID;
- cantidad;
- expiración;
- idempotencia;
- expected version;
- all-or-nothing;
- reserva parcial;
- cambio de cantidad;
- multi-item;
- confirmación;
- errores;
- observabilidad;
- QA.

No incluye:

- liberación detallada;
- expiración detallada;
- commit a pedido;
- ajustes;
- pago;
- fulfillment físico.

## 3. Principios

RULE-RES-001

Toda reserva posee Reservation ID.

RULE-RES-002

Toda reserva pertenece a tenant.

RULE-RES-003

Toda reserva posee owner.

RULE-RES-004

Toda reserva posee Product ID y Location ID.

RULE-RES-005

Toda reserva posee cantidad positiva.

RULE-RES-006

Toda reserva temporal posee expires_at.

RULE-RES-007

Toda creación usa Idempotency Key.

RULE-RES-008

Toda creación valida Inventory Version.

RULE-RES-009

No se reserva más de AVAILABLE.

RULE-RES-010

La LLM no crea reservas directamente.

RULE-RES-011

La política parcial debe ser explícita.

RULE-RES-012

Una reserva activa debe ser trazable.

RULE-RES-013

Una reserva duplicada no reduce dos veces.

RULE-RES-014

Una reserva expirada no puede confirmarse.

RULE-RES-015

Toda transición emite evento.

## 4. Estados

REQUESTED

VALIDATING

ACTIVE

PARTIALLY_ACTIVE

COMMITTING

COMMITTED

RELEASING

RELEASED

EXPIRING

EXPIRED

CANCELLED

FAILED

UNKNOWN

## 5. Contrato de creación

```json
{
  "reserve_stock_command_id": "UUID",
  "tenant_id": "UUID",
  "actor_id": "UUID_OR_NULL",
  "owner": {
    "type": "CART",
    "id": "UUID"
  },
  "product_id": "UUID",
  "location_id": "UUID",
  "quantity": 6,
  "reservation_policy": "ALL_OR_NOTHING",
  "ttl_seconds": 900,
  "expected_inventory_version": 38,
  "idempotency_key": "STRING",
  "correlation_id": "UUID"
}
```

## 6. Contrato de resultado

```json
{
  "reservation_id": "UUID",
  "status": "ACTIVE",
  "tenant_id": "UUID",
  "owner": {
    "type": "CART",
    "id": "UUID"
  },
  "product_id": "UUID",
  "location_id": "UUID",
  "requested_quantity": 6,
  "reserved_quantity": 6,
  "inventory_version_before": 38,
  "inventory_version_after": 39,
  "created_at": "UTC_TIMESTAMP",
  "expires_at": "UTC_TIMESTAMP",
  "idempotency_key_hash": "HASH"
}
```

## 7. Owner

Tipos permitidos:

CART

ORDER

CHECKOUT_SESSION

OPERATOR_HOLD

SYSTEM_PROCESS

Cada owner debe:

- existir;
- pertenecer al tenant;
- estar en estado compatible;
- estar autorizado.

## 8. Cantidad

Debe ser:

- positiva;
- compatible con unidad;
- dentro de límites;
- validada contra presentación;
- no derivada de texto sin validación.

## 9. TTL

Debe tener:

- mínimo;
- máximo;
- default;
- política por owner;
- expiración absoluta.

El Cliente no debe poder fijar un TTL arbitrario.

## 10. ALL_OR_NOTHING

Si available < requested:

- no reservar;
- devolver INSUFFICIENT_STOCK;
- no cambiar balance.

## 11. ALLOW_PARTIAL

Si la política lo permite:

- reservar min(available, requested);
- status PARTIALLY_ACTIVE;
- informar cantidad;
- requerir aceptación si cambia intención.

## 12. Política recomendada

Para carrito minorista:

ALL_OR_NOTHING por línea.

Para fulfillment especial:

ALLOW_PARTIAL explícito.

## 13. Validaciones previas

VAL-RES-001

Tenant válido.

VAL-RES-002

Actor autorizado.

VAL-RES-003

Owner existe.

VAL-RES-004

Owner pertenece al tenant.

VAL-RES-005

Product ID válido.

VAL-RES-006

Location ID válido.

VAL-RES-007

Cantidad válida.

VAL-RES-008

Policy permitida.

VAL-RES-009

TTL permitido.

VAL-RES-010

Expected version coincide.

VAL-RES-011

Available suficiente.

VAL-RES-012

Idempotency Key válida.

## 14. Product status

Antes de reservar:

- Product ID existe;
- status permite;
- tenant coincide;
- restricción comercial validada.

## 15. Location status

Debe estar:

- activa;
- operativa;
- compatible con owner;
- autorizada.

## 16. Autorización

El actor puede ser:

- Cliente autenticado;
- Session anónima autorizada;
- Operador;
- servicio interno.

La autorización se evalúa fuera de la LLM.

## 17. Idempotencia

Clave:

tenant
+ owner
+ product
+ location
+ operation intent
+ client key

Misma clave, mismo payload:

- mismo Reservation ID;
- no reduce stock otra vez.

Misma clave, distinto payload:

- INVENTORY_IDEMPOTENCY_CONFLICT.

## 18. Concurrencia

Dos reservas compiten por el mismo balance.

Ambas leen version 38.

Sólo una debe persistir version 39.

La otra recibe conflicto, recarga y reevalúa.

## 19. Bloqueo

Puede usarse:

- optimistic concurrency;
- row lock;
- distributed lock;
- atomic compare-and-swap.

La semántica funcional debe preservar invariantes.

## 20. Reserva multi-item

Puede implementarse:

ATOMIC_CART_RESERVATION

Todo o nada.

PER_LINE_RESERVATION

Cada línea independiente.

SAGA

Reserva secuencial con compensación.

La política debe ser explícita.

## 21. Atomicidad multi-item

Si todo o nada:

- todas las líneas se reservan;
- o ninguna;
- las fallidas deben compensarse;
- el resultado debe ser único.

## 22. Orden de adquisición

Para evitar deadlock:

- ordenar balances por key estable;
- reservar en orden;
- timeout;
- rollback.

## 23. Cambio de cantidad

Puede:

- aumentar;
- disminuir.

Aumentar:

- requiere disponibilidad;
- versión;
- idempotencia;
- puede fallar.

Disminuir:

- libera diferencia;
- no puede ser negativa;
- debe conservar owner.

## 24. Cambio de ubicación

Por defecto:

- crear nueva reserva;
- liberar anterior;
- usar saga;
- no mutar silenciosamente.

## 25. Cambio de producto

Igual:

- nueva reserva;
- liberar anterior.

## 26. Renovación

Puede permitirse:

- owner activo;
- reserva no expirada;
- política;
- límite;
- actor autorizado.

No renovar indefinidamente.

## 27. Confirmación de reserva

Una reserva ACTIVE puede convertirse a COMMITTED por Order Context.

Debe validar:

- owner;
- estado;
- expiración;
- Order ID;
- version;
- idempotencia.

## 28. UNKNOWN

Puede ocurrir si una dependencia externa no confirma resultado.

Acciones:

- no repetir a ciegas;
- consultar Reservation ID o idempotency;
- conciliar balance;
- bloquear nuevas operaciones relacionadas si es necesario.

## 29. Eventos

La creación debe emitir:

StockReservationRequested

StockReserved

o

StockReservationRejected

## 30. Persistencia atómica

Debe persistirse:

- Reservation;
- Balance;
- Movement;
- Outbox;
- Idempotency Result.

En una transacción o mecanismo equivalente.

## 31. Flujo principal

1. recibir command.
2. validar schema.
3. validar actor.
4. validar tenant.
5. validar owner.
6. validar producto.
7. validar ubicación.
8. validar cantidad.
9. validar policy.
10. validar TTL.
11. consultar idempotencia.
12. cargar balance.
13. validar version.
14. calcular available.
15. decidir cantidad.
16. crear Reservation.
17. actualizar buckets.
18. crear movement.
19. persistir atómicamente.
20. emitir evento.
21. devolver resultado.

## 32. Pseudocódigo

```text
function reserve_stock(command):

    validate_reserve_stock_command(command)
    validate_actor_authorization(command.actor_id, command.owner)
    validate_tenant_relationships(command)
    validate_product_and_location(command)

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

    reservable = calculate_available(balance)

    reserved_quantity = decide_reserved_quantity(
        requested=command.quantity,
        available=reservable,
        policy=command.reservation_policy
    )

    if reserved_quantity == 0:
        reject(INVENTORY_INSUFFICIENT_STOCK)

    reservation = create_reservation(
        command,
        reserved_quantity,
        expires_at=calculate_expiration(command.ttl_seconds)
    )

    next_balance = apply_reservation_to_balance(
        balance,
        reserved_quantity
    )

    validate_inventory_invariants(next_balance)

    persist_reservation_balance_movement_outbox(
        reservation,
        next_balance
    )

    emit(StockReserved)
    return reservation
```

## 33. Errores

STOCK_RESERVATION_REQUEST_INVALID

STOCK_RESERVATION_OWNER_NOT_FOUND

STOCK_RESERVATION_OWNER_STATE_INVALID

STOCK_RESERVATION_NOT_AUTHORIZED

STOCK_RESERVATION_PRODUCT_NOT_FOUND

STOCK_RESERVATION_LOCATION_NOT_FOUND

STOCK_RESERVATION_TENANT_MISMATCH

STOCK_RESERVATION_QUANTITY_INVALID

STOCK_RESERVATION_TTL_INVALID

STOCK_RESERVATION_POLICY_NOT_ALLOWED

STOCK_RESERVATION_INSUFFICIENT_STOCK

STOCK_RESERVATION_VERSION_CONFLICT

STOCK_RESERVATION_IDEMPOTENCY_CONFLICT

STOCK_RESERVATION_ATOMICITY_FAILED

STOCK_RESERVATION_UNKNOWN

STOCK_RESERVATION_DEPENDENCY_UNAVAILABLE

## 34. Eventos

StockReservationRequested

StockReservationValidationStarted

StockReservationRejected

StockReserved

StockPartiallyReserved

StockReservationRenewed

StockReservationQuantityChanged

StockReservationUnknown

StockReservationFailed

## 35. Observabilidad

Métricas:

- stock_reservation_requests_total;
- stock_reservation_success_total;
- stock_reservation_rejected_total;
- stock_reservation_partial_total;
- stock_reservation_unknown_total;
- stock_reservation_version_conflict_total;
- stock_reservation_idempotency_hit_total;
- stock_reservation_duration_seconds;
- stock_reserved_quantity;
- stock_reservation_ttl_seconds.

Dimensiones:

- owner_type;
- policy;
- result;
- error_code;
- location_type;
- tenant_tier.

## 36. Auditoría

Registrar:

- Reservation ID;
- owner;
- Product ID protegido;
- Location ID;
- requested/reserved;
- policy;
- version before/after;
- expiration;
- actor;
- Correlation ID.

## 37. Seguridad

Amenazas:

- owner de otro tenant;
- Product ID ajeno;
- Location ID ajena;
- cantidad extrema;
- TTL abusivo;
- replay;
- version spoof;
- actor spoof;
- duplicate reservation.

Controles:

- tenant;
- authorization;
- schema;
- limits;
- idempotency;
- version;
- audit;
- rate limit.

## 38. Voz

La voz puede solicitar:

"Reserva seis."

Antes de reservar debe existir:

- Product ID resuelto;
- cantidad validada;
- ubicación;
- política;
- herramienta autorizada.

La respuesta hablada usa resultado oficial.

## 39. Texto

Puede mostrar:

- cantidad reservada;
- expiración;
- ubicación;
- estado;
- acción liberar;
- warning parcial.

## 40. Casos límite

- stock exacto;
- stock insuficiente;
- partial allowed;
- partial denied;
- duplicate;
- same key different quantity;
- version conflict;
- owner closed;
- product inactive;
- location inactive;
- TTL min;
- TTL max;
- concurrent reservations;
- multi-item;
- deadlock;
- persistence failure;
- outbox failure;
- UNKNOWN;
- voice;
- text;
- human control.

## 41. Criterios de aceptación

AC-RES-001

Toda reserva tiene Reservation ID.

AC-RES-002

Toda reserva tiene owner.

AC-RES-003

Toda reserva respeta tenant.

AC-RES-004

Toda reserva tiene Product ID y Location ID.

AC-RES-005

Toda reserva tiene cantidad positiva.

AC-RES-006

Toda reserva temporal expira.

AC-RES-007

Toda creación usa idempotencia.

AC-RES-008

Toda creación valida versión.

AC-RES-009

No se reserva más de AVAILABLE.

AC-RES-010

La reserva duplicada no descuenta dos veces.

AC-RES-011

La política parcial es explícita.

AC-RES-012

La LLM no crea reserva directa.

AC-RES-013

La persistencia es atómica.

AC-RES-014

UNKNOWN se concilia.

AC-RES-015

Todo resultado es trazable.

## 42. Plan mínimo de pruebas

- owner;
- product;
- location;
- tenant;
- quantity;
- TTL;
- all-or-nothing;
- partial;
- exact stock;
- insufficient;
- idempotency;
- conflict;
- version;
- concurrency;
- multi-item;
- atomicity;
- deadlock;
- product inactive;
- location inactive;
- unknown;
- outbox;
- voice;
- text;
- security;
- metrics;
- audit.

## 43. Checklist

[ ] Existe Reservation ID.
[ ] Existe owner.
[ ] Existe tenant.
[ ] Existe Product ID.
[ ] Existe Location ID.
[ ] Existe quantity.
[ ] Existe policy.
[ ] Existe TTL.
[ ] Existe expires_at.
[ ] Existe expected version.
[ ] Existe Idempotency Key.
[ ] Se valida disponibilidad.
[ ] Se actualiza balance.
[ ] Se crea movement.
[ ] Se persiste atómicamente.
[ ] Se emiten eventos.
[ ] Se audita.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
