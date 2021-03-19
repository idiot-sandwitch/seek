import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
  const initialState = {
    alert: null,
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  /* Valid 'type' for alert:
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
   */
  const setAlert = async (
    type,
    message,
    icon = "exclamation",
    timer = 1500
  ) => {
    dispatch({ type: SET_ALERT, payload: { type, message, icon } });
    setTimeout(() => removeAlert(), timer);
  };

  const removeAlert = () => {
    dispatch({ type: REMOVE_ALERT });
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state.alert,
        setAlert,
        removeAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
