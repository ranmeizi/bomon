import React from "react";

export type NavTypes = 'PUSH' | 'REPLACE' | 'POP'
export type States = 'entering' | 'entered' | 'exiting' | 'exited'

export type TransitionStyles = Record<NavTypes, Record<States, React.CSSProperties>>

export const CLASS_MAP = {
    PUSH: {
        entering: 'forward-enter',
        entered: 'forward-enter-active',
        exiting: 'forward-exit',
        exited: 'forward-exit-active',
    },
    REPLACE: {
        entering: 'forward-enter',
        entered: 'forward-enter-active',
        exiting: 'forward-exit',
        exited: 'forward-exit-active',
    },
    POP: {
        entering: 'back-enter',
        entered: 'back-enter-active',
        exiting: 'back-exit',
        exited: 'back-exit-active',
    }
}