import { useState } from 'react';
import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import { NewTaskModal } from '../components/NewTaskModal'
import { TasksProvider } from '../hooks/useTasks';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  function handleCloseNewTaskModalOpen() {
    setIsNewTaskModalOpen(false);
  }

  function handleOpenNewTaskModalOpen() {
    setIsNewTaskModalOpen(true);
  }

  return (
    <TasksProvider> 
      <ToastContainer  autoClose={3000} />
      <Component {...pageProps} onRequestOpen={handleOpenNewTaskModalOpen}/>
      <NewTaskModal isOpen={isNewTaskModalOpen} onRequestClose={handleCloseNewTaskModalOpen} />
    </TasksProvider>
  )
}

export default MyApp
