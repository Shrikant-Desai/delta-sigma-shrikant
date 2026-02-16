import { z } from 'zod';

export type UserFieldType = 'text' | 'email' | 'select';

export interface UserFieldConfig {
  name: keyof z.infer<typeof userSchema>;
  label: string;
  type: UserFieldType;
  required: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[]; // For select inputs
}

export const userSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  role: z.enum(['admin', 'user'] as const),
});

export type UserFormData = z.infer<typeof userSchema>;

export const userFormConfig: UserFieldConfig[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    required: true,
    placeholder: 'John Doe',
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    placeholder: 'john@example.com',
  },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    required: true,
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
    ],
  },
];
