import { IFile } from './file';
import { ITag } from './tag';

/**
 * Model definition for Front Page
 */
export interface IFrontPage {
  id: string;
  heading?: string;
  tags: ITag[];
  profilePicture?: IFile;
  description?: string;
}