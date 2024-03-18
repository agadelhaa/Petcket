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
} from './pages';


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
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Stats />,
          },
          {
            path: "add-purchase",
            element: <AddPurchase />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
          {
            path:"all-purchases",
            element: <AllPurchases />,
          },
          {
            path:"profile",
            element: <Profile />
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