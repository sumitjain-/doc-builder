import React from 'react';
import {connect} from "react-redux";
import TextField from "../text-field";

function Index({userSettings}) {
    const {bgImage, textFields} = userSettings;
    const previewContainerRef = React.useRef(null);
    const expandFactor = 3;
    return (
        <div className="col-9">
            <h2>Preview</h2>
            <div className="preview-box position-relative" ref={previewContainerRef}
                 style={{width: 297 * expandFactor, height: 210 * expandFactor}}>
                {!!bgImage && (
                    <img className="no-select" src={bgImage} alt="" style={{
                        width: '100%',
                        height: '100%',
                    }}/>
                )}
                {textFields.map((obj, idx) => (
                    <TextField item={obj} key={obj.key} previewContainerRef={previewContainerRef} idx={idx} />
                ))}
            </div>


        </div>
    );
}

export default connect(store => store)(Index);
