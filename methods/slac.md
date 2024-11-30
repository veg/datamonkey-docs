# Single Likelihood Ancestor Counting (SLAC)

SLAC (**S**ingle **L**ikelihood **A**ncestor **C**ounting) is a method for estimating site-specific rates of synonymous (dS) and nonsynonymous (dN) substitutions in a coding sequence alignment, along a given phylogenetic tree. It employs a maximum likelihood ancestral state reconstruction coupled with a minimum path distance approach to aggregate information across all branches of the given phylogeny. This method is especially useful for analyzing the selection pressures acting on genes, identifying sites under positive, negative, or neutral selection.

---

## Citation

If you use SLAC in your analysis, please cite:

Kosakovsky Pond, S.L., & Frost, S.D.W. (2005). "Not So Different After All: A Comparison of Methods for Detecting Amino Acid Sites Under Selection." _Molecular Biology and Evolution_, 22(5), 1208–1222. [https://doi.org/10.1093/molbev/msi105](https://doi.org/10.1093/molbev/msi105)

---

## Input Parameters

SLAC requires the following inputs:

### Required Inputs

- **Genetic Code**: The genetic code to be used for the analysis (default: "Universal").
- **Alignment File**: An in-frame codon alignment file supported in formats such as `.fasta`, `.nex`, and `.phy`.
- **Phylogenetic Tree**: A file representing the phylogenetic tree (optionally annotated with branch lengths).
- **Branches to Test**: The specific branches of the tree to include in the analysis (default: "All").

### Optional Inputs

- **Number of Samples**: The number of samples for assessing uncertainty in ancestral reconstruction (default: 100).
- **P-value Threshold**: The significance level for determining selection (default: 0.1).
- **Output File**: The name of the resulting JSON file, automatically generated if not specified.

---

## Outputs

### Summary

SLAC generates a JSON file that includes:

- Analysis details, including metadata and input parameters.
- A comprehensive summary table of selection results, containing information on synonymous and nonsynonymous substitutions.

### Site-Level Output Details

For each site examined, the output includes:

- **ES**: Expected synonymous sites.
- **EN**: Expected nonsynonymous sites.
- **S**: Observed synonymous substitutions.
- **N**: Observed nonsynonymous substitutions.
- **dS**: Inferred synonymous substitution rate.
- **dN**: Inferred nonsynonymous substitution rate.
- **dN-dS**: The difference scaled by branch length.
- **P [dN/dS > 1]**: Statistical significance for positive selection.
- **P [dN/dS < 1]**: Statistical significance for negative selection.
- **Total Branch Length**: The total length of branches contributing to inference at this site.

---

## Visualization

SLAC results can be visualized through interactive tools available on the web platform. Key features include:

- **Graphs**: Represent dN and dS estimates across sites.
- **Tables**: Sorted display of site-by-site results with filtering options.
- **Tree View**: Phylogenetic trees highlighting branches analyzed for selection.

---

## Example Workflow

1. **Upload Data**:

   - Access the SLAC tool via the website interface.
   - Upload your alignment file and corresponding phylogenetic tree.
   - Configure the genetic code and other parameters as necessary.

2. **Run Analysis**:

   - Click on the "Run Analysis" button to initiate SLAC analysis.
   - (Optionally) Provide an email to receive notifications upon completion.

3. **Review Results**:

   - Navigate to the results page to view summary statistics and graphical representations.
   - Utilize filtering options to refine results based on statistical significance.

4. **Export Results**:
   - Download the resulting JSON file for further analysis or report generation.

---

## References

- [Observable SLAC Visualization Tool](https://example.com/slac-visualization)
- Kosakovsky Pond, S.L., & Frost, S.D.W. (2005). "Not So Different After All: A Comparison of Methods for Detecting Amino Acid Sites Under Selection." _Molecular Biology and Evolution_, [Link to publication](https://doi.org/10.1093/molbev/msi105).
