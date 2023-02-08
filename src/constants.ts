import type { BookSummary } from "./types";

export const SHOULD_USE_TEST_DATA = true;

export const NUM_POSTS_PER_PAGE = 15;

export const PUBLISHED_BOOKS: BookSummary[] = [
  {
    title: "群居的艺术",
    subtitle: "人类作为一种物种的生存策略",
    coverPhoto: "/群居的艺术.jpg",
    doubanRating: 8.3,
    publishYear: 2017,
    role: "作者",
  },
  {
    title: "沐猿而冠",
    subtitle: "文化如何塑造人性",
    coverPhoto: "/沐猿而冠.jpg",
    doubanRating: 7.8,
    publishYear: 2015,
    role: "作者",
  },
  {
    title: "自由的进化",
    subtitle: "自由并非天赋？",
    coverPhoto: "/自由的进化.jpg",
    doubanRating: 8.1,
    publishYear: 2017,
    role: "作者",
  },
  {
    title: "自私的皮球",
    subtitle: "我们的日子为什么是这样过的",
    coverPhoto: "/自私的皮球.jpg",
    doubanRating: 8.4,
    publishYear: 2012,
    role: "作者",
  },
];
