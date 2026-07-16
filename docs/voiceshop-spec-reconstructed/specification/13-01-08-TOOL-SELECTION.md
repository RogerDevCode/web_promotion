======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-01-08-TOOL-SELECTION.md

# SELECCIÓN Y PROPUESTA DE HERRAMIENTAS

## 1. Objetivo

Este documento define cómo VoiceShop determina qué herramienta puede
proponerse para cumplir una intención validada.

La selección de herramienta no ejecuta la herramienta.

Produce una Tool Proposal.

La ejecución sólo ocurre después de:

- validar esquema;
- resolver referencias;
- autenticar;
- autorizar;
- verificar estado;
- verificar idempotencia;
- solicitar confirmación cuando corresponda;
- crear el Command oficial.

## 2. Principios

RULE-TOOL-001

Toda herramienta debe estar registrada.

RULE-TOOL-002

Toda herramienta debe poseer versión.

RULE-TOOL-003

Toda herramienta debe declarar efectos.

RULE-TOOL-004

Toda herramienta debe declarar riesgo.

RULE-TOOL-005

Una LLM sólo puede seleccionar herramientas visibles.

RULE-TOOL-006

Una herramienta visible no está automáticamente autorizada.

RULE-TOOL-007

La autorización se evalúa fuera de la LLM.

RULE-TOOL-008

Los argumentos se consideran candidatos.

RULE-TOOL-009

Los IDs producidos por la LLM no son confiables.

RULE-TOOL-010

Los precios producidos por la LLM no son confiables.

RULE-TOOL-011

Las herramientas irreversibles requieren confirmación.

RULE-TOOL-012

Una propuesta fuera de esquema se rechaza.

RULE-TOOL-013

Una herramienta incompatible con el estado se rechaza.

RULE-TOOL-014

Las herramientas administrativas no deben exponerse al Cliente.

RULE-TOOL-015

La ejecución debe ser idempotente cuando pueda repetirse.

## 3. Catálogo inicial

TOOL-CATALOG-SEARCH-PRODUCTS

Efecto:

READ_ONLY

Caso de uso:

UC-005

TOOL-CATALOG-GET-DETAILS

Efecto:

READ_ONLY

TOOL-INVENTORY-GET-AVAILABILITY

Efecto:

READ_ONLY

TOOL-PROMOTION-GET-ACTIVE

Efecto:

READ_ONLY

TOOL-CART-CREATE

Efecto:

WRITE_REVERSIBLE

TOOL-CART-ADD-PRODUCT

Efecto:

WRITE_REVERSIBLE

TOOL-CART-CHANGE-QUANTITY

Efecto:

WRITE_REVERSIBLE

TOOL-CART-REMOVE-PRODUCT

Efecto:

WRITE_REVERSIBLE

TOOL-CART-VIEW

Efecto:

READ_ONLY

TOOL-ORDER-CREATE

Efecto:

WRITE_CONTROLLED

TOOL-ORDER-CONFIRM

Efecto:

WRITE_IRREVERSIBLE_OR_HIGH_RISK

TOOL-ORDER-CANCEL

Efecto:

WRITE_HIGH_RISK

TOOL-ORDER-GET-STATUS

Efecto:

READ_AUTHORIZED

TOOL-HUMAN-REQUEST

Efecto:

WRITE_LOW_RISK

## 4. Metadatos de herramienta

```yaml
tool_id: TOOL-CART-ADD-PRODUCT
name: add_product_to_cart
version: 1
description: Propone agregar un producto oficial a un carrito activo.
effect: WRITE_REVERSIBLE
risk: MEDIUM
actors:
  - CLIENT
  - OPERATOR
session_states:
  - ACTIVE
  - VOICE_ACTIVE
control_states:
  - CONTROL_AUTOMATED
requires_authentication: false
requires_authorization: true
requires_confirmation: false
idempotency_required: true
candidate_command: AddProductToCart
```

## 5. Tool Proposal

```json
{
  "tool_proposal_id": "UUID",
  "tool_id": "TOOL-CART-ADD-PRODUCT",
  "tool_version": 1,
  "arguments": {
    "product_reference": "lager norte",
    "quantity": 6
  },
  "argument_sources": {
    "product_reference": "CURRENT_TURN",
    "quantity": "CURRENT_TURN"
  },
  "confidence": 0.96,
  "requires_resolution": [
    "product_reference"
  ],
  "requires_confirmation": false,
  "reason_codes": [
    "INTENT_ADD_PRODUCT",
    "REQUIRED_SLOTS_PRESENT"
  ]
}
```

## 6. Tool Execution Request

La propuesta validada se transforma en una solicitud interna:

```json
{
  "tool_execution_request_id": "UUID",
  "tool_id": "TOOL-CART-ADD-PRODUCT",
  "tool_version": 1,
  "actor_id": "UUID_OR_NULL",
  "tenant_id": "UUID",
  "session_id": "UUID",
  "resolved_arguments": {
    "cart_id": "UUID",
    "product_id": "UUID",
    "quantity": 6,
    "expected_cart_version": 4
  },
  "authorization_context": {},
  "idempotency_key": "STRING",
  "confirmation_reference": null
}
```

Este objeto no debe ser creado exclusivamente por la LLM.

## 7. Visibilidad de herramientas

La visibilidad depende de:

- intención;
- actor;
- tenant;
- estado;
- canal;
- feature flags;
- riesgo;
- autenticación;
- control humano.

Ejemplo:

Una sesión anónima puede ver:

- SearchProducts;
- GetPrice;
- GetAvailability;
- RequestHuman.

No debe ver:

- AssignRole;
- RefundPayment;
- RotateCredential.

## 8. Preselección determinística

Siempre que sea posible, el sistema debe reducir el catálogo antes de la
LLM.

Ejemplo:

Intent = ADD_PRODUCT

Herramientas candidatas:

- add_product_to_cart.

No es necesario mostrar todas las herramientas del sistema.

## 9. Argumentos

Cada argumento debe declarar:

- nombre;
- tipo;
- required;
- source policy;
- resolución;
- restricciones;
- sensibilidad;
- default;
- confirmación;
- autoridad.

Ejemplo:

```yaml
name: quantity
type: integer
required: true
minimum: 1
maximum_policy: BUSINESS_CONFIG
source_policy:
  - CURRENT_TURN
  - PENDING_INTENT
authority: USER_REQUEST
```

## 10. Argumentos prohibidos desde LLM

No aceptar como oficiales:

- actor_id;
- tenant_id;
- roles;
- permission;
- price;
- total;
- discount;
- stock;
- order_state;
- payment_state;
- expected_version;
- idempotency_key;
- confirmation_token;
- signature;
- authorization_result.

Estos valores deben provenir del servidor.

## 11. Herramientas de lectura

Deben ser libres de efectos comerciales.

Se permiten metadatos operativos explícitos:

- métricas;
- auditoría de acceso;
- caché.

No deben:

- reservar stock;
- modificar carrito;
- crear pedido;
- iniciar pago.

## 12. Herramientas de escritura

Deben declarar:

- aggregate;
- Command;
- idempotencia;
- expected_version;
- eventos;
- compensación;
- timeout;
- autorización.

## 13. Riesgo

LOW

Consultas públicas.

MEDIUM

Cambios reversibles en carrito.

HIGH

Crear o cancelar pedido.

CRITICAL

Pago, devolución, permisos, credenciales.

La selección debe aplicar controles crecientes.

## 14. Confirmación

Una herramienta requiere confirmación cuando:

- confirma pedido;
- inicia cobro;
- cancela pedido no trivial;
- modifica dirección final;
- aprueba excepción;
- ejecuta devolución;
- cambia permisos.

La confirmación debe estar:

- firmada o asociada;
- versionada;
- vigente;
- vinculada al resumen;
- vinculada al actor;
- vinculada al estado.

## 15. Autenticación y autorización

Flujo:

1. la LLM propone;
2. el sistema valida herramienta;
3. el sistema autentica;
4. el sistema autoriza;
5. el sistema resuelve argumentos;
6. el sistema verifica estado;
7. el sistema solicita confirmación;
8. el sistema crea Command;
9. el handler ejecuta.

La LLM no participa en la decisión final de autorización.

## 16. Compatibilidad de estado

Ejemplos:

Cart = ACTIVE

add_product_to_cart permitido.

Cart = CLOSED

rechazado.

Order = PENDING_CONFIRMATION

confirm_order candidato.

Order = CANCELLED

confirm_order rechazado.

Control = CONTROL_HUMAN

herramientas automáticas de escritura suspendidas.

## 17. Multi-tool

Puede permitirse una secuencia.

Ejemplo:

"Agrega seis cervezas y muéstrame el total."

Plan:

1. AddProductToCart.
2. ViewCart.

La segunda depende de la primera.

Debe existir:

- orden;
- dependencias;
- política de fallo;
- Correlation ID;
- idempotencia por paso.

No ejecutar múltiples escrituras arbitrarias en paralelo.

## 18. Plan de herramientas

```json
{
  "plan_id": "UUID",
  "steps": [
    {
      "step": 1,
      "tool_id": "TOOL-CART-ADD-PRODUCT",
      "depends_on": [],
      "on_failure": "STOP"
    },
    {
      "step": 2,
      "tool_id": "TOOL-CART-VIEW",
      "depends_on": [
        1
      ],
      "on_failure": "REPORT_PARTIAL"
    }
  ]
}
```

El plan es una propuesta y debe validarse.

## 19. Validaciones

VAL-TOOL-001

Tool ID existe.

VAL-TOOL-002

Versión soportada.

VAL-TOOL-003

Herramienta visible.

VAL-TOOL-004

Actor permitido.

VAL-TOOL-005

Estado permitido.

VAL-TOOL-006

Control permitido.

VAL-TOOL-007

Argumentos cumplen esquema.

VAL-TOOL-008

No hay argumentos prohibidos.

VAL-TOOL-009

Slots obligatorios resueltos.

VAL-TOOL-010

Referencias oficiales resueltas.

VAL-TOOL-011

Autenticación suficiente.

VAL-TOOL-012

Autorización suficiente.

VAL-TOOL-013

Confirmación vigente.

VAL-TOOL-014

Idempotencia presente.

VAL-TOOL-015

Expected version recuperada del servidor.

## 20. Flujo principal

1. Recibir intención y slots.
2. cargar catálogo permitido.
3. filtrar por tenant.
4. filtrar por actor.
5. filtrar por estado.
6. filtrar por control.
7. preseleccionar.
8. construir catálogo mínimo.
9. obtener Tool Proposal.
10. validar esquema.
11. validar visibilidad.
12. eliminar argumentos prohibidos.
13. resolver referencias.
14. autenticar.
15. autorizar.
16. validar confirmación.
17. obtener versiones.
18. generar Idempotency Key.
19. crear Command.
20. enviar al handler.

## 21. Pseudocódigo

```text
function prepare_tool_execution(intent, slots, context):

    allowed = load_tool_catalog(
        tenant=context.tenant_id,
        actor=context.actor,
        session_state=context.session_state,
        control_state=context.control_state,
        intent=intent
    )

    proposal = select_tool_candidate(
        intent,
        slots,
        allowed
    )

    validate_proposal_schema(proposal)
    validate_tool_visible(proposal.tool_id, allowed)
    reject_prohibited_arguments(proposal.arguments)

    resolved = resolve_official_arguments(
        proposal.arguments,
        slots,
        context
    )

    authenticate_if_required(context.actor, proposal.tool_id)
    authorize(context.actor, proposal.tool_id, resolved)
    validate_state(proposal.tool_id, context)
    validate_confirmation(proposal.tool_id, context.confirmation)

    execution_request = build_execution_request(
        proposal,
        resolved,
        server_generated_idempotency_key(),
        server_loaded_expected_versions()
    )

    command = map_tool_to_command(execution_request)
    return dispatch_command(command)
```

## 22. Errores

TOOL_UNKNOWN

TOOL_VERSION_UNSUPPORTED

TOOL_NOT_VISIBLE

TOOL_NOT_ALLOWED

TOOL_STATE_INCOMPATIBLE

TOOL_CONTROL_STATE_INCOMPATIBLE

TOOL_ARGUMENT_SCHEMA_INVALID

TOOL_ARGUMENT_PROHIBITED

TOOL_REFERENCE_UNRESOLVED

TOOL_AUTHENTICATION_REQUIRED

TOOL_AUTHORIZATION_DENIED

TOOL_CONFIRMATION_REQUIRED

TOOL_CONFIRMATION_EXPIRED

TOOL_IDEMPOTENCY_REQUIRED

TOOL_PLAN_INVALID

TOOL_DEPENDENCY_FAILED

## 23. Eventos

ToolSelectionStarted

ToolProposed

ToolProposalRejected

ToolArgumentsResolved

ToolAuthorizationDenied

ToolConfirmationRequired

ToolExecutionPrepared

ToolPlanPrepared

ToolPlanRejected

## 24. Seguridad

Amenazas:

- herramienta inventada;
- herramienta administrativa;
- argumento de precio;
- ID de otro tenant;
- confirmación falsa;
- expected_version manipulado;
- prompt injection;
- herramienta encadenada;
- escalamiento de privilegio;
- ejecución duplicada.

Controles:

- catálogo cerrado;
- visibilidad;
- esquema;
- resolución oficial;
- autorización;
- confirmación;
- idempotencia;
- FSM;
- auditoría.

## 25. Observabilidad

Métricas:

- tool_proposal_total;
- tool_proposal_rejected_total;
- tool_visibility_denied_total;
- tool_authorization_denied_total;
- tool_confirmation_required_total;
- tool_plan_total;
- tool_argument_resolution_failure_total;
- tool_preparation_duration_seconds.

Dimensiones:

- tool_id;
- version;
- intent;
- risk;
- result;
- error_code.

## 26. Casos límite

- LLM inventa herramienta;
- LLM usa herramienta oculta;
- LLM envía price;
- LLM envía actor_id;
- herramienta válida en estado inválido;
- confirmación expirada;
- carrito cambia;
- múltiples herramientas;
- dependencia falla;
- control humano;
- tenant mismatch;
- herramienta deshabilitada;
- versión vieja;
- callback firmado;
- prompt injection;
- reintento;
- resultado UNKNOWN.

## 27. Criterios de aceptación

AC-TOOL-001

Toda herramienta está registrada.

AC-TOOL-002

Sólo herramientas visibles pueden proponerse.

AC-TOOL-003

La visibilidad no reemplaza autorización.

AC-TOOL-004

Los argumentos de LLM son candidatos.

AC-TOOL-005

Los IDs se resuelven oficialmente.

AC-TOOL-006

El precio no proviene de la LLM.

AC-TOOL-007

La confirmación es versionada.

AC-TOOL-008

La FSM se valida.

AC-TOOL-009

Las escrituras son idempotentes.

AC-TOOL-010

Las herramientas administrativas no se exponen.

AC-TOOL-011

Los planes tienen dependencias.

AC-TOOL-012

La LLM no ejecuta.

AC-TOOL-013

La autorización se realiza en servidor.

AC-TOOL-014

El Command se crea después de validaciones.

AC-TOOL-015

Todo rechazo es trazable.

## 28. Plan mínimo de pruebas

- catálogo;
- visibilidad;
- herramienta desconocida;
- versión;
- argumentos;
- precio prohibido;
- actor prohibido;
- referencia;
- autorización;
- confirmación;
- expiración;
- FSM;
- control humano;
- multi-tool;
- dependencia;
- idempotencia;
- tenant;
- prompt injection;
- herramienta administrativa;
- métricas;
- auditoría;
- fallback.

## 29. Checklist

[ ] Existe Tool ID.
[ ] Existe versión.
[ ] Existe efecto.
[ ] Existe riesgo.
[ ] Existe esquema.
[ ] Existe catálogo permitido.
[ ] Se filtra por actor.
[ ] Se filtra por estado.
[ ] Se filtra por control.
[ ] Se validan argumentos.
[ ] Se eliminan campos prohibidos.
[ ] Se resuelven IDs.
[ ] Se autentica.
[ ] Se autoriza.
[ ] Se confirma.
[ ] Se genera idempotencia.
[ ] Se carga versión.
[ ] Se crea Command.
[ ] No ejecuta la LLM.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
