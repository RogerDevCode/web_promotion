======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-02-12-VOICE-TESTING.md

# TESTING DEL SUBSISTEMA DE VOZ

## 1. Objetivo

Este documento define la estrategia exhaustiva de pruebas del subsistema
de voz Realtime de VoiceShop.

Las pruebas deben verificar que la voz:

- mantenga baja latencia;
- preserve las reglas comerciales;
- sea interrumpible;
- no duplique acciones;
- se recupere de desconexiones;
- proteja datos sensibles;
- funcione con ruido y variaciones lingüísticas;
- pueda degradarse a texto;
- permanezca independiente del proveedor;
- produzca evidencia reproducible.

## 2. Alcance

Incluye pruebas de:

- VoiceSession;
- autorización efímera;
- conexión;
- streaming de audio;
- formatos;
- buffers;
- backpressure;
- VAD;
- turn detection;
- push-to-talk;
- transcripción;
- síntesis;
- playback;
- interrupción;
- barge-in;
- Tool Calling;
- confirmaciones;
- sincronización voz-texto;
- reconexión;
- recuperación;
- seguridad;
- observabilidad;
- rendimiento;
- privacidad;
- accesibilidad;
- compatibilidad;
- proveedores.

## 3. Principios

RULE-VTEST-001

Todo requisito funcional de voz debe mapearse a una prueba.

RULE-VTEST-002

Toda transición de la FSM debe probarse.

RULE-VTEST-003

Toda transición prohibida debe rechazarse.

RULE-VTEST-004

Toda operación de voz con efectos debe probar idempotencia.

RULE-VTEST-005

Toda dependencia externa debe probar timeout.

RULE-VTEST-006

Toda sesión debe probar cierre y liberación de recursos.

RULE-VTEST-007

Toda reconexión debe probar generaciones antiguas.

RULE-VTEST-008

Toda Tool Proposal debe probar autorización.

RULE-VTEST-009

Toda confirmación sensible debe probar entrega incompleta.

RULE-VTEST-010

Toda prueba debe evitar secretos reales.

RULE-VTEST-011

Toda prueba debe producir evidencia reproducible.

RULE-VTEST-012

Los datasets de audio deben estar versionados.

RULE-VTEST-013

La calidad acústica y la correctitud comercial se evalúan por separado.

RULE-VTEST-014

Un proveedor nuevo debe superar pruebas de contrato.

RULE-VTEST-015

Las pruebas no deben ejecutar cobros reales.

## 4. Capas de prueba

### UNIT

- parsers de eventos;
- secuencias;
- validadores;
- estados;
- políticas;
- formatos;
- cálculo de played_audio_ms;
- normalización de errores.

### COMPONENT

- Voice Session Manager;
- Audio Buffer;
- VAD Coordinator;
- Transcription Adapter;
- TTS Adapter;
- Interruption Coordinator;
- Reconnection Manager;
- Voice Tool Validator.

### CONTRACT

- proveedor Realtime;
- proveedor STT;
- proveedor TTS;
- WebRTC/WebSocket;
- eventos;
- autorización efímera;
- schemas.

### INTEGRATION

- frontend + gateway;
- gateway + proveedor;
- voz + conversación;
- voz + herramientas;
- contexto;
- persistencia;
- observabilidad.

### END-TO-END

- conversación completa;
- carrito;
- confirmación;
- interrupción;
- cambio de canal;
- reconexión;
- handoff.

### ADVERSARIAL

- replay;
- hijack;
- prompt injection;
- tool injection;
- cross-tenant;
- audio abuse;
- denial of wallet.

## 5. Identificadores

Formato:

TEST-VOICE-<ÁREA>-<NÚMERO>

Ejemplos:

TEST-VOICE-SESSION-001

TEST-VOICE-AUDIO-014

TEST-VOICE-BARGE-008

TEST-VOICE-SECURITY-021

## 6. Estructura de caso

```yaml
test_id: TEST-VOICE-BARGE-001
title: Interrumpir respuesta durante reproducción
requirements:
  - AC-BARGE-003
  - AC-BARGE-005
given:
  voice_session_state: RESPONDING
  response_state: PLAYING
  played_audio_ms: 1200
when:
  event: CLIENT_SPEECH_STARTED
then:
  voice_session_state: LISTENING
  response_state: PARTIALLY_PLAYED
  new_turn_created: true
  pending_audio_discarded: true
  command_reexecuted: false
evidence:
  - interruption_event
  - trace
  - playback_metrics
```

## 7. Datasets de audio

Conjuntos mínimos:

- quiet-spanish-cl;
- noisy-retail;
- street-noise;
- television-background;
- echo-speaker;
- headset-clean;
- low-volume;
- clipping;
- packet-loss;
- accents-es-cl;
- mixed-language;
- product-brands;
- numbers-and-prices;
- addresses;
- confirmations;
- prompt-injection-spoken;
- multiple-speakers;
- silence-and-coughs.

Cada elemento debe declarar:

- Audio Sample ID;
- versión;
- licencia;
- idioma;
- speaker profile;
- noise profile;
- transcript esperado;
- entidades esperadas;
- intención esperada;
- riesgo;
- duración;
- formato;
- sample rate;
- tags.

## 8. Privacidad de datasets

No usar grabaciones de clientes reales sin:

- consentimiento;
- minimización;
- anonimización;
- retención;
- acceso;
- documentación.

Preferir:

- audio sintético;
- grabaciones consentidas;
- datasets autorizados;
- datos ficticios.

## 9. Pruebas de VoiceSession

TEST-VOICE-SESSION-001

Crear VoiceSession válida.

TEST-VOICE-SESSION-002

Reintento idempotente.

TEST-VOICE-SESSION-003

Misma clave con payload diferente.

TEST-VOICE-SESSION-004

Session inexistente.

TEST-VOICE-SESSION-005

Session cerrada.

TEST-VOICE-SESSION-006

Tenant mismatch.

TEST-VOICE-SESSION-007

Actor no autorizado.

TEST-VOICE-SESSION-008

Dos sesiones simultáneas.

TEST-VOICE-SESSION-009

Autorización expirada.

TEST-VOICE-SESSION-010

Cierre normal.

TEST-VOICE-SESSION-011

Cierre durante LISTENING.

TEST-VOICE-SESSION-012

Cierre durante PROCESSING.

TEST-VOICE-SESSION-013

Cierre durante RESPONDING.

TEST-VOICE-SESSION-014

Evento tardío.

TEST-VOICE-SESSION-015

Liberación de recursos.

## 10. Pruebas de autorización efímera

- token válido;
- token expirado;
- scope inválido;
- generation inválida;
- nonce repetido;
- replay;
- Session distinta;
- tenant distinto;
- actor distinto;
- origen distinto;
- revocación;
- rotación;
- token antiguo;
- dos pestañas;
- API Key permanente ausente en frontend.

## 11. Pruebas de conexión

- WebRTC válido;
- WebSocket válido;
- protocolo no soportado;
- handshake timeout;
- proveedor caído;
- conexión lenta;
- NAT;
- firewall;
- cambio de red;
- cierre remoto;
- heartbeat;
- inactivity timeout;
- multiple connection generations.

## 12. Pruebas de formatos

- PCM16;
- G711;
- Opus cuando aplique;
- sample rate correcto;
- sample rate incorrecto;
- mono;
- estéreo no permitido;
- endianess;
- chunk vacío;
- chunk demasiado grande;
- duración inválida;
- MIME falso;
- payload corrupto.

## 13. Pruebas de secuencia

- secuencia normal;
- duplicado exacto;
- duplicado distinto;
- gap;
- reordenamiento permitido;
- reordenamiento fuera de ventana;
- secuencia antigua;
- sequence overflow;
- stream nuevo;
- generation nueva;
- chunk tardío.

## 14. Pruebas de buffer

- buffer normal;
- high watermark;
- low watermark;
- overflow;
- backpressure;
- productor rápido;
- consumidor lento;
- pestaña suspendida;
- playback bloqueado;
- liberación tras cierre;
- memoria estable.

## 15. Pruebas de VAD

- voz clara;
- silencio;
- tos;
- golpe;
- música;
- televisión;
- eco;
- habla baja;
- habla rápida;
- pausa corta;
- pausa larga;
- false start;
- resume;
- ruido alto;
- cambio de perfil;
- VAD client/server conflict.

## 16. Pruebas push-to-talk

- press;
- release;
- doble press;
- release sin press;
- botón sostenido;
- pérdida de foco;
- permiso revocado;
- cierre;
- reconexión;
- cancelación.

## 17. Pruebas de commit

- commit válido;
- commit duplicado;
- commit conflictivo;
- audio vacío;
- turno corto;
- turno largo;
- timeout;
- Turn ya terminal;
- generation antigua;
- commit tras desconexión;
- commit manual.

## 18. Pruebas de transcripción

- parcial;
- final;
- final duplicado;
- final distinto;
- vacío;
- baja confianza;
- idioma;
- acento;
- marca;
- número;
- precio;
- dirección;
- autocorrección;
- dos hablantes;
- audio gap;
- truncamiento;
- provider timeout;
- late transcript;
- PII.

## 19. Pruebas de números críticos

Frases:

- "seis";
- "diez";
- "quince";
- "cincuenta";
- "mil";
- "diez mil";
- "uno punto cinco";
- "uno coma cinco";
- "dieciocho horas";
- IDs leídos dígito por dígito.

Validar:

- transcript;
- entity;
- confirmation;
- no ejecución con baja confianza.

## 20. Pruebas de marcas

Debe incluir:

- marcas en español;
- marcas extranjeras;
- nombres con números;
- homófonos;
- abreviaturas;
- presentación.

No exigir transcripción exacta si la resolución oficial funciona y la
confianza es adecuada.

## 21. Pruebas de TTS

- texto breve;
- respuesta larga;
- precio;
- moneda;
- cantidad;
- fecha;
- hora;
- Order ID;
- Product Name;
- abreviatura;
- voz;
- idioma;
- SSML;
- markup inválido;
- streaming;
- first audio;
- provider timeout;
- fallback a texto;
- PII;
- cancelación.

## 22. Pruebas de playback

- reproducción completa;
- buffer;
- jitter;
- pausa;
- dispositivo no disponible;
- autoplay bloqueado;
- volumen;
- salida cambiada;
- cierre;
- reconexión;
- audio tardío;
- sequence conflict;
- progreso.

## 23. Pruebas de interrupción

- Cliente habla;
- botón detener;
- cambio a texto;
- cierre;
- human handoff;
- respuesta completa justo antes;
- played_audio_ms;
- stop latency;
- provider cancel;
- audio tardío;
- false barge-in;
- eco;
- doble interrupción;
- versión conflictiva.

## 24. Confirmación interrumpida

Debe probar:

- pregunta no entregada;
- pregunta parcial;
- pregunta completa;
- "sí" temprano;
- "sí" tardío;
- cambio de total;
- confirmación expirada;
- nueva generation;
- cambio a texto.

Resultado esperado:

Nunca confirmar con una pregunta no entregada completamente.

## 25. Pruebas de Tool Calling

- herramienta de lectura;
- escritura reversible;
- herramienta crítica;
- transcript parcial;
- transcript final;
- confidence low;
- Tool ID inventada;
- argumento prohibido;
- Product ID inventado;
- price inventado;
- authorization denied;
- confirmation;
- duplicate;
- Command UNKNOWN;
- response oficial;
- TTS failure.

## 26. Pruebas multi-tool

- dos lecturas;
- escritura + lectura;
- dependencia;
- fallo primer paso;
- fallo segundo paso;
- cancelación;
- interrupción;
- reconexión;
- idempotencia;
- orden.

## 27. Pruebas voz-texto

- texto a voz;
- voz a texto;
- durante respuesta;
- durante aclaración;
- durante confirmación;
- lista parcial;
- duplicate action;
- active channel conflict;
- context reconstruction;
- control humano.

## 28. Pruebas de reconexión

- pérdida en READY;
- pérdida en LISTENING;
- pérdida en PROCESSING;
- pérdida en RESPONDING;
- token expirado;
- nueva generation;
- generation stale;
- dos pestañas;
- backend restart;
- provider failover;
- context reconstruction;
- degrade to text;
- attempts exceeded;
- late events;
- orphan session.

## 29. Pruebas de seguridad

- token leak;
- replay;
- hijack;
- cross-tenant;
- cross-session;
- voice prompt injection;
- indirect audio injection;
- tool injection;
- role spoofing;
- price spoofing;
- secret request;
- audio replay;
- authorization scope;
- rate limit;
- denial of wallet;
- provider policy violation.

## 30. Pruebas de privacidad

- audio no persistido;
- transcript redactado;
- token no logueado;
- PII;
- eliminación;
- retención;
- región;
- proveedor;
- debug temporal;
- acceso;
- audit logs.

## 31. Pruebas de observabilidad

- IDs;
- spans;
- latencias;
- clocks;
- first audio;
- barge-in;
- reconnection;
- cost;
- sampling;
- high cardinality;
- backend caído;
- buffer;
- alertas;
- dashboards;
- no audio en logs.

## 32. Pruebas de rendimiento

Perfiles:

- una sesión;
- concurrencia baja;
- concurrencia media;
- pico;
- sesión larga;
- muchas sesiones cortas;
- audio continuo;
- reconexiones;
- provider degradation.

Medir:

- CPU;
- memoria;
- file descriptors;
- sockets;
- buffers;
- p50;
- p95;
- p99;
- throughput;
- drop rate;
- error rate;
- coste.

## 33. Pruebas de latencia

Objetivos:

- voice authorization;
- connection;
- VAD start;
- VAD end;
- transcription;
- intent;
- tool;
- TTS first audio;
- playback start;
- barge-in stop;
- reconnection.

Usar reloj monotónico.

## 34. Pruebas de caos

Inyectar:

- packet loss;
- jitter;
- disconnect;
- DNS failure;
- provider timeout;
- backend restart;
- cache failure;
- database latency;
- clock skew;
- audio corruption;
- event duplication;
- reorder;
- outbox delay.

## 35. Pruebas de compatibilidad

- Chrome;
- Firefox;
- Edge;
- Safari cuando aplique;
- Linux;
- Windows;
- Android;
- iOS;
- micrófonos;
- headset;
- altavoz;
- dispositivos Bluetooth;
- sample rates.

La matriz final depende del producto.

## 36. Pruebas de accesibilidad

- teclado;
- lector de pantalla;
- indicadores;
- botón stop;
- push-to-talk;
- texto alternativo;
- transcripción visible;
- fallback;
- consentimiento;
- errores comprensibles.

## 37. Pruebas multilingües

- es-CL;
- español neutro;
- inglés;
- mezcla;
- nombres;
- números;
- moneda;
- acento;
- velocidad;
- ruido.

## 38. Stubs

Debe existir:

- RealtimeProviderStub;
- TranscriptionStub;
- TTSStub;
- AudioTransportStub;
- VADStub;
- ClockStub;
- AuthorizationStub;
- ToolStub;
- ChannelStub.

Debe permitir configurar:

- latency;
- timeout;
- error;
- duplicate;
- gap;
- late event;
- invalid schema;
- partial;
- cancellation.

## 39. Simulador de audio

Debe poder:

- reproducir archivos;
- generar silencio;
- generar ruido;
- insertar gaps;
- variar velocidad;
- variar volumen;
- mezclar eco;
- simular interrupción;
- simular packet loss.

## 40. Evaluación de proveedor

Métricas:

- transcription accuracy;
- entity accuracy;
- first audio;
- total latency;
- cancellation latency;
- tool schema compliance;
- reconnection;
- language;
- noise robustness;
- privacy;
- cost.

## 41. Shadow testing

Un proveedor candidato puede recibir audio autorizado y minimizado.

Su salida:

- no se ejecuta;
- no se reproduce;
- se compara;
- se elimina según política.

## 42. Canary

Debe definir:

- porcentaje;
- usuarios;
- proveedor;
- rollback;
- métricas;
- duración;
- límites;
- alertas.

## 43. Criterios de bloqueo

Bloquear release si:

- API Key aparece en cliente;
- cross-tenant;
- Tool ejecución sin autorización;
- confirmación crítica insegura;
- replay válido;
- audio no se detiene;
- Command duplicado;
- fuga de PII;
- error crítico superior al umbral;
- regresión de latencia no aprobada.

## 44. Evidencia

Conservar:

- test run ID;
- commit;
- configuración;
- navegador;
- dispositivo;
- provider;
- model;
- dataset;
- hashes;
- métricas;
- logs redactados;
- traces;
- resultado;
- fallos.

## 45. Errores de testing

VOICE_TEST_DATASET_INVALID

VOICE_TEST_AUDIO_UNAVAILABLE

VOICE_TEST_ENVIRONMENT_UNAVAILABLE

VOICE_TEST_PROVIDER_UNAVAILABLE

VOICE_TEST_THRESHOLD_FAILED

VOICE_TEST_PRIVACY_VIOLATION

VOICE_TEST_EVIDENCE_INCOMPLETE

VOICE_TEST_NON_DETERMINISTIC_FAILURE

## 46. Criterios de aceptación

AC-VTEST-001

Todo requisito de voz posee prueba.

AC-VTEST-002

Toda FSM prueba transiciones prohibidas.

AC-VTEST-003

Toda Tool prueba autorización.

AC-VTEST-004

Toda acción prueba idempotencia.

AC-VTEST-005

Toda reconexión prueba generation stale.

AC-VTEST-006

Toda confirmación prueba audio parcial.

AC-VTEST-007

Todo proveedor prueba timeout.

AC-VTEST-008

Los datasets están versionados.

AC-VTEST-009

La privacidad se prueba.

AC-VTEST-010

La latencia se mide.

AC-VTEST-011

La seguridad se prueba adversarialmente.

AC-VTEST-012

La recuperación se prueba.

AC-VTEST-013

La accesibilidad se prueba.

AC-VTEST-014

La evidencia es reproducible.

AC-VTEST-015

Existen criterios de bloqueo.

## 47. Checklist

[ ] Unit tests.
[ ] Component tests.
[ ] Contract tests.
[ ] Integration tests.
[ ] E2E tests.
[ ] Audio datasets.
[ ] VAD tests.
[ ] Transcript tests.
[ ] TTS tests.
[ ] Playback tests.
[ ] Barge-in tests.
[ ] Tool Calling tests.
[ ] Context sync tests.
[ ] Reconnection tests.
[ ] Security tests.
[ ] Privacy tests.
[ ] Performance tests.
[ ] Chaos tests.
[ ] Compatibility tests.
[ ] Accessibility tests.
[ ] Evidence.
[ ] Canary.
[ ] Rollback.

======================================================================
FIN DEL DOCUMENTO
======================================================================
