import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin';

import styles from './Login.module.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login, error, isPending} = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email, password)
    login(email, password)
  }

  return (
    <form className={styles['login-form']}  onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email</span>
        <input type='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
      </label>
      <label>
        <span>Password</span>
        <input type='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
      </label>
      {!isPending && <button className='btn'>Login</button>}
      {isPending && <button className='btn' disabled>Logging in</button>}
      {error && <p>{error}</p>}
      
    </form>
  )
}

export default Login