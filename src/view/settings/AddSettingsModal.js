
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as error from '../errorModal/error-modal';
import * as controller from "./settings-controller";
import AppState from "../../AppState";

let onCloseReference = null;

async function onSubmit(event) {
    event.preventDefault();
    const elements = event.target.elements;

    onCloseReference();

    const payload = {
        settingsId: null,
        label: elements["add-new-label"].value,
        quantity: +elements["add-new-quantity"].value,
        gender: elements["add-new-gender"].value,
    };

    const messages = controller.validateAdd(payload);

    if (messages.length != 0) {
        error.display(messages);
        return;
    }

    const result = await controller.submitAdd(payload, AppState.getSessionId(), AppState.getUrl());

    if (result.success == false) {
        error.display(result.messages);
        return;
    }

    window.location = "./settings";
}   

function display() {
 
  confirmAlert({
    customUI: ({ onClose }) => {
      onCloseReference = onClose
      return (
        <div className="react-confirm-alert">
          <div className="react-confirm-alert-body">
            <h1 className="alert__title">Add New Setting</h1>

            <form onSubmit={onSubmit}>

                <table className='standard-form'>
                    <tbody>
                        <tr>
                            <td>
                                Gender
                            </td>
                            <td>
                                <select name="add-new-gender">
                                    <option>Female</option>
                                    <option>Male</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Label</td>
                            <td>
                                <input type="text" name="add-new-label" />
                            </td>
                        </tr>
                        <tr>
                            <td>Quantity</td>
                            <td>
                                <input type="text" name="add-new-quantity" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="react-confirm-alert-button-group">
                    <button type="submit">Add</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </form>
            
           
            
          </div>
        </div>
      );
    }
  });
  
}
  
export { display };
  