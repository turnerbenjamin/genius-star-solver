export default (arr) => {
  const min = 0;
  const max = arr.length - 1;
  const i = Math.floor(Math.random() * (max - min + 1)) + min;
  return arr[i];
};
