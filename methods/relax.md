# RELAX Method Documentation

RELAX is a hypothesis testing framework that asks whether the strength of natural selection has been relaxed or intensified along a specified set of test branches. RELAX is therefore _not_ a suitable method for explicitly testing for positive selection. Instead, RELAX is most useful for identifying trends and/or shifts in the stringency of natural selection on a given gene.

RELAX requires a specified set of "test" branches to compare with a second set of "reference" branches (note that all branches do not have to be assigned, but one branch is required for the test and reference set each). RELAX begins by fitting a codon model with three $\omega$ classes to the entire phylogeny (null model). RELAX then tests for relaxed/intensified selection by introducing the parameter **k** (where $k \geq 0$), serving as the _selection intensity parameter_, as an exponent for the inferred $\omega$ values: $\omega^k$. Specifically, RELAX fixes the inferred $\omega$ values (all $\omega_{<1,2,3>}$) and infers, for the test branches, a value for _k_ which modifies the rates to $\omega_{<1,2,3>}^k$ (alternative model). RELAX then conducts a Likelihood Ratio Test to compare the alternative and null models.

A significant result of **k>1 indicates that selection strength has been intensified** along the test branches, and a significant result of **k<1 indicates that selection strength has been relaxed** along the test branches.

In addition to this pair of null/alternative models, RELAX fits three other models meant as complementary descriptors for the data, but are not suitable for hypothesis testing. These additional models include the following:

- _Partitioned MG94xREV_ - This model fits a single $\omega$ value, i.e. shared for all sites, to each branch partition (reference and test). Here, a total of two $\omega$ rates are inferred.
- _Partitioned Descriptive_ - This model, like a more standard branch-site model, fits three $\omega$ classes separately to each branch partition (reference and test, producing a total of six estimated $\omega$ rates estimated). The selection intensity parameter _k_ is not included.
- _General Descriptive_ - This model fits three $\omega$ classes to the full data set, ignoring the specified test and reference partition division (three total $\omega$ rates estimated). It subsequently fits a _k_ parameter at each branch, ultimately tailoring the three $\omega$ class values to this branch. This model may serve as a useful description of how selection intensity fluctuates over the whole tree.

## Citation

If you use the RELAX method in your analysis, please cite:

[`Wertheim, JO et al. "RELAX: detecting relaxed selection in a phylogenetic framework." Mol. Biol. Evol. 32, 820–832 (2015).`](https://doi.org/10.1093/molbev/msu400)

## Input Parameters

### Required Inputs

- **Genetic Code**: Specify the genetic code to use for the analysis (default: "Universal").
- **Alignment File**: Provide an in-frame codon alignment file (supported formats: `.fasta`, `.phy`, etc.).
- **Phylogenetic Tree**: A phylogenetic tree (with optional branch length annotations) appended to the FASTA file or embedded within the NEXUS file.
- **Test Branches**: Designate branches to be considered as 'Test'.
- **Reference Branches**: Specify the branches to be treated as 'Reference'.

### Optional Inputs

- **Model Selection**: Choose the analysis type: `"All"` for descriptive models and RELAX test or `"Minimal"` for only the RELAX test (default: "All").

## Outputs

### Summary

The RELAX method generates a JSON file that contains:

- Metadata about the analysis, including the input parameters and methodology.
- Results illustrating the estimates of selection pressures for each branch.

## Visualization

- **Tree Visualization**: Visual representation of the phylogenetic tree with highlighted branches indicating different selection pressures.
- **Omega Distributions**: Graphical representation of the omega rates across examined branches.
- **Statistical Results**: Display of significance levels (p-values) for individual branches.

## Example Workflow

1. **Upload Data**:

   - Begin by providing your alignment file and phylogenetic tree file.
   - Select Test and Reference branches.

2. **Run Analysis**:

   - Initiate the RELAX analysis by clicking the "Run Analysis" button on the interface.

3. **Review Results**:

   - When the analysis completes, access a summary interface that includes graphical and numerical representations of your data.

4. **Export Results**:
   - Download the detailed JSON results for further examination or archiving.
   - Options for exporting visualizations (SVG/PNG) of the tree are available.

## FAQ

### 1. How are K values interpreted in the RELAX model?

K values indicate the relative selection pressure. A K value of less than 1 indicates relaxation of selection, whereas a K greater than 1 suggests intensification.

### 2. Can I run RELAX on a concatenated dataset with many genes?

It is generally advisable to run RELAX on individual genes rather than concatenated data, as pooled datasets can complicate the inference of selective pressures.

### 3. How do I increase the chances of detecting relaxed/strengthened selection?

Use larger datasets with more branches in your test set, ensure good sequence quality, and consider multiple testing corrections to improve statistical robustness.

### 4. How can I ensure accurate branch and omega estimations in RELAX?

Make sure to utilize a robust phylogenetic tree, clean up your alignment, and properly specify branch groups for testing. Additionally, monitor for any warnings in the output regarding convergence.

### 5. What steps should be taken if I wish to validate the outcomes of multiple hypotheses from BUSTED and RELAX?

Use false discovery rate (FDR) corrections for p-values across the results. This allows for a more accurate interpretation of the results while minimizing the risk of type I errors.
