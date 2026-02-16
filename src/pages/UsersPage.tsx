import { Layout } from '@/components/Layout';
import { UserForm } from '@/components/UserForm';
import { UsersTable } from '@/components/UsersTable';
import { useState } from 'react';

const UsersPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

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
      ) : (
        <UsersTable />
      )}
    </Layout>
  );
};

export default UsersPage;
