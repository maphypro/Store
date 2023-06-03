import './App.css';
import {RouterProvider} from "react-router-dom";
import router from "./Router";
import {CssBaseline} from "@mui/material";


function App() {


    return (
        <div className="App">
            <CssBaseline/>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
