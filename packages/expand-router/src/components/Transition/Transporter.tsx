import EventTarget from '../../utils/EventTarget';
import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { PROVIDER_CLASSNAME } from '../../CONSTANTS'
import { TransitionStyles, NavTypes } from "../../CONSTANTS";

function withLocationKey(Component: React.ComponentType<any>) {
    return (props: any) => {
        const location = useLocation()
        return <Component key={location.pathname + location.search} {...props} />
    }
}

type NavTypeStyle = TransitionStyles[NavTypes]

type Props = {
    _style: React.CSSProperties,
    originStyle: NavTypeStyle
}

// Transporter 将死之际，把 children 的节点放到 Provider 中，调用 Transition 动画，完成卸载的路由页的动画

class Transporter extends React.Component<React.PropsWithChildren<Props>> {
    el = React.createRef<HTMLDivElement>()
    outView: HTMLDivElement | null = null

    get nearestId() {
        return this.outView?.dataset.id
    }

    componentDidMount(): void {
        const provider = findNearestTRP(this.el.current)
        if (provider) {
            this.outView = findOutView(provider)
        }

    }

    componentWillUnmount(): void {
        console.log('unmount', this.el)

        if (!this.outView) {
            return
        }

        this.outView?.appendChild(this.el.current?.childNodes[0] as any)

        // 触发事件
        EventTarget.emit('transport-in', {
            id: this.nearestId,
            style: this.props.originStyle
        })
    }

    render(): React.ReactNode {
        return <div ref={this.el} className='transition-item' style={this.props._style}>
            {this.props.children}
        </div>
    }
}

function findOutView(el: HTMLElement): HTMLDivElement {
    return el.querySelector('.out-view') as HTMLDivElement
}

function findNearestTRP(el: HTMLElement | null): HTMLElement | null {
    return el === null
        ? null
        : el.className === PROVIDER_CLASSNAME
            ? el
            : findNearestTRP(el.parentElement)
}

export default withLocationKey(Transporter)