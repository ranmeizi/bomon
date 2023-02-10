import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter, Link } from "react-router-dom";
import routes from './routes'

const router = createBrowserRouter(routes)

export default function (props: any) {
    return <div>
        {/* <Link to='/'>home</Link>
        <Link to='/f/a'>A</Link>
        <Link to='/f/b'>B</Link> */}
        <RouterProvider router={router} />
    </div>
}
