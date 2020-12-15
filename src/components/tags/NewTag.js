import React from 'react';
import { withRouter } from 'react-router-dom';
import './NewTag.css';

class NewTag extends React.Component {
    state = {
        name: '',
    }

    changeNameEvent = (e) => {
        e.preventDefault();
        this.setState({ name: e.target.value });
    }

    createTag = (e) => {
        e.preventDefault();
        const { name } = this.state

        const newTag = {
            label: name
        }
        fetch("http://127.0.0.1:8000/tags", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                newTag
            )
        })
        .then(res => res.json())
        .then(res => {
            this.props.history.push('/tags')
        })
    }

    render() {
        return(
            <div className="newTagForm">
                <h2 className="text-center">Create New Tag</h2>
                <div className="newFormContainer">
                    <form className="col-4 realForm">
                        <div className="form-group">
                            <label htmlFor="name">Tag Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Input Tag Name"
                                onChange={this.changeNameEvent}
                            />
                        </div>
                        <button className="btn-success" onClick={this.createTag}>Create Tag</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(NewTag);
