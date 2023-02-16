import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { PROVIDER_CLASSNAME } from '../CONSTANTS'

function withLocationKey(Component: React.ComponentType<any>) {
    return (props: any) => {
        const location = useLocation()
        return <Component key={location.pathname} {...props} />
    }
}

class TransitionRoute extends React.Component<React.PropsWithChildren> {
    el = React.createRef<HTMLDivElement>()
    componentDidMount(): void {
        console.log('mount', this.el)
    }

    componentWillUnmount(): void {
        console.log('unmount', this.el)
        const provider = findNearestTRP(this.el.current)
        console.log(provider)
        provider?.appendChild(this.el.current?.childNodes[0] as any)
    }

    render(): React.ReactNode {
        return <div ref={this.el} className='aab'>
            <div>
                {this.props.children}
            </div>
        </div>
    }
}

function findNearestTRP(el: HTMLElement | null): HTMLElement | null {
    return el === null
        ? null
        : el.className === PROVIDER_CLASSNAME
            ? el
            : findNearestTRP(el.parentElement)
}

export default withLocationKey(TransitionRoute)