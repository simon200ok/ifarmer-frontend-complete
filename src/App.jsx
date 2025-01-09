import { createBrowserRouter, RouterProvider } from "react-router";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotificationPage from "./pages/Notification";

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
      path: "/notifications",
      element: <NotificationPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
