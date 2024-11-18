import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import readingTime from "reading-time";
import { PostMetadata } from "@/interfaces/posts";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";

const postsDirectory = path.join(process.cwd(), "src/posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    metadata: {
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      slug: realSlug,
      readingTime: readingTime(content).text,
      category: data.category,
    },
    content,
  };
}

export async function markdownToHtml(content: string) {
  const result = await remark()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
    })
    .use(rehypePrismPlus)
    .use(rehypeCodeTitles)
    .use(rehypeStringify)
    .process(content);
  return result.toString();
}

export function getAllPosts(): PostMetadata[] {
  const slugs = getPostSlugs();

  const posts = slugs.map(
    (slug) => getPostBySlug(slug).metadata as PostMetadata,
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
