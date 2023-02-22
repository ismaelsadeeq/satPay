import { Navigate,useRoutes } from "react-router-dom";
import  Dashboard  from './Components/Dashboard/Dashboard';
import Login from './Components/Authentication/Login';
import Register from "./Components/Authentication/Register";


export default function Router(){
  return useRoutes(
    [
    {
      path:'/',
      element: <Dashboard />,
      index:true
    },
    {
      path:'/login',
      element:<Login />
    },
    {
      path:'/register',
      element:<Register />
    },
    {
      path:"*",
      element: <Navigate to="/" replace />,
    }
  ])
}