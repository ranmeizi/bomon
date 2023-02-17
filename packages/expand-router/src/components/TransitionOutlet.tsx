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
  id: string
}

export default function TransitionOutlet(props: TransitionOutletProps) {
  const { children, transitionIds = [], id } = props;
  const currentOutlet = useOutlet()
  const NavType = useNavigationType();
  const matches = useMatches()

  console.log(NavType, '?')
  return (
    <SwitchTransition>
      <CSSTransition
        classNames={`transition-item ${ANIMATION_MAP[NavType]}`}
        timeout={500}
        unmountOnExit
        key={location.pathname + location.search}
      >
        {(state) => (
          <div>
            {currentOutlet}
          </div>
        )}
      </CSSTransition>
    </SwitchTransition>
  );
}