import React from 'react';
import {connect} from "react-redux";
import {parseImageData} from "../../utils";

export default connect(store => store)(function BGPicker({userSettings, dispatch}) {
    return (
        <div className="mt-4">
            <div className="input-group">
                <div className={userSettings.bgImage ? "input-group-prepend" : ""}>
                    <label className="input-group-text" htmlFor="bg-picker">Choose Background</label>
                </div>
                <div className="custom-file" style={{flex: '0 0 auto'}}>
                    <input className="custom-file-input" type="file" name="bg-picker" id="bg-picker"
                           accept="image/*"
                           onChange={function (e) {
                               parseImageData(e)
                                   .then(data => {
                                       dispatch({
                                           type: 'SET_BG_DATA',
                                           payload: data,
                                       })
                                   }).catch((err) => {
                                   console.warn('File Rejected')
                               })
                           }}
                    />
                </div>
                {userSettings.bgImage && (
                    <div className="input-group-append">
                        <button className="btn btn-danger" onClick={() => dispatch({type: 'RESET_BG_IMAGE'})}>Clear</button>
                    </div>
                )}
            </div>

        </div>
    );
})
