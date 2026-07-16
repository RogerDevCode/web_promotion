======================================================================
Documento    : 06-USE-CASES.md
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
- 05-ACTORS.md

Documentos dependientes:
- 07-FUNCTIONAL-SPECIFICATION.md
- 08-STATE-MACHINES.md
- 09-SEQUENCE-DIAGRAMS.md
- 10-API-CONTRACT.md
- 11-DOMAIN-MODEL.md
- 18-QA.md
- 19-TEST-PLAN.md
======================================================================

# USE CASES

---

1. Objetivo

---

Este documento define los casos de uso oficiales de VoiceShop.

Un caso de uso describe una interacción completa entre uno o más actores y el sistema para alcanzar un resultado observable.

Cada caso de uso debe indicar:

- actor iniciador;
- actores secundarios;
- objetivo;
- requisitos relacionados;
- reglas relacionadas;
- precondiciones;
- disparador;
- flujo principal;
- flujos alternativos;
- errores;
- postcondiciones;
- datos de entrada;
- datos de salida;
- auditoría;
- criterios de aceptación.

Este documento define comportamiento funcional.

No define:

- endpoints;
- clases;
- archivos;
- tablas;
- frameworks;
- proveedores específicos;
- prompts concretos;
- implementación de interfaz.

---

2. Convención de identificadores

---

Todo caso de uso utilizará el formato:

UC-XXX

Ejemplos:

UC-001 UC-002 UC-003

Los pasos del flujo principal utilizarán:

UC-XXX-M01 UC-XXX-M02

Los flujos alternativos utilizarán:

UC-XXX-A01 UC-XXX-A02

Los errores utilizarán:

UC-XXX-E01 UC-XXX-E02

Los criterios de aceptación utilizarán:

AC-UC-XXX-01 AC-UC-XXX-02

---

3. Estados de un caso de uso

---

PROPOSED

Caso de uso propuesto.

APPROVED

Caso de uso aprobado.

IMPLEMENTED

Caso de uso implementado.

VERIFIED

Caso de uso probado y verificado.

PRODUCTION

Caso de uso disponible en producción.

DEPRECATED

Caso de uso aún disponible, pero en retirada.

ARCHIVED

Caso de uso retirado.

---

4. Prioridad

---

P0

Necesario para que el producto funcione.

P1

Alta importancia comercial.

P2

Funcionalidad útil, pero no esencial para la primera versión.

P3

Mejora futura.

---

5. Plantilla obligatoria

---

Todo caso de uso debe seguir esta estructura:

Identificador

Nombre

Estado

Prioridad

Actor iniciador

Actores secundarios

Objetivo

Requisitos relacionados

Reglas relacionadas

Precondiciones

Disparador

Datos de entrada

Flujo principal

Flujos alternativos

Errores

Postcondiciones de éxito

Postcondiciones de fallo

Datos de salida

Auditoría

Seguridad

Idempotencia

Observabilidad

Criterios de aceptación

Pruebas relacionadas

---

6. Catálogo inicial de casos de uso

---

UC-001

Iniciar sesión conversacional.

UC-002

Procesar mensaje de texto.

UC-003

Iniciar conversación de voz.

UC-004

Procesar intervención de voz.

UC-005

Consultar productos.

UC-006

Consultar precio y disponibilidad.

UC-007

Consultar promociones.

UC-008

Crear carrito.

UC-009

Agregar producto al carrito.

UC-010

Modificar cantidad de producto.

UC-011

Eliminar producto del carrito.

UC-012

Consultar carrito y total.

UC-013

Crear pedido desde carrito.

UC-014

Confirmar pedido.

UC-015

Cancelar operación o pedido permitido.

UC-016

Consultar estado de pedido.

UC-017

Solicitar derivación humana.

UC-018

Tomar conversación derivada.

UC-019

Devolver conversación a automatización.

UC-020

Cerrar sesión.

UC-021

Gestionar mensaje duplicado.

UC-022

Rechazar acción de menú expirado.

UC-023

Recuperar sesión vigente.

UC-024

Gestionar fallo del proveedor IA.

UC-025

Gestionar fallo de inventario.

UC-026

Autenticar actor protegido.

UC-027

Autorizar operación protegida.

UC-028

Registrar evento de auditoría.

UC-029

Procesar tarea programada.

UC-030

Consultar métricas operativas autorizadas.

======================================================================
UC-001 — INICIAR SESIÓN CONVERSACIONAL
======================================================================

Identificador: UC-001

Nombre: Iniciar sesión conversacional.

Estado: APPROVED

Prioridad: P0

Actor iniciador: ACT-001 Cliente.

Actores secundarios: ACT-006 Canal Web. ACT-007 Canal de Mensajería. ACT-015 Sistema de Identidad, cuando corresponda. ACT-016 Sistema de Auditoría. ACT-017 Sistema de Observabilidad.

Objetivo:

Crear una sesión válida para recibir mensajes de texto o voz y mantener el contexto de la conversación.

Requisitos relacionados:

FR-001 FR-002 FR-003 FR-014

Reglas relacionadas:

BR-101 BR-102 BR-104 BR-201 BR-1002 BR-1004

Precondiciones:

- el canal se encuentra habilitado;
- la solicitud posee un origen identificable;
- el sistema está disponible para aceptar sesiones;
- no existe una sesión activa reutilizable o se ha decidido crear una nueva.

Disparador:

El Cliente abre la interfaz, envía el primer mensaje o activa la opción de voz.

Datos de entrada:

- Channel ID;
- External User ID, cuando exista;
- idioma;
- zona horaria;
- tipo de interacción;
- metadatos mínimos del canal;
- credencial, cuando corresponda;
- Request ID.

Flujo principal:

UC-001-M01

El Canal recibe la acción inicial del Cliente.

UC-001-M02

El Canal envía una solicitud de inicio de sesión.

UC-001-M03

El sistema valida el formato y el origen.

UC-001-M04

El sistema busca una sesión reutilizable.

UC-001-M05

Si no existe una sesión válida, crea un Session ID único.

UC-001-M06

El sistema asigna estado ACTIVE.

UC-001-M07

El sistema registra canal, fecha de creación, idioma y actor.

UC-001-M08

El sistema registra el evento de auditoría.

UC-001-M09

El sistema devuelve el identificador y capacidades disponibles.

Flujos alternativos:

UC-001-A01 — Sesión reutilizable

Si existe una sesión activa compatible:

1.  verificar su vigencia;

<!-- -->

1.  verificar que pertenezca al mismo actor;
2.  actualizar la fecha de actividad;
3.  devolver la sesión existente.

UC-001-A02 — Cliente anónimo

Si no existe identidad autenticada:

1.  crear una identidad temporal;

<!-- -->

4.  asignar nivel TRUST-0 o TRUST-1;
5.  restringir operaciones protegidas;
6.  permitir consultas públicas.

UC-001-A03 — Canal sin voz

Si el canal no soporta voz:

1.  habilitar sólo texto;

<!-- -->

7.  informar capacidades disponibles;
8.  no abrir una sesión Realtime.

Errores:

UC-001-E01

Origen inválido.

Resultado:

- rechazar solicitud;
- registrar evento;
- devolver error seguro.

UC-001-E02

No fue posible persistir la sesión.

Resultado:

- no afirmar que la sesión fue creada;
- registrar error;
- devolver indisponibilidad temporal.

UC-001-E03

Credencial inválida.

Resultado:

- iniciar únicamente como anónimo si la política lo permite;
- de lo contrario, rechazar.

Postcondiciones de éxito:

- existe una sesión activa;
- existe un Session ID único;
- el actor está asociado a la sesión;
- el canal está registrado;
- el evento está auditado.

Postcondiciones de fallo:

- no existe una sesión parcialmente válida;
- no se expone información interna;
- el error queda registrado.

Datos de salida:

- Session ID;
- estado;
- capacidades;
- fecha de expiración;
- nivel de autenticación;
- mensaje de bienvenida opcional.

Auditoría:

Registrar:

- actor;
- canal;
- Session ID;
- Request ID;
- resultado;
- timestamp.

Seguridad:

- no confiar en roles enviados por el cliente;
- no exponer identificadores internos innecesarios;
- aplicar rate limiting.

Idempotencia:

La misma solicitud de creación con la misma Idempotency Key debe devolver la sesión creada originalmente o un resultado equivalente.

Observabilidad:

Métricas mínimas:

- sesiones creadas;
- sesiones reutilizadas;
- sesiones rechazadas;
- latencia de creación;
- errores por canal.

Criterios de aceptación:

AC-UC-001-01

Cada sesión creada posee un identificador único.

AC-UC-001-02

Una sesión no puede pertenecer simultáneamente a dos clientes distintos.

AC-UC-001-03

Una solicitud repetida con la misma Idempotency Key no crea sesiones duplicadas.

AC-UC-001-04

El inicio queda registrado.

Pruebas relacionadas:

TEST-UC-001-001 TEST-UC-001-002 TEST-UC-001-003

======================================================================
UC-002 — PROCESAR MENSAJE DE TEXTO
======================================================================

Identificador: UC-002

Nombre: Procesar mensaje de texto.

Estado: APPROVED

Prioridad: P0

Actor iniciador: ACT-001 Cliente.

Actores secundarios: ACT-006 Canal Web. ACT-007 Canal de Mensajería. ACT-009 Proveedor LLM. ACT-016 Sistema de Auditoría. ACT-017 Sistema de Observabilidad.

Objetivo:

Interpretar un mensaje textual, determinar la intención y producir una respuesta segura o iniciar un caso de uso autorizado.

Requisitos relacionados:

FR-001 FR-003 FR-004 FR-017 FR-018 FR-019 FR-020

Reglas relacionadas:

BR-104 BR-901 BR-902 BR-903 BR-904 BR-905 BR-1101 BR-1301 BR-1302 BR-1303

Precondiciones:

- existe una sesión activa;
- el mensaje cumple el tamaño máximo;
- el canal está habilitado;
- la entrada puede decodificarse.

Disparador:

El Cliente envía un mensaje de texto.

Datos de entrada:

- Session ID;
- Message ID externo;
- texto;
- idioma;
- timestamp;
- metadatos del canal.

Flujo principal:

UC-002-M01

El Canal recibe el mensaje.

UC-002-M02

El sistema normaliza la entrada.

UC-002-M03

El sistema verifica duplicación.

UC-002-M04

El sistema valida tamaño, formato y caracteres.

UC-002-M05

El sistema registra el mensaje como evento inmutable.

UC-002-M06

El sistema construye el contexto mínimo necesario.

UC-002-M07

El sistema solicita al Proveedor LLM una interpretación estructurada.

UC-002-M08

El sistema valida el esquema de la interpretación.

UC-002-M09

El sistema determina el caso de uso autorizado.

UC-002-M10

El caso de uso correspondiente consulta el dominio.

UC-002-M11

El dominio devuelve un resultado oficial.

UC-002-M12

La LLM puede transformar el resultado en lenguaje natural.

UC-002-M13

El sistema valida la respuesta de salida.

UC-002-M14

El Canal entrega la respuesta al Cliente.

UC-002-M15

El sistema registra métricas, trazas y auditoría.

Flujos alternativos:

UC-002-A01 — Intención ambigua

Si la intención no alcanza el umbral requerido:

1.  no ejecutar acciones;

<!-- -->

9.  generar una pregunta de aclaración;
10. conservar contexto;
11. limitar el número de aclaraciones consecutivas.

UC-002-A02 — Consulta no comercial

Si la consulta está permitida, pero no requiere herramientas:

1.  generar una respuesta segura;

<!-- -->

12. evitar afirmar datos comerciales no consultados;
13. registrar la respuesta.

UC-002-A03 — Solicitud de operador

Si el mensaje solicita atención humana:

1.  activar UC-017;

<!-- -->

14. no continuar con automatizaciones incompatibles.

UC-002-A04 — Acción sensible

Si la intención requiere autenticación:

1.  detener la operación;

<!-- -->

15. activar UC-026;
16. reanudar solamente tras autenticación válida.

Errores:

UC-002-E01

Mensaje duplicado.

Resultado:

- no ejecutar dos veces;
- devolver el resultado anterior cuando corresponda;
- activar UC-021.

UC-002-E02

Respuesta LLM fuera de esquema.

Resultado:

- rechazar la interpretación;
- reintentar dentro de límites;
- solicitar aclaración o derivar.

UC-002-E03

Proveedor LLM no disponible.

Resultado:

- activar UC-024;
- utilizar respuesta degradada;
- no inventar información.

UC-002-E04

Texto vacío o inválido.

Resultado:

- solicitar una entrada válida;
- no invocar reglas de negocio.

Postcondiciones de éxito:

- el mensaje quedó registrado;
- la intención fue validada;
- se ejecutó como máximo una operación;
- el Cliente recibió respuesta;
- el estado de sesión fue actualizado.

Postcondiciones de fallo:

- no se ejecutó una operación inválida;
- no se inventaron datos;
- el error quedó trazado.

Idempotencia:

Message ID e Idempotency Key deben impedir ejecución duplicada.

Criterios de aceptación:

AC-UC-002-01

Una respuesta LLM inválida no alcanza el dominio.

AC-UC-002-02

Una intención ambigua no ejecuta acciones comerciales.

AC-UC-002-03

Un mensaje repetido no duplica operaciones.

AC-UC-002-04

Toda respuesta comercial utiliza información oficial.

======================================================================
UC-003 — INICIAR CONVERSACIÓN DE VOZ
======================================================================

Identificador: UC-003

Nombre: Iniciar conversación de voz.

Estado: APPROVED

Prioridad: P0

Actor iniciador: ACT-001 Cliente.

Actores secundarios: ACT-006 Canal Web. ACT-008 Proveedor de Voz. ACT-016 Sistema de Auditoría. ACT-017 Sistema de Observabilidad.

Objetivo:

Establecer una sesión de voz de baja latencia asociada a una sesión conversacional válida.

Requisitos relacionados:

FR-002 FR-003 FR-005

Reglas relacionadas:

BR-1201 BR-1202 BR-1203 BR-1204

Precondiciones:

- existe una sesión conversacional activa;
- el canal tiene permiso de micrófono;
- el navegador o cliente soporta el protocolo requerido;
- existe configuración válida de voz;
- el sistema puede emitir una credencial efímera cuando corresponda.

Disparador:

El Cliente activa el control de micrófono.

Flujo principal:

UC-003-M01

El Cliente solicita iniciar voz.

UC-003-M02

El Canal valida disponibilidad de micrófono.

UC-003-M03

El Canal solicita autorización de sesión de voz al backend.

UC-003-M04

El backend verifica Session ID, actor, canal y límites.

UC-003-M05

El backend genera una autorización efímera.

UC-003-M06

El Canal abre la conexión con el Proveedor de Voz.

UC-003-M07

El sistema configura idioma, voz, herramientas y límites.

UC-003-M08

La sesión cambia a VOICE_ACTIVE.

UC-003-M09

El sistema registra el inicio.

Flujos alternativos:

UC-003-A01 — Micrófono rechazado

1.  informar al Cliente;

<!-- -->

17. conservar disponible el canal de texto;
18. no crear sesión de voz.

UC-003-A02 — Voz no soportada

1.  ofrecer modo texto;

<!-- -->

19. registrar incompatibilidad técnica.

UC-003-A03 — Credencial expirada

1.  solicitar una credencial nueva;

<!-- -->

20. no reutilizar credenciales vencidas.

Errores:

UC-003-E01

No se puede conectar al proveedor.

Resultado:

- cerrar recursos parciales;
- conservar sesión de texto;
- informar indisponibilidad temporal.

UC-003-E02

Sesión no autorizada.

Resultado:

- rechazar;
- registrar;
- no emitir credencial.

Postcondiciones de éxito:

- existe una sesión de voz activa;
- está asociada al Session ID correcto;
- la credencial usada es temporal;
- el evento está registrado.

Criterios de aceptación:

AC-UC-003-01

La API Key permanente nunca se entrega al navegador.

AC-UC-003-02

La sesión de voz está vinculada con una sesión conversacional válida.

AC-UC-003-03

El fallo de voz no impide continuar por texto.

======================================================================
UC-004 — PROCESAR INTERVENCIÓN DE VOZ
======================================================================

Identificador: UC-004

Nombre: Procesar intervención de voz.

Estado: APPROVED

Prioridad: P0

Actor iniciador: ACT-001 Cliente.

Actores secundarios: ACT-008 Proveedor de Voz. ACT-009 Proveedor LLM. Actores comerciales según la intención.

Objetivo:

Convertir una intervención hablada en una solicitud estructurada y producir una respuesta audible basada en resultados oficiales.

Precondiciones:

- sesión de voz activa;
- audio permitido;
- Session ID válido.

Flujo principal:

UC-004-M01

El Cliente habla.

UC-004-M02

El Canal transmite audio.

UC-004-M03

El Proveedor de Voz detecta el turno.

UC-004-M04

El audio se transforma en texto o eventos estructurados.

UC-004-M05

El sistema registra la transcripción.

UC-004-M06

La intención se procesa con las mismas reglas del canal de texto.

UC-004-M07

El dominio ejecuta el caso de uso correspondiente.

UC-004-M08

El resultado oficial se convierte en respuesta textual.

UC-004-M09

El Proveedor de Voz sintetiza audio.

UC-004-M10

El Cliente escucha la respuesta.

Flujos alternativos:

UC-004-A01 — Interrupción del Cliente

Si el Cliente comienza a hablar durante la respuesta:

1.  detener o atenuar el audio de salida;

<!-- -->

21. descartar fragmentos no reproducidos cuando corresponda;
22. iniciar un nuevo turno;
23. preservar consistencia conversacional.

UC-004-A02 — Transcripción con baja confianza

1.  no ejecutar acciones irreversibles;

<!-- -->

24. repetir la interpretación;
25. solicitar confirmación.

UC-004-A03 — Confirmación obligatoria

Para pedidos, pagos o acciones sensibles:

1.  resumir la operación;

<!-- -->

26. solicitar confirmación explícita;
27. ejecutar sólo después de recibirla.

Errores:

UC-004-E01

Audio incomprensible.

Resultado:

- solicitar repetición;
- no ejecutar operación.

UC-004-E02

Pérdida de conexión.

Resultado:

- finalizar sesión de voz;
- conservar contexto textual;
- permitir reconexión.

Postcondiciones de éxito:

- la intervención y respuesta quedan asociadas a la sesión;
- no se ejecutan acciones basadas sólo en audio ambiguo;
- la respuesta se reproduce o queda disponible como texto.

======================================================================
UC-005 — CONSULTAR PRODUCTOS
======================================================================

Identificador: UC-005

Nombre: Consultar productos.

Estado: APPROVED

Prioridad: P0

Actor iniciador: ACT-001 Cliente.

Actores secundarios: ACT-009 Proveedor LLM. ACT-011 Catálogo de Productos.

Objetivo:

Buscar productos oficiales según texto, categoría, marca, atributos o preferencias.

Requisitos relacionados:

FR-006 FR-017 FR-018 FR-019

Reglas relacionadas:

BR-301 BR-303 BR-305 BR-901 BR-905

Precondiciones:

- sesión activa;
- catálogo disponible o caché válida;
- consulta procesable.

Flujo principal:

UC-005-M01

El Cliente expresa una necesidad.

UC-005-M02

El sistema extrae filtros y preferencias.

UC-005-M03

El sistema valida los filtros.

UC-005-M04

El Catálogo busca coincidencias oficiales.

UC-005-M05

El sistema ordena resultados según reglas configuradas.

UC-005-M06

El sistema limita el número de resultados.

UC-005-M07

La respuesta presenta productos reales.

Flujos alternativos:

UC-005-A01 — Sin coincidencias

1.  informar que no se encontraron productos;

<!-- -->

28. ofrecer ajustar filtros;
29. no inventar alternativas.

UC-005-A02 — Coincidencias ambiguas

1.  presentar opciones breves;

<!-- -->

30. pedir al Cliente que seleccione.

UC-005-A03 — Producto inactivo

1.  no ofrecerlo como disponible;

<!-- -->

31. ofrecer alternativas oficiales cuando existan.

Errores:

UC-005-E01

Catálogo no disponible.

Resultado:

- indicar que no es posible consultar en ese momento;
- no utilizar conocimiento inventado de la LLM.

Criterios de aceptación:

AC-UC-005-01

Todo producto mostrado existe en el catálogo.

AC-UC-005-02

Un producto inactivo no se presenta como vendible.

AC-UC-005-03

La ausencia de resultados no genera productos ficticios.

======================================================================
UC-006 — CONSULTAR PRECIO Y DISPONIBILIDAD
======================================================================

Identificador: UC-006

Nombre: Consultar precio y disponibilidad.

Estado: APPROVED

Prioridad: P0

Actor iniciador: ACT-001 Cliente.

Actores secundarios: ACT-010 Sistema de Inventario. ACT-011 Catálogo de Productos.

Objetivo:

Obtener el precio vigente y la disponibilidad verificable de un producto.

Reglas relacionadas:

BR-302 BR-304 BR-401 BR-902 BR-904 BR-1102 BR-1103

Flujo principal:

UC-006-M01

El sistema identifica el producto oficial.

UC-006-M02

El Catálogo devuelve el precio vigente.

UC-006-M03

El Sistema de Inventario devuelve disponibilidad.

UC-006-M04

El sistema verifica fecha y sucursal.

UC-006-M05

La respuesta comunica precio y disponibilidad.

Flujos alternativos:

UC-006-A01 — Múltiples productos coincidentes

Solicitar selección antes de consultar.

UC-006-A02 — Disponibilidad por sucursal

Presentar únicamente las sucursales autorizadas y pertinentes.

UC-006-A03 — Stock bajo

Comunicar disponibilidad sin prometer reserva hasta ejecutar el caso correspondiente.

Errores:

UC-006-E01

Precio no disponible.

Resultado:

- no estimar;
- informar imposibilidad de verificar.

UC-006-E02

Inventario no disponible.

Resultado:

- no afirmar existencia;
- activar UC-025.

Postcondiciones:

La consulta no modifica el inventario.

======================================================================
UC-007 — CONSULTAR PROMOCIONES
======================================================================

Identificador: UC-007

Nombre: Consultar promociones vigentes.

Estado: APPROVED

Prioridad: P1

Actor iniciador: ACT-001 Cliente.

Objetivo:

Mostrar promociones oficiales aplicables a productos, categorías, clientes o condiciones autorizadas.

Reglas relacionadas:

BR-701 BR-702 BR-703 BR-704 BR-705 BR-903

Flujo principal:

1.  identificar contexto comercial;

<!-- -->

32. consultar promociones activas;
33. validar fechas;
34. validar compatibilidad;
35. explicar condiciones;
36. no aplicar todavía descuentos no calculados.

Criterios de aceptación:

- no se muestran promociones vencidas;
- no se combinan promociones incompatibles;
- la LLM no crea condiciones nuevas;
- toda promoción posee identificador oficial.

======================================================================
UC-008 — CREAR CARRITO
======================================================================

Identificador: UC-008

Nombre: Crear carrito.

Estado: APPROVED

Prioridad: P0

Actor iniciador: ACT-001 Cliente.

Objetivo:

Crear un carrito vacío asociado a una sesión.

Reglas relacionadas:

BR-501 BR-502 BR-203

Precondiciones:

- sesión activa;
- no existe carrito activo o la política permite varios.

Flujo principal:

1.  validar sesión;

<!-- -->

37. generar Cart ID;
38. asociar el carrito a la sesión;
39. asignar estado ACTIVE;
40. establecer total inicial igual a cero;
41. registrar evento;
42. devolver carrito.

Idempotencia:

Una misma solicitud idempotente no debe crear dos carritos.

Criterios de aceptación:

- el carrito pertenece a una sesión;
- el carrito comienza vacío;
- el total inicial es cero;
- posee Cart ID único.

======================================================================
UC-009 — AGREGAR PRODUCTO AL CARRITO
======================================================================

Identificador: UC-009

Nombre: Agregar producto al carrito.

Estado: APPROVED

Prioridad: P0

Actor iniciador: ACT-001 Cliente.

Actores secundarios: ACT-010 Sistema de Inventario. ACT-011 Catálogo de Productos.

Objetivo:

Agregar una cantidad válida de un producto oficial a un carrito activo.

Requisitos relacionados:

FR-009 FR-012 FR-020

Reglas relacionadas:

BR-301 BR-401 BR-501 BR-503 BR-504 BR-506 BR-902 BR-904

Precondiciones:

- sesión activa;
- carrito activo;
- producto identificado;
- cantidad entera válida;
- precio verificable;
- disponibilidad suficiente o política de reserva definida.

Flujo principal:

UC-009-M01

El Cliente solicita producto y cantidad.

UC-009-M02

El sistema resuelve el Product ID.

UC-009-M03

El sistema valida la cantidad.

UC-009-M04

El Catálogo entrega precio vigente.

UC-009-M05

Inventario entrega disponibilidad.

UC-009-M06

El dominio verifica reglas.

UC-009-M07

El producto se agrega o acumula.

UC-009-M08

El sistema recalcula subtotal, descuentos permitidos y total.

UC-009-M09

El sistema incrementa la versión del carrito.

UC-009-M10

El sistema registra el evento.

UC-009-M11

El Cliente recibe el carrito actualizado.

Flujos alternativos:

UC-009-A01 — Producto ya existente

Actualizar cantidad mediante una operación atómica.

UC-009-A02 — Cantidad superior al stock

1.  no agregar la cantidad solicitada;

<!-- -->

43. informar la cantidad disponible;
44. solicitar nueva decisión.

UC-009-A03 — Carrito inexistente

Ejecutar UC-008 y continuar, si la política lo permite.

Errores:

UC-009-E01

Cantidad cero o negativa.

Resultado:

- rechazar;
- no modificar carrito.

UC-009-E02

Precio cambió durante la operación.

Resultado:

- usar precio oficial actual;
- informar el cambio;
- solicitar confirmación cuando corresponda.

UC-009-E03

Conflicto de versión.

Resultado:

- no sobrescribir;
- recargar carrito;
- reintentar de manera controlada.

Postcondiciones de éxito:

- el carrito contiene el producto;
- el total es consistente;
- la versión fue actualizada;
- existe auditoría.

Criterios de aceptación:

AC-UC-009-01

Nunca se agrega un producto inexistente.

AC-UC-009-02

Nunca se agrega una cantidad negativa.

AC-UC-009-03

El total se calcula con datos oficiales.

AC-UC-009-04

Dos solicitudes concurrentes no corrompen el carrito.

======================================================================
UC-010 — MODIFICAR CANTIDAD
======================================================================

Objetivo:

Cambiar la cantidad de un producto existente en un carrito activo.

Reglas relacionadas:

BR-503 BR-506

Flujo principal:

1.  validar sesión y carrito;

<!-- -->

45. verificar versión;
46. localizar línea;
47. validar nueva cantidad;
48. consultar disponibilidad;
49. actualizar;
50. recalcular;
51. incrementar versión;
52. registrar;
53. responder.

Regla especial:

Si la cantidad solicitada es cero, la política debe decidir explícitamente si se interpreta como eliminación o se rechaza.

La versión inicial de VoiceShop interpretará cantidad cero como solicitud de eliminación y activará UC-011.

======================================================================
UC-011 — ELIMINAR PRODUCTO DEL CARRITO
======================================================================

Objetivo:

Retirar una línea de producto de un carrito activo.

Reglas relacionadas:

BR-505

Flujo principal:

1.  validar sesión;

<!-- -->

54. validar carrito;
55. verificar que la línea exista;
56. retirar la línea;
57. recalcular total;
58. incrementar versión;
59. liberar reserva cuando corresponda;
60. registrar evento;
61. devolver carrito actualizado.

Postcondición:

El carrito puede quedar vacío.

======================================================================
UC-012 — CONSULTAR CARRITO Y TOTAL
======================================================================

Objetivo:

Obtener una representación actualizada y verificable del carrito.

Flujo principal:

1.  cargar carrito por Session ID y Cart ID;

<!-- -->

62. validar autorización;
63. verificar vigencia de precios cuando corresponda;
64. calcular subtotal;
65. calcular promociones compatibles;
66. calcular impuestos;
67. calcular total;
68. devolver líneas y resumen.

Regla:

El total mostrado debe indicar si es definitivo o estimado.

======================================================================
UC-013 — CREAR PEDIDO DESDE CARRITO
======================================================================

Identificador: UC-013

Nombre: Crear pedido desde carrito.

Estado: APPROVED

Prioridad: P0

Actor iniciador: ACT-001 Cliente.

Actores secundarios: ACT-010 Sistema de Inventario. ACT-011 Catálogo de Productos. ACT-012 Sistema de Pedidos.

Objetivo:

Transformar un carrito válido en un pedido pendiente de confirmación.

Reglas relacionadas:

BR-601 BR-604 INV-001 INV-004

Precondiciones:

- carrito activo;
- carrito no vacío;
- productos válidos;
- precios verificables;
- disponibilidad verificable;
- datos obligatorios presentes.

Flujo principal:

1.  bloquear lógicamente el carrito;

<!-- -->

69. volver a validar productos;
70. volver a validar precios;
71. volver a validar promociones;
72. volver a validar disponibilidad;
73. calcular total final;
74. crear Order ID;
75. copiar líneas del carrito;
76. asignar estado PENDING;
77. registrar snapshot comercial;
78. registrar auditoría;
79. devolver resumen para confirmación.

Errores:

- carrito vacío;
- producto inactivo;
- precio cambiado;
- stock insuficiente;
- datos obligatorios faltantes;
- pedido duplicado.

Postcondición de éxito:

Existe un pedido PENDING, pero aún no confirmado.

======================================================================
UC-014 — CONFIRMAR PEDIDO
======================================================================

Identificador: UC-014

Nombre: Confirmar pedido.

Estado: APPROVED

Prioridad: P0

Actor iniciador: ACT-001 Cliente.

Actores secundarios: ACT-010 Sistema de Inventario. ACT-012 Sistema de Pedidos. ACT-013 Pasarela de Pago, cuando corresponda. ACT-014 Servicio de Entrega, cuando corresponda.

Objetivo:

Confirmar un pedido pendiente mediante una decisión explícita y una transacción consistente.

Precondiciones:

- pedido PENDING;
- actor autorizado;
- confirmación explícita;
- datos completos;
- inventario verificable;
- método de cumplimiento válido.

Flujo principal:

UC-014-M01

El sistema presenta resumen final.

UC-014-M02

El Cliente confirma explícitamente.

UC-014-M03

El sistema verifica idempotencia.

UC-014-M04

El sistema vuelve a validar estado del pedido.

UC-014-M05

El sistema reserva o consume inventario según política.

UC-014-M06

El sistema procesa el pago o registra modalidad posterior.

UC-014-M07

El sistema confirma condiciones de entrega cuando corresponda.

UC-014-M08

El pedido cambia a CONFIRMED.

UC-014-M09

El carrito queda cerrado.

UC-014-M10

Se registra auditoría.

UC-014-M11

El Cliente recibe confirmación y Order ID.

Flujos alternativos:

UC-014-A01 — Pago posterior

Si el negocio permite pago manual:

1.  registrar método;

<!-- -->

80. no afirmar que el pago está realizado;
81. confirmar pedido según política.

UC-014-A02 — Intervención humana

Si la confirmación requiere operador:

1.  cambiar a HUMAN_REVIEW;

<!-- -->

82. activar UC-017;
83. preservar la reserva dentro de un tiempo limitado.

Errores:

UC-014-E01

Stock insuficiente durante confirmación.

Resultado:

- no confirmar;
- liberar reservas parciales;
- informar;
- volver a PENDING o estado de revisión.

UC-014-E02

Pago rechazado.

Resultado:

- no marcar como pagado;
- no confirmar si la política exige pago;
- liberar recursos según política.

UC-014-E03

Timeout después de una operación externa.

Resultado:

- consultar estado mediante identificadores;
- no repetir a ciegas;
- resolver con idempotencia.

Invariantes:

- no existen dos confirmaciones para la misma Idempotency Key;
- un pedido confirmado no se modifica;
- un fallo parcial debe compensarse.

======================================================================
UC-015 — CANCELAR OPERACIÓN O PEDIDO
======================================================================

Objetivo:

Cancelar una operación o pedido cuando su estado y permisos lo permitan.

Reglas relacionadas:

BR-404 BR-603

Flujo principal:

1.  identificar objeto;

<!-- -->

84. autenticar actor cuando sea necesario;
85. consultar estado;
86. verificar política;
87. solicitar motivo;
88. ejecutar cancelación;
89. liberar recursos;
90. registrar;
91. comunicar resultado.

Regla:

Un pedido CANCELLED no puede reactivarse.

======================================================================
UC-016 — CONSULTAR ESTADO DE PEDIDO
======================================================================

Objetivo:

Entregar el estado oficial de un pedido autorizado.

Precondiciones:

- Order ID válido;
- actor autenticado cuando corresponda;
- relación verificable con el pedido.

Flujo principal:

1.  validar identidad;

<!-- -->

92. validar autorización;
93. consultar Sistema de Pedidos;
94. consultar pago o entrega sólo cuando sea necesario;
95. construir estado comprensible;
96. responder;
97. registrar acceso.

Prohibición:

No revelar información de pedidos pertenecientes a otro Cliente.

======================================================================
UC-017 — SOLICITAR DERIVACIÓN HUMANA
======================================================================

Identificador: UC-017

Nombre: Solicitar derivación humana.

Estado: APPROVED

Prioridad: P0

Actor iniciador: ACT-001 Cliente o VoiceShop por regla automática.

Actor secundario: ACT-002 Operador.

Objetivo:

Transferir una conversación a atención humana sin perder contexto.

Disparadores:

- solicitud explícita;
- baja confianza persistente;
- excepción comercial;
- disputa;
- acción restringida;
- fallo repetido;
- riesgo;
- política configurada.

Flujo principal:

1.  registrar motivo;

<!-- -->

98. generar Handoff ID;
99. resumir contexto factual;
100. adjuntar identificadores relevantes;
101. cambiar sesión a HUMAN_WAITING;
102. colocar en cola;
103. informar al Cliente;
104. notificar a Operadores;
105. registrar tiempos.

Regla:

El resumen generado por una LLM no reemplaza el historial original.

======================================================================
UC-018 — TOMAR CONVERSACIÓN DERIVADA
======================================================================

Actor iniciador: ACT-002 Operador.

Objetivo:

Permitir que un Operador autorizado asuma una conversación.

Flujo principal:

1.  autenticar Operador;

<!-- -->

106. autorizar acceso;
107. bloquear asignación concurrente;
108. asignar conversación;
109. mostrar contexto;
110. cambiar estado a HUMAN_ACTIVE;
111. registrar identidad y hora;
112. permitir respuesta.

Criterio:

Dos Operadores no pueden controlar simultáneamente la misma conversación, salvo modo colaborativo explícitamente diseñado.

======================================================================
UC-019 — DEVOLVER CONVERSACIÓN A AUTOMATIZACIÓN
======================================================================

Objetivo:

Finalizar la intervención humana y devolver el control al sistema automatizado.

Flujo principal:

1.  Operador solicita retorno;

<!-- -->

113. sistema valida pendientes;
114. Operador agrega nota estructurada;
115. sistema registra resumen;
116. elimina el bloqueo humano;
117. cambia estado a ACTIVE;
118. informa al Cliente;
119. registra transición.

Regla:

La automatización no debe asumir que decisiones humanas temporales son reglas permanentes.

======================================================================
UC-020 — CERRAR SESIÓN
======================================================================

Objetivo:

Finalizar una sesión de manera explícita o por expiración controlada.

Flujo principal:

1.  verificar estado;

<!-- -->

120. cerrar sesión de voz;
121. cerrar recursos;
122. preservar historial;
123. cerrar o expirar carrito según política;
124. liberar reservas temporales;
125. asignar estado CLOSED o EXPIRED;
126. registrar evento.

======================================================================
UC-021 — GESTIONAR MENSAJE DUPLICADO
======================================================================

Objetivo:

Evitar que reintentos del Canal ejecuten dos veces una operación.

Flujo principal:

1.  recibir Message ID;

<!-- -->

127. buscar registro;
128. si no existe, reservar procesamiento;
129. ejecutar operación;
130. almacenar resultado;
131. responder.

Si existe:

- no volver a ejecutar;
- devolver resultado previo o ACK equivalente.

======================================================================
UC-022 — RECHAZAR ACCIÓN DE MENÚ EXPIRADO
======================================================================

Objetivo:

Impedir que botones antiguos ejecuten acciones sobre estados actuales.

Datos requeridos:

- Session ID;
- Menu ID;
- Menu Version;
- Action ID;
- firma o token;
- fecha de expiración.

Flujo principal:

1.  validar firma;

<!-- -->

132. validar sesión;
133. validar menú vigente;
134. comparar versión;
135. verificar acción permitida;
136. rechazar si está expirado;
137. ofrecer menú actualizado.

Criterio:

Una acción de menú viejo nunca modifica carrito, pedido o sesión.

======================================================================
UC-023 — RECUPERAR SESIÓN VIGENTE
======================================================================

Objetivo:

Continuar una conversación sin perder contexto válido.

Flujo principal:

1.  identificar Cliente y Canal;

<!-- -->

138. buscar sesión;
139. validar vigencia;
140. validar pertenencia;
141. recuperar contexto permitido;
142. actualizar actividad;
143. continuar.

Prohibición:

No recuperar automáticamente una sesión perteneciente a otra identidad.

======================================================================
UC-024 — GESTIONAR FALLO DEL PROVEEDOR IA
======================================================================

Objetivo:

Mantener un comportamiento seguro cuando el proveedor IA falla.

Flujo principal:

1.  detectar timeout, error o respuesta inválida;

<!-- -->

144. registrar dependencia;
145. aplicar reintento limitado;
146. usar proveedor alternativo si está autorizado;
147. usar respuesta determinística cuando exista;
148. derivar si la operación lo requiere;
149. no inventar datos.

Criterio:

La caída de la LLM no debe corromper el dominio.

======================================================================
UC-025 — GESTIONAR FALLO DE INVENTARIO
======================================================================

Objetivo:

Evitar ventas no verificadas cuando el inventario no responde.

Flujo principal:

1.  detectar indisponibilidad;

<!-- -->

150. no afirmar stock;
151. no confirmar reserva;
152. registrar error;
153. informar al Cliente;
154. reintentar según política;
155. derivar cuando sea útil.

======================================================================
UC-026 — AUTENTICAR ACTOR PROTEGIDO
======================================================================

Objetivo:

Verificar la identidad antes de una operación protegida.

Flujo principal:

1.  solicitar credencial;

<!-- -->

156. enviar al Sistema de Identidad;
157. verificar vigencia;
158. verificar estado;
159. asociar identidad;
160. emitir sesión segura;
161. registrar autenticación.

Prohibición:

La interfaz no determina por sí sola el rol autorizado.

======================================================================
UC-027 — AUTORIZAR OPERACIÓN PROTEGIDA
======================================================================

Objetivo:

Determinar si un actor autenticado puede ejecutar una operación.

Flujo principal:

1.  obtener identidad;

<!-- -->

162. obtener rol;
163. obtener recurso;
164. evaluar política;
165. considerar contexto;
166. permitir o rechazar;
167. registrar decisión.

Regla:

Autenticación no implica autorización.

======================================================================
UC-028 — REGISTRAR EVENTO DE AUDITORÍA
======================================================================

Objetivo:

Crear evidencia inmutable de una acción relevante.

Datos mínimos:

- Event ID;
- actor;
- rol;
- Session ID;
- Request ID;
- operación;
- recurso;
- resultado;
- timestamp;
- origen;
- motivo;
- hash o referencia de integridad cuando corresponda.

Regla:

Una corrección crea un nuevo evento.

No modifica el anterior.

======================================================================
UC-029 — PROCESAR TAREA PROGRAMADA
======================================================================

Actor iniciador: ACT-020 Servicio Programado.

Objetivo:

Ejecutar una tarea automática autorizada con límites e idempotencia.

Flujo principal:

1.  validar Task ID;

<!-- -->

168. adquirir lock;
169. verificar última ejecución;
170. ejecutar dentro del timeout;
171. registrar progreso;
172. guardar resultado;
173. liberar lock;
174. generar alerta si falla.

Criterio:

Una tarea no se ejecuta simultáneamente consigo misma salvo diseño explícito.

======================================================================
UC-030 — CONSULTAR MÉTRICAS OPERATIVAS
======================================================================

Actor iniciador: ACT-003 Supervisor. ACT-004 Administrador. ACT-005 Propietario del Negocio.

Objetivo:

Consultar indicadores agregados conforme a permisos.

Flujo principal:

1.  autenticar;

<!-- -->

175. autorizar;
176. seleccionar periodo;
177. consultar datos agregados;
178. aplicar minimización;
179. mostrar métricas;
180. registrar acceso.

Prohibición:

Las métricas no deben utilizarse para exponer conversaciones completas cuando sólo se requiere información agregada.

---

7. Reglas transversales

---

RULE-UC-001

Todo caso de uso debe ejecutarse dentro de una sesión o contexto técnico identificable.

RULE-UC-002

Toda operación de escritura requiere Idempotency Key cuando pueda ser reintentada.

RULE-UC-003

Toda operación sensible requiere autenticación y autorización.

RULE-UC-004

Toda acción comercial se valida con datos oficiales.

RULE-UC-005

La salida de una LLM no se ejecuta sin validación estructural.

RULE-UC-006

Toda modificación de estado genera un evento.

RULE-UC-007

Toda transición inválida debe rechazarse.

RULE-UC-008

Todo fallo parcial debe aplicar rollback, compensación o resolución explícita.

RULE-UC-009

Ningún caso de uso elimina historial.

RULE-UC-010

Toda respuesta de error debe ser segura y comprensible.

RULE-UC-011

Las operaciones de lectura no deben modificar estado, salvo metadatos operacionales explícitos.

RULE-UC-012

Todo caso de uso debe definir timeout.

RULE-UC-013

Todo reintento debe tener límite.

RULE-UC-014

Los reintentos no deben duplicar efectos.

RULE-UC-015

Los identificadores externos no reemplazan identificadores internos.

---

8. Matriz de trazabilidad inicial

---

UC-001

Requisitos: FR-003 FR-014

Reglas: BR-101 BR-102 BR-201

Actores: ACT-001 ACT-006 ACT-007

UC-002

Requisitos: FR-001 FR-004 FR-017 FR-018 FR-019 FR-020

Reglas: BR-901 BR-902 BR-903 BR-904 BR-905

Actores: ACT-001 ACT-009

UC-003

Requisitos: FR-002 FR-005

Reglas: BR-1201 BR-1202 BR-1203 BR-1204

Actores: ACT-001 ACT-006 ACT-008

UC-005

Requisitos: FR-006

Reglas: BR-301 BR-303 BR-305

Actores: ACT-001 ACT-011

UC-006

Requisitos: FR-007

Reglas: BR-302 BR-304 BR-401

Actores: ACT-001 ACT-010 ACT-011

UC-008 a UC-012

Requisitos: FR-009 FR-010 FR-011 FR-012

Reglas: BR-501 a BR-506

Actores: ACT-001 ACT-010 ACT-011

UC-013 a UC-016

Requisitos: FR-013 FR-020

Reglas: BR-601 a BR-604

Actores: ACT-001 ACT-010 ACT-012 ACT-013 ACT-014

UC-017 a UC-019

Requisitos: FR-015 FR-016

Reglas: BR-801 a BR-806

Actores: ACT-001 ACT-002 ACT-003

---

9. Casos prohibidos

---

PROHIBITED-UC-001

Confirmar un pedido sólo porque la LLM lo sugirió.

PROHIBITED-UC-002

Aplicar un precio enviado desde la interfaz.

PROHIBITED-UC-003

Ejecutar dos veces una solicitud duplicada.

PROHIBITED-UC-004

Modificar un pedido confirmado.

PROHIBITED-UC-005

Aceptar una acción de menú vencido.

PROHIBITED-UC-006

Permitir que un Operador acceda sin autorización.

PROHIBITED-UC-007

Afirmar disponibilidad durante una caída de inventario.

PROHIBITED-UC-008

Marcar un pago como exitoso sin confirmación de la Pasarela de Pago.

PROHIBITED-UC-009

Entregar la API Key permanente de un proveedor al navegador.

PROHIBITED-UC-010

Eliminar un evento de auditoría.

---

10. Criterios globales de aceptación

---

AC-UC-GLOBAL-001

Todo caso de uso posee actor iniciador.

AC-UC-GLOBAL-002

Todo caso de uso posee precondiciones.

AC-UC-GLOBAL-003

Todo caso de uso posee postcondiciones.

AC-UC-GLOBAL-004

Toda operación de escritura posee estrategia de idempotencia.

AC-UC-GLOBAL-005

Toda dependencia externa posee tratamiento de error.

AC-UC-GLOBAL-006

Toda acción sensible posee auditoría.

AC-UC-GLOBAL-007

Toda respuesta comercial se basa en una fuente oficial.

AC-UC-GLOBAL-008

Toda transición de estado puede reconstruirse mediante eventos.

AC-UC-GLOBAL-009

Todo caso de uso puede convertirse en pruebas automatizadas.

AC-UC-GLOBAL-010

Ningún caso de uso otorga autoridad comercial a una LLM.

---

11. Checklist de revisión

---

\[ \] Todos los casos de uso poseen ID.

\[ \] Todos los casos de uso poseen nombre único.

\[ \] Todos los casos de uso poseen actor iniciador.

\[ \] Los actores están definidos en 05-ACTORS.md.

\[ \] Los requisitos relacionados existen.

\[ \] Las reglas relacionadas existen.

\[ \] Las precondiciones son verificables.

\[ \] El flujo principal es determinístico.

\[ \] Los flujos alternativos están identificados.

\[ \] Los errores importantes están definidos.

\[ \] Las postcondiciones de éxito están definidas.

\[ \] Las postcondiciones de fallo están definidas.

\[ \] Las operaciones repetibles poseen idempotencia.

\[ \] Las acciones sensibles poseen autenticación.

\[ \] Las acciones sensibles poseen autorización.

\[ \] Las escrituras generan auditoría.

\[ \] Los proveedores externos tienen manejo de timeout.

\[ \] Los reintentos poseen límites.

\[ \] Los menús antiguos son rechazados.

\[ \] La voz utiliza las mismas reglas comerciales que el texto.

\[ \] La LLM no es fuente oficial.

\[ \] El inventario no puede quedar negativo.

\[ \] Los pedidos confirmados no se modifican.

\[ \] Las cancelaciones liberan recursos cuando corresponde.

\[ \] La derivación humana conserva el contexto.

\[ \] Los casos de uso pueden mapearse a pruebas.

---

12. Historial de cambios

---

Versión 1.0 Fecha: 2026-07-16

- Creación del catálogo inicial de casos de uso.
- Definición de sesiones de texto y voz.
- Definición del flujo comercial de catálogo, carrito y pedido.
- Incorporación de idempotencia.
- Incorporación de concurrencia y control de versiones.
- Definición de derivación humana.
- Definición de autenticación y autorización.
- Definición de auditoría.
- Definición de menús expirados.
- Definición de fallos de IA e inventario.
- 
- Incorporación de criterios globales de aceptación.

Requirements

↓

Business Rules

↓

Actors

↓

Use Cases

↓

MODULES ← NUEVO

↓

Functional Specification

↓

API

↓

Código

======================================================================
FIN DEL DOCUMENTO
======================================================================
