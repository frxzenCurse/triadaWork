import { TasksItemTypes, TasksState } from './../../types/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  tasks: []
} as TasksState

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TasksItemTypes[]>) {
      state.tasks = action.payload
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
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