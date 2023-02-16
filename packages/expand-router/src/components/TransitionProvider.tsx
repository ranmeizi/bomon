import { PROVIDER_CLASSNAME } from '../CONSTANTS'
import React from 'react'
import { Outlet } from 'react-router-dom'


export default function TransitionProvider({ children }: React.PropsWithChildren) {
    return <div className={PROVIDER_CLASSNAME}>
        {children}
    </div>
}
