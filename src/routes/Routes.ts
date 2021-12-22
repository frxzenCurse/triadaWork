import React from 'react';
import Sections from '../pages/Sections';
import { TaskDetail } from '../pages/TaskDetail';
import { Tasks } from '../pages/Tasks';
import { TASKS, TASK_DETAIL, SECTIONS } from './constans';

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
    path: TASK_DETAIL + '/:id',
    component: TaskDetail,
  },
  {
    path: SECTIONS,
    component: Sections,
  },
]