# Contrast-FEL Documentation

Contrast-FEL (**Contrast Fixed Effects Likelihood**) is a method used to assess whether selective pressures differ between two or more sets of branches at a particular site in a phylogenetic tree. By estimating site-specific nonsynonymous (dN) and synonymous (dS) substitution rates, this method incorporates likelihood ratio tests (LRT) and permutation tests to evaluate the significance of the differences observed.

## Citation

If you use Contrast-FEL in your analysis, please cite:

Kosakovsky Pond, S.L., & Weaver, S. (2021). "Contrast-FEL: A Method for Analyzing Evolutionary Selection at the Codon Level," _Molecular Biology and Evolution_, 38(3), 1184–1198. [https://doi.org/10.1093/molbev/msaa252](https://doi.org/10.1093/molbev/msaa252)

## Input Parameters

### Required Inputs

- **Alignment File**: An in-frame codon alignment file in a supported format (e.g., `.fasta`, `.phy`).
- **Phylogenetic Tree**: A phylogenetic tree file (with optional branch length annotations).
- **Branch Sets**: A specification of which branches to compare (e.g., "Source" and "Test" groups).

### Optional Inputs

- **Genetic Code**: The genetic code to use for translation (default: "Universal").
- **Synonymous Rate Variation**: Enable/disable synonymous rate variation (default: "Yes").
- **Permutations**: Specify whether to perform permutation tests (default: "Yes").
- **P-value Threshold**: The significance value for site tests (default: 0.05).
- **Q-value Threshold**: The significance value for False Discovery Rate reporting (default: 0.20).
- **Output File**: Specify an output file for the results (default is automatic JSON file generation).

## Outputs

### Summary

Contrast-FEL generates a JSON file that contains:

- Metadata about the analysis and input parameters.
- Site-by-site substitution rate estimates and significance statistics.

### Site-Level Output Details

For each codon in the output:

- **Alpha (α)**: Relative synonymous substitution rate.
- **Beta (β)**: Relative nonsynonymous substitution rates for tested branches.
- **P-value**: Significance of the selection test (lower values indicate stronger evidence of differential selection).
- **Q-value**: Adjusted p-value for False Discovery Rate.
- **Total Branch Length**: Length of contributing branches used for inference.
- **Substitution Counts**: Counts of substitutions mapped to each branch set.

## Visualization

Analyses from Contrast-FEL can be visualized using interactive tools available in the web interface. Visualization features include:

- **Site-Level Plots**: Display of alpha and beta estimates across sites.
- **Statistical Summaries**: Interactive tables showcasing substitutions and significance levels.
- **Phylogenetic Trees**: Graphical representation of the tree structure highlighting selected branches and results.

## Example Workflow

1. **Upload Data**:
   - Access the Contrast-FEL webpage and select the relevant alignment file and phylogenetic tree file.
   - Define the branch sets you want to compare.
2. **Configure Analysis**:

   - Choose optional settings such as genetic code, synonymous rate variation, and significance thresholds.

3. **Run Analysis**:

   - Click the "Run Analysis" button to initiate the Contrast-FEL computation.
   - Optionally, provide an email address to receive notifications upon completion.

4. **Review Results**:

   - Upon completion, explore the results via summary statistics, p-values, q-values, and visualizations.
   - Access the detailed JSON output for downloadable insights.

5. **Export and Document**:
   - Results can be exported for further analysis or reporting purposes.

## References

- [Contrast-FEL Official Methodology](https://hyphy.org/methods/other/contrast-fel/)
- Kosakovsky Pond, S.L., & Weaver, S. (2021). "Contrast-FEL: A Method for Analyzing Evolutionary Selection at the Codon Level," _Molecular Biology and Evolution_. [Link to Article](https://doi.org/10.1093/molbev/msaa252)