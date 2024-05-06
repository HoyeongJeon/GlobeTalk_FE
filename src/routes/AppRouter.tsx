import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectRoute } from "./ProtectRoute";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Main from "@/pages/Main";
import { useStore } from "@/stores/store";
import Profile from "@/pages/Profile";
import ProfileEdit from "@/pages/ProfileEdit";

const AppRouter = () => {
  const { isLoggedIn } = useStore();
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="signup" element={<Signup />} /> */}
        {/* <Route path="/" element={<Main />} /> */}
        <Route
          path="/login"
          element={<ProtectRoute isLoggedIn={isLoggedIn} element={<Login />} />}
        />
        <Route
          path="/signup"
          element={
            <ProtectRoute isLoggedIn={isLoggedIn} element={<Signup />} />
          }
        />
        <Route path="/" element={<Main />} />
        <Route path="/me" element={<Profile />} />
        <Route path="/me/edit" element={<ProfileEdit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
