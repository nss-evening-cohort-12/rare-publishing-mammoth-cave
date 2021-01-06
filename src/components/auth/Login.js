import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"
import Logo from "../nav/raresteak.png"


export const Login = () => {
    const email = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: email.current.value,
                password: password.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid) {
                    localStorage.setItem("user_id", res.user_id )
                    localStorage.setItem("token", res.token)
                    localStorage.setItem("isAdmin", res.isAdmin)
                    history.push("/myposts")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Email or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login mt-4" onSubmit={handleLogin}>
                    <h1 className="text-center">RARE</h1>
                    <div className="mt-5">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <img className="login__logo" src={Logo} />
                        </div>
                    </div>
                    <fieldset className="log-field">
                        <label htmlFor="inputEmail"> Email address </label>
                        <input ref={email} type="email" id="email" className="form-control" defaultValue="me@me.com" placeholder="Email address" required autoFocus />
                    </fieldset>
                    <fieldset className="log-field">
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password" id="password" className="form-control" defaultValue="password" placeholder="Password" required />
                    </fieldset>
                    <fieldset style={{
                        textAlign:"center"
                    }}>
                        <button className="btn btn-1" type="submit">Login</button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register mt-4">
                <Link to="/register">Don't have an account yet? Click here to sign up!</Link>
            </section>
        </main>
    )
}
