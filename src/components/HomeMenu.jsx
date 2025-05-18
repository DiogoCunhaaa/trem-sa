import HomeButton from "./HomeButton";

function HomeMenu() {
    return(
        <>
        <HomeButton 
        imageUrl="https://i.pinimg.com/736x/14/d7/df/14d7df61dc1701521d25761a48dab232.jpg"
        to="/dashboard"
        label="DASHBOARD"
      />
      <HomeButton 
        imageUrl="https://images.unsplash.com/photo-1596245296613-cfcdd8490086?q=80&w=2068"
        to="/gestaoderotas"
        label="GESTAO DE ROTAS"
      />
      <HomeButton 
        imageUrl="https://plus.unsplash.com/premium_photo-1661962552319-1f0abc1fc7f7?q=80&w=2070"
        to="/manutencao"
        label="MANUTENCAO"
      />
      <HomeButton 
        imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
        to="/relatorios"
        label="RELATORIOS E ANALISES"
      />
      <HomeButton 
        imageUrl="https://images.unsplash.com/photo-1624060798683-144bad071963?q=80&w=2070"
        to="/alertas"
        label="ALERTAS E NOTIFICACOES"
      />
      <HomeButton 
        imageUrl="https://images.unsplash.com/photo-1624060798683-144bad071963?q=80&w=2070"
        to="/loginpage"
        label="LOGIN"
      />
        </>
    )
}
    


export default HomeMenu;