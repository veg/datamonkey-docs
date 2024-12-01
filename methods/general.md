<!--------------------------------------------------------------------------------------->

## Overview

HyPhy provides a suite of tools for analyzing phylogenetic sequence data, in particular for inferring the strength of selection from sequence data. In addition, HyPhy features a flexible batch language for implementing and customizing discrete state Markov models in a phylogenetic framework.

<!--------------------------------------------------------------------------------------->

## MG94xREV Framework

All methods used to infer selection from coding-sequence data rely, to some extent, on the MG94xREV codon model, a generalized extension of the [MG94 model](https://www.ncbi.nlm.nih.gov/pubmed/7968485/) that allows for a full GTR mutation rate matrix. The MG94xREV _transition matrix_ **Q** (also known as the _instantaneous rate matrix_), for the substitution from codon $i$ to codon $j$ is given by:

$$
\begin{equation}
q_{ij} = \left\{
\begin{array}{rl}
\alpha\theta_{ij}\pi_{j},         &\delta(i,j)=1, AA(i)=AA(j)     \\
\beta\theta_{ij}\pi_{j},          &\delta(i,j)=1, AA(i)\neq AA(j) \\
0,                                 &\delta(i,j)>1                  \\
-\sum_{k \neq i}q_{ik},            & i=j
\end{array} \right.
\end{equation}
$$

Parameters in this matrix include the following:

- The function $\boldsymbol{\delta(i,j)}$ is an indicator function that equals the number of nucleotide differences between codons $i$ and $j$; for example, $\delta(AAA,AAT) = 1$ and $\delta(AAA,CCG) = 3$. Like most other codon models, the MG94xREV model considers only single-nucleotide codon substitutions to be instantaneous.

- $\boldsymbol{AA(i)}$ refers to the amino-acid encoded by codon $i$.

- $\boldsymbol{\alpha}$ represents the _synonymous substitution rate_ dS, and $\boldsymbol{\beta}$ represents the _nonsynonymous substitution rate_ dN. Hence, $dN/dS = \beta/\alpha$. We refer to the $dN/dS$ ratio as simply $\omega$.

- Together, the mutation model ("REV" component of MG94xREV model) is described by two parameter sets: $\boldsymbol{\Theta}$, comprised of values $\theta_{ij}$, and $\boldsymbol{\Pi}$, comprised of values $\pi_{j}$. $\Theta$ values are the _nucleotide mutational biases_, and $\Pi$ are the _equilibrium nucleotide frequencies_.
- Not explicitly seen in this model are the _equilibrium codon frequencies_, denoted $\boldsymbol{\hat{\Pi}}$. These frequencies are estimated using nine positional nucleotide frequencies for the target nucleotides in each codon substitution. Specifically, HyPhy employs the [CF3x4](http://dx.doi.org/10.1371/journal.pone.0011230) frequency estimator, a corrected version of the common F3x4 estimator (introduced in [Goldman and Yang 1994](https://www.ncbi.nlm.nih.gov/pubmed/7968486)) which accounts for biases in nucleotide composition induced by stop codons.

Most methods <!--(except FADE, which does not use codon data)--> will perform a global MG94xREV fit to optimize branch length and nucleotide substitution parameters before proceeding to hypothesis testing. Several methods ([FEL](./selection-methods/#fel), [FUBAR](./selection-methods/#fubar), and [MEME](./selection-methods/#meme)) additionally pre-fit a GTR nucleotide model to the data, using the estimated parameters as starting values for the global MG94xREV fit, as a computational speed-up. Resulting branch length and nucleotide substitution parameters are subsequently used as initial parameter values during model fitting for hypothesis testing.

<!--------------------------------------------------------------------------------------->

## Synonymous Rate Variation

A key component of HyPhy methods is the inclusion of _synonymous rate variation_. In other words, dS is allowed to vary across sites and/or branches, depending on the specific method. [This paper](https://doi.org/10.1093/molbev/msi232) provides a detailed analysis demonstrating why incorporating synonymous rate variation into positive selection inference is likely beneficial. Importantly, this consideration of synonymous rate variation stands in contrast to methods implemented in, for example, [PAML](https://doi.org/10.1093/molbev/msm088) where dS is constrained to equal 1.
