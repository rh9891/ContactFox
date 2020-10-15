import React, { useReducer } from "react";
import axios from "axios";
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
  CONTACT_ERROR,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Function to add a contact.
  const addContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/contacts", contact, config);

      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
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
        error: state.error,
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
