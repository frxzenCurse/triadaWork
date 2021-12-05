import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter';
import { Navbar } from './components/navbar/Navbar';
import { setItems } from './redux/slices/tasks';
import { useDispatch } from 'react-redux';
import cl from './styles/App.module.scss'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('tasks')) {
      const items = localStorage.getItem('tasks')
      
      dispatch(setItems(JSON.parse(items || "[]")))
    }
  }, [])

  return (
    <div className={cl.layout}>
      <aside className={cl.aside}>
        <Navbar />
      </aside>
      <main className={cl.main}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
