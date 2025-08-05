import Home from './pages/Home'
import RegisterTeam from './pages/RegisterTeam'
import RegisterUser from './pages/RegisterUser'
import UpdateTeam from './pages/UpdateTeam'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Teams from './pages/Teams'
import RegisterLayout from './layouts/RegisterLayout'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './hooks/AuthContext'

export default function App() {

  const { isAuthenticated } = useAuth();


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={!isAuthenticated ? <Home /> : <Navigate to="/dashboard" replace />} />
        {!isAuthenticated && (<><Route path='login' element={<AdminLogin />} />
          <Route path='reg' element={<RegisterLayout />}>
            <Route index element={<Navigate to="team" replace />} />
            <Route path='team' element={<RegisterTeam />} />
            <Route path='user/:id' element={<RegisterUser />} />
          </Route>
          <Route path='teams' element={<Teams />} /></>)}
        <Route element={<ProtectedRoute />}>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='update_team/:id' element={<UpdateTeam />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return (
    <div className="max-w-7xl mx-auto font-open-sans">
      <RouterProvider router={router} />
    </div>
  )

}