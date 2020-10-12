import React, { useReducer } from "react";
import uuid from "uuid";
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
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add a contact.

  // Delete a contact.

  // Sets current contact.

  // Clears current contact.

  // Updates contact.

  // Filter contacts.

  // Clears the filter for the contacts.

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
