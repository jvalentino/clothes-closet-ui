import React, { Component } from "react";
import Banner from "../banner/Banner";
import * as controller from "./settings-controller";
import AppState from "../../AppState";
import ProgressView from "../progressView/ProgressView";
import * as AddSettingsModal from "./AddSettingsModal";
import * as error from '../errorModal/error-modal';

import DataTable from 'react-data-table-component';

import { confirmAlert } from 'react-confirm-alert'; 

class Settings extends Component {

    columns = [
        {
          name: 'Gender',
          cell:(row)=>
            <select name={`gender-${row.settingsId}`} defaultValue={row.gender}>
                <option>Female</option>
                <option>Male</option>
            </select>,
        },
        {
            name: 'Label',
            cell:(row)=><input name={`label-${row.settingsId}`} type="text" defaultValue={row.label} style={{"width":"250px"}}/>,
        },
        {
            name: 'Quantity',
            cell:(row)=><input name={`quantity-${row.settingsId}`} type="text" defaultValue={row.quantity} style={{"width":"50px"}}/>,
        },
        {
            cell:(row)=><button className="default" onClick={this.updateSetting} id={row.settingsId}>Update</button>,
        },
        {
            cell:(row)=><button className="default" onClick={this.deleteSetting} id={row.settingsId}>Delete</button>,
        },
      ];

    constructor() {
      super();

      this.deleteSetting = this.deleteSetting.bind(this);
      this.updateSetting = this.updateSetting.bind(this);

      this.state = {
        settings: null
      };
      
    }
  
    async componentDidMount() {
      const settings = await controller.loadSettings(AppState.getSessionId(), AppState.getUrl());
      console.log(settings);

      this.setState({
        settings: settings
      });
    }

    async deleteSetting(event) {
        event.preventDefault();
        const settingsId = event.target.id;
  
        confirmAlert({
          title: 'Are you sure?',
          message: 'Are you sure you want to cancel this setting?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.confirmDelete(settingsId)
            },
            {
              label: 'No',
              onClick: () => console.log('closed')
            }
          ]
        });
    }

    async confirmDelete(settingsId) {
        const result = await controller.deleteSettings(settingsId, AppState.getSessionId(), AppState.getUrl());
        
        if (result.success == false) {
            error.display(result.messages);
            return;
        }

        window.location = "./settings";
    }

    async updateSetting(event) {
        event.preventDefault();

        const settingsId = +event.target.id;
        const form = document.getElementById("datatable-form");
        const elements = form.elements;

        const payload = {
            settingsId: settingsId,
            label: elements[`label-${settingsId}`].value,
            quantity: +elements[`quantity-${settingsId}`].value,
            gender: elements[`gender-${settingsId}`].value,
        };

        console.log(payload);

        const result = await controller.submitAdd(payload, AppState.getSessionId(), AppState.getUrl());

        if (result.success == false) {
            error.display(result.messages);
            return;
        }

       window.location = "./settings";
    }
  
    render() {
        
        if (this.state.settings == null) {
            return(
                <div>
                    <Banner />
                    <div className="standard-view">
                        <ProgressView />
                    </div>
                </div>
            );
        }

      return (
        <div>
          <Banner />
          <div className="standard-view">
            <div style={{'width':'100%', "textAlign":"right"}}>
                <button className="default" onClick={AddSettingsModal.display}>Add New Setting</button>
            </div>
            <form id="datatable-form">
                <DataTable
                    columns={this.columns}
                    data={this.state.settings.settings}
                    button={true}
                />
            </form>
          </div>
        </div>
      );
    }
}
  
export default Settings;
  