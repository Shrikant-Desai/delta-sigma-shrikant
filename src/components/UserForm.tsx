import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUsers } from '@/hooks/useUsers';
import {
  userSchema,
  type UserFormData,
  userFormConfig,
} from '@/schemas/userForm.schema';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface UserFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UserForm({ onSuccess, onCancel }: UserFormProps) {
  const { createUser, isCreating } = useUsers();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<UserFormData>({
    mode: 'onChange',
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      dateOfBirth: '',
    },
  });

  const onSubmit = (data: UserFormData) => {
    createUser(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg border shadow-sm">
      <div className="space-y-2 mb-6">
        <h3 className="text-2xl font-bold tracking-tight">Create User</h3>
        <p className="text-sm text-muted-foreground">
          Enter user details below to create a new account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {userFormConfig.map((field) => (
          <div key={field.name} className="space-y-2">
            <label
              htmlFor={field.name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {field.label}
              {field.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </label>

            {field.type === 'select' ? (
              <select
                id={field.name}
                defaultValue=""
                {...register(field.name)}
                className={cn(
                  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                  errors[field.name] &&
                    'border-destructive focus-visible:ring-destructive',
                )}
              >
                <option value="" disabled>
                  Select a {field.label}
                </option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.name)}
                className={cn(
                  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                  errors[field.name] &&
                    'border-destructive focus-visible:ring-destructive',
                )}
              />
            )}

            {errors[field.name] && (
              <p className="text-sm font-medium text-destructive animate-in slide-in-from-top-1">
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        ))}

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={!isValid || isSubmitting || isCreating}
            className={cn(
              'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full',
              !isValid
                ? 'bg-muted text-muted-foreground'
                : 'bg-primary text-primary-foreground hover:bg-primary/90',
            )}
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create User'
            )}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
