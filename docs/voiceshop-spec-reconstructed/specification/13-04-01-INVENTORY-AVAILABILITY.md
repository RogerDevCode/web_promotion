======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-04-01-INVENTORY-AVAILABILITY.md

# CONSULTA OFICIAL DE DISPONIBILIDAD

## 1. Objetivo

Este documento define cómo VoiceShop consulta la disponibilidad oficial
de un producto en una o varias ubicaciones.

La disponibilidad responde preguntas como:

- ¿hay stock?;
- ¿quedan seis unidades?;
- ¿en qué sucursal está disponible?;
- ¿cuántas unidades se pueden vender?;
- ¿la lectura sigue vigente?;
- ¿el resultado es exacto, estimado o degradado?

La consulta de disponibilidad no:

- reserva unidades;
- modifica balances;
- confirma pedidos;
- procesa pagos;
- inventa cantidades;
- sustituye una reserva.

## 2. Alcance

Incluye:

- Product ID;
- Location ID;
- cantidad requerida;
- disponibilidad por sucursal;
- disponibilidad agregada;
- freshness;
- Inventory Version;
- source;
- consistencia;
- lectura exacta;
- lectura degradada;
- filtros;
- restricciones;
- respuesta por voz y texto;
- caché;
- errores;
- observabilidad;
- QA.

No incluye:

- reservas;
- ajustes;
- commit de stock;
- catálogo;
- carrito;
- pedido;
- pago;
- transporte físico.

## 3. Principios

RULE-IAVL-001

Toda consulta debe usar Product ID oficial.

RULE-IAVL-002

Toda consulta debe respetar tenant.

RULE-IAVL-003

Toda respuesta debe indicar Location ID o alcance.

RULE-IAVL-004

Toda respuesta debe indicar Inventory Version.

RULE-IAVL-005

Toda respuesta debe indicar measured_at.

RULE-IAVL-006

AVAILABLE es calculado por el dominio de inventario.

RULE-IAVL-007

La LLM no calcula disponibilidad.

RULE-IAVL-008

Una respuesta de catálogo no sustituye inventario.

RULE-IAVL-009

Una lectura stale debe identificarse.

RULE-IAVL-010

Una cantidad desconocida no debe expresarse como cero.

RULE-IAVL-011

Una consulta no crea reserva.

RULE-IAVL-012

Una consulta de varias ubicaciones debe conservar desglose.

RULE-IAVL-013

Una respuesta agregada no debe permitir doble conteo.

RULE-IAVL-014

Toda consulta debe ser idempotente como lectura.

RULE-IAVL-015

Todo resultado debe ser trazable.

## 4. Tipos de consulta

EXACT_LOCATION

Producto en una ubicación.

MULTI_LOCATION

Producto en varias ubicaciones.

NEAREST_LOCATIONS

Ubicaciones autorizadas según contexto.

AGGREGATED

Total lógico bajo una política.

REQUIRED_QUANTITY

Valida si existe una cantidad específica.

BATCH

Varios productos.

SNAPSHOT

Lectura consistente de múltiples balances.

## 5. Contrato de entrada

```json
{
  "availability_request_id": "UUID",
  "tenant_id": "UUID",
  "actor_id": "UUID_OR_NULL",
  "session_id": "UUID_OR_NULL",
  "product_id": "UUID",
  "location_scope": {
    "mode": "EXACT_LOCATION",
    "location_ids": [
      "UUID"
    ]
  },
  "required_quantity": 6,
  "consistency": "STRONG",
  "freshness_policy": {
    "maximum_age_seconds": 5,
    "allow_stale": false
  },
  "channel": "VOICE",
  "locale": "es-CL"
}
```

## 6. Contrato de salida

```json
{
  "availability_result_id": "UUID",
  "availability_request_id": "UUID",
  "tenant_id": "UUID",
  "product_id": "UUID",
  "availability": {
    "available": true,
    "required_quantity": 6,
    "total_available_quantity": 12,
    "locations": [
      {
        "location_id": "UUID",
        "available_quantity": 12,
        "can_fulfill_required_quantity": true,
        "inventory_version": 38,
        "measured_at": "UTC_TIMESTAMP",
        "freshness": "FRESH"
      }
    ]
  },
  "source": "OFFICIAL_INVENTORY",
  "consistency": "STRONG",
  "warnings": [],
  "retrieved_at": "UTC_TIMESTAMP"
}
```

## 7. Validaciones

VAL-IAVL-001

Product ID existe.

VAL-IAVL-002

Product ID pertenece al tenant.

VAL-IAVL-003

Location ID existe.

VAL-IAVL-004

Location ID pertenece al tenant.

VAL-IAVL-005

Cantidad requerida es válida.

VAL-IAVL-006

Consistency mode es permitido.

VAL-IAVL-007

Freshness policy es válida.

VAL-IAVL-008

El actor puede consultar el alcance.

VAL-IAVL-009

El producto está permitido para consulta.

VAL-IAVL-010

La fuente oficial está disponible o existe fallback permitido.

## 8. Cantidad requerida

Debe ser:

- entera;
- positiva;
- dentro de límites;
- compatible con unidad;
- compatible con presentación.

La consulta:

"¿quedan seis?"

No reserva seis.

Sólo compara:

available_quantity >= required_quantity

## 9. Disponible booleano

Debe derivarse de:

- cantidad disponible;
- restricciones;
- ubicación;
- freshness;
- consistencia;
- política.

No debe derivarse sólo de Product status ACTIVE.

## 10. Disponibilidad por ubicación

Cada resultado debe contener:

- Location ID;
- cantidad;
- Inventory Version;
- measured_at;
- freshness;
- can_fulfill;
- warnings.

## 11. Disponibilidad agregada

Sólo puede sumarse cuando:

- ubicaciones no se solapan;
- política permite dividir fulfillment;
- unidades son equivalentes;
- no hay doble conteo;
- snapshot es consistente.

Si el pedido debe salir de una sola sucursal, el total agregado no
significa que pueda cumplirse.

## 12. Modos de cumplimiento

SINGLE_LOCATION_REQUIRED

Toda cantidad desde una ubicación.

MULTI_LOCATION_ALLOWED

Puede dividirse.

PICKUP_LOCATION_SELECTED

Sólo sucursal elegida.

DELIVERY_NETWORK

Regla de fulfillment.

## 13. Freshness

FRESH

Dentro del máximo permitido.

STALE_ALLOWED

Fuera del máximo, pero permitido con warning.

STALE_DENIED

No puede usarse.

UNKNOWN

No se pudo determinar.

## 14. measured_at

Debe provenir del servidor o fuente oficial.

No confiar en reloj del Cliente.

## 15. Inventory Version

Puede ser:

- versión por balance;
- versión por producto-ubicación;
- snapshot version.

Debe conservarse para:

- reservas;
- revalidaciones;
- diagnóstico;
- concurrencia.

## 16. Consistencia

STRONG

Lectura actual para decisión crítica.

EVENTUAL

Lectura informativa.

SNAPSHOT

Múltiples balances coherentes.

BEST_EFFORT

Degradada, sólo para información no crítica.

## 17. Política por caso

Mostrar stock general:

EVENTUAL puede ser suficiente.

Validar antes de reservar:

STRONG.

Confirmar pedido:

STRONG o reserva vigente.

## 18. Resultado UNKNOWN

Debe usarse cuando:

- fuente no confirma;
- timeout incierto;
- réplica inconsistente;
- snapshot incompleto;
- respuesta inválida.

UNKNOWN no equivale a cero.

## 19. Resultado parcial

En consulta multi-location:

- algunas ubicaciones responden;
- otras fallan.

Debe indicar:

PARTIAL

No debe sumar ubicaciones desconocidas como cero sin advertencia.

## 20. Producto no encontrado

Puede significar:

- Product ID inválido;
- producto sin balance;
- producto de otro tenant;
- producto no gestionado.

No revelar existencia en otro tenant.

## 21. Ubicación no encontrada

Debe distinguir internamente:

- inexistente;
- inactiva;
- no autorizada;
- otro tenant.

El mensaje público puede ser genérico.

## 22. Restricciones

Una disponibilidad positiva puede no autorizar venta por:

- edad;
- horario;
- región;
- canal;
- producto bloqueado;
- ubicación cerrada.

Estas restricciones se devuelven como warnings o denial codes.

## 23. Voz

Respuesta breve:

"Sí. Hay doce unidades disponibles en la sucursal Centro."

Si UNKNOWN:

"No pude verificar el stock en este momento."

No decir:

"Probablemente quedan."

## 24. Texto

Puede mostrar:

- sucursal;
- cantidad;
- freshness;
- botón seleccionar;
- aviso;
- timestamp amigable.

Los botones deben usar referencias firmadas.

## 25. Caché

Puede cachearse para consultas informativas.

Clave mínima:

- tenant;
- Product ID;
- Location ID;
- consistency;
- freshness policy;
- Inventory Version o snapshot;
- visibility.

## 26. Caché prohibida

No usar caché stale para:

- reserva;
- confirmación;
- operación crítica;
- stock restringido;
- conciliación.

## 27. Fallback

Opciones:

- réplica;
- snapshot;
- caché fresh;
- BEST_EFFORT;
- texto degradado;
- handoff.

No inventar cantidades.

## 28. Idempotencia

Mismo Request ID y mismos parámetros:

- puede devolver mismo resultado lógico;
- si latest cambia, debe indicar versión nueva.

## 29. Rate limits

Aplicar por:

- tenant;
- actor;
- Session;
- Product ID;
- ubicación;
- canal;
- batch size.

## 30. Flujo principal

1. Recibir request.
2. validar tenant.
3. validar producto.
4. validar ubicación.
5. validar cantidad.
6. validar consistencia.
7. resolver fuente.
8. obtener balances.
9. validar freshness.
10. calcular disponibilidad oficial.
11. aplicar restricciones.
12. construir desglose.
13. marcar partial/unknown.
14. persistir metadatos.
15. emitir InventoryAvailabilityChecked.
16. devolver resultado.

## 31. Pseudocódigo

```text
function check_inventory_availability(request):

    validate_tenant(request.tenant_id)
    validate_product(request.product_id, request.tenant_id)
    locations = validate_location_scope(
        request.location_scope,
        request.tenant_id
    )
    validate_required_quantity(request.required_quantity)
    validate_consistency_policy(request.consistency)

    balances = load_inventory_balances(
        product_id=request.product_id,
        locations=locations,
        consistency=request.consistency
    )

    validated = validate_balance_freshness(
        balances,
        request.freshness_policy
    )

    official = calculate_official_availability(
        validated,
        fulfillment_policy=request.location_scope.mode
    )

    restricted = apply_inventory_visibility_and_restrictions(
        official,
        request
    )

    result = build_availability_result(restricted)
    persist_availability_metadata(result)
    emit(InventoryAvailabilityChecked)

    return result
```

## 32. Errores

INVENTORY_AVAILABILITY_REQUEST_INVALID

INVENTORY_AVAILABILITY_PRODUCT_NOT_FOUND

INVENTORY_AVAILABILITY_LOCATION_NOT_FOUND

INVENTORY_AVAILABILITY_TENANT_MISMATCH

INVENTORY_AVAILABILITY_QUANTITY_INVALID

INVENTORY_AVAILABILITY_CONSISTENCY_UNSUPPORTED

INVENTORY_AVAILABILITY_STALE

INVENTORY_AVAILABILITY_PARTIAL

INVENTORY_AVAILABILITY_UNKNOWN

INVENTORY_AVAILABILITY_SOURCE_UNAVAILABLE

INVENTORY_AVAILABILITY_TIMEOUT

INVENTORY_AVAILABILITY_RATE_LIMITED

INVENTORY_AVAILABILITY_RESTRICTED

## 33. Eventos

InventoryAvailabilityCheckRequested

InventoryAvailabilityChecked

InventoryAvailabilityInsufficient

InventoryAvailabilityUnknown

InventoryAvailabilityPartial

InventoryAvailabilityStaleRejected

InventoryAvailabilityFallbackUsed

InventoryAvailabilityCheckFailed

## 34. Observabilidad

Métricas:

- inventory_availability_requests_total;
- inventory_availability_success_total;
- inventory_availability_insufficient_total;
- inventory_availability_unknown_total;
- inventory_availability_partial_total;
- inventory_availability_stale_total;
- inventory_availability_duration_seconds;
- inventory_availability_locations_count;
- inventory_availability_cache_hit_total;
- inventory_availability_fallback_total.

Dimensiones:

- consistency;
- freshness;
- scope_mode;
- channel;
- result;
- error_code;
- tenant_tier.

## 35. Auditoría

Registrar:

- Availability Request ID;
- Product ID protegido;
- location scope;
- tenant;
- actor;
- consistency;
- versions;
- resultado;
- error;
- Correlation ID.

No registrar PII innecesaria.

## 36. Seguridad

Amenazas:

- Product ID de otro tenant;
- Location ID de otro tenant;
- enumeración;
- cantidad extrema;
- batch abusivo;
- stale data;
- spoofed version.

Controles:

- tenant;
- schemas;
- rate limit;
- authorization;
- freshness;
- official source;
- output minimization.

## 37. Casos límite

- stock cero;
- stock exacto;
- stock mayor;
- cantidad inválida;
- producto sin balance;
- ubicación cerrada;
- multi-location;
- partial;
- stale;
- unknown;
- source down;
- cache fresh;
- cache stale;
- tenant mismatch;
- product inactive;
- restriction;
- voice;
- text;
- batch;
- duplicated request;
- snapshot mismatch.

## 38. Criterios de aceptación

AC-IAVL-001

Toda consulta usa Product ID oficial.

AC-IAVL-002

Toda consulta respeta tenant.

AC-IAVL-003

Toda respuesta indica ubicación.

AC-IAVL-004

Toda respuesta indica Inventory Version.

AC-IAVL-005

Toda respuesta indica freshness.

AC-IAVL-006

AVAILABLE lo calcula inventario.

AC-IAVL-007

La LLM no calcula stock.

AC-IAVL-008

UNKNOWN no equivale a cero.

AC-IAVL-009

Una consulta no reserva.

AC-IAVL-010

El agregado respeta fulfillment.

AC-IAVL-011

Las lecturas stale se marcan.

AC-IAVL-012

La voz usa respuesta breve.

AC-IAVL-013

La caché crítica se restringe.

AC-IAVL-014

El fallback no inventa.

AC-IAVL-015

Todo resultado es trazable.

## 39. Plan mínimo de pruebas

- exact location;
- multi-location;
- aggregated;
- required quantity;
- zero;
- exact;
- insufficient;
- product;
- location;
- tenant;
- consistency;
- freshness;
- stale;
- unknown;
- partial;
- cache;
- fallback;
- restrictions;
- voice;
- text;
- batch;
- rate limit;
- timeout;
- metrics;
- audit;
- security.

## 40. Checklist

[ ] Existe Request ID.
[ ] Existe Product ID.
[ ] Existe tenant.
[ ] Existe location scope.
[ ] Existe required quantity.
[ ] Existe consistency.
[ ] Existe freshness policy.
[ ] Existe Inventory Version.
[ ] Existe measured_at.
[ ] Existe source.
[ ] Se valida producto.
[ ] Se valida ubicación.
[ ] Se calcula disponibilidad.
[ ] Se controla agregado.
[ ] Se controla stale.
[ ] Se controla unknown.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
