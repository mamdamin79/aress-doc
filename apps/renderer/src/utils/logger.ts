// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const log = (...args: any[]) => {
  console.log(`[${new Date().toISOString()}]`, ...args);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logError = (...args: any[]) => {
  console.error(`[${new Date().toISOString()}]`, ...args);
};
