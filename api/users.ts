import type { VercelRequest, VercelResponse } from '@vercel/node';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  dateOfBirth?: string;
  createdAt: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

let users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'user',
    dateOfBirth: '1990-01-01',
    createdAt: new Date().toISOString(),
  },
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return res.status(200).json(users);

    case 'POST': {
      const { name, email, role, dateOfBirth, firstName, lastName, phone } =
        req.body;

      if (!email) {
        return res
          .status(400)
          .json({ success: false, error: 'Email is required' });
      }

      const newUser: User = {
        id: Date.now().toString(),
        name: name || `${firstName} ${lastName}`.trim() || 'Unknown User',
        email,
        role: role || 'user',
        dateOfBirth,
        createdAt: new Date().toISOString(),
        firstName,
        lastName,
        phone,
      };

      users.push(newUser);
      return res.status(201).json(newUser);
    }

    case 'PUT': {
      const { id } = req.query;
      const updates = req.body;

      if (!id || Array.isArray(id)) {
        return res
          .status(400)
          .json({ success: false, error: 'Missing or invalid user ID' });
      }

      const userIndex = users.findIndex((u) => u.id === id);

      if (userIndex === -1) {
        return res
          .status(404)
          .json({ success: false, error: 'User not found' });
      }

      users[userIndex] = { ...users[userIndex], ...updates };
      return res.status(200).json(users[userIndex]);
    }

    case 'DELETE': {
      const { id } = req.query;

      if (!id || Array.isArray(id)) {
        return res
          .status(400)
          .json({ success: false, error: 'Missing or invalid user ID' });
      }

      const initialLength = users.length;
      users = users.filter((u) => u.id !== id);

      if (users.length === initialLength) {
        return res
          .status(404)
          .json({ success: false, error: 'User not found' });
      }

      return res.status(200).json({ success: true, id });
    }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
