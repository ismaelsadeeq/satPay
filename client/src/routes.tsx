import { Navigate,useRoutes } from "react-router-dom";
import  Dashboard  from './Components/Dashboard/Dashboard';
import Login from './Components/Authentication/Login';


export default function Router(){
  return useRoutes(
    [
    {
      path:'/',
      element: <Dashboard />,
      index:true
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