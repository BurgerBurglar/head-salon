export interface PostSummary {
  id: number;
  title: string;
  date: string;
  numRead: number;
  abstract: string;
  category: string;
}

export interface RelatedPost {
  id: number;
  title: string;
}

export interface Post {
  title: string;
  body: string;
  relatedPost: RelatedPost[];
  date: string;
  numRead: number;
  category: string;
}
