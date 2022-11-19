import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getPosts} from "../../actions/posts";
import {Container, Grid, Grow, Paper} from "@mui/material";

import Paginate from "../Pagination";

export const Home = () => {
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(null)

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch, currentId]);

    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>

                        <Paper elevation={6}>
                            <Paginate/>
                        </Paper>

                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId}/>

                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}