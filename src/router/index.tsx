import { Route, Routes } from "react-router-dom";
import Home from "@/views/Home";
import Login from "@/views/Login";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};
export default Router;
