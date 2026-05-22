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

> Running Claude Code on a remote / SSH box? The browser-based OAuth flow redirects to `http://localhost:<port>` on the machine running Claude Code, which your laptop's browser can't reach. Use the [Headless / Remote setup](#headless-remote-setup) flow to mint a token manually.

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

### Gemini CLI

```bash
gemini mcp add --transport http datamonkey https://mcp.datamonkey.org/mcp
```

Or add to `~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "datamonkey": {
      "httpUrl": "https://mcp.datamonkey.org/mcp"
    }
  }
}
```

> Do not use underscores in the server name (use `datamonkey`, not `data_monkey`) — Gemini's policy parser will misinterpret it.

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

## Headless / Remote setup

The browser-based OAuth flow used by Claude Code (and most other MCP clients) binds a callback listener to `http://localhost:<port>` on the machine running the client. If that machine is a remote / SSH host without a local browser, the authorization redirect lands on the wrong host and fails (`Safari Can't Connect to the Server`, `ERR_CONNECTION_REFUSED`, etc).

The MCP server supports the standard out-of-band redirect URI (`urn:ietf:wg:oauth:2.0:oob`) for this case: instead of redirecting, `/authorize` renders the authorization code as HTML for you to copy. The recipe below uses that to mint a bearer token from a machine with a browser, then configures Claude Code on the remote host to send it via an `Authorization` header.

### Mint a token

Run on a machine with a browser (your laptop is fine):

```bash
ISSUER=https://mcp.datamonkey.org

REG=$(curl -s -X POST $ISSUER/register -H 'Content-Type: application/json' \
  -d '{"redirect_uris":["urn:ietf:wg:oauth:2.0:oob"],"client_name":"manual"}')
CLIENT_ID=$(echo "$REG" | python3 -c 'import json,sys;print(json.load(sys.stdin)["client_id"])')
CLIENT_SECRET=$(echo "$REG" | python3 -c 'import json,sys;print(json.load(sys.stdin)["client_secret"])')

VERIFIER=$(openssl rand -base64 64 | tr -d '\n+/=' | head -c 64)
CHALLENGE=$(printf %s "$VERIFIER" | openssl dgst -sha256 -binary | openssl base64 | tr -d '=\n' | tr '/+' '_-')

echo "Open in browser:"
echo "$ISSUER/authorize?response_type=code&client_id=$CLIENT_ID&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&code_challenge=$CHALLENGE&code_challenge_method=S256"
printf "Paste the code shown on the page: "
read CODE

TOK=$(curl -s -X POST $ISSUER/token \
  -d "grant_type=authorization_code&code=$CODE&client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&code_verifier=$VERIFIER&redirect_uri=urn:ietf:wg:oauth:2.0:oob")
TOKEN=$(echo "$TOK" | python3 -c 'import json,sys;print(json.load(sys.stdin)["access_token"])')

echo
echo "Run on the headless box:"
echo "  claude mcp add datamonkey --transport http $ISSUER/mcp --header \"Authorization: Bearer $TOKEN\""
```

What it does:

1. Registers a one-off OAuth client (`/register`)
2. Generates a PKCE verifier / challenge pair
3. Prints an authorization URL — open it in your local browser; the page renders a one-time code
4. Exchanges the pasted code for a bearer token (`/token`)
5. Prints the exact `claude mcp add` command to run on the remote host

### Notes

- The authorization code is **single-use and expires in 10 minutes**. If the token exchange returns `invalid_grant`, re-run the script.
- The bearer token's stated lifetime is 1 hour (`expires_in: 3600`). The token response also includes a `refresh_token` that you can exchange at `/token` with `grant_type=refresh_token` for a longer-lived setup, or just re-run the script.
- The recipe is POSIX-compatible (`bash`, `zsh`, `sh`). Avoid `read -p "..." VAR` — that is bash-only and silently no-ops on zsh.

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

## Troubleshooting

| Issue | Resolution |
|-------|------------|
| "No tree provided" warning | Server will infer a neighbor-joining tree, but results improve with a user-provided tree |
| "Alignment must contain at least 2 sequences" | Check FASTA format — each sequence needs a `>` header line |
| "Could not parse any sequences" | Only FASTA format is supported for direct upload |
| Job stays "running" a long time | Large alignments can take minutes to hours; use `get_job_status` to monitor progress |
| "Server not initialized" error | MCP session expired; client will re-establish automatically on the next request |
| Browser redirects to `localhost:<port>` and fails to connect | You're running Claude Code on a remote / SSH host. See [Headless / Remote setup](#headless-remote-setup) for the manual token flow. |
