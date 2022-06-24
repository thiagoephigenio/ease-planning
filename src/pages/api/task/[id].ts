import '../../../services/httpClient';

import conn from '../../../lib/db';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const tasks = [];
        const queryTask =
          'SELECT tasks.*, users.name as sponsor_name \
            FROM public.tasks inner join public.users \
              ON tasks.sponsor = users.id \
              AND (tasks.author = $1 OR tasks.sponsor = $1);';

        const values = [id];
        const resultTasks = await conn.query(queryTask, values);

        resultTasks.rows.map((task) => {
          tasks.push({
            id: task.id,
            description: task.description,
            priority: task.priority,
            deadline: task.deadline,
            author: task.author,
            sponsor: { id: task.sponsor, name: task.sponsor_name },
          });
        });
        res.status(200).json(tasks);
      } catch (error) {
        console.log(error);
        res.status(400).json('Falha ao buscar dados');
      }
      break;

    case 'DELETE':
      try {
        const queryTask = 'DELETE FROM tasks WHERE id = $1 RETURNING id';

        const values = [id];
        const resultTasks = await conn.query(queryTask, values);
        if (resultTasks.rowCount === 1) {
          const [id] = resultTasks.rows;
          res.status(200).json(id);
        }else {
          res.status(204).json({status: 'No Content'});
        }
      } catch (error) {
        res.status(400).json('Falha ao buscar dados');
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE',]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
