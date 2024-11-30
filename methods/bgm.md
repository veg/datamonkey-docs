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
