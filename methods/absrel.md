# aBSREL

aBSREL (**a**daptive **B**ranch-**S**ite **R**andom **E**ffects **L**ikelihood) is an improved version of the commonly-used "branch-site" models, which are used to test if positive selection has occurred on a proportion of branches. As such, aBSREL models both site-level and branch-level $\omega$ heterogeneity. aBSREL, however, does not test for selection at specific sites. Instead, aBSREL will test, for each branch (or branch of interest) in the phylogeny, whether a proportion of sites have evolved under positive selection.

aBSREL differs from other branch-site model implementations by inferring the optimal number of $\omega$ classes for each branch. For example, the earlier HyPhy branch-site approach (BS-REL) assumed three $\omega$ rate classes for each branch and assigned each site, with some probability, to one of these classes. aBSREL, by contrast, acknowledges that different branches may feature more or less complex evolutionary patterns and hence may be better modeled by more or fewer $\omega$ classes. Specifically, aBSREL uses AIC<sub>c</sub> (small sample AIC) to infer the optimal number of $\omega$ rate classes for each branch.

After aBSREL fits the full adaptive model, the Likelihood Ratio Test is performed at each branch and compares the full model to a null model where branches are not allowed to have rate classes of $\omega>1$.

aBSREL can be run in two modes:

- Test a specific hypothesis by _a priori_ selecting a set of "foreground" branches to test for positive selection.
- Perform an exploratory analysis where all branches are tested for positive selection. In this scenario, p-values at each branch must be corrected for multiple testing (using the Holm-Bonferroni correction). Due to multiple testing, the exploratory approach _has much lower power_ compared to the other approach.

**If you use aBSREL in your analysis, please cite the following:** [`Smith, MD et al. "Less is more: an adaptive branch-site random effects model for efficient detection of episodic diversifying selection." Mol. Biol. Evol. 32, 1342–1353 (2015).`](https://doi.org/10.1093/molbev/msv022)
