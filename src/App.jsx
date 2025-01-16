import { createBrowserRouter, RouterProvider } from "react-router";

import "./App.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import Notification from "./pages/Notification";
import LandingPage from "./pages/LandingPage";
import AdminLayout from "./pages/Admin-Dashboard/AdminLayout";
import UserPage from "./pages/Admin-Dashboard/UserPage";
import UserDashboardLayout from "./pages/UserDashboardLayout";
import CropPage from "./pages/CropPage";
import HomePageLayout from "./pages/HomePageLayout";
import Post from "./pages/Post";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/dashboard",
      element: <HomePageLayout />,
      children: [
        {
          path: "/dashboard/community",
          element: <Post />,
        },
      ],
    },
    {
      path: "/homepage",
      element: <UserDashboardLayout />,
      children: [
        {
          path: "/homepage/crops",
          element: <CropPage />,
        },
      ],
    },
    {
      path: "/forgot-password",
      element: <ForgetPassword />,
    },
    {
      path: "/notifications",
      element: <Notification />,
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/users",
          element: <UserPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
