import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectRouteProps {
  element: React.ReactElement;
  isAuth?: boolean;
  isProtected?: boolean;
  isPrivate?: boolean;
}

export const ProtectRoute: React.FC<ProtectRouteProps> = ({
  element,
  isAuth,
  isProtected,
  isPrivate,
}: ProtectRouteProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isProtected && !isAuth) {
      navigate("/login");
    } else if (isPrivate && isAuth && isProtected) {
      navigate("/");
    }
  }, [isAuth, isProtected, isPrivate, navigate]);

  return element;
};
