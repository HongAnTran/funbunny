import { lazy } from "react";


import { RouteObject ,Navigate } from "react-router-dom";
// project imports
import PrivateRouter from "../utils/PrivateRouter";
import Loadable from "../ui-component/Loadable";

import MainLayout from "../layout/MainLayout";

const DashboardDefault = Loadable(
  lazy(() => import("../views/dashboard"))
);
const Report = Loadable(
  lazy(() => import("../views/report"))
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
      path: "report",
      element: <Report />,
    },
    {
      path: "add-transastion",
      element: <AddTransaction />,
    },
  ],
};

export default MainRoutes;
