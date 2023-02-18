import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { Plugin, ResolvedConfig } from "vite";
import fs from "fs/promises";
import path from "path";


// <https://github.com/neutralinojs/neutralinojs/issues/909>.
const neutralino = (): Plugin => {
  let config: ResolvedConfig;

  return {
    name: "neutralino",

    configResolved (resolvedConfig) {
      config = resolvedConfig;
    },

    async transformIndexHtml (html) {
      if (config.mode === "development") {
        const auth_info_file = await fs.readFile(path.join(__dirname, ".tmp", "auth_info.json"), {
          encoding: "utf-8"
        });

        const auth_info = JSON.parse(auth_info_file);
        const port = auth_info.port;

        return html.replace(
          "<script src=\"js/neutralino.js\"></script>",
          `<script src="http://localhost:${port}/js/neutralino.js"></script>`
        );
      }

      return html;
    }
  };
};


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),neutralino()],
  build:{
    outDir:"resources"
  }
})


