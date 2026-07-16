======================================================================
Documento    : 10-STATE-MACHINES.md
Versión      : 1.0
Estado       : DRAFT
Fecha        : 2026-07-16
Autor        : VoiceShop Framework
Clasificación: CORE
Estabilidad  : CORE

Dependencias:
- 00-PROJECT-MANIFEST.md
- 01-VISION.md
- 02-GLOSSARY.md
- 03-REQUIREMENTS.md
- 04-BUSINESS-RULES.md
- 05-ACTORS.md
- 06-USE-CASES.md
- 07-FUNCTIONAL-MODULES.md
- 08-EVENT-CATALOG.md
- 09-COMMAND-CATALOG.md

Documentos dependientes:
- 11-SEQUENCE-DIAGRAMS.md
- 12-DOMAIN-MODEL.md
- 13-FUNCTIONAL-SPECIFICATION.md
- 14-API-CONTRACT.md
- 16-DATABASE.md
- 17-SECURITY.md
- 19-ERROR-HANDLING.md
- 21-TEST-PLAN.md
=================

# STATE MACHINES

---

1. Objetivo

---

Este documento define las máquinas de estados oficiales de VoiceShop.

Una máquina de estados determina:

* estados posibles;
* estado inicial;
* estados terminales;
* comandos permitidos;
* eventos producidos;
* condiciones de transición;
* transiciones prohibidas;
* acciones de entrada;
* acciones de salida;
* timeouts;
* recuperación;
* compensación;
* persistencia;
* concurrencia.

Las máquinas de estados son obligatorias para todos los objetos cuyo
comportamiento dependa de su estado actual.

Ningún componente puede inventar estados o transiciones fuera de este
documento.

---

2. Principios generales

---

RULE-FSM-001

Todo objeto controlado por una FSM posee exactamente un estado vigente.

---

RULE-FSM-002

Toda transición debe partir de un estado permitido.

---

RULE-FSM-003

Toda transición debe ser provocada por un comando, evento o timeout
identificable.

---

RULE-FSM-004

Toda transición debe generar evidencia.

---

RULE-FSM-005

Una transición inválida debe rechazarse sin modificar el estado.

---

RULE-FSM-006

Los estados terminales no aceptan transiciones comerciales, salvo
procedimientos formales de corrección o conciliación.

---

RULE-FSM-007

Toda modificación de estado incrementa la versión del aggregate.

---

RULE-FSM-008

Toda transición concurrente debe validar expected_version.

---

RULE-FSM-009

Los estados UNKNOWN, REVIEW o COMPENSATING no pueden resolverse mediante
suposiciones.

---

RULE-FSM-010

Los timeouts se representan mediante eventos o comandos explícitos.

---

RULE-FSM-011

Una LLM puede sugerir una acción.

La LLM no determina directamente el nuevo estado.

---

RULE-FSM-012

El nuevo estado es calculado exclusivamente por el dominio.

---

3. Convenciones

---

Formato del identificador:

FSM-<DOMINIO>-<NÚMERO>

Ejemplos:

FSM-SESSION-001
FSM-CART-001
FSM-ORDER-001

Representación de transición:

ESTADO_ORIGEN
-- COMANDO / CONDICIÓN -->
ESTADO_DESTINO

Ejemplo:

PENDING
-- ConfirmOrder / validación correcta -->
CONFIRMED

Una transición puede producir uno o más eventos:

ConfirmOrder
↓
OrderConfirmed
↓
Estado: CONFIRMED

---

4. Estructura obligatoria

---

Toda FSM debe declarar:

* FSM ID;
* aggregate;
* estado inicial;
* estados activos;
* estados transitorios;
* estados de error;
* estados terminales;
* comandos permitidos por estado;
* eventos relacionados;
* guardas;
* acciones;
* timeouts;
* política de reintento;
* política de recuperación;
* invariantes;
* transiciones prohibidas;
* criterios de aceptación.

---

5. Catálogo de máquinas de estado

---

FSM-SESSION-001

Sesión conversacional.

---

FSM-CONV-001

Turno conversacional.

---

FSM-VOICE-001

Sesión de voz.

---

FSM-CART-001

Carrito.

---

FSM-ORDER-001

Pedido.

---

FSM-STOCK-001

Reserva de inventario.

---

FSM-PAY-001

Pago.

---

FSM-HUMAN-001

Derivación humana.

---

FSM-ACTOR-001

Identidad de actor humano.

---

FSM-TASK-001

Ejecución de tarea programada.

======================================================================
6. FSM-SESSION-001 — SESIÓN CONVERSACIONAL
==========================================

FSM ID:

FSM-SESSION-001

Aggregate:

Session

Estado inicial:

CREATING

Estados:

CREATING

La sesión está siendo creada.

ACTIVE

La sesión está disponible para interacción automática.

VOICE_ACTIVE

Existe una sesión de voz activa asociada.

HUMAN_WAITING

La sesión espera asignación de un Operador.

HUMAN_ACTIVE

Un Operador controla la conversación.

SUSPENDED

La interacción está temporalmente suspendida.

CLOSING

Se están liberando recursos.

CLOSED

La sesión fue cerrada explícitamente.

EXPIRED

La sesión expiró por inactividad o política.

FAILED

La creación no pudo completarse.

Estados terminales:

CLOSED
EXPIRED
FAILED

Diagrama:

```
                +----------+
                | CREATING |
                +----+-----+
                     |
         SessionCreated
                     |
                     v
                +----+----+
                | ACTIVE  |
                +--+---+--+
                   |   |
   StartVoiceSession   RequestHumanHandoff
                   |   |
                   v   v
          +--------+   +--------------+
          | VOICE_ |   | HUMAN_       |
          | ACTIVE |   | WAITING      |
          +---+----+   +------+-------+
              |               |
  EndVoiceSession      AssignOperator
              |               |
              v               v
           ACTIVE       HUMAN_ACTIVE
                              |
                ReturnToAutomation
                              |
                              v
                           ACTIVE
```

ACTIVE / VOICE_ACTIVE / HUMAN_WAITING / HUMAN_ACTIVE
|
CloseSession
|
v
CLOSING
|
SessionClosed
|
v
CLOSED

ACTIVE / SUSPENDED
|
ExpireSession
|
v
EXPIRED

Transiciones permitidas:

CREATING
-- CreateSession / persistencia correcta -->
ACTIVE

CREATING
-- creación fallida -->
FAILED

ACTIVE
-- StartVoiceSession -->
VOICE_ACTIVE

VOICE_ACTIVE
-- EndVoiceSession -->
ACTIVE

ACTIVE
-- RequestHumanHandoff -->
HUMAN_WAITING

VOICE_ACTIVE
-- RequestHumanHandoff -->
HUMAN_WAITING

HUMAN_WAITING
-- AssignOperator -->
HUMAN_ACTIVE

HUMAN_ACTIVE
-- ReturnConversationToAutomation -->
ACTIVE

ACTIVE
-- suspender -->
SUSPENDED

VOICE_ACTIVE
-- pérdida prolongada de canal -->
SUSPENDED

SUSPENDED
-- recuperar sesión -->
ACTIVE

ACTIVE
-- CloseSession -->
CLOSING

VOICE_ACTIVE
-- CloseSession -->
CLOSING

HUMAN_WAITING
-- CloseSession autorizado -->
CLOSING

HUMAN_ACTIVE
-- CloseSession autorizado -->
CLOSING

CLOSING
-- recursos liberados -->
CLOSED

ACTIVE
-- timeout de inactividad -->
EXPIRED

SUSPENDED
-- timeout de expiración -->
EXPIRED

Comandos por estado:

CREATING:

* CreateSession.

ACTIVE:

* ReceiveTextMessage;
* StartVoiceSession;
* RequestHumanHandoff;
* CreateCart;
* RecoverSession;
* CloseSession.

VOICE_ACTIVE:

* AppendAudio;
* CommitAudioTurn;
* InterruptVoiceResponse;
* EndVoiceSession;
* RequestHumanHandoff;
* CloseSession.

HUMAN_WAITING:

* AssignOperator;
* CancelHumanHandoff;
* CloseSession, según política.

HUMAN_ACTIVE:

* DeliverHumanMessage;
* TransferConversation;
* ReturnConversationToAutomation;
* CloseHumanAssistance;
* CloseSession, según política.

SUSPENDED:

* RecoverSession;
* CloseSession;
* ExpireSession.

Guardas:

GUARD-SESSION-001

Una sesión sólo puede recuperarse por su propietario o actor autorizado.

GUARD-SESSION-002

No puede iniciarse voz si ya existe una VoiceSession activa.

GUARD-SESSION-003

No puede asignarse un Operador si la sesión no está HUMAN_WAITING.

GUARD-SESSION-004

No puede devolverse a automatización si existen acciones humanas
pendientes incompatibles.

GUARD-SESSION-005

No puede cerrarse sin liberar recursos temporales.

Invariantes:

INV-SESSION-001

Toda sesión posee Session ID.

INV-SESSION-002

Toda sesión posee actor o identidad temporal.

INV-SESSION-003

Una sesión no puede estar simultáneamente bajo control automático y
humano.

INV-SESSION-004

Una sesión cerrada conserva su historial.

INV-SESSION-005

Una sesión terminal no acepta nuevos mensajes.

Transiciones prohibidas:

CLOSED → ACTIVE

EXPIRED → ACTIVE

FAILED → ACTIVE

ACTIVE → HUMAN_ACTIVE sin pasar por HUMAN_WAITING, salvo asignación
atómica explícitamente diseñada.

HUMAN_ACTIVE → VOICE_ACTIVE sin devolver primero el control.

VOICE_ACTIVE → VOICE_ACTIVE mediante una segunda creación.

======================================================================
7. FSM-CONV-001 — TURNO CONVERSACIONAL
======================================

FSM ID:

FSM-CONV-001

Aggregate:

ConversationTurn

Estado inicial:

RECEIVED

Estados:

RECEIVED

Mensaje recibido.

NORMALIZING

Entrada en proceso de normalización.

DUPLICATE

Mensaje reconocido como duplicado.

INTERPRETING

La intención está siendo determinada.

CLARIFICATION_REQUIRED

Faltan datos.

READY

Existe una solicitud estructurada válida.

EXECUTING

Se está ejecutando un caso de uso.

GENERATING_RESPONSE

Se está redactando la respuesta.

DELIVERING

La respuesta está siendo enviada.

COMPLETED

El turno terminó correctamente.

REJECTED

La entrada fue rechazada.

FAILED

El turno falló.

HUMAN_HANDOFF

El turno produjo una derivación.

Estados terminales:

COMPLETED
REJECTED
FAILED
HUMAN_HANDOFF
DUPLICATE

Flujo principal:

RECEIVED
↓
NORMALIZING
↓
INTERPRETING
↓
READY
↓
EXECUTING
↓
GENERATING_RESPONSE
↓
DELIVERING
↓
COMPLETED

Flujo de aclaración:

INTERPRETING
-- datos insuficientes -->
CLARIFICATION_REQUIRED
-- pregunta entregada -->
COMPLETED

El siguiente mensaje inicia un nuevo ConversationTurn.

Flujo de duplicado:

RECEIVED
-- Message ID existente -->
DUPLICATE

Flujo de derivación:

INTERPRETING o EXECUTING
-- RequestHumanHandoff -->
HUMAN_HANDOFF

Guardas:

* la respuesta LLM debe cumplir el esquema;
* la intención debe superar el umbral configurado;
* los campos obligatorios deben existir;
* el comando propuesto debe estar permitido;
* el actor debe estar autorizado;
* el turno no puede ejecutarse dos veces.

Regla de aclaración:

Una aclaración no mantiene el mismo turno abierto indefinidamente.

Debe:

1. registrar el turno actual;
2. almacenar los campos pendientes;
3. finalizar el turno;
4. esperar un nuevo mensaje;
5. combinarlo con el contexto estructurado.

Límite:

El número máximo de aclaraciones consecutivas será configurable.

Al superar el límite:

CLARIFICATION_REQUIRED
-- límite excedido -->
HUMAN_HANDOFF

Transiciones prohibidas:

RECEIVED → EXECUTING sin normalización e interpretación.

INTERPRETING → EXECUTING con esquema inválido.

COMPLETED → EXECUTING.

DUPLICATE → EXECUTING.

FAILED → COMPLETED sin un nuevo intento registrado.

======================================================================
8. FSM-VOICE-001 — SESIÓN DE VOZ
================================

FSM ID:

FSM-VOICE-001

Aggregate:

VoiceSession

Estado inicial:

REQUESTED

Estados:

REQUESTED

El Cliente solicitó iniciar voz.

AUTHORIZING

Se verifica la sesión y se genera autorización efímera.

CONNECTING

Se está conectando al proveedor.

READY

La sesión está conectada y espera audio.

LISTENING

Se está recibiendo audio.

PROCESSING

El turno de audio está siendo procesado.

RESPONDING

Se está generando o reproduciendo audio.

INTERRUPTING

Se detiene la respuesta actual.

RECONNECTING

Se intenta recuperar la conexión.

ENDING

Se liberan recursos.

ENDED

La sesión terminó normalmente.

FAILED

La sesión no pudo continuar.

EXPIRED

La autorización o sesión expiró.

Estados terminales:

ENDED
FAILED
EXPIRED

Diagrama principal:

REQUESTED
↓
AUTHORIZING
↓
CONNECTING
↓
READY
↓
LISTENING
↓
PROCESSING
↓
RESPONDING
↓
READY

Interrupción:

RESPONDING
-- usuario habla -->
INTERRUPTING
↓
LISTENING

Reconexión:

READY / LISTENING / PROCESSING / RESPONDING
-- pérdida de conexión -->
RECONNECTING
-- recuperación correcta -->
READY
-- intentos agotados -->
FAILED

Cierre:

READY / LISTENING / PROCESSING / RESPONDING
-- EndVoiceSession -->
ENDING
↓
ENDED

Guardas:

GUARD-VOICE-001

La autorización debe ser efímera y vigente.

GUARD-VOICE-002

La VoiceSession debe pertenecer a una Session activa.

GUARD-VOICE-003

Los fragmentos de audio deben respetar secuencia.

GUARD-VOICE-004

No puede confirmarse una acción irreversible basada en una transcripción
de baja confianza.

GUARD-VOICE-005

Una respuesta interrumpida no se considera reproducida completamente.

GUARD-VOICE-006

El dominio nunca recibe audio binario.

Timeouts:

* autorización;
* conexión;
* silencio;
* procesamiento;
* reproducción;
* reconexión;
* duración máxima de sesión.

Acciones al entrar en INTERRUPTING:

1. cancelar audio pendiente;
2. registrar played_audio_ms;
3. invalidar contenido no reproducido;
4. abrir nuevo turno.

Transiciones prohibidas:

REQUESTED → READY sin autorización.

READY → RESPONDING sin resultado procesado.

RESPONDING → PROCESSING sin nuevo turno.

ENDED → READY.

FAILED → READY sin crear o recuperar formalmente una sesión.

======================================================================
9. FSM-CART-001 — CARRITO
=========================

FSM ID:

FSM-CART-001

Aggregate:

Cart

Estado inicial:

CREATING

Estados:

CREATING

Se está creando el carrito.

ACTIVE

Acepta modificaciones.

RECALCULATING

Se recalculan precios, promociones o totales.

LOCKED

No acepta modificaciones mientras se crea o confirma un pedido.

CHECKOUT_PENDING

Existe un pedido pendiente asociado.

CLOSED

El carrito produjo un pedido confirmado o fue cerrado.

ABANDONED

El carrito fue abandonado.

EXPIRED

El carrito expiró.

FAILED

No pudo crearse correctamente.

Estados terminales:

CLOSED
ABANDONED
EXPIRED
FAILED

Flujo principal:

CREATING
-- CartCreated -->
ACTIVE

ACTIVE
-- AddProductToCart -->
ACTIVE

ACTIVE
-- ChangeCartItemQuantity -->
ACTIVE

ACTIVE
-- RemoveProductFromCart -->
ACTIVE

ACTIVE
-- RecalculateCart -->
RECALCULATING
-- cálculo correcto -->
ACTIVE

ACTIVE
-- CreateOrderFromCart -->
LOCKED
-- OrderCreated -->
CHECKOUT_PENDING

CHECKOUT_PENDING
-- OrderConfirmed -->
CLOSED

CHECKOUT_PENDING
-- pedido cancelado y política permite volver -->
ACTIVE

ACTIVE
-- AbandonCart -->
ABANDONED

ACTIVE
-- timeout -->
EXPIRED

Reglas:

RULE-CART-FSM-001

Sólo ACTIVE acepta modificaciones.

RULE-CART-FSM-002

LOCKED impide cambios concurrentes durante la creación del pedido.

RULE-CART-FSM-003

Todo cambio incrementa cart_version.

RULE-CART-FSM-004

Un conflicto de versión no cambia el carrito.

RULE-CART-FSM-005

El carrito puede estar vacío mientras esté ACTIVE.

RULE-CART-FSM-006

No puede crearse un pedido desde un carrito vacío.

RULE-CART-FSM-007

CLOSED no puede reabrirse.

Guardas:

* cantidades positivas;
* productos oficiales;
* precio oficial;
* moneda consistente;
* versión esperada coincidente;
* stock verificable cuando corresponda;
* promociones válidas.

Transiciones prohibidas:

CLOSED → ACTIVE.

ABANDONED → ACTIVE.

EXPIRED → ACTIVE.

LOCKED → ACTIVE por simple petición del Cliente.

CHECKOUT_PENDING → ACTIVE si el pedido continúa pendiente.

ACTIVE → CLOSED sin pedido confirmado o cierre formal.

======================================================================
10. FSM-ORDER-001 — PEDIDO
==========================

FSM ID:

FSM-ORDER-001

Aggregate:

Order

Estado inicial:

CREATING

Estados:

CREATING

Se construye el pedido desde un carrito.

PENDING_VALIDATION

El pedido espera validación comercial.

PENDING_CONFIRMATION

El pedido fue validado y espera confirmación explícita.

CONFIRMING

Se ejecutan inventario, pago y entrega.

PAYMENT_PENDING

El pago está pendiente.

PAYMENT_REVIEW

El resultado del pago es incierto.

HUMAN_REVIEW

Se requiere intervención humana.

CONFIRMED

El pedido fue confirmado.

PREPARING

El pedido está siendo preparado.

READY

El pedido está listo para retiro o despacho.

IN_DELIVERY

El pedido está en entrega.

DELIVERED

El pedido fue entregado.

CANCELLING

Se ejecuta la cancelación.

CANCELLED

El pedido fue cancelado.

COMPENSATING

Se revierten efectos parciales.

FAILED

La creación o confirmación falló sin pedido válido.

Estados terminales:

DELIVERED
CANCELLED
FAILED

CONFIRMED es inmutable respecto de sus líneas y precios, pero no es
terminal respecto del proceso de cumplimiento.

Diagrama principal:

CREATING
↓
PENDING_VALIDATION
↓
PENDING_CONFIRMATION
↓
CONFIRMING
↓
CONFIRMED
↓
PREPARING
↓
READY
↓
IN_DELIVERY
↓
DELIVERED

Pago pendiente:

CONFIRMING
-- pago asíncrono -->
PAYMENT_PENDING
-- PaymentApproved -->
CONFIRMED
-- PaymentRejected -->
PENDING_CONFIRMATION o CANCELLED

Pago incierto:

CONFIRMING
-- timeout sin resultado -->
PAYMENT_REVIEW
-- conciliación aprobada -->
CONFIRMED
-- conciliación rechazada -->
PENDING_CONFIRMATION o CANCELLED

Revisión humana:

PENDING_VALIDATION / PENDING_CONFIRMATION / CONFIRMING
-- excepción -->
HUMAN_REVIEW
-- aprobación -->
PENDING_CONFIRMATION o CONFIRMING
-- rechazo -->
CANCELLING

Cancelación:

PENDING_VALIDATION
PENDING_CONFIRMATION
PAYMENT_PENDING
HUMAN_REVIEW
CONFIRMED, sólo si política lo permite
-- CancelOrder -->
CANCELLING
↓
CANCELLED

Compensación:

CONFIRMING
-- fallo parcial -->
COMPENSATING
-- compensación correcta -->
PENDING_CONFIRMATION o CANCELLED
-- compensación fallida -->
HUMAN_REVIEW

Guardas de confirmación:

GUARD-ORDER-001

El estado debe ser PENDING_CONFIRMATION.

GUARD-ORDER-002

Debe existir confirmación explícita y vigente.

GUARD-ORDER-003

El actor debe estar autorizado.

GUARD-ORDER-004

Las líneas deben ser válidas.

GUARD-ORDER-005

El total debe provenir del servidor.

GUARD-ORDER-006

El inventario debe estar disponible o reservado.

GUARD-ORDER-007

La operación debe poseer Idempotency Key.

GUARD-ORDER-008

expected_order_version debe coincidir.

GUARD-ORDER-009

El método de cumplimiento debe ser válido.

GUARD-ORDER-010

El pago debe alcanzar el estado requerido por la política.

Invariantes:

INV-ORDER-001

Un pedido posee Order ID.

INV-ORDER-002

Un pedido posee al menos una línea.

INV-ORDER-003

Un pedido confirmado conserva un snapshot comercial inmutable.

INV-ORDER-004

Un pedido no puede confirmarse dos veces.

INV-ORDER-005

Un pedido CANCELLED no puede reactivarse.

INV-ORDER-006

Un pedido DELIVERED no puede cancelarse mediante el flujo ordinario.

INV-ORDER-007

Las líneas de un pedido CONFIRMED no pueden modificarse.

INV-ORDER-008

Una corrección posterior requiere un nuevo proceso comercial.

Transiciones prohibidas:

CREATING → CONFIRMED.

PENDING_VALIDATION → DELIVERED.

PENDING_CONFIRMATION → CONFIRMED sin pasar por CONFIRMING.

CONFIRMED → PENDING_CONFIRMATION.

CANCELLED → CONFIRMED.

DELIVERED → CANCELLED.

FAILED → CONFIRMED.

PAYMENT_REVIEW → CONFIRMED sin conciliación oficial.

======================================================================
11. FSM-STOCK-001 — RESERVA DE INVENTARIO
=========================================

FSM ID:

FSM-STOCK-001

Aggregate:

StockReservation

Estado inicial:

REQUESTED

Estados:

REQUESTED

Reserva solicitada.

VALIDATING

Se verifica disponibilidad.

RESERVED

Inventario reservado.

CONSUMING

La reserva se convierte en consumo.

CONSUMED

Inventario consumido.

RELEASING

La reserva se está liberando.

RELEASED

Reserva liberada.

EXPIRED

Reserva vencida.

REJECTED

No se pudo reservar.

UNKNOWN

No puede determinarse el estado actual.

Estados terminales:

CONSUMED
RELEASED
EXPIRED
REJECTED

UNKNOWN no es terminal.

Requiere conciliación.

Transiciones:

REQUESTED
-- ReserveStock -->
VALIDATING

VALIDATING
-- disponibilidad suficiente -->
RESERVED

VALIDATING
-- disponibilidad insuficiente -->
REJECTED

RESERVED
-- ConsumeStock -->
CONSUMING
-- consumo correcto -->
CONSUMED

RESERVED
-- ReleaseStock -->
RELEASING
-- liberación correcta -->
RELEASED

RESERVED
-- TTL agotado -->
EXPIRED

VALIDATING / CONSUMING / RELEASING
-- timeout incierto -->
UNKNOWN

UNKNOWN
-- conciliación determina reserva activa -->
RESERVED

UNKNOWN
-- conciliación determina consumo -->
CONSUMED

UNKNOWN
-- conciliación determina liberación -->
RELEASED

Reglas:

* una reserva posee TTL;
* una reserva expirada no puede consumirse;
* liberar dos veces debe ser idempotente;
* consumir dos veces debe ser rechazado o devolver el resultado previo;
* la cantidad disponible nunca puede quedar negativa;
* UNKNOWN exige consulta a la fuente oficial.

Transiciones prohibidas:

RELEASED → CONSUMED.

EXPIRED → CONSUMED.

CONSUMED → RESERVED.

REJECTED → RESERVED sin una nueva solicitud.

======================================================================
12. FSM-PAY-001 — PAGO
======================

FSM ID:

FSM-PAY-001

Aggregate:

Payment

Estado inicial:

CREATING

Estados:

CREATING

Se crea la intención de pago.

PENDING

El pago está pendiente.

PROCESSING

El proveedor procesa la transacción.

REQUIRES_ACTION

El Cliente debe completar una acción.

APPROVED

Pago aprobado.

REJECTED

Pago rechazado.

CANCELLING

Se cancela la intención.

CANCELLED

Pago cancelado.

REFUND_PENDING

Existe una devolución pendiente.

REFUNDED

Pago devuelto.

PARTIALLY_REFUNDED

Pago devuelto parcialmente.

UNKNOWN

Resultado incierto.

REVIEW

Requiere conciliación humana o automática.

FAILED

No pudo iniciarse el proceso.

Estados terminales para la intención inicial:

APPROVED
REJECTED
CANCELLED
FAILED

APPROVED puede iniciar posteriormente una FSM de devolución.

Flujo:

CREATING
↓
PENDING
↓
PROCESSING
├── APPROVED
├── REJECTED
├── REQUIRES_ACTION
└── UNKNOWN

REQUIRES_ACTION
-- acción completada -->
PROCESSING

UNKNOWN
-- conciliación -->
APPROVED / REJECTED / REVIEW

APPROVED
-- solicitud de devolución -->
REFUND_PENDING
-- devolución completa -->
REFUNDED
-- devolución parcial -->
PARTIALLY_REFUNDED

Reglas:

RULE-PAY-FSM-001

Sólo la Pasarela de Pago o una conciliación oficial puede declarar
APPROVED.

RULE-PAY-FSM-002

El retorno del navegador no determina el estado.

RULE-PAY-FSM-003

UNKNOWN no puede reintentarse como un nuevo cobro sin conciliación.

RULE-PAY-FSM-004

Cada evento del proveedor debe ser idempotente.

RULE-PAY-FSM-005

El importe se obtiene desde el pedido oficial.

RULE-PAY-FSM-006

Un pago APPROVED no puede transformarse en REJECTED.

Puede ser CANCELLED únicamente mediante un proceso oficial permitido o
REFUNDED mediante una devolución.

Transiciones prohibidas:

REJECTED → APPROVED sin una nueva intención.

CANCELLED → APPROVED.

REFUNDED → APPROVED.

UNKNOWN → APPROVED sin evidencia oficial.

APPROVED → PENDING.

======================================================================
13. FSM-HUMAN-001 — DERIVACIÓN HUMANA
=====================================

FSM ID:

FSM-HUMAN-001

Aggregate:

Handoff

Estado inicial:

REQUESTED

Estados:

REQUESTED

La derivación fue solicitada.

QUEUED

La conversación está en cola.

ASSIGNING

Se intenta asignar un Operador.

ASSIGNED

Existe un Operador asignado.

ACTIVE

El Operador controla la conversación.

TRANSFER_PENDING

Se solicita transferencia a otro Operador.

RETURN_PENDING

Se prepara el retorno a automatización.

RETURNED

La conversación volvió a automatización.

CLOSED

La asistencia humana terminó y la sesión fue cerrada.

CANCELLED

La derivación fue cancelada antes de ser atendida.

EXPIRED

La solicitud expiró.

FAILED

No se pudo procesar.

Estados terminales:

RETURNED
CLOSED
CANCELLED
EXPIRED
FAILED

Diagrama:

REQUESTED
↓
QUEUED
↓
ASSIGNING
↓
ASSIGNED
↓
ACTIVE
├── TRANSFER_PENDING → ASSIGNED → ACTIVE
├── RETURN_PENDING → RETURNED
└── CLOSED

Reglas:

RULE-HUMAN-FSM-001

Una sesión sólo puede tener un Handoff activo.

RULE-HUMAN-FSM-002

Un único Operador controla la conversación, salvo modo colaborativo
explícito.

RULE-HUMAN-FSM-003

La asignación requiere control de concurrencia.

RULE-HUMAN-FSM-004

El historial anterior permanece disponible conforme a permisos.

RULE-HUMAN-FSM-005

El retorno requiere una nota estructurada.

RULE-HUMAN-FSM-006

La automatización no responde durante HUMAN_ACTIVE, salvo funciones
auxiliares autorizadas.

RULE-HUMAN-FSM-007

La transferencia conserva el Handoff ID y genera nuevos eventos de
asignación.

Guardas:

* Operador autenticado;
* Operador activo;
* habilidad suficiente;
* acceso autorizado;
* conversación disponible;
* expected_version coincidente.

Transiciones prohibidas:

QUEUED → ACTIVE sin asignación.

ACTIVE → QUEUED sin transferencia formal.

RETURNED → ACTIVE.

CANCELLED → ACTIVE.

Dos transiciones ASSIGNING → ASSIGNED para Operadores distintos con la
misma versión.

======================================================================
14. FSM-ACTOR-001 — IDENTIDAD HUMANA
====================================

FSM ID:

FSM-ACTOR-001

Aggregate:

ActorIdentity

Estado inicial:

PENDING_VERIFICATION o ACTIVE.

Estados:

PENDING_VERIFICATION
ACTIVE
SUSPENDED
BLOCKED
EXPIRED
DISABLED

Estado terminal:

DISABLED, salvo procedimiento formal de reactivación.

Transiciones:

PENDING_VERIFICATION → ACTIVE
PENDING_VERIFICATION → DISABLED

ACTIVE → SUSPENDED
ACTIVE → BLOCKED
ACTIVE → EXPIRED
ACTIVE → DISABLED

SUSPENDED → ACTIVE
SUSPENDED → BLOCKED
SUSPENDED → DISABLED

BLOCKED → ACTIVE, mediante desbloqueo autorizado
BLOCKED → DISABLED

EXPIRED → ACTIVE, mediante renovación
EXPIRED → DISABLED

Reglas:

* un actor SUSPENDED no ejecuta acciones protegidas;
* un actor BLOCKED no inicia sesión;
* un actor DISABLED no recupera credenciales antiguas;
* la reactivación genera auditoría;
* nadie puede modificar su propio rol privilegiado;
* la expiración de una credencial no elimina la identidad.

Transiciones prohibidas:

DISABLED → ACTIVE mediante una credencial antigua.

BLOCKED → ACTIVE sin procedimiento autorizado.

PENDING_VERIFICATION → rol privilegiado sin verificación.

======================================================================
15. FSM-TASK-001 — TAREA PROGRAMADA
===================================

FSM ID:

FSM-TASK-001

Aggregate:

ScheduledTaskExecution

Estado inicial:

SCHEDULED

Estados:

SCHEDULED

La ocurrencia está registrada.

LOCKING

Se intenta adquirir control exclusivo.

RUNNING

La tarea está ejecutándose.

RETRY_WAIT

Espera un nuevo intento.

SUCCEEDED

Terminó correctamente.

FAILED

Falló sin más reintentos.

TIMED_OUT

Superó el límite.

CANCELLED

Fue cancelada.

UNKNOWN

El resultado no puede determinarse.

Estados terminales:

SUCCEEDED
FAILED
CANCELLED

TIMED_OUT puede requerir conciliación antes de considerarse terminal.

Flujo:

SCHEDULED
↓
LOCKING
├── RUNNING
└── CANCELLED, si la ocurrencia ya fue ejecutada

RUNNING
├── SUCCEEDED
├── RETRY_WAIT
├── TIMED_OUT
└── UNKNOWN

RETRY_WAIT
-- siguiente intento -->
LOCKING

TIMED_OUT
-- conciliación -->
SUCCEEDED / RETRY_WAIT / FAILED / UNKNOWN

Reglas:

* cada ocurrencia posee execution_key;
* no se ejecuta dos veces la misma ocurrencia;
* los reintentos poseen límite;
* todo intento posee timeout;
* el lock posee TTL seguro;
* la pérdida del worker no implica automáticamente que la operación no
  ocurrió;
* UNKNOWN requiere reconciliación.

======================================================================
16. Máquina global de control conversacional
============================================

VoiceShop debe mantener un estado de control independiente del estado del
canal.

CONTROL_AUTOMATED

La automatización puede interpretar y responder.

CONTROL_HUMAN_PENDING

La automatización prepara la derivación, pero no ejecuta nuevas acciones
incompatibles.

CONTROL_HUMAN

El Operador controla la conversación.

CONTROL_PAUSED

No se procesan nuevas acciones comerciales.

CONTROL_CLOSED

La conversación terminó.

Transiciones:

CONTROL_AUTOMATED
-- HumanRequested -->
CONTROL_HUMAN_PENDING

CONTROL_HUMAN_PENDING
-- OperatorAssigned -->
CONTROL_HUMAN

CONTROL_HUMAN_PENDING
-- HandoffCancelled -->
CONTROL_AUTOMATED

CONTROL_HUMAN
-- ConversationReturned -->
CONTROL_AUTOMATED

CONTROL_AUTOMATED / CONTROL_HUMAN
-- PauseConversation -->
CONTROL_PAUSED

CONTROL_PAUSED
-- ResumeConversation autorizado -->
CONTROL_AUTOMATED o CONTROL_HUMAN

Cualquier estado activo
-- CloseSession -->
CONTROL_CLOSED

Invariante:

Sólo un modo puede poseer autoridad de respuesta principal.

---

17. Transacciones entre FSM

---

Algunos procesos modifican más de una FSM.

Ejemplo:

Confirmar pedido.

FSM afectadas:

* Order;
* StockReservation;
* Payment;
* Cart;
* Session, indirectamente.

Flujo lógico:

1. Order:

   PENDING_CONFIRMATION → CONFIRMING

2. StockReservation:

   REQUESTED → RESERVED

3. Payment:

   CREATING → PENDING → APPROVED

4. Order:

   CONFIRMING → CONFIRMED

5. Cart:

   CHECKOUT_PENDING → CLOSED

Si falla el pago:

1. Payment:

   PROCESSING → REJECTED

2. StockReservation:

   RESERVED → RELEASING → RELEASED

3. Order:

   CONFIRMING → COMPENSATING

4. Order:

   COMPENSATING → PENDING_CONFIRMATION o CANCELLED

Regla:

No se utilizará una transacción distribuida global como supuesto
implícito.

Debe existir una Saga o proceso coordinador con:

* estado persistente;
* pasos identificables;
* idempotencia;
* compensaciones;
* reanudación;
* timeout;
* auditoría.

---

18. Saga de confirmación de pedido

---

Saga ID:

SAGA-ORDER-CONFIRM-001

Estado inicial:

STARTED

Estados:

STARTED
ORDER_VALIDATING
STOCK_RESERVING
PAYMENT_PROCESSING
FULFILLMENT_VALIDATING
ORDER_CONFIRMING
COMPLETED
COMPENSATING_PAYMENT
COMPENSATING_STOCK
COMPENSATED
HUMAN_REVIEW
FAILED
UNKNOWN

Flujo feliz:

STARTED
↓
ORDER_VALIDATING
↓
STOCK_RESERVING
↓
PAYMENT_PROCESSING
↓
FULFILLMENT_VALIDATING
↓
ORDER_CONFIRMING
↓
COMPLETED

Compensación:

Fallo después de reservar stock:

COMPENSATING_STOCK
↓
COMPENSATED

Fallo después de aprobar pago:

COMPENSATING_PAYMENT
↓
COMPENSATING_STOCK
↓
COMPENSATED o HUMAN_REVIEW

Resultado incierto:

Cualquier paso externo
-- timeout sin certeza -->
UNKNOWN
-- conciliación -->
estado correcto o HUMAN_REVIEW

Invariante:

La Saga nunca debe ejecutar una compensación destructiva sin conocer el
estado oficial de la operación que intenta compensar.

---

19. Persistencia de estado

---

Cada aggregate controlado por FSM debe persistir:

* Aggregate ID;
* estado;
* versión;
* fecha de creación;
* fecha de actualización;
* último Event ID;
* último Command ID;
* Correlation ID;
* estado anterior;
* motivo de transición;
* actor;
* timeout vigente, cuando exista;
* datos mínimos de recuperación.

La persistencia debe permitir:

* detectar concurrencia;
* reconstruir historial;
* reanudar procesos;
* conciliar estados;
* auditar transiciones;
* ejecutar pruebas de invariantes.

---

20. Modelo de transición

---

Toda transición se evalúa mediante:

TransitionResult = transition(
current_state,
command,
domain_data,
actor_permissions,
expected_version
)

El resultado lógico debe contener:

{
"accepted": true,
"previous_state": "PENDING_CONFIRMATION",
"new_state": "CONFIRMING",
"new_version": 3,
"events": [
"OrderConfirmationStarted"
],
"actions": [
"ReserveStock",
"StartPayment"
],
"error": null
}

Cuando se rechaza:

{
"accepted": false,
"previous_state": "CANCELLED",
"new_state": "CANCELLED",
"new_version": 5,
"events": [],
"actions": [],
"error": {
"code": "INVALID_STATE_TRANSITION",
"message": "Un pedido cancelado no puede confirmarse."
}
}

Regla:

Una transición rechazada no incrementa la versión comercial, salvo que
se registre un evento técnico independiente.

---

21. Validación de transición

---

Toda transición debe validar en este orden:

1. estructura del comando;
2. vigencia;
3. identidad;
4. autorización;
5. idempotencia;
6. versión esperada;
7. estado actual;
8. guarda de transición;
9. invariantes;
10. dependencias;
11. persistencia;
12. publicación de eventos.

---

22. Concurrencia

---

Caso:

Dos comandos intentan modificar el mismo carrito.

Estado:

ACTIVE
Version:

5

Comando A:

expected_version = 5

Comando B:

expected_version = 5

Orden:

1. Comando A se ejecuta.
2. Cart Version cambia a 6.
3. Comando B intenta persistir.
4. Comando B recibe CART_VERSION_CONFLICT.
5. Comando B no sobrescribe el cambio.
6. El Cliente recibe el carrito actualizado.
7. La operación puede repetirse con expected_version = 6.

Regla:

Nunca aplicar last-write-wins silencioso en aggregates comerciales.

---

23. Timeouts y expiraciones

---

Todo timeout debe declarar:

* Timeout ID;
* aggregate;
* estado esperado;
* fecha de vencimiento;
* comando generado;
* idempotency key;
* política de tolerancia;
* acción de recuperación.

Ejemplos:

SESSION_INACTIVITY_TIMEOUT

ACTIVE → EXPIRED

VOICE_RECONNECT_TIMEOUT

RECONNECTING → FAILED

STOCK_RESERVATION_TIMEOUT

RESERVED → EXPIRED

PAYMENT_RECONCILIATION_TIMEOUT

UNKNOWN → REVIEW

HUMAN_QUEUE_TIMEOUT

QUEUED → EXPIRED o escalamiento

CART_EXPIRATION_TIMEOUT

ACTIVE → EXPIRED

Regla:

El proceso que ejecuta el timeout debe verificar que el aggregate siga
en el estado esperado.

Un timeout antiguo no puede modificar un estado nuevo.

---

24. Eventos tardíos

---

Un evento tardío es un evento válido recibido después de que el sistema
cambió de estado.

Ejemplo:

1. Payment entra en UNKNOWN.
2. El pedido pasa a HUMAN_REVIEW.
3. Llega PaymentApproved.

El sistema debe:

1. verificar autenticidad;
2. verificar idempotencia;
3. cargar el estado vigente;
4. aplicar una política explícita;
5. no ignorar silenciosamente;
6. no ejecutar una transición prohibida;
7. iniciar conciliación;
8. generar auditoría.

Los eventos tardíos nunca deben aplicarse directamente sin validar la FSM.

---

25. Recuperación después de reinicio

---

Después de un reinicio, el sistema debe:

1. recuperar aggregates en estados transitorios;
2. recuperar sagas no terminadas;
3. verificar timeouts vencidos;
4. consultar outbox pendiente;
5. conciliar operaciones UNKNOWN;
6. renovar o invalidar locks;
7. continuar desde el último paso confirmado;
8. evitar repetir efectos ya ejecutados.

Estados que requieren recuperación:

* CREATING;
* CONNECTING;
* PROCESSING;
* CONFIRMING;
* CANCELLING;
* COMPENSATING;
* RECONNECTING;
* ASSIGNING;
* LOCKING;
* RUNNING;
* UNKNOWN.

---

26. Estados prohibidos implícitos

---

No deben existir combinaciones como:

Session = CLOSED
VoiceSession = READY

Session = ACTIVE
Handoff = ACTIVE
Control = CONTROL_AUTOMATED

Cart = CLOSED
Order = PENDING_CONFIRMATION

Order = CANCELLED
StockReservation = RESERVED

Order = CONFIRMED
Payment = REJECTED cuando la política exige pago previo

Order = DELIVERED
Delivery = NOT_CREATED, cuando la modalidad es entrega

Estas inconsistencias deben detectarse mediante validaciones periódicas y
procesos de conciliación.

---

27. Matriz resumida de estados terminales

---

## Aggregate             Estados terminales

Session               CLOSED, EXPIRED, FAILED

ConversationTurn      COMPLETED, REJECTED, FAILED,
HUMAN_HANDOFF, DUPLICATE

VoiceSession          ENDED, FAILED, EXPIRED

Cart                  CLOSED, ABANDONED, EXPIRED, FAILED

Order                 DELIVERED, CANCELLED, FAILED

StockReservation      CONSUMED, RELEASED, EXPIRED, REJECTED

Payment               APPROVED, REJECTED, CANCELLED, FAILED
para la intención original

Handoff               RETURNED, CLOSED, CANCELLED, EXPIRED, FAILED

ActorIdentity         DISABLED

ScheduledTask         SUCCEEDED, FAILED, CANCELLED

---

28. Errores estándar

---

INVALID_STATE_TRANSITION

La transición no está permitida.

STATE_VERSION_CONFLICT

La versión esperada no coincide.

STATE_GUARD_FAILED

No se cumplió una guarda.

STATE_INVARIANT_VIOLATION

La operación violaría una invariante.

STATE_TERMINAL

El aggregate está en un estado terminal.

STATE_TIMEOUT_STALE

El timeout pertenece a una versión o estado anterior.

STATE_RECONCILIATION_REQUIRED

El resultado requiere conciliación.

STATE_COMPENSATION_FAILED

La compensación no terminó correctamente.

STATE_CONCURRENT_OPERATION

Existe otra operación incompatible en curso.

STATE_RECOVERY_REQUIRED

El aggregate quedó en un estado transitorio tras una interrupción.

---

29. Observabilidad

---

Métricas mínimas:

state_transitions_total

state_transition_rejections_total

state_guard_failures_total

state_version_conflicts_total

state_timeouts_total

state_recoveries_total

state_compensations_total

state_reconciliation_required_total

aggregate_inconsistent_state_total

state_duration_seconds

Etiquetas permitidas:

* machine;
* aggregate_type;
* previous_state;
* new_state;
* command_name;
* result;
* error_code.

No utilizar identificadores de alta cardinalidad como etiquetas.

---

30. Auditoría

---

Toda transición sensible debe registrar:

* Transition ID;
* FSM ID;
* Aggregate ID;
* versión anterior;
* versión nueva;
* estado anterior;
* estado nuevo;
* Command ID;
* Event IDs;
* actor;
* rol;
* timestamp;
* motivo;
* Correlation ID;
* resultado;
* error;
* compensación relacionada.

---

31. Pruebas obligatorias

---

Cada FSM debe poseer:

* prueba de cada transición permitida;
* prueba de cada transición prohibida;
* prueba de cada guarda;
* prueba de estados terminales;
* prueba de idempotencia;
* prueba de expected_version;
* prueba de concurrencia;
* prueba de timeout antiguo;
* prueba de recuperación;
* prueba de compensación;
* prueba de evento tardío;
* prueba de persistencia;
* prueba de reconstrucción desde eventos;
* prueba de invariantes entre aggregates.

Ejemplo:

TEST-FSM-ORDER-001

Dado:

Order = PENDING_CONFIRMATION.

Cuando:

se ejecuta ConfirmOrder con datos válidos.

Entonces:

Order pasa a CONFIRMING.

---

TEST-FSM-ORDER-002

Dado:

Order = CANCELLED.

Cuando:

se ejecuta ConfirmOrder.

Entonces:

la transición se rechaza con INVALID_STATE_TRANSITION.

El estado permanece CANCELLED.

La versión no cambia.

---

32. Criterios globales de aceptación

---

AC-FSM-001

Todo aggregate con comportamiento dependiente de estado posee FSM.

---

AC-FSM-002

Toda FSM posee estado inicial.

---

AC-FSM-003

Toda FSM identifica estados terminales.

---

AC-FSM-004

Toda transición posee comando, evento o timeout causante.

---

AC-FSM-005

Toda transición valida expected_version.

---

AC-FSM-006

Las transiciones inválidas no modifican estado.

---

AC-FSM-007

Los estados terminales rechazan operaciones incompatibles.

---

AC-FSM-008

Los estados UNKNOWN requieren conciliación.

---

AC-FSM-009

Los estados transitorios pueden recuperarse después de un reinicio.

---

AC-FSM-010

Los timeouts antiguos no modifican estados nuevos.

---

AC-FSM-011

Las operaciones concurrentes no producen pérdida silenciosa de datos.

---

AC-FSM-012

Las compensaciones son idempotentes.

---

AC-FSM-013

La LLM no controla directamente los estados.

---

AC-FSM-014

Toda transición sensible genera auditoría.

---

AC-FSM-015

Todas las FSM pueden implementarse y probarse sin depender de una LLM.

---

33. Casos prohibidos

---

PROHIBITED-FSM-001

Modificar directamente el campo state desde un controlador.

---

PROHIBITED-FSM-002

Cambiar estado sin generar evidencia.

---

PROHIBITED-FSM-003

Confiar en el estado enviado por el navegador.

---

PROHIBITED-FSM-004

Permitir una transición porque la LLM la solicitó.

---

PROHIBITED-FSM-005

Ignorar expected_version.

---

PROHIBITED-FSM-006

Reabrir un estado terminal mediante una actualización directa.

---

PROHIBITED-FSM-007

Aplicar un timeout sin verificar el estado y versión vigentes.

---

PROHIBITED-FSM-008

Tratar UNKNOWN como FAILED o COMPLETED sin conciliación.

---

PROHIBITED-FSM-009

Reintentar una transición no idempotente sin conocer su resultado.

---

PROHIBITED-FSM-010

Mantener simultáneamente control humano y automático.

---

PROHIBITED-FSM-011

Modificar líneas de un pedido CONFIRMED.

---

PROHIBITED-FSM-012

Consumir una reserva RELEASED o EXPIRED.

---

34. Checklist de revisión

---

[ ] Todas las FSM poseen identificador.

[ ] Todos los estados están definidos.

[ ] Existe un estado inicial.

[ ] Los estados terminales están identificados.

[ ] Toda transición posee causa.

[ ] Toda transición posee guarda cuando corresponde.

[ ] Toda transición produce eventos.

[ ] Las transiciones inválidas se rechazan.

[ ] expected_version se valida.

[ ] Los comandos idempotentes conservan su resultado.

[ ] Los estados UNKNOWN poseen conciliación.

[ ] Los estados transitorios poseen recuperación.

[ ] Los timeouts poseen identidad y versión.

[ ] Los eventos tardíos se validan.

[ ] Las compensaciones están definidas.

[ ] La Saga de confirmación es persistente.

[ ] La voz no ejecuta reglas comerciales directamente.

[ ] La automatización y el Operador no controlan simultáneamente.

[ ] Un pedido confirmado conserva su snapshot.

[ ] Un pedido cancelado no se reactiva.

[ ] Una reserva liberada no se consume.

[ ] Un pago incierto no se cobra nuevamente sin conciliación.

[ ] Las transiciones generan auditoría.

[ ] Existen métricas de transición.

[ ] Todas las transiciones pueden probarse.

---

35. Historial de cambios

---

Versión 1.0
Fecha: 2026-07-16

* Creación de la FSM de sesión.
* Creación de la FSM de turno conversacional.
* Creación de la FSM de voz.
* Creación de la FSM de carrito.
* Creación de la FSM de pedido.
* Creación de la FSM de reserva de inventario.
* Creación de la FSM de pago.
* Creación de la FSM de derivación humana.
* Creación de la FSM de identidad.
* Creación de la FSM de tareas programadas.
* Incorporación de optimistic locking.
* Incorporación de estados UNKNOWN.
* Incorporación de conciliación.
* Incorporación de recuperación tras reinicio.
* Incorporación de Saga para confirmar pedidos.
* Definición de timeouts versionados.
* Definición de eventos tardíos.
* Definición de invariantes entre aggregates.

======================================================================
FIN DEL DOCUMENTO
=================
