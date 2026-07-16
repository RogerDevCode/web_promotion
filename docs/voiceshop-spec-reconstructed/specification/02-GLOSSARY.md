======================================================================
Documento : 02-GLOSSARY.md
Versión   : 1.0
Estado    : DRAFT
Autor     : VoiceShop Framework
Dependencias:
    - 00-PROJECT-MANIFEST.md
    - 01-VISION.md
======================================================================

# GLOSSARY

----------------------------------------------------------------------
1. Objetivo
----------------------------------------------------------------------

Este documento define el significado oficial de todos los conceptos,
siglas, entidades y términos utilizados dentro del proyecto.

Toda palabra definida aquí tendrá exactamente un significado.

Ningún documento podrá redefinir un término existente.

----------------------------------------------------------------------

2. Reglas del Glosario

----------------------------------------------------------------------

RULE-GLO-001

Todo término importante debe existir en este documento.

RULE-GLO-002

Cada término posee exactamente una definición.

RULE-GLO-003

No se permiten sinónimos técnicos.

Ejemplo

Incorrecto

Cliente
Usuario
Consumidor

Correcto

Cliente

Los demás deberán referenciar el término oficial.

RULE-GLO-004

Toda nueva palabra requiere actualizar este documento.

----------------------------------------------------------------------

3. Conceptos Generales

----------------------------------------------------------------------

Proyecto

Conjunto completo de documentación, arquitectura, código,
infraestructura y procedimientos.

Framework

Conjunto reutilizable de reglas, contratos y componentes.

Aplicación

Implementación concreta del Framework.

Dominio

Representación del problema de negocio.

Proveedor IA

Empresa o software que entrega capacidades de Inteligencia Artificial.

Modelo IA

Modelo específico utilizado por un proveedor.

Ejemplo

GPT

Claude

Gemini

Qwen

DeepSeek

----------------------------------------------------------------------

4. Inteligencia Artificial

----------------------------------------------------------------------

LLM

Large Language Model.

Modelo entrenado para comprender y generar lenguaje natural.

Agente

Proceso capaz de tomar decisiones utilizando uno o más modelos IA.

Prompt

Instrucción enviada al modelo IA.

Prompt System

Prompt con mayor prioridad.

Prompt Usuario

Entrada enviada por el usuario.

Prompt Herramienta

Prompt generado automáticamente por el sistema.

Contexto

Información disponible para el modelo antes de responder.

Token

Unidad mínima procesada por el modelo.

Memoria

Información utilizada para mantener continuidad durante una conversación.

----------------------------------------------------------------------

5. Arquitectura

----------------------------------------------------------------------

Dominio

Centro del sistema.

No depende de infraestructura.

Caso de Uso

Proceso de negocio.

Servicio

Implementación reutilizable.

Repositorio

Abstracción para acceso a datos.

Adaptador

Componente que conecta el dominio con sistemas externos.

Gateway

Adaptador especializado para comunicación.

Puerto

Interfaz utilizada por el dominio.

Infraestructura

Todo componente externo.

----------------------------------------------------------------------

6. Canales

----------------------------------------------------------------------

Canal

Medio de comunicación con el usuario.

Ejemplos

Telegram

WhatsApp

Web

Aplicación móvil

Voice

CLI

REST

----------------------------------------------------------------------

7. Voz

----------------------------------------------------------------------

Realtime Session

Sesión activa de conversación por voz.

Audio Input

Audio recibido.

Audio Output

Audio generado.

Speech To Text

Conversión de voz a texto.

Text To Speech

Conversión de texto a voz.

Streaming

Intercambio continuo de información.

----------------------------------------------------------------------

8. Usuario

----------------------------------------------------------------------

Usuario

Persona que utiliza el sistema.

Cliente

Usuario perteneciente al negocio.

Administrador

Usuario con permisos administrativos.

Operador

Empleado del negocio.

Supervisor

Usuario encargado de validar procesos.

----------------------------------------------------------------------

9. Comercio

----------------------------------------------------------------------

Producto

Artículo ofrecido.

Inventario

Existencias disponibles.

Promoción

Beneficio comercial temporal.

Pedido

Solicitud realizada por un cliente.

Carrito

Conjunto temporal de productos.

Sucursal

Ubicación física del negocio.

----------------------------------------------------------------------

10. Estados

----------------------------------------------------------------------

Activo

Disponible.

Inactivo

No disponible.

Pendiente

Esperando acción.

Procesando

Actualmente ejecutándose.

Completado

Finalizado correctamente.

Cancelado

Interrumpido por decisión.

Fallido

Terminó con error.

----------------------------------------------------------------------

11. Calidad

----------------------------------------------------------------------

Bug

Comportamiento incorrecto.

Issue

Problema registrado.

RFC

Solicitud formal de cambio.

QA

Quality Assurance.

Red Team

Proceso de búsqueda activa de fallas.

Smoke Test

Validación rápida.

Regression Test

Verificación de funcionalidades existentes.

----------------------------------------------------------------------

12. Seguridad

----------------------------------------------------------------------

Autenticación

Verificación de identidad.

Autorización

Verificación de permisos.

JWT

Token de autenticación.

API Key

Credencial para acceso programático.

Rate Limit

Límite de solicitudes.

Least Privilege

Principio de mínimos privilegios.

----------------------------------------------------------------------

13. Observabilidad

----------------------------------------------------------------------

Log

Registro de eventos.

Trace

Seguimiento completo de una operación.

Metric

Medición numérica.

Alert

Notificación automática.

Dashboard

Panel de monitoreo.

----------------------------------------------------------------------

14. Desarrollo

----------------------------------------------------------------------

Build

Proceso de compilación.

Deploy

Publicación.

Rollback

Reversión.

Release

Versión publicada.

Hotfix

Corrección urgente.

Refactor

Cambio interno sin modificar comportamiento.

----------------------------------------------------------------------

15. Convenciones

----------------------------------------------------------------------

Todos los documentos utilizarán exactamente estos nombres.

Ejemplo

Correcto

Caso de Uso

Incorrecto

Proceso

Función

Workflow

----------------------------------------------------------------------

16. Términos Reservados

----------------------------------------------------------------------

Los siguientes nombres quedan reservados.

VoiceShop

Framework

Dominio

Adaptador

Repositorio

Caso de Uso

Proveedor IA

Modelo IA

Gateway

Puerto

Observabilidad

RFC

No podrán reutilizarse con otro significado.

----------------------------------------------------------------------

17. Diccionario de Acrónimos

----------------------------------------------------------------------

AI

Artificial Intelligence

LLM

Large Language Model

RAG

Retrieval Augmented Generation

FSM

Finite State Machine

API

Application Programming Interface

REST

Representational State Transfer

JWT

JSON Web Token

QA

Quality Assurance

CI

Continuous Integration

CD

Continuous Deployment

ADR

Architecture Decision Record

RFC

Request For Comments

----------------------------------------------------------------------

18. Política de Evolución

----------------------------------------------------------------------

Toda modificación del Glosario requiere:

1. RFC

2. Revisión

3. Aprobación

4. Actualización de documentos dependientes

----------------------------------------------------------------------

19. Checklist

----------------------------------------------------------------------

[ ] Todos los términos existen.

[ ] No existen duplicados.

[ ] No existen sinónimos.

[ ] Todas las siglas están definidas.

[ ] Todas las entidades poseen definición.

[ ] Todos los documentos referencian este glosario.

======================================================================
FIN DEL DOCUMENTO
======================================================================
