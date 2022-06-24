import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Header } from '../components/Header';
import { TasksTable } from '../components/TasksTable';
import { useTasks } from '../hooks/useTasks';
import styles from './home.module.scss';

interface HeaderPops {
  onRequestOpen: () => void;
}

export default function Home({ onRequestOpen }: HeaderPops) {
  const { isAuthenticated, checkAuthentication, findAllTasks } = useTasks()
  const router = useRouter();

  useEffect(() => {
    
    if (!checkAuthentication()) {
      router.push('/login')
    } else {
      findAllTasks()
    }
  }, [])

  if (isAuthenticated) {
    return (
      <>
        <Header onOpenNewTaskModal={onRequestOpen} />

        <main className={styles.contentContainer}>
          <TasksTable />
        </main>
      </>
    )
  }
}
