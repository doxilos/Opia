import React from 'react'
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from "@mui/material"
import {ThumbUpAlt, Delete, MoreHoriz} from "@mui/icons-material";
import moment from "moment";
import {useDispatch} from "react-redux";
import {deletePost, likePost} from "../../../actions/posts";

import useStyles from "./styles"

const Post = ({post, setCurrentId}) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: "white"}} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHoriz fontSize="default"/>
                </Button>
            </div>
            <div className={classes.details}>
                <Typography
                    variant="body2"
                    color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography color="textSecondary" variant="body2" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button variant="outlined" size="small" onClick={()=> dispatch(likePost(post._id))}>
                    <ThumbUpAlt fontSize="small"/>
                    &nbsp; Like &nbsp;
                    {post.likeCount}
                </Button>
                <Button variant="outlined" size="small" onClick={()=> dispatch(deletePost(post._id))}>
                    <Delete color="secondary" fontSize="small"/>
                    &nbsp; Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default Post;
