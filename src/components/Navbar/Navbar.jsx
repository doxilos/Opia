import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";
import {Link} from "react-router-dom";
import {AppBar, Avatar, Button, Fade, Toolbar, Typography} from "@mui/material";
import {decode} from "jsonwebtoken";

import useStyles from "./styles"


export const Navbar = () => {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const logout = () => {
        dispatch({type: "LOGOUT"})
        setUser(null)
        navigate("/")
    }

    useEffect(() => {
        let token
        if (user) {
            token = user.token
        }

        if(token) {
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()){
                logout()
            }
        }

        setUser(JSON.parse(localStorage.getItem("profile")))
    }, [location]);


    return (

        <Fade in timeout={500}>

        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" variant="h2" align="center" className={`${classes.heading}`}>
                    OPIA
                </Typography>
            </div>

            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name}
                                src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">
                            {user.result.name}
                        </Typography>
                        <Button onClick={logout} variant="contained" className={classes.logout}
                                color="secondary">Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">
                        Sign In
                    </Button>
                )}
            </Toolbar>

        </AppBar>
        </Fade>
    )
}