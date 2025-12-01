import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import PrivateRoute from './components/autenticacao/PrivateRoute';

import GestaoDeRotas from './pages/GestaoDeRotas';
import Dashboard from './pages/Dashboard';
import Manutencao from './pages/Manutencao';
import Relatorios from './pages/Relatorios';
import Alertas from './pages/Alertas';
import HomeMenu from './components/homepage/HomeMenu';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';
import Sensores from './pages/Sensores';
import Perfil from './pages/Perfil';
import Trens from './pages/Trens';
import Rotas from './pages/Rotas';
import Notificacoes from './pages/Notificacoes';
import Relatorioscrud from './pages/Relatorioscrud';
import Sobre from './pages/Sobre';
import ManutencaoPedidos from './pages/ManutencaoPedidos';
import EstacoesTrens from './pages/EstacoesTrens';


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
    '/sensores' : 'Sensores' , 
    '/perfil' : 'Perfil' ,
    '/trens' : 'Trens' ,
    '/rotas' : 'Rotas' ,
    '/notificacoes' : 'Notificações',
    '/relatorioscrud' : 'Relatórios',
    '/sobre' : 'Sobre',
    '/manutencaopedidos' : 'Manutenção Pedidos',
    '/estacoes': 'Estações',
  };

  const currentTitle = pageTitles[location.pathname] || 'Login';

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
          path='/estacoes'
          element={
            <PrivateRoute>
              <EstacoesTrens />
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
        <Route
        path='/sensores'
        element={
          <PrivateRoute>
            <Sensores/>
          </PrivateRoute>
        }
        />
        <Route
        path='/perfil'
        element={
          <PrivateRoute>
            <Perfil/>
          </PrivateRoute>
        }
        />
        <Route
        path='/trens'
        element={
          <PrivateRoute>
            <Trens/>
          </PrivateRoute>
        }
        />
        <Route
        path='/rotas'
        element={
          <PrivateRoute>
            <Rotas/>
          </PrivateRoute>
        }
        />
        <Route
        path='/notificacoes'
        element={
          <PrivateRoute>
            <Notificacoes/>
          </PrivateRoute>
        }
        />
        
        <Route
        path='/relatorioscrud'
        element={
          <PrivateRoute>
            <Relatorioscrud/>
          </PrivateRoute>
        }
        />

        <Route
        path='/sobre'
        element={
          <PrivateRoute>
            <Sobre/>
          </PrivateRoute>
        }
        />
        <Route path='/loginpage' element={<LoginPage />} />
        <Route path='/cadastropage' element={<CadastroPage />} />
        <Route
          path='/manutencaopedidos'
          element={
            <PrivateRoute>
              <ManutencaoPedidos />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
