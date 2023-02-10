import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function () {
    return <div>
        <Link to='/'>home</Link>
        <Link to='/f/a'>A</Link>
        <Link to='/f/b'>B</Link>
        <Outlet />
    </div>
}