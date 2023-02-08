import React, { useMemo } from 'react'
import { Routes, RoutesProps, matchPath, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ExRouteProps } from './type'

const ANIMATION_MAP = {
    REPLACE: 'forward',
    PUSH: 'forward',
    POP: 'back'
}

export default function (props: RoutesProps) {
    const { children } = props

    const routes: ExRouteProps[] = props.routes
    let location = useLocation();

    // 是否需要过渡动画
    const transitionKey = useMemo(() => {
        const route = routes.find((_: any) => matchPath(location.pathname, _))
        return route?.isTransition
            ? route.path
            : 'notransition'
    }, [location.pathname])

    return <TransitionGroup
        className={'transition-group'}
        childFactory={child => React.cloneElement(
            child,
            { classNames: 'forward' }
        )}
    >
        <CSSTransition
            timeout={500}
            key={transitionKey as string}
        >
            <Routes location={location}>
                {children}
            </Routes>
        </CSSTransition>
    </TransitionGroup>
}