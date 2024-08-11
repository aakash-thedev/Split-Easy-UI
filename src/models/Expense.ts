import { IGroup } from "./Group";
import { IUser } from "./User";

export interface IExpense {
  description: string;
  amount: number;
  paidBy: IUser
  group: IGroup;
  splitBetween: IUser[];
}
