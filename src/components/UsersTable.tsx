import { useUsers } from '@/hooks/useUsers';
import type { User } from '@/types/user.types';
import { useState } from 'react';
import { Loader2, Trash2, Pencil, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function UsersTable() {
  const { users, isLoading, isError, deleteUser, isDeleting } = useUsers();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 border rounded-lg bg-card animate-pulse"
          >
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted rounded"></div>
              <div className="h-3 w-48 bg-muted rounded"></div>
            </div>
            <div className="h-8 w-8 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border border-destructive/20 bg-destructive/5 rounded-lg text-destructive">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p className="font-medium">Failed to load users</p>
        <p className="text-sm opacity-90">Please try refreshing the page</p>
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-lg bg-muted/10">
        <div className="p-3 bg-muted rounded-full mb-3">
          <AlertCircle className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No users found</h3>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-1">
          Get started by creating a new user above.
        </p>
      </div>
    );
  }

  return (
    <>
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-card border rounded-lg shadow-lg relative">
            {/* Edit mode overlay could be cleaner but reusing UserForm logic effectively 
                 would require refactoring UserForm to accept initial data.
                 For now, displaying placeholder or implement if UserForm supports updates */}
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4">Edit User</h3>
              <p className="text-muted-foreground mb-4">
                Editing functionality to be implemented in UserForm.
              </p>
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-md border bg-card">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Email
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Role
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="p-4 align-middle font-medium">{user.name}</td>
                  <td className="p-4 align-middle">{user.email}</td>
                  <td className="p-4 align-middle">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                        user.role === 'admin'
                          ? 'bg-primary/10 text-primary hover:bg-primary/20'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                      )}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 align-middle text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="p-2 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground"
                        title="Edit user"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      {confirmDeleteId === user.id ? (
                        <div className="flex items-center gap-2 animate-in slide-in-from-right-2">
                          <button
                            onClick={() => deleteUser(user.id)}
                            disabled={isDeleting}
                            className="text-xs bg-destructive text-destructive-foreground px-2 py-1.5 rounded-md hover:bg-destructive/90"
                          >
                            {isDeleting ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              'Confirm'
                            )}
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="text-xs bg-secondary text-secondary-foreground px-2 py-1.5 rounded-md hover:bg-secondary/80"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(user.id)}
                          className="p-2 hover:bg-destructive/10 text-destructive/70 hover:text-destructive rounded-md transition-colors"
                          title="Delete user"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
