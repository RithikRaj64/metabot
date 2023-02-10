import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/Signin.css";
import { Box, FormControl, Input, InputLabel, FormHelperText, Button } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';

function SignIn() {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [pwtxt, setPwtxt] = useState("");
    const [pwlength, setPwlength] = useState("");

    const [pw, setPw] = useState("");

    const [pwc, setPwc] = useState("c0");

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePw = (event) => {
        const val = event.target.value;
        setPw(val);

        if (val.length < 8) {
            setPwlength("At least 8 characters");
        }
        else if (val.length >= 8) {
            setPwlength("");
        }

        if (val === "") {
            setPwtxt("Please enter your Password");
            setPwc("c0");
        }
        else if (pwValidate(event.target.value) === 1) {
            setPwtxt("Seriously..!!");
            setPwc("c1");
        }
        else if (pwValidate(event.target.value) === 2) {
            setPwtxt("Try a little harder");
            setPwc("c2");
        }
        else if (pwValidate(event.target.value) === 3) {
            setPwtxt("Almost there");
            setPwc("c3");
        }
        else if (pwValidate(event.target.value) === 4 && val.length >= 8) {
            setPwtxt("Voila! This is a Firewall..🔥");
            setPwc("c4");
        }

    }

    const pwValidate = (pw) => {
        let strength = 0;

        if (pw.match(/(?=.*[a-z])/)) {
            strength++;
        }

        if (pw.match(/(?=.*[A-Z])/)) {
            strength++;
        }

        if (pw.match(/(?=.*[0-9])/)) {
            strength++;
        }

        if (pw.match(/(?=.*[!@#\$%\^&\*])/)) {
            strength++;
        }

        return strength;
    }

    const handleSubmit = () => {
        signInWithEmailAndPassword(auth, email, pw)
            .then((userCredential) => {
                const user = userCredential.user;
                nav("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Something went wrong. Please try again!");
            });

    }

    return (
        <Box className='box' sx={{
            backgroundColor: '#f06292',
            width: 450,
            height: 520,
            borderRadius: 25
        }}>
            <div className='box-conts'>

                <center><h2>SIGN IN</h2></center>

                <FormControl variant="standard">
                    <InputLabel htmlFor="uname">Email</InputLabel>
                    <Input
                        id="uname"
                        onChange={handleEmail}
                    />
                </FormControl>
                <br /><br />

                <FormControl variant="standard">
                    <InputLabel htmlFor="pw">Password</InputLabel>
                    <Input
                        type="password"
                        id="pw"
                        onChange={handlePw}
                        className={{}}
                    />
                    <FormHelperText id="pwl-text" sx={{ color: "red", }}>{pwlength}</FormHelperText>
                    <FormHelperText id={pwc} sx={{ color: { pwc } }}>{pwtxt}</FormHelperText>
                </FormControl>
                <br /><br />

                <center><Button variant="oultined" onClick={handleSubmit}>SignIn</Button></center>
            </div>
        </Box>
    )
}

export default SignIn;