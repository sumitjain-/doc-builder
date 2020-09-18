import React from 'react';
import {connect} from "react-redux";

const UniqueTextFieldTools = connect(store => store)(({item, dispatch}) => {
        const [previewText, setPreviewText] = React.useState(item.previewText || item.key);

        function savePreviewPreferences() {
            dispatch({
                type: 'SET_TEXT_FIELDS',
                payload: [{
                    ...item,
                    previewText,
                }],
            })
        }

        function saveSizePreferences(e) {
            dispatch({
                type: 'SET_TEXT_FIELDS',
                payload: [{
                    ...item,
                    size: parseInt(e.target.value),
                }],
            })
        }

        function saveColorPreferences(e) {
            dispatch({
                type: 'SET_TEXT_FIELDS',
                payload: [{
                    ...item,
                    color: e.target.value,
                }],
            })
        }

    function saveWeightPreferences(e) {
        dispatch({
            type: 'SET_TEXT_FIELDS',
            payload: [{
                ...item,
                bold: !item.bold,
            }],
        })
    }

        return (
            <form className="form-group" onSubmit={function (e) {
                e.stopPropagation();
                e.preventDefault();

                savePreviewPreferences();
                return false;
            }}>
                <label htmlFor={`text-${item.key}`}>{item.key}</label>
                <br/>
                <input className="form-control" placeholder="Preview Text" type="text" value={previewText}
                       onChange={(e) => {
                           setPreviewText(e.target.value);
                       }}
                       onBlur={(e) => {
                           savePreviewPreferences();
                       }}
                />
                <div className="d-flex text-tools mt-1">
                    <input className="form-control" type="color" name={`color-${item.key}`} value={item.color}
                           onChange={saveColorPreferences}
                           onBlur={saveColorPreferences}
                    />
                    <input className="form-control" type="number" name={`size-${item.key}`} value={item.size}
                           onChange={saveSizePreferences}
                           onBlur={saveSizePreferences}
                    />
                    <span className="d-inline-block text-center form-control font-weight-bold no-select"
                          style={item.bold ? {background: '#ced4da', color: '#fff'} : {}}
                          onClick={saveWeightPreferences}>
                        B
                    </span>
                </div>
            </form>
        );
    }
)
export default connect(store => store)(function TextFieldsTools({userSettings, dispatch}) {
    const {textFields} = userSettings;
    return (
        <div className="mt-4">
            {textFields.map((field, idx) => (
                <UniqueTextFieldTools item={field} key={field.key}/>
            ))}
        </div>
    );
})
