import { defineConfig } from "vite";
import { resolve } from "path";

export default {
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        recipe: "recipe.html",
        about: "about.html",
      },
    },
  },
};
