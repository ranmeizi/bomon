import React from "react";

export const PROVIDER_CLASSNAME = 'transition-provider'

export type NavTypes = 'PUSH' | 'REPLACE' | 'POP'
export type States = 'entering' | 'entered' | 'exiting' | 'exited'

export type TransitionStyles = Record<NavTypes, Record<States, React.CSSProperties>>

export const defaultTransitionStyles: TransitionStyles = {
    PUSH: {
        entering: { opacity: 0, transform: 'translateX(100%)' },
        entered: { opacity: 1, transform: 'translateX(0)' },
        exiting: { opacity: 1, transform: 'translateX(0)' },
        exited: { opacity: 0, transform: 'translateX(-100%)' },
    },
    REPLACE: {
        entering: { opacity: 1, transform: 'translateX(100%)' },
        entered: { opacity: 1, transform: 'translateX(0)' },
        exiting: { opacity: 1, transform: 'translateX(0)' },
        exited: { opacity: 0, transform: 'translateX(-100%)' },
    },
    POP: {
        entering: { opacity: 0, transform: 'translateX(100%)' },
        entered: { opacity: 1, transform: 'translateX(0)' },
        exiting: { opacity: 1, transform: 'translateX(0)' },
        exited: { opacity: 0, transform: 'translateX(-100%)' },
    }
};