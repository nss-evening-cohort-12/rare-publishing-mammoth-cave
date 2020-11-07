import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import { UsersContext } from './UsersProvider';
import { User } from './User'

export const Users = () => {
    const {users, getAllUsers, setUsers} = useContext(UsersContext);

    useEffect(() => {
      getAllUsers()
    }, [] )

    useEffect(() => {
      setUsers(users)
    }, [users])

    return <>
         <div>
        <h1 className="text-center mt-3">All Users</h1>
        <div className="post-container">
        {users.map(user => {return <><User key={user.id} user={user} /><hr/></>})}
        </div>
         </div>
        
    </>
}
