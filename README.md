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

      - **types**: feat for features, fix for bug fixes.
      - **card-id**: Use the ID from the Trello card URL.

        - Example: For the URL `https://trello.com/c/HaAUwSZv/13-install-tailwindcss-in-design-system`, the ID is `HaAUwSZv`.

      - **description**: A short description (maximum 5 words) of the task, ideally the title.

    - Create the branch by branching out from the `main` branch:

    ```bash
    git checkout -b feat/HaAUwSZv/install-tailwind-in-design-system
    ```

    - **Important** ⚠️: Please do not push directly to the main branch.

1.  Submit a Pull Request (PR)

    - Once the task is complete, push your branch and submit a PR.
    - Use the [PR template](./pull_request_template.md) provided in the repository.
    - Assign the PR to the team lead for review.
