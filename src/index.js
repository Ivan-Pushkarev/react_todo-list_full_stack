import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink,} from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import {BrowserRouter} from "react-router-dom";

const httpLink = new HttpLink({
    uri: 'http://localhost:8080/graphql',
    credentials: 'include',
    headers: {
        'x-forwarded-proto': 'https'
    }
});
const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:8080/graphql',
}));

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);
// const httpLink = createHttpLink({
//     uri: 'http://localhost:4000/graphql',
//     credentials: 'include',
//     headers: {
//         'x-forwarded-proto': 'https'
//     }
// })

const client = new ApolloClient({
    link: splitLink,
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
