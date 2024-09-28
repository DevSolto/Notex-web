import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Classes } from './pages/classes'
import { Students } from './pages/students'
import { Home } from './pages/home'
import { Teachers } from './pages/teachers'
import { Subjects } from './pages/subjects'
import { Schedules } from './pages/schedules'
import { Calendar } from './pages/calendar'
import { Statement } from './pages/statement'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/estudantes",
    element: <Students />
  },
  {
    path: "/professores",
    element: <Teachers />
  },
  {
    path: "/turmas",
    element: <Classes />
  },
  {
    path: "/disciplinas",
    element: <Subjects />
  },
  {
    path: "/comunicados",
    element: <Statement />
  },
  {
    path: "/calendario",
    element: <Calendar />
  },
  {
    path: "/horario",
    element: <Schedules />
  },
])

export function App() {

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}
