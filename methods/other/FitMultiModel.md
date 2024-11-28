## FitMultiModel

|   |   |
|---|---|
| HyPhy version required   |  &geq; 2.5.7 |
| Parallel support | MP |
| File path | `TemplateBatchFiles/SelectionAnalyses/FitMultiModel.bf` |
| Standard analysis menu | `FMM` |
| Citation | [Preprint](http://hyphy.org/resources/fmm.pdf) |

### What biological question is the method designed to answer?

Does a data set have evidence of multiple simultaneous hits (MH) and to what exitent? 

### What are the recommended applications?

FMM can be useful if a scientist wishes to see if MH exsist in their data and the potential impact of those MH. 
FMM will also provide a list of sites that show strong preference for codon models with multiple hits that may be used for further exploration.

### What is the statistical procedure and statistical test is used to establish significance for this method?
For each alignment the following models are fit to the data:

- **1H**: The standard Muse and Gaut (1994) codon model that allows for only single instantaneous nucleotide changes

- **2H**: an extension of the 1H model that allows two nucleotides in a codon to be substituted instantaneously with rate &delta; relative to 1H synonymous rate

- **3HSI**: the 2H model extended to allow three simultaneous nucleotide substitutions in a codon if the change is synonymous with relative rate, &psi;<sub>s</sub>

- **3H**: the 2H model extend to allow any three nucleotide simultanceous substitutions with relative rate &psi; 

- **3H+**: the 3HSI model extended to permit any three-nulceotide substitutions with relative rate &psi;

See the following table for a breakdown of parameters and if they are estimated for each model:

<table>
    <tr>
        <td></td>
        <td></td>
        <td colspan=5>Model</td>
    </tr>
    <tr>
        <td>Parameter</td>
        <td>Description</td>
        <td>1H</td>
        <td>2H</td>
        <td>3HSI</td>
        <td>3H</td>
        <td>3H+</td>
    </tr>
    <tr>
        <td>&omega;<sub>i</sub></td>
        <td>Site dN/dS ratio</td>
        <td colspan=5>Random effect  3-bin GDD distribution </td>
    </tr>
    <tr>
        <td>&delta;</td>
        <td>Global 2H/1H rate ratio</td>
        <td>0</td>
        <td>Estimated</td>
        <td>Estimated</td>
        <td>Estimated</td>
        <td>Estimated</td>
    </tr>
    <tr>
        <td> &psi;<sub>s</sub></td>
        <td>Global 3H/1H rate ratio for synonymous codon islands</td>
        <td>0</td>
        <td>Estimated</td>
        <td>Estimated</td>
        <td>= &psi;</td>
        <td>Estimated</td>
    </tr>
    <tr>
        <td>&psi;</td>
        <td>Global 3H/1H rate ratio</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>Estimated</td>
        <td>Estimated</td>
    </tr>
</table>

The actual statistical test being performed are pairwise likelihood ratio test between the models such that the null is always the model with fewer parameters eg: 1H v 2H, 1H - null and 2H alternative. 

### How should one interpret positive and negative test results?

A positive result (ie p ≤ 0.05) for a likelihood ratio test between two models, H<sub>0</sub> and H<sub>A</sub>, means that we reject H<sub>0</sub>. For example, if we look at a LRT between 1H and 2H, where 1H is  H<sub>0</sub> and 2H is H<sub>A</sub>, a p value ≤ 0.05 means we can reject the hypothesis that 2H has zero rates. 

A negative result (ie  p > 0.05) means we fail to reject the null. Thus in the same example as above (1H vs 2H) we would fail to reject the hypothesis that 2H has zero rates.

###  Rules of thumb for when this method is likely to work well, and when it is not.

This method is likely to work well on trees with longer branches and sequences. 
It is not likely to work well on shorter trees. 


### Example

For more information about running options see [here](https://github.com/veg/hyphy-analyses/tree/master/FitMultiModel)

```
HYPHYMP FitMultiModel.bf --alignment p51.nex --triple-islands Yes
```

The following data are output to the screen.

Analysis Description
--------------------
Examine whether or not a codon alignment is better fit by models which
permit multiple instantaneous substitutions. v0.2 adds a separate rate
for codon-island triple-hit rates

- __Requirements__: in-frame codon alignment and a phylogenetic tree

- __Written by__: Sergei L Kosakovsky Pond, Sadie Wisotsky and Alexander Lucaci

- __Contact Information__: spond@temple.edu

- __Analysis Version__: 0.2

>code –> Universal
>Loaded a multiple sequence alignment with **8** sequences, **440** codons, and **1** partitions from `/home/swisotsky/hyphy-analyses/FitMultiModel/p51.nex`
The number of omega rate classes to include in the model (permissible range = [1,10], default value = 3, integer): 
>rates –> 3

>triple-islands –> Yes


### Obtaining branch lengths and nucleotide substitution biases under the nucleotide GTR model
* Log(L) = -3320.50, AIC-c =  6683.09 (21 estimated parameters)

### Obtaining the global omega estimate based on relative GTR branch lengths and nucleotide substitution biases
* Log(L) = -3178.60, AIC-c =  6413.66 (28 estimated parameters)
* non-synonymous/synonymous rate ratio for *test* =   0.2459

### Fitting Standard MG94
* Log(L) = -3121.04, AIC-c =  6308.73 (33 estimated parameters)
* non-synonymous/synonymous rate ratio =   0.2967
* The following relative rate distribution (mean 1) for site-to-site **non-synonymous** rate variation was inferred

|               Rate                | Proportion, % |               Notes               |
|-----------------------------------|---------------|-----------------------------------|
|               0.186               |    86.040     |                                   |
|               4.466               |    13.674     |                                   |
|              80.143               |     0.286     |                                   |


### Fitting MG94 with double instantaneous substitutions
* Log(L) = -3121.03, AIC-c =  6310.74 (34 estimated parameters)
* non-synonymous/synonymous rate ratio =   0.2946
* rate at which 2 nucleotides are changed instantly within a single codon =   0.0127
* The following relative rate distribution (mean 1) for site-to-site **non-synonymous** rate variation was inferred

|               Rate                | Proportion, % |               Notes               |
|-----------------------------------|---------------|-----------------------------------|
|               0.186               |    85.954     |                                   |
|               4.448               |    13.757     |                                   |
|              79.054               |     0.289     |                                   |

### Fitting MG94 with double and triple instantaneous substitutions
* Log(L) = -3121.03, AIC-c =  6314.82 (36 estimated parameters)
* non-synonymous/synonymous rate ratio =   0.2947
* rate at which 2 nucleotides are changed instantly within a single codon =   0.0127
* rate at which 3 nucleotides are changed instantly within a single codon =   0.0000
* rate at which 3 nucleotides are changed instantly within a single codon between synonymous codon islands =   0.0000
* The following relative rate distribution (mean 1) for site-to-site **non-synonymous** rate variation was inferred

|               Rate                | Proportion, % |               Notes               |
|-----------------------------------|---------------|-----------------------------------|
|               0.186               |    85.952     |                                   |
|               4.444               |    13.756     |                                   |
|              78.643               |     0.291     |                                   |


### Fitting MG94 with double and triple instantaneous substitutions [only synonymous islands]
* Log(L) = -3121.03, AIC-c =  6312.78 (35 estimated parameters)
* non-synonymous/synonymous rate ratio =   0.2946
* rate at which 2 nucleotides are changed instantly within a single codon =   0.0126
* rate at which 3 nucleotides are changed instantly within a single codon =   0.0000
* rate at which 3 nucleotides are changed instantly within a single codon between synonymous codon islands =   0.0000
* The following relative rate distribution (mean 1) for site-to-site **non-synonymous** rate variation was inferred

|               Rate                | Proportion, % |               Notes               |
|-----------------------------------|---------------|-----------------------------------|
|               0.186               |    85.959     |                                   |
|               4.451               |    13.751     |                                   |
|              78.760               |     0.290     |                                   |


### Summary of rate estimates and significance testing
|                Model                 |   Log-L    |   omega    | 2-hit rate |              p-value               | 3-hit rate |              p-value               |
|:------------------------------------:|:----------:|:----------:|:----------:|:----------------------------------:|:----------:|:----------------------------------:|
|            Standard MG94             |  -3121.04  |    0.2967  |    N/A     |                N/A                 |    N/A     |                N/A                 |
|        Standard MG94 + 2 hits        |  -3121.03  |    0.2946  |    0.0127  |       0.8622 (2-hit rate = 0)      |    N/A     |                N/A                 |
|   Standard MG94 + 3 hits (islands)   |  -3121.03  |    0.2946  |    0.0000  |    0.9960 (3-hit island vs 2-hit)  |    0.0000  |          1.0000 (3-hit = 0)        |
|     Standard MG94 + 2 or 3 hits      |  -3121.03  |    0.2947  |    0.0127  |      0.9986 (2&3-hit rates = 0)    |    0.0000  |      1.0000 (3-hit rate(s) = 0)    |

### No individual sites showed sufficiently strong preference for multiple-hit models

### Writing detailed analysis report to `/home/swisotsky/hyphy-analyses/FitMultiModel/p51.nex.FITTER.json'
