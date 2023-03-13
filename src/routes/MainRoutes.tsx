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
const History = Loadable(
  lazy(() => import("../views/history"))
);
const AddTransaction  = Loadable(
  lazy(() => import("../views/transaction/addTransastion"))
);
const EditTransaction  = Loadable(
  lazy(() => import("../views/transaction/editTransastion"))
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
      path: "transaction-history",
      element: <History />,
    },
    {
      path: "add-transaction",
      element: <AddTransaction />,
    },
    {
      path: "edit-transaction/:transactionId",
      element: <EditTransaction />,
    },
  ],
};

export default MainRoutes;
