import BlogCard from "@/components/blog-card";
import { PostMetadata } from "@/interfaces/posts";
import { getAllPosts } from "@/utils/markdown";
import { GetStaticProps } from "next";
import React from "react";

const Blogs = ({ posts }: { posts: PostMetadata[] }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold sm:text-3xl">Welcome to my blog 📝</h1>
      <p className="text-gray-500">
        I write about software development, productivity, and other random
        thoughts.
      </p>
      <div className="grid grid-cols-6 gap-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
};
