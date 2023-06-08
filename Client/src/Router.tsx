import {Navigate, createBrowserRouter, redirect} from "react-router-dom";
import Catalog from "./pages/Catalog";
import Course from "./pages/Course";
import Learn from "./pages/Learn";
import Teach from "./pages/Teach";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/catalog" replace/>
    },
    {
        path: "/catalog",
        element: <Catalog/>,
    },
    {
        path: "/course",
        element: <Course/>,
    },
    {
        path: "/learn",
        element: <Learn/>,
    },
    {
        path: "/teach",
        element: <Teach/>,
    },
    {
        path: '/signin',
        element: <SignIn />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '*',
        element: <Navigate to={'./catalog'} replace/>
    }
]);

export default router;