import { IUser } from "./User";

export interface IGroup {
  id: number;
  name: string;
  description: string;
  coverImageUrl: string;
  categories: string[];
  members: IUser[];
}
