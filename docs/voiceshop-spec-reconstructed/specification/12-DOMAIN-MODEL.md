======================================================================
Documento    : 12-DOMAIN-MODEL.md
Versión      : 1.0
Estado       : CORE
Clasificación: Arquitectura de Dominio (DDD)
======================================================================

# DOMAIN MODEL

----------------------------------------------------------------------
1. Objetivo
----------------------------------------------------------------------

Este documento define el modelo de dominio completo de VoiceShop.

El objetivo NO es describir tablas de base de datos.

El objetivo es definir:

- entidades
- agregados
- value objects
- servicios de dominio
- políticas
- invariantes
- eventos
- comandos
- límites transaccionales
- ownership de datos

Toda implementación (Python, Java, Go, Rust, etc.) debe respetar este
modelo.

Nunca se implementará lógica de negocio fuera de este documento.

----------------------------------------------------------------------

2. Principios
----------------------------------------------------------------------

PRINCIPLE-DOMAIN-001

El Dominio no conoce HTTP.

----------------------------------------------------------------------

PRINCIPLE-DOMAIN-002

El Dominio no conoce Telegram.

----------------------------------------------------------------------

PRINCIPLE-DOMAIN-003

El Dominio no conoce HTML.

----------------------------------------------------------------------

PRINCIPLE-DOMAIN-004

El Dominio no conoce OpenAI.

----------------------------------------------------------------------

PRINCIPLE-DOMAIN-005

El Dominio solamente conoce:

- comandos
- eventos
- reglas
- estados
- objetos

----------------------------------------------------------------------

PRINCIPLE-DOMAIN-006

Todo Aggregate posee un único Aggregate Root.

----------------------------------------------------------------------

PRINCIPLE-DOMAIN-007

Todo cambio importante ocurre mediante Command.

----------------------------------------------------------------------

PRINCIPLE-DOMAIN-008

Todo cambio exitoso genera Event.

----------------------------------------------------------------------

PRINCIPLE-DOMAIN-009

Los Aggregates nunca modifican otros Aggregates directamente.

----------------------------------------------------------------------

PRINCIPLE-DOMAIN-010

Toda coordinación entre Aggregates ocurre mediante:

- Application Service
o

- Saga

Nunca mediante referencias directas.

======================================================================
3. Bounded Contexts
======================================================================

VoiceShop queda dividido en los siguientes contextos.

Session Context

Responsable de:

- sesiones
- contexto
- canales

----------------------------------------------------------------------

Conversation Context

Responsable de:

- mensajes
- turnos
- intención
- aclaraciones

----------------------------------------------------------------------

Voice Context

Responsable de:

- realtime
- audio
- interrupciones
- streaming

----------------------------------------------------------------------

Catalog Context

Responsable de:

- productos
- categorías
- imágenes
- precios oficiales

----------------------------------------------------------------------

Inventory Context

Responsable de:

- stock
- reservas
- consumo

----------------------------------------------------------------------

Cart Context

Responsable de:

- carrito

----------------------------------------------------------------------

Order Context

Responsable de:

- pedidos

----------------------------------------------------------------------

Payment Context

Responsable de:

- pagos

----------------------------------------------------------------------

Human Context

Responsable de:

- operadores
- handoff

----------------------------------------------------------------------

Security Context

Responsable de:

- autenticación
- autorización

----------------------------------------------------------------------

Audit Context

Responsable de:

- auditoría

----------------------------------------------------------------------

Observability Context

Responsable de:

- métricas
- trazas
- logs

======================================================================
4. Aggregate Roots
======================================================================

Los Aggregate Root oficiales son:

Session

ConversationTurn

VoiceSession

Cart

Order

Payment

StockReservation

HumanHandoff

ScheduledTaskExecution

Ningún otro objeto puede modificar el estado interno de estos Aggregates.

======================================================================
5. Aggregate : Session
======================================================================

Responsabilidad

Representa una conversación completa.

No representa un mensaje.

No representa un websocket.

No representa una conexión.

----------------------------------------------------------------------

Identidad

SessionId

----------------------------------------------------------------------

Estado

CREATING

ACTIVE

VOICE_ACTIVE

HUMAN_WAITING

HUMAN_ACTIVE

SUSPENDED

CLOSED

FAILED

----------------------------------------------------------------------

Atributos

SessionId

CustomerId

CurrentState

CurrentChannel

Language

Timezone

CurrentConversationContext

CurrentVoiceSessionId

CurrentCartId

CurrentHandoffId

CreatedAt

UpdatedAt

LastActivity

Version

----------------------------------------------------------------------

Comportamientos

CreateSession

RecoverSession

AttachVoiceSession

DetachVoiceSession

AttachCart

DetachCart

RequestHuman

ResumeAutomation

Suspend

Close

----------------------------------------------------------------------

Eventos

SessionCreated

SessionRecovered

SessionSuspended

SessionClosed

VoiceAttached

VoiceDetached

HumanRequested

AutomationResumed

======================================================================
6. Aggregate : ConversationTurn
======================================================================

Representa un único turno conversacional.

Nunca contiene toda la conversación.

----------------------------------------------------------------------

Identity

TurnId

----------------------------------------------------------------------

Estados

RECEIVED

INTERPRETING

READY

EXECUTING

RESPONDING

COMPLETED

FAILED

----------------------------------------------------------------------

Atributos

TurnId

SessionId

MessageText

NormalizedText

Intent

Entities

MissingFields

Confidence

Response

CreatedAt

CompletedAt

Version

----------------------------------------------------------------------

Comportamientos

Normalize

Interpret

ValidateIntent

GenerateQuestion

GenerateResponse

Complete

======================================================================
7. Aggregate : VoiceSession
======================================================================

Representa una sesión Realtime.

No representa un websocket.

No representa una llamada.

----------------------------------------------------------------------

Identity

VoiceSessionId

----------------------------------------------------------------------

Estados

REQUESTED

CONNECTING

READY

LISTENING

PROCESSING

RESPONDING

INTERRUPTING

ENDED

----------------------------------------------------------------------

Atributos

VoiceSessionId

SessionId

RealtimeProvider

Language

CurrentTurn

PlaybackOffset

CreatedAt

ExpiresAt

Version

----------------------------------------------------------------------

Comportamientos

Start

Interrupt

ReceiveAudio

FinishTurn

Reconnect

Close

======================================================================
8. Aggregate : Cart
======================================================================

Representa el carrito oficial.

----------------------------------------------------------------------

Identity

CartId

----------------------------------------------------------------------

Estados

ACTIVE

LOCKED

CHECKOUT_PENDING

CLOSED

----------------------------------------------------------------------

Atributos

CartId

CustomerId

Items

Currency

Subtotal

Discount

Total

Version

CreatedAt

UpdatedAt

----------------------------------------------------------------------

Comportamientos

AddProduct

RemoveProduct

ChangeQuantity

ApplyPromotion

Recalculate

Lock

Unlock

Close

======================================================================
9. Aggregate : Order
======================================================================

Representa un pedido oficial.

----------------------------------------------------------------------

Identity

OrderId

----------------------------------------------------------------------

Estados

PENDING_CONFIRMATION

CONFIRMING

CONFIRMED

PREPARING

READY

DELIVERED

CANCELLED

----------------------------------------------------------------------

Atributos

OrderId

Snapshot

CustomerId

DeliveryAddress

PaymentReference

ReservationReference

CreatedAt

UpdatedAt

Version

----------------------------------------------------------------------

Comportamientos

Validate

Confirm

Cancel

Prepare

Deliver

======================================================================
10. Aggregate : Payment
======================================================================

Identity

PaymentId

Estados

PENDING

PROCESSING

APPROVED

REJECTED

UNKNOWN

REFUNDED

----------------------------------------------------------------------

Comportamientos

Start

Approve

Reject

Refund

Reconcile

======================================================================
11. Aggregate : StockReservation
======================================================================

Identity

ReservationId

Estados

REQUESTED

RESERVED

CONSUMED

RELEASED

EXPIRED

UNKNOWN

----------------------------------------------------------------------

Comportamientos

Reserve

Consume

Release

Expire

Reconcile

======================================================================
12. Aggregate : HumanHandoff
======================================================================

Identity

HandoffId

Estados

QUEUED

ASSIGNED

ACTIVE

RETURNED

CLOSED

----------------------------------------------------------------------

Comportamientos

Queue

Assign

Transfer

Return

Close

======================================================================
13. Value Objects
======================================================================

Los siguientes objetos NO poseen identidad.

Cambiar cualquier atributo implica crear uno nuevo.

CustomerName

EmailAddress

PhoneNumber

Money

Currency

Quantity

Price

Discount

Tax

Percentage

Language

Locale

Timezone

Coordinates

Address

ProductName

ProductDescription

SKU

Barcode

ImageReference

AudioReference

Transcript

IntentName

ConfidenceScore

CorrelationId

RequestId

CommandId

EventId

MessageId

IdempotencyKey

VersionNumber

Duration

Timestamp

======================================================================
14. Entidades internas
======================================================================

Estas entidades viven dentro de un Aggregate.

CartItem

OrderLine

PromotionApplication

PaymentAttempt

ConversationEntity

ConversationSlot

VoiceChunk

TranscriptChunk

ReservationItem

OperatorAssignment

TaskRetry

======================================================================
15. Servicios de Dominio
======================================================================

Domain Services

ConversationInterpreter

IntentValidator

PriceCalculator

PromotionEngine

StockAllocator

CheckoutValidator

PaymentCoordinator

DeliveryPolicy

VoiceCoordinator

ConversationSummarizer

SessionRecovery

ConflictResolver

HandoffCoordinator

Estos servicios contienen reglas que no pertenecen naturalmente a una
única entidad.

======================================================================
16. Repositories
======================================================================

Cada Aggregate posee exactamente un Repository.

SessionRepository

ConversationRepository

VoiceRepository

CartRepository

OrderRepository

PaymentRepository

InventoryRepository

HandoffRepository

TaskRepository

Nunca se comparte persistencia entre Aggregates.

======================================================================
17. Factories
======================================================================

Factories oficiales.

SessionFactory

CartFactory

OrderFactory

PaymentFactory

VoiceFactory

ReservationFactory

No se construyen Aggregates complejos mediante constructores enormes.

======================================================================
18. Policies
======================================================================

Business Policies

PromotionPolicy

DiscountPolicy

DeliveryPolicy

AgeRestrictionPolicy

PaymentRetryPolicy

StockReservationPolicy

ConversationTimeoutPolicy

VoiceTimeoutPolicy

OperatorAssignmentPolicy

======================================================================
19. Domain Events
======================================================================

Ejemplos.

SessionCreated

TurnCompleted

VoiceInterrupted

CartRecalculated

OrderConfirmed

PaymentApproved

ReservationReleased

OperatorAssigned

ConversationReturned

======================================================================
20. Domain Commands
======================================================================

Ejemplos.

CreateSession

ReceiveMessage

StartVoice

InterruptVoice

SearchProducts

AddProduct

CreateOrder

ConfirmOrder

CancelOrder

ReserveStock

ApprovePayment

AssignOperator

ReturnAutomation

======================================================================
21. Ownership
======================================================================

Cart es dueño de:

CartItems

----------------------------------------------------------------------

Order es dueño de:

OrderLines

----------------------------------------------------------------------

Session es dueña de:

ConversationContext

----------------------------------------------------------------------

VoiceSession es dueña de:

PlaybackState

----------------------------------------------------------------------

Payment es dueño de:

PaymentAttempts

======================================================================
22. Invariantes Globales
======================================================================

INV-001

Una sesión tiene máximo una VoiceSession activa.

----------------------------------------------------------------------

INV-002

Un carrito tiene máximo un Checkout pendiente.

----------------------------------------------------------------------

INV-003

Un pedido confirmado nunca cambia sus líneas.

----------------------------------------------------------------------

INV-004

Un pago aprobado no vuelve a pendiente.

----------------------------------------------------------------------

INV-005

Una reserva consumida nunca vuelve a reservada.

----------------------------------------------------------------------

INV-006

Un operador controla una sola conversación simultáneamente
(según política).

======================================================================
23. Límites Transaccionales
======================================================================

Cada Aggregate confirma su propia transacción.

No existen transacciones ACID distribuidas entre:

Cart

Order

Payment

Inventory

La coordinación se realiza mediante:

Sagas

Outbox

Compensaciones

======================================================================
24. Dependencias Permitidas
======================================================================

Conversation
    usa Session

Voice
    usa Session

Cart
    usa Catalog

Order
    usa Cart

Order
    usa Inventory

Order
    usa Payment

Human
    usa Session

Ninguna dependencia es circular.

======================================================================
25. Antipatrones
======================================================================

PROHIBIDO

Order modificando Cart directamente.

PROHIBIDO

Payment modificando Order.

PROHIBIDO

Inventory modificando Payment.

PROHIBIDO

Conversation llamando SQL.

PROHIBIDO

LLM modificando Aggregates.

PROHIBIDO

Controllers implementando reglas.

======================================================================
26. Criterios de aceptación
======================================================================

✔ Todos los Aggregates tienen un único Root.

✔ Todos los Value Objects son inmutables.

✔ Todos los cambios ocurren mediante Commands.

✔ Todos los cambios generan Events.

✔ No existen referencias circulares.

✔ Los límites transaccionales están definidos.

✔ Los invariantes son verificables.

✔ El modelo es independiente de la infraestructura.

======================================================================
FIN DEL DOCUMENTO
======================================================================
