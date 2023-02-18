import { PROVIDER_CLASSNAME } from '../../CONSTANTS'
import React, { useEffect, useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import { uniqueId } from 'lodash'
import EventTarget from '../../utils/EventTarget'
import { withMyRouter } from './Hoc'

// TransitionProvider

const styles: Record<string, React.CSSProperties> = {
    root: {
        position: 'relative',
        height: '100%',
        width: '100%'
    }
}

function TransitionProvider({ children, navType }: React.PropsWithChildren<{ navType: any }>) {
    const [inProp, setInprop] = useState(true)
    const idRef = useRef(uniqueId())
    const el = useRef<HTMLDivElement>(null)
    const [style, setStyle] = useState<any>({})
    const isRunningRef = useRef(false) // 当前是否还在过渡

    useEffect(() => {
        function routeViewExitHandler({ id, styles }: any) {
            function end() {
                console.log('end')
                for (let node of el.current!.children) {
                    node.remove()
                }

                setInprop(false)
                el.current?.removeEventListener('transitionend', end)
                isRunningRef.current = false
            }

            if (!el.current || id !== idRef.current) {
                return
            }

            // 更新退场动画
            setStyle(styles)
            setInprop(true)


            // 判断 isRunningRef
            if (isRunningRef.current) {
                // 删除其余节点
                while (el.current.children.length - 1 > 0) {
                    el.current.children[0].remove()
                }

                el.current?.removeEventListener('transitionend', end)
            }

            isRunningRef.current = true
            el.current.addEventListener('transitionend', end)
        }
        EventTarget.on('transport-in', routeViewExitHandler)
        return () => EventTarget.un('transport-in', routeViewExitHandler)
    }, [])

    return <div style={styles.root} className={PROVIDER_CLASSNAME}>
        {children}
        {/* Transiton Dom */}
        <Transition in={inProp} appear={isRunningRef.current} nodeRef={el} timeout={{
            appear: 300,
            enter: 0,
            exit: 0,
        }}>
            {state => {
                console.log(style, navType, state)
                return <div
                    ref={el}
                    id={idRef.current}
                    className='transition-item out-view'
                    style={
                        style?.[navType]?.[state] || {}
                    }
                    data-id={idRef.current}
                ></div>
            }}
        </Transition>
    </div>
}

export default withMyRouter({})(TransitionProvider)