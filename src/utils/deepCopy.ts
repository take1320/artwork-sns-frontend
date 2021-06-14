export const deepCopy = <T>(value: T): T => {
  return JSON.parse(JSON.stringify(value));
};
