# Plan de Acción para la Implementación: Cobre & Co. Propiedades
**Fecha:** 2026-06-13  
**Rama:** `feat/corredora-propiedades`  
**Estado:** Pendiente de ejecución  

Este plan de acción detalla los pasos técnicos y el checklist necesario para la creación e integración de la demo de la Corredora de Propiedades.

---

## checklist de Implementación

### Fase 1: Creación del Módulo e Infraestructura CSS (Base)
- [ ] Crear el directorio `/home/manager/Sync/python_proyects/web_promotion/demo-propiedades/` si no existe.
- [ ] Crear el archivo `index.html` base con la estructura HTML5 y los metadatos necesarios.
- [ ] Importar las fuentes de Google Fonts en el `<head>`: **Spectral** (para títulos) e **Inter** (para cuerpo y controles).
- [ ] Configurar las variables de color CSS del sistema de diseño (Minimalismo Moderno Cálido):
  ```css
  :root {
      --primary-copper: #C07C5D;
      --primary-hover: #A05D41;
      --bg-warm: #F9F8F6;
      --bg-card: #FFFFFF;
      --border-light: #EAE7E1;
      --text-dark: #2A2B2A;
      --text-muted: #6E706E;
  }
  ```
- [ ] Diseñar el banner superior (`.demo-bar`) y el botón flotante de retorno al portafolio principal (`.showcase-back-btn`), asegurando que usen clases responsivas específicas sin recurrir a `!important`.

### Fase 2: Configuración del Estado y Datos In-Memory (Alpine.js)
- [ ] Definir el objeto de inicialización de Alpine.js con los siguientes estados:
  - `activeTab` para filtros rápidos.
  - `filterOperacion`, `filterTipo`, `filterComuna`, `filterPrecioMax`.
  - `selectedProperty` para enlazar la propiedad actual en el modal.
  - `isBookingOpen` para controlar la visualización de la ventana modal.
- [ ] Cargar el array local `properties` con al menos 5 registros variados (casas y departamentos en comunas como Las Condes, Vitacura, Concón, Providencia, Viña del Mar).
- [ ] Implementar la función reactiva `filteredProperties()` para realizar filtros locales instantáneos.
- [ ] Implementar un formateador numérico para CLP y UF compatible con las convenciones nacionales chilenas.

### Fase 3: Construcción de la Interfaz del Catálogo (HTML/CSS)
- [ ] Maquetar el panel del buscador con campos selectores adaptados (en escritorio en una fila de flex, en móvil colapsado en vertical).
- [ ] Maquetar la grilla responsiva de propiedades (`display: grid`) que pase de 1 columna (móvil) a 2 o 3 (pantallas grandes).
- [ ] Crear la tarjeta de la propiedad (`.property-card`) incorporando imágenes locales descriptivas o placeholders estéticos, badges superiores, metadatos estructurados ($m^2$, baños, dormitorios) y los botones de acción.

### Fase 4: Formulario Modal de Agendamiento e Integración con WhatsApp
- [ ] Diseñar el overlay modal con efecto de cristal difuminado (`backdrop-filter: blur(10px)`).
- [ ] Crear el formulario de agendamiento enlazando las variables reactivas de Alpine.js con `x-model`.
- [ ] Configurar el selector de tipo de visita de forma que la opción **"Presencial"** se liste de primera y esté seleccionada por defecto en el estado del componente.
- [ ] Desarrollar la lógica de envío `sendBookingToWhatsApp()`:
  - Validar campos obligatorios (nombre y teléfono).
  - Formatear el mensaje en base al resumen de la fecha, hora y modalidad de visita seleccionada.
  - Redirigir usando `window.open` a la API de WhatsApp de forma segura.
- [ ] Asegurar que al cerrar la modal (vía "Cancelar", click fuera o tras finalizar el envío), se ejecute `resetForm()` restableciendo el estado completo a su origen.

### Fase 5: Optimización de Accesibilidad, SEO y QA
- [ ] Definir los estilos responsivos específicos para dispositivos móviles de **375px**, garantizando que ningún tamaño de fuente visible sea inferior a **14px** usando especificidad de selectores en lugar de `!important`.
- [ ] Añadir metadatos Open Graph, Twitter Cards y etiquetas semánticas HTML5.
- [ ] Inyectar el marcado JSON-LD estructurado de tipo `RealEstateAgent`.
- [ ] Ejecutar `node check_consoles.js` para validar que no existan fallas.
- [ ] Ejecutar el validador de tipografías móviles para confirmar cumplimiento estricto del tamaño mínimo.
