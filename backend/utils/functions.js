export const generateItem = (count) => {
  const characters = "0123456789";
  let char = "";
  for (let i = 0; i < count; i++) {
    char += characters[Math.floor(Math.random() * characters.length)];
  }
  return char;
};
