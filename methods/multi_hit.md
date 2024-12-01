# Multi-Hit Method (MULTI-HIT)

<iframe width="560" height="315" src="https://www.youtube.com/embed/shS2MDEvLAs?si=QCqfJ0CQPnwilaX3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

MULTI-HIT is a statistical method that allows for the examination of the fit of
models accommodating multiple instantaneous nucleotide substitutions in
sequence data. The method expands on traditional models by incorporating the
complexities involved with multiple hits that can occur at a single nucleotide
position in evolutionary processes.

## Citation

If you utilize the MULTI-HIT method in your research or analysis, please cite:

[Lucaci AG, Wisotsky SR, Shank SD, Weaver S, Kosakovsky Pond SL (2021) Extra base hits: Widespread empirical support for instantaneous multiple-nucleotide changes. PLOS ONE 16(3): e0248337.](https://doi.org/10.1371/journal.pone.0248337)

## Input Parameters

MULTI-HIT requires various parameters for its analysis:

### Required Inputs

- **Alignment File**: A file containing the multiple sequence alignment (supported formats: `.fasta`, `.phy`, etc.).
- **Genetic Code**: The genetic code to use for the analysis (default: "Universal").

### Optional Inputs

- **Triple Islands**: Toggle to specify if synonymous triple-hit substitutions should be accounted for (options: "Yes" or "No").
- **Rate Classes**: The number of omega rate classes to be included in the model (default: 3, range: 1-10).

## Outputs

### Summary

The MULTI-HIT analysis generates a JSON file that includes:

- **Job Metadata**: Overview of the parameters used and a timestamp of analysis completion.
- **Site-Level Results**: Detailed information on each site in the alignment, including statistical evidence for multiple hits and their significance.

### Detailed Site Output

Each site analyzed is accompanied by:

- **Evidence Ratios**: Estimates comparing the occurrence of multiple hits versus other types of substitutions at that site.
- **P-values**: Significance levels indicating whether the observed multiple substitutions significantly deviate from the null hypothesis.

## Visualization

Results from the MULTI-HIT analysis can be visualized using the integrated visualization tools available on the platform.

- **Circos Plots**: Interactive visual representations that map codons and their relationships based on evidence ratios.
- **Data Tables**: Clear, sortable tables that summarize the results for each site, allowing users to explore the analysis efficiently.

## Example Workflow

Here’s a step-by-step guide to using the MULTI-HIT tool via the website:

1. **Upload Data**:

   - Navigate to the MULTI-HIT page and upload your alignment file with phylogenetic tree.
   - Select the appropriate genetic code from the dropdown menu.

2. **Set Parameters**:

   - Adjust optional parameters such as rate classes and triple islands if needed.

3. **Run Analysis**:

   - Click the "Run Analysis" button to initiate the MULTI-HIT process.
   - Monitor the progress on the interface. Once completed, you will receive a notification if opted in.

4. **Review Results**:

   - Access your results through a generated link or through your notifications.
   - Review both the summary statistics and detailed site-level data.
   - Use the visualization tools to explore your findings interactively.

5. **Download Outputs**:
   - Optionally, download the output files for storage or further analysis.
