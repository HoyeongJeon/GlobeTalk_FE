import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectRoute } from "./ProtectRoute";
import { PublicRoute } from "./PublicRoute";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Main from "@/pages/Main";
import { useStore } from "@/stores/store";
import Profile from "@/pages/Profile";
import ProfileEdit from "@/pages/ProfileEdit";
import Chat from "@/pages/Chat";
import Admin from "@/pages/Admin";
import ChatRoom from "@/components/ChatRoom";
import Users from "@/pages/Users";

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

        <Route
          path="/"
          element={<PublicRoute isLoggedIn={isLoggedIn} element={<Main />} />}
        />
        <Route
          path="/me"
          element={
            <PublicRoute isLoggedIn={isLoggedIn} element={<Profile />} />
          }
        />
        <Route
          path="/me/edit"
          element={
            <PublicRoute isLoggedIn={isLoggedIn} element={<ProfileEdit />} />
          }
        />

        <Route
          path="/chats"
          element={<PublicRoute isLoggedIn={isLoggedIn} element={<Chat />} />}
        />

        <Route
          path="/chats/:id"
          element={
            <PublicRoute isLoggedIn={isLoggedIn} element={<ChatRoom />} />
          }
        />

        <Route
          path="/admin"
          element={<PublicRoute isLoggedIn={isLoggedIn} element={<Admin />} />}
        />

        <Route
          path="/admin/users"
          element={<PublicRoute isLoggedIn={isLoggedIn} element={<Users />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
