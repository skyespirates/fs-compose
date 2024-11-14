import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import App from './App';
import Task from './pages/Task';
import { Temp } from './temp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'tasks',
        element: <Task />,
      },
      {
        path: 'temp',
        element: <Temp />,
      },
    ],
  },
]);

export default router;
