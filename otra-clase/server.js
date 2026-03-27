import { randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { json } from 'node:stream/consumers';

// to load .env variables
process.loadEnvFile();

const port = process.env.PORT ?? 3000;

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

const users = [
  {
    id: 1,
    name: 'Alice',
  },
  {
    id: 2,
    name: 'Bob',
  },
  {
    id: 'ce6b8dc6-be26-4dfe-8532-4176c78214d2',
    name: 'Beto',
  },
  {
    id: 'a7b097d5-01c3-4f7f-86b8-0ea84610605a',
    name: 'Jorge',
  },
  {
    id: '1940672d-6537-4c44-a260-19f1d1db78a5',
    name: 'Alicia',
  },
];

const server = createServer(async (req, res) => {
  const { method, url } = req;
  const [pathname, queryString] = url.split('?');
  const searchParams = new URLSearchParams(queryString)

  // res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
  if (method === 'GET') {
    if (pathname === '/') {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.end('Hola desde node 🤙🏽');

    }

    if (pathname === '/users') {
      const limit = Number(searchParams.get('limit')) || users.length;
      const offset = Number(searchParams.get('offset')) || 0

      const paginatedUsers = users.slice(offset, offset + limit)
      return sendJson(res, 200, paginatedUsers);
    }

    if (pathname === '/health') {
      return sendJson(res, 200, { status: 'ok', uptime: process.uptime() });
    }
  }

  if (method === 'POST') {
    if (pathname === '/users') {
      const body = await json(req);

      if (!body || !body.name) {
        return sendJson(res, 400, { error: 'Name is required' });
      }

      const newUser = {
        id: randomUUID(),
        name: body.name,
      };

      users.push(newUser);
      return sendJson(res, 201, { message: 'Usuario creado' });
    }
  }

  return sendJson(res, 404, { data: 'Not found' });
});

server.listen(port, () => {
  const address = server.address();
  console.log(`Servidor escuchando en http://localhost:${address.port}`);
});
