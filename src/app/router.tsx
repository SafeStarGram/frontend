import { createBrowserRouter } from "react-router";
import Login from "../pages/LoginPage/Login";
import SignUp from "../pages/SignUp/SignUp";
import HomePage from "../pages/HomePage/HomePage";
import Profile from "../pages/Profile/Profile";

const router = createBrowserRouter([
  { path: "/home", element: <HomePage />, children: [] },
  { path: "/signup", element: <SignUp />, children: [] },
  { path: "/login", element: <Login />, children: [] },
  { path: "/profile", element: <Profile />, children: [] },
]);

export default router;
