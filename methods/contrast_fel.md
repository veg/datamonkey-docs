# Contrast-FEL Documentation

<iframe width="560" height="315" src="https://www.youtube.com/embed/UROQ6w9j0DU?si=ABsf8WhiYKO9ZetN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Contrast-FEL (**Contrast Fixed Effects Likelihood**) is a method used to assess whether selective pressures differ between two or more sets of branches at a particular site in a phylogenetic tree. By estimating site-specific nonsynonymous (dN) and synonymous (dS) substitution rates, this method incorporates likelihood ratio tests (LRT) and permutation tests to evaluate the significance of the differences observed.

## Citation

If you use Contrast-FEL in your analysis, please cite:

[Kosakovsky Pond, Sergei L., et al. "Contrast-FEL—a test for differences in selective pressures at individual sites among clades and sets of branches." Molecular biology and evolution 38.3 (2021): 1184-1198.](https://doi.org/10.1093/molbev/msaa263)

## Input Parameters

### Required Inputs

- **Alignment File**: An in-frame codon alignment file in a supported format (e.g., `.fasta`, `.phy`).
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

   - Access the Contrast-FEL webpage and select the relevant alignment with phylogenetic tree file.
   - Define the branch sets you want to compare.

2. **Configure Analysis**:

   - Choose optional settings such as genetic code.

3. **Run Analysis**:

   - Click the "Run Analysis" button to initiate the Contrast-FEL computation.
   - Optionally, provide an email address to receive notifications upon completion.

4. **Review Results**:

   - Upon completion, explore the results via summary statistics, p-values, q-values, and visualizations.
   - Access the detailed JSON output for downloadable insights.

5. **Export and Document**:
   - Results can be exported for further analysis or reporting purposes.

## FAQ

### 1. How should I choose test and reference branches when running Contrast-FEL?

The selection of test and reference branches must align with your biological hypothesis. Here are some tips:

- For comparing multiple groups, you can specify multiple branch sets, which generates all pairwise tests.
- Utilize built-in sets like "Internal", "Leaves", and "Unlabeled branches" to focus your analysis on specific parts of your tree.
- For specific comparisons, use annotations in your input tree or selection to ensure you're testing the desired taxa.

### 2. Why might I see significant differences in dN/dS ratios but no evidence of selection?

Significant differences in dN/dS ratios can occur without evidence of
directional selection if the sample sizes for your groups are too small, which
leads to imprecise estimates of selection pressure.

### 3. Can I use Contrast-FEL for analyzing more than two groups?

Yes, Contrast-FEL can conduct analyses on multiple groups. The analysis will
generate pairwise comparisons and an omnibus test to assess overall differences
among the selected branches.

### 4. How do I interpret conflicting selection signals from Contrast-FEL and other tests?

It’s essential to recognize that different methods can yield varying results
based on their underlying models and assumptions. If Contrast-FEL indicates
selection at specific sites while models like BUSTED-PH does not find evidence for
selection, consider:

- The context of site-level versus gene-level assessments.
- The robustness of your dataset in terms of size and variability.
- Functional annotations and biological relevancy of the findings might help clarify discrepancies.
