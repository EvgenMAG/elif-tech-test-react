import axios from 'axios';
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

axios.defaults.baseURL = 'https://my-elif.herokuapp.com';

const getContacts = () => async dispatch => {
  dispatch(getContactsRequest());

  try {
    const {data} = await axios.get('/api/contacts');
     const dataArray = Object.values(data.data)
    dispatch(getContactsSuccess(dataArray));
  } catch (error) {
    dispatch(getContactsError(error.message));
  }
};


const addContact = (contact) => async dispatch => {

  dispatch(addContactRequest());

  try {
    const { data } = await axios.post('/api/contacts', contact);
  
    dispatch(addContactSuccess(data.data.contact));
  } catch (error) {
    dispatch(addContactError(error.message));
  }
};

const deleteContact = id => async dispatch => {
  dispatch(deleteContactRequest());

  try {
    await axios.delete(`/api/contacts/${id}`);
    dispatch(deleteContactSuccess(id));
  } catch (error) {
    dispatch(deleteContactError(error.message));
  }
};

const updateContact = (id, contact) => async dispatch => {
    dispatch(updateContactRequest());
  
    try {
    const {data} = await axios.put(`/api/contacts/${id}`,contact);
    console.log(data.data.contact)
      dispatch(updateContactSuccess(data.data.contact));
    } catch (error) {
      dispatch(updateContactError(error.message));
    }
  };

export { addContact, deleteContact, getContacts, updateContact };