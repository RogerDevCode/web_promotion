======================================================================
Proyecto      : VoiceShop Framework
Versión       : 1.0
Estado        : DRAFT
Fecha         : 2026-07-16
Clasificación : FUNCTIONAL SPECIFICATION
Idioma        : Español
======================================================================

Documento : 13-01-02-NORMALIZATION.md

# NORMALIZACIÓN DE ENTRADAS

## 1. Objetivo

Este documento define cómo VoiceShop transforma una entrada textual
válida en una representación canónica adecuada para detección de
intención, extracción de entidades, búsqueda y auditoría.

Normalizar no significa interpretar.

Normalizar no significa corregir libremente lo escrito.

Normalizar no significa sustituir la expresión del Cliente por una
respuesta inventada.

La normalización debe preservar la trazabilidad entre:

- texto original;
- texto sanitizado;
- texto normalizado;
- tokens o segmentos relevantes;
- transformaciones aplicadas.

## 2. Alcance

Incluye:

- Unicode;
- codificación;
- saltos de línea;
- espacios;
- caracteres de control;
- mayúsculas y minúsculas;
- puntuación;
- emojis;
- números;
- cantidades;
- separadores decimales;
- monedas;
- abreviaturas permitidas;
- ruido de transcripción;
- enlaces;
- menciones;
- referencias de productos;
- detección de contenido vacío;
- preservación del original;
- mapa de transformaciones.

No incluye:

- clasificación de intención;
- extracción definitiva de Product ID;
- búsqueda de catálogo;
- corrección semántica;
- traducción automática;
- aplicación de reglas de negocio;
- ejecución de herramientas.

## 3. Principios

RULE-NORM-001

El texto original nunca se sobrescribe.

RULE-NORM-002

Toda transformación debe ser reproducible.

RULE-NORM-003

Toda transformación relevante debe poder explicarse.

RULE-NORM-004

La normalización debe ser determinística para la misma versión de reglas.

RULE-NORM-005

La normalización no debe inventar palabras.

RULE-NORM-006

La normalización no debe cambiar una negación.

RULE-NORM-007

La normalización no debe cambiar cantidades sin evidencia.

RULE-NORM-008

La normalización no debe convertir una expresión ambigua en una decisión.

RULE-NORM-009

Las correcciones probabilísticas deben quedar separadas de la
normalización determinística.

RULE-NORM-010

La normalización debe ser independiente del proveedor LLM.

## 4. Contrato de entrada

Entrada:

```json
{
  "input_id": "UUID",
  "turn_id": "UUID",
  "session_id": "UUID",
  "tenant_id": "UUID",
  "language_hint": "es-CL",
  "input_type": "TEXT_MESSAGE",
  "payload": {
    "text": "  Quiero  6  CERVEZAS!!! "
  },
  "metadata": {
    "channel": "WEB",
    "is_voice_transcript": false
  }
}
```

## 5. Contrato de salida

Salida:

```json
{
  "input_id": "UUID",
  "normalization_version": 1,
  "original_text": "  Quiero  6  CERVEZAS!!! ",
  "sanitized_text": "Quiero 6 CERVEZAS!!!",
  "normalized_text": "quiero 6 cervezas!!!",
  "search_text": "quiero 6 cervezas",
  "language": "es-CL",
  "is_empty": false,
  "transformations": [
    {
      "type": "TRIM_OUTER_WHITESPACE"
    },
    {
      "type": "COLLAPSE_WHITESPACE"
    },
    {
      "type": "CASE_FOLD"
    }
  ],
  "signals": {
    "contains_url": false,
    "contains_email": false,
    "contains_phone": false,
    "contains_currency": false,
    "contains_emoji": false,
    "possible_quantity_tokens": [
      "6"
    ]
  }
}
```

## 6. Representaciones

### 6.1 original_text

Contenido recibido, conservado conforme a la política de datos.

### 6.2 sanitized_text

Contenido seguro para almacenamiento y procesamiento básico.

Se eliminan o neutralizan:

- caracteres de control no permitidos;
- bytes inválidos;
- secuencias de escape peligrosas para el contexto de presentación;
- delimitadores técnicos no autorizados.

No se elimina contenido semántico válido.

### 6.3 normalized_text

Texto canónico para análisis lingüístico.

Puede aplicar:

- normalización Unicode;
- espacios;
- case folding;
- estandarización de saltos;
- estandarización de ciertos separadores.

### 6.4 search_text

Representación auxiliar para búsqueda.

Puede eliminar puntuación no semántica, pero nunca sustituye a
normalized_text.

### 6.5 display_text

Representación opcional segura para mostrar al Operador.

Nunca debe reutilizarse como HTML sin escaping del canal.

## 7. Pipeline obligatorio

Orden recomendado:

1. validar existencia del texto;
2. decodificar Unicode;
3. reemplazar secuencias inválidas conforme a política;
4. normalizar forma Unicode;
5. eliminar BOM;
6. controlar caracteres de control;
7. normalizar saltos de línea;
8. trim exterior;
9. colapsar espacios permitidos;
10. detectar texto vacío;
11. aplicar case folding para representación analítica;
12. preservar unidades, números y negaciones;
13. detectar señales;
14. producir search_text;
15. registrar transformaciones;
16. verificar límite posterior a normalización;
17. persistir resultado.

## 8. Unicode

Forma recomendada inicial:

NFKC para la representación analítica cuando se haya validado que no
rompe identificadores relevantes.

Debe conservarse original_text para evitar pérdida.

Casos:

- caracteres de ancho completo;
- ligaduras;
- acentos combinados;
- emojis con variation selectors;
- caracteres visualmente similares;
- espacios Unicode;
- guiones Unicode;
- comillas tipográficas.

No se debe usar normalización Unicode para:

- decidir identidad;
- validar firmas;
- comparar secretos;
- validar hashes;
- reconstruir el cuerpo firmado del webhook.

## 9. Espacios

Se consideran espacios normalizables:

- espacio ASCII;
- tabulación, cuando el tipo de entrada sea texto libre;
- espacios Unicode permitidos;
- secuencias repetidas.

Reglas:

- trim al inicio y final;
- colapsar múltiples espacios internos a uno;
- conservar saltos significativos cuando la entrada sea formulario o
  dirección multilínea;
- no unir palabras separadas;
- no eliminar espacios dentro de identificadores estructurados sin una
  regla específica.

Ejemplo:

Original:

"  quiero   dos   vinos  "

Normalizado:

"quiero dos vinos"

## 10. Saltos de línea

Convertir CRLF y CR a LF.

Política:

- texto conversacional corto: múltiples saltos pueden reducirse;
- dirección o formulario: conservar estructura;
- bloques técnicos: conservar sólo si el flujo los permite;
- secuencias excesivas: limitar.

## 11. Mayúsculas y minúsculas

Usar case folding para análisis.

No modificar original_text.

Ejemplos equivalentes para intención:

- "CERVEZA"
- "Cerveza"
- "cerveza"

No deben asumirse equivalentes en:

- códigos sensibles;
- cupones case-sensitive;
- contraseñas;
- identificadores externos;
- tokens.

## 12. Puntuación

La puntuación puede contener significado.

Ejemplos:

- interrogación;
- negación enfática;
- decimales;
- rangos;
- direcciones;
- nombres de productos;
- códigos.

Se puede producir search_text sin puntuación redundante, pero
normalized_text debe conservar la puntuación útil.

Ejemplo:

Original:

"¿Tienen Coca-Cola 1.5 L?"

normalized_text:

"¿tienen coca-cola 1.5 l?"

search_text:

"tienen coca cola 1.5 l"

## 13. Números y cantidades

No convertir automáticamente todas las palabras numéricas a cifras en la
representación principal.

Se pueden generar señales auxiliares:

```json
{
  "surface": "seis",
  "candidate_numeric_value": 6,
  "confidence": 1.0,
  "source": "DETERMINISTIC_NUMBER_LEXICON"
}
```

Casos ambiguos:

- "un par";
- "media docena";
- "dos y medio";
- "uno de seis";
- "6x";
- "2 packs";
- "1.5 litros";
- "mil";
- "1,000";
- "1.000".

La interpretación final corresponde a entity extraction y slot filling.

## 14. Separadores decimales y miles

La configuración regional es obligatoria.

Para es-CL:

- coma puede representar decimal;
- punto puede representar miles;
- pero los usuarios pueden escribir formatos internacionales.

No modificar el valor hasta evaluar contexto.

Ejemplos:

"1,5 litros"

Candidato decimal:

1.5

"1.500 pesos"

Candidato entero:

1500

"1.500 ml"

Candidato entero:

1500

Toda conversión debe conservar:

- surface form;
- valor candidato;
- locale usado;
- confianza;
- ambigüedad.

## 15. Monedas

Detectar señales como:

- $;
- CLP;
- pesos;
- USD;
- dólares;
- EUR;
- euros.

No asumir moneda sólo por el símbolo `$` sin contexto de tenant.

Ejemplo:

El tenant opera en Chile.

"$10.000" puede producir:

```json
{
  "amount_candidate": 10000,
  "currency_candidate": "CLP",
  "currency_source": "TENANT_DEFAULT",
  "requires_confirmation": false
}
```

Pero esta señal no constituye un precio oficial.

## 16. Unidades

Unidades posibles:

- ml;
- l;
- cc;
- kg;
- g;
- unidades;
- packs;
- cajas;
- botellas;
- latas.

Se pueden estandarizar alias en un campo auxiliar.

Ejemplo:

"1 lt"

Candidato:

```json
{
  "value": 1,
  "unit": "LITER",
  "surface": "1 lt"
}
```

No reemplazar nombres comerciales que incluyan la unidad.

## 17. Abreviaturas

El diccionario de abreviaturas debe ser versionado por tenant o dominio.

Ejemplos posibles:

- "promo" → "promoción";
- "dcto" → "descuento";
- "bot" → ambiguo, no expandir sin contexto;
- "cc" → centímetro cúbico o copia, depende del dominio.

Las expansiones automáticas sólo se permiten cuando:

- la abreviatura es inequívoca en el dominio;
- existe una regla aprobada;
- se conserva la forma original;
- se registra la transformación.

## 18. Errores ortográficos

La normalización determinística no debe corregir errores de manera
agresiva.

Se pueden generar candidatos posteriores:

"serbeza"

Candidato:

"cerveza"

Fuente:

FUZZY_DOMAIN_LEXICON

Esto debe pasar al módulo de entidades o búsqueda, no modificar
silenciosamente normalized_text.

## 19. Ruido de transcripción de voz

Señales comunes:

- repeticiones;
- muletillas;
- palabras truncadas;
- autocorrecciones;
- falsos comienzos;
- ruido indicado por el proveedor;
- ausencia de puntuación.

Ejemplo:

"quiero eh seis no mejor cuatro cervezas"

No debe normalizarse a "quiero seis cervezas".

Debe conservarse la autocorrección.

El análisis posterior puede inferir cantidad final cuatro, pero la
normalización sólo prepara la estructura.

Se puede producir:

```json
{
  "self_correction_detected": true,
  "segments": [
    "quiero",
    "eh",
    "seis",
    "no mejor",
    "cuatro cervezas"
  ]
}
```

## 20. Emojis

Los emojis pueden aportar intención.

Ejemplos:

- 👍 confirmación potencial;
- ❌ rechazo potencial;
- 🍺 producto o categoría;
- 😡 frustración;
- 😂 tono.

No convertir automáticamente 👍 en confirmación irreversible.

Debe producirse una señal:

```json
{
  "emoji": "👍",
  "candidate_meaning": "AFFIRMATIVE",
  "requires_context": true
}
```

## 21. URLs

Detectar y clasificar:

- http;
- https;
- dominios sin esquema;
- enlaces acortados;
- enlaces internos;
- deep links.

No abrir automáticamente.

No incorporar contenido remoto al prompt sin un flujo autorizado.

Señales:

- contains_url;
- url_count;
- url_hosts;
- shortened_url_detected.

## 22. Correos electrónicos y teléfonos

Detectar para clasificación de datos.

No alterar innecesariamente.

Se puede producir versión enmascarada para logs:

- correo: `r***@example.com`;
- teléfono: `+56******123`.

La versión completa sólo debe conservarse donde sea necesaria.

## 23. HTML y markup

El texto del Cliente debe tratarse como texto.

Nunca renderizar HTML sin escaping.

La normalización puede:

- detectar etiquetas;
- marcar contenido;
- neutralizar caracteres peligrosos para una representación concreta.

No debe destruir expresiones legítimas como:

"< 10.000 pesos"

## 24. Secuencias técnicas

Detectar:

- bloques de código;
- JSON;
- XML;
- SQL;
- prompts;
- tokens aparentes;
- credenciales aparentes.

La detección no implica rechazo automático.

La política depende del canal y caso de uso.

Nunca ejecutar contenido técnico.

## 25. Prompt injection

La normalización no es el control principal contra prompt injection.

Debe:

- conservar la entrada como contenido de usuario;
- detectar indicadores;
- etiquetar;
- no mezclar con instrucciones del sistema;
- no eliminar el ataque de forma que se pierda evidencia.

Ejemplo de señal:

```json
{
  "prompt_injection_signals": [
    "IGNORE_PREVIOUS_INSTRUCTIONS",
    "REQUEST_SYSTEM_PROMPT"
  ]
}
```

## 26. Texto vacío

Una entrada se considera vacía cuando, después de:

- normalizar Unicode;
- eliminar BOM;
- retirar caracteres de control no significativos;
- trim;
- evaluar espacios;
- evaluar contenido invisible;

no quedan símbolos procesables.

Los emojis pueden contar como contenido.

Un archivo o callback puede ser válido sin texto.

## 27. Mapa de transformaciones

Cada transformación debe registrar:

- tipo;
- versión;
- rango de origen cuando sea posible;
- valor anterior opcional;
- valor nuevo opcional;
- motivo.

Ejemplo:

```json
{
  "type": "COLLAPSE_WHITESPACE",
  "source_range": [7, 11],
  "before": "    ",
  "after": " ",
  "rule_version": 1
}
```

No es obligatorio guardar valores completos cuando puedan contener
información sensible.

## 28. Versionado

Toda salida debe indicar normalization_version.

Un cambio que pueda modificar el resultado debe incrementar la versión.

Ejemplos:

- cambio de forma Unicode;
- nuevo diccionario de abreviaturas;
- nueva política de puntuación;
- nueva detección de unidades;
- cambio de locale.

Las conversaciones históricas deben poder indicar con qué versión se
normalizaron.

## 29. Flujo principal

1. Recibir Canonical Input.
2. Obtener original_text.
3. Validar que el tipo admita texto.
4. Decodificar.
5. Aplicar normalización Unicode.
6. eliminar BOM.
7. procesar controles.
8. normalizar saltos.
9. trim.
10. colapsar espacios según tipo.
11. calcular sanitized_text.
12. generar normalized_text.
13. generar search_text.
14. detectar señales.
15. evaluar vacío.
16. evaluar tamaño final.
17. registrar transformaciones.
18. persistir NormalizationCompleted.
19. enviar a detección de intención.

## 30. Pseudocódigo funcional

```text
function normalize_input(canonical_input):

    original = canonical_input.payload.text

    decoded = decode_unicode(original)
    unicode_normalized = normalize_unicode(decoded, configured_form)
    without_bom = remove_bom(unicode_normalized)
    safe_controls = handle_control_characters(without_bom)
    normalized_lines = normalize_line_endings(safe_controls)
    trimmed = trim_outer_whitespace(normalized_lines)

    if input_requires_multiline(canonical_input):
        spaced = normalize_multiline_spacing(trimmed)
    else:
        spaced = collapse_internal_whitespace(trimmed)

    sanitized = sanitize_for_storage(spaced)
    normalized = case_fold_for_analysis(sanitized, locale)
    search_text = build_search_representation(normalized)

    signals = detect_signals(
        normalized,
        locale,
        tenant_dictionary
    )

    is_empty = evaluate_semantic_emptiness(
        normalized,
        canonical_input.input_type
    )

    if is_empty:
        reject(INPUT_EMPTY_AFTER_NORMALIZATION)

    if exceeds_post_normalization_limit(normalized):
        reject(INPUT_TOO_LARGE_AFTER_NORMALIZATION)

    result = NormalizedInput(
        original_text=original,
        sanitized_text=sanitized,
        normalized_text=normalized,
        search_text=search_text,
        transformations=transformation_log,
        signals=signals,
        normalization_version=current_version
    )

    persist_result_and_event(result, InputNormalized)
    return result
```

## 31. Errores

NORMALIZATION_INPUT_TYPE_INVALID

El tipo no admite normalización textual.

NORMALIZATION_UNICODE_ERROR

No se pudo procesar Unicode conforme a política.

INPUT_EMPTY_AFTER_NORMALIZATION

No queda contenido procesable.

INPUT_TOO_LARGE_AFTER_NORMALIZATION

La representación final excede el límite.

NORMALIZATION_RULESET_UNAVAILABLE

No se pudo cargar la versión de reglas.

LOCALE_UNSUPPORTED

Locale no soportado.

NORMALIZATION_STORAGE_FAILED

No se pudo persistir.

## 32. Eventos

InputNormalizationStarted

InputNormalized

InputNormalizationRejected

PromptInjectionSignalDetected

SensitiveDataSignalDetected

URLDetected

SelfCorrectionSignalDetected

Payload recomendado de InputNormalized:

```json
{
  "event_id": "UUID",
  "event_version": 1,
  "input_id": "UUID",
  "turn_id": "UUID",
  "normalization_version": 1,
  "language": "es-CL",
  "is_empty": false,
  "signal_types": [
    "POSSIBLE_QUANTITY"
  ],
  "correlation_id": "UUID"
}
```

## 33. Seguridad y privacidad

- no registrar texto completo en logs operativos;
- separar auditoría de observabilidad;
- enmascarar correos y teléfonos;
- no incluir secretos detectados en trazas;
- no usar search_text como contenido seguro para HTML;
- no abrir URLs;
- no ejecutar código;
- no usar normalización como autorización;
- no usar Unicode normalizado para validar firmas.

## 34. Observabilidad

Métricas:

- normalization_requests_total;
- normalization_rejections_total;
- normalization_duration_seconds;
- empty_after_normalization_total;
- unicode_error_total;
- prompt_injection_signal_total;
- sensitive_data_signal_total;
- normalized_length_chars;
- transformation_count.

Dimensiones:

- input_type;
- locale;
- normalization_version;
- result;
- error_code.

## 35. Casos límite

- texto compuesto sólo por zero-width spaces;
- caracteres RTL;
- homoglyphs;
- emoji con selector;
- acentos combinados;
- números con coma;
- cantidades escritas en palabras;
- dirección multilínea;
- producto con guion;
- código de cupón case-sensitive;
- texto con HTML;
- JSON válido;
- bloque de código;
- transcripción con autocorrección;
- URL acortada;
- correo y teléfono juntos;
- mensaje con 3.999 caracteres que crece bajo NFKC;
- palabra en otro idioma;
- mezcla de español e inglés;
- producto llamado "NO";
- negación repetida;
- símbolo monetario ambiguo;
- "1.000" como precio o volumen;
- caracteres invisibles entre letras.

## 36. Criterios de aceptación

AC-NORM-001

El original nunca se sobrescribe.

AC-NORM-002

La misma entrada y versión producen la misma salida.

AC-NORM-003

Una negación no se elimina.

AC-NORM-004

Una cantidad no se cambia silenciosamente.

AC-NORM-005

La puntuación útil se conserva en normalized_text.

AC-NORM-006

search_text no sustituye normalized_text.

AC-NORM-007

Una entrada invisible se rechaza.

AC-NORM-008

Las transformaciones quedan registradas.

AC-NORM-009

El resultado incluye versión.

AC-NORM-010

La normalización no invoca una LLM.

AC-NORM-011

Los datos sensibles no aparecen completos en logs.

AC-NORM-012

Una autocorrección de voz no se resuelve de forma destructiva.

AC-NORM-013

Las URLs no se abren.

AC-NORM-014

El HTML se trata como texto.

AC-NORM-015

Las señales no se consideran hechos comerciales.

## 37. Plan mínimo de pruebas

TEST-NORM-001

Trim exterior.

TEST-NORM-002

Colapso de espacios.

TEST-NORM-003

CRLF a LF.

TEST-NORM-004

Unicode compuesto y descompuesto.

TEST-NORM-005

Zero-width spaces.

TEST-NORM-006

Texto sólo con control characters.

TEST-NORM-007

Puntuación útil.

TEST-NORM-008

Negación.

TEST-NORM-009

Cantidad en cifra.

TEST-NORM-010

Cantidad en palabra.

TEST-NORM-011

Decimal es-CL.

TEST-NORM-012

Miles es-CL.

TEST-NORM-013

Moneda ambigua.

TEST-NORM-014

Emoji.

TEST-NORM-015

URL.

TEST-NORM-016

Correo.

TEST-NORM-017

Teléfono.

TEST-NORM-018

HTML.

TEST-NORM-019

Prompt injection señalizada.

TEST-NORM-020

Transcripción con autocorrección.

TEST-NORM-021

Código case-sensitive.

TEST-NORM-022

Tamaño posterior a normalización.

TEST-NORM-023

Reproducibilidad por versión.

TEST-NORM-024

Mapeo de transformaciones.

TEST-NORM-025

Logs sin datos sensibles.

## 38. Checklist

[ ] Se conserva original_text.
[ ] Existe sanitized_text.
[ ] Existe normalized_text.
[ ] Existe search_text.
[ ] Existe versión.
[ ] Se normaliza Unicode.
[ ] Se manejan controles.
[ ] Se manejan saltos.
[ ] Se manejan espacios.
[ ] Se preservan negaciones.
[ ] Se preservan cantidades.
[ ] Se detectan señales.
[ ] Se detecta vacío.
[ ] Se valida tamaño final.
[ ] Se registran transformaciones.
[ ] No se invoca LLM.
[ ] No se ejecuta código.
[ ] No se abren URLs.
[ ] Se protege información sensible.
[ ] Existen pruebas determinísticas.

======================================================================
FIN DEL DOCUMENTO
======================================================================
