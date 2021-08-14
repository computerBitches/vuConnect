import React, { Fragment} from 'react'
import './style.css'
import './normalize.css'
import ChatboxHeader from './ChatBoxHeader';
import Chatee from './Chatee';
import ChatList from './ChatList';
import Messages from './Messages';
import PropTypes from 'prop-types'

const index = props => {
    return (
        <Fragment>
            <div class="wrapper">
                <ChatboxHeader/>
                <main>
                    <ChatList/>
                    <Messages />
                    <Chatee /> 
                </main>
            </div>
        </Fragment>
    )
}

index.propTypes = {

}

export default index
