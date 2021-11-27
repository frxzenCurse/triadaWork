import { FC } from "react"
import { TasksItemTypes } from "../../types"
import Card from "@material-tailwind/react/Card";
import H6 from "@material-tailwind/react/Heading6";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import Button from "@material-tailwind/react/Button";
import Paragraph from "@material-tailwind/react/Paragraph";

interface TaskItemProps {
  task: TasksItemTypes;
}

export const TaskItem: FC<TaskItemProps> = ({ task }) => {
  return (
    <Card>
      <CardBody>
        <H6 color="gray">{task.title}</H6>
        <ul>
          {task.tasks.map(item =>
            <li key={item}>
              <Paragraph color="gray">
                {item}
              </Paragraph>
            </li>
          )}
        </ul>
      </CardBody>
      <CardFooter>
        <Button color="lightBlue" size="lg" ripple="light">
          Read More
        </Button>
      </CardFooter>
    </Card>

  )
}