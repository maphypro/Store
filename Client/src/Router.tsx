import {createBrowserRouter} from "react-router-dom";
import Catalog from "./pages/Catalog";
import Course from "./pages/Course";
import Learn from "./pages/Learn";
import Teach from "./pages/Teach";

const router = createBrowserRouter([
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
]);

export default router;