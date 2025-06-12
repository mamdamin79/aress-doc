# Aress Frontend Project

The monorepo is generated using [Nx](https://nx.dev). We're using [pnpm](https://pnpm.io/) as package manager, so try to stick to it.

## Folder structure

    - Apps      // contains applications we're going to develop on the FE side
    - Libs      // all FE libraries (mostly non-buildable) would live here

## Preparation

### Install nx (globally)

```bash
npm install -g nx
```

### Install pnpm (globally)

```bash
npm install -g pnpm
```

## Scripts (Commands)

To run the main app (built via NextJS), run the following command:

```bash
nx dev fe-app
```

To run the design-system in Storybook modeDevelopment and Pull Request (PR) Process
Assign the Ticket

Find the task (card) assigned to you on the Trello board.
Assign the ticket to yourself.
Move the Ticket

Move the ticket from the "To Do" column to the "Doing" column.
Make sure you have no more than 1 or, at most, 2 tickets in the "Doing" column at any time.
Read the Ticket Carefully

Go through the ticket details thoroughly to understand the task requirements.
Create a Branch

Use the following naming convention for your branch: {type}/{card-id}/{description}
types: feat for features, fix for bug fixes.
card-id: Use the ID from the Trello card URL.
Example: For the URL https://trello.com/c/HaAUwSZv/13-install-tailwindcss-in-design-system, the ID is HaAUwSZv.
description: A short description (maximum 5 words) of the task, ideally the title.
Create the branch by branching out from the main branch:
bash
Copy code
git checkout -b feat/HaAUwSZv/install-tailwind-in-design-system
Submit a Pull Request (PR)

Once the task is complete, push your branch and submit a PR.
Use the PR template provided in the repository.
Assign the PR to the team lead for review., run the following command:

```bash
nx storybook design-system
```

## Running unit tests

Run `nx test design-system` to execute the unit tests via [Vitest](https://vitest.dev/).

## Development and Pull Request (PR) Process

1.  Assign the Ticket

    - Find the task (card) assigned to you on the Trello board.
    - Assign the ticket to yourself.

1.  Move the Ticket

    - Move the ticket from the "To Do" column to the "Doing" column.
    - Make sure you have no more than 1 or, at most, 2 tickets in the "Doing" column at any time.

1.  Read the Ticket Carefully

    - Go through the ticket details thoroughly to understand the task requirements.

1.  Create a Branch

    - Use the following naming convention for your branch: `{type}/{card-id}/{description}`

      - **types**:

        - **feat** for features
        - **fix** for bug fixes.

      - **card-id**: Use the ID from the Trello card URL.

        - Example: For the URL `https://trello.com/c/HaAUwSZv/13-install-tailwindcss-in-design-system`, the ID is `HaAUwSZv`.

      - **description**: A short description (maximum 5 words) of the task, ideally the title.

    - Create the branch by branching out from the `main` branch:

    ```bash
    git checkout -b feat/HaAUwSZv/install-tailwind-in-design-system
    ```

    - **Important** ⚠️: Please do not push directly to the main branch.

1.  Do the task
1.  Submit a Pull Request (PR)

    - Once the task is complete, push your branch and submit a PR.
    - Use the [PR template](./pull_request_template.md) provided in the repository.
    - Assign the PR to the team lead for review.

1.  Move the card to the Code Review column on Trello

## React Components Conventions

### File Naming Conventions

- **Component Files**: Use PascalCase for component file names and directories. Each component should live in its own folder.
  - _Example_: `ComponentName.tsx`
- **Test Files**: Test files should follow the naming convention `ComponentName.test.tsx` and be located in the same folder as the component.

**Types**: If your component has multiple types/interfaces, define them in `ComponentName.types.ts`. For a single type, keep it inside the component file itself.

- _Example_: `ComponentName.types.ts`

- **Constants**: If the component has constants that are reused across the project/folder, define them in `ComponentName.constants.ts` to follow the DRY principle.

  - _Example_: `ComponentName.constants.ts`

- **Index File**: Each component folder should contain an index.ts file to manage and simplify imports.

#### Folder Structure Example

Below is an example of how to structure a React component folder:

```bash
components/
└── ComponentName/
    ├── ComponentName.tsx            # The main component file
    ├── ComponentName.test.tsx       # Unit tests for the component
    ├── ComponentName.types.ts       # (Optional) TypeScript types/interfaces
    ├── ComponentName.constants.ts   # (Optional) Constants used in the component
    └── index.ts                     # Exports the component, types, and constants
```

an overview of a component living beside other components:

```bash
src/
└── components/
    ├── Button/
    │   ├── Button.tsx
    │   ├── Button.test.tsx
    │   ├── Button.types.ts          # If more than one type is defined
    │   ├── Button.constants.ts      # If there are reusable constants
    │   └── index.ts
    ├── Card/
    │   ├── Card.tsx
    │   └── index.ts
    └── index.ts
```

### Component File

- **Props**: If the component has props, define the Props interface inside the component file (ComponentName.tsx).

### Index File

Each component folder should have an `index.ts` file that exports the component and, if necessary, other resources like types and constants.

Example `Button/index.ts`:

```ts
export * from './Button';
export * from './Button.types'; // Export types if needed
export * from './Button.constants'; // Export constants if needed
```

### Main Components Export File

When a new component is created, ensure it is exported from the main `components/index.ts` file so it can be easily imported throughout the project.

Example components/index.ts:

```ts
export * from './Button';
export * from './Card';
```

⚠️⚠️⚠️ Never use `export default` ⚠️⚠️⚠️: [Why](https://dev.to/phuocng/avoid-using-default-exports-a1c)? and [Read more](https://rajeshnaroth.medium.com/avoid-es6-default-exports-a24142978a7a)

#### Example File

```tsx
interface Props {
  title: string;
  classNames?: string;
}

export function Header({ title, classNames }: Props) {
  return <header className="bg-indigo-200">This is header!</header>;
}
```


# Tailwind CSS Design System Color Generator

This script automatically extracts colors from your CSS files and adds them to your `tailwind.config.js` configuration. It also extracts CSS color variables for use in Tailwind projects into the `tailwind-imports.css` file.

## Project Structure

The project should be structured as follows:

```bash
project
│
├── scripts
│   └── tailwindcss-design-system-color-generator
│       ├── tailwindcss-design-system-color-generator.ts
│       └── inputs
│           ├── primitives
│           │   └── example.css
│           ├── files.css
│           ├── 1.css
│           └── token--dark.css
├── libs
│   └── design-system
│       └── tailwind.config.js
└── .storybook
    └── tailwind-imports.css
```


- **inputs**: This folder should contain all of your CSS files. Primitive colors should be placed inside the `primitives` folder, and other CSS files should remain in the `inputs` folder.
- **tailwind.config.js**: The Tailwind CSS configuration file where the extracted colors will be added.
- **tailwind-imports.css**: The CSS file containing the extracted color variables for use in your project.

## Usage

1. **Prepare your project**:
   - Place all of your CSS files inside the `inputs` folder.
   - CSS files with primitive colors should go inside the `inputs/primitives` folder.
   - CSS files containing dark theme colors should end with the `--dark.css` suffix.

2. **Install Dependencies**:
   Make sure you have **Node.js** and **npm** installed on your system.

   Then, install TypeScript globally using the following command:

 ```bash
   npm i typescript -g
 ```
  
  ```bash
    ts-node scripts/tailwindcss-design-system-color-generator/tailwindcss-design-system-color-generator.ts
  ```