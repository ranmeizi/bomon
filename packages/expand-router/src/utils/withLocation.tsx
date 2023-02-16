import React from "react";
import { useLocation } from "react-router-dom";

export default function withLocation(Component: React.ComponentType) {
    return (props: any) => {
        const location = useLocation()
        return <Component key={location.pathname} {...props} location={location} />
    }
}