import { Post } from "@/interfaces/posts";
import { getPostBySlug, getPostSlugs, markdownToHtml } from "@/utils/markdown";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { LuCalendar, LuClock, LuFolder, LuArrowLeft } from "react-icons/lu";

const Blog = ({ post, langauge }: { post: Post; langauge: "tr" | "en" }) => {
  return (
    <div className="min-h-screen w-full text-gray-100">
      <Link href="/blogs" className="inline-flex items-center mb-8">
        <LuArrowLeft className="w-5 h-5 mr-2" />
        Back to Blogs
      </Link>
      <article className="overflow-hidden no-underline">
        <div className="p-6 md:p-8">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center mb-4 text-sm">
              <LuFolder className="w-4 h-4 mr-2" />
              <span>{post.metadata.category}</span>
            </div>

            {post.metadata.langaugeVersion &&
              post.metadata.langaugeVersion !== langauge && (
                <div className="flex items-center mb-4 text-sm">
                  <Link
                    href={`/blogs/${post.metadata.langaugeVersion}/${post.metadata.slug}`}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded-md"
                  >
                    {langauge === "en" ? "Türkçe" : "English"}
                  </Link>
                </div>
              )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {post.metadata.title}
          </h1>

          <div className="flex justify-between items-center text-sm text-gray-400 mb-8">
            <div className="flex items-center">
              <LuClock className="w-4 h-4 mr-1" />
              <span>{post.metadata.readingTime}</span>
            </div>
            <div className="flex items-center">
              <LuCalendar className="w-4 h-4 mr-1" />
              <span>{post.metadata.date}</span>
            </div>
          </div>

          <div
            className="prose prose-invert prose-a:no-underline max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </div>
  );
};

export default Blog;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getPostSlugs();
  const paths: { params: { lang: string; slug: string } }[] = [];

  slugs.forEach((slug) => {
    const [lang, file] = slug.split("/");
    paths.push({ params: { lang, slug: file.replace(/\.md$/, "") } });
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params?.lang as string | undefined;
  const slug = params?.slug as string | undefined;

  if (!slug || !lang) {
    return { notFound: true };
  }

  const post = getPostBySlug(slug, lang);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post: {
        metadata: post.metadata,
        content: await markdownToHtml(post.content),
      },
      langauge: lang,
    },
  };
};
