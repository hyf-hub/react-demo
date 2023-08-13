import App from "@/App.tsx";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  // match everything with "*"
  { path: "*", element: <App /> },
]);
export default router;
