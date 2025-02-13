import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/Home";
import { AssessmentList } from "../pages/AssessmentList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/avaliacoes",
    element: <AssessmentList />,
  },
]);
