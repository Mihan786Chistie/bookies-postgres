import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import App from '../App.jsx'
import SellBook from "../components/SellBook.jsx";
import Home from "../components/Home.jsx";

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
            path: "/shop",
            element: <SellBook />
        }
      ]
    },
  ]);

  export default router;