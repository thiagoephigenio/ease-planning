import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import nextBase64 from 'next-base64';
import { httpClient } from '../services/httpClient';

interface User {
  id: number;
  name: string;
}

interface Task {
  id: number;
  description: string;
  priority: string;
  deadline: string;
  author: number;
  sponsor: User;
}

type TaskInput = Omit<Task, 'id'>;

interface TasksProviderProps {
  children: ReactNode;
}

interface TasksContextData {
  tasks: Task[];
  isAuthenticated: boolean;
  checkAuthentication: () => boolean;
  createTask: (task: TaskInput) => Promise<void>;
  removeTask: (id: number) => Promise<void>;
  findAllTasks: () => void;
}

const TasksContext = createContext<TasksContextData>(
  {} as TasksContextData
);

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function createTask(taskInput: TaskInput) {
    console.log(taskInput.author);
    const newTask = {
      description: taskInput.description,
      priority: taskInput.priority,
      deadline: taskInput.deadline,
      author: taskInput.author,
      sponsor: taskInput.sponsor.id
    }
    httpClient.post('task', newTask)
      .then(response => {
        if (response.status === 201) {
          const { id } = response.data;
          const storegedTask = { ...taskInput, id }

          setTasks([
            ...tasks,
            storegedTask
          ])
          toast.success('Tarefa Cadastrada com Sucesso')
        }
      })
  }

  async function removeTask(id: number) {
    const storegedTasks = tasks;
    httpClient.delete(`task/${id}`)
      .then(response => {
        if (response.status === 200) {
          const newTasks = storegedTasks.filter(
            task => task.id !== id
          )
          setTasks(
            newTasks
          )
          toast.error('Tarefa Removida')
        }
      })

  }

  function findAllTasks() {
    const userId = localStorage.getItem('id');
    if (userId) {
      httpClient.get(`task/${userId}`, {
        headers: {
          Authorization: `Basic ${nextBase64.encode('thiago' + ":" + '123')}`,
        },
      })
        .then(response => {
          setTasks(response.data)
        })
    }
  }

  function checkAuthentication() {
    if (localStorage.getItem('id')) {
      setIsAuthenticated(true)
      return true
    } else {
      setIsAuthenticated(false)
      return false
    }
  }

  return (
    <TasksContext.Provider value={
      {
        tasks,
        createTask,
        removeTask,
        findAllTasks,
        checkAuthentication,
        isAuthenticated
      }
    }>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext);

  return context;
}