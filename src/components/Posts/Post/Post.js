import React, { useState } from "react"
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from "@mui/material"
import {
    ThumbUpAlt,
    Delete,
    MoreHoriz,
    ThumbUpAltOutlined,
} from "@mui/icons-material"
import moment from "moment"
import { useDispatch } from "react-redux"
import { deletePost, likePost } from "../../../actions/posts"
import { useNavigate } from "react-router-dom"

import useStyles from "./styles"

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [likes, setLikes] = useState(post.likes)

    const user = JSON.parse(localStorage.getItem("profile"))

    const handleLike = async () => {
        dispatch(likePost(post._id))

        if (likes.find((like) => like === (user ? user.result._id : ""))) {
            setLikes(likes.filter((id) => id !== user.result._id))
        } else {
            setLikes([...likes, user.result._id])
        }
    }

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find(
                (like) => like === (user ? user.result._id : "")
            ) ? (
                <>
                    <ThumbUpAlt fontSize="small" />
                    &nbsp;
                    {likes.length > 2
                        ? `You and ${likes.length - 1} others`
                        : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize="small" />
                    &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
                </>
            )
        }
        return (
            <>
                <ThumbUpAltOutlined fontSize="small" />
                &nbsp;Like
            </>
        )
    }

    const openPost = () => {
        navigate(`/posts/${post._id}`)
    }

    return (
        <Card className={classes.card} raised elevation={6}>
            <div style={{ cursor: "pointer" }} onClick={openPost}>
                <CardMedia
                    className={classes.media}
                    image={post.selectedFile}
                    title={post.title}
                />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">
                        {moment(post.createdAt).fromNow()}
                    </Typography>
                </div>
                <div className={classes.overlay2}>
                    {user && user.result._id === post.creator && (
                        <Button
                            style={{ color: "white" }}
                            size="small"
                            onClick={() => setCurrentId(post._id)}
                        >
                            <MoreHoriz fontSize="default" />
                        </Button>
                    )}
                </div>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom>
                    {post.title}
                </Typography>
                <CardContent>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                        component="p"
                    >
                        {post.message}
                    </Typography>
                </CardContent>
            </div>
            <CardActions className={classes.cardActions}>
                <Button
                    disabled={!user}
                    variant="outlined"
                    size="small"
                    onClick={handleLike}
                >
                    <Likes />
                </Button>

                {user && user.result._id === post.creator && (
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => dispatch(deletePost(post._id))}
                        color="secondary"
                    >
                        <Delete color="secondary" fontSize="small" />
                        &nbsp; Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post
