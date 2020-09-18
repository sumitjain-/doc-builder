import React from 'react';
import {connect} from "react-redux";
import {acceptExcelData} from "../../utils";

export default connect(store => store)(function Sidebar({userSettings, dispatch}) {
    const {sheetData} = userSettings;
    console.log(sheetData);
    return (
        <div className="sidebar col-3">
            <label htmlFor="file-picker">Choose Data File</label>
            <input type="file" id="file-picker" onChange={function (e) {
                acceptExcelData(e)
                    .then(d => {
                        dispatch({
                            type: "SET_SHEET_DATA",
                            payload: d,
                        });
                    })
            }} />
            {
                !!sheetData.headers.length && (
                    <>
                        <h3>Headers</h3>
                        <ul>
                            {sheetData.headers.map(a => (
                                <li key={a}>{a}</li>
                            ))}
                        </ul>
                    </>
                )
            }
        </div>
    )
});
