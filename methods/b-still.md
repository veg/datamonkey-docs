# B-STILL (Bayesian Significance Test of Invariant Low Likelihoods)

B-STILL (**B**ayesian **S**ignificance **T**est of **I**nvariant **L**ow **L**ikelihoods) is a rigorous extension of the [FUBAR](/methods/fubar) framework designed to quantify the **statistical significance of conserved sites** in coding sequence alignments. While FUBAR focuses on identifying sites under positive or negative selection, B-STILL specifically tests whether individual sites are effectively invariant and measures the "surprise" of that invariance relative to a gene-wide empirical prior.

Traditional phylogenetic models treat invariable sites as statistical nuisances, subsuming them into background parameters (e.g., the "+I" parameter in GTR+I+$\Gamma$ models). B-STILL instead treats invariance as a primary signal of deep purifying selection. In a shallow alignment, an invariable site is statistically uninformative because there has not been sufficient time for substitutions to occur by drift. In a deep alignment spanning a large total tree length ($T$), the probability of observing zero substitutions under a neutral Poisson process ($e^{-T}$) becomes vanishingly small. At this limit, stasis is no longer a nuisance but a profound indicator of functional or structural constraint. B-STILL provides the framework to distinguish between these two regimes.

## Citation

> Citation forthcoming. If you use B-STILL in your analysis, please also cite the underlying FUBAR methodology.

[Murrell, B et al. "FUBAR: A Fast, Unconstrained Bayesian AppRoximation for inferring selection." Mol. Biol. Evol. 30, 1196-1205 (2013).](https://doi.org/10.1093/molbev/mst030)

## How It Works

B-STILL extends the FUBAR computational framework with two key innovations:

1. **Quadratic grid resolution.** Instead of linear or log-spaced grids, B-STILL uses a quadratic grid ($r_k = (k/(K-1))^2 \times R_{\max}$) that concentrates density in the near-zero rate regime, providing the resolution needed to distinguish between low-level purifying selection and absolute stasis.

2. **Gene-wide information sharing.** B-STILL pools information across all sites to infer a data-specific distribution of selective pressures. This empirical prior establishes the baseline expectation of conservation for the gene, so the EBF at each site measures the "surprise" of invariance relative to what the gene as a whole predicts.

The underlying evolutionary process uses the MG94×REV codon model. Nucleotide exchangeability parameters and branch lengths are estimated from a GTR fit and held fixed, while site-specific synonymous ($\alpha$) and non-synonymous ($\beta$) rates are inferred via the grid. Posterior estimation uses zeroth-order Variational Bayes (VB0) by default, with Collapsed Gibbs and Metropolis-Hastings MCMC as alternatives.

### Invariance Hypotheses

B-STILL evaluates four invariance conditions at each site:

- **$\alpha = \beta = 0$ (exact invariance).** Both rates are exactly zero. The site is completely invariant.
- **$\alpha = 0$ (synonymous invariance).** No synonymous substitutions. Can indicate nucleotide-level constraint (RNA structure, splicing signals, exonic regulatory elements).
- **$\beta = 0$ (non-synonymous invariance).** No non-synonymous substitutions. Reflects protein-level constraint on the encoded amino acid.
- **$E[S] < X$ (proximal stasis).** The total expected number of substitutions across the entire phylogeny falls below the radius threshold $X$ (default: 0.5). This is the **primary test** reported by B-STILL and is generally a better predictor of biological constraint than exact stasis, because it accounts for low-level mutational leakage at functionally constrained positions.

The distinction between synonymous and non-synonymous invariance is biologically informative. Sites with high $\text{EBF}[\alpha = 0]$ but low non-synonymous constraint may harbor functional RNA elements overlapping the coding sequence. Sites with high $\text{EBF}[\beta = 0]$ but permissive synonymous rates reflect standard protein-level purifying selection.

### Empirical Bayes Factors

The primary statistical metric is the Empirical Bayes Factor (EBF), which compares the posterior odds of a given state $S$ to the gene-wide prior odds:

$$\text{EBF}(S) = \frac{P(S \mid \text{Data}) \,/\, (1 - P(S \mid \text{Data}))}{P(S) \,/\, (1 - P(S))}$$

An EBF $\geq 10$ (the default threshold) indicates that the data have shifted the odds of invariance by a factor of 10 relative to the prior. EBFs are codon-aware: two amino-acid-identical sites can yield different EBFs depending on the synonymous redundancy of the fixed codon, because stasis at a highly degenerate codon (e.g., 4-fold Serine) is more "surprising" than at a low-redundancy codon (e.g., 2-fold Tyrosine).

B-STILL requires sufficient evolutionary depth to be informative. In shallow trees, the probability of zero substitutions under neutrality is already high, so B-STILL will correctly report few or no significant sites. The method becomes powerful when total tree length $T > 2$.

## Input Parameters

### Required Inputs

- **Genetic Code**: The genetic code to use (default: `"Universal"`).
- **Alignment File**: An in-frame codon alignment file (supported formats: `.fasta`, `.nex`, etc.).
- **Phylogenetic Tree**: A phylogenetic tree (Newick format) appended to the FASTA file or embedded within the NEXUS file.

### Optional Inputs

- **Grid Points**: Number of grid points per dimension; total grid size is $D^2$ (default: `20`, range: 5-50).
- **Posterior Estimation Method**: Choose between Variational Bayes (fastest, recommended), Collapsed Gibbs sampler, or full Metropolis-Hastings MCMC.
- **MCMC Chains**: Number of MCMC chains to run (default: `5`, only for MH method).
- **Chain Length**: Length of each MCMC chain (default: `2,000,000`, only for MCMC methods).
- **Burn-in**: Number of burn-in samples (default: half of chain length, only for MCMC methods).
- **Samples**: Number of posterior samples to draw per chain (default: `100`, only for MCMC methods).
- **Concentration Parameter**: Concentration parameter for the Dirichlet prior (default: `0.5`, range: 0.001-1).
- **Non-zero Synonymous Rates**: Whether to exclude zero synonymous rates from the grid (default: `"No"`).
- **EBF Threshold**: Empirical Bayes Factor threshold for reporting proximal invariance (default: `10`).
- **Radius Threshold**: Expected substitution multiplier defining the "near-zero" selective regime (default: `0.5`, range: 0-10).
- **Cache File**: Path for saving/loading intermediate results (default: `<alignment>.FUBAR-inv.cache`).
- **Output File**: Path for the output JSON file (default: `<alignment>.FUBAR-inv.json`).

## Interpretation of Results

### Site-Level Output Details

Each site in the output includes:

- **Alpha ($\alpha$)**: Mean posterior synonymous substitution rate.
- **Beta ($\beta$)**: Mean posterior non-synonymous substitution rate.
- **Prob[$\alpha = \beta = 0$]**: Posterior probability of strict invariance.
- **Prob[$\alpha = 0$]**: Posterior probability of synonymous invariance.
- **Prob[$\beta = 0$]**: Posterior probability of non-synonymous invariance.
- **Prob[$\alpha, \beta \approx 0$]**: Posterior probability that both rates are within the proximal radius of zero.
- **Prob[$\alpha < \beta$]**: Posterior probability of positive selection (carried over from FUBAR).
- **PSRF**: Potential Scale Reduction Factor, an MCMC convergence diagnostic (MH method only).
- **Neff**: Estimated effective sample size for Prob[$\alpha < \beta$] (MH method only).
- **EBF[$\alpha = \beta = 0$]**: Empirical Bayes Factor for strict invariance.
- **EBF[$\alpha = 0$]**: Empirical Bayes Factor for synonymous invariance.
- **EBF[$\beta = 0$]**: Empirical Bayes Factor for non-synonymous invariance.
- **EBF[$\alpha, \beta \approx 0$]**: Empirical Bayes Factor for proximal invariance (the primary reported metric).

### Screen Output

B-STILL reports sites where the proximal invariance EBF exceeds the threshold (default $\geq 10$), displaying the codon position, partition, mean posterior $\alpha$ and $\beta$, posterior probability of proximal invariance, and the EBF.

## Example CLI Usage

### Full Example Command

```bash
hyphy b-still \
  --alignment path/to/alignment.fasta \
  --tree path/to/tree.nwk \
  --code Universal \
  --grid 20 \
  --method Variational-Bayes \
  --concentration_parameter 0.5 \
  --ebf 10 \
  --radius-threshold 0.5 \
  --output results.FUBAR-inv.json
```

### Minimal Example Command

```bash
hyphy b-still \
  --alignment path/to/alignment.fasta \
  --tree path/to/tree.nwk
```

### Parameters

- **`--alignment`**: Path to the in-frame codon alignment file.
- **`--tree`**: Path to the phylogenetic tree file.
- **`--code`**: Genetic code to use (default: `"Universal"`).
- **`--grid`**: Number of grid points per dimension (default: `20`).
- **`--method`**: Posterior estimation method. Options: `"Variational-Bayes"` (default, fastest), `"Collapsed-Gibbs"`, `"Metropolis-Hastings"`.
- **`--chains`**: Number of MCMC chains (default: `5`, MH only).
- **`--chain-length`**: MCMC chain length (default: `2000000`).
- **`--burn-in`**: MCMC burn-in samples (default: half of chain length).
- **`--samples`**: Posterior samples per chain (default: `100`).
- **`--concentration_parameter`**: Dirichlet prior concentration (default: `0.5`).
- **`--non-zero`**: Enforce non-zero synonymous rates (default: `"No"`).
- **`--ebf`**: EBF threshold for reporting (default: `10`).
- **`--radius-threshold`**: Expected substitution multiplier for near-zero regime (default: `0.5`).
- **`--cache`**: Path for the cache file.
- **`--output`**: Path for the output JSON file.

## Example Workflow

1. **Upload Data**:
   - Provide an alignment file and corresponding phylogenetic tree.
   - Select the genetic code and configure optional parameters.
2. **Run Analysis**:
   - Click "Run Analysis" to begin B-STILL.
3. **Review Results**:
   - View the list of sites identified as invariant (EBF above threshold).
   - Examine posterior probabilities and EBFs for different invariance hypotheses at each site.
4. **Export Results**:
   - Download the JSON output for further analysis.

## Differences from FUBAR

| Feature | FUBAR | B-STILL |
|---|---|---|
| Primary goal | Detect positive/negative selection | Quantify statistical significance of invariant sites |
| Grid design | Standard linear/log spacing | Quadratic grid concentrated near zero |
| Key innovation | Rate comparison ($\alpha$ vs $\beta$) | Gene-wide information sharing to measure "surprise" of invariance |
| Key output | Posterior probability of $\alpha < \beta$ | Posterior probability and EBF for proximal stasis ($E[S] < X$) |
| Reporting criterion | Posterior probability $\geq 0.9$ | EBF $\geq 10$ for proximal stasis |
| Invariance partitioning | Not applicable | Distinguishes synonymous ($\alpha = 0$), non-synonymous ($\beta = 0$), exact ($\alpha = \beta = 0$), and proximal ($E[S] < X$) stasis |
| Output file extension | `.FUBAR.json` | `.FUBAR-inv.json` |

## FAQ

### 1. How does B-STILL differ from simply looking at sites with low dN/dS in FUBAR?

FUBAR estimates posterior mean rates and tests whether $\alpha < \beta$ or $\alpha > \beta$. A site with low posterior mean rates in FUBAR might still have substantial posterior weight spread across non-zero grid points. B-STILL explicitly computes the posterior probability that both rates are near zero and quantifies the evidence via Empirical Bayes Factors, providing a direct and statistically rigorous test for invariance. Critically, B-STILL also leverages gene-wide information sharing to establish a data-specific baseline, so the "surprise" of invariance is calibrated against the evolutionary history of the entire gene.

### 2. What EBF threshold should I use?

The default threshold of 10 provides strong evidence for invariance. An EBF of 10 means the data have shifted the odds of invariance by a factor of 10 relative to the gene-wide prior. For more conservative analyses, use a higher threshold (e.g., 100). For exploratory analyses, lower thresholds (e.g., 5) may be appropriate.

### 3. What does the radius threshold control?

The radius threshold defines how liberally "near-zero" is interpreted. The default of 0.5 means that a grid point is considered near-zero if the total expected number of substitutions across the entire tree under those rates is less than 0.5. Lower values (e.g., 0.1) impose a stricter definition of invariance. Higher values (e.g., 1.0) are more permissive. Proximal stasis ($E[S] < X$) is generally a better predictor of biological constraint than exact stasis ($\alpha = \beta = 0$), because it accounts for low-level mutational leakage that is often present even at functionally constrained positions.

### 4. Which posterior estimation method should I use?

Zeroth-order Variational Bayes (VB0) is recommended as the default. It is the fastest method and produces comparable results to MCMC for most datasets. Use Metropolis-Hastings if you need convergence diagnostics (PSRF, Neff) or want to validate results with a full MCMC approach.

### 5. Can I use my FUBAR cache with B-STILL?

No. B-STILL uses a different grid construction (quadratic density near zero) and writes to separate cache and output files (`.FUBAR-inv.cache` and `.FUBAR-inv.json`). The two analyses must be run independently.

### 6. In an ultra-conserved gene, B-STILL reports very few significant sites despite nearly all sites being invariant. Is this correct?

Yes. This is the expected behavior of the hierarchical prior. In genes where the gene-wide expectation of stasis approaches 1.0, invariance at any individual site is not "surprising" relative to the baseline. Individual EBFs are compressed toward 1.0, and only the most anomalously constrained sites exceed the significance threshold. B-STILL correctly de-weights invariance when it is globally expected, ensuring that the method reports sites where the evidence for constraint is genuinely above and beyond what the gene as a whole predicts.
