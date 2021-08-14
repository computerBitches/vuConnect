import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ChatList = props => {
    return (
        <Fragment>
        <div className="col-left">
        <div className="col-content">
            <div className="messages">              
                <li>
                    <div className="avatar">
                        <div className="avatar-image">
                            <div className="status online"></div><img src="//www.gravatar.com/avatar/7eaabe6a6c10576b30b2fb03dedbcf16?s=200&r=pg&d=mm"/>
                        </div>
                    </div>
                    <h3>Nancy Scott</h3>
                    <p>Be there soon.</p>
                </li>

                <li>

                    <div className="avatar">
                        <div className="avatar-image">
                            <div className="status offline"></div><img src="//www.gravatar.com/avatar/7eaabe6a6c10576b30b2fb03dedbcf16?s=200&r=pg&d=mm"/>
                        </div>
                    </div>
                    <h3>Cynthia Castro</h3>
                    <p>You: Yep, let's do it!</p>

                </li>

                <li>

                    <div className="avatar">
                        <div className="avatar-image">
                            <div className="status online"></div><img src="//www.gravatar.com/avatar/7eaabe6a6c10576b30b2fb03dedbcf16?s=200&r=pg&d=mm"/>
                        </div>
                    </div>
                    <h3>Philip Nelson</h3>
                    <p>How does it look? I started making it a while ago</p>

                </li>

                <li>

                    <div className="avatar">
                        <div className="avatar-image">
                            <div className="status online"></div><img src="//www.gravatar.com/avatar/7eaabe6a6c10576b30b2fb03dedbcf16?s=200&r=pg&d=mm"/>
                        </div>
                    </div>
                    <h3>Theresa Hudson</h3>
                    <p>Goddamn Aliens! &#128514;</p>

                </li>

                <li>

                    <div className="avatar">
                        <div className="avatar-image">
                            <div className="status offline"></div><img src="//www.gravatar.com/avatar/7eaabe6a6c10576b30b2fb03dedbcf16?s=200&r=pg&d=mm"/>
                        </div>
                    </div>
                    <h3>Rebecca Jackson</h3>
                    <p>Hello</p>

                </li>

              
            </div>

        </div>

        </div>
        </Fragment>
    )
}

ChatList.propTypes = {

}

export default ChatList
