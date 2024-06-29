export const createBackgroundString = ({ angle = 50, colors = "" }) => {
  return `linear-gradient(${angle}deg, ${colors})`;
};
