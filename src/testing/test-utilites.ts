export const randomString = (length: number) => 
  Array.from({ length }, () => (Math.random() * 36 | 0).toString(36)).join('');