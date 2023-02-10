import React from 'react'
import { Outlet } from 'react-router-dom'
// @ts-ignore
import { TransitionRoutes } from '@bomon/expand-route'

export default function () {
    return <TransitionRoutes>
        <Outlet />
    </TransitionRoutes>
}