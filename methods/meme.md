# MEME (Mixed Effects Model of Evolution)

MEME (**M**ixed **E**ffects **M**odel of **E**volution) employs a mixed-effects
maximum likelihood approach to test the hypothesis that individual sites have
been subject to episodic positive or diversifying selection. In other words,
MEME aims to detect sites evolving under positive selection under a _proportion_
of branches.

For each site, MEME infers two $\omega$ rate classes and corresponding weights
representing the probability that the site evolves under each respective
$\omega$ rate class at a given branch.

To infer $\omega$ rates, MEME infers a single $\alpha$ (dS) value and two
separate $\beta$ (dN) values, $\beta^+$ and $\beta^-$. Both $\beta^+$ and $\beta^-$
share the same $\alpha$ per site.

**Alternative Model Rate Parameter Constraints**
$$ \alpha\ unrestricted \\ \beta^+\ unrestricted \\ \beta^- \leq \alpha $$

**Null Model Rate Parameter Constraints**
$$\alpha\ unrestricted \\ \beta^+ \leq \alpha \\ \beta^- \leq \alpha$$

The $\beta^+$ parameter is the key difference between the null and alternative
models. In the null model, both $\beta^+$ and $\beta^-$ are constrained, but
$\beta^+$ is unrestricted in the alternative model.

Positive selection for each site is inferred when $\beta^+ > \alpha$ and shown
to be significant using the likelihood ratio test.

## Citation

When using MEME in your analysis, please refer to the following publication:

[`Murrell, B et
al. "Detecting individual sites subject to episodic diversifying selection."
PLoS Genetics 8, e1002764
(2012).`](http://dx.doi.org/10.1371/journal.pgen.1002764)

## Input Parameters

### Required Inputs

- **Alignment File**: A file containing an in-frame codon alignment (supported formats include `.fasta`, `.nex`, etc.).
- **Genetic Code**: Indicates the genetic code to be used (default: "Universal").
- **Phylogenetic Tree**: A tree containing the phylogenetic tree structure (optionally annotated with branch lengths) appended to the end of the FASTA file or nestled within the NEXUS file.

### Optional Inputs

- **Multiple Hits**: Allows the model to account for multiple nucleotide substitutions. Options include `"None"`, `"Double"`, or `"Double+Triple"` (default: `"None"`).
- **Site Multihit**: Option to define how to handle multiple substitutions at the site level, with options "`Estimate`" or "`Global`".
- **Rates**: Defines the number of different categories of non-synonymous rates to include in the model (default value: `2`).
- **Resample**: Specifies the number of bootstrapping replicates for hypothesis testing at each site (default: `0`).
- **Impute States**: Option to impute likely character states for missing data (default: `"No"`).

## Outputs

### Summary

MEME produces a detailed JSON output file which comprises:

- General analysis details including metadata and specified parameters.
- Per-site results summarizing selective pressures and evidence for diversifying selection.

### Site-Level Output Details

Each site analyzed in the alignment contains:

- **Alpha (α)**: The estimate of the synonymous substitution rate.
- **Beta (β−)**: The estimate for the non-synonymous rate associated with negative selection.
- **Beta (β+)**: The estimate for the non-synonymous rate associated with positive selection.
- **Likelihood Ratio Test (LRT)**: Likelihood ratio test statistic for episodic diversification, i.e., p+ > 0 and β+ > α.
- **P-value**: Asymptotic p-value for episodic diversification, i.e., p+ > 0 and β+ > α
- **Number of Branches Under Selection**: An estimate for how many branches could be under selection at a given site.

## Visualization

MEME includes an interactive visualization component that allows users to dynamically explore analysis outcomes. This can include:

- Detailed tables showing selection pressures per site.
- Graphical representations of rate estimates, LRT statistics, and p-values.
- Phylogenetic trees enhanced with information about select sites, facilitating easy interpretation of evolutionary relationships.

## Example Workflow

1. **Upload Data**:

   - Begin by providing the necessary alignment file (`.fasta`, `.nex`, etc.) and associated phylogenetic tree.
   - Ensure to select the appropriate genetic code and set any optional parameters as needed for your specific analysis.

2. **Run Analysis**:

   - Click on the "Run Analysis" button to initiate the MEME analysis.
   - Optionally provide an email address to be notified upon completion.

3. **Review Results**:

   - Upon completion, review the generated summary statistics and visualizations using the analysis interface.
   - Adjust thresholds to explore different categories of selection based on your results.

4. **Export Results**:
   - Download the detailed results generated in JSON format for further analysis or archival purposes.

## References

- [MEME Source Code and Documentation](https://github.com/veg/hyphy) - Explore the method's implementation and additional functionality.
- [PLOS Genetics article](https://doi.org/10.1371/journal.pgen.1002764) - Access the original publication detailing the MEME method and its applications.

---
