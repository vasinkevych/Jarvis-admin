import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';

import auth from './services/Auth';

import { getBaseUrl } from './utils';

import 'bootstrap-css-only/css/bootstrap.min.css';

// graphql for the client
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-boost';

const authLink = new ApolloLink((operation, forward) => {
  const token = auth.getIdToken();
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });
  return forward(operation);
});

const httpLink = createHttpLink({
  uri: `${getBaseUrl()}/graphql`
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router hashType={'noslash'}>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('app')
);
