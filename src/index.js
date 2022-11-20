import React from "react";
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {createStore, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import reducers from "./reducers"

import App from "./App"
import "./index.css"

const store = createStore(reducers, compose(applyMiddleware(thunk)))
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


ReactDOM.render(
    <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <App/>
            </ThemeProvider>
    </Provider>

    , document.getElementById("root"))