import Unocss from "unocss/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
export const vitePlugins = [
  react(),
  Unocss(),
  // 这个是为了更方便的使用svg
  // 虽然Icons和createSvgIconsPlugin 插件都支持加载自定义svg 但是createSvgIconsPlugin适合动态加载自定义svg Icons 适合静态加载
  // 传统的使用方式是将svg代码粘贴到要显示的位置 为了在vue模板中不显示这些代码 所以使用了该插件
  // 使用方式为 <svg-icon name="top_menu"></svg-icon> 其中的name 为 assets/icons/ 下svg的名字
  createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [resolve(process.cwd(), "src/assets/icons/")],
    // 指定symbolId格式
    symbolId: "svg-[dir]-[name]",
  }),
  visualizer(),
];
