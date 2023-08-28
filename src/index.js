import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';


const root = ReactDOM.createRoot(document.getElementById('root'));
 let persistor = persistStore(store)
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>
    <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
   
    </BrowserRouter>
   
  </React.StrictMode>
  </Provider>
);





