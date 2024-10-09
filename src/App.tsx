import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Classes } from './pages/classes';
import { Students } from './pages/students';
import { Home } from './pages/home';
import { Teachers } from './pages/teachers';
import { Subjects } from './pages/subjects';
import { Schedules } from './pages/schedules';
import { Calendar } from './pages/calendar';
import { Statement } from './pages/statement';
import { Container } from './components/container';
import { ThemeProvider } from './components/theme-provider';
import { Admins } from './pages/admins';

// Rotas com o Container
const appRoutes = {
  path: "/",
  element: (
    <Container>
      <Outlet />
    </Container>
  ),
  children: [
    { path: "/", element: <Home /> },
    { path: "/estudantes", element: <Students /> },
    { path: "/professores", element: <Teachers /> },
    { path: "/turmas", element: <Classes /> },
    { path: "/disciplinas", element: <Subjects /> },
    { path: "/comunicados", element: <Statement /> },
    { path: "/coordenadores", element: <Admins /> },
  ],
};

const loginRoute = {
  path: "/login",
  element: <p>login</p>,
};

const routes = createBrowserRouter([appRoutes, loginRoute]);

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}