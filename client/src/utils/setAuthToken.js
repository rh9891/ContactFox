// This file checks to see if a token is passed in. If the token is passed in, it will be set into the global headers that are called in AuthState.js. If the token is not passed in, it will be deleted from the global headers.
import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
