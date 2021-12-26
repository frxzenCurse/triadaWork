import { FC } from "react"
import { TasksItemTypes } from "../../types"
import { TaskItem } from "./TaskItem"
import H2 from "@material-tailwind/react/Heading2";

interface TaskListProps {
  list: TasksItemTypes[],
  deleteItem: (id: number) => void
}

export const TaskList: FC<TaskListProps> = ({ list, deleteItem }) => {

  return (
    <div className="tasks-list">
      {list.length
        ?
        <div className='tasks-list__grid'>
          {list.map((task) =>
            <TaskItem deleteItem={deleteItem} task={task} key={task.id} />
          )}
        </div>
        :
        <div className="title">
          <H2 color="lightBlue">Список задач пуст</H2>
        </div>
      }
    </div>
  )
}