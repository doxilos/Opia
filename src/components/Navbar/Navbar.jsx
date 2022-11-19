import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";
import {Link} from "react-router-dom";
import {AppBar, Avatar, Button, Toolbar, Typography} from "@mui/material";

import useStyles from "./styles"


export const Navbar = () => {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const logout = () => {
        dispatch({type: "LOGOUT"})
        navigate("/")
        setUser(null)
    }

    useEffect(() => {
        if (user) {
            const token = user.token
        }
        setUser(JSON.parse(localStorage.getItem("profile")))
    }, [location]);


    return (
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
    )
}