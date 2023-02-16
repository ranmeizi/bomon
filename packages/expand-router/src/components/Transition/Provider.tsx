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
            console.log('看看', id, idRef.current, styles)
            if (id !== idRef.current) {
                return
            }
            // 退场动画
            setStyle(styles)
            setInProp(false)

            const onlyNode = el.current?.children[0]

            if (!onlyNode || !el.current) {
                return
            }

            el.current.addEventListener('transitionend', function end() {
                console.log('transitionend')
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
            exit: 500,
        }}>
            {state => <div
                ref={el}
                id={idRef.current}
                className='transition-item out-view'
                style={style?.[state] || {}}
                data-id={idRef.current}
            ></div>}
        </Transition>
    </div>
}