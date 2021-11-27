import { FC, useState } from "react"
import { Search } from "../components/header/Search"
import { Sort } from "../components/header/Sort"
import { TaskList } from "../components/tasks/TaskList"
import cl from '../styles/Tasks.module.scss'
import { TasksItemTypes } from "../types"
import Button from "@material-tailwind/react/Button";
import { TaskModal } from "../components/TaskModal"

export const Tasks: FC = () => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TasksItemTypes[]>([
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
  ])

  function setNewTask() {

  }

  return (
    <div>
      <div className={cl.grid}>
        <div className={cl.item}>
          <Sort />
        </div>
        <div className={cl.item}>
          <Search />
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
      <TaskList list={tasks} />
      <TaskModal showModal={showModal} closeModal={() => setShowModal(false)} />
    </div>
  )
}