import React from 'react';
import ReactDOM from 'react-dom/client';
/* implement login token all over the App */

import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	HttpLink,
	// from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthContextProvider from './hooks/useTokenContext';

import { BrowserRouter } from 'react-router-dom';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const getUser = JSON.parse(localStorage.getItem('user'));

	const token = getUser?.token;
	// console.log("get token in index =>", token)
	// return the headers to the context so httpLink can read them

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(httpLink),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<AuthContextProvider>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</BrowserRouter>
		</ApolloProvider>
	</AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
