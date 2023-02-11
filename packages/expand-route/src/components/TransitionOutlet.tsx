import React from 'react'
import { RoutesProps, RouteObject, useNavigationType } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ANIMATION_MAP = {
    REPLACE: 'forward',
    PUSH: 'forward',
    POP: 'back'
}

interface TransitionOutletProps extends RoutesProps {
    transitionIds?: RouteObject['id']
}

export default function TransitionOutlet(props: TransitionOutletProps) {
    const { children, transitionIds = [] } = props

    const NavType = useNavigationType()

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