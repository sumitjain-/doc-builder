import React from 'react';
import {connect} from "react-redux";
import {acceptExcelData, generateTextField, SheetJSFT} from "../../utils";

export default connect(store => store)(function DataPicker({userSettings, dispatch}) {
    const {sheetData} = userSettings;
    return (
        <>
            <div className="input-group">
                <div className={!!sheetData.headers.length ? "input-group-prepend" : ""}>
                    <label className="input-group-text" htmlFor="file-picker">Choose Data File</label>
                </div>
                <div className="custom-file" style={{flex: '0 0 auto'}}>
                    <input className="custom-file-input" type="file"
                           id="file-picker" accept={SheetJSFT}
                           style={{width: 0}}
                           onChange={function (e) {
                               acceptExcelData(e)
                                   .then(d => {
                                       dispatch({
                                           type: "SET_SHEET_DATA",
                                           payload: d,
                                       });
                                       dispatch({
                                           type: "SET_TEXT_FIELDS",
                                           payload: d.headers.map(generateTextField),
                                       });
                                   }).catch((err) => {
                                   console.warn('File Rejected')
                               })
                           }}/>
                </div>
                {!!sheetData.headers.length && (
                    <div className="input-group-append">
                        <button className="btn btn-danger" onClick={() => dispatch({type: 'RESET_SHEET_DATA'})}>Clear
                        </button>
                    </div>
                )}
            </div>
            {!!sheetData.headers.length && (
                <>
                    <div>
                        <span className="font-family-bold">{`Headers(${sheetData.headers.length}): `}</span>
                        <span>{sheetData.headers.join(', ')}</span>
                    </div>
                    <div>
                        <span>{`${sheetData.rows.length} data row${sheetData.rows.length === 1 ? '' : 's'}`}</span>
                    </div>
                </>
            )}
        </>
    )
});
