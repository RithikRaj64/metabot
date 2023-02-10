import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/signin" element={<SignIn />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

