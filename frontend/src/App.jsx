import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./layout/layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import NotFound from "./pages/NotFound";
import useAuthStore from "./store/useAuthStore";
import { useEffect, useLayoutEffect } from "react";
import { Loader } from "lucide-react";
import UserProtectedRoute from "./protected/userProtectedRoute";
import useThemeStore from "./store/useThemesStore";

function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  const { initializeTheme } = useThemeStore();

  useEffect(() => {
    initializeTheme();
    checkAuth();
  }, [checkAuth, initializeTheme]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            index
            element={
              <UserProtectedRoute user={authUser} redirect="/login">
                <Home />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <UserProtectedRoute user={!authUser} redirect="/">
                <SignUp />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <UserProtectedRoute user={!authUser} redirect="/">
                <LogIn />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <UserProtectedRoute user={authUser} redirect="/login">
                <Profile />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <UserProtectedRoute user={authUser} redirect="/login">
                <Setting />
              </UserProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
