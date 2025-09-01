import { createBrowserRouter } from "react-router";
import Login from "../pages/LoginPage/Login";
import SignUp from "../pages/SignUp/SignUp";
import HomePage from "../pages/HomePage/HomePage";
import Profile from "../pages/Profile/Profile";
import Upload from "../pages/Upload/Upload";

const router = createBrowserRouter([
  { path: "/", element: <HomePage />, children: [] },
  { path: "/signup", element: <SignUp />, children: [] },
  { path: "/login", element: <Login />, children: [] },
  { path: "/profile", element: <Profile />, children: [] },
  { path: "/upload", element: <Upload />, children: [] },
]);

export default router;
