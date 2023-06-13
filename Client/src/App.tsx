import './App.css';
import {RouterProvider} from "react-router-dom";
import router from "./Router";
import {CssBaseline} from "@mui/material";
import { useEffect } from 'react';
import { useCheckAuthMutation } from './store/User/userApi';
import { useAppSelector } from './hook';


function App() {

    const [checkAuth, {data, error}] = useCheckAuthMutation();

    const isAuth: boolean = useAppSelector(state => state.userReduces.isAuth)

    useEffect(() => {
        checkAuth();
    }, [])


    return (
        <div className="App">
            <CssBaseline/>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
