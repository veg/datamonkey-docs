# Data Files

## General Remarks

To perform a selection analysis, **datamonkey.org** requires a multiple alignment of at least three homologous coding nucleotide sequences. While codon-based methods for estimating dN (nonsynonymous substitutions per nonsynonymous site) and dS (synonymous substitutions per synonymous site) can be applied to any sequence alignment, several considerations should be kept in mind:

### Sequence Diversity

- **Ideal Alignment**: Should represent a single gene or protein product sampled across multiple taxa (e.g., mammalian interferon genes) or a diverse population sample (e.g., Influenza A viruses infecting different individuals).
- **Substantial Diversity Required**: Comparative methods estimate relative rates of synonymous and nonsynonymous substitution.
  - Low-divergence samples (e.g., Human T-lymphotropic virus with only 1–2 substitutions per sequence) perform poorly with REL-type methods.
  - The total length of the phylogenetic tree should ideally be at least one expected substitution per codon site, though this varies.

### Sequence Divergence

- **Too Divergent**: Saturation can occur, making it difficult to infer branch lengths and substitution parameters.

### Number of Sequences

- **Too Few**: Insufficient information for meaningful inference.
- **Too Many**: Can be computationally expensive.
- **Datamonkey Limits**:
  - Default up to 32000 sites.
  - Default up to 5000 sequences.
    - aBSREL : up to 1000 sequences.
    - BGM : up to 1000 sequences.
    - Contrast-FEL : up to 2000 sequences.
    - FUBAR : up to 10000 sequences.
    - GARD : up to 1000 sequences.
    - RELAX : up to 1000 sequences.
    - BUSTED : up to 1000 sequences.
- **Rule of Thumb**:
  - At least 10 sequences for reliable single-site detection.
  - As few as 4 sequences for alignment-wide inference.

### Type of Selection

- Comparative methods are unsuitable for studying selective sweeps unless pre- and post-sweep sequences are included.

### Alignment Quality

- **Inspect Alignment**: Use [graphical tools](https://en.wikipedia.org/wiki/List_of_alignment_visualization_software) to ensure correctness.
- **Reading Frames**: Verify the alignment is in-frame without stop codons or non-coding regions.
- **Alignment Method**: Align protein sequences and map them back to nucleotides to avoid frameshifting gaps.
- **Data Checks**:
  - Datamonkey performs checks on received coding sequences and reports issues like duplicates or nonstandard characters.

## Common Issues

### Non-Text Files

- **Requirement**: Alignments must be text files (e.g., NEXUS, PHYLIP, FASTA). Formats like Word or PDF must be converted to plain text.

### Nonstandard Characters

- Acceptable characters:
  - Nucleotides: A, C, G, T/U, ambiguity characters.
  - Gap/missing data: `?`, `X`, `N`, `-`.
- Other characters may result in frameshifts.

### Amino Acid Alignments

- Datamonkey uses codon models requiring silent substitutions. Amino acid alignments are unsuitable.

### Termination Codons

- Alignments with stop codons (even at the end) are rejected. Use HyPhy to clean stop codons.

### Alignments That Are Too Gappy

- More than 50% indels may cause processing issues.

### Alignments That Are Too Large

- Exceeding size limits requires running locally with HyPhy.

### Incorrect Genetic Code

- Using the wrong genetic code can result in alignment failures or compromised results.

## Genetic Codes

### Universal Genetic Code

| Amino Acid | Codons                       |
| ---------- | ---------------------------- |
| Phe        | TTT, TTC                     |
| Leu        | TTA, TTG, CTT, CTC, CTA, CTG |
| Ile        | ATT, ATC, ATA                |
| Met        | ATG                          |
| Val        | GTT, GTC, GTA, GTG           |
| Ser        | TCT, TCC, TCA, TCG, AGT, AGC |
| Pro        | CCT, CCC, CCA, CCG           |
| Thr        | ACT, ACC, ACA, ACG           |
| Ala        | GCT, GCC, GCA, GCG           |
| Tyr        | TAT, TAC                     |
| Stop       | TAA, TAG, TGA                |
| His        | CAT, CAC                     |
| Gln        | CAA, CAG                     |
| Asn        | AAT, AAC                     |
| Lys        | AAA, AAG                     |
| Asp        | GAT, GAC                     |
| Glu        | GAA, GAG                     |
| Cys        | TGT, TGC                     |
| Trp        | TGG                          |
| Arg        | CGT, CGC, CGA, CGG, AGA, AGG |
| Gly        | GGT, GGC, GGA, GGG           |

### Alternative Genetic Codes

- For additional codes (e.g., mitochondrial, yeast), refer to HyPhy documentation.

## Data Formats

### Supported Formats

- **NEXUS**: Supports `DATA`, `CHARACTERS`, `TAXA`, `ASSUMPTIONS`, and `TREES` blocks.
- **PHYLIP**: Sequential and interleaved formats.
- **FASTA**:
  - Sequential: Taxa names preceded by `>` or `#`.
  - Interleaved: List of taxa names followed by sequence blocks.

Visit the [HyPhy wiki](https://github.com/veg/hyphy) for examples and more information.
