import { RouteProvider } from "@/router/provider";
import React from "react";
import ReactDOM from "react-dom/client";
import "uno.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouteProvider />
  </React.StrictMode>,
);
