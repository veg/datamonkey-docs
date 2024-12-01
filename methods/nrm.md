# Non-Reversibility of the Evolutionary Process (NRM)

NRM (**N**on-**R**eversibility of the **E**volutionary **P**rocess) is a statistical method used to test the non-reversibility of nucleotide substitutions in evolutionary models. This approach helps researchers to identify whether the evolutionary process at certain sites in a DNA sequence is reversible or not, providing vital insights into molecular evolution and the underlying selection pressures that shape genetic diversity.

---

## Citation

If you use NRM in your analysis, please cite:

Kosakovsky Pond, S.L., & Frost, S.D.W. (2005). "Not So Different After All: A Comparison of Methods for Detecting Amino Acid Sites Under Selection." _Molecular Biology and Evolution_.

---

## Input Parameters

### Required Inputs

- **Alignment File**: A fasta or other supported format file containing the sequence alignments for the analysis.
- **Phylogenetic Tree**: A file representing the phylogenetic relationships (newick format preferred).
- **Genetic Code**: The genetic code to apply (default is "Universal").

### Optional Inputs

- **Rate Classes**: The number of classes for rates (default: 1).
- **Triple Islands**: Specify whether to use triple islands (default: "No").
- **Receive Email**: An option to receive an email notification upon completion of the analysis (default: "No").
- **Output File**: An option to specify a filename for the output results.

---

## Outputs

### Summary

NRM produces a JSON file containing comprehensive analysis details, including but not limited to:

- Metadata about the analysis and its parameters.
- Site-specific results detailing non-reversible substitution rates.
- A descriptive table summarizing key statistics of the evolutionary process across sequences.

### Site-Level Output Details

The site-level output includes the following:

- **Transition Rates**: Estimates of transition probabilities between nucleotides.
- **Statistical Significance**: P-values assessing the likelihood of reversibility.
- **Selection Pressure Analysis**: Insight into selective forces acting upon the sequences tested.

---

## Visualization

An interactive visualization tool is available to help users explore the results effectively. This tool provides:

- **Summary Statistics**: Visualization of the number of sequences and sites analyzed.
- **Matrix Displays**: Graphical representations of transition rates for quick insight into the evolutionary patterns.
- **Interactive Charts**: Plots for detailed examination of substitution dynamics across various sites.

---

## Example Workflow

Follow these steps to effectively use the NRM tool through the website:

1. **Upload Data**:

   - Navigate to the NRM page.
   - Upload the alignment file and phylogenetic tree file.
   - Specify the genetic code and any optional parameters.

2. **Run Analysis**:

   - Click the "Run Analysis" button to start the NRM analysis.
   - You may opt to enter your email address to get notified upon completion.

3. **Review Results**:

   - Once the analysis completes, navigate to the results page via the provided link.
   - Explore summary statistics, visualizations, and detailed results tables.

4. **Export Results**:
   - Download the JSON results file for external analysis or archiving as needed.

---
