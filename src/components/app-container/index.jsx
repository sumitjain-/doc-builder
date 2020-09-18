import React from 'react';
import {connect} from 'react-redux';

export default connect(store => store)(function AppContainer(props) {
    console.log(props);
    return (
        <div className="app-container">
            App here
        </div>
    )
})
