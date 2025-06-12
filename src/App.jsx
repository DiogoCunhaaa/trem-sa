import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import PrivateRoute from './components/autenticacao/PrivateRoute';
import { useAuth } from './components/autenticacao/AuthContext';

import GestaoDeRotas from './pages/GestaoDeRotas';
import Dashboard from './pages/Dashboard';
import Manutencao from './pages/Manutencao';
import Relatorios from './pages/Relatorios';
import Alertas from './pages/Alertas';
import HomeMenu from './components/homepage/HomeMenu';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';

function App() {
  const location = useLocation();

  const pageTitles = {
    '/': 'Home Page',
    '/dashboard': 'Dashboard',
    '/gestaoderotas': 'Gestão de Rotas',
    '/manutencao': 'Manutenção',
    '/relatorios': 'Relatórios e Análises',
    '/alertas': 'Alertas e Notificações',
    '/loginpage': 'Login',
    '/cadastropage': 'Cadastro',
  };

  const currentTitle = pageTitles[location.pathname] || 'Pagina';

  return (
    <>
      <div>
        <Navbar title={currentTitle} corTexto={'dark'} to={'/'} />
      </div>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/'
          element={
            <div className='App'>
              <HomeMenu />
            </div>
          }
        />
        <Route
          path='/gestaoderotas'
          element={
            <PrivateRoute>
              <GestaoDeRotas />
            </PrivateRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/manutencao'
          element={
            <PrivateRoute>
              {' '}
              <Manutencao />{' '}
            </PrivateRoute>
          }
        />
        <Route
          path='/relatorios'
          element={
            <PrivateRoute>
              {' '}
              <Relatorios />{' '}
            </PrivateRoute>
          }
        />
        <Route
          path='/alertas'
          element={
            <PrivateRoute>
              {' '}
              <Alertas />{' '}
            </PrivateRoute>
          }
        />
        <Route path='/loginpage' element={<LoginPage />} />
        <Route path='/cadastropage' element={<CadastroPage />} />
      </Routes>
    </>
  );
}

export default App;
