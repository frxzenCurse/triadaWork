import { FC, useEffect, useState } from "react"
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
import cl from '../../styles/TaskItem.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { removeItem, setItems } from '../../redux/slices/tasks'
import Select from 'react-select'
import { getTasks } from "../../types/selectors";

interface TaskItemProps {
  task: TasksItemTypes;
  index: number;
}

const options = [
  { value: 1, label: '1 уровень' },
  { value: 2, label: '2 уровень' },
  { value: 3, label: '3 уровень' },
  { value: 4, label: '4 уровень' },
  { value: 5, label: '5 уровень' },
]

export const TaskItem: FC<TaskItemProps> = ({ task, index }) => {

  const history = useHistory()
  const dispatch = useDispatch()
  const {tasks} = useSelector(getTasks)

  const [classes, setClasses] = useState([cl.card])
  const [card, setCard] = useState<TasksItemTypes>(task)
  const [value, setValue] = useState<number>(task.priority)

  function changeTaskItem() {

    const arr = tasks.map(item => {
      if (item.id === card.id) {
        return {...card, priority: value}
      } else {
        return item
      }
    })

    dispatch(setItems(arr))
  }

  useEffect(() => {
    switch (value) {
      case 1:
        setClasses([cl.card, cl.first])
        break;
      case 2:
        setClasses([cl.card, cl.second])
        break;
      case 3:
        setClasses([cl.card, cl.third])
        break;
      case 4:
        setClasses([cl.card, cl.fourth])
        break;
      default:
        setClasses([cl.card])
    }
    changeTaskItem()
  }, [value])

  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided: any) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card className={classes.join(' ')}>
            <CardBody>
              <div className={cl.head}>
                <H6 color="gray">{card.title}</H6>
                <div className={cl.select}>
                  <Select 
                    defaultValue={options[value - 1]}
                    options={options} 
                    onChange={(e) => setValue(e.value)}
                  />
                </div>
              </div>
              <ul>
                {card.tasks.map(item =>
                  <li key={item.id}>
                    <Paragraph color="gray">
                      {item.text}
                    </Paragraph>
                  </li>
                )}
              </ul>
            </CardBody>
            <CardFooter>
              <div className={cl.buttons}>
                <Button
                  color="lightBlue"
                  size="md"
                  ripple="light"
                  onClick={() => history.push(TASK_DETAIL + '/' + card.id)}
                >
                  Подробнее
                </Button>
                <Button
                  color="lightBlue"
                  size="md"
                  ripple="light"
                  onClick={() => dispatch(removeItem(card.id))}
                >
                  Удалить
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </Draggable>
  )
}