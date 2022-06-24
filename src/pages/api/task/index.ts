import '../../../services/httpClient';

import conn from '../../../lib/db';

export default async function handler(req, res) {
  const {
    method,
  } = req;

  switch (method) {
    case 'POST':
      const task = req.body;

      try {
        const queryInsertTask = `INSERT INTO public.tasks( \
          description, deadline, priority, sponsor, author) \
          VALUES ($1, $2, $3, $4, $5) RETURNING id`;

        const values = [
          task.description,
          task.deadline,
          task.priority,
          task.sponsor,
          task.author,
        ];

        const result = await conn.query(queryInsertTask, values);
        if (result.rowCount === 1) {
          const [id] = result.rows;
          res.status(201).json(id);
        }
      } catch (error) {}
      break;
    default:
      res.setHeader('Allow', ['POST'],);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
