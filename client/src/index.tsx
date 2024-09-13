import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    BrowserRouter,
    Navigate,
    Routes,
    Route,
    Link,
} from 'react-router-dom';
import './index.css';
import { pageRoutes } from './routes';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
    <React.StrictMode>
        <BrowserRouter>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                </ul>
            </nav>
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
