import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store';
import { persistor } from './redux/store';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
	   <Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
        	<Toaster
			position="top-right"
			toastOptions={{
				style: { borderRadius: '14px', fontSize: '18' },
			}}
		/>
		<App />
		</PersistGate>
	   </Provider>
		
	</BrowserRouter>
);