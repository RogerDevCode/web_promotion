# Plan de Diseño: Cobre & Co. Propiedades
**Fecha:** 2026-06-13  
**Estado:** Validado  
**Nicho:** Corredora de Propiedades (Venta y Arriendo) chilena con enfoque premium y minimalista cálido.

---

## 1. Arquitectura y Estructura de Archivos
El módulo se desarrollará de forma autocontenida y optimizada para uso local y offline:
```bash
/web_promotion
└── demo-propiedades/
    ├── index.html     # Único archivo con estructura HTML5, estilos CSS y lógica Alpine.js
    └── preview.png    # Captura de previsualización de la interfaz
```

## 2. Sistema de Diseño Visual y Paleta de Colores
Siguiendo la dirección de **Minimalismo Moderno Cálido**, se define la siguiente guía de estilos en CSS:
* **Fondo de la Aplicación:** Crema suave/Blanco roto (`#F9F8F6`).
* **Fondo de Tarjetas:** Blanco puro (`#FFFFFF`) con bordes finos de color beige templado (`#EAE7E1`).
* **Colores de Acento:** Cobre industrial/Terracota (`#C07C5D` para primario, `#A05D41` para hover).
* **Color del Texto:** Carbón apagado (`#2A2B2A` para legibilidad óptima) y Gris apagado (`#6E706E` para textos secundarios).
* **Tipografías:**
  * **Títulos e Identidad:** `Spectral`, Georgia, serif (aporta carácter elegante e inmobiliario clásico).
  * **Textos, Datos y Filtros:** `Inter`, system-ui, sans-serif (legibilidad óptima y limpia).

## 3. Componentes de la Interfaz (UI)
* **Navbar & Demo Bar:** Barra flotante superior que integra el banner informativo del plan y el enlace de retorno al portafolio principal.
* **Hero Section:** Espacio elegante de bienvenida que introduce la identidad de la marca ("Cobre & Co. Propiedades").
* **Buscador & Filtros Interactivos:** Panel responsivo con entradas para:
  * Tipo de operación: Arriendo / Venta / Todos.
  * Tipo de inmueble: Casa / Departamento / Todos.
  * Comuna: Las Condes, Providencia, Concón, Viña del Mar.
  * Rango de precios: Deslizador dinámico medido en Unidades de Fomento (UF) desde 1,000 UF hasta 30,000 UF.
* **Grilla de Propiedades:** Contenedor responsivo (`grid` CSS) que despliega tarjetas de inmuebles de forma secuencial.
* **Modal de Reserva:** Ventana emergente superpuesta con efecto de cristal esmerilado que gestiona la agenda de visitas. El selector de modalidad ("Presencial" / "Virtual") tiene la opción **Presencial** en primer lugar y seleccionada por defecto.

## 4. Esquema de Datos (In-Memory Array)
Los datos serán administrados localmente en JavaScript:
```javascript
properties: [
    {
        id: 1,
        titulo: "Departamento Dúplex en Providencia",
        operacion: "arriendo",
        tipo: "departamento",
        precioUF: 35,
        precioCLP: 1300000,
        comuna: "Providencia",
        dormitorios: 2,
        banos: 2,
        superficieM2: 85,
        imagen: "depto1.png",
        descripcion: "Hermoso dúplex con terraza privada, cocina americana equipada y excelente conectividad."
    },
    {
        id: 2,
        titulo: "Casa Colonial de un Piso en Las Condes",
        operacion: "venta",
        tipo: "casa",
        precioUF: 12500,
        precioCLP: 465000000,
        comuna: "Las Condes",
        dormitorios: 4,
        banos: 3,
        superficieM2: 210,
        imagen: "casa1.png",
        descripcion: "Amplio jardín formado con piscina, estacionamiento para 3 vehículos y living comedor separados."
    }
]
```

## 5. Reactividad y Flujo de Trabajo (Alpine.js)
1. **Filtros Automáticos:** El método `filteredProperties` se recalcula en tiempo real en base a los datos enlazados con `x-model`.
2. **Agendamiento:** Al presionar "Agendar Visita", se vincula la propiedad activa y se abre el formulario modal.
3. **Conversión a WhatsApp:** Se genera una cadena de texto codificada para la API de WhatsApp, redirigiendo al número del agente con el resumen de la fecha y hora seleccionadas para la visita.
4. **Limpieza estricta:** Al cerrar el modal, se ejecuta `resetForm()`, limpiando la memoria del formulario de agendamiento y restaurando el tipo de visita por defecto a `"presencial"`.

## 6. Accesibilidad (A11y) y SEO
* **Cumplimiento de 14px:** Todo el texto tiene un tamaño mínimo de 14px en móvil. No se usan declaraciones `!important` para tamaños de fuente.
* **HTML Semántico:** Utilización de etiquetas `<header>`, `<main>`, `<section>`, `<article>` y `<footer>`.
* **Schema Markup:** Inyección de JSON-LD estructurado de tipo `RealEstateAgent` para indexación local chilena.

## 7. Plan de Pruebas (QA)
* Ejecución del script `node check_consoles.js` para asegurar 0 advertencias/errores en la consola.
* Ejecución del script de tipografía para verificar legibilidad móvil.
