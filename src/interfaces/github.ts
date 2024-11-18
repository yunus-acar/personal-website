export interface PinnedRepo {
  owner: string;
  repo: string;
  description: string;
  language: string;
  languageColor: string;
  stars: string;
  forks: string;
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
