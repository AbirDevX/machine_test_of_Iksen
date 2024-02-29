import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

function GustRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticate, accessToken } = useAppSelector(
    (state) => state.auth
  );
  return (
    <>
      {user && isAuthenticate && accessToken ? (
        <Navigate to={"/home"} replace={true} />
      ) : (
        children
      )}
    </>
  );
}

export default GustRoute;
