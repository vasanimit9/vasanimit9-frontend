import { Action, ActionTypes, State } from "../types";

export const reducer = (
  state: State = { frontPage: undefined, experiences: [], projects: [] },
  action: Action
): State => {
  switch (action.type) {
    case ActionTypes.StoreFrontPage:
      return { ...state, frontPage: action.payload };
    case ActionTypes.StoreExperiences:
      return { ...state, experiences: action.payload };
    case ActionTypes.StoreProjects:
      return { ...state, projects: action.payload };
    default:
      return { ...state };
  }
};
