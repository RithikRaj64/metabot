import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ViewRecords() {
    const nav = useNavigate();
    const [details, setDetails] = useState({});

    const handleChange = (event) => {
        setDetails({ ...details, [event.target.name]: event.target.value });
    }

    async function handleSubmit() {

        details["temp"] = parseFloat(details["temp"]);
        details["id"] = window.sessionStorage.getItem("id");
        console.log(details);

        const r = await axios.post('http://localhost:8000/vitals/get', details);
        const res = await r.data

        console.log(res)
    }

    return (
        <div className="bg-pink-200 h-screen flex flex-row">
            <div className="bg-white w-96 h-150 rounded-lg shadow-lg flex flex-col justify-center items-center p-5">
                <h1 className="text-3xl font-bold text-gray-800 mt-3">Add Vitals</h1>
                <div className="flex flex-col justify-center items-center mt-3">
                    <input
                        type="text"
                        name="id"
                        placeholder="Heartrate in bpm"
                        className="w-72 h-10 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-pink-500 mt-4"
                        onChange={handleChange}
                    />
                    <button
                        className="bg-pink-500 w-72 h-10 rounded-lg text-white mt-4"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
            <Records />
        </div>
    )
}

function Records() {
    return (
        <table className="table-auto ">
            <thead>
                <tr>
                    <th>Heartrate</th>
                    <th>Oxygen Level</th>
                    <th>Systolic Blood Pressure</th>
                    <th>Diastolic Blood Pressure</th>
                    <th>Stress Level</th>
                    <th>Body Temperature</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Heartrate</td>
                    <td>Oxygen Level</td>
                    <td>Systolic Blood Pressure</td>
                    <td>Diastolic Blood Pressure</td>
                    <td>Stress Level</td>
                    <td>Body Temperature</td>
                </tr>
            </tbody>
        </table>
    )
}

export default ViewRecords;