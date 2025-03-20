import { Toaster } from 'sonner'
import './App.css'
import { Login } from './pages/Login/Login'
import { Route, Routes } from 'react-router'
import { MainLayout } from './layouts/MainLayout'
import { ProtectedRoute } from './Components/Auth/ProtectedRoute'
import useAuth from './hooks/useAuth'
import { Tasks } from './pages/Tasks/Tasks'
import { Register } from './pages/Register/Register'

function App() {
  const { isLoading, login, user, register } = useAuth()
  console.log(isLoading)
  if (isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <>
      <Routes>
        <Route index path="login" element={<Login login={login} />} />
        <Route element={<MainLayout />}>
          <Route
            path="tasks"
            element={
              <ProtectedRoute user={user}>
                <Tasks />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="register" element={<Register register={register} />} />
      </Routes>
      <Toaster richColors />
    </>
  )
}

export default App
