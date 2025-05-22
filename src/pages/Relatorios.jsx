import HomeButton from '../components/homepage/HomeButton';

function Dashboard() {

  return (
    <div>
      <div className='App'>
        <HomeButton 
        imageUrl='https://i.pinimg.com/736x/14/d7/df/14d7df61dc1701521d25761a48dab232.jpg' 
        to='/about'
        label='DASHBOARD'
        />
        <HomeButton 
        imageUrl='https://images.unsplash.com/photo-1596245296613-cfcdd8490086?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
        label='GESTAO DE ROTAS'
        />
        <HomeButton 
        imageUrl='https://plus.unsplash.com/premium_photo-1661962552319-1f0abc1fc7f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
        label='MANUTENCAO'
        />
        <HomeButton 
        imageUrl='https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
        label='RELATORIOS E ANALISES'
        />
        <HomeButton 
        imageUrl='https://images.unsplash.com/photo-1624060798683-144bad071963?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
        label='ALERTAS E NOTIFICACOES'
        />
      </div>
    </div>
  );
}

export default Dashboard;
