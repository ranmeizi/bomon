import { CLASS_MAP, NavTypes, States } from '../../CONSTANTS'
import React, { createRef, PropsWithChildren } from 'react'
import { Transition } from 'react-transition-group'
import { uniqueId } from 'lodash-es'
import EventTarget from '../../utils/EventTarget'
import { withMyRouter, InjectRouterProps } from './Hoc'

// Transition

const styles: Record<string, React.CSSProperties> = {
    root: {
        position: 'relative',
        height: '100%',
        width: '100%'
    }
}

type Props = {
    className?: string
} & InjectRouterProps

class TransitionGroup extends React.Component<PropsWithChildren<Props>> {

    el = createRef<HTMLDivElement>()
    id = uniqueId()
    running = false

    state = {
        in: true,
        exit: false,
        appear: false,
    }

    componentDidMount(): void {
        EventTarget.on('transport-in', this.transportHandler)
    }

    componentWillUnmount(): void {
        EventTarget.un('transport-in', this.transportHandler)
    }

    transportHandler = ({ id }: any) => {
        if (id !== this.id || !this.el.current) {
            return
        }
        if (this.running) {
            // 清除节点
            while (this.el.current.children.length - 1 > 0) {
                this.el.current.children[0].remove()
            }

            // 重置父节点状态
            this.setState({
                in: true
            })
        }

        this.setState({ in: false })

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

    getClassName(state: string): string {
        const { navType } = this.props
        return CLASS_MAP[navType as NavTypes][state as States]
    }

    render(): React.ReactNode {
        const { children } = this.props
        const { in: _in } = this.state
        return <div style={styles.root} className='er-transition-group'>
            {children}
            {/* Transiton Dom */}
            <Transition in={_in} timeout={0}>
                {state => {
                    return <div
                        ref={this.el}
                        id={this.id}
                        className={`er-outview ${this.getClassName(state)}`}
                        data-id={this.id}
                    ></div>
                }}
            </Transition>
        </div>
    }
}

export default withMyRouter()(TransitionGroup)