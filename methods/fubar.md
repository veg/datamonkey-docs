# Fast Unconstrained Bayesian AppRoximation (FUBAR)

FUBAR (**F**ast **U**nconstrained **B**ayesian **A**ppRoximation) is a statistical method designed to detect selection pressures acting on specific sites within coding sequences. It utilizes a Bayesian framework to estimate the posterior distribution of nonsynonymous (dN) and synonymous (dS) substitution rates across a phylogenetic tree. This method allows researchers to infer whether certain sites are subjected to positive (diversifying) or negative (purifying) selection based on their evolutionary history.

---

## Citation

If you use FUBAR in your analysis, please cite:

Kosakovsky Pond, S.L., & Frost, S.D.W. (2013). "A Fast Unconstrained Bayesian AppRoximation for Inferring Selection." _Molecular Biology and Evolution_, 30(5), 1196-1205. [https://doi.org/10.1093/molbev/mst059](https://doi.org/10.1093/molbev/mst059)

---

## Input Parameters

FUBAR requires the following inputs:

### Required Inputs

- **Genetic Code**: The genetic code to be used (default: "Universal").
- **Alignment File**: An in-frame codon alignment file (supported formats: `.fasta`, `.nex`, etc.).
- **Phylogenetic Tree**: A phylogenetic tree file (with optional branch length annotations).

### Optional Inputs

- **Number of Grid Points**: Specifies the number of grid points for the Bayesian analysis (default: `20`; must be between `5` and `50`).
- **Concentration of Dirichlet Prior**: The concentration parameter for the Dirichlet prior in the Bayesian estimation (default: `0.5`; must be between `0.001` and `1`).
- **Number of MCMC Chains**: Number of Markov Chain Monte Carlo (MCMC) chains to run (default: `1`; suitable values typically range from `1` to `20`).
- **Length of Each Chain**: Duration of each MCMC chain (default: varies based on input data).
- **Number of Burn-in Samples**: Number of samples discarded at the beginning of the MCMC run (default: `20`).
- **Number of Samples**: Total number of samples to draw from each MCMC chain (default: to be determined based on chain length).

---

## Outputs

### Summary

FUBAR produces a JSON file containing the results of the analysis, including:

- Analysis metadata and input parameters used.
- Site-level results where each codon is evaluated for selection pressures.

### Site-Level Output Details

Each codon in the output will include:

- **Alpha (α)**: Mean posterior synonymous substitution rate.
- **Beta (β)**: Mean posterior nonsynonymous substitution rate.
- **Alpha - Beta**: Difference in rates indicating selection pressure.
- **Posterior Probability**: Probability of positive selection at a site.
- **Bayes Factor**: Statistical measure indicating the evidence for positive selection at each site.

---

## Visualization

The results from FUBAR can be visualized using built-in interactive tools, displaying the posterior distributions of substitution rates. These visualizations facilitate the interpretation of sites under selection:

### Features

- **Site-Specific Distributions**: Users can interactively explore substitution rates for individual sites versus overall rates.
- **Heatmap Display**: A color-coded grid can represent varying levels of selection pressure.
- **Export Options**: Visualizations can be saved as SVG or PNG files for reports or presentations.

---

## Example Workflow

1. **Upload Data**:

   - Provide an alignment file and a corresponding phylogenetic tree, ensuring correct formatting.
   - Select the appropriate genetic code and configure any optional parameters based on your analysis needs.

2. **Run Analysis**:

   - Click "Run Analysis" to initiate the FUBAR computation. Progress updates may be provided via the user interface.
   - Allow time for completion based on the complexity of the input data.

3. **Review Results**:

   - After the analysis is complete, review generated output files and the interactive visualization tool.
   - Access site-level estimates, summary statistics, and explore various plots.

4. **Export Results**:
   - Results can be downloaded in JSON format for further analysis or kept for record-keeping.
   - Use the available buttons to export visualizations as images.

---

## References

- [FUBAR Documentation](http://www.hyphy.org/methods/selection-methods/#fubar)
- [Observable FUBAR Visualization](https://observablehq.com/@spond/fubar)
