import {
  SiApachekafka,
  SiApollographql,
  SiDocker,
  SiExpo,
  SiExpress,
  SiFigma,
  SiGit,
  SiGraphql,
  SiJavascript,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPuppeteer,
  SiRabbitmq,
  SiReact,
  SiRedis,
  SiSelenium,
  SiTailwindcss,
  SiTypescript,
  SiElasticsearch,
  SiGo,
  SiAwsamplify,
} from "react-icons/si";
import { age } from "./time";
import env from "./get-env";

export const DISCORD_WEBHOOK = env("NEXT_PUBLIC_DISCORD_WEBHOOK") as string;

export const data = {
  github: "yunus-acar",
  discordId: 470385774584397837n,
  twitter: "yunus_acar22",
  linkedin: "yunus-acar",
  instagram: "yunus.acar22",
  email: "me@yunusacar.dev",
  medium: "https://medium.com/@yunus-acar",
  fullName: "Yunus Emre Acar",
  title: "Software Developer",
  favicon: "https://avatars3.githubusercontent.com/u/61521272?s=460&v=4",
  name: "Yunus Emre",
  about: `I'm ${age} years old, a dedicated full stack developer. In this era
          where the digital world takes shape with enchanting lines of code, I'm
          passionate about bringing web projects and mobile applications to
          life. From front-end to back-end, from user experience to database
          management, I continuously enhance my skills and stay up-to-date with
          the latest trends. Through the technologies that I am using, I craft
          designs that are not only aesthetically pleasing but also functional
          and user-friendly, be it on the web or within mobile apps. |  Immersed in a lifestyle intertwined with technology, I translate the
          dance of code into captivating web pages and mobile experiences,
          leaving a mark on the digital realm. Feel free to get in touch for
          your projects. I'm eagerly looking forward to infusing the digital
          world with creative innovation together!`,
  technologies: [
    {
      icon: SiNodedotjs,
      name: "Node.js",
    },
    {
      icon: SiJavascript,
      name: "JavaScript",
    },
    {
      icon: SiTypescript,
      name: "TypeScript",
    },
    {
      icon: SiExpress,
      name: "Express.js",
    },
    {
      icon: SiGraphql,
      name: "GraphQL",
    },
    {
      icon: SiApollographql,
      name: "Apollo GraphQL",
    },
    {
      icon: SiPuppeteer,
      name: "Puppeteer",
    },
    {
      icon: SiSelenium,
      name: "Selenium",
    },
    {
      icon: SiMongodb,
      name: "MongoDB",
    },
    {
      icon: SiPostgresql,
      name: "PostgreSQL",
    },
    {
      icon: SiRedis,
      name: "Redis",
    },
    {
      icon: SiPrisma,
      name: "Prisma",
    },
    {
      icon: SiDocker,
      name: "Docker",
    },
    {
      icon: SiReact,
      name: "React.js",
    },
    {
      icon: SiNextdotjs,
      name: "Next.js",
    },
    {
      icon: SiTailwindcss,
      name: "TailwindCSS",
    },
    {
      icon: SiFigma,
      name: "Figma",
    },
    {
      icon: SiGit,
      name: "Git",
    },
    {
      icon: SiNestjs,
      name: "NestJS",
    },
    {
      icon: SiApachekafka,
      name: "Kafka",
    },
    {
      icon: SiRabbitmq,
      name: "RabbitMQ",
    },
    {
      icon: SiExpo,
      name: "Expo",
    },
    {
      icon: SiElasticsearch,
      name: "Elasticsearch",
    },
    {
      icon: SiGo,
      name: "Go Lang",
    },
    {
      icon: SiAwsamplify,
      name: "AWS Amplify",
    },
  ],
};
