import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, accessToken, isAuthenticate } = useAppSelector(
    (state) => state.auth
  );
  return (
    <>
      {isAuthenticate && user && accessToken ? children : <Navigate to={"/sign-in"} />}
    </>
  );
}

export default ProtectedRoute;
