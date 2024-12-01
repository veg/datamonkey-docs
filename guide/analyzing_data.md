# Analyzing Data

## Selecting a Nucleotide Model

Most methods will perform a global MG94xREV fit to optimize branch length and
nucleotide substitution parameters before proceeding to hypothesis testing.
Several methods (FEL, FUBAR, and MEME) additionally pre-fit a GTR nucleotide
model to the data, using the estimated parameters as starting values for the
global MG94xREV fit, as a computational speed-up. Resulting branch length and
nucleotide substitution parameters are subsequently used as initial parameter
values during model fitting for hypothesis testing.

# Handling Ambiguities

When analyzing sequence data, ambiguous nucleotides (e.g., `N`, `R`, `Y`) can affect the accuracy of substitution rate calculations. This section explains the different strategies for handling ambiguities in your data. For more details, see the MBE paper.

## Methods for Handling Ambiguities

### Averaged (Default)

In the Averaged method, all possible resolutions of an ambiguous character contribute, in a weighted fashion, to the computation of Expected Nonsynonymous (EN), Expected Synonymous (ES), Observed Nonsynonymous (NN), and Observed Synonymous (NS) substitutions (see the methods paper for details).

- **Weights**: Each possible resolution is weighted according to the relative frequency of that codon in the entire dataset.
- **Exclusion of Non-Informative Characters**: Characters that provide no information (e.g., all gaps or all missing data) are excluded to avoid artificially inflating dN and dS estimates.

### Resolved

In the Resolved method, only the most likely resolution for the given site is used in the computations.

- **Determining the Most Likely Resolution**: Based solely on the data at that specific site, the most frequent codon is selected.
- **Ties**: If multiple codons are equally frequent, one is chosen at random.

### Skip

In the Skip method, any site containing an ambiguous character is entirely excluded from the computation of substitution rates.

- **Effect**: This approach ensures that only fully unambiguous sites contribute to the analysis.

### GapMM

The GapMM method treats gaps (`-`) in a specific way when matching sequences.

- **Gap Handling**: A gap matched with any character other than another gap is considered as matching an `N` (which represents any nucleotide).
- **Purpose**: This method acknowledges that gaps can represent unknown nucleotides and adjusts the calculations to account for this uncertainty.

## Example

Consider the following site in your sequence alignment:

`ACA ACG ACG ACR`

Here, `ACR` is ambiguous because `R` can be either `A` or `G`, representing both `ACA` and `ACG`.

### Using the Resolved Method

- **Most Frequent Codon**: `ACG` appears most frequently at this site.
- **Resolution**: The ambiguous codon `ACR` is resolved to `ACG`.
- **Calculation**: Only `ACG` is used for EN, ES, NN, and NS computations at this site.

### Using the Averaged Method

- **Possible Resolutions**: `ACR` can be `ACA` or `ACG`.
- **Weight Factors**:
  - **Calculate Frequencies**: Determine `f(ACA)` and `f(ACG)`, the frequencies of `ACA` and `ACG` in the entire dataset.
  - **Weights**:
    - Weight for `ACA` = `f(ACA)` / (`f(ACA)` + `f(ACG)`)
    - Weight for `ACG` = `f(ACG)` / (`f(ACA)` + `f(ACG)`)
- **Calculation**: Both `ACA` and `ACG` contribute to the computations, each weighted appropriately.

### Using the Skip Method

- **Action**: The entire site is excluded from all computations because it contains an ambiguous codon (`ACR`).

### Using the GapMM Method

- **Not Applicable in This Example**: Since there are no gaps in this site, the GapMM method does not alter the computations here.
- **General Behavior**: If gaps were present, they would be treated as `N`s when paired with any character other than another gap.

# Choosing Significance Levels

For more details see [MBE
paper](http://mbe.oxfordjournals.org/cgi/content/short/22/5/1208).
