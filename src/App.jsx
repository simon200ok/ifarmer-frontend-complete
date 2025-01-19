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
import Dashboard from "./pages/Admin-Dashboard/Dashboard";
import Settings from "./pages/Admin-Dashboard/Settings";
import LivestockPage from "./pages/LivestockPage";
import EditLivestock from "./pages/EditLivestock";
import AnalyticsDashboard from "./pages/Admin-Dashboard/AnalyticsDashboard";
import PostPage from "./pages/PostPage";
import InventoryPage from "./pages/InventoryPage";
import CreatePost from "./pages/CreatePost";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminForgetPassword from "./pages/AdminForgetPassword";
import AdminResetPassword from "./pages/AdminResetPassword"

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
        {
          path: "posts/:postId",  // Route for viewing individual post details
          element: <PostPage />,
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
        {
          path: "/homepage/livestock",
          element: <LivestockPage />,
        },
        {
          path: "/homepage/inventory",
          element: <InventoryPage />,
        },
        {
          path: "/homepage/update-livestock/:id",
          element: <EditLivestock />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "notifications",
          element: <Notification />,
        },
        {
          path: "create-post",
          element: <CreatePost/>,
        },
      ],
    },
    {
      path: "/forgot-password",
      element: <ForgetPassword />,
    },
    {
      path: "/admin/login",
      element: <AdminLogin />,
    },
    {
      path: "/admin/signup",
      element: <AdminSignup />,
    },
    {
      path: "/admin/forgot-password",
      element: <AdminForgetPassword />,
    },
    {
      path: "/admin/reset-password",
      element: <AdminResetPassword />,
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
        {
          path: "/admin/analytics",
          element: <AnalyticsDashboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
