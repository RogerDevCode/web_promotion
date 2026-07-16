======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-01-06-CONTEXT-MANAGEMENT.md

# GESTIÓN DE CONTEXTO CONVERSACIONAL

## 1. Objetivo

Este documento define cómo VoiceShop construye, actualiza, limita,
versiona y utiliza el contexto de una conversación.

El contexto permite comprender referencias como:

- "esa";
- "la misma";
- "agrega otra";
- "cámbialo a cuatro";
- "sí";
- "cancela eso".

El contexto no debe convertirse en un almacenamiento ilimitado ni en una
fuente de verdad comercial.

## 2. Principios

RULE-CTX-001

El contexto debe ser mínimo.

RULE-CTX-002

El contexto debe ser pertinente.

RULE-CTX-003

El contexto debe ser versionado.

RULE-CTX-004

El contexto debe distinguir hechos, candidatos e inferencias.

RULE-CTX-005

Los datos oficiales deben conservar su fuente y vigencia.

RULE-CTX-006

El contexto no sustituye repositorios oficiales.

RULE-CTX-007

El contexto no debe mezclar tenants.

RULE-CTX-008

El contexto no debe mezclar sesiones.

RULE-CTX-009

El contexto bajo control humano debe respetar exclusividad.

RULE-CTX-010

Una LLM no debe recibir todo el contexto por defecto.

RULE-CTX-011

El resumen no reemplaza el historial.

RULE-CTX-012

La pérdida del contexto en caché no debe destruir el estado oficial.

RULE-CTX-013

El contexto debe poder reconstruirse.

RULE-CTX-014

Los datos sensibles deben minimizarse.

RULE-CTX-015

La expiración debe evaluarse por elemento.

## 3. Capas de contexto

### SYSTEM_CONTEXT

Reglas y capacidades del sistema.

### TENANT_CONTEXT

Configuración del negocio.

### ACTOR_CONTEXT

Identidad, rol y permisos verificados.

### SESSION_CONTEXT

Estado de sesión y canal.

### CONVERSATION_CONTEXT

Resumen y turnos recientes.

### TASK_CONTEXT

Intención pendiente y slots.

### DOMAIN_CONTEXT

Referencias oficiales necesarias.

### CHANNEL_CONTEXT

Capacidades del canal.

### VOICE_CONTEXT

Estado de voz y reproducción.

### HUMAN_CONTEXT

Handoff y Operador asignado.

## 4. Contrato de contexto

```json
{
  "context_id": "UUID",
  "context_version": 17,
  "tenant_id": "UUID",
  "session_id": "UUID",
  "actor": {
    "actor_id": "UUID_OR_NULL",
    "trust_level": "TRUST_1",
    "roles": []
  },
  "session": {
    "state": "ACTIVE",
    "control_state": "CONTROL_AUTOMATED",
    "channel": "WEB",
    "language": "es-CL",
    "timezone": "America/Santiago"
  },
  "conversation": {
    "recent_turn_ids": [],
    "structured_summary": {},
    "last_system_question": null
  },
  "task": {
    "pending_intent": null,
    "slots": []
  },
  "domain": {
    "active_cart_id": "UUID_OR_NULL",
    "active_order_id": null,
    "last_product_reference": null
  },
  "voice": {
    "voice_session_id": null,
    "state": null,
    "last_played_response_id": null
  },
  "human": {
    "handoff_id": null,
    "operator_id": null
  },
  "updated_at": "UTC_TIMESTAMP"
}
```

## 5. Fuentes

- Session Aggregate;
- Conversation events;
- Pending Intent;
- Slot state;
- Cart reference;
- Order reference;
- VoiceSession;
- Handoff;
- Identity service;
- tenant configuration;
- signed channel interaction.

Toda fuente debe indicar autoridad.

## 6. Hechos, candidatos e inferencias

FACT

Dato validado oficialmente.

CANDIDATE

Dato extraído pero no validado.

INFERENCE

Dato inferido.

USER_CLAIM

Dato afirmado por el Cliente.

SYSTEM_CONFIGURATION

Dato configurado.

Ejemplo:

El Cliente dice:

"Mi pedido es el 123."

Esto es USER_CLAIM hasta validar propiedad y existencia.

## 7. Vigencia

Cada elemento dinámico debe incluir:

- resolved_at;
- expires_at;
- source_version;
- stale_policy.

Ejemplos:

- precio: corta vigencia;
- stock: corta vigencia;
- Product ID: vigencia mientras producto exista;
- confirmación: vigencia estricta;
- idioma: vigencia de sesión;
- dirección: según política;
- resumen: hasta nueva versión.

## 8. Contexto reciente

Debe conservar un número limitado de turnos.

La cantidad depende de:

- coste;
- canal;
- longitud;
- tarea;
- privacidad;
- modelo.

No usar un número fijo universal.

Debe priorizar:

- pregunta actual;
- respuesta pendiente;
- correcciones;
- entidades activas;
- confirmaciones;
- estado.

## 9. Resumen estructurado

Ejemplo:

```json
{
  "customer_goal": "Agregar productos al carrito",
  "confirmed_facts": {
    "active_cart_id": "UUID",
    "selected_branch_id": "UUID"
  },
  "pending": {
    "intent": "ADD_PRODUCT",
    "missing_slots": [
      "product_reference"
    ],
    "collected_slots": {
      "quantity": 6
    }
  },
  "references": {
    "last_product_candidates": [
      {
        "product_id": "UUID",
        "display_name": "Lager Norte 330 ml"
      }
    ]
  },
  "prohibitions": [
    "No asumir producto sin selección"
  ]
}
```

El resumen debe ser estructurado cuando sea posible.

## 10. Resumen generado por LLM

Puede utilizarse para compresión.

Debe:

- validarse;
- limitarse;
- no crear hechos;
- distinguir incertidumbre;
- conservar referencias;
- indicar versión;
- poder regenerarse.

No debe:

- cambiar estado;
- borrar correcciones;
- inventar confirmaciones;
- inventar precios;
- inventar IDs.

## 11. Contexto para LLM

Debe construirse por tarea.

Ejemplo SEARCH_PRODUCTS:

- mensaje actual;
- filtros;
- idioma;
- categorías permitidas;
- contexto reciente relevante.

No necesita:

- dirección completa;
- historial de pago;
- secretos;
- otros pedidos.

Ejemplo CONFIRM_ORDER:

La LLM no debe recibir autoridad para confirmar.

Puede recibir un resumen para redactar, mientras el dominio controla la
operación.

## 12. Contexto de intención pendiente

Debe conservar:

- Pending Intent ID;
- Intent ID;
- schema version;
- slots;
- aclaraciones;
- created_at;
- expires_at;
- source turn;
- expected session state;
- expected domain versions.

Debe invalidarse si:

- expira;
- cambia estado;
- cambia actor;
- cambia tenant;
- el Cliente cancela;
- se completa;
- el control pasa a humano;
- una regla lo invalida.

## 13. Referentes conversacionales

Debe conservar candidatos recientes:

- último producto mencionado;
- última lista mostrada;
- última promoción;
- último pedido;
- última pregunta;
- última confirmación.

Cada referente debe incluir:

- referencia;
- turno;
- vigencia;
- fuente;
- posición;
- tenant;
- autorización.

## 14. Listas y ordinales

Cuando el sistema muestra una lista:

```json
{
  "list_id": "UUID",
  "version": 1,
  "items": [
    {
      "position": 1,
      "product_id": "UUID-A"
    },
    {
      "position": 2,
      "product_id": "UUID-B"
    }
  ],
  "expires_at": "UTC_TIMESTAMP"
}
```

"la segunda" se resuelve contra list_id vigente.

Una lista anterior no debe reutilizarse después de presentar otra sin
desambiguación.

## 15. Contexto humano

Durante HUMAN_ACTIVE:

- el Operador posee control principal;
- las respuestas automáticas se suspenden;
- el sistema puede asistir internamente;
- las acciones siguen requiriendo autorización;
- el contexto registra operator_id;
- las notas humanas no se convierten en reglas.

Al retornar:

- conservar resumen;
- registrar decisiones temporales;
- reactivar automatización;
- invalidar instrucciones exclusivas del Operador.

## 16. Contexto de voz

Debe conservar:

- VoiceSession ID;
- estado;
- Turn ID;
- transcripción final;
- response_id;
- audio reproducido;
- interrupción;
- último fragmento escuchado.

No asumir que una respuesta interrumpida fue escuchada completa.

## 17. Contexto y concurrencia

Toda actualización debe usar:

- context_version;
- compare-and-swap;
- lock lógico;
- secuencia de eventos.

Dos turnos concurrentes no deben sobrescribirse silenciosamente.

## 18. Persistencia

El contexto puede tener:

- representación rápida en caché;
- representación oficial reconstruible;
- historial de eventos;
- snapshots.

La caché no es fuente de verdad única.

Tras pérdida de caché:

1. recuperar sesión;
2. recuperar pending intent;
3. recuperar referencias oficiales;
4. reconstruir resumen;
5. continuar sin duplicar acciones.

## 19. Retención

Elementos efímeros:

- listas;
- confirmaciones;
- referencias ordinales;
- buffers de voz;
- contexto temporal.

Elementos persistentes:

- historial según política;
- auditoría;
- pedidos;
- decisiones;
- mensajes necesarios.

La retención debe ser configurable.

## 20. Minimización

Antes de enviar contexto a un proveedor:

1. determinar tarea;
2. seleccionar campos;
3. eliminar secretos;
4. seudonimizar;
5. limitar turnos;
6. eliminar datos no relacionados;
7. registrar política.

## 21. Flujo principal

1. Recibir evento o turno.
2. cargar contexto vigente.
3. verificar versión.
4. validar tenant y sesión.
5. aplicar evento.
6. actualizar referentes.
7. actualizar pending intent.
8. actualizar resumen.
9. invalidar elementos vencidos.
10. aplicar minimización.
11. persistir nueva versión.
12. emitir ContextUpdated.
13. entregar vista específica al siguiente módulo.

## 22. Pseudocódigo

```text
function update_context(session_id, event, expected_version):

    context = load_context(session_id)

    if context.version != expected_version:
        reject(CONTEXT_VERSION_CONFLICT)

    validate_tenant(event, context)
    validate_session(event, context)

    next_context = copy(context)

    invalidate_expired_items(next_context)
    apply_event(next_context, event)
    update_references(next_context, event)
    update_pending_intent(next_context, event)
    update_control_state(next_context, event)
    update_structured_summary(next_context, event)

    next_context.version += 1
    next_context.updated_at = now_utc()

    persist_with_compare_and_swap(
        next_context,
        expected_version
    )

    emit(ContextUpdated)
    return next_context
```

## 23. Errores

CONTEXT_NOT_FOUND

CONTEXT_VERSION_CONFLICT

CONTEXT_TENANT_MISMATCH

CONTEXT_SESSION_MISMATCH

CONTEXT_REFERENCE_EXPIRED

CONTEXT_LIST_STALE

CONTEXT_PENDING_INTENT_EXPIRED

CONTEXT_CONTROLLED_BY_HUMAN

CONTEXT_RECONSTRUCTION_FAILED

CONTEXT_POLICY_VIOLATION

CONTEXT_SIZE_LIMIT_EXCEEDED

CONTEXT_SENSITIVE_DATA_VIOLATION

## 24. Eventos

ContextCreated

ContextUpdated

ContextReconstructed

ContextReferenceAdded

ContextReferenceExpired

PendingIntentAttached

PendingIntentDetached

ConversationSummaryUpdated

ConversationControlChanged

ContextMinimizedForProvider

ContextConflictDetected

## 25. Observabilidad

Métricas:

- context_load_total;
- context_update_total;
- context_reconstruction_total;
- context_conflict_total;
- context_expired_item_total;
- context_size_bytes;
- context_minimization_total;
- pending_intent_expired_total;
- stale_list_reference_total.

Dimensiones:

- context_version;
- channel;
- control_state;
- result;
- error_code.

## 26. Seguridad

Amenazas:

- cross-tenant leakage;
- session fixation;
- context poisoning;
- prompt injection persistente;
- datos sensibles en resumen;
- referencias obsoletas;
- takeover humano;
- pérdida de autorización;
- cache poisoning.

Controles:

- tenant obligatorio;
- versionado;
- autoridad por fuente;
- sanitización;
- expiración;
- reconstrucción;
- minimización;
- autorización;
- auditoría;
- separación de capas.

## 27. Casos límite

- dos mensajes simultáneos;
- lista anterior;
- "la segunda" después de nueva lista;
- cambio de carrito;
- confirmación expirada;
- precio obsoleto;
- contexto perdido;
- reinicio;
- cache vacía;
- HUMAN_ACTIVE;
- retorno humano;
- voz interrumpida;
- mensaje duplicado;
- cambio de tenant;
- Session ID robado;
- resumen inventa dato;
- LLM omite negación;
- pending intent expira;
- actor se autentica a mitad de sesión;
- sucursal cambia;
- pedido pasa a CANCELLED;
- referencia a producto inactivo.

## 28. Criterios de aceptación

AC-CTX-001

El contexto está versionado.

AC-CTX-002

El contexto es reconstruible.

AC-CTX-003

La caché no es fuente única.

AC-CTX-004

Los hechos indican fuente.

AC-CTX-005

Las inferencias se diferencian.

AC-CTX-006

Los elementos expiran individualmente.

AC-CTX-007

Las listas tienen ID y versión.

AC-CTX-008

El control humano es exclusivo.

AC-CTX-009

La respuesta interrumpida no se considera escuchada.

AC-CTX-010

El contexto para LLM es mínimo.

AC-CTX-011

No se mezclan tenants.

AC-CTX-012

No se mezclan sesiones.

AC-CTX-013

Los conflictos de versión se rechazan.

AC-CTX-014

El resumen no sustituye historial.

AC-CTX-015

Los datos sensibles se minimizan.

## 29. Plan mínimo de pruebas

- creación;
- actualización;
- versión;
- conflicto;
- reconstrucción;
- pérdida de caché;
- pending intent;
- expiración;
- listas;
- ordinales;
- corrección;
- cambio de intención;
- control humano;
- retorno;
- voz;
- interrupción;
- tenant mismatch;
- session mismatch;
- minimización;
- resumen;
- datos sensibles;
- concurrencia;
- duplicados;
- reinicio;
- estado comercial cambiado.

## 30. Checklist

[ ] Existe Context ID.
[ ] Existe versión.
[ ] Existe tenant.
[ ] Existe session.
[ ] Se distinguen hechos.
[ ] Se distinguen candidatos.
[ ] Se distinguen inferencias.
[ ] Existe procedencia.
[ ] Existe vigencia.
[ ] Se invalidan elementos.
[ ] Se controlan listas.
[ ] Se controla pending intent.
[ ] Se controla voz.
[ ] Se controla handoff.
[ ] Se aplica minimización.
[ ] Se protege PII.
[ ] Se controla concurrencia.
[ ] Se reconstruye.
[ ] Se emiten eventos.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
