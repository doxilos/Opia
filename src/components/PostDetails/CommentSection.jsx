import React, { useState, useRef } from "react"
import { Typography, TextField, Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { commentPost } from "../../actions/posts"

import useStyles from "./styles"

const CommentSection = ({ post }) => {
    const user = JSON.parse(localStorage.getItem("profile"))
    const classes = useStyles()
    const [comments, setComments] = useState(post.comments)
    const [comment, setComment] = useState("")

    const dispatch = useDispatch()

    const commentsRef = useRef()

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`
        const newComments = await dispatch(commentPost(finalComment, post._id))
        setComments(newComments)
        setComment("")

        commentsRef.current.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">
                        Comments
                    </Typography>

                    {comments.map((comment, index) => (
                        <Typography
                            sx={{ width: "100%" }}
                            key={index}
                            gutterBottom
                            variant="subtitle1"
                        >
                            <strong>{comment.split(": ")[0]}</strong>
                            {comment.split(":")[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
            </div>

            {user && (
                <div style={{ width: "70%" }}>
                    <Typography gutterBottom variant="h6">
                        Write a Comment
                    </Typography>
                    <TextField
                        fullWidth
                        rows={4}
                        variant="outlined"
                        label="Comment"
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button
                        style={{ marginTop: "10px" }}
                        fullWidth
                        disabled={!comment}
                        variant="contained"
                        onClick={handleClick}
                    >
                        Comment
                    </Button>
                </div>
            )}
        </div>
    )
}

export default CommentSection
