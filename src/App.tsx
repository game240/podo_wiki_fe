import "./App.css";
import WikiEditor from "./components/WikiEditor";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import WikiViewer from "./components/WikiViewer";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Outlet />
      </div>
    ),
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
