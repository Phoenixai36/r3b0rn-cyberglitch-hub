# RESEARCH_HISTORY — Cómo llegamos al estado actual

## 1. Punto de partida
La investigación comenzó alrededor del material familiar atribuido a Fortet, la obra *Logaritmos* y el documento denominado Nona / Parto Aritmético. La primera dificultad fue separar el material documental de las interpretaciones posteriores.

## 2. Corpus matemático
Se tomó como eje *Logaritmos* de Antonio Fortet Pascual. La tabla se considera potencialmente reconstruible como 10.000 entradas con 20 posiciones decimales, es decir, 200.000 dígitos.

## 3. Fe de Erratas
La Fe de Erratas pasó a ser una pieza central porque proporciona discrepancias explícitas entre valores impresos y valores corregidos. Se identificaron 13 correcciones numeradas y, por separado, una indicación de “Para mayor exactitud” con siete números. Se decidió no fusionar automáticamente ambos conjuntos.

## 4. Ditto marks
La observación de las líneas con comillas/dittos llevó a distinguir estructura editorial de estructura numérica. El patrón de herencia textual debe conservarse literalmente antes de intentar cualquier interpretación.

## 5. Verificación matemática
Se cotejaron filas de la tabla con log10(n). La zona 22–30 mostró correspondencia con valores matemáticos a 20 decimales. Esto valida la reconstrucción matemática de esa zona, pero no prueba ninguna codificación.

## 6. Hipótesis de matriz
Se planteó transformar los 200.000 dígitos en una matriz 10.000×20. Esto permite estudiar trayectorias, diagonales y permutaciones sin seleccionar manualmente dígitos concretos.

## 7. P0/P1/P2
Se definieron tres lecturas experimentales: P0 por filas, P1 diagonal y P2 diagonal inversa/zig-zag. Deben implementarse formalmente y congelarse antes de usar targets especiales.

## 8. Fase 1–2–3
Se observó que una regla modular sencilla sobre fila+columna produce un patrón diagonal de tres fases. Esta observación es matemáticamente reproducible, pero no demuestra que fuera una regla histórica de Fortet.

## 9. Nona
La Nona se convirtió en el problema central de reconstrucción: hay que distinguir el documento/objeto original de las visualizaciones que posteriormente construimos. Los patrones visuales sólo adquieren valor histórico si pueden vincularse a evidencia primaria.

## 10. Números especiales
8181, 618, 1618 y otros números comenzaron a funcionar como posibles targets. La metodología se endureció para impedir que un target elegido a posteriori dicte la transformación.

## 11. Hipótesis astronómica
Apareció Capella/Auriga como posible interpretación. Se decidió tratarla como hipótesis de validación y no como motor para descubrir la transformación.

## 12. Cambio metodológico
La investigación pasó de “buscar un patrón” a “construir un experimento falsable”: dataset canónico, transformaciones congeladas, controles nulos, separación discovery/validation, reproducibilidad y auditoría adversarial.

## 13. Estado actual
El siguiente paso es reconstruir y verificar los datos completos, formalizar la geometría de Nona y ejecutar sistemáticamente las transformaciones y controles. No debe asumirse ningún resultado positivo hasta que sobreviva ese proceso.

## Qué se descartó o debilitó
- Interpretar los ditto marks como código sin demostrar una regla independiente.
- Considerar 20 decimales como evidencia suficiente de intención oculta.
- Tratar 8181 como objetivo privilegiado sin justificación independiente.
- Convertir una visualización de IA en evidencia primaria.
- Ajustar una permutación después de observar un resultado atractivo.

## Qué sigue abierto
La reconstrucción literal de Nona, la procedencia exacta de cada elemento visual, el dataset histórico completo, las transformaciones óptimas y cualquier relación con targets astronómicos siguen requiriendo verificación.
