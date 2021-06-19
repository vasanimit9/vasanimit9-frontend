import { IOrganization } from './organization';
import { ITag } from './tag';

/**
 * Model definition for experience
 */
export interface IExperience {
  id: string;
  startDate: Date;
  endDate?: Date;
  position?: string;
  description?: string;
  tags: ITag[];
  organization?: IOrganization;
}