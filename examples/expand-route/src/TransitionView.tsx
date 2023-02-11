import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
// @ts-ignore
import { TransitionOutlet } from '@bomon/expand-route'

export default function () {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/f/a', {
            replace: true
        })
    }, [])
    return <TransitionOutlet>
        <Outlet />
    </TransitionOutlet>
}