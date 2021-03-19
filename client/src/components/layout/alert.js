import React, { useContext } from "react";
import Alert from "react-bootstrap/Alert";
import AlertContext from "../../context/alert/alertContext";

export const SeekAlert = () => {
  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;

  return (
    alert !== null && (
      <Alert variant={alert.type}>
        <i className={`fas fa-${alert.icon}`}></i> {alert.message}{" "}
      </Alert>
    )
  );
};
