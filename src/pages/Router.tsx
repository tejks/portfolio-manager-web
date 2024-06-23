import Navbar from "@/components/layout/Navbar";
import { Outlet, createBrowserRouter } from "react-router-dom";

import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import Portfolio from "./Portfolio";
import Token from "./Token";
import Transactions from "./Transactions";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
      {
        path: "portfolio/tokens/:id",
        element: <Token />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
