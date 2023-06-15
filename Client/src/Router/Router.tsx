import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Catalog from "../pages/Catalog";
import Course from "../pages/Course/Course";
import Learn from "../pages/Learn";
import Teach from "../pages/Teach/Teach";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import CoursesList from "../pages/Teach/CoursesList";
import NewCourse from "../pages/Teach/NewCourse";
import Syllabus from "../pages/Course/Syllabus";
import ProtectedRoute from "./ProtectedRoute";
import { useAppSelector } from "../hook";
import EditSyllabus from "../pages/Course/EditSyllabus";

export default function Router() {

    const user = useAppSelector(state => state.userReduces)

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Navigate to="/catalog" replace />
        },
        {
            path: "/catalog",
            element: <Catalog />,
        },
        {
            path: "/course/:id",
            element: <Course />,
            children: [
                {
                    path: 'promo',
                    element: <Syllabus />
                },
                {
                    path: 'syllabus',
                    element: <ProtectedRoute user={user}> <Syllabus /> </ProtectedRoute>
                },
                {
                    path: 'info',
                    element: <Syllabus />
                },
                {
                    path: 'checklist',
                    element: <ProtectedRoute user={user}> <Syllabus /> </ProtectedRoute>
                },
                {
                    path: 'edit-info',
                    element: <ProtectedRoute user={user}> <Syllabus /> </ProtectedRoute>
                },
                {
                    path: 'edit-syllabus',
                    element: <ProtectedRoute user={user}> <EditSyllabus /> </ProtectedRoute>
                }
            ]
        },
        {
            path: "/learn",
            element: <Learn />,
        },
        {
            path: "/teach",
            element: <ProtectedRoute user={user}>
                <Teach />
            </ProtectedRoute>,
            children: [
                {
                    path: 'courses',
                    element: <CoursesList />,
                },
                {
                    path: 'courses/new',
                    element: <ProtectedRoute user={user}> <NewCourse /> </ProtectedRoute>
                },
                {
                    path: 'lessons',
                    element: <CoursesList />
                },
                {
                    path: 'lessons/new',
                    element: <ProtectedRoute user={user}> <CoursesList /> </ProtectedRoute>
                },
                {
                    path: 'mailing',
                    element: <ProtectedRoute user={user}> <CoursesList /> </ProtectedRoute>
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
            element: <Navigate to={'./catalog'} replace />
        }
    ]);

    return (
        <RouterProvider router={router} />
    )
}



