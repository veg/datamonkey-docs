# RELAX Method Documentation

RELAX (Relaxed selection test) utilizes a random effects model framework to evaluate whether a specified set of branches in a phylogenetic tree exhibits differences in evolutionary pressures relative to a reference set. The method estimates the relaxation parameter (K) to quantify the change in selection across the branches, enabling the identification of relaxed selection events.

## Citation

If you use the RELAX method in your analysis, please cite:

"RELAX: Detecting Relaxed Selection in a Phylogenetic Framework." _Molecular Biology and Evolution_, 32(3), 820-832. [https://doi.org/10.1093/molbev/msv032](https://doi.org/10.1093/molbev/msv032)

## Input Parameters

### Required Inputs

- **Genetic Code**: Specify the genetic code to use for the analysis (default: "Universal").
- **Alignment File**: Provide an in-frame codon alignment file (supported formats: `.fasta`, `.phy`, etc.).
- **Phylogenetic Tree**: Input a phylogenetic tree file annotated with branch lengths (if available).
- **Test Branches**: Designate branches to be considered as 'Test'.
- **Reference Branches**: Specify the branches to be treated as 'Reference'.

### Optional Inputs

- **Multiple Hits**: Specify options for handling multiple nucleotide substitutions. Options include `"None"`, `"Double"`, or `"Double+Triple"` (default: "None").
- **Model Selection**: Choose the analysis type: `"All"` for descriptive models and RELAX test or `"Minimal"` for only the RELAX test (default: "All").
- **Output File**: Specify a file for the resulting JSON output. By default, the output is saved as `RELAX.json`.

## Outputs

### Summary

The RELAX method generates a JSON file that contains:

- Metadata about the analysis, including the input parameters and methodology.
- Site-specific results illustrating the estimates of selection pressures for each branch.

### Site-Level Output Details

The JSON output categorizes branch-specific information, including:

- **Relaxation Parameter (K)**: Indicates whether there is evidence for relaxed selection.
- **Likelihood Ratio Test (LRT)**: Statistics used to compare the null (K=1) vs alternative (K≠1) hypotheses.
- **P-value**: Significance of the relaxation test, with lower values indicating stronger evidence for relaxation.
- **Distribution Information**: Contains the inferred rates for test/reference branches.

## Visualization

Upon completion of the analysis, users can visualize the results using the interactive RELAX Visualization Tool. This tool provides:

- **Tree Visualization**: Visual representation of the phylogenetic tree with highlighted branches indicating different selection pressures.
- **Omega Distributions**: Graphical representation of the omega rates across examined branches.
- **Statistical Results**: Display of significance levels (p-values) for individual branches.

## Example Workflow

1. **Upload Data**:

   - Begin by providing your alignment file and phylogenetic tree file.
   - Specify the genetic code and any optional parameters as needed.

2. **Run Analysis**:

   - Initiate the RELAX analysis by clicking the "Run Analysis" button on the interface.
   - An email notification can be provided to alert you upon completion.

3. **Review Results**:

   - When the analysis completes, access a summary interface that includes graphical and numerical representations of your data.
   - Adjust the p-value threshold to explore sites identified under varying selection pressures.

4. **Export Results**:
   - Download the detailed JSON results for further examination or archiving.
   - Options for exporting visualizations (SVG/PNG) of the tree are available.

## References

- [RELAX Method Overview](http://hyphy.org/methods/selection-methods/#relax)
- [RELAX Visualization Tool](https://observablehq.com/@spond/relax)
