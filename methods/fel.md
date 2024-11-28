# FEL

FEL (**F**ixed **E**ffects **L**ikelihood) uses a maximum-likelihood (ML) approach to infer nonsynonymous (dN) and synonymous (dS) substitution rates on a per-site basis for a given coding alignment and corresponding phylogeny. This method assumes that the selection pressure for each site is constant along the entire phylogeny.

After optimizing branch lengths and nucleotide substitution parameters, FEL fits a MG94xREV model to each codon site to infer site-specific nonsynonymous and synonymous (dN and dS, respectively) substitution rates. Hypothesis testing is then conducted on a site-specific basis, using the Likelihood Ratio Test, to ascertain if dN is significantly greater than dS.

**If you use FEL in your analysis, please cite the following:** [`Kosakovsky Pond, SL and Frost, SDW. "Not So Different After All: A Comparison of Methods for Detecting Amino Acid Sites Under Selection." Mol. Biol. Evol. 22, 1208--1222 (2005).`](https://doi.org/10.1093/molbev/msi105)

## Inputs

The FEL method requires the following input parameters:

- **code**: (String) The genetic code to be used. Default is "Universal".
- **alignment**: (File) An in-frame codon alignment in one of the formats supported by HyPhy.
- **tree**: (File) A phylogenetic tree, optionally annotated with the branch length.
- **branches**: (String) The specific branches to test; options include "All" to include all branches.
- **srv**: (String) Include synonymous rate variation in the model. Default is "Yes".
- **multiple-hits**: (String) Determines how to handle multiple nucleotide substitutions: "None", "Double", or "Double+Triple". Default is "None".
- **pvalue**: (Float) The p-value threshold to use when testing for selection. Default is 0.1.
- **ci**: (String) Compute profile likelihood confidence intervals for each variable site. Default is "No".
- **resample**: (Integer) For advanced users, perform parametric bootstrap resampling to derive site-level null LRT distributions. Default is 0 (no resampling).
- **output**: (File) Specify where to save the resulting JSON output file. If not provided, it defaults to saving at the same path as the alignment file with the name 'FEL.json'.

## Outputs

The outputs from the FEL analysis include:

- Results saved in a JSON file containing:
  - **analysis**: Description of the analysis conducted.
  - **input**: Parameters used in the analysis.
  - **fits**: Results of the model fitting process.
  - **timers**: Time taken for various parts of the analysis including total time.

Each site in the output includes the following information (detailed in accordance with selected parameters):

- **alpha**: Site relative synonymous substitution rate.
- **beta**: Site relative non-synonymous substitution rate (for tested branches).
- **beta_nuisance**: Site relative non-synonymous substitution rate (for untested branches).
- **LRT**: Likelihood ratio test statistic comparing null (beta = alpha) versus alternative (beta ≠ alpha) hypotheses.
- **p-value**: Asymptotic p-value indicating evidence of selection (i.e., beta ≠ alpha).
- **Total branch length**: The total length of branches contributing to inference at this site.
- **dN/dS LB**: Lower bound of the 95% profile likelihood confidence interval for dN/dS, if available.
- **dN/dS MLE**: Maximum likelihood estimate for site dN/dS.
- **dN/dS UB**: Upper bound of the 95% profile likelihood confidence interval for dN/dS, if available.
- **2H rate**: Site-level rate for 2-nucleotide substitutions.
- **3H rate**: Site-level rate for 3-nucleotide substitutions (if applicable).

## Example Output

Upon completion, the results would typically look like this (in JSON format):

```json
{
  "analysis": "FEL analysis results",
  "input": {
    "code": "Universal",
    "alignment": "alignment_file.aln",
    "tree": "tree_file.tree",
    ...
  },
  "fits": [
    {
      "codon": "AUG",
      "partition": "partition_1",
      "alpha": 0.1,
      "beta": 0.05,
      "LRT": 3.84,
      "p-value": 0.05,
      ...
    },
    ...
  ],
  "timers": {
    "Total time": "2.5 minutes",
    ...
  }
}
```

# FEL Visualization

Please see the [Observable FEL Visualization](https://observablehq.com/@spond/fel) for an interactive exploration of Fixed Effects Likelihood method results.
