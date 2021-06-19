import {
  ActionTypes,
  IExperience,
  IFrontPage,
  IProject,
  StoreExperiences,
  StoreFrontPage,
  StoreProjects,
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
