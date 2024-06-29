export const getTotalPage = (total: number, limit: number) => {
  let totalPage =
    total % limit === 0
      ? (total - (total % limit)) / limit
      : (total - (total % limit)) / limit + 1;
  totalPage = Number.isNaN(Number(totalPage)) ? 0 : Number(totalPage);
  return totalPage === 0 ? 1 : totalPage;
};
