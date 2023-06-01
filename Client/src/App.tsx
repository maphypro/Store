import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import router from "./Router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {CssBaseline} from "@mui/material";


function App() {



    return (
        <div className="App">
            <CssBaseline/>
            <Header/>
            <RouterProvider router={router}/>
            <Footer/>
        </div>
    );
}

export default App;
