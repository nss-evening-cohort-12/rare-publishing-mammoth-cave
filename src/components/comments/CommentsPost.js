import React from 'react';
import { withRouter } from 'react-router-dom';

import moment from 'moment';

import Comment from './Comment';

class CommentsPost extends React.Component {
  state = {
    comments: [],
    newCommentSubject: '',
    newCommentContent: '',
  }

  componentDidMount() {
    this.getCommentsByPostId();
  }

  changeCommentContent = (e) => {
    e.preventDefault();
    this.setState({ newCommentContent: e.target.value });
  }

  changeCommentSubject = (e) => {
    e.preventDefault();
    this.setState({ newCommentSubject: e.target.value });
  }

  createNewComment = (e) => {
    e.preventDefault();
    const { newCommentContent, newCommentSubject} = this.state
    const user_id = localStorage.getItem("user_id")
    const creation_date = Date.now()
    const{ postId } = this.props.match.params;

    const newComment = {
      user_id,
      post_id: this.props.match.params.postId,
      created_on: moment(creation_date).format('YYYY-MM-DDThh:mm'),
      subject: newCommentSubject,
      content: newCommentContent,
    }

    fetch('http://localhost:8000/comments', {
      method: "POST",
      headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(
        newComment
      )
    })
      .then(res => res.json())
      .then(res => {
        this.props.history.push(`/comments/${postId}`)
        this.getCommentsByPostId()
      })
  }

  // editComment = (e) => {
  //   const { newCommentContent, newCommentSubject} = this.state
  //   const user_id = localStorage.getItem("user_id")
  //   const creation_date = Date.now()
  //   const{ postId, commentId } = this.props.match.params;

  //   const editedComment = {
  //     user_id,
  //     post_id: this.props.match.params.postId,
  //     creation_date,
  //     subject: newCommentSubject,
  //     content: newCommentContent,
  //   }

  //   fetch(`http://localhost:8000/comments/${commentId}`, {
  //     method: "PUT",
  //     headers: {
  //         "Authorization": `Token ${localStorage.getItem("token")}`,
  //         "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(
  //       editedComment
  //     )
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       this.props.history.push(`/comments/${postId}`)
  //       this.getCommentsByPostId()
  //     })
  // }

  getCommentsByPostId = () => {
    const{ postId } = this.props.match.params;
    // console.warn(postId)
    return fetch(`http://localhost:8000/comments?post_id=${postId}`, {   
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`}
      }
        )
    .then(res => res.json())
    .then(res => {
      this.setState({ comments: res.results })
    })
  }

  deleteComment = (commentId) => {
    return fetch(`http://localhost:8000/comments/${commentId}`, {
      method: "DELETE"
    }).then(() => this.getCommentsByPostId())
  }
   

  render() {
    const { comments, newCommentContent, newCommentSubject } = this.state;
    const comment = comments.map((comment) => <Comment key={comment.id} comment={comment} getCommentsByPostId={this.getCommentsByPostId} deleteComment={this.deleteComment}/>)
    return (
      <div className="text-center">
        <h1 className="text-center">Comments</h1>
        <div className="make new comment">
          <form>
            <div className="form-group">
              <h5>Add A New Comment:</h5>
                <h6>Subject:</h6>
                  <textarea type="text"
                            name="subjectInput"
                            row="1" 
                            className="col-6" 
                            id="commentSubject" 
                            onChange={this.changeCommentSubject}
                            value={newCommentSubject} />
                            <br></br>
                  <h6>Comment:</h6>
                  <textarea id="newComment" 
                            name="comment" 
                            row="5" 
                            className="col-6" 
                            onChange={this.changeCommentContent}
                            value={newCommentContent} />
                            <br></br>
                  <button onClick={this.createNewComment}>Add Comment</button> 
            </div>
          </form>
        </div>
        <div className="comment-container">
          {comment}
        </div>
      </div>
    )
  }
}

export default withRouter(CommentsPost);