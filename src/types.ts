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

export interface Reply {
  id: number;
  username: string;
  date: string;
  content: string;
}

export interface Comment {
  id: number;
  username: string;
  date: string;
  content: string;
  replies: Reply[];
}

export interface Post {
  id: number;
  title: string;
  body: string;
  relatedPosts: RelatedPost[];
  date: string;
  numRead: number;
  category: string;
}
