import { IExperience } from './experience';

/**
 * Model definition for organization
 */
export interface IOrganization {
  id: string;
  url?: string;
  name: string;
  experiences: IExperience[];
}