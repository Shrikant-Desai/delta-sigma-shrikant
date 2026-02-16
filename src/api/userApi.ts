import { api } from '@/lib/axios';
import type { User } from '@/types/user.types';
import type { UserFormData } from '@/schemas/userForm.schema';

export const userApi = {
  getUsers: async () => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  createUser: async (data: UserFormData) => {
    const newUser = {
      ...data,
      createdAt: new Date().toISOString(),
    };
    const response = await api.post<User>('/users', newUser);
    return response.data;
  },

  updateUser: async (id: string, data: Partial<UserFormData>) => {
    const response = await api.put<User>('/users', data, { params: { id } });
    return response.data;
  },

  deleteUser: async (id: string) => {
    await api.delete('/users', { params: { id } });
  },
};
