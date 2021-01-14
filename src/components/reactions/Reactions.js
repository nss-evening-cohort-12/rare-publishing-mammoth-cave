import React from 'react';
import SingleReaction from './SingleReaction'


class Reactions extends React.Component {
    state = {
        reactions: []
    }

    componentDidMount() {
        this.getAllReactions();
      }

    getAllReactions = () =>{
        return fetch("http://localhost:8000/reactions", {   
        headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`}
        }
          )
        .then(res => res.json())
        .then(res => {
          this.setState({ reactions: res.results })
        })
      }

    render() {
        const {reactions } = this.state
        const { postId } = this.props
        const singleReactions = reactions.map((Reaction) => <SingleReaction reaction={Reaction} postId={postId} />)
        return (
            <div>{postId && singleReactions}</div>

        )
    }

}

export default Reactions;
