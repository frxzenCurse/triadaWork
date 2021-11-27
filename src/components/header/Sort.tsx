import { FC } from "react"
import Select from 'react-select'

export const Sort: FC = () => {

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (
    <div>
      <Select options={options} />
    </div>
  )
}