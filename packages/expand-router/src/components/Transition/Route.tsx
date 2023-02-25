import { TransitionStyles, defaultTransitionStyles, States } from "../../CONSTANTS";
import React from "react";
import { Transition } from "react-transition-group";
import Transporter from "./Transporter";
import { merge } from 'lodash-es'
import { withMyRouter, InjectRouterProps } from "./Hoc";
// TransitionRoute 在路由进入时 调用 Transition 动画

type TransitionRouteProps = {
    styles?: TransitionStyles,
    cloneNode?: boolean // 克隆dom节点，当子节点dom操作时在之前克隆，以显示残像，默认关闭的，这样会使路由切换变卡
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
        const { navType, children, cloneNode } = this.props
        console.log(cloneNode)
        return <Transition in={inProp} timeout={0}>
            {state => {
                return <Transporter _style={styles[navType][state as States]} cloneNode={!!cloneNode} originStyle={styles}>
                    {children}
                </Transporter>
            }}
        </Transition>
    }
}


export default withMyRouter({ useLocationKey: true })(TransitionRoute)