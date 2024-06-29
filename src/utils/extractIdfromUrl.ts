export const extractIdFromUrl = (url: string) => {
  const matches = url.match(/\/(\d+)\/$/);
  return matches ? matches[1] : undefined;
};
