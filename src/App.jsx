import { createBrowserRouter, RouterProvider } from "react-router";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import ForgetPassword from "./pages/ForgetPassword";
import Notification from "./pages/Notification";

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
      element: <Homepage />,
    },
    {
      path: "/forgot-password",
      element: <ForgetPassword />,
    },
    {
      path: "/notifications",
      element: <Notification />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
