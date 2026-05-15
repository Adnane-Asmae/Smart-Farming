import { Routes, Route, Navigate } from 'react-router-dom'
import useAuthStore from './stores/useAuthStore'
import Login from './pages/Login'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Parcelles from './pages/Parcelles'
import Cultures from './pages/Cultures'
import Machines from './pages/Machines'
import Interventions from './pages/Interventions'
import Demandes from './pages/Demandes'
import Irrigation from './pages/Irrigation'
import Profile from './pages/Profile'
import Users from './pages/Users'
import Settings from './pages/Settings'
import Reports from './pages/Reports'
import History from './pages/History'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="parcelles" element={<Parcelles />} />
        <Route path="cultures" element={<Cultures />} />
        <Route path="machines" element={<Machines />} />
        <Route path="interventions" element={<Interventions />} />
        <Route path="demandes" element={<Demandes />} />
        <Route path="irrigation" element={<Irrigation />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
        <Route path="reports" element={<Reports />} />
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  )
}

export default App
