
export interface RootState {
  sections: TasksState;
}

export interface TasksState {
  sections: SectionTypes[]
}

export interface SectionTypes {
  id: number;
  title: string;
  isClosed: boolean;
  tasks: TasksItemTypes[];
}

export interface TasksItemTypes {
  id: number;
  title: string;
  priority: number;
  tasks: TaskItemTypes[] | [];
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