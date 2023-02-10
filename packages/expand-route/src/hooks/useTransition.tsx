import * as React from 'react'
import { useNavigationType, useMatches, UNSAFE_LocationContext, useInRouterContext, useNavigate } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

// const ANIMATION_MAP = {
//     REPLACE: 'forward',
//     PUSH: 'forward',
//     POP: 'back'
// }

// console.log('caonima', window.React)
// @ts-ignore
// const React = window.React
// export default function useTransition() {
//     const NavType = useNavigationType()
//     const routes = useMatches()

//     return function transition(node: React.ReactNode) {
//         return <TransitionGroup
//             className={'transition-group'}
//             childFactory={child => React.cloneElement(
//                 child,
//                 { classNames: ANIMATION_MAP[NavType] }
//             )}
//         >
//             <CSSTransition
//                 timeout={500}
//                 key={'a'}
//             >
//                 {node}
//             </CSSTransition>
//         </TransitionGroup>
//     }
// }

export function useTransition() {
    // const NavType = useNavigationType()
    const navigate = useNavigate()
    // @ts-ignore
    return function transition(node: React.ReactNode) {
        return <div>
            <div onClick={() => {
                navigate('/')
            }}>点我</div>
            {node}
        </div>
    }
}