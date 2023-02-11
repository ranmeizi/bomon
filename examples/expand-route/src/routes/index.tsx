import React, { Children } from "react";
import { Outlet, RouteObject, Link, useNavigate } from "react-router-dom";
import TransitionView from "@/TransitionView";
import A from "@/views/ViewA";
import B from "@/views/ViewB";
import ID from "@/views/ViewId";
import { ActionKeepAlive } from "@bomon/expand-router";
import Nav from "@/components/Nav";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <TransitionView />,
    children: [
      {
        path: "/f",
        element: <Test />,
        children: [
          {
            path: "/f/id/:id",
            element: (
              <ActionKeepAlive>
                <ID />
              </ActionKeepAlive>
            ),
          },
          {
            path: "/f/a",
            index: true,
            element: (
              <ActionKeepAlive>
                <A />
              </ActionKeepAlive>
            ),
          },
          {
            path: "/f/b",
            element: (
              <ActionKeepAlive>
                <B />
              </ActionKeepAlive>
            ),
          },
        ],
      },
      {
        path: "/s",
        children: [
          {
            path: "/s/a",
            element: (
              <ActionKeepAlive>
                <SubA />
              </ActionKeepAlive>
            ),
          },
        ],
      },
    ],
  },
];

function SubA() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(-1)}>back</button>
      subA
    </div>
  );
}

// const routes: RouteObject[] = [
//     {
//         path: "/",
//         element: <TransitionView />,
//         children: [
//             {
//                 path: "/f/id/:id",
//                 index: true,
//                 element: <ActionKeepAlive>
//                     <ID />
//                 </ActionKeepAlive>
//             },
//             {
//                 path: "/f/a",
//                 index: true,
//                 element: <ActionKeepAlive>
//                     <A />
//                 </ActionKeepAlive>
//             },
//             {
//                 path: "/f/b",
//                 element: <ActionKeepAlive>
//                     <B />
//                 </ActionKeepAlive>
//             },

//         ],
//     },
// ]

function Test() {
  return (
    <div>
      <Nav></Nav>
      <Outlet></Outlet>
    </div>
  );
}

export default routes;
