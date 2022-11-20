import React, {useState} from "react";
import {useGoogleLogin} from '@react-oauth/google';
import {Avatar, Button, Paper, Grid, Typography, Container, Grow} from "@mui/material";
import {LockOutlined} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom"
import {signin, signup} from "../../actions/auth"

import useStyles from "./styles"
import Input from "./Input";
import axios from "axios";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

export const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const googleLogin = useGoogleLogin({
    //     onSuccess: res => googleSuccess(res),
    //     onError: errResponse => console.log(errResponse)
    // })

    const handleSubmit = (e) => {
        e.preventDefault()

        if(isSignUp){
            dispatch(signup(formData, navigate))
        }
        else {
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        setShowPassword(false)
    }

    // const googleSuccess = async (tokenResponse) => {
    //     const token = tokenResponse.access_token
    //     console.log(tokenResponse)
    //     const userGet = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
    //         {headers: {Authorization: `Bearer ${tokenResponse.access_token}`}}
    //     )
    //
    //     const result = userGet.data
    //
    //     try {
    //         dispatch({type: "AUTH", data: {result, token}})
    //         navigate("/")
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (

        <Grow in out>

        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input
                                        name="firstName"
                                        label="First Name"
                                        handleChange={handleChange}
                                        autoFocus
                                        half
                                        type="text"
                                    />
                                    <Input
                                        name="lastName"
                                        label="Last Name"
                                        handleChange={handleChange}
                                        half
                                        type="text"
                                    />

                                </>
                            )
                        }
                        <Input
                            name="email"
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                        />
                        <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />

                        {isSignUp && <Input
                            name="confirmPassword"
                            label="Confirm Password"
                            handleChange={handleChange}
                            type="password"
                        />}

                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>

                    {/*GOOGLE LOGIN*/}
                    {/*<GoogleLogin onSuccess={googleSuccess} onError={() => {*/}
                    {/*    console.log("Login Failed.")*/}
                    {/*}}/>*/}

                    {/*<Button*/}
                    {/*    className={classes.googleButton}*/}
                    {/*    color="primary"*/}
                    {/*    fullWidth*/}
                    {/*    onClick={() => googleLogin()}*/}
                    {/*    startIcon={<Icon/>}*/}
                    {/*    variant="contained"*/}
                    {/*>*/}
                    {/*    Sign In With Google*/}
                    {/*</Button>*/}

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>{
                                isSignUp ? "Already have an account? Sign In." : "Don't have an account? Sign Up."
                            }</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>

        </Grow>

    )
}