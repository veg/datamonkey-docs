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
