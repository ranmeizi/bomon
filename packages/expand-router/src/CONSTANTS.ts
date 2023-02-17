import React from "react";

export const PROVIDER_CLASSNAME = 'transition-provider'

export type NavTypes = 'PUSH' | 'REPLACE' | 'POP'
export type States = 'entering' | 'entered' | 'exiting' | 'exited'

export type TransitionStyles = Record<NavTypes, Record<States, React.CSSProperties>>

export const defaultTransitionStyles: TransitionStyles = {
    PUSH: {
        entering: { opacity: 1, transform: 'translateX(100%)' },
        entered: { opacity: 1, transform: 'translateX(0)', transition: '3000ms' },
        exiting: { opacity: 1, transform: 'translateX(0)' },
        exited: { opacity: 1, transform: 'translateX(-100%)', transition: '3000ms' },
    },
    REPLACE: {
        entering: { opacity: 1, transform: 'translateX(100%)' },
        entered: { opacity: 1, transform: 'translateX(0)', transition: '3000ms' },
        exiting: { opacity: 1, transform: 'translateX(0)' },
        exited: { opacity: 1, transform: 'translateX(-100%)', transition: '3000ms' },
    },
    POP: {
        entering: { opacity: 1, transform: 'translateX(-100%)' },
        entered: { opacity: 1, transform: 'translateX(0)', transition: '3000ms' },
        exiting: { opacity: 1, transform: 'translateX(0)' },
        exited: { opacity: 1, transform: 'translateX(100%)', transition: '3000ms' },
    }
};