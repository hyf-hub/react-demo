import { RouteProvider } from "@/router/provider";
import React from "react";
import ReactDOM from "react-dom/client";
// 注册 svg雪碧图
import "virtual:svg-icons-register";
import "uno.css";
import "@/assets/styles/config.scss";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouteProvider />
  </React.StrictMode>,
);
