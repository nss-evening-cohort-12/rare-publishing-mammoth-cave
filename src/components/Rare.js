import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Users } from "./users/Users"
import MyPosts from './posts/MyPosts'
import NewPost from './posts/NewPost'
import Posts from './posts/Posts'
import SinglePost from './posts/SinglePost'
import EditPost from './posts/EditPost'
import PostByCategory from './posts/PostByCategory'
import { UsersProvider } from "./users/UsersProvider"
import Categories from "./categories/Categories"

export const Rare = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <NavBar />
                    <ApplicationViews />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <Redirect to="/" />
            } else {
                return <Login />
            }
        }} />

        <Route path="/register" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <Redirect to="/" />
            } else {
                return <Register />
            }
        }} />
        
        <Route path="/users" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                        <UsersProvider>
                            <Users />
                        </UsersProvider>
                    </>
            } else {
                return <Login />
            }
            }} />

        <Route path="/posts" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <Posts />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/newpost" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <NewPost />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/myposts" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <MyPosts />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/viewpost/:postId" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <SinglePost />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/editpost/:postId" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <EditPost />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} /> 

        <Route path="/category/:categoryId" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <PostByCategory />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} /> 

        <Route path="/categories" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <Categories />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />


        
    </>
)
