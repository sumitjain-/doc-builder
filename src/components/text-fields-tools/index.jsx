import React from 'react';
import {connect} from "react-redux";
import {generateNewTextField} from "../../utils";

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
            <form className="form-group p-2 bg-light rounded shadow-1" onSubmit={function (e) {
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
                <button type="button" className="btn btn-danger mt-2" onClick={() => {
                    const confirmation = window.confirm(`Are you sure you want to remove ${item.key} from the template?`);
                    if (confirmation) {
                        dispatch({
                            type: 'REMOVE_TEXT_FIELD',
                            payload: item.key,
                        });
                    }
                }}>
                    Remove
                </button>
            </form>
        );
    }
)

const AddStaticText = connect(store => store)(function ({userSettings, dispatch}) {
    return (
        <button className="btn btn-secondary"
                onClick={() => {
                    dispatch({
                        type: 'SET_TEXT_FIELDS',
                        payload: [generateNewTextField(userSettings.textFields)],
                    });
                }}
        >Add Static Text</button>
    );
});

const AddDynamicText = connect(store => store)(function ({userSettings, dispatch, missingFields}) {
    const selectRef = React.useRef(null);
    return (
        <>
            <select name="" id="" className="form-control mt-2" ref={selectRef}>
                {missingFields.map(a => (
                    <option key={a} value={a}>{a}</option>
                ))}
            </select>
            <button className="btn btn-secondary mt-2"
                    onClick={() => {
                        dispatch({
                            type: 'SET_TEXT_FIELDS',
                            payload: [generateNewTextField(userSettings.textFields, selectRef.current.value)],
                        });
                    }}
            >Add Dynamic Field
            </button>
        </>
    );
});


export default connect(store => store)(function TextFieldsTools({userSettings}) {
    const {textFields} = userSettings;
    const textFieldKeys = textFields.map(a => a.key);
    const missingFields = userSettings.sheetData.headers.filter(a => !textFieldKeys.includes(a));

    return (
        <div className="mt-4">
            {textFields.map((field, idx) => (
                <UniqueTextFieldTools item={field} key={field.key}/>
            ))}
            <AddStaticText/>
            {!!missingFields.length && (
                <AddDynamicText missingFields={missingFields}/>
            )}
        </div>
    );
})
