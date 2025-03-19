import { Toaster } from 'sonner'
import './App.css'
import { Login } from './pages/Login/Login'
import { Route, Routes } from 'react-router'
import { MainLayout } from './layouts/MainLayout'
import { ProtectedRoute } from './Components/Auth/ProtectedRoute'
import useAuth from './hooks/useAuth'
import { Tasks } from './pages/Tasks/Tasks'

function App() {
  const { isLoading } = useAuth()
  console.log(isLoading)
  if (isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <>
      <Routes>
        <Route index path="login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route
            path="tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      <Toaster richColors />
    </>
  )
}

export default App
