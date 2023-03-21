export const isDigit = (char: string) => {
  return char[0] >= "0" && char[0] <= "9";
};

export const isEmpty = (char: string) => {
  return char[0] === " ";
};

export const isEndOfLine = (char: string) => {
  return char[0] === "\r" || char[0] === "\n";
};

export const isLetter = (char: string) => {
  return (
    (char[0] >= "a" && char[0] <= "z") || (char[0] >= "A" && char[0] <= "Z")
  );
};
