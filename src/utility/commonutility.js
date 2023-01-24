export const allowOnlyAlphabets = e => !/^[a-zA-Z]+$/.test(e.key) && e.preventDefault();

export const allowOnlyNumerics = e =>
  ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();
