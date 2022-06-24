import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MdOutlineLogout } from 'react-icons/md';
import styles from './styles.module.scss'

interface HeaderPops {
  onOpenNewTaskModal: () => void;
}

export function Header({ onOpenNewTaskModal }: HeaderPops) {
  const router = useRouter();

  function handleLogoutUser() {
    localStorage.removeItem('id')
    localStorage.removeItem('name')
    router.push('/login')
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <header >
          <span>
            <img src="/images/logo.svg" alt="easy planning" />
            <h2>Easy Planning</h2>
          </span>
          <button type="button" onClick={onOpenNewTaskModal}>Nova Tarefa</button>
          <span onClick={handleLogoutUser}>
            {localStorage.getItem('name')} 
            <MdOutlineLogout className={styles.logoutIcon} />  
          </span>
        </header>
      </div>
    </div>
  );
}