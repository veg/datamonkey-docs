# Fixed Effects Likelihood (FEL)

FEL (**F**ixed **E**ffects **L**ikelihood) uses a maximum-likelihood (ML) approach to infer nonsynonymous (dN) and synonymous (dS) substitution rates on a per-site basis for a coding alignment and phylogeny. This method assumes the selection pressure at each site remains constant across the phylogeny.

After optimizing branch lengths and nucleotide substitution parameters, FEL fits an MG94xREV model to each codon site to estimate site-specific nonsynonymous (dN) and synonymous (dS) substitution rates. A Likelihood Ratio Test (LRT) determines if dN is significantly greater than dS, indicating selection.

---

## Citation

If you use FEL in your analysis, please cite:

Kosakovsky Pond, S.L., & Frost, S.D.W. (2005). "Not So Different After All: A Comparison of Methods for Detecting Amino Acid Sites Under Selection." _Molecular Biology and Evolution_, 22(5), 1208–1222. [https://doi.org/10.1093/molbev/msi105](https://doi.org/10.1093/molbev/msi105)

---

## Input Parameters

FEL requires the following inputs:

### Required Inputs

- **Genetic Code**: The genetic code to use (default: "Universal").
- **Alignment File**: An in-frame codon alignment file (supported formats: `.fasta`, `.phy`, etc.).
- **Phylogenetic Tree**: A phylogenetic tree file (with optional branch length annotations).
- **Branches to Test**

### Optional Inputs

- **Synonymous Rate Variation**: Enable/disable synonymous rate variation (default: "Yes").
- **Multiple Hits**: Specify how to handle multiple nucleotide substitutions. Options: `"None"`, `"Double"`, or `"Double+Triple"` (default: "None").
- **Output File**: Automatically generated in JSON format.

---

## Outputs

### Summary

FEL generates a JSON file containing:

- Analysis details, including metadata and input parameters.
- Site-by-site results with estimates of selection pressures and statistical significance.

### Site-Level Output Details

Each codon in the output includes:

- **Alpha (α)**: Relative synonymous substitution rate.
- **Beta (β)**: Relative nonsynonymous substitution rate for tested branches.
- **Likelihood Ratio Test (LRT)**: Statistic comparing null (dN = dS) vs. alternative (dN ≠ dS).
- **P-value**: Significance of selection (lower values indicate stronger evidence).
- **Total Branch Length**: Length of branches used for inference.
- **Selection Classification**: Sites categorized as diversifying, purifying, or neutral.

---

## Visualization

Use the [FEL Visualization Tool](https://observablehq.com/@spond/fel) for an interactive exploration of results.

### Features

- **Summary Statistics**:
  - Number of sequences and codons analyzed.
  - Sites under diversifying or purifying selection.
- **Plots**:
  - Alpha/beta site-level estimates.
  - dN/dS distributions for tested sites.
- **Site-by-Site Results**:
  - A detailed table of codons with estimates, LRT scores, and p-values.
  - Phylogenetic tree view highlighting branches contributing to the analysis.

---

## Example Workflow

1. **Upload Data**:
   - Provide an alignment file and corresponding phylogenetic tree.
   - Configure the genetic code and other optional parameters.
2. **Run Analysis**:
   - Click "Run Analysis" to begin the FEL analysis.
   - Optionally, provide an email address to be notified upon completion.
3. **Review Results**:
   - View summary statistics and plots in the results interface.
   - Adjust the p-value threshold to explore sites under different selection categories.
4. **Export Results**:
   - Download detailed JSON results for further analysis or archiving.

---

## References

- [Observable FEL Visualization](https://observablehq.com/@spond/fel)
