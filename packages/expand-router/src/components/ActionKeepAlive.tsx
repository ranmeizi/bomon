import React, { useEffect, useMemo } from "react";
import {
  NavigationType,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import {
  KeepAliveProps,
  KeepAlive,
  useAliveController,
} from "react-activation";

type ActionKeepAliveProps = React.PropsWithChildren<
  {
    aliveTypes?: NavigationType[]; // 需要缓存的 navigation 类型，默认是['POP']，当路由返回时缓存
  } & KeepAliveProps
>;

export default function ActionKeepAlive(props: ActionKeepAliveProps) {
  const location = useLocation();

  const {
    children,
    aliveTypes = ["POP"] as NavigationType[],
    ...kaProps
  } = props;

  const key = location.pathname + location.search;

  useActionControl(key, aliveTypes);

  return (
    <div>
      <KeepAlive {...kaProps} id={key} name={key} saveScrollPosition={false}>
        {children}
      </KeepAlive>
    </div>
  );
}

function useActionControl(name: string, aliveTypes: NavigationType[]) {
  const navType = useNavigationType();
  const { refresh } = useAliveController();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname + location.search === name && navType === "PUSH") {
      refresh(name);
    }
  }, [location]);
}
