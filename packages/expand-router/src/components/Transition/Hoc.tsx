import React from 'react'
import { useNavigationType, useLocation, NavigationType, Location } from "react-router-dom"

type HOC<InjectProps> = <Props extends InjectProps>(Component: React.ComponentType<Props>) => React.ComponentType<Omit<Props, keyof InjectProps>>;

type Options = {
    useLocationKey?: boolean
}

type InjectRouter = HOC<InjectRouterProps>

export type InjectRouterProps = {
    navType: NavigationType,
    location: Location
}

export function withMyRouter({ useLocationKey }: Options): InjectRouter {
    return function (Component) {
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