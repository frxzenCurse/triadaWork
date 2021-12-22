import React, { FC, useEffect, useState, useMemo } from "react"
import Button from "@material-tailwind/react/Button";
import { useHistory, useParams } from "react-router";
import { TASKS } from "../routes/constans";
import { getTasks } from "../types/selectors";
import { useSelector, useDispatch } from "react-redux";
import { ParamsTypes, TaskItemTypes, TasksItemTypes } from "../types";
import cl from '../styles/TaskDetail.module.scss'
import TaskPoint from "../components/taskDetail/TaskPoint";
import { setItems } from "../redux/slices/tasks";
import Input from "@material-tailwind/react/Input";

export const TaskDetail: FC = () => {

  const [task, setTask] = useState<TasksItemTypes>()
  const [isActive, setIsActive] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [isChange, setIsChange] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const history = useHistory()
  const id = useParams<ParamsTypes>()

  const state = useSelector(getTasks)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   state.tasks.filter(item => {
  //     if (item.id === +id.id) {
  //       setTask(item)
  //     }
  //   })
  // }, [])

  // useEffect(() => {
  //   if (task) {
  //     setItem()

  //     if (!isMounted) {
  //       setIsMounted(true)
  //       setTitle(task.title)
  //     }
  //   }
  // }, [task])

  function onChange(boolean: boolean, id: number) {
    const items = task.tasks.map(item => {
      if (item.id === id) {
        return { ...item, checked: boolean }
      } else {
        return item
      }
    })

    setTask({ ...task, tasks: items })
  }

  function closeAllTasks() {
    const items = task.tasks.map(item => {
      return { ...item, checked: true }
    })

    setTask({ ...task, tasks: items })
  }

  // function setItem() {
  //   const items = state.tasks.map(item => {
  //     if (item.id === +id.id) {
  //       return task
  //     } else {
  //       return item
  //     }
  //   })

  //   dispatch(setItems(items))
  // }

  const sortedTasks = useMemo<TasksItemTypes>(() => {
    if (isActive) {
      const result = [...task.tasks].filter(item => !item.checked)

      return { ...task, tasks: result }
    } else {
      return task
    }
  }, [isActive, task])

  function addNewTask() {
    if (value) {
      setTask(
        {
          ...task,
          tasks: [...task.tasks,
          { id: Math.round(Math.random() * 1000), checked: false, text: value }
          ]
        }
      )
      setValue('')
    }
  }

  function deleteTask(id: number) {
    const arr: TaskItemTypes[] = [...task.tasks].filter(item => item.id !== id)

    setTask({ ...task, tasks: arr })
  }

  function changeTaskItem(value: string, id: number) {
    const items = task.tasks.map(item => {
      if (item.id === id) {
        return { ...item, text: value }
      } else {
        return item
      }
    })

    setTask({ ...task, tasks: items })
  }

  function changeTitle() {
    if (isChange) {
      setTask({ ...task, title: title })
    }
    setIsChange(!isChange)
  }

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
      {sortedTasks
        ?
        <div className={cl.content}>
          <div className={isChange ? cl.head : [cl.head, cl.hide].join(' ')}>
            <Input
              className='qwe'
              type="text"
              color="lightBlue"
              size="md"
              outline={false}
              placeholder=""
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
            <Button
              className={cl.change}
              color="lightBlue"
              size="sm"
              ripple="light"
              onClick={changeTitle}
            >
              {isChange ? 'Сохранить' : 'Изменить'}
            </Button>
          </div>
          <ul className={cl.list}>
            {sortedTasks.tasks.map((item, index) =>
              <li key={item.id} className={cl.item}>
                <TaskPoint
                  index={index}
                  id={item.id}
                  text={item.text}
                  checked={item.checked}
                  onChange={onChange}
                  deletTask={deleteTask}
                  changeTaskPoint={changeTaskItem}
                />
              </li>
            )}
          </ul>
        </div>
        :
        <h1>loading...</h1>
      }
      <div className={cl.inner}>
        <div className={cl.input}>
          <Input
            type="text"
            color="lightBlue"
            size="md"
            outline={true}
            placeholder="Текст задачи"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          />
        </div>
        <div className={cl.btn}>
          <Button
            color="lightBlue"
            size="md"
            ripple="light"
            onClick={addNewTask}
          >
            Добавить задачу
          </Button>
        </div>
      </div>
      <div className={cl.buttons}>
        <div className={cl.button}>
          <Button
            color="lightBlue"
            size="sm"
            ripple="light"
            onClick={closeAllTasks}
          >
            Закрыть все
          </Button>
        </div>
        <div className={cl.button}>
          <Button
            color="lightBlue"
            size="sm"
            ripple="light"
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? 'Показать все' : 'Показать только активные'}
          </Button>
        </div>
      </div>
    </div>
  )
}