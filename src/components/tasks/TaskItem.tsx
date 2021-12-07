import { FC } from "react"
import { TasksItemTypes } from "../../types"
import Card from "@material-tailwind/react/Card";
import H6 from "@material-tailwind/react/Heading6";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import Button from "@material-tailwind/react/Button";
import Paragraph from "@material-tailwind/react/Paragraph";
import { Draggable } from "react-beautiful-dnd";
import { useHistory } from "react-router";
import { TASK_DETAIL } from "../../routes/constans";

interface TaskItemProps {
  task: TasksItemTypes;
  index: number;
}

export const TaskItem: FC<TaskItemProps> = ({ task, index }) => {

  const history = useHistory()

  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided: any) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <CardBody>
              <H6 color="gray">{task.title}</H6>
              <ul>
                {task.tasks.map(item =>
                  <li key={item.id}>
                    <Paragraph color="gray">
                      {item.text}
                    </Paragraph>
                  </li>
                )}
              </ul>
            </CardBody>
            <CardFooter>
              <Button 
                color="lightBlue" 
                size="lg" 
                ripple="light" 
                onClick={() => history.push(TASK_DETAIL + '/' + task.id)}
              >
                Read More
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </Draggable>
  )
}