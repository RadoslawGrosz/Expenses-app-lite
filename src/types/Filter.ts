import { StatusEnum } from "./Expense";

export enum SortPropertiesEnum {
  Name = "name",
  Date = "date",
  Amount = "amount",
  Status = "status",
  Description = "description",
}

export interface Filter {
  minAmount: number | undefined;
  maxAmount: number | undefined;
  status: StatusEnum;
  text: string;
  sortBy: SortPropertiesEnum;
  isSortDesc: boolean;
}
