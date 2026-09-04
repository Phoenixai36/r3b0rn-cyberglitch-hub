# PERMUTATION_CONTEXT

## Purpose
Test whether the order in which the 10.000×20 digit matrix is traversed changes detectable structure.

## P0
Row-major: read positions by row, preserving row and decimal-column order.

## P1
Diagonal traversal: group cells by a diagonal index such as d=i+j, with indexing convention explicitly recorded.

## P2
Diagonal/zig-zag: same diagonal families but alternate direction between successive diagonals.

## Requirements
Every permutation must be a deterministic function with documented indexing, inverse where applicable, parameter values and tests.

## Multiple testing
The number of transformations tested must be recorded. Do not report only the best transformation.

## Discovery/validation
No transformation may be selected because it produces a desired target. If exploratory search is performed, freeze the resulting candidate before validation and report the search space.

## Null comparisons
Compare against random permutations, row shuffles, digit shuffles, circular shifts and distribution-matched controls where appropriate.

## Phase model
The experimental 1–2–3 phase rule C(r,c)=1+((r-1)+(c-1)) mod 3 is a mathematical construction. It is not historical evidence unless an independent source establishes it.
