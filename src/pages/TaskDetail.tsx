import { FC, useEffect, useState } from "react"
import Button from "@material-tailwind/react/Button";
import { useHistory, useParams } from "react-router";
import { TASKS } from "../routes/constans";
import { getTasks } from "../types/selectors";
import { useSelector } from "react-redux";
import { ParamsTypes, TasksItemTypes } from "../types";
import H1 from "@material-tailwind/react/Heading1";
import cl from '../styles/TaskDetail.module.scss'
import TaskPoint from "../components/taskDetail/TaskPoint";

export const TaskDetail: FC = () => {

  const [task, setTask] = useState<TasksItemTypes>()
  const history = useHistory()
  const id = useParams<ParamsTypes>()
  const state = useSelector(getTasks)

  useEffect(() => {
    state.tasks.filter(item => {
      if (item.id === +id.id) {
        setTask(item)
      }
    })
  }, [])


  // function onChange(boolean: boolean, index: number) {
    
  // }


  return (
    <div>
      <Button
        color="lightBlue"
        size="lg"
        ripple="light"
        onClick={() => history.push(TASKS)}
      >
        Вернуться назад
      </Button>
      {task
        ?
        <div className={cl.content}>
          <H1>{task.title}</H1>
          <ul className={cl.list}>
            {task.tasks.map((item, index) =>
              <li key={item.id} className={cl.item}>
                <TaskPoint
                  id={item.id}
                  text={item.text}
                  checked={item.checked}

                />
              </li>
            )}
          </ul>
        </div>
        :
        <h1>Что-то пошло не так</h1>
      }
    </div>
  )
}