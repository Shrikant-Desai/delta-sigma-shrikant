import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/api/userApi';
import type { UserFormData } from '@/schemas/userForm.schema';
import type { User } from '@/types/user.types';

export function useUsers() {
  const queryClient = useQueryClient();

  const usersQuery = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: userApi.getUsers,
  });

  const createUserMutation = useMutation({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (variables: { id: string; data: Partial<UserFormData> }) =>
      userApi.updateUser(variables.id, variables.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
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
