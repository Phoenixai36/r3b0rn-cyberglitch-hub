# Artefacto visual recuperado — Claude

## Estado

Artefacto experimental recuperado por la investigación, no fuente primaria histórica.

## Observación visual

La imagen muestra una cuadrícula densa de tres colores que se desplazan una posición por fila, generando bandas diagonales descendentes hacia la derecha (↘).

La regla candidata que reproduce esta geometría es:

`C(r,c) = 1 + ((r-1) + (c-1)) mod 3`

con una permutación arbitraria de los tres colores.

## Hipótesis que merece prueba

El patrón puede interpretarse como una codificación espacial de fase 1–2–3. Para determinar si la imagen contiene más estructura que esta periodicidad básica hay que analizar los píxeles de la imagen original y recuperar:

1. dimensiones efectivas de la cuadrícula;
2. número exacto de estados cromáticos;
3. periodicidad horizontal y vertical;
4. orientación de las bandas;
5. función de fase candidata;
6. relación entre celdas y cualquier secuencia numérica subyacente.

## Precaución epistemológica

No se debe atribuir esta geometría a Antonio Fortet Pascual ni a la Nona histórica hasta localizar evidencia primaria que la documente.

## Fuentes externas comprobadas

La BNE mantiene una referencia bibliográfica de *Logaritmos*, con la mención de Antonio Fortet Pascual y de logaritmos vulgares con veinte decimales: https://datos.bne.es/resource/XX527539

La búsqueda pública no ha localizado una copia de esta imagen ni una fuente primaria que establezca que el patrón cromático proceda de Fortet.

## Próxima prueba reproducible

Analizar el PNG recuperado por píxel y contrastar la regla observada contra las alternativas `r+c mod 3`, `r-c mod 3` y una indexación lineal, antes de introducir cualquier dato de los números especiales 6, 13, 185, 494, 618, 1618 y 8181.
