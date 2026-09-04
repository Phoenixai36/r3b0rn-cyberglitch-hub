# VISUALIZATION_CONTEXT

## Existing visualization
The project has an accessible HTML visualization for the Nona / 10.000×20 experiment. It is a derived visualization and must not be mistaken for the historical source.

## Purpose
Visualize the matrix, phases, diagonal trajectories, special positions and statistical results while preserving an auditable link back to source data.

## Requirements
- distinguish source pixels from derived rendering;
- expose row/column/index conventions;
- allow P0/P1/P2 comparison;
- expose selected diagonal/trajectory parameters;
- show null/control distributions alongside observed values;
- support keyboard navigation and text alternatives where possible;
- avoid visual emphasis that implies statistical significance by itself.

## Accessibility
Every important visual claim should have an equivalent textual/table representation. Color must never be the only encoding.

## Current experimental phase visualization
C(r,c)=1+((r-1)+(c-1)) mod 3 produces a diagonal three-state pattern. This is a test visualization only.
