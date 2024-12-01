# Single Likelihood Ancestor Counting (SLAC)

<iframe width="560" height="315" src="https://www.youtube.com/embed/flgt-lGu6tw?si=sCdfgoog0y0FcU3-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

SLAC (**S**ingle-**L**ikelihood **A**ncestor **C**ounting) uses a combination of maximum-likelihood (ML) and counting approaches to infer nonsynonymous (dN) and synonymous (dS) substitution rates on a per-site basis for a given coding alignment and corresponding phylogeny. Like FEL, this method assumes that the selection pressure for each site is constant along the entire phylogeny.

SLAC begins by optimizing branch lengths and nucleotide substitution parameters under the MG94xREV model. However, rather than using ML to fit site-specific dN and dS parameters, SLAC instead uses ML to infer the most likely ancestral sequence at each node of the phylogeny. SLAC then employs a modified version of the [Suzuki-Gojobori counting method](https://doi.org/10.1093/oxfordjournals.molbev.a026042) to directly count the total number of nonsynonymous and synonymous changes which have occurred at each site. Significance is ascertained at each site using an extended binomial distribution. Importantly, due to its counting-based approach, SLAC may not be accurate for data sets with high divergence levels.

## Citation

If you use SLAC in your analysis, please cite:

Kosakovsky Pond, S.L., & Frost, S.D.W. (2005). "Not So Different After All: A Comparison of Methods for Detecting Amino Acid Sites Under Selection." _Molecular Biology and Evolution_, 22(5), 1208–1222. [https://doi.org/10.1093/molbev/msi105](https://doi.org/10.1093/molbev/msi105)

## Input Parameters

SLAC requires the following inputs:

### Required Inputs

- **Alignment File**: An in-frame codon alignment file supported in formats such as `.fasta`, `.nex`, and `.phy`.
- **Genetic Code**: The genetic code to be used for the analysis (default: "Universal").

## Outputs

### Summary

SLAC generates a JSON file that includes:

- Analysis details, including metadata and input parameters.
- A comprehensive summary table of selection results, containing information on synonymous and nonsynonymous substitutions.

### Site-Level Output Details

For each site examined, the output includes:

- **ES**: Expected synonymous sites.
- **EN**: Expected nonsynonymous sites.
- **S**: Observed synonymous substitutions.
- **N**: Observed nonsynonymous substitutions.
- **dS**: Inferred synonymous substitution rate.
- **dN**: Inferred nonsynonymous substitution rate.
- **P [dN/dS > 1]**: Statistical significance for positive selection.
- **P [dN/dS < 1]**: Statistical significance for negative selection.
- **Total Branch Length**: The total length of branches contributing to inference at this site.

## Visualization

SLAC results can be visualized through interactive tools available on the web platform. Key features include:

- **Graphs**: Represent dN and dS estimates across sites.
- **Tables**: Sorted display of site-by-site results with filtering options.
- **Tree View**: Phylogenetic trees highlighting branches analyzed for selection.

## Example Workflow

1. **Upload Data**:

   - Access the SLAC tool via the website interface.
   - Upload your alignment and corresponding phylogenetic tree file.
   - Configure the genetic code and other parameters as necessary.

2. **Run Analysis**:

   - Click on the "Run Analysis" button to initiate SLAC analysis.

3. **Review Results**:

   - Navigate to the results page to view summary statistics and graphical representations.
   - Utilize filtering options to refine results based on statistical significance.

4. **Export Results**:
   - Download the resulting JSON file for further analysis or report generation.
