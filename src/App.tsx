import "./App.css";
import WikiEditor from "./components/WikiEditor";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WikiViewer from "./components/WikiViewer";
import "./styles/colors.css";
import "./styles/texts.css";
import SignupForm from "./components/auth/SignupForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import SigninForm from "./components/auth/SignInForm";
import AuthCallback from "./components/auth/AuthCallback";

import DefaultLayout from "./layouts/DefaultLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "editor",
        element: (
          <ProtectedRoute>
            <WikiEditor />
          </ProtectedRoute>
        ),
      },
      {
        path: "viewer",
        element: <WikiViewer />,
      },
      {
        path: "signup",
        element: <SignupForm />,
      },
      {
        path: "signin",
        element: <SigninForm />,
      },
      {
        path: "auth/callback",
        element: <AuthCallback />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
