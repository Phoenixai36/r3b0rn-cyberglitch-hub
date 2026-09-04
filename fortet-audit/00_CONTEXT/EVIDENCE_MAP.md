# EVIDENCE_MAP — Afirmaciones y trazabilidad

La regla es no convertir una inferencia en evidencia. Cada afirmación debe poder recorrer: AFIRMACIÓN → FUENTE → EVIDENCIA → NIVEL DE CERTEZA → REPRODUCIBILIDAD.

| Afirmación | Fuente | Evidencia | Certeza | Reproducible |
|---|---|---|---|---|
| Existe una obra *Logaritmos* atribuida a Antonio Fortet Pascual | Registro bibliográfico BNE / obra | Registro bibliográfico | Alta | Sí |
| La tabla trabaja con 20 cifras decimales | Ejemplares/páginas de la tabla | Páginas originales | Alta donde la página es legible | Sí mediante transcripción/imagen |
| La Fe de Erratas contiene 13 correcciones numeradas | Página original de Fe de Erratas | Texto y ditto marks visibles | Alta | Sí mediante transcripción |
| La nota “Para mayor exactitud...” contiene siete números | Página original de Fe de Erratas | 1231, 1777, 2473, 3089, 3181, 9118, 9696 | Alta | Sí |
| 8181 tiene una corrección explícita de la última cifra decimal | Fe de Erratas | Entrada 8181 | Alta | Sí |
| 8474 usa una corrección del penúltimo decimal | Fe de Erratas | Entrada 8474 | Alta | Sí |
| 8987 usa una corrección de los dos últimos decimales | Fe de Erratas | Entrada 8987 | Alta | Sí |
| Las filas 22–30 son coherentes con log10(n) a 20 decimales | Páginas de tabla + cálculo independiente | Comparación numérica | Alta para esa zona | Sí |
| 10.000 × 20 produce 200.000 posiciones | Definición del dataset | 10000×20 | Certeza matemática | Sí |
| P0/P1/P2 son transformaciones analíticas útiles | Diseño experimental | Funciones definibles | Alta como diseño, no como hecho histórico | Sí |
| Existe una fase modular 1–2–3 en una reconstrucción experimental | Cálculo de la matriz experimental | Regla modular | Alta como propiedad matemática del modelo | Sí |
| La Nona fue diseñada históricamente como sistema de lectura de la tabla | Debe localizarse fuente primaria | Actualmente insuficiente | UNKNOWN | No |
| 8181 codifica un objetivo concreto | Inferencia previa | Sólo coincidencias/hipótesis | UNKNOWN | No |
| 618/1618 constituyen una clave intencional | Hipótesis | No hay prueba independiente suficiente | UNKNOWN | No |
| Existe una relación intencional con Capella/Auriga | Hipótesis astronómica | Requiere transformación congelada + controles | UNKNOWN | No |

## Jerarquía
PRIMARY = fotografía/escaneo/documento original.
SECONDARY = bibliografía o fuente histórica externa.
DERIVED = cálculo reproducible a partir de datos.
HYPOTHESIS = interpretación que aún necesita prueba.
AI = material de razonamiento, nunca evidencia primaria por sí mismo.

## Regla de actualización
Cuando aparezca nueva evidencia, añadirla sin borrar la versión anterior. Si una afirmación cambia de estado, registrar qué evidencia produjo el cambio.
