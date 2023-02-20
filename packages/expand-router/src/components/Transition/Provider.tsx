import { PROVIDER_CLASSNAME, TransitionStyles, NavTypes, States } from '../../CONSTANTS'
import React, { createRef, PropsWithChildren } from 'react'
import { Transition, TransitionStatus } from 'react-transition-group'
import { uniqueId } from 'lodash'
import EventTarget from '../../utils/EventTarget'
import { withMyRouter, InjectRouterProps } from './Hoc'

// TransitionProvider

const styles: Record<string, React.CSSProperties> = {
    root: {
        position: 'relative',
        height: '100%',
        width: '100%'
    }
}

type Props = {} & InjectRouterProps

class TransitionProvider extends React.Component<PropsWithChildren<Props>> {

    el = createRef<HTMLDivElement>()
    id = uniqueId()
    running = false

    state = {
        in: true,
        exit: false,
        appear: false,
        viewStyle: {},
    }

    componentDidMount(): void {
        EventTarget.on('transport-in', this.transportHandler)
    }

    componentWillUnmount(): void {
        EventTarget.un('transport-in', this.transportHandler)
    }

    transportHandler = ({ id, style }: any) => {
        if (id !== this.id || !this.el.current) {
            return
        }
        if (this.running) {
            console.log('running')
            // 清除节点
            while (this.el.current.children.length - 1 > 0) {
                this.el.current.children[0].remove()
            }

            // 重置父节点状态
            this.setState({
                in: true
            })
        }

        this.setState({
            viewStyle: style
        }, () => {
            this.setState({ in: false })
        })

        this.running = true

        this.el.current.addEventListener('transitionend', this.transitionEndHandler)
    }

    transitionEndHandler = () => {
        if (!this.el.current) {
            return
        }
        for (let node of this.el.current.children) {
            node.remove()
        }

        this.setState({
            in: true
        })

        this.el.current.removeEventListener('transitionend', this.transitionEndHandler)
    }

    getStyle(state: TransitionStatus): React.CSSProperties {
        const { navType } = this.props
        const { viewStyle } = this.state
        const style = (viewStyle as TransitionStyles)?.[navType as NavTypes]?.[state as States] || {}
        return {
            ...style,
            transition: state === 'exited' ? style.transition : 'none'
        } || {}
    }

    render(): React.ReactNode {
        const { children } = this.props
        const { in: _in } = this.state
        return <div style={styles.root} className={PROVIDER_CLASSNAME}>
            {children}
            {/* Transiton Dom */}
            <Transition in={_in} timeout={0}>
                {state => {
                    return <div
                        ref={this.el}
                        id={this.id}
                        className='transition-item out-view'
                        style={this.getStyle(state)}
                        data-id={this.id}
                    ></div>
                }}
            </Transition>
        </div>
    }
}

export default withMyRouter({})(TransitionProvider)