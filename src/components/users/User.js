import React, {useContext} from "react";
import { UsersContext } from "./UsersProvider"

export const User = ({ user }) => {
  return (<>
    Name: {user.first_name} {user.last_name}<br/>
    Email: {user.email}
  </>
  )
}
