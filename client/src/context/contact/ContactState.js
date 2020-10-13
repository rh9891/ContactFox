import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Elizabeth Bennet",
        email: "ebennet@email.com",
        phone: "111-111-1111",
        type: "personal",
      },
      {
        id: 2,
        name: "Fitzwilliam Darcy",
        email: "fdarcy@email.com",
        phone: "222-222-2222",
        type: "professional",
      },
      {
        id: 3,
        name: "Jane Bennet",
        email: "jbennet@email.com",
        phone: "333-333-3333",
        type: "personal",
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Function to add a contact.
  const addContact = (contact) => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Function to delete a contact.
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Function to set the current contact.
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Function the clear the current contact.
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Function to update the current contact.
  const updateCurrent = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // Function to filter contacts (based on what is inputted in search field).
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // Function to clear filter for contacts.
  const clearFilter = (text) => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateCurrent,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;