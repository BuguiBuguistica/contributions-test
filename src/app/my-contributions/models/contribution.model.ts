import { Status, JobPosition, Role } from '../components/contribution-form/models';

export interface Contribution {
  id: number;
  title: string;
  description: string;
  creationDate: Date;
  targetDate: Date;
  status: Status;
  jobPosition: JobPosition;
  visibilityRole: Role;
  range: number;
}
