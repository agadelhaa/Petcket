import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {
  HomeLayout,
  Register,
  Login,
  DashboardLayout,
  Error,
  Landing,
  Stats,
  AddPurchase,
  AllPurchases,
  Admin,
  Profile,
  EditPurchase,
  RequestPasswordReset,
  ResetPassword,
} from './pages';

import {action as registerAction} from './pages/Register'
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { action as addPurchaseAction } from "./pages/AddPurchase";
import {loader as allPurchasesLoader} from "./pages/AllPurchases"
import { action as editPurchaseAction } from "./pages/EditPurchase";
import { loader as editPurchasesLoader } from "./pages/EditPurchase";
import { action as deletePurchaseAction } from "./pages/DeletePurchase";
import { action as profileAction } from "./pages/Profile";
import {action as requestPasswordResetAction} from "./pages/RequestPasswordReset";
import {action as resetPassword} from "./pages/ResetPassword"

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme()

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "request-password-reset",
        element: <RequestPasswordReset />,
        action: requestPasswordResetAction,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
        action: resetPassword,
      },
      {
        path: "dashboard",
        element: <DashboardLayout/>,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <Stats />,
          },
          {
            path: "add-purchase",
            element: <AddPurchase />,
            action: addPurchaseAction,
          },
          // {
          //   path: "admin",
          //   element: <Admin />,
          // },
          {
            path:"all-purchases",
            element: <AllPurchases />,
            loader: allPurchasesLoader,
          },
          {
            path:"profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "edit-purchase/:id",
            element: <EditPurchase />,
            loader: editPurchasesLoader,
            action: editPurchaseAction,
          },
          {
            path: 'delete-job/:id',
            action: deletePurchaseAction,
          }
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}/>
}
export default App