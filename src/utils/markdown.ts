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
import rehypeExternalLinks from "rehype-external-links";

const postsDirectory = path.join(process.cwd(), "src/posts");

export function getPostSlugs() {
  const languages = ["en", "tr"];
  const slugs: string[] = [];

  languages.forEach((lang) => {
    const langDir = path.join(postsDirectory, lang);
    if (fs.existsSync(langDir)) {
      const files = fs.readdirSync(langDir);
      files.forEach((file) => {
        slugs.push(`${lang}/${file}`);
      });
    }
  });

  return slugs;
}

export function getPostBySlug(slug: string, lang = "en") {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${lang}/${realSlug}.md`);
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
      langaugeVersion: data.langaugeVersion,
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
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    })
    .use(rehypeStringify)
    .process(content);
  return result.toString();
}

export function getAllPosts(lang = "en"): PostMetadata[] {
  const langDir = path.join(postsDirectory, lang);
  const slugs = fs.readdirSync(langDir);

  const posts = slugs.map(
    (slug) =>
      getPostBySlug(slug.replace(/\.md$/, ""), lang).metadata as PostMetadata,
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
