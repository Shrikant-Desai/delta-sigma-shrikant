import { Layout } from '@/components/Layout';
import type { User } from '@/types/user.types';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';

const UsersPage = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      return (await api.get('/users')).data;
    },
    // Mocking empty state initially if no data
    initialData: [],
  });

  return (
    <Layout
      headerTitle="Users Management"
      headerAction={
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
          Add User
        </button>
      }
    >
      {isLoading ? (
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
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users?.map((user) => (
            <div
              key={user.id}
              className="border p-4 rounded-lg shadow-sm bg-card text-card-foreground"
            >
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${user.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
              >
                {user.role}
              </span>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default UsersPage;
