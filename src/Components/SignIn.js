import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';

export default function SignIn() {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(
                (userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    nav("/");
                }
            )
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert("Something went wrong. Please try again!");
            });
    }

    return (
        <div className="bg-pink-200 h-screen flex justify-center items-center">
            <div className="bg-white w-96 py-5 rounded-lg shadow-lg flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center mb-0">
                    <h1 className="text-3xl font-bold mb-2">Sign In</h1>
                    <input
                        type="text"
                        placeholder="Email"
                        className="w-72 h-10 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-pink-500"
                        onChange={handleEmail}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-72 h-10 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-pink-500 mt-4"
                        onChange={handlePassword}
                    />
                    <button
                        className="bg-pink-500 w-72 h-10 rounded-lg text-white mt-4"
                        onClick={handleSubmit}
                    >
                        Sign In
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center h-full">
                    <p className="text-sm text-gray-500 mt-3">Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link></p>
                </div>
            </div>
        </div>
    )
}