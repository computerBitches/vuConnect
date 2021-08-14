import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { Link, withRouter  } from 'react-router-dom'
import { addLike, removeLike, removePost } from '../../actions/post';

const PostItem = ({ addLike, removeLike, removePost, auth, post:{ _id, name, avatar, text, date, likes, comments, user }}) => {
    return  <div class="post bg-white p-1 my-1">
    <div>
      <a href="profile.html">
        <img
          class="round-img"
          src={ avatar }
          alt=""
        />
        <h4>{ name }</h4>
      </a>
    </div>
    <div>
      <p class="my-1">
          {
              text
          }
      </p>
       <p class="post-date">
         Posted on {'  '}
       <Moment format='YYYY/MM/DD'> 
                                    {date} 
        </Moment>
        {/* Posted on <Moment format='YYYY/MD/DD'> { date }</Moment> */}
      </p>
      <button type="button" class="btn btn-light" onClick = { e => addLike(_id)}>
        <i class="fas fa-thumbs-up"></i>
         {' '}
            {
               likes.length > 0 && (
                <span> { likes.length } </span>
               )
            }
      </button>
      <button type="button" class="btn btn-light" onClick = { e => removeLike(_id)}>
        <i class="fas fa-thumbs-down"></i>
      </button>
      <Link to={`/posts/${_id}`} class="btn btn-primary">
            Discussion {' '}
                {
                    comments.length > 0 && ( 
                    <span class='comment-count'> { comments.length } </span>
                    )
                } 
      </Link>
      { !auth.loading && user === auth.user._id && (
        <button type="button" class="btn btn-danger" onClick = { e => removePost(_id)}>
        <i class="fas fa-times"></i>
    </button>
      )}
      
    </div>
  </div>
}
PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect( mapStateToProps, { addLike, removeLike, removePost } ) (withRouter(PostItem))

