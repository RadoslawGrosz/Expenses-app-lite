interface Image {
  url: string;
  name: string;
}

export enum StatusEnum {
  All = "all",
  Paid = "paid",
  PartlyPaid = "partly-paid",
}

interface IObjectKeys {
  [key: string]: string | number | Image | undefined;
}

export interface Expense extends IObjectKeys {
  id: string | undefined;
  name: string;
  date: string;
  amount: number;
  img: Image;
  status: StatusEnum;
  description: string;
}
