// 수정 날짜 : 5.27
// 역할 : Router 셋팅.

import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "./Home";
import About from "./About";
import NotFound from "./NotFound";
import ErrorComponent from "../components/ErrorComponent";
import User from "./users/User";
import Followers from "./users/Followers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "users/:userId",
        element: <User />,
        children: [
          {
            path: "followers",
            element: <Followers />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
