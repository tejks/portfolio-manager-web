import Navbar from "@/components/Layout/Navbar";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Signin from "./Auth/Signin";
import ErrorPage from "./ErrorPage";
import Home from "./Home";

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
        path: "signin",
        element: <Signin />,
      },
    ],
  },
]);

export default router;
