import React, { useEffect, useState } from 'react'
import { TaskItemTypes } from '../../types'
import cl from '../../styles/TaskPoint.module.scss'
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";

interface TaskPointProps extends TaskItemTypes {
  onChange: (boolean: boolean, id: number) => void;
  index: number;
  deletTask: (id: number) => void;
  changeTaskPoint: (value: string, id: number) => void;
}

const TaskPoint: React.FC<TaskPointProps> =
  ({
    index,
    id,
    checked,
    text,
    onChange,
    deletTask,
    changeTaskPoint
  }) => {

    const [isChecked, setIsChecked] = useState<boolean>(checked)
    const [isChangable, setIsChangebale] = useState<boolean>(false)
    const [value, setValue] = useState<string>(text)

    useEffect(() => {
      onChange(isChecked, id)
    }, [isChecked])

    useEffect(() => {
      setIsChecked(checked)
    }, [checked])

    function changableHandler() {
      if (isChangable) {
        changeTaskPoint(value, id)
      }
      setIsChangebale(!isChangable)
    }

    return (
      <label className={cl.label}>
        <div className={cl.id}>{index + 1}.</div>
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
        <div className={isChangable ? [cl.input, cl.active].join(' ') : cl.input}>
          <Input
            type="text"
            color="lightBlue"
            value={value}
            size="sm"
            outline={isChangable ? true : false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            placeholder=""
          />
        </div>
        <div className={cl.buttons}>
          <div className={cl.button}>
            <Button
              color="lightBlue"
              buttonType="filled"
              size="sm"
              rounded={false}
              ripple="light"
              onClick={changableHandler}
            >
              {isChangable ? 'сохранить' : 'редактировать'}
            </Button>
          </div>
          <div className={cl.button}>
            <Button
              color="lightBlue"
              buttonType="filled"
              size="sm"
              rounded={false}
              ripple="light"
              onClick={() => deletTask(id)}
            >
              удалить
            </Button>
          </div>
        </div>
      </label>
    )
  }

export default TaskPoint
