import "./App.css";
import WikiEditor from "./components/WikiEditor";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WikiViewer from "./components/WikiViewer";
import "./styles/colors.css";
import DefaultLayout from "./layouts/DefaultLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "editor",
        element: <WikiEditor />,
      },
      {
        path: "viewer",
        element: <WikiViewer />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
