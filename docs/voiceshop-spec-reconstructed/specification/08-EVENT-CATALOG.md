
Los módulos anteriores describen qué hace cada parte, pero todavía no describen cómo se comunican.

Por eso propongo añadir un documento completamente nuevo, que rara vez aparece incluso en arquitecturas empresariales:

08-EVENT-CATALOG.md

Ese documento definirá absolutamente todos los eventos del sistema.

======================================================================
Documento    : 08-EVENT-CATALOG.md
Versión      : 1.0
Estado       : DRAFT
Clasificación: CORE
Estabilidad  : CORE

Dependencias

00-PROJECT-MANIFEST
01-VISION
02-GLOSSARY
03-REQUIREMENTS
04-BUSINESS-RULES
05-ACTORS
06-USE-CASES
07-FUNCTIONAL-MODULES

======================================================================

# EVENT CATALOG

---

1. Objetivo

---

Este documento define todos los eventos oficiales del sistema.

Un evento representa un hecho ocurrido.

Los eventos describen cambios de estado, nunca intenciones.

Ejemplos correctos:

SessionCreated
ProductAddedToCart
OrderConfirmed

Ejemplos incorrectos:

CreateSession
AddProduct
ConfirmOrder

Los eventos describen algo que YA ocurrió.

---

2. Principios

---

EVT-001

Todo evento es inmutable.

---

EVT-002

Un evento nunca se modifica.

---

EVT-003

Todo evento posee Event ID.

---

EVT-004

Todo evento posee Timestamp UTC.

---

EVT-005

Todo evento posee Version.

---

EVT-006

Todo evento posee Producer.

---

EVT-007

Todo evento posee Correlation ID.

---

EVT-008

Todo evento posee Causation ID cuando exista.

---

EVT-009

Todo evento posee Session ID cuando aplique.

---

EVT-010

Todo evento puede reproducirse para reconstruir el sistema.

---

3. Estructura General

---

Todo evento deberá poseer:

Event ID

Nombre

Versión

Timestamp UTC

Producer

Consumers

Aggregate ID

Session ID

Actor ID

Correlation ID

Causation ID

Payload

Metadata

---

4. Clasificación

---

SESSION

CONVERSATION

VOICE

CATALOG

INVENTORY

PROMOTION

CART

ORDER

PAYMENT

AUTH

SECURITY

AUDIT

SYSTEM

---

5. Eventos de Sesión

---

EV-SESSION-001

Nombre

SessionCreated

Producer

Session Module

Consumers

Conversation

Audit

Observability

Payload

Session ID

User ID

Channel

Language

Timestamp

---

EV-SESSION-002

SessionRecovered

---

EV-SESSION-003

SessionExpired

---

EV-SESSION-004

SessionClosed

---

6. Eventos Conversacionales

---

EV-CONV-001

MessageReceived

Producer

Presentation

Consumers

Conversation

Audit

Intent

---

EV-CONV-002

MessageNormalized

---

EV-CONV-003

IntentDetected

---

EV-CONV-004

EntitiesExtracted

---

EV-CONV-005

ClarificationRequested

---

EV-CONV-006

ResponseGenerated

---

EV-CONV-007

ResponseDelivered

---

7. Eventos de Voz

---

EV-VOICE-001

VoiceSessionStarted

---

EV-VOICE-002

VoiceDetected

---

EV-VOICE-003

SpeechRecognized

---

EV-VOICE-004

SpeechSynthesisStarted

---

EV-VOICE-005

SpeechPlaybackInterrupted

---

EV-VOICE-006

VoiceSessionFinished

---

8. Eventos de Catálogo

---

EV-CATALOG-001

ProductFound

---

EV-CATALOG-002

ProductNotFound

---

EV-CATALOG-003

CatalogUpdated

---

9. Eventos de Inventario

---

EV-STOCK-001

StockConsulted

---

EV-STOCK-002

StockReserved

---

EV-STOCK-003

StockReleased

---

EV-STOCK-004

StockConsumed

---

EV-STOCK-005

StockUnavailable

---

10. Eventos de Carrito

---

EV-CART-001

CartCreated

---

EV-CART-002

ProductAddedToCart

---

EV-CART-003

ProductRemovedFromCart

---

EV-CART-004

CartRecalculated

---

EV-CART-005

CartAbandoned

---

11. Eventos de Pedido

---

EV-ORDER-001

OrderCreated

---

EV-ORDER-002

OrderValidated

---

EV-ORDER-003

OrderConfirmed

---

EV-ORDER-004

OrderCancelled

---

EV-ORDER-005

OrderDelivered

---

12. Eventos de Pago

---

EV-PAY-001

PaymentStarted

---

EV-PAY-002

PaymentApproved

---

EV-PAY-003

PaymentRejected

---

13. Eventos Humanos

---

EV-HUMAN-001

HumanRequested

---

EV-HUMAN-002

OperatorAssigned

---

EV-HUMAN-003

ConversationReturned

---

14. Eventos de Seguridad

---

EV-SEC-001

AuthenticationSucceeded

---

EV-SEC-002

AuthenticationFailed

---

EV-SEC-003

AuthorizationDenied

---

EV-SEC-004

PromptInjectionDetected

---

EV-SEC-005

RateLimitExceeded

---

15. Eventos del Sistema

---

EV-SYS-001

LLMTimeout

---

EV-SYS-002

ProviderUnavailable

---

EV-SYS-003

DatabaseUnavailable

---

EV-SYS-004

RedisUnavailable

---

EV-SYS-005

CircuitBreakerOpened

---

16. Productores

---

Session Module

Conversation Module

Voice Module

Intent Module

Cart Module

Orders Module

Authentication Module

Inventory Module

Provider Adapter

Scheduler

---

17. Consumidores

---

Audit

Observability

Conversation

Metrics

Notifications

Orders

Cart

Voice

Analytics

---

18. Orden Garantizado

---

Para un mismo Aggregate ID.

El orden de eventos deberá preservarse.

Ejemplo

CartCreated

↓

ProductAdded

↓

ProductRemoved

↓

CartRecalculated

Nunca al revés.

---

19. Versionado

---

Todo cambio incompatible

↓

Nueva versión.

Nunca modificar un evento existente.

---

20. Reglas

---

Nunca eliminar eventos.

Nunca renombrar eventos.

Nunca reutilizar IDs.

Nunca publicar eventos incompletos.

---

21. Checklist

---

[ ] Todo evento posee Producer.

[ ] Todo evento posee Consumers.

[ ] Todo evento posee Payload.

[ ] Todo evento posee versión.

[ ] Todo evento posee timestamp.

[ ] Todo evento puede reproducirse.

======================================================================
FIN DEL DOCUMENTO
=================








EVT-001

SessionCreated

Producer:
Session Module

Consumers:

Conversation Module

Audit Module

Observability Module

Payload:

Session ID

User ID

Timestamp

Version

--------

EVT-002

ProductAddedToCart

Producer:
Cart Module

Consumers:

Audit

Orders

Metrics

Notifications
