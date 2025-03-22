import { NavLink, Outlet } from 'react-router'
import styles from './MainLayout.module.css'
import { Button } from '../Components/Buttons/Button/Button'

export const MainLayout = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <NavLink className={styles.nav_link} to="/tasks">
          Tasks
        </NavLink>
        <Button variant="secondary">Cerrar Sesion</Button>
      </nav>
      <Outlet />
    </div>
  )
}
