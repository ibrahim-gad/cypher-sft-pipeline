import { RouteObject } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from "../pages/home.tsx";
import Settings from "../pages/settings.tsx";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: 'settings', element: <Settings /> },
        ],
    },
];