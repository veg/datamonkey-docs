# Datamonkey Docs

## Description

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

To get started, clone this repository and navigate to the project directory:

```bash
git clone <repository-url>
cd datamonkey-docs
```

Install the necessary dependencies:

```bash
npm install
```

## Development

### Running the Development Server

To start a local development server, use the following command:

```bash
npm run docs:dev
```

Your documentation site will be available at `http://localhost:3000`. Any changes you make to the documentation files will automatically reload in the browser.

### Building for Production

To build the documentation for production, run:

```bash
npm run docs:build
```

The output will be generated in the `.vitepress/dist` directory.

### Previewing the Build

To preview the production build locally, you can use:

```bash
npm run docs:preview
```

This will start a local server to display the built documentation.

## Scripts

- `npm run docs:dev`: Starts the VitePress development server.
- `npm run docs:build`: Builds the documentation for production.
- `npm run docs:preview`: Previews the built documentation.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or report issues.

## Acknowledgments

- [VitePress](https://vitepress.vuejs.org/) for providing the foundation for documentation.
- [KaTeX](https://katex.org/) for beautiful math typesetting.
