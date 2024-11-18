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
import { GithubOrganization, PinnedRepo } from "@/interfaces/github";
import { data } from "@/utils/constant";
import ProjectCard from "@/components/project-card";

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
