import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AnimatePresence, motion } from "framer-motion";
import { GetStaticProps } from "next";
import { useReducer } from "react";
import { SiGithub, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import {
  Data as LanyardData,
  LanyardError,
  LanyardResponse,
  useLanyard,
} from "use-lanyard";
import { LanyardCard } from "@/components/lanyard-card";
import { ListItem } from "@/components/list-item";
import { PinnedRepo } from "@/types/github";
import { data } from "@/util/constant";

dayjs.extend(relativeTime);

interface Props {
  pinnedRepos: PinnedRepo[];
  ghOrg: GithubOrganization[];
  orgDetail: GithubOrganization[];
  lanyard: LanyardData;
}

export default function Index(props: Props) {
  const { data: lanyard } = useLanyard(`${data.discordId}`);

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <a
            href={`https://github.com/${data.github}`}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
          >
            <SiGithub className="size-5" />
            <span className="sr-only">GitHub Profile</span>
          </a>

          <a
            href={`https://twitter.com/${data.twitter}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter Profile"
          >
            <SiX className="size-5" />
            <span className="sr-only">Twitter Profile</span>
          </a>
          <a
            href={`https://instagram.com/${data.instagram}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram Profile"
          >
            <SiInstagram className="size-5" />
            <span className="sr-only">Instagram Profile</span>
          </a>
          <a
            href={`https://www.linkedin.com/in/${data.linkedin}`}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
          >
            <SiLinkedin className="size-5" />
            <span className="sr-only">LinkedIn Profile</span>
          </a>
        </div>

        <h1 className="text-3xl font-bold sm:text-4xl md:text-6xl">
          Hey, I'm{" "}
          <span className="text-blue-700 dark:text-white">{data.name}</span> ✌️
        </h1>

        <p className="opacity-80">{data.about.split("|")[0]}</p>
        <p className="opacity-80">{data.about.split("|")[1]}</p>
      </div>

      <div className="space-y-4">
        <p className="text-2xl font-bold sm:text-3xl">What do I do? 💭</p>
        <p className="opacity-80">
          Below are some of the more popular open source projects I've worked
          on.
        </p>

        <div className="grid grid-cols-1 auto-cols-max gap-1 sm:grid-cols-2 sm:gap-3">
          {props.pinnedRepos.map((project: PinnedRepo) => (
            <ProjectCard key={project.repo} repo={project} />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-2xl font-bold sm:text-3xl">Lanyard 🎉</p>
        <LanyardCard lanyard={lanyard ? lanyard : null} />
      </div>
      <div className="space-y-4">
        <p className="text-2xl font-bold sm:text-3xl">Technologies 💻</p>
        <ul className="grid grid-cols-3 gap-4 sm:grid-cols-4">
          {data.technologies.map((tech, i) => (
            <ListItem key={i} icon={tech.icon} text={tech.name} />
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <p className="text-2xl font-bold sm:text-3xl">Organizations 🏢</p>
        <ul className="grid grid-cols-2 auto-cols-max gap-1 sm:grid-cols-2 sm:gap-3">
          {props.orgDetail.map((org: GithubOrganization) => (
            <li className="flex items-start" key={org.login}>
              <a
                href={org.html_url}
                target="_blank"
                rel="noreferrer"
                aria-label={org.login}
              >
                <img
                  src={org.avatar_url}
                  alt={org.login}
                  className="w-12 h-12 rounded-md"
                />
              </a>
              <span>
                <a
                  href={org.html_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={org.login}
                >
                  <p className="text-base mx-4 font-bold">{org.name}</p>
                </a>
                <a
                  href={`mailto:${org.email}`}
                  className="text-sm  no-underline mx-4 "
                >
                  {org.email}
                </a>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function ProjectCard({ repo: project }: { repo: PinnedRepo }) {
  const [isOpen, toggle] = useReducer((x: boolean) => !x, false);

  return (
    <motion.div
      key={project.repo}
      animate={{ height: isOpen ? "auto" : "54px" }}
      className="flex overflow-hidden relative flex-col text-blue-900/80 dark:text-gray-100 no-underline dark:hover:bg-white/10 bg-gradient-to-tr from-blue-100 dark:from-white/5 to-blue-700/5 dark:to-white/5 rounded-md dark:border border-white/10 md:rounded-lg"
    >
      <button
        type="button"
        className="flex items-center py-4 px-5 space-x-2 text-lg font-bold border-b border-white/10 focus:outline-none cursor-pointer select-none"
        onClick={toggle}
      >
        <div className="flex flex-1 items-center space-x-2 text-left">
          <span>{project.repo}</span>
          <span className="flex items-center space-x-3 text-xs">
            <span className="space-x-1">
              <span>⭐</span>
              <span>{project.stars}</span>
            </span>
            <span className="space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <span>{project.forks}</span>
            </span>
          </span>
        </div>
        <div>
          <motion.div
            className="p-1 bg-white/0 hover:bg-white/10 rounded-full"
            animate={{ rotate: isOpen ? 90 : 0 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full"
          >
            <div className="flex flex-col py-4 px-5 space-y-4">
              <p className="flex-1">{project.description}</p>

              <div>
                <a
                  href={`https://github.com/${project.owner}/${project.repo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center py-2 px-6 space-x-2 text-white no-underline bg-blue-700 dark:bg-white/10 rounded-full transition-transform duration-500 hover:scale-95 select-none"
                >
                  <span>View Project</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
export interface GithubOrganization {
  login: string;
  id: string;
  url: string;
  avatar_url: string;
  description: string;
  name: string;
  blog: string;
  email: string;
  html_url: string;
}
export const getStaticProps: GetStaticProps<Props> = async function () {
  const pinnedRepos = await fetch(
    `https://gh-pinned-repos-tsj7ta5xfhep.deno.dev/?username=${data.github}`,
  )
    .then(async (response) => response.json() as Promise<PinnedRepo[]>)
    .catch(() => []);

  const githubOrganizations = await fetch(
    `https://api.github.com/users/${data.github}/orgs`,
  )
    .then(async (response) => response.json() as Promise<GithubOrganization[]>)
    .catch(() => []);

  let orgDetail = [];

  for (const org of githubOrganizations) {
    const orgDetailResponse = await fetch(org.url).then(
      async (response) => response.json() as Promise<GithubOrganization>,
    );
    orgDetail.push(orgDetailResponse);
  }

  const lanyard = await fetch(
    `https://api.lanyard.rest/v1/users/${data.discordId}`,
  );

  const lanyardBody = (await lanyard.json()) as LanyardResponse;

  if ("error" in lanyardBody) {
    throw new LanyardError(
      new Request("https://api.lanyard.rest/v1/users/470385774584397837"),
      new Response(JSON.stringify(lanyardBody)),
      lanyardBody,
    );
  }

  return {
    props: {
      pinnedRepos,
      lanyard: lanyardBody.data,
      ghOrg: githubOrganizations,
      orgDetail,
    },
    revalidate: 60 * 60 * 12,
  };
};
