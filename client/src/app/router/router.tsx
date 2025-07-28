import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@widgets/layout/Layout";
import { HomePage } from "@pages/home/HomePage";
import  LoginPage  from "@pages/auth/LoginPage";
import UserForm from "@pages/home/UserForm";
import { Formik } from "@pages/home/Forkik";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <Layout />, 
    children: [
      {
        path: "/",
        element: <HomePage />, 
      },
      {
        path: "/user/create",
        element: <UserForm />, 
      },
      {
        path: "/user/edit/:id",
        element: <UserForm />,
        errorElement: <div>a</div>
      },
      {
        path: "/formik/create",
        element: <Formik />, 
      },
      {
        path: "/formik/edit/:id",
        element: <Formik />,
        errorElement: <div>a</div>
      },
    ],
  },
]);