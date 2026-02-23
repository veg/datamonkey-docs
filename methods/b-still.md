# B-STILL (Bayesian Significance Test of Invariant Low Likelihoods)

B-STILL (**B**ayesian **S**ignificance **T**est of **I**nvariant **L**ow **L**ikelihoods) is a modified version of [FUBAR](/methods/fubar) designed to detect **invariant sites** in coding sequence alignments. While FUBAR focuses on identifying sites under positive or negative selection, B-STILL specifically tests whether individual sites are effectively invariant (both synonymous and non-synonymous substitution rates near zero) and quantifies the evidence using posterior probabilities and Empirical Bayes Factors (EBFs).

B-STILL is useful when the biological question is not "where is selection acting?" but rather "which sites are so constrained that they tolerate virtually no substitutions at all?" This complements standard selection analyses by identifying the most conserved positions in a protein.

## Citation

If you use B-STILL in your analysis, please cite the underlying FUBAR methodology:

[Murrell, B et al. "FUBAR: A Fast, Unconstrained Bayesian AppRoximation for inferring selection." Mol. Biol. Evol. 30, 1196-1205 (2013).](https://doi.org/10.1093/molbev/mst030)

## How It Works

B-STILL shares the same computational framework as FUBAR but modifies the grid construction and post-processing to focus on invariance detection:

1. **Nucleotide Model Fit**: A GTR nucleotide model is fitted to estimate nucleotide substitution biases.
2. **Grid Construction**: A 2D grid of synonymous ($\alpha$) and non-synonymous ($\beta$) rate values is constructed. Unlike standard FUBAR, B-STILL uses a **denser grid around zero** (via a quadratic spacing: $x^2$), concentrating resolution where it matters most for detecting invariance.
3. **Conditional Likelihood Computation**: Site-specific likelihoods are computed at each grid point using the MG94×REV codon model with branch lengths scaled from the GTR fit.
4. **Posterior Estimation**: A Bayesian posterior distribution over the grid is estimated using one of three methods: Variational Bayes (fastest, recommended), Collapsed Gibbs sampling, or full Metropolis-Hastings MCMC.
5. **Invariance Testing**: For each site, B-STILL computes posterior probabilities and Empirical Bayes Factors for several invariance hypotheses.

### Invariance Hypotheses

B-STILL evaluates multiple invariance conditions at each site:

- **$\alpha = \beta = 0$** (strict invariance): Both synonymous and non-synonymous rates are exactly zero. The site is completely invariant.
- **$\alpha = 0$** (synonymous invariance): No synonymous substitutions occur at this site.
- **$\beta = 0$** (non-synonymous invariance): No non-synonymous substitutions occur at this site.
- **$\alpha, \beta \approx 0$** (proximal invariance): Both rates fall within a user-defined radius of zero, based on the expected number of substitutions. This is the primary test reported by B-STILL. Sites passing this threshold have substitution rates so low that the expected number of substitutions per branch is negligible.

### Proximal Invariance and the Radius Threshold

The proximal invariance test uses a biologically motivated criterion. Rather than testing whether rates are exactly zero (which is a point hypothesis on a continuous grid), B-STILL defines a "near-zero" region using a **radius threshold** parameter. A grid point $(\alpha, \beta)$ is considered proximal to zero if the expected number of substitutions under those rates (computed from the fitted branch length expression) falls below the threshold value. The default radius threshold of 0.5 means that grid points where the expected substitution count is less than half a substitution per site across the tree are considered "effectively invariant."

### Empirical Bayes Factors

B-STILL reports Empirical Bayes Factors (EBFs) for each invariance hypothesis. The EBF compares the posterior odds to the prior odds:

$$\text{EBF} = \frac{P(\text{invariant} \mid \text{data}) / P(\text{not invariant} \mid \text{data})}{P(\text{invariant}) / P(\text{not invariant})}$$

An EBF $\geq 10$ (the default threshold) provides strong evidence that a site is invariant. Higher EBF values indicate stronger evidence. The prior probability is derived from the marginal posterior weights over the grid.

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
| Primary goal | Detect positive/negative selection | Detect invariant sites |
| Grid design | Standard spacing | Denser grid around zero ($x^2$ spacing) |
| Key output | Posterior probability of $\alpha < \beta$ | Posterior probability and EBF for $\alpha, \beta \approx 0$ |
| Reporting criterion | Posterior probability $\geq 0.9$ | EBF $\geq 10$ for proximal invariance |
| Output file extension | `.FUBAR.json` | `.FUBAR-inv.json` |

## FAQ

### 1. How does B-STILL differ from simply looking at sites with low dN/dS in FUBAR?

FUBAR estimates posterior mean rates and tests whether $\alpha < \beta$ or $\alpha > \beta$. A site with low posterior mean rates in FUBAR might still have substantial posterior weight spread across non-zero grid points. B-STILL explicitly computes the posterior probability that both rates are near zero and quantifies the evidence via Empirical Bayes Factors, providing a direct and statistically rigorous test for invariance.

### 2. What EBF threshold should I use?

The default threshold of 10 provides strong evidence for invariance. An EBF of 10 means the data have shifted the odds of invariance by a factor of 10 relative to the prior. For more conservative analyses, use a higher threshold (e.g., 100). For exploratory analyses, lower thresholds (e.g., 5) may be appropriate.

### 3. What does the radius threshold control?

The radius threshold defines how liberally "near-zero" is interpreted. The default of 0.5 means that a grid point is considered near-zero if the expected number of substitutions under those rates is less than half a substitution across the tree. Lower values (e.g., 0.1) impose a stricter definition of invariance; higher values (e.g., 1.0) are more permissive.

### 4. Which posterior estimation method should I use?

Variational Bayes is recommended as the default. It is the fastest method and produces comparable results to MCMC for most datasets. Use Metropolis-Hastings if you need convergence diagnostics (PSRF, Neff) or want to validate results with a full MCMC approach.

### 5. Can I use my FUBAR cache with B-STILL?

No. B-STILL uses a different grid construction (denser around zero) and writes to separate cache and output files (`.FUBAR-inv.cache` and `.FUBAR-inv.json`). The two analyses must be run independently.

## References

- Murrell, B et al. "FUBAR: A Fast, Unconstrained Bayesian AppRoximation for inferring selection." Mol. Biol. Evol. 30, 1196-1205 (2013).
