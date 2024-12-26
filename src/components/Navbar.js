import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

function Navbar() {
  const {logout} = useLogout();
  return (
    <nav className={styles.navbar}>
        <ul>
            <li className={styles.title}>FinTrack</li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li onClick={logout}>Logout</li>
        </ul>

    </nav>
  )
}

export default Navbar