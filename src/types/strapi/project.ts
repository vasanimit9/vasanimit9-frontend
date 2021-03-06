import { ITag } from "./tag";

/**
 * Model definition for project
 */
export interface IProject {
  id: number;
  name?: string;
  description?: string;
  tags: ITag[];
  repo?: string;
  url?: string;
  circa?: Date;
}
