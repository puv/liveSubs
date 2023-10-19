/* eslint-disable no-unused-vars */

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import App from './App';
import Client from './Client';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/client" element={<Client />} />
				<Route path="/" element={<App />} />
			</Routes>
		</Router>
	</React.StrictMode>
);