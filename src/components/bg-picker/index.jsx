import React from 'react';
import {connect} from "react-redux";

export default connect(store => store)(function BGPicker ({dispatch}) {
    return (<div className="mt-4">
        <label htmlFor="bg-picker">Choose Background Image</label>
        <input type="file" name="bg-picker" id="bg-picker" onChange={function (e) {
            const file = e.target.files && e.target.files[0];
            const reader = new FileReader();
            reader.onload = (ev) => {
                /* Parse data */
                const data = ev.target.result;
                dispatch({
                    type: 'SET_BG_DATA',
                    payload: data,
                })
            }
            reader.readAsDataURL(file);
        }} />
    </div>)
})
