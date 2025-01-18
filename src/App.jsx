//Simon Research starts
// import { createBrowserRouter, RouterProvider } from "react-router";
// import "./App.css";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ForgetPassword from "./pages/ForgetPasswordMum";
// import Notification from "./pages/Notification";
// import LandingPage from "./pages/LandingPage";
// import AdminLayout from "./pages/Admin-Dashboard/AdminLayout";
// import UserPage from "./pages/Admin-Dashboard/UserPage";
// import UserDashboardLayout from "./pages/UserDashboardLayout";
// import CropPage from "./pages/CropPage";
// import ForgotPassword from "./pages/ForgotPassword";
// import ProfileModal from "./pages/UpdateProfile";

// function App() {
//   const router = createBrowserRouter([
//     { path: "/", element: <LandingPage /> },
//     { path: "/login", element: <Login /> },
//     { path: "/signup", element: <Signup /> },
//     {
//       path: "/homepage",
//       element: <UserDashboardLayout />,
//       children: [
//         { path: "/homepage/crops", element: <CropPage /> },
//       ],
//     },
//     { path: "/forgot-password", element: <ForgetPassword /> },
//     { path: "/notifications", element: <Notification /> },
//     {
//       path: "/admin",
//       element: <AdminLayout />,
//       children: [
//         { path: "/admin/users", element: <UserPage /> },
//       ],
//     },
//     { path: "/forgotpassword", element: <ForgotPassword /> },
//     { path: "/updateprofile", element: <ProfileModal /> },
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default App;
//From Simon Research ends


import { createBrowserRouter, RouterProvider } from "react-router";

import "./App.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import ForgetPasswordMum from "./pages/ForgetPasswordMum";
import Notification from "./pages/Notification";
import LandingPage from "./pages/LandingPage";
import AdminLayout from "./pages/Admin-Dashboard/AdminLayout";
import UserPage from "./pages/Admin-Dashboard/UserPage";
import UserDashboardLayout from "./pages/UserDashboardLayout";
import CropPage from "./pages/CropPage";
import Dashboard from "./pages/Admin-Dashboard/Dashboard";
import Settings from "./pages/Admin-Dashboard/Settings";
// import ForgotPassword from "./pages/ForgotPassword";
// import ProfileModal from "./pages/UpdateProfile";

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
    // {
    //   path: "/forgotpassword",
    //   element: <ForgetPasswordMum />,
    // },
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
    // {
    //   path: "/forgot-password",
    //   element: <ForgotPassword />,
    // },
    // {
    //   path: "/updateprofile",
    //   element: <ProfileModal />,
    // },
    // {
    //   path: "/forgot-password",
    //   element: <ForgotPassword />,
    // },
    // {
    //   path: "/updateprofile",
    //   element: <ProfileModal />,
    // },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
