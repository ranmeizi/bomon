import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter, Link } from "react-router-dom";
import routes from './routes'

const router = createBrowserRouter(routes)

export default function (props: any) {
    return <RouterProvider router={router}/>
}
