import React, { useContext, useEffect } from 'react';
import moment from 'moment';

import { CommentContext } from "./CommentProvider.js"
import { withRouter } from 'react-router-dom';
// import { confirmAlert } from 'react-confirm-alert';

import 'react-confirm-alert/src/react-confirm-alert.css'


export const CommentList = (props) => {
  const { comments, getComments } = useContext(CommentContext)
  // const creation_date = moment(comment.creation_date).format('MMM Do, yyyy');

  useEffect(() => {
    getComments()
  }, [])
  

  // deletePostEvent = () => {
  //   const { deleteComment, comment } = this.props
  //   confirmAlert({
  //     customUI: ({ onClose }) => {
  //       return (
  //         <div className="custom-ui">
  //           <h1>Delete?</h1>
  //           <p>Are you sure you want to proceed?</p>
  //           <button className="mr-3 dialog-btn" onClick={onClose}><h4>No</h4></button>
  //           <button className="dialog-btn"
  //             onClick={() => {
  //               deleteComment(comment.id);
  //               onClose();}}>
  //                 <h4>Yes, Delete this Comment</h4>
  //           </button>
  //         </div>
  //       );
  //     }
  //   });
  // };

  // editEvent = (e) =>
  // {
  //   e.preventDefault();
  //   const {comment, editComment } = this.props
  //   editComment(comment)
  // }

    return(
      <article className="comment">
        {
            comments.map(comment => {
              return<section>
                  <h5>{comment.subject}</h5>
                  <h6>{`${comment.user.first_name} ${comment.user.last_name} - ${comment.creation_date}`}</h6>
                  <p>{comment.content}</p>
                  </section> 
          })
        }
      </article>
    )
}
