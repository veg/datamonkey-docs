# BUSTED 

BUSTED (**B**ranch-Site **U**nrestricted **S**tatistical **T**est for **E**pisodic **D**iversification) is a sophisticated method for detecting episodic diversifying selection across branches in a phylogenetic tree. Utilizing a random effects model, BUSTED evaluates gene-wide evidence of selection while accommodating for variations in synonymous substitution rates. The model tests for signatures of positive selection by examining the likelihood of substitution patterns, providing an insight into the evolutionary pressures that may have acted upon coding sequences.

---

## Citation

If you utilize the BUSTED method in your work, please cite:

Kosakovsky Pond, S.L., & Frost, S.D.W. (2015). "Gene-wide identification of episodic selection." *Molecular Biology and Evolution*, 32(5), 1365-1371. [https://doi.org/10.1093/molbev/msv029](https://doi.org/10.1093/molbev/msv029)

---

## Input Parameters

### Required Inputs

- **Alignment File**: An in-frame codon alignment file, supported formats include `.fasta`, `.phy`, etc.
- **Phylogenetic Tree**: A file containing the phylogenetic tree structure (optionally annotated with branch lengths).
- **Genetic Code**: The intended genetic code for the analysis (default: "Universal").

### Optional Inputs

- **Branches to Test**: Branches from the phylogeny that you wish to investigate for episodic selection (default: "All").
- **Synonymous Rate Variation**: Option to include variations in synonymous substitution rates (options: "Yes", "No", or "Branch-site"; default: "Yes").
- **Multiple Hits**: Support for handling multiple nucleotide substitutions (options: `"None"`, `"Double"`, or `"Double+Triple"`; default: "None").
- **Error Protection**: To enhance robustness against errors in alignment, this can be enabled or disabled (default: "No").
- **Output File**: The name of the resulting JSON output file (default is auto-generated).

---

## Outputs

### Summary

BUSTED produces a JSON file summarizing the analysis results, including key metrics and findings regarding selection pressures.

### Key Output Elements

- **Likelihood Ratio Test (LRT)**: Provides statistical evidence for the presence of episodic diversifying selection (p-value threshold typically set at 0.05).
- **Evidence Ratios**: Ratio of the likelihoods for models with and without selection, informing the level of support for selection.
- **Site-Specific Likelihoods**: Evaluations of likelihood at individual codon sites which are stored site-wise.
- **Distribution Estimates**: Information on the distribution of omega ratios (dN/dS), indicating rates of nonsynonymous and synonymous substitutions.

---

## Visualization

BUSTED integrates with Hyphy's visualization tools, allowing for:

- **Tree Representation**: Visual portrayal of branches and associated statistical results.
- **Distribution Plots**: Interactive distribution graphs illustrating quantity and type of substitutions across sites.
- **Statistical Summaries**: Quick access to summary statistics, including evidence ratios and p-values.

---

## Example Workflow

1. **Upload Data**:
   - Select and upload your sequence alignment file and corresponding phylogenetic tree file.
   - Choose the appropriate parameters for analysis (genetic code, branches to test).

2. **Run Analysis**:
   - Submit your data by selecting "Run Analysis". 
   - Optionally, provide an email address to receive notifications upon completion.

3. **Review Results**:
   - Access the results in a structured format, including key statistics, plots, and visualizations.
   - Utilize interactive features to explore different selection sites and their classifications.

4. **Export Results**:
   - Download the JSON results for archiving or further analyses with associated metadata.

---

## References 

- For a more in-depth understanding of the BUSTED method and its context within evolutionary biology, consult the following resources:
  - [BUSTED Documentation](http://hyphy.org/methods/selection-methods/#busted).
  - Kosakovsky Pond, S.L., & Frost, S.D.W. (2015). "Gene-wide identification of episodic selection." *Molecular Biology and Evolution* [Link to Article](https://doi.org/10.1093/molbev/msv029).

--- 

This documentation provides an essential overview for users looking to apply the BUSTED method to their evolutionary analyses, ensuring clarity in understanding both the model's functionality and its implementation.
