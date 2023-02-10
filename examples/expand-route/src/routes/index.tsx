import React, { Children } from "react"
import TransitionView from "@/TransitionView"
import LinkHeadView from "@/LinkHeadView"
import A from "@/views/ViewA"
import B from "@/views/ViewB"

export default [
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