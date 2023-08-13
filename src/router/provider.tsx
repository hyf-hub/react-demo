import { RouterProvider } from "react-router-dom";
import router from "./browserRouter";
export const RouteProvider = () => {
  return <RouterProvider router={router} />;
};
