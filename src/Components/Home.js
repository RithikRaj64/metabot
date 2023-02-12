import React from "react";
import NavBar from "./Navbar";
function Home() {
    return (
        <div className="container-fluid min-h-screen bg-pink-100">
            <NavBar />
            <h1>hello {window.sessionStorage.getItem('id')}</h1>
        </div>
    );
}

export default Home;