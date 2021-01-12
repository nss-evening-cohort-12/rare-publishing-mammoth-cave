import React, { useState } from "react";

export const UsersContext = React.createContext();

export const UsersProvider = props => {
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    return fetch(`http://localhost:8000/rareusers`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`}
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ users: res.results })
      })
  }

  return(
    <UsersContext.Provider
      value={{users, getAllUsers, setUsers}}
    >
      {props.children}
    </UsersContext.Provider>
  )
}
