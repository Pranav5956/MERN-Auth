import React from "react";

import "./ErrorComponent.css";

function ErrorComponent({ error, clearError }) {
  return (
    <div className="error">
      <span className="error__message">{error}</span>
      <span className="error__close" onClick={clearError}>
        &times;
      </span>
    </div>
  );
}

export default ErrorComponent;
