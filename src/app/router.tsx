import { createBrowserRouter } from "react-router";
import App from "./App";
import Login from "../pages/LoginPage/Login";
import SignUp from "../pages/SignUp/SignUp";

const router = createBrowserRouter([
  { path: "/", element: <App />, children: [] },
  { path: "/signup", element: <SignUp />, children: [] },
  { path: "/login", element: <Login />, children: [] },
]);

export default router;
