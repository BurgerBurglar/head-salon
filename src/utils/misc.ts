export const handleCopy = (text: string) => {
  void navigator.clipboard.writeText(text);
};

export const getStars = (rating: number) => {
  const numStars = Math.round(rating) / 2;
  const whole = Math.floor(numStars);
  const hasHalf = numStars % 1 !== 0;
  const empty = 5 - whole - (hasHalf ? 1 : 0);
  return {
    whole,
    hasHalf,
    empty,
  };
};

export const range = (n: number) => [...Array(n).keys()];
