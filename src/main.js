import { createContext, useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import ProductList from "./Pages/ProductList";
import Error from "./Pages/404";

import { StoreValue, GetValue, RemoveValue, RequiredAuth } from "./utils";
import { useSelector } from "react-redux";

export const AuthContext = createContext();

const Main = () => {
  const currentUser = useSelector((state) => state.allReducers.currentUser);

  const navigate = useNavigate();
  const [user, setUser] = useState(currentUser);

  const SetToast = (msg) => {
    toast(msg);
  };

  const login = async (data) => {
    setUser({ status: true, value: data });
    console.log("store", { status: true, value: data });
    StoreValue("user", data);
  };

  const logout = () => {
    setUser({ status: false, value: "no data found" });
    RemoveValue("user");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    console.log("currentUser", currentUser);
  }, []);

  const value = useMemo(
    () => ({
      SetToast,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      <Routes>
        <Route
          exact
          path="/login"
          element={
            <RequiredAuth user={currentUser} path={"auth"}>
              <Login />
            </RequiredAuth>
          }
        />
        <Route
          exact
          path="/register"
          element={
            <RequiredAuth user={currentUser} path={"auth"}>
              <Register />
            </RequiredAuth>
          }
        />
        <Route
          exact
          path="/"
          element={
            <RequiredAuth user={currentUser} path={"app"}>
              <Dashboard />
            </RequiredAuth>
          }
        />
        <Route
          exact
          path="/productList"
          element={
            <RequiredAuth user={currentUser} path={"app"}>
              <ProductList />
            </RequiredAuth>
          }
        />
        <Route
          path="*"
          element={
            <RequiredAuth user={currentUser} path={"app"}>
              <Error />
            </RequiredAuth>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
};

export default Main;
