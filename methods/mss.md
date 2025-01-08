# Multiple Synonymous Substitution (MSS)

MSS (**M**ultiple **S**ynonymous **S**ubstitution) 


uses a maximum-likelihood (ML) approach to infer nonsynonymous (dN) and synonymous (dS) substitution rates on a per-site basis for a coding alignment and phylogeny. This method assumes the selection pressure at each site remains constant across the phylogeny.

After optimizing branch lengths and nucleotide substitution parameters, FEL fits an MG94xREV model to each codon site to estimate site-specific nonsynonymous (dN) and synonymous (dS) substitution rates. A Likelihood Ratio Test (LRT) determines if dN is significantly greater than dS, indicating selection.

## Citation

If you use MSS in your analysis, please cite:

Verdonk, H., Pivirotto, A., Pavinato, V., Hey, J., & Kosakovsky Pond, S.L. (2025). "A new comparative framework for estimating selection on synonymous substitutions." _Molecular Biology and Evolution_, 


22(5), 1208–1222. [https://doi.org/10.1093/molbev/msi105](https://doi.org/10.1093/molbev/msi105)

## Analysis of a single gene
### Required Inputs

- **Genetic Code**: The genetic code to use (default: "Universal").
- **Alignment File**: An in-frame codon alignment file (supported formats: `.fasta`, `.phy`, etc.).
- **Phylogenetic Tree**: A phylogenetic tree (with optional branch length annotations) appended to the FASTA file or embedded within the NEXUS file.
- **Branches to Test**

### Optional Inputs

- **Synonymous Rate Variation**: Enable/disable synonymous rate variation (default: "Yes").
- **Multiple Hits**: Specify how to handle multiple nucleotide substitutions. Options: `"None"`, `"Double"`, or `"Double+Triple"` (default: "None").
- **Output File**: Automatically generated in JSON format.

## Joint analysis of several genes
### Required Inputs

- **Genetic Code**: The genetic code to use (default: "Universal").
- **Model**: SynREVCodon
- **File list**: A text list of newline-separated file paths, where each listed file contains a codon-aware alignment and the corresponding gene tree
- **Omega**: How alignment-level omega estimates should be handled (default: "Fix"; Fix omega estimates at those obtained with the standard MG94xREV model)

### Optional Inputs
- **Output File**: Automatically generated in JSON format.











## Outputs

### Summary

MSS generates a JSON file containing:

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

## Example CLI Usage of the FEL Analysis

### Full Example Command

To run the FEL analysis with specified parameters, use the following command syntax:

```bash
/path/to/hyphy/hyphy fel \
  --alignment path/to/alignment_file.phy \
  --tree path/to/tree_file.nwk \
  --code Universal \
  --branches All \
  --srv Yes \
  --resample 50 \
  --ci Yes \
  --multiple-hits Double \
  --site-multihit Estimate \
  --output results.json
```

### Minimal Example Command

A minimal command using default parameters would look like this:

```bash
/path/to/hyphy/hyphy fel \
  --alignment path/to/alignment_file.phy \
  --tree path/to/tree_file.nwk
```

### List of Parameters

- **--alignment**: Path to the in-frame codon alignment file.
- **--tree**: Path to the phylogenetic tree file (optionally annotated).
- **--code**: Genetic code to use (default is "Universal").
- **--branches**: Branches to include in the analysis (default is "All").
- **--srv**: Include synonymous rate variation in the model (default is "Yes").
- **--multiple-hits**: Specify handling of multiple nucleotide substitutions (default is "None").
- **--resample**: Number of bootstrap resamples to perform (default is 0, meaning no resampling).
- **--ci**: Compute confidence intervals for estimated rates (default is "No").
- **--output**: Path to save the resulting JSON output file (default is auto-generated).
- **--site-multihit**: Specify whether to estimate multiple hit rates for each site (default is "Estimate").

## References

- [Observable FEL Visualization](https://observablehq.com/@spond/fel)

## FAQ

### 1. Why do results differ significantly between FEL and SLAC?

FEL detects site-wise selection pressures, whereas SLAC assesses average rates
over the entire alignment. These differences in assumptions and methodologies
can lead to discrepancies. Always consider the evolutionary context and
sampling when int erpreting these results.

### 2. How do I handle gaps in my nucleotide alignment when running selection analyses like FEL or MEME?

Gaps may be interpreted as missing data by HyPhy. It’s generally best to
minimize gaps through alignment trimming tools like TrimAI before inputting
into HyPhy.
