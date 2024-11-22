import { PostMetadata } from "@/interfaces/posts";
import Link from "next/link";
import { LuCalendar, LuClock, LuFolder } from "react-icons/lu";

function BlogCard({ post }: { post: PostMetadata }) {
  return (
    <Link className="no-underline col-span-3" href={`/blogs/en/${post.slug}`}>
      <article className="flex  py-4 px-5 overflow-hidden relative flex-col text-blue-900/80 dark:text-gray-100 no-underline dark:hover:bg-white/10 bg-gradient-to-tr from-blue-100 dark:from-white/5 to-blue-700/5 dark:to-white/5 rounded-md dark:border border-white/10 md:rounded-lg">
        <div>
          <div className="flex items-center mb-3 text-sm ">
            <LuFolder className="w-4 h-4 mr-2" />
            <span>{post.category}</span>
          </div>
          <h2 className="text-xl font-bold mb-3 text-white transition-colors duration-300">
            {post.title}
          </h2>
          <p className="text-sm text-gray-300 mb-4">{post.excerpt}</p>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-400">
          <div className="flex items-center">
            <LuClock className="w-4 h-4 mr-1" />
            <span>{post.readingTime}</span>
          </div>
          <div className="flex items-center">
            <LuCalendar className="w-4 h-4 mr-1" />
            <span>{post.date}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default BlogCard;
