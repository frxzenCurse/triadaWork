import { Route, Switch, Redirect } from 'react-router-dom'
import { SECTIONS } from '../routes/constans'
import { Routes } from '../routes/Routes'

export const AppRouter = () => {
  return (
    <Switch>
      {Routes.map(item =>
        <Route key={item.path} path={item.path} component={item.component} exact />
      )}
      <Redirect to={SECTIONS} />
    </Switch>
  )
}