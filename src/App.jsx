import './App.css'
import Home from './pages/Home'
import RegisterTeam from './pages/RegisterTeam'
import RegisterUser from './pages/RegisterUser'
import UpdateTeam from './pages/UpdateTeam'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Teams from './pages/Teams'
import RegisterLayout from './layouts/RegisterLayout'
import NotFound from './components/NotFound'

export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='teams' element={<Teams />} />
        <Route path='reg' element={<RegisterLayout />}>
          <Route index element={<Navigate to="team" replace />} />
          <Route path='team' element={<RegisterTeam />} />
          <Route path='user/:id' element={<RegisterUser />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )

}