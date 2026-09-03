# Fortet — Auditoría de 200.000 dígitos

Fase 0 del laboratorio reproducible.

## Regla primaria congelada

Para n=1..10.000:

1. calcular `log10(n)` con precisión arbitraria;
2. extraer/redondear 20 cifras decimales de la parte fraccionaria;
3. construir matriz `M[n,j]`, 10.000 × 20;
4. definir diagonales `d=i+j` con `i=n-1`, `j=columna-1`;
5. fase cromática: `phase=(i+j) mod 3 + 1`;
6. comparar P0 (row-major), P1 (diagonal ↘) y P2 (diagonal zig-zag).

## Controles

- precisión 14/20/27;
- permutación de filas;
- permutación intra-fila;
- barajado de los 200.000 dígitos conservando marginales;
- semilla reproducible `20260903`.

## Números especiales

6, 13, 185, 494, 618, 1618, 8181.

## Regla epistemológica

Los datos matemáticamente reconstruidos NO deben confundirse con una transcripción del ejemplar histórico de Fortet. Ninguna comparación astronómica se utiliza para ajustar la transformación primaria.

Los artefactos y estadísticas definitivos deben ser generados y verificados antes de interpretarlos.
