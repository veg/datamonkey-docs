# BUSTED

<iframe width="560" height="315" src="https://www.youtube.com/embed/FRcJjYIcnY8?si=AcWNhzvHO1Jhk1EP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

BUSTED (**B**ranch-**S**ite **U**nrestricted **S**tatistical **T**est for
**E**pisodic **D**iversification) provides a gene-wide (_not site-specific_)
test for positive selection by asking whether a gene has experienced positive
selection at at least one site on at least one branch. When running BUSTED,
users can either specify a set of foreground branches on which to test for
positive selection (remaining branches are designated "background"), or users
can test the entire phylogeny for positive selection. In the latter case, the
entire tree is effectively treated as foreground, and the test for positive
selection considers the entire phylogeny.

For each phylogenetic partition (foreground and background branch sites),
BUSTED fits a codon model with three rate classes, constrained as $\omega_1
\leq \omega_2 \leq 1 \leq \omega_3$. As in other methods, BUSTED simultaneously
estimates the proportion of sites per partition belonging to each $\omega$
class. This model, used as the alternative model in selection testing, is
referred to as the _Unconstrained_ model. BUSTED then tests for positive
selection by comparing this model fit to a null model where $\omega_3 = 1$
(i.e. disallowing positive selection) on the foreground branches. This null
model is also referred to as the _Constrained_ model. If the null hypothesis is
rejected, then there is evidence that at least one site has, at least some of
the time, experienced positive selection on the foreground branches.
Importantly, a significant result _does not_ mean that the gene evolved under
positive selection along the entire foreground.

BUSTED additionally calculates "Evidence Ratios" (ERs) for each site. The ER
gives the likelihood ratio (reported on a log-scale) that the alternative model
was a better fit to the data compared to the null model. The ER for each site
thus provides _descriptive information_ about whether a given site could have
evolved under positive selection. The ERs _should not_ be interpreted as
statistical evidence for positive selection at individual sites (instead,
methods like [MEME](selection-methods/#meme), [FEL](selection-methods/#fel), or
[FUBAR](selection-methods/#fubar) should be used for detecting selection at
individual sites).

For each site, two ERs are reported: the _Constrained Model_ ER and the
_Optimized Null_ Model ER. The Constrained Model ER calculates the evidence
ratio using model parameters inferred from the Constrained model. By contrast,
the Optimized Null model ER re-optimizes parameters inferred using the
Constrained model for the given site of interest. These optimized parameter
values are then used to calculate the site's ER. Again, while these ERs may be
helpful descriptors of selection in the data set, they do not provide
statistically valid evidence for positive selection at a site.

## Citation

If you use BUSTED in your analysis, please cite the following:

[Murrell, B et al. "Gene-wide identification of episodic selection." Mol. Biol. Evol. 32, 1365–1371 (2015)](https://doi.org/10.1093/molbev/msv035)

If you use BUSTED-S in your analysis, please cite the following:

[Wisotsky, Sadie R., et al. "Synonymous site-to-site substitution rate variation dramatically inflates false positive rates of selection analyses: ignore at your own peril." Molecular Biology and Evolution 37.8 (2020): 2430-2439.](https://doi.org/10.1093/molbev/msaa037)

If you use BUSTED-E in your analysis, please cite the following:

[Selberg, Avery, et al. "Minus the Error: Estimating dN/dS and Testing for Natural Selection in the Presence of Residual Alignment Errors." bioRxiv (2024): 2024-11.](https://doi.org/10.1101/2024.11.13.620707)

## Input Parameters

### Required Inputs

- **Alignment File**: An in-frame codon alignment file, supported formats include `.fasta`, `.phy`, etc.
- **Phylogenetic Tree**: A file containing the phylogenetic tree structure (optionally annotated with branch lengths).
- **Genetic Code**: The intended genetic code for the analysis (default: "Universal").

### Optional Inputs

- **Branches to Test**: Branches from the phylogeny that you wish to investigate for episodic selection (default: "All").
- **Synonymous Rate Variation (BUSTED-S)**: Option to include variations in synonymous substitution rates (options: "Yes", "No", or "Branch-site"; default: "Yes").
- **Error Protection (BUSTED-E)**: To enhance robustness against errors in alignment, this can be enabled or disabled (default: "No").
- **Multiple Hits**: Support for handling multiple nucleotide substitutions (options: `"None"`, `"Double"`, or `"Double+Triple"`; default: "None").

## Outputs

### Summary

BUSTED produces a JSON file summarizing the analysis results.

### Output Elements

- **Log-Likelihood Ratio Test (LRT)**: Measures how much better the data fit a model that allows for positive selection compared to one that does not.
- **Distribution Estimates**: Information on the distribution of omega ratios (dN/dS), indicating rates of nonsynonymous and synonymous substitutions.
- **Site-Specific Likelihoods**: Evaluations of likelihood at individual codon sites which are stored site-wise.
- **Evidence Ratios**: Ratio of the likelihoods for models with and without selection, informing the level of support for selection.

## Visualization

- **Statistical Summaries**: Quick access to summary statistics, including evidence ratios and p-values.
- **Distribution Plots**: Plots detailing the three ω rate classes, sizes reflecting proportion of sites belonging to respective class, and the difference in ω from background to tested branches.

## Example Workflow

1. **Upload Data**:

   - Select and upload your sequence alignment and corresponding phylogenetic tree file.
   - Choose the appropriate parameters for analysis (genetic code, branches to test).

2. **Run Analysis**:

   - Submit your data by selecting "Run Analysis".

3. **Review Results**:

   - Access the results in a structured format, including key statistics, plots, and visualizations.
   - Utilize interactive features to explore different selection sites and their classifications.

4. **Export Results**:
   - Download the JSON results for archiving or further analyses with associated metadata.

## References

- [BUSTED-E](https://doi.org/10.1101/2024.11.13.620707)
- [BUSTED-S](https://doi.org/10.1093/molbev/msaa037)
- [BUSTED](https://doi.org/10.1093/molbev/msv035)
