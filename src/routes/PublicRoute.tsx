import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PublicRouteProps {
  element: React.ReactElement;
  isLoggedIn: boolean;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  element,
  isLoggedIn,
}: PublicRouteProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return element;
};
