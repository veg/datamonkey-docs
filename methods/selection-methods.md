# Methods for Inferring Selection Pressure

HyPhy distributes a variety of methods for inferring the strength of natural selection in your data using, in the case of codon-based methods, the _dN/dS_ metric. Here, we provide an overview of each method. For help determining which method best suits your specific needs, follow [these guidelines](../getting-started/#characterizing-selective-pressures).

# Other Methods

## FADE

FADE (**F**UBAR **A**proach to **D**irectional **E**volution) is a method that uses a Bayesian framework, based on that introduced by [**FUBAR**](./selection-methods/#fubar) ), to test whether sites in a _protein alignment_ are subject to directional selection. Specifically, FADE will systematically test, for each site in the alignment, whether a specified set of foreground branches shows a _substitution bias_ towards a particular amino-acid, compared to background branches. High values of this bias parameter indicate that the site is experiencing substantially more than expected substitutions towards a particular amino-acid. Statistical significance in FADE is assessed using Bayes Factors (BF), where $BF\geq100$ provides strong evidence that the site is evolving under directional selection.

Importantly, unlike most methods in HyPhy, FADE does not use a reversible Markov model since its aim is to detect directional selection. As such, a rooted phylogeny is required for FADE analysis. The browser-based interactive tools [Phylotree.js](http://phylotree.hyphy.org/) can be used to help root the tree prior to analyzing with FADE.

Please also note that FADE has replaced older methods for detecting directional selection, including EDEPS and MEDS. FADE citation is forthcoming.
