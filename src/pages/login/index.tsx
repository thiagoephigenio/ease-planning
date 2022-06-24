import nextBase64 from 'next-base64';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { httpClient } from '../../services/httpClient';
import styles from './styles.module.scss';

export default function Login() {
  const {checkAuthentication} = useTasks()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginFailure, setLoginFailure] = useState(false)
  const router = useRouter();

  async function handleLoginUser(event) {
    event.preventDefault();

    if (!email || !password) {
      setLoginFailure(true)
    } else {
      try {
        const response = await httpClient.get('/user/login', {
          headers: {
            Authorization: `Basic ${nextBase64.encode(email + ":" + password)}`,
          },
        });
        
        const {id, name} = response.data;
        localStorage.setItem('id', id);
        localStorage.setItem('name', name);
        
        checkAuthentication()
        router.push('/');
        setLoginFailure(false)
      } catch (err) {
        setLoginFailure(true)
      }
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <form onSubmit={handleLoginUser}>

          <h2> Easy Planning</h2>
          <input placeholder="username" type="text" onChange={event => setEmail(event.target.value)} />
          <input placeholder="password" type="password" onChange={event => setPassword(event.target.value)} />
          {
            loginFailure ? (<strong>Usuário ou senha inválidos</strong>) : ''
          }
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )



}