import { useState, useEffect } from "react";
import { supabase } from "./dbConnect";
import Auth from "./components/Auth";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

function App() {
    return (
        <>
        <NavBar />
        <Home />
        </>
    );
}

export default App;