import Home from "../pages/Home";
import Error404 from "../pages/Error404";

export default [
  {
    path: "/",
    exact: true,
    page: Home
  },
  {
    path: "*",
    exact: true,
    page: Error404
  }
  ,
  {
    path: "/error",
    exact: true,
    page: Error404
  }
]