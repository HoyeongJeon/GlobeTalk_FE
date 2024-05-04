import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectRouteProps {
  element: React.ReactElement;
  isLoggedIn: boolean;
}

export const ProtectRoute: React.FC<ProtectRouteProps> = ({
  element,
  isLoggedIn,
}: ProtectRouteProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return element;
};
