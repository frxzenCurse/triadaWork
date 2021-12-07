import React, { useState } from 'react'
import { TaskItemTypes } from '../../types'
import cl from '../../styles/TaskPoint.module.scss'
import Input from "@material-tailwind/react/Input";

interface TaskPointProps extends TaskItemTypes {
  // onChange: () => void;
}

const TaskPoint: React.FC<TaskPointProps> = ({id, checked, text}) => {

  const [isChecked, setIsChecked] = useState(checked)

  return (
    <label className={cl.label}>
      <div className={cl.id}>{id}.</div>
      <div className={cl.checkbox}>
        <Input
          type="checkbox"
          color="lightBlue"
          size="sm"
          outline={false}
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          placeholder=""
        />
      </div>
      <div className={cl.text}>{text}</div>
    </label>
  )
}

export default TaskPoint
