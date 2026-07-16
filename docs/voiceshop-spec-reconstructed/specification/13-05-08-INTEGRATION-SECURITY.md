======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-05-08-INTEGRATION-SECURITY.md

# SEGURIDAD TRANSVERSAL DE INTEGRACIONES

## 1. Objetivo

Este documento define los controles de seguridad aplicables a todas las
integraciones externas de VoiceShop.

Debe proteger:

- secretos;
- tokens;
- certificados;
- tenant mappings;
- requests;
- responses;
- webhooks;
- archivos;
- streams;
- datos personales;
- pagos;
- operaciones;
- logs;
- dependencias;
- supply chain.

## 2. Alcance

Incluye:

- secret management;
- autenticación;
- autorización;
- mTLS;
- firmas;
- webhooks;
- replay;
- SSRF;
- egress;
- allowlists;
- schema validation;
- deserialización;
- archivos;
- malware;
- tenant isolation;
- PII;
- encryption;
- key rotation;
- audit;
- incident response;
- observability;
- QA.

No incluye:

- configuración física del proveedor cloud;
- certificación legal completa;
- implementación concreta de PKI;
- diseño detallado de IAM corporativo;
- código específico.

## 3. Principios

RULE-ISEC-001

Los secretos nunca se incluyen en código, prompts o frontend.

RULE-ISEC-002

Toda credencial tiene scope mínimo.

RULE-ISEC-003

Toda credencial expira o rota.

RULE-ISEC-004

Toda integración valida tenant.

RULE-ISEC-005

Todo input externo es no confiable.

RULE-ISEC-006

Todo webhook se autentica.

RULE-ISEC-007

Todo webhook se protege contra replay.

RULE-ISEC-008

Toda URL externa se valida.

RULE-ISEC-009

Todo archivo se valida y escanea.

RULE-ISEC-010

Los schemas se aplican estrictamente.

RULE-ISEC-011

Los datos sensibles se minimizan.

RULE-ISEC-012

Los logs se redactan.

RULE-ISEC-013

La autorización interna no se delega al proveedor.

RULE-ISEC-014

Los incidentes deben poder contenerse.

RULE-ISEC-015

Toda acción sensible es auditable.

## 4. Activos protegidos

- API Keys;
- OAuth client secrets;
- access tokens;
- refresh tokens;
- signing secrets;
- webhook secrets;
- private keys;
- certificates;
- payment references;
- tenant mappings;
- PII;
- order data;
- inventory data;
- provider metadata;
- audit records.

## 5. Secret Reference

Los contratos usan:

secret_reference_id

Nunca el valor.

El runtime resuelve el secreto mediante componente autorizado.

## 6. Secret states

PENDING

ACTIVE

ROTATING

REVOKED

EXPIRED

COMPROMISED

DESTROYED

## 7. Secret metadata

```json
{
  "secret_reference_id": "UUID",
  "provider_id": "PROVIDER-A",
  "tenant_scope": "UUID_OR_SHARED",
  "secret_type": "OAUTH_CLIENT_SECRET",
  "version": 4,
  "status": "ACTIVE",
  "issued_at": "UTC_TIMESTAMP",
  "expires_at": "UTC_TIMESTAMP_OR_NULL",
  "rotation_due_at": "UTC_TIMESTAMP"
}
```

## 8. Storage

Los secretos deben almacenarse en:

- secret manager;
- HSM cuando corresponda;
- encrypted store aprobado.

No en:

- repositorio;
- archivo .env compartido en producción;
- documentos;
- tickets;
- prompts;
- logs;
- screenshots.

## 9. Rotación

Debe soportar:

- nueva versión;
- periodo dual;
- activación;
- verificación;
- revocación anterior;
- rollback controlado;
- audit.

## 10. Autenticación de salida

Métodos permitidos según proveedor:

- API Key backend;
- OAuth;
- service account;
- mTLS;
- signed request;
- ephemeral token.

## 11. Autorización

VoiceShop decide:

- actor;
- tenant;
- operación;
- recurso;
- scopes;
- riesgo.

El adaptador recibe sólo la autorización necesaria.

## 12. OAuth

Debe proteger:

- state;
- PKCE cuando aplique;
- redirect URI;
- nonce;
- scopes;
- token storage;
- refresh token;
- revocation.

## 13. mTLS

Cuando aplique:

- validar CA;
- certificate pinning según política;
- expiration;
- rotation;
- hostname;
- revocation.

## 14. Request signing

Puede incluir:

- method;
- path;
- timestamp;
- nonce;
- body hash;
- key ID;
- signature.

## 15. Webhook validation

Debe verificar:

- signature;
- exact raw body cuando el esquema de firma lo requiera;
- timestamp;
- replay window;
- event ID;
- provider ID;
- endpoint;
- content type;
- size;
- schema.

## 16. Replay

Controles:

- event ID;
- timestamp;
- nonce;
- inbox;
- signature;
- retention;
- duplicate hash.

## 17. SSRF

Amenazas:

- URL enviada por Cliente;
- URL en webhook;
- image URL;
- callback URL;
- redirect;
- metadata endpoint.

Controles:

- allowlist;
- hostname resolution;
- IP range blocking;
- no redirects o redirects validados;
- protocol allowlist;
- port allowlist;
- DNS rebinding defense;
- egress proxy.

## 18. Egress policy

Debe declarar:

- dominios;
- regiones;
- protocolos;
- puertos;
- operations;
- provider.

No permitir egress arbitrario desde LLM output.

## 19. Open redirects

Return URLs deben:

- generarse en backend;
- usar allowlist;
- firmarse;
- expirar;
- vincular Session/Payment.

## 20. Schema validation

Aplicar a:

- requests;
- responses;
- webhooks;
- events;
- files;
- tool proposals;
- provider errors.

Preferir:

- required fields;
- reject unknown;
- max lengths;
- enums;
- numeric ranges;
- nested depth;
- size limits.

## 21. Deserialización

No usar formatos inseguros sin aislamiento.

Evitar:

- ejecución de objetos;
- eval;
- pickle externo;
- YAML inseguro;
- XML entities sin protección.

## 22. Content types

Aceptar sólo allowlist.

No confiar en extensión.

Validar MIME real.

## 23. Archivos

Controles:

- size;
- checksum;
- encryption;
- malware scan;
- sandbox;
- schema;
- row limits;
- compressed bomb detection;
- retention;
- tenant.

## 24. Zip bombs

Controlar:

- compressed size;
- uncompressed size;
- file count;
- nesting;
- ratio;
- extraction path.

## 25. Path traversal

Al extraer:

- normalizar;
- impedir ../;
- impedir absolute paths;
- impedir symlinks no autorizados;
- usar storage aislado.

## 26. Prompt injection externa

Contenido de ERP, CRM, email, web o documentos se trata como datos.

No puede:

- cambiar System Policy;
- ampliar tools;
- acceder a secretos;
- aprobar pagos;
- modificar roles.

## 27. Cross-tenant

Validar tenant en:

- credentials;
- mappings;
- requests;
- webhooks;
- external references;
- cache;
- files;
- events;
- logs;
- reconciliation.

## 28. External reference enumeration

Las referencias externas deben ser opacas.

Aplicar rate limits.

No revelar si pertenecen a otro tenant.

## 29. Data minimization

Antes de enviar:

- seleccionar campos;
- redactar;
- tokenizar;
- usar referencias;
- reducir historial;
- limitar metadata.

## 30. Encryption

In transit:

TLS obligatorio.

At rest:

según clasificación.

Field encryption:

para secretos y datos altamente sensibles.

## 31. Data residency

La selección del proveedor debe respetar:

- región;
- tenant policy;
- tipo de dato;
- contrato;
- regulación.

## 32. Retention

Cada integración declara:

- request retention;
- response retention;
- webhook retention;
- file retention;
- audit retention;
- deletion process.

## 33. Logging

No registrar:

- Authorization header;
- cookies;
- tokens;
- signatures;
- raw payment payload;
- card data;
- refresh tokens;
- private keys;
- full webhook bodies con PII.

## 34. Trace redaction

Spans sólo contienen:

- provider class;
- operation;
- status;
- duration;
- error code;
- references protegidas.

## 35. Rate limiting

Proteger:

- webhook endpoint;
- token issuance;
- status query;
- file upload;
- callback;
- reconciliation;
- provider operations.

## 36. Abuse protection

Detectar:

- credential stuffing;
- webhook flood;
- enumeration;
- attachment abuse;
- retry abuse;
- idempotency abuse;
- cost abuse;
- provider misuse.

## 37. Supply chain

Controles:

- dependency pinning;
- signatures;
- SBOM;
- vulnerability scan;
- approved SDKs;
- update policy;
- rollback;
- integrity.

## 38. Provider compromise

Acciones:

- revoke secret;
- disable adapter;
- open circuit;
- block egress;
- activate fallback;
- preserve evidence;
- notify owner;
- reconcile operations.

## 39. Incident types

INTEGRATION_SECRET_LEAK

INTEGRATION_WEBHOOK_SPOOF

INTEGRATION_REPLAY

INTEGRATION_SSRF_ATTEMPT

INTEGRATION_CROSS_TENANT_ATTEMPT

INTEGRATION_MALICIOUS_FILE

INTEGRATION_SCHEMA_ATTACK

INTEGRATION_PROVIDER_COMPROMISE

INTEGRATION_PAYMENT_DATA_EXPOSURE

INTEGRATION_SUPPLY_CHAIN_ALERT

## 40. Incident actions

BLOCK_REQUEST

REVOKE_CREDENTIAL

ROTATE_SECRET

DISABLE_PROVIDER

OPEN_CIRCUIT

REQUIRE_REAUTHENTICATION

QUARANTINE_FILE

DEGRADE_SERVICE

FAILOVER

RECONCILE

ALERT

AUDIT

## 41. Fail secure

Si falla:

- authentication;
- signature;
- tenant;
- schema;
- authorization;
- secret resolution;

no continuar.

## 42. Pseudocódigo de webhook

```text
function validate_external_webhook(raw_request, provider_policy):

    validate_endpoint(raw_request.path, provider_policy)
    validate_method(raw_request.method, provider_policy)
    validate_content_type(raw_request.content_type, provider_policy)
    validate_body_size(raw_request.body, provider_policy.maximum_size)

    signature = extract_provider_signature(raw_request)
    timestamp = extract_provider_timestamp(raw_request)

    validate_timestamp_window(timestamp, provider_policy.replay_window)
    validate_signature(
        raw_body=raw_request.body,
        signature=signature,
        secret_reference=provider_policy.webhook_secret_reference
    )

    event = parse_strict_schema(
        raw_request.body,
        provider_policy.webhook_schema
    )

    validate_provider_event_id(event.id)
    validate_tenant_mapping(event)
    enforce_webhook_rate_limit(provider_policy.provider_id)

    return event
```

## 43. Errores

INTEGRATION_SECRET_NOT_FOUND

INTEGRATION_SECRET_EXPIRED

INTEGRATION_SECRET_COMPROMISED

INTEGRATION_AUTHENTICATION_FAILED

INTEGRATION_AUTHORIZATION_DENIED

INTEGRATION_SIGNATURE_INVALID

INTEGRATION_REPLAY_DETECTED

INTEGRATION_TENANT_MISMATCH

INTEGRATION_CROSS_TENANT_ATTEMPT

INTEGRATION_SSRF_BLOCKED

INTEGRATION_REDIRECT_BLOCKED

INTEGRATION_SCHEMA_REJECTED

INTEGRATION_CONTENT_TYPE_REJECTED

INTEGRATION_FILE_REJECTED

INTEGRATION_MALWARE_DETECTED

INTEGRATION_RATE_LIMITED

INTEGRATION_DATA_RESIDENCY_DENIED

INTEGRATION_PROVIDER_DISABLED

## 44. Eventos

IntegrationSecretResolved

IntegrationSecretRotated

IntegrationSecretRevoked

IntegrationAuthenticationFailed

IntegrationSignatureRejected

IntegrationReplayDetected

IntegrationSSRFBlocked

IntegrationCrossTenantAttemptDetected

IntegrationMaliciousFileDetected

IntegrationProviderDisabledForSecurity

IntegrationSecurityIncidentOpened

IntegrationSecurityIncidentResolved

## 45. Observabilidad

Métricas:

- integration_secret_resolution_total;
- integration_authentication_failure_total;
- integration_signature_failure_total;
- integration_replay_total;
- integration_ssrf_block_total;
- integration_cross_tenant_total;
- integration_schema_rejection_total;
- integration_file_rejection_total;
- integration_malware_total;
- integration_rate_limit_total;
- integration_security_incidents_total;
- integration_provider_disabled_total.

Dimensiones:

- provider_class;
- operation;
- security_signal;
- severity;
- result;
- error_code;
- region;
- tenant_tier.

## 46. Auditoría

Registrar:

- provider;
- operation;
- tenant;
- actor/service;
- secret reference ID;
- secret version;
- security decision;
- policy version;
- incident;
- action;
- Correlation ID.

No registrar el secreto.

## 47. Casos límite

- secret expired;
- dual rotation;
- webhook raw body modified;
- timestamp old;
- duplicate event;
- DNS rebinding;
- redirect to private IP;
- malicious ZIP;
- path traversal;
- unknown fields;
- huge nested JSON;
- cross-tenant mapping;
- PII in logs;
- provider compromise;
- supply-chain vulnerability;
- telemetry unavailable;
- failover after compromise.

## 48. Criterios de aceptación

AC-ISEC-001

Los secretos no aparecen en código ni frontend.

AC-ISEC-002

Las credenciales tienen mínimo scope.

AC-ISEC-003

Las credenciales rotan.

AC-ISEC-004

Todo acceso valida tenant.

AC-ISEC-005

Todo input externo es no confiable.

AC-ISEC-006

Los webhooks se autentican.

AC-ISEC-007

Se bloquea replay.

AC-ISEC-008

Las URLs se validan.

AC-ISEC-009

Los archivos se escanean.

AC-ISEC-010

Los schemas son estrictos.

AC-ISEC-011

Los datos se minimizan.

AC-ISEC-012

Los logs se redactan.

AC-ISEC-013

La autorización permanece interna.

AC-ISEC-014

Los incidentes pueden contenerse.

AC-ISEC-015

Toda acción sensible es auditable.

## 49. Plan mínimo de pruebas

- secret storage;
- rotation;
- revocation;
- API key;
- OAuth;
- mTLS;
- signing;
- webhook;
- raw body;
- replay;
- SSRF;
- DNS rebinding;
- redirects;
- schemas;
- deserialization;
- files;
- malware;
- zip bomb;
- traversal;
- prompt injection;
- tenant;
- enumeration;
- encryption;
- residency;
- logging;
- rate limit;
- supply chain;
- compromise;
- incident;
- metrics;
- audit.

## 50. Checklist

[ ] Existe Secret Manager.
[ ] Existen Secret References.
[ ] Existe rotación.
[ ] Existe revocación.
[ ] Existe authentication policy.
[ ] Existe authorization policy.
[ ] Se validan webhooks.
[ ] Se controla replay.
[ ] Se controla SSRF.
[ ] Existe egress allowlist.
[ ] Se validan schemas.
[ ] Se validan content types.
[ ] Se escanean archivos.
[ ] Se controla zip bomb.
[ ] Se controla traversal.
[ ] Se aísla tenant.
[ ] Se minimizan datos.
[ ] Se redactan logs.
[ ] Existe incident response.
[ ] Existen pruebas adversariales.

======================================================================
FIN DEL DOCUMENTO
======================================================================
