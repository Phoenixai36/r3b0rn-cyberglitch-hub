# LOGARITHM_CONTEXT

## Corpus
*Logaritmos* de Antonio Fortet Pascual es el corpus matemático principal.

## Modelo
La investigación pretende reconstruir 10.000 entradas, n=1..10000, con 20 cifras decimales por entrada: 200.000 dígitos.

## Distinción esencial
Mantener tres capas:
1. PRINTED — valor tal como aparece en la fuente.
2. ERRATA_CORRECTED — valor corregido según Fe de Erratas.
3. MATHEMATICAL — valor calculado independientemente como log10(n), con precisión suficiente.

No sobrescribir una capa con otra.

## Verificación conocida
Filas 22–30:
22 1.34242268082220623596
23 1.36172783601759287887
24 1.38021124171160602294
25 1.39794000867203760957
26 1.41497334797081796442
27 1.43136376415898731189
28 1.44715803134221922114
29 1.46239799789895608733
30 1.47712125471966243730

Estos valores coinciden con log10(n) a 20 decimales para esa zona.

## Próximo objetivo
Construir dataset canónico completo, comparar PRINTED/ERRATA_CORRECTED/MATHEMATICAL, guardar discrepancias y generar hashes.

## Advertencia
La existencia de 20 decimales no demuestra una codificación. Las regularidades de los logaritmos son altamente estructuradas por construcción.
