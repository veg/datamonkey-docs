# PRIME (PRoperty Informed Models of Evolution)

PRIME (**PR**operty **I**nformed **M**odels of **E**volution) is a family of codon-level maximum likelihood methods that go beyond traditional dN/dS approaches by modeling *how* amino acid property changes affect non-synonymous substitution rates. Rather than treating all non-synonymous substitutions equivalently, PRIME parameterizes amino acid exchangeability as a function of physicochemical properties such as hydrophobicity, volume, charge, and secondary structure propensities.

This makes PRIME particularly useful for understanding the **mechanistic basis** of selection. For example, a site under diversifying selection may specifically promote changes in charge while conserving volume. Standard methods like FEL or MEME cannot provide this level of detail.

PRIME includes three complementary implementations:

- **S-PRIME** (Site-level): Estimates independent property importance vectors for each codon site, resolving the fine-grained biophysical architecture of the protein. This is the default Datamonkey implementation.
- **G-PRIME** (Global): Estimates constant property importance weights across the entire alignment, characterizing gene-wide physicochemical constraints.
- **E-PRIME** (Episodic): Models property importance as a random effect varying across phylogenetic branches and sites (analogous to BUSTED), allowing detection of episodic selection on specific properties.

## Citation

*Citation forthcoming.*

## The PRIME Model

PRIME extends the MG94×REV codon model by replacing the single non-synonymous rate parameter with a property-dependent rate. The rate matrix follows the standard continuous-time Markov description of coding-sequence evolution. For a non-synonymous substitution between codons encoding amino acids $x$ and $y$:

$$\beta_{xy} = \alpha^{(s)} \cdot \exp\left[\psi^{(s)} - \sum_{i=1}^{D} \lambda_i^{(s)} \left| x_i - y_i \right| \right]$$

Where:

- $\alpha^{(s)}$: the synonymous substitution rate at site $s$
- $\psi^{(s)}$: the baseline log non-synonymous/synonymous rate ratio at site $s$ (when all $\lambda_i = 0$, the model reduces to standard MG94 with $\omega_s = \exp(\psi^{(s)})$)
- $\lambda_i^{(s)}$: the importance parameter for property $i$ at site $s$, bounded in \[-15, 15\]
- $|x_i - y_i|$: the absolute difference in property $i$ between amino acids $x$ and $y$

This formulation has a direct population genetics interpretation: the substitution rate is proportional to the fixation probability, which under strong selection scales as $P_\text{fix} \propto e^{2N_e s}$. The property importance weight $\lambda_i^{(s)}$ thus serves as a proxy for the product of the effective population size $N_e$ and the selective constraint intensity per unit of property change.

| Symbol | Description |
|---|---|
| $\alpha$ | Synonymous substitution rate multiplier |
| $\beta_{xy}$ | Nonsynonymous substitution rate multiplier between amino acids $x$ and $y$ |
| $\psi$ | Baseline log non-synonymous/synonymous rate ratio |
| $D$ | Number of modeled physicochemical properties (e.g., $D=5$ for 5-prop) |
| $\lambda_i$ | Importance coefficient for the $i$th physicochemical property |
| $x_i$ | Value of the $i$th property for amino acid $x$ |

## PRIME Implementations

### S-PRIME (Site-Level)

S-PRIME estimates independent $\lambda$ vectors for each codon site, analogous to FEL for dN/dS. It assumes physicochemical constraints are temporally constant across the phylogeny at a given site but completely independent between sites.

**Inference procedure:**

1. **Nucleotide Model Fit**: A GTR nucleotide model is fitted to estimate nucleotide substitution biases.
2. **Global Codon Model Fit**: An MG94×REV codon model is fitted to estimate branch lengths and global dN/dS ratios. These global nuisance parameters are then fixed.
3. **Site-Level FEL Fit**: At each site, a FEL model is fitted with site-specific synonymous ($\alpha$) and non-synonymous ($\beta$) rates, providing a baseline log-likelihood.
4. **Site-Level PRIME Fit**: At each site (where $\beta > 0$), the PRIME property model is fitted, estimating site-specific $\alpha^{(s)}$, $\psi^{(s)}$, and the vector of property importance coefficients $\lambda_i^{(s)}$.

**Statistical testing** uses a hierarchical procedure to control the selective False Discovery Rate (sFDR):

1. **Omnibus test**: At each site, a likelihood ratio test with $D$ degrees of freedom tests whether any property has a non-zero effect ($\lambda_1 = \lambda_2 = \dots = \lambda_D = 0$).
2. **FDR correction**: The Benjamini-Hochberg procedure is applied across all sites to the omnibus p-values (e.g., at FDR $\leq 0.05$), identifying $R$ sites with significant biophysical structure.
3. **Per-property tests**: Within each of the $R$ significant sites, individual properties are tested using 1-degree-of-freedom LRTs, corrected with the Holm-Bonferroni method at an adjusted significance level of $\alpha \cdot R / N$ (where $N$ is total sites). This controls the Family-Wise Error Rate within each selected site while maintaining global FDR control.

### G-PRIME (Global)

G-PRIME estimates constant $\lambda$ values across the entire alignment, characterizing the average physicochemical constraints acting on the gene product. This adds $D$ parameters relative to the MG94×REV baseline.

G-PRIME is useful for:
- Quick gene-level characterization of dominant selective constraints
- Model selection to determine how much physicochemical detail is needed
- Comparing selective regimes across gene families

### E-PRIME (Episodic)

E-PRIME models $\lambda$ as a random effect varying across phylogenetic branches and sites using a mixture model framework (analogous to BUSTED). This captures episodic selection on properties, where specific physicochemical constraints are relaxed or intensified on particular branches.

E-PRIME adds $2(K-1) + KD$ parameters (where $K$ is the number of mixture components) and is useful for:
- Detecting transient evolutionary events (host switching, immune escape)
- Resolving the dynamic architecture of constraints (e.g., majority regime vs. minority regime)
- Testing whether rate and property heterogeneity are synergistic

## Input Parameters

### Required Inputs

- **Alignment File**: An in-frame codon alignment file (supported formats: `.fasta`, `.nex`, etc.).
- **Phylogenetic Tree**: A phylogenetic tree (Newick format, optionally annotated with `{}` for branch labeling) appended to the FASTA file or embedded within the NEXUS file.
- **Genetic Code**: The genetic code to use (default: `"Universal"`).

### Optional Inputs

- **Branches to Test**: Which branches to test for property-dependent selection (default: `"All"`).
- **P-value Threshold**: Significance threshold for testing (default: `0.1`).
- **Property Set**: The amino acid property set to use. Options: `"Atchley"`, `"LCAP"`, `"2PROP"`, `"3PROP"`, `"4PROP"`, `"5PROP"`, `"Random-N"`, `"Custom"` (default: `"5PROP"`).
- **Property File**: A JSON file defining custom amino acid properties (only when `--property-set Custom`).
- **Impute States**: Impute marginal likelihoods for each codon at each sequence and each site (default: `"No"`).
- **Output File**: Path for the output JSON file (default: `<alignment>.PRIME.json`).

## Amino Acid Property Sets

PRIME defines a nested hierarchy of property models that sequentially incorporate physicochemical properties:

| Property Set | # Properties | Description |
|---|---|---|
| **2PROP** | 2 | Hydrophobicity (Kyte-Doolittle) + Volume (Zamyatnin). The most fundamental constraints on protein folding. |
| **3PROP** | 3 | 2PROP + Isoelectric Point (pI). Adds charge, critical for stability, solubility, and ligand binding. |
| **4PROP** | 4 | 3PROP + Alpha-Helix Propensity (Chou-Fasman). Captures local backbone geometric constraints. |
| **5PROP** (recommended) | 5 | 4PROP + Beta-Sheet Propensity (Chou-Fasman). Completes description of major secondary structure determinants. |
| **Atchley** | 5 | Five orthogonal factors from factor analysis of 500+ amino-acid attributes |
| **LCAP** | 5 | Five properties from Conant et al.'s LCAP model |
| **Random-N** (N=2–5) | N | Random properties for null hypothesis testing |
| **Custom** | User-defined | Load from a JSON file |

All properties are automatically centered (mean = 0) and normalized (variance = 1) before use, ensuring that estimated $\lambda$ coefficients are comparable across properties.

The **5PROP** model is recommended as the default for most analyses. Benchmarking across 24 diverse datasets and 18,944 mammalian genes demonstrates that the 5-property model provides the optimal fit in the majority of cases, particularly when sufficient evolutionary information is available to resolve complex constraints. Primary physicochemical properties consistently outperform composite Atchley factors, reinforcing that natural selection acts on tangible physical attributes rather than abstract statistical dimensions.

The hierarchical structure enables model selection (via AICc) to determine the optimal level of complexity for a given dataset, and likelihood ratio tests can isolate the significance of adding specific properties (e.g., testing 3-prop vs. 2-prop to assess the importance of charge).

## Interpretation of Results

### Property Importance (λ)

- **λ_k > 0** (positive): Changes in property k are **disfavored** (conserved). Substitutions that alter this property are penalized, indicating purifying selection on that biochemical property.
- **λ_k < 0** (negative): Changes in property k are **promoted** (diversifying). The site is under selection pressure to change this property. Note: because the rate increases with physicochemical distance when $\lambda < 0$, a computational ceiling is imposed; negative weights should be interpreted as signatures of chemical permissiveness or selection for property-altering shifts.
- **λ_k ≈ 0** (not significant): Property k does not significantly influence substitution rates at that site.

### Site Classification Framework

S-PRIME results can be combined with standard rate-based methods (FEL, MEME) to classify sites into mechanistic categories:

- **Constrained diversification**: Site is under diversifying selection ($dN/dS > 1$) but with significant conservation of at least one property. Adaptation is channeled into a specific chemical trajectory.
- **Driven diversification**: Site is under diversifying selection with significant negative $\lambda$ for at least one property. Selection actively favors property change.
- **Complex driver**: Significant omnibus test but no single property dominates after correction. Selection acts on a distributed combination of properties.
- **Cryptic constraint**: Site appears neutral by rate metrics ($dN/dS \approx 1$) but shows significant property conservation. High turnover is permitted only among chemically similar residues.
- **Unconstrained diversification**: Site is under diversifying selection with no detectable physicochemical structure. Permissive exploration of sequence space.

### Omnibus Test

The omnibus p-value tests whether **any** property has a non-zero effect at a site. A significant omnibus p-value indicates property-dependent selection is occurring but does not specify which property drives it.

### Per-Property Tests

Individual p-values identify **which specific properties** are under selection at a site, corrected using Holm-Bonferroni within each site across properties at an adjusted significance level.

## Statistical Power Considerations

S-PRIME's power to detect physicochemical constraints is primarily governed by the **redundancy ratio** $R = N_\text{subs} / N_\text{aa}$ (substitutions per unique amino acid at a site):

- $R < 2$: Low power. Insufficient mutational depth to resolve property weights.
- $R \approx 2\text{--}3$: Moderate power (~30–50%)
- $R > 5$: High power (>70%), even in small datasets
- $R > 10$: Near-complete sensitivity (>93%)

The method is fundamentally a comparative approach that requires observed substitutions to quantify the relative costs of residue exchange. Sites under extreme purifying selection (invariant sites) lack the variation needed for inference. The greatest potential for discovery lies at sites with moderate to high turnover but restricted chemical breadth.

## Outputs

### Summary

PRIME produces a JSON output file containing:

- Analysis metadata (version, description, authors).
- Model fit results for nucleotide GTR and global MG94×REV models.
- Per-site maximum likelihood estimates.
- The amino acid property set used, with normalized values.

### Site-Level Output Details

Each site in the output includes:

- **Alpha (α)**: Synonymous substitution rate (PRIME model).
- **Beta (β)**: Property-independent non-synonymous rate (log-baseline, i.e., $\psi$).
- **FEL Alpha / FEL Beta**: Synonymous and non-synonymous rates from the FEL model.
- **Total Branch Length**: Sum of branch lengths on tested branches at this site.
- **Number of Substitutions**: Amino-acid substitutions inferred at this site.
- **Number of Amino Acids**: Unique amino acids observed at this site.
- **PRIME LogL / FEL LogL**: Site log-likelihoods under each model.
- **P-value**: Omnibus p-value (any property is important).
- **Q-value**: Benjamini-Hochberg FDR corrected omnibus p-value.
- **Per-Property Results**: For each property k: importance factor (λ_k), Holm-Bonferroni corrected p-value, and null model log-likelihood.

## Visualization

*Visualization tool forthcoming.*

## Example Workflow

1. **Upload Data**:
  - Provide an alignment file and corresponding phylogenetic tree.
  - Select the genetic code and property set for your analysis.
2. **Run Analysis**:
  - Click "Run Analysis" to begin the PRIME analysis.
3. **Review Results**:
  - View summary statistics showing sites with significant property-dependent selection.
  - Examine per-property results to understand which biochemical properties drive selection at each site.
4. **Export Results**:
  - Download detailed JSON results for further analysis.

## Example CLI Usage

### Full Example Command

```bash
hyphy prime \
 --alignment path/to/alignment.fasta \
 --tree path/to/tree.nwk \
 --code Universal \
 --branches All \
 --property-set 5PROP \
 --pvalue 0.05 \
 --output results.PRIME.json
```

### Minimal Example Command

```bash
hyphy prime \
 --alignment path/to/alignment.fasta \
 --tree path/to/tree.nwk
```

### Additional Examples

```bash
# Testing only foreground branches (annotated with {Foreground} in the tree)
hyphy prime --alignment sequences.fas --tree labeled_tree.nwk \
   --branches Foreground

# Using a custom property set
hyphy prime --alignment sequences.fas --tree tree.nwk \
   --property-set Custom --property-file my_properties.json

# With state imputation
hyphy prime --alignment sequences.fas --tree tree.nwk --impute-states Yes
```

### Parameters

- **`--alignment`**: Path to the in-frame codon alignment file.
- **`--tree`**: Path to the phylogenetic tree file.
- **`--code`**: Genetic code to use (default: `"Universal"`).
- **`--branches`**: Branches to test for property-dependent selection (default: `"All"`).
- **`--pvalue`**: P-value threshold for significance testing (default: `0.1`).
- **`--property-set`**: Property set to use (default: `"5PROP"`).
- **`--property-file`**: JSON file for custom properties (only with `--property-set Custom`).
- **`--impute-states`**: Impute marginal likelihoods (default: `"No"`).
- **`--output`**: Path for the output JSON file.

## References

- Kosakovsky Pond, S.L., & Frost, S.D.W. (2005). "Not So Different After All: A Comparison of Methods for Detecting Amino Acid Sites Under Selection." _Molecular Biology and Evolution_, 22(5), 1208–1222.
- [Atchley et al., PNAS 2005, 102(18):6395-6400](https://doi.org/10.1073/pnas.0408677102). Atchley factor analysis properties.
- [Conant, G.C. & Stadler, P.F. (2009). "Solvent Exposure Imparts Similar Selective Pressures across a Range of Yeast Proteins." *Mol Biol Evol*, 26(5):1155-1161](https://doi.org/10.1093/molbev/msp031). LCAP properties.
- [Conant, G.C. et al. (2007). "Turning a hobby into a job: How duplicated genes find new functions." *Nature Reviews Genetics*, 8:938-944](https://doi.org/10.1038/nrg2482). Property weight estimation.

## FAQ

### 1. How does PRIME differ from FEL or MEME?

FEL and MEME test whether a site is under positive or negative selection using a single dN/dS ratio. PRIME goes further by asking *which biochemical properties* are driving selection at each site. A site that appears neutral under FEL might show significant property-dependent selection under PRIME if substitutions favoring one property are balanced by substitutions disfavoring another (a "cryptic constraint"). Conversely, a site flagged as positively selected by MEME may show constrained diversification under PRIME, where adaptation is channeled through specific chemical trajectories while other properties are strictly conserved.

### 2. Which property set should I use?

The **5PROP** set (hydrophobicity, volume, isoelectric point, alpha-helix propensity, beta-sheet propensity) is recommended as the default for most analyses. Benchmarking across diverse datasets shows it provides the optimal fit in the majority of cases. The **Atchley** factors provide orthogonal composite dimensions derived from factor analysis and may be useful when the specific driving property is unknown, though primary properties generally outperform composite factors. The **LCAP** set is available for compatibility with the Conant framework.

### 3. What does it mean when a site has a significant omnibus p-value but no individual property is significant?

This can occur when multiple properties have moderate effects that collectively are significant but individually do not pass the Holm-Bonferroni correction threshold. The paper classifies these as "complex drivers," where selection likely acts on a distributed combination of surface properties rather than a single axis.

### 4. How should I interpret positive vs. negative λ values?

A positive λ indicates that changes in that property are penalized (purifying selection on that property). A negative λ indicates that changes in that property are promoted (diversifying selection through that property). The magnitude reflects the strength of the effect. Note that because a computational ceiling is imposed on substitution rates, large negative weights should be interpreted as signatures of extreme chemical permissiveness or selection for property-altering shifts, rather than a drive toward infinite biophysical change.

### 5. Can PRIME be used with recombination-aware analyses?

Yes. PRIME supports NEXUS files with multiple partitions, allowing for recombination-aware analysis. Each partition is analyzed independently with its own site-level model fits. You can use GARD to identify breakpoints first, then supply the partitioned alignment to PRIME.

### 6. What is the difference between G-PRIME, E-PRIME, and S-PRIME?

- **G-PRIME** gives you a single set of property weights for the entire gene. Useful for quick characterization and comparing selective regimes across gene families.
- **E-PRIME** captures temporal heterogeneity by fitting mixture components with different property weights (like BUSTED does for rates). Useful for detecting episodic shifts in physicochemical constraints.
- **S-PRIME** (the default on Datamonkey) estimates independent property weights at each site. Useful for identifying specific residues under mechanistically distinct selective pressures.

A recommended workflow is: start with G-PRIME for gene-level characterization, use E-PRIME to identify episodic biophysical shifts, then apply S-PRIME for site-level resolution of functional or drug-resistance motifs.

### 7. How much data do I need for reliable S-PRIME inference?

Power depends primarily on the redundancy ratio ($R = N_\text{subs} / N_\text{aa}$) at each site. Sites with $R > 2$ have moderate power; $R > 5$ gives high sensitivity. In practice, this means you need alignments with sufficient divergence and enough sequences to accumulate multiple substitutions at sites of interest. Large, divergent datasets (e.g., >20 sequences with tree length >2 substitutions/site) typically yield the most informative results.
