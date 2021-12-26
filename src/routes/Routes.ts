import React from 'react';
import Sections from '../pages/Sections';
import { TaskDetail } from '../pages/TaskDetail';
import { Tasks } from '../pages/Tasks';
import { TASKS, SECTIONS } from './constans';

interface routesTypes {
  path: string;
  component: React.FC;
}

export const Routes: routesTypes[] = [
  {
    path: TASKS + '/:id',
    component: Tasks,
  },
  {
    path: TASKS + '/:id' + '/:id',
    component: TaskDetail,
  },
  {
    path: SECTIONS,
    component: Sections,
  },
]