import React from 'react';
import {connect} from "react-redux";
import DataPicker from "../data-picker";
import BGPicker from "../bg-picker";
import TextFieldsTools from "../text-fields-tools";
import {generateSample, generateBundle} from '../../utils';

export default connect(store => store)(function Sidebar({userSettings, dispatch}) {
    const buttonsDisableClass = !(userSettings.bgImage || userSettings.textFields.length) ?
        ' disabled' : '';
    return (
        <div className="sidebar col-3 text-left">
            <DataPicker />
            <BGPicker />
            <TextFieldsTools />
            <div className="buttons form-group mt-4">
                <button disabled={!!buttonsDisableClass}
                        className={`form-control btn btn-secondary${buttonsDisableClass}`}
                        onClick={() => {generateSample(userSettings)}}>
                    Generate Sample
                </button>
                <br/>
                <button disabled={!!buttonsDisableClass}
                        className={`form-control btn btn-primary mt-2${buttonsDisableClass}`}
                        onClick={() => {generateBundle(userSettings)}}>
                    Generate Bundle
                </button>
            </div>
        </div>
    )
});
