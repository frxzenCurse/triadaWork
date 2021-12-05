import { FC } from "react"
import Button from "@material-tailwind/react/Button";
import { useHistory } from "react-router";
import { TASKS } from "../routes/constans";

export const TaskDetail: FC = () => {

  const history = useHistory()

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
    </div>
  )
}