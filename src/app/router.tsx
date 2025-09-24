import { createBrowserRouter } from "react-router";
import Login from "../pages/LoginPage/Login";
import SignUp from "../pages/SignUp/SignUp";
import HomePage from "../pages/HomePage/HomePage";
import Profile from "../pages/Profile/Profile";
import Upload from "../pages/Upload/Upload";
import Notifications from "../pages/Notifications/Notifications";
import Management from "../pages/Management";
import ProtectedRoute from "./ProtectedRoute";
import Detail from "../pages/Detail/Detail";
import Section from "../pages/Section/Section";
import AddArea from "../pages/AddArea";
import Statistics from "../pages/Statistics";
import AreaDetail from "../pages/AreaDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
    children: [],
  },
  { path: "/signup", element: <SignUp />, children: [] },
  { path: "/login", element: <Login />, children: [] },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
    children: [],
  },
  {
    path: "/upload",
    element: (
      <ProtectedRoute>
        <Upload />
      </ProtectedRoute>
    ),
    children: [],
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute>
        <Notifications />
      </ProtectedRoute>
    ),
    children: [],
  },
  {
    path: "/management",
    element: <Management />,
    children: [],
  },
  {
    path: "/noti/:postId",
    element: (
      <ProtectedRoute>
        <Detail />
      </ProtectedRoute>
    ),
    children: [],
  },
  {
    path: "/section/:sectionId",
    element: (
      <ProtectedRoute>
        <Section />
      </ProtectedRoute>
    ),
    path: "/addarea",
    element: <AddArea />,
    children: [],
  },
  {
    path: "/stat",
    element: <Statistics />,
    children: [],
  },
  {
    path: "/areadetail",
    element: <AreaDetail />,
    children: [],
  },
]);

export default router;
