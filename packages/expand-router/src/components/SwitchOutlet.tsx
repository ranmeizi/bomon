import React, { useMemo } from "react";
import { RoutesProps, RouteObject, useNavigationType, useMatches, useOutlet } from "react-router-dom";
import { CSSTransition, TransitionGroup, SwitchTransition } from "react-transition-group";

const ANIMATION_MAP = {
  REPLACE: "forward",
  PUSH: "forward",
  POP: "back",
};

interface TransitionOutletProps extends RoutesProps {
  transitionIds?: RouteObject["id"];
}

export default function TransitionOutlet(props: TransitionOutletProps) {
  const { children, transitionIds = [] } = props;
  const NavType = useNavigationType();

  return (
    <SwitchTransition>
      <CSSTransition
        classNames={`transition-item ${ANIMATION_MAP[NavType]}`}
        timeout={500}
        unmountOnExit
        key={location.pathname + location.search + NavType}
      >
        {children}
      </CSSTransition>
    </SwitchTransition>
  );
}
