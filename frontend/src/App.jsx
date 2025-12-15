import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAuthUser,
  selectAuthStatusCheck,
} from "./fetures/authentication/authSelector";
import { checkAuth } from "./fetures/authentication/authSlice";
import { Loader } from "lucide-react";

function App() {
  const user = useSelector(selectAuthUser);
  const loading = useSelector(selectAuthStatusCheck);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bgPrimary font-robot">
        <div className="flex flex-col items-center gap-4">
          <Loader
            className="h-12 w-12 animate-spin text-primary"
            strokeWidth={2.5}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgPrimary font-robot">
      <Toaster />

      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />

        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
