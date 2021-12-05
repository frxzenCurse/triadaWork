import { FC, useState } from "react"
import { Search } from "../components/header/Search"
import { Sort } from "../components/header/Sort"
import { TaskList } from "../components/tasks/TaskList"
import cl from '../styles/Tasks.module.scss'
import { RootState, TasksItemTypes, TasksState } from "../types"
import Button from "@material-tailwind/react/Button";
import { FormValues, TaskModal } from "../components/TaskModal"
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux"
import { addItem, setItems } from "../redux/slices/tasks"

export const Tasks: FC = () => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const state = useSelector((state: RootState) => state.tasks)
  const dispatch = useDispatch()

  function setNewTask(task: FormValues) {
    const newTask = {
      id: Math.round(Math.random() * 1000),
      title: task.title,
      tasks: task.tasks.map(item => item.text)
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided: any) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <TaskList list={state.tasks} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <TaskModal showModal={showModal} closeModal={() => setShowModal(false)} setTask={setNewTask} />
    </div>
  )
}