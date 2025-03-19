import { NavLink, Outlet } from 'react-router'
import styles from './MainLayout.module.css'

export const MainLayout = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <NavLink className={styles.nav_link} to="/login">
          Login
        </NavLink>
        <NavLink className={styles.nav_link} to="/register">
          Register
        </NavLink>
        <NavLink className={styles.nav_link} to="/tasks">
          Tasks
        </NavLink>
      </nav>
      <Outlet />
    </div>
  )
}
