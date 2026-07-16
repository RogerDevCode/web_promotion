======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-01-05-SLOT-FILLING.md

# SLOT FILLING

## 1. Objetivo

Este documento define cómo VoiceShop determina qué información necesita
para completar una intención y cómo solicita, valida, conserva o descarta
los valores faltantes.

Un slot es un campo tipado requerido u opcional para un caso de uso.

Ejemplo:

ADD_PRODUCT requiere:

- product_reference;
- quantity.

Si falta product_reference, el sistema debe preguntar.

No debe inventarlo.

## 2. Principios

RULE-SLOT-001

Todo slot debe pertenecer a un esquema versionado.

RULE-SLOT-002

Todo slot debe declarar tipo.

RULE-SLOT-003

Todo slot obligatorio debe estar resuelto antes de crear un comando.

RULE-SLOT-004

Un candidato no equivale a un valor resuelto.

RULE-SLOT-005

Una inferencia debe marcarse.

RULE-SLOT-006

Un valor de contexto debe conservar su procedencia.

RULE-SLOT-007

Un valor expirado debe descartarse.

RULE-SLOT-008

Un valor incompatible con el estado debe rechazarse.

RULE-SLOT-009

Una LLM no puede completar silenciosamente un slot crítico.

RULE-SLOT-010

Las aclaraciones deben limitarse.

RULE-SLOT-011

El Cliente puede corregir un slot previamente capturado.

RULE-SLOT-012

Un cambio de intención debe cancelar o archivar slots incompatibles.

RULE-SLOT-013

Los slots sensibles deben minimizarse.

RULE-SLOT-014

Un slot debe poder auditarse sin exponer información innecesaria.

RULE-SLOT-015

Un comando no debe construirse con slots ambiguos.

## 3. Estados de un slot

MISSING

No existe valor.

CANDIDATE

Existe valor candidato no validado.

AMBIGUOUS

Existen varios valores o interpretaciones.

RESOLVING

Se consulta una fuente oficial.

RESOLVED

Existe valor validado.

CONFIRMATION_REQUIRED

El valor requiere confirmación.

CONFIRMED

El Cliente confirmó.

REJECTED

El valor no es válido.

EXPIRED

El valor perdió vigencia.

REVOKED

El Cliente lo corrigió o retiró.

## 4. Contrato de slot

```json
{
  "slot_id": "UUID",
  "name": "product_reference",
  "type": "PRODUCT_REFERENCE",
  "required": true,
  "state": "RESOLVED",
  "surface": "lager norte",
  "candidate_value": "lager norte",
  "resolved_value": {
    "product_id": "UUID",
    "catalog_version": 42
  },
  "source": "CURRENT_TURN",
  "source_turn_id": "UUID",
  "confidence": 0.96,
  "expires_at": null,
  "sensitive": false,
  "confirmation_required": false,
  "version": 2
}
```

## 5. Esquema por intención

Ejemplo ADD_PRODUCT:

```yaml
intent: ADD_PRODUCT
slots:
  product_reference:
    type: PRODUCT_REFERENCE
    required: true
    resolution: CATALOG
  quantity:
    type: POSITIVE_QUANTITY
    required: true
    default_policy: NONE
  branch_reference:
    type: BRANCH_REFERENCE
    required: false
    default_policy: SESSION_BRANCH
```

Ejemplo CONFIRM_ORDER:

```yaml
intent: CONFIRM_ORDER
slots:
  order_reference:
    type: ORDER_REFERENCE
    required: true
  confirmation_token:
    type: SIGNED_CONFIRMATION
    required: true
  expected_order_version:
    type: VERSION
    required: true
  payment_method:
    type: PAYMENT_METHOD
    required: true
  fulfillment:
    type: FULFILLMENT
    required: true
```

## 6. Fuentes de valores

CURRENT_TURN

Valor explícito del mensaje actual.

PENDING_INTENT

Valor recogido en turnos anteriores del mismo flujo.

SESSION_CONTEXT

Valor autorizado de la sesión.

DOMAIN_DEFAULT

Valor definido por reglas.

SIGNED_INTERACTION

Valor proveniente de botón o formulario firmado.

OFFICIAL_LOOKUP

Valor resuelto contra fuente oficial.

OPERATOR_INPUT

Valor proporcionado por Operador autorizado.

INFERENCE

Inferencia probabilística.

Los slots críticos no deben resolverse únicamente con INFERENCE.

## 7. Precedencia

Orden sugerido:

1. corrección explícita actual;
2. interacción firmada vigente;
3. valor oficial resuelto;
4. valor explícito actual;
5. valor pendiente confirmado;
6. contexto autorizado;
7. default de dominio;
8. inferencia.

Una nueva corrección explícita revoca el valor anterior.

## 8. Tipos de slot

- PRODUCT_REFERENCE;
- PRODUCT_ID;
- POSITIVE_QUANTITY;
- UNIT;
- BRANCH_REFERENCE;
- ADDRESS;
- DELIVERY_WINDOW;
- PAYMENT_METHOD;
- ORDER_REFERENCE;
- CART_REFERENCE;
- PROMOTION_REFERENCE;
- CONTACT;
- CONFIRMATION;
- VERSION;
- CURRENCY;
- LANGUAGE;
- REASON;
- OPERATOR_REFERENCE;
- BOOLEAN;
- ENUM;
- TEXT_LIMITED.

## 9. Valores por defecto

Un default sólo puede aplicarse si está documentado.

Ejemplos válidos:

- currency = moneda del tenant;
- language = idioma de la sesión;
- branch = sucursal seleccionada;
- quantity = 1 únicamente si la política comercial lo permite.

No aplicar quantity = 1 de manera global sin regla.

Toda aplicación de default debe registrar:

- política;
- versión;
- motivo.

## 10. Aclaraciones

Una aclaración debe resolver una dimensión.

Correcto:

"¿Qué producto deseas agregar?"

Correcto:

"¿Cuántas unidades deseas?"

Incorrecto:

"¿Qué producto, cuántos, para cuándo y cómo pagarás?"

La pregunta puede ofrecer opciones oficiales.

Debe evitar preguntas abiertas cuando existe una lista cerrada.

## 11. Orden de aclaraciones

Prioridad:

1. identidad del objeto principal;
2. cantidad;
3. variante;
4. sucursal;
5. cumplimiento;
6. pago;
7. datos opcionales.

La prioridad puede variar por intención.

## 12. Límite de aclaraciones

Debe configurarse:

- máximo total por intención;
- máximo por slot;
- timeout;
- máximo de fallos de resolución.

Al exceder:

- cancelar intención;
- ofrecer reinicio;
- derivar a humano;
- nunca mantener flujo infinito.

## 13. Corrección de slots

Ejemplo:

Cliente:

"Agrega seis Lager Norte."

Luego:

"No, cuatro."

El quantity anterior:

state = REVOKED

Nuevo quantity:

state = CANDIDATE o RESOLVED.

Debe conservarse el historial.

## 14. Cambio de intención

Cuando el Cliente cambia de intención:

- cancelar pending_intent;
- revocar slots no reutilizables;
- conservar slots reutilizables sólo si existe una regla;
- registrar motivo;
- iniciar nuevo esquema.

No arrastrar product_reference a una intención no relacionada.

## 15. Expiración

Slots que pueden expirar:

- precio;
- stock;
- promoción;
- menú;
- confirmación;
- dirección temporal;
- ventana de entrega;
- sesión de pago;
- versión de pedido.

Los slots comerciales dinámicos deben incluir:

- resolved_at;
- expires_at;
- source_version.

## 16. Confirmación

Slots que suelen requerir confirmación:

- dirección;
- producto ambiguo resuelto;
- cantidad alta;
- total cambiado;
- método de pago;
- pedido;
- cancelación;
- devolución;
- ventana de entrega.

La confirmación debe referenciar el valor exacto y su versión.

## 17. Validación

VAL-SLOT-001

El slot existe en el esquema.

VAL-SLOT-002

El tipo coincide.

VAL-SLOT-003

El valor cumple restricciones.

VAL-SLOT-004

La fuente está permitida.

VAL-SLOT-005

La confianza es suficiente.

VAL-SLOT-006

El valor no expiró.

VAL-SLOT-007

La referencia pertenece al tenant.

VAL-SLOT-008

El actor puede proporcionar el valor.

VAL-SLOT-009

La versión sigue vigente.

VAL-SLOT-010

Los slots relacionados son consistentes.

## 18. Dependencias entre slots

Ejemplos:

- product_reference condiciona variant;
- fulfillment_type condiciona address;
- payment_method condiciona payment_flow;
- branch condiciona stock;
- order_reference condiciona expected_version;
- promotion condiciona eligibility.

Debe existir un grafo de dependencias sin ciclos incontrolados.

## 19. Resolución oficial

PRODUCT_REFERENCE:

Catalog Resolver.

BRANCH_REFERENCE:

Branch Resolver.

ADDRESS:

Address Validator o servicio autorizado.

ORDER_REFERENCE:

Order Repository con autorización.

PAYMENT_METHOD:

catálogo permitido del tenant.

PROMOTION_REFERENCE:

Promotion Engine.

## 20. Flujo principal

1. Cargar esquema de slots.
2. Mapear entidades a slots.
3. cargar pending slots.
4. aplicar correcciones.
5. aplicar valores firmados.
6. aplicar contexto permitido.
7. aplicar defaults permitidos.
8. validar tipos.
9. resolver referencias.
10. marcar ambigüedades.
11. verificar expiración.
12. verificar dependencias.
13. identificar faltantes.
14. determinar confirmaciones.
15. si falta información, crear aclaración.
16. si está completo, marcar intent_ready.
17. persistir estado.
18. emitir SlotsUpdated.
19. entregar al router.

## 21. Pseudocódigo

```text
function fill_slots(intent, entities, pending_state, context):

    schema = load_slot_schema(intent)
    slots = initialize_slots(schema)

    apply_pending_values(slots, pending_state)
    apply_entities(slots, entities)
    apply_explicit_corrections(slots, entities)
    apply_signed_values(slots, context.signed_interaction)
    apply_context_values(slots, context)
    apply_allowed_defaults(slots, schema)

    for slot in slots:
        validate_slot_type(slot)
        validate_slot_source(slot)
        validate_slot_expiration(slot)

        if slot.requires_official_resolution:
            resolve_slot(slot)

        if slot.is_ambiguous:
            slot.state = AMBIGUOUS

        if slot.requires_confirmation:
            slot.state = CONFIRMATION_REQUIRED

    validate_slot_dependencies(slots)

    missing = required_slots_not_resolved(slots)

    if missing:
        question = build_single_dimension_clarification(missing, slots)
        persist_pending_intent(intent, slots, question)
        emit(IntentClarificationRequired)
        return Clarification(question, slots)

    if any_confirmation_required(slots):
        confirmation = build_versioned_confirmation(slots)
        persist_confirmation(confirmation)
        return ConfirmationRequired(confirmation)

    persist_slots(slots)
    emit(SlotsResolved)
    return IntentReady(intent, slots)
```

## 22. Errores

SLOT_SCHEMA_UNAVAILABLE

SLOT_UNKNOWN

SLOT_TYPE_INVALID

SLOT_VALUE_INVALID

SLOT_SOURCE_NOT_ALLOWED

SLOT_REFERENCE_AMBIGUOUS

SLOT_REFERENCE_NOT_FOUND

SLOT_EXPIRED

SLOT_VERSION_STALE

SLOT_CONFIRMATION_REQUIRED

SLOT_DEPENDENCY_INVALID

SLOT_CLARIFICATION_LIMIT_EXCEEDED

SLOT_SENSITIVE_DATA_POLICY_VIOLATION

SLOT_TENANT_MISMATCH

## 23. Eventos

SlotCandidateDetected

SlotResolved

SlotRejected

SlotRevoked

SlotExpired

SlotAmbiguous

SlotsUpdated

SlotsResolved

SlotConfirmationRequired

PendingIntentCreated

PendingIntentUpdated

PendingIntentCancelled

ClarificationLimitExceeded

## 24. Observabilidad

Métricas:

- slot_resolution_total;
- slot_missing_total;
- slot_ambiguity_total;
- slot_clarification_total;
- slot_confirmation_total;
- slot_expired_total;
- slot_resolution_duration_seconds;
- pending_intent_total;
- pending_intent_cancelled_total.

Dimensiones:

- intent;
- slot_name;
- slot_type;
- source;
- result;
- resolver;
- schema_version.

## 25. Seguridad y privacidad

- minimizar slots sensibles;
- no enviar dirección completa a clasificadores innecesarios;
- no guardar credenciales;
- no usar slots del cliente como autorización;
- validar tenant;
- validar propiedad de Order ID;
- cifrar datos sensibles en persistencia;
- aplicar retención;
- enmascarar en logs.

## 26. Casos límite

- quantity presente, producto ausente;
- producto presente, quantity ausente;
- quantity = 0;
- quantity negativa;
- "otra";
- "la misma";
- default de sucursal inexistente;
- stock cambia durante aclaración;
- precio expira;
- confirmación expira;
- Cliente corrige tres veces;
- Cliente cambia de intención;
- dos productos, una cantidad;
- una dirección parcial;
- comuna no soportada;
- Order ID de otro Cliente;
- botón firmado antiguo;
- Operador corrige slot;
- slot sensible en logs;
- aclaración repetida;
- respuesta irrelevante;
- emoji afirmativo;
- voz con confianza baja.

## 27. Criterios de aceptación

AC-SLOT-001

Todo slot pertenece a esquema.

AC-SLOT-002

Todo slot tiene estado.

AC-SLOT-003

Los slots obligatorios se resuelven antes del comando.

AC-SLOT-004

Los candidatos no se tratan como oficiales.

AC-SLOT-005

Las correcciones revocan valores anteriores.

AC-SLOT-006

Las aclaraciones son específicas.

AC-SLOT-007

Existe límite de aclaraciones.

AC-SLOT-008

Los valores expirados no se usan.

AC-SLOT-009

Los valores de contexto tienen procedencia.

AC-SLOT-010

Los defaults están documentados.

AC-SLOT-011

Los slots críticos no se completan sólo por inferencia.

AC-SLOT-012

Las confirmaciones tienen versión.

AC-SLOT-013

El cambio de intención cancela slots incompatibles.

AC-SLOT-014

Los datos sensibles se protegen.

AC-SLOT-015

El sistema puede reconstruir el historial del slot.

## 28. Plan mínimo de pruebas

- esquema completo;
- slot faltante;
- tipo inválido;
- default permitido;
- default prohibido;
- resolución oficial;
- ambigüedad;
- referencia inexistente;
- expiración;
- corrección;
- cambio de intención;
- confirmación;
- confirmación expirada;
- versión antigua;
- tenant mismatch;
- datos sensibles;
- límite de aclaraciones;
- múltiples slots;
- dependencias;
- voz;
- Operador;
- idempotencia;
- reinicio;
- persistencia;
- auditoría.

## 29. Checklist

[ ] Existe esquema.
[ ] Existe versión.
[ ] Cada slot tiene tipo.
[ ] Cada slot tiene estado.
[ ] Cada slot tiene fuente.
[ ] Se aplican precedencias.
[ ] Se validan correcciones.
[ ] Se validan expiraciones.
[ ] Se resuelven referencias.
[ ] Se identifican faltantes.
[ ] Se identifican ambigüedades.
[ ] Se generan aclaraciones.
[ ] Se limita aclaración.
[ ] Se generan confirmaciones.
[ ] Se validan dependencias.
[ ] Se protege información sensible.
[ ] Se persiste historial.
[ ] Se emiten eventos.
[ ] Existen métricas.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
