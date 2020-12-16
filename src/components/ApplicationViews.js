import React from "react"
import { Route } from "react-router-dom"

import { CommentProvider } from "./comments/CommentProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <CommentProvider>
                <Route exact path="/comments/:postId(\d+)" />
            </CommentProvider>
        </main>
    </>
}
