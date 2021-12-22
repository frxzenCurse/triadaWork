import { FC } from "react"
import cl from '../../styles/Navbar.module.scss'
import Button from "@material-tailwind/react/Button";
import { useHistory } from "react-router-dom";
import { SECTIONS, TASKS } from "../../routes/constans";

export const Navbar: FC = () => {

  const history = useHistory()

  return (
    <div className={cl.navbar}>
      logo
      <div className={cl.links}>
        <div className={cl.link}>
          <Button
            color="lightBlue"
            buttonType="link"
            size="lg"
            rounded={false}
            block={true}
            iconOnly={false}
            ripple="dark"
            onClick={() => history.push(SECTIONS)}
          >
            Раздеры
          </Button>
        </div>
        <div className={cl.link}>
          <Button
            color="lightBlue"
            buttonType="link"
            size="lg"
            rounded={false}
            block={true}
            iconOnly={false}
            ripple="dark"
            onClick={() => history.push(TASKS)}
          >
            Задачи
          </Button>
        </div>
      </div>
    </div>
  )
}