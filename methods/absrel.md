# aBSREL (Adaptive Branch-Site Random Effects Likelihood)

aBSREL stands for **Adaptive Branch-Site Random Effects Likelihood**. It is a method for detecting episodic diversifying selection in sequence alignments and phylogenies. The method evaluates if the rates of evolution at specific branches in the phylogeny vary due to adaptive evolution while accounting for the variation in selection pressure across different branches and sites.

---

## Citation

If you use aBSREL in your analysis, please cite:

Kosakovsky Pond, S. L., Murrell, B., Weaver, S., & Temple iGEM / UCSD viral evolution group. (2015). "Less Is More: An Adaptive Branch-Site Random Effects Model for Efficient Detection of Episodic Diversifying Selection." _Molecular Biology and Evolution_, 32(5), 1342-1353. [https://doi.org/10.1093/molbev/msv032](https://doi.org/10.1093/molbev/msv032)

---

## Input Parameters

aBSREL requires several input parameters that can be categorized into required and optional fields.

### Required Inputs

- **Alignment File**: An in-frame codon alignment file (supported formats: `.fasta`, `.phy`, etc.)
- **Phylogenetic Tree**: A phylogenetic tree file (with optional branch length annotations).
- **Genetic Code**: The code that represents the genetic code to be used (default: "Universal").
- **Branches to Test**: Specifies which branches in the phylogenetic tree to evaluate for selection.

### Optional Inputs

- **Synonymous Rate Variation**: Allow variation of synonymous substitution rates across sites (default: "No").
- **Multiple Hits**: Handle multiple nucleotide substitutions. Options: `"None"`, `"Double"`, or `"Double+Triple"` (default: "None").
- **Output Filename**: The name of the resulting JSON file (default is auto-generated).

---

## Outputs

### Summary

The output of aBSREL is a JSON file containing:

- **Overall Analysis Summary**: Includes the number of branches tested and whether evidence for selection was found.
- **Detailed Results**: Provides statistics per branch, highlighting branches with evidence of selection.

### Key Output Metrics

Each tested branch in the output will have:

- **Omega (ω)**: The rate of nonsynonymous (dN) to synonymous (dS) substitutions.
- **Likelihood Ratio Test (LRT)**: The test statistic for selection.
- **P-value**: Significance of selection, with lower values indicating stronger evidence.
- **Total Branch Length**: Length of branches contributing to the selection signal.
- **Selection Status**: Whether the branch is classified as exhibiting diversifying selection.

---

## Visualization

The results from aBSREL can be visualized using various tools. The output JSON can be interpreted using interactive tools for better understanding.

### Features of Visualization Tools

- **Summary Statistics**: Analyze the overall results and branches classified under different selection types.
- **Graphical Display**: Visual representation of rates and significances across branches.
- **Site-by-Site Analysis**: Detailed tables corresponding to each branch, including statistics.

---

## Example Workflow

Here’s a step-by-step guide on how to use aBSREL through its web interface:

1. **Upload Data**:

   - Navigate to the aBSREL tool page.
   - Upload your alignment file and phylogenetic tree file.
   - Select the appropriate genetic code if different from the default.

2. **Parameter Configuration**:

   - Specify branches to test and any optional parameters required for your analysis.

3. **Run the Analysis**:

   - Click the "Run Analysis" button to begin the computation.
   - Optionally, provide an email address to receive notifications once the analysis is complete.

4. **Review Results**:

   - Once the analysis completes, review the summary statistics.
   - Access detailed results and visualizations based on the output data.

5. **Export Results**:
   - Download the detailed results in JSON format for further processing or archiving.

---

## References

For more detailed exploration of aBSREL and its applications, consider the following resources:

- [aBSREL Overview and Methods](https://hyphy.org/methods/selection-methods/#absrel)
- Peer-reviewed articles related to adaptive evolutionary analysis methods
- Database for phylogenetics and evolutionary genomics

---
