import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/Login/LoginPage';
import DashboardPage from '../pages/Login/Dashboard/DashboardPage';
import { checkAuthLoader } from '../app/utils/helper';

const router = createBrowserRouter([
  {
    path: '/',
    // element: ,
    loader: checkAuthLoader,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export default router;
