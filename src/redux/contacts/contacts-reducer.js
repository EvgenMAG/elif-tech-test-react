import {
    addContactRequest,
    addContactSuccess,
    addContactError,
    deleteContactRequest,
    deleteContactSuccess,
    deleteContactError,
    getContactsRequest,
    getContactsSuccess,
    getContactsError,
    updateContactRequest,
  updateContactSuccess,
  updateContactError
  
  } from './contacts-actions';
  
  import { createReducer } from '@reduxjs/toolkit';
  
  const initialState = [];
  
  
  
  // ========ToolKit =======
  const itemsReducers = createReducer(initialState, {
    [getContactsSuccess]: (_, { payload }) => payload,
    [addContactSuccess]: (state, { payload }) => [...state, payload],
    [updateContactSuccess]: (state, { payload }) => [...state.filter(contact => contact._id !== payload.id), payload.updatedData],
    [deleteContactSuccess]: (state, { payload }) =>
      state.filter(contact => contact._id !== payload),
  });
  
  const loading = createReducer(false, {
    [addContactRequest]: () => true,
    [addContactSuccess]: () => false,
    [addContactError]: () => false,
    [deleteContactRequest]: () => true,
    [deleteContactSuccess]: () => false,
    [deleteContactError]: () => false,
    [getContactsRequest]: () => true,
    [getContactsSuccess]: () => false,
    [getContactsError]: () => false,
  });
  
  
  const reducers = { itemsReducers,  loading };
  
  export default reducers;