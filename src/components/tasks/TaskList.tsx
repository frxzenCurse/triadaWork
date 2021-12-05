import { FC } from "react"
import { TasksItemTypes } from "../../types"
import { TaskItem } from "./TaskItem"
import H2 from "@material-tailwind/react/Heading2";

interface TaskListProps {
  list: TasksItemTypes[],
}

export const TaskList: FC<TaskListProps> = ({ list }) => {

  return (
    <div className="tasks-list">
      {list.length
        ?
        <div className='tasks-list__grid'>
          {list.map((task, index) =>
            <TaskItem task={task} index={index} key={task.id} />
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