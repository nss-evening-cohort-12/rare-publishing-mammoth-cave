import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"
import Logo from "../nav/raresteak.png"

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const history = useHistory()
    const bio = useRef()
    const imgUrl = useRef()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": email.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "bio": bio.current.value,
                "imgUrl": imgUrl.current.value,
            }
    
            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("valid" in res && res.valid) {
                        localStorage.setItem("user_id", res.user_id )
                        localStorage.setItem("token", res.token)
                        localStorage.setItem("isAdmin", res.isAdmin)
                        history.push("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login mt-4" onSubmit={handleRegister}>
                <h1 className="text-center">Rare</h1>
                <fieldset>
                    <div className="mt-5">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <img className="login__logo" src={Logo} />
                        </div>
                    </div>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="imgUrl">Profile Image </label>
                    <input type="text" ref={imgUrl} name="imgUrl" className="form-control" placeholder="A website link to a picture of you!" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <textarea ref={bio} name="bio" className="form-control" placeholder="Let others know a little bit about you..." />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register mt-4 mb-4">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}
