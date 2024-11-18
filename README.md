# Personal Website

This project is a personal website combining **portfolio** and **blog** features. It is built with **Next.js** and offers a modern design along with a robust content management system.

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:yunus-acar/personal-website.git
   ```

2. Navigate to the project directory:

   ```bash
   cd personal-website
   ```

3. Install dependencies:

   ```bash
   yarn
   ```

4. Start the development server:

   ```bash
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## Blog Posts and Content Management

- **Blog Posts:**  
  Blog posts can be created in **Markdown (`.md`) format** under the `src/posts` folder. The content is processed using **Remark** and **Rehype** libraries, making it easy to write and manage your posts in Markdown.

- **Other Content:**  
  Non-blog dynamic content (e.g., portfolio projects) is defined in the `src/utils/constant.ts` file. You can edit this file to update your portfolio or other static content.

## Technologies

Key technologies used in this project:

- **Next.js**: React-based framework for server-side rendering and static site generation.
- **Tailwind CSS**: Modern low-level CSS framework.
- **TypeScript**: For more reliable and scalable code.
- **Remark & Rehype**: For processing Markdown content and converting it to HTML.

## File Structure

- **`src/components`**: Components (e.g., blog cards, project cards).
- **`src/pages`**: Next.js page routes (e.g., `/index`, `/contact`).
- **`src/posts`**: Blog posts in Markdown format.
- **`src/utils/constant.ts`**: Central management of non-blog content.
- **`public`**: Static files (e.g., `robots.txt`, `pop.mp3`).

## Contact

For any questions or suggestions, feel free to reach out:  
**Email**: [me@yunusacar.dev](mailto:me@yunusacar.dev)
