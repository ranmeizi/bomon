import React from 'react'
import { useNavigationType, useLocation } from "react-router-dom"

export function withMyRouter({
    useLocationKey
}: {
    useLocationKey?: boolean
}) {
    return function (Component: any): any {
        return (props: any) => {
            const navType = useNavigationType()
            const location = useLocation()

            return <Component
                {...props}
                {...useLocationKey ? { key: location.pathname + location.search } : {}}
                navType={navType}
                location={location}
            />
        }
    }
}