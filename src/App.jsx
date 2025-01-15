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
import Dashboard from "./pages/Admin-Dashboard/Dashboard";
import Settings from "./pages/Admin-Dashboard/Settings";

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
      path: "/homepage",
      element: <UserDashboardLayout />,
      children: [
        {
          path: "/homepage/crops",
          element: <CropPage />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "notifications",
          element: <Notification />,
        },
      ],
    },
    {
      path: "/forgot-password",
      element: <ForgetPassword />,
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/users",
          element: <UserPage />,
        },
        {
          path: "/admin",
          element: <Dashboard />,
        },
        {
          path: "/admin/settings",
          element: <Settings />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
