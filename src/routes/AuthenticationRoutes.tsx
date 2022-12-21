import { lazy } from 'react';
import { RouteObject }   from "react-router-dom"

// project imports
import Loadable from '../ui-component/Loadable';
import MinimalLayout from '../layout/MinimalLayout';
import PublicRouter from '../utils/PublicRouter'
// login option 3 routing
const Login = Loadable(lazy(() => import('../views/authentication/login/Login')));
const Register = Loadable(lazy(() => import('../views/authentication/register/Register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes : RouteObject = {
    path: '/',
    element:<PublicRouter >
             <MinimalLayout />
        </PublicRouter> ,
    children: [
        {
            path: '/login',
            element: <Login />
        },
                {
            path: '/register',
            element: <Register />
        }
    ]

    // ]
};

export default AuthenticationRoutes;
