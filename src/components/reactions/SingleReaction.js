import React from 'react';



class SingleReaction extends React.Component {
    state = {
        postReactions: []
    }

    componentDidMount() {
        this.getPostReactions();
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

    render() {
        const {postReactions } = this.state
        const { reaction } = this.props
        return (
            <>
                <img src={reaction.img_url} /><span>{postReactions.count}</span>
            </>
        )
    }

}

export default SingleReaction;