import React from 'react';
import * as ReactDOM from 'react-dom/client'
import App from '@/App'
import 'antd/dist/reset.css';

const container: HTMLDivElement = document.getElementById('root') as HTMLDivElement

const root = ReactDOM.createRoot(container);
root.render(<App />);