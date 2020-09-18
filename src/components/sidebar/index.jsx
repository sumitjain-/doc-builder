import React from 'react';
import {connect} from "react-redux";
import DataPicker from "../data-picker";
import BGPicker from "../bg-picker";
import TextFieldsTools from "../text-fields-tools";

export default connect(store => store)(function Sidebar({userSettings, dispatch}) {
    const {sheetData} = userSettings;
    console.log(sheetData);
    return (
        <div className="sidebar col-3 text-left">
            <DataPicker />
            <BGPicker />
            <TextFieldsTools />
        </div>
    )
});
