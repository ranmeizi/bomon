import React from 'react'
import { useLocation, Routes, Route, Link } from "react-router-dom";

export default function () {
    let location = useLocation();
    return <div>
        <Link to='/a'>A</Link>
        <Link to='/b'>B</Link>
        <Routes location={location}>
            <Route path='/a' element={<A />} />
            <Route path='/b' element={<B />} />
        </Routes>
    </div>
}

function A() {
    return <div>A</div>
}

function B() {
    return <div>B</div>
}