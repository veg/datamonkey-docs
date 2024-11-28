## PRIME

|   |   |
|---|---|
| HyPhy version required   |  &geq; 2.5.7 |
| Parallel support | MP |
| File path | `TemplateBatchFiles/SelectionAnalyses/PRIME.bf` |
| Standard analysis menu | `prime` |
| Citation | TBA |

### Model Description
In PRIME, the non-synonymous rates of replacing codon encoding amino-acid x with a codon encoding amino-acid y is parameterized as 
$\begin{equation} \beta_{xy,x \neq y} = f^{(s)}(\overrightarrow{d(x,y)}) \end{equation}$.
Here, $ \overrightarrow{d(x,y)} $ is a vector consisting of property-specific distance measures, each of which 
indicates the degree of dissimilarity of amino acids x and y with respect to a particular (possibly composite) property or 
set of properties. The function f(s) maps the distances into an exchangeability, with the superscript (s) making it
explicit that the exchangeability of x and y depends on the relative importance of the various amino acid properties at site s.

We assume that the properties do not interact: they are composite measures that have been constructed in such a way as to remove
dependencies (as is attempted by standard dimensionality reduction techniques such as principal components analysis), this should 
be reasonable. We calculate the property-specific distance $ d(x,y)_{i} = | x_{i} − y_{i} | $ between amino acids x and y for each property i,
and model the contribution of each of these distances to βxy as independent. The exchangeability function f(s) is then a site-specific 
function of D property-specific distances.

### Example

Consider the first two of the five composite properties from Atchley et al.[3](https://www.pnas.org/content/102/18/6395): the first measures bipolarity, 
while the second relates to the propensity of amino acids to be in various secondary structure configurations; 
the numerical distances for alanine (A) and cysteine (C) are 0.752 (property 1) and 1.767 (property 2). 
The exchangeability of A and C is a function f(s)([0.752,1.767])
which depends on both distances and the relative importance of properties 1 and 2 at site s.

### Exchangeability function
Because we are modeling the contribution due to each property as independent, the exchangeability function 
is a product of property-specific contributions. Under purifying selection, each of these contributions 
should be a monotonically decreasing function -- the most natural parameterization is an exponential decline 
of exchangeability as properties become more dissimilar. This yields the exponential independent model:
$\begin{equation} f^{(s)}(\overrightarrow{d(x,y)} = r^{(s)} \prod_{i=1}^{D}[e^{\alpha^{(s)}d_{i(x,y)}} = r^{(s)}exp[- \sum_{i=1}^{D}\alpha_{i}^(s) |x_i = y_i|] \end{equation} $.
Here, r(s) is the site-specific synonymous substitution rate, and the site-specific parameters  $\alpha_{i}^(s)$
represent the importance of property i: when $\alpha_{i}^{(s)} = 0$, selection is neutral with respect to that property, while
positive values of $alpha_{i}^{(s)}$ cause the property to be conserved. Small positive values of $alpha_{i}^{(s)}$
mean that conservative changes are tolerated but not radical changes, but as $alpha_{i}^{(s)}$ increases, purifying selection starts affecting even conservative changes.

If substitutions that are radical with respect to property i are accelerated relative to substitutions that are conservative with respect to i, the exponential parameterization applies, and fitting the model to a site under positive selection will result in
$alpha_{i}^{(s)} < 0$
### Sets of amino acid properties
PRIME currently supports two predefined sets of 5 amino-acid properties: the five empirically measured properties used by Conant et al. [4](https://www.sciencedirect.com/science/article/abs/pii/S1055790306002776?via%3Dihub)
and the five composite properties proposed by Atchley et al. [3](https://www.pnas.org/content/102/18/6395). The latter were obtained by applying a dimensionality
reduction technique based on factor analysis to a large set of 494 empirically measured attributes.

### Property interpretation

|Property|	1	| 2	| 3 |	4 |	5|
|---|---|---|---|---|---|
|Conant-Stadler [4](https://www.sciencedirect.com/science/article/abs/pii/S1055790306002776?via%3Dihub) |	Chemical Composition	|Polarity |	Volume |	Iso-electric point|	Hydropathy|
|Atchley et al [3](https://www.pnas.org/content/102/18/6395) |	Polarity index | Secondary structure factor |	Volume|	Refractivity/Heat | Capacity	Charge/ Iso-electric point |

### Fitting and testing
- Fitted a simple codon model to an alignment to estimate nucleotide substitution biases and alignment-wide branch lengths: these parameters will be held constant at those estimates for subsequent analyses (all see [FUBAR](http://hyphy.org/methods/selection-methods/#fubar))
- For each site, we fit the 6-parameter model described by -- the full model, with parameters r(s) (synonymous rate, relative to the alignment average) and $\alpha^{(s)}_1,\ldots,\alpha^{(s)}_5$ (five property weights) -- and five null models, each of which constrains one of the $\alpha^{(s)}_i$ to 0 and thereby tests whether or not there is evidence that change in this property is important at site s.
- Each individual null model is compared to the full model by a likelihood ratio test using the $\chi^2_1$ distribution to assess significance. Previous applications of FEL in similar modeling contexts suggest that this test statistic is appropriate, albeit somewhat conservative for small datasets (e.g. [1](https://academic.oup.com/mbe/article/22/5/1208/1066893)). Because multiple tests are performed on the same data (a single site), we employ the Holm-Bonferroni 
procedure to control the family-wise false positive rate (at a site). We also report q-values based on the False Discovery Rate calculation by the procedure of Benjamini and Hochberg.
