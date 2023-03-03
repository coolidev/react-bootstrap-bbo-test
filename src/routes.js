import { createBrowserRouter as createRouter } from "react-router-dom";
import ErrorPage from "./pages/errors";
import SignIn from "./pages/signin";
import Report from "./pages/report";
import PageLayout from "./layouts/PageLayout";
import { loader } from "./hooks";
import Home from "./pages/home";

const router = createRouter([
  {
    path: '/',
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    loader: loader,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'report',
        element: <Report />,
      }
    ]
  },
])

export default router
