import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tag from './Tag';
import './Tags.css'

class Tags extends React.Component {
    state = {
        tags: [],
    }

    componentDidMount() {
        this.getAllTags();
    }

    getAllTags = () => {
        return fetch("http://localhost:8000/tags", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
        .then(res => {
            this.setState({ tags: res.results })
        })
    }

    render() {
        const { tags } = this.state;
        const newTag = `/newtag`
        const tag = tags.map ((tag) => <Tag key={tag.id} getAllTags={this.getAllTags} tag={tag}/>)
        return(
            <div className="text-center">
                <h1 className="text-center mt-3">All Tags</h1>
                <Link to={newTag}><i className="fas fa-plus-square"></i> New Tag</Link>
                <div className="tag-container">
                    {tag}
                </div>
            </div>
        )
    }
}

export default withRouter(Tags);
