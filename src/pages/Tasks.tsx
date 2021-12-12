import { FC, useState, useEffect, useMemo } from "react"
import { Search } from "../components/header/Search"
import { Sort } from "../components/header/Sort"
import { TaskList } from "../components/tasks/TaskList"
import cl from '../styles/Tasks.module.scss'
import { TasksItemTypes } from "../types"
import Button from "@material-tailwind/react/Button";
import { FormValues, TaskModal } from "../components/TaskModal"
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux"
import { addItem, setItems } from "../redux/slices/tasks"
import { getTasks } from "../types/selectors"

export const Tasks: FC = () => {

  const state = useSelector(getTasks)
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState<boolean>(false);
  const [value, setValue] = useState<string>('')
  const [tasks, setTasks] = useState<TasksItemTypes[]>([])
  const [selectedSort, setSelectedSort] = useState<string>('')

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
    dispatch(addItem(newTask))
  }

  const reorder = (startIndex: number, endIndex: number) => {
    const result = Array.from(state.tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result: any) {

    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const items = reorder(
      result.source.index,
      result.destination.index
    );

    dispatch(setItems(items))
  }

  useEffect(() => {
    if (state) {
      setTasks(state.tasks)
    }
  }, [state])

  const sortedTasks = useMemo(() => {
    if (selectedSort === 'title') {
      return [...tasks].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    }

    if (selectedSort === 'priority') {
      return [...tasks].sort((a, b) => a.priority - b.priority)
    }

    return tasks
  }, [selectedSort, tasks])

  const searchedAndSortedTasks = useMemo(() => {
    if (value) {
      return [...sortedTasks].filter(item => item.title.toLowerCase().includes(value.toLowerCase()))
    } else {
      return sortedTasks
    }
  }, [value, sortedTasks])


  return (
    <div>
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided: any) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <TaskList list={searchedAndSortedTasks} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <TaskModal showModal={showModal} closeModal={() => setShowModal(false)} setTask={setNewTask} />
    </div>
  )
}