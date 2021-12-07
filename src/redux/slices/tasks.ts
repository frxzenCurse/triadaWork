import { TasksItemTypes, TasksState } from './../../types/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  tasks: [
    {
      id: 1,
      title: 'HEllo world',
      tasks: [
        {id: 1, checked: false, text: 'qwe'},
        {id: 2, checked: false, text: 'asd'},
        {id: 3, checked: false, text: 'zxc'},
      ]
    },
    {
      id: 2,
      title: 'Nice one',
      tasks: [
        {id: 1, checked: false, text: 'poi'},
        {id: 2, checked: false, text: 'iuy'},
        {id: 3, checked: false, text: 'hjk'},
      ]
    },
    {
      id: 3,
      title: 'stop world',
      tasks: [
        {id: 1, checked: false, text: 'yut'},
        {id: 2, checked: false, text: 'dfgh'},
        {id: 3, checked: false, text: 'cxvb'},
      ]
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