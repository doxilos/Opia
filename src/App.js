import React from "react"
import { Container } from "@mui/material"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { Navbar } from "./components/Navbar/Navbar"
import { Home } from "./components/Home/Home"
import { Auth } from "./components/Auth/Auth"
import PostDetails from "./components/PostDetails/PostDetails"
import { Donate } from "./components/Donate/Donate"

const App = () => {
    const user = JSON.parse(localStorage.getItem("profile"))

    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Navigate to="/posts" />} />
                    <Route path="/posts" exact element={<Home />} />
                    <Route path="/posts/search" exact element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route
                        path="/auth"
                        exact
                        element={!user ? <Auth /> : <Navigate to="/posts" />}
                    />
                    <Route path="/donate" exact element={<Donate />} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App
