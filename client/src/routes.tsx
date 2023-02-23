import { Navigate,useRoutes } from "react-router-dom";
import  Dashboard  from './Components/Dashboard/Dashboard';
import Login from './Components/Authentication/Login';
import DashboardLayout from "./layout";


export default function Router(){
  return useRoutes(
    [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Dashboard /> },
        
      ],
    },
    {
      path:'/auth/:route',
      element:<Login />
    },
    {
      path:"*",
      element: <Navigate to="/" replace />,
    }
  ])
}