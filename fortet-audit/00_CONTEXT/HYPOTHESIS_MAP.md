# HYPOTHESIS_MAP — Mapa de hipótesis

| ID | Hipótesis | Evidencia a favor | Evidencia contra / límite | Experimento necesario | Estado |
|---|---|---|---|---|---|
| H0 | Explicación ordinaria | Tablas, erratas y ditto marks admiten explicaciones matemáticas/editoriales ordinarias | No explica una señal independiente que sobreviva controles | Modelar explicación ordinaria y comparar complejidad/predicción | BASELINE |
| H1 | Estructura editorial | Ditto marks heredan texto y la nota final está separada | No demuestra intención oculta | Reconstrucción tipográfica + comparación histórica | PLAUSIBLE |
| H2 | Estructura matemática | log10(n), redondeo y posiciones decimales son deterministas | Estructura matemática no implica mensaje | Dataset 1..10000 + controles que preserven estructura | ESTABLE |
| H3 | Nona como sistema de cálculo | Hipótesis mecánica compatible con recorridos/direccionamiento | Falta reconstrucción literal completa y documentación de uso | Reconstrucción literal + reglas mínimas sin targets | OPEN |
| H4 | Permutación/recorrido | Matriz 10.000×20 admite trayectorias naturales | Muchas permutaciones permiten sobreajuste | Congelar P0/P1/P2 + modelos nulos | OPEN |
| H5 | Fase 1–2–3 | Regla modular sencilla produce fases diagonales reproducibles | Puede ser artefacto de la construcción | Comparar con fases aleatorias y reglas simples alternativas | OPEN |
| H6 | Codificación intencional | Sería plausible sólo ante señal estable, independiente y predictiva | Gran riesgo de apofenia y p-hacking | Pre-registro + validación ciega + nulls | UNPROVEN |
| H7 | Relación astronómica | Capella/Auriga es una hipótesis comprobable | Falta derivación independiente suficiente | Congelar transformación + catálogo/época + controles | UNPROVEN |

## Reglas
1. No usar targets para escoger la transformación que los valida.
2. Separar DISCOVERY de VALIDATION.
3. Una coincidencia visual no constituye confirmación.
4. Conservar resultados negativos.
5. Preferir la explicación más simple que explique los datos.
6. Toda transición de estado debe registrar evidencia y experimento.

## Targets sensibles
8181, 618, 1618, Capella y otros objetivos astronómicos se consideran hipótesis/targets hasta disponer de una derivación independiente.

## Estados
BASELINE = modelo de comparación.
PLAUSIBLE = compatible con evidencia disponible.
OPEN = hipótesis en investigación.
UNPROVEN = no demostrada.
SUPPORTED = sólo después de controles y replicación independientes.
