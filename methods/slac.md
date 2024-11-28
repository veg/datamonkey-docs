# SLAC

SLAC (**S**ingle-**L**ikelihood **A**ncestor **C**ounting) uses a combination of maximum-likelihood (ML) and counting approaches to infer nonsynonymous (dN) and synonymous (dS) substitution rates on a per-site basis for a given coding alignment and corresponding phylogeny. Like FEL, this method assumes that the selection pressure for each site is constant along the entire phylogeny.

SLAC begins by optimizing branch lengths and nucleotide substitution parameters under the MG94xREV model. However, rather than using ML to fit site-specific dN and dS parameters, SLAC instead uses ML to infer the most likely ancestral sequence at each node of the phylogeny. SLAC then employs a modified version of the [Suzuki-Gojobori counting method](https://doi.org/10.1093/oxfordjournals.molbev.a026042) to directly count the total number of nonsynonymous and synonymous changes which have occurred at each site. Significance is ascertained at each site using an extended binomial distribution. Importantly, due to its counting-based approach, SLAC may not be accurate for data sets with high divergence levels.

**If you use SLAC in your analysis, please cite the following:** [`Kosakovsky Pond, SL and Frost, SDW. "Not So Different After All: A Comparison of Methods for Detecting Amino Acid Sites Under Selection." Mol. Biol. Evol. 22, 1208--1222 (2005).`](https://doi.org/10.1093/molbev/msi105)
