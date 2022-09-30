import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ApolloClient, createHttpLink, InMemoryCache, ApolloProvider} from "@apollo/client";
import {BrowserRouter} from "react-router-dom";

const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql',
    credentials: 'include'
})
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
