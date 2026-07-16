======================================================================
Documento    : 07-FUNCTIONAL-MODULES.md
Versión      : 1.0
Estado       : DRAFT
Clasificación: DOMAIN
Estabilidad  : CORE

Dependencias

00-PROJECT-MANIFEST
01-VISION
02-GLOSSARY
03-REQUIREMENTS
04-BUSINESS-RULES
05-ACTORS
06-USE-CASES

======================================================================

# FUNCTIONAL MODULES

---

1. Objetivo

---

Este documento define la división funcional del sistema.

Un módulo funcional representa un conjunto cohesionado de responsabilidades.

No representa código.

No representa paquetes.

No representa microservicios.

Representa únicamente responsabilidades del dominio.

---

2. Principios

---

MOD-001

Un módulo posee una única responsabilidad principal.

MOD-002

Los módulos colaboran mediante contratos.

MOD-003

Los módulos nunca conocen implementaciones.

MOD-004

Los módulos pueden reemplazarse.

MOD-005

Toda dependencia apunta hacia el dominio.

---

3. Vista General

---```
                 +-------------------+
                 | Presentation      |
                 +---------+---------+
                           |
                           |
                 +---------v---------+
                 | Session Module    |
                 +---------+---------+
                           |
                 +---------v---------+
                 | Conversation      |
                 +---------+---------+
                           |
                 +---------v---------+
                 | Intent Engine     |
                 +---------+---------+
                           |
                 +---------v---------+
                 | Use Case Router   |
                 +---------+---------+
                           |
      +---------+----------+----------+----------+
      |         |          |          |          |
      v         v          v          v          v
   Catalog     Cart     Orders      Human      Admin
                                   Handoff
```

---

4. Catálogo de módulos

---

FM-001

Presentation Module

Responsabilidad:

Gestionar interacción con canales.

No contiene reglas de negocio.

------------------------------------------------------------------------

FM-002

Session Module

Responsabilidad:

Gestionar sesiones.

Contexto.

Expiración.

Recuperación.

------------------------------------------------------------------------

FM-003

Conversation Module

Responsabilidad:

Administrar historial.

Eventos.

Contexto.

------------------------------------------------------------------------

FM-004

Voice Module

Responsabilidad:

Coordinar audio.

Nunca procesa reglas comerciales.

------------------------------------------------------------------------

FM-005

Intent Module

Responsabilidad:

Interpretar intención.

Extraer parámetros.

Solicitar aclaraciones.

------------------------------------------------------------------------

FM-006

Use Case Router

Responsabilidad:

Seleccionar el caso de uso correcto.

Nunca ejecuta negocio.

------------------------------------------------------------------------

FM-007

Catalog Module

Responsabilidad:

Consultar productos.

------------------------------------------------------------------------

FM-008

Inventory Module

Responsabilidad:

Consultar disponibilidad.

------------------------------------------------------------------------

FM-009

Promotion Module

Responsabilidad:

Calcular promociones.

------------------------------------------------------------------------

FM-010

Cart Module

Responsabilidad:

Administrar carritos.

------------------------------------------------------------------------

FM-011

Order Module

Responsabilidad:

Administrar pedidos.

------------------------------------------------------------------------

FM-012

Human Handoff Module

Responsabilidad:

Gestionar derivación.

------------------------------------------------------------------------

FM-013

Authentication Module

Responsabilidad:

Autenticación.

------------------------------------------------------------------------

FM-014

Authorization Module

Responsabilidad:

Permisos.

------------------------------------------------------------------------

FM-015

Audit Module

Responsabilidad:

Registrar evidencia.

------------------------------------------------------------------------

FM-016

Observability Module

Responsabilidad:

Logs.

Métricas.

Trazas.

------------------------------------------------------------------------

FM-017

Configuration Module

Responsabilidad:

Configuración.

Feature flags.

------------------------------------------------------------------------

FM-018

Scheduler Module

Responsabilidad:

Cron.

Tareas.

------------------------------------------------------------------------

FM-019

Notification Module

Responsabilidad:

Mensajes.

Emails.

Push.

------------------------------------------------------------------------

FM-020

Provider Adapter Module

Responsabilidad:

Conectar con OpenAI.

Claude.

Gemini.

Realtime.

Nunca contiene reglas comerciales.

------------------------------------------------------------------------

## 5. Dependencias permitidas

Presentation

↓

Conversation

↓

Intent

↓

Router

↓

Domain Modules

↓

Repository Interfaces

↓

Infrastructure

Nunca al revés.

------------------------------------------------------------------------

## 6. Dependencias prohibidas

Cart

→ Voice

Prohibido.

------------------------------------------------------------------------

Orders

→ Telegram

Prohibido.

------------------------------------------------------------------------

Inventory

→ GPT

Prohibido.

------------------------------------------------------------------------

Promotion

→ HTML

Prohibido.

------------------------------------------------------------------------

Voice

→ PostgreSQL

Prohibido.

------------------------------------------------------------------------

## 7. Matriz de responsabilidad

Módulo Responsable de

Presentation Entrada/Salida

Conversation Contexto

Intent NLP

Router Casos de uso

Catalog Productos

Inventory Stock

Promotion Promociones

Cart Carrito

Orders Pedidos

Voice Audio

Human Derivación

Authentication Identidad

Authorization Permisos

Audit Evidencia

Observability Métricas

Scheduler Cron

Configuration Configuración

Provider Adapter APIs IA

------------------------------------------------------------------------

## 8. Checklist

\[ \] Cada módulo posee una responsabilidad.

\[ \] Ningún módulo contiene responsabilidades duplicadas.

\[ \] Ningún módulo conoce implementaciones.

\[ \] Todas las dependencias son unidireccionales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
