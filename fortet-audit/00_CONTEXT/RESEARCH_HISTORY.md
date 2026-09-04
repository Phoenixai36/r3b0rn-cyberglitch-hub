# RESEARCH_HISTORY — Historia de investigación

## Propósito
Reconstruir cómo evolucionó la investigación Fortet/Nona, qué observaciones fueron originales, qué experimentos se intentaron, qué hipótesis aparecieron y qué controles metodológicos se introdujeron después. Este archivo es memoria de investigación, no evidencia primaria.

## 1. Corpus inicial y problema
El núcleo del trabajo reúne la obra *Logaritmos* de Antonio Fortet Pascual, su Fe de Erratas, el material denominado Nona / Parto Aritmético y el corpus narrativo “BUSCANDO A NESSIE”. Desde el principio fue necesario separar material histórico de interpretaciones familiares y de reconstrucciones realizadas por IA.

## 2. La tabla de logaritmos
Se estableció que el problema computacional puede representarse como 10.000 entradas × 20 cifras decimales = 200.000 dígitos. La reconstrucción matemática de log10(n) permite crear un dataset de referencia, pero no equivale automáticamente a la página histórica impresa.

## 3. Verificación local 22–30
Se cotejaron las filas 22–30 y se comprobó que sus grupos de cinco cifras corresponden a log10(n) redondeado a 20 decimales. Esta prueba sirve como control de reconstrucción, no como prueba de un mensaje oculto.

## 4. Fe de Erratas
La Fe de Erratas se convirtió en una fuente primaria clave. Se identificaron 13 entradas de corrección. La observación decisiva fue que la nota final “Para mayor exactitud...” contiene siete números y debe analizarse por separado: no debe mezclarse automáticamente con las 13 erratas.

## 5. Ditto marks
La lectura detallada de la tipografía reveló que las comillas/dittos heredan texto de líneas anteriores. En particular, la transición alrededor de 1450/4504 y el grupo de 8181/8474/8987 debe modelarse como una estructura editorial. Una repetición visual de comillas no es por sí misma una secuencia numérica.

## 6. Reconstrucción 10.000×20
Se propuso disponer los 200.000 dígitos en una matriz. La matriz permite estudiar trayectorias por filas, columnas y diagonales. La lectura diagonal no debe confundirse con una propiedad de la tabla original: es una transformación analítica creada para la investigación.

## 7. P0/P1/P2
Se plantearon P0 row-major, P1 diagonal y P2 diagonal/zig-zag. La intención es que las transformaciones estén definidas antes de observar resultados de targets especiales. Cualquier transformación adicional debe justificarse por una propiedad independiente del resultado.

## 8. Fase 1–2–3
Una regla modular sencilla de fase 1–2–3 produce patrones diagonales. Es una propiedad matemática del esquema experimental. No existe, a partir de esta observación por sí sola, evidencia suficiente para atribuir la regla a Fortet.

## 9. Nona
La investigación fue desplazándose hacia la Nona porque podía contener información estructural sobre cómo leer o disponer los datos. El problema principal pasó a ser reconstruirla literalmente antes de interpretarla. Las imágenes de IA y las visualizaciones modernas deben permanecer separadas del objeto/documento original.

## 10. Números especiales
Durante el trabajo aparecieron 8181, 618, 1618 y otros números como posibles targets. Se reconoció el riesgo de seleccionar una transformación porque produce un target atractivo. Por ello los targets deben quedar fuera del proceso de descubrimiento cuando se haga una validación ciega.

## 11. Hipótesis astronómica
Capella/Auriga apareció como posible interpretación. La metodología posterior exige que una relación astronómica sólo se evalúe después de congelar la transformación y definir un conjunto de controles. No se acepta una correspondencia visual como prueba.

## 12. Giro metodológico
La investigación dejó de tratarse como búsqueda libre de patrones y pasó a un pipeline falsable: fuentes primarias, datos canónicos, transformaciones registradas, modelos nulos, discovery/validation, seeds, hashes, tests y auditoría adversarial.

## 13. Qué se debilitó o descartó
- 20 decimales como evidencia autónoma de código oculto.
- Ditto marks interpretados como código sin reconstrucción tipográfica.
- 8181 como target privilegiado sin justificación independiente.
- Cualquier resultado obtenido ajustando parámetros después de verlo.
- Cualquier visualización de IA considerada fuente histórica.

## 14. Qué permanece abierto
- Reconstrucción literal completa de Nona.
- Dataset histórico completo frente al matemáticamente reconstruido.
- Procedencia de cada elemento visual.
- Definición óptima y justificada de trayectorias.
- Significado, si alguno, de las fases 1–2–3.
- Significado de los números especiales.
- Existencia o ausencia de una señal que sobreviva a controles nulos.
- Posible relación astronómica independiente.

## 15. Regla de continuidad
Los resultados negativos deben conservarse. Una hipótesis no debe rescatarse mediante complejidad adicional sólo porque sea interesante. El siguiente agente debe continuar desde este historial y verificarlo contra las fuentes antes de ampliar ninguna conclusión.
