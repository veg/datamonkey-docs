# RELAX

RELAX is a hypothesis testing framework that asks whether the strength of natural selection has been relaxed or intensified along a specified set of test branches. RELAX is therefore _not_ a suitable method for explicitly testing for positive selection. Instead, RELAX is most useful for identifying trends and/or shifts in the stringency of natural selection on a given gene.

RELAX requires a specified set of "test" branches to compare with a second set of "reference" branches (note that all branches do not have to be assigned, but one branch is required for the test and reference set each). RELAX begins by fitting a codon model with three $\omega$ classes to the entire phylogeny (null model). RELAX then tests for relaxed/intensified selection by introducing the parameter **k** (where $k \geq 0$), serving as the _selection intensity parameter_, as an exponent for the inferred $\omega$ values: $\omega^k$. Specifically, RELAX fixes the inferred $\omega$ values (all $\omega_{<1,2,3>}$) and infers, for the test branches, a value for _k_ which modifies the rates to $\omega_{<1,2,3>}^k$ (alternative model). RELAX then conducts a Likelihood Ratio Test to compare the alternative and null models.

A significant result of **k>1 indicates that selection strength has been intensified** along the test branches, and a significant result of **k<1 indicates that selection strength has been relaxed** along the test branches.

In addition to this pair of null/alternative models, RELAX fits three other models meant as complementary descriptors for the data, but are not suitable for hypothesis testing. These additional models include the following:

- _Partitioned MG94xREV_ - This model fits a single $\omega$ value, i.e. shared for all sites, to each branch partition (reference and test). Here, a total of two $\omega$ rates are inferred.
- _Partitioned Descriptive_ - This model, like a more standard branch-site model, fits three $\omega$ classes separately to each branch partition (reference and test, producing a total of six estimated $\omega$ rates estimated). The selection intensity parameter _k_ is not included.
- _General Descriptive_ - This model fits three $\omega$ classes to the full data set, ignoring the specified test and reference partition division (three total $\omega$ rates estimated). It subsequently fits a _k_ parameter at each branch, ultimately tailoring the three $\omega$ class values to this branch. This model may serve as a useful description of how selection intensity fluctuates over the whole tree.

**If you use RELAX in your analysis, please cite the following:** [`Wertheim, JO et al. "RELAX: detecting relaxed selection in a phylogenetic framework." Mol. Biol. Evol. 32, 820–832 (2015).`](https://doi.org/10.1093/molbev/msu400)
