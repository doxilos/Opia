import React from 'react';
import {useSelector} from "react-redux"
import {Grid, CircularProgress, Grow} from "@mui/material";

import Post from "./Post/Post";
import useStyles from "./styles"


const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => state.posts)
    const classes = useStyles()

    return (
        !posts.length ? <CircularProgress/> : (
            <Grow in timeout={500}>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {
                        posts.map((post) => (
                            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                                <Post post={post} setCurrentId={setCurrentId}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grow>
        )
    );
};

export default Posts;
