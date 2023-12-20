import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import App from '../App.jsx'
import SellBook from "../components/SellBook.jsx";
import Home from "../components/Home.jsx";
import Auth from "../components/Auth.jsx";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
            path: "/sell",
            element: <SellBook />
        },
        {
          path: "/login",
          element: <Auth />
        }
      ]
    },
  ]);

  export default router;