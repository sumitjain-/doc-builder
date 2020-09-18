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

        return (
            <form onSubmit={function (e) {
                e.stopPropagation();
                e.preventDefault();

                savePreviewPreferences();

                return false;
            }}>
                <label htmlFor={`text-${item.key}`}>{item.key}</label>
                <br/>
                <input placeholder="Preview Text" type="text" value={previewText}
                       onChange={(e) => {
                           setPreviewText(e.target.value);
                       }}
                       onBlur={(e) => {
                           savePreviewPreferences();
                       }}
                />
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
