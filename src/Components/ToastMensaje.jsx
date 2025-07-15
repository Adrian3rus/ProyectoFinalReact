import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const ToastMensaje = ({ mensaje }) => {
  return (
    <div
      className="toast align-items-center text-white bg-success border-0 position-fixed bottom-0 end-0 m-3 show"
      role="alert"
      style={{ zIndex: 1055 }}
    >
      <div className="d-flex">
        <div className="toast-body d-flex align-items-center gap-2">
          <FontAwesomeIcon icon={faCheckCircle} />
          {mensaje}
        </div>
      </div>
    </div>
  );
};

export default ToastMensaje;
