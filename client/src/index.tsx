import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { pageRoutes } from './routes';
import { AppContextProvider } from './context';
import reportWebVitals from './reportWebVitals';
import './index.css';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
    <StrictMode>
        <AppContextProvider>
            <BrowserRouter>
                <Routes>
                    {pageRoutes.map(({ path, Component }, index) => {
                        return <Route key={`${index}-${path}`} path={path} element={<Component />} />
                    })}
                    <Route path='*' element={<Navigate to='/404' replace />} />
                </Routes>
            </BrowserRouter>
        </AppContextProvider>
    </StrictMode>
);

reportWebVitals();
