import { lazy } from "react";
import { useRoutes } from "react-router-dom"
import { SuspenseElement as Suspense } from "../utils";
const Home = lazy(() => import("./home/Home"))
const Private = lazy(() => import("./private/Private"))
const RoutesProvider = () => {
  return useRoutes([
    {
      path: "/",
      element: <Suspense><Home /></Suspense>,
    },
    {
      path: "/admin",
      element: <Suspense><Private /></Suspense>,
    }
  ]);
}

export default RoutesProvider