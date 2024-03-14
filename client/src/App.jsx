import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {
  HomeLayout,
  Register,
  Login,
  DashboardLayout,
  Error,
} from './pages';
import Landing from './pages/Landing';

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
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}/>
}
export default App