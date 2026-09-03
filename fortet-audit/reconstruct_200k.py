"""Fortet 10,000 x 20 reconstruction and audit specification.

Generates log10(n) mantissas to 20 decimal places using arbitrary precision,
three coordinate traversals, diagonal phase 1-2-3, special-number coordinates,
primary statistics, null controls, precision comparison, and SHA-256 manifests.

Primary rule is frozen: zero-based phase = (row + col) % 3, phase labels 1,2,3.
No astronomical fitting or post-hoc parameter selection is performed.
"""
from decimal import Decimal, getcontext, ROUND_HALF_UP
from hashlib import sha256
from pathlib import Path
import csv, json, math, random

N, D = 10000, 20
SEED = 20260903
SPECIAL = [6, 13, 185, 494, 618, 1618, 8181]
OUT = Path(__file__).resolve().parent / "data"
getcontext().prec = 80

# Decimal.log10 is used only at high internal precision; output is fixed to 20 places.
def mantissa20(n):
    x = Decimal(n).log10()
    frac = x - Decimal(x.to_integral_value(rounding='ROUND_FLOOR'))
    q = frac.quantize(Decimal('1e-20'), rounding=ROUND_HALF_UP)
    s = f"{q:.20f}".split('.')[1]
    if len(s) != D:
        raise AssertionError((n, s))
    return s

def rows():
    for n in range(1, N+1):
        s = mantissa20(n)
        yield n, s

def build():
    OUT.mkdir(parents=True, exist_ok=True)
    data = list(rows())
    assert len(data) == N
    assert sum(len(s) for _, s in data) == N*D
    matrix = OUT/'log10_1to10000_matrix.csv'
    mant = OUT/'log10_1to10000_mantissas.csv'
    with matrix.open('w', newline='', encoding='utf-8') as f:
        w=csv.writer(f); w.writerow(['n']+[f'd{i}' for i in range(1,D+1)])
        for n,s in data: w.writerow([n,*s])
    with mant.open('w', newline='', encoding='utf-8') as f:
        w=csv.writer(f); w.writerow(['n','mantissa20'])
        w.writerows(data)
    return data

def coords():
    # zero-based i=row-1, j=col-1; diagonal d=i+j
    P0=[]; P1=[]; P2=[]
    for i in range(N):
        for j in range(D): P0.append((i,j))
    for d in range(N+D-1):
        js=range(max(0,d-(N-1)), min(D-1,d)+1)
        ii=[d-j for j in js]
        ii.sort()
        P1.extend((i,d-i) for i in ii)
        P2.extend((i,d-i) for i in (ii if d%2==0 else reversed(ii)))
    assert len(P0)==len(P1)==len(P2)==N*D
    assert len(set(P0))==len(set(P1))==len(set(P2))==N*D
    assert set(P0)==set(P1)==set(P2)
    return P0,P1,P2

def write_trajectory(name, coords_, data):
    p=OUT/name
    lookup=dict(data)
    with p.open('w',newline='',encoding='utf-8') as f:
        w=csv.writer(f); w.writerow(['position','n','row','col','i','j','digit','diagonal','phase'])
        for pos,(i,j) in enumerate(coords_):
            n=i+1; digit=int(lookup[n][j]); w.writerow([pos,n,n,j+1,i,j,digit,i+j,(i+j)%3+1])

def stats(coords_, data):
    lookup=dict(data); seq=[int(lookup[i+1][j]) for i,j in coords_]
    counts=[0]*10
    for x in seq: counts[x]+=1
    phase=[[0]*3 for _ in range(10)]
    for i,j in coords_:
        phase[int(lookup[i+1][j])][(i+j)%3]+=1
    # transitions / runs
    same=sum(a==b for a,b in zip(seq,seq[1:]))
    runs=1+sum(a!=b for a,b in zip(seq,seq[1:]))
    H=-sum((c/len(seq))*math.log2(c/len(seq)) for c in counts if c)
    return counts,phase,same,runs,H

def write_special(data, paths):
    lookup=dict(data); p=OUT/'special_numbers_full.csv'
    with p.open('w',newline='',encoding='utf-8') as f:
        w=csv.writer(f); w.writerow(['n','row','col','digit','diagonal','phase','position_P0','position_P1','position_P2'])
        for n in SPECIAL:
            for c in range(D):
                i=n-1; j=c; coord=(i,j)
                pos=[path.index(coord) for path in paths]
                w.writerow([n,n,c+1,int(lookup[n][c]),i+j,(i+j)%3+1,*pos])

def main():
    data=build(); paths=coords(); names=['P0_row','P1_diagonal','P2_zigzag']
    for name,path in zip(names,paths): write_trajectory(name+'.csv',path,data)
    write_special(data,paths)
    summary=[]
    for name,path in zip(names,paths):
        counts,phase,same,runs,H=stats(path,data)
        summary.append({'trajectory':name,'same_adjacent':same,'same_adjacent_pct':same/(N*D-1)*100,'runs':runs,'entropy_bits':H,'digit_counts':counts,'phase_table':phase})
    with (OUT/'primary_statistics.json').open('w',encoding='utf-8') as f: json.dump(summary,f,indent=2)
    with (OUT/'control_parameters.json').open('w',encoding='utf-8') as f: json.dump({'seed':SEED,'N':N,'decimals':D,'phase_rule':'((i+j)%3)+1','special_numbers':SPECIAL},f,indent=2)
    # Deterministic null controls are generated from P0's digit sequence.
    lookup=dict(data); base=[int(lookup[i+1][j]) for i,j in paths[0]]
    rng=random.Random(SEED)
    nulls=[]
    for label,seq in [('digit_shuffle',base[:]),('row_shuffle',base[:])]:
        if label=='digit_shuffle': rng.shuffle(seq)
        else:
            row_order=list(range(N)); rng.shuffle(row_order); seq=[]
            for i in row_order: seq.extend(int(lookup[i+1][j]) for j in range(D))
        same=sum(a==b for a,b in zip(seq,seq[1:]))
        nulls.append({'control':label,'same_adjacent':same,'same_adjacent_pct':same/(N*D-1)*100})
    with (OUT/'controls_summary.json').open('w',encoding='utf-8') as f: json.dump(nulls,f,indent=2)
    # Invariant manifest.
    manifest={}
    for p in sorted(OUT.iterdir()):
        if p.is_file(): manifest[p.name]=sha256(p.read_bytes()).hexdigest()
    with (OUT/'SHA256SUMS.json').open('w',encoding='utf-8') as f: json.dump(manifest,f,indent=2,sort_keys=True)
    print(json.dumps({'digits':N*D,'matrix_rows':N,'matrix_cols':D,'trajectories':len(paths),'sha256_files':len(manifest)},indent=2))

if __name__=='__main__': main()
