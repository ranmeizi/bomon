import EventTarget from '../../utils/EventTarget';
import React from 'react'
import { PROVIDER_CLASSNAME } from '../../CONSTANTS'
import { TransitionStyles } from "../../CONSTANTS";
import { withMyRouter, InjectRouterProps } from './Hoc';

type Props = {
    _style: React.CSSProperties,
    originStyle: TransitionStyles
} & InjectRouterProps

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

export default withMyRouter({})(Transporter)