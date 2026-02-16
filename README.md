# User Management System

A modern, responsive, and type-safe User Management System built with React, TypeScript, and Vite. This application demonstrates a robust architecture for handling CRUD operations, form validation, and state management.

## 🚀 Project Overview

This project is a User Management Dashboard that allows administrators to View, Create, Update, and Delete users. It features a clean UI, real-time validation, optimistic UI updates, and a responsive design that works seamlessly across mobile, tablet, and desktop devices.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management & Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- **UI Components**: Custom components inspired by shadcn/ui
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Mock Backend**: [JSON Server](https://github.com/typicode/json-server)
- **HTTP Client**: [Axios](https://axios-http.com/)

## 🏃‍♂️ How to Run Locally

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd delta-sigma-shrikant
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Start the Mock Backend**:
    This project uses `json-server` to simulate a REST API. Open a terminal and run:

    ```bash
    npm run server
    ```

    The API will be available at `http://localhost:3001`.

4.  **Start the Frontend Development Server**:
    In a separate terminal window, run:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

## 🏗 Architecture Explanation

The project follows a modular, feature-based architecture designed for scalability and maintainability.

### Key Directories

- **`src/api`**: Contains API definition and Axios configuration. `userApi.ts` handles all HTTP requests to the backend.
- **`src/components`**: Reusable UI components.
  - `UserForm.tsx`: A smart form component that handles both creation and editing of users. It uses `react-hook-form` and `zod` for validation.
  - `UsersTable.tsx`: Displays the list of users with actions to edit and delete.
  - `Layout.tsx`: The main application shell with responsive navigation.
- **`src/hooks`**: Custom hooks for business logic.
  - `useUsers.ts`: A centralized hook wrapping React Query logic. It manages fetching, mutations (create, update, delete), and toast notifications.
- **`src/schemas`**: Zod schemas for validation.
  - `userForm.schema.ts`: Defines the shape of the user data and form configuration. This acts as the **single source of truth** for form fields.
- **`src/types`**: TypeScript interfaces and types shared across the application.

### Design Patterns

- **Schema-Driven Forms**: The `UserForm` component is dynamically generated based on the configuration in `userForm.schema.ts`. Adding a new field often requires **zero UI code changes**.
- **Optimistic Updates & Invalidation**: React Query is used to automatically refresh data (`queryClient.invalidateQueries`) after a successful mutation, ensuring the UI is always in sync with the server.
- **Centralized Logic**: All data fetching and mutation logic is encapsulated in the `useUsers` hook, keeping components clean and focused on presentation.

## ➕ How to Add New Fields

Thanks to the schema-driven architecture, adding a new field (e.g., "PhoneNumber") is straightforward:

1.  **Update the Schema (`src/schemas/userForm.schema.ts`)**:
    Add the new field to the `userSchema` and the `UserFieldType`.

    ```typescript
    export const userSchema = z.object({
      // ... existing fields
      phoneNumber: z.string().min(10, 'Invalid phone number'),
    });
    ```

2.  **Update the Form Config (`src/schemas/userForm.schema.ts`)**:
    Add the field configuration to `userFormConfig`.

    ```typescript
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'text', // or 'tel' if you add it to UserFieldType
      required: true,
      placeholder: '123-456-7890',
    }
    ```

3.  **Update the Type Definition (`src/types/user.types.ts`)**:
    Add the field to the `User` interface.

    ```typescript
    export interface User {
      // ...
      phoneNumber: string;
    }
    ```

4.  **Update the Table (`src/components/UsersTable.tsx`)**:
    Add a new table header (`<th>`) and row cell (`<td>`) to display the new data.

**That's it!** The form will automatically render the new input, handle validation, and submit the data.

## 📝 Assumptions

- **Backend**: The project assumes a RESTful API structure provided by `json-server`.
- **Authentication**: No authentication system is currently implemented (out of scope).
- **Date Handling**: Dates are stored as ISO strings or `YYYY-MM-DD` strings. Timezones are essentially treated as local for the purpose of the Date of Birth.
- **Unique Emails**: The backend (json-server) does not inherently enforce unique emails, but a real backend would.
