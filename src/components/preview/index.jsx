import React from 'react';
import {connect} from "react-redux";
import TextField from "../text-field";
import {canvasDimensions} from '../../constants';

function Index({userSettings}) {
    const {bgImage, textFields} = userSettings;
    const previewContainerRef = React.useRef(null);

    return (
        <div className="col-9">
            <h2>Preview</h2>
            <div className="preview-box position-relative shadow-1" ref={previewContainerRef}
                 style={{...canvasDimensions}}>
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
