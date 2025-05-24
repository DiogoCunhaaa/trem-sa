import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';

import GestaoDeRotas from './pages/GestaoDeRotas'
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
    '/cadastropage': 'Cadastro'
  }

  const currentTitle = pageTitles[location.pathname] || 'Pagina';

  return (
    <>
    <div className='container-fluid'>
      <Navbar
      title={currentTitle}
      corTexto={'dark'}
      to={'/'}
      />
    </div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <HomeMenu />
            </div>
          }
        />
        <Route path="/gestaoderotas" element={<GestaoDeRotas/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manutencao" element={<Manutencao />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/alertas" element={<Alertas />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/cadastropage" element={<CadastroPage />} />


      </Routes>
    </>
  );
}

export default App;
