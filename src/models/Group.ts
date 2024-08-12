import { IUser } from "./User";

export interface IGroup {
  _id: string;
  name: string;
  description: string;
  coverImageUrl: string;
  categories: string[];
  members: IUser[];
}
