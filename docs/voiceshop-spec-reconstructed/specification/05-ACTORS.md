======================================================================
Documento    : 05-ACTORS.md
Versión      : 1.0
Estado       : DRAFT
Fecha        : 2026-07-16
Autor        : VoiceShop Framework
Clasificación: DOMAIN
Estabilidad  : BUSINESS

Dependencias:
- 00-PROJECT-MANIFEST.md
- 01-VISION.md
- 02-GLOSSARY.md
- 03-REQUIREMENTS.md
- 04-BUSINESS-RULES.md

Documentos dependientes:
- 06-USE-CASES.md
- 07-FUNCTIONAL-SPECIFICATION.md
- 08-STATE-MACHINES.md
- 09-SEQUENCE-DIAGRAMS.md
- 10-API-CONTRACT.md
- 11-SECURITY.md
================

# ACTORS

---

1. Objetivo

---

Este documento identifica y define todos los actores que interactúan con
VoiceShop.

Un actor representa una persona, rol, sistema externo o componente
autónomo que intercambia información con el sistema.

Este documento especifica:

* identidad del actor;
* responsabilidades;
* capacidades;
* permisos;
* prohibiciones;
* datos que puede proporcionar;
* datos que puede recibir;
* relaciones con otros actores;
* condiciones de autenticación;
* condiciones de derivación;
* nivel de confianza.

Este documento NO define:

* implementación técnica;
* endpoints;
* esquemas de base de datos;
* prompts específicos;
* algoritmos internos;
* interfaces visuales;
* proveedores concretos.

---

2. Reglas generales

---

RULE-ACT-001

Todo actor debe poseer un identificador único.

Formato:

ACT-XXX

Ejemplo:

ACT-001

---

RULE-ACT-002

Todo caso de uso debe tener al menos un actor iniciador.

---

RULE-ACT-003

Un actor no puede ejecutar una acción que no esté expresamente autorizada.

---

RULE-ACT-004

La ausencia de una prohibición explícita no constituye autorización.

---

RULE-ACT-005

Todo actor externo debe interactuar mediante un contrato definido.

---

RULE-ACT-006

Todo actor humano debe poseer un rol verificable antes de ejecutar
operaciones protegidas.

---

RULE-ACT-007

La LLM no será considerada una fuente de verdad.

---

RULE-ACT-008

La LLM no será considerada un actor comercial autorizado.

---

RULE-ACT-009

Los permisos se asignan al rol y no al canal utilizado.

Un operador conserva sus permisos autorizados independientemente de si
utiliza una interfaz web, móvil o de línea de comandos.

---

RULE-ACT-010

Las acciones sensibles deben registrar:

* actor;
* rol;
* fecha y hora;
* sesión;
* operación;
* datos afectados;
* resultado;
* motivo, cuando corresponda.

---

3. Clasificación de actores

---

Los actores se clasifican en cinco categorías.

3.1. ACTOR HUMANO

Persona que interactúa directamente con el sistema.

3.2. ACTOR DE CANAL

Sistema que transporta mensajes entre una persona y VoiceShop.

3.3. ACTOR DE NEGOCIO EXTERNO

Sistema externo que posee información comercial oficial.

3.4. ACTOR DE INTELIGENCIA ARTIFICIAL

Proveedor o modelo utilizado para interpretar o generar contenido.

3.5. ACTOR OPERACIONAL

Sistema utilizado para monitoreo, seguridad, auditoría o soporte.

---

4. Niveles de confianza

---

TRUST-0 — NO CONFIABLE

Entrada pública o no autenticada.

Ejemplos:

* visitante anónimo;
* mensaje externo;
* contenido producido por una LLM;
* datos no validados.

TRUST-1 — IDENTIFICADO

El actor posee un identificador, pero no ha sido autenticado plenamente.

TRUST-2 — AUTENTICADO

La identidad del actor fue verificada.

TRUST-3 — AUTORIZADO

El actor autenticado posee permiso para la operación solicitada.

TRUST-4 — PRIVILEGIADO

Actor con permisos administrativos o de supervisión.

TRUST-5 — SISTEMA INTERNO

Componente interno autenticado mediante identidad de servicio.

Regla:

El nivel de confianza se evalúa para cada operación.

Un actor autenticado no está automáticamente autorizado para todas las
acciones.

---

5. Matriz general de actores

---

ACT-001

Nombre:
Cliente

Categoría:
Actor humano

Nivel de confianza inicial:
TRUST-0 o TRUST-1

Propósito:
Consultar información y solicitar productos o servicios.

---

ACT-002

Nombre:
Operador

Categoría:
Actor humano

Nivel de confianza requerido:
TRUST-3

Propósito:
Atender conversaciones derivadas y gestionar operaciones permitidas.

---

ACT-003

Nombre:
Supervisor

Categoría:
Actor humano

Nivel de confianza requerido:
TRUST-4

Propósito:
Supervisar operaciones, resolver excepciones y aprobar acciones
restringidas.

---

ACT-004

Nombre:
Administrador

Categoría:
Actor humano

Nivel de confianza requerido:
TRUST-4

Propósito:
Configurar el sistema, usuarios, permisos e integraciones.

---

ACT-005

Nombre:
Propietario del Negocio

Categoría:
Actor humano

Nivel de confianza requerido:
TRUST-4

Propósito:
Definir políticas comerciales y consultar resultados del negocio.

---

ACT-006

Nombre:
Canal Web

Categoría:
Actor de canal

Nivel de confianza:
TRUST-1 o TRUST-5, según autenticación

Propósito:
Transportar texto, audio y eventos de interfaz.

---

ACT-007

Nombre:
Canal de Mensajería

Categoría:
Actor de canal

Nivel de confianza:
TRUST-1 o TRUST-5

Ejemplos:
Telegram, WhatsApp u otro canal equivalente.

Propósito:
Transportar mensajes y acciones del usuario.

---

ACT-008

Nombre:
Proveedor de Voz

Categoría:
Actor de inteligencia artificial o servicio externo

Nivel de confianza:
TRUST-5 para la conexión; TRUST-0 para el contenido generado.

Propósito:
Procesar audio en tiempo real, transcribir o sintetizar voz.

---

ACT-009

Nombre:
Proveedor LLM

Categoría:
Actor de inteligencia artificial

Nivel de confianza:
TRUST-5 para la conexión; TRUST-0 para sus respuestas.

Propósito:
Interpretar lenguaje, extraer intención y generar lenguaje natural.

---

ACT-010

Nombre:
Sistema de Inventario

Categoría:
Actor de negocio externo

Nivel de confianza:
TRUST-5

Propósito:
Proporcionar disponibilidad oficial de productos.

---

ACT-011

Nombre:
Catálogo de Productos

Categoría:
Actor de negocio externo

Nivel de confianza:
TRUST-5

Propósito:
Proporcionar información oficial de productos y precios.

---

ACT-012

Nombre:
Sistema de Pedidos

Categoría:
Actor de negocio externo

Nivel de confianza:
TRUST-5

Propósito:
Registrar y consultar pedidos.

---

ACT-013

Nombre:
Pasarela de Pago

Categoría:
Actor de negocio externo

Nivel de confianza:
TRUST-5

Propósito:
Procesar pagos mediante un proveedor autorizado.

---

ACT-014

Nombre:
Servicio de Entrega

Categoría:
Actor de negocio externo

Nivel de confianza:
TRUST-5

Propósito:
Cotizar, asignar y consultar entregas.

---

ACT-015

Nombre:
Sistema de Identidad

Categoría:
Actor operacional

Nivel de confianza:
TRUST-5

Propósito:
Autenticar usuarios y emitir credenciales verificables.

---

ACT-016

Nombre:
Sistema de Auditoría

Categoría:
Actor operacional

Nivel de confianza:
TRUST-5

Propósito:
Conservar registros inmutables de operaciones.

---

ACT-017

Nombre:
Sistema de Observabilidad

Categoría:
Actor operacional

Nivel de confianza:
TRUST-5

Propósito:
Recibir métricas, logs, trazas y alertas.

---

ACT-018

Nombre:
Agente de Codificación

Categoría:
Actor de inteligencia artificial

Nivel de confianza:
TRUST-0 por defecto

Propósito:
Proponer o implementar cambios de software bajo autorización humana.

---

ACT-019

Nombre:
Agente de QA

Categoría:
Actor de inteligencia artificial

Nivel de confianza:
TRUST-0 por defecto

Propósito:
Analizar requisitos, diseñar pruebas y reportar defectos.

---

ACT-020

Nombre:
Servicio Programado

Categoría:
Actor operacional

Nivel de confianza:
TRUST-5

Propósito:
Iniciar tareas automáticas autorizadas.

---

6. ACT-001 — Cliente

---

6.1. Definición

Persona que consulta el catálogo, solicita información, administra un
carrito o inicia un pedido.

6.2. Responsabilidades

* proporcionar información verdadera;
* revisar productos y cantidades;
* confirmar el contenido del pedido;
* entregar datos requeridos para continuar;
* aceptar o rechazar condiciones comerciales;
* solicitar ayuda humana cuando la necesite.

6.3. Capacidades

El Cliente puede:

* iniciar una conversación;
* enviar texto;
* enviar voz;
* consultar productos;
* consultar disponibilidad;
* consultar promociones;
* consultar precios;
* solicitar recomendaciones;
* crear un carrito;
* agregar productos;
* modificar cantidades;
* retirar productos;
* solicitar el total;
* confirmar intención de compra;
* cancelar una operación no finalizada;
* pedir atención humana;
* consultar el estado de un pedido autorizado.

6.4. Prohibiciones

El Cliente no puede:

* modificar precios;
* alterar promociones;
* aprobar descuentos excepcionales;
* modificar inventario;
* acceder a información de otros clientes;
* modificar pedidos confirmados mediante una operación no autorizada;
* ejecutar funciones administrativas;
* acceder a logs internos;
* cambiar permisos;
* ejecutar código.

6.5. Datos de entrada

El Cliente puede proporcionar:

* consulta;
* nombre;
* identificador de contacto;
* producto solicitado;
* cantidad;
* preferencias;
* dirección;
* instrucciones de entrega;
* método de pago preferido;
* confirmación o rechazo.

6.6. Datos de salida

El Cliente puede recibir:

* respuesta conversacional;
* descripción de productos;
* precio oficial;
* disponibilidad;
* promociones vigentes;
* contenido del carrito;
* total calculado;
* solicitud de aclaración;
* confirmación de pedido;
* estado de atención;
* aviso de derivación humana;
* errores comprensibles.

6.7. Condiciones de derivación

La conversación debe derivarse a un Operador cuando:

* el Cliente lo solicite;
* la intención no pueda resolverse con suficiente confianza;
* exista una excepción comercial;
* exista una disputa;
* el sistema detecte riesgo;
* falten datos después del número máximo de aclaraciones;
* el proveedor IA falle repetidamente;
* una operación requiera autorización humana;
* se detecte contenido que no pueda procesarse automáticamente.

---

7. ACT-002 — Operador

---

7.1. Definición

Empleado autorizado para atender conversaciones derivadas y ejecutar
operaciones comerciales ordinarias.

7.2. Responsabilidades

* revisar el contexto antes de responder;
* identificarse mediante el sistema;
* respetar las políticas comerciales;
* registrar decisiones;
* no exponer información sensible;
* escalar excepciones al Supervisor;
* cerrar correctamente la atención.

7.3. Capacidades

El Operador puede:

* recibir una conversación derivada;
* leer el historial necesario;
* responder al Cliente;
* completar datos faltantes;
* consultar catálogo;
* consultar inventario;
* preparar un pedido;
* cancelar operaciones permitidas;
* agregar notas internas;
* transferir la atención;
* finalizar la intervención humana.

7.4. Prohibiciones

El Operador no puede:

* modificar permisos;
* eliminar auditorías;
* alterar historiales;
* aprobar excepciones reservadas al Supervisor;
* modificar configuraciones críticas;
* acceder a conversaciones sin justificación;
* exportar datos sin autorización;
* ejecutar cambios de infraestructura.

7.5. Requisito de autenticación

Todas las operaciones del Operador requieren:

* identidad autenticada;
* rol activo;
* sesión de trabajo válida;
* autorización específica;
* registro de auditoría.

---

8. ACT-003 — Supervisor

---

8.1. Definición

Persona responsable de resolver excepciones, revisar operaciones y
aprobar acciones restringidas.

8.2. Capacidades

El Supervisor puede:

* realizar todas las acciones permitidas al Operador;
* aprobar descuentos excepcionales dentro de límites definidos;
* autorizar cancelaciones especiales;
* resolver disputas;
* reasignar conversaciones;
* revisar auditorías autorizadas;
* bloquear temporalmente operaciones;
* aprobar acciones de riesgo moderado;
* revisar indicadores operativos.

8.3. Prohibiciones

El Supervisor no puede:

* eliminar evidencia;
* modificar registros históricos;
* acceder sin motivo comercial;
* compartir secretos;
* alterar directamente el código;
* omitir controles de seguridad;
* aprobar operaciones fuera de sus límites configurados.

8.4. Separación de funciones

Una operación podrá requerir que:

* el Operador solicite la excepción;
* el Supervisor la apruebe;
* el sistema registre ambas identidades.

Cuando esta separación sea obligatoria, una misma persona no podrá cumplir
ambos roles dentro de la misma operación.

---

9. ACT-004 — Administrador

---

9.1. Definición

Persona autorizada para administrar la configuración operativa y técnica
de VoiceShop.

9.2. Capacidades

El Administrador puede:

* crear y desactivar usuarios;
* asignar roles permitidos;
* configurar canales;
* configurar proveedores;
* gestionar secretos mediante el sistema autorizado;
* modificar parámetros no comerciales;
* consultar estado de integraciones;
* activar o desactivar funcionalidades;
* consultar auditorías técnicas;
* iniciar procedimientos operacionales.

9.3. Prohibiciones

El Administrador no puede:

* revelar credenciales;
* introducir claves en código fuente;
* eliminar auditorías;
* modificar reglas de negocio sin aprobación;
* aprobar sus propias solicitudes cuando exista segregación de funciones;
* utilizar datos de clientes con fines no autorizados;
* desactivar controles sin dejar evidencia.

9.4. Regla de mínimo privilegio

El rol Administrador no implica acceso automático al contenido comercial
o personal de todas las conversaciones.

El acceso debe justificarse y registrarse.

---

10. ACT-005 — Propietario del Negocio

---

10.1. Definición

Persona responsable de las políticas, resultados y decisiones comerciales
del negocio.

10.2. Capacidades

Puede:

* definir políticas comerciales;
* aprobar nuevas reglas de negocio;
* revisar indicadores agregados;
* definir límites de descuento;
* aprobar categorías de automatización;
* decidir horarios de atención;
* definir condiciones de derivación;
* autorizar integraciones comerciales;
* aprobar cambios de alto impacto.

10.3. Límites

El Propietario del Negocio no debe:

* administrar infraestructura sin autorización técnica;
* manipular registros;
* acceder innecesariamente a datos personales;
* solicitar comportamientos contrarios a seguridad o legislación;
* utilizar la LLM como fuente oficial de decisiones comerciales.

---

11. ACT-006 y ACT-007 — Canales

---

11.1. Definición

Los canales transportan mensajes y eventos.

No ejecutan reglas de negocio.

11.2. Responsabilidades

Un Canal debe:

* identificar el origen;
* conservar el identificador externo;
* enviar eventos al sistema;
* recibir respuestas;
* respetar formatos;
* controlar reintentos;
* proporcionar metadatos necesarios;
* evitar duplicaciones cuando sea posible.

11.3. Prohibiciones

Un Canal no puede:

* calcular precios;
* aplicar promociones;
* modificar inventario;
* confirmar pedidos por sí solo;
* interpretar autorizaciones;
* almacenar secretos en el cliente;
* confiar en datos manipulables del navegador;
* convertir botones antiguos en acciones válidas sin verificación.

11.4. Regla de botones y menús

Toda acción interactiva deberá incluir un identificador verificable de:

* sesión;
* menú;
* versión;
* acción;
* expiración o vigencia.

Las acciones pertenecientes a menús expirados deben rechazarse.

---

12. ACT-008 — Proveedor de Voz

---

12.1. Definición

Servicio encargado de procesar audio, mantener una sesión de voz o
generar audio de respuesta.

12.2. Capacidades

Puede:

* recibir audio autorizado;
* detectar actividad de voz;
* transcribir audio;
* generar audio;
* transmitir eventos;
* interrumpir una respuesta cuando el Cliente habla;
* informar errores de sesión.

12.3. Prohibiciones

No puede:

* modificar reglas de negocio;
* decidir precios;
* confirmar pedidos sin validación;
* conservar datos indefinidamente sin autorización;
* recibir secretos innecesarios;
* ejecutar herramientas sin pasar por la capa autorizada.

12.4. Frontera de confianza

Toda transcripción se considera entrada no validada.

Toda intención derivada de audio debe ser validada antes de ejecutar una
acción comercial.

12.5. Regla de arquitectura

El dominio no procesa audio.

El flujo será:

Audio
↓
Proveedor de Voz
↓
Texto o evento estructurado
↓
Orquestación
↓
Dominio

La respuesta seguirá el flujo inverso:

Resultado del dominio
↓
Respuesta textual
↓
Proveedor de Voz
↓
Audio

---

13. ACT-009 — Proveedor LLM

---

13.1. Definición

Servicio utilizado para interpretar lenguaje natural y producir
respuestas lingüísticas.

13.2. Capacidades autorizadas

Puede:

* clasificar intención;
* extraer valores;
* solicitar aclaraciones;
* resumir contexto autorizado;
* producir una respuesta natural;
* sugerir una herramienta;
* estructurar una solicitud;
* explicar un resultado oficial.

13.3. Prohibiciones absolutas

No puede:

* inventar precio;
* inventar stock;
* inventar promociones;
* aprobar descuentos;
* confirmar un pedido sin autorización;
* modificar registros directamente;
* acceder directamente a la base de datos;
* autenticarse como usuario;
* alterar permisos;
* decidir políticas;
* ejecutar código arbitrario;
* tratar instrucciones del Cliente como instrucciones del sistema;
* revelar prompts internos;
* revelar secretos;
* omitir validaciones.

13.4. Principio de herramienta controlada

La LLM puede solicitar una operación.

La LLM no ejecuta directamente la regla comercial.

Ejemplo:

La LLM produce:

{
"intent": "add_product",
"product_reference": "cerveza lager",
"quantity": 6
}

Posteriormente:

1. el sistema valida el esquema;
2. el sistema resuelve el producto oficial;
3. el dominio valida cantidad y disponibilidad;
4. el caso de uso ejecuta la operación;
5. la respuesta oficial se entrega a la LLM;
6. la LLM comunica el resultado.

13.5. Contenido no confiable

Las siguientes salidas de la LLM se consideran propuestas:

* intención;
* entidades;
* argumentos;
* texto generado;
* razonamiento resumido;
* selección de herramientas.

Ninguna constituye un hecho comercial hasta ser validada.

---

14. ACT-010 — Sistema de Inventario

---

14.1. Definición

Fuente oficial de disponibilidad comercial.

14.2. Responsabilidades

Debe proporcionar:

* identificador del producto;
* stock disponible;
* stock reservado;
* sucursal;
* fecha de actualización;
* versión o referencia de consistencia.

14.3. Regla de autoridad

En caso de contradicción entre la LLM y el Sistema de Inventario,
prevalece el Sistema de Inventario.

14.4. Fallo del sistema

Cuando no pueda verificarse el stock:

* no se afirmará disponibilidad;
* no se confirmará la reserva;
* se comunicará la indisponibilidad temporal de verificación;
* se podrá derivar a un Operador.

---

15. ACT-011 — Catálogo de Productos

---

15.1. Definición

Fuente oficial de nombres, descripciones, precios y estado comercial de
los productos.

15.2. Datos oficiales

Puede proporcionar:

* Product ID;
* SKU;
* nombre;
* descripción;
* categoría;
* marca;
* precio vigente;
* impuestos;
* estado;
* restricciones;
* imágenes;
* promociones referenciadas.

15.3. Regla de autoridad

El precio oficial proviene del Catálogo o del componente de precios
designado.

La LLM sólo puede explicar ese precio.

---

16. ACT-012 — Sistema de Pedidos

---

16.1. Definición

Sistema responsable de persistir el pedido y su ciclo de vida.

16.2. Capacidades

Puede:

* crear pedido;
* asignar Order ID;
* cambiar estados válidos;
* consultar pedido;
* registrar eventos;
* aplicar idempotencia;
* rechazar transiciones inválidas.

16.3. Prohibiciones

No debe:

* aceptar pedidos sin validación;
* aceptar cantidades inválidas;
* omitir trazabilidad;
* ejecutar dos veces la misma solicitud idempotente;
* permitir transiciones prohibidas.

---

17. ACT-013 — Pasarela de Pago

---

17.1. Definición

Proveedor autorizado para procesar una transacción económica.

17.2. Regla de alcance

VoiceShop no debe almacenar datos completos de instrumentos de pago salvo
que exista una necesidad explícita, cumplimiento normativo y diseño
aprobado.

17.3. Capacidades

Puede:

* crear una intención de pago;
* entregar instrucciones;
* informar estado;
* confirmar resultado;
* rechazar una transacción;
* emitir una referencia.

17.4. Prohibiciones del asistente

La LLM no puede:

* declarar un pago exitoso sin confirmación oficial;
* pedir datos sensibles innecesarios;
* recibir números completos de tarjetas por voz o chat;
* modificar importes;
* reintentar cobros sin autorización.

---

18. ACT-014 — Servicio de Entrega

---

18.1. Definición

Sistema externo que gestiona cotización, asignación y seguimiento de la
entrega.

18.2. Capacidades

Puede:

* validar cobertura;
* cotizar entrega;
* proporcionar ventana estimada;
* aceptar una solicitud;
* entregar identificador de seguimiento;
* informar estado.

18.3. Regla de incertidumbre

Una estimación de entrega debe identificarse como estimación hasta que el
servicio confirme una ventana oficial.

---

19. ACT-015 — Sistema de Identidad

---

19.1. Definición

Fuente oficial para autenticación y emisión de identidad verificable.

19.2. Responsabilidades

Debe:

* autenticar;
* emitir credenciales;
* validar vigencia;
* revocar acceso;
* informar rol;
* soportar expiración;
* registrar eventos relevantes.

19.3. Regla de seguridad

VoiceShop no confiará en roles enviados únicamente desde una interfaz de
cliente.

Los permisos deben verificarse del lado del servidor.

---

20. ACT-016 — Sistema de Auditoría

---

20.1. Definición

Componente responsable de conservar evidencia de acciones relevantes.

20.2. Propiedades

Los registros deben ser:

* ordenables;
* identificables;
* atribuibles;
* protegidos;
* resistentes a alteraciones;
* consultables bajo autorización;
* retenidos según política.

20.3. Prohibiciones

Ningún actor puede eliminar o modificar evidencia para ocultar una
operación.

Las correcciones se registran mediante nuevos eventos.

---

21. ACT-017 — Sistema de Observabilidad

---

21.1. Definición

Componente que recibe información operativa para detectar problemas.

21.2. Capacidades

Puede recibir:

* métricas;
* logs;
* trazas;
* errores;
* eventos de seguridad;
* latencias;
* disponibilidad;
* consumo;
* alertas.

21.3. Restricción de privacidad

Los registros no deben incluir información sensible completa cuando no
sea necesaria.

Deben aplicarse:

* minimización;
* enmascaramiento;
* clasificación;
* control de acceso;
* retención limitada.

---

22. ACT-018 — Agente de Codificación

---

22.1. Definición

LLM o agente utilizado para proponer, modificar o revisar código.

22.2. Capacidades

Puede:

* analizar requisitos;
* proponer diseño;
* generar código;
* ejecutar pruebas autorizadas;
* corregir defectos;
* actualizar documentación;
* preparar cambios revisables.

22.3. Prohibiciones

No puede:

* cambiar contratos sin autorización;
* modificar producción directamente;
* revelar secretos;
* eliminar pruebas para lograr una aprobación;
* ignorar errores;
* introducir dependencias sin justificar;
* modificar reglas de negocio por iniciativa propia;
* marcar su propia salida como aprobada;
* asumir permisos no concedidos.

22.4. Nivel de confianza

Todo cambio generado por un Agente de Codificación requiere revisión o
controles automáticos equivalentes antes de llegar a producción.

---

23. ACT-019 — Agente de QA

---

23.1. Definición

LLM o agente encargado de buscar errores y verificar cumplimiento.

23.2. Capacidades

Puede:

* construir casos de prueba;
* revisar trazabilidad;
* ejecutar pruebas autorizadas;
* comparar resultado esperado y real;
* generar evidencia;
* realizar análisis adversarial;
* reportar riesgos;
* recomendar bloqueo de release.

23.3. Prohibiciones

No puede:

* modificar los criterios para aprobar;
* ocultar defectos;
* aprobar requisitos no probados;
* alterar evidencia;
* asumir que una prueba aprobada demuestra ausencia de fallos;
* reemplazar la aprobación humana cuando ésta sea obligatoria.

23.4. Independencia

Cuando el riesgo lo requiera, el agente que genera código no debe ser la
única instancia que evalúa ese código.

---

24. ACT-020 — Servicio Programado

---

24.1. Definición

Proceso autorizado que inicia tareas sin intervención humana inmediata.

24.2. Ejemplos

* cierre de sesiones expiradas;
* liberación de reservas;
* sincronización de catálogo;
* generación de informes;
* limpieza segura;
* verificación de integraciones;
* alertas operativas.

24.3. Reglas

Toda tarea programada debe poseer:

* Task ID;
* propietario;
* frecuencia;
* límites;
* idempotencia;
* timeout;
* política de reintento;
* registro;
* alerta de fallo.

24.4. Prohibiciones

No puede:

* ejecutar operaciones comerciales irreversibles sin autorización;
* reintentar indefinidamente;
* actuar sin límite temporal;
* ocultar fallos;
* utilizar una identidad humana compartida.

---

25. Relaciones entre actores

---

25.1. Flujo de texto

Cliente
↓
Canal
↓
VoiceShop
↓
Proveedor LLM
↓
Solicitud estructurada
↓
Caso de Uso
↓
Sistema comercial correspondiente
↓
Resultado oficial
↓
VoiceShop
↓
Proveedor LLM
↓
Canal
↓
Cliente

---

25.2. Flujo de voz

Cliente
↓
Canal Web o Aplicación
↓
Proveedor de Voz
↓
Transcripción o evento
↓
VoiceShop
↓
Caso de Uso
↓
Resultado oficial
↓
Proveedor de Voz
↓
Audio
↓
Cliente

---

25.3. Flujo de derivación humana

Cliente
↓
VoiceShop
↓
Solicitud o condición de derivación
↓
Cola de Atención
↓
Operador
↓
Cliente

Cuando exista una excepción:

Operador
↓
Solicitud de aprobación
↓
Supervisor
↓
Decisión registrada
↓
Operador
↓
Cliente

---

26. Matriz resumida de permisos

---

Leyenda:

C = Consultar
E = Ejecutar
A = Aprobar
M = Administrar
N = No permitido

## Actor                    Catálogo  Carrito  Pedido  Precio  Stock  Roles

Cliente                  C         E         E*      C       C      N
Operador                 C         E         E       C       C      N
Supervisor               C         E         E/A     C/A**   C      N
Administrador            C***      N***      N***    N***    N***   M
Propietario del Negocio  C         N         N       A****   C      N
Proveedor LLM            C*****    N         N       N       N      N
Proveedor de Voz         N         N         N       N       N      N
Sistema Programado       C         E******   E****** N       C      N

Notas:

* Sólo mediante casos de uso autorizados y validaciones.

** Únicamente dentro de límites comerciales definidos.

*** Acceso técnico no implica acceso comercial general.

**** Aprueba políticas, no altera operaciones individuales directamente.

***** Recibe únicamente la información necesaria para redactar una
respuesta; no es la fuente oficial.

****** Sólo tareas expresamente configuradas e idempotentes.

---

27. Matriz de datos

---

ACT-001 Cliente

Puede ver:

* sus datos;
* su conversación;
* su carrito;
* sus pedidos autorizados;
* catálogo público.

No puede ver:

* datos de otros clientes;
* secretos;
* logs internos;
* prompts internos;
* auditorías completas.

---

ACT-002 Operador

Puede ver:

* conversaciones asignadas;
* datos necesarios para la atención;
* pedidos relacionados;
* notas operativas permitidas.

No puede ver:

* secretos;
* datos ajenos a su función;
* información masiva sin autorización.

---

ACT-003 Supervisor

Puede ver:

* operaciones bajo supervisión;
* auditoría autorizada;
* métricas operativas;
* evidencia de excepciones.

---

ACT-004 Administrador

Puede ver:

* configuración;
* estado técnico;
* usuarios y roles;
* auditoría técnica.

El acceso a contenido personal requiere justificación adicional.

---

ACT-009 Proveedor LLM

Sólo debe recibir:

* fragmento mínimo de conversación;
* instrucciones vigentes;
* herramientas permitidas;
* información comercial necesaria;
* identificadores seudonimizados cuando sea posible.

No debe recibir:

* secretos;
* credenciales;
* datos no necesarios;
* auditoría completa;
* información de otros clientes.

---

28. Conflictos de autoridad

---

AUTH-001

Para inventario prevalece:

Sistema de Inventario.

---

AUTH-002

Para precios prevalece:

Catálogo o Motor de Precios oficial.

---

AUTH-003

Para promociones prevalece:

Componente oficial de Promociones.

---

AUTH-004

Para identidad prevalece:

Sistema de Identidad.

---

AUTH-005

Para estado de pago prevalece:

Pasarela de Pago.

---

AUTH-006

Para estado de pedido prevalece:

Sistema de Pedidos.

---

AUTH-007

Para reglas comerciales prevalece:

04-BUSINESS-RULES.md y su configuración aprobada.

---

AUTH-008

Para permisos prevalece:

Política de autorización del servidor.

---

AUTH-009

Para lenguaje de respuesta puede colaborar:

Proveedor LLM.

El Proveedor LLM no prevalece sobre ninguna fuente oficial de negocio.

---

29. Actores no autorizados

---

Se consideran actores no autorizados:

* bots desconocidos;
* scripts externos;
* usuarios sin autenticación para acciones protegidas;
* tokens vencidos;
* servicios sin identidad válida;
* menús o botones expirados;
* solicitudes con firma inválida;
* LLM intentando exceder sus herramientas;
* agentes de desarrollo sin permiso de escritura;
* procesos programados fuera de su alcance.

Toda solicitud de un actor no autorizado debe:

1. rechazarse;
2. registrarse;
3. devolver un error seguro;
4. evitar exposición de detalles internos;
5. generar alerta cuando corresponda.

---

30. Invariantes de actores

---

INV-ACT-001

Toda acción protegida posee un actor identificado.

---

INV-ACT-002

Toda acción sensible posee un actor autenticado y autorizado.

---

INV-ACT-003

Toda aprobación posee un aprobador identificable.

---

INV-ACT-004

La LLM nunca se representa como Cliente, Operador, Supervisor,
Administrador o Propietario del Negocio.

---

INV-ACT-005

Un Canal nunca se representa como fuente oficial de datos comerciales.

---

INV-ACT-006

Una identidad de servicio nunca se comparte entre componentes con
responsabilidades distintas cuando ello impida la trazabilidad.

---

INV-ACT-007

Ningún actor puede otorgarse permisos a sí mismo.

---

INV-ACT-008

Una sesión expirada no conserva autorización operativa.

---

INV-ACT-009

Una derivación humana no elimina el historial previo de la automatización.

---

INV-ACT-010

El regreso desde atención humana hacia automatización debe registrarse.

---

31. Casos de abuso considerados

---

ABUSE-ACT-001

Un Cliente intenta modificar el precio desde el navegador.

Respuesta:

* ignorar el precio enviado;
* recuperar el precio oficial;
* registrar el intento cuando corresponda.

---

ABUSE-ACT-002

Un mensaje intenta ordenar a la LLM que ignore las reglas internas.

Respuesta:

* tratar el mensaje como contenido del Cliente;
* no modificar las instrucciones del sistema;
* no ampliar permisos;
* registrar señal de prompt injection si corresponde.

---

ABUSE-ACT-003

Un Operador intenta acceder a conversaciones no asignadas.

Respuesta:

* verificar autorización;
* rechazar acceso;
* registrar evento;
* alertar según política.

---

ABUSE-ACT-004

Un botón antiguo intenta agregar un producto.

Respuesta:

* validar Session ID, Menu ID y versión;
* rechazar la acción expirada;
* ofrecer generar un menú vigente.

---

ABUSE-ACT-005

Un Agente de Codificación intenta modificar producción.

Respuesta:

* negar acceso;
* exigir flujo de revisión;
* registrar intento.

---

ABUSE-ACT-006

Un proveedor externo devuelve información contradictoria.

Respuesta:

* identificar la fuente oficial;
* no mezclar datos incompatibles;
* usar degradación segura;
* registrar la inconsistencia.

---

32. Estados de un actor humano

---

Un actor humano puede estar en uno de los siguientes estados:

PENDING_VERIFICATION

Identidad pendiente de verificación.

ACTIVE

Identidad habilitada.

SUSPENDED

Acceso temporalmente suspendido.

BLOCKED

Acceso bloqueado.

DISABLED

Identidad desactivada.

EXPIRED

Credencial o relación expirada.

Estado inicial:

PENDING_VERIFICATION o ACTIVE, según el método de incorporación.

Transiciones permitidas:

PENDING_VERIFICATION → ACTIVE
PENDING_VERIFICATION → DISABLED

ACTIVE → SUSPENDED
ACTIVE → BLOCKED
ACTIVE → DISABLED
ACTIVE → EXPIRED

SUSPENDED → ACTIVE
SUSPENDED → BLOCKED
SUSPENDED → DISABLED

BLOCKED → ACTIVE
BLOCKED → DISABLED

EXPIRED → ACTIVE
EXPIRED → DISABLED

DISABLED es un estado terminal para esa identidad, salvo un procedimiento
formal de reactivación que genere nueva evidencia.

---

33. Responsabilidad frente a errores

---

El actor que inicia una operación no necesariamente es responsable del
error técnico.

Cada error debe registrar:

* actor iniciador;
* componente que falló;
* operación;
* dependencia afectada;
* datos de correlación;
* resultado;
* política aplicada.

Ejemplo:

El Cliente solicita agregar un producto.

El Sistema de Inventario no responde.

Actor iniciador:
Cliente.

Componente con fallo:
Sistema de Inventario.

Resultado:
Operación no confirmada.

Respuesta:
No fue posible verificar disponibilidad.

---

34. Criterios de aceptación

---

AC-ACT-001

Todos los actores poseen identificador único.

---

AC-ACT-002

Todos los actores poseen categoría.

---

AC-ACT-003

Todos los actores poseen capacidades y prohibiciones.

---

AC-ACT-004

Las operaciones sensibles tienen nivel de confianza requerido.

---

AC-ACT-005

La LLM no posee autoridad comercial.

---

AC-ACT-006

Las fuentes oficiales están identificadas.

---

AC-ACT-007

La derivación humana conserva trazabilidad.

---

AC-ACT-008

Los permisos pueden convertirse en pruebas automatizadas.

---

AC-ACT-009

Los actores externos poseen una frontera de confianza explícita.

---

AC-ACT-010

No existen actores implícitos en los casos de uso.

---

35. Checklist de revisión

---

[ ] Todos los actores poseen ID.

[ ] Todos los actores están definidos en el Glosario.

[ ] Todo actor pertenece a una categoría.

[ ] Todo actor posee nivel de confianza.

[ ] Todo actor posee capacidades.

[ ] Todo actor posee prohibiciones.

[ ] Todo actor posee datos de entrada y salida cuando corresponde.

[ ] Toda fuente oficial está identificada.

[ ] La LLM no tiene autoridad comercial.

[ ] Los canales no contienen reglas de negocio.

[ ] Los permisos se validan en el servidor.

[ ] Las operaciones sensibles generan auditoría.

[ ] La atención humana conserva el contexto.

[ ] Los menús expirados son rechazados.

[ ] Existe separación entre autenticación y autorización.

[ ] Existen reglas para actores no autorizados.

[ ] Los agentes de IA están sujetos a revisión.

[ ] Los servicios programados tienen identidad propia.

[ ] Los conflictos de autoridad están resueltos.

[ ] Los actores pueden mapearse a casos de uso y pruebas.

---

36. Historial de cambios

---

Versión 1.0
Fecha: 2026-07-16

* Creación inicial del documento.
* Definición de actores humanos.
* Definición de actores de canal.
* Definición de proveedores de IA y voz.
* Definición de sistemas comerciales externos.
* Definición de sistemas operacionales.
* Incorporación de agentes de codificación y QA.
* Definición de niveles de confianza.
* Definición de conflictos de autoridad.
* Definición de matrices de permisos y datos.
* Definición de casos de abuso.

======================================================================
FIN DEL DOCUMENTO
=================
