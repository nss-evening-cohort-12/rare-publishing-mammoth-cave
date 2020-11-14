import React from "react";
import {Link} from 'react-router-dom';

export const User = ({ user }) => {
  const userDetails = `/user/${user.id}`;
  return (<>
    <Link to={userDetails}>Name: {user.first_name} {user.last_name}<br/>
    Email: {user.email}</Link>
  </>
  )
}
