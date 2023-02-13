import { lazy } from "react";


import { RouteObject ,Navigate } from "react-router-dom";
// project imports
import PrivateRouter from "../utils/PrivateRouter";
import Loadable from "../ui-component/Loadable";

import MainLayout from "../layout/MainLayout";
const DashboardDefault = Loadable(
  lazy(() => import("../views/dashboard"))
);

const AddTransaction  = Loadable(
  lazy(() => import("../views/addTransastion"))
);



// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes: RouteObject = {
  path: "/",
  element: <PrivateRouter>
            <MainLayout /> 
         </PrivateRouter>,

  children: [
     {
      path: "/",
      element: <Navigate  to='/dashboard'/>,
    },
    {
      path: "dashboard",
      element: <DashboardDefault />,
    },
    {
      path: "add-transastion",
      element: <AddTransaction />,
    },
  ],
};

export default MainRoutes;
