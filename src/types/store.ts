import { IExperience, IFrontPage, IPost, IProject } from ".";

export enum ActionTypes {
  StoreFrontPage,
  StoreExperiences,
  StoreProjects,
  StorePosts,
}

export type ActionSuperType = {
  type: ActionTypes;
  payload: IFrontPage | IExperience[] | IProject[] | IPost[];
};

export interface StoreFrontPage extends ActionSuperType {
  type: ActionTypes.StoreFrontPage;
  payload: IFrontPage;
}

export interface StoreExperiences extends ActionSuperType {
  type: ActionTypes.StoreExperiences;
  payload: IExperience[];
}

export interface StoreProjects extends ActionSuperType {
  type: ActionTypes.StoreProjects;
  payload: IProject[];
}

export interface StorePosts extends ActionSuperType {
  type: ActionTypes.StorePosts;
  payload: IPost[];
}

export type Action =
  | StoreFrontPage
  | StoreExperiences
  | StoreProjects
  | StorePosts;

export type State = {
  frontPage?: IFrontPage;
  experiences: IExperience[];
  projects: IProject[];
  posts: IPost[];
};
