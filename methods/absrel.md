# aBSREL (Adaptive Branch-Site Random Effects Likelihood)

aBSREL (**a**daptive **B**ranch-**S**ite **R**andom **E**ffects **L**ikelihood) is an improved version of the commonly-used "branch-site" models, which are used to test if positive selection has occurred on a proportion of branches. As such, aBSREL models both site-level and branch-level $\omega$ heterogeneity. aBSREL, however, does not test for selection at specific sites. Instead, aBSREL will test, for each branch (or branch of interest) in the phylogeny, whether a proportion of sites have evolved under positive selection.

aBSREL differs from other branch-site model implementations by inferring the optimal number of $\omega$ classes for each branch. For example, the earlier HyPhy branch-site approach (BS-REL) assumed three $\omega$ rate classes for each branch and assigned each site, with some probability, to one of these classes. aBSREL, by contrast, acknowledges that different branches may feature more or less complex evolutionary patterns and hence may be better modeled by more or fewer $\omega$ classes. Specifically, aBSREL uses AIC<sub>c</sub> (small sample AIC) to infer the optimal number of $\omega$ rate classes for each branch.

After aBSREL fits the full adaptive model, the Likelihood Ratio Test is performed at each branch and compares the full model to a null model where branches are not allowed to have rate classes of $\omega>1$.

aBSREL can be run in two modes:

- Test a specific hypothesis by _a priori_ selecting a set of "foreground" branches to test for positive selection.
- Perform an exploratory analysis where all branches are tested for positive selection. In this scenario, p-values at each branch must be corrected for multiple testing (using the Holm-Bonferroni correction). Due to multiple testing, the exploratory approach _has much lower power_ compared to the other approach.

## Citation

**If you use aBSREL in your analysis, please cite the following:** [`Smith, MD et al. "Less is more: an adaptive branch-site random effects model for efficient detection of episodic diversifying selection." Mol. Biol. Evol. 32, 1342–1353 (2015).`](https://doi.org/10.1093/molbev/msv022)

## Input Parameters

aBSREL requires several input parameters that can be categorized into required and optional fields.

- **Alignment File**: An in-frame codon alignment file (supported formats: `.fasta`, `.phy`, etc.)
- **Phylogenetic Tree**: A phylogenetic tree (with optional branch length annotations) appended to the FASTA file or embedded within the NEXUS file.
- **Genetic Code**: The code that represents the genetic code to be used (default: "Universal").
- **Branches to Test**: Specifies which branches in the phylogenetic tree to evaluate for selection.

## Outputs

### Summary

The output of aBSREL is a JSON file containing:

- **Overall Analysis Summary**: Includes the number of branches tested and whether evidence for selection was found.
- **Detailed Results**: Provides statistics per branch, highlighting branches with evidence of selection.

### Key Output Metrics

Each tested branch in the output will have:

- **Omega (ω) distribution**: The rate of nonsynonymous (dN) to synonymous (dS) substitutions per class.
- **P-value**: Significance of selection, with lower values indicating stronger evidence.
- **Rates**: Number of ω rates used for the respective branch.

## Visualization

### Features of Visualization Tools

- **Summary Statistics**: Analyze the overall results and branches classified under different selection types.
- **Omega (ω) plot**: Each circle represents an ω rate class, size reflecting the proportion of sites belonging to the respective class. The red vertical bar is the reference of ω=1.
- **Graphical Display**: Visual representation of rates and significances across branches.
- **Site-by-Site Analysis**: Detailed tables corresponding to each branch, including statistics.

## Example Command Line Usage

```bash
/path/to/hyphy/hyphy absrel --alignment <alignment_file> --tree <tree_file> --code <genetic_code> --branches <branches> --output <output_file>
```

### Parameters

- `--alignment` : An in-frame codon alignment in one of the formats supported by HyPhy.
- `--tree` : A phylogenetic tree (optionally annotated with {}).
- `--code` : Which genetic code should be used (default: Universal).
- `--branches` : Branches to test (default: All).
- `--output` : Write the resulting JSON to this file (default is to save to the same path as the alignment file + 'ABSREL.json').
- `--multiple-hits` : Include support for multiple nucleotide substitutions (options: None, Double, Double+Triple).
- `--srv` : Include synonymous rate variation (options: Yes, No).
- `--blb` : [Advanced option] Bag of little bootstrap alignment resampling rate (default: 1.0).

### Example

```bash
/path/to/hyphy/hyphy absrel --alignment example_alignment.phy --tree example_tree.nwk --code Universal --branches FG --output results.ABSREL.json --multiple-hits Double --srv Yes --blb 0.5
```

## Example Workflow

Here’s a step-by-step guide on how to use aBSREL through its web interface:

1. **Upload Data**:

   - Navigate to the aBSREL page.
   - Upload your alignment and phylogenetic tree file.
   - Select the appropriate genetic code if different from the default.

2. **Parameter Configuration**:

   - Specify branches to test.

3. **Run the Analysis**:

   - Click the "Run Analysis" button to begin the computation.
   - Optionally, provide an email address to receive notifications once the analysis is complete.

4. **Review Results**:

   - Once the analysis completes, review the summary statistics.
   - Access detailed results and visualizations based on the output data.

5. **Export Results**:
   - Download the detailed results in JSON format for further processing or archiving.

## Frequently Asked Questions (FAQ)

### 1. Why are some branches in my analysis showing "test not run"?

This occurs when certain branches have been explicitly excluded by the user during the setup process, usually due to selection criteria for testing.

### 2. How do I interpret high omega values from aBSREL?

High omega values can indicate either very strong positive selection or could
be artifacts of aligning sequences incorrectly. Values greater than 1 typically
indicate a site is under positive selection, but higher values (e.g., 10 or
more) may signal potential data issues.

### 3. How can I obtain dN and dS values from aBSREL results?

aBSREL primarily reports omega values. For dN and dS, you will need to run complementary models (such as FitMG94) that allow for the estimation of these values based on the inferred rates.

### 4. What is the effect of using a large dataset in aBSREL?

Large datasets can increase computational time and complexity, potentially
leading to numerical instabilities. It's generally advisable to look for
shorter branches and evaluate the quality of your multiple sequence alignments
before proceeding with analysis.

### 5. Why are specific nodes showing evidence of positive selection while descendants do not?

This could occur if the entire clade does not experience the same level of
selection pressure or if there are mutations unique to specific branches that
do not translate to downstream branches. Investigating other factors affecting
these branches is crucial for interpreting results accurately.

### 5. How does positive selection differ from selection in methods like BUSTED and RELAX?

While BUSTED combines branches for selection detection, aBSREL evaluates
branches individually. This means BUSTED can detect selection more powerfully
when tested across many branches, while aBSREL can granularly identify which
branches experience selection through a more detailed analysis.

### 6. Do I need to provide branch lengths when using a species tree?

Branch lengths are not strictly required for aBSREL, but providing them can
influence results positively. If your branch lengths do not provide meaningful
information, consider using a constant length for all branches initially and
refine later based on results.

### 7. What if I'm encountering inconsistent results between local and server runs?

Inconsistencies may arise from software version differences or tree formatting
issues. Ensure that both your local environment and the server are using the
same version of HyPhy.
