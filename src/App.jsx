import { createBrowserRouter, RouterProvider } from "react-router";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ProfileModal from "./pages/UpdateProfile";

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
      path: "/forgotpassword",
      element: <ForgotPassword />,
    },
    {
      path: "/updateprofile",
      element: <ProfileModal />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
