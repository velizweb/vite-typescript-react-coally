export type TaskStatus = "PENDING" | "COMPLETED";

export type Task = {
  _id?: number | string | undefined;
  title: string;
  description: string;
  state?: boolean;
  createdAt?: string;
};

export type User = {
  name: string,
  email: string,
  token: string
}
export type Column = {
  id: TaskStatus;
  title: string;
  state: boolean;
};
