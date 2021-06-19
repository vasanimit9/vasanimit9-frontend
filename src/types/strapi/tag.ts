import { IExperience } from './experience';
import { IProject } from './project';

/**
 * Model definition for tag
 */
export interface ITag {
  id: string;
  slug?: string;
  label?: string;
  experiences: IExperience[];
  projects: IProject[];
}