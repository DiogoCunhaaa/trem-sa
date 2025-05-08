import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';

import GestaoDeRotas from './pages/GestaoDeRotas'
import Dashboard from './pages/Dashboard';
import Manutencao from './pages/Manutencao';
import Relatorios from './pages/Relatorios';
import Alertas from './pages/Alertas';
import HomeMenu from './components/HomeMenu';

function App() {
  const location = useLocation();

  const pageTitles = {
    '/': 'Home Page',
    '/dashboard': 'Dashboard',
    '/gestaoderotas': 'Gestão de Rotas',
    '/manutencao': 'Manutenção',
    '/relatorios': 'Relatórios e Análises',
    '/alertas': 'Alertas e Notificações',
  }

  const currentTitle = pageTitles[location.pathname] || 'Pagina';

  return (
    <>
    <div className="container">
      <Navbar className="navbar" 
      title={currentTitle} 
      imageUrl={'https://i.pinimg.com/736x/14/d7/df/14d7df61dc1701521d25761a48dab232.jpg'}
      corTexto={'white'}
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
      </Routes>
    </>
  );
}

export default App;
