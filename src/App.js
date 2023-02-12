import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import AddVitals from "./Components/AddVitals";
import "./output.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signin" element={<SignIn />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/addVitals" element={<AddVitals />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

