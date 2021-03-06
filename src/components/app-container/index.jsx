import React from 'react';
import {connect} from 'react-redux';
import Sidebar from '../sidebar';
import Preview from '../preview';

export default connect(store => store)(function AppContainer() {
    return (
        <div className="app-container">
            <div className="row">
                <Sidebar />
                <Preview />
            </div>
        </div>
    )
})
