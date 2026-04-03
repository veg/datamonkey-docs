# MCP Server

Datamonkey exposes its analysis tools through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io), allowing AI assistants and programmatic clients to submit jobs, poll status, and retrieve results directly.

**Server URL**: `https://mcp.datamonkey.org/mcp`
**Transport**: Streamable HTTP
**Auth**: OAuth (browser-based, automatic on first connection)

## Connecting

### Claude Code

```bash
claude mcp add datamonkey --transport http https://mcp.datamonkey.org/mcp
```

On first use, a browser window opens for OAuth authorization. After that, tools appear as `mcp__datamonkey__spawn_analysis`, etc.

### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "datamonkey": {
      "type": "http",
      "url": "https://mcp.datamonkey.org/mcp"
    }
  }
}
```

Restart Claude Desktop. Datamonkey tools will appear in the tool list.

### VS Code / Cursor / Windsurf

Create or edit `.vscode/mcp.json` (VS Code), `~/.cursor/mcp.json` (Cursor), or `~/.codeium/windsurf/mcp_config.json` (Windsurf):

```json
{
  "mcpServers": {
    "datamonkey": {
      "type": "http",
      "url": "https://mcp.datamonkey.org/mcp"
    }
  }
}
```

> **VS Code**: use `"servers"` as the root key instead of `"mcpServers"`.

### Python

```bash
pip install mcp
```

```python
import asyncio
from mcp.client.streamable_http import streamablehttp_client
from mcp import ClientSession

async def main():
    async with streamablehttp_client("https://mcp.datamonkey.org/mcp") as (r, w, _):
        async with ClientSession(r, w) as session:
            await session.initialize()
            tools = await session.list_tools()
            print([t.name for t in tools.tools])

            result = await session.call_tool("spawn_analysis", arguments={
                "analysis_type": "fel",
                "alignment": open("my_alignment.fasta").read()
            })
            print(result)

asyncio.run(main())
```

## Tools

| Tool | Description |
|------|-------------|
| `list_analyses` | List all 18 available HyPhy methods with their parameters |
| `validate_alignment` | Pre-flight check on alignment data before submitting a job |
| `spawn_analysis` | Submit an analysis job |
| `get_job_status` | Check whether a job is queued, running, completed, or errored |
| `get_job_results` | Retrieve the full HyPhy JSON output for a completed job |
| `cancel_job` | Cancel a running or queued job |

### `spawn_analysis` parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `analysis_type` | Yes | One of: `absrel`, `fel`, `busted`, `relax`, `meme`, `slac`, `fubar`, `gard`, `cfel`, `multihit`, `nrm`, `fade`, `bgm`, `bstill`, `difFubar`, `prime`, `hivtrace`, `flea` |
| `alignment` | Yes | FASTA alignment data |
| `tree` | No | Newick tree (recommended; server infers one via neighbor-joining if omitted) |
| `params` | No | Method-specific parameters (see [method-specific parameters](#method-specific-parameters)) |

## Prompts

Built-in prompts provide guided workflows:

| Prompt | Description |
|--------|-------------|
| `choose-method` | Interactive guide to pick the right HyPhy method for your question |
| `run-busted` | Setup guide for BUSTED with foreground branch labeling |
| `run-relax` | Setup guide for RELAX with required TEST/REFERENCE labels |
| `interpret-results` | Method-specific guidance for interpreting output |

## Resources

| Resource | URI | Description |
|----------|-----|-------------|
| Method Comparison | `datamonkey://methods/comparison` | Markdown table comparing all 18 methods |
| Method Requirements | `datamonkey://methods/requirements` | JSON with each method's input requirements |
| Method Guide | `datamonkey://methods/{method}/guide` | Detailed guide for a specific method |

## Example Workflows

### Site-level selection (FEL)

> "Run FEL on my alignment to find sites under pervasive selection."

Claude will validate your alignment, submit the job, poll until completion, and summarize which sites show significant positive or negative selection.

### Gene-wide selection (BUSTED)

> "Test whether my gene shows evidence of episodic diversifying selection using BUSTED."

For targeted analysis, label foreground branches in your tree with `{FG}`:

```
((seq1:0.1,seq2:0.2){FG}:0.3,(seq3:0.1,seq4:0.2):0.3);
```

### Selection relaxation (RELAX)

RELAX **requires** labeled branches. Your tree must have `{TEST}` and `{REFERENCE}` labels:

```
((seq1:0.1,seq2:0.2){TEST}:0.3,(seq3:0.1,seq4:0.2){REFERENCE}:0.3);
```

### Recombination-aware pipeline

> "Run GARD on my alignment to detect recombination breakpoints, then run FEL on each partition."

### Bayesian quick scan (FUBAR)

> "Run FUBAR on my alignment — I want a quick scan for sites under selection."

FUBAR uses posterior probabilities instead of p-values. Sites with posterior > 0.9 are considered significant.

## Method-Specific Parameters

Default parameters are used when `params` is omitted. Override any of the following per method:

### FEL
```json
{ "branches": "All", "multiple_hits": "None", "ci": false, "ds_variation": false }
```

### MEME
```json
{ "p_value": 0.1, "multiple_hits": "None", "rates": 2, "resample": 0 }
```

### BUSTED
```json
{ "branches": "All", "ds_variation": 2, "error_protection": false, "rates": 3, "syn_rates": 3 }
```

### RELAX
```json
{ "mode": "Classic mode", "test": "TEST", "reference": "REFERENCE", "models": "All", "rates": 3 }
```

### FUBAR
```json
{ "number_of_grid_points": 20, "concentration_of_dirichlet_prior": 0.5 }
```

### Contrast-FEL
Requires at least 2 branch groups labeled in the tree.
```json
{ "branch_sets": ["Group1", "Group2"], "p_value": 0.05, "q_value": 0.20 }
```

### BGM
```json
{ "length_of_each_chain": 1000000, "number_of_burn_in_samples": 100000, "number_of_samples": 100, "maximum_parents_per_node": 1, "minimum_subs_per_site": 1 }
```

## Interpreting Results

| Method type | Threshold | Interpretation |
|-------------|-----------|----------------|
| P-value methods (FEL, MEME, SLAC, RELAX, Contrast-FEL) | p < 0.1 | Significant evidence of selection |
| Bayesian methods (FUBAR, BGM) | Posterior > 0.9 | Strong evidence |
| Gene-level (BUSTED) | p < 0.05 | Gene-wide episodic diversifying selection |
| Branch-level (aBSREL) | Holm-Bonferroni corrected p < 0.05 | Episodic selection on that branch |
| Relaxation (RELAX) | p < 0.05, K > 1 intensified, K < 1 relaxed | Change in selection intensity |

## Troubleshooting

| Issue | Resolution |
|-------|------------|
| "No tree provided" warning | Server will infer a neighbor-joining tree, but results improve with a user-provided tree |
| "Alignment must contain at least 2 sequences" | Check FASTA format — each sequence needs a `>` header line |
| "Could not parse any sequences" | Only FASTA format is supported for direct upload |
| Job stays "running" a long time | Large alignments can take minutes to hours; use `get_job_status` to monitor progress |
| "Server not initialized" error | MCP session expired; client will re-establish automatically on the next request |
