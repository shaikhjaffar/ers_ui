
import {legacy_createStore as createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducer/index';
import storage from 'redux-persist/lib/storage';
import { persistReducer} from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage,
  }


  const persisteducer = persistReducer(persistConfig,rootReducer)
  

const store = createStore(persisteducer,applyMiddleware(thunk))

export default store;