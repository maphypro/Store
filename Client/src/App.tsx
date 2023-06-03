import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import router from "./Router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {CssBaseline} from "@mui/material";
import { BrowserRouter } from 'react-router-dom'


function App() {


    return (
        <div className="App">
            <CssBaseline/>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
