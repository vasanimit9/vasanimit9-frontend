import { IExperience } from "./experience";
import { IPost } from "./post";
import { IProject } from "./project";

/**
 * Model definition for tag
 */
export interface ITag {
  id: number;
  slug?: string;
  label?: string;
  experiences: IExperience[];
  projects: IProject[];
  posts: IPost[];
}
