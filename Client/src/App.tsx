import './App.css';
import {RouterProvider} from "react-router-dom";
import router from "./Router";
import {Box, CssBaseline} from "@mui/material";
import { useEffect } from 'react';
import { useCheckAuthMutation } from './store/User/userApi';
import { useAppSelector } from './hook';


function App() {

    const [checkAuth, {data, error}] = useCheckAuthMutation();

    const isAuth: boolean = useAppSelector(state => state.userReduces.isAuth)

    useEffect(() => {
        checkAuth();
    }, [])

    if (error && 'status' in error) {

        console.log(error.status)
        setTimeout(() => {
            if (error.data === 'Произошла ошибка: 400 Rate limit exceeded')
            checkAuth();
        }, 201)

        return <Box>{JSON.stringify(error.data)}</Box> 
    }

    return (
        <div className="App">
            <CssBaseline/>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
