import React, { useMemo } from 'react'
import { Routes, RoutesProps, matchPath, useLocation, useNavigationType, useMatches } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ExRouteProps } from '../type'

const ANIMATION_MAP = {
    REPLACE: 'forward',
    PUSH: 'forward',
    POP: 'back'
}

export default function (props: RoutesProps) {
    const { children } = props

    let location = useLocation();
    const NavType = useNavigationType()
    const routes = useMatches()
    console.log(routes)

    return <TransitionGroup
        className={'transition-group'}
        childFactory={child => React.cloneElement(
            child,
            { classNames: `transition-item ${ANIMATION_MAP[NavType]}` }
        )}
    >
        <CSSTransition
            timeout={500}
            key={location.pathname}
        >
            {children}
        </CSSTransition>
    </TransitionGroup>
}