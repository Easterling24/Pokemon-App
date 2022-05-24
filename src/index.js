import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utils/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

// let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<HashRouter>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</HashRouter>
	</Provider>
);
