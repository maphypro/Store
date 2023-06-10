import './App.css';
import {RouterProvider} from "react-router-dom";
import router from "./Router";
import {CssBaseline} from "@mui/material";
import { useEffect } from 'react';


function App() {


    useEffect(() => {
        //right here we need to get course_id and title
        
    }, [])


    return (
        <div className="App">
            <CssBaseline/>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
