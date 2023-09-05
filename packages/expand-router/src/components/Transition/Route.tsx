import {
  TransitionStyles,
  States,
  CLASS_MAP,
  NavTypes
} from "../../CONSTANTS";
import React from "react";
import { Transition } from "react-transition-group";
import Transporter from "./Transporter";
import { merge } from "lodash-es";
import { withMyRouter, InjectRouterProps } from "./Hoc";
// TransitionRoute 在路由进入时 调用 Transition 动画

type TransitionRouteProps = {
  styles?: TransitionStyles;
  cloneNode?: boolean; // 克隆dom节点，当子节点dom操作时在之前克隆，以显示残像，默认关闭的，这样会使路由切换变卡
} & InjectRouterProps;

class TransitionRoute extends React.PureComponent<
  React.PropsWithChildren<TransitionRouteProps>
> {
  static getDerivedStateFromProps(
    props: Readonly<TransitionRouteProps>,
    state: any
  ) {
    if (props.styles !== state.styles) {
      return {
        ...state,
        styles: props.styles,
      };
    }
    return null;
  }

  state = {
    inProp: false,
  };

  componentDidMount(): void {
    this.setState({
      inProp: true,
    });
  }

  getClassName(state: string): string {
    const { navType } = this.props
    return CLASS_MAP[navType as NavTypes][state as States]
}

  render(): React.ReactNode {
    const { inProp } = this.state;
    const { navType, children, cloneNode } = this.props;

    return (
      <Transition in={inProp} timeout={0}>
        {(state) => {
          return (
            <Transporter
             className={this.getClassName(state)}     
              cloneNode={!!cloneNode}
            >
              {children}
            </Transporter>
          );
        }}
      </Transition>
    );
  }
}

export default withMyRouter({ useLocationKey: true })(TransitionRoute);
