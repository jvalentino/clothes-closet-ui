import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import strings from "../../locale";

function display(messages) {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="react-confirm-alert">
          <div className="react-confirm-alert-body">
            <h1 className="alert__title">{strings.error}</h1>
            <p className="alert__body">{strings.errorsToBeCorrected}</p>
            <ul>
              {messages.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>{strings.errorsOkay}</button>
            </div>
          </div>
        </div>
      );
    }
  });
}

export { display };
