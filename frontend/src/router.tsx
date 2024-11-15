import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import App from './App';
import Task from './pages/Task';
import { Temp } from './temp';
// import api from './utils/api';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
        // loader: async () => {
        //   const resp = await api.get('/todos/1');
        //   console.log(resp.data);
        //   return resp.data;
        // },
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
