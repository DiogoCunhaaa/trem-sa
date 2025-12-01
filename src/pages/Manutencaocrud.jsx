import RectanglePart from '../components/RectanglePart';
import ButtonInfo from '../components/infos/ButtonInfo';
import ButtonManutencao from '../javascript/ButtonManutencao';
import { useNavigate } from 'react-router-dom';

function Manutencaocrud(){
    const navigate = useNavigate();
    
    // Função para atualizar o dashboard após ações
    const atualizarDashboard = () => {
        localStorage.setItem('lastActivity', JSON.stringify({
            timestamp: new Date().toISOString(),
            type: 'manutencao_update'
        }));
    };
    
    const handleAddPedido = () => {
        ButtonManutencao.add();
        atualizarDashboard();
    };
    
    const handleNavegacao = (rota) => {
        navigate(rota);
        atualizarDashboard();
    };
    
    return(
        <div className="container">
            <div className="row mt-3">
                <div className="col-6">
                    <RectanglePart backgroundColor={'black'}> 
                        <ButtonInfo
                            title={'Fazer pedido de ajuda'}
                            textColor={'white'}
                            buttonTitle={'Adicionar pedido'}
                            backgroundColor={'#b8b8b8'}
                            onClick={handleAddPedido}
                        />
                    </RectanglePart>
                </div>
                <div className="col-6">
                    <RectanglePart backgroundColor={''}> 
                        <ButtonInfo
                            title={'Excluir pedido de ajuda'}
                            textColor={'black'}
                            buttonTitle={'Remover pedido'}
                            backgroundColor={'#b8b8b8'}
                            onClick={() => handleNavegacao('/manutencao/pedidos')}
                        />
                    </RectanglePart>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-6">
                    <RectanglePart backgroundColor={'black'}> 
                        <ButtonInfo
                            title={'Editar pedidos'}
                            textColor={'white'}
                            buttonTitle={'Editar pedidos'}
                            backgroundColor={'#b8b8b8'}
                            onClick={() => handleNavegacao('/manutencao/pedidos')}
                        />
                    </RectanglePart>
                </div>
                <div className="col-6">
                    <RectanglePart backgroundColor={''}> 
                        <ButtonInfo
                            title={'Ver pedido de ajuda'}
                            textColor={'black'}
                            buttonTitle={'Ver pedidos'}
                            backgroundColor={'#b8b8b8'}
                            onClick={() => navigate('/manutencao/pedidos')}
                        />
                    </RectanglePart>
                </div>
            </div>
        </div>
    )
}

export default Manutencaocrud;