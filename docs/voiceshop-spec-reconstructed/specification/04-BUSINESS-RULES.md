======================================================================
Documento : 04-BUSINESS-RULES.md
Versión   : 1.0
Estado    : DRAFT
Autor     : VoiceShop Framework

Dependencias

00-PROJECT-MANIFEST
01-VISION
02-GLOSSARY
03-REQUIREMENTS

======================================================================

# BUSINESS RULES

----------------------------------------------------------------------
1. Objetivo
----------------------------------------------------------------------

Este documento define todas las reglas del negocio.

Las reglas aquí descritas representan decisiones comerciales.

NO representan decisiones técnicas.

Toda implementación deberá respetarlas.

Toda modificación requiere RFC.

----------------------------------------------------------------------

2. Principios Fundamentales
----------------------------------------------------------------------

BR-001

El negocio nunca depende del proveedor IA.

BR-002

Las reglas del negocio existen aunque no exista software.

BR-003

Las reglas son independientes del lenguaje.

BR-004

Las reglas son independientes del framework.

BR-005

Las reglas poseen prioridad sobre cualquier implementación.

----------------------------------------------------------------------

3. Conversación
----------------------------------------------------------------------

BR-101

Toda conversación pertenece a una sesión.

BR-102

Una sesión posee exactamente un cliente.

BR-103

Una sesión puede generar múltiples pedidos.

BR-104

Toda conversación debe quedar registrada.

BR-105

El historial nunca podrá modificarse.

Sólo agregar nuevos eventos.

----------------------------------------------------------------------

4. Identidad
----------------------------------------------------------------------

BR-201

Toda sesión posee un Session ID único.

BR-202

Todo pedido posee un Order ID único.

BR-203

Todo carrito posee un Cart ID único.

BR-204

Todo mensaje posee un Message ID.

----------------------------------------------------------------------

5. Productos
----------------------------------------------------------------------

BR-301

Un producto debe existir antes de venderse.

BR-302

Un producto posee un precio vigente.

BR-303

Un producto puede estar inactivo.

BR-304

Un producto puede agotarse.

BR-305

Nunca vender un producto inexistente.

----------------------------------------------------------------------

6. Inventario
----------------------------------------------------------------------

BR-401

El stock nunca puede ser negativo.

BR-402

Toda reserva reduce disponibilidad.

BR-403

Todo pedido confirmado consume inventario.

BR-404

Todo pedido cancelado libera inventario.

----------------------------------------------------------------------

7. Carrito
----------------------------------------------------------------------

BR-501

Todo carrito pertenece a una sesión.

BR-502

Un carrito puede contener cero o más productos.

BR-503

No puede existir cantidad negativa.

BR-504

No puede existir precio negativo.

BR-505

Eliminar un producto recalcula automáticamente el total.

BR-506

Modificar cantidad recalcula automáticamente el total.

----------------------------------------------------------------------

8. Pedidos
----------------------------------------------------------------------

BR-601

Todo pedido nace desde un carrito.

BR-602

Un pedido confirmado no puede modificarse.

BR-603

Un pedido cancelado no puede reactivarse.

BR-604

Todo pedido posee estado.

----------------------------------------------------------------------

Estados

CREATED

PENDING

CONFIRMED

CANCELLED

DELIVERED

----------------------------------------------------------------------

9. Promociones
----------------------------------------------------------------------

BR-701

Las promociones poseen fecha de inicio.

BR-702

Las promociones poseen fecha de término.

BR-703

Una promoción puede ser incompatible con otra.

BR-704

Nunca aplicar promociones vencidas.

BR-705

El cálculo de promociones debe ser determinístico.

----------------------------------------------------------------------

10. Atención Humana
----------------------------------------------------------------------

BR-801

La IA puede atender consultas.

BR-802

La IA puede generar pedidos.

BR-803

La IA nunca autoriza excepciones comerciales.

BR-804

La IA nunca modifica precios manualmente.

BR-805

La IA nunca realiza devoluciones económicas.

BR-806

La IA siempre puede derivar a un operador.

----------------------------------------------------------------------

11. Inteligencia Artificial
----------------------------------------------------------------------

BR-901

La IA no es fuente oficial de datos.

BR-902

La IA nunca inventa inventario.

BR-903

La IA nunca inventa promociones.

BR-904

La IA nunca inventa precios.

BR-905

Toda información comercial proviene del dominio.

----------------------------------------------------------------------

12. Seguridad
----------------------------------------------------------------------

BR-1001

Toda acción debe autenticarse.

BR-1002

Toda acción importante queda registrada.

BR-1003

Toda modificación queda auditada.

BR-1004

Toda operación posee trazabilidad.

----------------------------------------------------------------------

13. Errores
----------------------------------------------------------------------

BR-1101

Ante información insuficiente:

preguntar.

Nunca asumir.

BR-1102

Ante inventario desconocido:

consultar.

Nunca inventar.

BR-1103

Ante precio desconocido:

consultar.

Nunca estimar.

----------------------------------------------------------------------

14. Reglas de Voz
----------------------------------------------------------------------

BR-1201

La voz siempre se convierte a texto.

BR-1202

El dominio nunca procesa audio.

BR-1203

El dominio trabaja únicamente con texto estructurado.

BR-1204

La síntesis de voz ocurre después de construir la respuesta.

----------------------------------------------------------------------

15. Reglas de Integración
----------------------------------------------------------------------

BR-1301

Los proveedores IA son intercambiables.

BR-1302

Todo proveedor implementa el mismo contrato.

BR-1303

El dominio nunca conoce la implementación.

----------------------------------------------------------------------

16. Invariantes
----------------------------------------------------------------------

INV-001

No existen pedidos sin sesión.

INV-002

No existen productos sin identificador.

INV-003

No existen sesiones sin historial.

INV-004

No existen pedidos sin estado.

INV-005

No existen mensajes sin timestamp.

----------------------------------------------------------------------

17. Casos Prohibidos
----------------------------------------------------------------------

Nunca vender sin stock.

Nunca vender productos inexistentes.

Nunca responder con datos inventados.

Nunca eliminar historial.

Nunca alterar auditorías.

Nunca modificar pedidos confirmados.

Nunca permitir cantidades negativas.

----------------------------------------------------------------------

18. Reglas de Evolución
----------------------------------------------------------------------

Toda nueva regla requiere:

RFC

↓

Revisión

↓

Aprobación

↓

Actualización documental

↓

Implementación

↓

QA

----------------------------------------------------------------------

19. Checklist
----------------------------------------------------------------------

[ ] Todas las reglas poseen ID.

[ ] No existen contradicciones.

[ ] Toda regla puede probarse.

[ ] Toda regla posee un responsable.

[ ] Toda regla tiene trazabilidad.

======================================================================
FIN DEL DOCUMENTO
======================================================================
