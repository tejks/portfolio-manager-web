import Navbar from "@/components/layout/Navbar";
import { Outlet, createBrowserRouter } from "react-router-dom";

import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
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
