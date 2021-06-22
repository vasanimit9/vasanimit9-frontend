import { IExperience, IFrontPage, IPost, IProject } from "../types";
import axios from "axios";
import { apiBaseURL, localStorageKeys } from "../utils/constants";

export const fetchFrontPage = async (): Promise<IFrontPage> => {
  return await axios.get(`${apiBaseURL}/front-page`).then((res) => res.data);
};

export const fetchExperiences = async (): Promise<IExperience[]> => {
  return await axios
    .get(`${apiBaseURL}/experiences`, {
      params: {
        _sort: "startDate:DESC",
      },
    })
    .then((res) => res.data);
};

export const fetchProjects = async (): Promise<IProject[]> => {
  return await axios
    .get(`${apiBaseURL}/projects`, {
      params: {
        _sort: "circa:DESC",
      },
    })
    .then((res) => res.data);
};

export const fetchPosts = async (): Promise<IPost[]> => {
  return await axios
    .get(`${apiBaseURL}/posts`, {
      params: {
        _sort: "date:DESC",
      },
    })
    .then((res) => res.data);
};

export const addFrontPageToStore = async (
  storeFrontPage: (frontPage: IFrontPage) => void
): Promise<void> => {
  const frontPage = localStorage.getItem(localStorageKeys.frontPage);
  if (frontPage) {
    storeFrontPage(JSON.parse(frontPage) as IFrontPage);
  }
  await fetchFrontPage()
    .then((frontPage) => {
      localStorage.setItem(
        localStorageKeys.frontPage,
        JSON.stringify({ ...frontPage })
      );
      storeFrontPage(frontPage);
    })
    .catch(console.error);
};

export const addExperiencesToStore = async (
  storeExperiences: (experiences: IExperience[]) => void
): Promise<void> => {
  const experiences = localStorage.getItem(localStorageKeys.experiences);
  if (experiences) {
    storeExperiences(JSON.parse(experiences) as IExperience[]);
  }
  await fetchExperiences()
    .then((experiences) => {
      localStorage.setItem(
        localStorageKeys.experiences,
        JSON.stringify([ ...experiences ])
      );
      storeExperiences(experiences);
    })
    .catch(console.error);
};

export const addProjectsToStore = async (
  storeProjects: (projects: IProject[]) => void
): Promise<void> => {
  const projects = localStorage.getItem(localStorageKeys.projects);
  if (projects) {
    storeProjects(JSON.parse(projects) as IProject[]);
  }
  await fetchProjects()
    .then((projects) => {
      localStorage.setItem(
        localStorageKeys.projects,
        JSON.stringify([ ...projects ])
      );
      storeProjects(projects);
    })
    .catch(console.error);
};

export const addPostsToStore = async (
  storePosts: (posts: IPost[]) => void
): Promise<void> => {
  const posts = localStorage.getItem(localStorageKeys.posts);
  if (posts) {
    storePosts(JSON.parse(posts) as IPost[]);
  }
  await fetchPosts()
    .then((posts) => {
      localStorage.setItem(
        localStorageKeys.posts,
        JSON.stringify([ ...posts ])
      );
      storePosts(posts);
    })
    .catch(console.error);
};
