import { IOrganization } from "./organization";
import { ITag } from "./tag";

/**
 * Model definition for experience
 */
export interface IExperience {
  id: number;
  startDate: Date;
  endDate?: Date;
  position?: string;
  description?: string;
  tags: ITag[];
  organization?: IOrganization;
}
