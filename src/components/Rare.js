import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import Users  from "./users/Users"
import MyPosts from './posts/MyPosts'
import NewPost from './posts/NewPost'
import Posts from './posts/Posts'
import SinglePost from './posts/SinglePost'
import EditPost from './posts/EditPost'
import PostByCategory from './posts/PostByCategory'
import Categories from "./categories/Categories"
import NewCategory from './categories/NewCategory'
import DetailedUser from './users/detailedUser'
import EditCategory from './categories/EditCategory'
import NewTag from './tags/NewTag'
import Tags from './tags/Tags'
import EditTag from './tags/EditTag'
import CommentsPost from "./comments/CommentsPost"
import Comments from "./comments/Comments"
import SubscribedPosts from './posts/SubscribedPosts'
import UserPosts from './posts/UserPosts'
import User from "./users/User"
import AllReactions from "./reactions/AllReactions"

export const Rare = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <NavBar />
                    <ApplicationViews />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={() => {
            if (localStorage.getItem("token")) {
                return <Redirect to="/" />
            } else {
                return <Login />
            }
        }} />

        <Route path="/register" render={() => {
            if (localStorage.getItem("token")) {
                return <Redirect to="/" />
            } else {
                return <Register />
            }
        }} />
        
        <Route exact path="/" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <SubscribedPosts />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/users/:userId" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <DetailedUser />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route exact path="/users" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                        <Users />
                    </>
            } else {
                return <Login />
            }
            }} />

        <Route path="/posts" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <Posts />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/newpost" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <NewPost />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/myposts" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <MyPosts />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/viewpost/:postId" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <SinglePost />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/editpost/:postId" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <EditPost />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} /> 

        <Route path="/category/:categoryId" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <PostByCategory />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} /> 

        <Route path="/categories" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <Categories />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/newcategory" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <NewCategory />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/editcategory/:categoryId" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <EditCategory />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} /> 

        <Route path="/newtag" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <NewTag />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/tags" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <Tags />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/edittag/:tagId" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <EditTag />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/comments/:postId" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <CommentsPost />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/commentslist" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <Comments />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/usersposts/:userId" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <UserPosts />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />
        <Route path="/reactions" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <AllReactions />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />
    </>
)
