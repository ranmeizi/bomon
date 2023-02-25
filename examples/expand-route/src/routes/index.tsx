import React, { useEffect } from "react";
import { Outlet, RouteObject, Link, useNavigate } from "react-router-dom";
import { KRoute, TransitionRoute } from "@bomon/expand-router";
import TabView from "@/components/TabView";
import Favorites from "@/views/Favorites";
import Nearby from "@/views/Nearby";
import Rectnts from "@/views/Rectnts";

const Redirect = (props: { to: string }) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(props.to);
    }, []);
    return <Outlet />;
};

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Redirect to="/t/recents" />,
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
                        element: <TransitionRoute cloneNode>
                            <KRoute>
                                <Rectnts />
                            </KRoute>
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

export default routes;