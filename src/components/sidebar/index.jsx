import React from 'react';
import {connect} from "react-redux";
import DataPicker from "../data-picker";
import BGPicker from "../bg-picker";
import TextFieldsTools from "../text-fields-tools";
import {generateSample, generateBundle} from '../../utils';

export default connect(store => store)(function Sidebar({userSettings, dispatch}) {
    const {sheetData} = userSettings;
    console.log(sheetData);
    return (
        <div className="sidebar col-3 text-left">
            <DataPicker />
            <BGPicker />
            <TextFieldsTools />
            <div className="buttons mt-4">
                <button className="btn btn-secondary" onClick={() => {generateSample(userSettings)}}>
                    Generate Sample
                </button>
                <br/>
                <button className="btn btn-primary mt-2" onClick={() => {generateBundle(userSettings)}}>
                    Generate Bundle
                </button>
            </div>
        </div>
    )
});
