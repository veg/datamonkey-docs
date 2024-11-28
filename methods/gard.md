# GARD

GARD (**G**enetic **A**lgorithm for **R**ecombination **D**etection) is a method to screen a multiple sequence analysis for the presence of recombination and is extremely useful as a _pre-processing step for selection inference_. Because recombinant sequences cannot be adequately described with a single phylogenetic history, selection inference on recombinant data often leads to a significant increase in false positives. GARD alleviates this concern by comprehensively screening an alignment for recombination breakpoints and inferring a unique phylogenetic history for each detected recombination block.

If GARD detects recombination in your dataset, it will provide you with an updated _partitioned_ dataset, where each partition corresponds to a recombination block with its own corresponding phylogeny. This partitioned dataset can then be used as input (instead of your original data) for the selection inference method of interest.

<!--
Methods which accept data processed by GARD include the following:

+ [FEL](./selection-methods/#fel)
+ [FUBAR](./selection-methods/#fubar)
+ [SLAC](./selection-methods/#slac)
+ ...more...
-->

**If you use GARD in your analysis, please cite the following:** [`Kosakovsky Pond, SL et al. "Automated Phylogenetic Detection of Recombination Using a Genetic Algorithm." Mol. Biol. Evol. 23, 1891–1901 (2006).`](https://doi.org/10.1093/molbev/msl051)
