
export interface RootState {
  tasks: TasksState;
}

export interface TasksState {
  tasks: TasksItemTypes[]
}

export interface TasksItemTypes {
  id: number;
  title: string;
  tasks: string[];
}