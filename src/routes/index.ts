import {  createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import NotFoundRoutes from './Notfound';
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return  createBrowserRouter([NotFoundRoutes ,MainRoutes,AuthenticationRoutes]);
}
