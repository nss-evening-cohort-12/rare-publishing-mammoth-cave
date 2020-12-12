import React, { useRef } from "react"
import { useHistory } from "react-router-dom"

export const NewTag = () => {
    const tag_name = useRef()
    const newTagError = useRef()
    const history = useHistory()

    const handleSubmitTag = (e) => {
        e.preventDefault()

        return fetch("http://127.0.0.1:8088/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                tag_name: tag_name.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid) {
                    history.push("/tags")
                }
                else {
                    newTagError.current.showModal()
                }
            })
    }

    return (
        <main className="container--tag">
            <dialog className="dialog dialog--newTag" ref={newTagError}>
                <div>There was an error creating this tag.</div>
                <button className="button--close" onClick={e => newTagError.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--newTag" onSubmit={handleSubmitTag}>
                    <h2 className="text-center mt-3">Create New Tag</h2>
                    <fieldset>
                        <label htmlFor="inputTagName">Tag Name</label>
                        <input ref={tag_name} type="text" id="tag_name" className="form-control" defaultValue="" placeholder="Tag Name" required autoFocus />
                    </fieldset>
                    <fieldset style={{ textAlign: "center" }}>
                        <button className="btn btn-1"
                            type="submit">Create New Tag</button>
                    </fieldset>
                </form>
            </section>
        </main>
    )
}
