import React, { FC } from "react"
import Input from "@material-tailwind/react/Input";

interface SearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search: FC<SearchProps> = ({value, onChange}) => {
  return (
    <Input
      type="text"
      color="lightBlue"
      size="lg"
      outline={true}
      placeholder="Поиск"
      value={value}
      onChange={onChange}
    />
  )
}