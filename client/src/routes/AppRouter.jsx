import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import { AuthRedirect, ProtectedRoute } from "../utils/AuthRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthRedirect>
            <LoginPage />
          </AuthRedirect>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthRedirect>
            <SignupPage />
          </AuthRedirect>
        ),
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
