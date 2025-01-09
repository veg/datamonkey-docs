import { defineConfig } from "vitepress";

export default defineConfig({
  ignoreDeadLinks: true,
  title: "Datamonkey",
  description: "Documentation",
  head: [
    [
      "script",
      {},
      `
        MathJax = {
          tex: {
            inlineMath: [['$', '$'], ['\$begin:math:text$', '\\$end:math:text$']],
            displayMath: [['$$', '$$'], ['\$begin:math:display$', '\\$end:math:display$']]
          }
        };
      `,
    ],
    [
      "script",
      {
        type: "text/javascript",
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.min.js",
      },
    ],
  ],
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import 'katex/dist/katex.min.css';`,
      },
    },
  },
  themeConfig: {
    logo: "//www.datamonkey.org/assets/img/header-logo.svg",
    siteTitle: "",
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Analyzing Data", link: "/guide/analyzing_data" },
          { text: "Data Files", link: "/guide/data_files" },
          { text: "Local Installation", link: "/guide/installation" },
          { text: "About", link: "/guide/about" },
        ],
      },
      {
        text: "Methods",
        items: [
          { text: "General", link: "/methods/general" },
          { text: "aBSREL", link: "/methods/absrel" },
          { text: "BGM", link: "/methods/bgm" },
          { text: "BUSTED", link: "/methods/busted" },
          { text: "Contrast-FEL", link: "/methods/contrast_fel" },
          { text: "FEL", link: "/methods/fel" },
          { text: "FUBAR", link: "/methods/fubar" },
          { text: "GARD", link: "/methods/gard" },
          { text: "MEME", link: "/methods/meme" },
          { text: "MSS", link: "/methods/mss" },
          { text: "MULTI-HIT", link: "/methods/multi_hit" },
          { text: "RELAX", link: "/methods/relax" },
          { text: "SLAC", link: "/methods/slac" },
        ],
      },
      { text: "Resources", link: "/resources" },
    ],
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/analyzing_data" },
      { text: "Methods", link: "/methods/index" },
      { text: "Resources", link: "/resources" },
    ],
  },
});
