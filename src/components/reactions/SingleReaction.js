import React from 'react';
import './singleReaction.css'



class SingleReaction extends React.Component {
    state = {
        postReactions: [],
        userReaction: [],
    }

    componentDidMount() {
        this.getPostReactions();
        this.checkUserReaction();
      }

    getPostReactions = () =>{
        const postId = this.props.postId
        const reaction = this.props.reaction
        if (postId) {
        return fetch(`http://localhost:8000/postreactions?post_id=${postId}&reaction_id=${reaction.id}`, {   
        headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`}
        }
          )
        .then(res => res.json())
        .then(res => {
          this.setState({ postReactions: res })
        })
      }

    }

    toggleReaction = (e) => {
      const {deleteReaction } = this.props
      const postId = this.props.postId
      const reaction = this.props.reaction
      const userId = localStorage.getItem("user_id")
      const {userReaction} = this.state
      this.checkUserReaction()
      if (userReaction.length > 0) {
        fetch(`http://localhost:8000/postreactions/${userReaction[0].id}`, {
          method: "DELETE",
           headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        }).then(() => this.getPostReactions())
        .then(this.checkUserReaction())
      }
      else {
        const newPostReaction = {
          post_id: postId,
          user_id: userId,
          reaction_id: reaction.id
        }
        fetch('http://localhost:8000/postreactions', {
      method: "POST",
      headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(
        newPostReaction
      )
    })
      .then(res => res.json())
      .then(res => {
        this.getPostReactions()
      })
      .then(this.checkUserReaction())
      }
      
    }

    checkUserReaction = () => {
      const postId = this.props.postId
      const reaction = this.props.reaction
      const userId = localStorage.getItem("user_id")

      return fetch(`http://localhost:8000/postreactions?post_id=${postId}&reaction_id=${reaction.id}&user_id=${userId}`, {   
        headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`}
        }
          )
        .then(res => res.json())
        .then(res => {
          this.setState({ userReaction: res.results})
        })
    }

    render() {
        const {postReactions, userReaction } = this.state
        const { reaction } = this.props
        return (
            <div>
                <img onClick={this.toggleReaction} style={ { opacity: userReaction.length >0 ? 1 : .4,  background: userReaction.length >0 ? 'antiquewhite' : 'rgba(254, 254, 254, 1)'} } className="reaction"src={reaction.img_url} /><span className="count">{postReactions.count}</span>
            </div>
        )
    }

}

export default SingleReaction;
