import { TransitionStyles, defaultTransitionStyles, NavTypes, States } from "../../CONSTANTS";
import React, { createRef } from "react";
import { Transition } from "react-transition-group";
import Transporter from "./Transporter";
import { merge } from 'lodash'
import { useLocation, useNavigationType, NavigationType, Location } from "react-router-dom";

// TransitionRoute 在路由进入时 调用 Transition 动画

interface TransitionRouteProps {
    styles?: TransitionStyles,
    duration?: number
}

type WithMyRouter<T> = T & {
    navType: NavTypes,
    location: Location
}

class TransitionRoute extends React.Component<WithMyRouter<React.PropsWithChildren<TransitionRouteProps>>> {

    state = {
        inProp: false,
        styles: merge(defaultTransitionStyles, this.props.styles)
    }

    shouldComponentUpdate(nextProps: Readonly<WithMyRouter<TransitionRouteProps>>, nextState: Readonly<{}>, nextContext: any): boolean {
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
        return <div>
            <Transition in={inProp} timeout={{
                appear: 0,
                enter: 500,
                exit: 0,
            }}>
                {state => {
                    return <Transporter _style={styles[navType][state as States]} originStyle={styles[navType]}>
                        {children}
                    </Transporter>
                }}
            </Transition>
        </div>
    }
}

function withMyRouter(Component: React.ComponentType<any>) {
    return (props: any) => {
        const navType = useNavigationType()
        const location = useLocation()
        console.log(navType)
        return <Component key={location.pathname + location.search} {...props} navType={navType} location={location} />
    }
}

export default withMyRouter(TransitionRoute)