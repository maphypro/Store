import {Navigate, createBrowserRouter} from "react-router-dom";
import Catalog from "./pages/Catalog";
import Course from "./pages/Course/Course";
import Learn from "./pages/Learn";
import Teach from "./pages/Teach/Teach";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CourseCreate from "./pages/Teach/CoursesList";
import NewCourse from "./pages/Teach/NewCourse";
import Syllabus from "./pages/Course/Syllabus";

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
        path: "/course/:id",
        element: <Course/>,
        children: [
            {
                path: 'syllabus',
                element: <Syllabus />
            },
            {
                path: 'info',
                element: <Syllabus />
            },
            {
                path: 'checklist',
                element: <Syllabus />
            },
            {
                path: 'edit-info',
                element: <Syllabus />
            },
            {
                path: 'edit-syllabus',
                element: <Syllabus />
            }
        ]
    },
    {
        path: "/learn",
        element: <Learn/>,
    },
    {
        path: "/teach",
        element: <Teach/>,
        children: [
            {
                path: 'courses',
                element: <CourseCreate />,
            },
            {
                path: 'courses/new',
                element: <NewCourse />
            },
            {
                path: 'lessons',
                element: <CourseCreate />
            },
            {
                path: 'lessons/new',
                element: <CourseCreate/>
            },
            {
                path: 'mailing',
                element: <CourseCreate />
            },
        ]
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