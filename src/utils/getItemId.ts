export const getItemID = (url: string) => {
  if (!url) return "";
  const urlSplited = url?.split("/");
  const itemID = urlSplited[urlSplited?.length - 2];
  return itemID;
};
