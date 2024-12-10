# Fast Unconstrained Bayesian AppRoximation (FUBAR)

FUBAR (**F**ast **U**nconstrained **B**ayesian **A**ppRoximation) is a sFUBAR (**F**ast, **U**nconstrained **B**ayesian **A**pp**R**oximation) uses a Bayesian approach to infer nonsynoymous (dN) and synonymous (dS) substitution rates on a per-site basis for a given coding alignment and corresponding phylogeny. This method assumes that the selection pressure for each site is constant along the entire phylogeny.

Although FUBAR produces similar information to FEL, it has several key differences:

- FUBAR employs a Bayesian algorithm to infer rates, and therefore it reports evidence for positive selection using _posterior probabilities_ (which range from 0-1), not p-values. Generally, posterior probabilities > 0.9 are strongly suggestive of positive selection.
- FUBAR runs extremely quickly and is well-suited for analyzing large alignments, with hundreds or thousands of sequences. This speed-up results from the novel strategy of employing a pre-specified discrete grid of dN and dS values to be applied across sites. This approach contrasts with the time-consuming FEL strategy of fitting a new MG94xREV model at each site.
- FUBAR may have more power than FEL, in particular when positive selection is present but relatively weak (i.e. low values of $\omega>1$).

## Citation

If you use FUBAR in your analysis, please cite:

[Murrell, B et al. "FUBAR: A Fast, Unconstrained Bayesian AppRoximation for inferring selection." Mol. Biol. Evol. 30, 1196–1205 (2013).](https://doi.org/10.1093/molbev/mst030)

## Input Parameters

FUBAR requires the following inputs:

### Required Inputs

- **Genetic Code**: The genetic code to be used (default: "Universal").
- **Alignment File**: An in-frame codon alignment file (supported formats: `.fasta`, `.nex`, etc.).
- **Phylogenetic Tree**: A phylogenetic tree (with optional branch length annotations) appended to the FASTA file or embedded within the NEXUS file.

### Optional Inputs

- **Number of Grid Points**: Specifies the number of grid points for the Bayesian analysis (default: `20`; must be between `5` and `50`).
- **Concentration of Dirichlet Prior**: The concentration parameter for the Dirichletj prior in the Bayesian estimation (default: `0.5`; must be between `0.001` and `1`).

## Outputs

### Summary

FUBAR produces a JSON file containing the results of the analysis, including:

- Analysis metadata and input parameters used.
- Site-level results where each codon is evaluated for selection pressures.

### Site-Level Output Details

Each codon in the output will include:

- **Alpha (α)**: Mean posterior synonymous substitution rate.
- **Beta (β)**: Mean posterior nonsynonymous substitution rate.
- **Alpha - Beta**: Mean posterior beta-alpha
- **Posterior Probability**: Probability of positive selection at a site.
- **Bayes Factor**: Statistical measure indicating the evidence for positive selection at each site.

## Visualization

The results from FUBAR can be visualized using built-in interactive tools, displaying the posterior distributions of substitution rates. These visualizations facilitate the interpretation of sites under selection:

### Features

- **Site-Specific Distributions**: Users can interactively explore substitution rates for individual sites versus overall rates.
- **Heatmap Display**: A color-coded grid can represent varying levels of selection pressure.
- **Export Options**: Visualizations can be saved as SVG or PNG files for reports or presentations.

## Example Workflow

1. **Upload Data**:

   - Provide an alignment with a corresponding phylogenetic tree file, ensuring correct formatting.
   - Select the appropriate genetic code and configure any optional parameters based on your analysis needs.

2. **Run Analysis**:

   - Click "Run Analysis" to initiate the FUBAR computation. Progress updates may be provided via the user interface.
   - Allow time for completion based on the complexity of the input data.

3. **Review Results**:

   - After the analysis is complete, review generated output files and the interactive visualization tool.
   - Access site-level estimates, summary statistics, and explore various plots.

4. **Export Results**:
   - Results can be downloaded in JSON format for further analysis or kept for record-keeping.
   - Use the available buttons to export visualizations as images.

## Example CLI Usage of FUBAR with HyPhy

### Full Example Usage

To run the FUBAR analysis with specified parameters, use the following command:

```bash
/path/to/hyphy/hyphy --alignment /path/to/alignment/file.fasta \
--tree /path/to/tree/file.tree \
--code Universal \
--concentration_parameter 0.5 \
--grid 20 \
--output /path/to/results/file.FUBAR.json
```

### Parameters Explanation

- **--alignment**: Specify the path to the input codon alignment file.
- **--tree**: Input the path for the phylogenetic tree file.
- **--code**: Specify the genetic code to be used (default: Universal).
- **--concentration_parameter**: Set the concentration parameter of the Dirichlet prior (default: 0.5).
- **--grid**: Indicates the number of grid points for analysis (default: 20; should be between 5 and 50).
- **--output**: Path where the resulting JSON file will be saved.

### Minimal Example Usage

Here's a minimal example command with the bare minimum parameters:

```bash
/path/to/hyphy/hyphy --alignment /path/to/alignment/file.fasta --tree /path/to/tree/file.tree
```

### Parameters Explanation (Minimal)

- **--alignment**: Specify the path to the input codon alignment file.
- **--tree**: Input the path for the phylogenetic tree file.

## FAQ

### 1. I am using FUBAR and MEME to analyze a set of genes, but I often see discrepancies in the results. Why does FUBAR report more selected sites?

FUBAR detects pervasive selection, while MEME looks for episodic selection. It
is common to find that FUBAR reports more sites, as it is designed to identify
consistent selection over time, whereas MEME may flag a smaller number of sites
that show evidence of selection specifically at certain time points.

### 2. How should I handle sequences that contain gaps or ambiguous bases (Ns) when using FUBAR or other selection methods?

Generally, gaps are treated as missing data, and HyPhy should handle them.
However, sequences with a high proportion of gaps may carry less informative
content, leading to potential bias in the analysis. It's advisable to
pre-filter sequences with excessive gaps before analysis for better results.

### 3. Calculating gene-wide dN and dS values from FUBAR output?

Yes, you can calculate mean dN/dS across selected sites by averaging the dN and
dS values for only the positively selected sites reported by FUBAR, but keep in
mind that high variability may influence results.

### 4. Running tests with smaller datasets (fewer than 10 sequences)?

With small datasets, you may find that statistical power decreases
significantly. For reliable results, it's recommended to use methods like FEL,
which may still provide useful insights, but consider the limitations of your
sample size regarding detection of selection.

### 5. Should I run GARD before FUBAR, especially with large datasets?

Yes, running GARD first is advisable as it helps to identify recombination
breakpoints within your alignment, which can improve the reliability of
subsequent analyses such as FUBAR.

### 6. How to specify different branches for foreground and background in FUBAR?

Unfortunately, FUBAR does not currently support direct partitioning of
foreground/background branches.

### 7. My results from FUBAR contains many null values for alpha (dS) and beta (dN). What should I do?

This is likely due to numerical underflow from zero-length branches in your
tree.

### 8. I’ve encountered segmentation faults or underflow errors during analysis. What can I do to resolve these?

Given that these issues often arise from complex or long alignments, try
breaking down your dataset into smaller parts. Additionally, make sure you are
using the latest version of HyPhy, as fixes for such bugs are routinely
released.

### 9. I have multiple runs with FUBAR and FEL; how can I combine their results?

Each analysis can produce distinct outputs. You may need to extract relevant
data from the json files and compile them into a single table, often utilizing
scripts or data manipulation in R or Python.
