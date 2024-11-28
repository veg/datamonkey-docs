# FUBAR

FUBAR (**F**ast, **U**nconstrained **B**ayesian **A**pp**R**oximation) uses a Bayesian approach to infer nonsynoymous (dN) and synonymous (dS) substitution rates on a per-site basis for a given coding alignment and corresponding phylogeny. This method assumes that the selection pressure for each site is constant along the entire phylogeny.

Although FUBAR produces similar information to FEL, it has several key differences:

- FUBAR employs a Bayesian algorithm to infer rates, and therefore it reports evidence for positive selection using _posterior probabilities_ (which range from 0-1), not p-values. Generally, posterior probabilities > 0.9 are strongly suggestive of positive selection.
- FUBAR runs extremely quickly and is well-suited for analyzing large alignments, with hundreds or thousands of sequences. This speed-up results from the novel strategy of employing a pre-specified discrete grid of dN and dS values to be applied across sites. This approach contrasts with the time-consuming FEL strategy of fitting a new MG94xREV model at each site.
- FUBAR may have more power than FEL, in particular when positive selection is present but relatively weak (i.e. low values of $\omega>1$).

**If you use FUBAR in your analysis, please cite the following:** [`Murrell, B et al. "FUBAR: A Fast, Unconstrained Bayesian AppRoximation for inferring selection." Mol. Biol. Evol. 30, 1196–1205 (2013).`](https://doi.org/10.1093/molbev/mst030)
