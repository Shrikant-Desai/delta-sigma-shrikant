import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/api/userApi';
import type { UserFormData } from '@/schemas/userForm.schema';
import type { User } from '@/types/user.types';

import { toast } from 'sonner';

export interface UseUsersReturn {
  users: User[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  createUser: UseMutateFunction<User, Error, UserFormData, unknown>;
  isCreating: boolean;
  updateUser: UseMutateFunction<
    User,
    Error,
    { id: string; data: Partial<UserFormData> },
    unknown
  >;
  isUpdating: boolean;
  deleteUser: UseMutateFunction<void, Error, string, unknown>;
  isDeleting: boolean;
}

import { type UseMutateFunction } from '@tanstack/react-query';

export function useUsers(): UseUsersReturn {
  const queryClient = useQueryClient();

  const usersQuery = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: userApi.getUsers,
  });

  const createUserMutation = useMutation({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create user: ${error.message}`);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (variables: { id: string; data: Partial<UserFormData> }) =>
      userApi.updateUser(variables.id, variables.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update user: ${error.message}`);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete user: ${error.message}`);
    },
  });

  return {
    users: usersQuery.data,
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    error: usersQuery.error,
    createUser: createUserMutation.mutate,
    isCreating: createUserMutation.isPending,
    updateUser: updateUserMutation.mutate,
    isUpdating: updateUserMutation.isPending,
    deleteUser: deleteUserMutation.mutate,
    isDeleting: deleteUserMutation.isPending,
  };
}
