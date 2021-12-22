import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter';
import { Navbar } from './components/navbar/Navbar';
import { setItems } from './redux/slices/tasks';
import { useDispatch } from 'react-redux';
import cl from './styles/App.module.scss'

function App() {

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (localStorage.getItem('tasks')) {
      const items = localStorage.getItem('tasks')

      dispatch(setItems(JSON.parse(items || "[]")))
    }

    setIsLoading(false)
  }, [])

  return (
    <BrowserRouter>
      <div className={cl.layout}>
        <aside className={cl.aside}>
          <Navbar />
        </aside>
        <main className={cl.main}>
          {!isLoading && <AppRouter />}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
