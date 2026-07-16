Propuesta: clasificar las reglas por nivel de estabilidad

En lugar de tratarlas todas igual, cada regla debería indicar cuánto puede cambiar.

Ejemplo:

BR-301

Nombre:
Un producto debe existir antes de venderse.

Nivel:
CORE

Estabilidad:
★★★★★

Puede cambiar:
NO

RFC obligatorio:
SI

Y definir cuatro categorías:

Nivel	Significado
CORE	Nunca debería cambiar.
BUSINESS	Cambia solo cuando cambia el negocio.
POLICY	Cambia por decisiones comerciales.
CONFIG	Puede modificarse mediante configuración, sin tocar código.

Esto permitiría que una LLM supiera automáticamente qué reglas puede parametrizar y cuáles jamás debe modificar.
