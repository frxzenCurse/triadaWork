import { FC } from "react"
import cl from '../../styles/Navbar.module.scss'
import Button from "@material-tailwind/react/Button";

export const Navbar: FC = () => {
  return (
    <div className={cl.navbar}>
      logo
      <div className={cl.links}>
        <Button
          color="lightBlue"
          buttonType="link"
          size="lg"
          rounded={false}
          block={true}
          iconOnly={false}
          ripple="dark"
        >
          Задачи
        </Button>
      </div>
    </div>
  )
}