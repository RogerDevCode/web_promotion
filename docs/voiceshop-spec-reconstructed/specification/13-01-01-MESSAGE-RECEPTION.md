======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-01-01-MESSAGE-RECEPTION.md

# RECEPCIÓN DE MENSAJES

## 1. Objetivo

Este documento define el comportamiento funcional obligatorio desde que
un canal recibe una interacción del Cliente hasta que VoiceShop registra
una entrada válida, idempotente, trazable y lista para normalización.

La recepción no interpreta la intención, no ejecuta reglas comerciales y
no invoca directamente casos de uso de carrito, inventario, pedido, pago
o entrega.

La responsabilidad termina al producir una representación canónica de
entrada y entregarla al módulo de normalización.

## 2. Alcance

Incluye:

- mensajes de texto;
- callbacks de botones;
- selecciones de menú;
- eventos de formulario;
- referencias de archivos permitidos;
- transcripciones provenientes del módulo de voz;
- webhooks de canales;
- deduplicación;
- validación del sobre;
- validación de sesión;
- validación de vigencia;
- rate limiting;
- correlación;
- persistencia inicial;
- auditoría;
- respuesta de aceptación o rechazo.

No incluye:

- interpretación semántica;
- detección de intención;
- extracción de entidades;
- generación de respuestas;
- ejecución de herramientas;
- conversión directa de audio;
- lógica de negocio;
- validación de stock;
- cálculo de precios.

## 3. Dependencias documentales

- 00-PROJECT-MANIFEST.md
- 02-GLOSSARY.md
- 03-REQUIREMENTS.md
- 04-BUSINESS-RULES.md
- 05-ACTORS.md
- 06-USE-CASES.md
- 08-EVENT-CATALOG.md
- 09-COMMAND-CATALOG.md
- 10-STATE-MACHINES.md
- 11-SEQUENCE-DIAGRAMS.md
- 12-DOMAIN-MODEL.md
- 13-01-00-INDEX.md

## 4. Actores

Actor principal:

- ACT-001 Cliente.

Actores de canal:

- ACT-006 Canal Web.
- ACT-007 Canal de Mensajería.
- ACT-008 Proveedor de Voz, únicamente mediante eventos ya convertidos
  en texto o metadatos estructurados.

Actores operacionales:

- ACT-015 Sistema de Identidad.
- ACT-016 Sistema de Auditoría.
- ACT-017 Sistema de Observabilidad.

## 5. Responsabilidad funcional

El módulo de recepción debe:

1. aceptar la interacción;
2. determinar el tipo de entrada;
3. verificar el canal;
4. validar el sobre;
5. obtener o crear Request ID;
6. obtener o crear Correlation ID;
7. verificar Session ID;
8. verificar actor y alcance;
9. verificar vigencia;
10. verificar firma cuando corresponda;
11. verificar duplicación;
12. aplicar límites de uso;
13. validar tamaño y formato;
14. registrar la recepción;
15. almacenar la entrada original permitida;
16. emitir MessageReceived o un evento equivalente;
17. enviar la entrada al módulo de normalización;
18. devolver una confirmación segura al canal cuando el protocolo lo
    requiera.

## 6. Tipos de entrada

### 6.1 TEXT_MESSAGE

Mensaje textual escrito por el Cliente.

Campos mínimos:

- channel;
- external_message_id;
- external_user_id;
- session_id, cuando exista;
- text;
- sent_at;
- received_at.

### 6.2 MENU_ACTION

Acción seleccionada desde un menú.

Campos mínimos:

- session_id;
- menu_id;
- menu_version;
- action_id;
- action_token o firma;
- expires_at;
- external_message_id.

### 6.3 BUTTON_CALLBACK

Callback proveniente de un botón interactivo.

Debe tratarse como dato no confiable.

El callback no puede codificar directamente:

- precio autorizado;
- rol;
- estado comercial;
- descuento;
- total;
- stock;
- confirmación irreversible sin validación adicional.

### 6.4 FORM_SUBMISSION

Formulario estructurado.

Debe conservar:

- schema_version;
- field_values;
- source_form_id;
- issued_at;
- expires_at;
- signature, cuando corresponda.

### 6.5 VOICE_TRANSCRIPT

Texto producido por el subsistema de voz.

Debe contener:

- voice_session_id;
- turn_id;
- transcript;
- confidence, cuando exista;
- is_final;
- language;
- sequence metadata.

No debe contener audio binario dentro del contrato del dominio.

### 6.6 FILE_REFERENCE

Referencia a un archivo permitido.

Debe contener:

- file_reference_id;
- mime_type declarado;
- tamaño declarado;
- checksum cuando exista;
- propósito;
- estado de análisis.

El archivo no debe considerarse seguro hasta pasar por un proceso
especializado de validación.

### 6.7 SYSTEM_EVENT

Evento generado por un componente interno autorizado.

Requiere identidad de servicio y alcance explícito.

## 7. Contrato canónico de entrada

Toda entrada aceptada debe transformarse en un sobre equivalente a:

```json
{
  "input_id": "UUID",
  "input_type": "TEXT_MESSAGE",
  "schema_version": 1,
  "request_id": "UUID",
  "correlation_id": "UUID",
  "causation_id": null,
  "session_id": "UUID",
  "turn_id": "UUID",
  "tenant_id": "UUID",
  "channel": "WEB",
  "actor": {
    "external_user_id": "STRING",
    "authenticated_actor_id": "UUID_OR_NULL",
    "trust_level": "TRUST_0"
  },
  "source": {
    "external_message_id": "STRING",
    "external_thread_id": "STRING_OR_NULL",
    "sent_at": "UTC_TIMESTAMP",
    "received_at": "UTC_TIMESTAMP"
  },
  "payload": {
    "text": "STRING"
  },
  "control": {
    "idempotency_key": "STRING",
    "expires_at": null,
    "menu_id": null,
    "menu_version": null
  },
  "security": {
    "signature_verified": false,
    "replay_checked": true,
    "rate_limit_bucket": "PUBLIC_CHAT"
  }
}
```

## 8. Reglas funcionales

RULE-RECV-001

Toda interacción externa se considera no confiable.

RULE-RECV-002

Toda entrada debe poseer un identificador interno Input ID.

RULE-RECV-003

Todo mensaje de canal debe conservar su External Message ID.

RULE-RECV-004

Una entrada repetida no puede ejecutar dos veces el flujo posterior.

RULE-RECV-005

La recepción no debe interpretar instrucciones comerciales.

RULE-RECV-006

La recepción no puede modificar carrito, pedido, pago o inventario.

RULE-RECV-007

La recepción debe preservar el contenido original permitido para
auditoría y depuración, respetando la política de datos personales.

RULE-RECV-008

La recepción debe producir una copia canónica separada de la entrada
original.

RULE-RECV-009

Un callback expirado debe rechazarse antes de llegar al dominio.

RULE-RECV-010

Una firma inválida debe provocar rechazo.

RULE-RECV-011

Un mensaje excesivamente grande debe rechazarse o enviarse a un flujo
especial autorizado.

RULE-RECV-012

Un mensaje vacío no debe enviarse al detector de intención.

RULE-RECV-013

Los roles enviados por el cliente deben ignorarse.

RULE-RECV-014

Los precios enviados por el cliente deben ignorarse como autoridad.

RULE-RECV-015

El canal no puede seleccionar directamente un caso de uso protegido sin
autorización del servidor.

RULE-RECV-016

El servidor debe asignar el timestamp de recepción.

RULE-RECV-017

El timestamp declarado por el canal se conserva como dato informativo,
pero no sustituye el timestamp del servidor.

RULE-RECV-018

Toda entrada debe quedar asociada con un tenant.

RULE-RECV-019

Una sesión de otro tenant no puede ser utilizada.

RULE-RECV-020

Todo rechazo debe devolver un error seguro y trazable.

## 9. Validaciones del sobre

### VAL-RECV-001 — Versión de esquema

La versión debe estar soportada.

Error:

INPUT_SCHEMA_VERSION_UNSUPPORTED

### VAL-RECV-002 — Tipo de entrada

El tipo debe pertenecer al catálogo permitido.

Error:

INPUT_TYPE_UNSUPPORTED

### VAL-RECV-003 — Identificador externo

Debe existir cuando el canal lo proporcione.

Error:

EXTERNAL_MESSAGE_ID_MISSING

### VAL-RECV-004 — Canal

El canal debe estar habilitado para el tenant.

Error:

CHANNEL_DISABLED

### VAL-RECV-005 — Sesión

Cuando la operación requiera sesión:

- debe existir;
- debe estar activa;
- debe pertenecer al actor o contexto autorizado;
- debe pertenecer al tenant;
- no debe estar expirada.

Errores:

- SESSION_NOT_FOUND
- SESSION_NOT_ACTIVE
- SESSION_ACCESS_DENIED
- SESSION_TENANT_MISMATCH

### VAL-RECV-006 — Tamaño

Los límites deben ser configurables por tipo de entrada.

Ejemplo inicial:

- texto: 4.000 caracteres;
- callback: 2.000 bytes;
- formulario: 64 KB;
- referencia de archivo: 8 KB de metadatos;
- transcripción de turno: 16.000 caracteres.

El documento no fija estos valores como permanentes. Los identifica como
configuración operativa.

### VAL-RECV-007 — Codificación

El texto debe poder representarse en Unicode válido.

Error:

INPUT_ENCODING_INVALID

### VAL-RECV-008 — Vigencia

Los callbacks, formularios y menús deben validar expires_at.

Error:

INPUT_EXPIRED

### VAL-RECV-009 — Firma

Cuando el canal soporte firma:

- validar algoritmo permitido;
- validar secreto o clave vigente;
- validar cuerpo exacto;
- validar timestamp;
- impedir replay.

Errores:

- SIGNATURE_MISSING
- SIGNATURE_INVALID
- SIGNATURE_TIMESTAMP_INVALID
- REPLAY_DETECTED

## 10. Idempotencia y deduplicación

La deduplicación debe evaluarse antes de ejecutar procesamiento
semántico.

Clave recomendada:

tenant_id + channel + external_message_id

Cuando el canal no proporciona un identificador confiable, se puede
construir una clave derivada con:

- actor externo;
- timestamp truncado;
- hash de payload;
- identificador de conversación externa.

Esta clave derivada es menos confiable y debe registrarse como tal.

Estados posibles:

- NOT_SEEN
- PROCESSING
- COMPLETED
- REJECTED
- UNKNOWN

Comportamiento:

### NOT_SEEN

Reservar procesamiento de forma atómica.

### PROCESSING

No iniciar un segundo procesamiento.

El canal puede recibir:

- ACK PROCESSING;
- resultado diferido;
- reintento posterior recomendado.

### COMPLETED

Devolver el resultado anterior o un ACK equivalente.

### REJECTED

Devolver el rechazo anterior cuando siga siendo aplicable.

### UNKNOWN

No reejecutar una operación con efectos sin conciliación.

Reglas:

RULE-IDEMP-RECV-001

La misma clave y el mismo payload representan la misma entrada.

RULE-IDEMP-RECV-002

La misma clave con un payload diferente debe rechazarse.

Error:

IDEMPOTENCY_KEY_CONFLICT

RULE-IDEMP-RECV-003

El hash del payload debe calcularse sobre una representación canónica.

RULE-IDEMP-RECV-004

El resultado idempotente debe conservarse durante el periodo definido
para el canal.

## 11. Menús y botones vigentes

Todo menú interactivo debe poseer:

- Menu ID;
- Session ID;
- Menu Version;
- Action ID;
- issued_at;
- expires_at;
- token o firma;
- lista de acciones permitidas.

Validación obligatoria:

1. verificar firma;
2. verificar Session ID;
3. verificar actor;
4. verificar tenant;
5. verificar Menu ID;
6. comparar Menu Version;
7. verificar expiración;
8. verificar Action ID;
9. verificar que el estado actual permita la acción.

Un botón puede ser criptográficamente válido y aun así estar
funcionalmente expirado.

Ejemplo:

El botón fue emitido para Cart Version 4.

El carrito actual está en Version 7.

La acción debe rechazarse o reconfirmarse.

Error:

STALE_INTERACTION

## 12. Rate limiting

El rate limit debe considerar:

- tenant;
- canal;
- actor;
- dirección de red cuando corresponda;
- operación;
- nivel de autenticación;
- coste estimado;
- historial de abuso.

Categorías recomendadas:

- PUBLIC_MESSAGE;
- AUTHENTICATED_MESSAGE;
- VOICE_SESSION_CREATION;
- FILE_REFERENCE;
- LOGIN_ATTEMPT;
- CALLBACK;
- ADMIN_ACTION.

El rate limiting no debe usar únicamente la dirección IP.

Respuestas:

- RATE_LIMIT_EXCEEDED;
- retry_after;
- mensaje seguro;
- evento de seguridad cuando corresponda.

El rate limit no debe revelar reglas internas detalladas al atacante.

## 13. Precondiciones

Para aceptar una entrada:

- el tenant existe y está activo;
- el canal está habilitado;
- la versión del contrato está soportada;
- la sesión es válida cuando sea requerida;
- la entrada no está expirada;
- el actor no está bloqueado;
- no se excedió el rate limit;
- la firma es válida cuando sea requerida;
- el tamaño está permitido;
- el contenido puede almacenarse según política.

## 14. Flujo principal

1. El canal recibe la interacción.
2. El adaptador crea Request ID si no existe.
3. El adaptador identifica tenant y canal.
4. El adaptador valida el contrato mínimo.
5. El backend verifica firma y replay.
6. El backend valida sesión.
7. El backend aplica rate limit.
8. El backend calcula o recupera Idempotency Key.
9. El backend reserva la entrada como PROCESSING.
10. El backend asigna Input ID y Turn ID.
11. El backend registra MessageReceived.
12. El backend persiste la entrada original permitida.
13. El backend crea el sobre canónico.
14. El backend envía el sobre a normalización.
15. El backend conserva Correlation ID.
16. El canal recibe ACK cuando el protocolo lo requiere.

## 15. Flujos alternativos

### ALT-RECV-001 — Sesión inexistente

Cuando el tipo de mensaje permita crear sesión automáticamente:

1. iniciar UC-001;
2. crear sesión;
3. asociar la entrada;
4. continuar.

Cuando no lo permita:

- rechazar con SESSION_REQUIRED.

### ALT-RECV-002 — Mensaje duplicado completado

- no procesar nuevamente;
- devolver el resultado anterior.

### ALT-RECV-003 — Mensaje duplicado en procesamiento

- devolver ACK PROCESSING;
- no ejecutar en paralelo.

### ALT-RECV-004 — Menú expirado

- rechazar la acción;
- generar menú actualizado;
- no ejecutar el comando asociado.

### ALT-RECV-005 — Canal temporalmente degradado

- aceptar y encolar cuando sea seguro;
- o rechazar con CHANNEL_TEMPORARILY_UNAVAILABLE;
- nunca perder silenciosamente la entrada.

### ALT-RECV-006 — Entrada parcialmente válida

No debe intentarse reparar silenciosamente un contrato estructural
crítico.

Se debe:

- rechazar;
- indicar campos inválidos;
- registrar evidencia.

## 16. Errores funcionales

INPUT_EMPTY

No existe contenido procesable.

INPUT_TOO_LARGE

Excede el límite.

INPUT_ENCODING_INVALID

No puede decodificarse.

INPUT_SCHEMA_INVALID

No cumple el contrato.

INPUT_SCHEMA_VERSION_UNSUPPORTED

Versión no soportada.

INPUT_EXPIRED

La interacción ya no es válida.

MESSAGE_DUPLICATE

Entrada ya procesada.

MESSAGE_PROCESSING

Entrada en procesamiento.

IDEMPOTENCY_KEY_CONFLICT

Misma clave con contenido diferente.

CHANNEL_DISABLED

Canal no habilitado.

CHANNEL_UNVERIFIED

Origen no verificable.

SIGNATURE_INVALID

Firma inválida.

REPLAY_DETECTED

Solicitud repetida fuera del flujo idempotente permitido.

SESSION_REQUIRED

Falta sesión.

SESSION_NOT_ACTIVE

La sesión no acepta mensajes.

SESSION_ACCESS_DENIED

El actor no puede utilizar esa sesión.

RATE_LIMIT_EXCEEDED

Se excedió el límite.

ACTOR_BLOCKED

El actor está bloqueado.

UNSUPPORTED_CONTENT_TYPE

Tipo de contenido no permitido.

STALE_INTERACTION

La acción pertenece a una versión anterior.

## 17. Eventos

Eventos de negocio o dominio:

- MessageReceived;
- MenuActionReceived;
- VoiceTranscriptReceived;
- FormSubmissionReceived.

Eventos técnicos:

- InputRejected;
- DuplicateInputDetected;
- ReplayDetected;
- RateLimitExceeded;
- SignatureValidationFailed;
- StaleInteractionRejected.

Payload mínimo de MessageReceived:

```json
{
  "event_id": "UUID",
  "event_version": 1,
  "input_id": "UUID",
  "session_id": "UUID",
  "turn_id": "UUID",
  "tenant_id": "UUID",
  "channel": "WEB",
  "input_type": "TEXT_MESSAGE",
  "received_at": "UTC_TIMESTAMP",
  "correlation_id": "UUID"
}
```

El evento no debe copiar innecesariamente todo el texto del Cliente.

## 18. Persistencia funcional

Debe conservarse:

- Input ID;
- tipo;
- tenant;
- canal;
- actor;
- Session ID;
- Turn ID;
- External Message ID;
- hash del payload;
- payload original permitido o referencia segura;
- payload canónico;
- estado de procesamiento;
- error;
- Request ID;
- Correlation ID;
- timestamps;
- política de retención;
- clasificación de datos.

No debe conservarse:

- credenciales;
- API Keys;
- tokens completos;
- secretos de firma;
- números completos de tarjetas;
- datos no requeridos.

## 19. Seguridad

Amenazas consideradas:

- replay;
- spoofing de canal;
- callbacks alterados;
- inyección de roles;
- manipulación de precio;
- mensajes excesivos;
- flooding;
- contenido malformado;
- traversal mediante referencias de archivo;
- cross-tenant access;
- fijación de sesión;
- robo de Session ID;
- webhook falsificado.

Controles:

- autenticación de canal;
- firma;
- expiración;
- nonce cuando corresponda;
- idempotencia;
- rate limit;
- validación del servidor;
- separación de tenant;
- minimización;
- logs seguros;
- cifrado en tránsito.

## 20. Observabilidad

Métricas:

- inputs_received_total;
- inputs_accepted_total;
- inputs_rejected_total;
- duplicate_inputs_total;
- stale_interactions_total;
- signature_failures_total;
- replay_attempts_total;
- rate_limit_rejections_total;
- input_size_bytes;
- reception_duration_seconds.

Dimensiones permitidas:

- channel;
- input_type;
- tenant_tier;
- result;
- error_code;
- schema_version.

Evitar:

- Session ID;
- User ID;
- External Message ID;
- texto del Cliente.

Trazas:

Spans recomendados:

- receive_input;
- validate_envelope;
- verify_channel;
- validate_session;
- check_rate_limit;
- check_idempotency;
- persist_input;
- dispatch_to_normalization.

## 21. Auditoría

Registrar cuando corresponda:

- Input ID;
- actor;
- canal;
- tenant;
- Session ID;
- tipo;
- resultado;
- error;
- firma válida o inválida;
- vigencia;
- decisión de rate limit;
- idempotencia;
- timestamp.

El registro no debe copiar datos sensibles completos.

## 22. Pseudocódigo funcional

```text
function receive_input(raw_input, channel_context):

    request_id = get_or_create_request_id(channel_context)
    correlation_id = get_or_create_correlation_id(channel_context)

    envelope = parse_envelope(raw_input)

    validate_schema_version(envelope)
    validate_input_type(envelope)
    validate_tenant(envelope, channel_context)
    validate_channel(channel_context)
    verify_signature_if_required(raw_input, channel_context)
    verify_replay_protection(envelope, channel_context)
    apply_rate_limit(envelope, channel_context)
    validate_session_if_required(envelope)
    validate_size(envelope)
    validate_expiration(envelope)

    idempotency_key = build_idempotency_key(envelope)
    payload_hash = hash_canonical_payload(envelope.payload)

    previous = reserve_or_get_idempotency(
        idempotency_key,
        payload_hash
    )

    if previous.status == COMPLETED:
        return previous.result

    if previous.status == PROCESSING:
        return processing_ack(previous.input_id)

    if previous.payload_hash != payload_hash:
        reject(IDEMPOTENCY_KEY_CONFLICT)

    input_id = new_input_id()
    turn_id = new_turn_id_if_required()

    canonical_input = build_canonical_input(
        input_id,
        turn_id,
        request_id,
        correlation_id,
        envelope,
        channel_context
    )

    persist_input_and_event_atomically(
        canonical_input,
        MessageReceived
    )

    dispatch_to_normalization(canonical_input)

    return accepted_ack(input_id, request_id)
```

## 23. Casos límite

- Mensaje llega dos veces con milisegundos de diferencia.
- Canal reordena callbacks.
- Cliente pulsa el mismo botón varias veces.
- Menú sigue visible, pero el carrito cambió.
- Session ID pertenece a otro tenant.
- Timestamp del canal está en el futuro.
- Mensaje contiene sólo espacios invisibles.
- Texto válido supera el límite después de normalización.
- Firma válida con cuerpo diferente al esperado.
- Webhook llega después de expirar.
- Resultado anterior fue UNKNOWN.
- El almacenamiento idempotente está temporalmente inaccesible.
- El canal no proporciona External Message ID.
- Dos workers intentan reservar la misma entrada.
- El ACK falla después de persistir.
- El Cliente reintenta porque no recibió ACK.
- El mensaje llega durante control humano.
- El mensaje llega después de cerrar la sesión.
- Callback contiene un precio manipulado.
- Archivo declara un MIME distinto del real.

## 24. Criterios de aceptación

AC-RECV-001

Todo mensaje aceptado posee Input ID.

AC-RECV-002

Todo turno conversacional posee Turn ID.

AC-RECV-003

Toda entrada conserva External Message ID cuando existe.

AC-RECV-004

Un reintento no genera un segundo procesamiento.

AC-RECV-005

La misma Idempotency Key con otro payload se rechaza.

AC-RECV-006

Una acción expirada no llega al dominio.

AC-RECV-007

Una firma inválida se rechaza.

AC-RECV-008

La recepción no interpreta intención.

AC-RECV-009

La recepción no utiliza precios del Cliente como autoridad.

AC-RECV-010

Una sesión de otro tenant no puede utilizarse.

AC-RECV-011

Los mensajes vacíos no llegan a la LLM.

AC-RECV-012

Los rechazos quedan trazados.

AC-RECV-013

El ACK puede repetirse de manera segura.

AC-RECV-014

La caída posterior al commit no pierde la entrada.

AC-RECV-015

La entrada aceptada puede reconstruirse para auditoría respetando la
política de datos.

## 25. Plan mínimo de pruebas

TEST-RECV-001

Aceptar mensaje textual válido.

TEST-RECV-002

Rechazar mensaje vacío.

TEST-RECV-003

Rechazar mensaje excesivo.

TEST-RECV-004

Detectar duplicado completado.

TEST-RECV-005

Detectar duplicado en procesamiento.

TEST-RECV-006

Rechazar conflicto de Idempotency Key.

TEST-RECV-007

Rechazar firma inválida.

TEST-RECV-008

Rechazar replay.

TEST-RECV-009

Rechazar Session ID de otro tenant.

TEST-RECV-010

Rechazar menú expirado.

TEST-RECV-011

Rechazar versión antigua de menú.

TEST-RECV-012

Aplicar rate limit.

TEST-RECV-013

Permitir recuperación tras fallo de ACK.

TEST-RECV-014

Verificar que precio enviado no se propaga como autoridad.

TEST-RECV-015

Verificar que un callback válido pero obsoleto no ejecuta negocio.

TEST-RECV-016

Verificar concurrencia de dos workers.

TEST-RECV-017

Verificar retención y enmascaramiento.

TEST-RECV-018

Verificar VoiceTranscript final.

TEST-RECV-019

Rechazar transcripción no final cuando el flujo exige final.

TEST-RECV-020

Verificar métricas sin alta cardinalidad.

## 26. Checklist

[ ] Existe Input ID.
[ ] Existe Request ID.
[ ] Existe Correlation ID.
[ ] Existe Tenant ID.
[ ] Existe External Message ID cuando aplica.
[ ] Se valida sesión.
[ ] Se valida firma.
[ ] Se valida expiración.
[ ] Se valida menú y versión.
[ ] Se aplica rate limit.
[ ] Se aplica idempotencia.
[ ] Se calcula hash canónico.
[ ] Se persiste la entrada.
[ ] Se genera evento.
[ ] No se ejecuta negocio.
[ ] No se interpreta intención.
[ ] No se confía en roles del cliente.
[ ] No se confía en precios del cliente.
[ ] Se protege información sensible.
[ ] Existen métricas.
[ ] Existen pruebas de concurrencia.

======================================================================
FIN DEL DOCUMENTO
======================================================================
