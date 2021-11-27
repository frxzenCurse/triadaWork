import { FC } from "react"
import Input from "@material-tailwind/react/Input";

export const Search: FC = () => {
  return (
    <Input
      type="text"
      color="lightBlue"
      size="lg"
      outline={true}
      placeholder="Поиск"
    />
  )
}