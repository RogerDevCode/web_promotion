======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-01-11-CLARIFICATION.md

# ACLARACIONES Y DESAMBIGUACIÓN

## 1. Objetivo

Este documento define cómo VoiceShop solicita información adicional
cuando una intención, entidad, referencia, slot, confirmación o contexto
no posee certeza suficiente.

Una aclaración debe reducir incertidumbre.

No debe convertirse en una conversación interminable.

## 2. Principios

RULE-CLAR-001

Toda aclaración debe tener un objetivo concreto.

RULE-CLAR-002

Toda aclaración debe resolver una dimensión cuando sea posible.

RULE-CLAR-003

Toda aclaración debe estar vinculada a una intención pendiente.

RULE-CLAR-004

Toda aclaración debe poseer expiración.

RULE-CLAR-005

Toda aclaración debe limitar intentos.

RULE-CLAR-006

Una aclaración no puede ejecutar negocio.

RULE-CLAR-007

La respuesta del Cliente debe validarse.

RULE-CLAR-008

Una respuesta irrelevante puede cambiar la intención.

RULE-CLAR-009

El Cliente puede cancelar la aclaración.

RULE-CLAR-010

Las opciones deben provenir de fuentes oficiales.

RULE-CLAR-011

Una aclaración crítica puede requerir confirmación adicional.

RULE-CLAR-012

El sistema debe conservar el historial de correcciones.

RULE-CLAR-013

La LLM no puede inventar opciones.

RULE-CLAR-014

Una aclaración bajo control humano debe dirigirse al Operador.

RULE-CLAR-015

El límite excedido debe producir fallback o handoff.

## 3. Causas

- intención ambigua;
- confianza baja;
- referencia anafórica;
- múltiples productos;
- cantidad ausente;
- unidad ambigua;
- fecha vaga;
- dirección incompleta;
- confirmación ambigua;
- estado cambiado;
- menú expirado;
- opción obsoleta;
- dato sensible incompleto;
- múltiple intención conflictiva.

## 4. Tipos

CLARIFICATION-INTENT

"¿Quieres consultar el precio o agregar el producto?"

CLARIFICATION-ENTITY

"¿Te refieres a Lager Norte o Lager Sur?"

CLARIFICATION-SLOT

"¿Cuántas unidades deseas?"

CLARIFICATION-CONFIRMATION

"¿Confirmas el pedido por $7.200 CLP?"

CLARIFICATION-STATE

"El carrito cambió. ¿Quieres continuar con el nuevo total?"

CLARIFICATION-AUTHENTICATION

"Necesito verificar tu identidad para consultar ese pedido."

CLARIFICATION-CHANNEL

"Este menú expiró. Selecciona una opción del menú actualizado."

## 5. Contrato

```json
{
  "clarification_id": "UUID",
  "clarification_type": "CLARIFICATION-ENTITY",
  "pending_intent_id": "UUID",
  "session_id": "UUID",
  "turn_id": "UUID",
  "question": "¿Te refieres a Lager Norte o Lager Sur?",
  "target_slot": "product_reference",
  "options": [
    {
      "option_id": "UUID-A",
      "label": "Lager Norte 330 ml",
      "value_reference": "SIGNED_REFERENCE"
    },
    {
      "option_id": "UUID-B",
      "label": "Lager Sur 330 ml",
      "value_reference": "SIGNED_REFERENCE"
    }
  ],
  "attempt": 1,
  "maximum_attempts": 3,
  "issued_at": "UTC_TIMESTAMP",
  "expires_at": "UTC_TIMESTAMP",
  "expected_context_version": 18,
  "status": "PENDING"
}
```

## 6. Estados

CREATED

DELIVERED

PENDING

ANSWERED

RESOLVED

REJECTED

CANCELLED

EXPIRED

LIMIT_EXCEEDED

SUPERSEDED

## 7. Selección de pregunta

La pregunta debe:

- nombrar el dato;
- ser breve;
- evitar ambigüedad;
- usar lenguaje natural;
- incluir opciones cuando existan;
- no revelar información privada;
- no sugerir una respuesta incorrecta.

## 8. Preguntas de una dimensión

Correcto:

"¿Qué producto deseas?"

Correcto:

"¿Cuántas unidades?"

Incorrecto:

"¿Qué producto, cuántas unidades, dónde y cómo pagarás?"

Excepción:

Un formulario estructurado puede pedir múltiples campos si el canal y
flujo lo autorizan.

## 9. Opciones

Las opciones deben:

- existir;
- estar vigentes;
- pertenecer al tenant;
- estar autorizadas;
- tener List ID o Clarification ID;
- tener versión;
- tener expiración;
- estar firmadas.

No usar posiciones sin referencia versionada.

## 10. Respuestas libres

Cuando no existen opciones:

- aceptar texto;
- normalizar;
- detectar intención;
- extraer entidades;
- validar contra target slot.

La respuesta puede:

- completar;
- corregir;
- cancelar;
- cambiar de intención;
- solicitar humano.

## 11. Respuesta "sí" o "no"

Debe evaluarse contra:

- Clarification ID;
- pregunta;
- versión;
- estado;
- expiración;
- actor;
- tenant.

Un "sí" aislado no debe resolver una aclaración diferente.

## 12. Corrección

Ejemplo:

Sistema:

"¿Cuántas unidades?"

Cliente:

"Seis, no, cuatro."

La respuesta debe resolver cuatro y registrar seis como revocado.

## 13. Cambio de intención

Ejemplo:

Sistema:

"¿Qué marca?"

Cliente:

"Mejor muéstrame promociones."

Resultado:

- aclaración SUPERSEDED;
- pending intent cancelada;
- nueva intención GET_PROMOTIONS.

## 14. Límite

Políticas:

- maximum_attempts;
- maximum_total_clarifications;
- timeout;
- maximum_irrelevant_answers;
- maximum_model_failures.

Al exceder:

- ofrecer reinicio;
- usar canal alternativo;
- derivar;
- cancelar operación;
- no ejecutar con datos incompletos.

## 15. Expiración

La aclaración expira cuando:

- pasa expires_at;
- cambia contexto;
- cambia versión;
- cambia actor;
- cambia tenant;
- cambia control;
- se cierra sesión;
- se resuelve intención;
- se presenta una nueva aclaración incompatible.

## 16. Concurrencia

Sólo una aclaración activa por slot.

Pueden existir aclaraciones independientes si el diseño lo permite, pero
la interfaz debe evitar confusión.

Toda respuesta debe verificar expected_context_version.

## 17. Canales

### WEB

Botones y formularios.

### MENSAJERÍA

Botones versionados y texto.

### VOICE

Pregunta breve.

Opciones limitadas.

Confirmación audible.

### HUMANO

La aclaración se presenta al Operador como dato faltante.

## 18. Flujo principal

1. Detectar incertidumbre.
2. clasificar tipo.
3. cargar intención pendiente.
4. seleccionar target.
5. obtener opciones oficiales.
6. construir pregunta.
7. crear Clarification ID.
8. asignar versión.
9. asignar expiración.
10. persistir.
11. entregar.
12. recibir respuesta.
13. validar Clarification ID.
14. validar contexto.
15. interpretar respuesta.
16. actualizar slot.
17. resolver o repetir.
18. registrar.
19. continuar flujo.

## 19. Pseudocódigo

```text
function create_clarification(reason, pending_intent, context):

    target = select_single_target(reason, pending_intent)
    options = load_official_options_if_available(target, context)

    clarification = Clarification(
        id=new_id(),
        type=classify_clarification(reason),
        target=target,
        options=sign_and_version(options),
        attempt=pending_intent.attempts_for(target) + 1,
        max_attempts=policy.max_attempts,
        expires_at=calculate_expiration(),
        expected_context_version=context.version
    )

    if clarification.attempt > clarification.max_attempts:
        return handle_limit_exceeded(pending_intent, context)

    persist(clarification)
    emit(ClarificationRequested)
    return clarification
```

```text
function handle_clarification_answer(answer, clarification, context):

    validate_status(clarification, PENDING)
    validate_expiration(clarification)
    validate_actor(answer, clarification)
    validate_context_version(context, clarification)

    interpretation = interpret_answer_for_target(
        answer,
        clarification.target,
        clarification.options
    )

    if interpretation.cancelled:
        cancel_pending_intent()
        return Cancelled

    if interpretation.changed_intent:
        supersede_clarification()
        return route_new_intent(interpretation)

    if interpretation.valid:
        resolve_target_slot(interpretation)
        mark_resolved(clarification)
        return continue_pending_intent()

    return repeat_or_escalate(clarification)
```

## 20. Errores

CLARIFICATION_NOT_FOUND

CLARIFICATION_EXPIRED

CLARIFICATION_ALREADY_RESOLVED

CLARIFICATION_CONTEXT_CHANGED

CLARIFICATION_ACTOR_MISMATCH

CLARIFICATION_TENANT_MISMATCH

CLARIFICATION_OPTION_INVALID

CLARIFICATION_ANSWER_INVALID

CLARIFICATION_LIMIT_EXCEEDED

CLARIFICATION_CONTROLLED_BY_HUMAN

CLARIFICATION_DELIVERY_FAILED

## 21. Eventos

ClarificationCreated

ClarificationDelivered

ClarificationAnswered

ClarificationResolved

ClarificationRejected

ClarificationCancelled

ClarificationExpired

ClarificationSuperseded

ClarificationLimitExceeded

## 22. Observabilidad

Métricas:

- clarifications_created_total;
- clarifications_resolved_total;
- clarifications_expired_total;
- clarification_attempts;
- clarification_limit_exceeded_total;
- clarification_duration_seconds;
- clarification_intent_change_total;
- clarification_handoff_total.

Dimensiones:

- type;
- target_slot;
- channel;
- result;
- attempt;
- error_code.

## 23. Auditoría

Registrar:

- Clarification ID;
- Pending Intent ID;
- target;
- opciones referenciadas;
- actor;
- respuesta estructurada;
- resultado;
- intentos;
- expiración;
- Correlation ID.

No registrar datos sensibles completos.

## 24. Casos límite

- respuesta a aclaración antigua;
- dos aclaraciones;
- botón expirado;
- opción eliminada;
- contexto cambió;
- carrito cambió;
- actor cambia;
- voz parcial;
- "sí" sin contexto;
- respuesta irrelevante;
- cambio de intención;
- corrección;
- cancelación;
- control humano;
- entrega falla;
- timeout;
- máximo de intentos;
- producto inactivo;
- opciones de otro tenant;
- respuesta duplicada.

## 25. Criterios de aceptación

AC-CLAR-001

Toda aclaración tiene ID.

AC-CLAR-002

Toda aclaración tiene objetivo.

AC-CLAR-003

Toda aclaración tiene expiración.

AC-CLAR-004

Toda aclaración tiene límite.

AC-CLAR-005

Las opciones son oficiales.

AC-CLAR-006

Los botones están firmados.

AC-CLAR-007

La respuesta valida contexto.

AC-CLAR-008

La respuesta puede corregir.

AC-CLAR-009

La respuesta puede cambiar intención.

AC-CLAR-010

El límite produce fallback.

AC-CLAR-011

No se ejecuta con datos incompletos.

AC-CLAR-012

Se conserva historial.

AC-CLAR-013

Una aclaración antigua no modifica estado.

AC-CLAR-014

Control humano se respeta.

AC-CLAR-015

Toda resolución es trazable.

## 26. Plan mínimo de pruebas

- intención;
- entidad;
- slot;
- confirmación;
- opción;
- texto libre;
- sí/no;
- expiración;
- contexto;
- actor;
- tenant;
- duplicado;
- cambio de intención;
- corrección;
- cancelación;
- límite;
- handoff;
- voz;
- botón;
- menú;
- estado cambiado;
- PII;
- métricas;
- auditoría.

## 27. Checklist

[ ] Existe Clarification ID.
[ ] Existe tipo.
[ ] Existe target.
[ ] Existe intención pendiente.
[ ] Existe expiración.
[ ] Existe límite.
[ ] Existen opciones oficiales.
[ ] Se firman opciones.
[ ] Se valida actor.
[ ] Se valida tenant.
[ ] Se valida contexto.
[ ] Se maneja corrección.
[ ] Se maneja cancelación.
[ ] Se maneja cambio de intención.
[ ] Se maneja duplicación.
[ ] Se maneja control humano.
[ ] Se persiste.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
