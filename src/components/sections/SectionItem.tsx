import React from 'react'
import cl from '../../styles/SectionItem.module.scss'
import H2 from "@material-tailwind/react/Heading2";
import { SectionTypes } from '../../types'
import Button from "@material-tailwind/react/Button";
import { useHistory } from 'react-router-dom';
import { TASKS } from '../../routes/constans';
import { useDispatch } from 'react-redux';
import { removeItem } from '../../redux/slices/tasks';

interface SectionItemProps {
  section: SectionTypes
}

const SectionItem: React.FC<SectionItemProps> = ({ section }) => {

  const history = useHistory()
  const dispatch = useDispatch()

  return (
    <div className={cl.item}>
      <div className={cl.title} onClick={() => history.push(`${TASKS}/${section.id}`)}>
        <H2>{section.title}</H2>
      </div>
      <div className={cl.tasks}>
        {section.tasks.length
          ?
          <div className={cl.number}>Активных задач: {section.tasks.length}</div>
          :
          <div className={cl.number}>Активных задач пока нет</div>
        }
      </div>
      <div className={cl.buttons}>
        <div className={cl.button}>
          <Button
            color="lightBlue"
            buttonType="outline"
            size="sm"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
            type="button"
            onClick={() => dispatch(removeItem(section.id))}
          >
            Удалить
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SectionItem
