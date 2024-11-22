export interface PostMetadata {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  readingTime: string;
  category: string;
  langaugeVersion: "tr" | "en";
}

export interface Post {
  metadata: PostMetadata;
  content: string;
}
