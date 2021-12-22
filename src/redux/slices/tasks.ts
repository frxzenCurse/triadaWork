import { TasksItemTypes, TasksState, SectionTypes } from './../../types/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  sections: []
} as TasksState

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<SectionTypes[]>) {
      state.sections = action.payload
      localStorage.setItem('section', JSON.stringify(state.sections))
    },
    addItem(state, action: PayloadAction<SectionTypes>) {
      state.sections = [...state.sections, action.payload]
      localStorage.setItem('section', JSON.stringify(state.sections))
    },
    removeItem(state, action: PayloadAction<number>) {
      state.sections = state.sections.filter(el => el.id !== action.payload)
      localStorage.setItem('tasks', JSON.stringify(state.sections))
    }
  }
})

export const { addItem, removeItem, setItems } = taskSlice.actions
export default taskSlice.reducer