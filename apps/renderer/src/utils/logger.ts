export const log = (...args: any[]) => {
  console.log(`[${new Date().toISOString()}]`, ...args);
};

export const logError = (...args: any[]) => {
  console.error(`[${new Date().toISOString()}]`, ...args);
};
