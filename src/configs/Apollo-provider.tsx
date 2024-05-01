'use client'
import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => {

    const client = new ApolloClient({
        uri: 'http://localhost:5500/graphql',
        cache: new InMemoryCache(),
    });
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}

export default ApolloClientProvider