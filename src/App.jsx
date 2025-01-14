import { createBrowserRouter, RouterProvider } from "react-router";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import Notification from "./pages/Notification";
import AdminLayout from "./pages/Admin-Dashboard/AdminLayout";
import UserPage from "./pages/Admin-Dashboard/UserPage";
import UserDashboardLayout from "./pages/UserDashboardLayout";
import CropPage from "./pages/CropPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
