import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, FormControl, Input, InputLabel, FormHelperText, Button } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "./Firebase";

function Form() {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [pwtxt, setPwtxt] = useState("");
    const [pwlength, setPwlength] = useState("");
    const [cpwtxt, setCpwtxt] = useState("");

    const [pw, setPw] = useState("");

    const [pwc, setPwc] = useState("c0");
    const [cpwc, setCpwc] = useState("c0");

    const [pok, setPok] = useState(false);
    const [cpok, setCpok] = useState(false);

    const handleUn = (event) => {
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
            setPok(true);
        }

    }

    const handleCpw = (event) => {
        const val = event.target.value;

        if (val === "") {
            setCpwtxt("Confirm your Password");
            setCpwc("c0");
        }
        else if (val === pw) {
            setCpwtxt("Passwords Matched..😉");
            setCpwc("c4");
            setCpok(true);
        }
        else {
            setCpwtxt("Passwords don't match");
            setCpwc("c2");
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
        if (pok && cpok) {
            createUserWithEmailAndPassword(auth, email, pw)
                .then((userCredential) => {
                    const user = userCredential.user;
                    nav("/signin");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert("Something went wrong. Please try again!");
                });
        }

    }

    return (
        <Box className='box' sx={{
            backgroundColor: '#f06292',
            width: 450,
            height: 520,
            borderRadius: 25
        }}>
            <div className='box-conts'>

                <center><h2>SIGN UP</h2></center>

                <FormControl variant="standard">
                    <InputLabel htmlFor="uname">Email</InputLabel>
                    <Input
                        id="uname"
                        onChange={handleUn}
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

                <FormControl variant="standard">
                    <InputLabel htmlFor="cpw">Confirm Password</InputLabel>
                    <Input
                        type="password"
                        id="cpw"
                        onChange={handleCpw}
                    />
                    <FormHelperText id={cpwc} sx={{ color: "red" }}>{cpwtxt}</FormHelperText>
                </FormControl>
                <br /><br />

                <center><Button variant="oultined" onClick={handleSubmit}>SignUp</Button></center>
            </div>
        </Box>
    )
}

export default Form;