
export interface RootState {
  tasks: TasksState;
}

export interface TasksState {
  tasks: TasksItemTypes[]
}

export interface TasksItemTypes {
  id: number;
  title: string;
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