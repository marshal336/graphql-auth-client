'use client'
import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'

const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => {
    // const link = createUploadLink({ uri: 'http://localhost:5500/graphql' })
    const client = new ApolloClient({
        uri: 'http://localhost:5500/graphql',
        cache: new InMemoryCache(),
        credentials: 'include',
        headers: {
            apolloRequirePreflight: 'include'
        }
    });
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}

export default ApolloClientProvider