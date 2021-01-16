import React from 'react';
import { withRouter } from 'react-router-dom';

class AllReactions extends React.Component {
    state = {
        reactions: [],
        img_url: null,
        label: null,
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

    changeUrlEvent =(e) => {
      e.preventDefault();
    this.setState({ img_url: e.target.value });
    }

    changeLabelEvent =(e) => {
      e.preventDefault();
    this.setState({ label: e.target.value });
    }

    addReaction = () => {
      const { img_url, label } = this.state
      const newReaction =  {
        label,
        img_url,
      }
      fetch("http://127.0.0.1:8000/reactions", {
      method: "POST",
      headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(newReaction)
      }).then(this.getAllReactions())
    }

    render() {
        const isAdmin = (localStorage.getItem("isAdmin") === "true")
        const {reactions } = this.state
        const ReactionIcons = reactions.map((Reaction) => <img alt={Reaction.id} src={Reaction.img_url} />)
        return (
          <>
            <h1>Reactions:</h1>
            <div className="row p-3">{ReactionIcons}</div>
            { isAdmin 
              ?
              <>
                <h2>Add a Reaction:</h2>
                <label htmlFor="reactionUrl"><h3>label:</h3></label>
                <input type="text" name="reactionLabe" onChange={this.changeLabelEvent}/>
                <label htmlFor="reactionUrl"><h3>Url:</h3></label>
                <input type="url" name="reactionUrl" onChange={this.changeUrlEvent}/>
                <button className="btn" onClick={this.addReaction}>Submit</button>
              </>
              :
              ""
            }
          </>
    )
}
}

export default withRouter(AllReactions)