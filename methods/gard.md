# GARD

GARD (**G**enetic **A**lgorithm for **R**ecombination **D**etection) is a
method to screen a multiple sequence analysis for the presence of recombination
and is extremely useful as a _pre-processing step for selection inference_.
Because recombinant sequences cannot be adequately described with a single
phylogenetic history, selection inference on recombinant data often leads to a
significant increase in false positives. GARD alleviates this concern by
comprehensively screening an alignment for recombination breakpoints and
inferring a unique phylogenetic history for each detected recombination block.

If GARD detects recombination in your dataset, it will provide you with an
updated _partitioned_ dataset, where each partition corresponds to a
recombination block with its own corresponding phylogeny. This partitioned
dataset can then be used as input (instead of your original data) for the
selection inference method of interest.

## Citation

If you use GARD in your analysis, please cite the following:

[Kosakovsky Pond, SL et al. "Automated Phylogenetic Detection of Recombination Using a Genetic Algorithm." Mol. Biol. Evol. 23, 1891–1901 (2006).](https://doi.org/10.1093/molbev/msl051)

## Input Parameters

GARD requires the following inputs:

### Required Inputs

- **Alignment File**: A multiple sequence alignment file (supported formats: `.fasta`, `.nex`, `.phy`, etc.).
- **Genetic Code**: The genetic code to use for codon alignments (default: "Universal").
- **Data Type**: The type of data being analyzed (options: "Nucleotide", "Protein").

### Optional Inputs

- **Run Mode**: The optimization mode (default: "Normal"; options: "Normal" or "Faster").
- **Site-to-Site Rate Variation**: Specifies the model for rate variation among sites (options: "None", "General Discrete", "Beta-Gamma"; default: "None").
- **Rate Classes**: The number of discrete rate classes for rate variation (default: 2).

## Outputs

### Summary

GARD produces a JSON file containing:

- Details of the analysis, including metadata and configuration parameters.
- A summary of the selected models along with statistical support for detected breakpoints.
- A summary report indicating if evidence for recombination was found and showcasing the best model fits.

### Site-Level Output Details

The output file includes:

- **Breakpoint Information**: Locations and supporting statistics for recombination breakpoints.
- **Tree Structures**: Phylogenetic trees representing different segments of the alignment.
- **Model Fit Statistics**: Akaike Information Criterion (AIC) values for various models evaluated.

## Visualization

GARD results can be visualized using an interactive tool that displays:

- **Phylogenetic Trees**: Graphical representations of each segment with marked breakpoints.
- **Model Comparison**: Comparison plots showcasing AIC scores and support values for the identified breakpoints.
- **Breakpoints and Phylogenetic Divergence**: Visual insights into how breakpoints can influence tree structure and evolutionary relationships.

## Example Workflow

1. **Upload Data**:

   - Navigate to the GARD section on the website and select an alignment file from your device.
   - Choose the relevant genetic code and data type from the dropdown menus provided.

2. **Configure Parameters**:

   - Determine if you wish to enable site-to-site rate variation and select the appropriate options.
   - Set the number of rate classes and select a run mode (Normal or Faster).

3. **Run Analysis**:

   - Click the "Run Analysis" button to initiate the GARD workflow.
   - You can optionally provide an email address to receive notifications upon completion.

4. **Review Results**:

   - Once the analysis is complete, results will be presented, along with relevant statistics and visualizations of the phylogenetic trees.
   - You can download the results in JSON format for further analysis or record-keeping.

5. **Explore Interactive Features**:
   - Use the visualization tools to examine the evolutionary relationships and breakdowns in your data.

## References

- [GARD Observable Visualiaztion] - https://observablehq.com/@spond/plotting-gard-breakpoint-support

## FAQ

### 1. What should I do if GARD analysis takes an excessively long time?

If GARD is running slowly:

- Consider trimming sequences or using a subset of closely related sequences rather than all available sequences.
- Use the Faster mode to expedite processing.
- Reevaluate the minimum number of characters or gaps allowed in the analysis.

### 2. How do I interpret the output of GARD?

GARD's output typically contains:

- Breakpoint locations indicating where recombination is detected.
- Support values for these breakpoints to evaluate the robustness of detected recombination.
- AIC (Akaike Information Criterion) values to compare the fit of models with and without breakpoints; lower AIC suggests a better fit.

### 3. Why might the results differ between GARD runs on different platforms?

Discrepancies can occur due to:

- Variations in the underlying algorithm or parameterization in different versions of the software.
- Different models of recombination or codon evolution being applied in different workloads or instances.

### 4. What should I consider when analyzing GARD results?

- Proper alignment quality; poor alignments could lead to false interpretations of recombination events.
- The number of partitions detected may inform how robust your results are; generally, fewer partitions (3-4) are preferable for clear interpretation.

### 5. What should I do if GARD reports no evidence of recombination but I suspect it?

- Examine the alignment quality. Poorly aligned data can mask signals of recombination.
- Consider running separate analyses for subsets of the data or using other methods like 3SEQ or RDP for corroboration.
- Consult appropriate literature or statistical methods to better define your expectations regarding recombination patterns.

### 6. Can I run GARD on very large datasets?

Yes, but you may need to adjust settings or the size of your dataset to ensure that processing completes efficiently. For large datasets, it is recommended to use fewer sequences and lengths that are manageable (< 10000 sites).

### 7. What is the significance of breakpoints in my analysis?

Significant breakpoints identified by GARD indicate potential historical recombination events and can be helpful for understanding the evolutionary pathways of the sequence data analyzed.

### 8. What actions should I take when running analyses consecutively?

Whenever possible, run analyses in batches or subsets, especially if they are
computationally expensive. Keep an eye on convergence issues, and re-evaluate
any significant results if the outcomes differ between tests. If you encounter
errors, ensure to check the logs for squelched errors or adjust your data to
match the expected formats.
