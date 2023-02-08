import type { RatingOutOf } from "../types";

export const handleCopy = (text: string) => {
  void navigator.clipboard.writeText(text);
};

const roundToHalf = (n: number) => Math.round(n * 2) / 2;

export const getStars = (rating: number, ratingOutOf: RatingOutOf) => {
  // num stars should be X.0 or X.5
  const numStars = roundToHalf((rating / ratingOutOf) * 5);
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
