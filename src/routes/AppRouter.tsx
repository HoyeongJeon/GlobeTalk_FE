import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectRoute } from "./ProtectRoute";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Main from "@/pages/Main";
import { useStore } from "@/stores/store";

const AppRouter = () => {
  const { isLoggedIn } = useStore();
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="signup" element={<Signup />} /> */}
        {/* <Route path="/" element={<Main />} /> */}
        <Route
          path="/login"
          element={
            <ProtectRoute isLoggedIn={isLoggedIn} element={<Signup />} />
          }
        />
        <Route
          path="/signup"
          element={<ProtectRoute isLoggedIn={isLoggedIn} element={<Login />} />}
        />

        <Route
          path="/"
          element={<ProtectRoute isLoggedIn={isLoggedIn} element={<Main />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
