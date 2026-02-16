import { Layout } from '@/components/Layout';
import type { User } from '@/types/user.types';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/api/userApi';
import { UserForm } from '@/components/UserForm';
import { useState } from 'react';

const UsersPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: userApi.getUsers,
  });

  return (
    <Layout
      headerTitle="Users Management"
      headerAction={
        !isFormOpen && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Add User
          </button>
        )
      }
    >
      {isFormOpen ? (
        <UserForm
          onSuccess={() => setIsFormOpen(false)}
          onCancel={() => setIsFormOpen(false)}
        />
      ) : isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : isError ? (
        <div className="text-destructive text-center py-10">
          Error loading users. Please try again.
        </div>
      ) : users?.length === 0 ? (
        <div className="border border-dashed rounded-lg p-10 text-center text-muted-foreground flex flex-col items-center justify-center gap-2">
          <div className="bg-muted p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 opacity-50"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="19" y1="8" x2="25" y2="8"></line>
              <line x1="22" y1="5" x2="22" y2="11"></line>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            No users found
          </h3>
          <p className="max-w-sm text-sm">
            You haven't added any users yet. Click the button above to create
            one.
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Add User
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users?.map((user) => (
            <div
              key={user.id}
              className="border p-4 rounded-lg shadow-sm bg-card text-card-foreground"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${user.role === 'admin' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground border-border'}`}
                >
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-4 pt-4 border-t">
                Created on {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default UsersPage;
