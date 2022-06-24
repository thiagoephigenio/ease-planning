import nextBase64 from 'next-base64';
import '../../../services/httpClient';

import conn from '../../../lib/db';

export default async function userHandler(req, res) {
  const {
    query: { id, name },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const queryTask =
          'SELECT id, name FROM users WHERE email = $1 AND password = $2';
        const [, hash] = req.headers.authorization.split(' ');
        const [email, password] = nextBase64.decode(hash).split(':');

        const resultUser = await conn.query(queryTask, [email, password]);
        if (resultUser.rowCount === 1) {
          res.status(200).json({
            id: resultUser.rows[0].id,
            name: resultUser.rows[0].name,
          });
        } else {
          res.status(401).json({ status: 'Unauthorized' });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json('Falha ao buscar dados');
      }
      break;

    default:
      res.setHeader('Allow', ['GET',]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
