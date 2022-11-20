import React, { useEffect } from "react"
import {
    Paper,
    Typography,
    Divider,
    Card,
    CardMedia,
    CardContent,
    Grid,
    Grow,
    CardActionArea,
    CircularProgress,
    Fade,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { useParams, useNavigate, Link } from "react-router-dom"

import { getPost, getPostsBySearch } from "../../actions/posts"
import useStyles from "./styles"
import CommentSection from "./CommentSection"
import Grid2 from "@mui/material/Unstable_Grid2"

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classes = useStyles()
    const { id } = useParams()

    const openPost = (_id) => {
        // navigate(`/posts/${_id}`)
        navigate(`/posts/${_id}`)
    }

    useEffect(() => {
        dispatch(getPost(id))
    }, [id])

    useEffect(() => {
        if (post) {
            dispatch(
                getPostsBySearch({ search: "none", tags: post.tags.join(",") })
            )
        }
    }, [post])

    if (!post) return null

    if (isLoading) {
        return (
            <Grow in out="true">
                <Paper elevation={6} className={classes.loadingPaper}>
                    <CircularProgress />
                </Paper>
            </Grow>
        )
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)

    return (
        <Grow in timeout={600}>
            <Paper
                style={{ padding: "20px", borderRadius: "15px" }}
                elevation={6}
            >
                <Grid2 container spacing={2}>
                    <Grid2 xs={12} sm={12} md={6} xl={6}>
                        <Typography
                            sx={{ textShadow: "0px 0px 11px rgba(0, 0, 0, 1)" }}
                            variant="h3"
                            component="h2"
                        >
                            {post.title}
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="h6"
                            color="textSecondary"
                            component="h2"
                        >
                            {post.tags.map((tag, index) => (
                                <Link
                                    key={index}
                                    to={`/tags/${tag}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "#3f51b5",
                                    }}
                                >
                                    {` #${tag} `}
                                </Link>
                            ))}
                        </Typography>
                        <Typography gutterBottom variant="body1" component="p">
                            {post.message}
                        </Typography>
                        <Typography variant="h6">
                            Created by:
                            <Link
                                to={`/creators/${post.name}`}
                                style={{
                                    textDecoration: "none",
                                    color: "#3f51b5",
                                }}
                            >
                                {` ${post.name}`}
                            </Link>
                        </Typography>
                        <Typography variant="body1">
                            {moment(post.createdAt).fromNow()}
                        </Typography>
                        <Divider style={{ margin: "20px 0" }} />
                        {/* <Typography variant="body1">
                            <strong>Realtime Chat - coming soon!</strong>
                        </Typography> */}
                        <Divider style={{ margin: "20px 0" }} />
                        <CommentSection post={post} />
                        <Divider style={{ margin: "20px 0" }} />
                    </Grid2>
                    <Grid2 xs={12} sm={12} md={6} xl={6}>
                        <Fade in timeout={600}>
                            <img
                                style={{
                                    width: "100%",
                                    borderRadius: "20px",
                                    boxShadow:
                                        "4px 4px 21px 0px rgba(0,0,0,0.67)",
                                }}
                                src={
                                    post.selectedFile ||
                                    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                                }
                                alt={post.name}
                            />
                        </Fade>
                    </Grid2>
                </Grid2>

                {recommendedPosts.length > 0 ? (
                    <Grow in out="true" timeout={500}>
                        <div className={classes.section}>
                            <Typography gutterBottom variant="h5">
                                You might also like:
                            </Typography>
                            <Divider />
                            <Grid
                                container
                                spacing={3}
                                sx={{ paddingTop: "25px" }}
                            >
                                {recommendedPosts.map(
                                    ({
                                        title,
                                        message,
                                        name,
                                        likes,
                                        selectedFile,
                                        _id,
                                    }) => (
                                        <Grid
                                            className={classes.hover}
                                            key={_id}
                                            item
                                            xs={12}
                                            sm={12}
                                            md={6}
                                            lg={3}
                                        >
                                            <Grow in timeout={600}>
                                                <Card
                                                    sx={{
                                                        maxWidth: 345,
                                                        borderRadius: "20px",
                                                        boxShadow:
                                                            "4px 4px 21px 0px rgba(0,0,0,0.67)",
                                                    }}
                                                >
                                                    <CardActionArea
                                                        onClick={() =>
                                                            openPost(_id)
                                                        }
                                                    >
                                                        <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image={
                                                                selectedFile ||
                                                                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                                                            }
                                                            alt={name}
                                                        />
                                                        <CardContent>
                                                            <Typography
                                                                gutterBottom
                                                                variant="h5"
                                                                component="div"
                                                            >
                                                                {title}
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                {message}
                                                            </Typography>
                                                            <Typography
                                                                gutterBottom
                                                                variant="h6"
                                                                component="div"
                                                            >
                                                                Likes:{" "}
                                                                {likes.length}
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Card>
                                            </Grow>
                                        </Grid>
                                    )
                                )}
                            </Grid>
                        </div>
                    </Grow>
                ) : (
                    <Grow in out="true">
                        <Paper elevation={6} className={classes.loadingPaper}>
                            <CircularProgress />
                        </Paper>
                    </Grow>
                )}
            </Paper>
        </Grow>
    )
}

export default PostDetails
