# MEME

MEME (**M**ixed **E**ffects **M**odel of **E**volution) employs a mixed-effects
maximum likelihood approach to test the hypothesis that individual sites have
been subject to episodic positive or diversifying selection. In other words,
MEME aims to detect sites evolving under positive selection under a _proportion_
of branches.

For each site, MEME infers two $\omega$ rate classes and corresponding weights
representing the probability that the site evolves under each respective
$\omega$ rate class at a given branch.

To infer $\omega$ rates, MEME infers a single $\alpha$ (dS) value and two
separate $\beta$ (dN) values, $\beta^+$ and $\beta^-$. Both $\beta^+$ and $\beta^-$
share the same $\alpha$ per site.

**Alternative Model Rate Parameter Constraints**
$$ \alpha\ unrestricted \\ \beta^+\ unrestricted \\ \beta^- \leq \alpha $$

**Null Model Rate Parameter Constraints**
$$\alpha\ unrestricted \\ \beta^+ \leq \alpha \\ \beta^- \leq \alpha$$

The $\beta^+$ parameter is the key difference between the null and alternative
models. In the null model, both $\beta^+$ and $\beta^-$ are constrained, but
$\beta^+$ is unrestricted in the alternative model.

Positive selection for each site is inferred when $\beta^+ > \alpha$ and shown
to be significant using the likelihood ratio test.

**If you use MEME in your analysis, please cite the following:** [`Murrell, B et
al. "Detecting individual sites subject to episodic diversifying selection."
PLoS Genetics 8, e1002764
(2012).`](http://dx.doi.org/10.1371/journal.pgen.1002764)
