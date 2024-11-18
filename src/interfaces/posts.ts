export interface PostMetadata {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  readingTime: string;
  category: string;
}

export interface Post {
  metadata: PostMetadata;
  content: string;
}
