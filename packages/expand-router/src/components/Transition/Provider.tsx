import { PROVIDER_CLASSNAME } from '../../CONSTANTS'
import React, { useEffect, useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import { uniqueId } from 'lodash'
import EventTarget from '../../utils/EventTarget'

// TransitionProvider

const styles: Record<string, React.CSSProperties> = {
    root: {
        position: 'relative',
        height: '100%',
        width: '100%'
    }
}

export default function TransitionProvider({ children }: React.PropsWithChildren) {
    const [inProp, setInProp] = useState(true)
    const idRef = useRef(uniqueId())
    const el = useRef<HTMLDivElement>(null)
    const [style, setStyle] = useState<any>({})

    useEffect(() => {
        function routeViewExitHandler({ id, styles }: any) {
            if (id !== idRef.current) {
                return
            }
            // 退场动画
            setStyle(styles)
            setInProp(false)

            if (!el.current) {
                return
            }

            if (el.current?.children.length > 1) {
                // 删除其余节点
                while (el.current.children.length - 1 > 0) {
                    el.current.children[0].remove()
                }
                // 恢复状态
                el.current.style.transition = 'none'
                el.current.style.transform = 'translateX(0)'
            }

            el.current.addEventListener('transitionend', function end() {
                for (let node of el.current!.children) {
                    node.remove()
                }

                setInProp(true)
                el.current?.removeEventListener('transitionend', end)
            })


        }
        EventTarget.on('transport-in', routeViewExitHandler)
        return () => EventTarget.un('transport-in', routeViewExitHandler)
    }, [])

    return <div style={styles.root} className={PROVIDER_CLASSNAME}>
        {children}
        {/* Transiton Dom */}
        <Transition in={inProp} timeout={{
            appear: 0,
            enter: 0,
            exit: 0,
        }}>
            {state => {
                console.log(style?.[state], state)
                return <div
                    ref={el}
                    id={idRef.current}
                    className='transition-item out-view'
                    style={style?.[state] || {}}
                    data-id={idRef.current}
                ></div>
            }}
        </Transition>
    </div>
}