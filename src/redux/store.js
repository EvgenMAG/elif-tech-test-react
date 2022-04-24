import {
    configureStore,
    combineReducers,
    getDefaultMiddleware,
  } from '@reduxjs/toolkit';
  import logger from 'redux-logger';
  
  import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  

  
  import contactReducers from '../redux/contacts/contacts-reducer';
 
  
  
  const middleware = [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    logger,
  ];
  
  const contactsReducer = combineReducers({
    items: contactReducers.itemsReducers,
    loading: contactReducers.loading,
  });
  
  
  let store = configureStore({
    reducer: {
      contacts: contactsReducer,
    },
    middleware,
  });
  

  
  export default { store };