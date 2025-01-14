import { createBrowserRouter, RouterProvider } from "react-router";

import "./App.css";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import Notification from "./pages/Notification";
import LandingPage from "./pages/LandingPage";

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
