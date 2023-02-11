import React from 'react';
import * as ReactDOM from 'react-dom/client'
import App from '@/App'
import './style.less'
import { AliveScope } from '@bomon/expand-router'

const container: HTMLDivElement = document.getElementById('root') as HTMLDivElement

const root = ReactDOM.createRoot(container);
root.render(
    <AliveScope>
        <App />
    </AliveScope>
);