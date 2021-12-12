import { FC } from "react"
import Select from 'react-select'
import { SelectOptionsTypes } from "../../types"

const options: SelectOptionsTypes[] = [
  { value: 'title', label: 'Заголовку' },
  { value: 'priority', label: 'Приоритету' },
]

interface SortProps {
  onChange: (value: SelectOptionsTypes) => void;
}

export const Sort: FC<SortProps> = ({onChange}) => {

  return (
    <div>
      <Select 
        placeholder='Сортировка по'
        options={options} 
        onChange={onChange}
      />
    </div>
  )
}