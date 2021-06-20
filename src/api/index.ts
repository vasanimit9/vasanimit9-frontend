import { IExperience, IFrontPage, IPost, IProject } from "../types";
import axios from "axios";
import { apiBaseURL } from "../utils/constants";

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
