import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Classes } from './pages/classes'
import { Students } from './pages/students'
import { Home } from './pages/home'
import { Teachers } from './pages/teachers'
import { Subjects } from './pages/subjects'

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
])

export function App() {

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}
