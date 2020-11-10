import React from 'react'

class NewCategory extends React.Component {
  state = {
    name: '',
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  createCategory = (e) => {
    e.preventDefault();
    const { name } = this.state

    const new_category = {
      name: name
    }
    fetch("http://127.0.0.1:8088/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        new_category
      )
    })
      .then(res => res.json())
      .then(res => {
        console.error(res);
        this.props.history.push('/categories')
      })
  }

  render(){}
}