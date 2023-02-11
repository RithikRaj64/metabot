import React, { useState } from "react";
import axios from "axios";

function PatientsRecords() {
    const [details, setDetails] = useState({});

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(details);
        axios.post("http://localhost:8000/insert", details);
    }

    return (
        <div className="">
            <form>
                <input type="number" name="id" onChange={handleChange} />
                <input type="text" name="name" onChange={handleChange} />
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default PatientsRecords;