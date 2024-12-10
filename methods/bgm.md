# BGM

The **B**ayesian **G**raphical **M**odel (BGM) method is a tool for detecting
coevolutionary interactions between amino acid positions in a protein. This
method is similar to the "correlated substitutions" method described by
[Shindyalov _et al._
1994](https://academic.oup.com/peds/article-abstract/7/3/349/1469726), in which
amino acid substitution events are mapped to branches in the phylogenetic tree.
BGM uses a method similar to [SLAC](selection-methods/#slac), where amino acid
substitution events are mapped to the tree from the ancestral reconstruction
under joint maximum likelihood for a given model of codon substitution rates.

After amino acid substitutions have been mapped, the user is required to
specify a filtering criterion to reduce the number of codon sites in the
alignment to be analyzed. This is an important step because the number of
graphical models (networks) increases faster than exponentially with the number
of variables. You do not want to have many more codon sites than there are
sequences (observations) in the alignment. Furthermore, since the BGM analysis
is essentially driven by a series of tests on 2x2 contingency tables
(comprising the presence/absence of substitutions on branches), you should
generally avoid including codon sites where only a single amino acid
substitution was mapped to the tree.

A Bayesian graphical model (Bayesian network) is a probabilistic framework from
the field of artificial intelligence that enables a machine to generate a
representation of a complex system that is made up of an unknown number of
conditional dependencies (statistical associations) among a large number of
variables. These dependencies comprise the _network structure_. This approach
is useful because these associations are evaluated in the full context of the
joint probability distribution; there is no need to filter significant
associations to adjust for multiple comparisons, for instance.

BGM uses a Markov chain Monte Carlo method to generate a random sample of
network structures from the posterior distribution. Because the space of all
possible network structures is too extensive, we use an MCMC method described
by [Friedman and
Koller](https://link.springer.com/article/10.1023/A:1020249912095), which
collapses this enormous space by grouping structures into subsets defined by a
node hierarchy. This results in a more compact space where the posterior
distribution has nicer convergence properties.

Extensive details about how to run a BGM analysis in HyPhy is also provided in
this book chapter: [`Avino M and Poon AFY. "Detecting Amino Acid Coevolution
with Bayesian Graphical Models." Methods Mol Biol 1851: 105-122
(2019).`](https://link.springer.com/protocol/10.1007%2F978-1-4939-8736-8_6)

## Citation

**If you use BGM in your analysis, please cite the following:**

[Poon, AFY et
al. "An Evolutionary-Network Model Reveals Stratified Interactions in the V3
Loop of the HIV-1 Envelope." PLOS Comput Biol 3, e231
(2007).](https://doi.org/10.1371/journal.pcbi.0030231)

## Example CLI Usage of BGM

To run the Bayesian Graphical Model (BGM) using HyPhy, use the following command:

```bash
/path/to/hyphy/hyphy bgm \
  --branches "All" \
  --code GENETIC_CODE \
  --type DATATYPE \
  --alignment PATH_TO_ALIGNMENT_FILE \
  --tree PATH_TO_TREE_FILE \
  --steps LENGTH_OF_EACH_CHAIN \
  --burn-in NUMBER_OF_BURN_IN_SAMPLES \
  --samples NUMBER_OF_SAMPLES \
  --max-parents MAXIMUM_PARENTS_PER_NODE \
  --min-subs MINIMUM_SUBSTITUTIONS_PER_SITE \
  --output RESULTS_FILE.json
```

### Parameters

- **--branches**: Specify branches to test (e.g., "All").
- **--code**: Genetic code to use (default: "Universal").
- **--type**: Data type: `nucleotide`, `amino-acid`, or `codon`.
- **--alignment**: Path to the alignment file.
- **--tree**: Path to the phylogenetic tree file.
- **--steps**: Number of MCMC steps to sample.
- **--burn-in**: Number of MCMC steps to discard as burn-in.
- **--samples**: Number of samples to extract from the chain.
- **--max-parents**: Maximum number of parents allowed per node.
- **--min-subs**: Minimum number of substitutions per site to include in the analysis.
- **--output**: Path for the output results in JSON format.

### Full Example Command

```bash
/path/to/hyphy/hyphy bgm \
  --branches "All" \
  --code "Universal" \
  --type "codon" \
  --alignment "/path/to/alignment/file.fasta" \
  --tree "/path/to/tree/file.tree" \
  --steps 100000 \
  --burn-in 10000 \
  --samples 100 \
  --max-parents 1 \
  --min-subs 1 \
  --output "results.BGM.json"
```

### Minimal Example Command

```bash
/path/to/hyphy/hyphy bgm \
  --branches "All" \
  --code "Universal" \
  --type "codon" \
  --alignment "/path/to/alignment/file.fasta" \
  --tree "/path/to/tree/file.tree"
```

## FAQ

### 1. **Why are my BGM results showing constant sites as co-evolving?**

- BGM uses codon data, considering both synonymous and non-synonymous substitutions.

### 2. **Can BGM compare specified branches against other branches?**

- BGM does not natively support comparisons between specified foreground branches and other background branches. However, you can run separate analyses on your desired sets of branches to explore co-evolutionary patterns.

### 3. **What should I do if I experience "standard error" messages while running Spidermonkey/BGM?**

- If encountering standard errors, ensure your input parameters align with the expected data types. If problems persist, consider submitting the job details and parameters to the support team for analysis.
