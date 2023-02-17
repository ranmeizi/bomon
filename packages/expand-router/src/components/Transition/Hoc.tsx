import React from 'react'
import { useNavigationType, useLocation } from "react-router-dom"

export function withMyRouter({
    useLocationKey
}: {
    useLocationKey?: boolean
}) {
    // @ts-ignore
    return Component => props => {
        const navType = useNavigationType()
        const location = useLocation()

        if (useLocationKey) {
            props.key = location.pathname + location.search
        }

        return <Component {...props} navType={navType} location={location} />
    }
}