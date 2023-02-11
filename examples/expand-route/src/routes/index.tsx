import React, { Children } from "react"
import { RouteObject } from 'react-router-dom'
import TransitionView from "@/TransitionView"
import LinkHeadView from "@/LinkHeadView"
import A from "@/views/ViewA"
import B from "@/views/ViewB"

async function withRConfig() {
    return {
        isTransition: true,
        isCache: true
    }
}

const routes: RouteObject[] = [
    {
        path: "/",
        element: <TransitionView />,
        children: [
            {
                path: '/f',
                element: <LinkHeadView />,
                children: [
                    {
                        path: "/f/a",
                        index: true,
                        element: <A />
                    },
                    {
                        path: "/f/b",
                        element: <B />
                    },
                ]
            }

        ],
    },
]

export default routes