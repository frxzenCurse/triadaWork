
export interface RootState {
  tasks: TasksState;
}

export interface TasksState {
  tasks: TasksItemTypes[]
}

export interface TasksItemTypes {
  id: number;
  title: string;
  priority: number;
  tasks: TaskItemTypes[];
}

export interface TaskItemTypes {
  id: number;
  checked: boolean;
  text: string;
}

export interface ParamsTypes {
  id: string;
}

export interface ClassesTypes {
  cl: string;
}

export interface SelectOptionsTypes {
  value: string;
  label: string;
}