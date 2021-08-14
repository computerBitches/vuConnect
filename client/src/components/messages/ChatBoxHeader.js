import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ChatBoxHeader = props => {
    return <Fragment>

    <header>
        <div className="chat-container">
            <div className="middle">
                <h3>Theresa Hudson</h3>
                <p>MessageBox</p>
            </div>
            {/* <div Name="right">
                <div className="username">
                    <div className="settings"><img src="./img/settings.svg"/></div>
                    Patrcia Fields
                </div>
                <div className="avatar"><img src="./img/avatar.png"/></div>
            </div> */}
        </div>
    </header>

    </Fragment>
}
export default ChatBoxHeader
