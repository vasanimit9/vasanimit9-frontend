import { IExperience, IFrontPage, IProject } from ".";

export enum ActionTypes {
  StoreFrontPage,
  StoreExperiences,
  StoreProjects,
}

export type ActionSuperType = {
  type: ActionTypes;
  payload: IFrontPage | IExperience[] | IProject[];
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

export type Action = StoreFrontPage | StoreExperiences | StoreProjects;

export type State = {
  frontPage?: IFrontPage;
  experiences: IExperience[];
  projects: IProject[];
};
