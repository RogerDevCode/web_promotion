# VoiceShop — Revisión Final de Consistencia

## Arquitectura

Debe existir una única definición oficial para:

- entrada de texto;
- entrada de voz;
- discriminación entre ambos caminos;
- backend FastAPI;
- sesión de OpenAI Realtime;
- herramientas de negocio;
- catálogo, precios y stock;
- carrito;
- orden;
- intervención humana.

Bloqueos críticos:

- API key permanente en el frontend;
- precios o stock inventados por la LLM;
- total aceptado desde el navegador;
- escritura directa de la LLM en la base de datos;
- voz y texto mezclados sin contrato;
- dos entrypoints incompatibles.

## Contratos

Verificar:

- eventos únicos;
- payloads versionados;
- campos y tipos explícitos;
- moneda;
- cantidades;
- códigos de error;
- `request_id`;
- `session_id`;
- idempotencia.

Bloqueos:

- mismo evento con esquemas incompatibles;
- mismo error con significados distintos;
- acciones transaccionales sin clave idempotente;
- campos monetarios sin moneda.

## Voz

Verificar estados:

```text
idle
connecting
listening
speaking
error
closed
```

Verificar además:

- permiso de micrófono;
- cierre de captura;
- cancelación;
- interrupción;
- reconexión controlada;
- transcripción correlacionada;
- fallback de texto.

## Datos transaccionales

- productos, precio y stock desde fuente real;
- total recalculado en servidor;
- carrito identificado;
- reintentos idempotentes;
- stock revalidado antes del cierre;
- orden separada del estado conversacional;
- handoff humano auditable.

## Seguridad

- secretos solo en servidor;
- sesión efímera Realtime;
- validación estructural;
- límites de tamaño y frecuencia;
- autorización;
- logs sin secretos;
- no ejecución de argumentos arbitrarios.

## Pruebas mínimas

- validadores;
- carrito;
- herramientas;
- duplicados;
- reconexión;
- permisos;
- errores;
- integración frontend-backend;
- sesión Realtime;
- end-to-end de compra;
- handoff humano.

## Decisión

La especificación solo puede declararse `READY` si no quedan bloqueos críticos.
