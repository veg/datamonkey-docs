import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Datamonkey",
  description: "Documentation",
  themeConfig: {
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Analyzing Data", link: "/guide/analyzing_data" },
          { text: "Data Files", link: "/guide/data_files" },
        ],
      },
      {
        text: "Methods",
        items: [
          { text: "General", link: "/methods/general" },
          { text: "aBSREL", link: "/methods/absrel" },
          { text: "BGM", link: "/methods/bgm" },
          { text: "BUSTED", link: "/methods/busted" },
          { text: "FEL", link: "/methods/fel" },
          { text: "FUBAR", link: "/methods/fubar" },
          { text: "GARD", link: "/methods/gard" },
          { text: "MEME", link: "/methods/meme" },
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
