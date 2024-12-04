import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Classes } from "./pages/classes";
import { Students } from "./pages/students";
import { Home } from "./pages/home";
import { Teachers } from "./pages/teachers";
import { Subjects } from "./pages/subjects";
import { Statement } from "./pages/statement";
import { Container } from "./components/container";
import { ThemeProvider } from "./components/theme-provider";
import { Admins } from "./pages/admins";
import { Login } from "./pages/login";
import { ProtectedRoute } from "./ProtectedRoute";

const appRoutes = {
  path: "/",
  element: (
    <Container>
      <Outlet />
    </Container>
  ),
  children: [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/estudantes",
      element: (
        <ProtectedRoute>
          <Students />
        </ProtectedRoute>
      ),
    },
    {
      path: "/professores",
      element: (
        <ProtectedRoute>
          <Teachers />
        </ProtectedRoute>
      ),
    },
    {
      path: "/turmas",
      element: (
        <ProtectedRoute>
          <Classes />
        </ProtectedRoute>
      ),
    },
    {
      path: "/disciplinas",
      element: (
        <ProtectedRoute>
          <Subjects />
        </ProtectedRoute>
      ),
    },
    {
      path: "/comunicados",
      element: (
        <ProtectedRoute>
          <Statement />
        </ProtectedRoute>
      ),
    },
    {
      path: "/coordenadores",
      element: (
        <ProtectedRoute>
          <Admins />
        </ProtectedRoute>
      ),
    },
  ],
};

const loginRoute = {
  path: "/login",
  element: <Login/>,
};

const routes = createBrowserRouter([appRoutes, loginRoute]);

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}
