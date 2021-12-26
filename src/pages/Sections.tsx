import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SectionList from '../components/sections/SectionList'
import { SectionTypes } from '../types'
import { getTasks } from '../types/selectors'
import cl from '../styles/Sections.module.scss'
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";
import { addItem } from '../redux/slices/tasks'

const Sections: React.FC = () => {

  const state = useSelector(getTasks)
  const dispatch = useDispatch()

  const [sections, setSections] = useState<SectionTypes[]>([])
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    if (state) {
      setSections(state.sections)
    }
  }, [state])


  function addNewSection() {
    if (value) {
      const section: SectionTypes = {
        id: Math.round(Math.random() * 1000),
        title: value,
        isClosed: false,
        tasks: [],
      }
      
      dispatch(addItem(section))
      setValue('')
    }
  }

  return (
    <div>
      <div className={cl.top}>
        <Input
          type="text"
          color="lightBlue"
          size="lg"
          outline={true}
          placeholder="Название раздела"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value) }
        />
        <Button
          color="deepPurple"
          buttonType="filled"
          size="lg"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="dark"
          type="button"
          onClick={addNewSection}
        >
          Добавить раздел
        </Button>
      </div>
      {sections.length
        ?
        <SectionList list={sections} />
        :
        <div className={cl.text}></div>
      }
    </div>
  )
}

export default Sections
