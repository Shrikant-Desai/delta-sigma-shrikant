export interface User {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  role: 'admin' | 'user';
  createdAt: string;
}
