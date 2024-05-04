import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectRoute } from "./ProtectRoute";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        {/* <Route path="/signup" element={<ProtectRoute element={<Signup />} />} /> */}
        {/* <Route path="/signup" element={<ProtectRoute element={<Login />} />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
