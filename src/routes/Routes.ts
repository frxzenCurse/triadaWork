import { TaskDetail } from '../pages/TaskDetail';
import { Tasks } from '../pages/Tasks';
import { TASKS, TASK_DETAIL } from './constans';

interface routesTypes {
  path: string;
  component: any;
}

export const Routes: routesTypes[] = [
  {
    path: TASKS,
    component: Tasks,
  },
  {
    path: TASK_DETAIL + '/:id',
    component: TaskDetail,
  },
]