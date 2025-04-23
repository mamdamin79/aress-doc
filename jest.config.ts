import { getJestProjectsAsync } from '@nx/jest';
import '@testing-library/jest-dom/extend-expect';

export default async () => ({
  projects: await getJestProjectsAsync(),
});
