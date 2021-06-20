import {
  ActionTypes,
  IExperience,
  IFrontPage,
  IProject,
  IPost,
  StoreExperiences,
  StoreFrontPage,
  StoreProjects,
  StorePosts,
} from "../types";

export const setFrontPage = (frontPage: IFrontPage): StoreFrontPage => ({
  type: ActionTypes.StoreFrontPage,
  payload: frontPage,
});

export const setExperiences = (
  experiences: IExperience[]
): StoreExperiences => ({
  type: ActionTypes.StoreExperiences,
  payload: experiences,
});

export const setProjects = (projects: IProject[]): StoreProjects => ({
  type: ActionTypes.StoreProjects,
  payload: projects,
});

export const setPosts = (posts: IPost[]): StorePosts => ({
  type: ActionTypes.StorePosts,
  payload: posts,
});
