import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthGuard({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const expireAt = localStorage.getItem("expire_at");

    if (!expireAt) {
      navigate("/login");
      return;
    }

    if (Date.now() > Number(expireAt)) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("expire_at");
      navigate("/login");
      return;
    }

    const timeLeft = Number(expireAt) - Date.now();
    const timer = setTimeout(() => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("expire_at");
      navigate("/login");
    }, timeLeft);

    return () => clearTimeout(timer);
  }, []);

  return children;
}
