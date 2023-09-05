import EventTarget from '../../utils/EventTarget';
import React from 'react'
import { withMyRouter, InjectRouterProps } from './Hoc';

type Props = {
    className: string
    cloneNode: boolean
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

        const target = this.el.current?.childNodes[0] as any

        if (this.props.cloneNode) {
            // 克隆节点
            this.outView?.appendChild(target.cloneNode(true))
        } else {
            // 移动节点
            this.outView?.appendChild(target)
        }

        // 触发事件
        EventTarget.emit('transport-in', {
            id: this.nearestId,
        })
    }

    render(): React.ReactNode {
        return <div ref={this.el} className={`er-transition ${this.props.className ?? ''}`}>
            {this.props.children}
        </div>
    }
}

function findOutView(el: HTMLElement): HTMLDivElement {
    return el.querySelector('.er-outview') as HTMLDivElement
}

function findNearestTRP(el: HTMLElement | null): HTMLElement | null {
    return el === null
        ? null
        : el.className === 'er-transition-group'
            ? el
            : findNearestTRP(el.parentElement)
}

export default withMyRouter()(Transporter)