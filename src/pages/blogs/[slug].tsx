import { Post } from "@/interfaces/posts";
import { getPostBySlug, getPostSlugs, markdownToHtml } from "@/util/markdown";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { LuCalendar, LuClock, LuFolder, LuArrowLeft } from "react-icons/lu";

const Blog = ({ post }: { post: Post }) => {
  return (
    <div className="min-h-screen w-full text-gray-100">
      <Link href="/blogs" className="inline-flex items-center mb-8">
        <LuArrowLeft className="w-5 h-5 mr-2" />
        Back to Blogs
      </Link>
      <article className="overflow-hidden no-underline">
        <div className="p-6 md:p-8">
          <div className="flex items-center mb-4 text-sm">
            <LuFolder className="w-4 h-4 mr-2" />
            <span>{post.metadata.category}</span>
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
  const paths = slugs.map((slug) => ({
    params: { slug: slug.replace(/\.md$/, "") },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  if (!slug) {
    return { notFound: true, props: {} };
  }
  const post = getPostBySlug(slug);

  if (!post) {
    return { notFound: true, props: {} };
  }

  return {
    props: {
      post: {
        metadata: post.metadata,
        content: await markdownToHtml(post.content),
      },
    },
  };
};
