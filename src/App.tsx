import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter';
import { Navbar } from './components/navbar/Navbar';
import cl from './styles/App.module.scss'

function App() {
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
