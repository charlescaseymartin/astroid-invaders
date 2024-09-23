import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { pageRoutes } from './routes';
import reportWebVitals from './reportWebVitals';
import './index.css';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                { pageRoutes.map(({ path, Component }) => {
                    return <Route path={path} element={<Component />} />
                })}
                <Route path='*' element={<Navigate to='/404' replace />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
