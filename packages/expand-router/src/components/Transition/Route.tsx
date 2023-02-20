import { TransitionStyles, defaultTransitionStyles, NavTypes, States } from "../../CONSTANTS";
import React, { createRef } from "react";
import { Transition } from "react-transition-group";
import Transporter from "./Transporter";
import { merge } from 'lodash'
import { Location } from "react-router-dom";
import { withMyRouter, InjectRouterProps } from "./Hoc";
// TransitionRoute 在路由进入时 调用 Transition 动画

type TransitionRouteProps = {
    styles?: TransitionStyles,
    duration?: number
} & InjectRouterProps

class TransitionRoute extends React.Component<React.PropsWithChildren<TransitionRouteProps>> {

    state = {
        inProp: false,
        styles: merge(defaultTransitionStyles, this.props.styles)
    }

    shouldComponentUpdate(nextProps: Readonly<TransitionRouteProps>, nextState: Readonly<{}>, nextContext: any): boolean {
        if (nextProps.styles !== this.props.styles) {
            this.setState({
                styles: merge(defaultTransitionStyles, nextProps.styles)
            })
            return false
        }
        return true
    }

    componentDidMount(): void {
        this.setState({
            inProp: true
        })
    }

    render(): React.ReactNode {
        const { inProp, styles } = this.state
        const { navType, children } = this.props
        return <Transition in={inProp} timeout={{
            appear: 0,
            enter: 0,
            exit: 0,
        }}>
            {state => {
                return <Transporter _style={styles[navType][state as States]} originStyle={styles}>
                    {children}
                </Transporter>
            }}
        </Transition>
    }
}


export default withMyRouter({ useLocationKey: true })(TransitionRoute)