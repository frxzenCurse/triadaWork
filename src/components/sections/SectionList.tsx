import React from 'react'
import { SectionTypes } from '../../types'
import cl from '../../styles/SectionList.module.scss'
import SectionItem from './SectionItem'

interface SectionListProps {
  list: SectionTypes[]
}

const SectionList: React.FC<SectionListProps> = ({list}) => {
  return (
    <ul className={cl.list}>
      {list.map(item => 
        <li className={cl.item} key={item.id}>
          <SectionItem section={item} />
        </li>
      )}
    </ul>
  )
}

export default SectionList
