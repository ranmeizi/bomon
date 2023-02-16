import React, { createRef } from "react";
import { Outlet, RouteObject, Link, useNavigate, Routes, redirect } from "react-router-dom";
import TransitionView from "@/TransitionView";
import { KRoute, TransitionRoute } from "@bomon/expand-router";
import Nav from "@/components/Nav";
import TabView from "@/components/TabView";
import Favorites from "@/views/Favorites";
import Nearby from "@/views/Nearby";
import Rectnts from "@/views/Rectnts";

const routes: RouteObject[] = [
    {
        path: "/",
        children: [
            {
                path: "/t",
                element: <TabView />,
                children: [
                    {
                        path: "/t/favorites",
                        element: <TransitionRoute>
                            <Favorites />
                        </TransitionRoute>,
                    },
                    {
                        path: "/t/nearby",
                        element: <TransitionRoute>
                            <Nearby />
                        </TransitionRoute>,
                    },
                    {
                        path: "/t/recents",
                        element: <TransitionRoute>
                            <Rectnts />
                        </TransitionRoute>,
                    },
                ],
            },
            {
                path: "/s",
                children: [
                    {
                        path: "/s/a",
                        element: (
                            <KRoute>
                                <SubA />
                            </KRoute>
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

function Test() {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
        </div>
    );
}

export default routes;
