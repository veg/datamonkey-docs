# FADE (FUBAR Approach to Directional Evolution)

FADE (**F**ast, **U**nconstrained **B**ayesian AppRoximation for **I**nferring **D**irectional **E**volution) is a statistical method designed to identify whether specific sites in a coding alignment evolve towards a certain amino acid along specific branches of a phylogeny at accelerated rates compared to a reference model. Using a random effects model, FADE employs latent Dirichlet allocation-inspired approximations to classify sites into categories based on their substitution rates and biases. This efficient method is suitable for high-dimensional data and provides essential insights into selection pressures acting on evolutionary sequences.

---

## Citation

If you use FADE in your analysis, please cite:

Kosakovsky Pond, S.L., & Frost, S.D.W. (2013). "A FUBAR Approach to Directional Evolution." _Bioinformatics_, 21(5), 676–678. [https://doi.org/10.1093/bioinformatics/bts035](https://doi.org/10.1093/bioinformatics/bts035).

---

## Input Parameters

FADE requires several inputs to conduct the analysis:

### Required Inputs

- **Alignment File**: A protein alignment in a supported format (e.g., `.fasta`, `.phy`).
- **Phylogenetic Tree**: A rooted phylogenetic tree file in a recognized format (e.g., Newick).
- **Substitution Model**: Specifies the substitution model to use (options vary by method).
- **Posterior Estimation Method**: Choose among "Metropolis-Hastings", "Collapsed Gibbs", or "Variational-Bayes".

### Optional Inputs

- **Number of Grid Points**: Defines the grid resolution for the analysis (default: 20).
- **Number of MCMC Chains**: The number of MCMC chains to run (default: 5).
- **Length of Each Chain**: Length of each MCMC chain (default: 2,000,000).
- **Number of Burn-in Samples**: Number of burn-in samples (default: 1,000,000).
- **Number of Samples**: How many samples to draw from each chain (default: 100).
- **Concentration of Dirichlet Prior**: A hyperparameter for the Dirichlet prior (default: 0.5).

---

## Outputs

FADE analysis produces a JSON result file, which includes:

- **Analysis Metadata**: Detailed information about the parameters used and the method's version.
- **Posterior Results**: Site-specific results detailing the rates of evolution and selection.
  - **Amino Acid Composition**: Composition of amino acids at each site.
  - **Substitution History**: Inferences about amino acid substitutions along the analyzed branches.
- **Bayes Factor**: A statistical measure to assess evidence for directional selection towards specific amino acids, with higher values indicating stronger evidence.

---

## Visualization

FADE results can be visualized using the FADE Visualization Tool, which allows users to interactively explore the output:

### Features

- **Site-by-Site Analysis**: Review individual site results with statistical significance.
- **Substitution Chord Diagram**: Displays inferred substitutions from one amino acid to another at selected sites.
- **Graphs and Charts**: Interactive plots of change rates and site-specific estimates.

---

## Example Workflow

1. **Upload Data**:
   - Navigate to the "FADE" tool page and upload your alignment and phylogenetic tree files.
2. **Configure Settings**:
   - Select the substitution model and posterior estimation method. Adjust any optional parameters as needed.
3. **Run Analysis**:
   - Click the "Run Analysis" button.
4. **Review Results**:
   - Access the results page, where you can view overall analysis statistics, site details, and visualizations.
5. **Export Data**:
   - Download the JSON output file for further analysis or record-keeping.

---

## References

- [FADE Documentation](http://www.hyphy.org/methods/selection-methods/#fade)
- [FADE Visualization Tool](https://observablehq.com/@spond/fade)

---
