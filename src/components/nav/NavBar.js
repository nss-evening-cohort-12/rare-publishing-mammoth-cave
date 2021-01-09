import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./raresteak.png"

export const NavBar = () => {
    const history = useHistory()
    const isAdmin = (localStorage.getItem("isAdmin") === "true")
    return (
        <ul className="navbar">
            <li className="navbar__item">
               <Link to="/"> <img className="navbar__logo mr-3" alt="" src={Logo} /></Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/posts">All Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/myposts">My Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/categories">Category Manager</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/tags">Tag Manager</Link>
            </li>
            {
                isAdmin ? (
                    <li className="navbar__item">
                    <Link className="navbar__link" to="/users">User Manager</Link>
                </li>    
                ) : (
                    ""
                )
            }
            {
                (localStorage.getItem("token") !== null) ?
                    <li className="nav-item">
                        <button className="navbar__link log-button"
                            onClick={() => {
                                localStorage.removeItem("token")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
