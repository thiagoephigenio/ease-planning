import { MdDelete } from 'react-icons/md';
import { useTasks } from '../../hooks/useTasks';
import styles from './styles.module.scss';

export function TasksTable() {
  const { tasks, removeTask } = useTasks();

  function handleRemoveTask(id) {
    removeTask(id)
  }

  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Prazo</th>
            <th>Responsável</th>
            <th>Prioridade</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {
            tasks.map(
              task => (
                <tr key={task.id}>
                  <td>{task.description}</td>
                  <td>
                    {
                      new Intl.DateTimeFormat('pt-BR').format(
                        new Date(task.deadline)
                      )
                    }
                  </td>
                  <td>{task.sponsor.name}</td>
                  <td>{task.priority}</td>
                  <td>
                    {
                      task.author === +localStorage.getItem('id')
                        ? (
                            <button onClick={
                              () => { handleRemoveTask(task.id) }
                            }>
                              <MdDelete size={25} />
                            </button>)
                        : ''
                    }
                  </td>
                </tr>
              )
            )
          }

        </tbody>
      </table>
    </div>
  );
}