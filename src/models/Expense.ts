import { IGroup } from "./Group";
import { IUser } from "./User";

export interface IExpense {
  _id: string;
  name: string;
  description: string;
  amount: number;
  paidBy: IUser
  group: IGroup;
  splitBetween: IUser[];
}
