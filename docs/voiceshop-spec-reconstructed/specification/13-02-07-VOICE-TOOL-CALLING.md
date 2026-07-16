======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-02-07-VOICE-TOOL-CALLING.md

# TOOL CALLING DESDE VOZ

## 1. Objetivo

Este documento define cómo VoiceShop procesa propuestas de herramientas
originadas durante una interacción de voz.

La voz puede producir:

- una transcripción;
- una intención;
- argumentos candidatos;
- una Tool Proposal.

La voz no ejecuta directamente la herramienta.

Toda propuesta debe seguir el mismo pipeline de seguridad y dominio que
una interacción textual.

## 2. Principios

RULE-VTOOL-001

Toda Tool Proposal de voz es no confiable.

RULE-VTOOL-002

Toda Tool Proposal debe estar vinculada a Voice Turn ID.

RULE-VTOOL-003

Toda Tool Proposal debe cumplir esquema.

RULE-VTOOL-004

Sólo pueden proponerse herramientas visibles.

RULE-VTOOL-005

La autorización se evalúa en backend.

RULE-VTOOL-006

Los argumentos son candidatos.

RULE-VTOOL-007

Los Product ID se resuelven oficialmente.

RULE-VTOOL-008

Los precios no provienen de la voz.

RULE-VTOOL-009

La transcripción debe ser final.

RULE-VTOOL-010

La confianza debe considerarse.

RULE-VTOOL-011

Las acciones críticas requieren confirmación.

RULE-VTOOL-012

Una interrupción puede invalidar la propuesta.

RULE-VTOOL-013

Una reconexión no duplica la ejecución.

RULE-VTOOL-014

La respuesta hablada utiliza el resultado oficial.

RULE-VTOOL-015

La ejecución debe ser idempotente.

## 3. Flujo general

Audio
    ↓
Transcripción final
    ↓
Normalización
    ↓
Intent Detection
    ↓
Entity Extraction
    ↓
Slot Filling
    ↓
Voice Tool Proposal
    ↓
Tool Validator
    ↓
Authentication
    ↓
Authorization
    ↓
Confirmation
    ↓
Command
    ↓
Handler
    ↓
Official Result
    ↓
Response Generation
    ↓
Speech Synthesis

## 4. Contrato de Voice Tool Proposal

```json
{
  "voice_tool_proposal_id": "UUID",
  "voice_session_id": "UUID",
  "voice_turn_id": "UUID",
  "transcript_id": "UUID",
  "tool_id": "TOOL-CART-ADD-PRODUCT",
  "tool_version": 1,
  "arguments": {
    "product_reference": "lager norte",
    "quantity": 6
  },
  "argument_sources": {
    "product_reference": "TRANSCRIPT",
    "quantity": "TRANSCRIPT"
  },
  "transcript_confidence": 0.95,
  "proposal_confidence": 0.93,
  "requires_confirmation": false,
  "connection_generation": 2,
  "status": "PROPOSED"
}
```

## 5. Estados

PROPOSED

VALIDATING

CLARIFICATION_REQUIRED

CONFIRMATION_REQUIRED

AUTHORIZED

READY_TO_EXECUTE

EXECUTING

COMPLETED

REJECTED

CANCELLED

SUPERSEDED

EXPIRED

UNKNOWN

## 6. Precondiciones

- VoiceSession activa;
- Voice Turn COMMITTED;
- transcript final;
- Session válida;
- control automático;
- herramienta visible;
- intención compatible;
- slots resueltos;
- generation vigente;
- no existe cancelación;
- no existe Tool Proposal ejecutada equivalente.

## 7. Confianza

Debe considerarse:

- transcript confidence;
- intent confidence;
- entity confidence;
- slot confidence;
- tool proposal confidence;
- risk.

Una confianza alta no reemplaza confirmación.

Ejemplo:

ADD_PRODUCT:

Puede ejecutarse con confianza alta.

CONFIRM_ORDER:

Siempre requiere confirmación explícita y estado vigente.

## 8. Confirmación por voz

Una confirmación debe incluir:

- operación;
- producto;
- cantidad;
- total;
- entrega;
- método;
- Confirmation ID;
- expiración;
- versión.

La pregunta debe ser reproducida completamente.

El "sí" debe:

- pertenecer al siguiente Turn ID;
- asociarse con Confirmation ID;
- llegar antes de expirar;
- validar estado;
- validar versiones;
- no provenir de transcripción parcial.

## 9. Confirmación interrumpida

Si el Cliente interrumpe antes de escuchar la pregunta:

- no aceptar respuesta afirmativa;
- marcar confirmación NOT_DELIVERED;
- repetir resumen;
- o cambiar a texto.

## 10. Herramientas de lectura

Ejemplos:

- SearchProducts;
- GetPrice;
- GetAvailability;
- ViewCart.

Pueden ejecutar sin confirmación si:

- estado válido;
- argumentos resueltos;
- autorización adecuada;
- riesgo bajo.

## 11. Herramientas de escritura reversible

Ejemplos:

- AddProductToCart;
- ChangeQuantity;
- RemoveProduct.

Pueden requerir confirmación según:

- cantidad;
- producto ambiguo;
- política;
- accesibilidad;
- confianza.

## 12. Herramientas críticas

Ejemplos:

- ConfirmOrder;
- CancelOrder;
- StartPayment;
- RefundPayment.

Requieren:

- autenticación;
- autorización;
- confirmación;
- versión;
- idempotencia;
- resumen oficial;
- audit trail.

## 13. Argumentos prohibidos

No aceptar desde voz como autoridad:

- actor_id;
- tenant_id;
- role;
- price;
- total;
- discount;
- stock;
- payment_state;
- order_state;
- expected_version;
- idempotency_key;
- confirmation_token;
- permission.

## 14. Resolución de referencias

Ejemplo:

"agrega seis lager norte"

La voz produce:

product_reference = "lager norte"

El backend consulta catálogo.

Puede resultar:

- una coincidencia;
- múltiples;
- ninguna;
- inactiva.

No debe inventar Product ID.

## 15. Aclaraciones habladas

Deben ser:

- breves;
- una dimensión;
- pocas opciones;
- pronunciables;
- compatibles con interrupción.

Ejemplo:

"¿Te refieres a Lager Norte de trescientos treinta mililitros o a Lager Norte de un litro?"

## 16. Multi-tool por voz

Ejemplo:

"Agrega seis cervezas y dime el total."

Plan:

1. AddProductToCart.
2. ViewCart.

Reglas:

- ejecutar en orden;
- detener ante fallo;
- no hablar resultado intermedio innecesario;
- responder con resultado final;
- conservar Correlation ID.

## 17. Cancelación

La propuesta se cancela cuando:

- Cliente dice "no";
- cambia intención;
- interrumpe;
- cierra voz;
- Session cambia;
- control humano;
- expira;
- se pierde contexto;
- cambia estado comercial.

## 18. Idempotencia

Clave derivada:

voice_session_id
+ voice_turn_id
+ tool_id
+ normalized_arguments_hash

Reintentos:

- devolver resultado;
- no duplicar herramienta;
- no duplicar Command.

## 19. UNKNOWN

Una Tool Proposal no debe quedar UNKNOWN por sí misma.

La ejecución del Command puede quedar UNKNOWN por dependencia externa.

En ese caso:

- informar estado;
- no repetir a ciegas;
- conciliar;
- mantener correlación.

## 20. Respuesta hablada

Debe usar Official Result.

Ejemplo:

"Agregué seis Lager Norte. El total del carrito es siete mil doscientos pesos."

No usar la propuesta original como prueba de éxito.

## 21. Flujo principal

1. recibir transcript final.
2. detectar intención.
3. extraer entidades.
4. completar slots.
5. construir Tool Proposal.
6. validar schema.
7. validar herramienta visible.
8. validar Session y VoiceSession.
9. validar control.
10. resolver referencias.
11. autenticar.
12. autorizar.
13. evaluar riesgo.
14. solicitar confirmación si corresponde.
15. generar Idempotency Key.
16. obtener expected versions.
17. crear Command.
18. ejecutar.
19. persistir resultado.
20. generar respuesta.
21. sintetizar voz.

## 22. Pseudocódigo

```text
function process_voice_tool_proposal(
    proposal,
    voice_context,
    conversation_context
):

    validate_voice_session(voice_context)
    validate_voice_turn(proposal.voice_turn_id)
    validate_final_transcript(proposal.transcript_id)
    validate_connection_generation(proposal, voice_context)

    validate_tool_schema(proposal)
    validate_tool_visible(
        proposal.tool_id,
        conversation_context
    )

    reject_prohibited_arguments(proposal.arguments)

    resolved = resolve_official_arguments(
        proposal.arguments,
        conversation_context
    )

    validate_confidence_by_risk(
        proposal,
        tool_risk(proposal.tool_id)
    )

    authenticate_if_required(
        conversation_context.actor,
        proposal.tool_id
    )

    authorize(
        conversation_context.actor,
        proposal.tool_id,
        resolved
    )

    if requires_confirmation(proposal.tool_id, resolved):
        return create_voice_confirmation(
            proposal,
            resolved,
            conversation_context
        )

    command = create_server_command(
        proposal,
        resolved,
        idempotency_key=build_voice_tool_idempotency_key(proposal),
        expected_versions=load_expected_versions(resolved)
    )

    result = dispatch_command(command)
    return generate_voice_response(result)
```

## 23. Errores

VOICE_TOOL_PROPOSAL_INVALID

VOICE_TOOL_TRANSCRIPT_NOT_FINAL

VOICE_TOOL_CONFIDENCE_LOW

VOICE_TOOL_NOT_VISIBLE

VOICE_TOOL_ARGUMENT_INVALID

VOICE_TOOL_ARGUMENT_PROHIBITED

VOICE_TOOL_REFERENCE_AMBIGUOUS

VOICE_TOOL_REFERENCE_NOT_FOUND

VOICE_TOOL_AUTHENTICATION_REQUIRED

VOICE_TOOL_AUTHORIZATION_DENIED

VOICE_TOOL_CONFIRMATION_REQUIRED

VOICE_TOOL_CONFIRMATION_EXPIRED

VOICE_TOOL_STATE_CHANGED

VOICE_TOOL_CANCELLED

VOICE_TOOL_SUPERSEDED

VOICE_TOOL_DUPLICATE_CONFLICT

VOICE_TOOL_EXECUTION_UNKNOWN

## 24. Eventos

VoiceToolProposalCreated

VoiceToolProposalValidated

VoiceToolProposalRejected

VoiceToolClarificationRequested

VoiceToolConfirmationRequested

VoiceToolConfirmationDelivered

VoiceToolConfirmationReceived

VoiceToolExecutionPrepared

VoiceToolExecutionStarted

VoiceToolExecutionCompleted

VoiceToolExecutionFailed

VoiceToolProposalCancelled

VoiceToolProposalSuperseded

## 25. Observabilidad

Métricas:

- voice_tool_proposals_total;
- voice_tool_rejections_total;
- voice_tool_clarifications_total;
- voice_tool_confirmations_total;
- voice_tool_execution_total;
- voice_tool_execution_failure_total;
- voice_tool_duplicate_total;
- voice_tool_latency_seconds;
- voice_tool_confidence_distribution;
- voice_tool_unknown_total.

Dimensiones:

- tool_id;
- risk;
- result;
- error_code;
- provider_class;
- channel.

## 26. Auditoría

Registrar:

- Voice Tool Proposal ID;
- VoiceSession ID;
- Voice Turn ID;
- Transcript ID;
- Tool ID;
- argumentos protegidos;
- confianza;
- confirmación;
- actor;
- autorización;
- Command ID;
- resultado;
- Correlation ID.

No registrar audio ni secretos.

## 27. Casos límite

- transcripción parcial;
- baja confianza;
- producto ambiguo;
- cantidad ambigua;
- confirmación interrumpida;
- "sí" tardío;
- Session cambia;
- Cart version cambia;
- control humano;
- reconexión;
- duplicate turn;
- herramienta inventada;
- price in argument;
- actor spoof;
- multi-tool;
- Command UNKNOWN;
- voz cerrada después de ejecutar;
- respuesta TTS falla;
- Cliente cambia a texto.

## 28. Criterios de aceptación

AC-VTOOL-001

Toda propuesta tiene ID.

AC-VTOOL-002

Toda propuesta pertenece a Turn final.

AC-VTOOL-003

Sólo herramientas visibles se aceptan.

AC-VTOOL-004

Los argumentos se validan.

AC-VTOOL-005

Los IDs se resuelven oficialmente.

AC-VTOOL-006

La autorización se realiza en servidor.

AC-VTOOL-007

Las acciones críticas se confirman.

AC-VTOOL-008

La confirmación debe entregarse completa.

AC-VTOOL-009

La ejecución es idempotente.

AC-VTOOL-010

La reconexión no duplica.

AC-VTOOL-011

La interrupción invalida propuestas obsoletas.

AC-VTOOL-012

La respuesta usa resultado oficial.

AC-VTOOL-013

UNKNOWN se concilia.

AC-VTOOL-014

Control humano se respeta.

AC-VTOOL-015

Todo flujo es trazable.

## 29. Plan mínimo de pruebas

- read tool;
- cart tool;
- critical tool;
- final transcript;
- partial transcript;
- confidence;
- ambiguity;
- confirmation;
- interrupted confirmation;
- expired confirmation;
- duplicate;
- reconnection;
- state change;
- authorization;
- tenant;
- tool injection;
- arguments;
- multi-tool;
- UNKNOWN;
- TTS failure;
- text fallback;
- metrics;
- audit.

## 30. Checklist

[ ] Existe Proposal ID.
[ ] Existe Voice Turn ID.
[ ] Existe Transcript ID.
[ ] Existe Tool ID.
[ ] Existe versión.
[ ] Existe confianza.
[ ] Se valida transcript final.
[ ] Se valida generation.
[ ] Se valida visibilidad.
[ ] Se validan argumentos.
[ ] Se resuelven referencias.
[ ] Se autentica.
[ ] Se autoriza.
[ ] Se confirma.
[ ] Se genera idempotencia.
[ ] Se genera Command.
[ ] Se usa resultado oficial.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
