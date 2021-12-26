import { FC, useState, useEffect, useMemo } from "react"
import { Search } from "../components/header/Search"
import { Sort } from "../components/header/Sort"
import { TaskList } from "../components/tasks/TaskList"
import cl from '../styles/Tasks.module.scss'
import { ParamsTypes, SectionTypes, TasksItemTypes } from "../types"
import Button from "@material-tailwind/react/Button";
import { FormValues, TaskModal } from "../components/TaskModal"
import { useSelector, useDispatch } from "react-redux"
import { setItems } from "../redux/slices/tasks"
import { getTasks } from "../types/selectors"
import { useParams } from "react-router-dom"
import H2 from "@material-tailwind/react/Heading2";

export const Tasks: FC = () => {

  const state = useSelector(getTasks)
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState<boolean>(false);
  const [value, setValue] = useState<string>('')
  const [section, setSection] = useState<SectionTypes | null>(null)
  const [selectedSort, setSelectedSort] = useState<string>('')

  const id = useParams<ParamsTypes>()

  function setNewTask(task: FormValues) {
    const arr = task.tasks.map(item => {
      return {
        id: Math.round(Math.random() * 1000),
        text: item.text,
        checked: false,
      }
    })
    const newTask: TasksItemTypes = {
      id: Math.round(Math.random() * 1000),
      title: task.title,
      tasks: arr,
      priority: 5,
    }

    setSection({ ...section, tasks: [...section.tasks, newTask] })
  }

  useEffect(() => {
    state.sections.filter(item => {
      if (item.id === +id.id) {
        setSection(item)
      }
    })
  }, [])


  useEffect(() => {
    if (section) {
      const result = state.sections.map(item => {
        if (item.id === section.id) {
          return section
        } else {
          return item
        }
      })
      
      dispatch(setItems(result))
    }
  }, [section])


  const sortedTasks = useMemo(() => {
    if (section) {

      if (selectedSort === 'title') {
        return [...section.tasks].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
      }

      if (selectedSort === 'priority') {
        return [...section.tasks].sort((a, b) => a.priority - b.priority)
      }

      return section.tasks
    } else {
      return []
    }
  }, [selectedSort, section])

  const searchedAndSortedTasks = useMemo(() => {
    if (value) {
      return [...sortedTasks].filter(item => item.title.toLowerCase().includes(value.toLowerCase()))
    } else {
      return sortedTasks
    }
  }, [value, sortedTasks])

  function deleteItem(id: number) {
    setSection({...section, tasks: [...section.tasks].filter(item => item.id !== id)})
  }

  return (
    <div>
      <div className={cl.title}>
        {section && <H2>{section.title}</H2>}
      </div>
      <div className={cl.grid}>
        <div className={cl.item}>
          <Sort onChange={(e) => setSelectedSort(e.value)} />
        </div>
        <div className={cl.item}>
          <Search
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          />
        </div>
      </div>
      <div className={cl.row}>
        <div className={cl.col}>
          <Button size="lg" onClick={() => setShowModal(true)}>
            Добавить задачу
          </Button>
        </div>
        <div className={cl.col}></div>
      </div>
      <TaskList deleteItem={deleteItem} list={searchedAndSortedTasks} />
      <TaskModal showModal={showModal} closeModal={() => setShowModal(false)} setTask={setNewTask} />
    </div>
  )
}