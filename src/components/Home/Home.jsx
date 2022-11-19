import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getPosts, getPostsBySearch} from "../../actions/posts";
import {Container, Grid, Grow, Paper, AppBar, TextField, Button} from "@mui/material";
import {useNavigate, useLocation} from "react-router-dom";
import ChipInput from "@sarakusha/material-ui-chip-input";

import Paginate from "../Pagination";
import useStyles from "./styles"

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const query = useQuery()
    const classes = useStyles()

    const page = query.get("page") || 1
    const searchQuery = query.get("searchQuery")

    const [currentId, setCurrentId] = useState(null)
    const [search, setSearch] = useState("")
    const [tags, setTags] = useState([]);

    const searchPost=()=>{
        if(search.trim()){
            dispatch(getPostsBySearch({search, tags: tags.join(",")}))
        }else{
            navigate("/")
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost()
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag])

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch, currentId]);

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch"
                      spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Posts"
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <ChipInput
                                style={{margin: "10px 0"}}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />

                            <Button variant="contained" onClick={searchPost} className={classes.searchButton} color="primary">Search</Button>

                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        <Paper elevation={6}>
                            <Paginate/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}