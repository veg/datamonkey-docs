# Analyzing Data

## Selecting a Nucleotide Model

Complete model selection procedure details can be found in this [MBE paper](http://mbe.oxfordjournals.org/cgi/content/short/22/5/1208).

### General Advice

We recommend that you run a model selection procedure, which sifts all 203 possible time-reversible models through a hierarchical testing procedure combining nested LRT tests with AIC selection to pick a single "best-fitting" rate matrix. Model selection is processed on a remote cluster and should take no more than a few minutes to complete.

To allow the most general model of nucleotide substitution, select the General Reversible Model (REV), since it does not add much to the overall processing time. However, if your data set is small, it may not be possible to accurately estimate nucleotide substitution bias rates, and HKY85 might not be a bad choice. You can also try several different models and see if the location of inferred sites changes depending on the nucleotide model (it rarely does, unless the model is very wrong).

---

# Handling Ambiguities

For more details see [MBE paper](http://mbe.oxfordjournals.org/cgi/content/short/22/5/1208).

#### Averaged (default)

All possible resolutions of an ambiguous character contribute, in a weighted fashion, to the computation of EN, ES, NN and NS (see [methods paper](../paper.pdf)). Characters without any information (all gaps or all missing) are NOT counted though, to avoid artificially high dN and dS estimates.

#### Resolved

The most likely resolution *for the given site* is used in the computation of EN, ES, NN and NS. Ties are broken randomly.

#### Skip

(Details not provided)

#### GapMM

(Details not provided)

## Example

Consider the site: 
```
ACA ACG ACG ACR
```

For the resolved option, only the most frequent resolution *based on the data in the site only* will be considered. In this case, the resolution is 'ACG'.

For the averaged option, all four possible resolutions ('ACA' and 'ACG') will be considered. The weight factor for each resolution is determined by the relative frequency of that codon to all possible resolutions. If f(xyz) denotes the frequency of codon xyz in the entire data file, then the contribution of ACA will be f(ACA)/(f(ACA)+f(ACG)) and of 'ACG': f(ACG)/(f(ACA)+f(ACG)).

---

# Choosing Significance Levels

For more details see [MBE paper](http://mbe.oxfordjournals.org/cgi/content/short/22/5/1208).
