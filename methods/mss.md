# Multiple Synonymous Substitution (MSS)

MSS (**M**ultiple **S**ynonymous **S**ubstitution) models use a maximum-likelihood (ML) framework to investigate selection on synonymous substitutions in coding sequences. MSS models extend traditional codon models (*e.g.*, MG94) by estimating substitution rates among synonymous codon pairs, allowing these rates to vary based on codon-specific features. Synonymous rates may be estimated for a single gene, or estimated jointly from a set of genes.

After optimizing phylogenetic parameters such as branch lengths and nucleotide substitution biases, MSS assigns each synonymous substitution to one of multiple rate classes, then estimates the relative substitution rate for each rate class. MSS models capture heterogeneity in codon usage driven by selective pressures like translational efficiency, and enable a rigorous statistical comparison of synonymous substitution rates within or across genes. 

## Citation

If you use MSS in your analysis, please cite:

Verdonk, H., Pivirotto, A., Pavinato, V., Hey, J., & Kosakovsky Pond, S.L. (2024). A new comparative framework for estimating selection on synonymous substitutions. BioRxiv (Cold Spring Harbor Laboratory). https://doi.org/10.1101/2024.09.17.613331

## Available MSS models
- **Full**: Each set of codons mapping to the same amino-acid class have a separate substitution rate (Valine == neutral)
- **SynREV**: Each set of codons mapping to the same amino-acid class have a separate substitution rate (mean = 1)
- **SynREV2**: Each pair of synonymous codons mapping to the same amino-acid class and separated by a transition have a separate substitution rate (no rate scaling)
- **SynREV2g**: Each pair of synonymous codons mapping to the same amino-acid class and separated by a transition have a separate substitution rate (Valine == neutral). All between-class synonymous substitutions share a rate.
- **SynREVCodon**: Each codon pair that is exchangeable gets its own substitution rate (fully estimated, mean = 1)
- **Random**: Random partition (specify how many classes; largest class = neutral)
- **Empirical**: Load a TSV file with an empirical rate estimate for each codon pair
- **File**: Load a TSV partition from file (prompted for neutral class)
- **Codon-file**: Load a TSV partition for pairs of codons from a file (prompted for neutral class)

## Analysis of a single gene
### Required Inputs

- **Genetic Code**: The genetic code to use (default: "Universal").
- **Alignment File**: An in-frame codon alignment file (supported formats: `.fasta`, `.nex`, etc.).
- **Phylogenetic Tree**: A phylogenetic tree (with optional branch length annotations) appended to the FASTA file or embedded within the NEXUS file.
- **Model**: Which hyphy model to fit. In this case, MSS (as opposed to a model like [FEL](fel.md))
- **MSS Type**: Which of the available MSS models to use.

### Optional Inputs
- **Output File**: Automatically generated in JSON format.

### Full Example Command

To run the MSS analysis with specified parameters, use the following command syntax:

```bash
/path/to/hyphy/hyphy \
/path/to/hyphy-analyses/FitModel/FitModel.bf \
  --model MSS \
  --mss-type SynREVCodon \
  --alignment path/to/alignment_file.fas \
  --tree path/to/tree_file.nwk \
  --code Universal \
  --output results.json
```

### Minimal Example Command

A minimal command using default parameters would look like this:

```bash
/path/to/hyphy/hyphy \
/path/to/hyphy-analyses/FitModel/FitModel.bf \
  --alignment path/to/alignment_file.fas \
  --tree path/to/tree_file.nwk \
  --model MSS \
  --mss-type SynREVCodon \
```

### List of Parameters

- **--alignment**: Path to the in-frame codon alignment file.
- **--tree**: Path to the phylogenetic tree file (optionally annotated).
- **--code**: Genetic code to use (default is "Universal").
- **--model**: Which hyphy model to fit. In this case, specify `MSS`
- **--mss-type**: One of the MSS models from the list of available models.
- **--mss-classes**: How many codon rate classes. Required when `mss-type` is "Random".
- **--mss-file**: Required file defining the model partition when `mss-type` is "File" or "Codon-file". Required file defining empirical rates for each pair of codons when `mss-type` is "Empirical". Not required otherwise.
- **--mss-neutral**: Designation for the neutral substitution rate. Required when `mss-type` is "File" or "Codon-file".
- **--output**: Path to save the resulting JSON output file (default is auto-generated).


## Joint analysis of several genes
### Required Inputs

- **Genetic Code**: The genetic code to use (default: "Universal").
- **Model**: Which MSS model to use. Options are SynREV (Default) or SynREVCodon.
- **File list**: A text list of newline-separated file paths, where each listed file contains a codon-aware alignment and the corresponding gene tree
- **Omega**: How alignment-level omega estimates should be handled (default: "Fix"; Fix omega estimates at those obtained with the standard MG94xREV model)

### Optional Inputs
- **Output File**: Automatically generated in JSON format.

### Full Example Command

To run the MSS analysis with specified parameters, use the following command syntax:

```bash
/path/to/hyphy/hyphy \
/path/to/hyphy/res/TemplateBatchFiles/MSS-joint-fitter.bf \
  --filelist path/to/list_of_files.txt \
  --code Universal \
  --model SynREVCodon \
  --omega Fix \
  --output results.json
```

### Minimal Example Command

A minimal command using default parameters would look like this:

```bash
/path/to/hyphy/hyphy \
/path/to/hyphy/res/TemplateBatchFiles/MSS-joint-fitter.bf \
  --filelist path/to/list_of_files.txt \
  --model SynREVCodon
```

### List of Parameters

- **--filelist**: List of files to include in this analysis.
- **--code**: Genetic code to use (default is "Universal").
- **--model**: Which MSS model to use. Options are SynREV (Default) or SynREVCodon.
- **--omega**: How should alignment-level omega be treated? (default: Fix)
- **--output**: Path to save the resulting JSON output file (default is auto-generated).
- **--save-fit**: Write the resulting model fit file to this (large!) file.


## Outputs

### Summary

MSS generates a JSON file containing:

- Analysis details, including metadata and input parameters.
- Synonymous rate for each codon class (maximum likelihood estimate).
- Joint analyses will also contain data for each individual gene (each gene is listed as a "model_object").

## Visualization

Coming soon: **MSS Visualization Tool** for an interactive exploration of results.

