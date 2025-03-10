import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";

export default function UserProtectedRoute({ children, user, redirect }) {
  if (!user) {
    return <Navigate to={redirect} />;
  }

  return <Suspense fallback={"loading..."}>{children}</Suspense>;
}
