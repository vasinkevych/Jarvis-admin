import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import { getBaseUrl } from './utils';

import 'bootstrap-css-only/css/bootstrap.min.css';

// graphql for the client
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: `${getBaseUrl()}/graphql`
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
);
