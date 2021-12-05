import { TasksItemTypes, TasksState } from './../../types/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  tasks: [
    {
      id: 1,
      title: 'HEllo world',
      tasks: ["qwe", "asd", "zxc"]
    },
    {
      id: 2,
      title: 'Nice one',
      tasks: ["hjkl", "dfg", "cvbn"]
    },
    {
      id: 3,
      title: 'stop world',
      tasks: ["fdgsdf", "tuyotyu", "khhf"]
    },
    {
      id: 4,
      title: 'go away world',
      tasks: ["uiopjh", "bvgjhf", "qrehd"]
    },
  ]
} as TasksState

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TasksItemTypes[]>) {
      state.tasks = action.payload
    },
    addItem(state, action: PayloadAction<TasksItemTypes>) {
      state.tasks = [...state.tasks, action.payload]
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    removeItem(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter(el => el.id !== action.payload)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  }
})

export const { addItem, removeItem, setItems } = taskSlice.actions
export default taskSlice.reducer