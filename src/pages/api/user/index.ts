import nextBase64 from 'next-base64';
import '../../../services/httpClient';

import conn from '../../../lib/db';

export default async function userHandler(req, res) {
  const {
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const queryTask =
          'SELECT id, name FROM users';

        const resultUser = await conn.query(queryTask);
        if (resultUser.rowCount > 0) {
          res.status(200).json(resultUser.rows);
        } else {
          res.status(401).json({ status: 'Unauthorized' });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json('Falha ao buscar dados');
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
