import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useTasks } from '../../hooks/useTasks';
import { httpClient } from '../../services/httpClient';
import styles from './styles.module.scss';

interface NewTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

interface User {
  id: number;
  name: string;
}

export function NewTaskModal({ isOpen, onRequestClose }: NewTaskModalProps) {
  const { createTask } = useTasks();

  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [author, setAuthor] = useState(0);
  const [sponsor, setSponsor] = useState({} as User);
  const [selectedSponsor, setSelectedSponsor] = useState('');
  const [inputType, setInputType] = useState('text')

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    httpClient.get('user')
      .then(response => {
        setUsers(response.data)
      })
    setAuthor(+localStorage.getItem('id'))

  }, []);

  function handleChangePriority(event) {
    setSelectedPriority(event.target.value);
    setPriority(event.target.value);
  }
  function handleChangeSponsor(event) {
    const newSponsor = String(event.target.value);
    const [sponsorId, sponsorName] = newSponsor.split(',');

    setSponsor({ id: +sponsorId, name: sponsorName });
    setSelectedSponsor(event.target.value);
  }

  async function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    await createTask({
      description,
      deadline,
      priority,
      sponsor,
      author
    })

    setDescription('');
    setDeadline('');
    setPriority('');
    setSelectedSponsor('');
    setSelectedPriority('');
    setSponsor({} as User);

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >

        <img src="/images/close.svg" alt="Fechar modal" />
      </button>

      <form className={styles.modalContainer} onSubmit={handleCreateNewTask} >
        <h2>Castrar Tarefa</h2>

        <input
          placeholder="Descrição"
          required
          value={description}
          onChange={event => setDescription(event.target.value)}
        />

        <input
          placeholder="Prazo"
          type={inputType}
          required
          value={deadline}
          onBlur={event => !deadline ? setInputType('text') : ''}
          onFocus={event => setInputType('datetime-local')}
          onChange={event => setDeadline(event.target.value)}
        />

        <select
          value={selectedPriority}
          onChange={handleChangePriority}
          required
        >
          <option disabled={true} value="">
            Prioridade
          </option>
          <option value="baixa">Baixa</option>
          <option value="média">Média</option>
          <option value="alta">Alta</option>
        </select>

        <select
          value={selectedSponsor}
          onChange={handleChangeSponsor}
          required
        >
          <option disabled={true} value="">
            Responsável
          </option>
          {
            users.map((user) => (
              <option key={user.id} value={`${user.id},${user.name}`}>
                {user.name}
              </option>
            ))
          }
        </select>

        <button type="submit">Cadastrar</button>
      </form>
    </Modal>
  );
}