import { Navigate } from "react-router-dom";
import { message } from "antd";
import Admin from "../admin/Admin";
import { useEffect } from "react";

const Private = () => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      message.error("Iltimos Qayta Tizimga Kiring");
    }
  }, [token]);

  if (token) {
    return <Admin />;
  }
  return <Navigate to="/" />;
};

export default Private;
