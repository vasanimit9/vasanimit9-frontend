import { IFile } from "./file";
import { ITag } from "./tag";

/**
 * Model definition for post
 */
export interface IPost {
  id: number;
  title?: string;
  tags: ITag[];
  featuredImage?: IFile;
  body?: string;
  date?: Date;
}
