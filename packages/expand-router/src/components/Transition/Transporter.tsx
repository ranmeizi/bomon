import EventTarget from '../../utils/EventTarget';
import React from 'react'
import { PROVIDER_CLASSNAME } from '../../CONSTANTS'
import { TransitionStyles } from "../../CONSTANTS";
import { withMyRouter, InjectRouterProps } from './Hoc';

type Props = {
    cloneNode: boolean
    _style: React.CSSProperties,
    originStyle: TransitionStyles
} & InjectRouterProps

let id = 1

// Transporter 将死之际，把 children 的节点放到 Provider 中，调用 Transition 动画，完成卸载的路由页的动画
class Transporter extends React.Component<React.PropsWithChildren<Props>> {
    el = React.createRef<HTMLDivElement>()
    outView: HTMLDivElement | null = null

    id = id++

    get nearestId() {
        return this.outView?.dataset.id
    }

    componentDidMount(): void {
        console.log(this.id, this.props.cloneNode)

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
        console.log(this.id, this.props.cloneNode)
        if (this.props.cloneNode) {
            // 克隆节点
            console.log('clonenode')
            this.outView?.appendChild(target.cloneNode(true))
        } else {
            // 移动节点
            this.outView?.appendChild(target)
        }

        // 触发事件
        EventTarget.emit('transport-in', {
            id: this.nearestId,
            style: this.props.originStyle
        })
    }

    render(): React.ReactNode {
        return <div ref={this.el} className='er-transition' style={this.props._style}>
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
        : el.className === PROVIDER_CLASSNAME
            ? el
            : findNearestTRP(el.parentElement)
}

export default withMyRouter({})(Transporter)