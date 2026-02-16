import { z } from 'zod';

export type UserFieldType = 'text' | 'email' | 'select' | 'date';

export interface UserFieldConfig {
  name: keyof z.infer<typeof userSchema>;
  label: string;
  type: UserFieldType;
  required: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
}

export const userSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  role: z.enum(['admin', 'user'] as const),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date of birth is required.' })
    .refine(
      (date) => {
        const today = new Date();
        const dob = new Date(date);
        return dob <= today;
      },
      { message: 'Date of birth cannot be in the future.' },
    ),
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
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    required: true,
    placeholder: 'YYYY-MM-DD',
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
