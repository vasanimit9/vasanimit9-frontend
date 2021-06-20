import { State } from "../types";

export const getFrontPage = (state: State) => state.frontPage;

export const getExperiences = (state: State) => state.experiences;

export const getProjects = (state: State) => state.projects;

export const getPosts = (state: State) => state.posts;

export const getPost = (id?: string) => (state: State) =>
  state.posts.find((post) => (id ? post.id === +id : false));
