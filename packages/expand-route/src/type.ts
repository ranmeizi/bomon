import { RouteProps } from 'react-router-dom'

export type ExRouteProps = {
    isCache: boolean // 节点销毁是否缓存
    isTransition: boolean // 是否需要过渡动画
} & RouteProps